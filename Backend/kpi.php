<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";
$user = require "middleware.php"; // 🔥 proteksi

$result = $conn->query("SELECT * FROM kpi_daily");

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);