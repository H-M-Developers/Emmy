function toggleMenu() {
    const menuNav = document.getElementById('menu-nav');
    const btnWhats = document.querySelector('.btn-whats');
    menuNav.classList.toggle('active');

    if (menuNav.classList.contains('active')) {
        btnWhats.style.display = 'none';
    } else {
        btnWhats.style.display = 'flex';
    }
}

// Fechar o menu ao clicar em qualquer link
document.querySelectorAll('#menu-nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const menuNav = document.getElementById('menu-nav');
        menuNav.classList.remove('active');
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



// Controle do carrossel principal
let currentSlide = 0;

function updateCarousel() {
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, index) => {
        const offset = index - currentSlide; // Calcula a posição relativa do slide
        const isActive = offset === 0; // Verifica se o slide é o ativo

        slide.style.transform = `translateX(${offset * 320}px)`; // Move os slides horizontalmente
        slide.style.opacity = isActive ? "1" : "0.5"; // Ajusta a opacidade do slide ativo
        slide.style.zIndex = isActive ? "2" : "1"; // Ajusta a profundidade do slide ativo
        slide.classList.toggle("active", isActive); // Adiciona ou remove a classe "active"
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll(".carousel-slide");
    currentSlide = (currentSlide + direction + slides.length) % slides.length; // Atualiza o índice do slide atual
    updateCarousel(); // Atualiza a posição do carrossel
}

updateCarousel(); // Inicializa o carrossel

// Configuração de auto-slide (troca automática de slides)
let autoSlide = setInterval(() => {
    changeSlide(1); // Avança para o próximo slide a cada 3 segundos
}, 3000);

// Pausa o auto-slide ao passar o mouse sobre o carrossel
document.querySelector(".carousel").addEventListener("mouseenter", () => {
    clearInterval(autoSlide); // Para o auto-slide
});

// Retoma o auto-slide ao remover o mouse do carrossel
document.querySelector(".carousel").addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
        changeSlide(1); // Retoma o auto-slide
    }, 3000);
});