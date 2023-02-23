<?php
    require_once('../controller/session-cashier.php');
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Settings</title>

        <?php include('../controller/header.php'); ?>
    </head>
    <body class="<?php echo $theme; ?>">
    <?php include('../controller/sidebar-cashier.php'); ?>
    <section class="home-section">
        <div class="text">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col-sm-12 col-md-12 col-lg-12 text-truncate">
                        <div class="fs-2 fw-bolder text-uppercase" id="title">
                            <span class="text-muted me-2">|</span><span>Settings</span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-5">
                                <div class="alert bg-sidebar">
                                        <div class="row mb-4 text-truncate">
                                            <div class="fw-bolder text-uppercase">Account Information
                                                <button class="bg-transparent border-0 bi bi-pencil-fill text-primary float-end" type="button" id="btn-edit-account"></button>
                                                <button class="bg-transparent border-0 bx bxs-save text-primary float-end m-1 d-none" type="button" id="btn-save-account" style="transform: scale(1.2)"></button>
                                            </div>
                                        </div>
                                        <div class="row mb-2">
                                            <div class="col-sm-12">
                                                <form id="form-account-image" class="text-center">
                                                    <figure>
                                                        <input type="hidden" class="form-control current-id" name="id">
                                                        <img id="account-image" class="mb-2 border border-1 border-dark" src="https://i.pinimg.com/736x/04/34/be/0434be5626c7776ca7ca7b0ada3abc4a.jpg" height="150px" width="auto" alt="">
                                                        <input type="file" name="file" accept=".jpg, .jpeg, .png, .webp" class="form-control d-none" id="account-image-file">
                                                        <figcaption class="h5 start-0 position-absolute end-0" id="accept-image-status"></figcaption>
                                                    </figure>
                                                </form>
                                            </div>
                                        </div>
                                        
                                    <form id="form-account-info">
                                        <div class="row mb-3 h5">
                                            <label class="col-sm-3 col-form-label text-truncate">Username</label>
                                            <div class="col-sm-9">
                                                <div class="input group">
                                                    <input type="hidden" class="form-control current-id" name="id">
                                                    <input disabled type="text" id="account-username" name="username" class="form-control-plaintext account-edit" placeholder="Username">
                                                    <span class="position-absolute valid-feedback" id="valid-username" style="font-size: 13px"></span>
                                                    <span class="position-absolute invalid-feedback" id="invalid-username" style="font-size: 13px"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mb-3 h5">
                                            <label class="col-sm-3 col-form-label text-truncate">Password</label>
                                            <div class="col-sm-9">
                                                <div class="input group">
                                                    <input disabled type="password" id="account-password" name="password" class="form-control-plaintext account-edit" placeholder="Password">
                                                    <span class="position-absolute valid-feedback" id="valid-password" style="font-size: 13px"></span>
                                                    <span class="position-absolute invalid-feedback" id="invalid-password" style="font-size: 13px"></span>
                                                </div>

                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row mb-2 h5">
                                            <label class="col-sm-3 col-form-label text-truncate text-truncate">User Level</label>
                                            <div class="col-sm-9">
                                                <input disabled type="text" class="form-control-plaintext" placeholder="User Level">
                                            </div>
                                        </div>
                                        <div class="row mb-2 h5">
                                            <label class="col-sm-3 col-form-label text-truncate">Status</label>
                                            <div class="col-sm-9">
                                                <input disabled type="text" class="form-control-plaintext" placeholder="Status">
                                            </div>
                                        </div>
                                        <div class="row mb-2 h5">
                                            <label class="col-sm-3 col-form-label text-truncate">Generated</label>
                                            <div class="col-sm-9">
                                                <input disabled type="text" class="form-control-plaintext" placeholder="Date/Time">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-7">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="alert bg-sidebar">
                                            <form id="form-personal-info">
                                                <div class="row mb-2 text-truncate">
                                                    <div class="fw-bolder text-uppercase">Personal Information
                                                        <button class="bg-transparent border-0 bi bi-pencil-fill text-primary float-end" type="button" id="btn-edit-account-002"></button>
                                                        <button class="bg-transparent border-0 bx bxs-save text-primary float-end m-1 d-none" type="button" id="btn-save-account-002" style="transform: scale(1.2)"></button>
                                                        <input type="hidden" class="form-control current-id" name="id">
                                                    </div>
                                                </div>
                                                <div class="row mb-2 h5">
                                                    <label class="col-sm-3 col-form-label text-truncate">Full Name</label>
                                                    <div class="col-sm-9">
                                                        <div class="input-group">
                                                            <input disabled type="text" class="form-control-plaintext account-info-x" placeholder="Full Name" id="account-info-fullname">
                                                        </div>
                                                        <div class="input-group d-none account-info-div">
                                                            <input disabled type="text" class="form-control account-info-002" placeholder="First Name" name="firstname" id="account-firstname">
                                                            <input disabled type="text" class="form-control account-info-002" placeholder="Last Name" name="lastname" id="account-lastname">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-2 h5">
                                                    <label class="col-sm-3 col-form-label text-truncate">Email Address</label>
                                                    <div class="col-sm-9">
                                                        <div class="input-group">
                                                            <input disabled type="email" class="form-control-plaintext account-info" name="email" placeholder="Email Address" id="account-email">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-2 h5">
                                                    <label class="col-sm-3 col-form-label text-truncate">Contact No.</label>
                                                    <div class="col-sm-9">
                                                        <div class="input-group">
                                                            <input disabled type="number" class="form-control-plaintext account-info" name="contact" placeholder="Contact Number" id="account-contact">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-2 h5">
                                                    <label class="col-sm-3 col-form-label text-truncate">Birthday</label>
                                                    <div class="col-sm-9">
                                                        <div class="input-group">
                                                            <input disabled type="date" class="form-control-plaintext text-muted account-info" name="birthday" placeholder="Birthday" id="account-birthday">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-2 h5">
                                                    <label class="col-sm-3 col-form-label text-truncate">Address</label>
                                                    <div class="col-sm-9">
                                                        <div class="input-group">
                                                            <textarea disabled type="text" rows="3" class="form-control-plaintext account-info-x" placeholder="Address" id="account-info-address"></textarea>
                                                        </div>
                                                        <div class="input-address d-none account-info-div">
                                                            <div class="input-group mb-2">
                                                                <input disabled type="text" class="form-control account-info-002" name="house" placeholder="House Address" id="account-house">
                                                                <input disabled type="text" class="form-control account-info-002" name="street" placeholder="Street" id="account-street">
                                                            </div>
                                                            <div class="input-group mb-2">
                                                                <select type="text" class="form-select barangay-list account-info-002" name="barangay" id="account-barangay">
                                                                    <option disabled selected value="" class="dropdown-header">Barangay</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="alert bg-sidebar">
                                            <div class="row mb-2 text-truncate">
                                                <div class="fw-bolder text-uppercase">User Interface</div>
                                            </div>
                                            <div class="row mb-2 h5">
                                                <label class="col-sm-3 col-form-label text-truncate">Theme</label>
                                                <div class="col-sm-9">
                                                    <div class="input-group">
                                                        <button class="btn btn-primary w-50 text-truncate">Dark <span class="bx bxs-moon"></span></button>
                                                        <button class="btn btn-secondary w-50 text-truncate">Light <span class="bx bx-sun"></span></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mb-2 h5">
                                                <label class="col-sm-3 col-form-label text-truncate">Sidebar</label>
                                                <div class="col-sm-9">
                                                    <div class="input-group">
                                                        <button class="btn btn-primary w-50 text-truncate">Slim <span class="bi bi-three-dots-vertical"></span></button>
                                                        <button class="btn btn-secondary w-50 text-truncate">Compact <span class="bi bi-justify"></span></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                    </div>
                </div>

                <script>
                    

                </script>
            </div>
        </div>
    </section>
    <script src="/assets/js/settings.js"></script>
    <script src="/assets/js/sidebar.js"></script>
    </body>
</html>