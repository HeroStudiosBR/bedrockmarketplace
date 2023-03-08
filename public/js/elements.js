//buttons
function button(theme, text, rootID, buttonId, click=function(){}, data){
    const buttonDiv = document.createElement("div")
    const buttonHeader = document.createElement("div")
    const buttonInput = document.createElement("input")
    buttonInput.type = "button"
    buttonInput.value = text
    buttonInput.setAttribute("data-buttondata", data)
    buttonInput.addEventListener("click", click)
    buttonDiv.id = buttonId
    buttonDiv.className=theme
    buttonHeader.className=theme+"-header"
    buttonDiv.appendChild(buttonHeader)
    buttonDiv.appendChild(buttonInput)
    const root = document.getElementById(rootID)
    return root.appendChild(buttonDiv);
}
function buttonIcon(theme, text, rootID, iconPath, buttonId, click=null, data){
    const buttonDiv = document.createElement("div")
    const buttonHeader = document.createElement("div")
    const buttonBase = document.createElement("div")
    const buttonIcon = document.createElement("img")
    const buttonInput = document.createElement("input")
    buttonInput.type = "button"
    buttonInput.value = text
    buttonIcon.src=iconPath
    buttonInput.addEventListener("click", click)
    buttonInput.setAttribute("data-buttondata", data)
    buttonBase.className=theme
    buttonDiv.className=theme+"-icon"
    buttonDiv.id = buttonId
    buttonHeader.className=theme+"-header"
    buttonBase.appendChild(buttonHeader)
    buttonBase.appendChild(buttonInput)
    buttonDiv.appendChild(buttonIcon)
    buttonDiv.appendChild(buttonBase)
    const root = document.getElementById(rootID)
    return root.appendChild(buttonDiv);
}
//checkbox radio
function checkboxRadio({themeCheckbox="oreui-checkbox", themeGeneral="oreui-checkbox-container", themeCheckmark="oreui-checkmark", textTheme="oreui-label-body"}, checked){
  const checkbox = document.createElement("label")
  const checkboxBtn = document.createElement("input")
  const checkmark = document.createElement("span")
  checkboxBtn.type = "checkbox"
  checkbox.className = themeGeneral
  checkboxBtn.className = themeCheckbox
  checkmark.className = themeCheckmark
  checkboxBtn.checked = checked
  checkboxBtn.addEventListener("click", function(){
    console.log("checado")
  })
  checkbox.appendChild(checkboxBtn)
  checkbox.appendChild(checkmark)

  return document.getElementById(rootID).appendChild(checkbox);
}
function checkboxRadioObject({themeCheckbox="oreui-checkbox", themeGeneral="oreui-checkbox-container", themeCheckmark="oreui-checkmark", textTheme="oreui-label-body"}, checked, displayText, selection, event=null){
    const checkbox = document.createElement("label")
    const textContent = document.createElement("label")
    const checkboxBtn = document.createElement("input")
    const checkmark = document.createElement("span")
    checkboxBtn.type = "checkbox"
    textContent.className = textTheme
    checkbox.className = themeGeneral
    checkboxBtn.className = themeCheckbox
    checkmark.className = themeCheckmark
    checkboxBtn.checked = checked
    textContent.innerHTML = displayText
    checkboxBtn.classList.add(selection)
    checkboxBtn.addEventListener("click", event)
    checkbox.appendChild(checkboxBtn)
    checkbox.appendChild(checkmark)
    checkbox.appendChild(textContent)
    return checkbox;
  }
//tabs
function tabPanel(theme, title, {xsize=0, ysize=0}, rootID, data){
    
}
//projects
function projectElement(rootID, text, imgpath, tab, data={}){
    const project = document.createElement("div")
    const projectDisplay = document.createElement("div")
    const projectThumb = document.createElement("img")
    const projectHeader = document.createElement("div")
    const projectTitle = document.createElement("div")
    //values
    projectThumb.src = imgpath
    let ntext = truncate(text, 22)
    projectTitle.innerHTML = ntext
    //class and append
    project.className = "project"
    project.setAttribute("data-projectdata", JSON.stringify(data))
    project.addEventListener("mouseenter", function(){
        const title = document.getElementById(tab+"-info-project-title")
        const price = document.getElementById(tab+"-info-project-price")
        const release = document.getElementById(tab+"-info-project-release")
        const category = document.getElementById(tab+"-info-project-category")
        title.innerHTML = data.title
        price.innerHTML = data.price
        release.innerHTML = new Date(data.release).toLocaleDateString()
        category.innerHTML = data.category
    })
    project.addEventListener("click", function(){
        location.href = "#project-screen?="+data.projectId
        location.reload()
    })
    project.addEventListener("mouseleave", function(){
        const title = document.getElementById(tab+"-info-project-title")
        const price = document.getElementById(tab+"-info-project-price")
        const release = document.getElementById(tab+"-info-project-release")
        const category = document.getElementById(tab+"-info-project-category")
        title.innerHTML = ""
        price.innerHTML = ""
        release.innerHTML = ""
        category.innerHTML = ""
    })
    projectDisplay.className = "project-display"
    projectThumb.className = "project-thumb"
    projectHeader.className = "project-header"
    projectTitle.className = "oreui-label-body"
    projectDisplay.appendChild(projectThumb)
    projectDisplay.appendChild(projectHeader)
    projectHeader.appendChild(projectTitle)
    project.appendChild(projectDisplay)
    //return
    return document.getElementById(rootID).appendChild(project);
}
function projectInfo(tab, rootID){
    const projectInfo = document.createElement("div")
    const projectTitle = document.createElement("label")
    const projectCategory = document.createElement("label")
    const projectPrice = document.createElement("label")
    const projectRelease = document.createElement("label")
    projectInfo.id = tab+"-info-project"
    projectTitle.id = tab+"-info-project-title"
    projectCategory.id = tab+"-info-project-category"
    projectPrice.id = tab+"-info-project-price"
    projectRelease.id = tab+"-info-project-release"
    projectInfo.className = "oreui-panel-project"
    projectTitle.className = "oreui-label-body"
    projectCategory.className = "oreui-label-body"
    projectPrice.className = "oreui-label-body"
    projectRelease.className = "oreui-label-body"
    projectTitle.style.color = "#cdcdcd"
    projectCategory.style.color = "#cdcdcd"
    projectRelease.style.color = "#cdcdcd"
    projectPrice.style.color = "gold"
    projectInfo.appendChild(projectTitle)
    projectInfo.appendChild(projectCategory)
    projectInfo.appendChild(projectPrice)
    projectInfo.appendChild(projectRelease)
    return document.getElementById(rootID).appendChild(projectInfo);
   //<mark style="background-color: rgb(89, 255, 109);">Free</mark>
}
//lists
function checkboxList(backgroundTheme="", selectionTheme="", items=[], rootID, checkevent = function(){}){
    const listBase = document.createElement("div")
    listBase.className = backgroundTheme
    listBase.style.display = "none"
    listBase.id = "category-selector"
    listBase.style.margin = "5 7"
    for(let i = 0; i < items.length; i++){
        const listBox = document.createElement("div")
        listBox.className = selectionTheme
        listBox.appendChild(
            checkboxRadioObject({},false, items[i], "category-box-selector", function(event){
                let target = event.currentTarget
                let checkboxes = document.getElementsByClassName("category-box-selector")
                for(let check = 0; check < checkboxes.length; check++){
                    checkboxes[check].checked = false
                }
                target.checked = true
                checkevent(items[i])
            })
        )
      listBase.appendChild(listBox)
    }
    return document.getElementById(rootID).appendChild(listBase)
}