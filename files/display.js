let c
let board
let camera = {scale: 10, offsetX: 20, offsetY: 20} //Global scale and offset data
let mouse = {x: 0, y: 0}


let drawHex = (x, y, state) => {
    //Get position data
    let xOffset = ((x*11) * camera.scale) + (camera.offsetX * camera.scale)
    let yOffset = ((x*-6 + y*12) * camera.scale) + (camera.offsetY * camera.scale)

    //Apply correct styling
    board.lineWidth = camera.scale
    if(state == "Bomb"){
        board.fillStyle = '#f00'
        board.strokeStyle = '#c11'
    } else if(state == "Empty"){
        board.fillStyle = '#666'
        board.strokeStyle = '#888'
    } else if(state == "Cursor"){
        board.fillStyle = '#666'
        board.strokeStyle = '#2a4'
    } else if(state == "Start"){
        board.fillStyle = '#2a4'
        board.strokeStyle = '#fff'
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
}


let move = (e) => { //Move and Scale viewport
    if(e.keyCode == 87){ //W
        camera.offsetY += 1
    } else if(e.keyCode == 83){ //S
        camera.offsetY -= 1
    } else if(e.keyCode == 65){ //A
        camera.offsetX += 1
    } else if(e.keyCode == 68){ //D
        camera.offsetX -= 1
    } else if(e.keyCode == 81){ //Q
        camera.scale -= 0.1
    } else if(e.keyCode == 69){ //E
        camera.scale += 0.1
    }
    console.log(e)
}

let mousemove = (e) => { // Capture mouse location
    mouse.x = Math.round(((e.clientX) - (camera.offsetX * camera.scale)) / camera.scale / 11)
    if(mouse.x==-0) mouse.x = 0
    mouse.y = Math.round((((e.clientY - (camera.offsetY * camera.scale)) / camera.scale)  - mouse.x * -6) / 12)
    if(mouse.y==-0) mouse.y = 0
}

let resize = () => { // Handle resize events
    c.width = window.innerWidth
    c.height = window.innerHeight
}

let draw = () => { // Draw provided data
    board.clearRect(0,0,10000,10000)
    //Draw hexes
    for(hex of hexList){
        drawHex(hex[0], hex[1], hex[2])
    }
    drawHex(mouse.x, mouse.y, "Cursor")
    //Draw ui (later so it's on top)
}
let init = () => { // Guess what this one does
    c = document.getElementById("hexceed")
    board = c.getContext("2d")

    resize()
    draw()
    setInterval(draw, 33)
}
window.onkeydown = move
window.onmousemove = mousemove
window.onresize = resize
window.onload = init