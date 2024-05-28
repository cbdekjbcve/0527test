const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// 示例：绘制一个移动的方块
let x = 50;
let y = 50;
let dx = 2;
let dy = 2;

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'red';
    context.fillRect(x, y, 50, 50);

    x += dx;
    y += dy;

    if (x + 50 > canvas.width || x < 0) {
        dx *= -1;
    }
    if (y + 50 > canvas.height || y < 0) {
        dy *= -1;
    }

    requestAnimationFrame(update);
}

update();
