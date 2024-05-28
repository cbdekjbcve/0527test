// const canvas = document.getElementById('gameCanvas');
// const context = canvas.getContext('2d');

// canvas.width = 800;
// canvas.height = 600;

// // 示例：绘制一个移动的方块
// let x = 50;
// let y = 50;
// let dx = 2;
// let dy = 2;

// function update() {
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     context.fillStyle = 'red';
//     context.fillRect(x, y, 50, 50);

//     x += dx;
//     y += dy;

//     if (x + 50 > canvas.width || x < 0) {
//         dx *= -1;
//     }
//     if (y + 50 > canvas.height || y < 0) {
//         dy *= -1;
//     }

//     requestAnimationFrame(update);
// }

// update();


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 40; // 每个方块的大小
const gridSize = 10; // 网格大小为 10x10
const tiles = [];
const tileTypes = 4; // 4 种不同的方块类型

function init() {
    for (let x = 0; x < gridSize; x++) {
        tiles[x] = [];
        for (let y = 0; y < gridSize; y++) {
            tiles[x][y] = Math.floor(Math.random() * tileTypes);
        }
    }
}

function drawTiles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (tiles[x][y] !== null) {
                drawTile(x, y, tiles[x][y]);
            }
        }
    }
}

function drawTile(x, y, type) {
    const colors = ['red', 'green', 'blue', 'yellow'];
    ctx.fillStyle = colors[type];
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

let firstTile = null;

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const x = Math.floor(mouseX / tileSize);
    const y = Math.floor(mouseY / tileSize);

    if (firstTile) {
        if (isMatch(firstTile.x, firstTile.y, x, y)) {
            tiles[firstTile.x][firstTile.y] = null;
            tiles[x][y] = null;
            drawTiles();
        }
        firstTile = null;
    } else {
        firstTile = { x, y };
    }
});

function isMatch(x1, y1, x2, y2) {
    return tiles[x1][y1] === tiles[x2][y2];
}

init();
drawTiles();
