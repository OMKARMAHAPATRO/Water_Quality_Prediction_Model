// UI Enhancement Script - Enhanced for Result Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const themeToggle = document.getElementById('themeToggle');
    const shareBtn = document.getElementById('shareBtn');
    
    // Theme Toggle (both pages)
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
        
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            const isDark = body.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });
    }
    
    // Form logic (index page only)
    if (form) {
        const submitBtn = document.getElementById('submitBtn');
        const inputs = form.querySelectorAll('input[type="number"]');
        
        // Validation Rules
        const validationRules = {
            ph: { min: 0, max: 14 },
            hardness: { min: 0, max: 500 },
            solids: { min: 0, max: 10000 },
            chloramines: { min: 0, max: 20 },
            sulfate: { min: 0, max: 500 },
            conductivity: { min: 0, max: 2000 },
            organicCarbon: { min: 0, max: 30 },
            trihalomethanes: { min: 0, max: 120 },
            turbidity: { min: 0, max: 10 }
        };
        
        function validateInput(input) {
            const value = parseFloat(input.value);
            const name = input.name;
            const rules = validationRules[name];
            
            if (input.value === '') {
                input.classList.remove('valid', 'invalid');
                return false;
            }
            
            if (value < rules.min || value > rules.max) {
                input.classList.add('invalid');
                input.classList.remove('valid');
                return false;
            } else {
                input.classList.add('valid');
                input.classList.remove('invalid');
                return true;
            }
        }
        
        inputs.forEach(input => {
            input.addEventListener('input', () => validateInput(input));
            input.addEventListener('blur', () => validateInput(input));
        });
        
        form.addEventListener('submit', (e) => {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) isValid = false;
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please correct invalid inputs (check red borders).');
                return false;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading"></span> Predicting...';
        });
        
        // Animate inputs
        inputs.forEach((input, index) => {
            input.style.opacity = '0';
            input.style.transform = 'translateY(20px)';
            setTimeout(() => {
                input.style.transition = 'all 0.5s ease';
                input.style.opacity = '1';
                input.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Result page share functionality
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            const resultText = document.querySelector('.result-text').textContent;
            const confidence = document.querySelector('strong').textContent.replace('%', '');
            const shareText = `Water Quality Prediction: ${resultText} (Confidence: ${confidence}%)`;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareText).then(() => {
                    const originalText = shareBtn.innerHTML;
                    shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    shareBtn.style.background = 'var(--success)';
                    setTimeout(() => {
                        shareBtn.innerHTML = originalText;
                        shareBtn.style.background = '';
                    }, 2000);
                });
            } else {
                // Fallback
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Copied to clipboard!');
            }
        });
    }
    
    // Animate confidence bar
    const confidenceFill = document.querySelector('.confidence-fill');
    if (confidenceFill) {
        confidenceFill.style.width = '0%';
        setTimeout(() => {
            confidenceFill.style.width = confidenceFill.style.width;
        }, 500);
    }
});


