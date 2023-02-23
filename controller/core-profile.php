<?php

    require('../controller/classes.php');
    error_reporting(0);
    final class Profile extends Database{
        public function GetProfile(String $session){

            $link = $this->StartConnection();

            $sql = "SELECT * FROM accounts WHERE accnum = '$session' LIMIT 1";
            $result = mysqli_query($link, $sql);

            $data = [];

            if(mysqli_num_rows($result) == 1){
                if($row = mysqli_fetch_assoc($result)){
                    $data['username'] = $row['username'];
                    $data['firstname'] = $row['firstname'];
                    $data['lastname'] = $row['lastname'];
                    $data['contact'] = $row['contact'];
                    $data['email'] = $row['email'];
                    $data['house'] = $row['house'];
                    $data['street'] = $row['street'];
                    $data['barangay'] = $row['barangay'];
                    $data['address'] = $row['house'] . ', ' . $row['street'] . ', ' . $row['barangay'] . ', ' . $row['city'] . ', ' . $row['province'];
                    $data['profilesrc'] = $row['profilesrc'];
                    $data['profilename'] = $row['profilename'];
                    $data['userlevel'] = $row['userlevel'];
                    $data['status'] = $row['status'];
                    $data['date'] = date('F j, Y', strtotime($row['date']));
                    $data['time'] = date('h:i:s A', strtotime($row['time']));
                }
            }
            header('Content-Type: application/json');
            echo json_encode($data);
            
        }
    }
    $new = new Profile();

    if(isset($_POST['sessionID'])){
        $new->GetProfile($_POST['sessionID']);
    }

?>