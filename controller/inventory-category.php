<?php
require('../controller/classes.php');
error_reporting(0);
$db = new Database();
$str = new GenerateString();
$inv = new Inventory();
$link = $db->StartConnection();

$action = isset($_POST['action']) ? $_POST['action'] : isset($_POST['action']);

if(!empty($_POST['sessionID']) && $action == 'edit'){
    $prefix = $str->SEO(mysqli_real_escape_string($link, $_POST['category']));
    $rename = $str->SEO(mysqli_real_escape_string($link, $_POST['rename']));

    $category = $db->FetchSingleData("SELECT category FROM inventory WHERE prefix = '$prefix' LIMIT 1");

    $execute = $db->ExecuteQuery("UPDATE inventory SET category = '$rename' WHERE prefix = '$prefix'");

    if($execute){
        $data = [];
        $data['msg_title'] = 'Rename Success!';
        $data['msg_prompt'] = "CATEGORY <span class='text-danger fw-bolder h5'>$category</span> > <span class='text-success fw-bolder h5'>$rename</span>";
        $data['msg_notification'] = "<span class='text-dark fw-bolder h5'>Rename Success!</span><br>CATEGORY <span class='text-danger fw-bolder h6'>$category</span> > <span class='text-success fw-bolder h6'>$rename</span>";
        $data['msg_icon'] = 'success';
        header('Content-Type: application/json');
        echo json_encode($data);
        ;
    }else{
        $data = [];
        $data['msg_title'] = 'Rename Failed!';
        $data['msg_prompt'] = "CATEGORY <span class='text-danger fw-bolder h5'>$category</span> > <span class='text-success fw-bolder h5'>$rename</span> failed.";
        $data['msg_notification'] = "<span class='text-dark fw-bolder h5'>Rename Success!</span><br>CATEGORY <span class='text-danger fw-bolder h6'>$category</span> > <span class='text-success fw-bolder h6'>$rename</span> failed.";
        $data['msg_icon'] = 'warning';
        header('Content-Type: application/json');
        echo json_encode($data);
        ;
    }
}elseif(!empty($_POST['sessionID']) && $action == 'delete'){
    $prefix = $str->SEO(mysqli_real_escape_string($link, $_POST['category']));
    $username = $str->SEO(mysqli_real_escape_string($link, $_POST['username']));
    $password = $str->SEO(mysqli_real_escape_string($link, $_POST['password']));
    $category = $str->Alphanumeric_S($_POST['category']);

    if($db->FetchNumRows("SELECT userlevel FROM accounts WHERE username = '$username'") > 0){
        $hashed_password = $db->FetchSingleData("SELECT hashed_password FROM accounts WHERE username = '$username'");
        if(($userlevel = $db->FetchSingleData("SELECT userlevel FROM accounts WHERE username = '$username'")) == 'Administrator'){
            if(password_verify($password, $hashed_password)){
                $execute = $db->ExecuteQuery("DELETE FROM inventory WHERE prefix = '$prefix'");
                if($execute){
                    $data = [];
                    $data['msg_title'] = 'Delete Success!';
                    $data['msg_prompt'] = "CATEGORY <span class='text-success fw-bolder h5'>$category</span> is deleted successfully.";
                    $data['msg_notification'] = "<span class='text-dark fw-bolder h5'>Delete Success!</span><br>CATEGORY <span class='text-success fw-bolder h5'>$category</span> is deleted successfully.";
                    $data['msg_icon'] = 'success';
                    
                    $inv->ForceDeleteDirectory('../uploads/'.$prefix.'/');

                    header('Content-Type: application/json');
                    echo json_encode($data);
                    ;
                }
            }else{
                $data = [];
                $data['msg_title'] = "Incorrect Password!";
                $data['msg_prompt'] = "CATEGORY <span class='text-danger fw-bolder h5'>$category</span> is deleted unsuccessfully.";
                $data['msg_notification'] = "<span class='text-dark fw-bolder h5'>Incorrect Password!</span><br>CATEGORY <span class='text-danger fw-bolder h5'>$category</span> is deleted unsuccessfully.";
                $data['msg_icon'] = 'warning';
                header('Content-Type: application/json');
                echo json_encode($data);
                ;
            }
        }else{
            $data = [];
            $data['msg_title'] = 'Incorrect Userlevel!';
            $data['msg_prompt'] = "CATEGORY <span class='text-danger fw-bolder h5'>$category</span> is deleted unsuccessfully.";
            $data['msg_notification'] = "<span class='text-dark fw-bolder h5'>Incorrect Password!</span><br>CATEGORY <span class='text-danger fw-bolder h5'>$category</span> is deleted unsuccessfully.";
            $data['msg_icon'] = 'warning';
            header('Content-Type: application/json');
            echo json_encode($data);
            ;
        }
    }else{
        $data = [];
        $data['msg_title'] = 'Invalid Account!';
        $data['msg_prompt'] = "CATEGORY <span class='text-danger fw-bolder h5'>$category</span> is deleted unsuccessfully.";
        $data['msg_notification'] = "<span class='text-dark fw-bolder h5'>Incorrect Password!</span><br>CATEGORY <span class='text-danger fw-bolder h5'>$category</span> is deleted unsuccessfully.";
        $data['msg_icon'] = 'warning';
        header('Content-Type: application/json');
        echo json_encode($data);
        ;
    }

}
?>