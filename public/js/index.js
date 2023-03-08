//local user
var logged = false
var tabCurrent = "home"
//general
let screenList = [
    "account-tab",
    "realms-tab",
    "login-and-register",
    "verification-screen",
    "home",
    "textures-tab",
    "addons-tab",
    "maps-tabs",
    "create-project-tab",
    "need-sign-screen",
    "project-screen",
    "edit-project-screen",
    "loading-screen"
]
window.addEventListener("hashchange", function(event){
    let screen = String(document.URL).split("#", 2)
    let entered = String(screen[1]).split("?=", 2)
    if(!screenList.includes(entered[0])){
        location.reload()
    }
})
window.addEventListener("load", function(event){
    let screen = String(document.URL).split("#", 2)
    let entered = String(screen[1]).split("?=", 2)
    tabCurrent = entered[0]
    console.log(tabCurrent)
    if(screenList.includes(tabCurrent)){
        document.getElementById("loading-screen").style.display = "block"
        let tab = document.getElementById(entered[0])
        tab.style.display = "none"
        document.getElementById(tab.dataset.btnresponse).className += ' active';
        
    }else if(!screenList.includes(tabCurrent) && entered[0] != undefined){
        location.href = "#error-screen"
        let tab = document.getElementById("error-screen")
        tab.style.display = "block"
    }
})
function LoadHome(){
    //general
    buttonIcon("oreui-button", "Home", "generalNav", "assets/general.png", "home-btn", tabSystem, JSON.stringify({id: "Home", tabid:"home"}))
    buttonIcon("oreui-button", "Account", "generalNav", "assets/profile_steve.png", "account-btn", tabSystem, JSON.stringify({id: "Account", tabid:"account-tab", alttabid:"login-and-register"}))
    buttonIcon("oreui-button", "Create Project", "creatorNav", "assets/creator.png", "create-project-btn", tabSystem, JSON.stringify({id: "Create-Project", tabid:"create-project-tab", alttabid:"need-sign-screen"}))
    //creations
    buttonIcon("oreui-button", "Addons", "creationsNav", "assets/addons.png", "addons-btn", tabSystem, JSON.stringify({id: "Addons", tabid:"addons-tab"}))
    buttonIcon("oreui-button", "Textures", "creationsNav", "assets/textures.png", "textures-btn", tabSystem, JSON.stringify({id: "Textures", tabid:"textures-tab"}))
    buttonIcon("oreui-button", "Maps", "creationsNav", "assets/maps.png", "maps-btn", tabSystem, JSON.stringify({id: "Maps", tabid:"maps-tab"}))
    buttonIcon("oreui-button", "Realms", "creationsNav", "assets/realms.png", "realms-btn", tabSystem, JSON.stringify({id: "Realms", tabid:"realms-tab"}))
    //screens
    button("oreui-button", "Go Login", "need-sign-panel", "sign-in-btn", tabSystem, JSON.stringify({id: "Sign-in", tabid:"login-and-register"}))
    button("oreui-button", "Send Again", "verification-panel", "send-verify-btn", sendVerify)
}
LoadHome()
function loadProfile(){
    document.getElementById("profile-username").innerHTML = localUserFire.displayName
    projectInfo("profile", "profile-body")  
    projectsLoad(localUserFire.uid)
}
function loadCreateProject(){
    button("oreui-button", "Send Project", "more-btns", "send-project-btn", function(event){
        const projectTitle = document.getElementById("create-project-title")
        const projectTags = document.getElementById("create-project-tags")
        const projectDescription = document.getElementById("create-project-description")
        const projectImage = document.getElementById("thumb-img")
        const projectIconImage = document.getElementById("icon-img")
        let currentTags = projectTags.value.split(",", 5)
        console.log("clicado")
        sendProjectToServer({
            title: projectTitle.value,
            description: projectDescription.value,
            projectThumb: projectImage.src,
            projectIcon: projectIconImage.src,
            category: document.getElementById("category-selection-btn").childNodes[1].value,
            tags: currentTags,
            release: Date.now(),
            type: "post-in-review"
        })
    })
    button("oreui-button", "Save Draft", "more-btns", "save-draft-btn", login)
    checkboxList("oreui-panel-black-selection", "oreui-selection", ["Addons", "Textures", "Maps", "Realms"], "category-btns", function(additionalParam=null){
        let selfbtn = document.getElementById("category-selection-btn").childNodes
        selfbtn[1].value = additionalParam
    })
    
    button("oreui-button", "Select Category", "category-btns", "category-selection-btn", function(event){
        let selfbtn = document.getElementById("category-selection-btn")
        if(!selfbtn.className.includes(" active")){
            document.getElementById("category-selector").style.display = "flex"
            selfbtn.className += " active"
        }else if(selfbtn.className.includes(" active")){
            document.getElementById("category-selector").style.display = "none"
            selfbtn.className = selfbtn.className.replace(" active", "")
        }
    })
}
function loadRealms(){
    checkboxRadio({themeCheckbox: "oreui-checkbox", themeGeneral: "oreui-checkbox-container", themeCheckmark:"oreui-checkmark"}, true, "realms-tab")
}
function loadRegisterAndLogin(){
    button("oreui-button", "Login", "login", "login-btn", login)
    button("oreui-button", "Register", "login", "to-register-btn", goToRegister)

    button("oreui-button", "Register", "register", "register-btn", register)
    button("oreui-button", "Login", "register", "to-login-btn", goToLogin)
    button("oreui-button", "Clear Console", "errors-list", "clear-console-btn", clearConsole)
}
//others