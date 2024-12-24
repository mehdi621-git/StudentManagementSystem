<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    exit(0);
}

header('Content-Type: application/json'); // Set the correct content type

include 'db.php'; 

// Assuming you have set up the database connection as $conn

// Get the payload from the frontend
$payload = json_decode(file_get_contents('php://input'), true);

// Extract necessary data from the payload
$teacherName = $payload['teacherName'];
$teacherID = $payload['teacherID'];
$session = $payload['session'];
$taskData = $payload['taskData'];

// Loop through each student's task data and insert into the database
foreach ($taskData as $task) {
    $studentId = $task['studentId'];
    $selectedTask = $task['selectedTask']; // This is the taskId (could be NULL if no task selected)
    $marks = $task['marks']; // Marks entered by the teacher

    // Insert or update the student's task and marks into the task_marks table
    $sql = "INSERT INTO task_marks (student_id, task_id, marks, teacher_id, teacher_name) 
            VALUES (?, ?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE marks = ?, teacher_id = ?, teacher_name = ?";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Bind the parameters: 5 placeholders for insertion and 3 placeholders for update
    $stmt->bind_param("ssiissss", $studentId, $selectedTask, $marks, $teacherID, $teacherName, $marks, $teacherID, $teacherName);

    // Execute the query
    if ($stmt->execute()) {
        // If the query is executed successfully
        echo json_encode(["status" => "success", "message" => "Task data submitted successfully"]);
    } else {
        // If there's an error
        echo json_encode(["status" => "error", "message" => "Failed to submit task data"]);
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>

