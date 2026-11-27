// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── hbpPop  (index.html L1465)
function hbpPop(){
  const e=$('pop');
  if(S.state==='hbp'&&MX.clip&&MX.clip.hips){
    MX.clip.hips.getWorldPosition(_s0);
    _s0.y=-.12;
    _s0.project(camera);
    const H=canvas.clientHeight||innerHeight,y=(-_s0.y*.5+.5)*H,eh=e.offsetHeight||80;
    e.style.bottom='auto';
    e.style.top=Math.min(H-eh-10,Math.max(y+14,H*.4)).toFixed(0)+'px';
    hbTop=true;
  }
  else if(hbTop){
    hbTop=false;
    e.style.top='';
    e.style.bottom='';
  }
}


// ───────── brawlNeedPD  (index.html L4188)
function brawlNeedPD(){
  const C=MX.clip,P=MX.pit;
  if(!C||!P||!MX.on||!C.intros.b_stance||!C.intros.run||!C.intros.p_dying||!P.taunts.b_stance||!P.taunts.p_dying)return false;
  S.pdBrN=(S.pdBrN||0)+1;
  return DBG.brawl||S.pdBrN<=1||Math.random()<.3;
}


// ───────── brawlNeed  (index.html L4189)
function brawlNeed(){
  const C=MX.clip,P=MX.pit;
  if(!C||!P||!MX.on||!C.intros.b_stance||!C.intros.run||!C.intros.p_dying||!P.taunts.b_stance||!P.taunts.p_dying)return false;
  return DBG.brawl||(S.hbpN||0)<=1||Math.random()<.3;
}


// ───────── brawlStart  (index.html L4195)
function brawlStart(){
  BRW.pd=false;
  S.state='brawl';
  S.t=now;
  S.brawled=true;
  brawlSeen=true;
  try{
    localStorage.setItem('mm_brawl','1');
  }
  catch(e){
  }
  MX.clip.hips.getWorldPosition(_p);
  BRW.x0=_p.x;
  BRW.z0=_p.z;
  BRW.bx=_p.x;
  BRW.bz=_p.z;
  BRW.win=DBG.brawl==='lose'?false:DBG.brawl==='win'?true:Math.random()<.5;
  BRW.r=-1;
  BRW.cur=null;
  BRW.ko=false;
  BRW.brth=false;
  BRW.hits=0;
  BRW.zd=4.1;
  const W=BRW.win?'b':'p',L=BRW.win?'p':'b',att=Math.random()<.5?[L,W,W]:[W,L,W],pool=Object.keys(BR_ATT).filter(k=>MX.clip.intros[k]&&MX.pit.taunts[k]).sort(()=>Math.random()-.5);
  {
    const q=pool.findIndex(k=>k==='b_jab'||k==='b_quad');
    if(q>0){
      const t=pool[0];
      pool[0]=pool[q];
      pool[q]=t;
    }
  }
  // the first blow is a quick one: fists are flying the moment he gets there
  // the first two blows: sometimes one is blocked (the eventual loser's are blocked more often); reactions are drawn from all three hit clips
  BRW.seq=att.map((a,i)=>({
    att:a,clip:pool[i],block:i<2&&Math.random()<(a===L?.45:.15),react:i===2?(/knee|gut|jab|quad/.test(pool[i])&&Math.random()<.6?'b_liver':'p_dying'):/kick|butt|knee|round/.test(pool[i])?['b_gut','b_gutp'][(Math.random()*2)|0]:['b_hit2','b_gut','b_hit1','b_gutp','b_head'][(Math.random()*5)|0]
  }
  ));
  BRW.seq.forEach(q=>{
    const has=n=>q.att==='b'?MX.pit.taunts[n]:MX.clip.intros[n];
    if(!has(q.react))q.react=q.react==='b_liver'?'p_dying':'b_gut';
  }
  );
  /* (only reactions the man taking the blow actually has) */
  BRW.f0=BRW.ch-(att[0]==='p'?.34:.12);
  BRW.f1=BRW.f0+BRW.rd*BRW.n;
  BRW.dur=BRW.f1+BRW.hold;
  // the first swing is already on its way as he arrives (the pitcher's a little sooner, to meet him)
  BRW.b={
    n:'run',t:now,loop:true
  }
  ;
  BRW.p={
    n:'b_stance',t:now,loop:true
  }
  ;
  {
    const cs=['p_mound','p_step'].filter(k=>MX.pit.taunts[k]),c2=cs.filter(k=>k!==BRW.lastCut),pick=(c2.length?c2:cs)[(Math.random()*(c2.length||cs.length))|0];
    BRW.cut=!!pick&&(DBG.cut||Math.random()<.65);
    if(BRW.cut){
      BRW.lastCut=pick;
      BRW.p=pick==='p_step'?{
        n:'p_step',t:now+.2,hold:true
      }
      :{
        n:'p_mound',t:now+.25,rate:1.35
      }
      ;
    }
  }
  /* THE CUTAWAY: for the first part of the charge the camera is on the pitcher, waving him on; it cuts back for the last strides, so the two arrive and the punches start without a pause */
  badge('charge');
  pop('CHARGING THE MOUND!','','hot',true);
  roar(1.05,.4);
  crowdE=1;
  buzz([40,40,40,40,120]);
  shake=Math.max(shake,.3*FX);
}


// ───────── brawlShoutPos  (index.html L4205)
function brawlShoutPos(e){
  _s0.set(0,2.55,BR_Z-.6).project(camera);
  const H=canvas.clientHeight||innerHeight,y=(-_s0.y*.5+.5)*H,bh=Math.min(156,Math.max(112,(canvas.clientWidth||innerWidth)*.27));
  e.style.left='50%';
  e.style.top=Math.max((MOB?150:58)+bh,Math.min(y-8,H*.46)).toFixed(0)+'px';
  /* its bottom edge sits above both men's heads; never off the top, never down across them */
  $('pop').className='';
}


// ───────── brawlTick  (index.html L4206)
function brawlTick(el){
  const B=BRW;
  if(el<B.ch){
    const k=ease(el/B.ch);
    B.bx=lerp(B.x0,0,k);
    B.bz=lerp(B.z0,BR_Z,k);
  }
  else{
    B.bx=0;
    B.bz=BR_Z;
    if(B.b.n==='run')B.b=B.cur&&B.cur.wait?B.cur.wait:{
      n:'b_stance',t:now,loop:true
    }
    ;
  }
  const r=el<B.f0?-1:Math.min(B.n-1,Math.floor((el-B.f0)/B.rd));
  if(r!==B.r&&r>=0&&el<B.f1){
    B.r=r;
    const q=B.seq[r];
    B.cur={
      q,t:now,hit:false
    }
    ;
    const a={
      n:q.clip,t:now
    }
    ;
    if(q.att==='b'&&el<B.ch){
      B.cur.wait=a;
    }
    else if(q.att==='b')B.b=a;
    else B.p=a;
    if(q.block){
      const g={
        n:'b_block',t:now-.35
      }
      ;
      if(q.att==='b')B.p=g;
      else B.b=g;
    }
  }
  if(B.cur&&!B.cur.hit&&now-B.cur.t>=BR_ATT[B.cur.q.clip]){
    B.cur.hit=true;
    const q=B.cur.q,last=B.r===B.n-1,d={
      n:q.react,t:now,hold:last
    }
    ;
    if(q.block){
      noise(.08,'bandpass',900,400,.6);
      tone('triangle',300,180,.08,.4);
      buzz(25);
      shake=Math.max(shake,.18*FX);
      const e=$('shout');
      e.textContent='BLOCKED!';
      brawlShoutPos(e);
      e.classList.toggle('b',q.att==='b');
      e.classList.remove('go');
      void e.offsetWidth;
      e.classList.add('go');
      return;
    }
    if(q.att==='b')B.p=d;
    else B.b=d;
    SND.mitt();
    tone('sine',120,45,.2,.7);
    noise(.1,'lowpass',500,90,.7);
    buzz(last?[60,40,120]:[40]);
    B.hits=(B.hits||0)+1;
    shake=Math.max(shake,(.3+.17*B.hits)*FX);
    rumble=Math.max(rumble,.7+.4*B.hits);
    flash(last?.6:.25);
    /* every blow hits harder than the one before */
    burst(fxS,_p.set(0,1.35,BR_Z-.6),last?26:12,4,.45,[1,.9,.5],2,1);
    {
      const e=$('shout'),ws=last?((B.pd?!B.win:B.win)?['MURKED HIM!']:['YOU GOT WHOOPED!']):['POW!','WHAM!','BAM!','OOF!','CRACK!'];
      e.textContent=ws[(Math.random()*ws.length)|0];
      brawlShoutPos(e);
      e.classList.toggle('b',q.att==='p');
      e.classList.remove('go');
      void e.offsetWidth;
      e.classList.add('go');
    }
    if(q.att==='b')crowdPump(last?1:.6);
    else if(!roarG)boo(.6);
    if(last){
      B.ko=true;
      B.koT=now;
      rumble=1;
    }
  }
  if(B.ko&&now-B.koT>=.38&&!B.taunt){
    /* THE WINNER GOES STRAIGHT INTO HIS CELEBRATION off the last blow: never back to his fighting stance first */
    B.taunt=true;
    const w={
      n:'p_fist',t:now,loop:true
    }
    ;
    if(B.win)B.b=w;
    else B.p=w;
  }
  if(el>=B.dur){
    B.taunt=false;
    if(B.pd){
      pdBrawlEnd();
      return;
    }
    const k=B.win?1:Math.random()<.6?-1:0;
    hbpEnd(k,B.win?'WON THE BRAWL!':'YOU GOT WHOOPED!');
  }
}


// ───────── hbpStart  (index.html L4219)
function hbpStart(){
  S.hbpKip=Math.random()<.45;
  badge('wore');
  S.state='hbp';
  S.t=now;
  S.hbpN=(S.hbpN||0)+1;
  S.hbpF=false;
  S.hbpR=false;
  S.hbpWill=undefined;
  ball.visible=false;
  ballShadow.visible=false;
  pring.visible=false;
  swing=null;
  // a ball off the body, not off leather: a dull, dead thump with a short slap on the front of it, then the air going out of him (no mitt pop)
  noise(.035,'highpass',1800,900,.5);
  noise(.16,'bandpass',210,90,1.3,1.4);
  tone('sine',92,38,.26,1.2);
  tone('triangle',150,60,.12,.5);
  tone('sawtooth',210,120,.22,.16,.09);
  noise(.3,'bandpass',700,300,.22,.8,.1);
  buzz([60,40,120]);
  shake=Math.max(shake,.4*FX);
  flash(.5);
  pop(['PLUNKED!','WORE IT!'][(Math.random()*2)|0],'HIT BY PITCH','hot',true);
  roarOff(.5);
  boo(.75);
  crowdE=Math.max(crowdE,.6);
  {
    const ts=MX.pit?Object.keys(MX.pit.taunts).filter(k=>/clap|threat/.test(k)):[];
    if(ts.length)S.sTaunt={
      t:now+1,clip:ts[(Math.random()*ts.length)|0],dur:2.2
    }
    ;
  }
  // and the pitcher isn't sorry
  hud();
}


// ───────── hbpEnd  (index.html L4229)
function hbpEnd(fk,title){
  const b=curBatter(),r0=Math.random(),k=fk!==undefined?fk:r0<.35?1:r0<.75?-1:0,was={
    pwr:b.pwr,con:b.con,spd:b.spd
  }
  ;
  if(k){
    if(!b.base)b.base={
      spd:b.spd,pwr:b.pwr,con:b.con
    }
    ;
    const m=k>0?1.1:.9;
    b.spd=clamp(b.spd*m,.7,1.25);
    b.pwr=clamp(b.pwr*m,.7,1.25);
    b.con=clamp(b.con*m,.7,1.25);
    b.hb=(b.hb||0)+k;
  }
  S.walked=true;
  {
    const q=curBatter();
    if(q.gs)q.gs.ab=Math.max(0,q.gs.ab-1);
  }
  S.juice=Math.min(1,S.juice+(k>0?.5:.25));
  walkRunners();
  {
    const R=RUN.list.find(R=>R.active&&R.target===1&&R.s<1);
    if(R){
      R.hurt=k<=0;
      R.crawl=R.hurt&&(DBG.crawl||(PLAY_NEWEST_FIRST&&!S.crawlG)||Math.random()<.3);
      if(R.crawl)S.crawlG=true;
      R.s=.5;
      R.delay=0;
      R.raceV=k<=0?.085:.12;
    }
  }
  /* after a brawl he was out at the mound, not in the box: he picks it up halfway down the line, and takes his time */
  const r=advance(1,true),run=r?'+1 RUN · ':'';
  if(k>0&&title&&/BRAWL/.test(title)){
    badge('brawl');
    b.sp=true;
  }
  /* won the fight: Power reads a grade higher for the rest of the game (the only road to S+ outside Overdrive) */
  if(k>0){
    pop(title||'FIRED UP!',run+'▲ RATINGS UP · +2 JUICE','sup',true);
    cheer(.5,3);
    roar(.9,.3);
    buzz([30,40,80]);
  }
  else if(k<0){
    pop(title||'SHAKEN UP',run+'▼ RATINGS DOWN','sdn',true);
    crowdDrop();
  }
  else{
    pop(title||'SHOOK IT OFF!',run+'NO CHANGE · +1 JUICE','sup sn',true);
    cheer(.3,2);
  }
  /* the same big outlined call as FIRED UP and SHAKEN UP, in yellow: same place, same size, same time on screen */
  if(k<=0)roarOff(3);
  // no fight, or a lost one: it settles in a long tail
  showCard();
  // He heads for first with the camera in front of him, and the walk-up banner comes back to show what getting hit (or the fight) did to his ratings.
  {
    const gb=v=>{
      const g=statGrade(v);
      return `<b class="gr g${g}"><u>${g}${gradeMod(v)}</u></b>`;
    }
    ,gb2=v=>{
      const g=statGrade(v),md=gradeMod(v);
      return `<b class="gr g${g}"><u>${g}${k>0&&md==='-'?'':k<0&&md==='+'?'':md}</u></b>`;
    }
    ,
    /* (a grade that just went UP is never shown with a minus on it, and one that went DOWN never with a plus: the mark would argue with the arrows) */
    ch=(lab,o,n)=>`<span><s>${lab}</s><em class="${k>0?'up':k<0?'dn':''}">${gb2(n)}${k?`<i class="${k>0?'hbu':'hbd'}">${
      k>0?'▲▲':'▼▼'
    }
    </i>`:''}</em></span>`;
    /* just the NEW grade, in red with two down marks (or green with two up): the change at a glance */
    /* just the three ratings as they now stand, each with an up or down mark */
    walkTier(ovrBat(b));
    $('wnum').textContent=b.num;
    $('wname').innerHTML='<b class="tgem" data-tier="'+tierOf(ovrBat(b))+'">'+ovrBat(b)+'</b>'+bdn(b);
    /* his rating badge sits to the left of his name on this card, clear of the three ratings */
    $('wrat').classList.remove('tv');
    $('wrat').innerHTML=ch(MOB?'PWR':'POWER',was.pwr,b.pwr)+ch(MOB?'CON':'CONTACT',was.con,b.con)+ch(MOB?'SPD':'SPEED',was.spd,b.spd);
    $('shout').classList.remove('go');
    $('wspot').textContent=k>0?'RATINGS UP · +2 JUICE':k<0?'RATINGS DOWN FOR THE GAME':'NO HARM DONE';
    $('wskip').textContent='';
    $('walk').classList.add('pc','pc3');
    try{
      faceShow(b);
    }
    catch(e){
    }
    /* his picture is on this card too, the same as on his walk-up card */
    $('walk').hidden=false;
    $('hud').classList.add('wk');
  }
  /* HIS NEW RATINGS GO UP UNDER THE RESULT CALL, above his head as he makes his way to first: nothing across him, nothing over his legs */
  {
    const e=$('statfx');
    e.className='';
    e.innerHTML='';
    if(k){
      let h='';
      for(let i=0;
      i<12;
      i++){
        const left=i%2,x=left?rand(2,17):rand(83,96);
        h+=`<i style="left:${x.toFixed(1)}%;top:45%;font-size:${rand(26,50).toFixed(0)}px;animation-delay:${(-rand(0,1.5)).toFixed(2)}s;animation-duration:${rand(1.1,1.8).toFixed(2)}s">${k>0?'▲':'▼'}</i>`;
      }
      e.innerHTML=h;
      e.className=k>0?'up':'dn';
    }
  }
  S.state='hbprun';
  S.t=now;
  hud();
}
