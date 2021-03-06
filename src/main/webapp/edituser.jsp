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
                            <li class="has-submenu" id="appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="appointments.jsp?t=accepted">Accepted</a></li>
                                    <li><a href="appointments.jsp?t=pending">Pending</a></li>
                                </ul>
                            </li>
                            <li class="has-submenu"  id="medical_appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Medical appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="appointments.jsp?t=accepted">Accepted</a></li>
                                    <li><a href="appointments.jsp?t=pending">Pending</a></li>
                                </ul>
                            </li>
                            <li class="has-submenu" id="nursing_appointments_menu_section">
                                <a href="#"><i class="fe fe-calendar" aria-hidden="true"></i> <span>Nursing appointments</span></a>
                                <ul class="submenu">
                                    <li><a href="appointments.jsp?t=accepted">Accepted</a></li>
                                    <li><a href="appointments.jsp?t=pending">Pending</a></li>
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
                                <h3 class="page-title">Edit user</h3>
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
                                            <div class="col-12 col-sm-6" id="specialties_doctor">
                                                <div class="form-group">
                                                    <label>Category</label>
                                                    <select class="form-control" id="specialties_doctor_selection">
                                                        <option value="Allergy and Inmunology">Allergy and Inmunology</option>
                                                        <option value="Anesthesiology">Anesthesiology</option>
                                                        <option value="Dermatology">Dermatology</option>
                                                        <option value="Diagnostic Radiology">Diagnostic Radiology</option>
                                                        <option value="Emergency Medicine">Emergency Medicine</option>
                                                        <option value="Family Medicine">Family Medicine</option>
                                                        <option value="Internal Medicine">Internal Medicine</option>
                                                        <option value="Medical Genetics">Medical Genetics</option>
                                                        <option value="Neurology">Neurology</option>
                                                        <option value="Nuclear Medicine">Nuclear Medicine</option>
                                                        <option value="Obstretics and Gynecology">Obstretics and Gynecology</option>
                                                        <option value="Opthalmology">Opthalmology</option>
                                                        <option value="Pathology">Pathology</option>
                                                        <option value="Pediatrics">Pediatrics</option>
                                                        <option value="Physical Medicine and Rehabilitation">Physical Medicine and Rehabilitation</option>
                                                        <option value="Preventive Medicine">Preventive Medicine</option>
                                                        <option value="Psychiatry">Psychiatry</option>
                                                        <option value="Radiation Oncology">Radiation Oncology</option>
                                                        <option value="Surgery">Surgery</option>
                                                        <option value="Urology">Urology</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-12 col-sm-6" id="specialties_nurse">
                                                <div class="form-group">
                                                    <label>Specialties</label>
                                                    <select class="form-control" id="specialties_nurse_selection">
                                                        <option value="Neonatal Nurse">Neonatal Nurse</option>
                                                        <option value="Nurse Midwife">Nurse Midwife</option>
                                                        <option value="Clinical Nurse">Clinical Nurse</option>
                                                        <option value="Critical Care Nurse">Critical Care Nurse</option>
                                                        <option value="Dialysis Nurse">Dialysis Nurse</option>
                                                        <option value="Nurse Practitioner">Nurse Practitioner</option>
                                                        <option value="Health Policy Nurse">Health Policy Nurse</option>
                                                        <option value="Informatics Nurse">Informatics Nurse</option>
                                                        <option value="Nurse Anesthetist">Nurse Anesthetist</option>
                                                        <option value="Psychiatric Nurse">Psychiatric Nurse</option>
                                                        <option value="Trauma Nurse">Trauma Nurse</option>
                                                        <option value="Pediatric Nurse">Pediatric Nurse</option>
                                                        <option value="Geriatric Nurse">Geriatric Nurse</option>
                                                        <option value="Oncology Nurse">Oncology Nurse</option>
                                                    </select>
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
                                        <button type="submit" class="btn btn-primary btn-block">Save Changes</button>
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
