<?php

session_start();
error_reporting(0);
if(!isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == false){
    session_destroy();
    header('Location: /main/login.php');
}

?>

<!DOCTYPE html>
<!-- Language : English -->
<html lang="en-US">
    <head>
        <!-- Text encoding -->
        <meta charset="UTF-8">
        <!-- Meta tag for responsive webview -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Page title -->
        <title>My Cart</title>
        <!-- Bootstrap 5.2 CSS file -->
        <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
        <!-- SweetAlert2 CSS file -->
        <?php if($_SESSION['theme'] == 'dark'){echo'<link rel="stylesheet" href="/assets/css/dark.min.css">';}else{echo'<link rel="stylesheet" href="/assets/css/sweetalert2.min.css">';}?>
        <!-- Custom CSS file -->
        <link rel="stylesheet" href="../assets/css/custom.css">
        <!-- JQuery 3.6.1 (hosted by Google) -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js" defer></script>
    </head>
    <body class="<?php echo $_SESSION['theme']; ?>">        
        <input type="hidden" id="account-id" value="<?php echo $_SESSION['user_id']; ?>">
        <input type="hidden" id="address-1" value="<?php echo $_SESSION['address1']; ?>">
        <input type="hidden" id="address-2" value="<?php echo $_SESSION['address2']; ?>">
        <div class="container bg-dark text-light py-2 d-flex d-md-none justify-content-evenly gap-1 fixed-bottom">                    
            <button type="button" class="btn back btn-outline-light btn-md text-sm">
                <i class="bi bi-house-door-fill"></i>&nbsp;&nbsp;Home
            </button>
            <button type="button" class="open-cart btn btn-outline-light btn-md text-sm">
                <i class="bi bi-cart-fill"></i>&nbsp;&nbsp;My Cart
            </button>
            <button type="button" class="open-orders btn btn-outline-light btn-md text-sm">
                <i class="bi bi-bag-fill"></i>&nbsp;&nbsp;My Orders
            </button>
        </div>
        <!-- Off canvas : profile -->
        <div class="offcanvas offcanvas-start" data-bs-backdrop="static" tabindex="-1" id="profile-modal" aria-labelledby="profile-modal-label">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title text-l" id="profile-modal-label">Profile</h5>
                <button type="button" class="btn btn-md text-m btn-secondary text-reset" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i class="bi bi-x text-light"></i>
                </button>
            </div>
            <div class="offcanvas-body">
                <div class="container">
                    <div class="row mb-4">
                        <div class="container d-flex justify-content-center">
                            <div class="sample-image bg-secondary text-light d-flex justify-content-center text-center align-items-center">
                                <h6 class="text-m mb-0">Profile image here</h6>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="container text-center">
                            <h6 class="text-l fw-bold mb-0"><?php echo $_SESSION['name'];?></h6>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="container">
                            <h6 class="text-m fw-bold">Your Address</h6>
                            <textarea id="address" required class="form-control text-m invertable bg-<?php echo $_SESSION['theme']; ?>" rows="3"><?php echo $_SESSION['address'];?></textarea>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="container">
                            <button id="logout" type="button" class="btn btn-md btn-danger text-m fw-bold">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid main-screen">
        <div class="row bg-dark text-light py-2 mb-0">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-auto ms-md-5 ps-md-5 me-0 text-end" data-bs-toggle="offcanvas" data-bs-target="#profile-modal" aria-controls="profile-modal">
                            <i class="bi bi-person-circle text-xxl"></i>
                        </div>
                        <div class="col text-start">
                            <h6 class="text-m mb-0 fw-bold">RJ Avancena Enterprises</h6>
                        </div>
                        <div class="col-auto me-0 me-md-5 pe-md-5 text-end d-none d-md-grid">
                            <div class="row">
                                <div class="container gap-1 d-flex">
                                    <button type="button" class="btn back btn-outline-light btn-md text-sm">
                                        <i class="bi bi-house-door-fill"></i>&nbsp;&nbsp;Home
                                    </button>
                                    <button type="button" class="open-cart btn btn-outline-light btn-md text-sm">
                                        <i class="bi bi-cart-fill"></i>&nbsp;&nbsp;My Cart
                                    </button>
                                    <button type="button" class="open-orders btn btn-outline-light btn-md text-sm">
                                        <i class="bi bi-bag-fill"></i>&nbsp;&nbsp;My Orders
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid py-4 min-toast bg-custom-primary text-light fixed-bottom mb-5 mb-md-3 d-none" style="z-index: 1200;">
                <div class="container">
                    <h6 class="text-m fw-bold mb-0" id="status-text"></h6>
                </div>
            </div>
            <div class="row mb-2 paste-here">
                <div class="container invertable bg-<?php echo $_SESSION['theme']; ?> overflow-y-scroll changing-content" name="cart">
                    <input type="hidden" id="customer-name" value="<?php echo $_SESSION['name']; ?>">
                    <div class="row align-items-center py-md-3">
                        <div class="col col-md ps-md-5 ms-md-5 d-flex align-items-center">
                            <i class="bi bi-cart-fill text-xxl"></i>&nbsp;&nbsp;
                            <h6 class="text-l fw-bold mb-0">My Cart</h6>
                        </div>
                        <div class="col-auto col-md-auto pe-md-5 me-md-5">
                            <div class="container bg-success py-1 rounded text-end">
                                <h6 id="cart-count" class="text-sm text-light fw-bold mb-0">0 items selected.</h6>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="container cart-display">
                            <div class="row cart-empty">
                                <div class="container py-5 text-center">
                                    <h6 class="text-m fw-bold mb-0">No items on cart.</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col text-end">
                            <h6 class="text-danger fw-bolder text-l" id="final-total">PHP 00,000.00</h6>
                        </div>
                        <div class="col-auto">
                            <button type="button" class="confirm-order btn btn-md btn-primary fw-bold text-m" disabled>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bootstrap 5.2 JS file bundled with Popper JS -->
        <script src="/assets/js/bootstrap.bundle.min.js" defer></script>
        <!-- SweetAlert2 JS file -->
        <script src="/assets/js/sweetalert2.min.js" defer></script>
        <!-- Custom JS file -->
        <script type="text/javascript" src="/assets/js/customer/index.js" defer></script>
    </body>
</html>