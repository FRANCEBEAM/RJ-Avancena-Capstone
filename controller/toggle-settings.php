<?php
require ("../controller/classes.php");

$database = new Database();

if(isset($_POST['sessionID'])){
    $sessionID = $_POST['sessionID'];
    if(isset($_POST['merchandise'])){
        $merchandise = $_POST['merchandise'];
        $database->ExecuteQuery("UPDATE settings SET merchandise = '$merchandise' WHERE accnum = '$sessionID';");
    }if(isset($_POST['inventory'])){
        $inventory = $_POST['inventory'];
        $database->ExecuteQuery("UPDATE settings SET inventory = '$inventory' WHERE accnum = '$sessionID';");
    }if(isset($_POST['accounts'])){
        $accounts = $_POST['accounts'];
        $database->ExecuteQuery("UPDATE settings SET accounts = '$accounts' WHERE accnum = '$sessionID';");
    }if(isset($_POST['transactions'])){
        $transactions = $_POST['transactions'];
        $database->ExecuteQuery("UPDATE settings SET transactions = '$transactions' WHERE accnum = '$sessionID';");
    }if(isset($_POST['theme'])){
        $theme = $_POST['theme'];
        $database->ExecuteQuery("UPDATE settings SET theme = '$theme' WHERE accnum = '$sessionID';");
    }if(isset($_POST['volume'])){
        $volume = $_POST['volume'] / 100;
        $database->ExecuteQuery("UPDATE settings SET volume = '$volume' WHERE accnum = '$sessionID';");
    }if(isset($_POST['rowcount'])){
        $rowcount = $_POST['rowcount'];
        $database->ExecuteQuery("UPDATE settings SET rowcount = '$rowcount' WHERE accnum = '$sessionID';");
    }if(isset($_POST['alert'])){
        $alert = $_POST['alert'];
        $database->ExecuteQuery("UPDATE settings SET alert = '$alert' WHERE accnum = '$sessionID';");
    }if(isset($_POST['itemsPerRow'])){
        $itemsPerRow = $_POST['itemsPerRow'];
        $database->ExecuteQuery("UPDATE settings SET itemsPerRow = '$itemsPerRow' WHERE accnum = '$sessionID';");
    }if(isset($_POST['interface'])){
        $interface = $_POST['interface'];
        $database->ExecuteQuery("UPDATE settings SET interface = '$interface' WHERE accnum = '$sessionID';");
    }if(isset($_POST['row_acc'])){
        $rowcount = $_POST['row_acc'];
        $database->ExecuteQuery("UPDATE settings SET row_acc = '$rowcount' WHERE accnum = '$sessionID';");
    }if(isset($_POST['row_inv'])){
        $rowcount = $_POST['row_inv'];
        $database->ExecuteQuery("UPDATE settings SET row_inv = '$rowcount' WHERE accnum = '$sessionID';");
    }if(isset($_POST['row_ord'])){
        $rowcount = $_POST['row_ord'];
        $database->ExecuteQuery("UPDATE settings SET row_ord = '$rowcount' WHERE accnum = '$sessionID';");
    }
}

