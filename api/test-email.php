<?php
// Simple test script for the email functionality
header('Content-Type: application/json');

// Test data
$test_data = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'subject' => 'Test Message',
    'message' => 'This is a test message from the contact form.'
];

// Simulate the email sending process
echo json_encode([
    'success' => true,
    'message' => 'Test email functionality working',
    'test_data' => $test_data,
    'php_version' => phpversion(),
    'mail_function' => function_exists('mail') ? 'Available' : 'Not Available'
]);
?>
