<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    exit(0);
}

// Correct syntax for setting the Content-Type header
header('Content-Type: application/json');  // Ensure the correct content type

include 'db.php'; // Include the DB connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read raw POST data (since it's sent as JSON)
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if the required fields are present
    if (isset($data['teacher_id'], $data['semester'], $data['subject'], $data['session'])) {
        // Fetch data from the decoded array
        $teacher_id = $data['teacher_id'];
        $semester = $data['semester'];
        $subject = $data['subject'];
        $session = $data['session'];

        // Validate input
        if (!empty($teacher_id) && !empty($semester) && !empty($subject) && !empty($session)) {
            // Prepare the SQL query to insert data into the Assignments table
            $stmt = $conn->prepare("INSERT INTO Assignments (teacher_id, semester, subject, session) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $teacher_id, $semester, $subject, $session);
            
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'Assignment created successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Error assigning teacher']);
            }
            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid data format']);
    }
}

$conn->close();
?>
