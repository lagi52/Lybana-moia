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
    petal.style.animationDelay = '0s';
    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 16000);
}

// Запускаем лепестки
setInterval(createPetal, 800);
for (let i = 0; i < 6; i++) {
    setTimeout(createPetal, i * 400);
}

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

// ============ ПЕРЕХОД К ВОПРОСУ ============

const startButton = document.getElementById('start');
const intro = document.getElementById('intro');
const question1 = document.getElementById('question1');

startButton.addEventListener('click', () => {
    intro.style.opacity = '0';
    intro.style.transform = 'translate(-50%, -50%) scale(0.9)';

    setTimeout(() => {
        intro.style.display = 'none';
        question1.classList.add('show');
    }, 1000);
});

// ============ ВЫБОР ОТВЕТА ============

const optionButtons = document.querySelectorAll('.option-btn');
let selectedAnswer = null;

optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Снимаем выделение со всех
        optionButtons.forEach(b => b.classList.remove('selected'));
        // Выделяем выбранную
        btn.classList.add('selected');
        selectedAnswer = btn.getAttribute('data-answer');

        // Лёгкая пульсация панели
        const panel = btn.closest('.glass-panel');
        panel.style.transform = 'scale(1.02)';
        setTimeout(() => {
            panel.style.transform = 'scale(1)';
        }, 200);

        // Показываем, что ответ принят (позже добавим переход к следующему вопросу)
        console.log('Люба выбрала:', selectedAnswer);
    });
});
