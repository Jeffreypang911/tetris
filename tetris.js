const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');


context.scale(20, 20);

let matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x =0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

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

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        })
    })
}

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
function playerDrop() {
    player.pos.y++;
    if (collide(arena,player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
    dropCounter = 0;
}
let dropCounter = 0
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval && player.pos.y < 21){
        playerDrop()
    }
    
    draw();
    requestAnimationFrame(update);
}

const arena = createMatrix(12, 20)
console.log(arena); console.table(arena)
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
    if(e.key==="ArrowLeft" && player.pos.y < 22){
        player.moveleft
        console.log(player.moveleft())
    }
    if(e.key==="ArrowRight" && player.pos.y < 22){
        player.moveright
        console.log(player.moveright())
    }
    if(e.key==="ArrowUp" && player.pos.y < 22){
        rotateMatrix(matrix);
    }
    if(e.key==="ArrowDown" && player.pos.y < 22){
        playerDrop();
    }
    if(e.key===" " && player.pos.y < 22){
        player.pos.y = 22;
    }
}

update();
