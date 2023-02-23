<?php
require('../controller/classes.php');

error_reporting(0);

final class JSON extends Database{

    public function DashboardJSON($sessionID, $day, $week, $year, $bool){

        $day = $week = $year = 0;
        $link = $this->StartConnection();

        $settings = $this->FetchNumRows("SELECT rowcount FROM settings WHERE accnum = '$sessionID'");

        $data = [];

        if($settings != 0 && $bool == true){

            $sqlFetchTop3Product = "SELECT product, sold FROM inventory ORDER BY sold DESC LIMIT 10";

            $sqlExecuteTop3Product = mysqli_query($link, $sqlFetchTop3Product);
    
            if((mysqli_num_rows($sqlExecuteTop3Product)) > 0){

                $d = 0;

                while($row = mysqli_fetch_assoc($sqlExecuteTop3Product)){
                    $data['d_product'][$d] = $row['product'];
                    $data['d_quantity'][$d] = $row['sold'];
    
                    $d++;
                }
            }else{
                $data['d_product'] = null;
                $data['d_quantity'] = null;
                $data['d_price'] = null;
            }

            $sqlFetchTop3Category = "SELECT category, COUNT(sold) AS `count` FROM inventory GROUP BY category, prefix LIMIT 10";

            $sqlExecuteTop3Category = mysqli_query($link, $sqlFetchTop3Category);
    
            if((mysqli_num_rows($sqlExecuteTop3Category)) > 0){

                $d = 0;

                while($row = mysqli_fetch_assoc($sqlExecuteTop3Category)){
                    $data['d_category'][$d] = $row['category'];
                    $data['d_count'][$d] = $row['count'];
    
                    $d++;

                    if($data['d_category'][0] == null){
                        $data['d_category'] = null;
                        $data['d_count'] = null;
                    }
                }
            }

            $sqlFetchTop3Category = "SELECT category, price FROM inventory GROUP BY category ORDER BY price LIMIT 3";

            $sqlExecuteTop3Category = mysqli_query($link, $sqlFetchTop3Category);
    
            if((mysqli_num_rows($sqlExecuteTop3Category)) > 0){

                $d = 0;

                while($row = mysqli_fetch_assoc($sqlExecuteTop3Category)){
                    $data['d_category2'][$d] = $row['category'];
                    $data['d_price2'][$d] = $row['price'];
    
                    $d++;
                }
            }else{
                $data['d_category2'] = null;
                $data['d_price2'] = null;
            }

            $data['d_yearly'] = [];

            $jan = date('Y-01-');
            $feb = date('Y-02-');
            $mar = date('Y-03-');
            $apr = date('Y-04-');
            $may = date('Y-05-');
            $jun = date('Y-06-');
            $jul = date('Y-07-');
            $aug = date('Y-08-');
            $sep = date('Y-09-');
            $oct = date('Y-10-');
            $nov = date('Y-11-');
            $dec = date('Y-12-');

            $january = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$jan%' AND `isDone` = 'true'");
            $february = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$feb%' AND `isDone` = 'true'");
            $march = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$mar%' AND `isDone` = 'true'");
            $april = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$apr%' AND `isDone` = 'true'");
            $maye = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$may%' AND `isDone` = 'true'");
            $june = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$jun%' AND `isDone` = 'true'");
            $july = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$jul%' AND `isDone` = 'true'");
            $august = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$aug%' AND `isDone` = 'true'");
            $september = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$sep%' AND `isDone` = 'true'");
            $october = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$oct%' AND `isDone` = 'true'");
            $november = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$nov%' AND `isDone` = 'true'");
            $december = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$dec%' AND `isDone` = 'true'");

            $data['d_yearly'] = [
                $january == null ? 0 : $january,
                $february == null ? 0 : $february,
                $march == null ? 0 : $march,
                $april == null ? 0 : $april,
                $maye == null ? 0 : $maye,
                $june == null ? 0 : $june,
                $july == null ? 0 : $july,
                $august == null ? 0 : $august,
                $september == null ? 0 : $september,
                $october == null ? 0 : $october,
                $november == null ? 0 : $november,
                $december == null ? 0 : $december
            ];
            

            $jan = date('Y-01-d');
            $data['d_final_total'] = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE `isDone` = 'true'");
            $today = date('Y-m-d');
            $data['d_customers'] = $this->FetchSingleData("SELECT COUNT(*) FROM tbl_transactions WHERE `isDone` = 'true'");
            $data['d_users'] = $this->FetchSingleData("SELECT COUNT(*) FROM tbl_transactions WHERE type = 'walk-in'");
            $data['d_discounts'] = $this->FetchSingleData("SELECT SUM(discount) FROM tbl_transactions WHERE `isDone` = 'true'");
            $data['today'] = $today;
            $data['d_daily'] = $this->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$today%' AND `isDone` = 'true'");
            header('Content-Type: application/json');
            echo json_encode($data);
            

        }
    }
}

$json = new JSON();




if(isset($_POST['sessionID'])){
    $sessionID = $_POST['sessionID'];
    $day = empty($_POST['day']) ? '' : $_POST['day'];
    $week = empty($_POST['week']) ? '' : $_POST['week'];
    $year = empty($_POST['year']) ? '' : $_POST['year'];
    $json->DashboardJSON($sessionID, $day, $week, $year, true);
}else{
    // header('Location: /index.php');
}
?>