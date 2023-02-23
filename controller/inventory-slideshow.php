<?php

    require('../controller/classes.php');
    error_reporting(0);

    $inv = new Inventory();
    $db = new Database();

    if(isset($_POST['id'])){
        $conn = $db->StartConnection();
        $id = mysqli_real_escape_string($conn, $_POST['id']);
        $data = [];

        $uploaded = 0;


        if($fetch = $db->FetchSingleRow("SELECT prefix, serialnumber FROM inventory WHERE id = '$id'")){
            $prefix = $fetch['prefix'];
            $filename = $fetch['serialnumber'];
            $basedir = "../uploads/$prefix/";
            mkdir($basedir);
            $dir = "../uploads/$prefix/$filename/";
        }
    
        if(!empty($_FILES['file']['name'])){
            $filemain = $inv->ReplaceImage($id, $dir, $filename, true);
            $filesrc = $dir.$filemain;
            $db->ExecuteQuery("UPDATE inventory SET filesrc = '$filesrc', `filename` = '$filemain' WHERE id = '$id'");
            $uploaded++;
        }
    
        if(!empty($_FILES['slides_001']['name'])){
            $filename_001 = $inv->UploadSlides($id, $dir, $filename, 'slides_001', '_001', true);
            $slides_001 = $dir.$filename_001;
            $db->ExecuteQuery("UPDATE inventory SET slides_001 = '$slides_001', filename_001 = '$filename_001' WHERE id = '$id'");
            $uploaded++;
        }
    
        if(!empty($_FILES['slides_002']['name'])){
            $filename_002 = $inv->UploadSlides($id, $dir, $filename, 'slides_002', '_002', true);
            $slides_002 = $dir.$filename_002;
            $db->ExecuteQuery("UPDATE inventory SET slides_002 = '$slides_002', filename_002 = '$filename_002' WHERE id = '$id'");
            $uploaded++;
        }
    
        if(!empty($_FILES['slides_003']['name'])){
            $filename_003 = $inv->UploadSlides($id, $dir, $filename, 'slides_003', '_003', true);
            $slides_003 = $dir.$filename_003;
            $db->ExecuteQuery("UPDATE inventory SET slides_003 = '$slides_003', filename_003 = '$filename_003' WHERE id = '$id'");
            $uploaded++;
        }
    
        if(!empty($id) && !empty($uploaded)){
            $data['msg_title'] = '<span class="text-dark fw-bolder">Upload Success!</span>';
            $data['msg_prompt'] = 'The <span class=\"text-success fw-bolder h5\">'.$uploaded.' items</span> is uploaded successfully.';
            $data['msg_notification'] = '<span class="text-dark fw-bolder h5">Upload Success!</span><br>The <span class="text-success fw-bolder h6">'.$uploaded.' items</span> is uploaded successfully.';
            $data['msg_icon'] = 'success';
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }else{
            $data['msg_title'] = '<span class="text-dark fw-bolder">Upload Failed!</span>';
            $data['msg_prompt'] = 'The <span class=\"text-danger fw-bolder h5\">'.$uploaded.' items</span> is uploaded unsuccessfully.';
            $data['msg_notification'] = '<span class="text-dark fw-bolder h5">Upload Failed!</span><br>The <span class="text-danger fw-bolder h6">'.$uploaded.' items</span> is uploaded unsuccessfully.';
            $data['msg_icon'] = 'warning';
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }
    }
    


?>