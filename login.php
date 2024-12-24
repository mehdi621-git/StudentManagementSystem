<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

header("Content-Type: multipart/form-data");
// Include the database connection
require_once 'db.php'; 

// Get the request payload
$data = json_decode(file_get_contents('php://input'), true);

// Get email and password from the request
$email = $data['email'];
$password = $data['password'];

// Prepare the SQL query to fetch user data based on the provided email

// Check for empty input
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

// Check credentials in the authentication table
$sql = "SELECT role, password FROM User WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // Verify password
    if (password_verify($password, $row['password'])) {
        $role = $row['role'];

        // Fetch additional details based on role
        if ($role === "teacher") {
            $teacherSql = "SELECT id FROM Teacher WHERE Email = ?";
            $teacherStmt = $conn->prepare($teacherSql);
            $teacherStmt->bind_param("s", $email);
            $teacherStmt->execute();
            $teacherResult = $teacherStmt->get_result();

            if ($teacherResult->num_rows === 1) {
                $teacher = $teacherResult->fetch_assoc();
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'role' => $role,
                    'teacherId' => $teacher['id']
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Teacher details not found']);
            }

            $teacherStmt->close();
        } elseif ($role === "student") {
            $studentSql = "SELECT Student_id FROM Student WHERE Email = ?";
            $studentStmt = $conn->prepare($studentSql);
            $studentStmt->bind_param("s", $email);
            $studentStmt->execute();
            $studentResult = $studentStmt->get_result();

            if ($studentResult->num_rows === 1) {
                $student = $studentResult->fetch_assoc();
                echo json_encode([
                    'success' => true,
                    'message' => 'Login successful',
                    'role' => $role,
                    'studentId' => $student['Student_id']
                ]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Student details not found']);
            }

            $studentStmt->close();
        } elseif ($role === "admin") {
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'role' => $role
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid role']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid password']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or user does not exist']);
}

// Close the connection
$stmt->close();
$conn->close();
?>