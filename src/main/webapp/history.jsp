<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
        <title>Medicatia</title>

        <!-- Favicon -->
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.png">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/css/bootstrap.min.css">

        <!-- Fontawesome CSS -->
        <link rel="stylesheet" href="assets/css/font-awesome.min.css">

        <!-- Feathericon CSS -->
        <link rel="stylesheet" href="assets/css/feathericon.min.css">

        <!-- Select2 CSS -->
        <link rel="stylesheet" href="assets/css/select2.min.css">

        <!-- Main CSS -->
        <link rel="stylesheet" href="assets/css/style.css">

        <!--[if lt IE 9]>
                <script src="assets/js/html5shiv.min.js"></script>
                <script src="assets/js/respond.min.js"></script>
        <![endif]-->
    </head>
    <body onload="setMedicalHistory()">

        <!-- Main Wrapper -->
        <div class="main-wrapper">

            <!-- Header -->
            <div class="header">

                <!-- Logo -->
                <div class="header-left">
                    <a href="home.jsp" class="logo">
                        <img src="assets/img/medicatia_menu.jpg" alt="Logo">
                    </a>
                    <a href="home.jsp" class="logo logo-small">
                        <img src="assets/img/logo-small.png" alt="Logo" width="30" height="30">
                    </a>
                </div>
                <!-- /Logo -->

                <a href="javascript:void(0);" id="toggle_btn">
                    <i class="fe fe-text-align-left"></i>
                </a>


                <!-- Mobile Menu Toggle -->
                <a class="mobile_btn" id="mobile_btn">
                    <i class="fa fa-bars"></i>
                </a>
                <!-- /Mobile Menu Toggle -->

                <!-- Header Right Menu -->
                <ul class="nav user-menu">


                    <!-- User Menu -->
                    <li class="nav-item dropdown has-arrow">
                        <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                            <span class="user-img"><img class="rounded-circle"  width="31" id="imagenU"></span>
                        </a>
                        <div class="dropdown-menu">
                            <div class="user-header">
                                <div class="avatar avatar-sm">
                                    <img id="imagenU2" alt="User Image" class="avatar-img rounded-circle">
                                </div>
                                <div class="user-text">
                                    <h6 id="name"></h6>
                                    <p class="text-muted mb-0" id="type"></p>
                                </div>
                            </div>
                            <a class="dropdown-item" >My Profile</a>
                            <a class="dropdown-item">Settings</a>
                            <a class="dropdown-item" href="javascript:logout()">Logout</a>
                        </div>
                    </li>
                    <!-- /User Menu -->

                </ul>
                <!-- /Header Right Menu -->

            </div>
            <!-- /Header -->
            <!-- Sidebar -->
            <div class="sidebar" id="sidebar">
                <div class="sidebar-inner slimscroll">
                    <div id="sidebar-menu" class="sidebar-menu">
                        <ul>
                            <li class="menu-title">
                                <span>Main</span>
                            </li>
                            <li>
                                <a href="home.jsp"><i class="fe fe-home"></i> <span>Dashboard</span></a>
                            </li>
                            <li id="adduser_menu_section">
                                <a href="adduser.jsp"><i class="fe fe-user-plus"></i> <span>User</span></a>
                            </li>
                            <li id="history_menu_section">
                                <a href="history.jsp"><i class="fe fe-file"></i> <span>Medical History</span></a>
                            </li>
                            <li class="has-submenu" id="appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="myappointments.jsp?state=accepted">Accepted</a></li>
                                    <li><a href="myappointments.jsp?state=pending">Pending</a></li>
                                </ul>
                            </li>
                            <li class="has-submenu"  id="medical_appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Medical appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="appointments.jsp?state=accepted">Accepted</a></li>
                                    <li><a href="appointments.jsp?state=pending">Pending</a></li>
                                </ul>
                            </li>
                            <li class="has-submenu" id="nursing_appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Nursing appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="appointments.jsp?state=accepted">Accepted</a></li>
                                    <li><a href="appointments.jsp?state=pending">Pending</a></li>
                                </ul>
                            </li>
                            <li id="administrators_menu_section">
                                <a href="administrators.jsp"><i class="fe fe-user"></i> <span>Administrators</span></a>
                            </li>
                            <li id="doctors_menu_section">
                                <a href="doctors.jsp"><i class="fe fe-user"></i> <span>Doctors</span></a>
                            </li>
                            <li id="nurses_menu_section">
                                <a href="nurses.jsp"><i class="fe fe-user"></i> <span>Nurses</span></a>
                            </li>
                            <li id="patients_menu_section">
                                <a href="patients.jsp"><i class="fe fe-user"></i> <span>Patients</span></a>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <!-- /Sidebar -->
            <!-- Page Wrapper -->
            <div class="page-wrapper">
                <div class="content container-fluid">
                    <!-- Page Header -->
                    <div class="page-header">
                        <div class="row">
                            <div class="col">
                                <h3 class="page-title">Medical History</h3>
                            </div>
                        </div>
                    </div>
                    <!-- /Page Header -->

                    <div class="row">
                        <div class="col-xl-12 d-flex">
                            <div class="card flex-fill">
                                <div class="card-header">
                                    <h4 class="card-title">Patient Information</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Name</label>
                                        <div class="col-lg-9">
                                            <label id="p_name"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Sex</label>
                                        <div class="col-lg-9">
                                            <label id="sex"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Race</label>
                                        <div class="col-lg-9">
                                            <label id="race"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Birth</label>
                                        <div class="col-lg-9">
                                            <label id="birth"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Email</label>
                                        <div class="col-lg-9">
                                            <label id="email"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Phone</label>
                                        <div class="col-lg-9">
                                            <label id="phone"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Place of birth</label>
                                        <div class="col-lg-9">
                                            <label id="p_birth"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Place of residence</label>
                                        <div class="col-lg-9">
                                            <label id="p_residence"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Weight</label>
                                        <div class="col-lg-9">
                                            <label id="weight"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Height</label>
                                        <div class="col-lg-9">
                                            <label id="height"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Marital status</label>
                                        <div class="col-lg-9">
                                            <label id="marital_status"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Allergies</label>
                                        <div class="col-lg-9">
                                            <label id="allergies"></label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Disease</label>
                                        <div class="col-lg-9">
                                            <label id="diseases"></label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Main Wrapper -->
        <!-- /Main Wrapper -->
        <!-- jQuery -->
        <script src="assets/js/jquery-3.2.1.min.js"></script>
        <!-- Bootstrap Core JS -->
        <script src="assets/js/popper.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <!-- Slimscroll JS -->
        <script src="assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>
        <!-- Select2 JS -->
        <script src="assets/js/select2.min.js"></script>
        <!-- Custom JS -->
        <script  src="assets/js/script.js"></script>
        <script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>
        <script src="script.js"></script>
    </body>
</html>
