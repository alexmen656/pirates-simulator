<?php
include 'config.php';

// Read the JSON file
$jsonFilePath = __DIR__ . '/data/list.json';
$jsonData = file_get_contents($jsonFilePath);
$countries = json_decode($jsonData, true);

if ($countries === null) {
    die('Error decoding JSON');
}

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO countries (name, number) VALUES (?, ?)");

// Bind parameters
$stmt->bind_param("si", $name, $number);

// Insert each country into the database
foreach ($countries as $country) {
    $name = $country['name'];
    $number = $country['number'];
    $stmt->execute();
}

$stmt->close();
$conn->close();

echo "Countries have been imported successfully.";
?>