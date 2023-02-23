<?php

session_start();

// kunwari successful login
$_SESSION['user_id'] = '564dns545jdns2323asjd89njd2d';
$_SESSION['logged_in'] = true;
$_SESSION['username'] = 'test_customer_0';
$_SESSION['name'] = 'Test N. Customer';
$_SESSION['address'] = 'Blk 69 Lot 69 Area 69 City 69 Province 69 Country 69';
// $_SESSION['slink'] = uniqid();
$_SESSION['theme'] = 'light';

if((!isset($_SESSION['logged_in'])) || ($_SESSION['logged_in'] == false)){
    session_destroy();
    header('Location: /main/login.php');
} else {
    header('Location: /customer/index.php');
}

?>