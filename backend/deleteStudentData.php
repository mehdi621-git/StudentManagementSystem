<?php
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

include 'db.php';

// Retrieve the 'id' parameter from the URL (e.g., http://localhost/backend/deleteStudentData.php?id=123)
$id = $_GET['id'];

// Check if the 'id' is valid and numeric
if (isset($id) && is_numeric($id)) {
    // Start transaction to handle dependent records
    $conn->begin_transaction();

    try {
        // Step 1: Delete fees record (if required)
        $deleteFeesSql = "DELETE FROM fees WHERE student_id = ?";
        $deleteFeesStmt = $conn->prepare($deleteFeesSql);
        $deleteFeesStmt->bind_param("i", $id);
        $deleteFeesStmt->execute();
        $deleteFeesStmt->close();

        // Step 2: Delete assignments (if assigned to student)
        $deleteAssignmentsSql = "DELETE FROM Assignments WHERE teacher_id IN (SELECT teacher_id FROM Attendance WHERE Student_id = ?)";
        $deleteAssignmentsStmt = $conn->prepare($deleteAssignmentsSql);
        $deleteAssignmentsStmt->bind_param("i", $id);
        $deleteAssignmentsStmt->execute();
        $deleteAssignmentsStmt->close();

        // Step 3: Delete attendance records
        $deleteAttendanceSql = "DELETE FROM Attendance WHERE Student_id = ?";
        $deleteAttendanceStmt = $conn->prepare($deleteAttendanceSql);
        $deleteAttendanceStmt->bind_param("i", $id);
        $deleteAttendanceStmt->execute();
        $deleteAttendanceStmt->close();

        // Step 4: Delete marks related to tasks for this student
        $deleteMarksSql = "DELETE FROM task_marks WHERE student_id = ?";
        $deleteMarksStmt = $conn->prepare($deleteMarksSql);
        $deleteMarksStmt->bind_param("i", $id);
        $deleteMarksStmt->execute();
        $deleteMarksStmt->close();

        // Step 5: Delete the student record itself
        $deleteStudentSql = "DELETE FROM Student WHERE id = ?";
        $deleteStudentStmt = $conn->prepare($deleteStudentSql);
        $deleteStudentStmt->bind_param("i", $id);
        $deleteStudentStmt->execute();
        $deleteStudentStmt->close();

        // Commit transaction
        $conn->commit();

        // Return success message as JSON
        echo json_encode(['message' => 'Student record and related data deleted successfully']);
    } catch (Exception $e) {
        // Rollback transaction on failure
        $conn->rollback();
        echo json_encode(['error' => 'Error deleting student record: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid ID']);
}

// Close the database connection
$conn->close();
?>


