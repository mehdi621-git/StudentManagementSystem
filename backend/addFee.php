<?php 

header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    exit(0);
}

header("Content-Type: application/json");
include('db.php'); // Include your separate database connection file

// Ensure connection to the database is successful
if ($conn->connect_error) {
    die(json_encode(["error" => $conn->connect_error]));
}

// Get data from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Validate the required fields in the input data
if (!isset($data['student_id'], $data['fee_amount'], $data['fee_date'])) {
    echo json_encode(["error" => "Invalid input"]);
    exit;
}

$student_id = $conn->real_escape_string($data['student_id']);
$fee_amount = $conn->real_escape_string($data['fee_amount']);
$fee_date = $conn->real_escape_string($data['fee_date']);

// Prepare the query to insert fee details into the database
$query = "INSERT INTO fees (student_id, fee_amount, fee_date) VALUES ('$student_id', '$fee_amount', '$fee_date')";

// Execute the query and check for success
if ($conn->query($query)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => $conn->error]);
}

?>
