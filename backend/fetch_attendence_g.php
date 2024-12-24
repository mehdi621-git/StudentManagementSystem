<?php
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS,DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}
// attendance.php
include 'db.php'; // Include database connection

// SQL query to fetch average marks per session
$sql = "
    SELECT s.Session, AVG(t.marks) AS avg_marks
    FROM task_marks t
    JOIN Student s ON t.student_id = s.Student_id
    GROUP BY s.Session
";

// Execute the query
$result = $conn->query($sql);

// Prepare response data
$response = [];

if ($result->num_rows > 0) {
    // Fetch the data
    while($row = $result->fetch_assoc()) {
        $response[] = [
            'session' => $row['Session'],
            'avg_marks' => $row['avg_marks']
        ];
    }
} else {
    // No data found
    $response = ['error' => 'No data available'];
}

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode(['sessions' => $response]);

// Close the connection
$conn->close();
?>
