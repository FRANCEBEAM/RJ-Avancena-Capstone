<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Register | RJ Avanceña</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="../assets/css/main.css" rel="stylesheet">
        <link rel="icon" href="/assets/img/store.svg">
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    </head>
    <body>
    <section class="home-section">
        <nav class="navbar navbar-expand-lg bg-light fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">RJ Avanceña Enterprises</a>
                <button class="navbar-toggler border-0 p-0 navbar-toggler-icon" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-main-top"></button>
                <div class="collapse navbar-collapse justify-content-end" id="navbar-main-top">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="../main/home.php">Home</a>
                        </li>
                        <!-- <li class="nav-item me-lg-2">
                            <a class="nav-link" href="../main/about.php">About</a>
                        </li> -->
                        <li class="nav-item d-none d-lg-block">
                            <span class="nav-link">|</span>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="../main/cart.php">Cart</a>
                        </li>
                        <li class="nav-item d-none d-lg-block">
                            <span class="nav-link">|</span>
                        </li> -->
                        <li class="nav-item ms-lg-2">
                            <a class="nav-link" href="../main/login.php">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="../main/register.php">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </section>

    <section class="container">
        <div class="row">
            <div class="col-sm-12 col-md-0 col-lg-6 d-none d-lg-block">
                <figure class="text-center">
                    <img src="../assets/img/sign-up.svg" class="wall-svg" data-aos="zoom-in">
                </figure>
            </div>
            <div class="col-md-12 col-lg-6 mt-5 pt-lg-4 pt-sm-5">
                <div class="alert alert-light mt-lg-5 p-lg-5 p-sm-0 mt-4 p-md-4 position-relative">
                    <div class="top-0 end-0 position-absolute p-3 text-muted" id="step-no"></div>
                    <div class="top-0 start-0 position-absolute p-3 text-muted ms-4">
                        <button type="button" class="bg-transparent border-0 text-primary bi bi-caret-left-fill d-none" id="btn-return-step-1"> Go back</button>
                    </div>
                    <div class="mb-4">
                        <div class="text-primary h3 mb-1" id="form-title">Create New Account</div>
                        <div class="text-dark h6 mb-0" id="form-subtitle">Please fill-out your personal information.</div>
                    </div>

                    <div class="content-001">
                        <form id="form-register-user">
                            <div class="row">
                                <div class="col-md-6 col-lg-6">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="text" class="form-control capitalize" placeholder="First Name" id="input-firstname" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-firstname"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-firstname">A</span>
                                            <label>First Name</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="text" class="form-control capitalize" placeholder="Last Name" id="input-lastname" autocomplete="off" autocapitalize="on">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-lastname"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-lastname"></span>
                                            <label>Last Name</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="email" class="form-control" placeholder="Email Address" id="input-email" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-email"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-email"></span>
                                            <label>Email address</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="number" class="form-control" placeholder="Contact No." id="input-contact" autocomplete="off" onKeyPress="if(this.value.length == 11) return false;">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-contact"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-contact"></span>
                                            <label>Contact</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="text" minlength="6" class="form-control" placeholder="Username" id="input-username" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-username"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-username"></span>
                                            <label>Username</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">  
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="password" minlength="8" class="form-control" placeholder="Password" id="input-password" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-password"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-password"></span>
                                            <label>Password</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <button class="btn btn-primary btn-lg w-100" type="submit" id="btn-register-user">Next</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="content-002 d-none">
                        <form id="form-register-shipping">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="text" name="house" class="form-control" placeholder="Email Address" id="input-house" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-house"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-house"></span>
                                            <label>House No, Block, Lot, Subdivision</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="text" name="street" minlength="6" class="form-control" placeholder="Username" id="input-street" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-street"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-street"></span>
                                            <label>Street</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">  
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <select required class="form-select barangay-list" name="barangay" id="input-barangay">
                                                <option value="" disabled selected class="dropdown-header">- Select Barangay -</option>
                                            </select>
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-barangay"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-barangay"></span>
                                            <label>Barangay</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1">
                                <div class="col-lg-12">
                                    <div class="input-group justify-content-start">
                                        <div class="mb-3 d-flex text-truncate">
                                            <div class="d-flex">
                                                <div class="vr me-2"></div>
                                                <div class="text-muted">Exclusive for San Jose del Monte, Bulacan only.</div>
                                                <div class="text-danger">*</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">  
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <input type="hidden" name="username" id="submit-username">
                                        <input type="hidden" name="password" id="submit-password">
                                        <input type="hidden" name="contact" id="submit-contact">
                                        <input type="hidden" name="email" id="submit-email">
                                        <input type="hidden" name="firstname" id="submit-firstname">
                                        <input type="hidden" name="lastname" id="submit-lastname">
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1 terms-and-conditions">
                                <div class="col-lg-12">
                                    <div class="input-group justify-content-start">
                                        <div class="mb-2 d-flex text-truncate">
                                            <input disabled type="checkbox" class="form-check-input ms-1" id="btn-agree">
                                            <div class="text-truncate ms-2">I agree to the terms and conditions.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <button disabled class="btn btn-primary btn-lg w-100" type="submit" id="btn-register-shipping">Register</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="content-003 d-none">
                        <div class="alert alert-success">
                            <div class="row">
                                <div class="col-lg-12">
                                    <span class="fw-bolder">Success!</span> You have successfully registered your account.
                                </div>
                            </div>
                        </div>
                        <div class="text-start">
                            <a href="/main/login.php" class="text-decoration-none bi bi-caret-left-fill"> Login</a>
                        </div>
                    </div>



                    <div class="modal fade" id="modal-terms-agreement" data-bs-keyboard="false" data-bs-backdrop="static" tabindex="-1" aria-labelledby="ModalTermsAndAgreement" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                            <div class="modal-content">
                                <div class="modal-header border-0">
                                    <div class="modal-title mb-0 h3 fw-bolder text-dark">Terms, Conditions and Privacy Policy</div>
                                </div>
                                <div class="modal-body border-0 text-dark agreement">
                                    <p> Before using our service, you must agree first to our Terms and Conditions along with our Privacy Policy. </p>

                                    <p class="h4 mb-2 fw-bolder"> Privacy Policy </p>

                                    <p> All private information such as names, emails and addresses shall be kept and protected with accordance to Republic Act 10173 also known as Data Privacy Act of 2012. To learn more about this, read [here] - link to official info website of Data Privacy Act of 2012. </p>

                                    <p> Data and information mention above are collected and required to deliver our online services, and shall be kept confidential. Be assured that the business/company will not use them for other purposes that is not related to our services. </p>

                                    <p class="h4 mb-2 fw-bolder"> Conditions </p>

                                    <p> By registering to our service, you agree to our conditions of use. </p>

                                    <p> • Required private information, such as customer names, emails, and addresses, that is vital to the function of our service will be collected with accordance to our Privacy Policy to provide and deliver good service for the users and customers. </p>
                                    <p> • Prices of products and shipping fee calculation are subject to change based on the matrix implemented by the administrator or store owner. </p>
                                    <p> • For order returns or any problems with online ordering, the customer shall go to the physical store and present the corresponding Transaction Number as proof of transaction. </p>


                                    <p class="h4 mb-2 fw-bolder terms"> Definition of Terms </p>

                                    <p> • Online order - the term used to describe the transaction made online. It can be composed of one or multiple products within a single order or transaction and is identified by its corresponding Transaction Number. </p>
                                    <p> • Transaction Number - is automatically generated and is unique per order or transaction. It can serve as a proof of purchase which can be seen on order details or printed/digital receipt. Transaction numbers are also kept and recorded within the system to be managed by the administrator or store owner. This is used to identify transactions and perform actions based on them such as approving or rejecting online orders. </p>
                                    <p> • Shipping address - is the location of where the online order will be shipped to. </p>
                                    <p> • Shipping fee - is the cost of delivery added to purchases made online and is subject to change depending on the matrix defined by the administrator or store owner. </p>
                                    <p> • Administrator/Store Owner - is the person who is in charge of managing the whole business. He/she decides the shipping fee matrix, prices of products, and approving or rejecting online orders made by the customers. </p>
                                    <p> • Shipping fee matrix - determines the how much shipping fee will be added when the online order is to be delivered or shipped to the customer's address. </p>
                                    <p> • Customer/User - is the one using the online service to order products online, with or without having to go on the physical store. </p>
                                </div>
                                <div class="modal-footer">
                                    <div class="form-check h5 mb-2">
                                        <input disabled class="form-check-input mb-1" type="checkbox" id="check">
                                        <label class="form-check-label mt-1">I agree to the terms and conditions. </label>
                                    </div>
                                </div>

                                <script>

                                </script>

                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>


    <script src="../assets/js/register.js"></script>
    </body>
</html>