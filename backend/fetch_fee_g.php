<?php
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS,DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}
header('Content-Type: application/json');
// attendance.php
include 'db.php';


// SQL query to calculate paid and remaining attendance for each session
$query = "
    SELECT 
        s.Session AS session,
        COUNT(CASE WHEN a.fee_amount > 0 THEN 1 END) AS paid,
        COUNT(CASE WHEN a.fee_amount = 0 THEN 1 END) AS remaining
    FROM fees a
    JOIN Student s ON a.student_id = s.id
    GROUP BY s.Session
";

$result = $conn->query($query);

if ($result) {
    $sessions = [];

    // Fetch all rows from the result set
    while ($row = $result->fetch_assoc()) {
        $sessions[] = $row;
    }

    // Return data in JSON format
    echo json_encode(['sessions' => $sessions]);
} else {
    echo json_encode(['error' => $conn->error]);
}

// Close the connection
$conn->close();
?>

