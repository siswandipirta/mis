<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "kpi_db");

$result = $conn->query("SELECT * FROM servers");

$data = [];
while($row = $result->fetch_assoc()){
  $data[] = $row;
}

echo json_encode($data);