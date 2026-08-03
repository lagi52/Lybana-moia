// ============ ЛЕПЕСТКИ ============

const petalsContainer = document.getElementById('petals');
const petalEmojis = ['🌹', '🥀', '💜', '🖤', '✨', '💫'];

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (Math.random() * 20 + 16) + 'px';
    petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 16000);
}

setInterval(createPetal, 800);
for (let i = 0; i < 6; i++) setTimeout(createPetal, i * 400);

// ============ МУЗЫКА ============

const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let musicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.music-icon').textContent = '🎵';
    } else {
        bgMusic.play().catch(() => {});
        musicToggle.classList.add('playing');
        musicToggle.querySelector('.music-icon').textContent = '🎶';
    }
    musicPlaying = !musicPlaying;
});

// ============ ВЫБОР НЕСКОЛЬКИХ ОТВЕТОВ ============

const allAnswers = {}; // Хранилище всех ответов

document.querySelectorAll('.options').forEach(optionsContainer => {
    const questionId = optionsContainer.getAttribute('data-question');
    allAnswers[questionId] = [];

    const nextBtn = optionsContainer.parentElement.querySelector('.next-btn');

    optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');

            const answer = btn.textContent.trim();

            if (btn.classList.contains('selected')) {
                if (!allAnswers[questionId].includes(answer)) {
                    allAnswers[questionId].push(answer);
                }
            } else {
                allAnswers[questionId] = allAnswers[questionId].filter(a => a !== answer);
            }

            // Активируем кнопку "Продолжить"
            if (allAnswers[questionId].length > 0) {
                nextBtn.classList.add('active');
            } else {
                nextBtn.classList.remove('active');
            }
        });
    });
});

// ============ ПЕРЕХОДЫ МЕЖДУ ЭКРАНАМИ ============

const screens = {
    intro: document.getElementById('intro'),
    q1: document.getElementById('q1'),
    q2: document.getElementById('q2'),
    q3: document.getElementById('q3'),
    q4: document.getElementById('q4'),
    q5: document.getElementById('q5'),
    summary: document.getElementById('summary'),
    finale: document.getElementById('finale')
};

function showScreen(screen) {
    screen.classList.add('show');
}

function hideScreen(screen) {
    screen.classList.remove('show');
    setTimeout(() => { screen.style.display = 'none'; }, 1000);
}

// Пролог → Вопрос 1
document.getElementById('start').addEventListener('click', () => {
    screens.intro.style.opacity = '0';
    setTimeout(() => {
        screens.intro.style.display = 'none';
        showScreen(screens.q1);
    }, 1000);
});

// Навигация по вопросам
const nextButtons = document.querySelectorAll('.next-btn');
nextButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const currentScreen = btn.closest('.question-screen');
        const currentId = currentScreen.id;
        const nextId = 'q' + (parseInt(currentId.replace('q', '')) + 1);

        hideScreen(currentScreen);

        setTimeout(() => {
            if (nextId === 'q6') {
                // Показываем сбор ответов
                showSummary();
            } else {
                showScreen(screens[nextId]);
            }
        }, 1000);
    });
});

// ============ СБОР ОТВЕТОВ ============

function showSummary() {
    const summaryDiv = document.getElementById('summaryAnswers');
    summaryDiv.innerHTML = '';

    let allSelected = [];
    for (const q in allAnswers) {
        allSelected = allSelected.concat(allAnswers[q]);
    }

    allSelected.forEach((answer, i) => {
        const tag = document.createElement('span');
        tag.classList.add('answer-tag');
        tag.textContent = answer.replace(/[^\w\sа-яА-ЯёЁ]/g, '').trim();
        tag.style.animationDelay = (i * 0.15) + 's';
        summaryDiv.appendChild(tag);
    });

    showScreen(screens.summary);
}

// ============ ПЕРЕХОД К ФИНАЛУ ============

document.getElementById('toFinale').addEventListener('click', () => {
    hideScreen(screens.summary);
    setTimeout(() => {
        showFinale();
    }, 1000);
});

// ============ ФИНАЛ ============

function showFinale() {
    const words = [
        'милая', 'симпатичная', 'красивая', 'хорошенькая', 'обаятельная',
        'очаровательная', 'привлекательная', 'прелестная', 'чудесная', 'прекрасная',
        'неотразимая', 'элегантная', 'утонченная', 'изящная', 'яркая',
        'эффектная', 'шикарная', 'безупречная', 'совершенная', 'идеальная',
        'бесподобная', 'сногсшибательная', 'несравненная', 'непревзойденная', 'замечательная',
        'удивительная', 'поразительная', 'изумительная', 'восхитительная', 'исключительная',
        'неповторимая', 'единственная', 'бесценная', 'обворожительная', 'соблазнительная',
        'сладкая', 'обольстительная', 'ослепительная', 'великолепная', 'неземная',
        'возвышенная', 'эфирная', 'весёлая', 'жизнерадостная', 'бодрая',
        'рассудительная', 'эрудированная', 'воспитанная', 'верная', 'преданная',
        'открытая', 'понимающая', 'искренняя', 'добрая', 'мягкая',
        'нежная', 'ласковая', 'заботливая', 'сентиментальная', 'романтичная',
        'чувственная', 'темпераментная', 'грациозная', 'волшебная', 'сказочная',
        'божественная', 'непостижимая', 'невероятная', 'загадочная', 'таинственная',
        'интересная', 'пленительная', 'незабываемая', 'не похожая на других'
    ];

    const finaleDiv = document.getElementById('finaleWords');
    finaleDiv.innerHTML = '';

    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.margin = '0 6px';
        span.style.transition = 'opacity 0.5s ease';
        finaleDiv.appendChild(span);

        setTimeout(() => {
            span.style.opacity = '1';
        }, i * 100);
    });

    showScreen(screens.finale);
}
