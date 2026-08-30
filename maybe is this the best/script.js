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
    }

    // ---------- HAMBURGER DRAWER (REHBER MENÜSÜ) ----------
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerOpenBtn = document.getElementById('drawerOpenBtn');
    const heroDrawerBtn = document.getElementById('heroDrawerBtn');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerTabs = document.querySelectorAll('.drawer-tab');
    const drawerPanes = document.querySelectorAll('.drawer-pane');
    const drawerNavLinks = document.querySelectorAll('.drawer-nav-link');

    function openDrawer(targetTabId) {
        if (!drawerOverlay) return;
        drawerOverlay.classList.add('active');
        document.body.classList.add('drawer-open');

        if (targetTabId) {
            switchDrawerTab(targetTabId);
        }
    }

    function closeDrawer() {
        if (!drawerOverlay) return;
        drawerOverlay.classList.remove('active');
        document.body.classList.remove('drawer-open');
    }

    function switchDrawerTab(targetId) {
        // e.g. "stories" -> "drawer-stories"
        const fullTargetId = targetId.startsWith('drawer-') ? targetId : `drawer-${targetId}`;

        drawerTabs.forEach(tab => {
            if (tab.getAttribute('data-drawer-target') === fullTargetId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        drawerPanes.forEach(pane => {
            if (pane.id === fullTargetId) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    }

    if (drawerOpenBtn) {
        drawerOpenBtn.addEventListener('click', function() {
            openDrawer('drawer-stories');
        });
    }

    if (heroDrawerBtn) {
        heroDrawerBtn.addEventListener('click', function() {
            openDrawer('drawer-stories');
        });
    }

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', function(e) {
            if (e.target === drawerOverlay) {
                closeDrawer();
            }
        });
    }

    drawerTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-drawer-target');
            switchDrawerTab(target);
        });
    });

    drawerNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabKey = this.getAttribute('data-tab');
            openDrawer(tabKey);
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && drawerOverlay && drawerOverlay.classList.contains('active')) {
            closeDrawer();
        }
    });

    // ---------- SMOOTH SCROLL FOR INNER ANCHORS ----------
    document.querySelectorAll('a[href^="#"]:not(.drawer-nav-link)').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

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

    function openPositionModal() {
        if (positionModal) {
            positionModal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    }

    function closePositionModal() {
        if (positionModal) {
            positionModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    if (startBtn) startBtn.addEventListener('click', openPositionModal);
    if (startBtnCta) startBtnCta.addEventListener('click', openPositionModal);
    if (modalClose) modalClose.addEventListener('click', closePositionModal);

    if (positionModal) {
        positionModal.addEventListener('click', function(e) {
            if (e.target === positionModal) {
                closePositionModal();
            }
        });
    }

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
                if (selectedPosition === 'kaleci') {
                    window.location.href = 'goalkeeper.html';
                } else {
                    alert('Bu pozisyon yakında hazırlanacak! Şu an sadece Kaleci sayfası aktif.');
                    closePositionModal();
                }
            }
        });
    }

    // ============================================
    // HIGHLIGHTS TAB DEĞİŞTİRME
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));

            const targetContent = document.getElementById('tab-' + targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ============================================
    // AI WIZARD - KALECİ ANTRENMAN PROGRAMI
    // ============================================
    const aiWizard = document.getElementById('aiWizard');
    const progressBar = document.getElementById('progressBar');
    const aiThinking = document.getElementById('aiThinking');
    const resultStep = document.getElementById('resultStep');
    const resultSummary = document.getElementById('resultSummary');
    const resultProgram = document.getElementById('resultProgram');
    const restartBtn = document.getElementById('restartWizard');
    const aiStatus = document.getElementById('aiStatus');

    let currentStep = 1;
    const answers = {};
    const API_BASE_URL = 'http://localhost:3000';

    const statusMessages = [
        "Cevapların değerlendiriliyor...",
        "Fiziksel profilin analiz ediliyor...",
        "Teknik eksiklikler belirleniyor...",
        "Haftalık program optimize ediliyor...",
        "Son kontroller yapılıyor..."
    ];

    function updateProgress() {
        const percent = (currentStep / 5) * 100;
        if (progressBar) progressBar.style.width = percent + '%';
    }

    function showStep(stepNum) {
        if (!aiWizard) return;
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
        if (!aiWizard) return;
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

    if (aiWizard) {
        aiWizard.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const parentStep = this.closest('.wizard-step');
                const stepNum = parentStep.getAttribute('data-step');

                if (stepNum === '1' || stepNum === '4') {
                    this.classList.toggle('selected');
                    if (!answers[stepNum]) answers[stepNum] = [];
                    const value = this.getAttribute('data-value');

                    if (this.classList.contains('selected')) {
                        if (!answers[stepNum].includes(value)) answers[stepNum].push(value);
                    } else {
                        answers[stepNum] = answers[stepNum].filter(v => v !== value);
                    }

                    const nextBtn = document.getElementById('step' + stepNum + 'Next');
                    if (nextBtn) nextBtn.disabled = !(answers[stepNum].length > 0);
                } else {
                    parentStep.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                    this.classList.add('selected');
                    answers[stepNum] = this.getAttribute('data-value');

                    const nextBtn = document.getElementById('step' + stepNum + 'Next');
                    if (nextBtn) nextBtn.disabled = false;
                }
            });
        });

        const step1Next = document.getElementById('step1Next');
        if (step1Next) {
            step1Next.addEventListener('click', function() {
                if (answers['1'] && answers['1'].length > 0) {
                    currentStep = 2;
                    showStep(2);
                }
            });
        }

        for (let i = 2; i <= 4; i++) {
            const btn = document.getElementById('step' + i + 'Next');
            if (btn) {
                btn.addEventListener('click', function() {
                    currentStep = i + 1;
                    showStep(i + 1);
                });
            }
        }

        const step5Next = document.getElementById('step5Next');
        if (step5Next) {
            step5Next.addEventListener('click', function() {
                if (answers['5']) {
                    showThinking();
                    fetchTrainingPlan();
                }
            });
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', function() {
                currentStep = 1;
                Object.keys(answers).forEach(key => delete answers[key]);
                aiWizard.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                showStep(1);
                for (let i = 1; i <= 5; i++) {
                    const btn = document.getElementById('step' + i + 'Next');
                    if (btn) btn.disabled = true;
                }
            });
        }
    }

    // ============================================
    // AI KALECİ ANALİZ MODAL
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

    const analyzeMessages = [
        "Videoyu inceliyorum...",
        "Pozisyon alışları taranıyor...",
        "Teknik detaylar analiz ediliyor...",
        "Rapor hazırlanıyor..."
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

    if (analyzeModalClose) analyzeModalClose.addEventListener('click', closeAnalyzeModal);
    if (closeAnalyzeBtn) closeAnalyzeBtn.addEventListener('click', closeAnalyzeModal);
    if (analyzeModal) {
        analyzeModal.addEventListener('click', function(e) {
            if (e.target === analyzeModal) closeAnalyzeModal();
        });
    }

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
            .catch(() => {
                loginError.textContent = 'Bağlantı hatası.';
            });
        });
    }

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
            .catch(() => {
                registerError.textContent = 'Bağlantı hatası.';
            });
        });
    }

});
