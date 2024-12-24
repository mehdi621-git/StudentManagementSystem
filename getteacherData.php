<?php 
 

 header("Access-Control-Allow-Origin: *");

 if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
     header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
     header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
     exit(0);
 }
 
 header("Content-Type: multipart/form-data");
 include_once 'db.php';

 $query = "SELECT * FROM Teacher";  // Adjust the table name if necessary

 // Execute the query
 $result = $conn->query($query);
 
 // Check if any records are returned
 if ($result->num_rows > 0) {
     // Initialize an empty array to hold the teacher data
     $teachers = array();
 
     // Fetch each record and push to the $teachers array
     while ($row = $result->fetch_assoc()) {
         $teachers[] = $row;
     }
 
     // Return the data as JSON
     echo json_encode($teachers);
 } else {
     // If no teachers found, return an empty array
     echo json_encode(["error" => "No teacher found"]);
 }
 
 // Close the database connection
 $conn->close();
?>
