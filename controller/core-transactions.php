<?php

    require('../controller/classes.php');
    require('../vendor/autoload.php');

    use PHPMailer\PHPMailer\PHPMailer;
    error_reporting(0);
    final class Transactions extends Database{
        public function GetTransactions(string $session, string $pageNo, string $search, bool $bool){
            $link = $this->StartConnection();
            $settings = $this->Settings($session);
    
            $data = [];
    
            if($settings != ''){
                $data['s_rowcount'] = $per_page_record = $settings['row_tra'];
                $data['s_transactions'] = $userCategory =  $settings['transactions'];
                $data['s_alert'] = $settings['alert'];
            }
    
            $selectAllCategories = "SELECT `type` FROM tbl_transactions GROUP BY `type`";
            $executeAllCategories = mysqli_query($link, $selectAllCategories);
    
            $arr_num_rows = $this->FetchNumRows($selectAllCategories);
            $categories = array();
            $c = 0;
            while($row = mysqli_fetch_assoc($executeAllCategories)) {
                $categories[$c] = ucwords($row['type']);
                $c++;
            }
            $data['arr_num_rows'] = $arr_num_rows;
            $data['arr_categories'] = $categories;
    
            if(array_search($userCategory, $categories) != ''){
                $does_exist = true;
            }else{
                $does_exist = false;
                $categoryZero = $categories[0];
                $data['categories'] = $categoryZero;
                $this->ExecuteQuery("UPDATE settings SET transactions = '$categoryZero' WHERE accnum = '$session'");
            }
            
            if($bool == true && $search != ''){
                if(strtolower($search) == 'all'){
                    $sqlInventoryCount = "SELECT COUNT(*) FROM tbl_transactions";
                }else{
                    $sqlInventoryCount = "SELECT COUNT(*) FROM tbl_transactions WHERE transaction_id LIKE '%$search%' OR user_id LIKE '%$search%' OR `type` LIKE '%$search%' OR transaction_date LIKE '%$search%' ORDER BY transaction_date ASC, `type`";
                }
            }elseif($bool == false && $does_exist == false){
                $sqlInventoryCount = "SELECT COUNT(*) FROM tbl_transactions WHERE `type` = '$categoryZero'";
            }else{
                $sqlInventoryCount = "SELECT COUNT(*) FROM tbl_transactions WHERE `type` = '$userCategory'";
            }
    
            $total_records = $this->FetchSingleData($sqlInventoryCount);
            $total_pages = ceil($total_records / $per_page_record);
            $page = (($pageNo > $total_pages ? $total_pages : (($pageNo<1) ? 1 : $pageNo)));
            $render_pages = $page * $per_page_record;
    
            if($render_pages >= $total_records){
                $records = $total_records;
            }elseif($render_pages < $total_records){
                $records = $render_pages;
            }
            if($page < 1){
                $page = 1;
            }
            $start_from = ($page - 1) * $per_page_record;
    
            if($bool == true && $search != ''){
                $table_category = 'SEARCH \''.$search.'\'';
                if(strtolower($search) == 'all'){
                    $sqlGetAccounts = "SELECT * FROM tbl_transactions ORDER BY accnum ASC";
                }else{
                    $sqlGetAccounts = "SELECT * FROM tbl_transactions AND transaction_id LIKE '%$search%' OR user_id LIKE '%$search%' OR `type` LIKE '%$search%' OR transaction_date LIKE '%$search%' ORDER BY transaction_date ASC, `type`";
                }
            }elseif($bool == false && $does_exist == false){
                $sqlGetAccounts = "SELECT * FROM tbl_transactions WHERE `type` = '$categoryZero' ORDER BY transaction_date ASC LIMIT $start_from, $per_page_record";
                $table_category = $this->FetchSingleData("SELECT `type` FROM tbl_transactions WHERE `type` = '$categoryZero'");
            }else{
                $sqlGetAccounts = "SELECT * FROM tbl_transactions WHERE `type` = '$userCategory' ORDER BY transaction_date LIMIT $start_from, $per_page_record";
                $table_category = $this->FetchSingleData("SELECT `type` FROM tbl_transactions WHERE `type` = '$userCategory'");
            }
    
            if($total_pages == 0){
                $total_pages = 1;
            }if($records == 0 && $total_records == 0){
                $table_category = 'NO RESULTS';
            }
    
            $sqlExecuteFetchInventory = mysqli_query($link, $sqlGetAccounts);
    
            if(($i_num_rows = mysqli_num_rows($sqlExecuteFetchInventory)) > 0){
    
                $i = 0;
    
                while($row = mysqli_fetch_assoc($sqlExecuteFetchInventory)){
                    
    
                    $data['trn_id'][$i] = $row['transaction_id'];
                    $data['trn_user'][$i] = ucwords($row['user_id']);
                    $data['trn_type'][$i] = ucwords($row['type']);
                    $data['trn_date'][$i] = date('M j, Y g:i A', strtotime($row['transaction_date']));
                    $data['trn_items'][$i] = implode(", ", json_decode($row['purchased_items'])->names);
                    $data['trn_quantity'][$i] = json_decode($row['purchased_items'])->quantities;
                    $data['trn_subtotal'][$i] = json_decode($row['purchased_items'])->subtotals;
                    $data['trn_shipping'][$i] = json_decode($row['purchased_items'])->shipping;
                    $data['trn_discount'][$i] = json_decode($row['purchased_items'])->discount;
                    $data['trn_rec_addr'][$i] = json_decode($row['purchased_items'])->address;
                    // $data['trn_total'][$i] = json_decode($row['purchased_items'])->finaltotal;
                    $data['trn_ids'][$i] = json_decode($row['purchased_items'])->ids;
                    $data['trn_status'][$i] = ucwords($row['status']);
                    $data['trn_total'][$i] = $row['total_price'];
                    $data['trn_shipping'][$i] = $row['shipping'];
                    $data['trn_discount'][$i] = $row['discount']; 
                    $data['trn_final'][$i] = $row['finalprice'];
                    $data['trn_address'][$i] = $row['address'];
                    $data['trn_change'][$i] = $row['cashchange'];
                    $data['trn_customer_name'][$i] = $row['customer_name'];
                    $data['trn_est_delivery'][$i] = $row['est_delivery'];
                    $data['trn_downpayment'][$i] = $row['downpayment'];
                    $data['trn_gcashrefnum'][$i] = $row['gcash_ref_num'];
                    $i++;
                }
            }
            
            $data['i_num_rows'] = $i_num_rows;  
            $data['table_category'] = $table_category;
            $data['table_records'] = strtolower($search) != '' ? $i_num_rows : $records;
            $data['table_total_records'] = $total_records;
    
            if($search == null){
                $data['table_page'] = $page;
                $data['table_total_page'] = $total_pages;
            }else{
                $data['table_page'] = 1;
                $data['table_total_page'] = 1;
            }
    
            $data['category'] = $categoryZero != '' ? $categoryZero : $userCategory;
            $data['row_trn'] = $per_page_record;
    
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }

        public function voidTransact($transaction_id){
            $response['success'] = false;
            
            $void = 'UPDATE tbl_transactions SET status = ? WHERE transaction_id = ?';
            $new_status = 'voided';

            $this->StartConnection();
            
            // update : deducting sold when order is voided
            // get the cart first based on transaction id
            $get_cart = 'SELECT purchased_items FROM tbl_transactions WHERE transaction_id = ?';
            $cart = '';
            $stmt0 = $this->link->prepare($get_cart);
            $stmt0->bind_param('s', $transaction_id);
            $stmt0->execute();
            $stmt0->store_result();

            if($stmt0->num_rows == 1){
                $stmt0->bind_result($cart);

                if($stmt0->fetch()){
                    $cart = json_decode($cart, true);
                    $add_sold = 'UPDATE inventory SET sold = (sold - ?) WHERE serialnumber = ?';
                    $stmt1 = $this->link->prepare($add_sold);

                    for($i = 0; !empty($cart['ids'][$i]); $i++){
                        $current_qty = $cart['quantities'][$i];
                        $current_serial = $cart['ids'][$i];

                        $stmt1->bind_param('is', $current_qty, $current_serial);
                        $stmt1->execute();
                    }
                    
                }
            }

            if($stmt = $this->link->prepare($void)){
                $stmt->bind_param('ss', $new_status, $transaction_id);

                if($stmt->execute()){
                    $response['success'] = true;
                }
            }

            header('Content-Type: application/json');
            echo json_encode($response);
            
        }

        public function cancelTransact($transaction_id){
            $response['success'] = false;
            $response['status'] = '';
            
            $reject = 'UPDATE tbl_transactions SET status = ? WHERE transaction_id = ?';
            $get_ordered = "SELECT purchased_items FROM tbl_transactions WHERE transaction_id = ?";
            $return_stocks = "UPDATE inventory SET quantity = (quantity + ?) WHERE serialnumber = ?";
            $new_status = 'rejected';
            $items = '';

            $this->StartConnection();

            $stmt1 = $this->link->prepare($get_ordered);
            $stmt1->bind_param('s', $transaction_id);

            if($stmt1->execute()){
                $stmt1->store_result();

                if($stmt1->num_rows == 1){
                    $stmt1->bind_result($items);

                    if($stmt1->fetch()){
                        $items = json_decode($items, true);

                        for($i = 0; !empty($items['id'][$i]); $i++){
                            $stmt2 = $this->link->prepare($return_stocks);
                            $stmt2->bind_param('is', $items['quantity'][$i], $items['id'][$i]);
                            $stmt2->execute();
                        }

                        if($stmt = $this->link->prepare($reject)){
                            $stmt->bind_param('ss', $new_status, $transaction_id);
                                        
                            if($stmt->execute()){
                                $response['success'] = true;
                            }
                        }
                    }
                }
            } else {
                $response['status'] = 'Failed to execute read statement.';
            }

            header('Content-Type: application/json');
            echo json_encode($response);
            
        }

        public function deliveredTransact($transaction_id){
            $response['success'] = false;
            
            $void = 'UPDATE tbl_transactions SET status = ? WHERE transaction_id = ?';
            $new_status = 'delivered';

            $this->StartConnection();

            if($stmt = $this->link->prepare($void)){
                $stmt->bind_param('ss', $new_status, $transaction_id);

                if($stmt->execute()){
                    $response['success'] = true;
                }
            }

            header('Content-Type: application/json');
            echo json_encode($response);
            
        }
        
        // send email when online order is confirmed
        private function send_receipt_email($transaction_id, $cart){
            $user = '';
            $email = '';
            $fn = $ln = '';
            $find_user = 'SELECT user_id FROM tbl_transactions WHERE transaction_id = ?';
            $get_email = 'SELECT firstname, lastname, email FROM accounts WHERE accnum = ?';
            
            $this->StartConnection();
            
            $stmt0 = $this->link->prepare($find_user);
            $stmt0->bind_param('s', $transaction_id);
            $stmt0->execute();
            $stmt0->store_result();

            if($stmt0->num_rows == 1){
                $stmt0->bind_result($user);

                if($stmt0->fetch()){
                    $stmt1 = $this->link->prepare($get_email);
                    $stmt1->bind_param('s', $user);
                    $stmt1->execute();
                    $stmt1->store_result();
                    
                    if($stmt1->num_rows == 1){
                        $stmt1->bind_result($fn, $ln, $email);
                        $stmt1->fetch();
                    }
                }
            }

            $html = '
                <center>
                <img src="https://static.vecteezy.com/system/resources/previews/001/312/428/non_2x/monitor-with-password-and-shield-free-vector.jpg" width="30%" height="30%" />
                </center>
                <h1> Hi '.$fn.'&nbsp;'.$ln.' </h1>
                <p>Transaction Number : <b>'.$transaction_id.'</b></p>
                <center>
                <br>
                <h4>Product&nbsp;&nbsp;&nbsp;&nbsp;Quantity&nbsp;&nbsp;Subtotal</h4>
                <hr>
            ';

            for($i = 0; !empty($cart['names'][$i]); $i++){
                $html .= '<h3> '.$cart['names'][$i].'&nbsp;&nbsp;&nbsp;&nbsp;'.$cart['quantities'][$i].'&nbsp;&nbsp;&nbsp;&nbsp;'.$cart['subtotals'][$i].' </h3>';
            }

            $html .= '<br><hr></center><h1> Remaining Amount to Pay : PHP '.$cart['total'].' </h1>';

            $mail = new PHPMailer(); // create a new object
            $mail->IsSMTP(); // enable SMTP
            $mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
            $mail->SMTPAuth = true; // authentication enabled
            $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
            $mail->Host = "smtp.gmail.com";
            $mail->Port = 465; //SSL:465 | TLS: 587
            $mail->IsHTML(true);
            $mail->Username = "jedterrazola03@gmail.com";
            $mail->Password = "lwioojflkykswqdp";
            $mail->SetFrom("jedterrazola03@gmail.com", "Jed Terrazola");
            $mail->Subject = "RJ Avancena - Your order has been approved!";
            $mail->Body = $html;
            $mail->AddAddress("$email");
            $mail->Send();
        }

        public function confirmTransact($transaction_id, $date){
            $response['success'] = false;
            
            $confirm = 'UPDATE tbl_transactions SET status = ? WHERE transaction_id = ?';
            $add_date = 'UPDATE tbl_transactions SET est_delivery = ? WHERE transaction_id = ?';
            $new_status = 'confirmed';

            $this->StartConnection();
            
            // update : adding sold when order is confirmed
            // get the cart first based on transaction id
            $get_cart = 'SELECT purchased_items FROM tbl_transactions WHERE transaction_id = ?';
            $cart = '';
            $stmt0 = $this->link->prepare($get_cart);
            $stmt0->bind_param('s', $transaction_id);
            $stmt0->execute();
            $stmt0->store_result();

            if($stmt0->num_rows == 1){
                $stmt0->bind_result($cart);

                if($stmt0->fetch()){
                    $cart = json_decode($cart, true);
                    $add_sold = 'UPDATE inventory SET sold = (sold + ?) WHERE serialnumber = ?';
                    $stmt1 = $this->link->prepare($add_sold);

                    for($i = 0; !empty($cart['ids'][$i]); $i++){
                        $current_qty = $cart['quantities'][$i];
                        $current_serial = $cart['ids'][$i];

                        $stmt1->bind_param('is', $current_qty, $current_serial);
                        $stmt1->execute();
                    }
                    
                }
            }

            if($stmt = $this->link->prepare($confirm)){
                $stmt->bind_param('ss', $new_status, $transaction_id);

                if($stmt->execute()){
                    $stmt1 = $this->link->prepare($add_date);
                    $stmt1->bind_param('ss', $date, $transaction_id);
                    $stmt1->execute();
                    $response['success'] = true;
                }
            }
            
            $this->send_receipt_email($transaction_id, $cart);

            header('Content-Type: application/json');
            echo json_encode($response);
            
        }
    }

    $new = new Transactions();

    $page = empty($_POST['page']) ? '1' : $_POST['page'];
    $sessionID = $_POST['sessionID'];
    if(isset($_POST['search']) && isset($_POST['sessionID'])){
        $search = $_POST['search'];
        $new->GetTransactions($sessionID, $page, $search, true);
    }elseif(isset($_POST['sessionID'])){
        $new->GetTransactions($sessionID, $page, '', false);
    }elseif(isset($_POST['transaction'])){
        $data = json_decode($_POST['transaction'], true);
        
        if($data['type'] == 'void')
            $new->voidTransact($data['trn_id']);
        elseif($data['type'] == 'confirm')
            $new->confirmTransact($data['trn_id'], $data['date']);
        elseif($data['type'] == 'cancel')
            $new->cancelTransact($data['trn_id']);
        elseif($data['type'] == 'delivered')
            $new->deliveredTransact($data['trn_id']);
    }
?>