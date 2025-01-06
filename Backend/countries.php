<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'config.php';

// Fetch the data from the database
$sql = "SELECT name, number FROM countries";
$result = $conn->query($sql);

$countryNumbers = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $countryNumbers[$row['name']] = $row['number'];
    }
} else {
    echo json_encode(['message' => 'No countries found']);
    exit;
}

// Read the GeoJSON file
$jsonFilePath = __DIR__ . '/data/countries.geojson';
if (!file_exists($jsonFilePath)) {
    echo json_encode(['error' => 'GeoJSON file not found']);
    exit;
}

$jsonData = file_get_contents($jsonFilePath);
$geojson = json_decode($jsonData, true);

// Add the number from the database to feature->properties->number
foreach ($geojson['features'] as &$feature) {
    $country = $feature['properties']['name'];
    $feature['properties']['number'] = isset($countryNumbers[$country]) ? $countryNumbers[$country] : 0;
}

// Return the updated GeoJSON as JSON response
echo json_encode($geojson);
?>