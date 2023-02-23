<?php
require('../controller/classes.php');
error_reporting(0);
$db = new Database();
$str = new GenerateString();
$inv = new Inventory();

$link = $db->StartConnection();

$encoder = $str->Alpha_S(mysqli_real_escape_string($link, $_POST['encoder']));
$acc = $str->Alphanumeric(mysqli_real_escape_string($link, $_POST['acc']));

$product = $str->SEO(mysqli_real_escape_string($link, $_POST['product']));
$sku = $str->SEO(mysqli_real_escape_string($link, $_POST['sku']));
$category1 = $str->Alphanumeric_S(mysqli_real_escape_string($link, $_POST['category1']));
$category2 = $str->Alphanumeric_S(mysqli_real_escape_string($link, $_POST['category2']));

$code = $str->Alpha(strtoupper(mysqli_real_escape_string($link, $_POST['prefix'])));

$category = $category1 == 'Custom' ? $category2 : $db->FetchSingleData("SELECT category FROM inventory WHERE prefix = '$category1'");
$prefix = $category1 == 'Custom' ? $code : $db->FetchSingleData("SELECT prefix FROM inventory WHERE prefix = '$category1'");
$quantity = $str->Numeric(mysqli_real_escape_string($link, $_POST['quantity']));
$price = $str->Numeric(mysqli_real_escape_string($link, $_POST['price']));
$restock = $str->Numeric(mysqli_real_escape_string($link, $_POST['restock']));
$supplier = $str->Alphanumeric_S(mysqli_real_escape_string($link, $_POST['supplier']));
$specs = $str->SEO(mysqli_real_escape_string($link, $_POST['specs']));

$serialnumber = $str->SerialNumber($prefix);
$serialInt = str_replace($prefix, '', $serialnumber);

// echo $encoder.'<br>'.$acc.'<br>'.$product.'<br>c1'.$category1.'<br>c2'.$category2.'<br>cat'.$category.'<br>'.$prefix.'<br>'.$quantity.'<br>'.$price.'<br>'.$restock.'<br>sup'.$supplier.'<br>specs'.$specs.'<br>'.$serialnumber.'<br>'.$serialInt;

if(!empty($acc)){
    if(!empty($_FILES['file']['name'])){
        $dir = "../uploads/$prefix/$serialnumber/";
        mkdir("../uploads/$prefix/");
        $filename = $inv->UploadImage($dir, $serialnumber, true);
        // $filename = $inv->MultipleUpload($dir, $serialnumber, true);
        $filedir = "../uploads/$prefix/$serialnumber/";
        $filepath = "/uploads/$prefix/$serialnumber/$filename";
        $filesrc = $filedir.$filename;
    }else{
        $filedir = null;
        $filesrc = "../assets/img/default.jpg";
        $filepath = null;
        $filename = "DEFAULT";
    }

    $execute = $db->ExecuteQuery("INSERT INTO inventory (prefix, serialint, serialnumber, product, specs, quantity, price, reorder, category, supplier, filedir, filename, filepath, filesrc, encoder, sku) VALUES ('$prefix', '$serialInt', '$serialnumber', '$product', '$specs', '$quantity', '$price', '$restock', '$category', '$supplier', '$filedir', '$filename', '$filepath', '$filesrc', '$encoder', '$sku')");
    if($execute){
        $data = [];
        
        $data['msg_title'] = "Product Added!";
        $data['msg_prompt'] = "<span class=\"text-success fw-bolder h5\">$serialnumber</span> is added successfully.";
        $data['msg_notification'] = "<span class=\"text-dark fw-bolder h5\">Product Added!<br></span><span class=\"text-success fw-bolder h6\">$serialnumber</span> is added successfully.";
        $data['msg_icon'] = "success";

        header('Content-Type: application/json');
        echo json_encode($data);
        
    }
}
?>