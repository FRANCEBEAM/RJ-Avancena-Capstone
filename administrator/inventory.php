<?php
    require_once('../controller/session-admin.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Inventory</title>

        <?php include('../controller/header.php'); ?>
    </head>
    <body class="<?php echo $theme; ?>">
    <?php include('../controller/sidebar-admin.php'); ?>
    <section class="home-section">
        <div class="text">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-8 col-md-10 col-lg-4 text-truncate">
                        <div class="fs-2 fw-bolder text-uppercase" id="title">
                            <span class="text-muted me-2">|</span><span>Inventory Management</span>
                        </div>
                    </div>
                    <div class="col-sm-4 col-md-2 col-lg-2 fs-2 align-self-center mb-2">
                        <button class="btn  btn-add btn-primary w-100 btn-lg text-truncate" type="button" data-bs-toggle="modal" data-bs-target="#AddProductModal">Add Product</button>
                    </div>
                    <div class="col-sm-4 col-md-5 col-lg-2 fs-2 align-self-center mb-2">
                        <select class="form-select form-select-lg inventory-category" id="inventory-category"></select>
                    </div>
                    <div class="col-sm-4 col-md-5 col-lg-3 fs-3 align-self-center mb-2">
                        <input class="form-control form-control-lg" placeholder="Search" type="text" id="search" autocomplete="off"></input>
                    </div>
                    <div class="col-sm-4 col-md-2 col-lg-1 fs-3 align-self-center mb-2">
                        <button class="btn btn-canvas btn-light w-100 btn-lg position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#RestockOffcanvas">
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger blink" id="rTotal"></span>
                            <span class="bi bi-grid-1x2-fill"></span>
                        </button>
                    </div>
                </div>
                <!-- <button id="print-pdfs" class="btn btn-primary btn-success" type="button">Print <div class="d-none" id="print-pdfs-qr"></div></button> -->
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
                                <div class="col-sm-12 col-lg-5 px-lg-0 ps-lg-2">
                                    <span class="badge rounded-0 text-bg-danger w-100">CRITICAL &nbsp; <span id="rCrit">0</span></span>
                                </div>
                                <div class="col-sm-12 col-lg-2 px-lg-0">
                                    <span class="badge rounded-0 text-bg-success w-100">
                                        <button class="border-0 bg-transparent text-light fw-bolder " id="btn-export-restock">XLSX</button>
                                    </span>
                                </div>
                                <div class="col-sm-12 col-lg-5 px-lg-0 pe-lg-2">
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
                                        <span class="bx bxs-save text-primary" data-bs-toggle="modal" data-bs-target="#import-export-modal" title="Import / Export Table" style="transform: scale(1.3)"></span>
                                        <span class="bi bi-gear-fill text-dark" data-bs-toggle="modal" data-bs-target="#table-settings-modal" title="Table Settings" style="transform: scale(1.3)"></span>
                                        <span class="bi bi-pencil-square text-success" data-bs-toggle="modal" data-bs-target="#category-settings-modal" title="Category Settings" style="transform: scale(1.3)"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="container">
                                <div class="wrapper overflow-auto">
                                    <table id="table-inventory" class="table table-light table-striped table-hover flex-nowrap text-center align-middle mb-0" data-cols-width="30,20,25,25,20,20,30,20,15">
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

                <div class="modal fade" id="AddProductModal" tabindex="-1" aria-labelledby="AddProductModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                        <div class="modal-content border-0">
                        <!-- <form action="/controller/inventory-add.php" method="post" enctype="multipart/form-data"> -->
                                <div class="modal-header">
                                    <div class="modal-title h4 fw-bolder">Add Product</div>
                                    <button type="reset" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body h6 mb-0">
                                <form id="form-add-product">
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Product Name</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                <input required type="text" name="product" class="form-control input-clear-form" autocomplete="off" placeholder="Product Name"></input>
                                                <input required type="hidden" name="encoder" id="aEncoder" class="form-control" autocomplete="off" placeholder="Added By"></input>
                                                <input required type="hidden" name="acc" class="acc"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Serial No.</label>
                                        <div class="col-sm-9">
                                            <input required type="text" name="sku" min="1" class="form-control input-clear-form" placeholder="Serial Number"  autocomplete="off"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Category</label>
                                        <div class="col-sm-9">
                                            <select required class="form-select aCategory" name="category1" id="add-select-category">
                                                <option value="" class="dropdown-header" disabled>New Category</option>
                                                <option selected value="Custom">- Custom -</option>
                                            </select>
                                            <div id="custom-input">
                                                <div class="input-group mt-2">
                                                    <input type="text" name="prefix" maxlength="5" minlength="3" class="form-control w-25 input-clear-form" placeholder="Serial Prefix: (MTL)" autocomplete="off" autocapitalize="on"></input>
                                                    <input type="text" name="category2" class="form-control w-50 input-clear-form" placeholder="Category: (Metal)" autocomplete="off"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Quantity</label>
                                        <div class="col-sm-9">
                                            <input required type="number" name="quantity" min="1" class="form-control input-clear-form" placeholder="Quantity"  autocomplete="off"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Price</label>
                                        <div class="col-sm-9">
                                            <input required type="number" step="0.01" name="price" min="0.01" class="form-control input-clear-form" placeholder="Price"  autocomplete="off"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Restock Level</label>
                                        <div class="col-sm-9">
                                            <input required type="number" name="restock" min="1" class="form-control input-clear-form" placeholder="Restock Level" title="If the quantity reached this level, it will notify the user to restock again." data-bs-toggle="tooltip" data-bs-placement="right"  autocomplete="off"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Supplier</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                    <input required type="text" name="supplier" class="form-control input-clear-form" autocomplete="off" placeholder="Supplier"  autocomplete="off"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Specifications</label>
                                            <div class="col-sm-9">
                                                <div class="input-group">
                                                    <input required type="text" name="specs" class="form-control input-clear-form" placeholder="Specification" rows="2" cols="30" autocomplete="off"></input>
                                                </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Product Image</label>
                                        <div class="col-sm-9">
                                            <input type="file" accept=".jfif, .jpg, .jpeg, .png, .svg, .webp" name="file" class="form-control input-clear-form" aria-describedby="fileUpload" aria-label="Upload"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary w-25">Save</button>
                                    <button type="reset" class="btn btn-secondary w-25" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>
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
                                        <div class="text-center">
                                            <figure>
                                                <img class="mb-2" data-enlargable id="vIMG" src="../assets/img/default.jpg" height="200px" width="auto" alt="" style="object-fit:contain;">
                                                <figcaption class="fw-bolder" id="vCaption"></figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Serial Number</label>
                                    <div class="col-sm-9">
                                            <input disabled type="text" class="form-control" id="vSerialnumber"></input>
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

                <div class="modal fade" id="edit-product-modal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="EditProductModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                        <div class="modal-content border-0">
                                <div class="modal-header">
                                    <div class="modal-title h4 fw-bolder">Edit Product Information [<span id="edit-title"></span>] <button class="bi bi-qr-code border-0 bg-transparent text-info" id="btn-edit-qr-code"></button></div>
                                    <button type="reset" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body h6 mb-0 pt-2">
                                <form id="form-edit-product">
                                    <div class="row mb-2">
                                        <div class="col-sm-12">
                                            <div class="d-flex justify-content-center">
                                                <div class="position-relative mw-100">
                                                    <input required type="hidden" name="id" id="edit-id"></input>
                                                    <input required type="hidden" name="serial" id="edit-serial"></input>
                                                    <input required type="hidden" name="acc" class="acc"></input>
                                                    <input required type="hidden" name="prefix" class="edit-prefix"></input>
                                                    <img class="d-block" data-enlargable id="edit-image" height="150px"></img>
                                                    <div class="position-absolute bottom-0 end-0">
                                                        <span class="bx bx-upload pt-1 pb-1 m-0 ps-2 pe-2 fs-3 bg-text-sidebar border-dash" id="file-trigger" data-bs-toggle="tooltip" data-bs-placement="right" title="Replace Image"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Product Name</label>
                                            <div class="col-sm-9">
                                                <input required type="text" name="product" id="edit-product" class="form-control" autocomplete="off" placeholder="Product Name"></input>
                                            </div>
                                    </div>
                                    <!-- HEY -->
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Serial Number</label>
                                            <div class="col-sm-9">
                                                <input required type="text" name="sku" id="edit-serialnumber" class="form-control" autocomplete="off" placeholder="Serial Number"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Supplier</label>
                                        <div class="col-sm-9">
                                            <input required type="text" name="supplier" id="edit-supplier" class="form-control" autocomplete="off" placeholder="Supplier"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Price</label>
                                        <div class="col-sm-9">
                                            <input required type="number" name="price" id="edit-price" step="0.01" class="form-control" autocomplete="off" placeholder="Price"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Quantity</label>
                                        <div class="col-sm-9">
                                            <input required type="number" name="quantity" id="edit-quantity" class="form-control" autocomplete="off" placeholder="Quantity" min="1" ></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Restock Level</label>
                                        <div class="col-sm-9">
                                            <input required type="number" name="restock" id="edit-restock" class="form-control" autocomplete="off" placeholder="Restock Level" min="1"></input>
                                        </div>
                                    </div>
                                    <!-- HEY -->
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Size/Color</label>
                                        <div class="col-sm-9">
                                            <input required type="text" name="sizecolor" id="edit-size-color" class="form-control" autocomplete="off" placeholder="Size/Color"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Descriptions</label>
                                        <div class="col-sm-9">
                                            <input type="text" required name="specs" rows="2" id="edit-specs" class="form-control" autocomplete="off" placeholder="Specification"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2 d-none">
                                        <label class="col-sm-3 col-form-label">Replace Image</label>
                                        <div class="col-sm-9">
                                            <input type="file" id="file-upload" accept=".jpg, .jpeg, .png, .svg, .webp" name="file" class="form-control" aria-label="Upload"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary w-25">Save</button>
                                    <button type="reset" class="btn btn-secondary w-25" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="slides-product-modal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="SlidesProductModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                        <div class="modal-content border-0">
                                <div class="modal-header">
                                    <div class="modal-title h4 fw-bolder">Edit Image Information [<span id="slides-title"></span>]</div>
                                    <button type="reset" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body h6 mb-0 pt-2">
                                <form id="form-slides-product">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="d-flex justify-content-center">
                                                <figure class="text-center">
                                                    <img data-enlargable id="image-main-001" src="../assets/img/default.jpg" class="m-1 object-fit-cover" height="150px">
                                                    <figcaption class="text-center h6">Product Image</figcaption>
                                                    <input readonly type="text" id="input-main-001" value="Choose file..." class="form-control form-control-sm cursor-pointer text-center">
                                                    <input type="file" name="file" id="file-main-001" class="form-control form-control-sm d-none input-file-clear">
                                                </figure>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="d-flex justify-content-center">
                                                <figure class="text-center">
                                                    <img data-enlargable id="image-slides-001" src="../assets/img/default.jpg" class="m-1 object-fit-cover" height="150px">
                                                    <figcaption class="text-center h6">Slides 001</figcaption>
                                                    <input readonly type="text" id="input-slides-001" value="Choose file..." class="form-control form-control-sm cursor-pointer text-center">
                                                    <input type="file" name="slides_001" id="file-slides-001" class="form-control form-control-sm d-none input-file-clear">
                                                </figure>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="d-flex justify-content-center">
                                                <figure class="text-center">
                                                    <img data-enlargable id="image-slides-002" src="../assets/img/default.jpg" class="m-1 object-fit-cover" height="150px">
                                                    <figcaption class="text-center h6">Slides 002</figcaption>
                                                    <input readonly type="text" id="input-slides-002" value="Choose file..." class="form-control form-control-sm cursor-pointer text-center">
                                                    <input type="file" name="slides_002" id="file-slides-002" class="form-control form-control-sm d-none input-file-clear">
                                                </figure>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="d-flex justify-content-center">
                                                <figure class="text-center">
                                                    <img data-enlargable id="image-slides-003" src="../assets/img/default.jpg" class="m-1 object-fit-cover" height="150px" alt="">
                                                    <figcaption class="text-center h6">Slides 003</figcaption>
                                                    <input readonly type="text" id="input-slides-003" value="Choose file..." class="form-control form-control-sm cursor-pointer text-center">
                                                    <input type="file" name="slides_003" id="file-slides-003" class="form-control form-control-sm d-none input-file-clear">
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="modal-footer">
                                    <input required type="hidden" name="id" id="slides-id"></input>
                                    <button type="submit" class="btn btn-primary w-25">Save</button>
                                    <button type="reset" class="btn btn-secondary w-25" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>
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

                <div class="modal fade" id="import-export-modal" tabindex="-1" aria-labelledby="table-settings-label" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                        <div class="modal-content border-0">
                                <div class="modal-header">
                                    <div class="modal-title h4 fw-bolder">Import/Export Inventory</div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div class="modal-body h6 mb-0">
                                    <div class="row mb-2">
                                        <label class="col-sm-4 col-form-label">Inventory</label>
                                        <div class="col-sm-8">
                                            <div class="input-group">
                                                <button type="button" id="btn-export-inventory" title="Export Inventory" class="btn btn-danger w-100">Export</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-4 col-form-label">Categories</label>
                                        <div class="col-sm-8">
                                            <div class="input-group">
                                                <button type="button" id="btn-export-category" title="Export Category" class="btn btn-success w-100">Export</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-4 col-form-label">Low/Critical</label>
                                        <div class="col-sm-8">
                                            <div class="input-group">
                                                <button type="button" id="btn-export-restock-two" title="Export Crtical/Low" class="btn btn-warning w-100">Export</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row mb-2">
                                        <label class="col-sm-4 col-form-label">Inventory</label>
                                        <div class="col-sm-8">
                                            <form id="inventory-import-data">
                                                <input type="hidden" class="user" name="accountID">
                                                <input type="file" name="file" style="display: none;" id="input-import-inventory">
                                            </form>
                                            <button type="button" id="btn-import-inventory" title="Import Inventory" class="btn btn-info text-light w-100">Import</button>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row mb-2">
                                        <label class="col-sm-4 col-form-label">XLSX Template</label>
                                        <div class="col-sm-8">
                                            <a title="Import Inventory" class="btn btn-dark w-100" href="../assets/xlsx/Import-Inventory-Template.xlsx" download="Import-Inventory-Template.xlsx">Download</a>
                                        </div>
                                    </div>

                                </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="category-settings-modal" tabindex="-1" aria-labelledby="category-settings-label" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable ">
                        <div class="modal-content border-0">
                            <div class="modal-header">
                                <div class="modal-title h4 fw-bolder">Category Settings</div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body h6 mb-0">
                                <form id="form-edit-delete-category">
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Action</label>
                                    <div class="col-sm-9">
                                        <select required name="action" class="form-select" id="edit-delete-selector">
                                            <option value="edit">Edit Category</option>
                                            <option value="delete">Delete Category</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Category</label>
                                    <div class="col-sm-9">
                                        <select required name="category" class="inventory-category form-control" id="category-select"></select>
                                    </div>
                                </div>
                                <div id="content-edit">
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">New Name</label>
                                        <div class="col-sm-9">
                                            <input type="text" name="rename" class="form-control input-category-edit" placeholder="New Category" id="edit-category-input" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div id="content-delete">
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Administrator</label>
                                        <div class="col-sm-9">
                                            <input readonly type="hidden" name="sessionID" class="acc">
                                            <input class="form-control input-category-delete" name="username" type="text" placeholder="Administrator" id="delete-category-username" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Password</label>
                                        <div class="col-sm-9">
                                            <input type="password" placeholder="Password" name="password" id="delete-category-passwords" class="form-control input-category-delete">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary w-25">Save</button>
                                <button type="reset" class="btn btn-secondary w-25" data-bs-dismiss="modal">Close</button>
                            </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
    <script src="/assets/js/inventory.js"></script>
    <script src="/assets/js/sidebar.js"></script>
    <script src="/assets/js/tableToExcel.js"></script>
    </body>
</html>