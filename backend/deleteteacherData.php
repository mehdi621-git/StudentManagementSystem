<?php
// Include the database connection file
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

include 'db.php';  // Adjust the path if necessary

// Retrieve the 'id' parameter from the URL
$id = $_GET['id'];  // e.g., http://localhost/backend/UpdateteacherData.php?id=123

// Check if the 'id' is valid and numeric
if (isset($id) && is_numeric($id)) {
    // Start a transaction to ensure all queries execute successfully
    $conn->begin_transaction();

    try {
        // Delete teacher from the Teacher table
        $sql = "DELETE FROM Teacher WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        // Delete related assignments from Assignments table
        $sql = "DELETE FROM Assignments WHERE teacher_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        // Delete related attendance records from Attendance table
        $sql = "DELETE FROM Attendance WHERE teacher_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        // Delete related marks from task_marks table
        $sql = "DELETE FROM task_marks WHERE teacher_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();

        // Commit the transaction
        $conn->commit();

        // Return a success message as JSON
        echo json_encode(['message' => 'Teacher and related data deleted successfully']);
    } catch (Exception $e) {
        // Rollback the transaction in case of error
        $conn->rollback();
        echo json_encode(['error' => 'Error deleting teacher record or related data']);
    }

    // Close the prepared statement
    $stmt->close();
} else {
    echo json_encode(['error' => 'Invalid ID']);
}

// Close the database connection
$conn->close();
?>

