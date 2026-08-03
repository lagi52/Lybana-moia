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
                if (!allAnswers[questionId].includes(answer)) allAnswers[questionId].push(answer);
            } else {
                allAnswers[questionId] = allAnswers[questionId].filter(a => a !== answer);
            }
            nextBtn.classList.toggle('active', allAnswers[questionId].length > 0);
        });
    });
});

// ============ ПОКАЗ СООБЩЕНИЙ (С КНОПКОЙ) ============

function showMessages(screenId, nextScreenId) {
    const screen = document.getElementById(screenId);
    showScreen(screen);

    const messages = screen.querySelectorAll('.message-text');
    const continueBtn = screen.querySelector('.continue-btn');

    // Показываем сообщения по очереди
    messages.forEach((msg, i) => {
        setTimeout(() => msg.classList.add('show'), i * 1000);
    });

    // Показываем кнопку после последнего сообщения
    setTimeout(() => {
        continueBtn.style.display = 'inline-block';
        continueBtn.style.animation = 'btnAppear 0.8s ease';
    }, messages.length * 1000 + 500);

    // По нажатию — переход
    continueBtn.onclick = () => {
        hideScreen(screen);
        setTimeout(() => showScreen(document.getElementById(nextScreenId)), 1200);
    };
}

// ============ НАВИГАЦИЯ ============

document.getElementById('start').addEventListener('click', () => {
    hideScreen(document.getElementById('intro'));
    setTimeout(() => showScreen(document.getElementById('q1')), 1200);
});

document.querySelector('#q1 .next-btn').addEventListener('click', () => {
    hideScreen(document.getElementById('q1'));
    setTimeout(() => showMessages('msg1', 'q2'), 1200);
});

document.querySelector('#q2 .next-btn').addEventListener('click', () => {
    hideScreen(document.getElementById('q2'));
    setTimeout(() => showMessages('msg2', 'q3'), 1200);
});

document.querySelector('#q3 .next-btn').addEventListener('click', () => {
    hideScreen(document.getElementById('q3'));
    setTimeout(() => showMessages('msg3', 'q4'), 1200);
});

document.querySelector('#q4 .next-btn').addEventListener('click', () => {
    hideScreen(document.getElementById('q4'));
    setTimeout(() => showMessages('msg4', 'q5'), 1200);
});

document.querySelector('#q5 .next-btn').addEventListener('click', () => {
    hideScreen(document.getElementById('q5'));
    setTimeout(() => showScreen(document.getElementById('q6')), 1200);
});

document.querySelector('#q6 .next-btn').addEventListener('click', () => {
    hideScreen(document.getElementById('q6'));
    setTimeout(() => showScreen(document.getElementById('confession')), 1200);
});

// ============ ИСПОВЕДЬ (С КНОПКОЙ) ============

const confessionScreen = document.getElementById('confession');
const confessionObserver = new MutationObserver(() => {
    if (confessionScreen.classList.contains('show')) startConfession();
});
confessionObserver.observe(confessionScreen, { attributes: true, attributeFilter: ['class'] });

function startConfession() {
    const lines = [
        'Я мог бы просто сказать, что люблю тебя...',
        'Но этого было бы слишком мало.',
        'Поэтому я попросил целую вселенную...',
        '...помочь мне описать тебя.',
        'И вот что у неё получилось...'
    ];
    const container = document.getElementById('confessionLines');
    const continueBtn = document.getElementById('confessionContinue');
    container.innerHTML = '';
    continueBtn.style.display = 'none';

    lines.forEach((line, i) => {
        const p = document.createElement('p');
        p.classList.add('confession-line');
        p.textContent = line;
        container.appendChild(p);
        setTimeout(() => p.classList.add('show'), i * 1800);
    });

    setTimeout(() => {
        continueBtn.style.display = 'inline-block';
    }, lines.length * 1800 + 500);

    continueBtn.onclick = () => {
        hideScreen(confessionScreen);
        setTimeout(() => showFinale(), 1200);
    };
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
        setTimeout(() => span.classList.add('show'), i * 80);
    });

    showScreen(document.getElementById('finale'));

    setTimeout(() => {
        const loveText = document.getElementById('finaleLove');
        loveText.innerHTML = 'Ты изменила меня. Спасибо тебе, что ты есть —<br>тихая, хорошая, тёплая, настоящая.<br><br>Люблю тебя. И буду любить, пока ты позволяешь...<br>и даже дольше. ❤️';
        loveText.classList.add('show');
    }, words.length * 80 + 800);

    setTimeout(() => {
        document.querySelector('.secret-rose-container').classList.add('show');
    }, words.length * 80 + 2500);
}

// ============ СЕКРЕТНАЯ РОЗА ============

document.getElementById('secretRose').addEventListener('click', () => {
    hideScreen(document.getElementById('finale'));
    setTimeout(() => {
        const secretScreen = document.getElementById('secretMessage');
        showScreen(secretScreen);
        secretScreen.querySelectorAll('.message-text').forEach((msg, i) => {
            setTimeout(() => msg.classList.add('show'), i * 1000);
        });
    }, 1200);
});

document.getElementById('backFromSecret').addEventListener('click', () => {
    hideScreen(document.getElementById('secretMessage'));
    setTimeout(() => showScreen(document.getElementById('finale')), 1200);
});
