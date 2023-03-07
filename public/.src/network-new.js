//User Data
var logged = false
var tabCurrent = "home"
var localUserData = {}
var localWebLoaded = false
var localUserFire = null
firebase.auth().useDeviceLanguage();
firebase.auth().onAuthStateChanged(user=>{
    let url = String(document.URL).split("#", 2)
    if(user){
        console.log(user)
        localUserFire = user
        if(user.emailVerified == true){
            logged = true
            if( url[1] == "login-and-register" || url[1] == "verification-screen"){
                location.href = "#account-tab"
                location.reload()
            }
        }else if(user.emailVerified == false){
            logged = false
            if( url[1] == "account-tab" || url[1] == "create-project-tab" || url[1] == "login-and-register"){
               location.href = "#verification-screen"
               location.reload()
            }
        }
    }else{
        let url = String(document.URL).split("#", 2)
        if( url[1] == "account-tab" || url[1] == "verification-screen"){
            location.href = "#login-and-register"
            location.reload()
        }
        if( url[1] == "create-project-tab"){
            location.href = "#need-sign-screen"
            location.reload()
        }
    }
    tabLoad(url[1])
})
//Login and Register Response
function login(){
    let emailInput = document.getElementById("login-email-input")
    let passwordInput = document.getElementById("login-password-input")
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value).then(()=>{
        location.reload()
    }).catch(e =>{
        getError(e)
    })
}
function register(){
    let usernameInput = document.getElementById("register-username-input")
    let emailInput = document.getElementById("register-email-input")
    let passwordInput = passwordConfirm()
    firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput).then(async result2=>{
        console.log(result2)
        if(usernameInput.value != "" || usernameInput.value != " "){
            await result2.user.updateProfile({
                displayName: usernameInput.value
            });
        }else if(usernameInput.value == "" || usernameInput.value == " "){
            await result2.user.updateProfile({
                displayName: "unamed"
            });
        }
        
        await firebase.auth().currentUser.sendEmailVerification().then(result=>{
        });
     }).catch(e =>{
         getError(e)
     })
}
function goToRegister(){
    document.getElementById("login").style.display = "none"
    document.getElementById("register").style.display = "flex"
}
function goToLogin(){
    document.getElementById("login").style.display = "flex"
    document.getElementById("register").style.display = "none"
}
//Gets
function getError(error){
    if(error.code == "auth/email-already-in-use"){
        let error = document.createElement("label")
        error.className = "oreui-label-body"
        error.style.color = "red"
        error.innerHTML = "Email Already in Use"
        document.getElementById("errors-console").append(error)
    }else if(error.code=="auth/invalid-email"){
        let error = document.createElement("label")
        error.className = "oreui-label-body"
        error.style.color = "red"
        error.innerHTML = "Email Invalid"
        document.getElementById("errors-console").append(error)
    }else if(error.code=="auth/user-not-found"){
        let error = document.createElement("label")
        error.className = "oreui-label-body"
        error.style.color = "red"
        error.innerHTML = "User Not Found"
        document.getElementById("errors-console").append(error)
    }else if(error.code=="auth/weak-password"){
        document.getElementById("register-password-input").value = ""
        document.getElementById("register-confirm-password-input").value = ""
        let error = document.createElement("label")
        error.className = "oreui-label-body"
        error.style.color = "red"
        error.innerHTML = "Password too weak"
        document.getElementById("errors-console").append(error)
    }else if(error.code=="auth/wrong-password"){
        document.getElementById("login-password-input").value = ""
        let error = document.createElement("label")
        error.className = "oreui-label-body"
        error.style.color = "red"
        error.innerHTML = "Wrong password"
        document.getElementById("errors-console").append(error)
    }
}
function passwordConfirm(){
    let passwordInput = document.getElementById("register-password-input")
    let password2Input = document.getElementById("register-confirm-password-input")
    if(password2Input.value == passwordInput.value){
        return passwordInput.value
    }else{
        passwordInput.value = ""
        password2Input.value = ""
        let error = document.createElement("label")
        error.className = "oreui-label-body"
        error.style.color = "red"
        error.innerHTML = "Passwords are not the same"
        document.getElementById("errors-console").append(error)
        return null
    }
}
//extras
function clearConsole(){
    document.getElementById("errors-console").innerHTML = ""
}
function sendVerify(){
    firebase.auth().currentUser.sendEmailVerification()
}
function registerUserToServer(){
   
    let temp = {
        username: firebase.auth().currentUser.displayName,
        user: {
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
            userfireid: "s"
        }
    }
    firebase.firestore().collection("users").add(temp).then(result=>{
        temp.user.userfireid = result.id
        firebase.firestore().collection("users").doc(result.id).update(temp)
    })
}
function projectsLoad(puid){
    let returns = {}
    firebase.firestore().collection("web-projects").get().then(result=>{
        result.docs.forEach(doc=>{
           if(doc.data().user != undefined && doc.data().user.uid == puid){
            let project = doc.data().projectbase
            projectElement("projects-container", project.title, project.projectThumb, "profile", {title: project.title, price: "Free", release: project.release, category:project.category})
           }
        })
    })
}

function sendProjectToServer(projectbase={}){
    let temp = {
        projectbase: projectbase,
        projectId: "s",
        user: {
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email
        }
    }
    firebase.firestore().collection("web-projects").add(temp).then(result=>{
        temp.projectId = result.id
        firebase.firestore().collection("web-projects").doc(result.id).update(temp)
    })
}