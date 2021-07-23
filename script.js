const area = document.querySelector('.container')
const box = document.querySelectorAll('.box')
const horizontal = document.querySelectorAll('.area__row')
const zero = '<img src="img/o.svg">'
const ex = '<img src="img/x.svg">'
let turn = true;
let columns = horizontal[0].children.length
let row = horizontal[0].children.length
let move = 0

function touchListener() {
    area.addEventListener('click', e => {
        if(e.target.className == 'box' && turn == true){
            e.target.innerHTML = ex
            turn = !turn
            move++
            if(move >= row + 2){
                checkRows()
            }
        }
        else if(e.target.className == 'box' && turn == false){
            e.target.innerHTML = zero
            turn = !turn
            move++
            if(move >= row + 2){
                checkRows()
            }
        }
    })
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
// function checkResult() {
//     if(move >= horizontal[0].children.length){
//         checkRows()
//         checkColumns()
//         checkDiagonals()
//     }
// }
function checkRows() {
    let result = 0
    let control = ''
    let current = ''
    for(let i = 0; i < buildField().length; i++){
        if(buildField()[i][0].firstChild == undefined) continue
        else{
            control = ''
            current = ''
            control = buildField()[i][0].firstChild.src
            current = control
            for(let k = 0; k < buildField()[i].length; k++){    
                if(buildField()[i][k].firstChild === null){
                    break
                }
                if(buildField()[i][k].firstChild.src != current) {
                    current = buildField()[i][k].firstChild.src
                }
                if(k == buildField()[i].length - 1 && current != control) {
                    result = 0
                    console.log(result)
                    return result
                }   
                else if(k == buildField()[i].length - 1 && current == control){
                    if(current == 'http://127.0.0.1:5500/img/o.svg') {
                        result = 'zero'
                        console.log(result)
                        return result
                        
                    }
                    else if(current == 'http://127.0.0.1:5500/img/x.svg') {
                        result = 'ex'
                        console.log(result)
                        return result
                    }
                }
            }
        }
    }
    
}
function checkColumns() {
    
}
// function checkDiagonals() {
    
// }

touchListener()
buildField()
// checkResult()