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
    if (document.getElementById("administrators_section"))  document.getElementById("administrators_section").style.display = "block";
    if (document.getElementById("doctors_section"))  document.getElementById("doctors_section").style.display = "block";
    if (document.getElementById("appointments_section")) document.getElementById("appointments_section").style.display = "none";
    if (document.getElementById("medical_appointments_section"))  document.getElementById("medical_appointments_section").style.display = "block";
    if (document.getElementById("nursing_appointments_section"))  document.getElementById("nursing_appointments_section").style.display = "block";
    if (document.getElementById("nurses_section"))  document.getElementById("nurses_section").style.display = "block";
    if (document.getElementById("patients_section"))  document.getElementById("patients_section").style.display = "block";
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

        if (type === "patient") {
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
    
    //getAcceptedNurseAppointments();
}

function countAppoinments(id) {
    var count = 0;
    var nursing_appointments = 0;

    var ref = "Appointments/" + id;
    if (sessionStorage.getItem("type") === "administrator" || sessionStorage.getItem("type") === "patient") {
        ref = "Appointments/";
    }
    firebase.database().ref(ref).once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            childX.forEach(function (snapshotChild) { // iterate appointments
                if (sessionStorage.getItem("type") === "patient" || sessionStorage.getItem("type") === "administrator") {
                    snapshotChild.forEach(function (date) {
                        if ((sessionStorage.getItem("type") === "administrator" || date.child("patient").val() === id) && date.child("type").val() === "medical") {
                            count += 1;
                        } else if ((sessionStorage.getItem("type") === "administrator" || date.child("patient").val() === id) && date.child("type").val() === "nursing") {
                            nursing_appointments += 1;
                        }
                    });
                } else {
                    count += 1;
                }
            });
            document.getElementById("total_medical_appointments").innerHTML = count;
            document.getElementById("total_nursing_appointments").innerHTML = nursing_appointments;
        });
        document.getElementById("total_appointments").innerHTML = count;
    });
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
    if (action === "edit")
        window.location = "edituser.jsp";
    sessionStorage.setItem("id_users", uid);
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


function checkUpdate(dni, uid) {
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
            update();
    });
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
        checkUpdate(dni, sessionStorage.getItem("id_users"));
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
    document.getElementById("actions").style.display = "none";
    var database = firebase.database().ref('Users/').once('value').then(function (snapshot) {
        var content = "";
        snapshot.forEach(function (childX) {
            if (childX.key !== sessionStorage.getItem("id")) {
                if (childX.child("type").val() === type) {
                    content += "<tr>" + "<td>" + childX.child("dni").val() + "</td>" +
                            "<td>" + childX.child("name").val() + "</td>";
                    if (type !== "administrator" || type !== "patient") {
                        content += "<td>" + childX.child("speciality").val() + "</td>"
                    }
                    content += "<td>" + childX.child("phone").val() + "</td>";
                    if (sessionStorage.getItem("type") === "administrator") {
                        document.getElementById("actions").style.display = "flex";
                        content += '<td><a class="btn btn-sm bg-success-light mr-2" onclick=storeUIDSelected("' + childX.key + '","edit")> <i class="fe fe-pencil"></i> Edit</a>' +
                                '<a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal" onclick=storeUIDSelected("' + childX.key + '")>    <i class="fe fe-trash"></i> Delete </a></td>' +
                                "</tr>";
                    }
                }
            }
        });

        $("#" + type + "_table").append(content);

    });

}

function getAppointmentsData(state) {
    

    getSessionData(); 
    
    sessionStorage.setItem("flag", "false");
    
    var database = firebase.database().ref('Appointments/' + sessionStorage.getItem("id")).once('value').then(function (snapshot) {
        alert("PEP")
        snapshot.forEach(function (childX) {  
            childX.forEach(function (childY) {
                if (childY.child("state").val() === state) {
                    sessionStorage.setItem("flag", "true");
                    setAppointmentsData(state, childX.key, childY.key, childY.child("patient").val(), childY.child("subtype").val());
                }
            });
        });
        if (sessionStorage.getItem("flag") === "false") {
            document.getElementById("nullAppoinments").innerHTML = "You dont have any " + state + " appointment";
        }
    });

    document.getElementById("appointments_title").innerHTML = "Appointments " + state;
}

function setAppointmentsData(state, date, hour, patient, reason) {
    var database2 = firebase.database().ref('Users/' + patient).once('value').then(function (snapshot2) {
        var content = "<tr>" + "<td>" + date + "</td>" +
                "<td>" + hour + "</td>" +
                "<td>" + snapshot2.child("name").val() + "</td>" +
                "<td>" + reason + "</td>" +
                '<td><a class="btn btn-sm bg-success-light mr-2"> <i class="fe fe-pencil"></i> Edit</a>' +
                '<a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal">    <i class="fe fe-trash"></i> Cancel </a></td>' +
                "</tr>";
        if(sessionStorage.getItem("type") === "nurse"){
            $("#" + sessionStorage.getItem("type") + "_" + state + "_table").append(content);
        }else{
            $("." + sessionStorage.getItem("type") + "_" + state + "_table").append(content);
        }
        
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

function searchPatient() {
    var search = document.getElementById("search_patient").value;
    sessionStorage.setItem("flag2", "false");
    firebase.database().ref('Users/').once('value').then(function (snapshot) {
        snapshot.forEach(function (childX) {
            if (childX.child("type").val() === "patient" && (childX.child("dni").val().includes(search)) || childX.child("name").val().includes(search)) {
                sessionStorage.setItem("flag2", "true");
                var content = "<tr>" + "<td>" + childX.child("dni").val() + "</td>" +
                        "<td>" + childX.child("name").val() + "</td>" +
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

