<?php
// CORS for browser requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

require 'db.php';
require 'middleware.php';
require 'fpdf.php';

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',14);
$pdf->Cell(0,10,'KPI Monthly Report',0,1);

$res = $conn->query('SELECT date, uptime FROM kpi_daily');
if(!$res){
  http_response_code(500);
  header('Content-Type: application/json');
  echo json_encode(['error'=>$conn->error]);
  exit;
}

header('Content-Type: application/pdf');
while($r=$res->fetch_assoc()){
  $pdf->Cell(0,8,$r['date'].' - Uptime: '.$r['uptime'].'%',0,1);
}
$pdf->Output();
?>