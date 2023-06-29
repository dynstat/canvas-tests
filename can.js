var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

c.fillStyle = 'rgba(255,0,0,0.6)';
c.fillRect(100, 200, 100, 100); // (x,y,width, height)
// draw a line

c.beginPath();
c.moveTo(100, 100);

c.lineTo(50, 50);
c.strokeStyle = '#99999';


// ARC / CIRCLES

for (let i = 0; i < 5; i++) {
    // (x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean | undefined)
    c.beginPath()
    c.arc(300 + (100 * i), 300 + (100 * i) + i, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'orange';

    c.stroke();
}



let x = 300;
let y = 300;
let dx = 1;
let dy = 1;
let radius = 30;
function animate() {
    requestAnimationFrame(animate);
    // console.log("test");
    c.clearRect(0, 0, innerWidth, innerHeight); // this will clear the previous 
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'green';
    if (canvas.width != innerWidth || canvas.height != innerHeight)
        canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    {

    }
    if (x + radius > innerWidth || x - radius < 0) {
        dx *= -1;
    }
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    if (y + radius > innerHeight || y - radius < 0) {
        dy *= -1;
    }
    x += dx;
    y += dy;

    console.log(`x+r = ${x + radius}, dx = ${dx} ---- y+r = ${y + radius}, dy = ${dy}`)
    console.log(`innerwidth = ${innerWidth} , cw = ${canvas.width} ---- innerheight = ${innerHeight}, ch = ${canvas.height}`)
    // console.log(``)
    c.stroke();
}
animate();