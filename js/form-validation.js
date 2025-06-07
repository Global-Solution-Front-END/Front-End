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
        this.errors.push({
            field: field,
            message: message
        });
    }

    // Limpa mensagens de erro
    clearErrors() {
        this.errors = [];
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(element => element.remove());
    }

    // Mostra mensagens de erro
    showErrors() {
        this.errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = error.message;
            error.field.parentNode.appendChild(errorDiv);
            error.field.classList.add('error');
        });
    }

    // Validação do formulário de contato
    validateContactForm() {
        this.clearErrors();
        
        const name = this.form.querySelector('#name');
        const email = this.form.querySelector('#email');
        const message = this.form.querySelector('#message');

        if (!this.validateRequired(name)) {
            this.addError(name, 'Nome é obrigatório');
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

        if (this.errors.length > 0) {
            this.showErrors();
            return false;
        }

        return true;
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

        if (this.errors.length > 0) {
            this.showErrors();
            return false;
        }

        return true;
    }
}

// Inicialização dos validadores
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const contactValidator = new FormValidator('contactForm');
        contactForm.addEventListener('submit', (e) => {
            if (!contactValidator.validateContactForm()) {
                e.preventDefault();
            }
        });
    }

    const alertForm = document.getElementById('alertForm');
    if (alertForm) {
        const alertValidator = new FormValidator('alertForm');
        alertForm.addEventListener('submit', (e) => {
            if (!alertValidator.validateAlertForm()) {
                e.preventDefault();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contato-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpa erros anteriores
            clearErrors();
            
            // Valida campos
            const nome = validateNome(form.querySelector('#nome'));
            const email = validateEmail(form.querySelector('#email'));
            const mensagem = validateMensagem(form.querySelector('#mensagem'));
            
            // Se todos os campos são válidos, simula envio
            if (nome && email && mensagem) {
                alert('Mensagem enviada com sucesso!');
                form.reset();
            }
        });
    }
});

// Função para validar nome
function validateNome(input) {
    const value = input.value.trim();
    const errorSpan = input.nextElementSibling;
    
    if (value.length < 3) {
        showError(input, errorSpan, 'O nome deve ter pelo menos 3 caracteres');
        return false;
    }
    
    return true;
}

// Função para validar email
function validateEmail(input) {
    const value = input.value.trim();
    const errorSpan = input.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showError(input, errorSpan, 'Digite um e-mail válido');
        return false;
    }
    
    return true;
}

// Função para validar mensagem
function validateMensagem(input) {
    const value = input.value.trim();
    const errorSpan = input.nextElementSibling;
    
    if (value.length < 10) {
        showError(input, errorSpan, 'A mensagem deve ter pelo menos 10 caracteres');
        return false;
    }
    
    return true;
}

// Função para mostrar erro
function showError(input, errorSpan, message) {
    input.style.border = '2px solid var(--cor-alerta)';
    errorSpan.innerHTML = message;
    errorSpan.style.display = 'block';
}

// Função para limpar erros
function clearErrors() {
    const inputs = document.querySelectorAll('.contato-form input, .contato-form textarea');
    const errorSpans = document.querySelectorAll('.erro');
    
    inputs.forEach(input => {
        input.style.border = '1px solid #ccc';
    });
    
    errorSpans.forEach(span => {
        span.innerHTML = '';
        span.style.display = 'none';
    });
}

// Validação em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.contato-form input, .contato-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorSpan = this.nextElementSibling;
            
            if (this.value.trim() !== '') {
                this.style.border = '1px solid #ccc';
                errorSpan.style.display = 'none';
            }
        });
    });
}); 

//parte do script de validação:
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contatoForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemInput = document.getElementById('mensagem');

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function mostrarErro(input, mensagem) {
        const erroElement = document.getElementById(input.id + 'Erro');
        erroElement.textContent = mensagem;
        erroElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
    }

    function limparErro(input) {
        const erroElement = document.getElementById(input.id + 'Erro');
        erroElement.style.display = 'none';
        input.style.borderColor = '#e0e0e0';
    }

    function validarCampo(input, validacao) {
        if (!validacao(input.value)) {
            mostrarErro(input, input.dataset.mensagemErro);
            return false;
        }
        limparErro(input);
        return true;
    }

    nomeInput.dataset.mensagemErro = 'Por favor, insira seu nome.';
    emailInput.dataset.mensagemErro = 'Por favor, insira um e-mail válido.';
    mensagemInput.dataset.mensagemErro = 'Por favor, insira sua mensagem.';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valido = true;

        // Validação do nome
        if (!validarCampo(nomeInput, value => value.trim() !== '')) {
            valido = false;
        }

        // Validação do email
        if (!validarCampo(emailInput, validarEmail)) {
            valido = false;
        }

        // Validação da mensagem
        if (!validarCampo(mensagemInput, value => value.trim() !== '')) {
            valido = false;
        }

        if (valido) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        }
    });

    // Validação em tempo real
    [nomeInput, emailInput, mensagemInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                if (this.type === 'email' && !validarEmail(this.value)) {
                    mostrarErro(this, 'Por favor, insira um e-mail válido.');
                } else {
                    limparErro(this);
                }
            }
        });
    });
});
  