<?php
    require('../controller/classes.php');
    require('../vendor/autoload.php');
    error_reporting(0);
       $db = new Database();
       $gen = new GenerateString();

    $conn = $db->StartConnection();

    if (isset($_FILES['file']['name'])) {

        $allowedFileType = [
            'application/vnd.ms-excel',
            'text/xls',
            'text/xlsx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        if (in_array($_FILES["file"]["type"], $allowedFileType)) {
            
            set_time_limit(0);

            $file = $_FILES["file"]["name"];
            $file_ext = explode(".", $file);
            
            date_default_timezone_set('Asia/Manila');
            $temp_filename = 'Inventory-Import-' . date("Y-m-d-h-i-s-A") . end($file_ext);
            $filename = preg_replace("/[^A-z0-9.]/i", "-", $temp_filename);

            $targetPath = '../spreadsheets/'.$filename;
            move_uploaded_file($_FILES['file']['tmp_name'], $targetPath);

            $Reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();

            $spreadSheet = $Reader->load($targetPath);
            $excelSheet = $spreadSheet->getActiveSheet();
            $spreadSheetAry = $excelSheet->toArray();
            $sheetCount = count($spreadSheetAry);

            $data = [];

            $data['filename'] = $_FILES['file']['name'];

            $data['title_1'] = "Import Success!";
            $data['html_1'] = "You have uploaded <span class='text-success fw-bolder'>" . $file . "</span>";
            $data['icon_1'] = "success";

            $x = 0;
            $y = 0;
            
            for ($i = 2; $i <= $sheetCount; $i++){
                $prefix = "";
                if(isset($spreadSheetAry[$i][0])){
                    $prefix = mysqli_real_escape_string($conn, $spreadSheetAry[$i][0]);
                }
                $category = "";
                if(isset($spreadSheetAry[$i][1])){
                    $category = mysqli_real_escape_string($conn, $spreadSheetAry[$i][1]);
                }
                $sku = "";
                if(isset($spreadSheetAry[$i][2])){
                    $sku = mysqli_real_escape_string($conn, $spreadSheetAry[$i][2]);
                }
                $product = "";
                if(isset($spreadSheetAry[$i][3])){
                    $product = mysqli_real_escape_string($conn, $spreadSheetAry[$i][3]);
                }
                $supplier = "";
                if(isset($spreadSheetAry[$i][4])){
                    $supplier = mysqli_real_escape_string($conn, $spreadSheetAry[$i][4]);
                }
                $quantity = "";
                if(isset($spreadSheetAry[$i][5])){
                    $quantity = mysqli_real_escape_string($conn, $spreadSheetAry[$i][5]);
                }
                $price = "";
                if(isset($spreadSheetAry[$i][6])){
                    $price = mysqli_real_escape_string($conn, $spreadSheetAry[$i][6]);
                }
                $restock = "";
                if(isset($spreadSheetAry[$i][7])){
                    $restock = mysqli_real_escape_string($conn, $spreadSheetAry[$i][7]);
                }
                $specs = "";
                if(isset($spreadSheetAry[$i][8])){
                    $specs = mysqli_real_escape_string($conn, $spreadSheetAry[$i][8]);
                }

                if(isset($_POST['accountID'])){
                    $encoder = mysqli_real_escape_string($conn, $_POST['accountID']);
                }

                if (!empty($prefix) && !empty($category) && !empty($product) && !empty($supplier) && !empty($quantity) && !empty($price) && !empty($restock)){
                    
                    if(strlen($prefix) <= 5 && strlen($prefix) >= 3){
                        
                        $conn = $db->StartConnection();

                        if($isExist = $db->FetchNumRows("SELECT * FROM inventory WHERE product = '$product' AND prefix = '$prefix'") == 0){
                            $serialnumber = $gen->SerialNumber($prefix);
                            $serialInt = str_replace($prefix, '', $serialnumber);
                            $filedir = null;
                            $filesrc = "../assets/img/default.jpg";
                            $filepath = null;
                            $filename = "DEFAULT";
                            $sql = "INSERT INTO inventory (prefix, serialint, serialnumber, sku, product, specs, quantity, price, reorder, category, supplier, encoder, filepath, filesrc, filedir, filename) VALUES ('$prefix', '$serialInt', '$serialnumber', '$sku', '$product', '$specs', '$quantity', '$price', '$restock', '$category', '$supplier', '$encoder', '$filepath', '$filesrc', '$filedir', '$filename')";
                            $result = mysqli_query($conn, $sql);
                            $x++;
                        }else{
                            $y++;
                            $data['redundant'][$i] = $y;
                        }
                    }
                }
                $redundant = $data['redundant'] == '' ? 'None' : implode(", ", $data['redundant']);
                $data['title_2'] = "Status Report!";
                $data['html_2'] = "There are <span class='text-success fw-bolder'>$x inserted</span>, <span class='text-danger fw-bolder'>" . $y . " redundancy.";
                $data['icon_2'] = "info";
            }
            unlink($targetPath);
        } else {
            $file = $_FILES["file"]["name"];
            $file_ext = explode(".", $file);

            $data['title_1'] = "Import Failed! [" . strtoupper(end($file_ext)) . "]";
            $data['html_1'] = "You have uploaded a wrong file" . $file;
            $data['icon_1'] = "error";
        }
        header('Content-Type: application/json');
        echo json_encode($data);
        
    }
?>