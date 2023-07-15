var myCanvas = document.querySelector("canvas");
myCanvas.height = window.innerHeight;
myCanvas.width = window.innerWidth;

var c = myCanvas.getContext("2d");
console.log(c);

colorPalette = ["#e63946", "#F7F3D9", "#a8dadc", "#457b9d", "#1d3557"]
// c.fillStyle = 'blue';

const gradient = c.createLinearGradient(0, 0, myCanvas.width, myCanvas.height);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'gold');
gradient.addColorStop(1, 'orange');
c.fillStyle = gradient;



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

    constructor() {
        this.radius = Math.floor(Math.random() * 10 + 1);
        this.x = this.radius + Math.random() * (myCanvas.width - this.radius * 2);
        this.y = this.radius + Math.random() * (myCanvas.height - this.radius * 2);
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.95;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }


}

class Collection {
    constructor(count, behaviour) {
        this.count = count;
        this.collection = [];
        this.create();
        this.behavior = behaviour;
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
            radius: 200
        }

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        })
    }
    create() {
        for (let i = 0; i < this.count; i++) {
            this.collection.push(new Particle())
        }
    }
    start() {

        this.behaviour.behave(this.collection);
    }



}

class Behavior {
    constructor() {

    }
    behave(collection) {
        collection.forEach(particle => {
            particle.draw(c);
            this.effect(particle);

        });


    }
    effect(particle) {
        particle.x += (particle.pushX *= particle.friction) + particle.vx;
        particle.y += (particle.pushY *= particle.friction) + particle.vy;

        if (particle.x < particle.radius) {
            particle.x = particle.radius;
            particle.vx *= -1;
        } else if (particle.x > particle.effect.width - particle.radius) {
            particle.x = particle.effect.width - particle.radius;
            particle.vx *= -1;
        }
        if (particle.y < particle.radius) {
            particle.y = particle.radius;
            particle.vy *= -1;
        } else if (particle.y > particle.effect.height - particle.radius) {
            particle.y = particle.effect.height - particle.radius;
            particle.vy *= -1;
        }

    }


}

class Interaction {

}

let behaviour1 = new Behavior();
let particlesCollection = new Collection(100, behaviour1);


function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight); // To clear the previously drawn objects every frame.
    // particlesCollection
    particlesCollection.start();
    requestAnimationFrame(animate);
}



// Calling the animate function 
animate();