// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── podCls  (index.html L1456)
function podCls(){
  const st=S.state,on=pOD()&&!PD.on&&!(st==='title'||
  /* (the Kraken pitcher's red flames have no business on screen while the player is the one pitching) */
  st==='over'||st==='end'||st==='walkup'||st==='pchange');
  if(on!==podOn){
    podOn=on;
    $('hud').classList.toggle('pod',on);
  }
  {
    const np=(S.balls|0)+(S.strikes|0),ks=on&&!(S.over&&S.overOn)?((S.strikes|0)>=2||np>=3?2:np>=1?1:0):0;
    /* it closes in with every pitch he throws, ball or strike: no waiting him out */
    if(ks!==podKs){
      podKs=ks;
      $('hud').classList.toggle('ks1',ks===1);
      $('hud').classList.toggle('ks2',ks===2);
    }
  }
  {
    const lv=on&&(st==='ready'||st==='windup'||st==='pitch')&&$('tut').hidden;
    if(lv!==podLv){
      podLv=lv;
      $('hud').classList.toggle('podlive',lv);
    }
  }
  const ip=st==='flight'||st==='result'||st==='trot'||st==='celebrate'||st==='celly2';
  if(ip!==inplayOn){
    inplayOn=ip;
    $('hud').classList.toggle('inplay',ip);
  }
  const ce=st==='celly2'||st==='trot'||st==='qte'||st==='brawl'||st==='hbprun'||!!(flight&&flight.orb&&!flight.done);
  if(ce!==celOn){
    celOn=ce;
    $('hud').classList.toggle('cel',ce);
  }
  if((st==='brawl')!==brwOn){
    brwOn=st==='brawl';
    $('hud').classList.toggle('brw',brwOn);
  }
  $('hud').classList.toggle('brc',st==='brawl'&&now-S.t<3.5);
  {
    const tt=st==='title'||st==='over'||st==='result'||st==='end'||st==='hbp'||st==='brawl';
    /* hit by a pitch: no ratings on screen while he is down or fighting. They come back with the outcome (the ratings banner as he takes his base). */
    if(tt!==ttlOn){
      ttlOn=tt;
      $('hud').classList.toggle('ttl',tt);
    }
  }
  /* (also while a play's result is being called: the plate and the callout never share the screen) */
  if((st==='qte')!==qsOn){
    qsOn=st==='qte';
    $('hud').classList.toggle('qs',qsOn);
  }
  if((st==='hbp')!==hbOn){
    hbOn=st==='hbp';
    $('hud').classList.toggle('hbps',hbOn);
  }
  $('hud').classList.toggle('hbr',st==='hbprun');
}


// ───────── podTagPos  (index.html L1489)
function podTagPos(){
  const e=$('podtag');
  if(!$('hud').classList.contains('podlive')||!MX.pit){
    if(e._on){
      e._on=0;
      e.style.top='';
      e.style.zoom='';
    }
    return;
  }
  let hi=2.2;
  const sk=MX.pit._bones||(MX.pit._bones=(()=>{
    const a=[];
    MX.pit.obj.traverse(b=>{
      if(b.isBone&&/Head|Hand$|HandMiddle1|Foot$/.test(b.name))a.push(b);
    }
    );
    return a;
  }
  )());
  for(const b of sk){
    b.getWorldPosition(_pt);
    if(_pt.y>hi)hi=_pt.y;
  }
  e._hi=Math.max(hi,(e._hi||hi)-.02);
  /* comes down slowly, so it does not bob with every gesture */
  _s0.set(0,e._hi+(MOB?.75:.35),-18.4).project(camera);
  const H=canvas.clientHeight||innerHeight,head=(-_s0.y*.5+.5)*H,top0=MOB?112:84;
  e.style.zoom='';
  const h0=e.offsetHeight||50,k=clamp((head-top0)/h0,.5,1);
  e.style.zoom=k<1?k.toFixed(3):'';
  e.style.top=(Math.max(top0,head-h0*k)/k).toFixed(0)+'px';
  e._on=1;
}


// ───────── duelCheck  (index.html L3803)
function duelCheck(){
  if(S.duel||!(S.over&&S.overOn&&S.pOver))return;
  if((S.odUses||0)<2&&!pOD()){
    S.pOver=false;
    return;
  }
  S.duel=true;
  S.duelHits=S.hits;
  $('hud').classList.add('duel');
  infoOnce('mm_sdx',1900,()=>!!S.duel,'purple','OVERDRIVE SHOWDOWN','<span>You and the pitcher are <i>both</i> in Overdrive at the same time. This is a <i>Showdown</i>.</span><ul><li>He throws nothing but his wildest Juice pitches.</li><li>Your swing is at full power: square one up and it is leaving the park.</li><li>It ends when you get a hit or make an out. Winner takes the moment.</li></ul>');
  const d=$('duel');
  d.classList.remove('go');
  void d.offsetWidth;
  d.classList.add('go');
  SND.zap();
  setTimeout(()=>SND.zap(),180);
  buzz([60,40,60,40,140]);
  shake=Math.max(shake,.35*FX);
  flash(.5);
  cheer(.45,4);
  if(S.state==='ready'){
    S.t=now;
    readyDur=Math.max(readyDur,2.3);
  }
  // the pitch waits for the banner
  else if((S.state==='windup'||S.state==='pitch')&&!swing&&!flight){
    // he was already into his delivery: that pitch is called off and he comes set again, so the hitter gets a fair look
    if(pitch)S.pitches=Math.max(0,S.pitches-1);
    S.state='ready';
    S.t=now;
    readyDur=2.0;
    pitch=null;
    ball.visible=false;
    ballShadow.visible=false;
    pring.visible=false;
    ballGlow.material.opacity=0;
  }
}


// ───────── duelEnd  (index.html L3808)
function duelEnd(){
  if(!S.duel)return;
  S.duel=false;
  $('hud').classList.remove('duel');
  const won=S.hits>S.duelHits||S.walked;
  if(won)cheer(.5,3);
  else boo(.6);
}


// ───────── podReveal  (index.html L4389)
function podReveal(){
  S.podPending=false;
  S.state='pod';
  S.t=now;
  PODFX.t=now+.55;
  PODFX.fired=false;
  /* half a second into his routine he erupts in red flame */
  {
    const ts=MX.pit?Object.keys(MX.pit.taunts).filter(k=>/clap|threat/.test(k)):[];
    if(ts.length)S.sTaunt={
      t:now+.05,clip:ts[(Math.random()*ts.length)|0],dur:POD-.1
    }
    ;
  }
  flash(.5);
  boo(.6);
  SND.zap();
  setTimeout(()=>SND.zap(),200);
  buzz([40,40,40,40,90]);
  shake=Math.max(shake,.45*FX);
  pop('PITCHER OVERDRIVE!','EVERY PITCH IS A JUICE PITCH','hot pod',true);
  S.duelPend=true;
  hud();
  /* (if you are in Overdrive too, the Showdown banner waits until his reveal is over and the picture is back at the plate) */
  // THE FIRST TIME EVER: the game stops and says what this is, so nobody is left wondering what just happened
  podExplain(1200);
}


// ───────── podExplain  (index.html L4412)
function podExplain(delay){
  infoOnce('mm_podx',delay,()=>{
    const st=S.state;
    return st==='title'||st==='over'||st==='end'||PD.on?false:(st==='pod'||(st==='ready'&&now-S.t>.3))?true:'wait';
  }
  /* only during his own Overdrive routine, or once the hitter is set in the box: never over a homer, a trot or any other cut-scene */
  ,'','PITCHER OVERDRIVE','<span>The pitcher has a Juice meter too. Strikes and outs fill it, and when it is full he goes into <i>Overdrive</i>.</span><ul><li>Every pitch he throws is a nasty <i>Juice pitch</i> until someone gets a hit.</li><li>His meter is the red bar at the top, next to yours.</li><li>Answer with your own Overdrive for a <i>Showdown</i>, or just put the ball in play to end it.</li></ul>',()=>{
    if(S.state==='pod')S.t=now-POD+.6;
  }
  );
}


// ───────── choosePitch  (index.html L4584)
function choosePitch(){
  if(S.mode&&(S.mode.id==='derby'||(S.mode.id==='shot'&&S.mode.round<=1))){
    const bp=S.mode.id==='derby',L=bp?derbyLv(S.mode):0,
    /* THE DERBY STARTS AS BATTING PRACTICE AND TIGHTENS EVERY TEN HOME RUNS: at first nine pitches in ten are a slow fastball dead center. Each level takes a few of those away, spreads the rest a little wider, adds a few miles an hour, and from level 3 mixes in the odd change-up. */
    mid=bp?clamp(.92-.09*L,.5,.92):0,wide=!bp||Math.random()>mid,off=bp&&L>=2&&Math.random()<Math.min(.3,.1*(L-1)),P=PITCHES[off?3:0],sp=.1+.025*L,tx=!wide?rand(-.03,.03):rand(-sp,sp),ty=!wide?rand(.81,.86):rand(.74-.02*L,.92+.02*L),bk=off?.6:.25+.06*L;
    const dead=bp&&(S.mode.np=(S.mode.np||0)+1)<=6;
    /* THE FIRST SIX PITCHES OF A DERBY ARE LITERALLY MIDDLE-MIDDLE: the ball crosses exactly where the crosshair already sits, dead straight, so the only thing to get right is the timing */
    if(dead)return {
      P:PITCHES[0],tx:0,ty:.825,dur:.96*rand(.99,1.02),brk:new V3(0,0,0),lh:!!(S.pName&&S.pName[2]==='L'),arc:PITCHES[0].arc,rel:new V3(),t0:0,inZone:true
    }
    ;
    return {
      P,tx,ty,dur:(bp?Math.max(.74,.96-.035*L)*(off?P.dur/PITCHES[0].dur*.92:1):.88)*rand(.98,1.03),brk:new V3(P.brk[0]*bk*(S.pName&&S.pName[2]==='L'?-1:1),P.brk[1]*bk,0),lh:!!(S.pName&&S.pName[2]==='L'),arc:P.arc,rel:new V3(),t0:0,inZone:true
    }
    ;
  }
  /* THE DERBY: batting-practice fastballs, right down the middle */
  if(easyAB()){
    const P=PITCHES[0],tx=rand(-.11,.11),ty=rand(.72,.94);
    return {
      P,tx,ty,dur:.84*rand(.98,1.03),brk:new V3(P.brk[0]*.3*(S.pName&&S.pName[2]==='L'?-1:1),P.brk[1]*.3,0),lh:!!(S.pName&&S.pName[2]==='L'),arc:P.arc,rel:new V3(),t0:0,inZone:true
    }
    ;
  }
  // the pitcher has a meter too: strikes and outs build Heat, and he spends a bar of it to throw a special pitch
  // The pitcher has Juice too. Nobody sees it in the first three at-bats of a game; the fourth hitter on is guaranteed the game's first
  // special pitch within his first two pitches, so the player learns early that it exists. After that it follows the Heat meter.
  const due=S.bi>=3&&!S.spSeen&&(S.balls+S.strikes>=1||Math.random()<.5);
  // The more runs on the board, the angrier he gets: his Heat builds a little on every pitch and he reaches for a Juice pitch more often.
  // It stays a dice roll each pitch, so there is never a pattern to sit on.
  const mad=Math.min(S.runs,10);
  // his meter itself only moves on strikes, outs and what he spends
  const special=S.pOver||(S.bi>=3&&(due||(S.heat>=.333&&Math.random()<.38+.04*mad)));
  // new players don't see special pitches in their first inning // the Heat is only deducted once the pitch has been seen (payHeat), so the meter doesn't give it away
  const ars=!special&&!S.pOver&&!S.mode&&ARS[S.pName&&S.pName[0]],pool=ars?PITCHES.filter(p=>ars.includes(p.n)):PITCHES.filter(p=>(S.pOver?p.sp:special?p.sp&&!p.od:!p.sp)&&!p.x);
  /* (his ordinary pitches come from his own arsenal; Juice pitches are as before) */
  let tw=0;
  pool.forEach(p=>tw+=p.w||1);
  let r=Math.random()*tw,P=pool[0];
  for(const p of pool){
    r-=p.w||1;
    if(r<=0){
      P=p;
      break;
    }
  }
  if(DBG.pn){
    const q=PITCHES.find(x=>x.n===DBG.pn);
    if(q)P=q;
  }
  const inZone=S.bi===0||(S.strikes===0&&S.balls>=2&&Math.random()<(S.balls===3?.98:.85))||(S.pOver&&!(S.over&&S.overOn)&&S.balls>=2&&Math.random()<(S.balls===3?.97:.8))||Math.random()<.64;
  /* behind 2-0 or 3-0 he comes after the hitter: a four-pitch walk almost never happens */
  let tx,ty;
  // the first hitter of every game only sees strikes: nobody's first at-bat is a walk
  if(inZone){
    tx=rand(ZONE.x0+.03,ZONE.x1-.03);
    ty=rand(ZONE.y0+.04,ZONE.y1-.04);
  }
  else{
    const side=(Math.random()*4)|0,o=rand(.1,.26);
    tx=rand(ZONE.x0,ZONE.x1);
    ty=rand(ZONE.y0,ZONE.y1);
    if(side===0)tx=ZONE.x0-o;
    else if(side===1)tx=ZONE.x1+o;
    else if(side===2)ty=ZONE.y0-o;
    else ty=ZONE.y1+o;
  }
  // Now and then one gets away from him (far more often when he is in Overdrive and throwing with bad intentions): it is headed for the hitter.
  // Never to the first three hitters of a new player's early games, and at most twice a game.
  const hbp=!S.mode&&((S.bi===S.forceHbpBi&&S.balls+S.strikes===0&&!(S.over&&S.overOn)&&!S.hbpN)||S.bi>0&&!(S.over&&S.overOn)&&!(gamesPlayed<=3&&S.bi<3)&&(S.hbpN||0)<3&&S.balls+S.strikes===0&&(DBG.hbp||Math.random()<(S.bi===S.retalBi?.3:S.pOver?.14:.05)));
  /* the hitter after a big homer or a showy celebration is far more likely to wear one: it reads as payback */
  // never while the hitter is in Overdrive
  if(hbp){
    tx=(curBatter().lh?1:-1)*.68;
    ty=rand(1.05,1.3);
  }
  const sp=inningSp();
  return {
    P,tx,ty,hbp,dur:P.dur*sp*DFX().dur*rand(.97,1.03),brk:new V3(P.brk[0]*rand(.8,1.15)*(DFX().brk||1)*(S.pName&&S.pName[2]==='L'?-1:1),P.brk[1]*rand(.8,1.15)*(DFX().brk||1),0),lh:!!(S.pName&&S.pName[2]==='L'),arc:P.arc,rel:new V3(),t0:0,
    /* a left-hander's pitches break the other way: his slider runs toward the third-base side, his screwball and changeup fade toward first */
    inZone:zoneHit(tx,ty)
  }
  ;
}


// ───────── pitchPos  (index.html L4615)
function pitchPos(pt,u,out){
  const P=pt.P;
  if(P.warp&&u<1)u=clamp(P.warp(u),0,1);
  // a stop, or a change of speed, in the look of the flight only
  const k=pt.k||pt.P.k||2.5,e=Math.pow(Math.min(u,1),k)+Math.max(0,u-1)*k;
  out.x=lerp(pt.rel.x,pt.tx-pt.brk.x,u)+pt.brk.x*e;
  out.y=lerp(pt.rel.y,pt.ty-pt.brk.y,u)+pt.brk.y*e+pt.arc*4*u*(1-u);
  out.z=u<=1?lerp(pt.rel.z,0,u):-pt.rel.z*(u-1)*.28;
  // past the plate the ball is drawn barely moving on (about a foot, not four): a swing that is late but still inside the timing window meets it at the plate, never visibly behind it. Timing itself is untouched.
  if(pt.P.wob&&u<1){
    const k=(1-u)*Math.min(1,u*4);
    const wk=pt.wk||1;
    out.x+=(pt.P.zz?Math.asin(Math.sin(u*pt.P.wobF))*2/PI:Math.sin(u*pt.P.wobF))*pt.P.wob*k*wk;
    if(pt.P.cork)out.y+=Math.cos(u*pt.P.wobF)*pt.P.wob*k*wk;
  }
  if(u<1&&(P.boom||P.split||P.knuck)){
    if(pt.sd===undefined){
      pt.sd=Math.random()<.5?-1:1;
      pt.ph=[rand(0,6.3),rand(0,6.3),rand(0,6.3)];
    }
    if(P.boom)out.x+=Math.sin(PI*u)*P.boom*pt.sd;
    if(P.split)out.x+=Math.sin(PI*Math.min(1,u*1.15))*P.split*pt.sd*(pt.decoy?-1:1);
    if(P.knuck){
      const kk=(1-u)*Math.min(1,u*5);
      out.x+=(Math.sin(u*33+pt.ph[0])*.05+Math.sin(u*19+pt.ph[1])*.08)*kk;
      out.y+=Math.sin(u*27+pt.ph[2])*.06*kk;
    }
  }
  return out;
}


// ───────── pitcherModel  (index.html L5740)
function pitcherModel(force){
  if(!MX.pitVar||!MX.pit||!MX.pitLoad)return;
  const bi=Math.max(0,BULLPEN.indexOf(S.pName)),own=BULLPEN[bi][3]||0,want=PD.on||S.state==='pask'?14:force===undefined?own:force;
  /* while the player pitches it is always the Comets' own man on the mound */
  if(force===undefined&&S.state==='qte')return;
  /* the close-up at the bag keeps the fielder's body until it is over */
  MX.pitLoad(own);
  MX.pitLoad(BULLPEN[(bi+1)%BULLPEN.length][3]||0);
  // his own body, and the next arm's, so it is here before he is needed
  const tgt=MX.pitVar[want]?want:MX.pitCur;
  if(tgt===MX.pitCur)return;
  const rigs=MX.rigs||(MX.rigs={
    [MX.pitCur]:MX.pit
  }
  ),old=MX.pit;
  /* a body that has been on the mound once is kept, dressed and ready: going back to it costs nothing */
  if(rigs[tgt]){
    scene.remove(old.obj);
    MX.pit=rigs[tgt];
    scene.add(MX.pit.obj);
    MX.pitCur=tgt;
    return;
  }
  const v=MX.pitVar[tgt];
  try{
    setupPitcher(v.make(),v.skin);
    MX.pitCur=tgt;
    rigs[tgt]=MX.pit;
    scene.remove(old.obj);
  }
  catch(e){
    console.warn('pitcher swap failed',e);
    (MX.pitErr=MX.pitErr||{
    }
    )[tgt]='swap '+String(e&&e.message||e).slice(0,60);
    MX.pit=old;
    if(!old.obj.parent)scene.add(old.obj);
  }
}


// ───────── updatePitcher  (index.html L6158)
function updatePitcher(){
  if(MX.pit&&MX.on){
    const P=MX.pit;
    if(P.sx===undefined)P.sx=Math.abs(P.obj.scale.x);
    P.obj.scale.x=P.sx*(S.pName&&S.pName[2]?-1:1);
    const pdW1=S.state==='pduel'&&PD.ph===1&&!PD.style,pdW=pdW1||(S.state==='pduel'&&PD.ph>=2&&PD.ph<=4),act=pdW||S.state==='windup'||((S.state==='pitch'||S.state==='flight'||S.state==='result')&&pitch);
    /* THE LEG KICK IS THE POWER BAR. While the power ring swells his leg comes up with it: full power is the full kick, and a pitch thrown with less
       stops the leg where the bar was stopped. Then the throw goes as it always has (the first instant of it carries him from that kick into the delivery). */
    let e=0;
    if(act){
      if(pdW1){
        let pw=0;
        try{
          pw=PD.pwOn?pdPwAt(pwEl()):(PD.pw||0);
        }
        catch(x){
        }
        PD.kickE=.82*clamp(pw,0,1);
        e=PD.kickE;
        if(!PD.pwOn&&PD3){
          let u=0;
          try{
            u=clamp((now-PD.t)/pdQ().T,0,1.05);
          }
          catch(x){
          }
          e=lerp(PD.kickE,.965,Math.min(1,u));
        }
        /* NO FREEZE AT THE TOP: once the power is set he keeps moving. As the timing ring closes he comes down out of the kick and strides, arriving at the point of release just as the ring meets the circle, so the tap and the ball leaving his hand are the same moment. */
        PD.eNow=e;
      }
      else if(pdW&&!PD.style&&PD.kickE!==undefined&&PD.kickE<.8){
        const e0=now-PD.wuT,tt=e0-.82;
        e=tt<.14?lerp(PD.kickE,.96,clamp(tt/.14,0,1)):e0;
      }
      else e=now-(pdW?PD.wuT:windupT0);
    }
    let k=0;
    /* (while the ring is still closing he winds and holds at the top) */
    for(const n in P.taunts)if(P.taunts[n].made)P.taunts[n].a.setEffectiveWeight(0);
    if(S.kOut&&S.kOut.taunt&&now>S.kOut.t&&now<S.kOut.t+DEFEAT){
      const tn=P.taunts[S.kOut.taunt],te=now-S.kOut.t;
      // struck him out: rub it in
      k=ease(clamp(te/.35,0,1))*ease(clamp((DEFEAT-te)/.35,0,1));
      tn.a.time=tn.dur<2.5?te%tn.dur:Math.min(tn.dur-.01,te);
      tn.a.setEffectiveWeight(k);
    }
    if(S.sTaunt&&!S.kOut){
      const T=S.sTaunt,te=now-T.t,tn=P.taunts[T.clip];
      if(te>T.dur||S.state==='windup'||!tn)S.sTaunt=null;
      else if(te>0){
        k=ease(clamp(te/.3,0,1))*ease(clamp((T.dur-te)/.3,0,1));
        tn.a.time=tn.dur<2.5?te%tn.dur:Math.min(tn.dur-.01,te);
        tn.a.setEffectiveWeight(k);
      }
    }
    if(S.state==='qte'&&QT.f){
      const Bq=QT.f,st=P.taunts.f_ready||P.taunts.b_stance,o=P.obj;
      let tn=P.taunts[Bq.n]||st,te=(now-Bq.t)*(Bq.rate||1)+(Bq.t0||0),loop=!!Bq.loop;
      if(!loop&&!Bq.hold&&te>tn.dur-.05){
        tn=st;
        loop=true;
      }
      tn.a.time=loop?te%tn.dur:Math.min(Bq.end||tn.dur-.01,Math.max(0,te));
      tn.a.setEffectiveWeight(1);
      k=1;
      if(QT.thr&&QT.thr.on){
        const a=QT.thr.adv||0;
        o.position.set(QT.thr.x+Math.sin(QT.thr.ry)*a,QT.thr.hy||0,QT.thr.z+Math.cos(QT.thr.ry)*a);
        o.rotation.y=QT.thr.ry-(Bq.n==='throw_cap'?THR_YAW:0);
      }
      else{
        o.position.set(QT.fx,0,QT.fz);
        o.rotation.y=QT.fry;
      }
      P.away=true;
      P.offMound=true;
    }
    else if(P.offMound&&!P.away){
      P.offMound=false;
      P.obj.position.y=.25;
    }
    if(S.state==='brawl'&&BRW.p){
      const Bq=BRW.p,st=P.taunts.b_stance;
      let tn=P.taunts[Bq.n]||st,te=Math.max(0,now-Bq.t)*(Bq.rate||1),loop=!!Bq.loop;
      if(!loop&&!Bq.hold&&te>tn.dur-.05){
        tn=st;
        loop=true;
      }
      tn.a.time=loop?te%tn.dur:Math.min(Bq.hold&&Bq.n==='b_liver'?1.45:tn.dur-.01,te);
      tn.a.setEffectiveWeight(1);
      k=1;
    }
    {
      const o=P.obj;
      if(!P.home)P.home={
        x:o.position.x,z:o.position.z,ry:o.rotation.y
      }
      ;
      if(pcWalk()){
        const tn=P.taunts.p_sadwalk,te=now-S.t,dx=-.94,dz=.34,d=.75*te;
        // off the mound toward the third-base dugout, head down, at the pace his feet are moving
        tn.a.time=te%tn.dur;
        tn.a.setEffectiveWeight(1);
        k=1;
        o.position.x=P.home.x+dx*d;
        o.position.z=P.home.z+dz*d;
        o.rotation.y=Math.atan2(dx,dz);
        P.away=true;
      }
      else if(P.away&&S.state!=='qte'){
        P.away=false;
        o.position.x=P.home.x;
        o.position.z=P.home.z;
        o.rotation.y=P.home.ry;
      }
    }
    P.defs.forEach(a=>a.setEffectiveWeight(0));
    const pd=S.state==='pdef';
    if(P.defs.length&&(pd||(flight&&flight.play.type==='hr'&&flight.admire))){
      const tp=trotPit(),key=pd?S.t:tp?'t'+S.t:flight,pc=pd||tp?now-S.t:pitCut(),de=pc>=0?pc:now-flight.t0-1.3;
      // on the cut to him after the 'loser' taunt, his defeat routine starts over so the camera catches all of it // he just gave up a no-doubter: head down on the mound
      if(de>=0){
        if(P.defF!==key){
          P.defF=key;
          P.defA=P.defs[(Math.random()*P.defs.length)|0];
        }
        const kd=pc>=0?1:ease(clamp(de/.4,0,1));
        P.defA.time=Math.min(P.defA.dur-.02,de);
        P.defA.setEffectiveWeight(kd);
        k=Math.max(k,kd);
      }
    }
    // pitching change: the new man throws one warm-up pitch for the camera (wind-up, release with the usual snap, the pop of the mitt)
    const wu=S.state==='pchange'&&S.pcI&&!pcWalk()?now-S.t-(S.pcW||0)-.25:-1;
    if(wu>=1&&S.pcS===0){
      S.pcS=1;
      SND.pitch();
    }
    if(wu>=1.5&&S.pcS===1){
      S.pcS=2;
      SND.mitt(.7);
    }
    P.pact.time=k>.5?0:wu>0?Math.min(P.dur-.01,wu<1?wu*P.tRel:P.tRel+(wu-1)):act?Math.min(P.dur-.01,e<1?e*P.tRel:P.tRel+(e-1)):0;
    P.pact.setEffectiveWeight(1-k);
    P.mixer.update(0);
    return;
  }
  let P;
  if(S.state==='windup'||(S.state==='pitch'&&now-windupT0<1.7)||(S.state==='flight'&&now-windupT0<1.7)){
    const p=(now-windupT0)/1.25;
    if(p<.15)P=POSE.pSet;
    else if(p<.45)P=lerpPose(POSE.pSet,POSE.pKick,ease((p-.15)/.3),tmpPose);
    else if(p<.7)P=lerpPose(POSE.pKick,POSE.pStride,ease((p-.45)/.25),tmpPose);
    else if(p<.8)P=lerpPose(POSE.pStride,POSE.pRelease,(p-.7)/.1,tmpPose);
    else P=lerpPose(POSE.pRelease,POSE.pFollow,ease(clamp((p-.8)/.25,0,1)),tmpPose);
  }
  else P=POSE.pSet;
  applyPose(pitcher,P);
  pitcher.root.position.z=-18.4+P.rz;
}
