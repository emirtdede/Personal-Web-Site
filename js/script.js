// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links=> {
                links.classList.remove('active');
                const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }); 
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to use animation that repeats on scroll use this
        // else {
        //     sec.classList.remove('show-animate');
        // }
    });


    // sticky header
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

// --- Language Switcher Logic ---
const langToggle = document.getElementById('lang-toggle');

function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('preferred-language', lang);
    
    // Update input placeholders dynamically based on language
    const placeholders = {
        tr: {
            name: "Ad Soyad",
            email: "E-posta Adresi",
            phone: "Telefon Numarası",
            subject: "E-posta Konusu",
            message: "Mesajınız"
        },
        en: {
            name: "Full Name",
            email: "Email Address",
            phone: "Mobile Number",
            subject: "Email Subject",
            message: "Your Message"
        }
    };

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const phoneInput = document.getElementById('form-phone');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    if (nameInput) nameInput.placeholder = placeholders[lang].name;
    if (emailInput) emailInput.placeholder = placeholders[lang].email;
    if (phoneInput) phoneInput.placeholder = placeholders[lang].phone;
    if (subjectInput) subjectInput.placeholder = placeholders[lang].subject;
    if (messageInput) messageInput.placeholder = placeholders[lang].message;
}

// Event Listeners for language toggle
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const currentLang = document.documentElement.getAttribute('lang') || 'tr';
        const newLang = currentLang === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
    });
}

function initSpotlightReveal() {
    const revealers = document.querySelectorAll('.spotlight-reveal');

    revealers.forEach(reveal => {
        const interactionArea = reveal.closest('.home') || reveal;
        let frameId = 0;
        let nextX = 50;
        let nextY = 50;

        const applyMaskPosition = () => {
            reveal.style.setProperty('--x', `${nextX}%`);
            reveal.style.setProperty('--y', `${nextY}%`);
            frameId = 0;
        };

        const queueMaskPosition = (event) => {
            const rect = reveal.getBoundingClientRect();
            nextX = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
            nextY = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));
            reveal.classList.add('is-active');
            interactionArea.classList.add('is-spotlight-active');

            if (!frameId) {
                frameId = requestAnimationFrame(applyMaskPosition);
            }
        };

        const resetMaskPosition = () => {
            nextX = 50;
            nextY = 50;
            reveal.classList.remove('is-active');
            interactionArea.classList.remove('is-spotlight-active');

            if (!frameId) {
                frameId = requestAnimationFrame(applyMaskPosition);
            }
        };

        const resetWhenOutside = (event) => {
            if (!reveal.classList.contains('is-active')) return;

            const rect = reveal.getBoundingClientRect();
            const isOutside =
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;

            if (isOutside) {
                resetMaskPosition();
            }
        };

        const moveEvent = window.PointerEvent ? 'pointermove' : 'mousemove';
        const leaveEvent = window.PointerEvent ? 'pointerleave' : 'mouseleave';

        interactionArea.addEventListener(moveEvent, queueMaskPosition, { passive: true });
        interactionArea.addEventListener(leaveEvent, resetMaskPosition);
        document.addEventListener(moveEvent, resetWhenOutside, { passive: true });
    });
}

// Load saved language on startup
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language') || 'tr';
    setLanguage(savedLang);
    initSpotlightReveal();
    
    // Set dynamic year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Set dynamic age (Born 14 July 2001)
    const birthDate = new Date('2001-07-14');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.querySelectorAll('.calculated-age').forEach(el => {
        el.textContent = age;
    });
});

// --- Custom Alert Helper ---
function showCustomAlert(type, message) {
    const alertOverlay = document.getElementById('custom-alert');
    const alertBox = document.getElementById('custom-alert-box');
    const alertMsgEl = document.getElementById('custom-alert-message');
    const successIcon = document.getElementById('alert-icon-success');
    const errorIcon = document.getElementById('alert-icon-error');
    const trTitle = document.getElementById('alert-title-tr');
    const enTitle = document.getElementById('alert-title-en');

    if (!alertOverlay || !alertBox || !alertMsgEl) return;

    alertMsgEl.textContent = message;

    if (type === 'success') {
        alertBox.classList.remove('error-box');
        if (successIcon) successIcon.style.display = 'inline-block';
        if (errorIcon) errorIcon.style.display = 'none';
        if (trTitle) trTitle.textContent = 'Başarılı!';
        if (enTitle) enTitle.textContent = 'Success!';
    } else {
        alertBox.classList.add('error-box');
        if (successIcon) successIcon.style.display = 'none';
        if (errorIcon) errorIcon.style.display = 'inline-block';
        if (trTitle) trTitle.textContent = 'Hata!';
        if (enTitle) enTitle.textContent = 'Error!';
    }

    alertOverlay.classList.add('show');
}

// Close custom alert event listeners
const closeAlertBtn = document.getElementById('custom-alert-btn');
const alertOverlay = document.getElementById('custom-alert');
if (closeAlertBtn && alertOverlay) {
    closeAlertBtn.addEventListener('click', () => {
        alertOverlay.classList.remove('show');
    });

    // Close on clicking outside the alert box
    alertOverlay.addEventListener('click', (e) => {
        if (e.target === alertOverlay) {
            alertOverlay.classList.remove('show');
        }
    });
}

// File Input Event Handlers
const fileInput = document.getElementById('form-file');
const fileUploadInfo = document.getElementById('file-upload-info');
const fileNameSpan = document.getElementById('file-name');
const removeFileBtn = document.getElementById('remove-file-btn');
const fileLabelTextTr = document.getElementById('file-label-text-tr');
const fileLabelTextEn = document.getElementById('file-label-text-en');

if (fileInput && fileUploadInfo && fileNameSpan) {
    fileInput.addEventListener('change', (e) => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const maxSizeBytes = 10 * 1024 * 1024; // 10MB limit
            
            if (file.size > maxSizeBytes) {
                const sizeErrorMessages = {
                    tr: "Seçtiğiniz dosya çok büyük. Maksimum dosya boyutu 10 MB olmalıdır.",
                    en: "The selected file is too large. Maximum file size is 10 MB."
                };
                const currentLang = document.documentElement.getAttribute('lang') || 'tr';
                showCustomAlert('error', sizeErrorMessages[currentLang]);
                
                // Clear the input selection
                fileInput.value = '';
                fileUploadInfo.style.display = 'none';
                if (fileLabelTextTr) fileLabelTextTr.textContent = 'Dosya Ekle (İsteğe Bağlı)';
                if (fileLabelTextEn) fileLabelTextEn.textContent = 'Attach File (Optional)';
                return;
            }

            fileNameSpan.textContent = file.name + ` (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
            fileUploadInfo.style.display = 'flex';
            if (fileLabelTextTr) fileLabelTextTr.textContent = 'Dosyayı Değiştir';
            if (fileLabelTextEn) fileLabelTextEn.textContent = 'Change File';
        } else {
            fileUploadInfo.style.display = 'none';
            if (fileLabelTextTr) fileLabelTextTr.textContent = 'Dosya Ekle (İsteğe Bağlı)';
            if (fileLabelTextEn) fileLabelTextEn.textContent = 'Attach File (Optional)';
        }
    });
}

if (removeFileBtn && fileInput && fileUploadInfo) {
    removeFileBtn.addEventListener('click', () => {
        fileInput.value = '';
        fileUploadInfo.style.display = 'none';
        if (fileLabelTextTr) fileLabelTextTr.textContent = 'Dosya Ekle (İsteğe Bağlı)';
        if (fileLabelTextEn) fileLabelTextEn.textContent = 'Attach File (Optional)';
    });
}

// Contact Form Submission Handler
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = new FormData(contactForm);
        const currentLang = document.documentElement.getAttribute('lang') || 'tr';
        
        fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                const messages = {
                    tr: "Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğim.",
                    en: "Your message has been sent successfully! I will get back to you as soon as possible."
                };
                showCustomAlert('success', messages[currentLang]);
                contactForm.reset();
                if (fileUploadInfo) fileUploadInfo.style.display = 'none';
                if (fileLabelTextTr) fileLabelTextTr.textContent = 'Dosya Ekle (İsteğe Bağlı)';
                if (fileLabelTextEn) fileLabelTextEn.textContent = 'Attach File (Optional)';
            } else {
                const errorMessages = {
                    tr: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
                    en: "An error occurred while sending your message. Please try again."
                };
                showCustomAlert('error', errorMessages[currentLang]);
            }
        }).catch(error => {
            const errorMessages = {
                tr: "Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edin.",
                en: "A connection error occurred. Please check your internet connection."
            };
            showCustomAlert('error', errorMessages[currentLang]);
        });
    });
}
