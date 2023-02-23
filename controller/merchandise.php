<?php

error_reporting(0);

session_start();

require 'classes.php';

$merchandise = new Merchandise;

if(isset($_POST['request'])){
    $data = json_decode($_POST['request'], true);

    if($data['key'] == 1){
        $merchandise->fetch_info('all', '');
    }
}

if(isset($_POST['search'])){
    $data = json_decode($_POST['search'], true);
    $merchandise->fetch_info('search', $data['word']);
}

if(isset($_POST['order'])){
    $merchandise->save_info($_POST['order']);
}

// $merchandise->save_info('{"ids":["rjavmb636de9225a989","rjavmb63775d5badf28","rjavmb63775c4195616","rjavmb63775daddfcf7"],"names":["Test Product 2","Test Product 4","Test Product 3","Test Product 5"],"quantities":[1,1,4,2],"subtotals":[56,75,223,192],"total":546,"shipping":null,"discount":null,"change":54,"address":"","finaltotal":546}');