/* ==========================================
   Animated Background Gradient
========================================== */

let gradientPosition = 0;
let direction = 1;

function animateGradient() {

    gradientPosition += direction * 0.15;

    if (gradientPosition >= 100) direction = -1;
    if (gradientPosition <= 0) direction = 1;

    document.body.style.backgroundPosition =
        `${gradientPosition}% 50%`;

    requestAnimationFrame(animateGradient);

}

animateGradient();

window.addEventListener("load", () => {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        setTimeout(() => {

            card.style.opacity = "1";
            card.style.transform = "translateY(0px)";

        }, index * 120);

    });

});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px) scale(1.03)";

        const image = card.querySelector("img");

        if(image){
            image.style.transform = "scale(1.08)";
        }

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px) scale(1)";

        const image = card.querySelector("img");

        if(image){
            image.style.transform = "scale(1)";
        }

    });

});

const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-3px) scale(1.05)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px) scale(1)";

    });

});
