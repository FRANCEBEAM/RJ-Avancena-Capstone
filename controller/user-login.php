<?php

    require('../controller/classes.php');
    error_reporting(0);
    final class Login extends Database{

        public function VerifyOTP(String $username, String $password, Int $otp){
            if($this->FetchSingleData("SELECT COUNT(*) FROM accounts WHERE username = '$username' AND status = 'Active'") == 1){
                
                $find = $this->FetchSingleRow("SELECT accnum, firstname, hashed_password, lastname, userlevel, profilesrc, house, street, barangay, city, province, address_2 FROM `accounts` WHERE username = '$username'");
                
                if(!empty($find)){

                    $hashed_password = $find['hashed_password'];
                    
                    if(password_verify($password, $hashed_password)){
                        
                        if($otp == $this->FetchSingleData("SELECT otp FROM `accounts` WHERE username = '$username'")){
    
                            $userlevel = $find['userlevel'];

                            if($userlevel == 'Administrator'){
                                session_start();
                                $_SESSION['userNo'] = $find['accnum'];
                                $_SESSION['userID'] = $find['firstname'] . ' ' . $find['lastname'];
                                $_SESSION['userLv'] = $find['userlevel'];
                                header('Location: /administrator/dashboard.php'); 
                            }elseif($userlevel == 'Cashier'){
                                session_start();
                                $_SESSION['userNo'] = $find['accnum'];
                                $_SESSION['userID'] = $find['firstname'] . ' ' . $find['lastname'];
                                $_SESSION['userLv'] = $find['userlevel'];
                                header('Location: /cashier/inventory.php');
                            }elseif($userlevel == 'Customer'){
                                session_start();
                                $_SESSION['src'] = $find['profilesrc'];
                                $_SESSION['user_id'] = $find['accnum'];
                                $_SESSION['logged_in'] = true;
                                $_SESSION['username'] = $username;
                                $_SESSION['address2'] = $find['address_2'];
                                $_SESSION['name'] = $find['firstname'] . ' ' . $find['lastname'];
                                $_SESSION['address1'] = $find['house'] . ', ' . $find['street'] . ', ' . $find['barangay'] . ', ' . $find['city'] . ', ' . $find['province'];
                                $_SESSION['theme'] = 'light';
                                header('Location: /customer/index.php');
                            }
                        }else{
                            // session_start();

                            // $_SESSION['step'] = 'Wrong OTP';
                            // $_SESSION['username'] = $username;
                            // $_SESSION['password'] = $password;

                            // header('Location: '. $_SERVER['HTTP_REFERER']);
                        }
                    }else{
                        echo 'wrong-pw';
                    }
                }
            }else{
                echo "FAILED";
            }
        }
    }

    $log = new Login();

    if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['otp'])){
        $log->VerifyOTP($_POST['username'], $_POST['password'], $_POST['otp']);
    }
?>