<?php
// Database credentials
$host = "localhost"; // Database host
$user = "root";      // MySQL username
$password = "";      // MySQL password
$database = "stdMangementSys"; // Database name

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to create the Teacher table
$tableCreationQuery = "
CREATE TABLE IF NOT EXISTS Teacher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(255) NOT NULL,
    Gender VARCHAR(10) NOT NULL,
    Experience VARCHAR(255),
    Designation VARCHAR(255),
    Qualification VARCHAR(255),
    Session VARCHAR(255) NOT NULL,
    DateOfBirth DATE NOT NULL,
    PhoneNo VARCHAR(20) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Address TEXT NOT NULL,
    Department VARCHAR(255) NOT NULL,
    ImagePath VARCHAR(255),
    JoiningDate DATE NOT NULL
);";

// Query to create the Student table
$studentCreationQuery = "
CREATE TABLE IF NOT EXISTS Student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ImagePath VARCHAR(255),
    FullName VARCHAR(255) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Gender VARCHAR(10) NOT NULL,
    Session VARCHAR(255) NOT NULL,
    PhoneNo VARCHAR(20) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Address TEXT NOT NULL,
    Student_id VARCHAR(255) NOT NULL UNIQUE,
    Department VARCHAR(255) NOT NULL,
    Admission_Date DATE NOT NULL,
    Study_type VARCHAR(255) NOT NULL,
    Student_type VARCHAR(255) NOT NULL,
    Course VARCHAR(255),
    PrevSkl VARCHAR(255) NOT NULL
);";

// Query to create the Fees table
$fee = "
CREATE TABLE IF NOT EXISTS fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    fee_amount DECIMAL(10, 2) NOT NULL,
    fee_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student(id) ON DELETE CASCADE ON UPDATE CASCADE
);";

// Query to create the Assignments table
$assign = "
CREATE TABLE IF NOT EXISTS Assignments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    teacher_id INT NOT NULL, 
    semester VARCHAR(100) NOT NULL,              
    subject VARCHAR(255) NOT NULL,               
    session VARCHAR(100) NOT NULL,           
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(id) ON DELETE CASCADE ON UPDATE CASCADE
);";

// Query to create the Attendance table
$attendence = "
CREATE TABLE IF NOT EXISTS Attendance (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    Student_id VARCHAR(255) NOT NULL, 
    teacher_id INT NOT NULL,     
    AttendanceDate DATE NOT NULL, 
    Present BOOLEAN NOT NULL
);";

// Query to create the student_marks table
$marks ="
CREATE TABLE IF NOT EXISTS tasks (
  task_id VARCHAR(50) PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    deadline DATE NOT NULL,
    teacher_name VARCHAR(255) NOT NULL,
    session VARCHAR(255) NOT NULL
);";
$mark_MArks ="
CREATE TABLE IF NOT EXISTS task_marks (
id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(255) NOT NULL,
  task_id VARCHAR(255) NOT NULL,
  marks INT,
  teacher_id INT NOT NULL,
  teacher_name VARCHAR(255) NOT NULL,
  UNIQUE(student_id, task_id) 
);";
$createUserTable = "
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";

// Execute the Teacher table creation query
if (!$conn->query($tableCreationQuery)) {
    die("Error creating Teacher table: " . $conn->error);
}

// Execute the Student table creation query
if (!$conn->query($studentCreationQuery)) {
    die("Error creating Student table: " . $conn->error);
}

// Execute the Fees table creation query
if (!$conn->query($fee)) {
    die("Error creating Fees table: " . $conn->error);
}

// Execute the Assign table creation query
if (!$conn->query($assign)) {
    die("Error creating Assign table: " . $conn->error);
}

// Execute the Attendance table creation query
if (!$conn->query($attendence)) {
    die("Error creating Attendance table: " . $conn->error);
}

// Execute the student_marks table creation query
if (!$conn->query($marks)) {
    die("Error creating student_marks table: " . $conn->error);
}
if (!$conn->query($mark_MArks)) {
    die("Error creating student_marks table: " . $conn->error);
}
if (!$conn->query($createUserTable)) {
    die("Error creating student_marks table: " . $conn->error);
}


?>



