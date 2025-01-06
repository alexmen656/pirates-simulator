<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');

include 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $verification_id = $data['verification_id'] ?? '';
    $name = $data['name'] ?? '';
    $coordinate_x = $data['coordinate']['latitude'] ?? '';
    $coordinate_y = $data['coordinate']['longitude'] ?? '';

    if (empty($verification_id) || empty($name) || empty($coordinate_x) || empty($coordinate_y)) {
        echo json_encode(['error' => 'All fields are required']);
        exit;
    }

    // Look up the user ID based on the verification ID
    $stmt = $conn->prepare("SELECT id FROM users WHERE verification_id = ?");
    $stmt->bind_param("s", $verification_id);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();

    //Lookup name
    $stmt = $conn->prepare("SELECT name FROM users WHERE verification_id = ?");
    $stmt->bind_param("s", $verification_id);
    $stmt->execute();
    $stmt->bind_result($user_name);
    $stmt->fetch();
    $stmt->close();


    if (empty($user_id)) {
        echo json_encode(['error' => 'Invalid verification ID']);
        exit;
    }

    // Check if the user already has a base
    $stmt = $conn->prepare("SELECT COUNT(*) FROM bases WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($base_count);
    $stmt->fetch();
    $stmt->close();

    if ($base_count > 0) {
        echo json_encode(['error' => 'User already has a base']);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO bases (user_id, name, coordinate_x, coordinate_y) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isdd", $user_id, $name, $coordinate_x, $coordinate_y);

    if ($stmt->execute()) {
        $message = "User $user_name has created a new base called $name";
        $sql = "INSERT INTO chat_messages (author, message, type) VALUES ('System', '$message', 'system')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => 'Base created successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => $conn->error]);
        }
    } else {
        echo json_encode(['error' => 'Failed to create base']);
    }

    $stmt->close();
    $conn->close();
} elseif ($method === 'GET') {
    $verification_id = $_GET['verification_id'] ?? '';

    if (empty($verification_id)) {
        echo json_encode(['error' => 'Verification ID is required']);
        exit;
    }

    // Look up the user ID based on the verification ID
    $stmt = $conn->prepare("SELECT id FROM users WHERE verification_id = ?");
    $stmt->bind_param("s", $verification_id);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();

    if (empty($user_id)) {
        echo json_encode(['error' => 'Invalid verification ID']);
        exit;
    }

    // Retrieve the bases for the user
    $stmt = $conn->prepare("SELECT * FROM bases WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $bases = [];
    while ($row = $result->fetch_assoc()) {
        $bases[] = $row;
    }

    echo json_encode($bases);

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>