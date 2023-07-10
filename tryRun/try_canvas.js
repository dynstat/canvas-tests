var myCanvas = document.querySelector("canvas");



myCanvas.height = window.innerHeight;
myCanvas.width = window.innerWidth;

var c = myCanvas.getContext("2d");

colorPalette = ["#e63946", "#F7F3D9", "#a8dadc", "#457b9d", "#1d3557"]
// c.fillStyle = 'blue';

// Fix the size of the canvas frame as the window gets resized.
window.addEventListener('resize', () => {
    myCanvas.height = window.innerHeight;
    myCanvas.width = window.innerWidth;
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



class Particle {

    constructor(ctx) {
        this.radius = Math.floor(Math.random() * 10 + 1);
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.velx = Math.random() * 1 - 0.5;
        this.vely = Math.random() * 1 - 0.5;
    }

}



function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight); // To clear the previously drawn objects every frame.

}



// Calling the animate function 
animate();