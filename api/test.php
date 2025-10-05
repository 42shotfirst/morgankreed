<?php
header('Content-Type: application/json');

$response = [
    'status' => 'success',
    'message' => 'PHP is working correctly',
    'server_info' => [
        'php_version' => phpversion(),
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
        'request_method' => $_SERVER['REQUEST_METHOD'],
        'mail_function' => function_exists('mail') ? 'Available' : 'Not Available'
    ],
    'timestamp' => date('Y-m-d H:i:s T')
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>
