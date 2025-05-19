const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides-container");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function updateDots(index) {
    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function goToSlide(index) {
    const offset = -index * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    updateDots(index);
}

// Eventos de toque para deslizar
slidesContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slidesContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", () => {
    if (!isDragging) return;
    const deltaX = currentX - startX;

    if (deltaX > 50 && currentIndex > 0) {
        currentIndex--; // Deslizar para a esquerda (voltar)
    } else if (deltaX < -50 && currentIndex < slides.length - 1) {
        currentIndex++; // Deslizar para a direita (avançar)
    }

    goToSlide(currentIndex);
    isDragging = false;
    startX = 0; // Reseta a posição inicial
    currentX = 0; // Reseta a posição atual
});

createDots();
