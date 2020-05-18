<%@page contentType="text/html" pageEncoding="UTF-8"%>
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

        <link rel="stylesheet" href="assets/plugins/morris/morris.css">

        <!-- Main CSS -->
        <link rel="stylesheet" href="assets/css/style.css">

        <!--[if lt IE 9]>
                <script src="assets/js/html5shiv.min.js"></script>
                <script src="assets/js/respond.min.js"></script>
        <![endif]-->
    </head>
    <body onload="setHomeData()">

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
                                    <img id="imagenU2" lass="avatar-img rounded-circle">
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
            <!-- /Sidebar -->
            <!-- Page Wrapper -->
            <div class="page-wrapper">

                <div class="content container-fluid">

                    <!-- Page Header -->
                    <div class="page-header">
                        <div class="row">
                            <div class="col-sm-12">
                                <h3 class="page-title" id="welcome"></h3>
                                <ul class="breadcrumb">
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- /Page Header -->

                    <div class="row">
                        <div class="col-xl-3 col-sm-6 col-12" id="doctors_section">
                            <div class="card">
                                <a href="doctors.jsp" style="color:black;"><div class="card-body" >
                                        <div class="dash-widget-header">
                                            <span class="dash-widget-icon text-primary border-primary">
                                                <i class="fe fe-users"></i>
                                            </span>
                                            <div class="dash-count">
                                                <h3 id="total_doctors"></h3>
                                            </div>
                                        </div>
                                        <div class="dash-widget-info">
                                            <h6 class="text-muted">Doctors</h6>
                                        </div>
                                    </div></a>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12" id="nurses_section">
                            <div class="card">
                                <a href="nurses.jsp" style="color:black;"><div class="card-body" >
                                        <div class="dash-widget-header">
                                            <span class="dash-widget-icon text-warning border-warning">
                                                <i class="fe fe-users"></i>
                                            </span>
                                            <div class="dash-count">
                                                <h3 id="total_nurses"></h3>
                                            </div>
                                        </div>
                                        <div class="dash-widget-info">
                                            <h6 class="text-muted">Nurses</h6>
                                        </div>
                                    </div></a>
                            </div>
                        </div>                     
                        <div class="col-xl-3 col-sm-6 col-12" id="patients_section">
                            <div class="card">
                                <a href="patients.jsp" style="color:black;"><div class="card-body" >
                                        <div class="dash-widget-header">
                                            <span class="dash-widget-icon text-warning border-warning">
                                                <i class="fe fe-users"></i>
                                            </span>
                                            <div class="dash-count">
                                                <h3 id="total_patients"></h3>
                                            </div>
                                        </div>
                                        <div class="dash-widget-info">
                                            <h6 class="text-muted">Patients</h6>
                                        </div>
                                    </div></a>
                            </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12" id="appointments_section">
                            <div class="card">
                                <a href="myappointments.jsp?state=accepted" style="color:black;"><div class="card-body" >
                                        <div class="dash-widget-header">
                                            <span class="dash-widget-icon text-warning border-warning">
                                                <i class="fe fe-users"></i>
                                            </span>
                                            <div class="dash-count">
                                                <h3 id="total_appointments"></h3>
                                            </div>
                                        </div>
                                        <div class="dash-widget-info">
                                            <h6 class="text-muted">Appointments</h6>
                                        </div>
                                    </div></a>
                            </div>
                        </div>     
                        
                        <div class="col-xl-3 col-sm-6 col-12" id="medical_appointments_section">
                            <div class="card">
                                <a href="appointments.jsp?t=medical" style="color:black;"><div class="card-body" >
                                        <div class="dash-widget-header">
                                            <span class="dash-widget-icon text-warning border-warning">
                                                <i class="fe fe-users"></i>
                                            </span>
                                            <div class="dash-count">
                                                <h3 id="total_medical_appointments"></h3>
                                            </div>
                                        </div>
                                        <div class="dash-widget-info">
                                            <h6 class="text-muted">Medical appointments</h6>
                                        </div>
                                    </div></a>
                            </div>
                        </div>     
                        
                        <div class="col-xl-3 col-sm-6 col-12" id="nursing_appointments_section">
                            <div class="card">
                                <a href="appointments.jsp?t=nursing" style="color:black;"><div class="card-body" >
                                        <div class="dash-widget-header">
                                            <span class="dash-widget-icon text-warning border-warning">
                                                <i class="fe fe-users"></i>
                                            </span>
                                            <div class="dash-count">
                                                <h3 id="total_nursing_appointments"></h3>
                                            </div>
                                        </div>
                                        <div class="dash-widget-info">
                                            <h6 class="text-muted">Nursing appointments</h6>
                                        </div>
                                    </div></a>
                            </div>
                        </div>  
                        
                       
                        <div class="col-xl-3 col-sm-6 col-12" id="administrators_section">
                            <div class="card">
                                <a href="administrators.jsp" style="color:black;"><div class="card-body">
                                        <div class="dash-widget-header">
                                            <span class="dash-widget-icon text-success">
                                                <i class="fe fe-users"></i>
                                            </span>
                                            <div class="dash-count">
                                                <h3 id="total_administrators"></h3>
                                            </div>
                                        </div>
                                        <div class="dash-widget-info">
                                            <h6 class="text-muted">Administrators</h6>
                                        </div>
                                    </div></a>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
            <!-- /Page Wrapper -->

        </div>
        <!-- /Main Wrapper -->

        <!-- jQuery -->
        <script src="assets/js/jquery-3.2.1.min.js"></script>

        <!-- Bootstrap Core JS -->
        <script src="assets/js/popper.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>

        <!-- Slimscroll JS -->
        <script src="assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>

        <script src="assets/plugins/raphael/raphael.min.js"></script>
        <script src="assets/plugins/morris/morris.min.js"></script>
        <script src="assets/js/chart.morris.js"></script>

        <!-- Custom JS -->
        <script  src="assets/js/script.js"></script>

        <script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>
        <script src="script.js"></script>
    </body>
</html>
