// Versi tanpa timer: langsung tampilkan UI ulang tahun
(function(){
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
    "اَللّٰهُمَّ أَطِلْ عُمُرَهَا فِي طَاعَتِكَ، وَبَارِكْ لَهَا فِي رِزْقِهَا، وَاجْعَلْهَا مِنْ عِبَادِكَ الصَّالِحِينَ، وَاحْفَظْهَا بِحِفْظِكَ الدَّائِمِ، وَارْزُقْهَا سَعَادَةً دُنْيَا وَالْآخِرَةِ.",
    "Ya Allah, panjangkanlah umur Keisya dalam ketaatan kepada-Mu, berkahilah rezekinya, jadikanlah dia termasuk hamba-Mu yang salehah, lindungilah dengan penjagaan-Mu yang tiada henti, dan anugerahkanlah kebahagiaan dunia serta akhirat kepadanya.",
    "Al-Fātiḥah.."
  ];

  const dialogWrap = document.getElementById('dialogWrap');
  const dialogBody = document.getElementById('dialogBody');
  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  let dialogIndex = 0;

  const candleIds = ['c1','c2','c3'];
  const candles = candleIds.map(id => {
    const g = document.getElementById(id);
    return { id, group: g, wick: g?.querySelector('.wick'), flame: g?.querySelector('.flame'), lit: false };
  });

  function revealBirthdayUI(){
    countdownWrap.innerHTML = `<div class="birthday-msg"><strong>Selamat Ulang Tahun yaa Sayang 💖</strong></div>`;
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

  revealBirthdayUI();

  matchImg.src = LIGHTER_OFF;

  function placeMatchDefault(){
    matchImg.style.left = 'auto';
    matchImg.style.top = 'auto';
    matchImg.style.right = '18px';
    matchImg.style.bottom = '18px';
    matchImg.style.position = 'fixed';
  }

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
    try{ strikeAudio.currentTime = 0; strikeAudio.play().catch(()=>{});}catch(e){}
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
      if(d < 56){ strikeOnce(); lightCandle(c); }
    }
  }

  function lightCandle(c){
    if(c.lit) return;
    c.lit = true;
    c.flame?.classList.remove('hidden');
    if(candles.every(x => x.lit)) onAllLit();
  }

  function onAllLit(){
    matchImg.style.opacity = '0';
    setTimeout(()=> matchImg.classList.add('hidden'), 600);
    setTimeout(()=>{
      try{ birthdayAudio.currentTime=0; birthdayAudio.play().catch(()=>{});}catch(e){}
      cakeText.classList.remove('hidden');
      setTimeout(()=> openDialog(), 5000);
    }, 2000);
  }

  let dragging=false, offsetX=0, offsetY=0;

  function onPointerDown(e){
    dragging = true;
    const rect = matchImg.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    matchImg.src = LIGHTER_ON;
  }
  function onPointerMove(e){
    if(!dragging) return;
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    matchImg.style.left = left + 'px';
    matchImg.style.top = top + 'px';
    tryLightNearby();
  }
  function onPointerUp(){ dragging=false; matchImg.src = LIGHTER_OFF; }

  matchImg.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  function openDialog(){ dialogIndex=0; dialogWrap.classList.remove('hidden'); renderDialog(); }
  function renderDialog(){ dialogBody.textContent = messages[dialogIndex]; }

  backBtn.addEventListener('click', ()=>{ if(dialogIndex>0){ dialogIndex--; renderDialog(); }});
  nextBtn.addEventListener('click', ()=>{ if(dialogIndex < messages.length-1){ dialogIndex++; renderDialog(); } });
})();
