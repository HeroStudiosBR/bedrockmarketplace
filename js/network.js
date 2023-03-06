function goToLogin(){
    const login = document.getElementById("login_ui")
    const register = document.getElementById("register_ui")
    login.style.display = "flex";
    register.style.display = "none";
}
function goToRegister(){
    const login = document.getElementById("login_ui")
    const register = document.getElementById("register_ui")
    login.style.display = "none";
    register.style.display = "flex";
}
function login(){
    let emailInput = document.getElementById("email_input")
    let passwordInput = document.getElementById("password_input")
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value).then(()=>{
        lastEmailLogged = emailInput.value
        updateUserData()
        showLoadingToProfile()
    }).catch(e =>{
        alert(getError(e))
    })
}
function register(){
    let emailInput = document.getElementById("register_email_input")
    let passwordInput = passwordConfirm()
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput).then(()=>{
        showLoadingToProfile()
        updateUserData()
        addUser()
        lastEmailLogged = emailInput.value
    }).catch(e =>{
        alert(getError(e))
    })
}
function getError(error){
    if(error.code == "auth/email-already-in-use"){
        return "Email Ja esta sendo usado"
    }
    return error.code
}
function showLoading(){
    const load = document.getElementById("loading_profile")
    const connected = document.getElementById("connected_profile")
    const disconnected = document.getElementById("disconnected_profile")
    load.style.display = "flex";
    disconnected.style.display = "none";
    connected.style.display = "none";
    setTimeout(() => hideLoading(), 1000)
}
function showLoadingToProfile(){
    const load = document.getElementById("loading_profile")
    const connected = document.getElementById("connected_profile")
    const disconnected = document.getElementById("disconnected_profile")
    load.style.display = "flex";
    disconnected.style.display = "none";
    connected.style.display = "none";
    setTimeout(() => showProfile(), 1000)
}
function showProfile(){
    const load = document.getElementById("loading_profile")
    const connected = document.getElementById("connected_profile")
    const disconnected = document.getElementById("disconnected_profile")
    load.style.display = "none";
    connected.style.display = "block";
    setTimeout(() => hideLoading(), 1000)
}
function hideLoading(){
    const load = document.getElementById("loading_profile")
    const connected = document.getElementById("connected_profile")
    const disconnected = document.getElementById("disconnected_profile")
    load.style.display = "none";
}

//validates
function passwordConfirm(){
    let emailInput = document.getElementById("register_email_input")
    let passwordInput = document.getElementById("register_password_input")
    let password2Input = document.getElementById("register_password2_input")
    if(password2Input.value == passwordInput.value){
        return passwordInput.value
    }else{
        passwordInput.value = ""
        password2Input.value = ""
        return null
    }
}