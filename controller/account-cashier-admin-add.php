<?php
        require("../controller/classes.php");
        require("../vendor/autoload.php");
        
        error_reporting(0);

        use PHPMailer\PHPMailer\PHPMailer;

        $generate = new GenerateString();
        $db = new Database();

        $fullname = $contact = $birthday = $address = $username = "";

        $firstname = $db->PostSecure($_POST["firstname"]);
        $lastname = $db->PostSecure($_POST["lastname"]);
        $fullname .= $firstname." ".$lastname;
        $username = $db->PostSecure($_POST["username"]);
        $password = $db->PostSecure($_POST["password"]);
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
        $userlevel = $db->PostSecure($_POST["userlevel"]);
        $user = ucwords($userlevel);

        $AccNo = intval($generate->AccountNumber());
        $AccountNum = 'rja_'.bin2hex(random_bytes(15));

        $otp = $generate->RandomOTP(6);  

        if(!empty($username) && !empty($password) && !empty($fullname) && !empty($address) ){
                
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $sqlAccounts = "INSERT INTO accounts (firstname, lastname, fullname, username, hashed_password, email, contact, otp, birthmonth, birthday, birthyear, birthdate, house, street, barangay, address, userlevel, accint, accnum) VALUES ('$firstname', '$lastname', '$fullname', '$username', '$hashed_password', '$email', '$contact', '$otp', '$month', '$day', '$year', '$birthday', '$house', '$street', '$barangay', '$address', '$userlevel', '$AccNo', '$AccountNum')";
                $executeAccounts = $db->ExecuteQuery($sqlAccounts);
                $sqlSettings = "INSERT INTO settings (accnum) VALUES ('$AccountNum')";
                $executeSettings = $db->ExecuteQuery($sqlSettings);

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
                $mail->Subject = "RJ Avancena Account [$user]";
                $mail->Body = "
                                <center>
                                <img src='https://i.postimg.cc/J73kHnkT/vector.jpg' width='80%' height='80%' />
                                </center>
                                <h1> Hi $fullname! </h1>
                                <p>We would like to thank you for registering to RJ Avancena Enterprises.</p>
                                        <p>Here are your account details:</p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp; Username: <b>$username</b></p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp; Password: <b>$password</b></p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp; Contact Number: <b>0$contact</b></p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp; OTP: <b>$otp</b></p>
                                        <p>You can sign-in <a href='https://rjaenterprise.000webhostapp.com/'>here</a>.</p>
                                ";
                $mail->AddAddress("$email");
                $mail->Send();

                $data = [];

                if($executeAccounts && $executeSettings){
                        $data['msg_title'] = "Account Created!";
                        $data['msg_prompt'] = "USER<span class='text-success fw-bolder h5'> $username</span> is created successfully.";
                        $data['msg_notification'] = "<span class='text-dark h5 fw-bolder'>Account Failed!</span><br>USER<span class='text-success fw-bolder h6'> $username</span> is created successfully.";
                        $data['msg_icon'] = "success";
                        header('Content-Type: application/json');
                        echo json_encode($data);
                        
                }else{
                        $data['msg_title'] = "Account Failed!";
                        $data['msg_prompt'] = "USER<span class='text-danger fw-bolder h5'> $username</span> is created unsuccessfully.";
                        $data['msg_notification'] = "<span class='text-dark h5 fw-bolder'>Account Failed!</span><br>USER <span class='text-success fw-bolder h6'>$username</span> is created successfully.";
                        $data['msg_icon'] = "error";
                        header('Content-Type: application/json');
                        echo json_encode($data);
                        
                }
        }
?>
