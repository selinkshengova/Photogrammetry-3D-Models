/* ==========================================================
   DIGITAL PHOTOGRAMMETRY PLATFORM
   Main JavaScript
   Part 1
========================================================== */

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll("nav a");

const sections = document.querySelectorAll("section");

const revealElements = document.querySelectorAll(
    ".card, .tech-card, .timeline-item, .stat-card, .about-card, .team-card, .contact-card"
);

/* ==========================================================
   STICKY NAVBAR
========================================================== */

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        navbar.style.background = "rgba(15,23,42,.95)";

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.35)";

    }

    else{

        navbar.style.background =
            "rgba(15,23,42,.72)";

        navbar.style.boxShadow = "none";

    }

});

/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function updateNavigation(){

    let currentSection = "";

    sections.forEach(section=>{

        const top = section.offsetTop - 120;

        if(window.scrollY >= top){

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if(href === "#" + currentSection){

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateNavigation);

/* ==========================================================
   SCROLL REVEAL
========================================================== */

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

},

{

    threshold:0.15

}

);

revealElements.forEach(element=>{

    element.classList.add("reveal");

    observer.observe(element);

});

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

navLinks.forEach(link=>{

    link.addEventListener("click",(e)=>{

        const href = link.getAttribute("href");

        if(!href.startsWith("#")) return;

        e.preventDefault();

        const target = document.querySelector(href);

        if(target){

            window.scrollTo({

                top:target.offsetTop-70,

                behavior:"smooth"

            });

        }

    });

});

/* ==========================================================
   HERO PARALLAX
========================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    if(!hero) return;

    const y = window.scrollY;

    hero.style.backgroundPosition =
        `center ${y*0.3}px`;

});

/* ==========================================================
   BUTTON HOVER EFFECT
========================================================== */

const buttons = document.querySelectorAll(

".button, .primary-btn, .secondary-btn"

);

buttons.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform =
            "translateY(-4px)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform =
            "translateY(0px)";

    });

});

/* ==========================================================
   CARD ANIMATION
========================================================== */

const cards = document.querySelectorAll(

".card"

);

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform =
            "translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
            "translateY(0px)";

    });

});

/* ==========================================================
   PAGE LOADED
========================================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

    console.log(

        "%cInteractive Photogrammetry Platform",

        "color:#38BDF8;font-size:18px;font-weight:bold"

    );

    console.log(

        "Website loaded successfully."

    );

});

/* ==========================================================
   DIGITAL PHOTOGRAMMETRY PLATFORM
   Main JavaScript
   Part 2
========================================================== */

/* ==========================================================
   ANIMATED STATISTICS COUNTER
========================================================== */

const statNumbers = document.querySelectorAll(".stat-card h3");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const element = entry.target;

        const text = element.textContent.trim();

        const number = parseInt(text.replace(/\D/g, ""));

        const suffix = text.replace(/[0-9]/g, "");

        if (isNaN(number)) return;

        let current = 0;
        const increment = Math.max(1, Math.ceil(number / 80));

        const timer = setInterval(() => {

            current += increment;

            if (current >= number) {

                current = number;
                clearInterval(timer);

            }

            element.textContent = current + suffix;

        }, 20);

        counterObserver.unobserve(element);

    });

}, {

    threshold: 0.5

});

statNumbers.forEach(number => {

    counterObserver.observe(number);

});

/* ==========================================================
   RIPPLE BUTTON EFFECT
========================================================== */

document.querySelectorAll(".button, .primary-btn, .secondary-btn")
.forEach(button => {

    button.style.position = "relative";
    button.style.overflow = "hidden";

    button.addEventListener("click", function(e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + "px";

        ripple.style.left =

            e.clientX - rect.left - size / 2 + "px";

        ripple.style.top =

            e.clientY - rect.top - size / 2 + "px";

        ripple.style.position = "absolute";

        ripple.style.borderRadius = "50%";

        ripple.style.background =

            "rgba(255,255,255,.35)";

        ripple.style.transform = "scale(0)";

        ripple.style.animation =

            "rippleAnimation .6s linear";

        ripple.style.pointerEvents = "none";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});

/* ==========================================================
   RIPPLE KEYFRAME
========================================================== */

const rippleStyle = document.createElement("style");

rippleStyle.textContent = `

@keyframes rippleAnimation{

    to{

        transform:scale(4);

        opacity:0;

    }

}

`;

document.head.appendChild(rippleStyle);

/* ==========================================================
   GALLERY IMAGE EFFECT
========================================================== */

document.querySelectorAll(".card img").forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.style.transform = "scale(1.08)";

        image.style.filter =

            "brightness(1.08) contrast(1.05)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

        image.style.filter = "none";

    });

});

/* ==========================================================
   TIMELINE STAGGER ANIMATION
========================================================== */

const timelineItems =

document.querySelectorAll(".timeline-item");

timelineItems.forEach((item, index) => {

    item.style.transitionDelay =

        `${index * 120}ms`;

});

/* ==========================================================
   FLOATING HERO TAG
========================================================== */

const heroTag = document.querySelector(".hero-tag");

if(heroTag){

    let direction = 1;

    setInterval(() => {

        const current =

        parseFloat(

            heroTag.dataset.offset || "0"

        );

        let next = current + direction;

        if(next >= 8){

            direction = -1;

        }

        if(next <= -8){

            direction = 1;

        }

        heroTag.dataset.offset = next;

        heroTag.style.transform =

            `translateY(${next}px)`;

    },80);

}

/* ==========================================================
   CARD GLOW EFFECT
========================================================== */

document.querySelectorAll(

".card,.tech-card,.stat-card"

).forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x =

        ((e.clientX - rect.left) / rect.width) * 100;

        const y =

        ((e.clientY - rect.top) / rect.height) * 100;

        card.style.background =

        `radial-gradient(circle at ${x}% ${y}%,

        rgba(56,189,248,.18),

        rgba(255,255,255,.07) 55%)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background =

        "rgba(255,255,255,.08)";

    });

});

/* ==========================================================
   SECTION TITLE ANIMATION
========================================================== */

document.querySelectorAll(".section-title")
.forEach(title=>{

    observer.observe(title);

});

/* ==========================================================
   END OF PART 2
========================================================== */
/* ==========================================================
   DIGITAL PHOTOGRAMMETRY PLATFORM
   Main JavaScript
   Part 3
========================================================== */

/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.className = "back-to-top";

document.body.appendChild(backToTop);

Object.assign(backToTop.style, {

    position: "fixed",

    bottom: "30px",

    right: "30px",

    width: "55px",

    height: "55px",

    border: "none",

    borderRadius: "50%",

    cursor: "pointer",

    fontSize: "22px",

    color: "#fff",

    background: "linear-gradient(135deg,#2563EB,#38BDF8)",

    boxShadow: "0 10px 25px rgba(37,99,235,.35)",

    opacity: "0",

    visibility: "hidden",

    transition: ".35s",

    zIndex: "999"

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.style.opacity = "1";

        backToTop.style.visibility = "visible";

    } else {

        backToTop.style.opacity = "0";

        backToTop.style.visibility = "hidden";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

const progress = document.createElement("div");

progress.className = "scroll-progress";

document.body.appendChild(progress);

Object.assign(progress.style, {

    position: "fixed",

    top: "0",

    left: "0",

    height: "4px",

    width: "0%",

    background: "linear-gradient(90deg,#2563EB,#38BDF8)",

    zIndex: "9999"

});

window.addEventListener("scroll", () => {

    const total =

        document.documentElement.scrollHeight -

        window.innerHeight;

    const percent =

        (window.scrollY / total) * 100;

    progress.style.width = percent + "%";

});

/* ==========================================================
   CARD TILT EFFECT
========================================================== */

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY =

            ((x / rect.width) - .5) * 12;

        const rotateX =

            ((y / rect.height) - .5) * -12;

        card.style.transform =

            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});

/* ==========================================================
   HERO PARALLAX GLOW
========================================================== */

const heroGlow = document.querySelector(".hero");

if (heroGlow) {

    heroGlow.addEventListener("mousemove", e => {

        const x = e.clientX / window.innerWidth;

        const y = e.clientY / window.innerHeight;

        heroGlow.style.backgroundPosition =

            `${50 + x * 5}% ${50 + y * 5}%`;

    });

}

/* ==========================================================
   IMAGE LAZY FADE
========================================================== */

document.querySelectorAll("img").forEach(img => {

    img.style.opacity = "0";

    img.style.transition = "opacity .8s";

    img.onload = () => {

        img.style.opacity = "1";

    };

});

/* ==========================================================
   SMALL BUTTON PRESS ANIMATION
========================================================== */

document.querySelectorAll("button,.button,.primary-btn,.secondary-btn")
.forEach(btn => {

    btn.addEventListener("mousedown", () => {

        btn.style.transform = "scale(.96)";

    });

    btn.addEventListener("mouseup", () => {

        btn.style.transform = "";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform = "";

    });

});

/* ==========================================================
   PAGE VISIBILITY
========================================================== */

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        console.log("Page hidden");

    } else {

        console.log("Page active");

    }

});

/* ==========================================================
   PERFORMANCE
========================================================== */

window.addEventListener("load", () => {

    console.log(

        "Page loaded in",

        Math.round(performance.now()),

        "ms"

    );

});

/* ==========================================================
   COPYRIGHT
========================================================== */

console.log(

`%c
Interactive Photogrammetry Platform
Diploma Project 2026
Developed with HTML • CSS • JavaScript
`,
"color:#38BDF8;font-size:14px;font-weight:bold;"
);

/* ==========================================================
   END
========================================================== */