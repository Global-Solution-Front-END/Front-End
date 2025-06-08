document.addEventListener('DOMContentLoaded', () => {
    const emergencyBtn = document.getElementById('emergencyButton');
    if (!emergencyBtn) return;

    const emergencyModal = document.querySelector('.emergency-modal');
    const modalClose = document.querySelector('.modal-close');

    const closeModal = () => {
        emergencyModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Abre o modal
    emergencyBtn.addEventListener('click', () => {
        emergencyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Fecha o modal
    modalClose.addEventListener('click', closeModal);

    // Fecha o modal ao clicar fora
    emergencyModal.addEventListener('click', (e) => {
        if (e.target === emergencyModal) {
            closeModal();
        }
    });

    // Fecha o modal com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && emergencyModal.classList.contains('active')) {
            closeModal();
        }
    });
}); 