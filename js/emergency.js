document.addEventListener('DOMContentLoaded', function() {
    const emergencyBtn = document.getElementById('emergencyButton');
    if (emergencyBtn) {
        const emergencyModal = document.querySelector('.emergency-modal');
        const modalClose = document.querySelector('.modal-close');

        // Abre o modal
        emergencyBtn.addEventListener('click', function() {
            emergencyModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previne scroll
        });

        // Fecha o modal
        function closeModal() {
            emergencyModal.classList.remove('active');
            document.body.style.overflow = ''; // Restaura scroll
        }

        modalClose.addEventListener('click', closeModal);

        // Fecha o modal ao clicar fora
        emergencyModal.addEventListener('click', function(e) {
            if (e.target === emergencyModal) {
                closeModal();
            }
        });

        // Fecha o modal com a tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && emergencyModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Adiciona efeito de hover nos números
        const emergencyNumbers = document.querySelectorAll('.emergency-number');
        emergencyNumbers.forEach(number => {
            number.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
            });

            number.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }
}); 