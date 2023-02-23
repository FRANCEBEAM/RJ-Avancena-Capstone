<?php
    require_once('../controller/session-admin.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Transactions</title>

        <?php include('../controller/header.php'); ?>
    </head>
    <body class="<?php echo $theme; ?>">
    <?php include('../controller/sidebar-admin.php'); ?>
    <section class="home-section">
        <div class="text">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-8 col-md-8 col-lg-6 text-truncate">
                        <div class="fs-2 fw-bolder text-uppercase" id="title">
                            <span class="text-muted me-2">|</span><span>Transactions History</span>
                        </div>
                    </div>
                    <div class="col-sm-4 col-md-4 col-lg-2 fs-2 align-self-center mb-2">
                        <select class="form-select form-select-lg populate-transactions" id="transaction-type">

                        </select>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-4 fs-2 align-self-center mb-2">
                        <input class="form-control form-control-lg" placeholder="Search" type="search" id="search"></input>
                    </div>
                </div>

                <div class="row">
                    <div class="container">
                        <div class="alert alert-primary p-3 rounded-0 mb-0">
                            <div class="row fs-6">
                                <div class="col-sm-4 text-truncate">CATEGORY [<span class="fw-bolder" id="table-category">...</span>]</div>
                                <div class="col-sm-3 text-truncate">TOTAL RECORDS: <span class="fw-bolder" id="table-records">...</span></div>
                                <div class="col-sm-3 text-truncate">TIME: <span class="fw-bolder time">...</span></div>
                                <div class="col-sm-2 text-truncate">PAGE: <span class="fw-bolder" id="table-pages"></span></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="container">
                                <div class="wrapper overflow-auto">
                                    <table class="table table-light table-striped flex-nowrap text-center align-middle mb-0">
                                        <thead class="h5" id="table-transactions-thead"></thead>
                                        <tbody class="h6" id="table-transactions-tbody"></tbody>
                                    </table>


                                </div>
                                
                                <nav class="text-truncate">
                                    <ul class="pagination justify-content-center mt-4">
                                        <li>
                                            <div class="input-group pagination-btn">
                                                <button class="btn btn-primary  btn-add bi bi-caret-left-fill" id="paginationPrev"></button>
                                                <input type="number" class="btn btn-light border-0" style="width:90px" id="paginationCurr"></input>
                                                <button class="btn btn-primary btn-add bi bi-caret-right-fill" id="paginationNext"></button>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                

            </div>
        </div>
    </section>

    <script src="/assets/js/sidebar.js"></script>
    <script src="/assets/js/transactions.js"></script>
    </body>
</html>