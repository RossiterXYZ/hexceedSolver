let hexList = JSON.parse("[[-1,0,\"Empty\"],[1,1,\"Empty\"],[0,1,\"Start\"],[-1,1,\"Empty\"],[1,2,\"Empty\"],[4,2,\"Bomb\"],[4,3,\"Bomb\"],[5,3,\"Empty\"],[4,4,\"Empty\"],[5,4,\"Empty\"],[6,4,\"Bomb\"],[4,5,\"Empty\"],[5,5,\"Empty\"],[6,5,\"Empty\"],[7,5,\"Empty\"],[4,6,\"Start\"],[5,6,\"Empty\"],[6,6,\"Bomb\"],[7,6,\"Empty\"],[8,6,\"Empty\"],[9,7,\"Bomb\"],[8,7,\"Empty\"],[7,7,\"Empty\"],[6,7,\"Empty\"],[5,7,\"Empty\"]]")
let typeList = {Empty: "Bomb", Bomb: "Start", Start: "Empty"}

let inList = (x, y) => {
    for(hex in hexList){
        if(hexList[hex][0] == x && hexList[hex][1] == y) return hex
    }
    return false;
}

let addList = (x, y) => {
    let listed = inList(x,y)
    if(listed === false){
        hexList.push([x, y, "Empty"])
    } else {
        hexList[listed][2] = typeList[hexList[listed][2]]
    }
}

let removeList = (x, y) => {
    let listed = inList(x,y)
    if(listed !== false){
        hexList.splice(listed, 1)
    }
}


let click = (e) => {
    console.log(e)
    if(e.buttons == 1){
        addList(mouse.x, mouse.y)
    } else if(e.buttons == 2){
        removeList(mouse.x, mouse.y)
    }
    e.preventDefault()
}
document.onmousedown = click
document.oncontextmenu = (e) => {e.preventDefault()}