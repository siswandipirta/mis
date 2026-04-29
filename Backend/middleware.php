<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$config = require 'config.php';
$SECRET_KEY = $config['jwt_secret'];

// CORS (make middleware return CORS headers for protected endpoints)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get Authorization header robustly (different servers expose it differently)
$headers = [];
if (function_exists('getallheaders')) {
    $headers = getallheaders();
}

$authHeader = '';
foreach ($headers as $k => $v) {
    if (strtolower($k) === 'authorization') {
        $authHeader = $v;
        break;
    }
}

if (empty($authHeader) && !empty($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
}

if (empty($authHeader) && function_exists('apache_request_headers')) {
    $req = apache_request_headers();
    foreach ($req as $k => $v) {
        if (strtolower($k) === 'authorization') {
            $authHeader = $v;
            break;
        }
    }
}

if (empty($authHeader)) {
    http_response_code(401);
    echo json_encode(["error" => "Token tidak ada"]);
    exit;
}

$token = trim(str_replace("Bearer", "", $authHeader));

try {
    $decoded = JWT::decode($token, new Key($SECRET_KEY, 'HS256'));
    return $decoded;
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["error" => "Token tidak valid"]);
    exit;
}