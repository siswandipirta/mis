<?php
$config = require 'config.php';
function base64url_encode($data){ return rtrim(strtr(base64_encode($data), '+/', '-_'), '='); }
$header = base64url_encode(json_encode(['alg'=>'HS256','typ'=>'JWT']));
$payload = base64url_encode(json_encode(['uid'=>1,'exp'=>time()+3600]));
$signature = base64url_encode(hash_hmac('sha256', "$header.$payload", $config['jwt_secret'], true));
echo "$header.$payload.$signature" . PHP_EOL;
?>