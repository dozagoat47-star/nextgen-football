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
            const isOpen = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');

            const spans = mobileMenuBtn.querySelectorAll('span');
            if (isOpen) {
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
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.setAttribute('aria-label', 'Menüyü aç');
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
                    'bek': 'bek.html',
                    'ortasaha': 'midfielder.html',
                    'kanat': 'winger.html',
                    'santrafor': 'forward.html'
                };

                const targetPage = positionPages[selectedPosition];

                if (targetPage && (selectedPosition === 'kaleci' || selectedPosition === 'stoper' || selectedPosition === 'bek')) {
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
                    alert(`${positionNames[selectedPosition]} sayfası yakında hazırlanacak! 🚧\n\nŞu an sadece Kaleci ve Stoper sayfaları aktif.`);
                    closeModal();
                }
            }
        });
    }

    // "mevkiyi değiştir" → index.html?selectPosition=1 gelirse modali otomatik aç
    if (window.location.search.indexOf('selectPosition') !== -1) {
        openModal();
    }

    // ============================================
// AI WIZARD - KALECİ ANTRENMAN PROGRAMI (GERÇEK API)
// ============================================

const aiWizard = document.getElementById('aiWizard');

// AI wizard yalnızca goalkeeper.html gibi sayfalarda bulunur.
// Ana sayfa (index.html) gibi sayfalarda bu element olmadığından,
// aşağıdaki tüm wizard kodunu guard içine alıyoruz. Aksi halde
// "aiWizard" null iken hata fırlar ve auth butonu çalışmaz.
if (aiWizard) {
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
                if (resultProgram) {
                    var planList = data.plan || [];
                    var html = '<div class="result-program"><span class="result-tag">🎯 ' + planList.length + ' Günlük Kaleci Programı</span>';
                    planList.forEach(function(d) {
                        html += '<div class="result-day"><div class="result-day-header"><span class="result-day-name">' + d.day + '</span><span class="result-day-focus">' + d.focus + '</span></div><ul class="result-day-exercises">';
                        (d.exercises || []).forEach(function(ex) { html += '<li>' + ex + '</li>'; });
                        html += '</ul></div>';
                    });
                    html += '</div>';
                    resultProgram.innerHTML = html;
                }
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
} // aiWizard guard sonu

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

const API_BASE_URL = 'https://nextgen-server-six.vercel.app';

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
// AI STOPPER ANTRENMAN WIZARD — GERÇEK API
// ============================================

const defenderWizard = document.getElementById('defenderWizard');

if (defenderWizard) {
    const defProgressBar = document.getElementById('defProgressBar');
    const defThinking = document.getElementById('defThinking');
    const defResultStep = document.getElementById('defResultStep');
    const defResultSummary = document.getElementById('defResultSummary');
    const defResultProgram = document.getElementById('defResultProgram');
    const defWeekTracker = document.getElementById('defWeekTracker');
    const defRestartBtn = document.getElementById('defRestartWizard');
    const defStatus = document.getElementById('defStatus');

    let defCurrentStep = 1;
    const defAnswers = {};

    const defStatusMessages = [
        "Cevapların değerlendiriliyor...",
        "Savunma profilin analiz ediliyor...",
        "Stoper teknik eksiklikler belirleniyor...",
        "Haftalık savunma programı optimize ediliyor...",
        "Son kontroller yapılıyor... (Bu işlem biraz zaman alabilir, lütfen bekleyin)"
    ];

    function defUpdateProgress() {
        const percent = (defCurrentStep / 5) * 100;
        if (defProgressBar) {
            defProgressBar.style.width = percent + '%';
        }
    }

    function defShowStep(stepNum) {
        const steps = defenderWizard.querySelectorAll('.wizard-step[data-step]');
        steps.forEach(step => step.classList.remove('active'));
        if (defThinking) defThinking.classList.remove('active');
        if (defResultStep) defResultStep.classList.remove('active');
        if (defWeekTracker) defWeekTracker.classList.remove('visible');

        if (stepNum <= 5) {
            const target = defenderWizard.querySelector(`.wizard-step[data-step="${stepNum}"]`);
            if (target) target.classList.add('active');
        }
        defUpdateProgress();
    }

    function defShowThinking() {
        const steps = defenderWizard.querySelectorAll('.wizard-step[data-step]');
        steps.forEach(step => step.classList.remove('active'));
        if (defResultStep) defResultStep.classList.remove('active');
        if (defWeekTracker) defWeekTracker.classList.remove('visible');
        if (defThinking) defThinking.classList.add('active');
        if (defProgressBar) defProgressBar.style.width = '100%';

        let msgIndex = 0;
        if (defStatus) defStatus.textContent = defStatusMessages[0];

        const statusInterval = setInterval(() => {
            msgIndex++;
            if (msgIndex < defStatusMessages.length) {
                if (defStatus) defStatus.textContent = defStatusMessages[msgIndex];
            } else {
                clearInterval(statusInterval);
            }
        }, 600);
    }

    function defFetchTrainingPlan() {
        fetch(`${API_BASE_URL}/api/training-plan-defender`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: defAnswers })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setTimeout(() => {
                    if (defThinking) defThinking.classList.remove('active');
                    if (defResultStep) defResultStep.classList.add('active');
                    if (defResultSummary) defResultSummary.textContent = data.summary;
                    if (defResultProgram) defResultProgram.innerHTML = buildProgramHtml(data.plan);
                    savePlanDays(data.plan || []);
                    if (defWeekTracker) {
                        defWeekTracker.classList.add('visible');
                        renderDefTrainDone();
                    }
                }, 1500);
            } else {
                if (defStatus) defStatus.textContent = 'Bir hata oluştu.';
            }
        })
        .catch(err => {
            console.error(err);
            if (defStatus) defStatus.textContent = 'Sunucuya bağlanılamadı. node server.js çalışıyor mu?';
        });
    }

    defenderWizard.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parentStep = this.closest('.wizard-step');
            const stepNum = parentStep.getAttribute('data-step');

            if (stepNum === '1' || stepNum === '4') {
                this.classList.toggle('selected');

                if (!defAnswers[stepNum]) defAnswers[stepNum] = [];
                const value = this.getAttribute('data-value');

                if (this.classList.contains('selected')) {
                    if (!defAnswers[stepNum].includes(value)) {
                        defAnswers[stepNum].push(value);
                    }
                } else {
                    defAnswers[stepNum] = defAnswers[stepNum].filter(v => v !== value);
                }

                const nextBtnId = 'defStep' + stepNum + 'Next';
                const nextBtn = document.getElementById(nextBtnId);
                if (nextBtn) {
                    nextBtn.disabled = !(defAnswers[stepNum].length > 0);
                }
            } else {
                parentStep.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                defAnswers[stepNum] = this.getAttribute('data-value');

                const nextBtnId = 'defStep' + stepNum + 'Next';
                const nextBtn = document.getElementById(nextBtnId);
                if (nextBtn) {
                    nextBtn.disabled = false;
                }
            }
        });
    });

    const defStep1Next = document.getElementById('defStep1Next');
    if (defStep1Next) {
        defStep1Next.addEventListener('click', function() {
            if (defAnswers['1'] && defAnswers['1'].length > 0) {
                defCurrentStep = 2;
                defShowStep(2);
            }
        });
    }

    for (let i = 2; i <= 4; i++) {
        const btn = document.getElementById('defStep' + i + 'Next');
        if (btn) {
            btn.addEventListener('click', function() {
                defCurrentStep = i + 1;
                defShowStep(i + 1);
            });
        }
    }

    const defStep5Next = document.getElementById('defStep5Next');
    if (defStep5Next) {
        defStep5Next.addEventListener('click', function() {
            if (defAnswers['5']) {
                defShowThinking();
                defFetchTrainingPlan();
            }
        });
    }

    if (defRestartBtn) {
        defRestartBtn.addEventListener('click', function() {
            defCurrentStep = 1;
            Object.keys(defAnswers).forEach(key => delete defAnswers[key]);
            defenderWizard.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            defShowStep(1);

            for (let i = 1; i <= 5; i++) {
                const btn = document.getElementById('defStep' + i + 'Next');
                if (btn) btn.disabled = true;
            }
        });
    }
} // defenderWizard guard sonu

// ============================================
// AI BEK (FULLBACK) ANTRENMAN WIZARD — GERÇEK API
// ============================================

const fbWizard = document.getElementById('fbWizard');

if (fbWizard) {

    const fbProgressBar = document.getElementById('fbProgressBar');
    const fbThinking = document.getElementById('fbThinking');
    const fbResultStep = document.getElementById('fbResultStep');
    const fbResultSummary = document.getElementById('fbResultSummary');
    const fbResultProgram = document.getElementById('fbResultProgram');
    const fbRestartBtn = document.getElementById('fbRestartWizard');
    const fbStatus = document.getElementById('fbStatus');

    let fbCurrentStep = 1;
    const fbAnswers = {};

    const fbStatusMessages = [
        "Cevapların değerlendiriliyor...",
        "Bek profilinin analiz ediliyor...",
        "Kanat oyunundaki eksiklikler belirleniyor...",
        "Haftalık bek programı optimize ediliyor...",
        "Son kontroller yapılıyor... (Bu işlem biraz zaman alabilir, lütfen bekleyin)"
    ];

    function fbUpdateProgress() {
        const percent = (fbCurrentStep / 5) * 100;
        if (fbProgressBar) {
            fbProgressBar.style.width = percent + '%';
        }
    }

    function fbShowStep(stepNum) {
        const steps = fbWizard.querySelectorAll('.wizard-step[data-step]');
        steps.forEach(step => step.classList.remove('active'));
        if (fbThinking) fbThinking.classList.remove('active');
        if (fbResultStep) fbResultStep.classList.remove('active');

        if (stepNum <= 5) {
            const target = fbWizard.querySelector(`.wizard-step[data-step="${stepNum}"]`);
            if (target) target.classList.add('active');
        }
        fbUpdateProgress();
    }

    function fbShowThinking() {
        const steps = fbWizard.querySelectorAll('.wizard-step[data-step]');
        steps.forEach(step => step.classList.remove('active'));
        if (fbResultStep) fbResultStep.classList.remove('active');
        if (fbThinking) fbThinking.classList.add('active');
        if (fbProgressBar) fbProgressBar.style.width = '100%';

        let msgIndex = 0;
        if (fbStatus) fbStatus.textContent = fbStatusMessages[0];

        const statusInterval = setInterval(() => {
            msgIndex++;
            if (msgIndex < fbStatusMessages.length) {
                if (fbStatus) fbStatus.textContent = fbStatusMessages[msgIndex];
            } else {
                clearInterval(statusInterval);
            }
        }, 600);
    }

    function fbFetchTrainingPlan() {
        fetch(`${API_BASE_URL}/api/training-plan-fullback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: fbAnswers })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setTimeout(() => {
                    if (fbThinking) fbThinking.classList.remove('active');
                    if (fbResultStep) fbResultStep.classList.add('active');
                    if (fbResultSummary) fbResultSummary.textContent = data.summary;
                    if (fbResultProgram) fbResultProgram.innerHTML = buildProgramHtml(data.plan);
                }, 1500);
            } else {
                if (fbStatus) fbStatus.textContent = 'Bir hata oluştu.';
            }
        })
        .catch(err => {
            console.error(err);
            if (fbStatus) fbStatus.textContent = 'Sunucuya bağlanılamadı. node server.js çalışıyor mu?';
        });
    }

    fbWizard.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parentStep = this.closest('.wizard-step');
            const stepNum = parentStep.getAttribute('data-step');

            if (stepNum === '1' || stepNum === '4') {
                this.classList.toggle('selected');

                if (!fbAnswers[stepNum]) fbAnswers[stepNum] = [];
                const value = this.getAttribute('data-value');

                if (this.classList.contains('selected')) {
                    if (!fbAnswers[stepNum].includes(value)) {
                        fbAnswers[stepNum].push(value);
                    }
                } else {
                    fbAnswers[stepNum] = fbAnswers[stepNum].filter(v => v !== value);
                }

                const nextBtnId = 'fbStep' + stepNum + 'Next';
                const nextBtn = document.getElementById(nextBtnId);
                if (nextBtn) {
                    nextBtn.disabled = !(fbAnswers[stepNum].length > 0);
                }
            } else {
                parentStep.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                fbAnswers[stepNum] = this.getAttribute('data-value');

                const nextBtnId = 'fbStep' + stepNum + 'Next';
                const nextBtn = document.getElementById(nextBtnId);
                if (nextBtn) {
                    nextBtn.disabled = false;
                }
            }
        });
    });

    const fbStep1Next = document.getElementById('fbStep1Next');
    if (fbStep1Next) {
        fbStep1Next.addEventListener('click', function() {
            if (fbAnswers['1'] && fbAnswers['1'].length > 0) {
                fbCurrentStep = 2;
                fbShowStep(2);
            }
        });
    }

    for (let i = 2; i <= 4; i++) {
        const btn = document.getElementById('fbStep' + i + 'Next');
        if (btn) {
            btn.addEventListener('click', function() {
                fbCurrentStep = i + 1;
                fbShowStep(i + 1);
            });
        }
    }

    const fbStep5Next = document.getElementById('fbStep5Next');
    if (fbStep5Next) {
        fbStep5Next.addEventListener('click', function() {
            if (fbAnswers['5']) {
                fbShowThinking();
                fbFetchTrainingPlan();
            }
        });
    }

    if (fbRestartBtn) {
        fbRestartBtn.addEventListener('click', function() {
            fbCurrentStep = 1;
            Object.keys(fbAnswers).forEach(key => delete fbAnswers[key]);
            fbWizard.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            fbShowStep(1);

            for (let i = 1; i <= 5; i++) {
                const btn = document.getElementById('fbStep' + i + 'Next');
                if (btn) btn.disabled = true;
            }
        });
    }
} // fbWizard guard sonu

    // ============================================
// AI STOPPER ANALİZ MODAL — GERÇEK API
// ============================================

const defAnalyzeModal = document.getElementById('defAnalyzeModal');

const defAnalyzeMessages = [
    "Videoyu inceliyorum...",
    "Savunma müdahaleleri taranıyor...",
    "Pozisyon ve markaj detayları analiz ediliyor...",
    "Rapor hazırlanıyor... (Bu işlem biraz zaman alabilir, lütfen bekleyin)"
];

function defOpenAnalyzeModal(defenderName) {
    if (!defAnalyzeModal) return;

    defAnalyzeModal.classList.add('active');
    document.body.classList.add('modal-open');

    const defAT = document.getElementById('defAnalyzeThinking');
    const defAR = document.getElementById('defAnalyzeResult');
    const defAPB = document.getElementById('defAnalyzeProgressBar');
    const defAS = document.getElementById('defAnalyzeStatus');

    if (defAT) defAT.style.display = 'block';
    if (defAR) defAR.style.display = 'none';
    if (defAPB) defAPB.style.width = '0%';

    let step = 0;
    if (defAS) defAS.textContent = defAnalyzeMessages[0];

    const interval = setInterval(() => {
        step++;
        if (step < defAnalyzeMessages.length) {
            if (defAS) defAS.textContent = defAnalyzeMessages[step];
            if (defAPB) defAPB.style.width = ((step + 1) / defAnalyzeMessages.length * 100) + '%';
        } else {
            clearInterval(interval);
        }
    }, 1500);

    fetch(`${API_BASE_URL}/api/analyze-defender`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ defenderName: defenderName })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            setTimeout(() => {
                if (defAT) defAT.style.display = 'none';
                if (defAR) {
                    defAR.style.display = 'block';
                    defAR.style.animation = 'fadeIn 0.5s ease';
                }
                const defTitle = document.getElementById('defAnalyzeTitle');
                const defContent = document.getElementById('defAnalyzeContent');
                if (defTitle) defTitle.textContent = data.title;
                if (defContent) defContent.innerHTML = data.html;
            }, 500);
        } else {
            if (defAS) defAS.textContent = 'Bir hata oluştu, tekrar deneyin.';
        }
    })
    .catch(err => {
        console.error(err);
        if (defAS) defAS.textContent = 'Sunucuya bağlanılamadı. Backend çalışıyor mu?';
    });
}

function defCloseAnalyzeModal() {
    if (!defAnalyzeModal) return;
    defAnalyzeModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

document.querySelectorAll('.btn-analyze[data-defender]').forEach(btn => {
    btn.addEventListener('click', function() {
        const defender = this.getAttribute('data-defender');
        defOpenAnalyzeModal(defender);
    });
});

const defAnalyzeModalClose = document.getElementById('defAnalyzeModalClose');
const defCloseAnalyzeBtn = document.getElementById('defCloseAnalyzeBtn');

if (defAnalyzeModalClose) {
    defAnalyzeModalClose.addEventListener('click', defCloseAnalyzeModal);
}

if (defCloseAnalyzeBtn) {
    defCloseAnalyzeBtn.addEventListener('click', defCloseAnalyzeModal);
}

if (defAnalyzeModal) {
    defAnalyzeModal.addEventListener('click', function(e) {
        if (e.target === defAnalyzeModal) {
            defCloseAnalyzeModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && defAnalyzeModal && defAnalyzeModal.classList.contains('active')) {
        defCloseAnalyzeModal();
    }
});

// ============================================
// AI BEK (FULLBACK) ANALİZ MODAL — GERÇEK API
// ============================================

const fbAnalyzeModal = document.getElementById('fbAnalyzeModal');

const fbAnalyzeMessages = [
    "Videoyu inceliyorum...",
    "Bindirmeler ve ortalar taranıyor...",
    "İkili mücadele ve geri koşu detayları analiz ediliyor...",
    "Rapor hazırlanıyor... (Bu işlem biraz zaman alabilir, lütfen bekleyin)"
];

function fbOpenAnalyzeModal(fullbackName) {
    if (!fbAnalyzeModal) return;

    fbAnalyzeModal.classList.add('active');
    document.body.classList.add('modal-open');

    const fbAT = document.getElementById('fbAnalyzeThinking');
    const fbAR = document.getElementById('fbAnalyzeResult');
    const fbAPB = document.getElementById('fbAnalyzeProgressBar');
    const fbAS = document.getElementById('fbAnalyzeStatus');

    if (fbAT) fbAT.style.display = 'block';
    if (fbAR) fbAR.style.display = 'none';
    if (fbAPB) fbAPB.style.width = '0%';

    let step = 0;
    if (fbAS) fbAS.textContent = fbAnalyzeMessages[0];

    const interval = setInterval(() => {
        step++;
        if (step < fbAnalyzeMessages.length) {
            if (fbAS) fbAS.textContent = fbAnalyzeMessages[step];
            if (fbAPB) fbAPB.style.width = ((step + 1) / fbAnalyzeMessages.length * 100) + '%';
        } else {
            clearInterval(interval);
        }
    }, 1500);

    fetch(`${API_BASE_URL}/api/analyze-fullback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullbackName: fullbackName })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            setTimeout(() => {
                if (fbAT) fbAT.style.display = 'none';
                if (fbAR) {
                    fbAR.style.display = 'block';
                    fbAR.style.animation = 'fadeIn 0.5s ease';
                }
                const fbTitle = document.getElementById('fbAnalyzeTitle');
                const fbContent = document.getElementById('fbAnalyzeContent');
                if (fbTitle) fbTitle.textContent = data.title;
                if (fbContent) fbContent.innerHTML = data.html;
            }, 500);
        } else {
            if (fbAS) fbAS.textContent = 'Bir hata oluştu, tekrar deneyin.';
        }
    })
    .catch(err => {
        console.error(err);
        if (fbAS) fbAS.textContent = 'Sunucuya bağlanılamadı. Backend çalışıyor mu?';
    });
}

function fbCloseAnalyzeModal() {
    if (!fbAnalyzeModal) return;
    fbAnalyzeModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

document.querySelectorAll('.btn-analyze[data-fullback]').forEach(btn => {
    btn.addEventListener('click', function() {
        const fullback = this.getAttribute('data-fullback');
        fbOpenAnalyzeModal(fullback);
    });
});

const fbAnalyzeModalClose = document.getElementById('fbAnalyzeModalClose');
const fbCloseAnalyzeBtn = document.getElementById('fbCloseAnalyzeBtn');

if (fbAnalyzeModalClose) {
    fbAnalyzeModalClose.addEventListener('click', fbCloseAnalyzeModal);
}

if (fbCloseAnalyzeBtn) {
    fbCloseAnalyzeBtn.addEventListener('click', fbCloseAnalyzeModal);
}

if (fbAnalyzeModal) {
    fbAnalyzeModal.addEventListener('click', function(e) {
        if (e.target === fbAnalyzeModal) {
            fbCloseAnalyzeModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && fbAnalyzeModal && fbAnalyzeModal.classList.contains('active')) {
        fbCloseAnalyzeModal();
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

    // Oturum açıksa navbar'daki "Giriş Yap" butonunu gizle; profil drawer çubuğunda.
    if (token && savedUser && authBtn) {
        authBtn.style.display = 'none';
    }

    // Drawer altındaki profil çubuğunu güncelle (isim/avatar, navbar'dan taşındı)
    const drawerProfileName = document.getElementById('drawerProfileName');
    const drawerProfileAvatar = document.getElementById('drawerProfileAvatar');
    if (savedUser) {
        if (drawerProfileName) drawerProfileName.textContent = savedUser;
        if (drawerProfileAvatar) drawerProfileAvatar.textContent = '👤';
    }

    // ============================================
    // PROFİL DÜZENLE (TAM EKRAN)
    // ============================================
    const PROFILE_AVATAR_KEY = 'nextgen_user_avatar';
    const profileEditOverlay = document.getElementById('profileEditOverlay');
    const profileEditBack = document.getElementById('profileEditBack');
    const profileEditClose = document.getElementById('profileEditClose');
    const profileEditName = document.getElementById('profileEditName');
    const profileEditAvatarPreview = document.getElementById('profileEditAvatarPreview');
    const profileEditGalleryBtn = document.getElementById('profileEditGalleryBtn');
    const profileEditCameraBtn = document.getElementById('profileEditCameraBtn');
    const profileEditFileBtn = document.getElementById('profileEditFileBtn');
    const profileEditFile = document.getElementById('profileEditFile');
    const profileEditCameraFile = document.getElementById('profileEditCameraFile');
    const profileEditInfo = document.getElementById('profileEditInfo');
    const drawerProfile = document.getElementById('drawerProfile');

    function setProfileAvatar(src) {
        if (drawerProfileAvatar) {
            if (src) {
                drawerProfileAvatar.innerHTML = '<img src="' + src + '" alt="">';
            } else {
                drawerProfileAvatar.innerHTML = '👤';
            }
        }
        if (profileEditAvatarPreview) {
            if (src) {
                profileEditAvatarPreview.innerHTML = '<img src="' + src + '" alt="">';
            } else {
                profileEditAvatarPreview.innerHTML = '👤';
            }
        }
    }

    function loadProfileAvatar() {
        const savedAvatar = localStorage.getItem(PROFILE_AVATAR_KEY);
        if (savedAvatar) setProfileAvatar(savedAvatar);
    }

    function applyProfileEditDeviceButtons() {
        var isTouch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        var touchBtns = document.querySelectorAll('.profile-edit-touch-btn');
        var fileBtn = document.getElementById('profileEditFileBtn');
        touchBtns.forEach(function(btn) { btn.style.display = isTouch ? '' : 'none'; });
        if (fileBtn) fileBtn.style.display = isTouch ? 'none' : '';
    }

    function openProfileEdit() {
        if (!profileEditOverlay) return;
        if (storyPanel && storyPanel.classList.contains('open')) closeStoryPanel();
        document.body.classList.add('nav-hidden', 'videos-hidden');
        profileEditOverlay.classList.add('active');
        profileEditOverlay.setAttribute('aria-hidden', 'false');
        if (profileEditName) profileEditName.value = savedUser || '';
        loadProfileAvatar();
        if (profileEditInfo) profileEditInfo.textContent = '';
        applyProfileEditDeviceButtons();
        lockPageScroll();
    }

    function closeProfileEdit() {
        if (!profileEditOverlay) return;
        profileEditOverlay.classList.remove('active');
        profileEditOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-hidden', 'videos-hidden');
        unlockPageScroll();
        if (storyPanel) openStoryPanel();
    }

    function handleAvatarFile(file, mirror) {
        if (!file || !file.type || file.type.indexOf('image/') !== 0) return;
        const reader = new FileReader();
        reader.onload = function() {
            const dataUrl = reader.result;
            if (mirror) {
                mirrorImage(dataUrl, function(mirroredUrl) {
                    localStorage.setItem(PROFILE_AVATAR_KEY, mirroredUrl);
                    setProfileAvatar(mirroredUrl);
                    if (profileEditInfo) profileEditInfo.textContent = '✓ Fotoğraf güncellendi';
                });
                return;
            }
            localStorage.setItem(PROFILE_AVATAR_KEY, dataUrl);
            setProfileAvatar(dataUrl);
            if (profileEditInfo) profileEditInfo.textContent = '✓ Fotoğraf güncellendi';
        };
        reader.readAsDataURL(file);
    }

    function mirrorImage(src, callback) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.translate(img.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0);
            callback(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.src = src;
    }

    function saveProfileName() {
        if (!profileEditName) return;
        const name = profileEditName.value.trim();
        if (name) {
            localStorage.setItem('nextgen_user', name);
            if (drawerProfileName) drawerProfileName.textContent = name;
            if (profileEditInfo) profileEditInfo.textContent = '✓ İsim güncellendi';
        } else {
            if (profileEditInfo) profileEditInfo.textContent = 'Lütfen bir isim yaz.';
        }
    }

    if (drawerProfile) {
        drawerProfile.addEventListener('click', openProfileEdit);
    }

    if (profileEditBack) {
        profileEditBack.addEventListener('click', closeProfileEdit);
    }

    if (profileEditClose) {
        profileEditClose.addEventListener('click', closeProfileEdit);
    }

    if (profileEditGalleryBtn && profileEditFile) {
        profileEditGalleryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            profileEditFile.click();
        });
    }

    if (profileEditFileBtn && profileEditFile) {
        profileEditFileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            profileEditFile.click();
        });
    }

    if (profileEditCameraBtn && profileEditCameraFile) {
        profileEditCameraBtn.addEventListener('click', function(e) {
            e.preventDefault();
            profileEditCameraFile.click();
        });
    }

    if (profileEditFile) {
        profileEditFile.addEventListener('change', function() {
            if (this.files && this.files[0]) handleAvatarFile(this.files[0]);
            this.value = '';
        });
    }

    if (profileEditCameraFile) {
        profileEditCameraFile.addEventListener('change', function() {
            if (this.files && this.files[0]) handleAvatarFile(this.files[0], true);
            this.value = '';
        });
    }

    if (profileEditName) {
        profileEditName.addEventListener('change', saveProfileName);
        profileEditName.addEventListener('blur', saveProfileName);
    }

    // ============================================
    // AYARLAR (TAM EKRAN)
    // ============================================
    const settingsOverlay = document.getElementById('settingsOverlay');
    const settingsBack = document.getElementById('settingsBack');
    const settingsClose = document.getElementById('settingsClose');
    const settingsChangePosition = document.getElementById('settingsChangePosition');
    const settingsFeedbackBtn = document.getElementById('settingsFeedbackBtn');
    const settingsFeedbackPanel = document.getElementById('settingsFeedbackPanel');
    const settingsFeedbackText = document.getElementById('settingsFeedbackText');
    const settingsFeedbackSend = document.getElementById('settingsFeedbackSend');
    const settingsFeedbackStatus = document.getElementById('settingsFeedbackStatus');
    const settingsFeedbackBack = document.getElementById('settingsFeedbackBack');
    const settingsLogout = document.getElementById('settingsLogout');
    const drawerSettingsBtn = document.getElementById('drawerSettingsBtn');

    function openSettings() {
        if (!settingsOverlay) return;
        if (storyPanel && storyPanel.classList.contains('open')) closeStoryPanel();
        document.body.classList.add('nav-hidden', 'videos-hidden');
        settingsOverlay.classList.add('active');
        settingsOverlay.setAttribute('aria-hidden', 'false');
        if (settingsFeedbackPanel) settingsFeedbackPanel.style.display = 'none';
        if (settingsFeedbackStatus) settingsFeedbackStatus.textContent = '';
        lockPageScroll();
    }

    function closeSettings() {
        if (!settingsOverlay) return;
        settingsOverlay.classList.remove('active');
        settingsOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-hidden', 'videos-hidden');
        unlockPageScroll();
        if (storyPanel) openStoryPanel();
    }

    if (drawerSettingsBtn) {
        drawerSettingsBtn.addEventListener('click', openSettings);
    }

    if (settingsBack) {
        settingsBack.addEventListener('click', closeSettings);
    }

    if (settingsClose) {
        settingsClose.addEventListener('click', closeSettings);
    }

    if (settingsChangePosition) {
        settingsChangePosition.addEventListener('click', function() {
            window.location.href = 'index.html?selectPosition=1';
        });
    }

    if (settingsFeedbackBtn) {
        settingsFeedbackBtn.addEventListener('click', function() {
            if (settingsFeedbackPanel) settingsFeedbackPanel.style.display = 'block';
            if (settingsFeedbackText) settingsFeedbackText.focus();
        });
    }

    if (settingsFeedbackBack) {
        settingsFeedbackBack.addEventListener('click', function() {
            if (settingsFeedbackPanel) settingsFeedbackPanel.style.display = 'none';
        });
    }

    if (settingsFeedbackSend) {
        settingsFeedbackSend.addEventListener('click', async function() {
            if (!settingsFeedbackText) return;
            var text = settingsFeedbackText.value.trim();
            if (!text) {
                if (settingsFeedbackStatus) {
                    settingsFeedbackStatus.style.color = '#f87171';
                    settingsFeedbackStatus.textContent = 'Lütfen bir yorum yaz.';
                }
                return;
            }
            if (settingsFeedbackStatus) {
                settingsFeedbackStatus.style.color = '#94a3b8';
                settingsFeedbackStatus.textContent = 'Gönderiliyor...';
            }
            try {
                const resp = await fetch('http://localhost:3000/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: text, user: savedUser || 'Misafir' })
                });
                const data = await resp.json();
                if (data.success) {
                    if (settingsFeedbackStatus) {
                        settingsFeedbackStatus.style.color = '#34d399';
                        settingsFeedbackStatus.textContent = '✓ ' + (data.message || 'Gönderildi. Teşekkürler!');
                    }
                    if (settingsFeedbackText) settingsFeedbackText.value = '';
                } else {
                    if (settingsFeedbackStatus) {
                        settingsFeedbackStatus.style.color = '#f87171';
                        settingsFeedbackStatus.textContent = 'Hata: ' + (data.error || 'Gönderilemedi.');
                    }
                }
            } catch (e) {
                if (settingsFeedbackStatus) {
                    settingsFeedbackStatus.style.color = '#f87171';
                    settingsFeedbackStatus.textContent = 'Sunucuya ulaşılamadı. Daha sonra tekrar dene.';
                }
            }
        });
    }

    if (settingsLogout) {
        settingsLogout.addEventListener('click', function() {
            localStorage.removeItem('nextgen_token');
            localStorage.removeItem('nextgen_user');
            window.location.reload();
        });
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



    // ---------- YUMUŞAK KAYDIRMA VE MENÜ KAPANMA ----------
    const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    e.preventDefault();
                    targetElem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // KAYAR PANEL (SLIDE-IN DRAWER) — STOPERLER
    // ============================================
    const storyPanel = document.getElementById('storyPanel');
    const storyToggle = document.getElementById('storyPanelToggle');
    const storyOverlay = document.getElementById('storyOverlay');
    const storyDrawerClose = document.getElementById('storyDrawerClose');

    let openStoryPanel = function() {};
    let closeStoryPanel = function() {};

    if (storyPanel) {
        openStoryPanel = function() {
            storyPanel.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (storyToggle) storyToggle.setAttribute('aria-expanded', 'true');
        };

        closeStoryPanel = function() {
            storyPanel.classList.remove('open');
            document.body.style.overflow = '';
            if (storyToggle) storyToggle.setAttribute('aria-expanded', 'false');
        };

        if (storyToggle) {
            storyToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                if (storyPanel.classList.contains('open')) {
                    closeStoryPanel();
                } else {
                    openStoryPanel();
                }
            });
        }

        if (storyOverlay) {
            storyOverlay.addEventListener('click', closeStoryPanel);
        }

        if (storyDrawerClose) {
            storyDrawerClose.addEventListener('click', closeStoryPanel);
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && storyPanel.classList.contains('open')) {
                closeStoryPanel();
            }
        });
    }

    // ============================================
    // STREAK (SERİ) WIDGET
    // ============================================
    const streakDaysEl = document.getElementById('streakDays');
    const isGoalkeeperPage = document.body.classList.contains('goalkeeper-home');
    const isFullbackPage = document.body.classList.contains('fullback-home');
    const STREAK_KEY = isGoalkeeperPage ? 'goalkeeperStreak' : (isFullbackPage ? 'fullbackStreak' : 'defenderStreak');
        const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cma', 'Cmt', 'Paz'];

        function getStreakData() {
            try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || {}; }
            catch (e) { return {}; }
        }

        function saveStreakData(data) {
            localStorage.setItem(STREAK_KEY, JSON.stringify(data));
        }

        function dateKey(d) {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return y + '-' + m + '-' + dd;
        }

        function calcStreak(data) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            let cursor = new Date(today);
            if (!data[dateKey(cursor)]) {
                cursor.setDate(cursor.getDate() - 1);
            }
            let streak = 0;
            while (data[dateKey(cursor)]) {
                streak++;
                cursor.setDate(cursor.getDate() - 1);
            }
            return streak;
        }

        function renderStreak() {
        if (!streakDaysEl) return;
        const data = getStreakData();
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const mondayOffset = (today.getDay() + 6) % 7;
            const monday = new Date(today);
            monday.setDate(today.getDate() - mondayOffset);
            const todayIndex = mondayOffset;

            streakDaysEl.innerHTML = '';

            for (let i = 0; i < 7; i++) {
                const d = new Date(monday);
                d.setDate(monday.getDate() + i);
                const key = dateKey(d);
                const isPast = d.getTime() <= today.getTime();
                const isActive = !!data[key];

                const col = document.createElement('div');
                col.className = 'streak-day-col' + (i === todayIndex ? ' today' : '') + (isActive ? ' active' : '') + (!isPast ? ' disabled' : '');

                const name = document.createElement('span');
                name.className = 'streak-day-name' + (i === todayIndex ? ' today' : '');
                name.textContent = i === todayIndex ? 'Bugün' : dayNames[i];

                const dot = document.createElement('button');
                dot.className = 'streak-day-dot';
                dot.setAttribute('aria-label', dayNames[i]);
                dot.innerHTML = '✓';

                if (isPast) {
                    // Streak şimdilik salt okunur: tıklama devre dışı (otomatik antrenman sistemi gelince aktifleşecek)
                    dot.setAttribute('disabled', 'disabled');
                    dot.classList.add('locked');
                }

                col.appendChild(name);
                col.appendChild(dot);
                streakDaysEl.appendChild(col);
            }

            const countEl = document.getElementById('streakCount');
            if (countEl) countEl.textContent = calcStreak(data);
        }

        renderStreak();

    // ============================================
    // OYUNCU HİKAYELERİ (TAM EKRAN + DETAY)
    // ============================================
    const storiesBtn = document.getElementById('storiesOpenBtn');
    const storiesBack = document.getElementById('storiesBack');
    const storiesOverlay = document.getElementById('storiesOverlay');
    const storiesClose = document.getElementById('storiesClose');
    const nutritionOpenBtn = document.getElementById('nutritionOpenBtn');
    const nutritionBack = document.getElementById('nutritionBack');
    const nutritionOverlay = document.getElementById('nutritionOverlay');
    const nutritionClose = document.getElementById('nutritionClose');
    const scoutOpenBtn = document.getElementById('scoutOpenBtn');
    const scoutBack = document.getElementById('scoutBack');
    const scoutOverlay = document.getElementById('scoutOverlay');
    const scoutClose = document.getElementById('scoutClose');
    const journeyOpenBtn = document.getElementById('journeyOpenBtn');
    const journeyBack = document.getElementById('journeyBack');
    const journeyOverlay = document.getElementById('journeyOverlay');
    const journeyClose = document.getElementById('journeyClose');
    const storiesGrid = document.getElementById('storiesGrid');
    const storyDetailModal = document.getElementById('storyDetailModal');
    const storyDetailClose = document.getElementById('storyDetailClose');
    const storyDetailBack = document.getElementById('storyDetailBack');
    const storyDetailContent = document.getElementById('storyDetailContent');

    const defenderPlayers = [
        {
            name: 'Alessandro Bastoni',
            team: 'Inter Milan',
            photo: 'bastoni.webp',
            story: 'Alessandro Bastoni, İtalyan altyapı sisteminin yetiştirdiği en modern stoperlerden biri. Kariyerine Atalanta altyapısında başladı, kiralık dönemlerinde topladığı tecrübeyle kendini kanıtladı ve 2017\u2019de Inter\u2019e katıldı. Asıl çıkışını Inter\u2019in kur stoperi olarak yaptı; sol ayağıyla yaptığı isabetli uzun paslar, öne doğru taşıdığı toplar ve oyun kurma yeteneğiyle teknik direktörlerin vazgeçilmezi haline geldi. Serie A şampiyonluğu yaşadı ve İtalya milli takımının da önemli stoperlerinden biri oldu. Bastoni, stoperler için şunu öğretir: modern stoperin savunmadan önce oyunu kurması, sakin kalıp topu doğru dağıtması gerekir.'
        },
        {
            name: 'Pau Cubarsi',
            team: 'Barcelona',
            photo: 'pau-cubarsi.webp',
            story: 'Pau Cubarsi, Barcelona\u2019nın ünlü altyapısı La Masia\u2019dan çıkan son yıldızlardan biri. Henüz 17 yaşındayken A takımda debüt yaptı ve kısa sürede takımın ilk 11\u2019inin değişilmezi oldu. Küçük yaşına rağmen oyun okuması, soğukkanlı top çıkarması ve hatasız pas dağıtımıyla dikkatleri üzerine topladı. İspanya milli takımında da forma giydi ve ülkesinin genç yaşlarda A takım seviyesine en hızlı yükselen savunmacılarından biri olarak öne çıktı. Cubarsi, genç stoperlere şunu gösterir: fizik gücü olmasa bile akıl, konum bilgisi ve özgüvenle en üst seviyede oynanabilir.'
        },
        {
            name: 'Ibrahima Konate',
            team: 'Liverpool',
            photo: 'ibrahima-konate.webp',
            story: 'Ibrahima Konate, Fransa\u2019da Sochaux altyapısında yetişti ve çok genç yaşta Fransa Ligue 1\u2019de forma giydi. Ardından RB Leipzig\u2019e transfer oldu; orada geçirdiği yıllarda fizik gücü, hava topu hakimiyeti ve geriden oyun kurma becerisiyle Avrupa\u2019nın gözde genç stoperlerinden biri oldu. 2021\u2019de Liverpool\u2019a katıldı ve burada Virgil van Dijk ile birlikte Premier Lig ve Avrupa\u2019nın en sağlam savunma ikililerinden birini oluşturdu. Konate, genç stoperlere şunu öğretir: fiziksel güç, doğru konumlanma ve topa erken müdahale bir araya gelince savunmanın ne kadar etkili olabileceğini gösterir.'
        },
        {
            name: 'Ruben Dias',
            team: 'Manchester City',
            photo: 'ruben-dias.jpg',
            story: 'Ruben Dias, Portekiz\u2019in Benfica altyapısında yetişti ve çok genç yaşta takımın kaptanlığına kadar yükseldi. Kısa sürede Avrupa\u2019nın en istikrarlı stoperlerinden biri olarak adından söz ettirdi ve 2020\u2019de Manchester City\u2019ye transfer oldu. Gelişiyle birlikte takımın savunma hattı bambaşka bir kimlik kazandı; komuta eden, topları erken kesen ve arkasındaki kalecisiyle uyumlu oynayan bir lider haline geldi. Premier Lig\u2019de Yılın Futbolcusu ödülünü kazandı ve Portekiz milli takımının da değişilmez stoperi oldu. Dias, genç stoperlere şunu öğretir: sahadaki en önemli silah liderlik ve konsantredir; fizik gücü yetenekle birleşince elit seviyeye ulaştırır.'
        },
        {
            name: 'Nico Schlotterbeck',
            team: 'Borussia Dortmund',
            photo: 'nico-schlotterbeck.jpeg',
            story: 'Nico Schlotterbeck, Almanya\u2019da Karlsruher altyapısında yetişti ve Freiburg\u2019da parlayarak Bundesliga\u2019nın en çok konuşulan genç stoperlerinden biri oldu. Cesurca öne çıkan top çıkarmaları, oyunu önünden okuyan konum bilgisi ve hava topu hakimiyetiyle dikkat çekti. 2022\u2019de Borussia Dortmund\u2019a transfer oldu ve burada modern, oyun kuran stoper rolünün önemli bir temsilcisi haline geldi. Almanya milli takımında da forma giydi. Schlotterbeck, genç stoperlere şunu gösterir: savunmada sadece topu uzaklaştırmak yetmez; cesaretle top çıkarıp oyunu başlatabilen stoperler modern futbolda çok daha değerlidir.'
        },
        {
            name: 'Ronald Araujo',
            team: 'Barcelona',
            photo: 'ronald-araujo.webp',
            story: 'Ronald Araujo, Uruguay\u2019da futbol kariyerine başladı ve kısa sürede fiziksel olarak en etkileyici stoper adaylarından biri olarak görüldü. 2018\u2019de Barcelona\u2019ya katıldı; önce altyapıda, ardından A takımda kendini kanıtladı. Olağanüstü hızı, güçlü 1v1 markajı ve hava topundaki üstünlüğüyle rakip forvetler için önemli bir eşleşme sorunu haline geldi. Sağ ve sol stoper pozisyonlarında da görev alabilmesi onu teknik direktörler için çok yönlü bir silah yaptı. Uruguay milli takımının da önemli bir parçası oldu. Araujo, genç stoperlere şunu öğretir: hız ve fiziksel güç, iyi bir konum bilgisiyle birleştiğinde en hızlı forvetleri bile durdurabilecek bir silaha dönüşür.'
        },
        {
            name: 'Cristian Romero',
            team: 'Tottenham',
            photo: 'romero.avif',
            story: 'Cristian Romero, Arjantin\u2019de Belrano altyapısında yetişti ve İtalya\u2019ya transfer olduktan sonra Genoa ile Serie A\u2019daki ilk ciddi adımlarını attı. Atalanta\u2019da parlayarak Avrupa\u2019nın en agresif ve top kazanan stoperlerinden biri haline geldi; 2021\u2019de Tottenham\u2019a katıldı. Sert müdahaleleri, rakip forvetleri yıldıran saha içi tutkusu ve kazanmaya olan inancıyla tanındı. Arjantin milli takımıyla 2022 Dünya Kupası\u2019nı kazandı ve bu başarıda savunmanın belkemiği olarak önemli rol oynadı. Romero, genç stoperlere şunu öğretir: tutku, inanç ve doğru agresiflik, teknik yetenekle birleştiğinde bir stoperi takımın en güvenilir parçası yapar.'
        }
    ];

    const fullbackPlayers = [
        {
            name: 'Josko Gvardiol',
            team: 'Manchester City',
            photo: 'gvardiol.jpg',
            story: 'Josko Gvardiol, Hırvatistan\u2019ın Zagreb kentinde yetişti ve Dinamo Zagreb altyapısının en parlak ürünlerinden biri oldu. 18 yaşında Leipzig\u2019e transfer oldu ve kısa sürede Bundesliga\u2019nın en istikrarlı sol stoperlerinden biri haline geldi. Fiziksel gücü, hızı ve sol ayağıyla oyun kurma becerisiyle dikkat çekti; 2023\u2019te Manchester City\u2019e katıldı ve modern savunmanın önemli bir parçası oldu. 2022 Dünya Kupası\u2019nda Hırvatistan ile üçüncülük yaşadı. Gvardiol, genç savunmacılara şunu öğretir: hız ve fizik, sol ayakla oyun kurmakla birleşince elit seviyeye ulaşabilirsin.'
        },
        {
            name: 'Nuno Mendes',
            team: 'PSG',
            photo: 'nuno-mendes.webp',
            story: 'Nuno Mendes, Portekiz\u2019de Sporting Lizbon altyapısında yetişti ve 18 yaşında A takımda parlayarak Avrupa\u2019nın gözde sol beklerinden biri oldu. Patlayıcı sürati, 1v1 savunması ve kanat bindirmeleriyle tanındı; 2021\u2019de PSG\u2019ye transfer oldu. Portekiz milli takımıyla Avrupa Şampiyonası\u2019na katıldı. Genç yaşına rağmen sakatlıklarla mücadele ederek geri dönüşleriyle de örnek oldu. Nuno Mendes, genç bekleri şuna yönlendirir: süratinin ve dayanıklılığının yanına doğru pozisyon bilgisi koy, çift yönlü bir beke dönüş.'
        },
        {
            name: 'Milos Kerkez',
            team: 'Bournemouth',
            photo: 'milos-kerkez.jpg',
            story: 'Milos Kerkez, Macaristan\u2019da yetişti ve çok genç yaşta Avrupa\u2019nın dikkatini çeken sol beklerden biri oldu. AC Milan altyapısından sonra AZ Alkmaar\u2019da parladı; bindirmeleri, ortaları ve enerjik oyunuyla 2023\u2019te Bournemouth\u2019a transfer oldu. Macaristan milli takımının da değişilmez ismi oldu. Kerkez, 1.76 boyuyla kanatta fiziksel üstünlük kurmadan da çalışkanlık ve doğru koşu zamanlamasıyla üst düzey oynanabileceğini gösterir.'
        },
        {
            name: 'Achraf Hakimi',
            team: 'PSG',
            photo: 'achraf-hakimi.jpeg',
            story: 'Achraf Hakimi, İspanya\u2019da doğdu ve Real Madrid altyapısında yetişti. Dortmund kiralık döneminde sağ bekin hücum potansiyelini yeniden tanımladı; Inter\u2019de Serie A şampiyonluğu yaşadı ve 2021\u2019de PSG\u2019ye transfer oldu. Muazzam sürati, bindirmeleri ve gol bulma becerisiyle dünyanın en ofansif beki olarak kabul edilir. 2022 Dünya Kupası\u2019nda Fas ile tarihi bir dördüncülük yaşadı. Hakimi, genç sağ bekleri şuna ikna eder: hız bir silahtır, ama onu verimli koşu ve doğru zamanda yapılan bindirmeyle birleştirmek gerekir.'
        },
        {
            name: 'Jeremie Frimpong',
            team: 'Bayer Leverkusen',
            photo: 'frimpong.jpg',
            story: 'Jeremie Frimpong, Hollanda\u2019da doğdu ve Manchester City altyapısından Celtic\u2019e uzanan bir yolculukla kendini kanıtladı. Celtic\u2019de dikkat çektikten sonra Bayer Leverkusen\u2019e transfer oldu; hücum gücü ve elektronik hızıyla Xabi Alonso\u2019nun sisteminin vazgeçilmez sağ beki oldu. 2024\u2019te Leverkusen ile tarihi Bundesliga şampiyonluğu yaşadı. Frimpong, genç bekleri şuna teşvik eder: hücumda cesur ol ama topu kaybettiğinde geri koşuya da aynı enerjiyi ver.'
        },
        {
            name: 'Denzel Dumfries',
            team: 'Inter Milan',
            photo: 'danzel-dumfries.jpg',
            story: 'Denzel Dumfries, Hollanda\u2019da Sparta Rotterdam altyapısında yetişti ve PSV\u2019de büyük patlama yaşadı. Fiziksel gücü, sağ kanattaki bindirmeleri ve ceza sahası içindeki tehditkarlığıyla 2021\u2019de Inter\u2019e transfer oldu. Serie A şampiyonluğu yaşadı ve Hollanda milli takımının vazgeçilmez sağ beki oldu. 2020 Avrupa Şampiyonası\u2019nda golcü performansıyla dikkat çekti. Dumfries, genç sağ bekleri şuna ikna eder: boy ve fiziksel güç, hücum bindirmelerinde ceza sahası tehdidi olmak için büyük avantajdır.'
        },
        {
            name: 'Alejandro Balde',
            team: 'Barcelona',
            photo: 'alejandro-balde-story.webp',
            story: 'Alejandro Balde, Barcelona\u2019nın ünlü akademisi La Masia\u2019dan çıktı ve 2021\u2019de A takımda ilk maçına çıktı. Patlayıcı sürati, çizgiye kadar inen bindirmeleri ve geri dönüş hızıyla Jordi Alba\u2019nın veliahdı olarak görüldü. Küçük yaşına rağmen La Liga ve milli forma mücadelelerinde önemli süreler aldı. Balde, genç sol bekleri şuna yönlendirir: süratin yanına çalışma kapasiteni koy, bindirme ile geri koşu arasındaki dengeyi kurduğunda vazgeçilmez olursun.'
        }
    ];

    const goalkeeperPlayers = [
        {
            name: 'Marc-André ter Stegen',
            team: 'Barcelona',
            photo: 'ter-stegen.jpeg',
            story: 'Marc-André ter Stegen, Almanya\u2019da Borussia Mönchengladbach altyapısında yetişti ve çok genç yaşta Bundesliga\u2019da forma giydi. Ayakla oyun kurmadaki ustalığı, soğukkanlılığı ve öne çıkma cesaretiyle Barcelona\u2019nın dikkatini çekti ve 2014\u2019te Katalan devine transfer oldu. Kariyeri boyunca Şampiyonlar Ligi ve La Liga zaferleri yaşadı; modern kaleciliğin oyun kurucu öncülerinden biri olarak kabul edildi. Ter Stegen, genç kalecilere şunu öğretir: modern kaleci sadece kurtarış yapmaz, aynı zamanda oyunu arkasından kuracak kadar ayaklarıyla da güven verir.'
        },
        {
            name: 'Yann Sommer',
            team: 'Inter Milan',
            photo: 'yann-sommer.jpg',
            story: 'Yann Sommer, İsviçre\u2019de FC Basel altyapısında yetişti ve kariyerini Avrupa\u2019nın en istikrarlı kalecilerinden biri olarak şekillendirdi. Borussia Mönchengladbach\u2019ta geçirdiği yıllarda refleksleri, pozisyon bilgisi ve ayakla oyuna katılımıyla takdir topladı. Bayern Münih\u2019te Manu Neuer\u2019in ardından forma giydi ve ardından Inter\u2019de Serie A şampiyonluğu yaşadı. Küçük boyuna rağmen olağanüstü çizgi kurtarışlarıyla tanınır. Sommer, genç kalecilere şunu gösterir: fizik boyutun önemli olsa da refleks, çalışkanlık ve doğru pozisyon almak her zaman fark yaratır.'
        },
        {
            name: 'Ederson',
            team: 'Manchester City',
            photo: 'Ederson.avif',
            story: 'Ederson, Brezilya\u2019da yetişti ve genç yaşta Avrupa\u2019ya uzanan bir yolculuğa çıktı. Portekiz\u2019de Benfica\u2019da ve ardından Rio Ave\u2019de parladıktan sonra 2017\u2019de Manchester City\u2019e katıldı. Fırlatma gücü ve uzun paslarıyla modern kaleciliğin en çarpıcı örneklerinden biri oldu; takımının baskılı oyun stilinin ilk hücum silahı haline geldi. Premier Lig ve Şampiyonlar Ligi zaferleri yaşadı. Ederson, genç kalecilere şunu öğretir: ayakla oyun kurma yeteneği, bir kalecinin takımına karşı presi kıracak en değerli katkısı olabilir.'
        },
        {
            name: 'Gianluigi Donnarumma',
            team: 'PSG',
            photo: 'Donnaruma-story.jpeg',
            story: 'Gianluigi Donnarumma, İtalya\u2019nın Castellammare di Stabia kasabasından çıktı ve AC Milan akademisinin dikkatini çok genç yaşta çekti. 1,96\u2019lık dev fiziği ve doğuştan gelen refleksleriyle kategori atlayarak yükseldi; henüz 16 yaşındayken Milan formasıyla Serie A\u2019da tarihin en genç kalecilerinden biri oldu. 2021\u2019de İtalya ile Avrupa Şampiyonası\u2019nı kazandı ve turnuvanın en iyi oyuncusu seçildi, ardından PSG\u2019ye transfer oldu. Donnarumma, genç kalecilere şunu öğretir: fiziksel devlik ve erken yaşta sorumluluk almak, doğru yönetilirse olağanüstü bir kariyerin temelini oluşturur.'
        },
        {
            name: 'Mike Maignan',
            team: 'AC Milan',
            photo: 'maignan-story.jpg',
            story: 'Mike Maignan, Fransa\u2019da yetişti ve Paris Saint-Germain altyapısında başladıktan sonra Lille\u2019de kendini kanıtladı. Lille ile Ligue 1 şampiyonluğu yaşadıktan sonra 2021\u2019de AC Milan\u2019a katıldı ve kısa sürede takımın lideri haline geldi. Penaltı kurtarma uzmanlığı, güçlü refleksleri ve oyunu dikte eden karizmasıyla Serie A\u2019nın en etkili kalecilerinden biri oldu. Fransa milli takımında da forma giydi. Maignan, genç kalecilere şunu gösterir: saha arkasında takımı yöneten, yüksek sesle komuta eden bir kaleci, takımının güven duygusunu nasıl yükselteceğini bilir.'
        },
        {
            name: 'Jordan Pickford',
            team: 'Everton',
            photo: 'pickford-story.avif',
            story: 'Jordan Pickford, İngiltere\u2019de Sunderland altyapısında yetişti ve kiralık dönemlerinin ardından kalıcı olarak kendini kanıtladı. Everton\u2019a transfer olduktan sonra refleksleri, son anda çıkardığı kurtarışları ve uzun oyunlarıyla İngiltere\u2019nin bir numaralı kalecisi haline geldi. 2018 Dünya Kupası ve 2021\u2019de Avrupa Şampiyonası finalinde önemli rol oynadı. Sahada sergilediği tutku ve mücadelesiyle tanınır. Pickford, genç kalecilere şunu öğretir: her topa sonuna kadar savaşmak ve kazanma arzusunu saha dışına taşımak, bir kalecinin en görünür özelliklerinden biridir.'
        },
        {
            name: 'Emiliano Martínez',
            team: 'Aston Villa',
            photo: 'emiliano-martinez-story.jpg',
            story: 'Emiliano Martínez, Arjantin\u2019de yetişti ve çok genç yaşta Arsenal\u2019a transfer oldu. Yıllarca yedek bekledikten sonra 2020\u2019de fırsat yakaladı ve kısa sürede kendini ispat ederek 2021\u2019de Aston Villa\u2019ya transfer oldu. Penaltı kurtarma ustalığıyla tanındı; 2022 Dünya Kupası\u2019nda Arjantin ile şampiyonluk yaşadı ve turnuvanın en iyi kalecisi seçildi. Kendine olan inancı ve zihinsel dayanıklılığıyla öne çıktı. Martínez, genç kalecilere şunu öğretir: sabırla beklemek, fırsat geldiğinde hazır olmak ve büyük anlarda soğukkanlı kalmak kariyeri tamamen değiştirebilir.'
        },
        {
            name: 'Manuel Neuer',
            team: 'Bayern Münih',
            photo: 'manuel-neuer-story.jpg',
            story: 'Manuel Neuer, Almanya\u2019da Schalke altyapısında yetişti ve çok genç yaşta Bundesliga\u2019da parladı. 2011\u2019de Bayern Münih\u2019e katıldı ve modern kaleciliğin en önemli temsilcisi olarak devri başlattı. \u201cSweeper keeper\u201d (öne çıkan kaleci) rolünün öncüsü olarak ceza sahası dışına çıkıp topu kesebilmesiyle futbolu değiştirdi. 2014 Dünya Kupası\u2019nı Almanya ile kazandı ve sayısız kulüp şampiyonluğu yaşadı. Neuer, genç kalecilere şunu öğretir: doğru zamanda öne çıkmak ve oyunu önceden okumak, bir kalecinin en büyük silahlarından biridir.'
        }
    ];

    const isGK = document.body.classList.contains('goalkeeper-home');
    const isFB = document.body.classList.contains('fullback-home');
    const players = isGK ? goalkeeperPlayers : (isFB ? fullbackPlayers : defenderPlayers);

    function lockPageScroll() {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function unlockPageScroll() {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    function openStories() {
        if (!storiesOverlay) return;
        if (storyPanel && storyPanel.classList.contains('open')) closeStoryPanel();
        document.body.classList.add('nav-hidden', 'videos-hidden');
        storiesOverlay.classList.add('active');
        storiesOverlay.setAttribute('aria-hidden', 'false');
        lockPageScroll();
    }

    function closeStories() {
        if (!storiesOverlay) return;
        storiesOverlay.classList.remove('active');
        storiesOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-hidden', 'videos-hidden');
        unlockPageScroll();
        if (storyPanel) openStoryPanel();
    }

    function openNutrition() {
        if (!nutritionOverlay) return;
        if (storyPanel && storyPanel.classList.contains('open')) closeStoryPanel();
        document.body.classList.add('nav-hidden', 'videos-hidden');
        nutritionOverlay.classList.add('active');
        nutritionOverlay.setAttribute('aria-hidden', 'false');
        lockPageScroll();
    }

    function closeNutrition() {
        if (!nutritionOverlay) return;
        nutritionOverlay.classList.remove('active');
        nutritionOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-hidden', 'videos-hidden');
        unlockPageScroll();
        if (storyPanel) openStoryPanel();
    }

    function openScout() {
        if (!scoutOverlay) return;
        if (storyPanel && storyPanel.classList.contains('open')) closeStoryPanel();
        document.body.classList.add('nav-hidden', 'videos-hidden');
        scoutOverlay.classList.add('active');
        scoutOverlay.setAttribute('aria-hidden', 'false');
        lockPageScroll();
    }

    function closeScout() {
        if (!scoutOverlay) return;
        scoutOverlay.classList.remove('active');
        scoutOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-hidden', 'videos-hidden');
        unlockPageScroll();
        if (storyPanel) openStoryPanel();
    }

    function openJourney() {
        if (!journeyOverlay) return;
        if (storyPanel && storyPanel.classList.contains('open')) closeStoryPanel();
        document.body.classList.add('nav-hidden', 'videos-hidden');
        journeyOverlay.classList.add('active');
        journeyOverlay.setAttribute('aria-hidden', 'false');
        lockPageScroll();
    }

    function closeJourney() {
        if (!journeyOverlay) return;
        journeyOverlay.classList.remove('active');
        journeyOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-hidden', 'videos-hidden');
        unlockPageScroll();
        if (storyPanel) openStoryPanel();
    }

    function openStoryDetail(index) {
        const p = players[index];
        if (!p || !storyDetailModal || !storyDetailContent) return;
        storyDetailContent.innerHTML =
            '<img class="story-detail-photo" src="' + p.photo + '" alt="' + p.name + '" onerror="this.style.display=\'none\'">' +
            '<h3>' + p.name + '</h3>' +
            '<div class="story-detail-team">' + p.team + '</div>' +
            '<div class="story-detail-text">' + p.story + '</div>' +
            '<button class="story-detail-back-btn" id="innerBackBtn"><i class="fas fa-arrow-left"></i> Geri</button>';
        storyDetailModal.classList.add('active');
        storyDetailModal.setAttribute('aria-hidden', 'false');

        const innerBack = document.getElementById('innerBackBtn');
        if (innerBack) innerBack.addEventListener('click', closeStoryDetail);
    }

    function closeStoryDetail() {
        if (!storyDetailModal) return;
        storyDetailModal.classList.remove('active');
        storyDetailModal.setAttribute('aria-hidden', 'true');
    }

    if (storiesBtn) {
        storiesBtn.addEventListener('click', function() {
            renderStoriesGrid();
            openStories();
        });
    }

    if (storiesClose) {
        storiesClose.addEventListener('click', closeStories);
    }

    if (storiesBack) {
        storiesBack.addEventListener('click', closeStories);
    }

    if (nutritionOpenBtn) {
        nutritionOpenBtn.addEventListener('click', openNutrition);
    }

    if (nutritionBack) {
        nutritionBack.addEventListener('click', closeNutrition);
    }

    if (nutritionClose) {
        nutritionClose.addEventListener('click', closeNutrition);
    }

    if (scoutOpenBtn) {
        scoutOpenBtn.addEventListener('click', openScout);
    }

    if (scoutBack) {
        scoutBack.addEventListener('click', closeScout);
    }

    if (scoutClose) {
        scoutClose.addEventListener('click', closeScout);
    }

    if (journeyOpenBtn) {
        journeyOpenBtn.addEventListener('click', openJourney);
    }

    if (journeyBack) {
        journeyBack.addEventListener('click', closeJourney);
    }

    if (journeyClose) {
        journeyClose.addEventListener('click', closeJourney);
    }

    document.querySelectorAll('.nutrition-tile').forEach(function(tile) {
        tile.addEventListener('click', function(e) {
            e.preventDefault();
            var id = this.getAttribute('href').substring(1);
            var target = document.getElementById(id);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    function renderStoriesGrid() {
        if (!storiesGrid) return;
        storiesGrid.innerHTML = '';
        players.forEach((p, i) => {
            const card = document.createElement('button');
            card.className = 'stories-card';
            card.innerHTML = '<img src="' + p.photo + '" alt="' + p.name + '" onerror="this.style.display=\'none\'"><span class="stories-card-caption">' + p.name + '</span>';
            card.addEventListener('click', function() { openStoryDetail(i); });
            storiesGrid.appendChild(card);
        });
    }

    if (storyDetailClose) {
        storyDetailClose.addEventListener('click', closeStoryDetail);
    }

    if (storyDetailBack) {
        storyDetailBack.addEventListener('click', closeStoryDetail);
    }

    if (storiesOverlay && storyDetailModal) {
        storyDetailModal.addEventListener('click', function(e) {
            if (e.target === storyDetailModal) closeStoryDetail();
        });
    }

    if (storyDetailModal) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (storyDetailModal.classList.contains('active')) closeStoryDetail();
                else if (profileEditOverlay && profileEditOverlay.classList.contains('active')) closeProfileEdit();
                else if (settingsOverlay && settingsOverlay.classList.contains('active')) closeSettings();
                else if (nutritionOverlay && nutritionOverlay.classList.contains('active')) closeNutrition();
                else if (scoutOverlay && scoutOverlay.classList.contains('active')) closeScout();
                else if (journeyOverlay && journeyOverlay.classList.contains('active')) closeJourney();
                else if (statsOverlay && statsOverlay.classList.contains('active')) closeStats();
                else if (storiesOverlay && storiesOverlay.classList.contains('active')) closeStories();
            }
        });
    }

    // ============================================
    // İSTATİSTİKLERİM (TAM EKRAN + HAFTALIK TAKİP)
    // ============================================
    const TRAINING_LOG_KEY = 'defenderTrainingLog';
    const monthNames = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const statsOpenBtn = document.getElementById('statsOpenBtn');
    const statsBack = document.getElementById('statsBack');
    const statsClose = document.getElementById('statsClose');
    const statsOverlay = document.getElementById('statsOverlay');
    const statsWeekDays = document.getElementById('statsWeekDays');
    const defTrainDoneBtn = document.getElementById('defTrainDoneBtn');
    const statsLogList = document.getElementById('statsLogList');
    const physHeight = document.getElementById('physHeight');
    const physWeight = document.getElementById('physWeight');
    const physSaveBtn = document.getElementById('physSaveBtn');
    const physInfo = document.getElementById('physInfo');

    function openStats() {
        if (!statsOverlay) return;
        if (storyPanel && storyPanel.classList.contains('open')) closeStoryPanel();
        document.body.classList.add('nav-hidden', 'videos-hidden');
        statsOverlay.classList.add('active');
        statsOverlay.setAttribute('aria-hidden', 'false');
        lockPageScroll();
        renderPhysical();
        renderStatsWeek();
        renderLog();
    }

    function closeStats() {
        if (!statsOverlay) return;
        statsOverlay.classList.remove('active');
        statsOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-hidden', 'videos-hidden');
        unlockPageScroll();
        if (storyPanel) openStoryPanel();
    }

    // --- Fiziksel özellikler ---
    const PHYS_KEY = isGK ? 'gkPhysical' : (isFullbackPage ? 'fullbackPhysical' : 'defenderPhysical');

    function getPhysData() {
        try { return JSON.parse(localStorage.getItem(PHYS_KEY)) || null; }
        catch (e) { return null; }
    }

    function renderPhysical() {
        const p = getPhysData();
        if (physHeight) physHeight.value = (p && p.height) ? p.height : '';
        if (physWeight) physWeight.value = (p && p.weight) ? p.weight : '';
        if (physInfo) {
            if (p && p.height && p.weight) {
                const bmi = (p.weight / Math.pow(p.height / 100, 2)).toFixed(1);
                physInfo.innerHTML = 'Kayıtlı: <b>' + p.height + ' cm</b> / <b>' + p.weight + ' kg</b> · VKİ <b>' + bmi + '</b>';
            } else {
                physInfo.textContent = 'Henüz kayıt yok.';
            }
        }
    }

    if (physSaveBtn) {
        physSaveBtn.addEventListener('click', function() {
            const h = parseFloat(physHeight.value);
            const w = parseFloat(physWeight.value);
            if (!h || !w || h < 120 || h > 230 || w < 30 || w > 200) {
                if (physInfo) physInfo.textContent = 'Geçerli bir boy (120-230) ve kilo (30-200) gir.';
                return;
            }
            localStorage.setItem(PHYS_KEY, JSON.stringify({ height: h, weight: w }));
            renderPhysical();
        });
    }

    // --- Haftalık antrenman takibi ---
    function buildWeekButton(el, key, i, todayIndex, active, isPast, btnClass) {
        const plan = getPlanDays();
        const isRestDay = plan.length > 0 && i >= plan.length;
        const btn = document.createElement('button');
        btn.className = btnClass + (i === todayIndex ? ' today' : '') + (active ? ' active' : '') + (!isPast ? ' disabled' : '') + (isRestDay ? ' rest' : '');

        const name = document.createElement('span');
        name.className = 'week-tracker-btn-name';
        name.textContent = i === todayIndex ? 'Bugün' : (isRestDay ? 'Dinl.' : dayNames[i]);

        const dot = document.createElement('span');
        dot.className = 'week-btn-dot';
        dot.textContent = active ? '\u2713' : (isRestDay ? '\u2013' : '+');

        btn.appendChild(name);
        btn.appendChild(dot);

        if (isPast && !isRestDay && !active) {
            btn.addEventListener('click', function() {
                completeWeekDay(key, i);
            });
        }

        el.appendChild(btn);
    }

    function renderWeekButtons(el, btnClass) {
        if (!el) return;
        const data = getStreakData();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const mondayOffset = (today.getDay() + 6) % 7;
        const monday = new Date(today);
        monday.setDate(today.getDate() - mondayOffset);
        el.innerHTML = '';
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            const key = dateKey(d);
            const isPast = d.getTime() <= today.getTime();
            const active = !!data[key];
            buildWeekButton(el, key, i, mondayOffset, active, isPast, btnClass);
        }
    }

    function renderStatsWeek() {
        renderWeekButtons(statsWeekDays, 'stats-week-btn');
    }

    function renderWeekTracker() {
        renderDefTrainDone();
    }

    function renderDefTrainDone() {
        if (!defTrainDoneBtn) return;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const key = dateKey(today);
        const done = !!getStreakData()[key];
        const label = document.getElementById('defTrainDoneLabel');
        const status = document.getElementById('defTrainDoneStatus');
        if (done) {
            defTrainDoneBtn.classList.add('done');
            defTrainDoneBtn.disabled = true;
            if (label) label.textContent = 'Bugün tamamlandı';
            if (status) status.textContent = 'Seri günün ve antrenman günlüğün işaretlendi. Yarın tekrar görüşürüz!';
        } else {
            defTrainDoneBtn.classList.remove('done');
            defTrainDoneBtn.disabled = false;
            if (label) label.textContent = 'Bugün Antrenmanı Tamamla';
            if (status) status.textContent = 'Antrenmanı bitirdikten sonra butona dokun. İşaret geri alınamaz.';
        }
    }

    function completeWeekDay(key, i) {
        const data = getStreakData();
        const log = getTrainingLog();
        if (data[key]) {
            data[key] = true;
        } else {
            data[key] = true;
            const focus = focusForWeekIndex(typeof i === 'number' ? i : weekIndexForKey(key));
            log[key] = (focus && focus.length) ? focus : 'Genel Antrenman';
        }
        saveStreakData(data);
        saveTrainingLog(log);
        renderDefTrainDone();
        renderStreak();
        renderStatsWeek();
        renderLog();
    }

    function getTrainingLog() {
        try { return JSON.parse(localStorage.getItem(TRAINING_LOG_KEY)) || {}; }
        catch (e) { return {}; }
    }

    function saveTrainingLog(log) {
        localStorage.setItem(TRAINING_LOG_KEY, JSON.stringify(log));
    }

    function getPlanDays() {
        try { return JSON.parse(localStorage.getItem('defenderPlan')) || []; }
        catch (e) { return []; }
    }

    function savePlanDays(plan) {
        localStorage.setItem('defenderPlan', JSON.stringify(plan));
    }

    function buildProgramHtml(plan) {
        if (!plan || !plan.length) return '';
        let html = '<div class="result-program">';
        html += '<span class="result-tag">🎯 ' + plan.length + ' Günlük Stoper Programı</span>';
        plan.forEach(function(d) {
            if (d.rest) {
                html += '<div class="result-day"><div class="result-day-header"><span class="result-day-name">' + d.day + '</span><span class="result-day-focus">Dinlenme & Toparlanma</span></div><ul class="result-day-exercises"><li>Hafif koşu, mobilite ve esneme.</li></ul></div>';
                return;
            }
            html += '<div class="result-day"><div class="result-day-header"><span class="result-day-name">' + d.day + '</span><span class="result-day-focus">' + d.focus + '</span></div><ul class="result-day-exercises">';
            (d.exercises || []).forEach(function(ex) {
                html += '<li>' + ex + '</li>';
            });
            html += '</ul></div>';
        });
        html += '</div>';
        return html;
    }

    function weekIndexForKey(key) {
        const parts = key.split('-');
        const date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
        return (date.getDay() + 6) % 7;
    }

    function focusForWeekIndex(i) {
        const plan = getPlanDays();
        return (plan && plan[i]) ? (plan[i].focus || '') : '';
    }

    function renderLog() {
        if (!statsLogList) return;
        const log = getTrainingLog();
        const keys = Object.keys(log).sort().reverse();
        if (!keys.length) {
            statsLogList.innerHTML = '<div class="stats-log-empty">Henüz tamamlanmış antrenman yok. AI programındaki güne "Tamamladım" dokundukça günlüğe otomatik yazılır.</div>';
            return;
        }
        statsLogList.innerHTML = '';
        keys.forEach(function(key) {
            const parts = key.split('-');
            const date = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
            const dayLabel = dayNames[(date.getUTCDay() + 6) % 7] + ' · ' + (+parts[2]) + ' ' + monthNames[(+parts[1]) - 1];
            const item = document.createElement('div');
            item.className = 'stats-log-item';
            const info = document.createElement('div');
            info.className = 'stats-log-info';
            const dateSpan = document.createElement('span');
            dateSpan.className = 'stats-log-date';
            dateSpan.textContent = dayLabel;
            const focusSpan = document.createElement('span');
            focusSpan.className = 'stats-log-focus';
            focusSpan.textContent = log[key] || 'Antrenman';
            info.appendChild(dateSpan);
            info.appendChild(focusSpan);
            const done = document.createElement('i');
            done.className = 'fas fa-check-circle stats-log-done';
            item.appendChild(info);
            item.appendChild(done);
            statsLogList.appendChild(item);
        });
    }

    if (statsOpenBtn) {
        statsOpenBtn.addEventListener('click', openStats);
    }

    if (statsBack) {
        statsBack.addEventListener('click', closeStats);
    }

    if (statsClose) {
        statsClose.addEventListener('click', closeStats);
    }

    if (defTrainDoneBtn) {
        defTrainDoneBtn.addEventListener('click', function() {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            completeWeekDay(dateKey(today), (today.getDay() + 6) % 7);
        });
    }

    renderDefTrainDone();

    // ============================================
    // KALECI İSTATİSTİKLERİ (Kurtarış Sayacı + Maç Notları + İstatistik Verilerim)
    // ============================================
    var gkSavePenEl = document.getElementById('gkSavePen');
    var gkSaveOneVoneEl = document.getElementById('gkSaveOneVone');
    var gkGoalsConcededEl = document.getElementById('gkGoalsConceded');
    var gkCleanSheetEl = document.getElementById('gkCleanSheet');
    var gkSaveBtnEl = document.getElementById('gkSaveBtn');
    var gkNoteTextEl = document.getElementById('gkNoteText');
    var gkNoteAddEl = document.getElementById('gkNoteAdd');
    var statsDataOpenBtn = document.getElementById('statsDataOpenBtn');
    var statsDataBack = document.getElementById('statsDataBack');
    var statsDataClose = document.getElementById('statsDataClose');
    var statsDataOverlay = document.getElementById('statsDataOverlay');
    var statsDataStatsList = document.getElementById('statsDataStatsList');
    var statsDataNotesList = document.getElementById('statsDataNotesList');

    function gkFormatDate(d) {
        var dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        var monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear() + ', ' + dayNames[d.getDay()] + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }

    function getGkSaveLog() {
        try { return JSON.parse(localStorage.getItem('gkSaveLog')) || []; }
        catch (e) { return []; }
    }

    function getGkNotes() {
        try { return JSON.parse(localStorage.getItem('goalkeeperNotes')) || []; }
        catch (e) { return []; }
    }

    if (gkNoteAddEl) {
        gkNoteAddEl.addEventListener('click', function() {
            var text = (gkNoteTextEl.value || '').trim();
            if (!text) return;
            var notes = getGkNotes();
            notes.unshift({ date: gkFormatDate(new Date()), text: text });
            localStorage.setItem('goalkeeperNotes', JSON.stringify(notes));
            gkNoteTextEl.value = '';
            renderStatsDataNotes();
        });
    }

    // Clean Sheet açıksa yenilen gol sıfırlanır ve oynanamaz hale gelir
    if (gkCleanSheetEl && gkGoalsConcededEl) {
        var syncCleanSheet = function() {
            var cs = gkCleanSheetEl.checked;
            if (cs) {
                gkGoalsConcededEl.value = 0;
            }
            gkGoalsConcededEl.disabled = cs;
        };
        gkCleanSheetEl.addEventListener('change', syncCleanSheet);
        syncCleanSheet();
    }

    // --- Kurtarış Kaydetme (tarihli giriş) ---
    if (gkSaveBtnEl) {
        gkSaveBtnEl.addEventListener('click', function() {
            var pen = parseInt(gkSavePenEl ? gkSavePenEl.value : 0) || 0;
            var oneVone = parseInt(gkSaveOneVoneEl ? gkSaveOneVoneEl.value : 0) || 0;
            var conceded = gkCleanSheetEl && gkCleanSheetEl.checked ? 0 : (parseInt(gkGoalsConcededEl ? gkGoalsConcededEl.value : 0) || 0);
            var cs = gkCleanSheetEl && gkCleanSheetEl.checked ? 1 : 0;
            if (pen === 0 && oneVone === 0 && conceded === 0 && cs === 0) return;
            var log = getGkSaveLog();
            log.unshift({
                date: gkFormatDate(new Date()),
                pen: pen,
                oneVone: oneVone,
                conceded: conceded,
                cleanSheet: cs
            });
            localStorage.setItem('gkSaveLog', JSON.stringify(log));
            if (gkSavePenEl) gkSavePenEl.value = 0;
            if (gkSaveOneVoneEl) gkSaveOneVoneEl.value = 0;
            if (gkGoalsConcededEl) gkGoalsConcededEl.value = 0;
            if (gkCleanSheetEl) gkCleanSheetEl.checked = false;
        });
    }

    // --- İstatistik Verilerim: render ---
    function computeGkRating(log) {
        if (!log || log.length < 10) return null;
        var total = log.length;
        var sumPen = 0, sum1v1 = 0, sumConceded = 0, sumCS = 0;
        // Toplam şut = penaltı + 1v1 + yenilen gol (clean sheet ayrı)
        log.forEach(function(e) {
            sumPen += (e.pen || 0);
            sum1v1 += (e.oneVone || 0);
            sumConceded += (e.conceded || 0);
            if (e.cleanSheet && e.cleanSheet > 0) sumCS++;
        });
        // Kurtarış verimliliği: toplam kurtarış / (kurtarış + yenilen gol) — "tutma oranı"
        var totalSaves = sumPen + sum1v1;
        var saveRatio = (totalSaves + sumConceded) > 0 ? (totalSaves / (totalSaves + sumConceded)) * 100 : 0;
        // Temiz maç oranı: clean sheet yapılan maç / toplam maç
        var csRatio = total > 0 ? (sumCS / total) * 100 : 0;
        // Reyting: kurtarış verimliği %70, temiz maç %30 ağırlık
        var score = Math.round(saveRatio * 0.7 + csRatio * 0.3);
        score = Math.max(0, Math.min(100, score));

        var weakAreas = [];
        if (saveRatio < 55) weakAreas.push('saving');
        if (sum1v1 / total < 0.2) weakAreas.push('1v1');
        if (sumConceded / total > 2.5) weakAreas.push('conceded');
        if (csRatio < 15) weakAreas.push('cleansheet');

        return {
            score: score,
            saveRatio: saveRatio,
            csRatio: csRatio,
            sumPen: sumPen,
            sum1v1: sum1v1,
            sumConceded: sumConceded,
            sumCS: sumCS,
            total: total,
            avgSavesPerMatch: totalSaves / total,
            avgConceded: sumConceded / total,
            weakAreas: weakAreas,
            title: (score >= 80 ? 'Çok İyi — Profesyonel Seviye' :
                    score >= 65 ? 'İyi — Gelişmeye Devam' :
                    score >= 50 ? 'Orta — Potansiyel Var' : 'Gelişme Gerekli')
        };
    }

    function renderGkRating(log) {
        var box = document.getElementById('gkRatingBox');
        if (!box) return;
        var rating = computeGkRating(log);
        if (!rating) {
            box.style.display = 'none';
            return;
        }
        box.style.display = 'block';
        document.getElementById('gkRatingScore').textContent = rating.score;
        document.getElementById('gkRatingTitle').textContent = rating.title;
        document.getElementById('gkRatingSub').textContent = rating.total + ' maç tamamlandı · Ortalama kurtarış: ' + rating.avgSavesPerMatch.toFixed(1) + ' · Ortalama yenilen gol: ' + rating.avgConceded.toFixed(1);

        var bars = [
            { label: 'Kurtarış Verimliliği', pct: Math.round(rating.saveRatio), cls: rating.saveRatio >= 70 ? 'good' : (rating.saveRatio >= 45 ? 'mid' : 'bad') },
            { label: 'Temiz Maç (Clean Sheet) Oranı', pct: Math.round(rating.csRatio), cls: rating.csRatio >= 30 ? 'good' : (rating.csRatio >= 10 ? 'mid' : 'bad') }
        ];
        var barsHtml = '';
        bars.forEach(function(b) {
            barsHtml += '<div class="gk-rating-bar-row"><span class="gk-rating-bar-label">' + b.label + '</span><div class="gk-rating-bar-track"><div class="gk-rating-bar-fill ' + b.cls + '" style="width:' + b.pct + '%"></div></div><span class="gk-rating-bar-pct">%' + b.pct + '</span></div>';
        });
        document.getElementById('gkRatingBars').innerHTML = barsHtml;

        // AI önerileri
        var tips = [];
        if (rating.weakAreas.indexOf('saving') > -1) {
            tips.push('<strong>Kurtarış Verimliliği:</strong> Kurtarma oranın düşük. AI antrenmanında "Refleks & Reaksiyon" ve "Pozisyon & Hareket" çalışmalarına ağırlık ver. Donnarumma stili "bekle-izle-patla" penaltı tekniğini haftada 3 gün 20 tekrar pratik yap.');
        }
        if (rating.weakAreas.indexOf('1v1') > -1) {
            tips.push('<strong>1v1 Kurtarışlar:</strong> Karşı karşıya pozisyonlarda açılma zamanlamanı geliştir. Genişleme (expand) ve küçülme (shrink) tekniklerini çalış. AI antrenmanında "1v1 Karşı Karşıya" bölümünü seç.');
        }
        if (rating.weakAreas.indexOf('conceded') > -1) {
            tips.push('<strong>Yenilen Goller:</strong> Maç başına ortalama yenilen gol sayın yüksek. Pozisyon alma ve hava topu hakimiyetini geliştir. "Pozisyon & Hareket" ve "Hava Topu" antrenmanlarına katıl.');
        }
        if (rating.weakAreas.indexOf('cleansheet') > -1) {
            tips.push('<strong>Clean Sheet:</strong> Kale önü organizasyonunu güçlendir. Defansına sesli komutlarla hakim ol. Maç öncesi mental hazırlık ve uyku düzenini iyileştir (Beslenme & Uyku bölümüne bak).');
        }
        if (tips.length === 0) {
            tips.push('<strong>Mükemmel ilerleme!</strong> Şu anki performansın harika. Bu seviyeyi korumak için antrenman programını aksatmadan devam et.');
        }
        var tipsHtml = '<h4>🤖 AI Öneriler</h4><ul>';
        tips.forEach(function(t) { tipsHtml += '<li>' + t + '</li>'; });
        tipsHtml += '</ul>';
        document.getElementById('gkAiTips').innerHTML = tipsHtml;
    }

    function renderStatsDataStats() {
        if (!statsDataStatsList) return;
        var log = getGkSaveLog();
        renderGkRating(log);
        statsDataStatsList.innerHTML = '';
        if (log.length === 0) {
            statsDataStatsList.innerHTML = '<p class="statsdata-empty">Henüz kurtarış kaydı yok. İstatistiklerim sayfasından "Kaydet" butonunu kullan.</p>';
            return;
        }
        var items = log.slice().reverse();
        items.forEach(function(entry, i) {
            // Maç numarası: en eski kayıt = 1. maç, üstte görünür.
            var matchNo = i + 1;
            var id = log.length - 1 - i;
            var matchHeader = document.createElement('div');
            matchHeader.className = 'gk-match-header';
            var title = document.createElement('span');
            title.className = 'gk-match-title';
            title.textContent = matchNo + '. Maç';
            var date = document.createElement('span');
            date.className = 'gk-match-date';
            date.textContent = entry.date;
            matchHeader.appendChild(title);
            matchHeader.appendChild(date);

            var item = document.createElement('div');
            item.className = 'statsdata-item';
            var body = document.createElement('div');
            body.className = 'statsdata-item-body';
            body.innerHTML = '<span class="statsdata-stat">🧤 Penaltı Kurtarış: <b>' + entry.pen + '</b></span>' +
                '<span class="statsdata-stat">🎯 1v1 Kurtarış: <b>' + entry.oneVone + '</b></span>' +
                '<span class="statsdata-stat">⚽ Yenilen Gol: <b>' + entry.conceded + '</b></span>' +
                '<span class="statsdata-stat">🛡️ Clean Sheet: <b>' + (entry.cleanSheet > 0 ? 'Evet' : 'Hayır') + '</b></span>';
            var delBtn = document.createElement('button');
            delBtn.className = 'statsdata-delete';
            delBtn.textContent = 'Sil';
            delBtn.addEventListener('click', function() {
                var cur = getGkSaveLog();
                cur.splice(id, 1);
                localStorage.setItem('gkSaveLog', JSON.stringify(cur));
                renderStatsDataStats();
            });
            item.appendChild(body);
            item.appendChild(delBtn);

            var wrap = document.createElement('div');
            wrap.appendChild(matchHeader);
            wrap.appendChild(item);
            statsDataStatsList.appendChild(wrap);
        });
    }

    function renderStatsDataNotes() {
        if (!statsDataNotesList) return;
        var notes = getGkNotes();
        statsDataNotesList.innerHTML = '';
        if (notes.length === 0) {
            statsDataNotesList.innerHTML = '<p class="statsdata-empty">Henüz not eklenmemiş. Yukarıdaki kutudan maç notu ekleyebilirsin.</p>';
            return;
        }
        var len = notes.length;
        var items = notes.slice().reverse();
        items.forEach(function(note, i) {
            var id = len - 1 - i;
            var item = document.createElement('div');
            item.className = 'statsdata-item';
            var dateEl = document.createElement('span');
            dateEl.className = 'statsdata-item-date';
            dateEl.textContent = note.date;
            var textP = document.createElement('p');
            textP.className = 'statsdata-note-text';
            textP.textContent = note.text;
            var delBtn = document.createElement('button');
            delBtn.className = 'statsdata-delete';
            delBtn.textContent = 'Sil';
            delBtn.addEventListener('click', function() {
                var cur = getGkNotes();
                cur.splice(id, 1);
                localStorage.setItem('goalkeeperNotes', JSON.stringify(cur));
                renderStatsDataNotes();
            });
            item.appendChild(dateEl);
            item.appendChild(textP);
            item.appendChild(delBtn);
            statsDataNotesList.appendChild(item);
        });
    }

    // --- İstatistik Verilerim: open / close ---
    function openStatsData() {
        if (!statsDataOverlay) return;
        if (storyPanel && storyPanel.classList.contains('open')) closeStoryPanel();
        document.body.classList.add('nav-hidden', 'videos-hidden');
        statsDataOverlay.classList.add('active');
        statsDataOverlay.setAttribute('aria-hidden', 'false');
        lockPageScroll();
        renderStatsDataStats();
        renderStatsDataNotes();
    }

    function closeStatsData() {
        if (!statsDataOverlay) return;
        statsDataOverlay.classList.remove('active');
        statsDataOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-hidden', 'videos-hidden');
        unlockPageScroll();
        if (storyPanel) openStoryPanel();
    }

    if (statsDataOpenBtn) statsDataOpenBtn.addEventListener('click', openStatsData);
    if (statsDataBack) statsDataBack.addEventListener('click', closeStatsData);
    if (statsDataClose) statsDataClose.addEventListener('click', closeStatsData);

    // --- İstatistik Verilerim sekmeleri ---
    document.querySelectorAll('.statsdata-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.statsdata-tab').forEach(function(t) { t.classList.remove('active'); });
            document.querySelectorAll('.statsdata-panel').forEach(function(p) { p.classList.remove('active'); });
            tab.classList.add('active');
            var target = tab.getAttribute('data-statstab');
            if (target === 'stats') {
                document.getElementById('statsDataStatsPanel').classList.add('active');
            } else if (target === 'notes') {
                document.getElementById('statsDataNotesPanel').classList.add('active');
            }
        });
    });

    // --- Back/Close tuşunda Verilerim overlay'ini de kapat ---
    var origCloseStats = closeStats;
    closeStats = function() {
        origCloseStats();
        if (statsDataOverlay && statsDataOverlay.classList.contains('active')) closeStatsData();
    };

    // ESC tuşu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (statsDataOverlay && statsDataOverlay.classList.contains('active')) {
                closeStatsData();
                e.stopPropagation();
            }
        }
    });

    // Goalkeeper physical data uses different localStorage key
    if (document.body.classList.contains('goalkeeper-home') && physHeight && physWeight) {
        var gkPhysData;
        try { gkPhysData = JSON.parse(localStorage.getItem('goalkeeperPhysical')) || null; } catch (e) { gkPhysData = null; }
        if (gkPhysData && gkPhysData.height) physHeight.value = gkPhysData.height;
        if (gkPhysData && gkPhysData.weight) physWeight.value = gkPhysData.weight;
        if (physInfo) {
            if (gkPhysData && gkPhysData.height && gkPhysData.weight) {
                var gkBmi = (gkPhysData.weight / Math.pow(gkPhysData.height / 100, 2)).toFixed(1);
                physInfo.innerHTML = 'Kayıtlı: <b>' + gkPhysData.height + ' cm</b> / <b>' + gkPhysData.weight + ' kg</b> · VKİ <b>' + gkBmi + '</b>';
            } else {
                physInfo.textContent = 'Henüz kayıt yok.';
            }
        }
        if (physSaveBtn) {
            physSaveBtn.addEventListener('click', function() {
                var h = parseFloat(physHeight.value);
                var w = parseFloat(physWeight.value);
                if (!h || !w || h < 120 || h > 230 || w < 30 || w > 200) {
                    if (physInfo) physInfo.textContent = 'Geçerli bir boy (120-230) ve kilo (30-200) gir.';
                    return;
                }
                localStorage.setItem('goalkeeperPhysical', JSON.stringify({ height: h, weight: w }));
                var gd; try { gd = JSON.parse(localStorage.getItem('goalkeeperPhysical')); } catch(e) { gd = null; }
                if (gd && gd.height && gd.weight) {
                    var gb = (gd.weight / Math.pow(gd.height / 100, 2)).toFixed(1);
                    physInfo.innerHTML = 'Kayıtlı: <b>' + gd.height + ' cm</b> / <b>' + gd.weight + ' kg</b> · VKİ <b>' + gb + '</b>';
                }
            });
        }
    }

    // ============================================
    // STOPPER İSTATİSTİK VERİLERİM (Maç Kayıtları + Notlar + Reyting)
    // ============================================
    (function() {
        var defDataOpenBtn = document.getElementById('defStatsDataOpenBtn');
        var defDataBack = document.getElementById('defStatsDataBack');
        var defDataClose = document.getElementById('defStatsDataClose');
        var defDataOverlay = document.getElementById('defStatsDataOverlay');
        var defStatsList = document.getElementById('defStatsDataStatsList');
        var defNotesList = document.getElementById('defStatsDataNotesList');
        var dfSaveBtn = document.getElementById('dfSaveBtn');
        var dfDuel = document.getElementById('dfDuel');
        var dfAir = document.getElementById('dfAir');
        var dfTackle = document.getElementById('dfTackle');
        var dfPassOk = document.getElementById('dfPassOk');
        var dfLoss = document.getElementById('dfLoss');
        var dfNoteText = document.getElementById('dfNoteText');
        var dfNoteAdd = document.getElementById('dfNoteAdd');

        if (!defDataOverlay) return;

        function dfFormatDate(d) {
            var dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
            var monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
            return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear() + ', ' + dayNames[d.getDay()] + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
        }

        function getDefMatches() { try { return JSON.parse(localStorage.getItem('defMatchLog')) || []; } catch (e) { return []; } }
        function saveDefMatches(log) { localStorage.setItem('defMatchLog', JSON.stringify(log)); }
        function getDefNotes() { try { return JSON.parse(localStorage.getItem('defenderNotes')) || []; } catch (e) { return []; } }
        function saveDefNotes(n) { localStorage.setItem('defenderNotes', JSON.stringify(n)); }

        function lockDefScroll() { document.body.style.overflow = 'hidden'; }
        function unlockDefScroll() { document.body.style.overflow = ''; }

        function openDefStatsData() {
            defDataOverlay.classList.add('active');
            defDataOverlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('nav-hidden', 'videos-hidden');
            lockDefScroll();
            renderDefStats();
            renderDefNotes();
        }
        function closeDefStatsData() {
            defDataOverlay.classList.remove('active');
            defDataOverlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('nav-hidden', 'videos-hidden');
            unlockDefScroll();
        }

        if (defDataOpenBtn) defDataOpenBtn.addEventListener('click', openDefStatsData);
        if (defDataBack) defDataBack.addEventListener('click', closeDefStatsData);
        if (defDataClose) defDataClose.addEventListener('click', closeDefStatsData);

        document.querySelectorAll('.def-statsdata-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.def-statsdata-tab').forEach(function(t) { t.classList.remove('active'); });
                document.querySelectorAll('.def-statsdata-panel').forEach(function(p) { p.classList.remove('active'); });
                tab.classList.add('active');
                var target = tab.getAttribute('data-statstab');
                var panel = document.getElementById(target === 'notes' ? 'defStatsDataNotesPanel' : 'defStatsDataStatsPanel');
                if (panel) panel.classList.add('active');
            });
        });

        function renderDefStats() {
            if (!defStatsList) return;
            var log = getDefMatches();
            defStatsList.innerHTML = '';
            if (log.length === 0) {
                defStatsList.innerHTML = '<p class="statsdata-empty">Henüz maç kaydı yok. Yukarıdaki formdan ilk maç istatistiğini ekle.</p>';
                renderDefRating(log);
                return;
            }
            var len = log.length;
            var items = log.slice().reverse();
            for (var i = 0; i < len; i++) {
                (function(e, num, id) {
                    var item = document.createElement('div');
                    item.className = 'statsdata-item';
                    var head = document.createElement('div');
                    head.className = 'gk-match-header';
                    var title = document.createElement('span');
                    title.className = 'gk-match-title';
                    title.textContent = num + '. Maç';
                    var date = document.createElement('span');
                    date.className = 'gk-match-date';
                    date.textContent = e.date;
                    head.appendChild(title);
                    head.appendChild(date);
                    item.appendChild(head);

                    var body = document.createElement('div');
                    body.className = 'statsdata-item-body';
                    body.innerHTML =
                        '<span class="statsdata-stat">🤼 İkili Mücadele: <b>' + e.duel + '</b></span>' +
                        '<span class="statsdata-stat">🫸 Hava Topu: <b>' + e.air + '</b></span>' +
                        '<span class="statsdata-stat">🦶 Top Çalma: <b>' + e.tackle + '</b></span>' +
                        '<span class="statsdata-stat">🎯 İsabetli Pas: <b>' + e.passOk + '</b></span>' +
                        '<span class="statsdata-stat">📉 Top Kaybı: <b>' + e.loss + '</b></span>';
                    item.appendChild(body);

                    var delBtn = document.createElement('button');
                    delBtn.className = 'statsdata-delete';
                    delBtn.textContent = 'Sil';
                    delBtn.addEventListener('click', function() {
                        var cur = getDefMatches();
                        cur.splice(id, 1);
                        saveDefMatches(cur);
                        renderDefStats();
                    });
                    item.appendChild(delBtn);
                    defStatsList.appendChild(item);
                })(items[i], i + 1, len - 1 - i);
            }
            renderDefRating(log);
        }

        function renderDefNotes() {
            if (!defNotesList) return;
            var notes = getDefNotes();
            defNotesList.innerHTML = '';
            if (notes.length === 0) {
                defNotesList.innerHTML = '<p class="statsdata-empty">Henüz not eklenmemiş. Yukarıdaki kutudan maç notu ekleyebilirsin.</p>';
                return;
            }
            var len = notes.length;
            var items = notes.slice().reverse();
            for (var i = 0; i < len; i++) {
                (function(note, idx, id) {
                    var item = document.createElement('div');
                    item.className = 'statsdata-item';
                    var dateEl = document.createElement('span');
                    dateEl.className = 'statsdata-item-date';
                    dateEl.textContent = note.date;
                    var textP = document.createElement('p');
                    textP.className = 'statsdata-note-text';
                    textP.textContent = note.text;
                    var delBtn = document.createElement('button');
                    delBtn.className = 'statsdata-delete';
                    delBtn.textContent = 'Sil';
                    delBtn.addEventListener('click', function() {
                        var cur = getDefNotes();
                        cur.splice(id, 1);
                        saveDefNotes(cur);
                        renderDefNotes();
                    });
                    item.appendChild(dateEl);
                    item.appendChild(textP);
                    item.appendChild(delBtn);
                    defNotesList.appendChild(item);
                })(items[i], i, len - 1 - i);
            }
        }

        function computeDefRating(log) {
            if (!log || log.length < 10) return null;
            var total = log.length;
            var sDuel = 0, sAir = 0, sTackle = 0, sPassOk = 0, sLoss = 0;
            log.forEach(function(e) {
                sDuel += (e.duel || 0); sAir += (e.air || 0); sTackle += (e.tackle || 0);
                sPassOk += (e.passOk || 0); sLoss += (e.loss || 0);
            });
            var avgDuel = sDuel / total, avgAir = sAir / total, avgTackle = sTackle / total, avgPassOk = sPassOk / total, avgLoss = sLoss / total;
            // Pas skoru: maç başına hedeflenen isabetli pas (30) üzerinden
            var passScore = Math.min(100, (avgPassOk / 30) * 100);
            var defScore = Math.min(100, avgDuel * 11 + avgTackle * 14 + avgAir * 11 + passScore * 0.3);
            var score = Math.round(defScore * 0.6 + passScore * 0.4 - avgLoss * 5);
            score = Math.max(0, Math.min(100, score));
            var weak = [];
            if (avgDuel < 4) weak.push('duel');
            if (avgAir < 3) weak.push('air');
            if (avgTackle < 2) weak.push('tackle');
            if (avgPassOk < 15) weak.push('pass');
            if (avgLoss > 3) weak.push('loss');
            return {
                score: score, avgDuel: avgDuel, avgAir: avgAir, avgTackle: avgTackle,
                avgLoss: avgLoss, avgPassOk: avgPassOk, weak: weak,
                title: (score >= 80 ? 'Çok İyi — Profesyonel Seviye' :
                        score >= 65 ? 'İyi — Gelişmeye Devam' :
                        score >= 50 ? 'Orta — Potansiyel Var' : 'Gelişme Gerekli')
            };
        }

        function renderDefRating(log) {
            var box = document.getElementById('dfRatingBox');
            if (!box) return;
            var r = computeDefRating(log);
            if (!r) { box.style.display = 'none'; return; }
            box.style.display = 'block';
            var scoreEl = document.getElementById('dfRatingScore');
            var titleEl = document.getElementById('dfRatingTitle');
            var subEl = document.getElementById('dfRatingSub');
            var barsEl = document.getElementById('dfRatingBars');
            var tipsEl = document.getElementById('dfAiTips');
            if (scoreEl) scoreEl.textContent = r.score;
            if (titleEl) titleEl.textContent = r.title;
            if (subEl) subEl.textContent = log.length + ' maç tamamlandı';
            if (barsEl) {
                var bars = [
                    { label: 'İkili Mücadele /maç', val: r.avgDuel.toFixed(1), cls: r.avgDuel >= 5 ? 'good' : (r.avgDuel >= 3 ? 'mid' : 'bad') },
                    { label: 'Hava Topu /maç', val: r.avgAir.toFixed(1), cls: r.avgAir >= 4 ? 'good' : (r.avgAir >= 2 ? 'mid' : 'bad') },
                    { label: 'Top Çalma /maç', val: r.avgTackle.toFixed(1), cls: r.avgTackle >= 3 ? 'good' : (r.avgTackle >= 1.5 ? 'mid' : 'bad') },
                    { label: 'İsabetli Pas /maç', val: r.avgPassOk.toFixed(1), cls: r.avgPassOk >= 25 ? 'good' : (r.avgPassOk >= 12 ? 'mid' : 'bad') }
                ];
                var barsHtml = '';
                bars.forEach(function(b) {
                    barsHtml += '<div class="gk-rating-bar-row"><span class="gk-rating-bar-label">' + b.label + '</span><div class="gk-rating-bar-track"><div class="gk-rating-bar-fill ' + b.cls + '" style="width:' + Math.max(0, Math.min(100, parseFloat(b.val.replace('%', '')))) + '%"></div></div><span class="gk-rating-bar-pct">' + b.val + '</span></div>';
                });
                barsEl.innerHTML = barsHtml;
            }
            if (tipsEl) {
                if (r.weak.length === 0) {
                    tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><ul><li><strong>Mükemmel ilerleme!</strong> Tüm alanlarda dengeli bir performans sergiliyorsun. İstikrarı koruyarak reytingini yükseltebilirsin.</li></ul>';
                } else {
                    tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><p class="statsdata-empty">🧠 Analiz ediliyor... (yerel yapay zeka, birkaç saniye sürebilir)</p>';
                    var dfPlan = [];
                    try { dfPlan = JSON.parse(localStorage.getItem('defenderPlan')) || []; } catch (e) { dfPlan = []; }
                    fetch(API_BASE_URL + '/api/stats-advice', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ weak: r.weak, plan: dfPlan })
                    })
                    .then(function(res) { return res.json(); })
                    .then(function(data) {
                        if (data.success && data.advice) {
                            var safe = String(data.advice).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\s+/g, ' ').trim();
                            tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><p class="gk-ai-advice">' + safe + '</p>';
                        } else {
                            tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><p class="statsdata-empty">Öneri alınamadı: ' + (data.error || 'bilinmeyen hata') + '</p>';
                        }
                    })
                    .catch(function() {
                        tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><p class="statsdata-empty">Sunucuya bağlanılamadı. nextgen-server çalışıyor ve Ollama açık mı?</p>';
                    });
                }
            }
        }

        if (dfSaveBtn) {
            dfSaveBtn.addEventListener('click', function() {
                var duel = parseInt(dfDuel ? dfDuel.value : 0) || 0;
                var air = parseInt(dfAir ? dfAir.value : 0) || 0;
                var tackle = parseInt(dfTackle ? dfTackle.value : 0) || 0;
                var passOk = parseInt(dfPassOk ? dfPassOk.value : 0) || 0;
                var loss = parseInt(dfLoss ? dfLoss.value : 0) || 0;
                if (duel === 0 && air === 0 && tackle === 0 && passOk === 0 && loss === 0) return;
                var log = getDefMatches();
                log.unshift({ date: dfFormatDate(new Date()), duel: duel, air: air, tackle: tackle, passOk: passOk, loss: loss });
                saveDefMatches(log);
                if (dfDuel) dfDuel.value = 0;
                if (dfAir) dfAir.value = 0;
                if (dfTackle) dfTackle.value = 0;
                if (dfPassOk) dfPassOk.value = 0;
                if (dfLoss) dfLoss.value = 0;
                renderDefStats();
            });
        }

        if (dfNoteAdd) {
            dfNoteAdd.addEventListener('click', function() {
                var text = (dfNoteText.value || '').trim();
                if (!text) return;
                var notes = getDefNotes();
                notes.unshift({ date: dfFormatDate(new Date()), text: text });
                saveDefNotes(notes);
                dfNoteText.value = '';
                renderDefNotes();
            });
        }
    })();

    // ============================================
    // BEK İSTATİSTİK VERİLERİM (Maç Kayıtları + Notlar + Reyting)
    // ============================================
    (function() {
        var fbDataOpenBtn = document.getElementById('fbStatsDataOpenBtn');
        var fbDataBack = document.getElementById('fbStatsDataBack');
        var fbDataClose = document.getElementById('fbStatsDataClose');
        var fbDataOverlay = document.getElementById('fbStatsDataOverlay');
        var fbStatsList = document.getElementById('fbStatsDataStatsList');
        var fbNotesList = document.getElementById('fbStatsDataNotesList');
        var fbSaveBtn = document.getElementById('fbSaveBtn');
        var fbDuel = document.getElementById('fbDuel');
        var fbCross = document.getElementById('fbCross');
        var fbTackle = document.getElementById('fbTackle');
        var fbPassOk = document.getElementById('fbPassOk');
        var fbLoss = document.getElementById('fbLoss');
        var fbNoteText = document.getElementById('fbNoteText');
        var fbNoteAdd = document.getElementById('fbNoteAdd');

        if (!fbDataOverlay) return;

        function fbFormatDate(d) {
            var dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
            var monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
            return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear() + ', ' + dayNames[d.getDay()] + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
        }

        function getFbMatches() { try { return JSON.parse(localStorage.getItem('fbMatchLog')) || []; } catch (e) { return []; } }
        function saveFbMatches(log) { localStorage.setItem('fbMatchLog', JSON.stringify(log)); }
        function getFbNotes() { try { return JSON.parse(localStorage.getItem('fullbackNotes')) || []; } catch (e) { return []; } }
        function saveFbNotes(n) { localStorage.setItem('fullbackNotes', JSON.stringify(n)); }

        function lockFbScroll() { document.body.style.overflow = 'hidden'; }
        function unlockFbScroll() { document.body.style.overflow = ''; }

        function openFbStatsData() {
            fbDataOverlay.classList.add('active');
            fbDataOverlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('nav-hidden', 'videos-hidden');
            lockFbScroll();
            renderFbStats();
            renderFbNotes();
        }
        function closeFbStatsData() {
            fbDataOverlay.classList.remove('active');
            fbDataOverlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('nav-hidden', 'videos-hidden');
            unlockFbScroll();
        }

        if (fbDataOpenBtn) fbDataOpenBtn.addEventListener('click', openFbStatsData);
        if (fbDataBack) fbDataBack.addEventListener('click', closeFbStatsData);
        if (fbDataClose) fbDataClose.addEventListener('click', closeFbStatsData);

        document.querySelectorAll('.fb-statsdata-tab').forEach(function(tab) {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.fb-statsdata-tab').forEach(function(t) { t.classList.remove('active'); });
                document.querySelectorAll('.fb-statsdata-panel').forEach(function(p) { p.classList.remove('active'); });
                tab.classList.add('active');
                var target = tab.getAttribute('data-statstab');
                var panel = document.getElementById(target === 'notes' ? 'fbStatsDataNotesPanel' : 'fbStatsDataStatsPanel');
                if (panel) panel.classList.add('active');
            });
        });

        function renderFbStats() {
            if (!fbStatsList) return;
            var log = getFbMatches();
            fbStatsList.innerHTML = '';
            if (log.length === 0) {
                fbStatsList.innerHTML = '<p class="statsdata-empty">Henüz maç kaydı yok. İstatistiklerim sayfasından ilk maç istatistiğini ekle.</p>';
                renderFbRating(log);
                return;
            }
            var len = log.length;
            var items = log.slice().reverse();
            for (var i = 0; i < len; i++) {
                (function(e, num, id) {
                    var item = document.createElement('div');
                    item.className = 'statsdata-item';
                    var head = document.createElement('div');
                    head.className = 'gk-match-header';
                    var title = document.createElement('span');
                    title.className = 'gk-match-title';
                    title.textContent = num + '. Maç';
                    var date = document.createElement('span');
                    date.className = 'gk-match-date';
                    date.textContent = e.date;
                    head.appendChild(title);
                    head.appendChild(date);
                    item.appendChild(head);

                    var body = document.createElement('div');
                    body.className = 'statsdata-item-body';
                    body.innerHTML =
                        '<span class="statsdata-stat">🤼 İkili Mücadele: <b>' + e.duel + '</b></span>' +
                        '<span class="statsdata-stat">🎯 İsabetli Orta: <b>' + e.cross + '</b></span>' +
                        '<span class="statsdata-stat">🦶 Top Çalma: <b>' + e.tackle + '</b></span>' +
                        '<span class="statsdata-stat">🎯 İsabetli Pas: <b>' + e.passOk + '</b></span>' +
                        '<span class="statsdata-stat">📉 Top Kaybı: <b>' + e.loss + '</b></span>';
                    item.appendChild(body);

                    var delBtn = document.createElement('button');
                    delBtn.className = 'statsdata-delete';
                    delBtn.textContent = 'Sil';
                    delBtn.addEventListener('click', function() {
                        var cur = getFbMatches();
                        cur.splice(id, 1);
                        saveFbMatches(cur);
                        renderFbStats();
                    });
                    item.appendChild(delBtn);
                    fbStatsList.appendChild(item);
                })(items[i], i + 1, len - 1 - i);
            }
            renderFbRating(log);
        }

        function renderFbNotes() {
            if (!fbNotesList) return;
            var notes = getFbNotes();
            fbNotesList.innerHTML = '';
            if (notes.length === 0) {
                fbNotesList.innerHTML = '<p class="statsdata-empty">Henüz not eklenmemiş. İstatistiklerim sayfasından maç notu ekleyebilirsin.</p>';
                return;
            }
            var len = notes.length;
            var items = notes.slice().reverse();
            for (var i = 0; i < len; i++) {
                (function(note, idx, id) {
                    var item = document.createElement('div');
                    item.className = 'statsdata-item';
                    var dateEl = document.createElement('span');
                    dateEl.className = 'statsdata-item-date';
                    dateEl.textContent = note.date;
                    var textP = document.createElement('p');
                    textP.className = 'statsdata-note-text';
                    textP.textContent = note.text;
                    var delBtn = document.createElement('button');
                    delBtn.className = 'statsdata-delete';
                    delBtn.textContent = 'Sil';
                    delBtn.addEventListener('click', function() {
                        var cur = getFbNotes();
                        cur.splice(id, 1);
                        saveFbNotes(cur);
                        renderFbNotes();
                    });
                    item.appendChild(dateEl);
                    item.appendChild(textP);
                    item.appendChild(delBtn);
                    fbNotesList.appendChild(item);
                })(items[i], i, len - 1 - i);
            }
        }

        function computeFbRating(log) {
            if (!log || log.length < 5) return null;
            var total = log.length;
            var sDuel = 0, sCross = 0, sTackle = 0, sPassOk = 0, sLoss = 0;
            log.forEach(function(e) {
                sDuel += (e.duel || 0); sCross += (e.cross || 0); sTackle += (e.tackle || 0);
                sPassOk += (e.passOk || 0); sLoss += (e.loss || 0);
            });
            var avgDuel = sDuel / total, avgCross = sCross / total, avgTackle = sTackle / total, avgPassOk = sPassOk / total, avgLoss = sLoss / total;
            var passScore = Math.min(100, (avgPassOk / 30) * 100);
            var attackScore = Math.min(100, avgCross * 12);
            var defScore = Math.min(100, avgDuel * 8 + avgTackle * 12);
            var score = Math.round(defScore * 0.4 + attackScore * 0.3 + passScore * 0.3 - avgLoss * 5);
            score = Math.max(0, Math.min(100, score));
            var weak = [];
            if (avgDuel < 4) weak.push('duel');
            if (avgCross < 2) weak.push('cross');
            if (avgTackle < 2) weak.push('tackle');
            if (avgPassOk < 15) weak.push('pass');
            if (avgLoss > 3) weak.push('loss');
            return {
                score: score, avgDuel: avgDuel, avgCross: avgCross, avgTackle: avgTackle,
                avgLoss: avgLoss, avgPassOk: avgPassOk, weak: weak,
                title: (score >= 80 ? 'Çok İyi — Profesyonel Seviye' :
                        score >= 65 ? 'İyi — Gelişmeye Devam' :
                        score >= 50 ? 'Orta — Potansiyel Var' : 'Gelişme Gerekli')
            };
        }

        function renderFbRating(log) {
            var box = document.getElementById('fbRatingBox');
            if (!box) return;
            var r = computeFbRating(log);
            if (!r) { box.style.display = 'none'; return; }
            box.style.display = 'block';
            var scoreEl = document.getElementById('fbRatingScore');
            var titleEl = document.getElementById('fbRatingTitle');
            var subEl = document.getElementById('fbRatingSub');
            var barsEl = document.getElementById('fbRatingBars');
            var tipsEl = document.getElementById('fbAiTips');
            if (scoreEl) scoreEl.textContent = r.score;
            if (titleEl) titleEl.textContent = r.title;
            if (subEl) subEl.textContent = log.length + ' maç tamamlandı';
            if (barsEl) {
                var bars = [
                    { label: 'İkili Mücadele /maç', val: r.avgDuel.toFixed(1), cls: r.avgDuel >= 5 ? 'good' : (r.avgDuel >= 3 ? 'mid' : 'bad') },
                    { label: 'İsabetli Orta /maç', val: r.avgCross.toFixed(1), cls: r.avgCross >= 3 ? 'good' : (r.avgCross >= 1.5 ? 'mid' : 'bad') },
                    { label: 'Top Çalma /maç', val: r.avgTackle.toFixed(1), cls: r.avgTackle >= 3 ? 'good' : (r.avgTackle >= 1.5 ? 'mid' : 'bad') },
                    { label: 'İsabetli Pas /maç', val: r.avgPassOk.toFixed(1), cls: r.avgPassOk >= 25 ? 'good' : (r.avgPassOk >= 12 ? 'mid' : 'bad') }
                ];
                var barsHtml = '';
                bars.forEach(function(b) {
                    barsHtml += '<div class="gk-rating-bar-row"><span class="gk-rating-bar-label">' + b.label + '</span><div class="gk-rating-bar-track"><div class="gk-rating-bar-fill ' + b.cls + '" style="width:' + Math.max(0, Math.min(100, parseFloat(b.val.replace('%', '')))) + '%"></div></div><span class="gk-rating-bar-pct">' + b.val + '</span></div>';
                });
                barsEl.innerHTML = barsHtml;
            }
            if (tipsEl) {
                if (r.weak.length === 0) {
                    tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><ul><li><strong>Mükemmel ilerleme!</strong> Tüm alanlarda dengeli bir performans sergiliyorsun. İstikrarı koruyarak reytingini yükseltebilirsin.</li></ul>';
                } else {
                    tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><p class="statsdata-empty">🧠 Analiz ediliyor... (yerel yapay zeka, birkaç saniye sürebilir)</p>';
                    var fbPlan = [];
                    try { fbPlan = JSON.parse(localStorage.getItem('fullbackPlan')) || []; } catch (e) { fbPlan = []; }
                    fetch(API_BASE_URL + '/api/stats-advice', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ weak: r.weak, plan: fbPlan, position: 'bek' })
                    })
                    .then(function(res) { return res.json(); })
                    .then(function(data) {
                        if (data.success && data.advice) {
                            var safe = String(data.advice).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\s+/g, ' ').trim();
                            tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><p class="gk-ai-advice">' + safe + '</p>';
                        } else {
                            tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><p class="statsdata-empty">Öneri alınamadı: ' + (data.error || 'bilinmeyen hata') + '</p>';
                        }
                    })
                    .catch(function() {
                        tipsEl.innerHTML = '<h4>🤖 AI Öneriler</h4><p class="statsdata-empty">Sunucuya bağlanılamadı. nextgen-server çalışıyor mu?</p>';
                    });
                }
            }
        }

        if (fbSaveBtn) {
            fbSaveBtn.addEventListener('click', function() {
                var duel = parseInt(fbDuel ? fbDuel.value : 0) || 0;
                var cross = parseInt(fbCross ? fbCross.value : 0) || 0;
                var tackle = parseInt(fbTackle ? fbTackle.value : 0) || 0;
                var passOk = parseInt(fbPassOk ? fbPassOk.value : 0) || 0;
                var loss = parseInt(fbLoss ? fbLoss.value : 0) || 0;
                if (duel === 0 && cross === 0 && tackle === 0 && passOk === 0 && loss === 0) return;
                var log = getFbMatches();
                log.unshift({ date: fbFormatDate(new Date()), duel: duel, cross: cross, tackle: tackle, passOk: passOk, loss: loss });
                saveFbMatches(log);
                if (fbDuel) fbDuel.value = 0;
                if (fbCross) fbCross.value = 0;
                if (fbTackle) fbTackle.value = 0;
                if (fbPassOk) fbPassOk.value = 0;
                if (fbLoss) fbLoss.value = 0;
                renderFbStats();
            });
        }

        if (fbNoteAdd) {
            fbNoteAdd.addEventListener('click', function() {
                var text = (fbNoteText.value || '').trim();
                if (!text) return;
                var notes = getFbNotes();
                notes.unshift({ date: fbFormatDate(new Date()), text: text });
                saveFbNotes(notes);
                fbNoteText.value = '';
                renderFbNotes();
            });
        }
    })();

});
