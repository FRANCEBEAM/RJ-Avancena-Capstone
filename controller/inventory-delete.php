<?php
require("../controller/classes.php");
error_reporting(0);
$inventory = new Inventory();
$database = new Database();

$link = $database->StartConnection();
$data = [];

if(isset($_POST['serial'])){

        $serial = mysqli_real_escape_string($link, $_POST['serial']);
        $sessionID = mysqli_real_escape_string($link, $_POST['sessionID']);
        $settings = $database->Settings($sessionID);
        $data['s_alert'] = $settings['alert'];
        
        if(!empty($serial)){
            $sqlSelectedBySerial = "SELECT filedir, filesrc, prefix, filename FROM inventory WHERE serialnumber = '$serial' LIMIT 1";
            $sqlExecuteSelectedBySerial = mysqli_query($link, $sqlSelectedBySerial);

            if(mysqli_num_rows($sqlExecuteSelectedBySerial) == 1){
                while($row = mysqli_fetch_array($sqlExecuteSelectedBySerial)){
                    $filename = $row["filename"];
                    $filedir = $row["filedir"];
                    $filesrc = $row["filesrc"];
                    $prefix = $row["prefix"];

                    if($filename != 'DEFAULT'){
                        unlink($filesrc);
                        rmdir($filedir);
                    }

                    $sqlDeleteBySerial = "DELETE FROM inventory WHERE serialnumber = '$serial' ";
                    $sqlExecuteDeletePerID = mysqli_query($link, $sqlDeleteBySerial);

                    if($sqlExecuteDeletePerID){
                        // $inventory->DeleteCategory($prefix);

                        $data['msg_title'] = 'Delete Success!';
                        $data['msg_prompt'] = '<span class="text-success fw-bolder h5">'.$serial.'</span> is deleted successfully.';
                        $data['msg_notification'] = '<span class="text-dark fw-bolder h5">Delete Success!</span><br><span class="text-success fw-bolder h5">'.$serial.'</span> is deleted successfully.';
                        $data['msg_icon'] = 'success';
                        header('Content-Type: application/json');
                        echo json_encode($data);
                        
                    }else{
                        $data['msg_title'] = 'Delete Failed!';
                        $data['msg_prompt'] = '<span class=\"text-success fw-bolder h5\">'.$serial.'</span> is deleted unsuccessfully.';
                        $data['msg_notification'] = '<span class="text-dark fw-bolder h5">Delete Failed!</span><br><span class=\"text-success fw-bolder h6\">'.$serial.'</span> is deleted unsuccessfully.';
                        $data['msg_icon'] = 'error';
                        header('Content-Type: application/json');
                        echo json_encode($data);
                        
                    }
                }
            }


        }elseif(empty($serial)){
            $data['msg_title'] = 'Delete Failed!';
            $data['msg_prompt'] = '<span class="text-success fw-bolder h5">'.$serial.'</span> is missing';
            $data['msg_notification'] = '<span class="text-dark fw-bolder h5">Delete Failed!</span><br><span class="text-success fw-bolder h5">'.$serial.'</span> is missing';
            $data['msg_icon'] = 'error';
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }
    }elseif(isset($_POST['id'])){

        $id = $_POST['id'];

        if(!empty($id)){

        $array_id = implode(', ' , $id);
        $del = count($id);

        $sqlSelectPerID = "SELECT filedir, filesrc, prefix, filename FROM inventory WHERE id IN($array_id)";
        $sqlExecuteSelectPerID = mysqli_query($link, $sqlSelectPerID);

        if(mysqli_num_rows($sqlExecuteSelectPerID) > 0){
            while($row = mysqli_fetch_array($sqlExecuteSelectPerID)){
                $filename = $row["filename"];
                $filedir = $row["filedir"];
                $filesrc = $row["filesrc"];
                $prefix = $row["prefix"];
                if($filename != 'DEFAULT'){
                    unlink($filesrc);
                    rmdir($filedir);
                }
            }
        }

        $sqlDeletePerID = "DELETE FROM `inventory` WHERE id IN($array_id) ";
        $sqlExecuteDeletePerID = mysqli_query($link, $sqlDeletePerID);

        if($sqlExecuteDeletePerID){
            // $inventory->DeleteCategory($prefix);
            $data['msg_title'] = '<span class="text-dark fw-bolder">Delete Success!</span>';
            $data['msg_prompt'] = 'The <span class=\"text-danger fw-bolder h5\">'.$del.' item/s</span> is successfully deleted.';
            $data['msg_notification'] = '<span class="text-dark fw-bolder h5">Delete Success!</span><br>The <span class="text-success fw-bolder h6">'.$del.' item/s</span> is successfully deleted.';
            $data['msg_icon'] = 'success';
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }else{
            $data['msg_title'] = 'Delete Failed!';
            $data['msg_prompt'] = 'No <span class="text-dark fw-bolder h5">product</span> is selected.';
            $data['msg_notification'] = '<span class="text-danger fw-bolder">Delete Failed!</span><br>No <span class="text-danger fw-bolder h6">product</span> is selected.';
            $data['msg_icon'] = 'error';
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }
    }
}
?>
