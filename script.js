const area = document.querySelector('.container')
const box = document.querySelectorAll('.box')
const zero = '<img src="img/o.svg">'
const ex = '<img src="img/x.svg">'
let popUp = document.querySelector('.pop-up')
let popUpWinnerImg = document.querySelector('.pop-up__body_img')
let popUpWinnerTitle = document.querySelector('.winner')
let turn = true;
let move = 0



function drawField(){
    const area = document.querySelector('.area')
    if(size === null){
        size = 3
    }
    area.innerHTML = ''
    for(let i = 0; i < size; i++){
        area.innerHTML += '<div class="area__row">'
        for(let k = 0; k < size; k++){
            area.children[i].innerHTML += '<div data-click="enable"class="box"></div>'
        }
    }
    area.style.width = 100*size + 'px'
}

function touchListener() {
    area.addEventListener('click', e => {
        if(e.target.className == 'box' && turn == true && e.target.dataset.click == "enable"){
            e.target.innerHTML = ex
            e.target.dataset.click = 'disabled'
            turn = !turn
            move++
            if(move >= size + (size - 1)){
                checkResult()
            }
        }
        else if(e.target.className == 'box' && turn == false && e.target.dataset.click == "enable"){
            e.target.innerHTML = zero
            e.target.dataset.click = 'disabled'
            turn = !turn
            move++
            if(move >= size + (size - 1)){
                checkResult()
            }
        }
    })
}

function clearField() {
    for(let i = 0; i < buildField().length; i++){
        for(let k = 0; k < buildField()[i].length; k++){
            if(buildField()[i][k].firstChild == undefined) continue
            buildField()[i][k].dataset.click = 'enable'
            buildField()[i][k].removeChild(buildField()[i][k].firstChild)
        }
    }
}
function reload() {
    const reload = document.querySelector('.reload__btn')
    reload.addEventListener('click', () => {
        popUp.classList.remove('pop-up--show')
        clearField()
    })
    move = 0
    turn = true
}

function buildField() {
    let row = document.querySelectorAll('.area__row')
    let field = []
    for(let i = 0; i < size; i++){
        field.push([])
        for(let k = 0; k < size; k++){
            field[i].push(row[i].children[k])
            
        }
    }
    return field
}

function checkResult() {
    let result = 0
    let rows = checkRows()
    let columns = checkColumns()
    let diagonals = checkDiagonals()
    let draw = checkDraw()

    if(rows == 0 & columns == 0 & diagonals == 0 && draw == 0){
        result = 'draw'
        popUp.classList.add('pop-up--show')
        popUpWinnerTitle.innerHTML = result
        popUpWinnerImg.innerHTML = '<img src="img/draw.svg" alt="winner" class="winner-img"></img>'
        reload()
        return result
    }
    if(rows != 0) {
        result = rows
        popUp.classList.add('pop-up--show')
        popUpWinnerTitle.innerHTML = 'Winner'
        popUpWinnerImg.innerHTML = result
        reload()
        return result
    }
    else if(columns != 0) {
        result = columns
        popUp.classList.add('pop-up--show')
        popUpWinnerTitle.innerHTML = 'Winner'
        popUpWinnerImg.innerHTML = result
        reload()
        return result
    }
    else if(diagonals != 0) {
        result = diagonals
        popUp.classList.add('pop-up--show')
        popUpWinnerTitle.innerHTML = 'Winner'
        popUpWinnerImg.innerHTML = result
        reload()
        return result
    }
}

function checkDraw() {
    for(let i = 0; i < size; i++){
        for(let k = 0; k < buildField()[i].length; k++){
            if(buildField()[i][k].firstChild == undefined) return 
            else if(i == buildField().length - 1 && k == buildField()[i].length - 1) return 0
        }
    }
}

function checkRows() {
    let control = ''
    for(let i = 0; i < buildField().length; i++){
        if(buildField()[i][0].firstChild == null || buildField()[i][size - 1].firstChild == null) continue
        else{
            control = ''
            control = buildField()[i][0].firstChild.outerHTML
            for(let k = 0; k < size; k++){    
                if(buildField()[i][k].firstChild === null || buildField()[i][k].firstChild.outerHTML != control) {
                    control = ''
                    break
                }
                else if(k == size - 1) return control
            }
        }
    }
    return 0
}
function checkColumns() {
    let control = ''
    for(let i = 0; i < buildField().length; i++){
        if(buildField()[0][i].firstChild == null || buildField()[size - 1][i] == null) continue
        else{
            control = ''
            control = buildField()[0][i].firstChild.outerHTML
            for(let k = 0; k < buildField()[i].length; k++){    
                if(buildField()[k][i].firstChild == null || buildField()[k][i].firstChild.outerHTML != control){
                    control = ''
                    break
                }
                else if(k == size - 1) return control
            }
        }
    }
    return 0
}
function checkDiagonals() {
    let diagonalToTop = di??gonalToTop()
    let digonalToBottom = diagonalToBottom()

    if(diagonalToTop == 0 && digonalToBottom == 0) return 0
    else if (diagonalToTop != 0) return diagonalToTop
    else if (digonalToBottom != 0) return digonalToBottom
}
function di??gonalToTop() {
    let control = ''
    if( buildField()[0][0].firstChild == null || buildField()[size - 1][size - 1].firstChild == null) return 0

    control = buildField()[0][0].firstChild.outerHTML

    for(let i = size - 1; i > -1; i--){
        if(buildField()[i][i].firstChild == null || buildField()[i][i].firstChild.outerHTML != control) return  0
        else if(i == 0 ) return control
    }
}
function diagonalToBottom(){
    let control = ''
    let maxLength = size - 1
    if( buildField()[maxLength][0].firstChild == null || buildField()[0][maxLength].firstChild == null) return 0

    control = buildField()[maxLength][0].firstChild.outerHTML

    for(let i = 0; i < size; i++){
        if(buildField()[i][maxLength].firstChild === null || buildField()[i][maxLength].firstChild.outerHTML != control) return  0
        else if(i == size - 1 && maxLength == 0) return control
        maxLength--
    }
}
    function checkTheme() {
        let status = getLocalData('status')
        let toggle = document.querySelector('.theme')
        if (status === null) {
            status = true
            updateStorage('status', status)
        }
        console.log(status)
        switchTheme(status, toggle)
      toggle.addEventListener('click', () => {
          status = !status
          updateStorage('status', status)
          switchTheme(status, toggle)
      })
    }   
    function switchTheme(status, toggle){
        let size = document.querySelector('.size')
        let wrapper = document.querySelector('.wrapper')
        if(status){
            toggle.children[0].src = 'img/sun.svg'
            wrapper.classList.add('wrapper--dark')
            popUp.classList.add('pop-up--dark')
            size.classList.add('size--dark')
        }
        else if (status == false) {
            toggle.children[0].src = 'img/moon.svg'
            wrapper.classList.remove('wrapper--dark')
            popUp.classList.remove('pop-up--dark')
            size.classList.remove('size--dark')
        }
    }

function updateSizeOfField(){
    size = getLocalData('size')
}

function switchSize(){
    let buttons = document.querySelectorAll('.size__item')
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            size = +btn.dataset.size
            updateStorage('size', size)
            drawField()
            buildField()
        })
    })
}

function updateStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}
function getLocalData(key){
    return JSON.parse(localStorage.getItem(key))
}
updateSizeOfField()
checkTheme()
drawField()
touchListener()
buildField()
switchSize()