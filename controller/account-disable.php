<?php
    require('../controller/classes.php');

    $db = new Database();

    if(isset($_POST['id']) && isset($_POST['sessionID']) && isset($_POST['action'])){
        if($_POST['action'] == 'disable'){

            $sessionID = $_POST['sessionID'];
            $id = $_POST['id'];
            $username = $_POST['username'];

            $data = [];

            if($sessionID == $db->FetchSingleData("SELECT primary_admin FROM system_settings LIMIT 1")){
                

                $db->ExecuteQuery("UPDATE accounts SET status = 'Disabled' WHERE id = '$id' AND username = '$username'");

                $data['msg_title'] = "Disable Success";
                $data['msg_prompt'] = "USER <span class=\"text-success fw-bolder h5\">$username</span> is disabled successfully.";
                $data['msg_notification'] = "<span class=\"text-dark fw-bolder h5\">Disable Success!<br></span><span class=\"text-success fw-bolder h6\">$username</span> is disabled successfully.";
                $data['msg_icon'] = "success";
            }else{

                $data['msg_title'] = "Disable Failed!";
                $data['msg_prompt'] = "USER <span class='text-success fw-bolder h5'>$username</span> is disabled unsuccessfully.";
                $data['msg_notification'] = "<span class='text-dark fw-bolder h5'>Disable Failed!<br></span><span class='text-success fw-bolder h6'>$username</span> is disabled unsuccessfully.";
                $data['msg_icon'] = "warning";
            }

            header('Content-Type: application/json');
            echo json_encode($data);

        }
    }

?>