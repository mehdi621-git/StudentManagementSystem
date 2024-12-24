<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include the database connection file
include 'db.php';

// Fetch assignments and their marks or status
$sql = "
    SELECT 
        t.task_id, 
        t.task_name, 
        t.deadline, 
        t.teacher_name, 
        tm.marks 
    FROM 
        tasks t
    LEFT JOIN 
        task_marks tm 
    ON 
        t.teacher_name = tm.teacher_name AND tm.student_id = ?
";

$studentId = $_GET['studentId']; // Pass student_id from frontend

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("s", $studentId);
    $stmt->execute();
    $result = $stmt->get_result();

    $assignments = [];
    while ($row = $result->fetch_assoc()) {
        
        $assignments[] = [
            "task_id" => $row['task_id'],
            "task_name" => $row['task_name'],
            "deadline" => $row['deadline'],
            "teacher_name" => $row['teacher_name'],
            // Explicitly check if marks is not null and not an empty string
            "status" => (!is_null($row['marks']) && $row['marks'] !== '') ? $row['marks'] . " marks" : "Pending"
        ];
    }

    echo json_encode($assignments);
} else {
    echo json_encode(["error" => "Failed to fetch assignments"]);
}

$conn->close();
?>
