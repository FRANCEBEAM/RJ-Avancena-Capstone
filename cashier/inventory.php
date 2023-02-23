<?php
    require_once('../controller/session-cashier.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Inventory</title>

        <?php include('../controller/header.php'); ?>
    </head>
    <body class="<?php echo $theme; ?>">
    <?php include('../controller/sidebar-cashier.php'); ?>
    <section class="home-section">
        <div class="text">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12 col-md-8 col-lg-4 text-truncate">
                        <div class="fs-2 fw-bolder text-uppercase" id="title">
                            <span class="text-muted me-2">|</span><span>Inventory Management</span>
                        </div>
                    </div>
                    <div class="col-sm-4 col-md-4 col-lg-3 fs-2 align-self-center mb-2">
                        <select class="form-select form-select-lg inventory-category" id="inventory-category"></select>
                    </div>
                    <div class="col-sm-4 col-md-8 col-lg-4 fs-3 align-self-center mb-2">
                        <input class="form-control form-control-lg" placeholder="Search" type="text" id="search" autocomplete="off"></input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-lg-1 fs-3 align-self-center mb-2">
                        <button class="btn btn-canvas btn-light w-100 btn-lg position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#RestockOffcanvas">
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger blink" id="rTotal"></span>
                            <span class="bi bi-grid-1x2-fill"></span>
                        </button>
                    </div>
                </div>
                <div class="offcanvas offcanvas-end text-bg-light" data-bs-backdrop="static" tabindex="-1" id="RestockOffcanvas" aria-labelledby="staticBackdropLabel">
                    <div class="offcanvas-header">
                        <div class="offcanvas-title h4" id="offcanvasRightLabel">Restocking Levels</div>
                        <button type="button" class="btn btn-canvas btn-lg h-100" data-bs-dismiss="offcanvas" aria-label="Close">Close <span class="bi bi-x-lg"></span></button>
                    </div>
                    <div class="offcanvas-body">
                        <div id="reorderContainer"></div>
                    </div>
                    <div class="offcanvas-footer h6 mt-2">
                        <div class="container">
                            <div class="row h5 mb-0">
                                <div class="col-sm-12 col-lg-6 px-lg-0 ps-lg-2">
                                    <span class="badge rounded-0 text-bg-danger w-100">CRITICAL &nbsp; <span id="rCrit">0</span></span>
                                </div>
                                <div class="col-sm-12 col-lg-6 px-lg-0 pe-lg-2">
                                    <span class="badge rounded-0 text-bg-warning w-100">LOW &nbsp; <span id="rLow">0</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="container">
                        <div class="alert alert-primary p-3 rounded-0 mb-0">
                            <div class="row fs-6">
                                <div class="col-sm-3 text-truncate">CATEGORY [<span class="fw-bolder" id="tCategory">...</span>]</div>
                                <div class="col-sm-3 text-truncate">TOTAL RECORDS: <span class="fw-bolder" id="tRecords">...</span></div>
                                <div class="col-sm-3 text-truncate">TOTAL ASSETS: <span class="fw-bolder" id="tAssets">...</span></div>
                                <div class="col-sm-3 text-truncate">PAGE: <span class="fw-bolder" id="tPage">...</span>
                                    <span class="cursor-pointer float-end">
                                        <span class="bi bi-gear-fill text-dark" data-bs-toggle="modal" data-bs-target="#table-settings-modal" title="Table Settings" style="transform: scale(1.3)"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="container">
                                <div class="wrapper overflow-auto">
                                    <table id="table-inventory" class="table table-light table-striped table-hover flex-nowrap text-center align-middle mb-0" data-cols-width="30,35,25,25,20,20,30,20">
                                        <thead class="h5" id="table-inventory-thead">
                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                        </thead>
                                        <tbody class="h6" id="table-inventory-tbody">
                                            <tr>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table id="table-restock" class="table table-light table-striped table-hover flex-nowrap text-center align-middle mb-0" data-cols-width="30,30,30,30,30,30,30" style="display: none;">
                                        <thead class="h5" id="table-restock-thead">
                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                        </thead>
                                        <tbody class="h6" id="table-restock-tbody">
                                            <tr>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table id="table-category" class="table table-light table-striped table-hover flex-nowrap text-center align-middle mb-0" data-cols-width="60,30,30" style="display: none">
                                        <thead class="h5" id="table-category-thead">
                                            <tr>
                                                <td>-</td>
                                                <td>-</td>
                                                <td>-</td>
                                            </tr>
                                        </thead>
                                        <tbody class="h6" id="table-category-tbody">
                                            <tr>
                                                <td>---</td>
                                                <td>---</td>
                                                <td>---</td>
                                            </tr>
                                        </tbody>
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


                <div class="modal fade" id="view-product-modal" tabindex="-1" aria-labelledby="view-product-label" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                        <div class="modal-content border-0">
                            <div class="modal-header">
                                <div class="modal-title h4 fw-bolder">View Product Information [<span id="vTitle"></span>] <button class="bi bi-qr-code border-0 bg-transparent text-info" id="btn-view-qr-code"></button></div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body h6 mb-0">

                                <div class="row mb-2">
                                    <div class="col-sm-12">
                                        <center>
                                            <figure>
                                                <img class="mb-2" data-enlargable id="vIMG" src="../assets/img/default.jpg" height="200px" width="auto" alt="" style="object-fit:contain;">
                                                <figcaption class="fw-bolder" id="vCaption"></figcaption>
                                            </figure>
                                        </center>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Product Name</label>
                                    <div class="col-sm-9">
                                            <input disabled type="text" class="form-control" id="vProduct"></input>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Supplier</label>
                                    <div class="col-sm-9">
                                        <input disabled type="text" class="form-control" id="vSupplier"></input>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Category</label>
                                    <div class="col-sm-9">
                                        <input disabled type="text" class="form-control" id="vCategory"></input>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Price</label>
                                    <div class="col-sm-9">
                                        <input disabled type="text" class="form-control" id="vPrice"></input>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Quantity</label>
                                    <div class="col-sm-9">
                                        <input disabled type="text" class="form-control" id="vQuantity"></input>
                                    </div>
                                </div>
                                <div class="row mb-2 d-none">
                                    <label class="col-sm-3 col-form-label">Specifications</label>
                                    <div class="col-sm-9">
                                        <textarea disabled type="text" rows="2" class="form-control" id="vSpecs"></textarea>
                                    </div>
                                </div>
                                <div class="row d-none">
                                    <label class="col-sm-3 col-form-label">Added by</label>
                                    <div class="col-sm-9">
                                        <input disabled type="text" class="form-control" id="vEncoder"></input>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="table-settings-modal" tabindex="-1" aria-labelledby="table-settings-label" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div class="modal-content border-0">
                                <div class="modal-header">
                                    <div class="modal-title h4 fw-bolder">Table Settings</div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div class="modal-body h6 mb-0">
                                    <div class="row mb-2">
                                        <label class="col-sm-4 col-form-label">No. of Rows</label>
                                        <div class="col-sm-8">
                                            <select class="form-select" id="select-row-count">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="75">75</option>
                                                <option value="100">100</option>
                                                <option value="200">200</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-4 col-form-label">Alert Type</label>
                                        <div class="col-sm-8">
                                            <select class="form-select" name="alert" id="select-alert-type">
                                                <option value="prompt">Prompt</option>
                                                <option value="notification">Notification</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </section>
    <script src="/assets/js/inventory-cashier.js"></script>
    <script src="/assets/js/sidebar.js"></script>
    <script src="/assets/js/tableToExcel.js"></script>
    </body>
</html>