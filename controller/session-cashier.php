<?php
error_reporting(0);
session_start();
require("../controller/classes.php");

header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

if($_SESSION['userLv'] != 'Cashier' && empty($_SESSION['userNo'])){
    session_destroy();
    header('Location: ../main/login.php');
}

$db = new Database();

if($settings = $db->Settings($_SESSION['userNo'])){
    $theme = $settings['theme'];
    $sidebar = $settings['interface'];
}


?>