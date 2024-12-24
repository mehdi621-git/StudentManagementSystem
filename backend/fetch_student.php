<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include the database connection file
include 'db.php';

// Get the student ID from the URL
$studentId = $_GET['studentId']; // e.g., "STU12346"

// Query to fetch student details based on student ID
$sql = "
    SELECT 
        ImagePath,
        FullName,
        DateOfBirth,
        Gender,
        Session,
        PhoneNo,
        Email,
        Address,
        Student_id,
        Department,
        Admission_Date,
        Study_type,
        Student_type,
        Course,
        PrevSkl
    FROM Student
    WHERE Student_id = ?
";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("s", $studentId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Fetch the data
    if ($row = $result->fetch_assoc()) {
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "Student not found"]);
    }
} else {
    echo json_encode(["error" => "Query preparation failed"]);
}

$conn->close();
?>
