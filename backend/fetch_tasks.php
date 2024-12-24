<?php

header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

header("Content-Type: application/json"); // Content-Type should be application/json for JSON response
// Include the database connection
include('db.php');

// SQL query to fetch tasks from the `tasks` table
$sql = "SELECT * FROM tasks"; 
$result = $conn->query($sql);

$tasks = [];

// Check if there are results
if ($result->num_rows > 0) {
    // Fetch each task and store it in the $tasks array
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
    // Return tasks as JSON
    echo json_encode($tasks);
} else {
    // Return an error message if no tasks are found
    echo json_encode(["status" => "error", "message" => "No tasks found"]);
}

// Close the connection
$conn->close();
?>
