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

// ============ СООБЩЕНИЯ ============
function showMessages(msgId, nextId){
    var screen = document.getElementById(msgId);
    showScreen(msgId);
    var panel = screen.querySelector('.glass-panel');
    var msgs = screen.querySelectorAll('.message-text');
    var btn = panel.querySelector('.continue-btn');
    if(btn) btn.style.display = 'none';

    msgs.forEach(function(m, i){
        setTimeout(function(){ m.classList.add('show'); }, i * 2000);
    });

    var total = msgs.length * 2000 + 2000;
    setTimeout(function(){
        if(btn){
            btn.style.display = 'inline-block';
            btn.onclick = function(){
                hideScreen(msgId);
                setTimeout(function(){ showScreen(nextId); }, 800);
            };
        }
    }, total);
}

// ============ СТАРТ ============
document.getElementById('startBtn').addEventListener('click', function(){
    hideScreen('intro');
    setTimeout(function(){ showScreen('q1'); }, 800);
});

// ============ НАВИГАЦИЯ ============
document.getElementById('next1').addEventListener('click', function(){ hideScreen('q1'); setTimeout(function(){ showMessages('msg1','q2'); }, 800); });
document.getElementById('next2').
