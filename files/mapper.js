let hexList = JSON.parse("[[-1,0,\"Empty\"],[1,1,\"Empty\"],[0,1,\"Start\"],[-1,1,\"Empty\"],[1,2,\"Empty\"],[4,2,\"Bomb\"],[4,3,\"Bomb\"],[5,3,\"Empty\"],[4,4,\"Empty\"],[5,4,\"Empty\"],[6,4,\"Bomb\"],[4,5,\"Empty\"],[5,5,\"Empty\"],[6,5,\"Empty\"],[7,5,\"Empty\"],[4,6,\"Start\"],[5,6,\"Empty\"],[6,6,\"Bomb\"],[7,6,\"Empty\"],[8,6,\"Empty\"],[9,7,\"Bomb\"],[8,7,\"Empty\"],[7,7,\"Empty\"],[6,7,\"Empty\"],[5,7,\"Empty\"]]")

let inList = (x, y) => {
    for(hex in hexList){
        if(hexList[hex][0] == x && hexList[hex][1] == y) return hex
    }
    return false;
}

let addList = (x, y) => {
    let index = inList(x,y)
    if(index !== false) 
        return

    hexList.push([x, y, "Empty"])
}

let removeList = (x, y) => {
    let index = inList(x,y)
    if(index === false)
        return

    hexList.splice(index, 1)
    wallLast = false
}

let wallLast = false
let adjacencyList = {
    '-1': {'-1': 1, '0': 32},
    '0': {'-1': 2, '1': 16},
    '1': {'0': 4, '1': 8}
    }
let wallAdd = (x, y) => {

    if(typeof wallLast === "boolean"){
        let index = inList(x, y)
        if(index === false)
            return

        wallLast = index
    } else {
        //Yeah no checks here, just don't try and assume thing more than 1 space away are adjacent
        hexList[wallLast][3] = adjacencyList[x - hexList[wallLast][0]][y - hexList[wallLast][1]] ^ hexList[wallLast][3]
        wallLast = false
    }
}

let Tools = {
    "1": {Name: "Add Hex", Func: addList},
    "2": {Name: "Remove Hex", Func: removeList},
    "3": {Name: "Modify Walls", Func: wallAdd},
}

let LeftClick = addList
let MiddleClick = removeList
let RightClick = wallAdd

let click = (e) => {
    if(e.buttons == 1){
        LeftClick(mouse.x, mouse.y)
    } else if(e.buttons == 2){
        RightClick(mouse.x, mouse.y)
    } else if(e.buttons == 4){
        MiddleClick(mouse.x, mouse.y)
    }
    e.preventDefault()
}
document.onmousedown = click
document.oncontextmenu = (e) => {e.preventDefault()}