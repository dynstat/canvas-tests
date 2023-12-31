var canvas = document.querySelector("canvas");



canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var c = canvas.getContext("2d");

colorPalette = ["#e63946", "#F7F3D9", "#a8dadc", "#457b9d", "#1d3557"]
// colorPalette = ["#0C090D", "#E01A4F", "#F15946", "#F9C22E", "#53B3CB"]
// colorPalette = ["#006466", "#065A60", "#0B525B", "#144552", "#1B3A4B",
// "#212F45", "#272640", "#312244", "#3E1F47", "#4D194D"]
// c.fillStyle = 'blue';


window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})

// mouse events
let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})


// creating a class for the circle
class Circle {
    constructor(x = 300, y = 300, dx = 5, dy = 5, radius = 0.1, baseradius = 0.1, maxradius = 30) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.baseradius = baseradius;
        this.maxradius = maxradius;
        this.color = colorPalette[Math.floor(Math.random() * 6 - 0.1)];
        this.draw = function () {
            // every new frame will start with the beginPath() method
            c.beginPath();


            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

            // // add stroke only when the radius hits a certain value
            // if (this.radius > 8) {
            //     c.strokeStyle = "#222222";
            //     c.lineWidth = 2;
            //     c.stroke();
            // }

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

            // user interaction
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50
                && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                if (this.radius < maxradius) {
                    this.radius += 2.8; // 1 is rate of size increase in the radius.
                }
            }
            else if (this.radius > baseradius) {
                this.radius -= 0.08;
            }

            if (this.radius < 5) {
                c.strokeStyle = "#e9e9e9ff";
                c.lineWidth = 0.1;
                c.stroke();
            }

        }
    }



}

// let circle = new Circle(300, 300, 1, 1, 30);
let circleArray = [];

function fillCircleArray(n) {


    for (let i = 0; i < n; i++) {
        x = Math.floor(Math.random() * innerWidth);
        y = Math.floor(Math.random() * innerHeight);

        // setting the range (-0.4 to +0.4). For example if dx = (Math.random() * 0.8) - 0.4  , 0.8 is the factor that decides the upper limit of randomness as 0.8. subtracting its half value will provide the evenly distributed randomness. i.e from -0.4 to 0.4
        // dx = (Math.random() * 1.8) - 0.9;
        // dy = (Math.random() * 1.8) - 0.9;
        dx = +parseFloat((Math.random() * 1.8) - 0.9).toFixed(1);  // or use Number() constructor
        dy = +parseFloat((Math.random() * 1.8) - 0.9).toFixed(1);
        // console.log(typeof dx, typeof dy);
        circleArray.push(new Circle(x, y, dx, dy, 0.1))
    }
}
if (window.innerWidth > 600) {
    fillCircleArray(2000);
}
else {
    fillCircleArray(100);

}
// console.log(circleArray);
function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
    }

}



// Calling the animate function 
animate();
