<?php
    require('../controller/classes.php');
    require("../vendor/autoload.php");
    $db = new Database();
    $gen = new GenerateString();

    
    use PHPMailer\PHPMailer\PHPMailer;



    if(isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['house']) && isset($_POST['street']) && isset($_POST['barangay'])){
        $firstname = ucwords($db->PostSecure($_POST['firstname']));
        $lastname = ucwords($db->PostSecure($_POST['lastname']));

        $contact = substr($db->PostSecure($_POST['contact']), 1);
        $email = $db->PostSecure($_POST['email']);
        $username = $db->PostSecure($_POST['username']);
        $password = $db->PostSecure($_POST['password']);
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $house = $db->PostSecure($_POST['house']);
        $street = $db->PostSecure($_POST['street']);
        $barangay = $db->PostSecure($_POST['barangay']);

        $userlevel = 'Customer';

        $otp = $gen->RandomOTP(6);
        

        $accnum = 'rja_'.bin2hex(random_bytes(15));

        if($db->FetchSingleData("SELECT COUNT(*) FROM `accounts` WHERE accnum = '$accnum'") == 0){
            
            $conn = $db->StartConnection();
            $sql = "INSERT INTO accounts (accnum,firstname,lastname,username,hashed_password,email,otp,userlevel,contact,house,street,barangay) VALUES ('$accnum', '$firstname', '$lastname', '$username', '$hashed_password', '$email', '$otp', '$userlevel', '$contact','$house', '$street', '$barangay')";
            $execute = mysqli_query($conn, $sql);


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
            $mail->Subject = "RJ Avancena Account [$userlevel]";
            $mail->Body = "
                            <center>
                            <img src='https://i.postimg.cc/J73kHnkT/vector.jpg' width='80%' height='80%' />
                            </center>
                            <h1> Hi $firstname $lastname! </h1>
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


            if($execute){
                echo "ok";
            }else{
                echo "not ok";
            }
        }else{
            echo "duplicate";
        }
    }
?>