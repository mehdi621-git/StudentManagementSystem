<?php
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

header("Content-Type: multipart/form-data");
include_once 'db.php';

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize and validate input data
    $firstName = htmlspecialchars(trim($_POST['First_Name']));
    $lastName = htmlspecialchars(trim($_POST['Last_Name']));
    $fullName = $firstName . ' ' . $lastName;
    $dateOfBirth = $_POST['Date_of_Birth'];
    $gender = $_POST['Gender'];
    $phoneNo = htmlspecialchars(trim($_POST['Phone_No']));
    $email = filter_var(trim($_POST['Email']), FILTER_SANITIZE_EMAIL);
    $address = htmlspecialchars(trim($_POST['Address']));
    $department = htmlspecialchars(trim($_POST['Department']));
    $designation = htmlspecialchars(trim($_POST['Designation']));
    $experience = htmlspecialchars(trim($_POST['Experience']));
    $qualification = htmlspecialchars(trim($_POST['Qualification']));
    $joiningDate = $_POST['Joining_Date'];
    $session = htmlspecialchars(trim($_POST['Session']));

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Invalid email format."]);
        exit();
    }

    // Validate phone number format (example: must be digits and 10 characters long)
    if (!preg_match("/^[0-9]{11}$/", $phoneNo)) {
        echo json_encode(["error" => "Invalid phone number format."]);
        exit();
    }

    // File upload handling
    $uploadDir = "uploads/";
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $imagePath = null;
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Validate image file type (only allow certain extensions like jpg, jpeg, png)
        $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!in_array($_FILES['image']['type'], $allowedTypes)) {
            echo json_encode(["error" => "Invalid image file type. Only JPG, JPEG, and PNG are allowed."]);
            exit();
        }

        // Check image file size (limit to 5MB)
        if ($_FILES['image']['size'] > 5 * 1024 * 1024) {
            echo json_encode(["error" => "Image file size exceeds the 5MB limit."]);
            exit();
        }

        // Generate unique file name
        $imageName = time() . "_" . basename($_FILES['image']['name']);
        $imagePath = $uploadDir . $imageName;

        // Move the uploaded file to the designated directory
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
            echo json_encode(["error" => "Failed to upload image."]);
            exit();
        }
    }

    // Check if email already exists in the User table
    $checkEmailQuery = $conn->prepare("SELECT id FROM User WHERE email = ?");
    $checkEmailQuery->bind_param("s", $email);
    $checkEmailQuery->execute();
    $checkEmailQuery->store_result();

    // If email already exists, return error
    if ($checkEmailQuery->num_rows > 0) {
        echo json_encode(["error" => "Email already exists."]);
        $checkEmailQuery->close();
        exit();
    }

    // Insert teacher data into the Teacher table
    $insertTeacherQuery = $conn->prepare("
        INSERT INTO Teacher (FullName, Gender, Experience, Designation, Qualification, Session, DateOfBirth, PhoneNo, Email, Address, Department, ImagePath, JoiningDate)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $insertTeacherQuery->bind_param(
        "sssssssssssss",
        $fullName,
        $gender,
        $experience,
        $designation,
        $qualification,
        $session,
        $dateOfBirth,
        $phoneNo,
        $email,
        $address,
        $department,
        $imagePath,
        $joiningDate
    );
// Insert teacher data into the Teacher table
$insertTeacherQuery = $conn->prepare("
    INSERT INTO Teacher (FullName, Gender, Experience, Designation, Qualification, Session, DateOfBirth, PhoneNo, Email, Address, Department, ImagePath, JoiningDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");
$insertTeacherQuery->bind_param(
    "sssssssssssss",
    $fullName,
    $gender,
    $experience,
    $designation,
    $qualification,
    $session,
    $dateOfBirth,
    $phoneNo,
    $email,
    $address,
    $department,
    $imagePath,
    $joiningDate
);

if ($insertTeacherQuery->execute()) {
    // Get the ID of the inserted teacher
    $teacherId = $insertTeacherQuery->insert_id;
echo $teacherId;
    // Set the teacher's teacherId as the password
    $password = password_hash($teacherId, PASSWORD_BCRYPT);  // Use teacherId as password, hashed

    // Insert teacher's email, ID, and role into the User table
    $role = 'teacher';  // Set the role to 'teacher'

    $insertUserQuery = $conn->prepare("
        INSERT INTO User (email, role, password)
        VALUES (?, ?, ?)
    ");
    $insertUserQuery->bind_param("sss", $email, $role, $password);

    if ($insertUserQuery->execute()) {
        // Return success message along with teacher's ID and email
        echo json_encode([
            "message" => "Teacher data and user authentication data saved successfully.",
            "teacher_id" => $teacherId,
            "email" => $email
        ]);
    } else {
        echo json_encode(["error" => "Failed to save user authentication data."]);
    }
} else {
    echo json_encode(["error" => "Error saving teacher data: " . $conn->error]);
}


    // Close prepared statements
    $insertTeacherQuery->close();
    $insertUserQuery->close();
    $checkEmailQuery->close();
} else {
    echo json_encode(["error" => "Invalid request method."]);
}

// Close connection
$conn->close();
?>

