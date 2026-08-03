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

// ============ СООБЩЕНИЯ (СТРЕЛКА → В УГЛУ) ============
function showMessages(msgId, nextId){
    var screen = document.getElementById(msgId);
    showScreen(msgId);

    var panel = screen.querySelector('.glass-panel');
    var msgs = screen.querySelectorAll('.message-text');

    // Скрываем старую кнопку "Дальше" если есть
    var oldBtn = panel.querySelector('.continue-btn');
    if(oldBtn) oldBtn.style.display = 'none';

    // Удаляем старую стрелку если есть
    var oldArrow = panel.querySelector('.continue-arrow');
    if(oldArrow) oldArrow.remove();

    // Создаём контейнер для стрелки (в правом нижнем углу)
    var arrowWrap = document.createElement('div');
    arrowWrap.className = 'arrow-wrapper';
    arrowWrap.style.cssText = 'text-align:right; margin-top:12px;';

    var arrow = document.createElement('span');
    arrow.className = 'continue-arrow';
    arrow.innerHTML = '→';
    arrow.style.cssText = 'display:none; font-size:26px; color:rgba(255,255,255,0.5); cursor:pointer; animation:arrowPulse 2s ease-in-out infinite; transition:color 0.3s;';
    arrowWrap.appendChild(arrow);
    panel.appendChild(arrowWrap);

    // Стиль для анимации (добавим динамически)
    if(!document.getElementById('arrowStyle')){
        var style = document.createElement('style');
        style.id = 'arrowStyle';
        style.textContent = '@keyframes arrowPulse{0%,100%{opacity:0.4;text-shadow:0 0 4px rgba(180,130,255,0.2);}50%{opacity:1;text-shadow:0 0 12px rgba(180,130,255,0.6);}}';
        document.head.appendChild(style);
    }

    // Показываем текст медленно
    msgs.forEach(function(m, i){
        setTimeout(function(){ m.classList.add('show'); }, i * 2000);
    });

    // Стрелка появляется после последнего сообщения
    var total = msgs.length * 2000 + 2000;
    setTimeout(function(){
        arrow.style.display = 'inline-block';
        arrow.onclick = function(){
            hideScreen(msgId);
            setTimeout(function(){ showScreen(nextId); }, 800);
        };
        arrow.addEventListener('mouseenter', function(){ this.style.color = 'rgba(200,160,255,0.9)'; });
        arrow.addEventListener('mouseleave', function(){ this.style.color = 'rgba(255,255,255,0.5)'; });
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

// ============ ИСПОВЕДЬ (СТРЕЛКА → В УГЛУ) ============
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

    // Скрываем старую кнопку
    var oldBtn = document.getElementById('confessionCont');
    if(oldBtn) oldBtn.style.display = 'none';

    // Удаляем старую стрелку
    var oldArrow = panel.querySelector('.arrow-wrapper');
    if(oldArrow) oldArrow.remove();

    // Создаём стрелку
    var arrowWrap = document.createElement('div');
    arrowWrap.className = 'arrow-wrapper';
    arrowWrap.style.cssText = 'text-align:right; margin-top:12px;';

    var arrow = document.createElement('span');
    arrow.className = 'continue-arrow';
    arrow.innerHTML = '→';
    arrow.style.cssText = 'display:none; font-size:26px; color:rgba(255,255,255,0.5); cursor:pointer; animation:arrowPulse 2s ease-in-out infinite; transition:color 0.3s;';
    arrowWrap.appendChild(arrow);
    panel.appendChild(arrowWrap);

    if(!document.getElementById('arrowStyle')){
        var style = document.createElement('style');
        style.id = 'arrowStyle';
        style.textContent = '@keyframes arrowPulse{0%,100%{opacity:0.4;text-shadow:0 0 4px rgba(180,130,255,0.2);}50%{opacity:1;text-shadow:0 0 12px rgba(180,130,255,0.6);}}';
        document.head.appendChild(style);
    }

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
        arrow.addEventListener('mouseenter', function(){ this.style.color = 'rgba(200,160,255,0.9)'; });
        arrow.addEventListener('mouseleave', function(){ this.style.color = 'rgba(255,255,255,0.5)'; });
    }, total);
}

// ============ ФИНАЛ ============
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
    setTimeout(function(){
        var sec = document.getElementById('secretMessage');
        showScreen('secretMessage');
        sec.querySelectorAll('.message-text').forEach(function(m, i){
            setTimeout(function(){ m.classList.add('show'); }, i * 1200);
        });
    }, 800);
});
document.getElementById('backFromSecret').addEventListener('click', function(){
    hideScreen('secretMessage');
    setTimeout(function(){ showScreen('finale'); }, 800);
});
