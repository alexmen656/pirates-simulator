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

    // Retrieve the last coin transaction for the user
    $stmt = $conn->prepare("SELECT amount FROM coins WHERE user_id = ? ORDER BY created_at DESC LIMIT 1");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->bind_result($last_amount);
    $stmt->fetch();
    $stmt->close();

    if (!isset($last_amount)) {
        $last_amount = 0; // If no previous transaction, start from 0
    }

    // Calculate the new amount
    $new_amount = $last_amount + $amount;

    // Insert the new coin transaction
    $stmt = $conn->prepare("INSERT INTO coins (user_id, amount) VALUES (?, ?)");
    $stmt->bind_param("ii", $user_id, $new_amount);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Coins transaction recorded successfully', 'new_amount' => $new_amount]);
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

        // Retrieve the last coin transaction for the user
        $stmt = $conn->prepare("SELECT amount FROM coins WHERE user_id = ? ORDER BY created_at DESC LIMIT 1");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $stmt->bind_result($amount);
        $stmt->fetch();

        if (isset($amount)) {
            echo json_encode(['amount' => $amount]);
        } else {
            echo json_encode(['error' => 'No coin transactions found']);
        }

        $stmt->close();
        $conn->close();
    } elseif (isset($_GET['top_users'])) {
        // Retrieve the latest coin entry for each user
        $latest_entries = [];
        $stmt = $conn->prepare("
            SELECT user_id, MAX(id) as latest_id
            FROM coins
            GROUP BY user_id
        ");
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $latest_entries[$row['user_id']] = $row['latest_id'];
        }
        $stmt->close();

        // Retrieve the latest coin amounts for the top users
        $placeholders = implode(',', array_fill(0, count($latest_entries), '?'));
        $stmt = $conn->prepare("
            SELECT u.username, c.amount as latest_coins
            FROM users u
            JOIN coins c ON u.id = c.user_id
            WHERE c.id IN ($placeholders)
            ORDER BY latest_coins DESC
        ");
        $stmt->bind_param(str_repeat('i', count($latest_entries)), ...array_values($latest_entries));
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
?>