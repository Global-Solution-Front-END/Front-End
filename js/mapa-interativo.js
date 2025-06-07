// Classe para gerenciar o mapa interativo
class MapaInterativo {
    constructor(mapId) {
        this.mapId = mapId;
        this.map = null;
        this.markers = [];
        this.currentPosition = null;
        this.alertas = [];
    }

    // Inicializa o mapa
    initMap() {
        // Verifica se o elemento do mapa existe
        const mapElement = document.getElementById(this.mapId);
        if (!mapElement) return;

        // Inicializa o mapa com a posição padrão (São Paulo)
        this.map = L.map(this.mapId).setView([-23.5505, -46.6333], 13);

        // Adiciona o tile layer do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Adiciona o controle de localização
        this.map.locate({setView: true, maxZoom: 16});

        // Eventos do mapa
        this.map.on('locationfound', this.onLocationFound.bind(this));
        this.map.on('locationerror', this.onLocationError.bind(this));
    }

    // Manipula o evento de localização encontrada
    onLocationFound(e) {
        this.currentPosition = e.latlng;
        
        // Adiciona marcador da posição atual
        const radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(this.map)
            .bindPopup('Você está aqui').openPopup();
        
        L.circle(e.latlng, radius).addTo(this.map);
    }

    // Manipula o evento de erro na localização
    onLocationError(e) {
        console.error('Erro ao obter localização:', e.message);
        showAlert('Não foi possível obter sua localização. Verifique as permissões do navegador.', 'error');
    }

    // Adiciona um alerta ao mapa
    addAlerta(alerta) {
        const marker = L.marker([alerta.latitude, alerta.longitude])
            .bindPopup(this.createPopupContent(alerta))
            .addTo(this.map);

        this.markers.push(marker);
        this.alertas.push(alerta);
    }

    // Cria o conteúdo do popup do alerta
    createPopupContent(alerta) {
        return `
            <div class="alerta-popup">
                <h3>${alerta.titulo}</h3>
                <p>${alerta.descricao}</p>
                <p><strong>Data:</strong> ${new Date(alerta.data).toLocaleString()}</p>
                <p><strong>Tipo:</strong> ${alerta.tipo}</p>
            </div>
        `;
    }

    // Remove um alerta do mapa
    removeAlerta(alertaId) {
        const index = this.alertas.findIndex(a => a.id === alertaId);
        if (index !== -1) {
            this.map.removeLayer(this.markers[index]);
            this.markers.splice(index, 1);
            this.alertas.splice(index, 1);
        }
    }

    // Atualiza a posição do usuário
    updateUserPosition() {
        if (this.map) {
            this.map.locate({setView: true, maxZoom: 16});
        }
    }

    // Filtra alertas por tipo
    filterAlertasByType(tipo) {
        this.markers.forEach((marker, index) => {
            if (this.alertas[index].tipo === tipo) {
                marker.addTo(this.map);
            } else {
                this.map.removeLayer(marker);
            }
        });
    }

    // Limpa todos os alertas
    clearAlertas() {
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
        this.alertas = [];
    }
}

// Inicialização do mapa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const mapa = new MapaInterativo('mapa');
    mapa.initMap();

    // Adiciona evento para atualizar posição a cada 5 minutos
    setInterval(() => {
        mapa.updateUserPosition();
    }, 300000);

    // Exemplo de como adicionar um alerta
    const addAlertaButton = document.getElementById('addAlertaButton');
    if (addAlertaButton) {
        addAlertaButton.addEventListener('click', () => {
            const alerta = {
                id: Date.now(),
                titulo: 'Alerta de Teste',
                descricao: 'Este é um alerta de teste',
                latitude: -23.5505,
                longitude: -46.6333,
                tipo: 'teste',
                data: new Date()
            };
            mapa.addAlerta(alerta);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Dados simulados das áreas
    const areasRisco = {
        'sao-paulo': {
            nome: 'São Paulo',
            risco: 'alto',
            ultimoAlerta: '2024-03-15 14:30'
        },
        'rio-de-janeiro': {
            nome: 'Rio de Janeiro',
            risco: 'médio',
            ultimoAlerta: '2024-03-14 09:15'
        },
        'salvador': {
            nome: 'Salvador',
            risco: 'baixo',
            ultimoAlerta: '2024-03-13 16:45'
        }
    };

    // Cria o mapa SVG
    const mapaContainer = document.querySelector('.mapa');
    if (mapaContainer) {
        mapaContainer.innerHTML = `
            <svg viewBox="0 0 800 600" class="mapa-svg">
                <!-- Área de São Paulo -->
                <path id="sao-paulo" d="M300 200 L350 180 L400 200 L380 250 L330 270 L300 250 Z" 
                    class="area-risco" data-area="sao-paulo" />
                
                <!-- Área do Rio de Janeiro -->
                <path id="rio-de-janeiro" d="M450 300 L500 280 L550 300 L520 350 L470 370 L450 350 Z" 
                    class="area-risco" data-area="rio-de-janeiro" />
                
                <!-- Área de Salvador -->
                <path id="salvador" d="M200 400 L250 380 L300 400 L280 450 L230 470 L200 450 Z" 
                    class="area-risco" data-area="salvador" />
            </svg>
            <div class="tooltip" style="display: none;"></div>
        `;

        // Adiciona eventos de clique nas áreas
        const areas = document.querySelectorAll('.area-risco');
        const tooltip = document.querySelector('.tooltip');

        areas.forEach(area => {
            area.addEventListener('click', function(e) {
                const areaId = this.getAttribute('data-area');
                const dados = areasRisco[areaId];
                
                // Posiciona o tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
                
                // Define a cor do tooltip baseado no risco
                let corRisco;
                switch(dados.risco) {
                    case 'alto':
                        corRisco = 'var(--cor-alerta)';
                        break;
                    case 'médio':
                        corRisco = '#FFA726';
                        break;
                    case 'baixo':
                        corRisco = '#66BB6A';
                        break;
                }

                // Atualiza o conteúdo do tooltip
                tooltip.innerHTML = `
                    <div class="tooltip-header" style="background-color: ${corRisco}">
                        <h3>${dados.nome}</h3>
                    </div>
                    <div class="tooltip-content">
                        <p><strong>Nível de Risco:</strong> ${dados.risco.toUpperCase()}</p>
                        <p><strong>Último Alerta:</strong> ${dados.ultimoAlerta}</p>
                    </div>
                `;
                
                tooltip.style.display = 'block';
            });

            // Adiciona hover effect
            area.addEventListener('mouseenter', function() {
                this.style.fill = 'rgba(46, 134, 171, 0.3)';
            });

            area.addEventListener('mouseleave', function() {
                this.style.fill = '';
            });
        });

        // Fecha o tooltip ao clicar fora
        document.addEventListener('click', function(e) {
            if (!e.target.classList.contains('area-risco')) {
                tooltip.style.display = 'none';
            }
        });
    }
}); 

//dom no mapainterativo:
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modalAlerta');
    const btnSimular = document.getElementById('btnSimular');
    const btnFechar = document.getElementById('btnFechar');

    btnSimular.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    btnFechar.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

//mapa
function initMap() {
    var sp = { lat: -23.55052, lng: -46.633308 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: sp
    });
    var marker = new google.maps.Marker({
      position: sp,
      map: map,
      title: 'Centro de São Paulo - Área de Risco'
    });
  }