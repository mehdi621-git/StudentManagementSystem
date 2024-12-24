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
    $admissionDate = $data['Admission_Date'];
    $course = $data['Course'];
    $PreSkl = $data['PrevSkl'];
    $roll= $data['Student_id'];
    $session =$data['Session'];
    $stdType =$data['Student_type'];
    $sdyType =$data['Study_type'];


    // Update query
  $sql = "UPDATE Student
    SET FullName = ?,DateOfBirth = ? ,Gender = ? , Session =?,PhoneNo =? , Email =?,
     Address =?,Student_id =?, Department =?,  Admission_Date =?, Study_type =?,Student_type = ?,Course = ?,PrevSkl = ?
    WHERE id = ?";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Bind parameters
$stmt->bind_param(
    "ssssssssssssssi",
    $FullName,
    $dateOfBirth,
    $gender,
    $session,
    $phoneNo,
    $email,
    $address,
    $roll,
    $department,
    $admissionDate,
    $sdyType,
    $stdType,
    $course,
    $PreSkl ,
    $id
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