const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');


context.scale(20, 20);

let matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];


function rotateMatrix(matrixInput) {
    newMatrix = []
    rowTwo = [matrixInput[0][1], matrixInput[1][1], matrixInput[2][1]]
    rowOne = [matrixInput[0][2], matrixInput[1][2], matrixInput[2][2]]
    rowThree = [matrixInput[0][0], matrixInput[1][0], matrixInput[2][0]]
    console.log(rowOne);
    console.log(rowTwo);
    console.log(rowThree);
    newMatrix.push(rowOne, rowTwo, rowThree)
    console.log(newMatrix)
    matrix = newMatrix
    player.matrix = newMatrix
}

function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    drawMatrix(player.matrix, player.pos);
};

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'white'
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            };
        });
    });
};

let dropCounter = 0
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval){
        player.pos.y++;
        dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
}

const player = {
    pos: {x: 4, y: 1},
    matrix: matrix,
    moveleft: function() {
        this.pos.x -= 1
    },
    moveright: function() {
        this.pos.x += 1
    }
}

document.onkeydown = keypress
function keypress(e) {
    console.log(e.key)
    if(e.key==="ArrowLeft"){
        player.moveleft
        console.log(player.moveleft())
    }
    if(e.key==="ArrowRight"){
        player.moveright
        console.log(player.moveright())
    }
    if(e.key==="ArrowUp"){
        rotateMatrix(matrix);
    }
    if(e.key==="ArrowDown"){
        player.pos.y++;
    }
}

update();
