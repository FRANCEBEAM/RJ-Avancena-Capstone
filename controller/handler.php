<?php

session_start();

require 'core.php';
// error_reporting(0);

$customer = new Customer;

if(isset($_POST['request'])){
    $data = json_decode($_POST['request'], true);

    if($data['type'] == 'products' && $data['key'] == 1)
        $customer->handle('products', '', '', '', '');
    else if($data['type'] == 'search')
        $customer->handle('search', '', $data['word'], $data['filter'], $data['sort']);
    else if($data['type'] == 'add')
        $customer->handle('add', $_POST['request'], '', '', '');
    else if($data['type'] == 'show-cart')
        $customer->handle('show-cart', '', '', '', '');
    else if($data['type'] == 'delete')
        $customer->handle('delete', $_POST['request'], '', '', '');
    else if($data['type'] == 'place-order')
        $customer->handle('place-order', $data['cart'], '', '', '');
    else if($data['type'] == 'show-orders')
        $customer->handle('show-orders', '', '', '', '');
    else if($data['type'] == 'theme')
        $_SESSION['theme'] = $data['theme'];
    else if($data['type'] == 'address')
        $_SESSION['address'] = $data['address'];
    else if($data['type'] == 'cancel-order')
        $customer->handle('cancel-order', $data['id'], $data['reason'], '', '');
    else if($data['type'] == 'shipping-info')
        $customer->handle('shipping-info', '', '', '', '');
    else if($data['type'] == 'extra-image')
        $customer->handle('extra-image', $data['items'], '', '', '');
}