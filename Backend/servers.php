<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "kpi_db");

$result = $conn->query("SELECT * FROM servers");

$data = [];
while($row = $result->fetch_assoc()){
  $data[] = $row;
}

echo json_encode($data);