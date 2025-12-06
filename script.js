// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Format phone number input - allow standard phone characters
function formatPhoneInput(input) {
    // Allow digits, spaces, dashes, parentheses, plus sign, and dots
    // Remove any other characters
    input.value = input.value.replace(/[^\d\s\-\(\)\+\.]/g, '');
}

// Apply standard phone number formatting to phone inputs
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    // Format on input event (handles typing, paste, etc.)
    input.addEventListener('input', function() {
        formatPhoneInput(this);
    });
    
    // Allow standard phone number characters on keypress
    input.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which || e.keyCode);
        // Allow digits, space, dash, parentheses, plus, dot, and backspace/delete
        if (!/[0-9\s\-\(\)\+\.]/.test(char) && e.which !== 8 && e.which !== 0) {
            e.preventDefault();
        }
    });
    
    // Handle paste events - clean the pasted text
    input.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const cleaned = pastedText.replace(/[^\d\s\-\(\)\+\.]/g, '');
        this.value = cleaned;
    });
    
    // Set placeholder for better UX
    if (!input.placeholder) {
        input.placeholder = '050-1234567';
    }
});

// Form validation functions
function validatePhone(phone) {
    if (!phone) return false;
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    // Israeli phone numbers: 9-10 digits (mobile: 9, landline: 9-10)
    return digitsOnly.length >= 9 && digitsOnly.length <= 10;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function validateField(input, errorElement) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Check if required field is empty
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'שדה חובה';
    }
    // Validate name fields
    else if (input.type === 'text' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'השם חייב להכיל לפחות 2 תווים';
        } else if (value.length > 50) {
            isValid = false;
            errorMessage = 'השם לא יכול להכיל יותר מ-50 תווים';
        }
    }
    // Validate phone fields
    else if (input.type === 'tel' && value) {
        if (!validatePhone(value)) {
            isValid = false;
            errorMessage = 'מספר טלפון לא תקין. אנא הזן מספר טלפון ישראלי תקין';
        }
    }
    // Validate email fields
    else if (input.type === 'email' && value) {
        if (!validateEmail(value)) {
            isValid = false;
            errorMessage = 'כתובת אימייל לא תקינה';
        }
    }
    // Validate textarea
    else if (input.tagName === 'TEXTAREA' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'סיבת ההפניה חייבת להכיל לפחות 10 תווים';
        } else if (value.length > 1000) {
            isValid = false;
            errorMessage = 'סיבת ההפניה לא יכולה להכיל יותר מ-1000 תווים';
        }
    }

    if (isValid) {
        clearError(input, errorElement);
        input.classList.add('valid');
    } else {
        showError(input, errorElement, errorMessage);
        input.classList.remove('valid');
    }

    return isValid;
}

// Add real-time validation to all form fields
const referralForm = document.getElementById('referralForm');
if (referralForm) {
    const formFields = referralForm.querySelectorAll('input, textarea');
    
    formFields.forEach(field => {
        const errorElement = document.getElementById(field.id + 'Error');
        
        // Validate on blur (when user leaves the field)
        field.addEventListener('blur', function() {
            validateField(this, errorElement);
        });
        
        // Clear error on input (real-time feedback)
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this, errorElement);
            }
        });
    });

    // Form submission with validation
    referralForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all fields
        formFields.forEach(field => {
            const errorElement = document.getElementById(field.id + 'Error');
            if (!validateField(field, errorElement)) {
                isFormValid = false;
            }
        });
        
        // If form is valid, submit
        if (isFormValid) {
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Create mailto link with form data
            const subject = encodeURIComponent('הפניית מטופל - ' + data.patientName);
            const body = encodeURIComponent(
                'שם המטופל: ' + data.patientName + '\n' +
                'שם המפנה: ' + data.referrerName + '\n' +
                'טלפון המפנה: ' + data.referrerPhone + '\n' +
                'אימייל המפנה: ' + data.referrerEmail + '\n' +
                'טלפון המטופל: ' + (data.patientPhone || 'לא צוין') + '\n\n' +
                'סיבת ההפניה:\n' + data.reason
            );
            
            // Open email client
            window.location.href = 'mailto:aviv44556@gmail.com?subject=' + subject + '&body=' + body;
            
            // Show success message
            alert('תודה! הטופס נשלח. נפתחת תוכנת הדואר האלקטרוני שלך.');
            
            // Reset form
            this.reset();
            formFields.forEach(field => {
                field.classList.remove('error', 'valid');
                const errorElement = document.getElementById(field.id + 'Error');
                if (errorElement) {
                    clearError(field, errorElement);
                }
            });
        } else {
            // Scroll to first error
            const firstError = this.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
}

