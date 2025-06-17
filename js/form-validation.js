// Funções de validação de formulários
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = [];
    }

    // Validação de email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validação de telefone
    validatePhone(phone) {
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        return phoneRegex.test(phone);
    }

    // Validação de campos obrigatórios
    validateRequired(field) {
        return field.value.trim() !== '';
    }

    // Validação de comprimento mínimo
    validateMinLength(field, minLength) {
        return field.value.length >= minLength;
    }

    // Validação de comprimento máximo
    validateMaxLength(field, maxLength) {
        return field.value.length <= maxLength;
    }

    // Adiciona mensagem de erro
    addError(field, message) {
        this.errors.push({ field, message });
        this.showError(field, message);
    }

    // Mostra mensagem de erro
    showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error');
    }

    // Limpa mensagens de erro
    clearErrors() {
        this.errors = [];
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(element => element.remove());
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }

    // Validação do formulário de contato
    validateContactForm() {
        this.clearErrors();
        
        const name = this.form.querySelector('#name');
        const email = this.form.querySelector('#email');
        const message = this.form.querySelector('#message');

        if (!this.validateRequired(name)) {
            this.addError(name, 'Nome é obrigatório');
        } else if (!this.validateMinLength(name, 3)) {
            this.addError(name, 'Nome deve ter pelo menos 3 caracteres');
        }

        if (!this.validateRequired(email)) {
            this.addError(email, 'Email é obrigatório');
        } else if (!this.validateEmail(email.value)) {
            this.addError(email, 'Email inválido');
        }

        if (!this.validateRequired(message)) {
            this.addError(message, 'Mensagem é obrigatória');
        } else if (!this.validateMinLength(message, 10)) {
            this.addError(message, 'Mensagem deve ter no mínimo 10 caracteres');
        }

        return this.errors.length === 0;
    }

    // Validação do formulário de alerta
    validateAlertForm() {
        this.clearErrors();
        
        const title = this.form.querySelector('#title');
        const description = this.form.querySelector('#description');
        const location = this.form.querySelector('#location');

        if (!this.validateRequired(title)) {
            this.addError(title, 'Título é obrigatório');
        }

        if (!this.validateRequired(description)) {
            this.addError(description, 'Descrição é obrigatória');
        }

        if (!this.validateRequired(location)) {
            this.addError(location, 'Localização é obrigatória');
        }

        return this.errors.length === 0;
    }
}

// Inicialização dos validadores
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contatoForm');

    if (!form) {
        return;
    }

    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    const nomeErro = document.getElementById('nomeErro');
    const emailErro = document.getElementById('emailErro');
    const mensagemErro = document.getElementById('mensagemErro');

    // Função para validar o formulário
    function validarFormulario() {
        let isFormularioValido = true;

        // Validação do Nome
        if (nomeInput.value.trim() === '') {
            nomeErro.style.display = 'block';
            isFormularioValido = false;
        } else {
            nomeErro.style.display = 'none';
        }

        // Validação do E-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailErro.style.display = 'block';
            isFormularioValido = false;
        } else {
            emailErro.style.display = 'none';
        }

        // Validação da Mensagem
        if (mensagemInput.value.trim() === '') {
            mensagemErro.style.display = 'block';
            isFormularioValido = false;
        } else {
            mensagemErro.style.display = 'none';
        }

        return isFormularioValido;
    }

    // Adiciona validação em tempo real
    nomeInput.addEventListener('input', () => {
        if (nomeInput.value.trim() !== '') {
            nomeErro.style.display = 'none';
        }
    });

    emailInput.addEventListener('input', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(emailInput.value)) {
            emailErro.style.display = 'none';
        }
    });

    mensagemInput.addEventListener('input', () => {
        if (mensagemInput.value.trim() !== '') {
            mensagemErro.style.display = 'none';
        }
    });

    // Validação no envio do formulário
    form.addEventListener('submit', (event) => {
        if (!validarFormulario()) {
            event.preventDefault();
        }
        // Se o formulário for válido, ele será enviado normalmente para o FormSubmit
    });
}); 