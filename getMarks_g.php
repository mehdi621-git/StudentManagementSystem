<?php
// attendance.php - Fetch attendance data for multiple students

header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

header("Content-Type: multipart/form-data");
// Include the database connection
include('db.php'); // Assuming you have a db.php for your database connection

$teacherId = isset($_GET['teacher_id']) ? intval($_GET['teacher_id']) : null;

if ($teacherId) {
    $sql = "SELECT * FROM task_marks WHERE teacher_id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $teacherId);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
        $stmt->close();
    } else {
        echo json_encode(['error' => 'Failed to prepare statement']);
    }
} else {
    echo json_encode(['error' => 'Invalid or missing teacher_id']);
}

$conn->close();
?>


