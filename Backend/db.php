<?php
$config = require 'config.php';
$conn = new mysqli(
  $config['db']['host'],
  $config['db']['user'],
  $config['db']['pass'],
  $config['db']['name']
);
if ($conn->connect_error) {
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode(['error'=>'DB connection failed']);
  exit;
}
?>
