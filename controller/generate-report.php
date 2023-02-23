<?php

    require('../controller/classes.php');

    if(isset($_POST['report'])){

        $db = new Database();

        $conn = $db->StartConnection();
        $report = $_POST['report'];

        $data = [];

        if(isset($_POST['datefrom']) && isset($_POST['dateto'])){
            $datefrom = $_POST['datefrom'];
            $dateto = $_POST['dateto'];
    
            $query = "SELECT *, SUM(finalprice) AS finalprices, COUNT(*) AS count FROM tbl_transactions WHERE transaction_date BETWEEN '$datefrom' AND '$dateto' AND `isDone` = 'true' GROUP BY `date` ORDER BY `date` ASC";
            $result = mysqli_query($conn, $query);
    
            if($result){
                $i = 0;
                while($row = mysqli_fetch_array($result)){
                    $data['trn_date'][$i] = date("Y-m-d", strtotime($row['transaction_date']));
                    $data['trn_final'][$i] = $row['finalprices'];
                    $data['trn_count'][$i] = $row['count'];
                    $i++;
                }
            }
            $data['rowlimit'] = $i;
        }else{
            $today =  date("Y-m-d");
            $query = "SELECT *, SUM(finalprice) AS finalprices, COUNT(*) AS count FROM tbl_transactions WHERE transaction_date BETWEEN '2020-01-01' AND '$today' AND `isDone` = 'true' GROUP BY `date` ORDER BY `date` ASC";
            $result = mysqli_query($conn, $query);
    
            if($result){
                $i = 0;
                while($row = mysqli_fetch_array($result)){
                    $data['trn_date'][$i] = date("Y-m-d", strtotime($row['transaction_date']));
                    $data['trn_final'][$i] = $row['finalprices'];
                    $data['trn_count'][$i] = $row['count'];
                    $i++;
                }
            }
            $data['rowlimit'] = $i; 
        }

        $data['year'] = [];
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

        $january = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$jan%' AND `isDone` = 'true'");
        $february = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$feb%' AND `isDone` = 'true'");
        $march = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$mar%' AND `isDone` = 'true'");
        $april = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$apr%' AND `isDone` = 'true'");
        $maye = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$may%' AND `isDone` = 'true'");
        $june = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$jun%' AND `isDone` = 'true'");
        $july = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$jul%' AND `isDone` = 'true'");
        $august = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$aug%' AND `isDone` = 'true'");
        $september = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$sep%' AND `isDone` = 'true'");
        $october = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$oct%' AND `isDone` = 'true'");
        $november = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$nov%' AND `isDone` = 'true'");
        $december = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$dec%' AND `isDone` = 'true'");

        $data['month'] = [
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

        $today = date('Y-m-d');

        $final_total = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE `isDone` = 'true'");
        $daily = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date LIKE '%$today%' AND `isDone` = 'true'");
        $data['finale'] = $final_total != null ? $final_total : 0;
        $data['walkin'] = $db->FetchSingleData("SELECT COUNT(*) FROM tbl_transactions WHERE type = 'online' AND `isDone` = 'true'");
        $data['online'] = $db->FetchSingleData("SELECT COUNT(*) FROM tbl_transactions WHERE type = 'walk-in'");
        $discount = $db->FetchSingleData("SELECT SUM(discount) FROM tbl_transactions WHERE `isDone` = 'true'");

        $today0 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("-1 days")),"Y-m-d");
        $today1 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("0 days")),"Y-m-d");
        $today2 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("1 days")),"Y-m-d");
        $today3 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("2 days")),"Y-m-d");
        $today4 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("3 days")),"Y-m-d");
        $today5 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("4 days")),"Y-m-d");
        $today6 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("5 days")),"Y-m-d");

        $day0 = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date = '$today0' AND `isDone` = 'true'");
        $day1 = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date = '$today1' AND `isDone` = 'true'");
        $day2 = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date = '$today2' AND `isDone` = 'true'");
        $day3 = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date = '$today3' AND `isDone` = 'true'");
        $day4 = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date = '$today4' AND `isDone` = 'true'");
        $day5 = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date = '$today5' AND `isDone` = 'true'");
        $day6 = $db->FetchSingleData("SELECT SUM(finalprice) FROM tbl_transactions WHERE transaction_date = '$today6' AND `isDone` = 'true'");

        $data['day'][0] = $day0 != null ? $day0 : 0;
        $data['day'][1] = $day1 != null ? $day1 : 0;
        $data['day'][2] = $day2 != null ? $day2 : 0;
        $data['day'][3] = $day3 != null ? $day3 : 0;
        $data['day'][4] = $day4 != null ? $day4 : 0;
        $data['day'][5] = $day5 != null ? $day5 : 0;
        $data['day'][6] = $day6 != null ? $day6 : 0;

        $wk0 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("-1 days")),"Y-m-d");
        $wk1 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("5 days")),"Y-m-d");
        $wk2 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("12 days")),"Y-m-d");
        $wk3 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("19 days")),"Y-m-d");
        $wk4 = date_format(date_sub(date_create(date("Y-m-d")), date_interval_create_from_date_string("26 days")),"Y-m-d");

        $week1 = $db->FetchSingleData("SELECT SUM(finalprice) FROM `tbl_transactions` WHERE `transaction_date` BETWEEN '$wk0' AND '$wk1' AND `isDone` = 'true'");
        $week2 = $db->FetchSingleData("SELECT SUM(finalprice) FROM `tbl_transactions` WHERE `transaction_date` BETWEEN '$wk1' AND '$wk2' AND `isDone` = 'true'");
        $week3 = $db->FetchSingleData("SELECT SUM(finalprice) FROM `tbl_transactions` WHERE `transaction_date` BETWEEN '$wk2' AND '$wk3' AND `isDone` = 'true'");
        $week4 = $db->FetchSingleData("SELECT SUM(finalprice) FROM `tbl_transactions` WHERE `transaction_date` BETWEEN '$wk3' AND '$wk4' AND `isDone` = 'true'");

        $data['week'][0] = $week1!= null? $week1 : 0;
        $data['week'][1] = $week2!= null? $week2 : 0;
        $data['week'][2] = $week3!= null? $week3 : 0;
        $data['week'][3] = $week4!= null? $week4 : 0;

        $data['today_s'] = $daily != null ? $daily : 0;

        header('Content-Type: application/json');
        echo json_encode($data);
    }

?>