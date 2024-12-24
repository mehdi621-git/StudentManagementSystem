<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    exit(0);
}

header('Content-Type: application/json'); // Set the correct content type

include 'db.php'; // Include your database connection file

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data)) {
    echo json_encode(['success' => false, 'message' => 'No data provided']);
    exit;
}

foreach ($data as $record) {
    $student_id = $conn->real_escape_string($record['student_id']);
    $teacher_id = $conn->real_escape_string($record['teacher_id']);  // Get teacher_id
    $date = $conn->real_escape_string($record['date']);
    $present = $record['present'] ? 1 : 0;

    // Check if attendance for this student on this date already exists
    $checkSql = "SELECT * FROM Attendance WHERE Student_id = '$student_id' AND AttendanceDate = '$date'";
    $checkResult = $conn->query($checkSql);

    if ($checkResult && $checkResult->num_rows > 0) {
        // Record already exists, skip insertion
        echo json_encode(['success' => false, 'message' => "Attendance already marked for student ID $student_id on $date."]);
        exit; // Move to the next record
    }

    // Insert attendance record
    $sql = "INSERT INTO Attendance (Student_id, teacher_id, AttendanceDate, Present) 
            VALUES ('$student_id', '$teacher_id', '$date', $present)";

    if (!$conn->query($sql)) {
        // Return error message if query fails
        echo json_encode(['success' => false, 'message' => 'Error inserting data: ' . $conn->error]);
        exit;
    }
}

// Return success message if all records were processed successfully
echo json_encode(['success' => true, 'message' => 'Attendance saved successfully']);

$conn->close(); // Close the database connection
?>

