<?php
    require_once('../controller/session-admin.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Dashboard</title>
        <?php include('../controller/header.php'); ?>

    </head>
    <body class="<?php echo $theme; ?>">
    <?php include('../controller/sidebar-admin.php'); ?>
    <section class="home-section">
        <div class="text">
            <div class="container-fluid">
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 px-1">
                                <div class="alert alert-primary py-1 mb-2" id="customerDiv">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-9 col-lg-9 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Customers</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="customers">...</span>
                                        </div>
                                        <div class="col-sm-0 col-md-3 col-lg-3 text-truncate text-center py-3 align-self-center d-none d-md-block">
                                            <div class="transform-100" id="customerIcon"><span class="fa-solid fa-users customers"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 px-1">
                                <div class="alert alert-warning py-1 mb-2" id="salesDiv">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-9 col-lg-9 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Sales</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="sales">...</span>
                                        </div>
                                        <div class="col-sm-0 col-md-3 col-lg-3 text-truncate text-center py-3 align-self-center d-none d-md-block">
                                            <div class="transform-100" id="salesIcon"><span class="fa-solid fa-coins sales"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 px-1">
                                <div class="alert alert-danger py-1 mb-2" id="expenseDiv">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-9 col-lg-9 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Discounts</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="expenses">...</span>
                                        </div>
                                        <div class="col-sm-0 col-md-3 col-lg-3 text-truncate text-center py-3 align-self-center d-none d-md-block">
                                            <div class="transform-100" id="expenseIcon"><span class="fa-solid fa-circle-dollar-to-slot expenses"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 px-1">
                                <div class="alert alert-success py-1 mb-2" id="profitDiv">
                                    <div class="row">
                                        <div class="col-sm-12 col-md-9 col-lg-9 text-truncate">
                                            <span class="h5 mb-0 text-uppercase" id="profitStatus">Profits</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="profits">...</span>
                                        </div>
                                        <div class="col-sm-0 col-md-3 col-lg-3 text-truncate text-center py-3 align-self-center d-none d-md-block">
                                            <div class="transform-100" id="profitIcon"><span class="fa-solid fa-money-bill-trend-up profits"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-3 px-1">
                                <div class="alert bg-light bg-sidebar h-100">
                                    <div class="row">
                                        <div class="col-lg-12 mb-2 text-truncate">
                                            <span class="text-muted me-2">|</span><span class="h4 mb-0 text-uppercase text-primary fw-bolder text-blue-yellow">Business Report [<button class="bi bi-printer-fill border-0 bg-transparent text-sidebar" id="general-reports" data-bs-target="#modal-reports" data-bs-toggle="modal" type="button"></button>]</span>
                                        </div>
                                        <div class="col-lg-12 mb-2 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Daily Sales</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="dSales">...</span>
                                        </div>
                                        <!-- <div class="col-lg-12 mb-2 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Daily Avg. Sales</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="daSales">...</span>
                                        </div> -->
                                        <div class="col-lg-12 mb-2 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Weekly Sales</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="wSales">...</span>
                                        </div>
                                        <!-- <div class="col-lg-12 mb-2 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Weekly Avg. Sales</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="waSales">...</span>
                                        </div> -->
                                        <div class="col-lg-12 mb-2 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Monthly Sales</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="mSales">...</span>
                                        </div>
                                        <!-- <div class="col-lg-12 mb-2 text-truncate">
                                            <span class="h5 mb-0 text-uppercase">Monthly Avg. Sales</span>
                                            <br>
                                            <span class="h4 fw-bolder" id="maSales">...</span>
                                        </div> -->

                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 px-1 d-none d-sm-block">
                                <div class="alert bg-light bg-sidebar h-100 pt-0">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="">
                                                <label for="YearlySales" class="text-uppercase h5 fw-bolder" id="chart1title">Yearly Sales</label>
                                                <div class="float-end">
                                                    <div class="btn-group">
                                                        <button class="btn border-0 bg-trasparent text-sidebar btn-sm bi bi-caret-left-fill" id="LYear"></button>
                                                        <button class="btn border-0 bg-trasparent cursor-default text-sidebar btn-sm" id="MYear">Year</button>
                                                        <button class="btn border-0 bg-trasparent text-sidebar btn-sm bi bi-caret-right-fill" id="RYear"></button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="mt-0 pt-0" id="chart1Div">
                                                <canvas id="YearlySales" class="d-none" height="45" width="100%"></canvas>
                                                <div class="text-center placeholder-glow opacity-25">
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="row">
                                        <div class="col-sm-6">
                                            <div class="row">
                                                <div class="">
                                                    <label for="DailySales" class="text-uppercase h5 fw-bolder" id="chart2title">Daily Sales</label>
                                                    <div class="float-end">
                                                        <div class="btn-group">
                                                            <button class="btn border-0 bg-trasparent text-sidebar btn-sm bi bi-caret-left-fill" id="LDaily"></button>
                                                            <button class="btn border-0 bg-trasparent cursor-default text-sidebar btn-sm" id="MDaily">Week</button>
                                                            <button class="btn border-0 bg-trasparent text-sidebar btn-sm bi bi-caret-right-fill" id="RDaily"></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="mt-0 pt-0 position-relative" id="chart2Div">
                                                <canvas id="DailySales" class="d-none" width="100%"></canvas>
                                                <div class="text-center placeholder-glow opacity-25">
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                </div>
                                                <span class="position-absolute bottom-0 start-25"><span class="btn btn-canvas btn-sm bi bi-caret-left-fill"></span></span>
                                                <span class="position-absolute bottom-0 end-25"><span class="btn btn-canvas btn-sm bi bi-caret-right-fill"></span></span>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="">
                                                <label for="WeeklySales" class="text-uppercase h5 fw-bolder" id="chart3title">Weekly Sales</label>
                                                <div class="float-end">
                                                    <div class="btn-group">
                                                        <button class="btn border-0 bg-trasparent text-sidebar btn-sm bi bi-caret-left-fill" id="LWeek"></button>
                                                        <button class="btn border-0 bg-trasparent cursor-default text-sidebar btn-sm text-truncate" id="MWeek">Month</button>
                                                        <button class="btn border-0 bg-trasparent text-sidebar btn-sm bi bi-caret-right-fill" id="RWeek"></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-0 pt-0 position-relative" id="chart3Div">
                                                <canvas id="WeeklySales" class="d-none" width="100%"></canvas>
                                                <div class="text-center placeholder-glow opacity-25">
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                </div>
                                                <span class="position-absolute bottom-0 start-25"><span class="btn btn-canvas btn-sm bi bi-caret-left-fill"></span></span>
                                                <span class="position-absolute bottom-0 end-25"><span class="btn btn-canvas btn-sm bi bi-caret-right-fill"></span></span>
                                            </div>
                                        </div>

                                    </div> -->

                                </div>
                            </div>
                            <div class="col-lg-3 px-1">
                                <div class="alert bg-light bg-sidebar pt-1 h-100">
                                    <div class="navtabs" style="font-size: 12px">
                                        <ul class="nav nav-tabs justify-content-center border-0 text-truncate" role="tablist">
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active text-sidebar border-0 text-nav text-uppercase text-truncate" data-bs-toggle="tab" data-bs-target="#top-products" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Products</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link text-sidebar text-uppercase border-0  text-nav text-truncate" data-bs-toggle="tab" data-bs-target="#top-category" type="button" role="tab" aria-controls="system-tab-pane" aria-selected="true">Category</button>
                                            </li>
                                            <!-- <li class="nav-item" role="presentation">
                                                <button class="nav-link text-sidebar text-uppercase  border-0 text-nav text-truncate" data-bs-toggle="tab" data-bs-target="#top-employee" type="button" role="tab" aria-controls="history-tab-pane" aria-selected="true">Employee</button>
                                            </li> -->
                                        </ul>
                                    </div>
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="top-products" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                        <div class="mt-3 mb-1 d-none d-sm-block">
                                            <canvas class="d-none" id="TopProduct"></canvas>
                                                <div class="text-center py-4 loading">
                                                    <div class="spinner-border text-primary" role="status">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 text-truncate">
                                                <label for="TopProduct" class="fw-bolder text-uppercase h6">Top 10 Products [<button id="dlProducts" class="bx bxs-download bg-transparent text-sidebar  border-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Download" type="button"></button>]</label>
                                            </div>
                                            <div class="container-fluid" id="TopProductList">
                                                <div class="text-center placeholder-glow opacity-25">
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="top-category" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                                            <div class="mt-3 mb-1 d-none d-sm-block">
                                                <canvas class="d-none" id="TopCategory"></canvas>
                                                <div class="text-center py-4 loading">
                                                    <div class="spinner-border text-primary" role="status">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 text-truncate">
                                                <label for="TopCategory" class="fw-bolder text-uppercase h6">Top 10 Category [<button id="dlCategory" class="bx bxs-download bg-transparent text-sidebar  border-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Download" type="button"></button>]</label>
                                            </div>
                                            <div class="container-fluid" id="TopCategoryList">
                                                <div class="text-center placeholder-glow opacity-25">
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="top-employee" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
                                            <div class="mt-3 mb-1 d-none d-sm-block">
                                                <canvas class="d-none" id="TopEmployee"></canvas>
                                                <div class="text-center py-4 loading">
                                                    <div class="spinner-border text-primary" role="status">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 text-truncate">
                                                <label for="TopEmployee" class="fw-bolder text-uppercase h6">Top 10 Employee [<button id="dlEmployee" class="bx bxs-download bg-transparent text-sidebar border-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Download" type="button"></button>]</label>
                                            </div>
                                            <div class="container-fluid" id="TopEmployeeList">
                                                <div class="text-center placeholder-glow opacity-25">
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-4"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-7"></span>
                                                    <span class="placeholder col-4"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
                
                <div class="modal fade" id="modal-reports" tabindex="-1">
                    <form action="" id="form-generate-report">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen">
                            <div class="modal-content vh-100">
                                <div class="modal-body h6 mb-0 border-0">
                                    <div class="row">
                                        <div class="col-sm-6">

                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="row mb-2">
                                                <label class="col-sm-12 h4 text-center">Generate Report</label>

                                            </div>
                                            <div class="row mb-2">
                                            <label class="col-sm-12 col-form-label">Generate</label>
                                                <div class="col-sm-12">
                                                    <select class="form-select" name="report" id="select-report-type">
                                                        <option selected value="General">General</option>
                                                        <option value="Custom">Custom</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row mb-2 custom-report d-none">
                                                <label class="col-sm-12 col-form-label fs-6">From</label>
                                                <div class="col-sm-12">
                                                    <input disabled type="date" name="datefrom" id="date-from" class="form-control custom-input">
                                                </div>
                                            </div>
                                            <div class="row mb-2 custom-report d-none">
                                                <label class="col-sm-12 col-form-label">To</label>
                                                <div class="col-sm-12">
                                                    <input disabled type="date" name="dateto" id="date-to" class="form-control">
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <div class="col-sm-12">
                                                    <div class="input-group">
                                                        <button type="submit" class="btn btn-primary w-100">Start Generate <div id="previewImage" class="d-none"></div></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="container" id="generate-report">
                                                <div class="row mb-12">
                                                    <div class="alert alert-primary mb-0 rounded-0">
                                                        <div class="d-block">
                                                            <span class="float-start">GENERATED REPORT [ <span class="date-start"></span> - <span class="date-end"></span> ]</span>
                                                            <span class="float-end date-time"></span>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-12 h5 mt-2 fw-bolder mb-2">REPORT DIAGRAMS</div>
                                                        <div class="col-sm-8 mt-2 text-center">
                                                            <span class="fw-bolder text-uppercase">Monthly Sales</span>
                                                            <canvas id="canvas-year" class="mt-2"></canvas>
                                                        </div>
                                                        <div class="col-sm-4 mt-2 text-center">
                                                            <span class="fw-bolder text-uppercase">Weekly Sales</span>
                                                            <canvas id="canvas-month" class="mt-2"></canvas>
                                                            <span class="fw-bolder text-uppercase">Daily Sales</span>
                                                            <canvas id="canvas-week" class="mt-2"></canvas>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-sm-8">
                                                            <div class="col-sm-12 h5 fw-bolder mb-2">REPORT SUMMARY</div>
                                                            <div class="row">
                                                                <div class="col-sm-5 col-form-label">WEEKLY SALES</div>
                                                                <div class="col-sm-7">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control-plaintext" id="weekly-sales" disabled>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-sm-5 col-form-label">DAILY SALES</div>
                                                                <div class="col-sm-7">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control-plaintext" id="monthly-sales" disabled>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-sm-5 col-form-label">MONTHLY SALES</div>
                                                                <div class="col-sm-7">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control-plaintext" id="yearly-sales" disabled>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-4">
                                                            <div class="col-sm-12 h5 fw-bolder mb-2">TODAY SUMMARY</div>
                                                            <div class="row">
                                                                <div class="col-sm-5 col-form-label">SALES</div>
                                                                <div class="col-sm-7">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control-plaintext" id="today-sales" disabled>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-sm-5 col-form-label">WALK-IN</div>
                                                                <div class="col-sm-7">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control-plaintext" id="today-customer" disabled>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-sm-5 col-form-label">ONLINE</div>
                                                                <div class="col-sm-7">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control-plaintext" id="today-online" disabled>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <table class="table table-light table-hover mb-0" id="export-table" data-cols-width="30,30,30">
                                                        <thead class="fs-5 text-center align-middle" id="export-thead">
                                                            <tr>
                                                                <th>Date</th>
                                                                <th>Successful Transactions</th>
                                                                <th>Total Sales</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody class="fs-6 text-center align-middle" id="export-tbody">
                                                            <tr>
                                                                <td>-</td>
                                                                <td>-</td>
                                                                <td>-</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                

            </div>
        </div>
    </section>
    <script src="/assets/js/tableToExcel.js"></script>
    <script src="/assets/js/dashboard.js"></script>
    <script src="/assets/js/sidebar.js"></script>
    </body>
</html>