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
