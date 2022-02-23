class Cell{
    
    constructor(x, y, type, rotateBitmask, wallBitmask){
        //Location
        this.x = x
        this.y = y

        //Type
        this.type = type

        //Walls
        this.walls = []
        for(let count = 0; count < 6; count++){
            this.walls.push((wallBitmask & (1 << count)) > 0)
        }

        //Rotation
        let tmprotate = rotateBitmask | 1 // must have at least 1 rotation.
        this.currentRotation = 0 // index of the current rotation
        this.rotate = []
        for(let count = 0; count < 6; count++){
            this.rotate.push((tmprotate & (1 << count)) > 0)
        }
    }


}