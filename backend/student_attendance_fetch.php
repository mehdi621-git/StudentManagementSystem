<?php

// Enable cross-origin access
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

header("Content-Type: multipart/form-data");

// Include database connection
include_once 'db.php';

// Sample student ID
$studentId = $_GET['studentId'];
// Debugging: Log the start of the process
error_log("Fetching attendance for student ID: $studentId");

// SQL query to get the attendance summary for a specific student
$sql = "
    SELECT 
        t.FullName AS teacher_name,  -- Fetch teacher name from the teachers table
        COUNT(*) AS TotalClasses, 
        SUM(COALESCE(a.Present, 0)) AS PresentCount,  -- Ensure we handle NULL values
        ROUND(SUM(COALESCE(a.Present, 0)) / COUNT(*) * 100, 2) AS AttendancePercentage
    FROM 
        Attendance a
    JOIN 
        Teacher t ON a.teacher_id = t.id  -- Join with teachers table on teacher_id
    WHERE 
        a.Student_id = ?
    GROUP BY 
        a.teacher_id, t.FullName;
";

// Prepare the statement
$stmt = $conn->prepare($sql);
if (!$stmt) {
    error_log("SQL Preparation failed: " . $conn->error);
    die('Error preparing SQL query: ' . $conn->error);
}

// Bind the student ID parameter
$stmt->bind_param("s", $studentId); // "s" indicates string type for student ID

// Execute the query
if (!$stmt->execute()) {
    error_log("Error executing query: " . $stmt->error);
    die('Error executing query: ' . $stmt->error);
}

// Get the result
$result = $stmt->get_result();
if ($result === false) {
    error_log("Error fetching results: " . $stmt->error);
    die('Error fetching results: ' . $stmt->error);
}

// Fetch all rows and convert them into an array
$attendance = [];
while ($row = $result->fetch_assoc()) {
    $attendance[] = [
        'teacher_name' => $row['teacher_name'],
        'attendance_percentage' => $row['AttendancePercentage']
    ];
}

// Debugging: Log the attendance data
error_log("Attendance data: " . print_r($attendance, true));

// Close the database connection
$stmt->close();
$conn->close();

// Return the result as JSON
header('Content-Type: application/json');
echo json_encode($attendance);
?>
