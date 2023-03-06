function tabSystem(event){
    let btn = event.target
    let data = JSON.parse(btn.dataset.buttondata)
    if((tabCurrent != data.tabid && (tabCurrent != data.alttabid && data.alttabid != undefined)) || (tabCurrent != data.tabid && (data.alttabid == undefined)) ){
        location.href="#"+data.tabid
        location.reload()
    }
}
function tabLoad(id){
    if(id == "account-tab"){
        loadProfile()
    }
    if(id == "realms-tab"){
        loadRealms()
    }
    if(id == "login-and-register"){
        loadRegisterAndLogin()
    }
    if(id == "create-project-tab"){
        loadCreateProject()
    }
}
//label
function truncate(str, maxlength) {
    return (str.length > maxlength) ?
      str.slice(0, maxlength - 1) + '…' : str;
}
//thumbs
function setThumbnail(event){
    const inputTar = event.target
    const file = inputTar.files[0]
    console.log(file)
    if(file){
        const reader = new FileReader();
        reader.addEventListener("load", function(e){
            const readerTarget = e.target
            const img = document.createElement('img')
            img.src = readerTarget.result;
            img.id = "thumb-img"
            img.classList.add('screenshot_img')
            document.getElementById("image-area").innerHTML = ""
            document.getElementById("image-area").appendChild(img)
        })
        reader.readAsDataURL(file)
    }else{
        document.getElementById("image-area").innerHTML = ""
    }
}
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}