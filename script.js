// ============ ПАРАЛЛАКС ============
(function(){
    var layers = document.querySelectorAll('[data-parallax]');
    var mouseX = 0, mouseY = 0;
    var targetX = 0, targetY = 0;
    document.addEventListener('mousemove', function(e){
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    window.addEventListener('deviceorientation', function(e){
        if(e.gamma && e.beta){
            mouseX = Math.max(-1, Math.min(1, e.gamma / 30));
            mouseY = Math.max(-1, Math.min(1, e.beta / 30));
        }
    }, true);
    function animate(){
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;
        layers.forEach(function(layer){
            var speed = parseFloat(layer.getAttribute('data-parallax'));
            layer.style.transform = 'translate('+(targetX*speed*40)+'px, '+(targetY*speed*40)+'px)';
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

// ============ ЧАСТИЦЫ ============
(function(){
    var c = document.getElementById('particles');
    function p(){
        var d = document.createElement('div');
        d.className = 'particle';
        var s = Math.random()*4+2;
        d.style.width = s+'px'; d.style.height = s+'px';
        d.style.left = Math.random()*100+'%'; d.style.top = '105%';
        d.style.background = 'rgba('+(180+Math.random()*75)+','+(100+Math.random()*80)+','+(220+Math.random()*35)+','+(0.6+Math.random()*0.4)+')';
        d.style.animationDuration = (Math.random()*12+10)+'s';
        c.appendChild(d);
        setTimeout(function(){ d.remove(); }, 22000);
    }
    setInterval(p, 600);
    for(var i=0;i<8;i++) setTimeout(p, i*300);
})();

// ============ МУЗЫКАЛЬНЫЙ ПЛЕЕР (2 ТРЕКА) ============
(function(){
    var tracks = [
        document.getElementById('song1'),
        document.getElementById('song2')
    ];
    var currentTrack = 0;
    var playing = false;
    var toggleBtn = document.getElementById('musicToggle');
    var nextBtn = document.getElementById('musicNext');
    var info = document.getElementById('musicInfo');

    tracks.forEach(function(t){ t.volume = 0.4; });

    function updateInfo(){
        info.textContent = 'Трек ' + (currentTrack + 1);
    }

    toggleBtn.addEventListener('click', function(){
        if(playing){
            tracks[currentTrack].pause();
            toggleBtn.textContent = '🎵';
        } else {
            tracks[currentTrack].play().catch(function(){});
            toggleBtn.textContent = '⏸';
        }
        playing = !playing;
    });

    nextBtn.addEventListener('click', function(){
        if(playing) tracks[currentTrack].pause();
        currentTrack = (currentTrack + 1) % tracks.length;
        updateInfo();
        if(playing){
            tracks[currentTrack].currentTime = 0;
            tracks[currentTrack].play().catch(function(){});
        }
    });

    updateInfo();
})();

// ============ ДИАФРАГМА (ТОЛЬКО СТАРТ) ============
var irisUsed = false;
function irisTransition(callback){
    if(irisUsed){ callback(); return; }
    irisUsed = true;
    var iris = document.getElementById('irisTransition');
    iris.classList.add('active');
    setTimeout(function(){
        callback();
        setTimeout(function(){ iris.classList.remove('active'); }, 300);
    }, 800);
}

// ============ ЭКРАНЫ ============
function showScreen(id){
    var s = document.getElementById(id);
    s.style.display = 'flex';
    setTimeout(function(){ s.classList.add('active'); }, 50);
}
function hideScreen(id){
    var s = document.getElementById(id);
    s.classList.remove('active');
    setTimeout(function(){ s.style.display = 'none'; }, 600);
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

// ============ СООБЩЕНИЯ (СТРЕЛКА) ============
function showMessages(msgId, nextId){
    var screen = document.getElementById(msgId);
    showScreen(msgId);
    var msgs = screen.querySelectorAll('.message-text');
    var panel = screen.querySelector('.glass-panel');
    var oldArrow = panel.querySelector('.arrow-wrapper');
    if(oldArrow) oldArrow.remove();

    var wrap = document.createElement('div');
    wrap.className = 'arrow-wrapper';
    var arrow = document.createElement('span');
    arrow.className = 'continue-arrow';
    arrow.innerHTML = '→';
    arrow.style.display = 'none';
    wrap.appendChild(arrow);
    panel.appendChild(wrap);

    msgs.forEach(function(m, i){
        setTimeout(function(){ m.classList.add('show'); }, i * 2200);
    });

    var total = msgs.length * 2200 + 2200;
    setTimeout(function(){
        arrow.style.display = 'inline-block';
        arrow.onclick = function(){
            hideScreen(msgId);
            setTimeout(function(){ showScreen(nextId); }, 600);
        };
    }, total);
}

// ============ НАВИГАЦИЯ ============
document.getElementById('startBtn').addEventListener('click', function(){
    irisTransition(function(){
        hideScreen('intro');
        setTimeout(function(){ showScreen('q1'); }, 600);
    });
});

document.getElementById('next1').addEventListener('click', function(){ hideScreen('q1'); setTimeout(function(){ showMessages('msg1','q2'); }, 600); });
document.getElementById('next2').addEventListener('click', function(){ hideScreen('q2'); setTimeout(function(){ showMessages('msg2','q3'); }, 600); });
document.getElementById('next3').addEventListener('click', function(){ hideScreen('q3'); setTimeout(function(){ showMessages('msg3','q4'); }, 600); });
document.getElementById('next4').addEventListener('click', function(){ hideScreen('q4'); setTimeout(function(){ showMessages('msg4','q5'); }, 600); });
document.getElementById('next5').addEventListener('click', function(){ hideScreen('q5'); setTimeout(function(){ showScreen('q6'); }, 600); });
document.getElementById('next6').addEventListener('click', function(){ hideScreen('q6'); setTimeout(function(){ showScreen('confession'); startConfession(); }, 600); });

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
    var oldArrow = panel.querySelector('.arrow-wrapper');
    if(oldArrow) oldArrow.remove();

    var wrap = document.createElement('div');
    wrap.className = 'arrow-wrapper';
    var arrow = document.createElement('span');
    arrow.className = 'continue-arrow';
    arrow.innerHTML = '→';
    arrow.style.display = 'none';
    wrap.appendChild(arrow);
    panel.appendChild(wrap);

    lines.forEach(function(line, i){
        var p = document.createElement('p');
        p.className = 'confession-line';
        p.textContent = line;
        container.appendChild(p);
        setTimeout(function(){ p.classList.add('show'); }, i * 2400);
    });

    setTimeout(function(){
        arrow.style.display = 'inline-block';
        arrow.onclick = function(){
            hideScreen('confession');
            setTimeout(function(){ showFinale(); }, 600);
        };
    }, lines.length * 2400 + 2200);
}

// ============ ФИНАЛ ============
function showFinale(){
    var words = [
        'милая','симпатичная','красивая','хорошенькая','обаятельная','очаровательная','привлекательная','прелестная','чудесная','прекрасная',
        'неотразимая','элегантная','утонченная','изящная','яркая','эффектная','шикарная','безупречная','совершенная','идеальная',
        'бесподобная','сногсшибательная','несравненная','непревзойденная','замечательная','удивительная','поразительная','изумительная','восхитительная','исключительная',
        'неповторимая','единственная','бесценная','обворожительная','соблазнительная','сладкая','обольстительная','ослепительная','великолепная','неземная',
        'возвышенная','эфирная','весёлая','жизнерадостная','бодрая','рассудительная','эрудированная','воспитанная','верная','преданная',
        'открытая','понимающая','искренняя','добрая','мягкая','нежная','ласковая','заботливая','сентиментальная','романтичная',
        'чувственная','темпераментная','грациозная','волшебная','сказочная','божественная','непостижимая','невероятная','загадочная','таинственная',
        'интересная','пленительная','незабываемая','не похожая на других'
    ];
    var container = document.getElementById('finaleWords');
    container.innerHTML = '';
    words.forEach(function(w, i){
        var span = document.createElement('span');
        span.textContent = w;
        container.appendChild(span);
        setTimeout(function(){ span.classList.add('show'); }, i * 110);
    });
    showScreen('finale');
    setTimeout(function(){
        var t = document.getElementById('finaleLove');
        t.innerHTML = 'Ты изменила меня. Спасибо тебе, что ты есть —<br>тихая, хорошая, тёплая, настоящая.<br><br>Люблю тебя. И буду любить, пока ты позволяешь...<br>и даже дольше. ❤️';
        t.classList.add('show');
    }, words.length*110+900);
    setTimeout(function(){
        document.querySelector('.secret-rose-container').classList.add('show');
    }, words.length*110+2800);
}

// ============ СЕКРЕТНАЯ РОЗА И СОЗВЕЗДИЕ ============
document.getElementById('secretRose').addEventListener('click', function(){
    hideScreen('finale');
    setTimeout(function(){
        var sec = document.getElementById('secretMessage');
        showScreen('secretMessage');
        sec.querySelectorAll('.message-text').forEach(function(m, i){
            setTimeout(function(){ m.classList.add('show'); }, i * 1400);
        });
    }, 600);
});
document.getElementById('backFromSecret').addEventListener('click', function(){
    hideScreen('secretMessage');
    setTimeout(function(){ showFinale(); }, 600);
});

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
document.getElementById('toConstellation').addEventListener('click', function(){
    hideScreen('secretMessage');
    setTimeout(function(){ buildConstellation(); }, 600);
});
document.getElementById('backFromConstellation').addEventListener('click', function(){
    hideScreen('constellationScreen');
    setTimeout(function(){ showScreen('secretMessage'); }, 600);
});

function buildConstellation(){
    var container = document.getElementById('constellationStars');
    container.innerHTML = '';
    var positions = [
        {top:'10%', left:'15%'}, {top:'8%', left:'75%'},
        {top:'28%', left:'8%'}, {top:'22%', left:'82%'},
        {top:'45%', left:'20%'}, {top:'40%', left:'78%'},
        {top:'60%', left:'12%'}, {top:'55%', left:'85%'},
        {top:'75%', left:'25%'}, {top:'70%', left:'70%'}
    ];
    positions.forEach(function(pos, i){
        var star = document.createElement('div');
        star.className = 'constellation-star';
        star.innerHTML = '⭐';
        star.style.top = pos.top; star.style.left = pos.left;
        star.style.animationDelay = (i*0.3)+'s';
        star.addEventListener('click', function(e){ e.stopPropagation(); showWishCard(i, star); });
        container.appendChild(star);
    });
    var polar = document.createElement('div');
    polar.className = 'constellation-star';
    polar.innerHTML = '🌟';
    polar.style.top = '42%'; polar.style.left = '42%';
    polar.style.fontSize = '44px';
    polar.style.filter = 'drop-shadow(0 0 18px rgba(255,215,0,0.9))';
    polar.addEventListener('click', function(e){ e.stopPropagation(); showWishCard('polar', polar); });
    container.appendChild(polar);
    showScreen('constellationScreen');
}

function showWishCard(index, starEl){
    var oldCard = document.querySelector('.wish-card-overlay');
    if(oldCard) oldCard.remove();
    var overlay = document.createElement('div');
    overlay.className = 'wish-card-overlay';
    var card = document.createElement('div');
    card.className = 'glass-panel';
    card.style.cssText = 'max-width:450px; animation:cardAppear 0.5s ease; text-align:center;';
    if(index === 'polar'){
        card.innerHTML = '<p style="font-size:18px; color:#e0d0f0; line-height:1.7;">Пока существует хотя бы одна звезда во Вселенной...<br><br>я буду любить и желать тебе счастья.<br><br>❤️</p>';
    } else {
        card.innerHTML = '<p style="font-size:18px; color:#e0d0f0; line-height:1.7;">'+constellationWishes[index]+'</p>';
    }
    var closeBtn = document.createElement('button');
    closeBtn.className = 'glow-btn';
    closeBtn.textContent = 'Закрыть';
    closeBtn.addEventListener('click', function(){ overlay.remove(); });
    card.appendChild(closeBtn);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', function(e){ if(e.target === overlay) overlay.remove(); });
    if(starEl && index !== 'polar'){
        starEl.innerHTML = '🌟';
        starEl.style.filter = 'drop-shadow(0 0 12px rgba(255,215,0,0.9))';
    }
}

// ============ ПОРТАЛЫ ============
document.getElementById('portal18').addEventListener('click', function(){
    window.location.href = 'adult.html';
});
document.getElementById('portalQuiet').addEventListener('click', function(){
    window.location.href = 'quiet.html';
});
