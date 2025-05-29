// Função para inicializar o site
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollEffects();
    carregarAlertas();
    initializeSectionAnimations();

    // ===== MENU MOBILE HAMBÚRGUER =====
    // Controle centralizado do menu mobile, overlay e acessibilidade
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    function closeMenu() {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (menuToggle && navLinks && menuOverlay) {
        menuToggle.addEventListener('click', function(e) {
            const isActive = navLinks.classList.toggle('active');
            menuOverlay.classList.toggle('active', isActive);
            body.classList.toggle('menu-open', isActive);
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
        menuOverlay.addEventListener('click', closeMenu);
        // Fecha ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        // Fecha ao redimensionar para desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) closeMenu();
        });
    }
    // ===== FIM MENU MOBILE HAMBÚRGUER =====
});

// Função para gerenciar a navegação
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove a classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            // Adiciona a classe active ao link clicado
            e.target.classList.add('active');
        });
    });
}

// Função para efeitos de scroll
function initializeScrollEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
}

// Função para mostrar mensagens de alerta
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Função para verificar se o usuário está logado
function checkUserLogin() {
    const userToken = localStorage.getItem('userToken');
    return !!userToken;
}

// Função para gerenciar o tema do site
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
}

// Inicializa o tema baseado na preferência do usuário
function initializeTheme() {
    const darkTheme = localStorage.getItem('darkTheme') === 'true';
    if (darkTheme) {
        document.body.classList.add('dark-theme');
    }
}

// Função para animar seções com IntersectionObserver
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
                // Opcional: desobserva após a animação
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // 10% da seção visível
        rootMargin: '0px 0px -50px 0px' // Inicia a animação um pouco antes
    });

    // Adiciona classe fade-in e observa cada seção
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Simulação de API de alertas
const alertasRecentes = [
    {
        local: "Rio de Janeiro",
        data: "10/06/2025",
        nivel: "alto",
        descricao: "Risco de enchente na região central"
    },
    {
        local: "São Paulo",
        data: "09/06/2025",
        nivel: "médio",
        descricao: "Alerta de chuva forte na zona sul"
    },
    {
        local: "Salvador",
        data: "08/06/2025",
        nivel: "baixo",
        descricao: "Monitoramento de nível do rio"
    }
];

// Função para criar o HTML dos alertas
function criarAlertaHTML(alerta) {
    const nivelClass = `nivel-${alerta.nivel}`;
    return `
        <article class="alerta-card ${nivelClass}">
            <div class="alerta-header">
                <h3>${alerta.local}</h3>
                <span class="alerta-data">${alerta.data}</span>
            </div>
            <p class="alerta-descricao">${alerta.descricao}</p>
            <div class="alerta-nivel">
                <span class="nivel-indicador"></span>
                <span class="nivel-texto">Nível ${alerta.nivel.toUpperCase()}</span>
            </div>
        </article>
    `;
}

// Função para carregar os alertas
function carregarAlertas() {
    const alertasSection = document.querySelector('.alertas-recentes');
    if (!alertasSection) return;

    // Limpa os alertas existentes
    alertasSection.innerHTML = '<h2>Alertas Recentes</h2>';
    
    // Cria o container de alertas
    const alertasContainer = document.createElement('div');
    alertasContainer.className = 'alertas-grid';
    
    // Adiciona cada alerta
    alertasRecentes.forEach(alerta => {
        alertasContainer.innerHTML += criarAlertaHTML(alerta);
    });
    
    // Adiciona o container à seção
    alertasSection.appendChild(alertasContainer);
}

// Atualiza os alertas a cada 5 segundos
setInterval(carregarAlertas, 5000); 