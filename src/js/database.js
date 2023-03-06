
//variables user
var localUserBase = {}
var localProjectsUser = []
var displayedItems = []
var displayItemsLoadeds = 0
var userUID = ""
//convertrs
 //function gived from stackoverflow
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
//functions
function updateCreatorNameProject(uid, fireuid){
    let username = ""
    firebase.firestore().collection("users").get().then(result =>{
        result.docs.forEach(doc=>{
           if(doc.data().user.uid.includes(userUID)){
               username = doc.data().username   
               firebase.firestore().collection("web-projects").doc(fireuid).update({creator: username})
           }
        })
    })
}
function userLogedData(){
    firebase.firestore().collection("users").get().then(result =>{
         result.docs.forEach(doc=>{
            if(doc.data().user.uid.includes(userUID)){
                localUserBase = doc.data()
                document.getElementById("localusername_span").innerHTML = doc.data().username
            }
         })
      })
}
function updateProjects(){
    localProjectsUser = []
    firebase.firestore().collection("web-projects").get().then(result =>{
        result.docs.forEach(doc=>{
            if(doc.data().user.uid.includes(userUID)){
                localProjectsUser.push(doc.data())
                if(localTab == "profile_projects"){
                    addProjects(doc.data(), "projects")
                }
                if(localTab == "profile_realms"){
                    if(doc.data().projectbase.projectCategory.includes("realms")){
                        console.log(doc.data())
                        addProjects(doc.data(), "realms")
                    }
                }
                if(localTab == "profile_textures"){
                    if(doc.data().projectbase.projectCategory.includes("textures")){
                        addProjects(doc.data(), "textures")
                    }
                }
                if(localTab == "profile_addons"){
                    if(doc.data().projectbase.projectCategory.includes("addons")){
                        addProjects(doc.data(), "addons")
                    }
                }
                if(localTab == "profile_maps"){
                    if(doc.data().projectbase.projectCategory.includes("maps")){
                        addProjects(doc.data(), "maps")
                    }
                }
            }
        })
    })
   
}
function addProjects(doc, root){
    if(document.getElementById(doc.projectid+"_"+root) == null){
        const file = dataURLtoBlob(doc.projectbase.previewThumb)
        if(file){
            const reader = new FileReader();
            reader.addEventListener("load", function(e){
                const projectRoot = document.createElement("div")
                const readerTarget = e.target
                const img = document.createElement('img')
                const projectTemp = {
                    title: doc.projectbase.title, 
                    type: doc.projectbase.projectCategory, 
                    price: doc.projectbase.price,
                    creator: doc.creator,
                    release: new Date(doc.release).toLocaleDateString()
                } 
                projectRoot.className = "contentproject"
                projectRoot.setAttribute("data-projectdata", JSON.stringify(projectTemp))
                projectRoot.onmouseenter = projectInfoDisplay
                projectRoot.onmouseleave = projectInfoHide
                projectRoot.id = doc.projectid+"_"+root
                img.src = readerTarget.result;
                img.id = doc.projectid+"_thumb_"+root
                projectRoot.appendChild(img)
                document.getElementById(root+"_list").appendChild(projectRoot)
            })
            reader.readAsDataURL(file)
        }
    }else{
        const file = dataURLtoBlob(doc.projectbase.previewThumb)
        if(file){
            const reader = new FileReader();
            reader.addEventListener("load", function(e){
                const readerTarget = e.target
                const projectTemp = {
                    title: doc.projectbase.title, 
                    type: doc.projectbase.projectCategory, 
                    price: doc.projectbase.price,
                    creator: doc.creator,
                    release: new Date(doc.release).toLocaleDateString()
                } 
                document.getElementById(doc.projectid+"_"+root).setAttribute("data-projectdata", JSON.stringify(projectTemp))
                document.getElementById(doc.projectid+"_thumb_"+root).src = readerTarget.result
            })
            reader.readAsDataURL(file)
        }
    }
}
function updateUserData(){
    //lists
    userLogedData()
    updateProjects()
    updateUserProjects()
}
function addUser(){
    let userDataResult = {
        username: "user Unamed",
        developer: false,
        user: {
            uid: firebase.auth().currentUser.uid,
            emailOwner:  firebase.auth().currentUser.email,
            userfireid: "s"
        }
    }
    firebase.firestore().collection("users").add(userDataResult).then(result=>{
        userDataResult.user.userfireid = result.id
        firebase.firestore().collection("users").doc(result.id).update(userDataResult)
    })
    updateUserData()
}
function sendProjectToServer(projectbase){
    let date = Date.now()
    let projectDataResult = {
        user: {
            uid: firebase.auth().currentUser.uid,
            emailOwner:  firebase.auth().currentUser.email
        },
        projectbase: projectbase,
        projectid: null,
        creator: "s",
        release: date
    }
    firebase.firestore().collection("web-projects").add(projectDataResult).then(result=>{
        firebase.firestore().collection("web-projects").doc(result.id).update({projectid: result.id})
        updateCreatorNameProject(firebase.auth().currentUser.uid, result.id)
    })
    updateUserData()
}
function updateUserProjects(){
    firebase.firestore().collection("users").get().then(result =>{
        result.docs.forEach(doc=>{
            let uid = doc.data().user.uid
            firebase.firestore().collection("web-projects").get().then(resultF =>{
                resultF.docs.forEach(doc2=>{
                    if(doc2.data().user.uid == uid){
                        console.log(doc2.id)
                        let username = doc.data().username   
                        firebase.firestore().collection("web-projects").doc(doc2.id).update({creator: username})
                    }
                })
            })
        })
    })
}