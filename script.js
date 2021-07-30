const area = document.querySelector('.container')
const box = document.querySelectorAll('.box')
const horizontal = document.querySelectorAll('.area__row')
const zero = '<img src="img/o.svg">'
const ex = '<img src="img/x.svg">'
let popUp = document.querySelector('.pop-up')
let popUpWinnerImg = document.querySelector('.pop-up__body_img')
let popUpWinnerTitle = document.querySelector('.winner')
let turn = true;
let columns = horizontal[0].children.length
let row = horizontal[0].children.length
let move = 0

function touchListener() {
    area.addEventListener('click', e => {
        if(e.target.className == 'box' && turn == true && e.target.dataset.click == "enable"){
            e.target.innerHTML = ex
            e.target.dataset.click = 'disabled'
            turn = !turn
            move++
            if(move >= row + (row - 1)){
                checkResult()
            }
        }
        else if(e.target.className == 'box' && turn == false && e.target.dataset.click == "enable"){
            e.target.innerHTML = zero
            e.target.dataset.click = 'disabled'
            turn = !turn
            move++
            if(move >= row + (row - 1)){
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
    let field = []
    for(let i = 0; i < horizontal.length; i++){
        field.push([])
        for(let k = 0; k < row; k++){
            field[i].push(horizontal[i].children[k])
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
        popUpWinnerTitle.innerHTML == 'Winner'
        popUpWinnerImg.innerHTML = result
        reload()
        return result
    }
    else if(columns != 0) {
        result = columns
        popUp.classList.add('pop-up--show')
        popUpWinnerTitle.innerHTML == 'Winner'
        popUpWinnerImg.innerHTML = result
        reload()
        return result
    }
    else if(diagonals != 0) {
        result = diagonals
        popUp.classList.add('pop-up--show')
        popUpWinnerTitle.innerHTML == 'Winner'
        popUpWinnerImg.innerHTML = result
        reload()
        return result
    }
}

function checkDraw() {
    for(let i = 0; i < buildField().length; i++){
        for(let k = 0; k < buildField()[i].length; k++){
            if(buildField()[i][k].firstChild == undefined){
                return 
            }
            else if(i == buildField().length - 1 && k == buildField()[i].length - 1){
                return 0
            }
        }
    }
}

function checkRows() {
    let result = 0
    let control = ''
    for(let i = 0; i < buildField().length; i++){
        if(buildField()[i][0].firstChild == null || buildField()[i][buildField()[i].length - 1].firstChild == null) continue
        else{
            control = ''
            control = buildField()[i][0].firstChild.outerHTML
            for(let k = 0; k < buildField()[i].length; k++){    
                console.log(buildField()[i][k].firstChild.outerHTML)
                if(buildField()[i][k].firstChild === null || buildField()[i][k].firstChild.outerHTML != control) {
                    control = ''
                    break
                }
                else if(k == buildField()[i].length - 1){
                    result = control
                    return result
                }
            }
        }
    }
    return result
}
function checkColumns() {
    let result = 0
    let control = ''
    for(let i = 0; i < buildField().length; i++){
        if(buildField()[0][i].firstChild == null || buildField()[buildField().length-1][i] == null) continue
        else{
            control = ''
            control = buildField()[0][i].firstChild.outerHTML
            for(let k = 0; k < buildField()[i].length; k++){    
                console.log(buildField()[k][i].firstChild.outerHTML)
                if(buildField()[k][i].firstChild == null || buildField()[k][i].firstChild.outerHTML != control){
                    control = ''
                    break
                }
                else if(k == buildField().length - 1){
                    result = control
                    return result
                }
            }
        }
    }
    return result
}
function checkDiagonals() {
    let result = 0
    let maxLength = row -1
    let control = ''
    let diagonalToTop = diаgonalToTop(result,  control, maxLength)
    let digonalToBottom = diagonalToBottom(result,  control, maxLength)
    if(diagonalToTop == 0 && digonalToBottom == 0) return result
    else if (diagonalToTop != 0) {
        result = diagonalToTop
        return result
    }
    else if (digonalToBottom != 0) {
        result = digonalToBottom
        return result
    }
}
function diаgonalToTop(result,  control, maxLength) {
    result = 0
    control = ''
    maxLength = row - 1
    if( buildField()[0][0].firstChild == null || buildField()[maxLength][maxLength].firstChild == null){
        result = 0
        return result
    }
    control = buildField()[0][0].firstChild.outerHTML
    for(let i = row - 1; i > -1; i--){
        console.log(buildField()[maxLength][maxLength].firstChild.outerHTML)
        if(buildField()[maxLength][maxLength].firstChild === null || buildField()[maxLength][maxLength].firstChild.outerHTML != control){
            result = 0
            return  result
        }
        else if(i == 0 && maxLength == 0){
            result = control
            return result
        }
        maxLength--
    }
}
function diagonalToBottom(result,  control, maxLength){
    result = 0
    control = ''
    maxLength = row -1
    if( buildField()[maxLength][0].firstChild == null || buildField()[0][maxLength].firstChild == null){
        result = 0
        return result
    }
    control = buildField()[maxLength][0].firstChild.outerHTML
    for(let i = 0; i < row; i++){
        console.log(buildField()[i][maxLength].firstChild.outerHTML)
        if(buildField()[i][maxLength].firstChild === null || buildField()[i][maxLength].firstChild.outerHTML != control){
            result = 0
            return  result
        }
        else if(i == row - 1 && maxLength == 0){
            result = control
            return result
        }
        maxLength--
    }
}

function switchTheme() {
    let wrapper = document.querySelector('.wrapper')
    let status = true
    let toggle = document.querySelector('.theme')
    let size = document.querySelector('.size')
    toggle.addEventListener('click', () => {
    if(status){
        status = !status
        toggle.children[0].src = 'img/sun.svg'
        wrapper.classList.add('wrapper--dark')
        popUp.classList.add('pop-up--dark')
        // size.classList.add('size--dark')
    }
    else if (status === false){
        status = !status
        toggle.children[0].src = 'img/moon.svg'
        wrapper.classList.remove('wrapper--dark')
        popUp.classList.remove('pop-up--dark')
        // size.classList.remove('size--dark')
    }
    })
}

touchListener()
buildField()
switchTheme()
