const area = document.querySelector('.container')
const box = document.querySelectorAll('.box')
const horizontal = document.querySelectorAll('.area__row')
const zero = '<img src="img/o.svg">'
const ex = '<img src="img/x.svg">'
let turn = true;
let columns = horizontal[0].children.length - 1
let row = horizontal[0].children.length - 1
let move = 0

function touchListener() {
    area.addEventListener('click', e => {
        if(e.target.className == 'box' && turn == true){
            e.target.innerHTML = ex
            turn = !turn
            move++
            if(move >= row + 2){
                
                checkRows()
                checkColumns()
                // checkDiagonals()
                // checkResult()
            }
        }
        else if(e.target.className == 'box' && turn == false){
            e.target.innerHTML = zero
            turn = !turn
            move++
            if(move >= row + 2){
                checkRows()
                checkColumns()
                // checkDiagonals()
                // checkResult()
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
//     let result = 0
//     let rows = checkRows()
//     let columns = checkColumns()
//     let diagonals = checkDiagonals()
//     if(rows == 0 && columns == 0 && diagonals == 0){
//         console.log('draw')
//         return result
//     }
//     else if(rows != 0) {
//         result = rows
//         console.log('result')
//         return result
//     }
//     else if(columns != 0) {
//         result = columns
//         console.log('result')
//         return result
//     }
//     else if(diagonals != 0) {
//         result = diagonals
//         console.log('result')
//         return result
//     }
// }
function checkRows() {
    let result = 0
    let control = ''
    for(let i = 0; i < buildField().length; i++){
        if(buildField()[i][0].firstChild == undefined) continue
        else{
            control = ''
            control = buildField()[i][0].firstChild.src
            for(let k = 0; k < buildField()[i].length; k++){    
                if(buildField()[i][k].firstChild == undefined){
                    control = ''
                    break
                }
                if(buildField()[i][k].firstChild.src != control) {
                    control = ''
                    break
                }
                else if(k == buildField()[i].length - 1){
                    if(control == 'http://127.0.0.1:5500/img/o.svg') {
                        result = 'zero'
                        console.log(result)
                        return result
                        
                    }
                    else if(control == 'http://127.0.0.1:5500/img/x.svg') {
                        result = 'ex'
                        console.log(result)
                        return result
                    }
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
        if(buildField()[0][i].firstChild == undefined) continue
        else{
            control = ''
            control = buildField()[0][i].firstChild.src
            for(let k = 0; k < buildField()[i].length; k++){    
                if(buildField()[k][i].firstChild == undefined || buildField()[k][i].firstChild == null){
                    control = ''
                    break
                }
                if(buildField()[k][i].firstChild.src != control) {
                    control = ''
                    break
                } 
                else if(k == buildField()[i].length - 1){
                    if(control == 'http://127.0.0.1:5500/img/o.svg') {
                        result = 'zero'
                        console.log(result)
                        return result
                        
                    }
                    else if(control == 'http://127.0.0.1:5500/img/x.svg') {
                        result = 'ex'
                        console.log(result)
                        return result
                    }
                }
            }
        }
    }
    return result
}
// function checkDiagonals() {
//     let result = 0
//     let maxLength = row
//     let control = ''
//     let diagonalToTop = digonalToTop(result,  control, maxLength)
//     let digonalToBottom = digonalToBottom(result,  control, maxLength)
//     if(diagonalToTop == 0 && digonalToBottom == 0) return result
//     else if (diagonalToTop != 0) {
//         result = diagonalToTop
//         return result
//     }
//     else if (digonalToBottom != 0) {
//         result = digonalToBottom
//         return result
//     }

    

// }
// function digonalToTop(result,  control, maxLength) {
//     result = 0
//     control = ''
//     maxLength = row
//     if( buildField()[0][0].firstChild == undefined || buildField()[maxLength][maxLength].firstChild == undefined){
//         result = 0
//         return result
//     }
//     control = buildField()[0][0].firstChild.src
//     for(let i = row; i > 0; i--){
//         if(buildField()[i][maxLength].firstChild === null){
//             result = 0
//             return  result
//         }
//         if(buildField()[i][maxLength].firstChild.src != control){
//             result = 0
//             return result
//         }
//         else if(i == 0 && maxLength == 0){
//             if(control == 'http://127.0.0.1:5500/img/o.svg') {
//                 result = 'zero'
//                 console.log(result)
//                 return result
//             }
//             else if(control == 'http://127.0.0.1:5500/img/x.svg') {
//                 result = 'ex'
//                 console.log(result)
//                 return result
//             }
//         }
//         maxLength--
//     }
// }
// function digonalToBottom(result,  control, maxLength){
//     result = 0
//     control = ''
//     maxLength = row
//     if( buildField()[maxLength][0].firstChild == undefined || buildField()[0][maxLength].firstChild == undefined){
//         result = 0
//         return result
//     }
//     control = buildField()[maxLength][0].firstChild.src
//     for(let i = 0; i < row; i++){
//         if(buildField()[i][maxLength].firstChild === null){
//             result = 0
//             return  result
//         }
//         if(buildField()[i][maxLength].firstChild.src != control){
//             result = 0
//             return result
//         }
//         else if(i == row && maxLength == 0){
//             if(control == 'http://127.0.0.1:5500/img/o.svg') {
//                 result = 'zero'
//                 console.log(result)
//                 return result
//             }
//             else if(control == 'http://127.0.0.1:5500/img/x.svg') {
//                 result = 'ex'
//                 console.log(result)
//                 return result
//             }
//         }
//         maxLength--
//     }
// }

touchListener()
buildField()