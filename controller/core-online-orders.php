<?php

    require('../controller/classes.php');
    error_reporting(0);
    final class Transactions extends Database{
        public function GetOrders(string $session, string $pageNo, string $search, bool $bool){
            $link = $this->StartConnection();
            $settings = $this->Settings($session);
    
            $data = [];
    
            if($settings != ''){
                $data['s_rowcount'] = $per_page_record = $settings['row_ord'];
                $data['s_transactions'] = $userCategory =  $settings['transactions'];
                $data['s_alert'] = $settings['alert'];
            }
    
            $selectAllCategories = "SELECT `type` FROM tbl_transactions WHERE type = 'online' GROUP BY `type`";
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
                    $sqlInventoryCount = "SELECT COUNT(*) FROM tbl_transactions WHERE status = 'pending'";
                }else{
                    $sqlInventoryCount = "SELECT COUNT(*) FROM tbl_transactions WHERE transaction_id LIKE '%$search%' OR user_id LIKE '%$search%' OR `type` LIKE '%$search%' OR transaction_date LIKE '%$search%' ORDER BY transaction_date ASC, `type`";
                }
            }elseif($bool == false && $does_exist == false){
                $sqlInventoryCount = "SELECT COUNT(*) FROM tbl_transactions WHERE `type` = '$categoryZero' AND status = 'pending'";
            }else{
                $sqlInventoryCount = "SELECT COUNT(*) FROM tbl_transactions WHERE `type` = '$userCategory' AND status = 'pending'";
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
                    $sqlGetAccounts = "SELECT * FROM tbl_transactions WHERE status = 'pending' ORDER BY accnum ASC";
                }else{
                    $sqlGetAccounts = "SELECT * FROM tbl_transactions WHERE status = 'pending' AND transaction_id LIKE '%$search%' OR user_id LIKE '%$search%' OR `type` LIKE '%$search%' OR transaction_date LIKE '%$search%' ORDER BY transaction_date ASC, `type`";
                }
            }elseif($bool == false && $does_exist == false){
                $sqlGetAccounts = "SELECT * FROM tbl_transactions WHERE `type` = '$categoryZero' AND status = 'pending' ORDER BY transaction_date ASC LIMIT $start_from, $per_page_record";
                $table_category = $this->FetchSingleData("SELECT `type` FROM tbl_transactions WHERE `type` = '$categoryZero'");
            }else{
                $sqlGetAccounts = "SELECT * FROM tbl_transactions WHERE `type` = '$userCategory' AND status = 'pending' ORDER BY transaction_date LIMIT $start_from, $per_page_record";
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
                    $data['trn_total'][$i] = json_decode($row['purchased_items'])->finaltotal;
                    $data['trn_ids'][$i] = json_decode($row['purchased_items'])->ids;
                    $data['trn_status'][$i] = ucwords($row['status']);
                    $data['trn_total'][$i] = $row['total_price'];
                    $data['trn_shipping'][$i] = $row['shipping'];
                    $data['trn_discount'][$i] = $row['discount']; 
                    $data['trn_final'][$i] = $row['finalprice'];
                    $data['trn_address'][$i] = $row['address'];
                    $data['trn_change'][$i] = $row['cashchange'];
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
    
    }

    $new = new Transactions();

    $page = empty($_POST['page']) ? '1' : $_POST['page'];
    $sessionID = $_POST['sessionID'];
    if(isset($_POST['search']) && isset($_POST['sessionID'])){
        $search = $_POST['search'];
        $new->GetOrders($sessionID, $page, $search, true);
    }elseif(isset($_POST['sessionID'])){
        $new->GetOrders($sessionID, $page, '', false);
    }else{
        // header('Location: /index.php');
    }   
?>