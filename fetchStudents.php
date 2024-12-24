<?php
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

header("Content-Type: multipart/form-data");
// Include the database connection
require_once 'db.php'; // This now provides $conn as your connection

// Get the search parameter if provided
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';

// SQL query to fetch students and their fee details
$query = "
    SELECT s.id, s.FullName, s.Department, f.fee_amount, f.fee_date 
    FROM Student s 
    LEFT JOIN fees f ON s.id = f.student_id
    WHERE s.FullName LIKE '%$search%'
    ORDER BY s.id, f.fee_date DESC
";

$result = $conn->query($query);

if (!$result) {
    die(json_encode(["error" => "Query failed: " . $conn->error]));
}

$students = [];
while ($row = $result->fetch_assoc()) {
    $id = $row['id'];
    if (!isset($students[$id])) {
        $students[$id] = [
            "id" => $id,
            "FullName" => $row['FullName'],
            "Department" => $row['Department'],
            "fees" => []
        ];
    }
    if ($row['fee_amount'] !== null) {
        $students[$id]['fees'][] = [
            "amount" => $row['fee_amount'],
            "date" => $row['fee_date']
        ];
    }
}

echo json_encode(array_values($students));
?>




