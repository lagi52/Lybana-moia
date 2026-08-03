// ============ ЛЕПЕСТКИ ============
(function(){
    var c = document.getElementById('petals');
    var e = ['🌹','🥀','💜','🖤','✨','💫'];
    function p(){
        var d = document.createElement('div');
        d.className = 'petal';
        d.textContent = e[Math.floor(Math.random()*e.length)];
        d.style.left = Math.random()*100+'%';
        d.style.fontSize = (Math.random()*16+14)+'px';
        d.style.animationDuration = (Math.random()*8+8)+'s';
        c.appendChild(d);
        setTimeout(function(){ d.remove(); }, 16000);
    }
    setInterval(p, 900);
    for(var i=0;i<5;i++) setTimeout(p, i*500);
})();

// ============ МУЗЫКА ============
(function(){
    var btn = document.getElementById('musicToggle');
    var audio = document.getElementById('bgMusic');
    var playing = false;
    btn.addEventListener('click', function(){
        if(playing){ audio.pause(); btn.classList.remove('playing'); btn.querySelector('.music-icon').textContent='🎵'; }
        else { audio.play().catch(function(){}); btn.classList.add('playing'); btn.querySelector('.music-icon').textContent='🎶'; }
        playing = !playing;
    });
})();

// ============ ЭКРАНЫ ============
function showScreen(id){
    var s = document.getElementById(id);
    s.style.display = 'flex';
    setTimeout(function(){ s.classList.add('active'); }, 30);
}
function hideScreen(id){
    var s = document.getElementById(id);
    s.classList.remove('active');
    setTimeout(function(){ s.style.display = 'none'; }, 800);
}

// ============ ВЫБОР ОТВЕТОВ ============
var answers = {};
document.querySelectorAll('.options').forEach(function(opt){
    var qid = opt.getAttribute('data-question');
    answers[qid] = [];
    var next = opt.parentElement.querySelector('.next-btn');
    opt.querySelectorAll('.option-btn').forEach(function(btn){
        btn.addEventListener('click', function(){
            btn.classList.toggle('selected');
            var a = btn.textContent.trim();
            if(btn.classList.contains('selected')){
                if(answers[qid].indexOf(a)===-1) answers[qid].push(a);
            } else {
                answers[qid] = answers[qid].filter(function(x){ return x!==a; });
            }
            if(answers[qid].length > 0) next.classList.add('active');
            else next.classList.remove('active');
        });
    });
});

// ============ СООБЩЕНИЯ (СТРЕЛКА →) ============
function showMessages(msgId, nextId){
    var screen = document.getElementById(msgId);
    showScreen(msgId);
    var panel = screen.querySelector('.glass-panel');
    var msgs = screen.querySelectorAll('.message-text');
    var oldBtn = panel.querySelector('.continue-btn');
    if(oldBtn) oldBtn.style.display = 'none';
    var oldArrow = panel.querySelector('.arrow-wrapper');
    if(oldArrow) oldArrow.remove();

    var arrowWrap = document.createElement('div');
    arrowWrap.className = 'arrow-wrapper';
    arrowWrap.style.cssText = 'text-align:right; margin-top:12px;';
    var arrow = document.createElement('span');
    arrow.className = 'continue-arrow';
    arrow.innerHTML = '→';
    arrow.style.cssText = 'display:none;';
    arrowWrap.appendChild(arrow);
    panel.appendChild(arrowWrap);

    msgs.forEach(function(m, i){
        setTimeout(function(){ m.classList.add('show'); }, i * 2000);
    });

    var total = msgs.length * 2000 + 2000;
    setTimeout(function(){
        arrow.style.display = 'inline-block';
        arrow.onclick = function(){
            hideScreen(msgId);
            setTimeout(function(){ showScreen(nextId); }, 800);
        };
    }, total);
}

// ============ СТАРТ ============
document.getElementById('startBtn').addEventListener('click', function(){
    hideScreen('intro');
    setTimeout(function(){ showScreen('q1'); }, 800);
});

// ============ НАВИГАЦИЯ ============
document.getElementById('next1').addEventListener('click', function(){
    hideScreen('q1'); setTimeout(function(){ showMessages('msg1','q2'); }, 800);
});
document.getElementById('next2').addEventListener('click', function(){
    hideScreen('q2'); setTimeout(function(){ showMessages('msg2','q3'); }, 800);
});
document.getElementById('next3').addEventListener('click', function(){
    hideScreen('q3'); setTimeout(function(){ showMessages('msg3','q4'); }, 800);
});
document.getElementById('next4').addEventListener('click', function(){
    hideScreen('q4'); setTimeout(function(){ showMessages('msg4','q5'); }, 800);
});
document.getElementById('next5').addEventListener('click', function(){
    hideScreen('q5'); setTimeout(function(){ showScreen('q6'); }, 800);
});
document.getElementById('next6').addEventListener('click', function(){
    hideScreen('q6'); setTimeout(function(){ showScreen('confession'); startConfession(); }, 800);
});

// ============ ИСПОВЕДЬ ============
function startConfession(){
    var lines = [
        'Я мог бы просто сказать, что люблю тебя...',
        'Но этого было бы слишком мало.',
        'Поэтому я попросил целую вселенную...',
        '...помочь мне описать тебя.',
        'И вот что у неё получилось...'
    ];
    var container = document.getElementById('confessionLines');
    container.innerHTML = '';
    var panel = document.getElementById('confession').querySelector('.glass-panel');
    var oldBtn = document.getElementById('confessionCont');
    if(oldBtn) oldBtn.style.display = 'none';
    var oldArrow = panel.querySelector('.arrow-wrapper');
    if(oldArrow) oldArrow.remove();

    var arrowWrap = document.createElement('div');
    arrowWrap.className = 'arrow-wrapper';
    arrowWrap.style.cssText = 'text-align:right; margin-top:12px;';
    var arrow = document.createElement('span');
    arrow.className = 'continue-arrow';
    arrow.innerHTML = '→';
    arrow.style.cssText = 'display:none;';
    arrowWrap.appendChild(arrow);
    panel.appendChild(arrowWrap);

    lines.forEach(function(line, i){
        var p = document.createElement('p');
        p.className = 'confession-line';
        p.textContent = line;
        container.appendChild(p);
        setTimeout(function(){ p.classList.add('show'); }, i * 2200);
    });

    var total = lines.length * 2200 + 2000;
    setTimeout(function(){
        arrow.style.display = 'inline-block';
        arrow.onclick = function(){
            hideScreen('confession');
            setTimeout(function(){ showFinale(); }, 800);
        };
    }, total);
}

// ============ ФИНАЛ (С СОЗВЕЗДИЕМ НА ФОНЕ) ============
function showFinale(){
    var words = [
        'милая','симпатичная','красивая','хорошенькая','обаятельная',
        'очаровательная','привлекательная','прелестная','чудесная','прекрасная',
        'неотразимая','элегантная','утонченная','изящная','яркая',
        'эффектная','шикарная','безупречная','совершенная','идеальная',
        'бесподобная','сногсшибательная','несравненная','непревзойденная','замечательная',
        'удивительная','поразительная','изумительная','восхитительная','исключительная',
        'неповторимая','единственная','бесценная','обворожительная','соблазнительная',
        'сладкая','обольстительная','ослепительная','великолепная','неземная',
        'возвышенная','эфирная','весёлая','жизнерадостная','бодрая',
        'рассудительная','эрудированная','воспитанная','верная','преданная',
        'открытая','понимающая','искренняя','добрая','мягкая',
        'нежная','ласковая','заботливая','сентиментальная','романтичная',
        'чувственная','темпераментная','грациозная','волшебная','сказочная',
        'божественная','непостижимая','невероятная','загадочная','таинственная',
        'интересная','пленительная','незабываемая','не похожая на других'
    ];
    var container = document.getElementById('finaleWords');
    container.innerHTML = '';
    words.forEach(function(w, i){
        var span = document.createElement('span');
        span.textContent = w;
        container.appendChild(span);
        setTimeout(function(){ span.classList.add('show'); }, i * 100);
    });

    // Добавляем созвездие на фон
    addConstellationBg('finale');

    showScreen('finale');
    setTimeout(function(){
        var t = document.getElementById('finaleLove');
        t.innerHTML = 'Ты изменила меня. Спасибо тебе, что ты есть —<br>тихая, хорошая, тёплая, настоящая.<br><br>Люблю тебя. И буду любить, пока ты позволяешь...<br>и даже дольше. ❤️';
        t.classList.add('show');
    }, words.length*100+800);
    setTimeout(function(){
        document.querySelector('.secret-rose-container').classList.add('show');
    }, words.length*100+2500);
}

// ============ СЕКРЕТНАЯ РОЗА ============
document.getElementById('secretRose').addEventListener('click', function(){
    hideScreen('finale');
    removeConstellationBg();
    setTimeout(function(){
        var sec = document.getElementById('secretMessage');
        showScreen('secretMessage');
        addConstellationBg('secretMessage');
        sec.querySelectorAll('.message-text').forEach(function(m, i){
            setTimeout(function(){ m.classList.add('show'); }, i * 1200);
        });
    }, 800);
});
document.getElementById('backFromSecret').addEventListener('click', function(){
    hideScreen('secretMessage');
    removeConstellationBg();
    setTimeout(function(){ showFinale(); }, 800);
});

// ============ СОЗВЕЗДИЕ НА ФОНЕ ============

var constellationWishes = [
    'Пусть даже в самый тяжёлый день ты никогда не забываешь, насколько ты дорога.',
    'Я хочу, чтобы ты чаще улыбалась. Потому что твоя улыбка делает мир теплее.',
    'Желаю тебе всегда находить силы идти вперёд, даже если путь кажется сложным.',
    'Пусть рядом с тобой будут люди, которые действительно ценят тебя.',
    'И пусть однажды все твои мечты перестанут быть мечтами.',
    'Береги своё доброе сердце. Оно прекраснее любой звезды.',
    'Желаю тебе столько счастья, сколько звёзд сейчас над твоей головой.',
    'Даже если будет грустно — помни, ты никогда не была и не будешь для меня обычным человеком.',
    'Спасибо тебе просто за то, что ты есть.',
    'И если бы мне снова пришлось выбирать — я бы всё равно выбрал именно тебя.'
];

function addConstellationBg(parentId){
    removeConstellationBg();
    var bg = document.createElement('div');
    bg.id = 'constellationBg';
    bg.className = 'constellation-bg';

    // Позиции для 10 звёзд
    var positions = [
        {top:'8%', left:'15%'}, {top:'5%', left:'75%'},
        {top:'25%', left:'8%'}, {top:'20%', left:'85%'},
        {top:'40%', left:'20%'}, {top:'35%', left:'78%'},
        {top:'55%', left:'12%'}, {top:'50%', left:'88%'},
        {top:'70%', left:'22%'}, {top:'65%', left:'72%'}
    ];

    // Полярная звезда
    var polar = document.createElement('div');
    polar.className = 'constellation-bg-star';
    polar.innerHTML = '🌟';
    polar.style.cssText = 'position:absolute; top:38%; left:44%; font-size:44px; animation:starFloat 2.5s ease-in-out infinite; filter:drop-shadow(0 0 16px rgba(255,215,0,0.9));';
    polar.setAttribute('data-wish', 'polar');
    polar.style.pointerEvents = 'all';
    polar.style.cursor = 'pointer';
    polar.addEventListener('click', function(e){
        e.stopPropagation();
        showWishCard('polar');
    });
    bg.appendChild(polar);

    positions.forEach(function(pos, i){
        var star = document.createElement('div');
        star.className = 'constellation-bg-star';
        star.innerHTML = '⭐';
        star.style.cssText = 'position:absolute; top:'+pos.top+'; left:'+pos.left+'; font-size:26px; animation-delay:'+(i*0.3)+'s;';
        star.setAttribute('data-wish', i);
        star.style.pointerEvents = 'all';
        star.style.cursor = 'pointer';
        star.addEventListener('click', function(e){
            e.stopPropagation();
            showWishCard(i);
        });
        bg.appendChild(star);
    });

    document.body.appendChild(bg);
}

function removeConstellationBg(){
    var bg = document.getElementById('constellationBg');
    if(bg) bg.remove();
}

function showWishCard(index){
    var oldCard = document.querySelector('.wish-card-overlay');
    if(oldCard) oldCard.remove();

    var overlay = document.createElement('div');
    overlay.className = 'wish-card-overlay';

    var card = document.createElement('div');
    card.className = 'glass-panel';
    card.style.cssText = 'max-width:450px; animation:cardAppear 0.5s ease;';

    if(index === 'polar'){
        card.innerHTML = '<h2 style="font-size:20px; margin-bottom:16px;">🌟 Полярная звезда</h2><p style="font-size:17px; color:#e0d0f0; line-height:1.7;">Пока существует хотя бы одна звезда во Вселенной...<br><br>я буду желать тебе счастья.<br><br>❤️</p>';
    } else {
        card.innerHTML = '<h2 style="font-size:20px; margin-bottom:16px;">⭐ Пожелание '+(index+1)+'</h2><p style="font-size:17px; color:#e0d0f0; line-height:1.7;">'+constellationWishes[index]+'</p>';
    }

    var closeBtn = document.createElement('button');
    closeBtn.className = 'glow-btn';
    closeBtn.textContent = 'Закрыть';
    closeBtn.addEventListener('click', function(){ overlay.remove(); });
    card.appendChild(closeBtn);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e){
        if(e.target === overlay) overlay.remove();
    });

    // Золотим звезду
    if(index !== 'polar'){
        var stars = document.querySelectorAll('.constellation-bg-star[data-wish="'+index+'"]');
        stars.forEach(function(s){
            s.innerHTML = '🌟';
            s.style.filter = 'drop-shadow(0 0 12px rgba(255,215,0,0.9))';
        });
    }
}
