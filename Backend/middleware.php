<?php
require 'auth.php';
$config = require 'config.php';

$headers = getallheaders();
// Dev bypass: allow local testing with ?dev=1 from localhost
if (isset($_GET['dev']) && $_GET['dev'] === '1' && in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1','::1'])){
  // skip auth for local development
  return;
}
if(!isset($headers['Authorization'])){
  http_response_code(401);
  header('Content-Type: application/json');
  echo json_encode(['error'=>'No token']);
  exit;
}
$token = str_replace('Bearer ','',$headers['Authorization']);
$payload = verify_jwt($token, $config['jwt_secret']);
if(!$payload || $payload['exp'] < time()){
  http_response_code(401);
  header('Content-Type: application/json');
  echo json_encode(['error'=>'Invalid token']);
  exit;
}
?>
