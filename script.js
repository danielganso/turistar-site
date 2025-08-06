// Navegação Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajuste para navbar fixa
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efeito de transparência na navbar ao rolar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animações ao rolar (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.value-item, .contact-item, .address-item, .hours-info').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Navegação para páginas externas
// A política de privacidade agora é uma página separada

// Validação e formatação de links
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o WhatsApp está disponível
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            // Analytics ou tracking podem ser adicionados aqui
            console.log('WhatsApp link clicked');
        });
    }

    // Verificar links do Instagram
    const instagramLink = document.querySelector('.social-link.instagram');
    if (instagramLink) {
        instagramLink.addEventListener('click', (e) => {
            // Analytics ou tracking podem ser adicionados aqui
            console.log('Instagram link clicked');
        });
    }

    // Verificar link do Google Maps
    const mapLink = document.querySelector('.map-link');
    if (mapLink) {
        mapLink.addEventListener('click', (e) => {
            // Analytics ou tracking podem ser adicionados aqui
            console.log('Google Maps link clicked');
        });
    }
});

// Função para destacar seção ativa na navegação
function highlightActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Adicionar classe active para link ativo
window.addEventListener('scroll', highlightActiveSection);

// Lazy loading para iframe do mapa
const mapIframe = document.querySelector('.map-container iframe');
if (mapIframe) {
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // O iframe já está carregado, mas podemos adicionar uma classe para animação
                entry.target.style.opacity = '1';
                mapObserver.unobserve(entry.target);
            }
        });
    });
    
    mapIframe.style.opacity = '0';
    mapIframe.style.transition = 'opacity 0.5s ease';
    mapObserver.observe(mapIframe);
}

// Função para copiar informações de contato
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        // Feedback visual
        const originalText = element.textContent;
        element.textContent = 'Copiado!';
        element.style.color = '#10b981';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 2000);
    }).catch(err => {
        console.log('Erro ao copiar: ', err);
    });
}

// Adicionar funcionalidade de copiar ao clicar no telefone
const phoneLink = document.querySelector('.phone-link');
if (phoneLink) {
    phoneLink.addEventListener('dblclick', (e) => {
        e.preventDefault();
        copyToClipboard('+5575981823998', phoneLink);
    });
}

// Adicionar funcionalidade de copiar ao clicar no email
const emailLink = document.querySelector('.email-link');
if (emailLink) {
    emailLink.addEventListener('dblclick', (e) => {
        e.preventDefault();
        copyToClipboard('contato@turistarviagens.com.br', emailLink);
    });
}

// Preloader simples (opcional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamento baseado no dispositivo
if (isMobile()) {
    // Remover hover effects em dispositivos móveis
    document.body.classList.add('mobile-device');
}

// Redimensionamento da janela
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('mobile-device');
    } else {
        document.body.classList.add('mobile-device');
    }
});

// Funções para modal de imagem
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imageSrc;
    modalImage.alt = 'Certificação CADASTUR - Turistar Viagens';
    modal.style.display = 'block';
    
    // Prevenir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

// Prevenir fechamento do modal ao clicar na imagem
document.addEventListener('DOMContentLoaded', () => {
    const modalContent = document.querySelector('.image-modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});

// Função para melhorar a performance em dispositivos móveis
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker pode ser implementado futuramente para cache
        console.log('Service Worker support detected');
    });
}

// Função para analytics simples (pode ser expandida)
function trackEvent(category, action, label) {
    // Implementar Google Analytics ou outra ferramenta de tracking
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Rastrear cliques importantes
document.addEventListener('click', (e) => {
    if (e.target.matches('.whatsapp-btn')) {
        trackEvent('Contact', 'WhatsApp Click', 'Header');
    }
    
    if (e.target.matches('.social-link')) {
        trackEvent('Social', 'Instagram Click', 'Contact Section');
    }
    
    if (e.target.matches('.map-link')) {
        trackEvent('Location', 'Google Maps Click', 'Location Section');
    }
    
    if (e.target.matches('.cta-button')) {
        trackEvent('CTA', 'Plan Trip Click', 'Hero Section');
    }
});

// Função para otimizar imagens (se necessário no futuro)
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
}

// Executar otimizações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    optimizeImages();
    
    // Adicionar meta tag para PWA (se necessário no futuro)
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=yes');
    }
});

// Função para debug (remover em produção)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Turistar Viagens - Site em modo de desenvolvimento');
    
    // Adicionar informações de debug
    window.turistarDebug = {
        version: '1.0.0',
        sections: document.querySelectorAll('.section').length,
        mobile: isMobile(),
        loaded: document.readyState
    };
}