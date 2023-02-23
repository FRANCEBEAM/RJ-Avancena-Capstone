<?php
    require("../controller/classes.php");
    error_reporting(0);
    $inv = new Inventory();
    $str = new GenerateString();
    $db = new Database();

    $link = $db->StartConnection();

    $id = $str->Numeric(mysqli_real_escape_string($link, $_POST['id']));
    $serial = $str->Alphanumeric(mysqli_real_escape_string($link, $_POST['serial']));
    $sku = $str->Alphanumeric(mysqli_real_escape_string($link, $_POST['sku']));
    $acc = $str->Alphanumeric(mysqli_real_escape_string($link, $_POST['acc']));
    $product = $str->SEO(mysqli_real_escape_string($link, $_POST['product']));
    $quantity = $str->Numeric(mysqli_real_escape_string($link, $_POST['quantity']));
    $price = $str->Numeric(mysqli_real_escape_string($link, $_POST['price']));
    $restock = $str->Numeric(mysqli_real_escape_string($link, $_POST['restock']));
    $supplier = $str->Alphanumeric_S(mysqli_real_escape_string($link, $_POST['supplier']));
    $sizecolor = $str->SEO(mysqli_real_escape_string($link, $_POST['sizecolor']));
    $specs = $str->SEO(mysqli_real_escape_string($link, $_POST['specs']));

    if(!empty($acc)){
        if(!empty($_FILES['file']['name'])){
            $prefix = $db->FetchSingleData("SELECT prefix FROM inventory WHERE serialnumber ='$serial'");
            mkdir("../uploads/$prefix/");
            $dir = "../uploads/$prefix/$serial/";
            $filename = $inv->ReplaceImage($id, $dir, $serial, true);
            $filedir = "../uploads/$prefix/$serial/";
            $filepath = "/uploads/$prefix/$serial/".$filename;
            $filesrc = $filedir.$filename;
        }else{
            $file = $db->FetchSingleRow("SELECT filename, filedir, filepath, filesrc FROM inventory WHERE serialnumber='$serial'");
            if(!empty($file)){
                $filename = $file['filename'];
                $filedir = $file['filedir'];
                $filepath = $file['filepath'];
                $filesrc = $file['filesrc'];
            }
        }
    }

    $executeUpdate = $db->ExecuteQuery("UPDATE inventory SET product = '$product', quantity = '$quantity', price = '$price', reorder = '$restock', supplier = '$supplier', specs = '$specs', size_color = '$sizecolor', sku = '$sku', filedir = '$filedir', filepath = '$filepath', filesrc = '$filesrc', filename = '$filename' WHERE serialnumber = '$serial'");
    if($executeUpdate){
        // $inventory->DeleteCategory($link, $prefix);
        // session_start();
        $data = [];
        $data['msg_title'] = "Update Success!";
        $data['msg_prompt'] = "<span class=\"text-success fw-bolder h5\">$serial</span> is edited successfully.";
        $data['msg_notification'] = "<span class=\"text-dark fw-bolder\">Update Success!</span><br><span class=\"text-success fw-bolder h6\">$serial</span> is edited successfully.";
        $data['msg_icon'] = "success";

        header('Content-Type: application/json');
        echo json_encode($data);
        
        // header('Location: '.$_SERVER['HTTP_REFERER']);
    }
?>