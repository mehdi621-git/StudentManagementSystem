<?php

include 'db.php';

$adminEmail = 'admin@example.com'; // Set the admin email
$adminRole = 'admin';  // Set the role
$adminPassword = 'admin123'; // The password you want to hash and store

// Hash the password using bcrypt
$hashedPassword = password_hash($adminPassword, PASSWORD_BCRYPT);

// SQL to insert admin credentials
$sql = "INSERT INTO User (email, role, password) VALUES (?, ?, ?)";

// Prepare and bind the statement
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $adminEmail, $adminRole, $hashedPassword);

// Execute the statement and check for success
if ($stmt->execute()) {
    echo "Admin credentials have been successfully stored!";
} else {
    echo "Error: " . $stmt->error;
}

// Close the connection
$stmt->close();
$conn->close();
?>
