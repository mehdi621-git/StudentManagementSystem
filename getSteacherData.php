<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php'; // Include your database connection file

// Get the teacher_id from the request (e.g., ?teacher_id=1)
$teacher_id = isset($_GET['teacher_id']) ? intval($_GET['teacher_id']) : 0;

if ($teacher_id === 0) {
    echo json_encode(["error" => "Invalid teacher ID"]);
    exit;
}

$sql = "SELECT * FROM Teachers WHERE id = $teacher_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $teacher = $result->fetch_assoc();
    echo json_encode($teacher); // Return the teacher's data as JSON
} else {
    echo json_encode(["error" => "No teacher found"]);
}

$conn->close();
?>
