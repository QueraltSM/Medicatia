/*
 * @Authors:
 * 
 * Oliver
 * Carlos
 * Néstor
 * Queralt
 */

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var user = firebase.auth().currentUser;
        if (user !== null) {
            var name = "";
            var usref = firebase.database().ref("Users/" + firebase.auth().currentUser.uid);
            usref.once('value', function (snapshot) {
                if (!snapshot.exists()) {
                    document.getElementById("error").innerHTML = "Account does not exist";
                } else {
                    snapshot.forEach(function (childSnapshot) {
                        if (childSnapshot.key === "name")
                            name = childSnapshot.val();
                        if (childSnapshot.key === "type") {
                            replaceLocation(name, childSnapshot.val());
                        }
                    });
                }
            });
        }
    }
});

function replaceLocation(name, type) {
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("type", type);
    sessionStorage.setItem("id", firebase.auth().currentUser.uid);
    window.location.replace("home.jsp");
    if (type === "doctor") {
        sessionStorage.setItem("appointment_type", "medical");
    } else if (type === "nurse") {
        sessionStorage.setItem("appointment_type", "nursing");
    }
}

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        document.getElementById("error").innerHTML = error.message;
    });
}

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.jsp");
    }).catch(function (error) {
        var errorMessage = error.message;
        document.getElementById("error").innerHTML = errorMessage;
    });
}

function connectToFirebase() {
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
}

function setAdminStyle() {
    document.getElementById("adduser_menu_section").style.display = "block";
    document.getElementById("history_menu_section").style.display = "none";
    if (document.getElementById("administrators_section"))
        document.getElementById("administrators_section").style.display = "block";
    if (document.getElementById("doctors_section"))
        document.getElementById("doctors_section").style.display = "block";
    if (document.getElementById("appointments_section"))
        document.getElementById("appointments_section").style.display = "none";
    if (document.getElementById("medical_appointments_section"))
        document.getElementById("medical_appointments_section").style.display = "block";
    if (document.getElementById("nursing_appointments_section"))
        document.getElementById("nursing_appointments_section").style.display = "block";
    if (document.getElementById("nurses_section"))
        document.getElementById("nurses_section").style.display = "block";
    if (document.getElementById("patients_section"))
        document.getElementById("patients_section").style.display = "block";
    document.getElementById("administrators_menu_section").style.display = "block";
    document.getElementById("doctors_menu_section").style.display = "block";
    document.getElementById("nurses_menu_section").style.display = "block";
    document.getElementById("patients_menu_section").style.display = "block";
    document.getElementById("appointments_menu_section").style.display = "none";
    document.getElementById("medical_appointments_menu_section").style.display = "block";
    document.getElementById("nursing_appointments_menu_section").style.display = "block";
}

function setUserStyle(type) {
    if (type === "administrator")
        setAdminStyle();
    else {
        if (document.getElementById("administrators_section"))
            document.getElementById("administrators_section").style.display = "none";
        document.getElementById("administrators_menu_section").style.display = "none";
        document.getElementById("adduser_menu_section").style.display = "none";
        document.getElementById("appointments_menu_section").style.display = "block";
        document.getElementById("adduser_menu_section").style.display = "none";
        document.getElementById("medical_appointments_menu_section").style.display = "none";
        document.getElementById("nursing_appointments_menu_section").style.display = "none";
        if (document.getElementById("medical_appointments_section"))
            document.getElementById("medical_appointments_section").style.display = "none";
        if (document.getElementById("nursing_appointments_section"))
            document.getElementById("nursing_appointments_section").style.display = "none";
        if (document.getElementById("appointments_section"))
            document.getElementById("appointments_section").style.display = "block";
        document.getElementById("history_menu_section").style.display = "none";
        if (type === "patient") {
            document.getElementById("history_menu_section").style.display = "block";
            document.getElementById("appointments_menu_section").style.display = "none";
            if (document.getElementById("appointments_section"))
                document.getElementById("appointments_section").style.display = "none";
            document.getElementById("medical_appointments_menu_section").style.display = "block";
            document.getElementById("nursing_appointments_menu_section").style.display = "block";
            document.getElementById("patients_menu_section").style.display = "none";
            if (document.getElementById("medical_appointments_section"))
                document.getElementById("medical_appointments_section").style.display = "block";
            if (document.getElementById("nursing_appointments_section"))
                document.getElementById("nursing_appointments_section").style.display = "block";
            if (document.getElementById("patients_section"))
                document.getElementById("patients_section").style.display = "none";
            document.getElementById("patients_menu_section").style.display = "none";
        }
    }
}

function setHomeData() {
    getSessionData();
    document.getElementById("welcome").innerHTML = "Welcome " + sessionStorage.getItem("name");
    countUsers();
    countAppoinments(sessionStorage.getItem("id"));
    setAdminStyle();
    if (sessionStorage.getItem("type") === "doctor" || sessionStorage.getItem("type") === "nurse") {
        setUserStyle("");
    } else if (sessionStorage.getItem("type") === "patient") {
        setUserStyle("patient");
    }
}

function getSessionData() {
    connectToFirebase();
    setUserData();
    setUserStyle(sessionStorage.getItem("type"));
}

function countAllAppointments() {
    var medical_appointments = 0;
    var nursing_appointments = 0;
    firebase.database().ref("Appointments/").once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            childX.forEach(function (snapshotChild) { // iterate appointments
                snapshotChild.forEach(function (date) {
                    if (date.child("type").val() === "medical" && date.child("state").val() !== "free") {
                        medical_appointments += 1;
                    } else if (date.child("type").val() === "nursing" && date.child("state").val() !== "free") {
                        nursing_appointments += 1;
                    }
                });
            });
        });
        document.getElementById("total_nursing_appointments").innerHTML = nursing_appointments;
        document.getElementById("total_medical_appointments").innerHTML = medical_appointments;
    });
}

function countPatientAppointments(id) {
    var medical_appointments = 0;
    var nursing_appointments = 0;

    firebase.database().ref("Appointments/").once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            childX.forEach(function (snapshotChild) { // iterate appointments
                snapshotChild.forEach(function (date) {
                    if (date.child("state").val() !== "free" && date.child("type").val( ) === "medical" && date.child("patient").val() === id) {
                        medical_appointments += 1;
                    } else if (date.child("state").val() !== "free" && date.child("type").val() === "nursing" && date.child("patient").val() === id) {
                        nursing_appointments += 1;
                    }
                });
            });
        });
        document.getElementById("total_nursing_appointments").innerHTML = nursing_appointments;
        document.getElementById("total_medical_appointments").innerHTML = medical_appointments;
    });
}

function countHealthPersonnelAppointments(id) {
    var count = 0;
    firebase.database().ref("Appointments/" + id).once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            childX.forEach(function (snapshotChild) {
                if (snapshotChild.child("state").val() !== "free") {
                    count++;
                }
            });
        });
        document.getElementById("total_appointments").innerHTML = count;
    });
}

function countAppoinments(id) {
    if (sessionStorage.getItem("type") === "doctor" || sessionStorage.getItem("type") === "nurse") {
        countHealthPersonnelAppointments(id);
    } else if (sessionStorage.getItem("type") === "patient") {
        countPatientAppointments(id);
    } else {
        countAllAppointments();
    }
}

function countUsers() {
    var users = [0, 0, 0, 0];
    firebase.database().ref('Users/').once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            if (childX.child("type").val() === "administrator" && childX.key !== sessionStorage.getItem("id"))
                users[0] += 1;
            if (childX.child("type").val() === "doctor" && childX.key !== sessionStorage.getItem("id"))
                users[1] += 1;
            if (childX.child("type").val() === "patient" && childX.key !== sessionStorage.getItem("id"))
                users[2] += 1;
            if (childX.child("type").val() === "nurse" && childX.key !== sessionStorage.getItem("id"))
                users[3] += 1;
            document.getElementById("total_administrators").innerHTML = users[0];
            document.getElementById("total_doctors").innerHTML = users[1];
            document.getElementById("total_patients").innerHTML = users[2];
            document.getElementById("total_nurses").innerHTML = users[3];
        });
    });
}

function setProfilePhoto(id) {
    var imageRef = firebase.storage().ref().child(id + ".jpg");
    imageRef.getDownloadURL().then(function (url) {
        document.getElementById("profile_photo").src = url;
    }).catch(function (error) {
        alert(error);
    });
}

function resetEditUserForm() {
    getSessionData();
    document.getElementById("specialties_doctor").style.display = "none";
    document.getElementById("specialties_nurse").style.display = "none";
    var id = sessionStorage.getItem("id_users");
    firebase.database().ref('Users/' + id).once('value').then(function (snapshot) {
        sessionStorage.setItem("type_users", snapshot.child("type").val());
        document.getElementById("dni").value = snapshot.child("dni").val();
        document.getElementById("username").value = snapshot.child("name").val();
        document.getElementById("birth").value = snapshot.child("birth").val();
        document.getElementById("address").value = snapshot.child("address").val();
        document.getElementById("phone").value = snapshot.child("phone").val();
        document.getElementById("information").value = snapshot.child("information").val();
        if (snapshot.child("type").val() === "doctor") {
            document.getElementById("specialties_doctor").style.display = "flex";
            document.getElementById("specialties_nurse").style.display = "none";
            document.getElementById("specialties_doctor_selection").value = snapshot.child("speciality").val();
        } else if (snapshot.child("type").val() === "nurse") {
            document.getElementById("specialties_nurse").style.display = "flex";
            document.getElementById("specialties_doctor").style.display = "none";
            document.getElementById("specialties_nurse_selection").value = snapshot.child("speciality").val();
        }
    });
    setProfilePhoto(id);
}


function storeUIDSelected(uid, action) {
    sessionStorage.setItem("id_users", uid);
    if (action === "edit")
        window.location = "edituser.jsp";
    else if (action === "appointment")
        window.location = "requestAppointment.jsp";
    else if (action === "medical_history")
        window.location = "history.jsp";
    else if (action === "send_email")
        window.location = "sendEmail.jsp";
}

function uploadPreviewPhoto() {
    if (document.getElementById("photo_preview") !== null)
        document.getElementById("photo_preview").style.display = "flex";
    var reader = new FileReader();
    reader.onload = function (event) {
        document.getElementById("profile_photo").src = event.target.result;
    };
    reader.readAsDataURL(document.getElementById("new_profile_photo").files[0]);
}


function checkUpdate(dni, uid, action) {
    var val = "";
    if (action === "user") {
        firebase.database().ref("Users/").once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                if (childSnapshot.key !== uid) {
                    if (childSnapshot.child("dni").val() === dni) {
                        document.getElementById("dni").style.borderColor = "red";
                        document.getElementById("errorDNI").innerHTML = "There is already a registered user with that DNI";
                        val = "false";
                    }
                }
            });
            if (val !== "false")
                update();
        });
    } else {
        firebase.database().ref("MedicalHistory/").once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                if (childSnapshot.key !== uid) {
                    if (childSnapshot.child("dni").val() === dni) {
                        document.getElementById("dni").style.borderColor = "red";
                        document.getElementById("errorDNI").innerHTML = "There is already a registered user with that DNI";
                        val = "false";
                    }
                }
            });
            if (val !== "false")
                updateM();
        });
    }
}

function update() {
    var dni = document.getElementById("dni").value;
    var phone = document.getElementById("phone").value;
    var birth = document.getElementById("birth").value;
    var category = "";
    if (sessionStorage.getItem("type_users") === "doctor") {
        category = document.getElementById("specialties_doctor_selection").value;
    } else if (sessionStorage.getItem("type_users") === "nurse") {
        category = document.getElementById("specialties_nurse_selection").value;
    }
    firebase.database().ref('Users/' + sessionStorage.getItem("id_users")).update({
        dni: dni,
        name: document.getElementById("username").value,
        birth: birth,
        address: document.getElementById("address").value,
        phone: phone,
        information: document.getElementById("information").value,
        category: category
    });
    saveImage(sessionStorage.getItem("id_users"), "edit");
}

function updateM() {

    firebase.database().ref('MedicalHistory/' + sessionStorage.getItem("id_users")).update({
        allergies: document.getElementById("allergies").value,
        birth: document.getElementById("birth").value,
        diseases: document.getElementById("diseases").value,
        dni: document.getElementById("dni").value,
        email: document.getElementById("email").value,
        height: document.getElementById("height").value,
        marital_status: document.getElementById("marital_status").value,
        name: document.getElementById("p_name").value,
        phone: document.getElementById("phone").value,
        place_of_birth: document.getElementById("p_birth").value,
        place_of_residence: document.getElementById("p_residence").value,
        race: document.getElementById("race").value,
        sex: document.getElementById("sex").value,
        weight: document.getElementById("weight").value
    });

    firebase.database().ref('Users/' + sessionStorage.getItem("id_users")).update({
        dni: document.getElementById("dni").value,
        name: document.getElementById("p_name").value,
        birth: document.getElementById("birth").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value
    });

    window.location = "history.jsp";
}

function updateUsers() {
    var dni = document.getElementById("dni").value;
    var phone = document.getElementById("phone").value;
    var birth = document.getElementById("birth").value;
    var category = "";
    if (sessionStorage.getItem("type_users") === "doctor") {
        category = document.getElementById("specialties_doctor_selection").value;
    } else if (sessionStorage.getItem("type_users") === "nurse") {
        category = document.getElementById("specialties_nurse_selection").value;
    }
    validateDNI(dni, sessionStorage.getItem("id_users"));
    validateDate(birth);
    validatePhone(phone);
    if (sessionStorage.getItem("validation_dni_update") === "true" &&
            sessionStorage.getItem("validation_birth_update") === "true"
            && sessionStorage.getItem("validation_phone_update") === "true") {
        checkUpdate(dni, sessionStorage.getItem("id_users"), "user");
    }
}

function updateMedicalHistory() {
    var dni = document.getElementById("dni").value;
    var phone = document.getElementById("phone").value;
    var birth = document.getElementById("birth").value;


    validateDNI(dni, sessionStorage.getItem("id_users"));
    validateDate(birth);
    validatePhone(phone);


    if (sessionStorage.getItem("validation_dni_update") === "true" &&
            sessionStorage.getItem("validation_birth_update") === "true"
            && sessionStorage.getItem("validation_phone_update") === "true") {
        checkUpdate(dni, sessionStorage.getItem("id_users"), "medical");
    }
}

function deletePhoto(uid) {
    var storageRef = firebase.storage().ref();
    var storeRef = storageRef.child(uid + ".jpg");
    storeRef.delete().then(function () {
        $('#delete_modal').modal('hide');
        location.reload();
    }).catch(function (error) {
        alert(error);
    });
}

function deleteUser() {
    firebase.database().ref("Users/").child(sessionStorage.getItem("id_users")).remove().then(function () {
        deletePhoto(sessionStorage.getItem("id_users"));
    }).catch(function (error) {
        alert(error);
    });
}

function getUsersData(type) {
    getSessionData();
    if (type === "doctor") {
        sessionStorage.setItem("appointment_type", "medical");
    } else if (type === "nurse") {
        sessionStorage.setItem("appointment_type", "nursing");
    }
    document.getElementById("actions").style.display = "none";
    var database = firebase.database().ref('Users/').once('value').then(function (snapshot) {
        var content = "";
        snapshot.forEach(function (childX) {
            if (childX.key !== sessionStorage.getItem("id")) {
                if (childX.child("type").val() === type) {
                    if (type === "patient") {
                        content += '<tr><td><a onclick=storeUIDSelected("' + childX.key + '","medical_history")>' + childX.child("name").val() + "</a></td>";
                        content += "<td>" + childX.child("dni").val() + "</td>";
                        content += "<td>" + childX.child("email").val() + "</td>";

                    } else {
                        content += '<tr><td><a onclick=storeUIDSelected("' + childX.key + '","appointment")>' + childX.child("name").val() + "</a></td>";
                    }
                    if (type !== "administrator" && type !== "patient") {
                        content += "<td>" + childX.child("speciality").val() + "</td>";
                    }
                    content += "<td>" + childX.child("phone").val() + "</td>";
                    
                    if (sessionStorage.getItem("type") === "patient") {
                        document.getElementById("actions").style.display = "flex";
                        content += '<td><a class="btn btn-sm bg-info-light" href="#" onclick=storeUIDSelected("' + childX.key + '","send_email")> <i class="fe fe-mail"></i> Send email </a></td>' +
                                "</tr>";
                    } 
                    
                    if (sessionStorage.getItem("type") === "administrator") {
                        document.getElementById("actions").style.display = "flex";
                        content += '<a class="btn btn-sm bg-primary-light mr-2" onclick=storeUIDSelected("' + childX.key + '","medical_history")> <i class="fe fe-eye"></i> View medical history</a>' + '<a class="btn btn-sm bg-success-light mr-2" onclick=storeUIDSelected("' + childX.key + '","edit")> <i class="fe fe-pencil"></i> Edit</a>' +
                                '<a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal" onclick=storeUIDSelected("' + childX.key + '")>    <i class="fe fe-trash"></i> Delete </a></td>' +
                                "</tr>";
                    }
                    content += "</a>";
                }
            }
        });
        $("#" + type + "_table").append(content);
    });
}

function setUserData() {
    document.getElementById("name").innerHTML = sessionStorage.getItem("name");
    document.getElementById("type").innerHTML = sessionStorage.getItem("type");
    firebase.storage().ref().child(sessionStorage.getItem("id") + ".jpg").getDownloadURL().then(function (url) {
        document.getElementById('imagenU').src = url;
        document.getElementById('imagenU2').src = url;
    }).catch(function (error) {
        document.getElementById("error").innerHTML = error;
    });
}

function saveImage(uid) {
    var file = document.getElementById("new_profile_photo").files[0];
    if (file === undefined)
        window.location = "home.jsp";
    else {
        var thisRef = firebase.storage().ref().child(uid + ".jpg");
        thisRef.put(file).then(function (snapshot) {
            window.location = "home.jsp";
        });
    }
}


function add() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password_repeat = document.getElementById("password_repeat").value;
    var dni = document.getElementById("dni").value;
    var birth = document.getElementById("birth").value;
    var phone = document.getElementById("phone").value;
    var category = " ";
    if (document.getElementById("rol").value === "Doctor") {
        category = document.getElementById("specialties_doctor_selection").value;
    } else if (document.getElementById("rol").value === "Nurse") {
        category = document.getElementById("specialties_nurse_selection").value;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (snapshot) {
        firebase.database().ref('Users/' + snapshot.uid).set({
            dni: dni,
            name: document.getElementById("username").value,
            birth: birth,
            address: document.getElementById("address").value,
            phone: phone,
            information: document.getElementById("information").value,
            type: document.getElementById("rol").value.toLowerCase(),
            category: category
        }, function (error) {
            if (error)
                alert(error);
            else
                saveImage(snapshot.uid, "");
        });
    }).catch(function (error) {
        document.getElementById("email").style.borderColor = "red";
        document.getElementById("errorEmail").innerHTML = "Email is already in use.";
    });
}


function checkAdd(dni, uid) {
    var val = "";
    firebase.database().ref("Users/").once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.key !== uid) {
                if (childSnapshot.child("dni").val() === dni) {
                    document.getElementById("dni").style.borderColor = "red";
                    document.getElementById("errorDNI").innerHTML = "There is already a registered user with that DNI";
                    val = "false";
                }
            }
        });
        if (val !== "false")
            add();
    });
}

function addUsers() {
    var password = document.getElementById("password").value;
    var password_repeat = document.getElementById("password_repeat").value;
    var dni = document.getElementById("dni").value;
    var birth = document.getElementById("birth").value;
    var phone = document.getElementById("phone").value;

    validatePass(password, password_repeat);
    validateDNI(dni, sessionStorage.getItem("id_users"));
    validateDate(birth);
    validatePhone(phone);

    if (sessionStorage.getItem("validation_dni_update") === "true" &&
            sessionStorage.getItem("validation_birth_update") === "true"
            && sessionStorage.getItem("validation_phone_update") === "true") {
        checkAdd(dni, sessionStorage.getItem("id_users"));
    }

}

function selectRol() {
    var rol = document.getElementById("rol").value;
    document.getElementById("specialties_doctor").style.display = "none";
    document.getElementById("specialties_nurse").style.display = "none";
    if (rol === "Doctor") {
        document.getElementById("specialties_doctor").style.display = "flex";
        document.getElementById("specialties_nurse").style.display = "none";
    } else if (rol === "Nurse") {
        document.getElementById("specialties_doctor").style.display = "none";
        document.getElementById("specialties_nurse").style.display = "flex";
    }
}

function resetAddUserForm() {
    getSessionData();
    document.getElementById("specialties_doctor").style.display = "none";
    document.getElementById("specialties_nurse").style.display = "none";
    document.getElementById("photo_preview").style.display = "none";
    sessionStorage.getItem("validation_dni", "false");
    sessionStorage.getItem("validation_birth", "false");
    sessionStorage.getItem("validation_phone", "false");
    sessionStorage.getItem("validation_pass", "false");
    sessionStorage.getItem("validation_dni_update", "false");
    sessionStorage.getItem("validation_birth_update", "false");
    sessionStorage.getItem("validation_phone_update", "false");
}


function validateDNI(dni, uid) {
    var ex_regular_dni = /^\d{8}[A-Z]$/;
    if (ex_regular_dni.test(dni) !== true) {
        document.getElementById("dni").style.borderColor = "red";
        document.getElementById("errorDNI").innerHTML = "Invalid DNI. Must have 8 digits and 1 letter.";
        sessionStorage.setItem("validation_dni", "false");
        sessionStorage.setItem("validation_dni_update", "false");
    } else {
        document.getElementById("dni").style.borderColor = "";
        document.getElementById("errorDNI").innerHTML = "";
        sessionStorage.setItem("validation_dni", "true");
        sessionStorage.setItem("validation_dni_update", "true");
    }
}

function validateDate(date) {
    var ex_regular_date = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
    if (ex_regular_date.test(date) !== true) {
        document.getElementById("birth").style.borderColor = "red";
        document.getElementById("errorDate").innerHTML = "Invalid birth data. Follow dd-MM-yyyy format.";
        sessionStorage.setItem("validation_birth", "false");
        sessionStorage.setItem("validation_birth_update", "false");
    } else {
        document.getElementById("birth").style.borderColor = "";
        document.getElementById("errorDate").innerHTML = "";
        sessionStorage.setItem("validation_birth", "true");
        sessionStorage.setItem("validation_birth_update", "true");
    }
}

function validatePhone(phone) {
    var ex_regular_phone = /^[679]{1}[0-9]{8}$/;
    if (ex_regular_phone.test(phone) !== true) {
        document.getElementById("phone").style.borderColor = "red";
        document.getElementById("errorPhone").innerHTML = "Invalid data. Phone must have 9 digits.";
        sessionStorage.setItem("validation_phone", "false");
        sessionStorage.setItem("validation_phone_update", "false");
    } else {
        document.getElementById("phone").style.borderColor = "";
        document.getElementById("errorPhone").innerHTML = "";
        sessionStorage.setItem("validation_phone", "true");
        sessionStorage.setItem("validation_phone_update", "true");
    }

}

function validatePass(password, password_repeat) {
    if (password !== password_repeat) {
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("password_repeat").style.borderColor = "red";
        document.getElementById("errorPass").innerHTML = "Passwords do not match";
        sessionStorage.setItem("validation_pass", "false");
    } else {
        document.getElementById("password").style.borderColor = "";
        document.getElementById("password_repeat").style.borderColor = "";
        document.getElementById("errorPass").innerHTML = "";
        sessionStorage.setItem("validation_pass", "true");
    }
}

function checkAvailability() {
    document.getElementById("request_appointment").style.display = "none";

    var uid = sessionStorage.getItem("id");
    if (sessionStorage.getItem("type") === "patient")
        uid = sessionStorage.getItem("id_users");

    firebase.database().ref("Appointments/" + uid).once('value').then(function (snapshot) {
        var enter = "false";
        snapshot.forEach(function (childX) {
            childX.forEach(function (snapshotChild) {
                if ((childX.key.split('-').join("/") === $("#datepicker").val()) && snapshotChild.child("state").val() === "free") {
                    var option = document.createElement("option");
                    option.text = snapshotChild.key;
                    document.getElementById("all_appointments_selection").add(option);
                    document.getElementById("request_appointment").style.display = "block";
                    document.getElementById("all_appointments").style.display = "block";
                    enter = "true";
                }
            });
        });
        if (enter === "false") {
            alert("There are no appointments available");
            document.getElementById("all_appointments").style.display = "none";
        }
    });
}


function resetAppointmentForm() {
    getSessionData();
    document.getElementById("all_appointments").style.display = "none";
}

function requestAppointment() {
    var selected_appointment = document.getElementById("all_appointments_selection").value;
    var selected_date = $("#datepicker").val().split('/').join("-");
    firebase.database().ref('Appointments/' + sessionStorage.getItem("id_users") + "/" + selected_date + "/" + selected_appointment).set({
        patient: sessionStorage.getItem("id"),
        state: "pending",
        subtype: document.getElementById("appointment_subtype").value,
        type: sessionStorage.getItem("appointment_type")
    }, function (error) {
        if (error)
            alert(error);
        else
            window.location = "home.jsp";
    });
}

function getPatientName(id) {
    firebase.database().ref('Users/' + id).once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            return snapshot.child("name").val();
        });
    });
}

function editAppointments() {
    getSessionData();
    firebase.database().ref('Appointments/' + sessionStorage.getItem("appointment_user")).once('value').then(function (snapshot) {
        var content = "";
        snapshot.forEach(function (childX) {
            //alert(childX.key);
            childX.forEach(function (childY) {
                //alert(childY.key);
                if (childY.child("state").val() === "free" && sessionStorage.getItem("appointment_date_editdate") !== childX.key) {
                    sessionStorage.setItem("appointment_date_editdate", childX.key);
                    content += "<option value=" + childX.key + ">" + childX.key + "</option>";
                }
            });
        });
        $("#appointments_date").append(content);
    });
    document.getElementById("edit_appointments_title").innerHTML = "Change appointment " + sessionStorage.getItem("appointment_date")
            + " " + sessionStorage.getItem("appointment_hour");
}

function select_date_Edit() {
    var x = document.getElementById("appointments_date").value;
    sessionStorage.setItem("appointment_date_edit", x);
    //document.getElementById("prueba").innerHTML = x;
    $("#appointments_hour").empty();
    firebase.database().ref('Appointments/' + sessionStorage.getItem("appointment_user") + '/' + x).once('value').then(function (snapshot) {
        var content = "";
        snapshot.forEach(function (childX) {
            if (childX.child("state").val() === "free") {
                content += "<option value=" + childX.key + ">" + childX.key + "</option>";
            }
        });
        $("#appointments_hour").append(content);
    });
}

function select_hour_Edit() {
    var x = document.getElementById("appointments_hour").value;
    //document.getElementById("prueba").innerHTML = x;
    sessionStorage.setItem("appointment_hour_edit", x);
}

function finishEdit() {
    var x = document.getElementById("edit_subtype").value;
    firebase.database().ref('Appointments/' + sessionStorage.getItem("appointment_user") + '/' + sessionStorage.getItem("appointment_date_edit") + '/' +
            sessionStorage.getItem("appointment_hour_edit")).update({
        patient: sessionStorage.getItem("id"),
        state: "pending",
        subtype: x,
        type: sessionStorage.getItem("type_appointment")

    });
    sessionStorage.setItem("flag3", "true");
    deleteAppointments();
}

function deleteAppointment() {
    var date = sessionStorage.getItem("last_appointment_date").split('/').join("-");
    var appointment = sessionStorage.getItem("last_appointment_time");
    firebase.database().ref('Appointments/' + sessionStorage.getItem("id") + "/" + date + "/" + appointment).remove().then(function () {
    }).catch(function (error) {
        alert(error);
    });
}

function deleteAppointments() {

    firebase.database().ref('Appointments/' + sessionStorage.getItem("appointment_user") + '/' + sessionStorage.getItem("appointment_date") + '/' +
            sessionStorage.getItem("appointment_hour")).set({
        state: "free",
        type: sessionStorage.getItem("type_appointment")
    });

    if (sessionStorage.getItem("flag3") === "true" && sessionStorage.getItem("type_appointment") === "medical") {
        sessionStorage.setItem("flag3", "false");
        window.location.replace("myappointments.jsp?state=" + sessionStorage.getItem("appointment_state") + "&type=medical&table=Doctor");
    } else if (sessionStorage.getItem("flag3") === "true" && sessionStorage.getItem("type_appointment") === "nursing") {
        sessionStorage.setItem("flag3", "false");
        window.location.replace("myappointments.jsp?state=" + sessionStorage.getItem("appointment_state") + "&type=nursing&table=Nurse");
    } else {
        location.reload();
    }
}

function storeDate(date, hour, user, action) {

    sessionStorage.setItem("appointment_date", date);
    sessionStorage.setItem("appointment_hour", hour);
    sessionStorage.setItem("appointment_user", user);

    if (action === "edit") {
        window.location.replace("edit_patient_appointments.jsp");
    }
    if (action === "view") {
        window.location.replace("history.jsp");
    }


}


function freeAppointment_1() {
    var date = sessionStorage.getItem("last_appointment_date").split('/').join("-");
    var appointment = sessionStorage.getItem("last_appointment_time");
    firebase.database().ref('Appointments/' + sessionStorage.getItem("id") + "/" + date + "/" + appointment).set({
        state: "free",
        type: sessionStorage.getItem("appointment_type")
    }, function (error) {
        if (error)
            alert(error);
        else
            window.location = "home.jsp";
    });
}

function updateAppointment() {
    freeAppointment_1();
    var selected_appointment = document.getElementById("all_appointments_selection").value;
    var selected_date = $("#datepicker").val().split('/').join("-");
    firebase.database().ref('Appointments/' + sessionStorage.getItem("id") + "/" + selected_date + "/" + selected_appointment).set({
        patient: sessionStorage.getItem("last_appointment_patient_uid"),
        state: "accepted",
        subtype: document.getElementById("subtype_selection").value,
        type: sessionStorage.getItem("appointment_type")
    }, function (error) {
        if (error)
            alert(error);
        else
            window.location = "home.jsp";
    });
}

function resetEditAppointmentForm() {
    resetAppointmentForm();
    var patient_uid = sessionStorage.getItem("last_appointment_patient_uid");
    document.getElementById("patient_name").innerHTML = sessionStorage.getItem("last_appointment_patient");
    document.getElementById("datepicker").placeholder = sessionStorage.getItem("last_appointment_date") + " - " + sessionStorage.getItem("last_appointment_time");
    document.getElementById("subtype_selection").value = sessionStorage.getItem("last_appointment_subtype");
}


function setAppointment(date, time, user, subtype, state) {
    firebase.database().ref('Users/' + user).once('value').then(function (snapshot) {
        var content = '<tr><td>' + date + '</td><td>' + time + '</td><td>' + snapshot.child("name").val() + '</td><td>' + subtype + '</td>';
        var name = snapshot.child("name").val();
        name = name.replace(" ", ":");
        subtype = subtype.replace(" ", ":");
        if (state === "accepted") {
            content += '<td><a class="btn btn-sm bg-primary-light mr-2" onclick=storeUIDSelected("' + user + '","medical_history")> <i class="fe fe-eye"></i> View medical history</a><a class="btn btn-sm bg-success-light mr-2" onclick=storeLastSelectedAppointment("' + date + '","' + time + '","' + user + '","' + name + '","' + subtype + '","' + state + '")> <i class="fe fe-pencil"></i> Edit</a>' +
                    '<a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal" onclick=storeAppointment("' + time + '","' + date + '","' + sessionStorage.getItem("id") + '","' + user + '","' + subtype + '")><i class="fe fe-trash"></i> Delete </a></td></tr>';
        } else {
            content += '<td><a class="btn btn-sm bg-success-light mr-2" data-toggle="modal" href="#confirm_modal" onclick=storeAppointment("' + time + '","' + date + '","' + sessionStorage.getItem("id") + '","' + user + '","' + subtype + '")> <i class="fe fe-check"></i> Accept</a>' +
                    '<a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#reject_modal" onclick=storeAppointment("' + time + '","' + date + '","' + sessionStorage.getItem("id") + '","' + user + '","' + subtype + '")><i class="fe fe-trash"></i> Reject</a></td></tr>';
        }
        $("#appointments_table").append(content);
    });
}

function setAppointmentsPatients(state, date, hour, user, reason) {
    firebase.database().ref('Users/' + user).once('value').then(function (snapshot2) {
        var content = "<tr>" + "<td>" + date + "</td>" +
                "<td>" + hour + "</td>" +
                "<td>" + snapshot2.child("name").val() + "</td>" +
                "<td>" + reason + "</td>" +
                '<td><a class="btn btn-sm bg-success-light mr-2" href="#modal" onclick=storeDate("' + date + '","' + hour + '","' + user + '","edit")> <i class="fe fe-pencil"></i> Edit</a>' +
                '<a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal" onclick=storeDate("' + date + '","' + hour + '","' + user + '","delete")><i class="fe fe-trash"></i> Delete </a></td>' +
                "</tr>";
        $("#appointments_table").append(content);
    });

}

function getAppointmentsData(state, type) {
    getSessionData();
    var flag = false;

    if (type === "null") {
        if (sessionStorage.getItem("type") === "doctor") {
            type = "medical";
        } else {
            type = "nursing";
        }
    }

    sessionStorage.setItem("appointment_state", state);
    sessionStorage.setItem("type_appointment", type);

    if (sessionStorage.getItem("type") !== "patient") {
        firebase.database().ref('Appointments/' + sessionStorage.getItem("id")).once('value').then(function (snapshot) {
            snapshot.forEach(function (childX) {
                childX.forEach(function (snapshotChild) {
                    if (state === snapshotChild.child("state").val()) {
                        flag = true;
                        setAppointment(childX.key, snapshotChild.key, snapshotChild.child("patient").val(), snapshotChild.child("subtype").val(), state);
                    }
                });
            });
            if (flag === false) {
                document.getElementById("nullAppoinments").innerHTML = "You dont have any " + state + " appointment";
            }
        });
    } else {
        firebase.database().ref('Appointments/').once('value').then(function (snapshot) {
            snapshot.forEach(function (childX) {
                childX.forEach(function (childY) {
                    childY.forEach(function (childZ) {
                        if (childZ.child("patient").val() === sessionStorage.getItem("id") && childZ.child("state").val() === state
                                && childZ.child("type").val() === type) {
                            flag = true;
                            setAppointmentsPatients(state, childY.key, childZ.key, childX.key, childZ.child("subtype").val());
                        }
                    });
                });
            });
            if (flag === false) {
                document.getElementById("nullAppoinments").innerHTML = "You dont have any " + state + " appointment";
            }
        });
    }
}

function storeLastSelectedAppointment(date, time, user, name, subtype, state) {
    sessionStorage.setItem("last_appointment_date", date);
    sessionStorage.setItem("last_appointment_time", time);
    sessionStorage.setItem("last_appointment_patient_uid", user);
    sessionStorage.setItem("last_appointment_patient", name.replace(":", " "));
    sessionStorage.setItem("last_appointment_subtype", subtype.replace(":", " "));
    sessionStorage.setItem("last_appointment_state", state);
    window.location = "editappointment.jsp";
}

function setMedicalHistory() {
    getSessionData();
    document.getElementById("all_prescriptions").style.display = "none";
    var id = sessionStorage.getItem("id");
    document.getElementById("prescribe").style.display = "none";
    document.getElementById("editHistory").style.display = "none";
    if (sessionStorage.getItem("type") !== "patient") {
        id = sessionStorage.getItem("id_users");
        document.getElementById("prescribe").style.display = "block";
        document.getElementById("editHistory").style.display = "block";
    }
    firebase.database().ref('MedicalHistory/' + id).once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            if (childX.key === "dni")
                document.getElementById("dni").innerHTML = childX.val();
            if (childX.key === "name") {
                document.getElementById("p_name").innerHTML = childX.val();
                sessionStorage.setItem("patient_history", childX.val());
            }
            if (childX.key === "sex")
                document.getElementById("sex").innerHTML = childX.val();
            if (childX.key === "race")
                document.getElementById("race").innerHTML = childX.val();
            if (childX.key === "birth")
                document.getElementById("birth").innerHTML = childX.val();
            if (childX.key === "email")
                document.getElementById("email").innerHTML = childX.val();
            if (childX.key === "phone")
                document.getElementById("phone").innerHTML = childX.val();
            if (childX.key === "place_of_birth")
                document.getElementById("p_birth").innerHTML = childX.val();
            if (childX.key === "place_of_residence")
                document.getElementById("p_residence").innerHTML = childX.val();
            if (childX.key === "weight")
                document.getElementById("weight").innerHTML = childX.val();
            if (childX.key === "height")
                document.getElementById("height").innerHTML = childX.val();
            if (childX.key === "marital_status")
                document.getElementById("marital_status").innerHTML = childX.val();
            if (childX.key === "allergies")
                document.getElementById("allergies").innerHTML = childX.val();
            if (childX.key === "diseases")
                document.getElementById("diseases").innerHTML = childX.val();
        });
    });
}

function setMedicalHistoryEdit() {
    getSessionData();
    var id = sessionStorage.getItem("id_users");

    firebase.database().ref('MedicalHistory/' + id).once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            if (childX.key === "dni")
                document.getElementById("dni").value = childX.val();
            if (childX.key === "name") {
                document.getElementById("p_name").value = childX.val();
                sessionStorage.setItem("patient_history", childX.val());
            }
            if (childX.key === "sex")
                document.getElementById("sex").value = childX.val();
            if (childX.key === "race")
                document.getElementById("race").value = childX.val();
            if (childX.key === "birth")
                document.getElementById("birth").value = childX.val();
            if (childX.key === "email")
                document.getElementById("email").value = childX.val();
            if (childX.key === "phone")
                document.getElementById("phone").value = childX.val();
            if (childX.key === "place_of_birth")
                document.getElementById("p_birth").value = childX.val();
            if (childX.key === "place_of_residence")
                document.getElementById("p_residence").value = childX.val();
            if (childX.key === "weight")
                document.getElementById("weight").value = childX.val();
            if (childX.key === "height")
                document.getElementById("height").value = childX.val();
            if (childX.key === "marital_status")
                document.getElementById("marital_status").value = childX.val();
            if (childX.key === "allergies")
                document.getElementById("allergies").value = childX.val();
            if (childX.key === "diseases")
                document.getElementById("diseases").value = childX.val();
        });
    });
}

function resetPrescribeMedicationForm() {
    getSessionData();
    document.getElementById("patient_name").innerHTML = sessionStorage.getItem("patient_history");
}

function savePrescription() {
    var id = sessionStorage.getItem("id_users");
    var d = new Date();
    var datetime = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "." + d.getHours() + ":" + d.getMinutes();
    var file = document.getElementById("prescription_pdf").files[0];
    var thisRef = firebase.storage().ref().child(id + "/_" + datetime + "_");
    thisRef.put(file).then(function (snapshot) {
        window.location = "history.jsp";
    });
}

function getPrescriptionsFiles() {
    var id = sessionStorage.getItem("id");
    if (sessionStorage.getItem("type") !== "patient") {
        id = sessionStorage.getItem("id_users");
    }
    firebase.storage().ref().child(id).listAll().then(function (res) {
        res.items.forEach(function (itemRef) {
            itemRef.getDownloadURL().then(function (url) {
                var filename = url.substring(url.indexOf("_") + 1, url.lastIndexOf("_")).split('-').join("/").split('.').join(" ").split('%3A').join(":");
                $("#prescriptions_data").append('<a href="' + url + '" target="_blank">' + filename + '</a><br>');
            });
        });
    }).catch(function (error) {
    });

}

function showAllPrescriptions() {
    if (document.getElementById("all_prescriptions").style.display === "block") {
        document.getElementById("all_prescriptions").style.display = "none";
        document.getElementById("prescriptions_btn").innerHTML = "View";
        $("#prescriptions_data").empty();
    } else {
        document.getElementById("all_prescriptions").style.display = "block";
        document.getElementById("prescriptions_btn").innerHTML = "Hide";
        getPrescriptionsFiles();
    }
}

function searchPatient() {
    var search = document.getElementById("search_patient").value;
    sessionStorage.setItem("flag2", "false");
    firebase.database().ref('Users/').once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            if (childX.child("type").val() === "patient" && (childX.child("dni").val().includes(search)) || childX.child("name").val().includes(search)) {
                sessionStorage.setItem("flag2", "true");
                var content = "<tr>" +
                        "<td>" + childX.child("name").val() + "</td>" +
                        "<td>" + childX.child("dni").val() + "</td>" +
                        "<td>" + childX.child("email").val() + "</td>" +
                        "<td>" + childX.child("phone").val() + "</td>" +
                        "</tr>";

            }
            $("#patient_table").append(content);
        });

        if (sessionStorage.getItem("flag2") === "false") {
            document.getElementById("nullSearch").innerHTML = "No search results";
        }
    });
    document.getElementById("patient_table").innerHTML = "";
}

function storeAppointment(hour, date, user, patient, reason) {

    var type = sessionStorage.getItem("type");
    if (type === "doctor") {
        sessionStorage.setItem("userType", "medical");
    } else {
        sessionStorage.setItem("userType", "nursing");
    }
    sessionStorage.setItem("appointment_date", date);
    sessionStorage.setItem("appointment_hour", hour);
    sessionStorage.setItem("appointment_user", user);
    sessionStorage.setItem("appointment_patient", patient);
    sessionStorage.setItem("appointment_reason", reason.replace(":", " "));
}


function confirmAppointment() {
    alert(sessionStorage.getItem("appointment_patient") + " " + sessionStorage.getItem("appointment_reason") + " " + sessionStorage.getItem("userType"));
    firebase.database().ref('Appointments/' + sessionStorage.getItem("appointment_user") + '/' + sessionStorage.getItem("appointment_date") + '/' +
            sessionStorage.getItem("appointment_hour")).set({
        state: "accepted",
        patient: sessionStorage.getItem("appointment_patient"),
        subtype: sessionStorage.getItem("appointment_reason"),
        type: sessionStorage.getItem("userType")
    });
    location.reload();
}

function freeAppointment() {
    firebase.database().ref('Appointments/' + sessionStorage.getItem("appointment_user") + '/' + sessionStorage.getItem("appointment_date") + '/' +
            sessionStorage.getItem("appointment_hour")).set({
        state: "free",
        type: sessionStorage.getItem("type_appointment")
    }).catch(function (error) {
        alert(error);
    });
    location.reload();
}

function searchNurses() {
    var search = document.getElementById("search_nurse").value; //Búsqueda
    sessionStorage.setItem("flag", "false"); //Guarda la sesión
    firebase.database().ref('Users/').once('value').then(function (snapshot) { //Accede a los usuarios de la BBDD
        snapshot.forEach(function (childX) { //Va bajando de forma anidada
            if (childX.child("type").val() === "nurse" && (childX.child("speciality").val() === search)) {
                sessionStorage.setItem("flag", "true");
                var content = "<tr>" + //Tabla de dni, nombre, email, phone
                        "<td>" + childX.child("name").val() + "</td>" +
                        "<td>" + childX.child("speciality").val() + "</td>" +
                        "<td>" + childX.child("phone").val() + "</td>" +
                        "</tr>";
            }
            $("#nurse_table").append(content); //tabla de enfermeros
        });
        if (sessionStorage.getItem("flag") === "false") {
            document.getElementById("nullSearch").innerHTML = "No search results"; //Si no encuentra o no pone nada en el buscador
        }
    });
    document.getElementById("nurse_table").innerHTML = ""; //Pone la tabla solo con el nurse buscado
}

function searchDoctors() {
    var search = document.getElementById("search_doctor").value; //Búsqueda
    sessionStorage.setItem("flag", "false"); //Guarda la sesión
    firebase.database().ref('Users/').once('value').then(function (snapshot) { //Accede a los usuarios de la BBDD
        snapshot.forEach(function (childX) { //Va bajando de forma anidada
            if (childX.child("type").val() === "doctor" && (childX.child("speciality").val() === search || childX.child("name").val() === search)) {
                sessionStorage.setItem("flag", "true");
                var content = "<tr>" + //Tabla de dni, nombre, email, phone
                        "<td>" + childX.child("name").val() + "</td>" +
                        "<td>" + childX.child("speciality").val() + "</td>" +
                        "<td>" + childX.child("phone").val() + "</td>" +
                        "</tr>";
            }
            $("#doctor_table").append(content); //tabla de enfermeros
        });
        if (sessionStorage.getItem("flag") === "false") {
            document.getElementById("nullSearch").innerHTML = "No search results"; //Si no encuentra o no pone nada en el buscador
        }
    });
    document.getElementById("doctor_table").innerHTML = ""; //Pone la tabla solo con el nurse buscado
}

function setEmailData() {
    getSessionData();
    firebase.database().ref('Users/').once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            if (childX.key === sessionStorage.getItem("id_users")) {
                //alert("dentro del if");
                document.getElementById("send_email_name").innerHTML = "Send email to " + childX.child("name").val();
                sessionStorage.setItem("email_user", childX.child("email").val());
            }
        });
    });
}

function sendEmail() {
    var flag = false;
    var flag2 = false;

    if (document.getElementById("subject").value === "") {
        document.getElementById("subject").style.borderColor = "red";
        document.getElementById("errorSubject").innerHTML = "You have to put a Subject";
    } else {
        flag = true;
        document.getElementById("subject").style.borderColor = "";
        document.getElementById("errorSubject").innerHTML = "";
    }

    if (document.getElementById("message").value === '') {
        document.getElementById("message").style.borderColor = "red";
        document.getElementById("errorMessage").innerHTML = "You have to put a Message";
    } else {
        flag2 = true;
        document.getElementById("message").style.borderColor = "";
        document.getElementById("errorMessage").innerHTML = "";
    }

    if (flag === true && flag2 === true) {
        var yourMessage = document.getElementById("message").value;
        var subject = document.getElementById("subject").value;
        //alert(sessionStorage.getItem("email_user"));
        document.location.href = "mailto:" + sessionStorage.getItem("email_user") + "?subject="
                + encodeURIComponent(subject)
                + "&body=" + encodeURIComponent(yourMessage);
    }
}

//Starting HU-36