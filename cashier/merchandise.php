<?php
require("../controller/session-admin.php");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Merchandise</title>

        <?php include('../controller/header.php'); ?>
    </head>
    <body class="<?php echo $theme; ?>">
    <input type="hidden" id="acc_type" value="<?php echo $_SESSION['userLv']; ?>">
    <input type="hidden" id="acc_name" value="<?php echo $_SESSION['userID']; ?>">
    <?php include('../controller/sidebar-admin.php'); ?>
    <section class="home-section">
        <div class="text">
            <div class="container-fluid">
                <!-- <div class="row mb-2">
                    <div class="col-sm-12 col-md-12 col-lg-12 text-truncate">
                        <div class="fs-2 fw-bolder text-uppercase" id="title">
                            <span class="text-muted me-2">|</span><span>Merchandise</span>
                        </div>
                    </div>
                </div> -->

                <div class="row">

                    <div class="col-md-8">
                        <div class="container bg-text-sidebar py-3 rounded main-container-scroll">

                            <div class="row mb-3">
                                <div class="container">

                                    <div class="row mb-2">

                                        <div class="col input-group">
                                            <input type="text" id="search-bar" class="form-control" placeholder="Search">
                                            <button type="button" id="search-btn" class="btn btn-md btn-primary">
                                                <i class="bi bi-search"></i>
                                            </button>
                                        </div>

                                    </div>

                                    <div class="row temp d-none"></div>

                                    <div class="row mb-2">
                                        <div class="container py-2" id="search-results"></div>
                                    </div>

                                </div>
                            </div>

                            <div class="row mb-2">
                                <div class="container">
                                    Available Products
                                </div>
                            </div>
                        
                            <div class="row mb-3 align-items-center">
                                
                                <div class="col-auto">
                                    <h6 class="mb-0">Category : </h6>
                                </div>

                                <div class="col">
                                    <select id="categories" class="form-select"></select>
                                </div>
                                
                            </div>

                            <hr>
    
                            <div class="row mb-2 overflow-y-row">
                                <div class="container" id="product-display"></div>
                            </div>

                            <hr>
    
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="sales-invoice container main-container content bg-text-sidebar rounded mb-1 mb-md-0 py-2">
                        
                            <div class="row align-items-center">
                                <div class="col d-flex align-items-center">
                                    <h6 class="medium-text fw-bold mb-0 me-1"><i class="bi bi-cart-fill"></i>&nbsp;&nbsp;Sales Invoice</h6>
                                    <h6 id="cart-item-count" class="small-text fw-bold mb-0 ms-1 bg-danger text-light rounded px-1 py-1"></h6>
                                </div>
                                <div class="col-auto">
                                    <button id="reload-products" type="button" class="btn btn-md small-text fw-bold btn-success" data-bs-toggle="tooltip" data-bs-placement="top"
                                    data-bs-custom-class="custom-tooltip" data-bs-title="Reload product info and update saved items info on cart. Unavailable products will be removed and previously saved quantities will be adjusted if it does not match the new updated info from the database."><i class="bi bi-arrow-repeat"></i></button>
                                </div>
                            </div>

                            <hr>

                            <div class="row overflow-y-row">
                                <div id="cart-space" class="container d-flex flex-column">
                                    <div class="row" id="no-items">
                                        <div class="col d-flex justify-content-center align-items-center">
                                            <div class="container text-center py-5 my-5">
                                                <h6 class="small-text">No items on cart.</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr>

                            <div class="row mb-2">
                                <div class="col-12">
                                    <div class="container bg-secondary text-light rounded py-2 d-flex align-items-center">
                                        <div class="col">
                                            <h6 class="mb-0 small-text fw-bold text-start">Total : PHP</h6>
                                        </div>
                                        <div class="col">
                                            <h6 id="total-price" class="mb-0 medium-text fw-bold text-end"></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col pe-1">
                                    <button type="button" class="pay btn btn-md btn-success small-text text-light w-100">
                                        <i class="bi bi-cart-check-fill"></i> Pay
                                    </button>
                                </div>
                                <div class="col ps-1">
                                    <button type="button" class="clear btn btn-md btn-danger small-text text-light w-100">
                                        <i class="bi bi-cart-x-fill"></i> Clear
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>

    <!-- -->
    <script src="/assets/js/sidebar.js" defer></script>
    <script src="/assets/js/merchandise.js" defer></script>
    </body>
</html>