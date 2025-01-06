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
    $amount = $data['amount'] ?? '';

    if (empty($verification_id) || !is_numeric($amount)) {
        echo json_encode(['error' => 'Verification ID and amount are required']);
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

    // Insert the coin transaction
    $stmt = $conn->prepare("INSERT INTO coins (user_id, amount) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $amount);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Coins transaction recorded successfully']);
    } else {
        echo json_encode(['error' => 'Failed to record coins transaction']);
    }

    $stmt->close();
    $conn->close();
} elseif ($method === 'GET') {
    if (isset($_GET['verification_id'])) {
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

        // Retrieve the coin transactions for the user
        $stmt = $conn->prepare("SELECT amount, created_at FROM coins WHERE user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $transactions = [];
        while ($row = $result->fetch_assoc()) {
            $transactions[] = $row;
        }

        echo json_encode($transactions);

        $stmt->close();
        $conn->close();
    } elseif (isset($_GET['top_users'])) {
        // Retrieve the top 5 users with the most coins
        $stmt = $conn->prepare("
            SELECT u.username, SUM(c.amount) as total_coins
            FROM users u
            JOIN coins c ON u.id = c.user_id
            GROUP BY u.id
            ORDER BY total_coins DESC
            LIMIT 5
        ");
        $stmt->execute();
        $result = $stmt->get_result();

        $top_users = [];
        while ($row = $result->fetch_assoc()) {
            $top_users[] = $row;
        }

        echo json_encode($top_users);

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['error' => 'Invalid request parameters']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>