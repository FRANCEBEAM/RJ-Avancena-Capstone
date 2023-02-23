<?php

session_start();
error_reporting(0);
if(!isset($_SESSION['logged_in'])){
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
        <title>Welcome <?php echo $_SESSION['username']; ?> !</title>
        <!-- Bootstrap 5.2 CSS file -->
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
        <!-- SweetAlert2 CSS file -->
        <?php if($_SESSION['theme'] == 'dark'){echo'<link rel="stylesheet" href="/assets/css/dark.min.css">';}else{echo'<link rel="stylesheet" href="/assets/css/sweetalert2.min.css">';}?>
        <!-- Custom CSS file -->
        <link rel="stylesheet" href="/assets/css/custom.css">
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
        <div class="container-fluid main-screen">
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
                                <h6 class="text-m fw-bold">Main Address</h6>
                                <textarea id="address1" required class="form-control text-m invertable bg-<?php echo $_SESSION['theme']; ?>" rows="3"><?php echo $_SESSION['address1'];?></textarea>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="container">
                                <h6 class="text-m fw-bold">Secondary Address</h6>
                                <textarea id="address2" required class="form-control text-m invertable bg-<?php echo $_SESSION['theme']; ?>" rows="3"><?php echo $_SESSION['address2'];?></textarea>
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="container">
                                <button id="logout" type="button" class="btn btn-md btn-danger text-m fw-bold" onclick="location.href='/controller/logout.php'">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
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
            <div class="container-fluid py-4 min-toast bg-custom-primary text-light fixed-bottom mb-3 d-none" style="z-index: 1200;">
                <div class="container">
                    <h6 class="text-m fw-bold mb-0" id="status-text"></h6>
                </div>
            </div>
            <div class="row mb-2 paste-here">
                <div class="container invertable bg-<?php echo $_SESSION['theme']; ?> py-2 py-md-3 overflow-y-scroll changing-content" name="home">
                    <!-- Off canvas : add product to cart -->
                    <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="add-to-cart-modal" aria-labelledby="add-to-cart-modal-label">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title text-l" id="add-to-cart-modal-label"></h5>
                            <button type="button" class="btn btn-md text-m btn-secondary text-reset" data-bs-dismiss="offcanvas" aria-label="Close">
                                <i class="bi bi-x text-light"></i>
                            </button>
                        </div>
                        <div class="offcanvas-body">
                            <!-- Carousel here -->
                            <div class="row mb-4">
                                <div id="modal-image-indicators" class="carousel slide bg-secondary" data-bs-ride="true">
                                    <div class="carousel-indicators">
                                        <button type="button" data-bs-target="#modal-image-indicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#modal-image-indicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#modal-image-indicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        <button type="button" data-bs-target="#modal-image-indicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                    </div>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img id="modal-image-1" src="" class="d-block w-100 product-image-modal">
                                        </div>
                                        <div class="carousel-item">
                                            <img id="modal-image-2" src="" class="d-block w-100 product-image-modal">
                                        </div> 
                                        <div class="carousel-item">
                                            <img id="modal-image-3" src="" class="d-block w-100 product-image-modal">
                                        </div>
                                        <div class="carousel-item">
                                            <img id="modal-image-4" src="" class="d-block w-100 product-image-modal">
                                        </div>
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#modal-image-indicators" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#modal-image-indicators" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                            <div class="row mb-2">
                                <div class="container">
                                    <h6 class="text-m fw-bold" id="modal-name"></h6>
                                    <h6 class="text-l fw-bolder text-danger" id="modal-price"></h6>
                                    <h6 class="text-sm fw-bold" id="modal-size-color"></h6>
                                    <div class="row mb-2">
                                        <div class="container d-flex flex-row justify-content-between">
                                            <h6 class="text-sm text-sold fw-bolder" id="modal-sold"></h6>
                                            <h6 class="text-sm fw-bold" id="modal-category"></h6>
                                        </div>
                                    </div>
                                    <hr>
                                    <p id="modal-description" class="text-m"></p>
                                    <hr>
                                    <h6 class="text-sm fw-bold" id="modal-stock"></h6>
                                    <div class="row align-items-center">
                                        <div class="col col-md-5">
                                            <div class="input-group">
                                                <button class="modal-minus-one btn btn-secondary text-m fw-bold" disabled>-</button>
                                                <input type="number" min="1" max="" name="" id="modal-quantity" class="form-control text-m text-center fw-bold" value="" placeholder="Quantity" required>
                                                <button class="modal-plus-one btn btn-secondary text-m fw-bold" disabled>+</button>
                                            </div>
                                        </div>
                                        <div class="col-auto col-md-7">
                                            <div class="container d-flex flex-row gap-2">
                                                <div class="input-group justify-content-end">
                                                    <button class="btn btn-md btn-outline-secondary text-m fw-bold" data-bs-dismiss="offcanvas">Cancel</button>
                                                    <button type="submit" name="" class="save-item btn btn-md btn-primary text-m fw-bold" data-bs-dismiss="offcanvas">Save</button>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-10 col-md ps-md-5 ms-md-5">
                            <h6 class="text-l fw-bold mb-3 mb-md-0">Available Products</h6>
                        </div>
                        <div class="col-auto col-md-auto mb-3 mb-md-0">
                            <button type="button" class="open-search btn btn-md btn-primary btn-custom-primary text-m">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                        <div class="col-auto col-md-auto">
                            <h6 class="text-m mb-0">Filter by category :</h6>
                        </div>
                        <div class="col col-md">
                            <select id="categories" class="form-select text-m invertable bg-<?php echo $_SESSION['theme']; ?> text-<?php if($_SESSION['theme'] == 'dark'){echo'light';}else{echo'dark';}?>">
                                <option value="all">All</option>
                            </select>
                        </div>
                        <div class="col-auto col-md-auto pe-md-5 me-md-5">
                            <button type="button" class="refresh-all btn btn-md btn-primary btn-custom-primary text-m">
                                <i class="bi bi-arrow-counterclockwise"></i>
                            </button>
                        </div>
                    </div>
                    <hr>
                    <div class="row justify-content-center">
                        <div class="col-md-11">
                            <div class="container product-display"></div>
                        </div>
                    </div>
                    <hr>
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