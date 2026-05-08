'use strict';

document.addEventListener('DOMContentLoaded', () => {

/* ───────────────── LOADER ───────────────── */
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    if (loader) {
        setTimeout(() => loader.classList.add('gone'), 1000);
    }
});

/* ───────────────── CUSTOM CURSOR ───────────────── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mx = -200, my = -200, rx = -200, ry = -200;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (dot) {
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    }
});

(function animateRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
    }
    requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .cert-card, .proj-card, .pill, .stat, .info-card')
    .forEach(el => {
        el.addEventListener('mouseenter', () => ring?.classList.add('big'));
        el.addEventListener('mouseleave', () => ring?.classList.remove('big'));
    });

/* ───────────────── NAV ACTIVE ───────────────── */
const nav      = document.getElementById('nav');
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);

    let active = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) active = sec.id;
    });
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + active) link.classList.add('active-link');
    });
});

/* ───────────────── HAMBURGER ───────────────── */
const burger       = document.getElementById('burger');
const navLinksWrap = document.getElementById('navLinks');

if (burger && navLinksWrap) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navLinksWrap.classList.toggle('open');
    });
    navLinksWrap.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            burger.classList.remove('open');
            navLinksWrap.classList.remove('open');
        });
    });
}

/* ───────────────── TYPEWRITER ───────────────── */
const roles = [
    'Full-Stack Developer',
    'Frontend Developer',
    'React.js Developer',
    'Node.js Developer',
    'MERN Stack Enthusiast',
    'Database Engineer (MySQL / MongoDB)',
    'Problem Solver',
    'Tech Enthusiast 🚀'
];

const tw = document.getElementById('typewriter');
let ri = 0, ci = 0, del = false;

function type() {
    if (!tw) return;
    const cur = roles[ri];
    tw.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
    if (!del && ci === cur.length) { del = true; return setTimeout(type, 1500); }
    if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    setTimeout(type, del ? 40 : 70);
}
setTimeout(type, 500);

/* ───────────────── SCROLL REVEAL ───────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObs.observe(el));

/* ───────────────── HERO STATS COUNTER ───────────────── */
function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    let current = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
    }, 30);
}

const statNums = document.querySelectorAll('.stat-num');
const statObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            statObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });
statNums.forEach(num => statObs.observe(num));

/* ───────────────── CERTIFICATE OPEN ───────────────── */
window.openCert = function(src) {
    window.open(src, '_blank');
};

/* ───────────────── PROGRESS BARS ───────────────── */
const progItems = document.querySelectorAll('.prog-item');

const progObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const fill = e.target.querySelector('.prog-fill');
            const num  = e.target.querySelector('.prog-label span');
            const pct  = parseInt(e.target.dataset.pct, 10);
            if (fill) fill.style.width = pct + '%';
            let c = 0;
            const t = setInterval(() => {
                c = Math.min(c + 2, pct);
                if (num) num.textContent = c + '%';
                if (c >= pct) clearInterval(t);
            }, 15);
            progObs.unobserve(e.target);
        }
    });
}, { threshold: 0.4 });

progItems.forEach(el => progObs.observe(el));

/* ───────────────── CONTACT FORM (routes to maishakhatun516@gmail.com) ───────────────── */
const contactForm = document.getElementById('contactForm');
const formOk      = document.getElementById('formOk');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name    = this.querySelector('input[type="text"]').value.trim();
        const email   = this.querySelector('input[type="email"]').value.trim();
        const subject = this.querySelectorAll('input[type="text"]')[1]?.value.trim() || 'Portfolio Contact';
        const message = this.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Build mailto link to Maisha's Gmail
        const to      = 'maishakhatun516@gmail.com';
        const subLine = encodeURIComponent(subject || 'New message from Portfolio');
        const body    = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );
        const mailtoURL = `mailto:${to}?subject=${subLine}&body=${body}`;

        window.location.href = mailtoURL;

        // Show success feedback
        if (formOk) {
            formOk.style.display = 'flex';
            setTimeout(() => { formOk.style.display = 'none'; }, 4000);
        }
        contactForm.reset();
    });
}

/* ───────────────── PARTICLE CANVAS ───────────────── */
const canvas = document.getElementById('canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.r = Math.random() * 1.5 + 0.3;
            this.vx = (Math.random() - .5) * 0.3;
            this.vy = (Math.random() - .5) * 0.3;
            // Violet or teal tint
            this.color = Math.random() > .5
                ? `rgba(139,92,246,${Math.random() * 0.4 + 0.1})`
                : `rgba(6,182,212,${Math.random() * 0.3 + 0.1})`;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    function animateParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });

        // Draw connections
        particles.forEach((a, i) => {
            for (let j = i + 1; j < particles.length; j++) {
                const b  = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d  = Math.sqrt(dx*dx + dy*dy);
                if (d < 100) {
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(139,92,246,${(1 - d/100) * 0.12})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* ───────────────── SMOOTH SCROLL ───────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ───────────────── CONSOLE ───────────────── */
console.log(
    '%c✨ Maisha Khatun | Portfolio Loaded',
    'color:#8b5cf6;font-size:14px;font-weight:900;background:#050609;padding:8px 16px;border-radius:6px;border-left:3px solid #06b6d4'
);

}); // END DOM