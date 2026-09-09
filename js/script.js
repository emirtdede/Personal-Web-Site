// ==========================================
// Emir Dede Personal Portfolio — Core Scripts
// ==========================================

// --- Navigation & Mobile Menu ---
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    const toggleMenu = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };

    menuIcon.addEventListener('click', toggleMenu);
    menuIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

// Close mobile navbar when clicking any nav link
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (menuIcon) menuIcon.classList.remove('bx-x');
        if (navbar) navbar.classList.remove('active');
    });
});

// --- Modern Scroll & Section Observer ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// High-performance IntersectionObserver for section animations and scroll-spy
function checkAllSectionsInView() {
    sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            sec.classList.add('show-animate');
        }
    });
}

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
                const id = entry.target.getAttribute('id');
                if (id) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(sec => sectionObserver.observe(sec));
}

// Immediate check on load and hash jump
checkAllSectionsInView();
window.addEventListener('hashchange', checkAllSectionsInView);

// Lightweight RAF scroll handler for sticky header & footer
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Sticky Header
            if (header) {
                header.classList.toggle('sticky', scrollY > 80);
            }

            // Footer animation
            if (footer) {
                const atBottom = window.innerHeight + scrollY >= document.scrollingElement.scrollHeight - 100;
                footer.classList.toggle('show-animate', atBottom);
            }

            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

// --- Language Switcher Logic ---
const langToggle = document.getElementById('lang-toggle');

function setLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('preferred-language', lang);
    
    // Dynamic Form & Search Placeholders
    const placeholders = {
        tr: {
            name: "Ad Soyad",
            email: "E-posta Adresi",
            phone: "Telefon Numarası",
            subject: "E-posta Konusu",
            message: "Mesajınız",
            search: "Proje veya teknoloji ara..."
        },
        en: {
            name: "Full Name",
            email: "Email Address",
            phone: "Mobile Number",
            subject: "Email Subject",
            message: "Your Message",
            search: "Search projects or tech..."
        }
    };

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const phoneInput = document.getElementById('form-phone');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const searchInput = document.getElementById('project-search');

    if (nameInput) nameInput.placeholder = placeholders[lang].name;
    if (emailInput) emailInput.placeholder = placeholders[lang].email;
    if (phoneInput) phoneInput.placeholder = placeholders[lang].phone;
    if (subjectInput) subjectInput.placeholder = placeholders[lang].subject;
    if (messageInput) messageInput.placeholder = placeholders[lang].message;
    if (searchInput) searchInput.placeholder = placeholders[lang].search;
}

if (langToggle) {
    const handleToggle = () => {
        const currentLang = document.documentElement.getAttribute('lang') || 'tr';
        const newLang = currentLang === 'tr' ? 'en' : 'tr';
        setLanguage(newLang);
    };

    langToggle.addEventListener('click', handleToggle);
    langToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
        }
    });
}

// --- Project Filtering & Dynamic Search ---
function initProjectFilterAndSearch() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');
    const emptyState = document.getElementById('projects-empty');

    if (!projectCards.length) return;

    // Dynamically calculate and update counts in badge pills
    filterButtons.forEach(btn => {
        const filter = btn.dataset.filter;
        const countSpan = btn.querySelector('.filter-count');
        if (countSpan) {
            if (filter === 'all') {
                countSpan.textContent = projectCards.length;
            } else {
                let count = 0;
                projectCards.forEach(card => {
                    const categories = (card.dataset.category || '').split(' ');
                    if (categories.includes(filter)) count++;
                });
                countSpan.textContent = count;
            }
        }
    });

    let currentFilter = 'all';
    let searchQuery = '';

    const applyFilterAndSearch = () => {
        let visibleCount = 0;

        projectCards.forEach(card => {
            const categories = (card.dataset.category || '').split(' ');
            const cardText = card.textContent.toLowerCase();

            const matchesCategory = (currentFilter === 'all') || categories.includes(currentFilter);
            const matchesSearch = (!searchQuery) || cardText.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.classList.remove('is-hidden');
                card.classList.add('is-visible');
                visibleCount++;
            } else {
                card.classList.add('is-hidden');
                card.classList.remove('is-visible');
            }
        });

        if (emptyState) {
            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    };

    // Filter button click events
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            currentFilter = btn.dataset.filter || 'all';
            applyFilterAndSearch();
        });
    });

    // Search input event with debounce
    if (searchInput) {
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                searchQuery = e.target.value.trim().toLowerCase();
                applyFilterAndSearch();
            }, 120);
        });
    }
}

// --- Interactive Hero Spotlight Reveal Effect ---
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

    alertOverlay.addEventListener('click', (e) => {
        if (e.target === alertOverlay) {
            alertOverlay.classList.remove('show');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && alertOverlay.classList.contains('show')) {
            alertOverlay.classList.remove('show');
        }
    });
}

// --- File Upload & Form Validation ---
const fileInput = document.getElementById('form-file');
const fileUploadInfo = document.getElementById('file-upload-info');
const fileNameSpan = document.getElementById('file-name');
const removeFileBtn = document.getElementById('remove-file-btn');
const fileLabelTextTr = document.getElementById('file-label-text-tr');
const fileLabelTextEn = document.getElementById('file-label-text-en');

if (fileInput && fileUploadInfo && fileNameSpan) {
    fileInput.addEventListener('change', () => {
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

// --- Contact Form Submission Handler (AJAX) ---
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = new FormData(contactForm);
        const currentLang = document.documentElement.getAttribute('lang') || 'tr';
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
        }

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
        }).catch(() => {
            const errorMessages = {
                tr: "Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edin.",
                en: "A connection error occurred. Please check your internet connection."
            };
            showCustomAlert('error', errorMessages[currentLang]);
        }).finally(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalText;
            }
        });
    });
}

// --- Initialize on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language') || 'tr';
    setLanguage(savedLang);
    initSpotlightReveal();
    initProjectFilterAndSearch();
    
    // Dynamic year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Dynamic age (Born 14 July 2001)
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
