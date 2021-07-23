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
            if(move > 2){
                if(buildField()[0][0].firstChild == buildField()[0][1].firstChild) {
                    console.log(true)
                }
                else {
                    console.log(buildField()[0][0].firstChild)
                    console.log(buildField()[0][1].firstChild)
                    console.log(e)
                    console.log(false)
                }
            }
        }
        else if(e.target.className == 'box' && turn == false){
            e.target.innerHTML = zero
            turn = !turn
            move++
            // if(move >= row + 2){
            //     checkRows()
            // }
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
// function checkRows() {
//     let result = 0
//     let control = ''
//     for(let i = 0; i < buildField().length; i++){
//         if(buildField()[i][0].firstChild == undefined) continue
//         else{
//             console.log('i: ' + i)
//             control = buildField()[i][0].firstChild
//             for(let k = 0; k < buildField()[i].length; k++){
//                 console.log('k: ' + k)
//                 let current = control

//                 if( buildField()[i][k].firstChild == current) {
//                     // console.log(1)
//                     continue
//                 }
//                 else {
//                     // console.log(2)
//                     current = buildField()[i][k].firstChild
//                 }

//                 if(k == buildField()[i].length - 1 && current != control) {
//                     // console.log(3)
//                     result = 0
//                     console.log(result)
//                 }
//                 else if(k == buildField()[i].length - 1 && current == control){
//                     // console.log(4)
//                     if(current == zero) {
//                         // console.log(5)
//                         console.log('zero')
//                     }
//                     else if(current == ex) {
//                         // console.log(6)
//                         console.log('ex')
//                     }
//                 }
//             }
//         }
//     }
    
// }
// function checkColumns() {
    
// }
// function checkDiagonals() {
    
// }

touchListener()
buildField()
// checkResult()