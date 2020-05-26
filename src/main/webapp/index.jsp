<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Medicatia</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">

        <!-- Favicons -->
        <link href="assets/img/favicon.png" rel="icon">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/css/login_bootstrap.min.css">

        <!-- Fontawesome CSS -->
        <link rel="stylesheet" href="assets/plugins/fontawesome/css/fontawesome.min.css">
        <link rel="stylesheet" href="assets/plugins/fontawesome/css/all.min.css">

        <!-- Main CSS -->
        <link rel="stylesheet" href="assets/css/login_style.css">


    </head>
    <body class="account-page">

        <!-- Main Wrapper -->
        <div class="main-wrapper">

            <!-- Header -->
            <header class="header">
                <nav class="navbar navbar-expand-lg header-nav">
                    <div class="navbar-header">
                        <a id="mobile_btn" href="javascript:void(0);">
                            <span class="bar-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </a>
                    </div>
                    <div class="main-menu-wrapper">
                        <div class="menu-header">
                            <a href="index.jsp" class="menu-logo">
                                <img src="assets/img/logo.png" class="img-fluid" alt="Logo">
                            </a>
                            <a id="menu_close" class="menu-close" href="javascript:void(0);">
                                <i class="fas fa-times"></i>
                            </a>
                        </div>
                    </div>
                    <ul class="nav header-navbar-rht">
                        <li class="nav-item contact-item">
                            <div class="header-contact-img">
                                <i class="far fa-hospital"></i>
                            </div>
                            <div class="header-contact-detail">
                                <p class="contact-header">Contact</p>
                                <p class="contact-info-header"> +34 928 35 00 16</p>
                            </div>
                        </li>

                    </ul>
                </nav>
            </header>
            <!-- /Header -->

            <!-- Page Content -->
            <div class="content">
                <div class="container-fluid">

                    <div class="row">
                        <div class="col-md-8 offset-md-2">

                            <!-- Login Tab Content -->
                            <div class="account-content">
                                <div class="row align-items-center justify-content-center">
                                    <div class="col-md-7 col-lg-6 login-left">
                                        <img src="assets/img/login-banner.png" class="img-fluid">
                                    </div>
                                    <div class="col-md-12 col-lg-6 login-right">
                                        <div class="login-header">
                                            <h3>Login</h3>
                                        </div>
                                        <form>
                                            <div class="form-group form-focus">
                                                <input type="email" id="email" class="form-control floating">
                                                <label class="focus-label">Email</label>
                                            </div>
                                            <div class="form-group form-focus">
                                                <input type="password" id="password" class="form-control floating">
                                                <label class="focus-label">Password</label>
                                            </div>

                                            <button class="btn btn-primary btn-block btn-lg login-btn" type="button" onclick="login()">Login</button>
                                            <br>
                                            <center><a onclick="openEmailRecuperationForm()"><h6>I forgot password</h6></a></center>
                                            <div class="login-or">
                                                <span class="or-line"></span>
                                            </div>
                                            <div id="error"><br><br></div>
                                            <div id="demo"></div>
                                            <div id="name"></div>
                                            <div id="type"></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- /Login Tab Content -->
                        </div>
                    </div>

                </div>

            </div>
            <!-- /Page Content -->
        </div>

        <div class="modal fade" id="email_modal" aria-hidden="true" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document" >
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="form-content p-2">
                            <form onsubmit="sendPasswordResetEmail(); return false">
                                <h4 class="modal-title">Recover password</h4><br>
                                <input type="email" placeholder="Email" class="form-control" id="email_recuperation" required><br>
                                <center>
                                    <button type="submit" class="btn btn-primary">Send</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- /Footer Top -->
        <footer class="footer">
            <div class="footer-top">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-7 col-md-12">
                            <div class="footer-widget footer-about">
                                <div class="footer-logo">
                                    <img src="assets/img/logo.png" alt="logo">
                                </div>
                                <div class="footer-about-content">
                                    <p>We are one of the best web applications for managing medical appointments.
                                        <br>Access now and request your appointment. </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6">
                            <div class="footer-widget footer-contact">
                                <h2 class="footer-title">Contact Us</h2>
                                <div class="footer-contact-info">
                                    <div class="footer-address">
                                        <span><i class="fas fa-map-marker-alt"></i></span>
                                        <p>Las Palmas University, Las Palmas de Gran Canaria</p>
                                    </div>
                                    <p>
                                        <i class="fas fa-phone-alt"></i>
                                        +34 928 35 00 16
                                    </p>
                                    <p class="mb-0">
                                        <i class="fas fa-envelope"></i>
                                        medicatiateam@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="container-fluid">

                    <!-- Copyright -->
                    <div class="copyright">
                        <div class="row">
                            <div class="col-md-6 col-lg-6">
                                <div class="copyright-text">
                                    <p class="mb-0">&copy; 2020 Medicatia. All rights reserved.</p>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6">
                                <div class="copyright-menu">
                                    <ul class="policy-menu">
                                        <li><a>Terms and Conditions</a></li>
                                        <li><a>Policy</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <!-- /Footer -->

        <!-- /Main Wrapper -->

        <!-- jQuery -->
        <script src="assets/js/login_jquery.min.js"></script>

        <!-- Bootstrap Core JS -->
        <script src="assets/js/login_popper.min.js"></script>
        <script src="assets/js/login_bootstrap.min.js"></script>

        <!-- Custom JS -->
        <script src="assets/js/login_script.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/alertifyjs@1.11.0/build/css/alertify.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/alertifyjs@1.11.0/build/alertify.min.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>
        <script>
                                                    var config = {
                                                        apiKey: "AIzaSyDtbVv6lvwbtPpqUfVWWyQx42GPE8XTlos",
                                                        authDomain: "medicatia-e3758.firebaseapp.com",
                                                        databaseURL: "https://medicatia-e3758.firebaseio.com",
                                                        projectId: "medicatia-e3758",
                                                        storageBucket: "medicatia-e3758.appspot.com",
                                                        messagingSenderId: "649740038709",
                                                        appId: "1:649740038709:web:89ba42e53791b90017377c"
                                                    };
                                                    firebase.initializeApp(config);
        </script>
        <script src="script.js"></script>
    </body>
</html>
