<?php


    require('../controller/classes.php');
    error_reporting(0);
    $db = new Database();
    $img = new Inventory();

    $conn = $db->StartConnection();

    if(isset($_POST['account_id'])){

        $account_id = mysqli_real_escape_string($conn, $_POST['account_id']);

        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        $db->ExecuteQuery("UPDATE accounts SET username = '$username', hashed_password = '$hashed_password' WHERE accnum = '$account_id'");
    }
    
    if(isset($_POST['personal_id'])){

        var_dump($_POST);
        $personal_id = mysqli_real_escape_string($conn, $_POST['personal_id']);

        $firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
        $lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $contact = mysqli_real_escape_string($conn, $_POST['contact']);
        $house = mysqli_real_escape_string($conn, $_POST['house']);
        $street = mysqli_real_escape_string($conn, $_POST['street']);
        $barangay = mysqli_real_escape_string($conn, $_POST['barangay']);

        $db->ExecuteQuery("UPDATE accounts SET firstname = '$firstname', lastname = '$lastname', email = '$email', contact = '$contact', house = '$house', street = '$street', barangay = '$barangay' WHERE accnum = '$personal_id'");

    }

    if(isset($_FILES['file']['name']) && isset($_POST['image_id'])){
        $image_id = mysqli_real_escape_string($conn, $_POST['image_id']);
        $dir = "../profile/$image_id/";
        mkdir($dir);
        $file = $img->ReplaceProfile($dir, $image_id, true);

        $profilesrc = $dir.$file;

        $db->ExecuteQuery("UPDATE accounts SET profilesrc = '$profilesrc', profilename = '$file' WHERE accnum = '$image_id'");
    }


    if(isset($_POST['address1'])){
        session_start();
        
        $user = $_POST['userNo'];
        $address1 = $db->PostSecure($_POST['address1']);
        $db->ExecuteQuery("UPDATE accounts SET `address` = '$address1' WHERE accnum = '$user'");
        echo 'success '.$address1.$user;
    }
    
    if(isset($_POST['address2'])){
        session_start();
        
        $user = $_POST['userNo'];
        $address2 = $db->PostSecure($_POST['address2']);
        $db->ExecuteQuery("UPDATE accounts SET `address_2` = '$address2' WHERE accnum = '$user'");
        echo 'success '.$address2 . $user;
    }
?>