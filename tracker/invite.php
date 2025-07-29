<?php
// 🔹 Log the open
$logFile = 'opens.log';
$email = isset($_GET['email']) ? $_GET['email'] : 'unknown';
$time = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'];
$userAgent = $_SERVER['HTTP_USER_AGENT'];

file_put_contents($logFile, "$time | $email | $ip | $userAgent\n", FILE_APPEND);

// 🔹 Serve a 1x1 transparent pixel
header('Content-Type: image/png');
readfile('pixel.png');
exit;
?>
