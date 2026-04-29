<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}
header("Content-Type: application/json");

// ambil IP (optional)
$host = $_GET['ip'] ?? '192.166.32.1';

// ===== PING =====
$ping = shell_exec("ping -n 1 $host");
$status = strpos($ping, "TTL=") !== false ? "UP" : "DOWN";

// ===== CPU =====
$cpuLoad = shell_exec("wmic cpu get loadpercentage /value");
preg_match('/LoadPercentage=(\d+)/', $cpuLoad, $cpuMatch);
$cpu = $cpuMatch[1] ?? 0;

// ===== RAM =====
$ram = shell_exec("wmic OS get FreePhysicalMemory,TotalVisibleMemorySize /Value");

preg_match('/FreePhysicalMemory=(\d+)/', $ram, $freeMatch);
preg_match('/TotalVisibleMemorySize=(\d+)/', $ram, $totalMatch);

$free = $freeMatch[1] ?? 0;
$total = $totalMatch[1] ?? 1;

$ramUsed = round((($total - $free) / $total) * 100);

// ===== OUTPUT =====
echo json_encode([
  "status" => $status,
  "cpu" => (int)$cpu,
  "ram" => (int)$ramUsed
]);