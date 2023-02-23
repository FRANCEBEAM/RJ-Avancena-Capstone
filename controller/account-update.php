<?php
        require("../controller/classes.php");
        error_reporting(0);
        $str = new GenerateString();
        $db = new Database();

        $fullname = $contact = $birthday = $address = $username = "";

        $firstname = $db->PostSecure($_POST["firstname"]);
        $lastname = $db->PostSecure($_POST["lastname"]);
        $fullname .= $firstname." ".$lastname;

        $email = $db->PostSecure($_POST["email"]);
        $temp_contact = $db->PostSecure($_POST["contact"]);
        $contact .= "".$temp_contact;
        $month = $db->PostSecure($_POST["month"]);
        $day = $db->PostSecure($_POST["day"]);
        $year = $db->PostSecure($_POST["year"]);
        $birthday .= $year."-".$month."-".$day;
        $house = $db->PostSecure($_POST["house"]);
        $street = $db->PostSecure($_POST["street"]);
        $barangay = $db->PostSecure($_POST["barangay"]);
        $city = $db->PostSecure($_POST["city"]);
        $province = $db->PostSecure($_POST["province"]);
        $address .= $house." ".$street.", Brgy. ".$barangay.", ".$city.", ".$province;
        $status = $db->PostSecure($_POST["status"]);
        $id = $db->PostSecure($_POST["id"]);

        $temp_username = $db->PostSecure($_POST["username"]);
        $username .= "".$temp_username;

        if(!empty($username) && !empty($fullname) && !empty($address) ){

                $sql = "UPDATE accounts SET firstname='$firstname', lastname='$lastname', fullname='$fullname', username='$username', email='$email', contact='$contact', birthmonth='$month', birthday='$day', birthyear='$year', birthdate='$birthday', house='$house', street='$street', barangay='$barangay', city='$city', province='$province', address='$address', status='$status'  WHERE id = '$id' ";

                if($query = $db->ExecuteQuery($sql)){
                        $data = [];
                        $data['msg_title'] = "Update Success!";
                        $data['msg_prompt'] = "USER <span class='text-success fw-bolder h5'>$username</span> is updated successfully.";
                        $data['msg_notification'] = "<span class='text-dark fw-bolder h5'>Update Success!</span><br>USER <span class='text-success fw-bolder h6'>$username</span> is updated successfully.";
                        $data['msg_icon'] = "success";

                        header('Content-Type: application/json');
                        echo json_encode($data);
                }
        }
?>