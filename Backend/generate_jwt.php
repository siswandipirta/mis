<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	http_response_code(200);
	exit();
}

$config = require 'config.php';
function base64url_encode($data){ return rtrim(strtr(base64_encode($data), '+/', '-_'), '='); }
$header = base64url_encode(json_encode(['alg'=>'HS256','typ'=>'JWT']));
$payload = base64url_encode(json_encode(['uid'=>1,'exp'=>time()+3600]));
$signature = base64url_encode(hash_hmac('sha256', "$header.$payload", $config['jwt_secret'], true));
echo "$header.$payload.$signature" . PHP_EOL;
?>