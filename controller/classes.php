<?php

class Database{
    private $server = 'localhost';
    private $username = 'root';
    private $password = '';
    private $name = 'rjavancena2';
    protected $link;

    public function StartConnection(){

        $this->link = mysqli_connect($this->server, $this->username, $this->password, $this->name);

        if($this->link === false){
            die("ERROR: Could not connect. " . mysqli_connect_error());
        }else{
            return $this->link;
        }
    }

    public function ExecuteQuery(string $sqlCommand){

        $link = $this->StartConnection();
        $sqlExecute = mysqli_query($link, $sqlCommand);

        if($sqlExecute == true){
            return true;
        }else{
            return false;
        }
    }

    public function SettingsJSON(string $session){

        $link = $this->StartConnection();

        $data = [];
        
        $sqlFetchSettings = "SELECT * FROM settings WHERE accnum = '$session'";
        if($sqlExecuteSettings = mysqli_query($link, $sqlFetchSettings)){
            if($row = mysqli_fetch_assoc($sqlExecuteSettings)){
                $data['s_merchandise'] = $row['merchandise'];
                $data['s_accounts'] = $row['accounts'];
                $data['s_inventory'] = $row['inventory'];
                $data['s_transactions'] = $row['transactions'];
                $data['s_orders'] = $row['orders'];
                $data['s_volume'] = $row['volume'];
                $data['s_theme'] = $row['theme'];
                $data['s_rowcount'] = $row['rowcount'];
                $data['s_items'] = $row['itemsPerRow'];
                $data['s_alert'] = $row['alert'];
            }
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }
    }

    public function PostSecure($post){
        $conn = $this->StartConnection();

        $secured_post = mysqli_real_escape_string($conn, $post);

        return $secured_post;
    }

    public function Settings(string $session){

        $link = $this->StartConnection();
        // SELECT settings.AccountNum, settings.accounts, settings.inventory, settings.merchandise, settings.orders, settings.transactions, settings.transactions, settings.volume, settings.theme, settings.interface, settings.rowcount, settings.itemsPerRow, settings.alert FROM settings INNER JOIN accounts WHERE accounts.accnum = '$sessionID' AND settings.accnum = '$sessionID'
        $sqlFetchSettings = "SELECT * FROM settings WHERE accnum = '$session'";
        if($sqlExecuteSettings = mysqli_query($link, $sqlFetchSettings)){
            if($settings = mysqli_fetch_assoc($sqlExecuteSettings)){
                return $settings;
            }
        }
    }
    
    public function FetchSingleData(string $sqlFetchData){
        
        $link = $this->StartConnection();

        $sqlExecuteFetch = mysqli_query($link, $sqlFetchData);

        $fetchData = mysqli_fetch_row($sqlExecuteFetch);
        
        return $fetchData[0];
    }

    public function FetchNumRows(string $sqlFetchData){
        
        $link = $this->StartConnection();

        $sqlExecuteFetch = mysqli_query($link, $sqlFetchData);

        $fetchRow = mysqli_num_rows($sqlExecuteFetch);
        return $fetchRow;
    }

    public function FetchSingleRow(string $sqlFetchArray){

        $link = $this->StartConnection();

        $sqlExecuteFetchRow = mysqli_query($link, $sqlFetchArray);
        if($fetchRow = mysqli_fetch_array($sqlExecuteFetchRow)){
            return $fetchRow;
        }
    }
}

class GenerateString extends Database{

    public static function RandomString($min, $max) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randStr1 = $randStr2 = $randStr3 = $randStr4 = $randStr5 = '';

        for($i = 0; $i < random_int($min, $max); $i++){
            $randStr1 .= $characters[rand(0, $charactersLength - 1)];
        }
        for($i = 0; $i < random_int($min, $max); $i++){
            $randStr2 .= $characters[rand(0, $charactersLength - 1)];
        }
        for($i = 0; $i < random_int($min, $max); $i++){
            $randStr3 .= $characters[rand(0, $charactersLength - 1)];
        }
        for($i = 0; $i < random_int($min, $max); $i++){
            $randStr4 .= $characters[rand(0, $charactersLength - 1)];
        }
        for($i = 0; $i < random_int($min, $max); $i++){
            $randStr5 .= $characters[rand(0, $charactersLength - 1)];
        }
        $randomString = $randStr1.'-'.$randStr2.'-'.$randStr3.'-'.$randStr4.'-'.$randStr5;

        return $randomString;
    }

    public function AccountNumber(){

        $link = $this->StartConnection();

        $sql = "SELECT MAX(accint) as MaxNum FROM accounts LIMIT 1";
        $result = mysqli_query($link, $sql);
    
        if(mysqli_num_rows($result) == 1){
            if($row = mysqli_fetch_array($result)){
                $db_num = intval($row['MaxNum']) + 1;                   
                $accountNumber = sprintf("%08d", $db_num);
                return $accountNumber;
            }
        }
    }


    public static function TextTruncate($str, $length) {
        if(strlen($str)<=$length) {
            return $str;
        } else {
            $string=substr($str,0,$length) . '...';
            return $string;
        }
    }

    public static function RandomOTP($length) {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 1; $i <= $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public function SerialNumber($prefix){

        $link = $this->StartConnection();

        $sql = "SELECT MAX(serialInt) AS sn FROM inventory WHERE prefix = '$prefix' LIMIT 1";
        $result = mysqli_query($link, $sql);
    
        if(mysqli_num_rows($result) == 1){
            if($row = mysqli_fetch_array($result)){
            $db_serial = intval($row["sn"]) + 1;                   
            $new_serial = sprintf("%08d", $db_serial);
            $serialnumber = $prefix.$new_serial;
            if($prefix != ''){
                return $serialnumber;
            }
            }
        }
    }

    public function Alpha($value){
        return preg_replace("/[^a-zA-Z]+/", "", $value);
    }
    public function Alphanumeric($value){
        return preg_replace("/[^a-z0-9]/i", "", $value);
    }
    public function Alpha_S($value){
        return preg_replace("/[^a-zA-Z ]+/", "", $value);
    }
    public function Alphanumeric_S($value){
        return preg_replace("/[^a-z0-9 ]/i", "", $value);
    }
    public function SEO($value){
        return preg_replace("/[^a-z 0-9-+!@#$%^&*(),.]/i", "", $value);
    }
    public function Email($value){
        return preg_replace("/[^a-zA-Z0-9.@_]+/", "", $value);
    }
    // public function Numeric($value){
    //     return preg_replace("/(.)\\1+/", "$1", preg_replace("/[^0-9.]+/", "", $value));
    // }
    public function Numeric($value){
        return preg_replace("/[^0-9.]+/", "", $value);
    }
    
}


class Inventory extends Database{
    
    public function ReplaceImage($id, $dir, $filename, $bool){

        $link = $this->StartConnection();

        $file = $_FILES['file']['name'];
        $target_file = $dir . basename($file);
        $file_ext = explode(".", $file);
        $image_file = $filename.'.'.end($file_ext);
        if($bool === true){
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            $sql = "SELECT filesrc, filename FROM inventory WHERE id = '$id' LIMIT 1";
            $query = mysqli_query($link, $sql);
            if(mysqli_num_rows($query) == 1){
                if($row = mysqli_fetch_array($query)){
                    $delsrc = $row['filesrc'];
                    // $dbFilename = $row['filename'];
                }
            }
            if(($dir != '') && ($filename != '') && ($file != '')){
                $check = getimagesize($_FILES["file"]["tmp_name"]);
                if($check !== false) {
                    $uploadOk = 1;
                }else{
                    $uploadOk = 0;
                }if(file_exists($target_file) == 1) {
                    $uploadOk = 1;
                }else{
                    $uploadOk = 1;
                    mkdir("$dir"); 
                }if($_FILES["file"]["size"] > 5242880){
                    $uploadOk = 0;
                }if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "jfif" && $imageFileType != "webp" && $imageFileType != "svg"){
                    $uploadOk = 0;
                }if($uploadOk == 0) {
                    return false;
                }if($uploadOk == 1){
                    $imagesrc = "$dir$image_file";
                    if($delsrc != '../assets/img/default.jpg'){
                        unlink($delsrc);
                    }
                    move_uploaded_file($_FILES["file"]["tmp_name"],  "$imagesrc");
                    return $image_file;
                }else{
                    return 'DEFAULT';
                }
            }
        }
    }

    public function ReplaceProfile($dir, $filename, $bool){

        $link = $this->StartConnection();

        $file = $_FILES['file']['name'];
        $target_file = $dir . basename($file);
        $file_ext = explode(".", $file);
        $image_file = $filename.'.'.end($file_ext);
        if($bool === true){
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            $sql = "SELECT profilesrc FROM accounts WHERE accnum = '$filename' LIMIT 1";
            $query = mysqli_query($link, $sql);
            if(mysqli_num_rows($query) == 1){
                if($row = mysqli_fetch_array($query)){
                    $delsrc = $row['profilesrc'];
                }
            }
            if(($dir != '') && ($filename != '') && ($file != '')){
                $check = getimagesize($_FILES["file"]["tmp_name"]);
                if($check !== false) {
                    $uploadOk = 1;
                }else{
                    $uploadOk = 0;
                }if(file_exists($target_file) == 1) {
                    $uploadOk = 1;
                }else{
                    $uploadOk = 1;
                    mkdir("$dir"); 
                }if($_FILES["file"]["size"] > 5242880){
                    $uploadOk = 0;
                }if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "jfif" && $imageFileType != "webp" && $imageFileType != "svg"){
                    $uploadOk = 0;
                }if($uploadOk == 0) {
                    return false;
                }if($uploadOk == 1){
                    $imagesrc = "$dir$image_file";
                    if($delsrc != '../assets/img/invert.png'){
                        unlink($delsrc);
                    }
                    move_uploaded_file($_FILES["file"]["tmp_name"],  "$imagesrc");
                    return $image_file;
                }else{
                    return 'DEFAULT';
                }
            }
        }
    }

    public function UploadImage($target_directory, $filename, $bool){

        $file = $_FILES["file"]["name"];
        $target_file = $target_directory . basename($file);
        $file_ext = explode(".", $file);
        $image_file = $filename . '.' . end($file_ext);

        if($bool === true){

            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

            if(($target_directory != null) && ($filename != null) && ($file != null)){
                    mkdir("$target_directory"); 
                    $check = getimagesize($_FILES["file"]["tmp_name"]);
                    if($check !== false) {
                        $uploadOk = 1;
                    } else {
                        $uploadOk = 0;
                    }if(file_exists($target_file) == 1) {
                        $uploadOk = 0;
                    }if($_FILES["file"]["size"] > 5242880) {
                        $uploadOk = 0;
                    }if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "jfif" && $imageFileType != "webp" && $imageFileType != "svg") {
                        $uploadOk = 0;
                    }if($uploadOk == 1){
                        $imagesrc = "$target_directory$image_file";
                        move_uploaded_file($_FILES["file"]["tmp_name"],  "$imagesrc");
                        return $image_file;
                    }else{
                        return 'DEFAULT';
                    }
            }
        }
    }

    // public function MultipleUpload($target_directory, $filename, $bool){

    //     $total = count($_FILES['file']['name']);

    //     if($bool == true){
    //         for( $i=0 ; $i < $total ; $i++ ) {

    //             $file = $_FILES["file"]["name"][$i];
    //             // $target_file = $target_directory . basename($file);
    //             $file_ext = explode(".", $file);
    //             $image_file = $filename . '_' . $i . '.' . end($file_ext);

    //             if ($image_file != ""){

    //                 $newFilePath = $target_directory . $image_file;

    //                 if(move_uploaded_file($_FILES['file']['tmp_name'][$i], $newFilePath)) {

                        

    //                 }
    //             }
    //         }
    //     }
    // }

    public function DeleteCategory($prefix){

        $link = $this->StartConnection();

        $sqlsel = "SELECT COUNT(*) AS ItemNo FROM inventory WHERE prefix = '$prefix' LIMIT 1";
        $querysel = mysqli_query($link, $sqlsel);

        if(mysqli_num_rows($querysel) == 1){
            if($row = mysqli_fetch_array($querysel)){
                $ItemNo = $row['ItemNo'];                 

                if($ItemNo == 0){
                    $sqldel = "DELETE FROM categories WHERE prefix = '$prefix'";
                    $querydel = mysqli_query($link, $sqldel);

                    if($querydel){
                        return true;
                    }
                }else{
                    return false;
                }
            }
        }
    }

    public static function ForceDeleteDirectory($dir){
        array_map('unlink', glob("$dir/*.*"));
        rmdir($dir);
    }

    public function UploadSlides($id, $dir, $filename, $slide_count, $postfix, $bool){

        $link = $this->StartConnection();

        $file = $_FILES[$slide_count]['name'];
        $target_file = $dir . basename($file);
        $file_ext = explode(".", $file);
        $image_file = $filename.$postfix.'.'.end($file_ext);
        if($bool === true){
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            $sql = "SELECT $slide_count FROM inventory WHERE id = '$id' LIMIT 1";
            $query = mysqli_query($link, $sql);
            if(mysqli_num_rows($query) == 1){
                if($row = mysqli_fetch_array($query)){
                    $delsrc = $row[$slide_count];
                }
            }
            if(($dir != '') && ($filename != '') && ($file != '')){
                $check = getimagesize($_FILES[$slide_count]["tmp_name"]);
                if($check !== false) {
                    $uploadOk = 1;
                }else{
                    $uploadOk = 0;
                }if(file_exists($target_file) == 1) {
                    $uploadOk = 1;
                }else{
                    $uploadOk = 1;
                    mkdir("$dir"); 
                }if($_FILES[$slide_count]["size"] > 5242880){
                    $uploadOk = 0;
                }if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "jfif" && $imageFileType != "webp" && $imageFileType != "svg"){
                    $uploadOk = 0;
                }if($uploadOk == 0) {
                    return false;
                }if($uploadOk == 1){
                    $imagesrc = "$dir$image_file";
                    if($delsrc != '../assets/img/default.jpg'){
                        unlink($delsrc);
                    }
                    move_uploaded_file($_FILES[$slide_count]["tmp_name"],  "$imagesrc");
                    return $image_file;
                }else{
                    return 'DEFAULT';
                }
            }
        }
    }

    // SELECT COUNT(*) FROM `accounts` acc JOIN `assign` ass ON(acc.section = ass.section AND acc.yearlevel = ass.yearlevel AND acc.userlevel = 'Student') JOIN `settings` sett ON(acc.acad_year = sett.acad_year AND acc.semester = sett.semester AND sett.status = 'Active')

    // SELECT COUNT(*), ass.yearlevel, ass.section FROM `accounts` acc JOIN `assign` ass ON(acc.yearlevel = ass.yearlevel AND acc.section = ass.section AND ass.acctid = '20220001') JOIN `settings` sett ON(acc.acad_year = sett.acad_year AND acc.semester = sett.semester AND sett.status = 'Active') GROUP BY acc.yearlevel, acc.section
}

class Merchandise extends Database {
    public function fetch_info($type, $word){
        if($type == 'all'){
            $this->get_categories();
        } else if($type == 'search'){
            $this->search_products($word);
        }
    }

    public function save_info($transaction){
        $this->save_to_db($transaction);
    }

    private function send_response($response){
        header('Content-Type: application/json');
        echo json_encode($response);
        
    }

    private function get_categories(){
        $response['success'] = false;
        $response['error'] = '';
        $response['categories'] = [];
        $response['id'] = [];
        $response['image'] = [];
        $response['name'] = [];
        $response['price'] = [];
        $response['stock'] = [];
        $response['category'] = [];
        $response['description'] = [];
        $response['supplier'] = [];
        $response['size_color'] = [];
        $response['slide1'] = [];
        $response['slide2'] = [];
        $response['slide3'] = [];

        $this->StartConnection();

        if($stmt1 = $this->link->query('SELECT category FROM categories')){
            while($row1 = $stmt1->fetch_assoc()){
                array_push($response['categories'], $row1['category']);
            }

            $fetch = '
                SELECT
                *
                FROM
                    inventory
            ';

            if($stmt2 = $this->link->query($fetch)){
                $response['success'] = true;
    
                if($stmt2->num_rows > 0){
                    while($row2 = $stmt2->fetch_assoc()){

                        $str = $row2['specs'];
                        $length = 50;

                        if(strlen($str)<=$length) {
                            $specs = $str;
                        } else {
                            $specs = substr($str,0,$length) . '...';
                        }

                        array_push($response['image'], $row2['filesrc']);
                        array_push($response['slide1'], $row2['slides_001']);
                        array_push($response['slide2'], $row2['slides_002']);
                        array_push($response['slide3'], $row2['slides_003']);
                        array_push($response['id'], $row2['serialnumber']);
                        array_push($response['size_color'], $row2['size_color']);
                        array_push($response['name'], $row2['product']);
                        array_push($response['price'], $row2['price']);
                        array_push($response['stock'], $row2['quantity']);
                        array_push($response['description'], $specs);
                        array_push($response['category'], $row2['category']);
                        array_push($response['supplier'], $row2['supplier']);
                        


                        // array_push($response['id'], $row2['id']);
                        // array_push($response['image'], $row2['image']);
                        // array_push($response['name'], $row2['name']);
                        // array_push($response['size'], $row2['size']);
                        // array_push($response['color'], $row2['color']);
                        // array_push($response['price'], $row2['price']);
                        // array_push($response['stock'], $row2['stock']);
                        // array_push($response['category'], $row2['category']);
                        // array_push($response['description'], $row2['description']);
                        // array_push($response['supplier'], $row2['supplier']);
                        // array_push($response['sale_price'], $row2['sale_price']);
                        // array_push($response['created_at'], $row2['created_at']);
                    }
                }
            } else {
                $response['error'] = 'Something went wrong, please try again later.';
            }

            $stmt2->close();
        } else {
            $response['error'] = 'Something went wrong, please try again later.';
        }

        $stmt1->close();
        
        $this->send_response($response);
    }

    private function search_products($word){
        if(!empty($word)){
            $word = trim($word);
            $word = '%' . $word . '%';
        }
        
        $response['success'] = false;
        $response['error'] = '';
        $response['id'] = [];
        $response['image'] = [];
        $response['name'] = [];
        $response['price'] = [];
        $response['stock'] = [];
        $response['category'] = [];
        $response['description'] = [];
        $response['supplier'] = [];

        $fetch = "
            SELECT 
            serialnumber,
            filesrc,
            product,
            price,
            quantity,
            category,
            specs,
            supplier
            FROM
                inventory
            WHERE
                serialnumber LIKE ?
            OR
                product LIKE ?
            OR
                specs LIKE ? 
            OR
                supplier LIKE ?
        ";

        $this->StartConnection();

        if($stmt = $this->link->prepare($fetch)){
            $stmt->bind_param('ssss', $word, $word, $word, $word);

            if($stmt->execute()){
                $stmt->store_result();

                $response['success'] = true;

                if($stmt->num_rows > 0){
                    for($i = 0; $i < $stmt->num_rows; $i++){
                        $stmt->bind_result(
                            $response['id'][$i],
                            $response['image'][$i],
                            $response['name'][$i],
                            $response['price'][$i],
                            $response['stock'][$i],
                            $response['category'][$i],
                            $response['description'][$i],
                            $response['supplier'][$i]
                        );
    
                        $stmt->fetch();
                    }
                }
            } else {
                $response['error'] = 'Something went wrong, please try again later.';
            }
        } else {
            $response['error'] = 'Something went wrong, please try again later.';
        }

        $stmt->close();

        $this->send_response($response);
    }

    public function save_to_db($transaction){
        $response['success'] = false;
        $response['error'] = '';

        $cart = json_decode($transaction, true);

        $sql_insert = "INSERT INTO tbl_transactions (user_id, customer_name, gcash_ref_num, est_delivery, transaction_id, type, purchased_items, status, total_price, shipping, discount, address, finalprice, cashchange) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $sql_verify = "SELECT quantity FROM inventory WHERE serialnumber = ?";
        $sql_update = "UPDATE inventory SET quantity = (quantity - ?), sold = (sold + ?) WHERE serialnumber = ?";

        $this->StartConnection();

        for($c = 0; !empty($cart['ids'][$c]); $c++){
            if($stmt1 = $this->link->prepare($sql_verify)){
                $stmt1->bind_param('s', $cart['ids'][$c]);

                if($stmt1->execute()){
                    $stmt1->store_result();

                    $stock_from_db = 0;

                    if($stmt1->num_rows == 1){
                        $stmt1->bind_result($stock_from_db);

                        if($stmt1->fetch()){
                            if($stock_from_db > $cart['quantities'][$c]){
                                if($stmt2 = $this->link->prepare($sql_update)){
                                    $stmt2->bind_param('iis', $cart['quantities'][$c], $cart['quantities'][$c], $cart['ids'][$c]);

                                    if($stmt2->execute()){
                                        $response['success'] = true;
                                    } else {
                                        $response['error'] = 'Something went wrong, please try again later. 6 : '.$cart['names'][$c];
                                    }
                                } else {
                                    $response['error'] = 'Something went wrong, please try again later. 5 : '.$cart['names'][$c];
                                }
                            } else {
                                $response['error'] = 'Insufficient stock available : '.$cart['names'][$c];
                            }
                        } else {
                            $response['error'] = 'Something went wrong, please try again later. 4 : '.$cart['names'][$c];
                        }
                    } else {
                        $response['error'] = 'Something went wrong, please try again later. 3 : '.$cart['names'][$c];
                    }
                } else {
                    $response['error'] = 'Something went wrong, please try again later. 2 : '.$cart['names'][$c];
                }
            } else {
                $response['error'] = 'Something went wrong, please try again later. 1 : '.$cart['names'][$c];
            }
        }

        if($response['success'] == true){
            if($stmt3 = $this->link->prepare($sql_insert)){
                $user_id = 'admin/cashier';
                $transaction_id = '';
                $type = 'Walk-In';
                $json = '';
                $status = 'complete';
                $total = 0;
                $shipping = 0;
                $discount = 0;
                $address = '';
                $finaltotal = 0;
                $change = 0;
                $customer = '';
                $gcashrefnum = '';
                $delivery = '';

                $stmt3->bind_param('ssssssssdddsdd', $user_id, $customer, $gcashrefnum, $delivery, $transaction_id, $type, $json, $status, $total, $shipping, $discount, $address, $finaltotal, $change);

                $transaction_id = 'TRN-' . uniqid();
                $json = json_encode($cart);
                $customer = $cart['customer'];
                $gcashrefnum = $cart['gcashrefnum'];
                $delivery = $cart['delivery_date'];
                if($delivery == ''){
                    $delivery = date("Y-m-d");
                }
                $total = doubleval($cart['total']);
                $shipping = doubleval($cart['shipping']);
                $discount = doubleval($cart['discount']);
                $address = $cart['address'];
                $finaltotal = doubleval($cart['finaltotal']);
                $change = doubleval($cart['change']);

                if($stmt3->execute()){
                    $response['transaction_id'] = $transaction_id;
                } else {
                    $response['error'] = 'Something went wrong, please try again later. 8 : '.$cart['names'][$c];
                }
            } else {
                $response['error'] = 'Something went wrong, please try again later. 7 : '.$cart['names'][$c];
            }
        }

        $this->send_response($response);
    }
}
?>
