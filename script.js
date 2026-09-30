
// Tạo trái tim bay
const heartsContainer = document.getElementById("hearts");

function createHeart() {
    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.innerHTML = ["❤️", "💕", "💗", "💖"][
        Math.floor(Math.random() * 4)
    ];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (3 + Math.random() * 4) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 350);


// Mở thư tình
const giftBtn = document.getElementById("giftBtn");
const letter = document.getElementById("letter");

giftBtn.addEventListener("click", () => {
    letter.classList.add("show");
    giftBtn.style.display = "none";

    launchFireworks();
});


// Hiệu ứng pháo hoa
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];
let animating = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createFirework(x, y) {
    const colors = [
        "#ff4081",
        "#ffd700",
        "#00e5ff",
        "#ff80ab",
        "#ffffff"
    ];

    for (let i = 0; i < 70; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 100,
            color: colors[
                Math.floor(Math.random() * colors.length)
            ]
        });
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.life--;

        ctx.globalAlpha = Math.max(0, p.life / 100);
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;

    particles = particles.filter(p => p.life > 0);

    if (particles.length > 0) {
        requestAnimationFrame(animateFireworks);
    } else {
        animating = false;
    }
}

function launchFireworks() {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.6
            );

            if (!animating) {
                animating = true;
                animateFireworks();
            }
        }, i * 400);
    }
}