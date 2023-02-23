<?php

require('../controller/classes.php');
error_reporting(0);
final class JSON extends Database{

    public function InventoryJSON(string $pageNo, string $category, string $search, bool $bool){

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

        $data = [];

        $system = $this->FetchSingleRow("SELECT * FROM system_settings;");
        if($system){
            $difference = $system['inventory_diff'];
        }

        $per_page_record = 500;


        $selectAllCategories = "SELECT category, prefix FROM inventory GROUP BY prefix ORDER BY category ASC";
        $executeAllCategories = mysqli_query($link, $selectAllCategories);

        $categories = array();
        $arr_num_rows = mysqli_num_rows($executeAllCategories);
        
        $c = 0;
        while($row = mysqli_fetch_assoc($executeAllCategories)) {
            $data['arr_category'][$c] = $row['category'];
            $data['arr_prefix'][$c] = $row['prefix'];
            $categories[$c] = $row['prefix'];
            $c++;
        }
        
        $categoryZero = $categories[0];

        if($bool == true && $search != ''){
            if(strtolower($search) == 'all'){
                $sqlInventoryCount = "SELECT COUNT(*) FROM inventory";
            }else{
                $sqlInventoryCount = "SELECT COUNT(*) FROM inventory WHERE product LIKE '%$search%' OR serialnumber LIKE '%$search%' OR supplier LIKE '%$search%' OR category LIKE '%$search%'";
            }
        }elseif($bool == false && $category != ''){
            $sqlInventoryCount = "SELECT COUNT(*) FROM inventory WHERE prefix = '$category' ORDER BY serialnumber";
        }else{
            $sqlInventoryCount = "SELECT COUNT(*) FROM inventory ORDER BY serialnumber";
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
            }else{
                $sqlFetchInventory = "SELECT * FROM inventory WHERE product LIKE '%$search%' OR serialnumber LIKE '%$search%' OR supplier LIKE '%$search%' OR category LIKE '%$search%' ORDER BY serialnumber ASC";
            }
        }elseif($bool == false && $category != ''){
            $sqlFetchInventory = "SELECT * FROM inventory WHERE prefix = '$category' ORDER BY serialnumber LIMIT $start_from, $per_page_record";
        }else{
            $sqlFetchInventory = "SELECT * FROM inventory WHERE prefix = '$categoryZero' ORDER BY serialnumber LIMIT $start_from, $per_page_record";
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
                $data['i_product'][$i] = $row['product'];
                $data['i_category'][$i] = $row['category'];
                $data['i_prefix'][$i] = $row['prefix'];
                $data['i_supplier'][$i] = $row['supplier'];
                $data['i_price'][$i] = '₱'.$row['price'];
                $data['i_quantity'][$i] = $row['quantity'];
                $data['i_reorder'][$i] = $row['reorder'];
                $data['i_specs'][$i] = $row['specs'];
                $data['i_encoder'][$i] = $row['encoder'];
                $data['i_filename'][$i] = $row['filename'];
                $data['i_filepath'][$i] = $row['filepath'];
                $data['i_filesrc'][$i] = $row['filesrc'];

                $data['i_slides_001'][$i] = $row['slides_001'];
                $data['i_slides_002'][$i] = $row['slides_002'];
                $data['i_slides_003'][$i] = $row['slides_003'];
                
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
        $data['arr_num_rows'] = $arr_num_rows;
        $data['category'] = $category != '' ? $category : $categories[0];


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
    $category = $_POST['category'];
    
    if(isset($_POST['action'])){
        if(isset($_POST['search']) && $_POST['action'] == 'search'){
            $search = $_POST['search'];
    
            $json->InventoryJSON($page, '', $search, true);
            // echo 'HAHAHA';
            
        }elseif(isset($_POST['category']) && $_POST['action'] == 'category'){
            $json->InventoryJSON($page, $category, '', false);
            // echo 'HEHE';
        }elseif($_POST['action'] == 'fetch'){
            // echo 'HIHIHI';
            $json->InventoryJSON($page, '', '', false);
        }
    }
?>