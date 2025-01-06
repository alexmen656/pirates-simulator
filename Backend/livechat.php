<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header("Content-Type: application/json");
include 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    // Fetch messages
    $sql = "SELECT * FROM chat_messages ORDER BY timestamp ASC";
    $result = $conn->query($sql);

    $messages = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }
    }
    echo json_encode($messages);
} elseif ($method == 'POST') {
    // Save a new message
    $data = json_decode(file_get_contents('php://input'), true);
    $author = $data['author'];
    $message = $data['message'];
    $type = $data['type'];

    $sql = "INSERT INTO chat_messages (author, message, type) VALUES ('$author', '$message', '$type')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}

$conn->close();
?>