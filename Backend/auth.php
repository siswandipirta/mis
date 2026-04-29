<?php
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db.php";

$config = require 'config.php';
$SECRET_KEY = $config['jwt_secret']; // load from config

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

$stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
$stmt->bind_param("s", $username);
$stmt->execute();

$user = $stmt->get_result()->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {

    $payload = [
        "iss" => "MIS",
        "iat" => time(),
        "exp" => time() + (60 * 60), // 1 jam
        "user" => [
            "id" => $user['id'],
            "username" => $user['username'],
            "role" => $user['role']
        ]
    ];

    $jwt = JWT::encode($payload, $SECRET_KEY, 'HS256');

    echo json_encode([
        "token" => $jwt,
        "user" => $payload['user']
    ]);

} else {
    http_response_code(401);
    echo json_encode(["error" => "Login gagal"]);
}