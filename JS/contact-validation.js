/* ========================================
   CONTACT FORM VALIDATION
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form form');

    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Validation rules
    const validations = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
            messages: {
                required: 'Please enter your name',
                minLength: 'Name must be at least 2 characters',
                maxLength: 'Name cannot exceed 50 characters',
                pattern: 'Name can only contain letters, spaces, hyphens and apostrophes'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'Please enter your email address',
                pattern: 'Please enter a valid email address'
            }
        },
        subject: {
            required: false,
            maxLength: 100,
            messages: {
                maxLength: 'Subject cannot exceed 100 characters'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            messages: {
                required: 'Please enter your message',
                minLength: 'Message must be at least 10 characters',
                maxLength: 'Message cannot exceed 1000 characters'
            }
        }
    };

    // Create error message elements
    function createErrorElement(input) {
        let errorEl = input.parentElement.querySelector('.error-message');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            input.parentElement.appendChild(errorEl);
        }
        return errorEl;
    }

    // Validate a single field
    function validateField(input, rules) {
        const value = input.value.trim();
        const errorEl = createErrorElement(input);
        let isValid = true;
        let errorMessage = '';

        // Check required
        if (rules.required && !value) {
            isValid = false;
            errorMessage = rules.messages.required;
        }
        // Check minLength
        else if (rules.minLength && value.length < rules.minLength && value.length > 0) {
            isValid = false;
            errorMessage = rules.messages.minLength;
        }
        // Check maxLength
        else if (rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = rules.messages.maxLength;
        }
        // Check pattern
        else if (rules.pattern && value && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.messages.pattern;
        }

        // Update UI
        if (!isValid) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            errorEl.textContent = errorMessage;
            errorEl.style.display = 'block';
        } else {
            input.classList.remove('invalid');
            if (value) {
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
            }
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        }

        return isValid;
    }

    // Add real-time validation on blur
    if (nameInput) {
        nameInput.addEventListener('blur', () => validateField(nameInput, validations.name));
        nameInput.addEventListener('input', () => {
            if (nameInput.classList.contains('invalid')) {
                validateField(nameInput, validations.name);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', () => validateField(emailInput, validations.email));
        emailInput.addEventListener('input', () => {
            if (emailInput.classList.contains('invalid')) {
                validateField(emailInput, validations.email);
            }
        });
    }

    if (subjectInput) {
        subjectInput.addEventListener('blur', () => validateField(subjectInput, validations.subject));
        subjectInput.addEventListener('input', () => {
            if (subjectInput.classList.contains('invalid')) {
                validateField(subjectInput, validations.subject);
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', () => validateField(messageInput, validations.message));
        messageInput.addEventListener('input', () => {
            if (messageInput.classList.contains('invalid')) {
                validateField(messageInput, validations.message);
            }
        });

        // Character counter for message
        const counterEl = document.createElement('span');
        counterEl.className = 'char-counter';
        counterEl.textContent = '0 / 1000';
        messageInput.parentElement.appendChild(counterEl);

        messageInput.addEventListener('input', () => {
            const count = messageInput.value.length;
            counterEl.textContent = `${count} / 1000`;
            if (count > 1000) {
                counterEl.classList.add('over-limit');
            } else {
                counterEl.classList.remove('over-limit');
            }
        });
    }

    // Form submission validation
    form.addEventListener('submit', function (e) {
        let isFormValid = true;

        // Validate all fields
        if (nameInput && !validateField(nameInput, validations.name)) {
            isFormValid = false;
        }
        if (emailInput && !validateField(emailInput, validations.email)) {
            isFormValid = false;
        }
        if (subjectInput && !validateField(subjectInput, validations.subject)) {
            isFormValid = false;
        }
        if (messageInput && !validateField(messageInput, validations.message)) {
            isFormValid = false;
        }



        // Check hCaptcha if it exists
        const hcaptchaResponse = document.querySelector('[name="h-captcha-response"]');
        if (hcaptchaResponse && !hcaptchaResponse.value) {
            isFormValid = false;
            const captchaContainer = document.querySelector('.h-captcha');
            if (captchaContainer) {
                let captchaError = captchaContainer.parentElement.querySelector('.captcha-error');
                if (!captchaError) {
                    captchaError = document.createElement('span');
                    captchaError.className = 'error-message captcha-error';
                    captchaContainer.parentElement.appendChild(captchaError);
                }
                captchaError.textContent = 'Please complete the captcha';
                captchaError.style.display = 'block';
            }
        }

        if (!isFormValid) {
            e.preventDefault();
            // Scroll to first error
            const firstError = form.querySelector('.invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
});
