<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Login | RJ Avanceña</title>
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
                            <a class="nav-link active" href="../main/login.php">Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../main/register.php">Register</a>
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
                    <img src="../assets/img/login.svg" class="wall-svg" data-aos="zoom-in">
                </figure>
            </div>
            <div class="col-md-12 col-lg-6 mt-5 pt-lg-5 pt-sm-5">
                <div class="alert alert-light mt-lg-5 p-lg-5 p-sm-0 mt-5 p-md-4 position-relative">
                    <div class="top-0 end-0 position-absolute p-3 text-muted" id="step-no"></div>

                    <div class="mb-4">
                        <div class="text-primary h3 mb-1" id="form-title">Welcome back!</div>
                        <div class="text-dark h6 mb-0" id="form-subtitle">We're happy to see you again, please log-in your credentials.</div>
                    </div>

                    <div class="content-001">
                        <form id="form-register-user">
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
                            <div class="row mb-3">  
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-2">
                                            <input required type="password" minlength="8" class="form-control" placeholder="Password" id="input-password" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-password"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-password"></span>
                                            <label>Password</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mb-3">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <button class="btn btn-primary btn-lg w-100" type="submit" id="btn-register-user">Next</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2">  
                                <div class="col-lg-8 col-md-8 text-md-start text-truncate text-lg-start">
                                    <a class="bg-transparent border-0 p-0 m-0 text-primary text-decoration-none cursor-pointer" href="/main/register.php">Don't have an account?</a>
                                </div>
                                <div class="col-lg-4 col-md-4 text-md-end text-truncate text-lg-end">
                                    <button class="bg-transparent border-0 p-0 m-0 text-primary" id="btn-forgot-password" type="button">Forgot password?</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="content-002 d-none">
                        <form id="form-register-otp">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="number" name="otp" class="form-control" placeholder="One-time Password" id="input-otp" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-otp"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-otp"></span>
                                            <label>One Time Password</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1">
                                <div class="col-lg-12">
                                    <input type="hidden" name="username" id="submit-username">
                                    <input type="hidden" name="password" id="submit-password">
                                    <div class="input-group">
                                        <button class="btn btn-primary btn-lg w-100" type="submit">Log in</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="content-003 d-none">
                        <form id="form-forgot-password">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="text" name="username" class="form-control" placeholder="Username" id="input-forgot-username" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-forgot-username"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-forgot-username"></span>
                                            <label>Username or Email</label>
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
                                                <div class="text-muted">Please enter your email or username.</div>
                                                <div class="text-danger">*</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <button class="btn btn-primary btn-lg w-100" type="submit" id="btn-forgot-user">Log in</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="content-004 d-none">
                        <form id="form-forgot-password-002">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <div class="form-floating mb-4">
                                            <input required type="number" name="OTP" class="form-control" placeholder="Username" id="input-forgot-otp" autocomplete="off">
                                            <span class="valid-feedback position-absolute mt-0 pt-0" id="valid-forgot-otp"></span>
                                            <span class="invalid-feedback position-absolute mt-0 pt-0" id="invalid-forgot-otp"></span>
                                            <label>One Time Password</label>
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
                                                <div class="text-muted">If the otp is correct, a temporary password will be sent via email.</div>
                                                <div class="text-danger">*</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-1">
                                <div class="col-lg-12">
                                    <input type="hidden" name="UserName" id="input-forgot-otp-username">
                                    <div class="input-group">
                                        <button class="btn btn-primary btn-lg w-100" type="submit" id="btn-forgot-otp">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="content-5 d-none">
                        <form action="../controller/user-login.php" method="post" id="form-final-login">
                            <input type="hidden" name="username" id="input-final-username">
                            <input type="hidden" name="password" id="input-final-password">
                            <input type="hidden" name="otp" id="input-final-otp">
                        </form>
                    </div>

                    <div class="content-006 d-none">
                        <div class="alert alert-success">
                            <div class="row">
                                <div class="col-lg-12">
                                    <span class="fw-bolder">Success!</span> You have successfully recover your account.
                                </div>
                            </div>
                        </div>
                        <div class="text-start">
                            <a href="/main/login.php" class="text-decoration-none bi bi-caret-left-fill"> Login</a>
                        </div>
                    </div>

                
                    
                </div>
            </div>
        </div>
    </section>


    <script src="../assets/js/login.js"></script>
    </body>
</html>