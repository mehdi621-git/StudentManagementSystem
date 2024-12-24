<?php
// Include database connection
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}
include_once 'db.php';
 // or the code above directly

// Get data from POST request
$data = json_decode(file_get_contents("php://input"), true);
var_dump($data['FullName']);
if ($data) {
  
    $id = $data['id'];
    $FullName = $data['FullName'];    
    $dateOfBirth = $data['DateOfBirth'];
    $gender = $data['Gender'];
    $phoneNo = $data['PhoneNo'];
    $email = $data['Email'];
    $address = $data['Address'];
    $department = $data['Department'];
    $designation = $data['Designation'];
    $experience = $data['Experience'];
    $qualification = $data['Qualification'];
    $joiningDate = $data['JoiningDate'];
    $session =$data['Session'];

    // Update query
    $sql = "UPDATE teacher
    SET FullName = ?, 
        Gender = ?, 
        Experience = ?, 
        Designation = ?, 
        Qualification = ?, 
        Session = ?, 
        DateOfBirth = ?, 
        PhoneNo = ?, 
        Email = ?, 
        Address = ?, 
        Department = ?, 
        JoiningDate = ? 
    WHERE id = ?";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Bind parameters
$stmt->bind_param(
"ssisisssssssi", // Data types: s=string, i=integer
$FullName,       // FullName (string)
$gender,         // Gender (string)
$experience,     // Experience (integer)
$designation,    // Designation (string)
$qualification,  // Qualification (string)
$session,        // Session (string)
$dateOfBirth,    // DateOfBirth (string)
$phoneNo,        // PhoneNo (string)
$email,          // Email (string)
$address,        // Address (string)
$department,     // Department (string)
$joiningDate,    // JoiningDate (string)
$id              // id (integer)
);
    if ($stmt->execute()) {
        echo json_encode(["message" => "Data updated successfully."]);
    } else {
        echo json_encode(["error" => "Failed to update data."]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid input data."]);
}

$conn->close();
?>