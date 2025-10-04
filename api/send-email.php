<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'message'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit();
    }
}

// Sanitize input
$name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');
$subject = isset($input['subject']) ? htmlspecialchars(trim($input['subject']), ENT_QUOTES, 'UTF-8') : 'Contact Form Message';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Email configuration
$to = 'morgan@morgankreed.com';
$email_subject = "[Portfolio Contact] " . $subject;
$from_email = 'noreply@' . ($_SERVER['HTTP_HOST'] ?? 'morgankreed.com'); // Dynamic domain
$from_name = 'Portfolio Contact Form';

// Create email body
$email_body = "
New message from your portfolio contact form:

Name: $name
Email: $email
Subject: $subject

Message:
$message

---
Sent from: " . $_SERVER['HTTP_HOST'] . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
Timestamp: " . date('Y-m-d H:i:s T') . "
";

// Email headers
$headers = [
    'From: ' . $from_name . ' <' . $from_email . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email
$mail_sent = mail($to, $email_subject, $email_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log the message (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Message from: $name ($email) - Subject: $subject\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message. Please try again or contact directly at morgan@morgankreed.com'
    ]);
}
?>
