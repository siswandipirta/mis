<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM kpi_daily ORDER BY date DESC");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("INSERT INTO kpi_daily(date, uptime) VALUES(?,?)");
    $stmt->bind_param("sd", $data['date'], $data['uptime']);
    $stmt->execute();

    echo json_encode(["status"=>"ok"]);
}