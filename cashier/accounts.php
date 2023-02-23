<?php
    require_once('../controller/session-admin.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Accounts</title>

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
                            <span class="text-muted me-2">|</span><span>Account Management</span>
                        </div>
                    </div>
                    <div class="col-sm-4 col-md-2 col-lg-2 fs-2 align-self-center mb-2">
                        <button class="btn btn-add btn-primary w-100 btn-lg text-truncate" type="button" data-bs-target="#add-account-modal" data-bs-toggle="modal">Add Account</button>
                    </div>
                    <div class="col-sm-6 col-md-5 col-lg-2 fs-2 align-self-center mb-2">
                        <select class="form-select form-select-lg populate-userlevel" id="accounts-category"></select>
                    </div>
                    <div class="col-sm-6 col-md-7 col-lg-4 fs-3 align-self-center mb-2">
                        <input class="form-control form-control-lg" placeholder="Search" type="search" id="page-search-account"></input>
                    </div>
                </div>

                <div class="row">
                    <div class="container">
                        <div class="alert alert-primary p-3 rounded-0 mb-0">
                            <div class="row fs-6">
                                <div class="col-sm-3 text-truncate">USER LEVEL [<span class="fw-bolder" id="table-category-text">...</span>]</div>
                                <div class="col-sm-3 text-truncate">TOTAL RECORDS: <span class="fw-bolder" id="table-record-text">...</span></div>
                                <div class="col-sm-3 text-truncate">TIME: <span class="fw-bolder time">...</span></div>
                                <div class="col-sm-3 text-truncate">PAGE: <span class="fw-bolder" id="table-page-total-pages">...</span>

                                <span class="cursor-pointer float-end">
                                    <span class="bi bi-gear-fill text-dark" data-bs-toggle="modal" data-bs-target="#table-settings-modal" title="Table Settings" style="transform: scale(1.3)"></span>
                                </span>
                            </div>
  
                            </div>
                        </div>
                        <div class="row">
                            <div class="container">
                                <div class="wrapper overflow-auto">
                                    <table class="table table-light table-hover table-striped flex-nowrap text-center align-middle mb-0">
                                        <thead class="h5" id="table-accounts-thead"></thead>
                                        <tbody class="h6" id="table-accounts-tbody"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <nav class="text-truncate">
                            <ul class="pagination justify-content-center mt-4">
                                <li>
                                    <div class="input-group pagination-btn">
                                        <button class="btn btn-primary btn-add bi bi-caret-left-fill" id="paginationPrev"></button>
                                        <input type="number" class="btn btn-light border-0" style="width:90px" id="paginationCurr"></input>
                                        <button class="btn btn-primary btn-add bi bi-caret-right-fill" id="paginationNext"></button>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div class="modal fade" id="add-account-modal" tabindex="-1" aria-labelledby="AddAccountModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                        <div class="modal-content border-0">
                                <div class="modal-header">
                                    <div class="modal-title h4 fw-bolder">Add Account</div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body h6 mb-0">
                                <form id="form-add-account">
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Full Name</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                <input required type="text" name="firstname" class="form-control input-clear-form" autocomplete="off" placeholder="First Name"></input>
                                                <input required type="text" name="lastname" class="form-control input-clear-form" autocomplete="off" placeholder="Last Name"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Username</label>
                                            <div class="col-sm-9">
                                                <input required type="text" name="username" class="form-control input-clear-form" autocomplete="off" placeholder="Username"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Password</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                <input required type="password" name="password" id="password-one" class="form-control input-clear-form" autocomplete="off" placeholder="Password"></input>
                                                <span class="btn btn-add bi bi-eye-slash border-top border-end border-bottom border-1" id="toggle-password-one"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Email Address</label>
                                        <div class="col-sm-9">
                                            <input required type="email" name="email" class="form-control input-clear-form" autocomplete="off" placeholder="Email Address"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Contact No.</label>
                                        <div class="col-sm-9">
                                            <input required type="number" name="contact" min="9000000000" max="9999999999" onKeyPress="if(this.value.length==10) return false;" class="form-control input-clear-form" placeholder="9123456789"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Birthday</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                <select required name="month" class="form-select input-clear-form date-month">
                                                    <option disabled selected value="" class="dropdown-header">Month</option>
                                                </select>
                                                <select required name="day" class="form-select input-clear-form date-day">
                                                    <option disabled selected value="" class="dropdown-header">Day</option>
                                                </select>
                                                <select required name="year" class="form-select input-clear-form date-year">
                                                    <option disabled selected value="" class="dropdown-header">Year</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Complete Address</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                <input required type="text" name="house" value="" class="form-control input-clear-form" autocomplete="off" placeholder="House No, Block, Lot, Subdivision"></input>
                                                <input required type="text" name="street" class="form-control" autocomplete="off" placeholder="Street"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label"></label>
                                        <div class="col-sm-9">
                                            <div class="input-group mb-1">
                                                <select required class="form-select input-clear-form barangay-list" name="barangay" aria-label="Barangay">
                                                    <option class="dropdown-header" disabled selected value="">Barangay</option>
                                                </select>
                                                <select required name="city" class="form-select input-clear-form">
                                                    <option disabled value="" class="dropdown-header">City</option>
                                                    <option selected value="San Jose del Monte">San Jose del Monte</option>
                                                </select>
                                                <select required name="province" class="form-select input-clear-form">
                                                    <option disabled value="" class="dropdown-header">Province</option>
                                                    <option selected value="Bulacan">Bulacan</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">User Level</label>
                                        <div class="col-sm-9">
                                            <select required name="userlevel" class="form-select input-clear-form">
                                                <option disabled selected value="" class="dropdown-header">User Level</option>
                                                <option value="Administrator">Administrator</option>
                                                <option value="Cashier">Cashier</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary w-25">Save</button>
                                    <button type="button" class="btn btn-secondary w-25" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="view-account-modal" tabindex="-1" aria-labelledby="ViewAccountModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                        <div class="modal-content border-0">
                                <div class="modal-header">
                                    <div class="modal-title h4 fw-bolder">View Account Information</div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body h6 mb-0">
                                <div class="row mb-2">
                                    <div class="col-sm-12">
                                        <center>
                                            <figure style="height: 200px">
                                                <img class="mb-2" data-enlargable id="view-account-image" height="200px" width="auto" alt="" style="object-fit:contain;">
                                                <figcaption class="fw-bolder" id="view-account-caption"></figcaption>
                                            </figure>
                                        </center>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Full Name</label>
                                            <div class="col-sm-9">
                                                <div class="input-group">
                                                    <input disabled type="text" id="view-account-fullname" class="form-control"></input>
                                                </div>
                                            </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Username</label>
                                            <div class="col-sm-9">
                                                    <input disabled type="text" id="view-account-username" class="form-control"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Email Address</label>
                                            <div class="col-sm-9">
                                                    <input disabled type="text" id="view-account-email" class="form-control"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Contact Number</label>
                                            <div class="col-sm-9">
                                                <input disabled type="text" id="view-account-contact" class="form-control"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Birthday</label>
                                            <div class="col-sm-9">
                                                <input disabled type="text" id="view-account-birthday" class="form-control"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Complete Address</label>
                                            <div class="col-sm-9">
                                                <textarea disabled class="form-control" id="view-account-address" cols="30" rows="auto"></textarea>
                                            </div>
                                    </div>
                                    <div class="row mb-2 view-unnecessary">
                                        <label class="col-sm-3 col-form-label">Transaction History</label>
                                            <div class="col-sm-9">
                                                <div class="input-group">
                                                    <button class="btn btn-primary w-100" id="view-account-transaction" type="button">Transaction History</button>
                                                </div>
                                            </div>
                                    </div>
                                    <div class="row mb-2 d-none">
                                        <label class="col-sm-3 col-form-label">Account Status</label>
                                            <div class="col-sm-9">
                                                    <input disabled type="text" id="view-account-status" class="form-control fw-bolder text-primary"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2 d-none">
                                        <label class="col-sm-3 col-form-label">User Level</label>
                                            <div class="col-sm-9">
                                                    <input disabled type="text" id="view-account-userlevel"class="form-control"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2 d-none">
                                        <label class="col-sm-3 col-form-label">Date | Time Created</label>
                                            <div class="col-sm-9">
                                                <div class="input-group">
                                                    <input disabled type="text" id="view-account-date" class="form-control"></input>
                                                    <input disabled type="text" id="view-account-time" class="form-control"></input>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="edit-account-modal" tabindex="-1" aria-labelledby="EditAccountModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
                        <div class="modal-content border-0">
                            <div class="modal-header">
                                    <div class="modal-title h4 fw-bolder">Edit Account Information [<span id="edit-account-userlevel"></span>]</div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body h6 mb-0">
                            <form id="form-edit-account">
                                <div class="row mb-2">
                                    <label class="col-sm-3 col-form-label">Full Name</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                <input required type="text" name="firstname" id="edit-account-firstname" class="form-control" autocomplete="off" placeholder="First Name"></input>
                                                <input required type="text" name="lastname" id="edit-account-lastname" class="form-control" autocomplete="off" placeholder="Last Name"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Username</label>
                                            <div class="col-sm-9">
                                                    <input type="hidden" name="id" id="edit-account-id" class="form-control"></input>
                                                    <input required type="text" name="username" id="edit-account-username" class="form-control" autocomplete="off" placeholder="Username"></input>
                                            </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Email Address</label>
                                        <div class="col-sm-9">
                                            <input required type="email" name="email" id="edit-account-email" class="form-control" autocomplete="off" placeholder="Email Address"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Contact No.</label>
                                        <div class="col-sm-9">
                                            <input required type="number" name="contact" id="edit-account-contact" min="9000000000" max="9999999999" onKeyPress="if(this.value.length==10) return false;" class="form-control" placeholder="9123456789"></input>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Birthday</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                <select required name="month" class="form-select date-month" id="edit-account-month">
                                                    <option disabled selected value="" class="dropdown-header">Month</option>
                                                </select>
                                                <select required name="day" class="form-select date-day" id="edit-account-day">
                                                    <option disabled selected value="" class="dropdown-header">Day</option>
                                                </select>
                                                <select required name="year" class="form-select date-year" id="edit-account-year">
                                                    <option disabled selected value="" class="dropdown-header">Year</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Complete Address</label>
                                        <div class="col-sm-9">
                                            <div class="input-group">
                                                <input required type="text" name="house" id="edit-account-house" class="form-control" autocomplete="off" placeholder="House No, Block, Lot, Subdivision"></input>
                                                <input required type="text" name="street" id="edit-account-street" class="form-control" autocomplete="off" placeholder="Street"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label"></label>
                                        <div class="col-sm-9">
                                            <div class="input-group mb-0">
                                                <select required class="form-select barangay-list" name="barangay" aria-label="Barangay" id="edit-account-barangay">
                                                    <option class="dropdown-header"disabled selected value="">Barangay</option>
                                                </select>
                                                <select name="city" class="form-select" id="edit-account-city">
                                                    <option value="" class="dropdown-header">City</option>
                                                    <option selected value="San Jose del Monte">San Jose del Monte</option>
                                                </select>
                                                <select name="province" class="form-select" id="edit-account-province">
                                                    <option disabled value="" class="dropdown-header">Province</option>
                                                    <option selected value="Bulacan">Bulacan</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <label class="col-sm-3 col-form-label">Account Status</label>
                                        <div class="col-sm-9">
                                            <select name="status" class="form-select" id="edit-account-status">
                                                <option disabled selected value="" class="dropdown-header">Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                                <option value="Disabled" id="edit-account-status-disabled">Disabled</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                                </div>
                                <div class="modal-footer mb-0" id="edit-account-footer">
                                    <button type="submit" id="edit-account-submit" class="btn btn-primary w-25">Save</button>
                                    <button type="button" class="btn btn-secondary w-25" data-bs-dismiss="modal">Close</button>
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

                <div class="modal fade" id="view-transactions-modal" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="modal-title h4 fw-bolder mb-0">Transaction History</div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-0 text-center align-middle">
                                <div class="wrapper overflow-auto">
                                    <table class="table table-light table-striped table-hover flex-nowrap text-center align-middle mb-0" id="table-transactions" data-cols-width="30,50,30">
                                        <thead class="fs-5 mb-0" id="table-transactions-thead"></thead>
                                        <tbody class="fs-6 mb-0" id="table-transactions-tbody"></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div class="btn-group w-100">
                                    <button type="button" class="btn btn-primary" id="view-transactions-return">Account Information</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
    </section>

    <script src="/assets/js/sidebar.js"></script>
    <script src="/assets/js/accounts.js"></script>
    <script src="/assets/js/tableToExcel.js"></script>
    </body>
</html>