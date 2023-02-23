<?php
require('../controller/classes.php');
error_reporting(0);
final class Accounts extends Database{

    public function GetAccounts(string $session, string $pageNo, string $search, bool $bool){

        // CREATE TABLE system_settings (
        //     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        //   `accept_data` varchar(10) NOT NULL DEFAULT 'true',
        //   `inventory_diff` int(10) NOT NULL DEFAULT 10,
        //   `cashier_log` varchar(10) NOT NULL DEFAULT 'true',
        //   `cashier_edit` varchar(10) NOT NULL DEFAULT 'false',
        //   `cashier_del` varchar(10) NOT NULL DEFAULT 'false',
        //   `cashier_void` varchar(10) NOT NULL DEFAULT 'false',
        //   `customer_log` varchar(10) NOT NULL DEFAULT 'true'
        // );

        $link = $this->StartConnection();
        $settings = $this->Settings($session);

        $data = [];

        if($settings != ''){
            $data['s_rowcount'] = $per_page_record = $settings['row_acc'];
            $data['s_accounts'] = $userCategory =  $settings['accounts'];
            $data['s_alert'] = $settings['alert'];
            $primary = $this->FetchSingleData("SELECT primary_admin FROM system_settings LIMIT 1");
            $data['s_userlevel'] = $this->FetchSingleData("SELECT userlevel FROM accounts WHERE accnum = '$session'");
        }

        $selectAllCategories = "SELECT userlevel FROM accounts GROUP BY userlevel";
        $executeAllCategories = mysqli_query($link, $selectAllCategories);

        $arr_num_rows = $this->FetchNumRows($selectAllCategories);
        $categories = array();
        $c = 0;
        while($row = mysqli_fetch_assoc($executeAllCategories)) {
            $categories[$c] = $row['userlevel'];
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
            $this->ExecuteQuery("UPDATE settings SET accounts = '$categoryZero' WHERE accnum = '$session'");
        }
        
        if($bool == true && $search != ''){
            if(strtolower($search) == 'all'){
                $sqlInventoryCount = "SELECT COUNT(*) FROM accounts WHERE accnum != '$primary'";
            }else{
                $sqlInventoryCount = "SELECT COUNT(*) FROM accounts WHERE accnum != '$primary' AND firstname LIKE '%$search%' OR lastname LIKE '%$search%' OR email LIKE '%$search%' OR contact LIKE '%$search%' ORDER BY accnum ASC, userlevel";
            }
        }elseif($bool == false && $does_exist == false){
            $sqlInventoryCount = "SELECT COUNT(*) FROM inventory WHERE accnum != '$primary' AND userlevel = '$categoryZero'";
        }else{
            $sqlInventoryCount = "SELECT COUNT(*) FROM accounts WHERE accnum != '$primary' AND userlevel = '$userCategory'";
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
                $sqlGetAccounts = "SELECT * FROM accounts WHERE accnum != '$primary' ORDER BY accnum ASC";
            }else{
                $sqlGetAccounts = "SELECT * FROM accounts WHERE accnum != '$primary' AND firstname LIKE '%$search%' OR lastname LIKE '%$search%' OR email LIKE '%$search%' OR contact LIKE '%$search%' ORDER BY accnum ASC";
            }
        }elseif($bool == false && $does_exist == false){
            $sqlGetAccounts = "SELECT * FROM accounts WHERE userlevel = '$categoryZero' AND accnum != '$primary' ORDER BY accnum ASC LIMIT $start_from, $per_page_record";
            $table_category = $this->FetchSingleData("SELECT userlevel FROM accounts WHERE userlevel = '$categoryZero'");
        }else{
            $sqlGetAccounts = "SELECT * FROM accounts WHERE userlevel = '$userCategory' AND accnum != '$primary' ORDER BY accnum LIMIT $start_from, $per_page_record";
            $table_category = $this->FetchSingleData("SELECT userlevel FROM accounts WHERE userlevel = '$userCategory'");
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

                $data['i_id'][$i] = $row['id'];
                $data['i_account'][$i] = $row['accnum'];
                $data['i_firstname'][$i] = $row['firstname'];
                $data['i_lastname'][$i] = $row['lastname'];
                $data['i_username'][$i] = $row['username'];
                $data['i_email'][$i] = $row['email'];
                $data['i_contact'][$i] = $row['contact'];
                $data['i_birthmonth'][$i] = $row['birthmonth'];
                $data['i_birthday'][$i] = $row['birthday']; 
                $data['i_birthyear'][$i] = $row['birthyear'];
                $data['i_birthdate'][$i] = date('F j, Y', strtotime($row['birthdate']));
                $data['i_house'][$i] = $row['house'];
                $data['i_street'][$i] = $row['street'];
                $data['i_barangay'][$i] = $row['barangay'];
                $data['i_city'][$i] = $row['city'];
                $data['i_province'][$i] = $row['province'];
                $data['i_status'][$i] = $row['status'];
                $data['i_profilesrc'][$i] = $row['profilesrc'];
                $data['i_address'][$i] = $row['house']. ', '.$row['street']. ', '.$row['barangay'].', '.$row['city'].', '.$row['province'];
                $data['i_userlevel'][$i] = $row['userlevel'];
                $data['i_date'][$i] = date('F j, Y', strtotime($row['date']));
                $data['i_time'][$i] = date('g:i:s A', strtotime($row['time']));
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
        $data['row_acc'] = $per_page_record;
        $data['primary'] = $session == $primary ? true : false;

        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function GetTransactions(String $userID){

        $data = [];


        $conn = $this->StartConnection();

        $sql = "SELECT firstname, lastname, accnum FROM `accounts` WHERE accnum = '$userID'";

        $result = mysqli_query($conn, $sql);



        $i = 0;
        while($row = mysqli_fetch_assoc($result)){
            $data['trn_id'][$i] = $row['accnum'];
            $data['purchased'][$i] = $row['firstname'];
            $data['amount'][$i] = $row['lastname'];
            $i++;
        }
        $data['rowlimit'] = $i;

        header('Content-Type: application/json');
        echo json_encode($data);
    }
}

    $json = new Accounts();
    $page = empty($_POST['page']) ? '1' : $_POST['page'];
    $sessionID = $_POST['sessionID'];
    if(isset($_POST['search']) && isset($_POST['sessionID'])){
        $search = $_POST['search'];
        $json->GetAccounts($sessionID, $page, $search, true);
    }elseif(isset($_POST['sessionID'])){
        $json->GetAccounts($sessionID, $page, '', false);
    }if(isset($_POST['userID'])){
        $userID = $_POST['userID'];
        $json->GetTransactions($userID);
    }
    

?>