<?php
return [
  'db' => [
    'host' => 'localhost',
    'user' => 'root',
    'pass' => '',
    'name' => 'kpi_db'
  ],
  // Use a sufficiently long secret for HS256 (replace with env var in production)
  'jwt_secret' => 'a9f3b7d1e6c4f8a2b5d9c3e7f1a6b4c8d2e9f0a1b3c5d7e8f9a0b2c4d6e8f0'
];
?>