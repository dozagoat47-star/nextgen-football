// ============================================
// NEXTGEN FOOTBALL - SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- NAVBAR SCROLL EFEKTİ ----------
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ---------- MOBİL MENÜ ----------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // ---------- SCROLL REVEAL ----------
    const revealElements = document.querySelectorAll(
        '.about-card, .feature-item, .vision-card, .section-header'
    );
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            revealObserver.observe(el);
        });
    }
    
    // ---------- SMOOTH SCROLL ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ---------- HERO STATS SAYAÇ ----------
    const floatStats = document.querySelectorAll('.float-stat-num');
    
    floatStats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 50);
    });
    
    // ---------- VISION CHART BAR ANIMasyonu ----------
    const chartBars = document.querySelectorAll('.chart-bar');
    
    if (chartBars.length > 0) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    chartBars.forEach((bar, index) => {
                        const targetHeight = bar.style.getPropertyValue('--h');
                        bar.style.height = '0%';
                        setTimeout(() => {
                            bar.style.transition = 'height 0.8s ease-out';
                            bar.style.height = targetHeight;
                        }, index * 100);
                    });
                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const visionChart = document.querySelector('.vision-chart');
        if (visionChart) {
            chartObserver.observe(visionChart);
        }
    }
    
    // ============================================
    // POZİSYON SEÇME MODAL (index.html)
    // ============================================
    
    const positionModal = document.getElementById('positionModal');
    const modalClose = document.getElementById('modalClose');
    const startBtn = document.getElementById('startBtn');
    const startBtnCta = document.getElementById('startBtnCta');
    const positionCards = document.querySelectorAll('.position-card');
    const continueBtn = document.getElementById('continueBtn');
    
    let selectedPosition = null;
    
    function openModal() {
        if (positionModal) {
            positionModal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }
    
    function closeModal() {
        if (positionModal) {
            positionModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', openModal);
    }
    
    if (startBtnCta) {
        startBtnCta.addEventListener('click', openModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (positionModal) {
        positionModal.addEventListener('click', function(e) {
            if (e.target === positionModal) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && positionModal && positionModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    positionCards.forEach(card => {
        card.addEventListener('click', function() {
            positionCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            selectedPosition = this.getAttribute('data-position');
            
            if (continueBtn) {
                continueBtn.disabled = false;
                continueBtn.textContent = 'Devam Et →';
            }
        });
    });
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            if (selectedPosition) {
                const positionPages = {
                    'kaleci': 'goalkeeper.html',
                    'stoper': 'defender.html',
                    'bek': 'defender.html',
                    'ortasaha': 'midfielder.html',
                    'kanat': 'winger.html',
                    'santrafor': 'forward.html'
                };
                
                const targetPage = positionPages[selectedPosition];
                
                if (targetPage && selectedPosition === 'kaleci') {
                    window.location.href = targetPage;
                } else if (targetPage) {
                    const positionNames = {
                        'kaleci': 'Kaleci',
                        'stoper': 'Stoper',
                        'bek': 'Bek',
                        'ortasaha': 'Orta Saha',
                        'kanat': 'Kanat',
                        'santrafor': 'Santrafor'
                    };
                    alert(`${positionNames[selectedPosition]} sayfası yakında hazırlanacak! 🚧\n\nŞu an sadece Kaleci sayfası aktif.`);
                    closeModal();
                }
            }
        });
    }
    
    // ============================================
// AI WIZARD - KALECİ ANTRENMAN PROGRAMI (GERÇEK API)
// ============================================

const aiWizard = document.getElementById('aiWizard');
const progressBar = document.getElementById('progressBar');
const aiThinking = document.getElementById('aiThinking');
const resultStep = document.getElementById('resultStep');
const resultSummary = document.getElementById('resultSummary');
const resultProgram = document.getElementById('resultProgram');
const restartBtn = document.getElementById('restartWizard');

let currentStep = 1;
const answers = {};

const statusMessages = [
    "Cevapların değerlendiriliyor...",
    "Fiziksel profilin analiz ediliyor...",
    "Teknik eksiklikler belirleniyor...",
    "Haftalık program optimize ediliyor...",
    "Son kontroller yapılıyor... (Bu işlem biraz zaman alabilir, lütfen bekleyin)"
];

function updateProgress() {
    const percent = (currentStep / 5) * 100;
    if (progressBar) {
        progressBar.style.width = percent + '%';
    }
}

function showStep(stepNum) {
    const steps = aiWizard.querySelectorAll('.wizard-step[data-step]');
    steps.forEach(step => step.classList.remove('active'));
    if (aiThinking) aiThinking.classList.remove('active');
    if (resultStep) resultStep.classList.remove('active');
    
    if (stepNum <= 5) {
        const target = aiWizard.querySelector(`.wizard-step[data-step="${stepNum}"]`);
        if (target) target.classList.add('active');
    }
    updateProgress();
}

function showThinking() {
    const steps = aiWizard.querySelectorAll('.wizard-step[data-step]');
    steps.forEach(step => step.classList.remove('active'));
    if (resultStep) resultStep.classList.remove('active');
    if (aiThinking) aiThinking.classList.add('active');
    if (progressBar) progressBar.style.width = '100%';
    
    let msgIndex = 0;
    if (aiStatus) aiStatus.textContent = statusMessages[0];
    
    const statusInterval = setInterval(() => {
        msgIndex++;
        if (msgIndex < statusMessages.length) {
            if (aiStatus) aiStatus.textContent = statusMessages[msgIndex];
        } else {
            clearInterval(statusInterval);
        }
    }, 600);
}

function fetchTrainingPlan() {
    fetch(`${API_BASE_URL}/api/training-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: answers })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            setTimeout(() => {
                if (aiThinking) aiThinking.classList.remove('active');
                if (resultStep) resultStep.classList.add('active');
                if (resultSummary) resultSummary.textContent = data.summary;
                if (resultProgram) resultProgram.innerHTML = data.html;
            }, 1500);
        } else {
            if (aiStatus) aiStatus.textContent = 'Bir hata oluştu.';
        }
    })
    .catch(err => {
        console.error(err);
        if (aiStatus) aiStatus.textContent = 'Sunucuya bağlanılamadı. node server.js çalışıyor mu?';
    });
}

// Tüm option butonlarına tıklama
aiWizard.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const parentStep = this.closest('.wizard-step');
        const stepNum = parentStep.getAttribute('data-step');
        
        if (stepNum === '1' || stepNum === '4') {
            this.classList.toggle('selected');
            
            if (!answers[stepNum]) answers[stepNum] = [];
            const value = this.getAttribute('data-value');
            
            if (this.classList.contains('selected')) {
                if (!answers[stepNum].includes(value)) {
                    answers[stepNum].push(value);
                }
            } else {
                answers[stepNum] = answers[stepNum].filter(v => v !== value);
            }
            
            const nextBtnId = 'step' + stepNum + 'Next';
            const nextBtn = document.getElementById(nextBtnId);
            if (nextBtn) {
                nextBtn.disabled = !(answers[stepNum].length > 0);
            }
        } else {
            parentStep.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            answers[stepNum] = this.getAttribute('data-value');
            
            const nextBtnId = 'step' + stepNum + 'Next';
            const nextBtn = document.getElementById(nextBtnId);
            if (nextBtn) {
                nextBtn.disabled = false;
            }
        }
    });
});

// Step 1 Devam Et
const step1Next = document.getElementById('step1Next');
if (step1Next) {
    step1Next.addEventListener('click', function() {
        if (answers['1'] && answers['1'].length > 0) {
            currentStep = 2;
            showStep(2);
        }
    });
}

// Step 2-4 Devam Et
for (let i = 2; i <= 4; i++) {
    const btn = document.getElementById('step' + i + 'Next');
    if (btn) {
        btn.addEventListener('click', function() {
            currentStep = i + 1;
            showStep(i + 1);
        });
    }
}

// Step 5 Oluştur
const step5Next = document.getElementById('step5Next');
if (step5Next) {
    step5Next.addEventListener('click', function() {
        if (answers['5']) {
            showThinking();
            fetchTrainingPlan();
        }
    });
}

// Yeniden başla
if (restartBtn) {
    restartBtn.addEventListener('click', function() {
        currentStep = 1;
        Object.keys(answers).forEach(key => delete answers[key]);
        aiWizard.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        showStep(1);
        
        // Tüm Devam Et butonlarını devre dışı bırak
        for (let i = 1; i <= 5; i++) {
            const btn = document.getElementById('step' + i + 'Next');
            if (btn) btn.disabled = true;
        }
    });
}
    
    // ============================================
    // KALECİ SAYFASI - SUBNAV SMOOTH SCROLL
    // ============================================
    
    const subnavLinks = document.querySelectorAll('.subnav-link');
    
    subnavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Video kartları z-index
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ============================================
    // HIGHLIGHTS TAB DEĞİŞTİRME
    // ============================================
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Tüm tab butonlarından active kaldır
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Tüm içerikleri gizle
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Hedef içeriği göster
            const targetContent = document.getElementById('tab-' + targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

       // ============================================
    // INTERACTIVE SCENARIO CARDS
    // ============================================
    
    const scenarioCards = document.querySelectorAll('.scenario-card');
    
    scenarioCards.forEach(card => {
        const buttons = card.querySelectorAll('.scenario-btn');
        const resultBox = card.querySelector('.scenario-result');
        const resultCorrect = card.querySelector('.result-correct');
        const resultWrong = card.querySelector('.result-wrong');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const answerType = this.getAttribute('data-answer');
                const isGood = answerType === 'good';
                
                // Tüm butonları devre dışı bırak
                buttons.forEach(b => {
                    b.classList.add('disabled');
                    const btnType = b.getAttribute('data-answer');
                    
                    // Good cevapların hepsi yeşil
                    if (btnType === 'good') {
                        b.classList.add('correct-selected');
                    }
                    
                    // Seçilen risky ise sarı
                    if (b === this && btnType === 'risky') {
                        b.classList.add('risky-selected');
                    }
                });
                
                // Sonucu göster
                if (resultBox) {
                    resultBox.classList.add('show');
                }
                
                if (isGood) {
                    if (resultCorrect) resultCorrect.classList.add('show');
                    if (resultWrong) resultWrong.classList.remove('show');
                } else {
                    // Risky seçildi - uyarı mesajı
                    if (resultWrong) {
                        resultWrong.classList.add('show');
                        const wrongTitle = resultWrong.querySelector('strong');
                        const wrongText = resultWrong.querySelector('p');
                        if (wrongTitle) {
                            wrongTitle.textContent = '⚠️ Riskli Seçim';
                        }
                        if (wrongText) {
                            wrongText.textContent = 'Bu seçim riskli ama bazı durumlarda işe yarayabilir. Güvenli pas seçenekleri her zaman daha iyidir.';
                        }
                    }
                    if (resultCorrect) resultCorrect.classList.remove('show');
                }
            });
        });
    });


    // ============================================
// AI KALECİ ANALİZ MODAL — GERÇEK API
// ============================================

const analyzeModal = document.getElementById('analyzeModal');
const analyzeModalClose = document.getElementById('analyzeModalClose');
const closeAnalyzeBtn = document.getElementById('closeAnalyzeBtn');
const analyzeThinking = document.getElementById('analyzeThinking');
const analyzeResult = document.getElementById('analyzeResult');
const analyzeStatus = document.getElementById('analyzeStatus');
const analyzeProgressBar = document.getElementById('analyzeProgressBar');
const analyzeTitle = document.querySelector('.analyze-result h3');
const analyzeContent = document.querySelector('.analyze-content');
const analyzeBtns = document.querySelectorAll('.btn-analyze[data-keeper]');

const API_BASE_URL = 'http://localhost:3000';

const analyzeMessages = [
    "Videoyu inceliyorum...",
    "Pozisyon alışları taranıyor...",
    "Teknik detaylar analiz ediliyor...",
    "Rapor hazırlanıyor... (Bu işlem biraz zaman alabilir, lütfen bekleyin)"
];

function openAnalyzeModal(keeperName) {
    if (!analyzeModal) return;
    
    analyzeModal.classList.add('active');
    document.body.classList.add('modal-open');
    
    if (analyzeThinking) analyzeThinking.style.display = 'block';
    if (analyzeResult) analyzeResult.style.display = 'none';
    if (analyzeProgressBar) analyzeProgressBar.style.width = '0%';
    
    let step = 0;
    if (analyzeStatus) analyzeStatus.textContent = analyzeMessages[0];
    
    const interval = setInterval(() => {
        step++;
        if (step < analyzeMessages.length) {
            if (analyzeStatus) analyzeStatus.textContent = analyzeMessages[step];
            if (analyzeProgressBar) analyzeProgressBar.style.width = ((step + 1) / analyzeMessages.length * 100) + '%';
        } else {
            clearInterval(interval);
        }
    }, 1500);
    
    // Gerçek API çağrısı
    fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keeperName: keeperName })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            setTimeout(() => {
                if (analyzeThinking) analyzeThinking.style.display = 'none';
                if (analyzeResult) {
                    analyzeResult.style.display = 'block';
                    analyzeResult.style.animation = 'fadeIn 0.5s ease';
                }
                if (analyzeTitle) analyzeTitle.textContent = data.title;
                if (analyzeContent) analyzeContent.innerHTML = data.html;
            }, 500);
        } else {
            if (analyzeStatus) analyzeStatus.textContent = 'Bir hata oluştu, tekrar deneyin.';
        }
    })
    .catch(err => {
        console.error(err);
        if (analyzeStatus) analyzeStatus.textContent = 'Sunucuya bağlanılamadı. Backend çalışıyor mu?';
    });
}

function closeAnalyzeModal() {
    if (!analyzeModal) return;
    analyzeModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

analyzeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const keeper = this.getAttribute('data-keeper');
        openAnalyzeModal(keeper);
    });
});

if (analyzeModalClose) {
    analyzeModalClose.addEventListener('click', closeAnalyzeModal);
}

if (closeAnalyzeBtn) {
    closeAnalyzeBtn.addEventListener('click', closeAnalyzeModal);
}

if (analyzeModal) {
    analyzeModal.addEventListener('click', function(e) {
        if (e.target === analyzeModal) {
            closeAnalyzeModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && analyzeModal && analyzeModal.classList.contains('active')) {
        closeAnalyzeModal();
    }
});

    // ============================================
    // AUTH / KAYIT GİRİŞ
    // ============================================
    
    const authModal = document.getElementById('authModal');
    const authBtn = document.getElementById('authBtn');
    const authModalClose = document.getElementById('authModalClose');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginSubmit = document.getElementById('loginSubmit');
    const registerSubmit = document.getElementById('registerSubmit');
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    
    // Token kontrolü
    const token = localStorage.getItem('nextgen_token');
    const savedUser = localStorage.getItem('nextgen_user');
    
    if (token && savedUser && authBtn) {
        authBtn.outerHTML = `<div class="user-menu"><span>👤 ${savedUser}</span><button class="logout-btn" id="logoutBtn">Çıkış</button></div>`;
        
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('nextgen_token');
                localStorage.removeItem('nextgen_user');
                window.location.reload();
            });
        }
    }
    
    // Modal aç/kapa
    if (authBtn) {
        authBtn.addEventListener('click', function() {
            if (authModal) authModal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    }
    
    if (authModalClose) {
        authModalClose.addEventListener('click', function() {
            if (authModal) authModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    }
    
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                authModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }
    
    // Tab değiştirme
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const target = this.getAttribute('data-auth');
            if (target === 'login') document.getElementById('loginForm').classList.add('active');
            if (target === 'register') document.getElementById('registerForm').classList.add('active');
        });
    });
    
    // Giriş yap
    if (loginSubmit) {
        loginSubmit.addEventListener('click', function() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                loginError.textContent = 'Lütfen tüm alanları doldurun.';
                return;
            }
            
            loginError.textContent = 'Giriş yapılıyor...';
            
            fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('nextgen_token', data.token);
                    localStorage.setItem('nextgen_user', data.username);
                    window.location.reload();
                } else {
                    loginError.textContent = data.error || data.message || 'Giriş başarısız.';
                }
            })
            .catch(err => {
                loginError.textContent = 'Bağlantı hatası.';
            });
        });
    }
    
    // Kayıt ol
    if (registerSubmit) {
        registerSubmit.addEventListener('click', function() {
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const position = document.getElementById('regPosition').value;
            
            if (!username || !email || !password) {
                registerError.textContent = 'Lütfen zorunlu alanları doldurun.';
                return;
            }
            
            if (password.length < 6) {
                registerError.textContent = 'Şifre en az 6 karakter olmalı.';
                return;
            }
            
            registerError.textContent = 'Hesap oluşturuluyor...';
            
            fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, position })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('nextgen_token', data.token);
                    localStorage.setItem('nextgen_user', data.username);
                    window.location.reload();
                } else {
                    registerError.textContent = data.error || data.message || 'Kayıt başarısız.';
                }
            })
            .catch(err => {
                registerError.textContent = 'Bağlantı hatası.';
            });
        });
    }


});