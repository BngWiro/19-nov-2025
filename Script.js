(function(){

  // ================================
  // CONFIG
  // ================================
  // FIX: format tanggal aman untuk semua browser
  const BIRTHDAY = new Date(2025, 10, 19, 0, 0, 0);

  const cakeArea = document.getElementById('cakeArea');
  const matchImg = document.getElementById('matchImg');
  const strikeAudio = document.getElementById('strikeAudio');
  const birthdayAudio = document.getElementById('birthdayAudio');
  const cakeText = document.getElementById('cakeText');
  const countdownWrap = document.getElementById('countdownWrap');
  const hint = document.getElementById('hint');
  const matchNotice = document.getElementById('matchNotice');

  const LIGHTER_OFF = 'korek.png';
  const LIGHTER_ON  = 'korekapi.png';

  const messages = [
    "Selamat ulang tahun, sayangggg 💖.",
    "hmmmmmmm anjayyyy kesa ultah",
    "heheheheeee. maaf ya yang kemaren kemaren sering ge kamu nangis dan betmut",
    "aku seneng kamu gelem crito, gelm jujur.",
    "aku bahagia ketemu kesa seng centill eram",
    "kamu sayang aku gak?",
    "sayangkan?? kudu sayangg💕",
    "ahhhh",
    "oiyaaa hari ini tenggal berapa?",
    "19 november 2025 kan",
    "Harini hari special bangetttttttttt",
    "hari yang dimana kesa di lahirkan di tahun 2005",
    "19 november 2025 umur keisya 20",
    "hari ini hari yang sakral..",
    "Semoga keinginan mu semua ke keturutan..",
    "... di jauhkan dari orang orang jahat",
    "... jadilah wanita kuat, kuat mental kuat fisik",
    "... bisa nyenengin orangtua",
    "jadikan contoh yang baik untuk adik adikmu keponakanmu",
    "Maaf yaa belum bisa seng mok karepne tapi aku usahakan selalu ada di sampingmu, karana ingin nenujukan kalok aku sayang kesa",
    "Selebihnya..  aku berterimaksih uwes enek ng hidupku\nAku bersukur iso bertemu kamu kamu cantik, kamu manis, kamu crewet, kamu lucu selebih lebihnyaaaa\nwchahchhchchchhcc",
    "Lingguh sek ojo kesusu di pencet next....",
    "Wis lingguh?..",
    "...",
    "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    "اَللّٰهُمَّ أَطِلْ عُمُرَهَا فِي طَاعَتِكَ، وَبَارِكْ لَهَا فِي رِزْقِهَا، وَاجْعَلْهَا مِنْ عِبَادِكَ الصَّالِحِينَ، وَاحْفَظْهَا بِحِفْظِكَ الدَّائِمِ، وَارْزُقْهَا سَعَادَةً دُنْيَا وَالْآخِرَةِ.                      Allāhumma aṭil ‘umrahā fī ṭā‘atik, wa bārik lahā fī rizqihā, waj‘alhā min ‘ibādikas ṣāliḥīn, waḥfaẓhā biḥifẓikad dā’im, warzuq’hā sa‘ādata d-dunyā wal-ākhirah.",
    "Ya Allah, panjangkanlah umur Keisya dalam ketaatan kepada-Mu, berkahilah rezekinya, jadikanlah dia termasuk hamba-Mu yang salehah, lindungilah dengan penjagaan-Mu yang tiada henti, dan anugerahkanlah kebahagiaan dunia serta akhirat kepadanya.",
    "Al-Fātiḥah.."
  ];

  const dialogWrap = document.getElementById('dialogWrap');
  const dialogBody = document.getElementById('dialogBody');
  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  let dialogIndex = 0;

  // Candle data
  const candleIds = ['c1','c2','c3'];
  const candles = candleIds.map(id => {
    const g = document.getElementById(id);
    return { id, group: g, wick: g?.querySelector('.wick'), flame: g?.querySelector('.flame'), lit: false };
  });

  function $id(n){ return document.getElementById(n); }
  const daysEl = $id('days');
  const hoursEl = $id('hours');
  const minutesEl = $id('minutes');
  const secondsEl = $id('seconds');

  // ================================
  // REVEAL BIRTHDAY UI
  // ================================
  function revealBirthdayUI(){
    countdownWrap.innerHTML = `
      <div class="birthday-msg"><strong>Selamat Ulang Tahun yaa Sayang 💖</strong></div>
    `;
    hint.textContent = "Geser korek ke tiap lilin untuk menyalakan, satu per satu.";

    cakeArea.classList.remove('hidden');
    cakeArea.classList.add('show');
    matchImg.classList.remove('hidden');
    matchNotice.classList.remove('hidden');
    placeMatchDefault();

    setTimeout(()=>{
      const card = cakeArea.querySelector('.cake-card');
      card && card.classList.add('pop');
    }, 30);
  }

  // ================================
  // TIMER FIXED
  // ================================
  function updateCountdown(){
    const now = new Date();
    const diff = BIRTHDAY - now;

    if(diff <= 0){
      revealBirthdayUI();
      clearInterval(countTimer);
      return;
    }

    if(daysEl){ daysEl.textContent = Math.floor(diff / (1000*60*60*24)); }
    if(hoursEl){ hoursEl.textContent = String(Math.floor((diff / (1000*60*60)) % 24)).padStart(2,'0'); }
    if(minutesEl){ minutesEl.textContent = String(Math.floor((diff / (1000*60)) % 60)).padStart(2,'0'); }
    if(secondsEl){ secondsEl.textContent = String(Math.floor((diff / 1000) % 60)).padStart(2,'0'); }
  }

  const countTimer = setInterval(updateCountdown, 1000);
  updateCountdown();

  // ================================
  // CONFETTI
  // ================================
  function confetti(n=18){
    const colors = ['#ffb3c6','#ffd6e8','#ff9fcf','#ffc0cb','#fff1f7'];
    for(let i=0;i<n;i++){
      const el = document.createElement('div');
      el.className = 'particle';
      const size = 6 + Math.random()*10;
      el.style.width = size+'px';
      el.style.height = size+'px';
      el.style.left = (10 + Math.random()*80) + '%';
      el.style.bottom = (10 + Math.random()*10) + '%';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      document.body.appendChild(el);
      el.animate(
        [
          {transform:'translateY(0) rotate(0)', opacity:1},
          {transform:'translateY(-90vh) rotate(540deg)', opacity:0}
        ],
        { duration: 1400 + Math.random()*1200, easing:'ease-out', fill:'forwards' }
      );
      setTimeout(()=>el.remove(),3000);
    }
  }

  matchImg.src = LIGHTER_OFF;
  matchImg.alt = 'korek';

  function placeMatchDefault(){
    matchImg.style.left = 'auto';
    matchImg.style.top = 'auto';
    matchImg.style.right = '18px';
    matchImg.style.bottom = '18px';
    matchImg.style.position = 'fixed';
  }

  // ================================
  // MATCH DRAGGING
  // ================================
  let dragging=false, offsetX=0, offsetY=0;

  function getMatchTip(){
    const r = matchImg.getBoundingClientRect();
    return { x: r.left + r.width*0.22, y: r.top + r.height*0.18 };
  }
  function getWickPos(wickEl){
    if(!wickEl) return null;
    const r = wickEl.getBoundingClientRect();
    return { x: r.left + r.width/2, y: r.top + 1 };
  }

  function strikeOnce(){
    try{
      strikeAudio.currentTime = 0;
      strikeAudio.play().catch(()=>{});
    }catch(e){}
    const tip = getMatchTip();
    for(let i=0;i<6;i++){
      const s = document.createElement('div');
      s.className = 'particle';
      s.style.width='6px';
      s.style.height='6px';
      s.style.left = (tip.x + (Math.random()-0.5)*40) + 'px';
      s.style.top = (tip.y + (Math.random()-0.5)*24) + 'px';
      s.style.background = ['#ffc36a','#ff8b3b'][Math.floor(Math.random()*2)];
      document.body.appendChild(s);
      s.animate(
        [
          {transform:'translateY(0)', opacity:1},
          {transform:'translateY(-40px)', opacity:0}
        ],
        {duration:400 + Math.random()*300, easing:'ease-out', fill:'forwards'}
      );
      setTimeout(()=>s.remove(),800);
    }
  }

  function tryLightNearby(){
    const tip = getMatchTip();
    for(const c of candles){
      if(c.lit) continue;
      const pos = getWickPos(c.wick);
      if(!pos) continue;
      const dx = tip.x - pos.x;
      const dy = tip.y - pos.y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if(d < 56){
        strikeOnce();
        lightCandle(c);
      }
    }
  }

  function lightCandle(c){
    if(c.lit) return;
    c.lit = true;
    c.flame?.classList.remove('hidden');
    confetti(6);
    if(candles.every(x => x.lit)) onAllLit();
  }

  // ================================
  // AFTER ALL LIT
  // ================================
  function onAllLit(){
    matchImg.style.transition = 'opacity 700ms ease';
    matchImg.style.opacity = '0';
    setTimeout(()=> matchImg.classList.add('hidden'), 800);

    setTimeout(()=>{
      try{
        birthdayAudio.currentTime = 0;
        birthdayAudio.play().catch(()=>{});
      }catch(e){}

      cakeText.classList.remove('hidden');

      setTimeout(()=> openDialog(), 5000);
    }, 2200);
  }

  // ================================
  // DRAG EVENTS
  // ================================
  function onPointerDown(e){
    if(!cakeArea.classList.contains('show')) return;
    dragging = true;
    matchImg.setPointerCapture?.(e.pointerId);
    const rect = matchImg.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    matchImg.style.transition = 'none';
    matchImg.src = LIGHTER_ON;
    matchImg.classList.add('lit');
  }
  function onPointerMove(e){
    if(!dragging) return;
    e.preventDefault();
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    const pad = 6;
    left = Math.max(pad, Math.min(window.innerWidth - matchImg.offsetWidth - pad, left));
    top = Math.max(pad, Math.min(window.innerHeight - matchImg.offsetHeight - pad, top));
    matchImg.style.left = left + 'px';
    matchImg.style.top = top + 'px';
    tryLightNearby();
  }
  function onPointerUp(e){
    dragging = false;
    matchImg.style.transition = 'left 160ms ease, top 160ms ease';
    matchImg.releasePointerCapture?.(e.pointerId);
    if(!matchImg.classList.contains('hidden')){
      matchImg.src = LIGHTER_OFF;
      matchImg.classList.remove('lit');
    }
  }

  matchImg.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove, {passive:false});
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('pointercancel', onPointerUp);

  // ================================
  // DIALOG LOGIC
  // ================================
  function openDialog(){
    dialogIndex = 0;
    dialogWrap.classList.remove('hidden');
    setTimeout(()=> dialogWrap.classList.add('show'), 10);
    renderDialog();
  }
  function closeDialog(){
    dialogWrap.classList.remove('show');
    setTimeout(()=> dialogWrap.classList.add('hidden'), 360);
    document.body.classList.add('final-only');
    confetti(40);
  }
  function renderDialog(){
    dialogBody.textContent = messages[dialogIndex] || '';
    backBtn.disabled = dialogIndex === 0;
    nextBtn.textContent = (dialogIndex === messages.length - 1) ? 'Selesai' : 'Next';
  }

  backBtn?.addEventListener('click', ()=>{
    if(dialogIndex > 0){
      dialogIndex--;
      renderDialog();
    }
  });

  nextBtn?.addEventListener('click', ()=>{
    if(dialogIndex < messages.length - 1){
      dialogIndex++;
      renderDialog();
    } else {
      closeDialog();
    }
  });

  // ================================
  // IF PAGE LOADED AFTER BIRTHDAY
  // ================================
  (function immediate(){
    if(new Date() >= BIRTHDAY){
      revealBirthdayUI();
    }
  })();

})();
