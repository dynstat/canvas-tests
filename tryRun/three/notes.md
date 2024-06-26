# Issue: Particle Size Changes with Canvas Width

## Problem
When changing the width of the canvas element using CSS, the size of the particles appears to change. This issue arises because the canvas's internal drawing buffer size does not match the display size set by CSS, leading to scaling distortions.

## Explanation
- **Particle Size Definition**: The size of each particle is defined as `this.size = Math.random() * 5 + 1;`, which should be independent of the canvas dimensions.
- **Canvas Scaling**: The canvas element's size is controlled by CSS (e.g., `width: 400vw; height: 60vh;`), but the internal drawing buffer size defaults to 300x150 pixels unless explicitly set. This mismatch causes the browser to scale the drawing buffer to fit the CSS size, distorting the rendered content.

## Solution
To ensure that the internal drawing buffer matches the CSS size and that particles are drawn at their intended size, set the canvas's width and height properties directly in JavaScript to match the CSS dimensions.

### Fix
1. **Add a function to resize the canvas**:
    ```javascript:tryRun/three/script.js
    // Set canvas dimensions to match CSS dimensions
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();  // Call this function initially to set the size
    ```

2. **Ensure the rest of your particle system code uses these dimensions**:
    ```javascript:tryRun/three/script.js
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    const particleCountSlider = document.getElementById('particleCount');
    const particleSpeedSlider = document.getElementById('particleSpeed');
    const particleCountValue = document.getElementById('particleCountValue');
    const particleSpeedValue = document.getElementById('particleSpeedValue');

    let particles = [];
    // Set canvas dimensions to match CSS dimensions
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();  // Call this function initially to set the size

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
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
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
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
    ```

## Summary
By ensuring the canvas's internal drawing buffer size matches its display size, you can prevent distortions and maintain consistent particle sizes regardless of the canvas dimensions set by CSS.

Sure! Here's an alternative method where you remove the width and height properties from the CSS canvas element and set them directly in the script.

### Updated CSS
Remove the width and height properties from the canvas element in the CSS:

```css:tryRun/three/style.css
canvas {
    border: 1px solid #303030;
    background-color: #e0e0e0;
    /* Remove width and height properties */
}
```

### Updated JavaScript
Set the canvas dimensions directly in the script:

```javascript:tryRun/three/script.js

// ... existing code ...

// Remove width and height properties from CSS and set them in the script
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();  // Call this function initially to set the size

// ... existing code ...
```

### Summary
By removing the width and height properties from the CSS and setting them directly in the script, you ensure that the canvas's internal drawing buffer size matches the intended display size. This prevents any scaling distortions and maintains consistent particle sizes.