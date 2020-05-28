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

        <!--[if lt IE 9]>
                <script src="assets/js/html5shiv.min.js"></script>
                <script src="assets/js/respond.min.js"></script>
        <![endif]-->
    </head>
    <body onload="resetEditUserForm()">

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
                            <a class="dropdown-item" href="myprofile.jsp">My Profile</a>
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
                            <li>
                                <a href="settings.jsp"><i class="fe fe-notice-push"></i> <span>Settings</span></a>
                            </li>
                            <li id="doctors_menu_section">
                                <a href="incidents.jsp"><i class="fe fe-user"></i> <span>Incidents</span></a>
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
                                <h3 class="page-title">Edit profile</h3>
                            </div>
                        </div>
                    </div>
                    <!-- /Page Header -->

                    <div class="row">
                        <div class="col-xl-12 d-flex">
                            <div class="card flex-fill">
                                <div class="card-header">
                                    <h4 class="card-title">User data</h4>
                                </div>
                                <div class="modal-body">
                                    <form onsubmit="updateUsers();
                                            return false">
                                        <div class="row form-row">
                                            <div class="col-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>DNI/NIE/NIF</label>
                                                    <input type="text" class="form-control" id="dni">
                                                    <div id="errorDNI" class="error_label"></div>
                                                </div>

                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>Name</label>
                                                    <input type="text" class="form-control" id="username">
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>Date of birth</label>
                                                    <input type="text" class="form-control" id="birth">
                                                    <div id="errorDate" class="error_label"></div>
                                                </div>

                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>Address</label>
                                                    <input type="text"  class="form-control" id="address">
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6">
                                                <div class="form-group">
                                                    <label>Phone</label>
                                                    <input type="text"  class="form-control" id="phone">
                                                    <div id="errorPhone" class="error_label"></div>
                                                </div>

                                            </div>
                                            <div class="col-24 col-sm-10">
                                                <div class="form-group">
                                                    <label>Additional information</label>
                                                    <textarea class="form-control" rows="3" id="information"></textarea>
                                                </div>
                                            </div>
                                            <div class="col-24 col-sm-10">
                                                <div class="form-group">
                                                    <label>Actual profile photo</label><br>
                                                    <img id="profile_photo" class="img-thumbnail" width="200" height="200">
                                                </div>
                                            </div>

                                            <div class="col-12 col-sm-10"> 
                                                <div class="form-group">
                                                    <label>Image</label>
                                                    <input type="file"  class="form-control"  onchange="uploadPreviewPhoto()" id="new_profile_photo" accept="image/*">
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="text-right">
                                            <br><button type="submit" class="btn btn-primary" data-dismiss="modal">Save changes</button>    <a class="btn btn-danger" onclick="deleteAccount()"><i class="fe fe-trash"></i> Delete account</a><br>
                                        </div>
                                       </form>
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