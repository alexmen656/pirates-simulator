<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header("Content-Type: application/json");
include 'config.php';

function generateUniqueId($length = 16)
{
    return bin2hex(random_bytes($length / 2));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';

    if (empty($username)) {
        echo json_encode(['error' => 'Username is required']);
        exit;
    }

    // Check if username already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    if ($count > 0) {
        echo json_encode(['error' => 'Username is already taken']);
        exit;
    }

    $verification_id = generateUniqueId();

    $stmt = $conn->prepare("INSERT INTO users (verification_id, username) VALUES (?, ?)");
    $stmt->bind_param("ss", $verification_id, $username);
    if ($stmt->execute()) {
        // Get the user ID of the newly registered user
        $user_id = $stmt->insert_id;

        // Insert the coin transaction -> User gets free 1500 coins
        $amount = 1500;
        $stmt = $conn->prepare("INSERT INTO coins (user_id, amount) VALUES (?, ?)");
        $stmt->bind_param("ii", $user_id, $amount);
        if ($stmt->execute()) {
            $message = "User $user_name has created a new base called $name";
            $sql = "INSERT INTO chat_messages (author, message, type) VALUES ('System', '$message', 'system')";
            if ($conn->query($sql) === TRUE) {
                echo json_encode(['verification_id' => $verification_id]);
            } else {
                echo json_encode(['status' => 'error', 'message' => $conn->error]);
            }
        } else {
            echo json_encode(['error' => 'Failed to add initial coins']);
        }
    } else {
        echo json_encode(['error' => 'Failed to register user']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>