<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    exit(0);
}

// Correct syntax for setting the Content-Type header
header('Content-Type: application/json'); 
// Include database connection file
require 'db.php'; // Include your DB connection setup

// Get the incoming JSON data
$data = json_decode(file_get_contents("php://input"));

// Extract teacher ID and results

// Assuming database connection is established

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'));

// Ensure the data was decoded correctly
if (isset($data->taskId)) {
    $taskId = $data->taskId;  // Use -> to access object properties
    $taskName = $data->taskName;
    $deadline = $data->deadline;
    $teacherName = $data->teacherName;
    $session = $data->session;

    // Now you can use these values to insert into the database
    // Assuming you're using a database connection $conn

    $sql = "INSERT INTO tasks (task_id, task_name, deadline, teacher_name, session) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $taskId, $taskName, $deadline, $teacherName, $session);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to add task"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid data received"]);
}


?>
