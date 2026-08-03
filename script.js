// ============ ЛЕПЕСТКИ ============

const petalsContainer = document.getElementById('petals');
const petalEmojis = ['🌹', '🥀', '💜', '🖤', '✨', '💫'];

function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (Math.random() * 16 + 14) + 'px';
    petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 16000);
}

setInterval(createPetal, 900);
for (let i = 0; i < 5; i++) setTimeout(createPetal, i * 500);

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

// ============ ЭКРАНЫ ============

const screens = {
    intro: document.getElementById('intro'),
    bridge: document.getElementById('bridge'),
    q1: document.getElementById('q1'),
    q2: document.getElementById('q2'),
    q3: document.getElementById('q3'),
    q4: document.getElementById('q4'),
    q5: document.getElementById('q5'),
    confession: document.getElementById('confession'),
    finale: document.getElementById('finale')
};

function showScreen(screen) {
    screen.style.display = 'flex';
    setTimeout(() => screen.classList.add('show'), 50);
}

function hideScreen(screen) {
    screen.classList.remove('show');
    setTimeout(() => { screen.style.display = 'none'; }, 1200);
}

// ============ ВЫБОР ОТВЕТОВ ============

const allAnswers = {};

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

            if (allAnswers[questionId].length > 0) {
                nextBtn.classList.add('active');
            } else {
                nextBtn.classList.remove('active');
            }
        });
    });
});

// ============ ФРАЗЫ-МОСТИКИ ============

const bridges = {
    'q1': 'Но это только настроение...<br>А что делает тебя по-настоящему счастливой?',
    'q2': 'Счастье — это важно...<br>Но какой ты себя видишь?',
    'q3': 'Ты знаешь, какая ты...<br>Но что тебе по-настоящему близко?',
    'q4': 'И всё же...<br>Есть что-то, что делает тебя особенной.',
};

function showBridge(fromQuestionId, nextScreen) {
    const bridgeText = document.getElementById('bridgeText');
    bridgeText.innerHTML = bridges[fromQuestionId] || '...';
    showScreen(screens.bridge);

    setTimeout(() => {
        hideScreen(screens.bridge);
        setTimeout(() => showScreen(nextScreen), 1200);
    }, 3000);
}

// ============ НАВИГАЦИЯ ============

document.getElementById('start').addEventListener('click', () => {
    hideScreen(screens.intro);
    setTimeout(() => showScreen(screens.q1), 1200);
});

document.querySelectorAll('.next-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const currentScreen = btn.closest('.question-screen');
        const currentId = currentScreen.id;
        const nextId = 'q' + (parseInt(currentId.replace('q', '')) + 1);

        hideScreen(currentScreen);

        setTimeout(() => {
            if (nextId === 'q6') {
                showConfession();
            } else {
                showBridge(currentId, screens[nextId]);
            }
        }, 1200);
    });
});

// ============ ТИХАЯ ИСПОВЕДЬ ============

function showConfession() {
    const lines = [
        'Я мог бы просто сказать, что люблю тебя...',
        'Но этого было бы слишком мало.',
        'Поэтому я попросил целую вселенную...',
        '...помочь мне описать тебя.',
        'И вот что у неё получилось...'
    ];

    const container = document.getElementById('confessionLines');
    container.innerHTML = '';

    lines.forEach((line, i) => {
        const p = document.createElement('p');
        p.classList.add('confession-line');
        p.textContent = line;
        container.appendChild(p);

        setTimeout(() => {
            p.classList.add('show');
        }, i * 1800);
    });

    showScreen(screens.confession);

    // Переход к финалу
    setTimeout(() => {
        hideScreen(screens.confession);
        setTimeout(() => showFinale(), 1200);
    }, lines.length * 1800 + 1500);
}

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

    const container = document.getElementById('finaleWords');
    container.innerHTML = '';

    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        container.appendChild(span);

        setTimeout(() => {
            span.classList.add('show');
        }, i * 80);
    });

    showScreen(screens.finale);

    // Финальная фраза
    setTimeout(() => {
        const loveText = document.getElementById('finaleLove');
        loveText.innerHTML = 'Пока существует хотя бы одна звезда...<br>...я буду выбирать тебя. ❤️';
        loveText.classList.add('show');
    }, words.length * 80 + 1000);
}

// ============ КНОПКА ПОВТОРА ============

document.getElementById('replayBtn').addEventListener('click', () => {
    location.reload();
});
