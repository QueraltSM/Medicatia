<%-- 
    Document   : sendEmail
    Created on : 21 may. 2020, 12:50:19
    Author     : charl
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
    <head>
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
    </head>
    <body onload="setEmailData()">
        <div class="main-wrapper">
            <div class="header">
                <div class="header-left">
                    <a href="home.jsp" class="logo">
                        <img src="assets/img/medicatia_menu.jpg" alt="Logo">
                    </a>
                    <a href="home.jsp" class="logo logo-small">
                        <img src="assets/img/logo-small.png" alt="Logo" width="30" height="30">
                    </a>
                </div>
                <a href="javascript:void(0);" id="toggle_btn">
                    <i class="fe fe-text-align-left"></i>
                </a>
                <a class="mobile_btn" id="mobile_btn">
                    <i class="fa fa-bars"></i>
                </a>
                <ul class="nav user-menu">
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
                </ul>
            </div>
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
                            <li id="history_menu_section">
                                <a href="history.jsp"><i class="fe fe-file"></i> <span>Medical History</span></a>
                            </li>
                            <li class="has-submenu" id="appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="myappointments.jsp?state=accepted&type=null&table=Patient">Accepted</a></li>
                                    <li><a href="myappointments.jsp?state=pending&type=null&table=Patient">Pending</a></li>
                                </ul>
                            </li>
                            <li class="has-submenu"  id="medical_appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Medical appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="myappointments.jsp?state=accepted&type=medical&table=Doctor">Accepted</a></li>
                                    <li><a href="myappointments.jsp?state=pending&type=medical&table=Doctor">Pending</a></li>
                                </ul>
                            </li>
                            <li class="has-submenu" id="nursing_appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Nursing appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="myappointments.jsp?state=accepted&type=nursing&table=Nurse">Accepted</a></li>
                                    <li><a href="myappointments.jsp?state=pending&type=nursing&table=Nurse">Pending</a></li>
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
            <div class="page-wrapper">
                <div class="content container-fluid">
                    <!-- Page Header -->
                    <div class="page-header">
                        <div class="row">
                            <div class="col">
                                <h3 class="page-title" id="send_email_name"></h3>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12 d-flex">
                            <div class="card flex-fill">
                                <div class="card-header">
                                    <h4 class="card-title">Content of email</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Subject:</label>
                                        <div class="col-lg-9">
                                            <input type="text" class="form-control" id="subject">
                                            <div id="errorSubject" class="error_label"></div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-lg-3 col-form-label">Message:</label>
                                        <div class="col-lg-9">
                                            <textarea class="form-control" rows="6" id="message"></textarea>
                                            <div id="errorMessage" class="error_label"></div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <input type="button" class="btn btn-primary" value="Send" onclick="sendEmail()">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        <script src="https://www.gstatic.com/firebasejs/6.2.4/firebase.js"></script>
        <script src="script.js"></script>
    </body>
</html>
