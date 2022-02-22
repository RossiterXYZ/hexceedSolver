let c
let board
let camera = {scale: 10, offsetX: 20, offsetY: 20} //Global scale and offset data





let drawHex = (x, y, state) => {
    //Get position data
    let xOffset = ((x*11) * camera.scale) + (camera.offsetX * camera.scale)
    let yOffset = ((x*-6 + y*12) * camera.scale) + (camera.offsetY * camera.scale)

    //Apply correct styling
    board.lineWidth = camera.scale
    if(state == "Bomb"){
        board.fillStyle = '#f00'
        board.strokeStyle = '#c11'
    } else if(state == "Used"){
        board.fillStyle = '#ddd'
        board.strokeStyle = '#eee'
    } else if(state == "Empty"){
        board.fillStyle = '#666'
        board.strokeStyle = '#888'
    }

    //Draw the shape (centered for easier locating math)
    board.beginPath()
    board.moveTo((6  * camera.scale) + xOffset, (0  * camera.scale) + yOffset)
    board.lineTo((3  * camera.scale) + xOffset, (5  * camera.scale) + yOffset)
    board.lineTo((-3 * camera.scale) + xOffset, (5  * camera.scale) + yOffset)
    board.lineTo((-6 * camera.scale) + xOffset, (0  * camera.scale) + yOffset)
    board.lineTo((-3 * camera.scale) + xOffset, (-5 * camera.scale) + yOffset)
    board.lineTo((3  * camera.scale) + xOffset, (-5 * camera.scale) + yOffset)
    board.lineTo((6  * camera.scale) + xOffset, (0  * camera.scale) + yOffset)
    board.closePath()
    board.stroke()
    board.fill()
    
    board.lineWidth = 2
    board.beginPath()
    board.arc(xOffset, yOffset, 6 * camera.scale, 0, 2 * Math.PI);
    board.stroke(); 
}


let resize = () => {
    c.width = window.innerWidth
    c.height = window.innerHeight
}
let draw = () => {
    //Draw hexes
    let hexlist = [[0,0,"Bomb"], [0,1,"Used"], [1,0,"Empty"], [1,1,"Empty"], [2,0,"Empty"], [2,1,"Empty"]] // replace later

    for(hex of hexlist){
        drawHex(hex[0], hex[1], hex[2])
    }
    //Draw ui (later so it's on top)
}
let init = () => {
    c = document.getElementById("hexceed")
    board = c.getContext("2d")

    resize()
    draw()
}
window.onresize = resize
window.onload = init