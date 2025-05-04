function toggleMenu() {
    const menuNav = document.getElementById("menu-nav");
    const btnWhats = document.querySelector(".btn-whats");
    menuNav.classList.toggle("active");

    if (menuNav.classList.contains("active")) {
        btnWhats.style.display = "none";
    } else {
        btnWhats.style.display = "flex";
    }
}

// Fechar o menu ao clicar em qualquer link
document.querySelectorAll("#menu-nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
        const menuNav = document.getElementById("menu-nav");
        menuNav.classList.remove("active");
    });
});

// Remove o preloader após o carregamento da página
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const images = Array.from(document.images); // Obtém todas as imagens da página
    let loadedImages = 0;

    images.forEach((img) => {
        if (img.complete) {
            loadedImages++; // Incrementa se a imagem já está carregada
        } else {
            img.addEventListener("load", () => loadedImages++); // Incrementa ao carregar
            img.addEventListener("error", () => loadedImages++); // Incrementa mesmo em caso de erro
        }
    });

    const checkAllImagesLoaded = setInterval(() => {
        if (loadedImages === images.length) {
            clearInterval(checkAllImagesLoaded); // Para o intervalo quando todas as imagens forem carregadas
            preloader.style.opacity = "0"; // Esconde o preloader com transição
            setTimeout(() => {
                preloader.style.display = "none"; // Remove o preloader da tela
            }, 500); // Delay para a transição
        }
    }, 100); // Verifica a cada 100ms
});

const sliderContainer = document.querySelector(".slider-container");
const sliderCards = document.querySelectorAll(".slider-card");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");

let currentIndex = 0; // Começa no primeiro card
const cardWidth = sliderCards[0].offsetWidth;
const maxIndex = sliderCards.length - 1; // Define o último índice permitido com base no número de cards

// Ajustar a posição inicial
sliderContainer.style.transform = `translateX(0px)`;

// Função para atualizar a posição do slider
function updateSliderPosition() {
    sliderContainer.style.transition =
        "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)";
    const offset = -currentIndex * cardWidth;
    sliderContainer.style.transform = `translateX(${offset}px)`;
}

// Função para verificar limites
function checkLimits() {
    if (currentIndex <= 0) {
        prevButton.disabled = true; // Desativa o botão "Anterior" no primeiro card
    } else {
        prevButton.disabled = false;
    }

    if (currentIndex >= maxIndex) {
        nextButton.disabled = true; // Desativa o botão "Próximo" no último card
    } else {
        nextButton.disabled = false;
    }
}

// Atualizar os limites no início
checkLimits();

// Eventos de toque
let startX = 0;
let currentX = 0;
let isDragging = false;
let deltaX = 0;

sliderContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    sliderContainer.style.transition = "none"; // Remove a transição durante o arraste
});

sliderContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    deltaX = currentX - startX;
    const offset = -currentIndex * cardWidth + deltaX;
    sliderContainer.style.transform = `translateX(${offset}px)`;
});

sliderContainer.addEventListener("touchend", () => {
    isDragging = false;

    // Determinar se o usuário deslizou para a esquerda ou direita
    if (deltaX > 50 && currentIndex > 0) {
        currentIndex--; // Deslizou para a direita
    } else if (deltaX < -50 && currentIndex < maxIndex) {
        currentIndex++; // Deslizou para a esquerda
    }

    updateSliderPosition();
    checkLimits(); // Atualiza os limites após o deslizar
    deltaX = 0; // Resetar o deltaX
});

// Eventos para os botões
prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
        checkLimits(); // Atualiza os limites após clicar no botão
    }
});

nextButton.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSliderPosition();
        checkLimits(); // Atualiza os limites após clicar no botão
    }
});

let currentSlide = 0;

function updateCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    const container = document.querySelector(".carousel-container");
    const containerWidth = container.offsetWidth;
    const slideWidth = 250; // Largura base do slide (sem escala)
    const centerPosition = containerWidth / 2; // Centro do container

    slides.forEach((slide, index) => {
        const offset = index - currentSlide; // Calcula a posição relativa do slide
        const isActive = offset === 0; // Verifica se o slide é o ativo

        // Calcula a posição para centralizar o slide ativo
        let position;
        if (isActive) {
            // Slide ativo fica centralizado
            position = centerPosition - slideWidth / 2;
        } else {
            // Outros slides são posicionados relativamente ao slide ativo
            position =
                centerPosition - slideWidth / 2 + offset * (slideWidth + 20); // 20px é o gap entre slides
        }

        // Aplica transformações
        slide.style.transform = `translateX(${position}px) ${
            isActive ? "scale(1.2)" : "scale(1)"
        }`;
        slide.style.opacity = isActive ? "1" : "0.5";
        slide.style.zIndex = isActive ? "2" : "1";
        slide.classList.toggle("active", isActive);
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateCarousel();
}

// Função para ajustar o carrossel quando a janela é redimensionada
function handleResize() {
    updateCarousel();
}

// Inicializa o carrossel e adiciona event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Verifica se o carrossel existe na página
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;

    // Inicializa o carrossel
    updateCarousel();

    // Adiciona listener para redimensionamento da janela
    window.addEventListener("resize", handleResize);

    // Configuração de auto-slide
    let autoSlide = setInterval(() => {
        changeSlide(1);
    }, 3000);

    // Pausa o auto-slide ao passar o mouse sobre o carrossel
    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    // Retoma o auto-slide ao remover o mouse do carrossel
    carousel.addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
            changeSlide(1);
        }, 3000);
    });

    // Adiciona suporte para navegação por toque (swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe para a esquerda
            changeSlide(1);
        } else if (touchEndX > touchStartX + 50) {
            // Swipe para a direita
            changeSlide(-1);
        }
    }
});

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupClose = document.querySelector(".popup-close");
const popupPrev = document.querySelector(".popup-prev");
const popupNext = document.querySelector(".popup-next");

let currentImageIndex = 0;
const images = [
    "assets/ex01.webp",
    "assets/ex02.webp",
    "assets/ex03.webp",
    "assets/ex04.webp",
    "assets/ex05.webp",
];

// Variáveis para o controle de swipe
let touchStartX = 0;
let touchEndX = 0;

// Função para abrir o popup com a imagem selecionada
function openPopup(imageSrc) {
    currentImageIndex = images.indexOf(imageSrc);
    if (currentImageIndex === -1) return; // Caso a imagem não esteja na lista
    popupImg.src = imageSrc;
    popup.classList.add("visible");
}

// Função para fechar o popup
function closePopup() {
    popup.classList.remove("visible");
}

// Função para navegar entre as imagens no popup
function navigatePopup(direction) {
    currentImageIndex += direction;

    // Verifica os limites do índice
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1; // Vai para a última imagem
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0; // Volta para a primeira imagem
    }

    popupImg.src = images[currentImageIndex];
}

// Eventos para fechar o popup ao clicar fora do conteúdo
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        closePopup();
    }
});

// Eventos de toque para navegação por swipe
popup.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

popup.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
});

popup.addEventListener("touchend", () => {
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; // Distância mínima para considerar um swipe
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe para a esquerda
        navigatePopup(1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe para a direita
        navigatePopup(-1);
    }
}
