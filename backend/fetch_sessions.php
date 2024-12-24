<?php
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

header("Content-Type: multipart/form-data");
// Include the database connection
include('db.php');

if (isset($_GET['teacherId'])) {
    $teacherId = $_GET['teacherId'];

    // SQL query to fetch sessions with students grouped by session
    $sql = "
        SELECT 
            t.Session AS session,
            s.FullName AS StudentName,
            s.Email AS StudentEmail,
            s.Department AS StudentDepartment,
            s.ImagePath AS StudentImage,
            s.Student_type AS StudentType,
            s.Gender AS StudentGender,
            s.Student_id AS StudentId -- Include Student_id
        FROM Assignments t
        LEFT JOIN Student s ON t.session = s.Session
        WHERE t.teacher_id = ?  -- Use teacher_id to filter by teacher ID
        ORDER BY t.session, s.FullName;
    ";

    // Prepare and execute the query
    try {
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $teacherId); // 'i' indicates the parameter is an integer
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $sessions = [];

            // Fetch the data and group students by session
            while ($row = $result->fetch_assoc()) {
                // If the session is not already in the sessions array, add it
                if (!isset($sessions[$row['session']])) {  // Use 'session' here to match column name
                    $sessions[$row['session']] = [
                        'Session' => $row['session'],  // Correct column name for session
                        'Department' => $row['StudentDepartment'], // Assuming all students in the session have the same department
                        'Students' => []
                    ];
                }

                // Add the student to the appropriate session, including Student_id
                $sessions[$row['session']]['Students'][] = [
                    'StudentId' => $row['StudentId'], // Add Student_id to the student data
                    'StudentName' => $row['StudentName'],
                    'StudentEmail' => $row['StudentEmail'],
                    'StudentImage' => $row['StudentImage'],
                    'StudentType' => $row['StudentType'],
                    'StudentGender' => $row['StudentGender'] // Add Gender here
                ];
            }

            // Return the data as JSON
            echo json_encode(array_values($sessions)); // Convert associative array to indexed array
        } else {
            echo json_encode(["message" => "No students found for this teacher"]);
        }
    } catch (mysqli_sql_exception $e) {
        echo json_encode(["error" => "Error fetching data: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Teacher ID is required"]);
}
?>






