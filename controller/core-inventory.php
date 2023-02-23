<?php
require('../controller/classes.php');
error_reporting(0);
final class JSON extends Database{

    public function InventoryJSON(string $session, string $pageNo, string $search, bool $bool){

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

        $system = $this->FetchSingleRow("SELECT * FROM system_settings;");
        if($system){
            $difference = $system['inventory_diff'];
            $cashier_edit = $system['cashier_edit'];
        }

        if($settings != ''){
            $data['s_rowcount'] = $per_page_record = $settings['row_inv'];
            $data['s_inventory'] = $invCate = $settings['inventory'];
            // $data['s_difference'] = $difference = $settings['difference'];
            //$data['s_merchandise'] = $settings['merchandise'];
            //$data['s_accounts'] = $settings['accounts'];
            //$data['s_transactions'] = $settings['transactions'];
            //$data['s_orders'] = $settings['orders'];
            $data['s_volume'] = $settings['volume'];
            //$data['s_theme'] = $settings['theme'];
            //$data['s_rowcount'] = $settings['rowcount'];
            //$data['s_items'] = $settings['itemsPerRow'];
            $data['s_alert'] = $settings['alert'];
        }

        $selectAllCategories = "SELECT category, prefix FROM inventory GROUP BY prefix ORDER BY category ASC";
        $executeAllCategories = mysqli_query($link, $selectAllCategories);

        $categories = array();
        $arr_num_rows = mysqli_num_rows($executeAllCategories);
        $c = 0;
        while($row = mysqli_fetch_assoc($executeAllCategories)) {
            $data['arr_category'][$c] = $row['category'];
            $data['arr_prefix'][$c] = $db_cat = $row['prefix'];
            $data['arr_price_qty'][$c] = $this->FetchSingleData("SELECT SUM(price * quantity) FROM inventory WHERE prefix = '$db_cat'");
            $data['arr_qty'][$c] = $this->FetchSingleData("SELECT SUM(quantity) FROM inventory WHERE prefix = '$db_cat';");
            $categories[$c] = $row['prefix'];
            $c++;
        }

        if(array_search($invCate, $categories) != ''){
            $does_exist = true;
        }else{
            $does_exist = false;
            $categoryZero = $categories[0];
            $this->ExecuteQuery("UPDATE settings SET inventory = '$categoryZero' WHERE accnum = '$session'");
        }
        
        if($bool == true && $search != ''){
            if(strtolower($search) == 'all'){
                $sqlInventoryCount = "SELECT COUNT(*) FROM inventory";
            }else{
                $sqlInventoryCount = "SELECT COUNT(*) FROM inventory WHERE product LIKE '%$search%' OR serialnumber LIKE '%$search%' OR supplier LIKE '%$search%' OR category LIKE '%$search%'";
            }
            
        }elseif($bool == false && $does_exist == false){
            $sqlInventoryCount = "SELECT COUNT(*) FROM inventory WHERE prefix = '$categoryZero'";
        }else{
            $sqlInventoryCount = "SELECT COUNT(*) FROM inventory WHERE prefix = '$invCate'";
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
                $sqlFetchInventory = "SELECT * FROM inventory ORDER BY serialnumber ASC";
                $sqlFetchTotalPriceQty = "SELECT SUM(price * quantity) AS totalPrice FROM inventory";
                $sqlFetchQuantity = "SELECT SUM(quantity) FROM inventory";
                $sqlFetchPrice = "SELECT SUM(price) FROM inventory";
            }else{
                $sqlFetchInventory = "SELECT * FROM inventory WHERE product LIKE '%$search%' OR serialnumber LIKE '%$search%' OR supplier LIKE '%$search%' OR category LIKE '%$search%' ORDER BY serialnumber ASC";
                $sqlFetchTotalPriceQty = "SELECT SUM(price * quantity) AS totalPrice FROM inventory WHERE product LIKE '%$search%' OR serialnumber LIKE '%$search%' OR supplier LIKE '%$search%' OR category LIKE '%$search%';";
                $sqlFetchQuantity = "SELECT SUM(quantity) FROM inventory WHERE product LIKE '%$search%' OR serialnumber LIKE '%$search%' OR supplier LIKE '%$search%' OR category LIKE '%$search%' ;";
                $sqlFetchPrice = "SELECT SUM(price) FROM inventory WHERE product LIKE '%$search%' OR serialnumber LIKE '%$search%' OR supplier LIKE '%$search%' OR category LIKE '%$search%';";
            }
        }elseif($bool == false && $does_exist == false){
            $sqlFetchInventory = "SELECT * FROM inventory WHERE prefix = '$categoryZero' ORDER BY serialnumber ASC LIMIT $start_from, $per_page_record";
            $sqlFetchTotalPriceQty = "SELECT SUM(price * quantity) FROM inventory WHERE prefix = '$categoryZero';";
            $sqlFetchQuantity = "SELECT SUM(quantity) FROM inventory WHERE prefix = '$categoryZero';";
            $sqlFetchPrice = "SELECT SUM(price) FROM inventory WHERE prefix = '$categoryZero';";
            $table_category = $this->FetchSingleData("SELECT category FROM inventory WHERE prefix = '$categoryZero'");
        }else{
            $sqlFetchInventory = "SELECT * FROM inventory WHERE prefix = '$invCate' ORDER BY serialnumber LIMIT $start_from, $per_page_record";
            $sqlFetchTotalPriceQty = "SELECT SUM(price * quantity) FROM inventory WHERE prefix = '$invCate';";
            $sqlFetchQuantity = "SELECT SUM(quantity) FROM inventory WHERE prefix = '$invCate';";
            $sqlFetchPrice = "SELECT SUM(price) FROM inventory WHERE prefix = '$invCate';";
            $table_category = $this->FetchSingleData("SELECT category FROM inventory WHERE prefix = '$invCate'");
        }

        $totalQty = $this->FetchSingleData($sqlFetchQuantity);
        $totalPrice = $this->FetchSingleData($sqlFetchPrice);
        $totalPriceQty = $this->FetchSingleData($sqlFetchTotalPriceQty);

        if($totalPrice == null){
            $totalPrice = 0;
        }if($totalQty == null){
            $totalQty = 0;
        }if($totalPriceQty == null){
            $totalPriceQty = 0;
        }if($total_pages == 0){
            $total_pages = 1;
        }if($records == 0 && $total_records == 0){
            $table_category = 'NO RESULTS';
        }

        $sqlFetchRestock = "SELECT * FROM inventory WHERE quantity - reorder <= '$difference'";
        $executeRestock = mysqli_query($link, $sqlFetchRestock);

        $total_r_low = 0;
        $total_r_crit = 0;
        if(($r_num_rows = mysqli_num_rows($executeRestock)) > 0){
            $r = 0;
            while($restock = mysqli_fetch_assoc($executeRestock)){
                if(($restock['quantity'] - $restock['reorder'] <= $difference) && ($restock['quantity'] != $restock['reorder'])) {
                    $r_class = "warning";
                    $r_color = 'FFC107';
                    $total_r_low++;
                }elseif($restock['quantity'] <= $restock['reorder']) {
                    $r_class = "danger";
                    $r_color = 'DC3545';
                    $total_r_crit++;
                }
                $data['r_id'][$r] = $restock['id'];
                $data['r_serial'][$r] = $restock['serialnumber'];
                $data['r_sku'][$r] = $restock['sku'];
                $data['r_product'][$r] = $restock['product'];
                $data['r_category'][$r] = $restock['category'];
                // $data['r_prefix'][$r] = $restock['prefix'];
                $data['r_supplier'][$r] = $restock['supplier'];
                $data['r_price'][$r] = $restock['price'];
                $data['r_quantity'][$r] = $restock['quantity'];
                $data['r_sizecolor'][$r] = $restock['size_color'];
                $data['r_reorder'][$r] = $restock['reorder'];
                $data['r_specs'][$r] = $restock['specs'];
                // $data['r_encoder'][$r] = $restock['encoder'];
                $data['r_filename'][$r] = $restock['filename'];
                // $data['r_filepath'][$r] = $restock['filepath'];
                $data['r_filesrc'][$r] = $restock['filesrc'];
                // $data['r_date'][$r] = $restock['date'];
                // $data['r_time'][$r] = $restock['time'];
                $data['r_class'][$r] = $r_class;
                $data['r_color'][$r] = $r_color;
                $r++;
            }
        }

        $sqlExecuteFetchInventory = mysqli_query($link, $sqlFetchInventory);

        if(($i_num_rows = mysqli_num_rows($sqlExecuteFetchInventory)) > 0){
            $i = 0;
            $total_low = $total_good = $total_crit = 0;
            while($row = mysqli_fetch_assoc($sqlExecuteFetchInventory)){
                if (($row['quantity'] - $row['reorder'] <= $difference) && ($row['quantity'] != $row['reorder'])) {
                    $status = "Low";
                    $class = "warning";
                    $total_low++;
                    $color = 'FFC107';
                }elseif($row['quantity'] <= $row['reorder']) {
                    $status = "Critical";
                    $class = "danger";
                    $total_crit++;
                    $color = 'DC3545';
                }elseif (($row['quantity'] - $row['reorder'] >= $difference) && ($row['quantity'] != $row['reorder'])) {
                    $status = "Good";
                    $class = "success";
                    $total_good++;
                    $color = '198754';
                }
                $data['i_id'][$i] = $row['id'];
                $data['i_serial'][$i] = $row['serialnumber'];
                $data['i_sku'][$i] = $row['sku'];
                $data['i_product'][$i] = $row['product'];
                $data['i_category'][$i] = $row['category'];
                $data['i_prefix'][$i] = $row['prefix'];
                $data['i_supplier'][$i] = $row['supplier'];
                $data['i_sizecolor'][$i] = $row['size_color'];
                $data['i_slides_001'][$i] = $row['slides_001'];
                $data['i_slides_002'][$i] = $row['slides_002'];
                $data['i_slides_003'][$i] = $row['slides_003'];

                // $data['i_filename_001'][$i] = $row['filename_003'];
                // $data['i_filename_002'][$i] = $row['filename_003'];
                // $data['i_filename_003'][$i] = $row['filename_003'];        

                $data['i_price'][$i] = $row['price'];
                $data['i_quantity'][$i] = $row['quantity'];
                $data['i_reorder'][$i] = $row['reorder'];
                $data['i_specs'][$i] = $row['specs'];
                $data['i_encoder'][$i] = $row['encoder'];
                $data['i_filename'][$i] = $row['filename'];
                $data['i_filepath'][$i] = $row['filepath'];
                $data['i_filesrc'][$i] = $row['filesrc'];
                $data['i_encoder'][$i] = $row['encoder'];
                $data['i_date'][$i] = $row['date'];
                $data['i_time'][$i] = $row['time'];
                $data['i_status'][$i] = $status;
                $data['i_color'][$i] = $color;
                $data['i_class'][$i] = $class;
                $i++;
            }
        }
        
        $data['i_num_rows'] = $i_num_rows;
        $data['r_num_rows'] = $r_num_rows;
        $data['arr_num_rows'] = $arr_num_rows;
        
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

        $data['table_total_crit'] = $total_crit;
        $data['table_total_low'] = $total_low;
        $data['table_total_good'] = $total_good;

        $data['table_total_qty'] = $totalQty;
        $data['table_total_price'] = $totalPrice;
        $data['table_total_price_qty'] = $totalPriceQty;

        $data['r_low'] = $total_r_low;
        $data['r_critical'] = $total_r_crit;
        $data['r_total'] = $data['r_critical'] + $data['r_low'];



        header('Content-Type: application/json');
        echo json_encode($data);
        
    }
}

    $json = new JSON();
    
    // if(isset($_POST['page'])){
    //     $page = $_POST['page'];
    // }else{
    //     $page = 1;
    // }
    $page = empty($_POST['page']) ? '1' : $_POST['page'];
    $sessionID = $_POST['sessionID'];
    if(isset($_POST['search']) && isset($_POST['sessionID'])){
        $search = $_POST['search'];
        $json->InventoryJSON($sessionID, $page, $search, true);
    }elseif(isset($_POST['sessionID'])){
        $json->InventoryJSON($_POST['sessionID'], $page, '', false);
    }else{
        header('Location: /index.php');
    }
?>