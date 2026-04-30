/* ===========================
   PAIXÃO PISOS — script.js
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. HEADER SCROLL (Barra de navegação grudada)
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // 2. MENU MOBILE (Menu Hamburguer)
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobLinks = document.querySelectorAll('.mob-link');
  
    function toggleMenu() {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    }
  
    if (hamburger) {
      hamburger.addEventListener('click', toggleMenu);
    }
  
    // Fecha o menu ao clicar em um link
    mobLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  
    // 3. ANIMAÇÕES DE ROLAGEM (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };
  
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Para a animação acontecer apenas uma vez
        }
      });
    }, revealOptions);
  
    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  
    // 4. FILTRO DO PORTFÓLIO (funciona em qualquer grid com .gallery-item)
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Pega TODOS os itens de galeria da página (tanto do index quanto do acervo)
    const allGalleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove a classe ativa de todos os botões e adiciona no clicado
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        allGalleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-cat') === filterValue) {
            item.classList.remove('hidden');
            // Pequeno delay para a animação de opacidade funcionar melhor
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.classList.add('hidden');
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
          }
        });
      });
    });
  
    // 5. LIGHTBOX (Galeria de imagens ampliada)
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    
    let currentImgIndex = 0;
    let visibleItems = []; // Array para guardar apenas as imagens filtradas no momento
  
    // Função para atualizar quais imagens estão visíveis baseado no filtro
    function updateVisibleItems() {
      visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img'));
    }
  
    // Abre o lightbox ao clicar na imagem — usando delegação de evento para pegar itens dinâmicos
    document.body.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (!galleryItem || galleryItem.classList.contains('hidden')) return;
      
      updateVisibleItems();
      const img = galleryItem.querySelector('img');
      if (!img) return;
      
      currentImgIndex = visibleItems.indexOf(img);
      showLightbox(img.src);
    });
  
    function showLightbox(src) {
      if (!lightbox) return;
      lbImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden'; // Impede a rolagem do site no fundo
    }
  
    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove('open');
      document.body.style.overflow = ''; // Devolve a rolagem
    }
  
    function prevImage(e) {
      e.stopPropagation();
      if(visibleItems.length === 0) return;
      currentImgIndex = (currentImgIndex - 1 + visibleItems.length) % visibleItems.length;
      lbImg.src = visibleItems[currentImgIndex].src;
    }
  
    function nextImage(e) {
      e.stopPropagation();
      if(visibleItems.length === 0) return;
      currentImgIndex = (currentImgIndex + 1) % visibleItems.length;
      lbImg.src = visibleItems[currentImgIndex].src;
    }
  
    // Eventos de clique do Lightbox
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev) lbPrev.addEventListener('click', prevImage);
    if (lbNext) lbNext.addEventListener('click', nextImage);
    
    // Fecha o lightbox se clicar fora da imagem
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) closeLightbox();
        });
    }

    // Suporte para fechar e navegar com o teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('open')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage(e);
            if (e.key === 'ArrowRight') nextImage(e);
        }
    });
  
  });