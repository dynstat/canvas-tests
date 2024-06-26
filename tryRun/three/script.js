const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const particleCountSlider = document.getElementById('particleCount');
const particleSpeedSlider = document.getElementById('particleSpeed');
const particleCountValue = document.getElementById('particleCountValue');
const particleSpeedValue = document.getElementById('particleSpeedValue');

let particles = [];
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // this.size = Math.random() * 5 + 1;
        this.size =  Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX * (parseInt(particleSpeedSlider.value) / 5);
        this.y += this.speedY * (parseInt(particleSpeedSlider.value) / 5);

        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.beginPath();
        // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        // Draws an arc with the specified radius, starting and ending angles, and direction.
        ctx.arc(this.x, this.y, this.size, 0, Math.PI* 2 );
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < parseInt(particleCountSlider.value); i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animate);
}

particleCountSlider.addEventListener('input', function() {
    particleCountValue.textContent = this.value;
    initParticles();
});

particleSpeedSlider.addEventListener('input', function() {
    particleSpeedValue.textContent = this.value;
});

initParticles();
animate();