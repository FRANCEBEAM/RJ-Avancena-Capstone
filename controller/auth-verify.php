<?php
    require('../controller/classes.php');
    require('../vendor/autoload.php');

    use PHPMailer\PHPMailer\PHPMailer;
    
    
    final class User extends Database{
        public function VerifyUser(String $username){
            
            echo $this->FetchSingleData("SELECT COUNT(*) FROM accounts WHERE username = '$username'");
        }

        public function VerifyEmail(String $email){
            echo $this->FetchSingleData("SELECT COUNT(*) FROM accounts WHERE email = '$email'");
        }

        public function VerifyAccount(String $username, String $password){
            
            if($this->FetchSingleData("SELECT COUNT(*) FROM accounts WHERE username = '$username'") == 1){

                if($this->FetchSingleData("SELECT COUNT(*) FROM accounts WHERE username = '$username' AND status = 'Active'") == 1){
                    $find = $this->FetchSingleRow("SELECT hashed_password, firstname, lastname, email, username, otp FROM `accounts` WHERE username = '$username'");

                    $hashed_password = $find['hashed_password'];
    
                    $characters = '0123456789';
                    $charactersLength = strlen($characters);
                    $otp = '';
                    for ($i = 1; $i <= 6; $i++) {
                        $otp .= $characters[rand(0, $charactersLength - 1)];
                    }
    
                    $this->ExecuteQuery("UPDATE `accounts` SET otp = '$otp' WHERE username = '$username'");
    
                    if(password_verify($password, $hashed_password)){
    
                        $email = $find['email'];
                        $fullname = $find['firstname'] . ' ' . $find['lastname'];
                        $username = $find['username'];
                        
                        echo 'password-ok';
    
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
                        $mail->Subject = "RJ Avancena Account [OTP]";
                        $mail->Body = "
                                        <center>
                                        <img src='https://static.vecteezy.com/system/resources/previews/001/312/428/non_2x/monitor-with-password-and-shield-free-vector.jpg' width='30%' height='30%' />
                                        </center>
                                        <h1> Hi $fullname! </h1>
                                        <p>This is your requested one-time password for your account.</p>
                                                <p>&nbsp;&nbsp;&nbsp;&nbsp; Username: <b>$username</b></p>
                                                <p>&nbsp;&nbsp;&nbsp;&nbsp; New OTP: <b>$otp</b></p>
                                                
                                                <p>You can sign-in here at this <a href=\"https://rjaenterprise.000webhostapp.com/\">link.</a></p>
                                        ";
                        $mail->AddAddress("$email");
    
    
                        $mail->Send();
                    }else{
                        echo 'password-err';
                    }
                }else{
                    echo 'status-err';
                }
                
            }else{
                echo 'account-err';
            }
        }

        public function ResendOTP(String $username){

            if($this->FetchSingleData("SELECT COUNT(*) FROM accounts WHERE username = '$username'") == 1){

                $find = $this->FetchSingleRow("SELECT firstname, lastname, email, username, otp FROM `accounts` WHERE username = '$username'");

                $characters = '0123456789';
                $charactersLength = strlen($characters);
                $otp = '';
                for ($i = 1; $i <= 6; $i++) {
                    $otp .= $characters[rand(0, $charactersLength - 1)];
                }

                $this->ExecuteQuery("UPDATE `accounts` SET otp = '$otp' WHERE username = '$username'");

                $email = $find['email'];
                $fullname = $find['firstname'] . ' ' . $find['lastname'];
                $username = $find['username'];
                
                // echo 3;

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
                $mail->Subject = "RJ Avancena Account [OTP]";
                $mail->Body = "
                                <center>
                                <img src='https://static.vecteezy.com/system/resources/previews/001/312/428/non_2x/monitor-with-password-and-shield-free-vector.jpg' width='30%' height='30%' />
                                </center>
                                <h1> Hi $fullname! </h1>
                                <p>This is your requested one-time password for your account.</p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp; Username: <b>$username</b></p>
                                        <p>&nbsp;&nbsp;&nbsp;&nbsp; New OTP: <b>$otp</b></p>
                                        
                                        <p>You can sign-in here at this <a href=\"https://rjaenterprise.000webhostapp.com/\">link.</a></p>
                                ";
                $mail->AddAddress("$email");


                $mail->Send();
                
            }
        }

        public function VerifyOTP(String $username, String $password, Int $otp){
            if($this->FetchSingleData("SELECT COUNT(*) FROM accounts WHERE username = '$username'") == 1){
                
                $find = $this->FetchSingleRow("SELECT firstname, lastname, otp, hashed_password, userlevel, accnum FROM `accounts` WHERE username = '$username'");
                
                if(!empty($find)){

                    $hashed_password = $find['hashed_password'];
                    

                    if(password_verify($password, $hashed_password)){
                        if($otp == $this->FetchSingleData("SELECT otp FROM `accounts` WHERE username = '$username'")){
                            echo "ok";
                        }else{
                            echo "not";
                        }
                    }else{
                        echo "err";
                    }
                }
                

            }
        }

        public function VerifyUserEmail(String $userEmail, Bool $bool){

            echo $count = $this->FetchSingleData("SELECT COUNT(*) FROM `accounts` WHERE email = '$userEmail' OR username = '$userEmail' LIMIT 1");

            if($count == 1){

                if($bool == true){
                    $find = $this->FetchSingleRow("SELECT firstname, lastname, email, username, otp FROM `accounts` WHERE email = '$userEmail' OR username = '$userEmail' LIMIT 1");
                
                    $characters = '0123456789';
                    $charactersLength = strlen($characters);
                    $otp = '';
                    for ($i = 1; $i <= 6; $i++) {
                        $otp .= $characters[rand(0, $charactersLength - 1)];
                    }
    
                    $this->ExecuteQuery("UPDATE `accounts` SET otp = '$otp' WHERE username = '$userEmail' OR email = '$userEmail'");

                    $email = $find['email'];
                    $fullname = $find['firstname'] . ' ' . $find['lastname'];
                    $username = $find['username'];
                    
                    // echo 3;
    
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
                    $mail->Subject = "RJ Avancena Account [OTP]";
                    $mail->Body = "
                                    <center>
                                    <img src='https://static.vecteezy.com/system/resources/previews/001/312/428/non_2x/monitor-with-password-and-shield-free-vector.jpg' width='30%' height='30%' />
                                    </center>
                                    <h1> Hi $fullname! </h1>
                                    <p>This is your new credentials for your account.</p>
                                            <p>&nbsp;&nbsp;&nbsp;&nbsp; Username: <b>$username</b></p>
                                            <p>&nbsp;&nbsp;&nbsp;&nbsp; OTP: <b>$otp</b></p>
                                            
                                            <p>You can sign-in here at this <a href=\"https://rjaenterprise.000webhostapp.com/\">link.</a></p>
                                    ";
                    $mail->AddAddress("$email");
    
                    $mail->Send();

                }
            }

        }

        public function VerifyUserOTP(String $user, Int $otp, Bool $bool){

            $testUser = $this->FetchSingleData("SELECT COUNT(*) FROM `accounts` WHERE username = '$user' AND otp = '$otp' LIMIT 1");
            $testEmail = $this->FetchSingleData("SELECT COUNT(*) FROM `accounts` WHERE email = '$user' AND otp = '$otp' LIMIT 1");

            if($testUser == 1 || $testEmail == 1){

                if($bool == true){
                    $find = $this->FetchSingleRow("SELECT firstname, lastname, email, username, otp FROM `accounts` WHERE username = '$user' OR email = '$user' AND otp = '$otp' LIMIT 1");
                
                    $characters = '0123456789';
                    $charactersLength = strlen($characters);
                    $otp = '';
                    for ($i = 1; $i <= 6; $i++) {
                        $otp .= $characters[rand(0, $charactersLength - 1)];
                    }
    
                    $this->ExecuteQuery("UPDATE `accounts` SET otp = '$otp' WHERE username = '$user' OR email = '$user'");
    
                    $chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $charactersLen = strlen($chars);
                    $password = '';
                    for ($i = 1; $i <= 8; $i++) {
                        $password .= $chars[rand(0, $charactersLen - 1)];
                    }

                    $hashed = password_hash($password, PASSWORD_DEFAULT);
                    $this->ExecuteQuery("UPDATE `accounts` SET hashed_password = '$hashed' WHERE username = '$user' OR email = '$user'");

                    $email = $find['email'];
                    $fullname = $find['firstname'] . ' ' . $find['lastname'];
                    $username = $find['username'];
                    
                    // echo 3;
    
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
                    $mail->Subject = "RJ Avancena Account [Recovery]";
                    $mail->Body = "
                                    <center>
                                    <img src='https://static.vecteezy.com/system/resources/previews/001/312/428/non_2x/monitor-with-password-and-shield-free-vector.jpg' width='30%' height='30%' />
                                    </center>
                                    <h1> Hi $fullname! </h1>
                                    <p>This is your new credentials for your account.</p>
                                            <p>&nbsp;&nbsp;&nbsp;&nbsp; Username: <b>$username</b></p>
                                            <p>&nbsp;&nbsp;&nbsp;&nbsp; Password: <b>$password</b></p>
                                            
                                            <p>You can sign-in here at this <a href=\"https://rjaenterprise.000webhostapp.com/\">link.</a></p>
                                    ";
                    $mail->AddAddress("$email");
    
                    $mail->Send();

                }
                echo 1;
            }

           
        }


        public function VerifyEmailSession(String $session, String $email, Bool $bool){

            if($bool == true){
                return $this->ExecuteQuery("SELECT COUNT(*) FROM accounts WHERE email = '$email' AND accnum = '$session' LIMIT 1");
            }
        }
        public function VerifyUsernameSession(String $session, String $email, Bool $bool){

            if($bool == true){
                return $this->ExecuteQuery("SELECT COUNT(*) FROM accounts WHERE email = '$email' AND accnum = '$session' LIMIT 1");
            }
        }
    }


    $user = new User();
    if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['otp'])){
        $user->VerifyOTP($_POST['username'], $_POST['password'], $_POST['otp']);
    }elseif(isset($_POST['username']) && isset($_POST['action'])){
        $user->VerifyUser($_POST['username']);
    }elseif(isset($_POST['email'])){
        $user->VerifyEmail($_POST['email']);
    }elseif(isset($_POST['user']) && isset($_POST['pass'])){
        $user->VerifyAccount($_POST['user'], $_POST['pass']);
    }elseif(isset($_POST['userName']) && isset($_POST['otp'])){
        $user->ResendOTP($_POST['userName']);
    }elseif(isset($_POST['UserEmail'])){
        $user->VerifyUserEmail($_POST['UserEmail'], true);
    }elseif(isset($_POST['UserName']) && isset($_POST['OTP'])){
        $user->VerifyUserOTP($_POST['UserName'], $_POST['OTP'], true);
    }elseif(isset($_POST['email']) && isset($_POST['session'])){
        $user->VerifyEmailSession($_POST['session'], $_POST['email'], true);
    }elseif(isset($_POST['username']) && isset($_POST['session'])){
        $user->VerifyUsernameSession($_POST['session'], $_POST['username'], true);
    }

    
?>