var canvas = document.querySelector("canvas");

// variables, if else, for loop, function, class, 

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

colorPalette = ["#e63946", "#F7F3D9", "#a8dadc", "#457b9d", "#1d3557"]
// c.fillStyle = 'blue';
// c.fillRect(100, 100, 100, 50);


// creating a class for the circle

class Circle {
    constructor(x = 300, y = 300, dx = 5, dy = 5, radius = 30) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = colorPalette[Math.floor(Math.random() * 4)];
        this.draw = function () {
            c.beginPath();


            c.strokeStyle = this.color;
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            // console.log(`1   x = ${this.x}, y = ${this.y}`);
            // console.log(`1   innerWidth = ${innerWidth}, innerHeigth = ${innerHeight}`);
            this.update();
        }
        this.update = function () {
            if (this.x >= innerWidth || this.x <= 0) {
                this.dx *= -1;
                // this.x -= this.dx
            }


            if (this.y >= innerHeight || this.y <= 0) {
                this.dy *= -1;
                // this.y -= this.dy
            }

            this.x = this.x + this.dx;
            this.y = this.y + this.dy;

            // console.log(`2   x = ${this.x}, y = ${this.y}`);
            // console.log(`2   innerWidth = ${innerWidth}, innerHeigth = ${innerHeight}`);
            c.stroke();
        }
    }



}

// let circle = new Circle(300, 300, 1, 1, 30);

let circleArray = [];

function fillCircleArray(n) {


    for (let i = 0; i < n; i++) {
        x = Math.random() * innerWidth;
        y = Math.random() * innerHeight;
        dx = (Math.random());
        dy = (Math.random());
        circleArray.push(new Circle(x, y, dx, dy, 5))
    }
}
fillCircleArray(500);
console.log(circleArray);
function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
    }

}

animate();