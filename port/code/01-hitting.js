// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── markDom  (index.html L1468)
function markDom(){
  if(!markEl){
    markEl=document.createElement('div');
    markEl.id='pmark';
    $('hud').appendChild(markEl);
  }
  const bat=S.state==='ready'||S.state==='windup'||S.state==='pitch',echo=!!ringEcho,mi=markI||(echo?2:0)
  /* WHERE YOU HAD IT, ON EVERY SWING AND MISS: the frozen ring that shows a miss now carries your center marker too (your own choice of dot, crosshair or small ring; the crosshair if you play with none), sitting exactly where the middle of the barrel was */
  ,on=mi>0&&(bat||echo)&&!paused&&!(tutHold&&tutStep===3);
  /* (not in the timing step of the guide: only the timing circle shows there) */
  /* steady for the whole at-bat: it never blinks off after a swing or between pitches */
  {
    const cur=!MOB&&bat&&!paused&&(markI>0||MSENS[sensI]>1)?'none':'';
    if(cur!==canvas._cur){
      canvas._cur=cur;
      canvas.style.cursor=cur;
    }
  }
  /* and the system pointer stays hidden for that whole time too, so there is one aiming mark, not two swapping */
  if(!on){
    if(markEl.style.display!=='none')markEl.style.display='none';
    return;
  }
  if(markK!==mi){
    markK=mi;
    /* the ORIGINAL marker shapes and proportions (thin cross, small dot, small ring), just drawn sharp */
    markEl.innerHTML='<svg viewBox="-50 -50 100 100" width="100%" height="100%" style="overflow:visible;display:block">'+(mi===1?'<circle r="50" fill="rgba(0,0,0,.7)"/><circle r="35" fill="#fff"/>':mi===2?'<path d="M-50 0H50M0 -50V50" stroke="rgba(0,0,0,.7)" stroke-width="21" fill="none"/><path d="M-44 0H44M0 -44V44" stroke="#fff" stroke-width="9.5" fill="none"/>':'<circle r="37.5" stroke="rgba(0,0,0,.7)" stroke-width="25" fill="none"/><circle r="37.5" stroke="#fff" stroke-width="13" fill="none"/>')+'</svg>';
  }
  const W=canvas.clientWidth||innerWidth,H=canvas.clientHeight||innerHeight;
  _s0.set(reticle.position.x,reticle.position.y,0).project(camera);
  const x=(_s0.x*.5+.5)*W,y=(-_s0.y*.5+.5)*H;
  _s0.set(reticle.position.x+.05,reticle.position.y,0).project(camera);
  const px=Math.max(mi===1?8:15,Math.abs((_s0.x*.5+.5)*W-x)*2*(mi===1?.4:mi===2?.75:.68)*DFX().mid);
  /* the same size in the park as before: cross 7.5 cm, dot 4 cm, ring 7 cm */
  /* about ten centimeters across in the park, never under 18 px */
  markEl.style.display='block';
  markEl.style.width=markEl.style.height=px.toFixed(1)+'px';
  markEl.style.transform='translate('+(x-px/2).toFixed(1)+'px,'+(y-px/2).toFixed(1)+'px)';
}


// ───────── timPlace  (index.html L1501)
function timPlace(force){
  const pn=performance.now(),t=$('tim'),b=$('tbar'),on=t.classList.contains('go')||b.classList.contains('go');
  if(!force&&!on&&pn-timPlT<120)return;
  timPlT=pn;
  /* while the read-out is up it is re-placed every frame, and the instant a callout or the read-out itself is triggered: it is never seen in the wrong place first */
  if(!on){
    if(t.style.top){
      t.style.removeProperty('top');
      b.style.removeProperty('top');
    }
    return;
  }
  if(PD.on&&PW&&S.state==='pduel')return;
  /* PITCHING ON A PHONE: the read-out has one fixed slot above the strike zone, never on it. A callout uses the same slot, and when one is up the read-out gives way. */
  if(force)t._t0=pn;
  if(!force&&pn-(t._t0||0)>260){
    /* PLACED ONCE, THEN IT DOES NOT MOVE. If a later callout lands on it, the callout wins and the read-out is taken off for good: it never slides about or fades back in. */
    const a=t.getBoundingClientRect(),c=b.getBoundingClientRect(),T=Math.min(a.top,c.height>2?c.top:a.top),Bm=Math.max(a.bottom,c.height>2?c.bottom:a.bottom),L=Math.min(a.left+a.width*.2,c.width>2?c.left:1e9),R=Math.max(a.right-a.width*.2,c.width>2?c.right:-1e9);
    for(const id of ['pop','shout','orbc','podtag','bdg']){
      const E=$(id);
      if(!E)continue;
      const r=E.getBoundingClientRect();
      if(r.height<4||r.width<4)continue;
      const cs=getComputedStyle(E);
      if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<.05)continue;
      if(r.bottom>T-4&&r.top<Bm+4&&r.right>L&&r.left<R){
        t.className='';
        b.classList.remove('go');
        return;
      }
    }
    return;
  }
  // every kind of callout counts: the play call, the hitter's shout (PIMPED IT!, ABSOLUTE TANK!, LIFT OFF!...), the orbit call, the pitcher's tag.
  // The read-out goes under the LOWEST of whatever is showing in the upper part of the screen.
  {
    const h=$('hud').getBoundingClientRect();
    let low=0;
    for(const id of ['pop','shout','orbc','podtag','bdg']){
      const E=$(id);
      if(!E)continue;
      const r=E.getBoundingClientRect();
      if(r.height<4||r.width<4)continue;
      {
        const g=E.classList.contains('go');
        if(g&&!E._wasGo)E._goT=pn;
        E._wasGo=g;
      }
      const cs=getComputedStyle(E),fresh=E.classList.contains('go')&&pn-(E._goT||0)<450;
      if(cs.display==='none'||cs.visibility==='hidden'||(+cs.opacity<.05&&!fresh))continue;
      /* (a callout that has only just been triggered counts even while it is still fading in) */
      const tm=t.getBoundingClientRect();
      if(r.right<tm.left+tm.width*.2||r.left>tm.right-tm.width*.2)continue;
      /* (off to one side of it: no conflict) */
      const est=id==='pop'?E.offsetTop+E.offsetHeight+(MOB?4:13):id==='shout'?E.offsetTop+E.offsetHeight*.2+(MOB?4:8):0,bt=Math.max(est,+cs.opacity>.5?r.bottom-h.top:0)||r.bottom-h.top;
      /* never less than the lettering's real bottom edge once it is on screen (tilted, outlined lettering hangs below its box) */
      /* (plus the tilt and outline of the lettering, which hang below its box) */
      /* measured from where the callout will SETTLE, not from its pop-in animation, so the read-out does not chase it */
      if(r.top-h.top<h.height*.62&&bt>low)low=bt;
    }
    if(low>0){
      const y=Math.round(low+(MOB?16:16));
      /* a clear gap: the callout's pop-in overshoots its resting size for a few frames */
      t.style.setProperty('top',y+'px','important');
      b.style.setProperty('top',(y+(t.offsetHeight||22)+(MOB?4:8))+'px','important');
      return;
    }
  }
  /* (no callout showing any more: the read-out STAYS where it was put for the rest of its time on screen. It used to jump back down to its usual spot when a quick callout cleared, straight onto the fielders.) */
}


// ───────── markSet  (index.html L3270)
function markSet(){
  retMarks.forEach((g,i)=>{
    if(g)g.visible=false;
  }
  );
  /* the marker is drawn by the page itself, over the picture (markDom), so it is pin-sharp at the screen's own resolution however the 3D picture is scaled */
  ['mark1','mark2'].forEach(id=>{
    const e=document.getElementById(id);
    if(e)e.textContent=(id==='mark1'?'Ring marker: ':'RING MARKER: ')+(id==='mark1'?MARK_NAMES[markI]:MARK_NAMES[markI].toUpperCase());
  }
  );
}


// ───────── timeBar  (index.html L3791)
function timeBar(x,pw,jt,perfect,sk=1,rocket=false){
  const e=$('tbar');
  e.className='';
  $('tcb').hidden=true;
  $('tpt').textContent=pitch?(pitch.P.sp?'JUICE PITCH · ':'')+pitch.P.n+' · '+pitchMph(pitch.dur)+' MPH':'';
  const SPAN=2.05,band=(el,half)=>{
    el.style.left=(50-half)+'%';
    el.style.width=(half*2)+'%';
  }
  ,hc=1.4/SPAN*50*sk,hp=hc*.85/1.2,used=(pw?hp:hc)*jt;
  band($('tgc'),hc);
  band($('tgp'),hp);
  band($('tjx'),jt>1?used:0);
  $('tgc').classList.toggle('dim',!!pw);
  $('tgp').classList.toggle('dim',!pw);
  let mx=clamp(x/SPAN,-1,1)*50;
  const miss=Math.abs(mx)>used;
  {
    const tw=$('tmk').parentNode.clientWidth||150,gap=1700/tw;
    if(perfect)mx=0;
    else if(Math.abs(mx)<gap)mx=(x<0?-1:1)*gap;
  }
  // at least 17 px of daylight between the two marks /* the picture never contradicts the verdict: a PERFECT sits exactly on the target, and anything else is drawn visibly clear of it */
  $('tmk').style.left=(50+mx)+'%';
  {
    const mc=miss?'#ff4d2e':'#39ff6a';
    /* the target is white; your swing is green (red if it missed the window) */
    $('tmk').style.background=mc;
    $('tmk').style.setProperty('--mc',mc);
  }
  $('tmk').classList.toggle('pf',!!rocket);
  void e.offsetWidth;
  e.className='go'+(S.over&&S.overOn&&!miss?' odz':'');
  try{
    timPlace(true);
  }
  catch(x){
  }
}


// ───────── timing  (index.html L3796)
function timing(t,c,l,big){
  if(typeof CQ!=='undefined'&&CQ.on)return;
  const e=$('tim');
  e.className='';
  e.textContent=t;
  e.style.color=c;
  e.dataset.l=l||2;
  e.dataset.pd=PD.on&&S.state==='pduel'?1:0;
  e.dataset.rk=$('tmk').classList.contains('pf')?1:0;
  void e.offsetWidth;
  e.className=big?'go big':'go';
  try{
    timPlace(true);
  }
  catch(x){
  }
}


// ───────── setBatter  (index.html L3927)
function setBatter(){
  if(MX.batPrep)setTimeout(MX.batPrep,700);
  if(MX.pitVar&&S.pName&&MX.pitVar[S.pName[3]||0]&&MX.pitCur!==(S.pName[3]||0))setTimeout(pitcherModel,0);
  if(S.lockG){
    S.over=S.lockG.over;
    S.overOn=false;
    S.juice=S.lockG.j;
    S.lockG=null;
  }
  /* LOCKED IN: the Overdrive a hot hitter was lent is his alone. When his turn ends the team's own bar is put back exactly as it was. */
  if(S.over&&S.overOn&&S.walked){
  }
  // a walk doesn't use it up: it stays on for the next hitter
  else if(S.over&&S.overOn){
    S.over=false;
    S.overOn=false;
    S.juice=0;
  }
  juiceArmed=false;
  // Juice armed for one hitter never carries over to the next
  S.walked=false;
  S.odSeen=false;
  try{
    const nb=LINEUP[(S.bi+1)%LINEUP.length];
    if(!S.mode&&perkOn(nb,'GORMAK')&&!nb.phUsed){
      nb.phUsed=true;
      if(S.juice<.75&&!S.over){
        S.juice=.75;
        setTimeout(()=>{
          try{
            hud();
          }
          catch(e){
          }
        }
        ,1200);
      }
    }
  }
  catch(e){
  }
  if(S.mode&&(S.mode.id==='derby'||S.mode.id==='weekly')&&S.mode.bi!==undefined)S.bi=S.mode.bi-1;
  /* (the derby is one hitter, every swing) */
  S.bi++;
  const b=curBatter();
  S.balls=0;
  S.strikes=0;
  if(S.ptBi!==undefined&&S.ptBi!==null&&S.bi!==S.ptBi){
    S.ptBi=null;
    if(!S.over){
      S.over=true;
      S.overOn=false;
      S.juice=1;
    }
  }
  /* PLAYTEST: the second hitter after a skipped-to pitching half comes up with Overdrive ready */
  if(b.lock){
    S.lockG={
      over:S.over,j:S.juice
    }
    ;
    S.over=true;
    S.overOn=false;
    S.juice=1;
  }
  /* a locked-in hitter comes up with Overdrive ready, every time, until he makes an out (it is still the player's call to switch it on) */
  $('hud').classList.toggle('lockd',!!b.lock);
  if(S.bi===1&&!S.over&&!S.overOn){
    S.juice=1;
  }
  /* every game, the second hitter comes up with Overdrive charged, whatever the leadoff man did: nobody plays a game without meeting it */
  // The pitcher has Overdrive too: when his Heat meter is full, every pitch of the next at-bat is a Juice pitch. Then his meter starts over.
  duelEnd();
  if(S.pOver){
    S.pOver=false;
    S.podPending=false;
    S.heat=0;
  }
  // PITCHING CHANGE: the defense goes to the bullpen when the man on the mound has given up three runs, or (half the time) to open the third inning.
  // At most two a game. The new arm comes in fresh: two of three bars, or (from the second inning on, a little under half the time) a full bar and already in Overdrive.
  else if(!S.mode&&S.bi>=3&&S.pChanges<2&&(DBG.pc||S.runs-S.pRuns0>=3||(S.inning===3&&!S.pc3&&(S.pc3=true)&&Math.random()<.5))){
    S.pChanges++;
    S.pRuns0=S.runs;
    S.pName=BULLPEN[((S.pStart||0)+S.pChanges)%BULLPEN.length];
    S.pcPending=true;
    if(podFree()&&Math.random()<.4){
      S.heat=1;
      S.pOver=true;
      S.podN++;
      S.podBi=S.bi;
      try{
        podExplain(2500);
      }
      catch(e){
      }
    }
    else S.heat=.667;
  }
  /* (a reliever who arrives already in Overdrive gets the same explainer, once he is on the mound and the hitter is in) */
  // a full bar always means Overdrive: he arrives either in it, or with two of three bars
  // He can also just snap: from the second inning on there is a chance each new hitter that he goes into Overdrive whatever his meter says,
  // and the more runs he has given up the likelier it is (3% with no runs, about 30% once eight are in). Never in the first inning.
  else if(DBG.pod||podFirst()||(podFree()&&(S.heat>=.999||Math.random()<(S.podN?.02*Math.min(S.runs,8):S.runs>=3?.4:S.inning>=2?.3:.04)))){
    S.pOver=true;
    S.podPending=true;
    S.podN++;
    S.podBi=S.bi;
  }
  // not announced yet: once the hitter is in the box the game cuts to the mound for the reveal (podReveal)
  aim.x=0;
  aim.y=.825;
  mouseKeep();
  // every hitter starts with the ring in the middle of the zone (or under the mouse)
  paintJersey(batter,Object.assign({
    name:b.name,num:b.num
  }
  ,HOME));
  paintSkin(batter,b.skin);
  if(MX.ready)paintAtlas(b);
  if(S.cardBi===undefined||S.cardBi<0)showCard();
  // otherwise the card keeps showing the man who just hit until the next one actually steps in
  readyDur=1.7;
  S.fresh=true;
}


// ───────── tipTick  (index.html L4149)
function tipTick(){
  let on=false;
  try{
    on=!PD.on&&!S.mode&&(S.state==='windup'||S.state==='pitch')&&pitch&&S.strikes===2&&!!S.pOver&&['RAZOR','CRASH'].includes(curBatter().name)&&!(swing&&swing.done);
  }
  catch(e){
  }
  if(!on){
    if(TIPM)TIPM.visible=false;
    return;
  }
  if(!TIPM){
    TIPM=new T.Group();
    const mk=(a,b)=>{
      const m=new T.Mesh(new T.RingGeometry(a,b,32),new T.MeshBasicMaterial({
        color:0xffd23b,transparent:true,opacity:.9,depthTest:false,side:T.DoubleSide,fog:false
      }
      ));
      m.renderOrder=40;
      return m;
    }
    ;
    TIPM.add(mk(.05,.062));
    TIPM.add(mk(0,.012));
    scene.add(TIPM);
  }
  TIPM.visible=true;
  TIPM.position.set(pitch.tx,pitch.ty,0);
  TIPM.scale.setScalar(.38*(1+.1*Math.sin(now*8)));
  if(!pitch._tip){
    pitch._tip=1;
    try{
      perkSay(curBatter());
      timing('HE SEES IT COMING','#ffd23b',2);
    }
    catch(e){
    }
  }
}


// ───────── toReady  (index.html L4165)
function toReady(d){
  if(S.walkoff&&S.state!=='end'&&S.state!=='over'){
    S.walkoff=false;
    roarOff(4);
    S.state='end';
    S.t=now;
    readyDur=1.6;
    hud();
    return;
  }
  // nobody else needs to bat: that was the ballgame
  roarOff();
  showCard();
  $('hitinfo').hidden=true;
  S.state='ready';
  S.t=now;
  aim.x=0;
  aim.y=.825;
  mouseKeep();
  /* ring back to the middle of the zone before every pitch (or under the mouse) */
  lampFix();
  if(d)readyDur=d;
  if(!(swing&&swing.late))swing=null;
  pitch=null;
  flight=null;
  decoy.visible=false;
  ball.visible=false;
  ballShadow.visible=false;
  pring.visible=false;
  ballGlow.material.opacity=0;
  fielders.forEach(f=>{
    if(!f.isP){
      f.fig.root.position.copy(f.home);
      f.fig.root.rotation.y=Math.atan2(-f.home.x,-f.home.z);
    }
    f.run=null;
  }
  );
  camMode='bat';
  hud();
  syncRunners();
  if(S.pcPending){
    S.pcPending=false;
    S.state='pchange';
    S.t=now;
    // the scene: the man who got knocked out trudges off, then a cut to the mound for the new arm, then the hitter comes up as usual
    S.pcI=false;
    S.pcW=WALK.on&&MX.pit&&MX.pit.taunts.p_sadwalk?PCW:0;
    if(S.pcW){
      const old=BULLPEN[(S.pChanges+BULLPEN.length-1)%BULLPEN.length];
      flash(.3);
      {
        const C=['KNOCKED OUT OF THE GAME!',"HE'S TOAST!",'YOU CHASED HIM!','YOU ROCKED HIM!','YOU SHELLED HIM!','HIT THE SHOWERS, SCRUB!'];
        let k=(Math.random()*C.length)|0;
        if(k===S.pcCall)k=(k+1)%C.length;
        S.pcCall=k;
        pop(C[k],pdn(old)+' IS DONE','cool',true);
        badge1('chase');
      }
      /* the pitcher you knocked out: one of six calls, never the same one twice running */
      cheer(.3,2.4);
    }
    else pcIntro();
    return;
  }
  if(S.forceWalk&&S.bi>=0){
    S.wuBi=-9;
    S.wwBi=-9;
  }
  /* a new inning, or the sides have just changed: the man leading off ALWAYS gets his walk-up, whatever the setting */
  if((WALK.on||S.forceWalk)&&(S.fresh||S.forceWalk)&&S.bi>=0&&walkWant()&&MX.clip&&MX.clip.intros[WALK.by[curBatter().name]]){
    if(bodyMissing()){
      S.wuPend=performance.now();
      try{
        const b=curBatter().body;
        MX.batLoad(b);
        MX.batBoost(b);
      }
      catch(e){
      }
    }
    else startWalkup();
  }
}


// ───────── tryContact  (index.html L4797)
function tryContact(){
  flight_pop=false;
  if(pitch.hbp){
    swing.done=true;
    swing.miss=true;
    return;
  }
  // nothing to hit: it is coming at him
  swing.done=true;
  const b=curBatter(),tCross=pitch.t0+pitch.dur,dt=(swing.t0+SW_T)-tCross;
  const pw=swing.type==='power',tb=swing.turbo;
  const odOn=!!(S.over&&S.overOn),ez=(easyAB()?1.3:1)*DFX().ring,JT=odOn?1.85:tb?1.35:1,SK=pitch.P.sp?(odOn?.8:.52):1,
  /* Overdrive: the timing window is nearly twice as wide, and a Juice pitch takes much less of it away */
  win=.118*(pw?.85:1.2)*JT*ez*SK,nS=dt/win,n=(dt-shotTOff(pitch))/win;
  /* (nS: when contact was actually made, which sets the direction in the Gauntlet; n: how close to this pitch's own perfect moment, which sets the quality. Outside the Gauntlet the two are the same number.) */
  // chasing: how far outside the strike zone the pitch is (0 in the zone → 1 well off the plate)
  const offX=Math.max(ZONE.x0-pitch.tx,pitch.tx-ZONE.x1,0),offY=Math.max(ZONE.y0-pitch.ty,pitch.ty-ZONE.y1,0),chase=clamp(Math.hypot(offX,offY)/.16,0,1);
  const R=.17*b.con*(pw?(tb?.8:.63):1.25)*(tb?(S.over&&S.overOn?(pw?1.85:1.55):1.2):1)*(1-.3*chase)*ez*(perkOn(b,'RAZOR')&&S.strikes===2?1.15:1)*(perkOn(b,'VREL')?(pitch.ty<.72?1.18:pitch.ty>.93?.88:1):1)*perk2(b).r*(perkOn(b,'XENON')&&pitch&&!pitch.inZone?1.22:1);
  /* Overdrive: the power core is 85% bigger and the contact ring 55% (it used to be 85% too, and swallowed the whole strike zone); Juice alone is a fifth */
  // the power core is 10% smaller without Juice; Juice gives the old size back, then its usual boost
  const d=Math.hypot(aim.x-pitch.tx,aim.y-pitch.ty);
  // where the barrel was relative to the ball, in sweet-spot radii: u>0 = swung under it, e>0 = ball out toward the end of the bat
  const cu=(pitch.ty-aim.y)/R,ce=(pitch.tx-aim.x)/R*(MX.lefty?-1:1),cr=Math.hypot(cu,ce);
  const onT=Math.abs(n)<PFT(),side=onT?(cr<.7?'GOOD WOOD':'CUE SHOT'):n<0?'OFF THE END':'JAMMED';
  // jammed means late and off the end means early, so the words always agree with the timing
  let where=cr<SQR()?'SQUARED UP':Math.abs(cu)>=Math.abs(ce)?(onT&&cr<.7?(cu>0?'BACKSPUN IT':'TOPSPUN IT'):(cu>0?'GOT UNDER IT':'TOPPED IT')):side;
  timeBar(n*(pw?.85/1.2:1)*JT*SK,pw,JT,Math.abs(n)<PFT(),SK);
  if(Math.abs(n)>1.4||d>R*1.3){
    swing.miss=true;
    ringEcho={
      t:now,x:aim.x,y:aim.y,bx:pitch.tx,by:pitch.ty,pw
    }
    ;
    /* EVERY SWING AND MISS shows it: the zone frozen where the player had it, and the ball where it actually crossed */
    // freeze the ring and mark where the ball was: it has to be inside
    timing(Math.abs(n)>1.4?(d<=R*1.3?(n<0?'TOO EARLY!':'TOO LATE!'):(n<0?'WAY EARLY':'WAY LATE')):'BALL OUTSIDE THE '+(pw?'RED CORE':'GREEN RING'),pw?'#ff8a70':'#7dffa0',2,Math.abs(n)>1.4&&d<=R*1.3);
    return;
  }
  /* ON THE BALL BUT MISSED: the ring was over it, so the only thing wrong was the timing. Said plainly and a size bigger: TOO EARLY! / TOO LATE! */
  const tipped=d>R;
  const SHT=!!(S.mode&&S.mode.id==='shot'),
  /* THE GAUNTLET ONLY (the game's own hitting is untouched): there you are asked to pull it or go the other way on purpose, so a swing that is a little early or a little late is still driven. Contact stays full strength out to about half the window either side and then falls away to the same weak edge as everywhere else. */
  qT=SHT?Math.max(0,1-.75*Math.pow(Math.max(0,Math.abs(n)-.45)/.55,1.6)):Math.max(0,1-.75*Math.pow(Math.abs(n),1.6)),qA=tipped?.15:1-.6*(d/R)*(d/R);
  let q=qT*qA*(1-.8*chase);
  $('tmk').classList.toggle('pf',Math.abs(n)<PFT()&&cr<SQR()&&chase<=.3&&q>.8);
  {
    const k=Math.min(1,1/Math.max(1e-6,cr)),dx=(pitch.tx-aim.x)/R*k,dy=cu*k,m=$('tcb').firstChild;
    $('tcb').hidden=false;
    m.style.left=(50-dx*42)+'%';
    m.style.top=(50+dy*42)+'%';
    m.className=cr<SQR()?'sq':'';
  }
  // where the barrel met the ball: under it, on top of it, off the end, in on the hands // the rocket is for perfect-perfect only: on time, squared up, and smoked
  const gs=()=>(Math.random()+Math.random()+Math.random()-1.5)/1.5;
  // bell-ish, ±1
  // launch: where the barrel met the ball, pitch height, and how square it was
  let la=(pw?25:11)+clamp((pitch.ty-aim.y)/R,-1.3,1.3)*28+(pitch.ty-.82)/.33*5+gs()*(pw?16:12);
  la=clamp(la,-20,62);
  // spray: timing first, then pitch location (inside pulls, outside goes the other way) and bat-path scatter
  let phi=SHT?(MX.lefty?-1:1)*nS*42+pitch.tx/.28*5+(pitch.tx-aim.x)/R*4+gs()*8:(MX.lefty?-1:1)*n*36+pitch.tx/.28*11+(pitch.tx-aim.x)/R*8+gs()*20;
  /* (in the gauntlet the timing decides the field: where the pitch was and the luck of the bat path count for much less, so early is pulled and late goes the other way every time) */
  if(tipped)phi+=rand(-1,1)*50;
  let v=(pw?47:37)*(.5+.5*q)*b.pwr*(tb?1.22:1)*(S.over&&S.overOn?1.14:1)*rand(.9,1.07);
  try{
    const og2=MX.lefty?-1:1;
    if(perkOn(b,'RAZOR')&&S.strikes===2){
      v*=.95;
      perkSay(b);
    }
    if(perkOn(b,'VREL')&&pitch.ty<.72&&!tipped)perkSay(b);
    if(perkOn(b,'BRICKHOUSE')&&q>.8){
      v*=1.045;
      perkSay(b);
    }
    if(perkOn(b,'DRAAK')&&b.hb>0&&!b.badUsed){
      b.badUsed=true;
      v*=1.14;
      perkSay(b);
    }
    if(perkOn(b,'VANTA')){
      if(phi*og2>9){
        v*=1.05;
        perkSay(b);
      }
      else if(phi*og2<-9)v*=.97;
    }
    if(perkOn(b,'ZEPHRA')&&la>28)v*=.96;
    {
      const p3=perk3(b,la,q,pw);
      if(p3[0]!==la||p3[1]!==1){
        la=p3[0];
        v*=p3[1];
        perkSay(b,perk3Of(b));
      }
    }
    {
      const k2=perk2(b);
      if(k2.v!==1&&q>.6){
        v*=k2.v;
        perkSay(b,perk2Of(b));
      }
      else if(k2.r!==1&&q>.5)perkSay(b,perk2Of(b));
    }
  }
  catch(e){
  }
  /* card perks that change how the ball comes off the bat */
  if(chase>0){
    // off the end, off the handle, beaten into the ground or popped up
    v*=1-.45*chase;
    la+=(pitch.ty<ZONE.y0?-16:pitch.ty>ZONE.y1?20:0)*chase;
    phi+=(pitch.tx<ZONE.x0?-1:pitch.tx>ZONE.x1?1:0)*14*chase;
    la=clamp(la,-25,70);
  }
  // The big-league pop-up: getting under the ball, or being badly off on timing, can send it straight up.
  {
    const under=(pitch.ty-aim.y)/R,popP=Math.max(0,under-.4)*.5+(Math.abs(n)>.72?.12:0)+(tipped?.12:0);
    if(DBG.pop||Math.random()<popP){
      la=rand(68,81);
      v=rand(27,33);
      phi=phi*.6+gs()*28;
      q*=.35;
      flight_pop=true;
    }
  }
  // More ways for a ball to come off the bat. kind is what gets named on the result call.
  let kind='';
  const fopt={
  }
  ;
  if(!flight_pop){
    if(DBG.fl==='bloop'||((tipped||q<.38)&&chase<.6&&la>-5&&Math.random()<.4)){
      la=rand(28,38);
      v=rand(22.5,27);
      kind='BLOOP';
    }
    // the flare that drops in front of the outfield
    else if(DBG.fl==='chop'||(cu<-.45&&la<2&&Math.random()<.3)){
      la=rand(-48,-34);
      v=Math.max(v*.8,25);
      fopt.chop=1;
      kind='CHOPPER';
    }
    // beaten into the ground, one big bounce
    else if(DBG.fl==='float'||(la>24&&la<50&&q>.45&&Math.random()<.03)){
      fopt.g=.55;
      kind='LOW-GRAVITY POCKET';
    }
  }
  // a Moon special: it just keeps hanging
  /* DOWN THE LINE: a well-struck ball that was headed for the gap side of the corner now and then hooks or slices all the way to the line. Ropes into the corner, doubles that kick around down there, grounders past the bag, and homers that wrap the pole were close to impossible before (the only way to the line was to be so early or late that the contact was weak). Not in the Gauntlet, where the timing alone picks the field. */
  if(!SHT&&!kind&&!flight_pop&&q>.5&&Math.abs(phi)>19&&Math.abs(phi)<37&&Math.random()<.2)phi=Math.sign(phi)*rand(37,44.6);
  // TOPSPUN IT, hit hard: a sharp line drive with heavy topspin, so it comes off on a line and then dives
  // THE PORCH GETS PEPPERED: a well-struck ball pulled toward the tall wall in left often comes off the bat on a rope (a hard, low liner
  // that carries to the wall and bangs off it) instead of a fly ball that would have cleared an ordinary fence.
  /* ...AND NOT ALWAYS AT THE SAME HEIGHT. Both tall walls (38 feet in left, 28 in right) now take liners all the way up: the low rope off the bottom third, as before, and a harder, higher drive that bangs off the upper half, sometimes just under the top. The speed for the high ones is worked out for that spot on that wall, so they hit where they are meant to. */
  if(!kind&&!flight_pop&&q>.5&&phi<-24&&phi>-46&&la>9&&la<36&&v>=34){
    const r=Math.random();
    if(r<.26){
      const la2=rand(20,30),v2=wallV(Math.min(phi,-28.5),la2,rand(5.5,10.4));
      if(v2){
        la=la2;
        v=v2;
        phi=Math.min(phi,-28.5);
      }
    }
    else if(r<.7){
      la=rand(16,23);
      v=clamp(v,rand(40,43),45);
      phi=Math.min(phi,-28.5);
    }
  }
  else if(!kind&&!flight_pop&&q>.55&&phi>13&&phi<43&&la>10&&la<34&&v>=36){
    const r=Math.random();
    if(r<.16){
      const la2=rand(19,28),v2=wallV(phi,la2,rand(4.2,7.8));
      if(v2){
        la=la2;
        v=v2;
      }
    }
    else if(r<.28){
      const v2=wallV(phi,la=rand(15,20),rand(1.5,3.8));
      if(v2)v=v2;
    }
  }
  const tsp=!kind&&!flight_pop&&where==='TOPSPUN IT'&&q>.5&&chase<=.3;
  if(tsp)la=clamp(Math.max(la,rand(9,15)),9,18);
  const pu=flight_pop||la>=50;
  if(pu&&where==='SQUARED UP'){
    where='GOT UNDER IT';
    try{
      $('tcb').firstChild.className='';
      $('tmk').classList.remove('pf');
    }
    catch(e){
    }
  }
  // a pop-up was never squared up: he got under it
  // backspin and topspin follow where the barrel met the ball: under it = backspin that carries, on top = topspin that dives
  const lift=tsp?rand(-7.5,-5.2):kind==='BLOOP'||kind==='CHOPPER'||flight_pop?rand(-1,1):clamp(cu,-1.2,1.2)*1.9+rand(-1.9,1.7)+(la>18?.3:0);
  if(tsp)kind='TOPSPIN SINKER';
  if(!kind&&!flight_pop){
    if(lift>2.7&&la>14)kind='BACKSPIN CARRY';
    else if(lift<-2.7&&la>5&&la<32)kind='TOPSPIN SINKER';
  }
  // THE TAPE-MEASURE SHOT: a barreled power swing now and then catches it so flush that it carries clean out of the stadium and comes down
  // on the Moon beyond (more often with Juice behind it). The chase camera rides it the whole way.
  // PLAYTEST RULE, NEWEST FIRST: the first well-hit ball in Overdrive each game is the newest show in the park, the shot to the Apollo site.
  let apoSeen=false;
  try{
    apoSeen=localStorage.getItem('mm_apo1')==='1';
  }
  catch(e){
  }
  const apoOD=!!(S.over&&S.overOn)&&APO.ok&&!flight_pop&&odLastK!=='apollo'&&!S.apoG,
  /* never the Apollo shot twice running */
  apoWant=apoOD&&((PLAY_NEWEST_FIRST&&!apoSeen&&q>.55&&b.pwr>=.92)||(apoSeen&&pw&&q>.8&&Math.random()<.22*showPw(b)));
  /* forced once, the first time ever (newest first); after that it is one of the shows in the rotation */
  if(apoWant){
    la=clamp(la,24,34);
    kind='';
  }
  if(apoWant||(!kind&&!flight_pop&&pw&&q>.88&&la>21&&la<37&&(DBG.tape||DBG.apollo||Math.random()<(tb?.3:.1)))){
    v*=1.14;
    fopt.g=.8;
    kind='TAPE-MEASURE SHOT';
    // ...and once in a while, with Juice or Overdrive behind it, it is not a home run so much as a launch: the ball leaves at a speed nothing on
    // Earth has been hit at, catches a pocket of even thinner gravity, and comes down the best part of a quarter of a mile away (up to 1,134 ft).
    if(DBG.tape==='far'||DBG.apollo||apoWant||(tb&&Math.random()<.3)){
      const k=DBG.tape==='far'?rand(.3,1):Math.random();
      v*=1.06+.225*k;
      fopt.g=.72-.225*k;
      la=clamp(la,24,34);
      kind='MOONSHOT';
    }
  }
  const spin={
    side:phi/40*3.2+gs()*4,lift
  }
  ;
  const p0=new V3(pitch.tx,pitch.ty,clamp(-dt*6,-.7,.3));
  let v0=new V3(Math.sin(phi*DEG)*Math.cos(la*DEG),Math.sin(la*DEG),-Math.cos(phi*DEG)*Math.cos(la*DEG)).multiplyScalar(v);
  let tr=simulate(p0,v0,spin,fopt);
  // THE BIG SLICE: a ball squared up to the opposite field now and then leaves the bat nearer center and bends hard toward the line (the same
  // real flight physics, just far more sidespin), coming down about where the straight one would have. If it would slice foul, the straight one stands.
  {
    const og=MX.lefty?-1:1,oppo=phi*og>9&&phi*og<34;
    if(oppo&&la>15&&q>.55&&!tr.foul&&!DBG.apollo&&kind!=='MOONSHOT'&&(DBG.slice||Math.random()<(la>21?.72:.3))){
      const E=rand(3.5,6),p2=phi-og*2.1*E,sp2={
        side:spin.side+og*E,lift:spin.lift
      }
      ,v2=new V3(Math.sin(p2*DEG)*Math.cos(la*DEG),Math.sin(la*DEG),-Math.cos(p2*DEG)*Math.cos(la*DEG)).multiplyScalar(v);
      let t2=null;
      try{
        t2=simulate(p0,v2,sp2,fopt);
      }
      catch(e){
      }
      if(t2&&!t2.foul&&!!t2.hr===!!tr.hr){
        tr=t2;
        v0=v2;
        spin.side=sp2.side;
        phi=p2;
      }
    }
  }
  // THE EAGLE HAS LANDED: an Overdrive moonshot is sometimes dead on line for the old Apollo site. Its speed and direction are trimmed until it comes down right there.
  let apo=false;
  if(kind==='MOONSHOT'&&APO.ok&&(DBG.apollo||apoWant||(S.over&&S.overOn&&odLastK!=='apollo'&&!S.apoG&&Math.random()<.55))){
    const sv=v0.clone(),ss=spin.side;
    spin.side=0;
    let ph=APO.phi,sp=v0.length(),la1=la*DEG,hit=false;
    for(let it=0;
    it<18;
    it++){
      v0.set(Math.sin(ph)*Math.cos(la1),Math.sin(la1),-Math.cos(ph)*Math.cos(la1)).multiplyScalar(sp);
      tr=simulate(p0,v0,spin,fopt);
      if(!tr.outD){
        sp*=1.06;
        continue;
      }
      const lp=tr.pts.find(q=>q.t>=tr.outT)||tr.pts[tr.pts.length-1],ang=Math.atan2(lp.x,-lp.z),er=tr.outD-APO.r;
      if(Math.abs(er)<1.5&&Math.abs(ang-APO.phi)<.004){
        hit=true;
        break;
      }
      ph+=APO.phi-ang;
      sp*=Math.sqrt(APO.r/tr.outD);
    }
    if(hit){
      apo=true;
      S.apoG=true;
      odSetLast('apollo');
      try{
        localStorage.setItem('mm_apo1','1');
      }
      catch(e){
      }
    }
    else{
      v0.copy(sv);
      spin.side=ss;
      tr=simulate(p0,v0,spin,fopt);
    }
  }
  // a liner that would die at the foot of the wall carries a touch further and bangs off it instead: more balls off the wall, fewer dropping at its base
  for(let i=0;
  i<7&&!tr.hr&&!tr.foul&&tr.land&&!(tr.wall&&tr.wallT<tr.land.t)&&Math.atan2(v0.y,Math.hypot(v0.x,v0.z))<26*DEG;
  i++){
    const L=tr.land,gap=fenceR(Math.atan2(L.x,-L.z))-Math.hypot(L.x,L.z),hard=v0.length()>=37;
    if(gap<0||gap>(hard?24:9))break;
    v0.multiplyScalar(hard?1.055:1.04);
    if(hard&&v0.y>2)v0.y*=.97;
    tr=simulate(p0,v0,spin,fopt);
  }
  /* a hard liner headed for the deep outfield keeps going on a rope, a laser off the wall */
  if(S.mode&&S.mode.id==='shot')try{
    tr=shotRamp(tr);
  }
  catch(e){
  }
  const play=judge(tr,S.over&&S.overOn?Object.assign({
  }
  ,b,{
    spd:b.spd*1.08
  }
  ):perkOn(b,'ZEPHRA')&&la<12?Object.assign({
  }
  ,b,{
    spd:b.spd*1.1
  }
  ):b);
  try{
    if(perkOn(b,'ZEPHRA')&&la<12&&play.type==='hit'&&play.infield)perkSay(b);
  }
  catch(e){
  }
  if(S.mode&&(S.mode.id==='derby'||S.mode.id==='bp')&&play.type!=='hr'&&play.type!=='foul')play.endT=Math.min(play.endT,Math.max(2.3,tr.wallT?Math.max(tr.wallT+1.1,(tr.land?tr.land.t:0)+.6):0));
  /* A BALL OFF THE WALL IS ALWAYS SEEN HITTING IT and coming back down onto the grass before the picture moves on */
  /* (the derby: it stayed in the park, so it is an out and the next pitch is coming) */
  play.tag=play.tag||tr.tag||(kind==='TOPSPIN SINKER'?'':kind);
  /* a bad hop is only called when it beat the fielder: if he still made the play, nobody mentions it */
  if(play.tag==='MOON HOP!'&&play.type!=='hit')play.tag='';
  if(tr.offP&&play.type==='hit'&&!play.infield)play.tag='ERROR · OFF THE PITCHER';
  if(tr.offF&&play.type==='hit')play.tag='ERROR · ATE HIM UP';
  /* a ball a fielder should have handled and didn't is scored as his error */
  flight={
    tr,play,t0:now,q,pw,tb,jp:!!(pitch&&pitch.P&&pitch.P.sp),pod:!!pOD(),fp:(S.balls|0)+(S.strikes|0)===0,od:!!(S.over&&S.overOn),v,done:false,called:false,trailC:S.over&&S.overOn?[.2,.55,1]:tb?[1,.45,.1]:pw&&q>.75?[1,.85,.25]:[.5,.5,.55]
  }
  ;
  // Overdrive hits burn blue, Juice hits orange
  // Some Overdrive home runs don't come down: the ball leaves the Moon's orbit, headed for Earth. Always the first one a player ever hits; after that, about a third of them.
  if(apo&&play.type==='hr')flight.apollo=true;
  if(flight.od&&!flight.apollo&&play.type==='hr'&&(DBG.orbit||DBG.sat||DBG.lamp||DBG.rev||(odAvail().length>0&&Math.random()<.65*showPw(b)))){
    const kd=DBG.lamp?'lamp':DBG.sat?'sat':DBG.rev?'rev':DBG.orbit?'earth':odPick(),
    /* (playtest rule: the newest one, the saucer, is the first a player sees) */
    /* (NEXT STOP: EARTH is no longer forced to be the first one a player sees) */
    lampH=kd==='lamp'&&TOWERS.length>0,sat=kd==='sat',rev=kd==='rev';
    S.orbN=(S.orbN||0)+1;
    orbSeen=true;
    try{
      localStorage.setItem('mm_orbit','1');
    }
    catch(e){
    }
    flight.orbit=true;
    flight.rev=rev;
    play.endT+=9;
    // its own flight from the moment it leaves the bat: one smooth climb out over the wall and away, never the normal arc
    const hd=Math.hypot(v0.x,v0.z)||1,dx=v0.x/hd,dz=v0.z/hd;
    flight.orbP=[p0.clone(),new V3(p0.x+dx*46,p0.y+15,p0.z+dz*46),new V3(p0.x+dx*135,96,p0.z+dz*135),ORB_TO.clone()];
    // ...or it never gets as far as Earth: there is a satellite in the way
    if(sat){
      flight.sat=true;
      const T0=new V3(p0.x+dx*430,500,p0.z+dz*430);
      flight.orbP[2].set(p0.x+dx*190,250,p0.z+dz*190);
      flight.orbP[3]=T0;
      satPlace(T0,Math.atan2(dx,dz));
      if(UFO.ok&&(DBG.ufo||(!DBG.sat&&Math.random()<.5))){
        S.ufoG=true;
        flight.ufo=true;
        SAT.g.visible=false;
        ufoPlace(T0);
        flight.orbP[3]=UFO.hold.clone();
      }
    }
    // ...or it finds a light tower
    if(lampH){
      const ph=Math.atan2(dx,-dz)/DEG;
      let bi=0,bd=1e9;
      TOWERS.forEach((t,i)=>{
        const e=Math.abs(t.d-ph);
        if(e<bd){
          bd=e;
          bi=i;
        }
      }
      );
      const T1=TOWERS[bi].p;
      flight.lamp=bi+1;
      flight.orbP[1].set(lerp(p0.x,T1.x,.3),lerp(p0.y,T1.y,.4),lerp(p0.z,T1.z,.3));
      flight.orbP[2].set(lerp(p0.x,T1.x,.7),lerp(p0.y,T1.y,.86),lerp(p0.z,T1.z,.7));
      /* a line shot: it leaves the bat on a rope and is still climbing when it smashes into the lights, never dropping onto them */
      flight.orbP[3]=T1.clone();
    }
  }
  pitch.hit=true;
  pring.visible=false;
  decoy.visible=false;
  if(S.stealArm){
    S.hnr=S.stealArm;
    S.hnrBi=S.bi;
    S.stealArm='';
    try{
      stealUI(true);
      timing('HIT AND RUN!','#4fe06c',2);
    }
    catch(e){
    }
  }
  /* HE WAS GOING AND THE BATTER PUT IT IN PLAY: the steal is off, it is a hit and run, and he advances with the ball like any runner. (The call used to stay armed, GOING! still on the screen, and fire on the next hitter's first pitch.) */
  S.state='flight';
  payHeat();
  $('mph').textContent=pitchMph(pitch.dur);
  $('plast').textContent=pitch.P.n+' · '+pitchMph(pitch.dur)+' MPH';
  $('pitchinfo').classList.add('on'),$('plast').classList.add('on');
  renderRep(pitch.P);
  if(tb)juiceArmed=false;
  // ── the payoff
  hitstop=(.045+.14*q*(pw?1:.6)+(tb?.06:0))*(REDUCE?.5:1);
  shake=(.05+.3*q*(pw?1:.5)+(tb?.2:0))*FX;
  fovKick=(4+10*q)*FX;
  if(q>.7&&(pw||tb)){
    slowT=.55;
  }
  flash(.25+.6*q);
  SND.crack(q,pw||tb);
  if(tb||S.over)SND.zap();
  ball.position.copy(p0);
  shock.position.copy(p0);
  shock.userData.t=0;
  shock.userData.s=.3+q*.8;
  const col=flight.od?[.3,.7,1]:tb?[1,.5,.15]:[1,.9,.5];
  burst(fxS,p0,Math.round(14+60*q),4+9*q,.5,col,6,1);
  const mph=Math.round(v*2.237*1.02);
  const lab=Math.abs(n)<PFT()?'ON TIME':n<0?(n<-.7?'EARLY':'A HAIR EARLY'):(n>.7?'LATE':'A HAIR LATE');
  {
    const lvl=tipped||chase>.3||q<.35?1:q<.6?2:q<.85?3:4;
    $('hq').textContent=flight_pop?'POPPED UP':chase>.3?'CHASED':tipped?'TIPPED':['','WEAK','OKAY','SOLID','BARRELED'][lvl];
    if(MOB)$('hq').textContent+=' · '+mph+' MPH';
    $('hq').className='q q'+lvl;
    flight.lvl=lvl;
    if(lvl===4)buzz(35);
    {
      const L=tr.land,far=L?Math.hypot(L.x,L.z):0,lastP=tr.pts[tr.pts.length-1];
      // distance ticks up on anything driven in the air
      flight.dShow=tr.hr||(far*3.281>=250&&la>10);
      flight.dFt=tr.hr?play.dist*3.281:far*3.281;
      flight.dEnd=tr.hr?(tr.outD||Math.hypot(lastP.x,lastP.z)):far;
      /* (the counter reaches its number where the ball first comes down, not where it stops rolling) */
      $('hdr').hidden=!flight.dShow;
      $('hds').textContent='0 FT';
    }
    $('hev').textContent=mph+' MPH';
    $('hla').textContent=Math.round(la)+'°';
    {
      const g=Math.abs(n)<PFT(),t=$('htm');
      t.textContent=lab;
      t.className=g?'gd':Math.abs(n)>.7?'bd':'';
      const c=$('hct');
      c.textContent=chase>.3?'CHASED':where;
      c.className=cr<SQR()&&chase<=.3&&!pu?'gd':cr>.7||chase>.3?'bd':'';
      // picture of it: the ball against the barrel, red dot = the sweet spot
      const bx=clamp((aim.x-pitch.tx)/R,-1.4,1.4)*13,by=clamp((aim.y-pitch.ty)/R,-1.4,1.4)*13,cy=23-by;
      $('hbat').setAttribute('y',cy-5);
      $('hdot').setAttribute('cy',cy);
      $('hdot').setAttribute('cx',86+bx);
      $('hbat').setAttribute('x',20+bx);
    }
    $('hitinfo').hidden=false;
  }
  const tom=pitch.ty>=ZONE.y1-.2&&la<15&&la>-6&&v>=44&&play.type!=='foul';
  /* a high pitch hammered down on a line with topspin: TOMAHAWKED! */
  const lhB=!!curBatter().lh,turn=!tom&&q>.68&&v>=40&&la>6&&play.type!=='foul'&&pitch.tx*(lhB?1:-1)>.1&&phi*(lhB?1:-1)>14;
  /* an inside pitch pulled hard: he TURNED ON it */
  // THE BEST THING ABOUT THE SWING IS THE CALLOUT. When he tomahawked it, turned on it, or was perfect on a ball he crushed or hit out, that
  // word goes up as the big call (in place of a random CRUSHED!/SMOKED!), and the read-out at the foot of the screen keeps the plain detail.
  const perfC=Math.abs(n)<PFT()&&cr<SQR()&&chase<=.3,featC=tom?'TOMAHAWKED!':turn?'TURNED ON!':perfC?'PERFECT!':'',promo=featC&&play.type!=='foul'&&(featC!=='PERFECT!'||play.type==='hr'||(q>.82&&pw))?featC:'';
  timing(promo?lab+' · '+where:tom?'TOMAHAWKED!':turn?'TURNED ON!':Math.abs(n)<PFT()&&cr<SQR()&&chase<=.3&&!pu?'PERFECT!':chase>.3?'CHASED!':lab+' · '+where,
  // PERFECT is reserved for on time AND squared up
  promo?(perfC?'#ffe53b':'#f2f5ff'):tom||turn?'#ff8a2e':chase>.3?'#ff4d2e':Math.abs(n)<PFT()&&cr<SQR()?'#ffe53b':flight.lvl===1?'#9aa3c7':'#f2f5ff',flight.lvl);
  // timing, then where the barrel met it
  // No-doubters: sometimes stay on the hitter instead of the ball. 'admire' = he holds his finish, watches it and drops the bat;
  // 'show' = the same, then his own walk-up routine as a celebration. Decided here because we already know where the ball lands.
  {
    const la0=Math.atan2(v0.y,Math.hypot(v0.x,v0.z))/DEG;
    if(la0<14&&play.type!=='hr'&&play.type!=='foul'){
      $('tbar').classList.add('qk');
      $('tim').classList.add('qk');
    }
  }
  if(play.type==='hr'&&MX.clip){
    const ft=play.dist*3.281,big=tb||ft>=500,r=Math.random(),early=earlyShow(S.hrs),kind=DBG.trail||tr.cove||(ft>=600&&!flight.orbit)?'':DBG.admire||(early?'show':big?(r<.34?'show':r<.5?'admire':''):ft>=440?(r<.3?'admire':''):'');
    wildTrot=early;
    if(!flight.orbit&&tr.cove){
      flight.trailCam=true;
      flight.admire=false;
      flight.coveCam=true;
    }
    /* a ball bound for the lava is always followed in */
    if(!kind&&!flight.orbit&&ft>=385&&(ft>=600||DBG.trail||Math.random()<.82))flight.trailCam=true;
    /* 600 ft and up is always followed the whole way, out of the park and down onto the Moon */
    /* most homers that stay on the ball are now watched from behind it, with the distance running up above it */
    if(!kind&&!flight.orbit&&!flight.coveCam&&(DBG.aerial||(ft<600&&hrCamLast!=='aerial'&&Math.random()<.45))){
      flight.aerial=true;
      flight.trailCam=false;
    }
    if(!kind&&!flight.orbit&&!flight.coveCam&&!flight.aerial&&!tr.twT&&!tr.eyeT&&!tr.outT&&!tr.poleT&&ft>=400&&ft<570&&(DBG.sky||(hrCamLast!=='sky'&&Math.random()<.3))){
      flight.sky=true;
      flight.trailCam=false;
    }
    /* THE BLIMP CUT: on a no-doubter that stays in the building, the picture sometimes jumps straight off the bat to high above the park and the whole flight is watched from up there, the ball drawing its line across the field into the seats */
    hrCamLast=flight.aerial?'aerial':flight.sky?'sky':'';
    if(tr.outT&&!flight.orbit&&!flight.trailCam){
      tr.seatT=tr.outT;
      play.endT=Math.min(play.endT,tr.outT);
    }
    else if(tr.outT&&!flight.orbit)play.endT=Math.min(play.endT,tr.outT+(flight.apollo?2.6:.75));
    /* the chase camera sees it hit the ground and kick up once, and that is the end of the shot: no waiting for it to roll to a stop */
    /* THE BLIMP SHOT: now and then, once it is over the wall, the homer is seen from high above the whole park */
    flight.noSb=hrShowLast==='board'&&Math.random()<.92;
    flight.noEye=hrShowLast==='eye'&&Math.random()<.92;
    /* the scoreboard light-show almost never comes up on two homers running: the second one just sails by */
    // some no-doubters are watched from right behind the ball
    lasWant=!!(kind&&(DBG.laser||Math.random()<.45));
    // a no-doubter: now and then the lasers come on, but never before the ball has actually cleared the wall
    if(kind){
      flight.admire=kind;
      {
        const F=flight;
        setTimeout(()=>{
          if(flight===F)badge('showboat');
        }
        ,1100);
      }
      /* after the flip has been seen */
      flight.trot=WALK.on&&RUN.list.length>0&&!S.mode;
      flight.A=Math.max(1.2,Math.min(kind==='show'&&!flight.trot?3.9:2.5,play.endT-1.3));
      {
        const c=promo&&Math.random()<.75?promo:['NO DOUBTER!','SEE YA!','CRANKED!','ABSOLUTE TANK!','MOONSHOT!','ABSOLUTE NUKE!','ABSOLUTE BOMB!','LIFT OFF!','PIMPED IT!','PIMPED IT!','GONE FOREVER!','DINGER!','ADIOS PELOTA!','PLAKATA!','BARRELED!','BACKSPIN ROCKET!','BACKSPIN LASER!','BACKSPIN MISSILE!'].filter(q=>q!==ndLast).sort(()=>Math.random()-.5)[0];
        ndLast=c;
        flight.pimp=c==='PIMPED IT!';
        if(flight.pimp){
          const F=flight,hot=tb?'hot':'';
          setTimeout(()=>{
            if(flight===F&&!F.done)pop(c,'',hot);
          }
          ,1000);
        }
        else pop(c,'',tb?'hot':'');
      }
      /* PIMPED IT waits a second: you see the bat flip first, then the word */
      /* pimp: said here, so the home-plate shout will not say it again */
    }
  }
  if(!flight.admire&&promo)pop(promo,'',(tb?'hot':'')+(promo==='PERFECT!'?' perf':''));
  else if(!flight.admire&&play.type!=='foul'&&!(q>.82&&pw)&&(tb||(pw&&q>.75))&&mph>=95){
    /* only on a ball that was really hit: 95 off the bat or better */
    const C=la<16?['ROPED!','SCORCHED!','LASER!','FROZEN ROPE!','STUNG IT!','STROKED!','LINEA!']:['DRIVEN!','WELL STRUCK!','JUMPED ON IT!','STUNG IT!','CRANKED!','STROKED!','BELTED!'];
    let k=(Math.random()*C.length)|0;
    if(k===sharpLast)k=(k+1)%C.length;
    sharpLast=k;
    pop(C[k],'',(tb?'hot':'')+' sharp');
  }
  /* a quick call, high on the screen: it is up for under a second and gone before the picture reaches the man chasing the ball */
  /* a ball that leaves a fire trail always gets a call: the trail says it was hit hard */
  else if(!flight.admire&&q>.82&&pw&&play.type!=='foul'){
    const C=['CRUSHED!','SMOKED!','TATTOOED!','OBLITERATED!','MASHED!','GOT ALL OF IT!','TORCHED!'];
    try{
      if(pitch&&pitch.P&&pitch.P.n!=='FASTBALL'){
        C.push('SAT ON IT!','SAT ON IT!');
      }
    }
    catch(e){
    }
    /* SAT ON IT!: only when it was an off-speed or breaking pitch he hammered */
    let k=(Math.random()*C.length)|0;
    if(k===crushLast)k=(k+1)%C.length;
    crushLast=k;
    pop(C[k],'',tb?'hot':'');
  }
  /* never the same call twice running */
  if(play.type!=='foul'&&(tb||(S.over&&S.overOn)||(play.type==='hr'&&(flight.admire||play.dist*3.281>=420))))sfx('crush',1);
  if(play.type==='hr'&&flight.admire)sfx('nodoubt',.85);
  /* A NO-DOUBTER HAS ITS OWN CRACK, laid over the big whoosh: you hear it is gone before you see it */
  if(play.type==='hr'&&S.over&&S.overOn){
    const k=$('tmk');
    k.classList.add('pf','od');
    $('tim').dataset.rk=1;
  }
  else $('tmk').classList.remove('od');
  // an Overdrive homer always gets the rocket, burning blue
  {
    const od=tb||(S.over&&S.overOn),ft=play.dist*3.281,on=S.bases.filter(Boolean).length,top=play.type==='hr'&&(flight.orbit||on===3||ft>=500||(S.over&&S.overOn&&ft>=450)||(S.inning===3&&S.runs<=S.opp&&S.runs+on+1>S.opp));
    if(play.type==='hr'){
      const runs=1+S.bases.filter(Boolean).length;
      // how hard the place erupts once it clears the fence: more for every run it drives in, for Overdrive, and for the long ones
      flight.roarL=Math.min(1.7,1.25+.14*(runs-1)+(od?.2:0)+(play.dist*3.281>=480?.1:0));
    }
    const odHR=play.type==='hr'&&S.over&&S.overOn;
    // an Overdrive homer: no build-up, the place erupts on contact
    const peak=play.type==='hr'&&(flight.orbit||on===3);
    // grand slams and orbit shots go straight to the top
    // The ladder for a home run: loud from contact (louder still in Overdrive), a step up as it clears the fence, another if he celebrates.
    if(top)roar(peak?1.6:odHR?1.15:.65,odHR||peak?.1:1.4,true,odHR||peak);
    /* highest tier, and it has to be earned: orbit shots, grand slams, 500 ft and up, Overdrive homers of 450+, and the homer that takes the lead in the last inning */
    if(play.type==='hr')cheer(.42,5);
    else if(play.type!=='foul'){
      crowdRise(q,Math.min(play.endT,8),q>.82&&pw);
      roar(.28+.34*q+(q>.82&&pw?.2:0),.22);
    }
    /* every ball in play: a looped crowd layer that lives exactly as long as the play does, so the park cannot go quiet while the ball is live */
    else cheer(.06,1);
    if(play.type==='hr'&&!top){
      roar(odHR?1.15:.85,odHR?.1:.6);
      roarHR=true;
      roarWave=0;
    }
    if(peak)flight.fenceRoar=true;
    if(odHR||peak){
      crowdE=1;
      sfxSlice('cheer_big',.9,rand(1,1.06),0,3);
    }
  }
  if(play.f){
    play.from=play.f.fig.root.position.clone();
  }
  if(play.type==='hit')sendRunners(play.bases,{
    batter:play.bases
  }
  );
  else if(play.type==='hr')sendRunners(4,{
    batter:flight.admire?0:4,jog:true
  }
  );
  else if(play.type==='out'){
    // a ground ball with a man on first and fewer than two out: is there time to go to second and back to first?
    if(play.label==='GROUND OUT'&&S.bases[0]&&S.outs<2){
      const p=play.p,t=p.t+.8+rand(0,.55)+Math.hypot(p.x,p.z+38.8)/36+.7+27.4/36;
      // a clean feed and pivot is not guaranteed
      play.dp=t<4.4/(1+(b.spd-1)*.9);
      if(play.dp)RUN.list.forEach(R=>{
        if(R.active&&R.s===1&&R.target===1)R.target=2;
      }
      );
    }
    sendRunners(0,{
      batter:1,jog:!!play.air
    }
    );
  }
}


// ───────── afterPA  (index.html L4989)
function afterPA(delay){
  S.stealArm='';
  // plate appearance over
  if(S.mode)try{
    modePA();
  }
  catch(e){
  }
  if(S.outs>=3){
    S.inning++;
    S.forceWalk=true;
    S.outs=0;
    S.bases=[0,0,0];
    if(S.inning>3){
      S.state='end';
      S.t=now;
      readyDur=delay+.4;
      hud();
      return;
    }
    setBatter();
    S.state='result';
    S.t=now;
    S.next=()=>{
      renderRep();
      const fin=k=>{
        const need=S.opp-S.runs+1;
        pop('INNING '+S.inning,(k?'KRAKENS SCORE '+k:'KRAKENS HELD')+' · '+(S.inning===3&&need>0?'NEED '+need+' TO WIN':scoreLine()),k?'hot':'cool',true);
        scoreboard(k?'KRAKENS +'+k:'INNING '+S.inning,scoreLine());
        if(k>=2)boo(.4);
        toReady(2.6);
        hud();
      }
      ;
      if(pdCan())pdAsk(fin);
      else fin(cpuInning(S.inning));
    }
    ;
    readyDur=delay;
    hud();
    return;
  }
  /* the Krakens' half: the player pitches to three of them (or, where that cannot run, the old roll of the dice) */
  setBatter();
  S.state='result';
  S.t=now;
  S.next=null;
  readyDur=delay;
  hud();
}


// ───────── samePA  (index.html L4999)
function samePA(delay){
  if(S.mode&&S.mode.id==='shot')try{
    shotPitch();
  }
  catch(e){
  }
  if(S.mode&&S.mode.id==='derby')try{
    derbyPitch();
  }
  catch(e){
  }
  if(S.stealArm){
    try{
      if(stealRun())return;
    }
    catch(e){
      S.stealArm='';
      S.stealCut=null;
    }
  }
  S.state='result';
  S.t=now;
  S.next=null;
  readyDur=delay;
  hud();
}


// ───────── strike  (index.html L5001)
function strike(kind){
  heatUp(.11);
  S.strikes++;
  {
    const n=S.strikes;
    setTimeout(()=>SND.call(false,n),kind==='look'?240:60);
  }
  // the mitt pops first, then the umpire
  if(S.strikes>=3){
    {
      const q=curBatter();
      q.hs=0;
      q.lock=false;
    }
    recordOut();
    pop('STRUCK OUT',kind==='look'?'CAUGHT LOOKING':'SWINGING','cool');
    if(kind==='look')boo(.5);
    else crowdDrop();
    if(S.stealArm&&S.outs<3){
      const a=S.stealArm;
      afterPA(1.2);
      S.stealArm=a;
      S.stealArmBi=S.bi;
      try{
        stealRun();
      }
      catch(e){
        S.stealArm='';
        S.stealCut=null;
      }
      return;
    }
    /* STRIKE THREE WITH THE RUNNER GOING: he still goes. The steal used to be dropped on a strikeout, as if it had never been called; now the throw to the bag and the play there follow the strikeout, and then the next hitter comes up. */
    // the strikeout sulk: one of the defeat routines, with the camera on him (skipped when walk-ups are off, for pace)
    const ds=MX.clip&&WALK.on?Object.keys(MX.clip.intros).filter(k=>/^d_/.test(k)):[];
    if(ds.length){
      let ts=MX.pit?Object.keys(MX.pit.taunts).filter(k=>!/sadwalk|dying|p_step/.test(k)):[];
      {
        const w=ts.filter(k=>WILD_TAUNT.includes(k));
        if(earlyShow(S.ks||0)&&w.length)ts=w;
      }
      S.ks=(S.ks||0)+1;
      S.kOut={
        t:now+(kind==='look'?.15:.45),bi:S.bi,clip:ds[(Math.random()*ds.length)|0],taunt:ts[(Math.random()*ts.length)|0]
      }
      ;
      afterPA(DEFEAT+.75);
    }
    else afterPA(1.5);
  }
  else{
    pop(kind==='look'?'STRIKE '+['ONE','TWO'][S.strikes-1]+'!':'WHIFF!',kind==='look'?S.balls+'-'+S.strikes:'STRIKE '+['ONE','TWO'][S.strikes-1]+' · '+S.balls+'-'+S.strikes,'plain');
    // sometimes he lets the hitter know about it: a taunt on the mound, seen from the normal batting view (the camera only goes to him after a strikeout)
    const ts=MX.pit&&WALK.on?Object.keys(MX.pit.taunts).filter(k=>!/sadwalk|dying/.test(k)):[],go=ts.length&&!S.stLast&&(DBG.staunt||Math.random()<.4);
    S.stLast=!!go;
    if(go){
      S.sTaunt={
        t:now+.35,clip:ts[(Math.random()*ts.length)|0],dur:2.1
      }
      ;
      setTimeout(()=>boo(.45),500);
    }
    samePA((kind==='look'?1.05:1.3)+(go?.75:0));
  }
}


// ───────── doSwing  (index.html L5205)
function doSwing(type){
  if(S.mode)S.mode.swN=(S.mode.swN||0)+1;
  if(paused||S.state==='title'||S.state==='over')return;
  if(S.state==='trot'){
    S.t=now-TROT.dur;
    return;
  }
  // skip the trot
  if(S.state==='celly2'){
    S.t=now-D2.dur;
    return;
  }
  if(S.state==='hbp'){
    S.t=now-HBD;
    return;
  }
  // (a skip: straight to whatever comes next)
  if(S.state==='brawl'){
    S.t=now-BRW.dur;
    return;
  }
  if(S.state==='hbprun'){
    S.t=now-HBR;
    return;
  }
  if(S.state==='pod'){
    S.t=now-POD;
    return;
  }
  if(S.state==='pdef'){
    S.t=now-PDEF;
    return;
  }
  if(S.state==='pchange'){
    if(pcWalk()){
      S.t=now-S.pcW;
      return;
    }
    /* first tap skips the walk-off, the second skips the new arm */
    S.t=now-PCH-(S.pcW||0);
    return;
  }
  if(S.state==='walkup'){
    if(now-(S.wu0||0)<.35)return;
    MX._bwSkip=S.bi;
    /* (a skip is a skip even while the game is holding for his body to download: the hold is dropped and play goes on) */
    /* a walk-up cannot be skipped in its first third of a second (it was a second and a half, which felt like the tap was being ignored): a thumb already resting on the buttons was skipping them before they were ever seen */
    S.t=Math.min(S.t,now-WALK.dur);
    return;
  }
  // skip the intro
  if(flight&&flight.admire&&!flight.done){
    flight.A=Math.min(flight.A,now-flight.t0);
    return;
  }
  // cut to the ball
  if(flight&&!flight.done&&!flight.pd&&S.state==='flight'&&flight.play&&flight.play.type==='hr'){
    const tf=now-flight.t0;
    if(tf>.45){
      /* ANY homer, any camera (the chase, the orbit shots, the saucer): a tap ends it there and then */
      if(flight.apollo&&!flight.apoDone){
        flight.apoDone=true;
        try{
          badge('eagle');
        }
        catch(e){
        }
      }
      flight.play.endT=Math.min(flight.play.endT,tf+.05);
    }
    return;
  }
  /* a tap cuts the chase camera short (nothing on screen says so: it is there for the player who has seen enough) */
  if(S.state==='celebrate'){
    if(LOCKFX.hr&&(LOCKFX.pend||LOCKFX.cel)&&now-S.t<.9)return;
    /* (his Locked In moment at the plate is short and is not skipped by the tap that cut the homer shot short) */
    if(now-S.t>.25)S.t=now-readyDur;
    return;
  }
  /* (and the celebration at the plate) */
  if(S.wuPend){
    S.wuPend=0;
    S.wuBi=S.bi;
    MX._bwSkip=S.bi;
    return;
  }
  /* (waiting for the next hitter's body before his walk-up: a tap skips the wait and the walk-up, and the at-bat starts) */
  if(swing)return;
  // between pitches the buttons still swing the bat: a practice cut, no cost, so the first tap always teaches what the button does
  if(S.state==='ready'||(S.state==='windup'&&now-windupT0<=.55)){
    swing={
      t0:now,type,turbo:false,done:false,miss:false,practice:true
    }
    ;
    SND.whoosh();
    if(S.state==='ready'&&pmk&&now-pmk.t<LATE_T){
      swing.late=true;
      try{
        timing('WAY LATE','#ff8a70',2);
      }
      catch(e){
      }
    }
    return;
  }
  /* A SWING IS NEVER IGNORED. If the tap comes just after the ball is already in the mitt (he was that late), the bat still comes through and the read-out says so, instead of the button seeming dead. The call that was made stands. */
  if(S.state==='result'&&pmk&&now-pmk.t<LATE_T){
    /* (strike three and ball four included: the late cut still comes through and still says WAY LATE. It used to be swallowed on exactly those pitches, the ones where it stings most.) */
    swing={
      t0:now,type,turbo:false,done:false,miss:false,practice:true,late:true
    }
    ;
    SND.whoosh();
    try{
      timing('WAY LATE','#ff8a70',2);
    }
    catch(e){
    }
    return;
  }
  /* (the window is long on purpose: against Overdrive heat a hitter can be absurdly late, and "I was so late" beats "why didn't he swing") */
  if(!(S.state==='pitch'||(S.state==='windup'&&now-windupT0>.55)))return;
  if(S.over&&!S.overOn&&(keys.ShiftLeft||keys.ShiftRight))juiceTap();
  // desktop: Shift switches Overdrive on
  const od=S.over&&S.overOn,turbo=od||(!S.over&&juiceOn()&&S.juice>=.25);
  swing={
    t0:now,type,turbo,done:false,miss:false,od:!!od
  }
  ;
  SND.whoosh();
  if(turbo&&!od){
    S.juice=Math.max(0,S.juice-.25);
    juiceArmed=false;
    hud();
  }
  // every Juice swing costs a full bar, hit or miss
}


// ───────── shotCall  (index.html L6859)
function shotCall(){
  const M=S.mode,r=Math.random(),z=r<.14?SHOT_Z[3+((Math.random()*2)|0)]:SHOT_Z[(Math.random()*3)|0];
  let k=z.line?'any':['any','any','fly','ground'][(Math.random()*4)|0];
  if(M.call&&M.call.z===z&&M.call.k===k)k=k==='any'?'fly':'any';
  M.call={
    z,k,v:z.line?750:k==='any'?250:500
  }
  ;
  M.cp=0;
  M.ft=0;
  try{
    if(shotWedge){
      scene.remove(shotWedge);
      shotWedge.geometry.dispose();
      try{
        shotWedge.userData.w.geometry.dispose();
      }
      catch(e){
      }
    }
    const g=new T.RingGeometry(26,z.line?118:112,24,1,PI/2-z.b*DEG,(z.b-z.a)*DEG);
    shotWedge=new T.Mesh(g,new T.MeshBasicMaterial({
      color:z.line?0xffd23b:0x3ddc6a,transparent:true,opacity:.34,depthWrite:false,side:T.DoubleSide,fog:false
    }
    ));
    shotWedge.rotation.x=-PI/2;
    shotWedge.position.y=.07;
    shotWedge.renderOrder=2;
    scene.add(shotWedge);
    {
      const w=new T.Mesh(new T.CylinderGeometry(121,121,16,24,1,true,PI-z.b*DEG,(z.b-z.a)*DEG),new T.MeshBasicMaterial({
        color:z.line?0xffd23b:0x3ddc6a,transparent:true,opacity:.3,depthWrite:false,side:T.DoubleSide,fog:false
      }
      ));
      w.rotation.x=PI/2;
      w.position.z=8;
      w.renderOrder=2;
      shotWedge.add(w);
      shotWedge.userData.w=w;
    }
    shotRampShow();
  }
  /* (and a band of light standing along the wall in that field, so the target reads from the batter's box, where the ground is seen nearly edge-on) */
  catch(e){
  }
  shotHud();
}


// ───────── shotRampBuild  (index.html L6864)
function shotRampBuild(){
  if(SHOT_RAMP.g)return;
  const G=new T.Group();
  SHOT_Z.forEach(z=>{
    const phi=(z.a+z.b)/2*DEG,r=z.line?SHOT_RAMP.r+13:SHOT_RAMP.r,w=z.line?6:SHOT_RAMP.w,g=new T.Group(),geo=new T.BoxGeometry(w,.45,SHOT_RAMP.len);
    geo.translate(0,.22,SHOT_RAMP.len/2);
    const m=new T.Mesh(geo,new T.MeshBasicMaterial({
      color:0x4a5068,fog:false
    }
    )),st=new T.Mesh(new T.PlaneGeometry(w*.86,SHOT_RAMP.len*.86),new T.MeshBasicMaterial({
      map:(()=>{
        const c=document.createElement('canvas');
        c.width=64;
        c.height=64;
        const g=c.getContext('2d');
        g.clearRect(0,0,64,64);
        g.strokeStyle='#fff';
        g.lineWidth=9;
        g.lineJoin='miter';
        for(const y of [30,62]){
          g.beginPath();
          g.moveTo(6,y);
          g.lineTo(32,y-24);
          g.lineTo(58,y);
          g.stroke();
        }
        const t=new T.CanvasTexture(c);
        t.wrapT=T.RepeatWrapping;
        t.repeat.set(1,2);
        return t;
      }
      )(),color:0x2f6b4a,transparent:true,opacity:.55,fog:false,side:T.DoubleSide,depthWrite:false
    }
    ));
    st.rotation.x=-PI/2;
    st.position.set(0,.47,SHOT_RAMP.len/2);
    m.add(st);
    /* chevrons on the ramp's face, pointing up it: dull green while the ramp is off, yellow, flashing and running when it is on */
    g.add(m);
    g.position.set(r*Math.sin(phi),.02,-r*Math.cos(phi));
    g.rotation.y=PI-phi;
    G.add(g);
    SHOT_RAMP.list.push({
      z,g,m,phi,r,w,st
    }
    );
  }
  );
  G.visible=false;
  scene.add(G);
  SHOT_RAMP.g=G;
}


// ───────── shotRampShow  (index.html L6867)
function shotRampShow(){
  try{
    shotRampBuild();
    const M=S.mode,on=!!(M&&M.id==='shot');
    SHOT_RAMP.g.visible=on;
    if(!on)return;
    SHOT_RAMP.list.forEach(R=>{
      const live=M.call&&M.call.z===R.z;
      R.live=live;
      R.m.rotation.x=live?-.33:0;
      R.m.material.color.setHex(live?(R.z.line?0xffd23b:0x3ddc6a):0x4a5068);
    }
    );
  }
  catch(e){
  }
}


// ───────── shotRamp  (index.html L6868)
function shotRamp(tr){
  const R=SHOT_RAMP.list.find(q=>q.live);
  if(!R||tr.foul||tr.hr)return tr;
  const ux=Math.sin(R.phi),uz=-Math.cos(R.phi),P=tr.pts;
  let hit=-1;
  for(let i=8;
  i<P.length;
  i++){
    const q=P[i];
    if(q.y>1.5)continue;
    const d=q.x*ux+q.z*uz-R.r,l=q.x*(-uz)+q.z*ux;
    if(d>=0&&d<=SHOT_RAMP.len&&Math.abs(l)<=R.w/2){
      hit=i;
      break;
    }
  }
  if(hit<0)return tr;
  const a=P[Math.max(0,hit-4)],q=P[hit],dt=q.t-a.t||.033,vx=(q.x-a.x)/dt,vz=(q.z-a.z)/dt,vh=Math.hypot(vx,vz)||1,sp=clamp(vh*.95+7,20,37),la=34*DEG;
  const t2=simulate(new V3(q.x,Math.max(.4,q.y)+.9,q.z),new V3(vx/vh*Math.cos(la)*sp,Math.sin(la)*sp,vz/vh*Math.cos(la)*sp),{
    side:0,lift:0
  }
  ,{
  }
  );
  if(!t2||!t2.pts||t2.pts.length<4)return tr;
  const t0=q.t,out=Object.assign({
  }
  ,t2);
  out.pts=P.slice(0,hit).concat(t2.pts.map(z=>({
    x:z.x,y:z.y,z:z.z,t:z.t+t0
  }
  )));
  ['hrT','wallT','eyeT','seatT','seatB','outT','endT','poleT','foulT','hopT'].forEach(k=>{
    if(t2[k])out[k]=t2[k]+t0;
  }
  );
  out.land=tr.land||{
    x:q.x,z:q.z,t:t0
  }
  ;
  out.foul=false;
  out.tag=tr.tag;
  out.ramp={
    t:t0,x:q.x,z:q.z,i:hit
  }
  ;
  return out;
}


// ───────── shotFielders  (index.html L6874)
function shotFielders(off){
  try{
    fielders.forEach(c=>{
      if(off){
        if(!c._gs)c._gs=[c.reach,c.speed,c.react];
        c.reach=0;
        c.speed=0;
        c.react=1e6;
      }
      else if(c._gs){
        c.reach=c._gs[0];
        c.speed=c._gs[1];
        c.react=c._gs[2];
        c._gs=null;
        if(!c.isP)c.fig.root.visible=true;
      }
    }
    );
  }
  catch(e){
  }
}


// ───────── shotOff  (index.html L6875)
function shotOff(){
  shotFielders(false);
  try{
    if(SHOT_RAMP.g)SHOT_RAMP.g.visible=false;
  }
  catch(e){
  }
  try{
    if(shotWedge){
      scene.remove(shotWedge);
      shotWedge.geometry.dispose();
      shotWedge=null;
    }
  }
  catch(e){
  }
  $('dgoal').classList.remove('two');
}


// ───────── shotGfx  (index.html L6877)
function shotGfx(c){
  const e=$('shotg');
  if(!e)return;
  const cx=60,cy=76,R=64,pt=(a,r)=>[(cx+Math.sin(a*DEG)*r).toFixed(1),(cy-Math.cos(a*DEG)*r).toFixed(1)],sec=(a,b,r)=>'M'+cx+' '+cy+' L'+pt(a,r).join(' ')+' A'+r+' '+r+' 0 0 1 '+pt(b,r).join(' ')+' Z';
  const z=c.z,mid=(z.a+z.b)/2,tip=pt(mid,c.k==='ground'?40:54),st=pt(mid,9),ctl=c.k==='fly'?(()=>{
    const dx=+tip[0]- +st[0],dy=+tip[1]- +st[1],L=Math.hypot(dx,dy)||1;
    let px=-dy/L,py=dx/L;
    if(Math.abs(px)<.2){
      px=-1;
      py=0;
    }
    else if(py>0){
      px=-px;
      py=-py;
    }
    return [(+st[0]+ +tip[0])/2+px*17,(+st[1]+ +tip[1])/2+py*17];
  }
  )():null,ang=c.k==='fly'?Math.atan2(+tip[1]-ctl[1],+tip[0]-ctl[0]):Math.atan2(+tip[1]- +st[1],+tip[0]- +st[0]),hx=+tip[0],hy=+tip[1],hd=a=>(hx+Math.cos(ang+a)*-11).toFixed(1)+' '+(hy+Math.sin(ang+a)*-11).toFixed(1);
  const path=c.k==='fly'?'M'+st.join(' ')+' Q'+ctl[0].toFixed(1)+' '+ctl[1].toFixed(1)+' '+tip.join(' '):'M'+st.join(' ')+' L'+tip.join(' '),arrow=w=>'<path d="'+path+'" fill="none" stroke-width="'+w+'" stroke-linecap="round"'+(c.k==='ground'?' stroke-dasharray="7 4"':'')+'/><path d="M'+hd(.5)+' L'+hx+' '+hy+' L'+hd(-.5)+'" fill="none" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>';
  const words=(z.line?'DOWN THE LINE!':z.id==='C'?(c.k==='ground'?'UP THE MIDDLE!':'CENTER FIELD!'):(z.id==='L'?'LEFT FIELD!':'RIGHT FIELD!')),how=c.k==='fly'?'IN THE AIR':c.k==='ground'?'ON THE GROUND':'';
  const lk=shotWant(c),look=lk>0?'LOOK INSIDE \u00B7 GET OUT FRONT':lk<0?'LOOK AWAY \u00B7 LET IT TRAVEL':'LOOK MIDDLE \u00B7 RIGHT ON TIME';
  e.innerHTML='<b>'+words+'</b>'+(how?'<em>'+how+'</em>':'')+'<u class="lk">'+look+'</u><svg viewBox="0 0 120 82"><path d="'+sec(-45,45,R)+'" fill="#27308a" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"/><path d="'+sec(z.a,z.b,R)+'" fill="#e0262b" stroke="#fff" stroke-width="1.5"/><path d="M'+pt(-45,24).join(' ')+' A24 24 0 0 1 '+pt(45,24).join(' ')+'" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.5"/><g stroke="#05060f">'+arrow(8)+'</g><g stroke="#ffe53b">'+arrow(4.5)+'</g></svg><i>'+c.v+' PTS</i>';
}


// ───────── shotAim  (index.html L6893)
function shotAim(pt){
  try{
    const M=S.mode;
    if(!M||M.id!=='shot'||!M.call||!pt||pt.hbp)return;
    const w=shotWant(M.call),sd=(MX.lefty?-1:1);
    if(Math.random()<(M.ft>=2?1:.7)){
      pt.tx=w>0?-sd*rand(.11,.22):w<0?sd*rand(.09,.22):rand(-.07,.07);
      pt.inZone=zoneHit(pt.tx,pt.ty);
    }
  }
  catch(e){
  }
}


// ───────── shotGfxTick  (index.html L6902)
function shotGfxTick(){
  const e=$('shotg');
  if(!e)return;
  const M=S.mode,on=!!(M&&M.id==='shot'&&M.call&&!M.done&&(S.state==='ready'||S.state==='windup'||S.state==='pitch')&&!paused);
  if(!on){
    if(!e.hidden)e.hidden=true;
    return;
  }
  _sh.set(0,3.1,-18.4).project(camera);
  const w=canvas.clientWidth||innerWidth,h=canvas.clientHeight||innerHeight,sx=(_sh.x*.5+.5)*w,sy=(-_sh.y*.5+.5)*h;
  e.hidden=false;
  const eh=e.offsetHeight||120,ew=e.offsetWidth||140,top=isFinite(sy)?Math.max(sy-eh,MOB?150:110):(MOB?150:110);
  e.style.left=clamp(isFinite(sx)?sx:w/2,ew/2+6,w-ew/2-6)+'px';
  e.style.top=top+'px';
  try{
    const tt=performance.now()/1000;
    SHOT_RAMP.list.forEach(R=>{
      if(!R.st)return;
      if(R.live){
        R.st.material.map.offset.y=-(tt*1.6)%1;
        R.st.material.color.setHex(0xffe53b);
        R.st.material.opacity=.75+.25*Math.sin(tt*9);
      }
      else{
        R.st.material.color.setHex(0x2f6b4a);
        R.st.material.opacity=.55;
      }
    }
    );
  }
  catch(x){
  }
}


// ───────── shotHud  (index.html L6905)
function shotHud(){
  const M=S.mode,e=$('dgoal');
  if(!M||!M.call)return;
  const c=M.call,need=shotNeed(M.round);
  e.classList.add('two');
  e.hidden=false;
  const mid=(c.z.a+c.z.b)/2*(MX.lefty?-1:1),how=mid<-8?'SWING EARLY':mid>8?'SWING LATE':'RIGHT ON TIME';
  try{
    shotGfx(c);
  }
  catch(x){
  }
  e.innerHTML='<small>ROUND '+M.round+' \u00B7 '+Math.max(0,M.rs).toLocaleString()+' / '+need.toLocaleString()+' \u00B7 '+(10-M.np)+' PITCH'+(10-M.np===1?'':'ES')+' LEFT \u00B7 TOTAL '+M.total.toLocaleString()+'</small><i><u style="width:'+clamp(M.rs/need*100,0,100).toFixed(0)+'%"></u></i>';
}


// ───────── shotPitch  (index.html L6907)
function shotPitch(){
  const M=S.mode;
  if(!M||M.done||!M.call)return;
  const F=flight,c=M.call;
  let pts=0,msg='NO CONTACT \u00B7 0',col='#9aa3c7';
  if(F&&F!==M.f0&&F.tr){
    M.f0=F;
    const tr=F.tr;
    if(tr.foul){
      msg='FOUL \u00B7 0';
    }
    else{
      const P=tr.pts,RP=tr.ramp,q=RP||(F.play&&F.play.type==='hr')?P[P.length-1]:tr.land||P[P.length-1],e=P[P.length-1],ang=Math.atan2(e.x,-e.z)/DEG;
      let apex=0;
      for(let i=0;
      i<(RP?RP.i:P.length);
      i+=3)if(P[i].y>apex)apex=P[i].y;
      /* (off a ramp: it is a grounder or a fly by what it did before the ramp, and its distance is where it finally came down) */
      const hr=F.play&&F.play.type==='hr',kind=(hr&&!RP)||apex>=7?'fly':apex<2.4?'ground':'line',ft=Math.round((hr&&tr.dist?tr.dist:Math.hypot((kind==='ground'||RP?e:q).x,(kind==='ground'||RP?e:q).z))*3.281),inZ=ang>=c.z.a&&ang<=c.z.b,okK=c.k==='any'||c.k===kind;
      if(inZ&&okK){
        pts=c.v+ft;
        msg=(RP?'OFF THE RAMP \u00B7 +':'ON THE MONEY \u00B7 +')+c.v+' +'+ft+' FT';
        col='#3ddc6a';
        M.good++;
      }
      else{
        pts=-c.v;
        msg=(inZ?(c.k==='fly'?'NEEDED IT IN THE AIR':'NEEDED IT ON THE GROUND'):'WRONG FIELD')+' \u00B7 \u2212'+c.v;
        col='#ff5a4a';
      }
    }
  }
  /* GETTING THE RIGHT PITCH IS PART OF IT: a take costs nothing unless the pitch was a strike in the third the call is asking for. The call stays up until you swing or let your pitch go by. */
  {
    const swung=(M.swN||0)!==(M.swS||0),hit=msg!=='NO CONTACT \u00B7 0';
    M.swS=M.swN||0;
    M.cp=(M.cp||0)+1;
    if(!swung&&!hit){
      let yours=false;
      try{
        const si=shotIn(pitch),col=si>1/3?1:si<-1/3?-1:0;
        yours=!!pitch.inZone&&col===shotWant(c);
      }
      catch(e){
      }
      if(!yours){
        M.ft=(M.ft||0)+1;
        S.balls=0;
        S.strikes=0;
        try{
          timing('GOOD TAKE \u00B7 NOT YOUR PITCH','#7fe6ff',2.4);
        }
        catch(e){
        }
        try{
          shotHud();
          hud();
        }
        catch(e){
        }
        return;
      }
      msg='THAT WAS YOUR PITCH \u00B7 0';
      col='#ffb02e';
    }
  }
  M.np++;
  M.rs+=pts;
  M.total+=pts;
  S.balls=0;
  S.strikes=0;
  try{
    timing(msg,col,3);
  }
  catch(e){
  }
  const need=shotNeed(M.round);
  if(M.rs>=need){
    const left=10-M.np,bonus=left*150;
    M.total+=bonus;
    M.best=Math.max(M.best,M.round);
    M.round++;
    M.np=0;
    M.rs=0;
    try{
      pop('ROUND '+M.round,'METER FILLED'+(bonus?' \u00B7 +'+bonus+' FOR '+left+' PITCH'+(left===1?'':'ES')+' SAVED':'')+' \u00B7 NEXT: '+shotNeed(M.round).toLocaleString(),'hot',true);
      cheer(.25,2);
    }
    catch(e){
    }
  }
  else if(M.np>=10){
    M.done=true;
    M.endAt=now;
    shotHud();
    return;
  }
  shotCall();
  try{
    hud();
  }
  catch(e){
  }
}


// ───────── shotStart  (index.html L6919)
function shotStart(){
  if(MX.loading||MX.pdW)return;
  try{
    audioInit();
    if(AC&&AC.state==='suspended')AC.resume();
  }
  catch(e){
  }
  newGame();
  S.mode={
    id:'shot',round:1,np:0,rs:0,total:0,good:0,best:0,done:false,f0:flight,call:null
  }
  ;
  lastMode='shot';
  S.juice=0;
  shotFielders(true);
  try{
    pop('THE GAUNTLET','TEN PITCHES \u00B7 FILL THE METER','cool',true);
    scoreboard('THE','GAUNTLET');
  }
  catch(e){
  }
  shotCall();
  try{
    hud();
  }
  catch(e){
  }
}
