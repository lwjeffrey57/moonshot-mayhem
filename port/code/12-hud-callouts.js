// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── dftDom  (index.html L1477)
function dftDom(){
  const on=!!(flight&&!flight.done&&flight.play.type==='hr'&&flight.trailCam&&!flight.orbit&&flight.dShow&&now-flight.t0>.3&&ball.visible&&!paused);
  if(!dftEl){
    if(!on)return;
    dftEl=document.createElement('div');
    dftEl.id='dft';
    dftEl.innerHTML='<b></b><i>FT</i>';
    $('hud').appendChild(dftEl);
  }
  if(on!==dftOn){
    dftOn=on;
    dftEl.style.display=on?'block':'none';
    dftV=-1;
  }
  if(!on)return;
  const down=flight.tr&&flight.tr.outT&&now-flight.t0>=flight.tr.outT,v=down?Math.round(flight.dFt):flight.dLast|0;
  /* the instant it touches down the counter shows the final distance, exactly the number in the call */
  if(v!==dftV){
    dftV=v;
    dftEl.firstChild.textContent=v;
    // THE NUMBER HEATS UP LIKE A DAMAGE COUNTER: white, then yellow, orange, red, and from there darker and darker, through crimson to a deep
    // blood red by 1,134 ft. Past 530 it also grows and shakes, with fire behind it.
    {
      const S2=[[0,255,255,255],[350,255,255,255],[410,255,229,59],[470,255,138,30],[530,255,42,30],[700,214,18,26],[900,150,8,18],[1134,92,0,8]];
      let k=1;
      while(k<S2.length-1&&v>S2[k][0])k++;
      const A=S2[k-1],B=S2[k],u=clamp((v-A[0])/(B[0]-A[0]||1),0,1),c='rgb('+[1,2,3].map(q=>Math.round(A[q]+(B[q]-A[q])*u)).join(',')+')',e=dftEl.firstChild;
      e.style.color=c;
      e.style.webkitTextFillColor=c;
    }
    dftEl.classList.toggle('fire',v>=530);
    if(v>=530)dftEl.style.setProperty('--fk',clamp((v-530)/600,0,1).toFixed(3));
  }
  const W=canvas.clientWidth||innerWidth,H=canvas.clientHeight||innerHeight;
  _s0.copy(ball.position).project(camera);
  const x=clamp((_s0.x*.5+.5)*W,70,W-70),y=clamp((-_s0.y*.5+.5)*H-H*.11,H*.14,H*.8);
  dftEl.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) translate(-50%,-100%)';
}


// ───────── scoreboard  (index.html L2956)
function scoreboard(big,small){
  const g=sbCanvas.getContext('2d');
  sbFrame(g,true);
  sbMsgT=-1;
  sbSig='';
  g.textAlign='center';
  const gold=g.createLinearGradient(0,80,0,235);
  gold.addColorStop(0,'#fff6c0');
  gold.addColorStop(.45,'#ffd23b');
  gold.addColorStop(.55,'#ff9a1e');
  gold.addColorStop(1,'#ffe07a');
  sbText(g,big,512,150,'italic 400 156px "Russo One",Arial Black,Arial',gold,930,'#ff8a1e');
  g.fillStyle='rgba(3,4,13,.75)';
  sbRR(g,150,250,724,84,16);
  g.fill();
  g.strokeStyle='#3ad6ff';
  g.lineWidth=3;
  sbRR(g,150,250,724,84,16);
  g.stroke();
  sbText(g,small,512,293,'400 62px "Russo One",Arial Black,Arial','#eaffff',690,'#3ad6ff');
  sbTex.needsUpdate=true;
}


// ───────── pop  (index.html L3652)
function pop(t,s='',cls='',long=false){
  // A NEW BADGE IS THE CALL: if a feat has just earned one, its badge (icon and name, in gold) goes up as the big callout in place of the
  // ordinary one, which drops to the line underneath. If several were earned at once the proudest leads and the rest follow as plates up top.
  let _bq=null;
  try{
    _bq=bdgQ;
  }
  catch(e){
  }
  // CALLOUT AND BADGE PLATE NEVER SHARE THE SCREEN: a callout always wins. A plate that is up when one arrives is taken down and comes back afterwards.
  if(_bq){
    const pn=performance.now();
    if(bdgCur&&pn<bdgCurEnd){
      $('bdg').classList.remove('go');
      if(!bdgCur.re&&pn<bdgCurEnd-1900){
        bdgCur.old=1;
        bdgCur.re=1;
        _bq.unshift(bdgCur);
      }
      bdgCur=null;
    }
    /* it comes back ONCE, and only if it had been up for under a second: never again and again through a run of callouts */
    popUntil=pn+(long?3300:1700);
    bdgBusy=Math.max(bdgBusy,popUntil);
  }
  if(_bq&&cls!=='logo'&&_bq.some(b=>!b.old&&performance.now()-b.tq<80)){
    const fresh=_bq.filter(b=>!b.old&&performance.now()-b.tq<80);
    const R=['slam','b2b','five','hr500','rev','earth','sat','lamp','pole','board','eye','aura','duel','showboat','charge','juicehr','ambush','odhr','hr450','hr','walkoff','jump','brawl','send','heater','ten','win','wore','hit'];
    fresh.sort((a,b)=>R.indexOf(a[0])-R.indexOf(b[0]));
    const B=fresh[0];
    bdgQ.splice(bdgQ.indexOf(B),1);
    $('pop').className='';
    bdgShow(B,true);
    return;
  }
  /* the badge plate IS the call: the ordinary callout is not shown at all, so the two can never collide */
  const e=$('pop');
  e.className='';
  {
    const T0=e.querySelector('.t');
    T0.style.fontSize='';
    T0.textContent=t;
    try{
      const rg=document.createRange();
      rg.selectNodeContents(T0);
      const w=rg.getBoundingClientRect().width,Wm=$('hud').getBoundingClientRect().width*.9;
      if(w>Wm)T0.style.fontSize=(parseFloat(getComputedStyle(T0).fontSize)*Wm/w).toFixed(1)+'px';
    }
    catch(x){
    }
  }
  /* A LONG CALL IS SHRUNK TO FIT: no callout ever runs off the edge of the screen */
  e.querySelector('.s').textContent=s;
  if(cls==='logo'&&s==='MOONSHOT MAYHEM'){
    try{
      const sv=$('title').querySelector('.logo svg').cloneNode(true),S2=e.querySelector('.s');
      S2.textContent='';
      sv.style.cssText='display:block;margin:-4px auto 0;width:clamp(84px,7vw,92px);height:auto;filter:drop-shadow(0 4px 0 rgba(0,0,0,.6))';
      sv.removeAttribute('id');
      S2.appendChild(sv);
    }
    catch(x){
    }
  }
  /* the game's own logo under PLAY BALL */
  void e.offsetWidth;
  e.className='go '+cls+(long?' long':'');
  e._goT=performance.now();
  try{
    const d=long?3300:1700,sp=$('nowbat').firstChild;
    window._popEnd=e._goT+d;
    sp.style.animation='none';
    void sp.offsetWidth;
    sp.style.animation='';
    sp.style.animationDelay=d+'ms';
    clearTimeout(window._nbT);
    window._nbT=setTimeout(()=>{
      sp.style.animationDelay='';
    }
    ,d);
  }
  catch(x){
  }
  /* NOW BATTING waits for the callout to clear */
  try{
    timPlace(true);
  }
  catch(x){
  }
}


// ───────── tutShow  (index.html L3688)
function tutShow(mode){
  try{
    $('stealbtn').classList.remove('on','arm');
    $('stealbtn')._key=null;
    S.stealArm='';
  }
  catch(e){
  }
  const T=$('tut');
  T.className=mode;
  T.hidden=false;
  tutHold=true;
  const n=mode==='j'||mode==='o'?0:+mode.slice(1);
  tutStep=n;
  const idx=TUT_ORDER.indexOf(n)+1;
  $('tutstp').textContent=n?idx+' / '+TUT_N:'';
  $('tutgo').textContent=n&&idx<TUT_N?'NEXT ▶  '+idx+'/'+TUT_N:'GOT IT — PLAY ▶';
  const sp=T.querySelector('.spot');
  sp.style.cssText='';
  T.querySelectorAll('.pcz,.tmz').forEach(c=>c.style.bottom='');
  $('hud').classList.toggle('tut2',n===2);
  if(n===1||n===2||n===5)tutT0=performance.now();
  if(tutWas5&&n!==5){
    tutWas5=false;
    $('tj').classList.remove('dn');
    hud();
  }
  if(n===5)tutWas5=true;
  $('hud').classList.toggle('tut5',n===5);
  if(n!==1)$('apad').classList.remove('drag');
  if(n>2||!n){
    padKnob.style.transform='';
    padKnob.style.transition='';
  }
  if(n===2){
    const H=$('hud').getBoundingClientRect();
    [['tc','tlc'],['tp','tlp']].forEach(([b,l])=>{
      const r=$(b).getBoundingClientRect(),e=$(l);
      e.style.left=(r.left-H.left+r.width/2)+'px';
      e.style.top=(r.top-H.top-46)+'px';
    }
    );
  }
  if(tutDemo&&n!==6&&n!==7){
    tutDemo=false;
    hud();
  }
  if(n===6||n===7){
    tutDemo=true;
    tutT0=performance.now();
    tutAnim(tutT0);
  }
  $('hud').classList.toggle('tut7',n===7);
  if(n===5||n===7||mode==='j'||mode==='o'){
    const r=$('tj').getBoundingClientRect(),h=$('hud').getBoundingClientRect(),g=10;
    sp.style.cssText='left:'+(r.left-h.left-g-4)+'px;top:'+(r.top-h.top-g-4)+'px;right:auto;bottom:auto;width:'+(r.width+2*g)+'px;height:'+(r.height+2*g)+'px;box-sizing:content-box;aspect-ratio:auto';
  }
  // ring drawn around the button as it actually is (JUICE and OVERDRIVE are different sizes); 4 = the ring's border
  if(n===6){
    const r=$('juice').getBoundingClientRect(),h=$('hud').getBoundingClientRect();
    sp.style.cssText='left:'+(r.left-h.left-10)+'px;top:'+(r.top-h.top-8)+'px;width:'+(r.width+12)+'px;height:'+(r.height+14)+'px';
  }
  // the Juice / Overdrive meter
  reticle.visible=n!==3;
  $('hud').classList.toggle('tut1',n===1);
  $('hud').classList.toggle('tut4',n===4);
  if(n===1){
    // two highlights: the stick (lifted above the dimming, with its own ring) and the strike zone, where the bat ring follows it
    const H=canvas.clientHeight,W=canvas.clientWidth,a=new V3(ZONE.x0,ZONE.y1,0).project(camera),b=new V3(ZONE.x1,ZONE.y0,0).project(camera),pad=44;
    const l=(a.x+1)/2*W-pad,t=(1-a.y)/2*H-pad,r=(b.x+1)/2*W+pad,bt=(1-b.y)/2*H+pad;
    sp.style.cssText='left:'+l+'px;top:'+t+'px;bottom:auto;width:'+(r-l)+'px;height:'+(bt-t)+'px;aspect-ratio:auto;border-radius:18px;animation:none';
    {
      const c=T.querySelector('.aimz');
      c.style.bottom=(H-t+10)+'px';
      c.style.right='12px';
      c.style.textAlign='center';
    }
    // caption sits above the lit zone
    const q=$('apad').getBoundingClientRect(),h=$('hud').getBoundingClientRect(),s2=T.querySelector('.spot2');
    s2.style.cssText='left:'+(q.left-h.left-8)+'px;top:'+(q.top-h.top-8)+'px;width:'+(q.width+8)+'px;height:'+(q.height+8)+'px';
  }
  if(n===2||n===3){
    // spotlight the strike zone itself: project its corners to the screen
    const H=canvas.clientHeight,W=canvas.clientWidth,a=new V3(ZONE.x0,ZONE.y1,0).project(camera),b=new V3(ZONE.x1,ZONE.y0,0).project(camera),pad=16;
    let l=(a.x+1)/2*W-pad,t=(1-a.y)/2*H-pad,r=(b.x+1)/2*W+pad,bt=(1-b.y)/2*H+pad;
    const zw=r-l-2*pad;
    retP.visible=true;
    if(n===2){
      l=Math.max(6,l-74);
      bt+=22;
    }
    t-=34;
    r+=30;
    // both steps use the same pitch, up and in the right half of the zone // room for the bat ring to start well off the ball and travel to it
    aim.x=0;
    aim.y=.825;
    reticle.position.set(TUT_B.x,TUT_B.y,0);
    retP.visible=true;
    retCfill.visible=false;
    const c0=new V3(TUT_B.x,TUT_B.y,0).project(camera);
    // step 3 keeps the bat where step 2 left it: squared up on that same pitch // bat dead center for the demo; the ball marker is placed on that exact point (4 = the spotlight's border)
    sp.style.cssText='left:'+l+'px;top:'+t+'px;width:'+(r-l)+'px;height:'+(bt-t)+'px;--tr:'+(PT_R*zw/(ZONE.x1-ZONE.x0)).toFixed(1)+'px;--tx:'+((c0.x+1)/2*W-l-4).toFixed(1)+'px;--ty:'+((1-c0.y)/2*H-t-4).toFixed(1)+'px;--gx:'+((retC.scale.x+retP.scale.x)/2*zw/(ZONE.x1-ZONE.x0)).toFixed(1)+'px';
    T.querySelector(n===2?'.pcz':'.tmz').style.bottom=(H-t+16)+'px';
    $('tutg').style.top=(bt+14)+'px';
  }
}


// ───────── tutAnim  (index.html L3718)
function tutAnim(t){
  if($('tut').hidden)return;
  if(tutStep===1){
    // the stick is pushed around, and the bat ring up the screen moves with it
    const e=(t-tutT0)/1000,a=e*2.4,r=(.55+.45*Math.sin(e*1.3))*34,x=Math.cos(a)*r,y=Math.sin(a*1.5)*r*.85;
    padKnob.style.transition='none';
    padKnob.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px)';
    $('apad').classList.add('drag');
    reticle.position.set(x/34*.2,.825-y/34*.22,0);
    return;
  }
  if(tutStep===6){
    // the meter builds a quarter at a time and, left unspent, becomes Overdrive
    const ph=((t-tutT0)%3400)/3400,q=ph<.09?1:ph<.18?2:ph<.27?3:4,full=q===4;
    $('jfill').style.width=(q*25)+'%';
    $('juice').classList.toggle('over',full);
    $('jtxt').textContent=full?'OVERDRIVE READY':'JUICE';
    return;
  }
  if(tutStep===7){
    // the button is tapped: both swing buttons and the screen catch blue fire
    const ph=((t-tutT0)%3400)/3400,on=ph>.1&&ph<.9,tj=$('tj');
    $('jfill').style.width='100%';
    $('juice').classList.add('over');
    $('jtxt').textContent=on?'OVERDRIVE ON':'OVERDRIVE READY';
    tj.firstChild.nodeValue='OVER DRIVE';
    tj.classList.add('od');
    tj.classList.remove('has','none','on');
    $('tjn').textContent='';
    tj.classList.toggle('dn',ph>.06&&ph<.12);
    tj.classList.toggle('odon',on);
    $('tp').classList.toggle('fire',on);
    $('tp').classList.toggle('blue',on);
    $('tc').classList.toggle('odf',on);
    $('hud').classList.toggle('odon',on);
    return;
  }
  if(tutStep===5){
    // Juice demo: the JUICE button is tapped, and POWER catches fire
    const ph=((t-tutT0)%3200)/3200,lit=ph>.2&&ph<.86,tj=$('tj');
    tj.classList.toggle('dn',ph>.16&&ph<.22);
    tj.classList.toggle('on',lit);
    $('tp').classList.toggle('fire',lit);
    return;
  }
  if(tutStep===3){
    reticle.visible=false;
    return;
  }
  // timing step: just the ball, the closing ring and the gauge // held on the pitch from step 2
  if(tutStep!==2)return;
  const ph=((t-tutT0)%TUT_LOOP)/TUT_LOOP;
  const u=ph<.02?0:ph<.1?ease((ph-.02)/.08):ph<.93?1:0;
  // the stick starts pushing almost at once, and the ring is on the ball about a third of a second later
  reticle.position.set(lerp(TUT_S.x,TUT_B.x,u),lerp(TUT_S.y,TUT_B.y,u),0);
  retP.visible=ph<.48;
  retC.visible=!retP.visible;
  retCfill.visible=!retP.visible;
  /* RED FIRST: only the red POWER core travels to the ball; then the green CONTACT circle appears around it. The green ring is never the thing being dragged. */
  const push=ph>=.02&&ph<.1?Math.sin((ph-.02)/.08*PI):0,dx=TUT_B.x-TUT_S.x,dy=TUT_B.y-TUT_S.y,L=Math.hypot(dx,dy);
  // the stick leans the way the ring is travelling
  padKnob.style.transition='none';
  padKnob.style.transform='translate('+(push*36*dx/L).toFixed(1)+'px,'+(-push*36*dy/L).toFixed(1)+'px)';
}


// ───────── tutClose  (index.html L3777)
function tutClose(){
  $('hud').classList.remove('tut7');
  if(tutDemo){
    tutDemo=false;
    setTimeout(hud,0);
  }
  $('hud').classList.remove('tut5');
  if(tutWas5){
    tutWas5=false;
    $('tj').classList.remove('dn');
    setTimeout(hud,0);
  }
  reticle.visible=true;
  $('hud').classList.remove('tut1','tut4');
  $('apad').classList.remove('drag');
  retP.visible=true;
  retC.visible=true;
  retCfill.visible=false;
  padKnob.style.transform='';
  padKnob.style.transition='';
  $('hud').classList.remove('tut2');
  $('tut').hidden=true;
  tutHold=false;
  tapBlock=performance.now()+400;
  swing=null;
  if(tutFirst){
    tutFirst=false;
    S.t=now-readyDur+1.7;
  }
}


// ───────── tutNeed  (index.html L3782)
function tutNeed(){
  if(tutOff||tutSeen||window.__mmManual&&!window.__mmTut)return false;
  tutSeen=true;
  tutFirst=true;
  tutShow('s1');
  try{
    localStorage.setItem('mm_tut','1');
  }
  catch(e){
  }
  return true;
}


// ───────── flash  (index.html L3797)
function flash(a){
  const e=$('flash');
  e.style.transition='none';
  e.style.opacity=a*FX;
  void e.offsetWidth;
  e.style.transition='opacity .35s';
  e.style.opacity=0;
}


// ───────── hud  (index.html L3815)
function hud(){
  podCls();
  sbDraw();
  overCheck();
  hudLater=false;
  if(S.cardBi>=0)cardStats(LINEUP[S.cardBi%LINEUP.length]);
  $('runs').textContent=S.runs;
  $('oruns').textContent=S.opp||0;
  $('inn').textContent=['1ST','2ND','3RD'][Math.min(S.inning,3)-1];
  $('count').textContent=S.balls+'-'+S.strikes;
  $('outs').textContent='O: '+S.outs;
  ['b1','b2','b3'].forEach((id,i)=>$(id).classList.toggle('on',!!S.bases[i]));
  $('jfill').style.width=(S.over?100:S.juice*100)+'%';
  // Overdrive is all or nothing: the bar is simply full while it is live
  $('hfill').style.width=(pOD()?100:S.heat*100)+'%';
  $('heat').classList.toggle('ready',S.heat>=.333);
  const j=$('juice');
  j.classList.toggle('ready',S.juice>=.25);
  j.classList.toggle('armed',juiceOn()&&S.juice>=.25);
  j.classList.toggle('over',S.over);
  $('jtxt').textContent=S.over?(S.overOn?'OVERDRIVE ON':'OVERDRIVE READY'):'JUICE';
  {
    const bars=Math.round(S.juice*4),tj=$('tj');
    // Juice only ever moves a quarter at a time: four quarters, four bars // counted exactly the way a Juice swing is paid for, so the badge never promises a bar that isn't there
    tj.classList.toggle('has',bars>0);
    tj.classList.toggle('none',bars===0);
    $('tjn').textContent=S.over?'':bars?'×'+bars:'';
    tj.firstChild.nodeValue=S.over?'OVER DRIVE':'JUICE';
    tj.classList.toggle('od',!!S.over);
    tj.classList.toggle('odon',!!(S.over&&S.overOn));
    if(S.over){
      tj.classList.remove('none','has');
    }
    $('tp').classList.toggle('blue',!!(S.over&&S.overOn));
    $('tc').classList.toggle('odf',!!(S.over&&S.overOn));
    $('hud').classList.toggle('odon',!!(S.over&&S.overOn));
    $('kj').classList.toggle('has',bars>0);
    if(S.over)$('jtoast').classList.remove('go');
    // the big OVERDRIVE READY call says it; no pill over the button
    if(bars>hudBars&&!S.over&&!S.jSaid&&S.state!=='title'&&S.state!=='over')jPend=true;
    if(S.over||!bars)jPend=false;
    // the heads-up waits until the Juice button is actually on screen (the play is over and the next pitch is being set up), and is given once a game
    if(jPend&&!ctlHidden&&(S.state==='ready'||S.state==='windup')&&$('hud').classList.contains('wk')===false){
      jPend=false;
      S.jSaid=true;
      tj.classList.remove('gain');
      void tj.offsetWidth;
      tj.classList.add('gain');
      setTimeout(()=>tj.classList.remove('gain'),520);
      // no pop-up: the button itself bounces once, and glows for as long as there is Juice to spend
      buzz(25);
      try{
        tone('triangle',660,990,.12,.25);
        tone('triangle',990,1320,.14,.22,.1);
      }
      catch(e){
      }
    }
    hudBars=bars;
  }
  goalHud();
  $('tj').classList.toggle('on',juiceArmed);
  $('tp').classList.toggle('fire',!!(S.over&&S.overOn)||(!S.over&&juiceArmed&&S.juice>=.25));
  // POWER only burns once Juice is armed or Overdrive has actually been switched on
}


// ───────── infoOnce  (index.html L4410)
function infoOnce(key,delay,ok,cls,title,html,done){
  let seen=false;
  try{
    seen=localStorage.getItem(key)==='1';
  }
  catch(e){
  }
  if(INFO_EVERY_GAME&&(key==='mm_podx'||key==='mm_lkx'||key==='mm_pjz')){
    const G=S.bdgGame||(S.bdgGame={
    }
    );
    seen=!!G['i:'+key];
    G['i:'+key]=1;
  }
  if(seen||window.__mmManual&&!DBG.info)return;
  try{
    localStorage.setItem(key,'1');
  }
  catch(e){
  }
  let tries=0;
  const go=()=>{
    let k=false;
    try{
      k=ok();
    }
    catch(e){
    }
    if(k==='wait'||((infoHold||paused||tutHold)&&k)){
      if(tries++<400)setTimeout(go,150);
      return;
    }
    /* (it WAITS for its moment instead of being lost: a skipped cut-scene, a pause or another card used to swallow it for good) */
    if(!k)return;
    infoHold=true;
    infoDone=done||null;
    const X=$('podx');
    X.className=cls||'';
    $('podxt').textContent=title;
    $('podxb').innerHTML=html;
    X.hidden=false;
    X._t=performance.now();
  }
  ;
  setTimeout(go,delay);
}


// ───────── badge  (index.html L5158)
function badge(id){
  const B=BADGES.find(b=>b[0]===id);
  if(!B)return;
  if(PD.on&&!PITCH_BADGES.has(id))return;
  /* while the player pitches, only pitching achievements: a Kraken homer off the scoreboard is not yours */
  const G=S.bdgGame||(S.bdgGame={
  }
  );
  if(G[id])return;
  G[id]=1;
  const isNew=!bdgGot[id];
  if(!isNew&&(id==='hit'||id==='charge'||/^ft\d/.test(id)))return;
  /* (BRAWLER too: once it has been earned, charging the mound gets the CHARGING THE MOUND! call instead) */
  /* a first hit is only worth a plate the first time ever */
  if(isNew){
    bdgGot[id]=1;
    try{
      localStorage.setItem('mm_badges3',JSON.stringify(bdgGot));
    }
    catch(e){
    }
  }
  const q=B.slice();
  q.tq=performance.now();
  q.isNew=isNew;
  bdgQ.push(q);
  bdgLabel();
}


// ───────── badgeQuiet  (index.html L5161)
function badgeQuiet(id){
  const B=BADGES.find(b=>b[0]===id);
  if(!B||bdgGot[id])return '';
  bdgGot[id]=1;
  try{
    localStorage.setItem('mm_badges3',JSON.stringify(bdgGot));
  }
  catch(e){
  }
  try{
    bdgLabel();
  }
  catch(e){
  }
  return B[1];
}


// ───────── bdgLabel  (index.html L5165)
function bdgLabel(){
  const e=$('bdgbtn');
  if(e)e.textContent='Achievements: '+BADGES.filter(b=>bdgGot[b[0]]).length+' / '+BADGES.length;
}


// ───────── bdgShow  (index.html L5167)
function bdgShow(B,lead){
  const e=$('bdg');
  e.querySelector('em').textContent=B.isNew===false?'ACHIEVEMENT':'ACHIEVEMENT UNLOCKED';
  bdgCur=B;
  bdgCurEnd=performance.now()+3000;
  e.querySelector('i').textContent=B[3];
  e.querySelector('b').textContent=B[1];
  e.querySelector('span').textContent=B[2];
  e.classList.remove('go','lead');
  void e.offsetWidth;
  e.classList.add('go');
  if(lead)e.classList.add('lead');
  bdgBusy=performance.now()+3300;
  popUntil=Math.max(popUntil,bdgBusy);
  buzz([20,40,20,40,90]);
  [660,880,1100,1320].forEach((f,i)=>tone('triangle',f,f*1.02,.12,.4,i*.07));
}


// ───────── bdgOpen  (index.html L5169)
function bdgOpen(){
  let e=$('bdgs');
  if(!e){
    e=document.createElement('div');
    e.id='bdgs';
    e.innerHTML='<h2>ACHIEVEMENTS</h2><p></p><div id="bdgl"></div><button class="cta alt" type="button">BACK</button>';
    document.body.appendChild(e);
    e.addEventListener('click',ev=>{
      if(ev.target===e||ev.target.tagName==='BUTTON')e.hidden=true;
    }
    );
  }
  e.querySelector('p').textContent=BADGES.filter(b=>bdgGot[b[0]]).length+' OF '+BADGES.length+' EARNED';
  {
    let t=$('bdgtree');
    if(!t){
      t=document.createElement('div');
      t.id='bdgtree';
      e.insertBefore(t,$('bdgl'));
    }
    const ni=FT_TREE.findIndex(T=>hrFeet<T),prev=ni>0?FT_TREE[ni-1]:0,nx=ni<0?null:FT_TREE[ni],pc=nx?(ni+clamp((hrFeet-prev)/(nx-prev),0,1))/FT_TREE.length*100:100,nm=nx?BADGES.find(b=>b[0]==='ft'+(ni+1))[1]:'';
    t.innerHTML='<b>CAREER HOME RUN DISTANCE</b><em>'+Math.round(hrFeet).toLocaleString('en-US')+' FT</em><i><u style="width:'+pc.toFixed(1)+'%"></u>'+FT_TREE.map((T,i)=>'<s class="'+(hrFeet>=T?'on':'')+'" style="left:'+((i+1)/FT_TREE.length*100)+'%"></s>').join('')+'</i><span>'+(nx?'NEXT: '+nm+' AT '+nx.toLocaleString('en-US')+' FT ('+(nx-Math.round(hrFeet)).toLocaleString('en-US')+' TO GO)':'EVERY RUNG CLIMBED')+'</span>';
  }
  $('bdgl').innerHTML=BADGES.map(b=>'<div class="'+(bdgGot[b[0]]?'got':'')+'"><i>'+b[3]+'</i><p style="margin:0"><b>'+b[1]+'</b><span>'+b[2]+'</span></p></div>').join('');
  e.hidden=false;
}


// ───────── hrFtShow  (index.html L6900)
function hrFtShow(F){
  if(!F||!F.play||F.play.type!=='hr'||F.trailCam||F.orbit||F.rev||F.sat||F.lamp||F.apollo||F.ufo||F.pd)return;
  const ft=Math.round(F.dFt||(F.play.dist||F.tr.dist||0)*3.281);
  if(!(ft>100))return;
  HRFT.t=performance.now();
  HRFT.p.copy(ball.position);
  HRFT.p.y+=2.2;
  const e=$('hrft');
  e.innerHTML=ft+'<small>FT</small>';
}


// ───────── hrFtTick  (index.html L6901)
function hrFtTick(){
  const e=$('hrft');
  if(!e)return;
  const a=performance.now()-HRFT.t;
  if(a>1900||a<0||S.state!=='flight'){
    if(!e.hidden)e.hidden=true;
    return;
  }
  /* (only while the picture is still on the ball: it goes the moment the game cuts away) */
  HRFT.v.copy(HRFT.p).project(camera);
  if(HRFT.v.z>1||Math.abs(HRFT.v.x)>1.05||Math.abs(HRFT.v.y)>1.05){
    e.hidden=true;
    return;
  }
  const w=canvas.clientWidth||innerWidth,h=canvas.clientHeight||innerHeight;
  e.hidden=false;
  e.style.left=clamp((HRFT.v.x*.5+.5)*w,46,w-46)+'px';
  e.style.top=clamp((-HRFT.v.y*.5+.5)*h,MOB?150:100,h-40)+'px';
  e.style.opacity=a>1500?Math.max(0,1-(a-1500)/400).toFixed(2):'1';
}


// ───────── invDb  (index.html L6932)
function invDb(){
  if(INV.db)return Promise.resolve(INV.db);
  try{
    if(window.claude&&window.claude.use)return window.claude.use('db').then(d=>(INV.db=d||null),()=>null);
  }
  catch(e){
  }
  return Promise.resolve(null);
}


// ───────── invCount  (index.html L6933)
function invCount(){
  return invDb().then(db=>{
    if(!db)return INV.n;
    return db.collection('refs').where('code','==',INV.me).get().then(q=>{
      const n=q&&q.size||0;
      if(n>INV.n){
        INV.n=n;
        try{
          localStorage.setItem('mm_inv_n',n);
        }
        catch(e){
        }
      }
      return INV.n;
    }
    ,()=>INV.n);
  }
  );
}


// ───────── invReport  (index.html L6934)
function invReport(){
  return invDb().then(db=>{
    if(!db)return false;
    return db.collection('refs').doc(INV.id).set({
      code:INV.from,ts:Date.now()
    }
    ).then(()=>true,()=>false);
  }
  );
}


// ───────── invGame  (index.html L6935)
function invGame(){
  if(!INV.from||INV.done||S.mode)return;
  invReport().then(ok=>{
    if(ok){
      INV.done=true;
      try{
        localStorage.setItem('mm_inv_done','1');
      }
      catch(e){
      }
    }
  }
  );
}


// ───────── invClaim  (index.html L6936)
function invClaim(){
  let add=0;
  INV_T.forEach(t=>{
    if(INV.n>=t[0]&&!INV.got[t[3]]){
      INV.got[t[3]]=1;
      add+=t[2];
      try{
        xpAdd(t[2]);
        badgeQuiet(t[3]);
      }
      catch(e){
      }
    }
  }
  );
  if(add){
    try{
      localStorage.setItem('mm_inv_got',JSON.stringify(INV.got));
    }
    catch(e){
    }
    try{
      hsSync();
    }
    catch(e){
    }
  }
  return add;
}


// ───────── invDraw  (index.html L6937)
function invDraw(msg){
  $('invme').textContent=INV.me;
  $('invlad').innerHTML=INV_T.map(t=>'<div class="'+(INV.got[t[3]]?'got':'')+'"><b>'+t[0]+'</b><span>'+t[1]+'<br><u>'+Math.min(INV.n,t[0])+' / '+t[0]+' FRIEND'+(t[0]===1?'':'S')+'</u></span><i>'+(INV.got[t[3]]?'CLAIMED':'+'+t[2].toLocaleString()+' XP')+'</i></div>').join('');
  $('invfl').textContent=INV.from?'YOU SIGNED WITH CODE '+INV.from:'GOT A CODE FROM A FRIEND?';
  $('invrow').style.display=INV.from?'none':'flex';
  if(msg!==undefined)$('invmsg').textContent=msg;
  const d=$('hinvn');
  if(d)d.textContent='';
}


// ───────── invOpen  (index.html L6939)
function invOpen(){
  $('title').hidden=true;
  $('inv').hidden=false;
  invDraw('');
  invCount().then(()=>{
    const a=invClaim();
    invDraw(a?'+'+a.toLocaleString()+' XP \u00B7 REWARD CLAIMED!':'');
  }
  );
}
