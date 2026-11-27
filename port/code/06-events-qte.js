// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── cqSetup  (index.html L1925)
function cqSetup(tr,play,v){
  if(!PD.on||!qteParts())return null;
  if(!(DBG.cq||Math.random()<.45||play.type==='hr'||play.rob))return null;
  /* ROB HIM! is offered EVERY time a homer is low enough for your outfielder to get a glove on: the biggest moment a fielder has is never left to a coin flip */
  const J=(k,val)=>{
    const o=DBG[k];
    DBG[k]=val;
    let r=null;
    try{
      r=judge(tr,{
        spd:1
      }
      );
    }
    catch(e){
    }
    DBG[k]=o;
    return r;
  }
  ;
  let win=null,lose=null,kind='';
  try{
    if(play.type==='out'&&play.dive&&!play.dive.miss){
      const L=J('dive','miss');
      if(L&&L.type!=='out'){
        win=play;
        lose=L;
        kind='DIVE FOR IT!';
      }
    }
    else if(play.type==='out'&&play.rob){
      const L=J('norob',true);
      if(L&&L.type==='hr'){
        win=play;
        lose=L;
        kind='ROB HIM!';
      }
    }
    else if(play.type==='hr'){
      DBG.robH=2.6;
      const W=J('rob',true);
      DBG.robH=0;
      /* (when it is yours to make, he can go higher up the wall for it than he would on his own: one-sixth gravity) */
      if(W&&W.type==='out'&&W.rob){
        win=W;
        lose=play;
        kind='ROB HIM!';
      }
    }
    /* (a homer that only just clears, with an outfielder who can get to the wall: it is yours to bring back) */
    else if(play.type==='out'&&play.label==='LINE OUT'&&play.f&&!play.f.of&&v>=36){
      win=play;
      lose={
        type:'hit',bases:1,endT:play.endT+.35,f:play.f,p:play.p,infield:true,tag:'TOO HOT TO HANDLE'
      }
      ;
      kind='SNAG IT!';
    }
    else if(play.type==='hit'&&!play.grd&&(play.bases||1)<=2){
      const W=J('dive','catch');
      if(W&&W.type==='out'&&W.dive&&!W.dive.miss){
        win=W;
        lose=play;
        kind='DIVE FOR IT!';
      }
    }
    else if(play.type==='foul'&&play.f&&tr.land&&tr.land.z<11){
      const f=play.f,L=tr.land,d=Math.hypot(f.home.x-L.x,f.home.z-L.z),r=f.reach+f.speed*Math.max(0,L.t-f.react);
      if(d>r&&d<=r+8&&L.t>1.4){
        win={
          type:'out',label:'FOUL OUT',endT:L.t,f,p:{
            x:L.x,y:1,z:L.z,t:L.t
          }
          ,air:true
        }
        ;
        lose=play;
        kind='GO GET IT!';
      }
    }
  }
  catch(e){
    return null;
  }
  if(!win||!lose)return null;
  win.cq=kind;
  const t=(win.dive&&win.dive.t)||(win.p&&win.p.t)||win.endT;
  return {
    win,lose,kind,t:Math.max(.35,t-.55),st:0
  }
  ;
}


// ───────── cqStart  (index.html L1933)
function cqStart(f){
  const c=f.cq;
  c.st=1;
  CQ.on=true;
  {
    const e=$('bdg');
    if(e.classList.contains('go')){
      e.classList.remove('go');
      if(bdgCur&&!bdgCur.re){
        bdgCur.re=1;
        bdgCur.old=1;
        bdgQ.unshift(bdgCur);
      }
      bdgCur=null;
    }
    bdgBusy=Math.max(bdgBusy,performance.now()+4500);
  }
  $('pop').className='';
  $('tim').className='';
  /* the showdown has the screen to itself: plates and calls wait until it is over */
  CQ.f=f;
  CQ.t0=now;
  const stop=Math.random()<.6;
  Object.assign(CQ,{
    stop,fill:0,lt:now,lim:stop?3.2:2.6,sx:Math.random()<.5?0:1,sv:rand(1,1.3)
  }
  );
  CQ.sd=CQ.sx?-1:1;
  if(stop){
    const gw=.18,g0=rand(.08,.92-gw);
    CQ.sg=[g0,gw];
    let o0=0;
    for(let i=0;
    i<30;
    i++){
      o0=rand(.04,.95-.05);
      if(o0>g0+gw+.08||o0+.05<g0-.08)break;
    }
    CQ.so=[o0,.05];
  }
  $('qtt').textContent=c.kind;
  const P=v=>(v*100).toFixed(2)+'%';
  $('qtr').innerHTML=stop?'<div id="qsw"><div id="qmw" class="st"><s id="qsg" style="left:'+P(CQ.sg[0])+';width:'+P(CQ.sg[1])+'"></s><s id="qso" style="left:'+P(CQ.so[0])+';width:'+P(CQ.so[1])+'"></s><u id="qsn"></u></div><em id="qsl">STOP IT ON GREEN</em></div>':'<div id="qmw"><em id="qmf"></em><span>'+(MOB?'TAP! TAP! TAP!':'MASH SPACE!')+'</span></div>';
  $('qte').hidden=false;
  $('hud').classList.add('qon','qm');
  buzz([30,30,60]);
  tone('triangle',520,880,.15,.35);
  crowdRise(.7,2.5,true);
}


// ───────── cqEnd  (index.html L1938)
function cqEnd(ok){
  const f=CQ.f,c=f.cq;
  CQ.on=false;
  c.st=2;
  $('hud').classList.remove('qon','qm');
  setTimeout(()=>{
    if(!CQ.on)$('qte').hidden=true;
  }
  ,300);
  if(ok){
    buzz([20,30,60]);
    tone('triangle',660,990,.12,.3);
    timing('MADE THE PLAY!','#39ff6a',3);
  }
  else{
    buzz([40,30,40]);
    tone('sawtooth',150,80,.12,.3);
    const pl=c.lose;
    if(c.win.f)pl.from=c.win.f.fig.root.position.clone();
    pl.tS=now-f.t0;
    f.play=pl;
    timing(pl.type==='hr'?'OVER HIS GLOVE!':pl.type==='foul'?'JUST OUT OF REACH':'GOT BY HIM!','#ff8a2e',3);
    try{
      pop(pl.type==='hr'?'OVER HIS GLOVE!':pl.type==='foul'?'JUST OUT OF REACH':'GOT BY HIM!',pl.type==='hr'?'HOME RUN':pl.type==='foul'?'FOUL BALL':'IT DROPS IN FOR A HIT','hot',true);
      buzz([40,30,40]);
    }
    catch(e){
    }
  }
}


// ───────── cqTick  (index.html L1942)
function cqTick(dt){
  if(CQ.on&&(CQ.f!==flight||!PD.on||S.state!=='flight'||paused)){
    if(!paused)cqOff();
    return;
  }
  /* A SHOWDOWN CAN NEVER OUTLIVE ITS PLAY: left switched on after the ball was dead it swallowed every touch for the rest of the game */
  const f=flight;
  if(!f||!f.cq)return;
  const c=f.cq;
  if(c.st===0&&now-f.t0>=c.t)cqStart(f);
  if(!CQ.on||CQ.f!==f)return;
  f.t0+=dt*.94;
  /* the play hangs in slow motion while you make it */
  const e=now-CQ.t0,left=1-e/CQ.lim;
  $('qtb').style.transform='scaleX('+Math.max(0,left).toFixed(3)+')';
  $('qtb').classList.toggle('low',left<.35);
  if(CQ.stop){
    CQ.sx+=CQ.sd*CQ.sv*dt;
    if(CQ.sx>=1){
      CQ.sx=1;
      CQ.sd=-1;
      CQ.sv*=1.1;
    }
    else if(CQ.sx<=0){
      CQ.sx=0;
      CQ.sd=1;
      CQ.sv*=1.1;
    }
    const n=$('qsn');
    if(n){
      if(!CQ.sw)CQ.sw=n.parentNode.clientWidth||300;
      n.style.transform='translateX('+(CQ.sx*CQ.sw).toFixed(1)+'px)';
    }
  }
  else{
    CQ.fill=Math.max(0,CQ.fill-.12*dt);
    const m=$('qmf');
    if(m)m.style.transform='scaleX('+Math.min(1,CQ.fill).toFixed(3)+')';
  }
  if(left<=0)cqEnd(false);
}


// ───────── cqKey  (index.html L1948)
function cqKey(){
  if(!CQ.on)return;
  if(CQ.stop){
    const x=CQ.sx,ins=z=>x>=z[0]-.015&&x<=z[0]+z[1]+.015,gold=ins(CQ.so),ok=gold||ins(CQ.sg);
    const n=$('qsn');
    if(n)n.className=gold?'au':ok?'ok':'no';
    if(gold&&!S.over)S.juice=Math.min(1,S.juice+.25);
    cqEnd(ok);
    return;
  }
  CQ.fill+=1/13;
  buzz(10);
  tone('triangle',380+520*Math.min(1,CQ.fill),420+560*Math.min(1,CQ.fill),.06,.5);
  const m=$('qmf');
  if(m)m.style.transform='scaleX('+Math.min(1,CQ.fill).toFixed(3)+')';
  if(CQ.fill>=1)cqEnd(true);
}


// ───────── qteParts  (index.html L4278)
function qteParts(){
  if(S.mode)return false;
  /* (practice and the derby are swings only: no sends, steals or plays at the bag) */
  const C=MX.clip,P=MX.pit;
  return !!(C&&P&&MX.on&&C.intros.q_flykick&&C.intros.run&&C.intros.p_dying&&C.intros.b_gut&&C.intros.b_stance&&P.taunts.b_stance&&P.taunts.b_jab&&P.taunts.p_dying);
}


// ───────── qteRisk  (index.html L4286)
function qteRisk(k,pl){
  const from={
    plate:3,adv3:2,stretch3:2,stretch2:1,tag3:2,tag2:1
  }
  [k]||0,R=RUN.list.find(R=>R.active&&Math.round(R.target)===from),sp=clamp((R&&R.spd)||1,.75,1.2);
  const px=pl&&pl.p?pl.p.x:0,pz=pl&&pl.p?pl.p.z:-80,dn=clamp((Math.hypot(px,pz)-45)/60,0,1);
  let D=1.38-.62*dn+({
    stretch3:.16,stretch2:.1,plate:.05,tag2:.22,tag3:.05
  }
  [k]||0);
  if(k==='adv3'||k==='stretch3'||k==='tag3')D+=clamp(-px/60,-1,1)*.14;
  /* left field is the short throw to third */
  return clamp(D/Math.pow(sp,1.3),.55,1.6);
}


// ───────── goDiag  (index.html L4290)
function goDiag(){
  const C=MX.clip,P=MX.pit,miss=[];
  if(!C)miss.push('batter');
  if(!P)miss.push('pitcher');
  if(!MX.on)miss.push('models');
  if(C)['q_flykick','run','p_dying','b_gut','b_stance'].forEach(n=>{
    if(!C.intros[n])miss.push('b:'+n);
  }
  );
  if(P)['b_stance','b_jab','p_dying'].forEach(n=>{
    if(!P.taunts[n])miss.push('p:'+n);
  }
  );
  GD.why=miss.join(', ');
  const e=$('godiag');
  if(e)e.textContent='ADVANCE BUTTON: offered '+GD.off+' of '+GD.hit+' chances · pressed '+GD.tap+(GD.why?' · BLOCKED BY: '+GD.why:'');
}


// ───────── goOffer  (index.html L4292)
function goOffer(k,pl){
  GD.off++;
  S.goK=k;
  try{
    if(flight&&flight.thr&&!flight.thr.from)flight.thr.hold=true;
  }
  catch(e){
  }
  /* THE OUTFIELDER HOLDS THE BALL while you decide: no throw is shown until you send the runner, hold him, or let the offer run out */
  S.goD=qteRisk(k,pl);
  const b=$('gobtn');
  b.firstChild.nodeValue=GO_LABEL[k];
  b.dataset.r=S.goD<.85?'g':S.goD<1.15?'y':'r';
  b.querySelector('small').textContent='';
  {
    const pc=Math.round(clamp(92-(S.goD-.55)*59,25,92)/5)*5;
    b.dataset.r=pc>=70?'g':pc>=45?'y':'r';
    $('goodds').innerHTML='<b>'+pc+'%</b> SAFE · '+(pc>=70?'GOOD ODDS':pc>=45?'TOSS-UP':'LONG SHOT');
  }
  /* the odds under the button: a rough chance of beating the throw, from his speed, how deep the ball went and which bag */
  b.classList.remove('on');
  void b.offsetWidth;
  b.classList.add('on');
  {
    const st=$('gostay');
    st.classList.remove('on');
    void st.offsetWidth;
    st.classList.add('on');
    $('hud').classList.add('goq');
  }
  readyDur=qteSeen?1.7:2.6;
  S.t=now;
  buzz(25);
}


// ───────── stealKind  (index.html L4295)
function stealKind(){
  if(S.duel)return '';
  /* (no stealing in a Showdown: nothing competes with it) */
  if(S.over&&!S.overOn&&!odEver)return '';
  /* (a player who has never used Overdrive is being shown its button: nothing else asks for a tap then) */
  if(PD.on||(S.state!=='ready'&&!(S.state==='windup'&&!released))||S.odHolding||S.outs>=2||S.stealBi===S.bi||paused||tutHold||infoHold)return '';
  if(S.state==='ready'&&now-S.t<.1)return '';
  /* the call can be made right through the wind-up, until the ball leaves his hand */
  let ok=false;
  try{
    ok=qteParts();
  }
  catch(e){
  }
  if(!ok)return '';
  return S.bases[1]&&!S.bases[2]?'steal3':S.bases[0]&&!S.bases[1]?'steal2':'';
}


// ───────── stealGo  (index.html L4296)
function stealGo(){
  if(tutHold||infoHold||!$('tut').hidden||!$('podx').hidden)return;
  if(S.stealArm){
    S.stealArm='';
    buzz(10);
    stealUI(true);
    return;
  }
  const k=stealKind();
  if(!k)return;
  S.stealArm=k;
  S.stealArmBi=S.bi;
  buzz([20,30,60]);
  tone('triangle',660,990,.12,.3);
  stealUI(true);
}


// ───────── stealClear  (index.html L4298)
function stealClear(){
  try{
    const b=$('stealbtn');
    if(!b||!b._chk||getComputedStyle(b).display==='none')return;
    const r=b.getBoundingClientRect(),hit=id=>{
      const e=$(id);
      if(!e)return false;
      const q=e.getBoundingClientRect();
      return q.width>2&&!(r.right<q.left-4||r.left>q.right+4||r.bottom<q.top-4||r.top>q.bottom+4);
    }
    ;
    if(hit('mutebtn')||hit('pausebtn')){
      const h=$('hud').getBoundingClientRect(),j=$('card').getBoundingClientRect();
      b.style.bottom=Math.max(6,h.bottom-j.bottom-9-r.height)+'px';
    }
  }
  catch(e){
  }
}


// ───────── stealUI  (index.html L4299)
function stealUI(force){
  try{
    requestAnimationFrame(stealClear);
  }
  catch(e){
  }
  const b=$('stealbtn');
  if(!b)return;
  if(S.stealArm&&(S.stealArmBi!==S.bi)){
    S.stealArm='';
  }
  /* (a call never carries over to another hitter) */
  const live=S.state==='ready'||S.state==='windup'||S.state==='pitch';
  const k=S.stealArm&&live?S.stealArm:stealKind(),on=!!k,key=(on?k:'')+(S.stealArm?'!':'')+(MX.lefty?'L':'R')+(S.bi|0);
  if(!force&&key===b._key)return;
  b._key=key;
  {
    let j=null;
    try{
      j=$('card').getBoundingClientRect();
    }
    catch(e){
    }
    const h=$('hud').getBoundingClientRect();
    if(on&&j&&j.width>4&&j.top-h.top>120){
      const R=h.right-j.right<j.left-h.left;
      b.style.left=R?'auto':Math.max(6,j.left-h.left)+'px';
      b.style.right=R?Math.max(6,h.right-j.right)+'px':'auto';
      b.style.bottom=(h.bottom-j.top+9)+'px';
      b._chk=true;
    }
    else{
      b.style.left=b.style.right=b.style.bottom='';
      b._chk=false;
    }
  }
  /* THE STEAL BUTTON SITS ON TOP OF THE BATTER'S PLACARD, on whichever side that is: clear of the hitter, the plate and the swing buttons */
  b.classList.toggle('on',on);
  b.classList.toggle('arm',!!S.stealArm);
  if(on)b.firstChild.nodeValue=S.stealArm?'GOING!':k==='steal2'?'STEAL 2ND?':'STEAL 3RD?';
}


// ───────── stealRun  (index.html L4301)
function stealRun(){
  const k=S.stealArm;
  S.stealArm='';
  if(!k||S.outs>=3)return false;
  let ok=false;
  try{
    ok=qteParts();
  }
  catch(e){
  }
  if(!ok)return false;
  S.stealBi=S.bi;
  const from=k==='steal2'?1:2,R=RUN.list.find(R=>R.active&&Math.round(R.target)===from),sp=clamp((R&&R.spd)||1,.75,1.2);
  S.goD=clamp((k==='steal2'?1.1:1.3)/Math.pow(sp,1.5),.6,1.6);
  const B=BASES[k==='steal2'?2:3];
  S.stealCut={
    t:now+(R?.8:.3),k,bx:B[0],bz:B[1],R,from,r0:now+.12
  }
  ;
  if(R){
    R.target=from+.95;
    R.jog=false;
  }
  /* FIRST THE RUNNER: a beat of him breaking for the bag, THEN the catcher coming up to throw, then the play at the base */
  S.state='result';
  S.t=now;
  S.next=null;
  readyDur=9;
  $('pop').className='';
  pop("HE'S GOING!",'','hot');
  buzz([20,30,60]);
  crowdRise(.7,2,true);
  hud();
  return true;
}


// ───────── stealTick  (index.html L4303)
function stealTick(){
  const C=S.stealCut;
  if(!C)return;
  const e=now-C.t;
  if(e<0)return;
  if(S.state!=='result'){
    S.stealCut=null;
    return;
  }
  if(C.R)C.R.fig.root.visible=false;
  /* once the picture is on the catcher the runner is out of it: the next time he is seen is the play at the bag */
  const u=clamp((e-.5)/.6,0,1);
  if(e>.5){
    ball.visible=true;
    ball.scale.setScalar(1.05);
    ball.position.set(lerp(0,C.bx,u),1.7+Math.sin(u*PI)*1.6,lerp(1.2,C.bz,u));
  }
  if(e>=1.12){
    S.stealCut=null;
    if(C.R){
      C.R.s=C.from;
      C.R.target=C.from;
    }
    ball.visible=false;
    ball.scale.setScalar(1);
    qteStart(C.k,true);
  }
}


// ───────── goHide  (index.html L4306)
function goHide(){
  if(S.goK){
    S.goK=null;
  }
  $('gobtn').classList.remove('on');
  $('gostay').classList.remove('on');
  $('hud').classList.remove('goq');
}


// ───────── goStay  (index.html L4307)
function goStay(){
  if(!S.goK||S.state!=='result')return;
  goHide();
  if(LOCKFX.wait&&!LOCKFX.hr){
    LOCKFX.t0=now;
    S.t=now;
    readyDur=2.3;
    buzz(15);
    return;
  }
  /* HE JUST GOT LOCKED IN: holding the runner does not skip it. The fire goes up on his base now, and then the game moves on. */
  {
    const hd=flight&&flight.thr&&flight.thr.hold&&!flight.thr.from;
    S.t=hd?now-readyDur+1.2:Math.min(S.t,now-readyDur+.35);
  }
  buzz(15);
  tone('triangle',520,390,.1,.25);
}


// ───────── goTap  (index.html L4308)
function goTap(){
  if(!S.goK||S.state!=='result')return;
  GD.tap++;
  goDiag();
  const k=S.goK;
  goHide();
  S.next=()=>qteStart(k,true);
  S.t=now-readyDur+.2;
  buzz([20,30,60]);
  tone('triangle',660,990,.12,.3);
}


// ───────── qteStart  (index.html L4309)
function qteStart(kind,noPA){
  QT.noPA=!!noPA;
  QT.flip=kind==='beat1'&&!!S.beatFlip;
  S.beatFlip=false;
  goHide();
  try{
    if(PD.on){
      $('pd').style.visibility='hidden';
      $('pdring').style.display='none';
      PD.ringT=0;
    }
  }
  catch(e){
  }
  /* (none of the pitching controls show during a play at the bag) */
  {
    const e=$('bdg');
    if(e.classList.contains('go')){
      e.classList.remove('go');
      if(bdgCur&&!bdgCur.re){
        bdgCur.re=1;
        bdgCur.old=1;
        bdgQ.unshift(bdgCur);
      }
      bdgCur=null;
    }
  }
  /* a plate that is up when the event starts is taken down and comes back afterwards */
  const D=QT.D=kind==='dp'?1:clamp(S.goD||1,.55,1.6);
  S.goD=0;
  const M=QTE_MOVES[kind];
  QT.nm=M.def&&M.name==='THROW HIM OUT!'?(r=>kind!=='dsteal2'&&r<.4?'HOSE HIM!':kind!=='dsteal2'&&r<.7?'GUN HIM DOWN!':'')(Math.random()):'';
  /* (a throw in from the outfield is as often HOSE HIM!; a steal is the catcher's throw, so never that) */
  if(kind==='dmake'&&!S.dmPit)QT.nm='THROW HIM OUT!';
  /* a grounder to an infielder cuts to the runner: THROW HIM OUT! MAKE THE PLAY! is kept for the comebacker, when the ball is the pitcher's own */
  /* the plays at a bag are called either way, turn and turn about */
  const solo=!!(M.solo&&S.qteAt),Bp=solo?[S.qteAt.x,S.qteAt.z]:M.base?[BASES[M.base][0],BASES[M.base][1]]:[0,0],u=solo?(h=>[-S.qteAt.x/h,-S.qteAt.z/h])(Math.hypot(S.qteAt.x,S.qteAt.z)||1):M.u;
  /* (MAKE THE CATCH is staged where the fielder is standing, facing the plate) */
  S.state='qte';
  S.t=now;
  S.qteN=(S.qteN||0)+1;
  QT.headT=/^steal/.test(kind)||M.solo?.02:kind==='dsteal2'?1.5:1.15;
  /* your own steal has already shown him breaking: straight to the play at the bag. A steal AGAINST you while you pitch has shown nothing yet, so it gets the full heads-up: HE'S STEALING! and the runner coming, before THROW HIM OUT! */
  Object.assign(QT,{
    ph:'heads',tp:now,kind,M,code:D<.85?M.code.slice(0,-2):M.code
    /* a good bet is a shorter code */
    ,i:0,mash:!!M.mash||(!M.arrows&&(DBG.mash||(qteSeen&&Math.random()<.35))),fill:0,lt:0,lim:(.38*(D<.85?M.code.length-2:M.code.length)+1.0)/Math.pow(D,.8)+(qteSeen?0:1.2),
    /* the clock: enough to punch the whole code in at a brisk pace with room for one slip, and no more */
    ok:false,bx:Bp[0],bz:Bp[1],ux:u[0],uz:u[1],ball:null,blow:0,fk:0
  }
  );
  QT.fx=Bp[0]+u[0]*.35;
  QT.fz=Bp[1]+u[1]*.35;
  QT.fry=kind==='dmake'?Math.atan2(-6-Bp[0],-27-Bp[1]):Math.atan2(u[0],u[1]);
  /* (MAKE THE PLAY: the first baseman is turned to the infield, where the throw is coming from, not to the runner) */
  QT.rry=Math.atan2(-u[0],-u[1]);
  QT.rx=Bp[0]+u[0]*17;
  QT.rz=Bp[1]+u[1]*17;
  QT.mx=Bp[0]+u[0]*1.5;
  QT.mz=Bp[1]+u[1]*1.5;
  {
    let nx=u[1],nz=-u[0];
    if(nx*(0-Bp[0])+nz*(-19.4-Bp[1])<0){
      nx=-nx;
      nz=-nz;
    }
    QT.nx=nx;
    QT.nz=nz;
  }
  // the side-on camera stands on the infield side of the line
  /* THROW HIM OUT is about the THROW: after the runner is shown coming, the picture goes BEHIND the man with the ball, looking over his shoulder at first base, and the inputs are made there. Then he throws, and only then does it cut to the bag for the catch and the call. (The model used for the close-ups plays the thrower first and the first baseman after the cut; the real first baseman stands at the bag in the background until then.) */
  QT.btr=null;
  QT.thr=null;
  try{
    const inf=kind==='dmake',ofT=M.def&&!M.solo&&!M.soft&&kind!=='dsteal2';
    /* (every throw you make on defense: the grounder to first, and the throws in from the outfield to second, third and the plate. Not the catcher's throw on a steal.) */
    if((inf||ofT)&&MX.pit&&MX.pit.taunts.throw_cap&&!window.__noThr){
      let tx=inf?-6:Bp[0]*1.1+20*(Bp[0]>=0?1:-1),tz=inf?-27:-78,have=false;
      if(S.dmAt&&isFinite(S.dmAt.x)){
        tx=S.dmAt.x;
        tz=S.dmAt.z;
        have=true;
      }
      const dB=Math.hypot(tx-Bp[0],tz-Bp[1]);
      if(inf&&(dB<10||dB>46||tz>-6)){
        tx=-6;
        tz=-27;
      }
      /* (fielded right by the bag, or somewhere odd: the shot is staged from shortstop) */
      if(!inf&&(dB<18||dB>140||tz>-30)){
        tx=Bp[0]*.4+22;
        tz=-82;
      }
      /* (an outfield throw with no sensible spot on record: staged from medium right-centre) */
      if(!inf){
        const r0=Math.hypot(tx,tz)||1,mxr=fenceR(Math.atan2(tx,-tz))-13;
        if(r0>mxr){
          tx*=mxr/r0;
          tz*=mxr/r0;
        }
      }
      /* (never right against the fence: the camera stands behind him and needs the room) */
      QT.thr={
        x:tx,z:tz,ry:Math.atan2(Bp[0]-tx,Bp[1]-tz),on:false,done:false,of:!inf
      }
      ;
      if(inf)QT.fry=Math.atan2(tx-Bp[0],tz-Bp[1]);
    }
  }
  catch(e){
    QT.thr=null;
  }
  QT.gold=false;
  QT.stop=!DBG.mash&&!M.arrows&&(DBG.stop||(!QT.mash&&qteSeen&&Math.random()<.42));
  if(QT.stop)QT.mash=false;
  /* the third kind: one press, on a moving needle */
  QT.pb=MX.pitCur;
  if(!(kind==='dcatch'&&S.dcPit))pitcherModel(0);
  /* the man making the play at the bag is a fielder, so he wears the fielders' body, whoever is pitching */
  QT.b={
    n:'run',t:now,loop:true
  }
  ;
  QT.f={
    n:'f_ready',t:now,loop:true
  }
  /* AT THE BAG HE IS A FIELDER WAITING FOR THE THROW: down in the ready position, glove out, for every play at a base. The boxer's stance is gone from the field. */
  /* (a ball he has to field: he waits in a fielder's ready crouch, not the fighting stance used for a play at the bag) */
  ;
  // the men who are really standing there step out of the picture for the close-up; they are put back afterwards
  QT.hid=[];
  RUN.list.forEach(R=>{
    if(R.fig.root.visible){
      QT.hid.push(R.fig.root);
      R.fig.root.visible=false;
    }
  }
  );
  fielders.forEach(f=>{
    const r=f.fig.root;
    if(r.visible&&((!f.isP&&Math.hypot(r.position.x-Bp[0],r.position.z-Bp[1])<9)||(M.soft&&!f.of))){
      QT.hid.push(r);
      r.visible=false;
    }
  }
  );
  if(QT.thr){
    fielders.forEach(f=>{
      const r=f.fig.root;
      if(r.visible&&Math.hypot(r.position.x-QT.thr.x,r.position.z-QT.thr.z)<16&&!QT.hid.includes(r)){
        QT.hid.push(r);
        r.visible=false;
      }
    }
    );
  }
  /* (the real fielder standing where the throw is staged from steps out: the close-up model is him) */
  QT.b1=null;
  if(QT.thr){
    let bd=1e9;
    fielders.forEach(f=>{
      if(f.isP||f.of)return;
      const r=f.fig.root,d=Math.hypot(f.home.x-Bp[0],f.home.z-Bp[1]);
      if(d<bd&&QT.hid.includes(r)){
        bd=d;
        QT.b1=r;
      }
    }
    );
  }
  /* (the real first baseman: he is put back in the picture for the shot from behind the thrower) */
  ball.visible=false;
  ballShadow.visible=false;
  pop(kind==='dmake'&&!S.dmPit?'THROW HIM OUT!':M.call,'','');
  buzz([30,30,60]);
  crowdRise(.8,3,true);
  hud();
}


// ───────── qteShow  (index.html L4323)
function qteShow(){
  if(!MOB&&!QT.fk){
    QT.fk=1;
    grabKeys();
  }
  const M=QT.M,e=$('qte');
  $('qtt').textContent=QT.nm||M.name;
  if(QT.stop){
    if(!$('qsn')){
      const P=v=>(v*100).toFixed(2)+'%';
      $('qtr').innerHTML='<div id="qsw"><div id="qmw" class="st"><s id="qsg" style="left:'+P(QT.sg[0])+';width:'+P(QT.sg[1])+'"></s><s id="qso" style="left:'+P(QT.so[0])+';width:'+P(QT.so[1])+'"></s><u id="qsn"></u></div><em id="qsl"></em></div>';
    }
    QT.gp=clamp(.74-(QT.D-1)*.42,.4,.92);
    {
      const l=$('qsl');
      if(l)l.textContent='GOLD = SAFE +2 JUICE · GREEN = SAFE';
    }
    $('hud').classList.add('qm');
    e.hidden=false;
    $('hud').classList.add('qon');
    return;
  }
  if(QT.mash){
    if(!$('qmf')){
      $('qtr').innerHTML='<div id="qmw"><em id="qmf"></em><span>'+(MOB?'TAP! TAP! TAP!':'MASH SPACE!')+'</span></div>';
    }
    $('hud').classList.add('qm');
    $('qmf').style.transform='scaleX('+Math.min(1,QT.fill).toFixed(3)+')';
    e.hidden=false;
    $('hud').classList.add('qon');
    return;
  }
  // the other kind: no code, just hammer the arrows until the bar is full
  {
    const r=$('qtr');
    if(r.children.length!==QT.code.length||r.firstChild.tagName!=='I')r.innerHTML=QT.code.map(c=>`<i data-d="${c}">${{U:'⬆️',D:'⬇️',L:'⬅️',R:'➡️'}[c]}</i>`).join('');
    for(let i=0;
    i<QT.code.length;
    i++){
      const c=i<QT.i?'ok':i===QT.i?'cur':'';
      if(r.children[i].className!==c)r.children[i].className=c;
    }
  }
  e.hidden=false;
  $('hud').classList.add('qon');
}


// ───────── qteKey  (index.html L4329)
function qteKey(d){
  if(CQ.on&&CQ.f===flight&&S.state==='flight'){
    cqKey();
    return;
  }
  if(S.state!=='qte'||QT.ph!=='input')return;
  {
    const b=QPB[d]||(QPB[d]=document.querySelector('#qpad [data-d='+d+']')),good=QT.mash||d===QT.code[QT.i];
    if(b){
      b.className=good?'hit':'miss';
      clearTimeout(b._t);
      b._t=setTimeout(()=>{
        b.className='';
      }
      ,150);
    }
  }
  if(QT.stop){
    // JUDGED WHERE YOU SAW IT: by the time a tap arrives the needle has moved on (the screen is a frame or two behind, and a finger takes time to land). The press is scored against where the needle was that long ago, and the needle is put back there so the picture agrees.
    const H=QT.hist||[],tp=(inT&&performance.now()-inT<120?inT:performance.now())-17;
    /* the browser stamps the press with the moment the finger or key actually went down: the needle is put back to exactly where it was drawn then (one frame of display earlier), not to a guess */
    let x=QT.sx;
    if(H.length){
      let a=H[0];
      for(const h of H){
        if(h[0]<=tp)a=h;
        else break;
      }
      const b=H[H.indexOf(a)+1];
      x=b&&b[0]>a[0]?a[1]+(b[1]-a[1])*clamp((tp-a[0])/(b[0]-a[0]),0,1):a[1];
    }
    QT.sx=x;
    {
      const n0=$('qsn');
      if(n0&&QT.sw)n0.style.transform='translateX('+(x*QT.sw).toFixed(1)+'px)';
    }
    const ins=z=>x>=z[0]-.012&&x<=z[0]+z[1]+.012;
    /* and a hair of grace at the edges */
    QT.gold=ins(QT.so);
    const grn=ins(QT.sg),ok=QT.gold||grn;
    /* NO DICE: stop it on green and he is safe, every time. A long-shot send is harder because its green band is narrower, not because a good stop can still be called out. */
    /* THE SMALL MARK IS THE SURE THING: land on gold and he is safe, every time. The wide green band only gets him a chance (better on an easy send, worse on a long shot): close, but the throw can still beat him. */
    buzz(ok?[20,30,60]:[40,30,40]);
    tone(ok?'triangle':'sawtooth',QT.gold?990:ok?660:150,QT.gold?1480:ok?880:80,.12,.3);
    const n=$('qsn');
    if(n)n.className=QT.gold?'au':ok?'ok':'no';
    qteDone(ok);
    return;
  }
  if(QT.mash){
    QT.fill+=1/(15*Math.pow(QT.D||1,.7));
    buzz(10);
    tone('triangle',380+520*Math.min(1,QT.fill),420+560*Math.min(1,QT.fill),.06,.5);
    qteShow();
    if(QT.fill>=1)qteDone(true);
    return;
  }
  if(d===QT.code[QT.i]){
    QT.i++;
    buzz(15);
    tone('triangle',520+110*QT.i,700+110*QT.i,.09,.6);
    tone('sine',1040+220*QT.i,1400+220*QT.i,.12,.35);
    /* a clear ding, a step higher with every arrow you get right */
    if(QT.i>=QT.code.length){
      qteShow();
      qteDone(true);
      return;
    }
  }
  else{
    QT.t1-=.3;
    buzz([30,30,30]);
    tone('sawtooth',160,90,.12,.3);
    const r=$('qtr');
    r.classList.remove('bad');
    requestAnimationFrame(()=>r.classList.add('bad'));
  }
  // a wrong arrow costs a third of a second off the clock; your progress stays
  qteShow();
}


// ───────── qteDone  (index.html L4340)
function qteDone(ok){
  if(QT.thr&&QT.thr.on&&!QT.thr.done){
    QT.thr.done=true;
    QT.thr.pend=ok;
    QT.ph='throw';
    QT.tt=now;
    QT.f={
      n:'throw_cap',t:now,hold:true,rate:1.25,t0:.3
    }
    ;
    QT.thr.hop=1;
    $('hud').classList.remove('qon','qm');
    setTimeout(()=>{
      $('qte').hidden=true;
    }
    ,120);
    try{
      buzz(ok?[20,30,60]:[40,30,40]);
    }
    catch(e){
    }
    return;
  }
  /* (the inputs are in: he throws. The catch and the call follow) */
  if(QT.thr){
    QT.thr.on=false;
    if(QT.thr.of)QT.f={
      n:'f_ready',t:now,loop:true
    }
    ;
    try{
      if(QT.b1)QT.b1.visible=false;
    }
    catch(e){
    }
  }
  QT.ph='out';
  QT.ok=ok;
  QT.rv=QT.M&&QT.M.def?!ok:ok;
  /* rv: the RUNNER wins the collision. When the player is the fielder, winning means the runner does not. */
  QT.t1=now;
  QT.hit=false;
  qteSeen=true;
  try{
    localStorage.setItem('mm_qte','1');
  }
  catch(e){
  }
  $('hud').classList.remove('qon','qm');
  setTimeout(()=>{
    $('qte').hidden=true;
  }
  ,ok?350:120);
  if(QT.M&&QT.M.soft){
    QT.b={
      n:'run',t:now,loop:true
    }
    ;
    QT.f=QT.M.solo&&ok&&MX.pit&&MX.pit.taunts.f_jumpcatch?{
      n:'f_jumpcatch',t:now,hold:true,t0:.9,rate:1.4
    }
    /* MAKE THE CATCH, MADE: he goes up for it. A leaping snag, timed so the glove is at the top of the jump as the liner gets there; the ball sticks in the pocket and he comes down with it. */
    :QT.M.solo?QT.f
    /* (missed it: he stays in his ready position until it hits him, then goes down. The catcher's crouch is never shown here.) */
    :!(MX.pit&&MX.pit.taunts.f_stretch)?{
      n:'f_ready',t:now,loop:true
    }
    :{
      n:'f_stretch',t:now,hold:true,t0:.8,rate:1.75
    }
    ;
    /* THE MAN AT THE BAG STRETCHES FOR THE THROW, safe or out: a step toward it off the bag foot, the glove out, and he sticks it (a captured first baseman's stretch, started a beat in and played quick so the glove meets the ball). A liner he has to catch himself keeps the ordinary catch. */
    if(ok)tone('triangle',660,990,.12,.3);
    else tone('sawtooth',140,70,.25,.35);
  }
  /* a race to the bag: no contact, he just runs through it */
  else if(QT.rv&&(QT.kind==='plate'||QT.kind==='dplate'||QT.kind==='dtag3')&&MX.clip.intros.q_takeout&&(DBG.tko||(QT.lastTk!==true&&Math.random()<.55))){
    QT.lastTk=true;
    QT.b={
      n:'q_takeout',t:now-.73,rot:-PI/2,hold:true
    }
    ;
    SND.zap();
    buzz([30,30,80]);
  }
  /* AT THE PLATE he can just run the catcher over: lowers the shoulder and goes through him */
  else if(QT.rv){
    QT.lastTk=false;
    const sl=MX.clip.intros.q_slide&&(DBG.slide||Math.random()<.6);
    QT.b={
      n:sl?'q_slide':'q_flykick',t:now
    }
    ;
    SND.zap();
    buzz([20,30,60]);
    if(sl)noise(.5,'bandpass',900,300,.35,.7,.15);
  }
  /* more often than not he goes in feet first, cleats up; otherwise the flying kick. Either way the fielder is sent flying */
  else{
    QT.b={
      n:'run',t:now,loop:true
    }
    ;
    QT.f=MX.pit&&MX.pit.taunts.f_stretch?{
      n:'f_stretch',t:now,hold:true,t0:.8,rate:1.75
    }
    :{
      n:'b_jab',t:now+.12
    }
    ;
    /* THE OUT AT THE BAG IS A BASEBALL PLAY: he reaches for the throw, takes it in the glove and has the tag down. (It used to be a boxer's jab.) */
    if(QT.M&&QT.M.def){
      SND.zap();
      buzz([20,30,60]);
    }
    else tone('sawtooth',140,70,.25,.35);
  }
}


// ───────── qteTick  (index.html L4345)
function qteTick(){
  const Q=QT,d0=9.5,d1=2.6,pe=now-Q.tp;
  if(Q.thr&&Q.thr.on){
    const T2=Q.thr;
    if(Q.ph==='throw'){
      const H=0,e=now-Q.tt,rel=H+(1.0-.3)/1.25,hu=H?clamp(e/H,0,1):1;
      T2.adv=(H?HOP_D*hu*(2-hu):0)+.5*clamp((e-H)/.4,0,1);
      T2.hy=H?Math.sin(hu*PI)*.3:0;
      if(e>=H&&!T2.hop){
        T2.hop=1;
        QT.f={
          n:'throw_cap',t:Q.tt+H,hold:true,rate:1.25,t0:.3
        }
        ;
        try{
          SND.step&&SND.step();
        }
        catch(x){
        }
      }
      if(e<rel){
        ball.visible=false;
      }
      else{
        if(!T2.h0){
          T2.h0={
            x:T2.x+Math.sin(T2.ry)*(T2.adv+.6),y:1.75,z:T2.z+Math.cos(T2.ry)*(T2.adv+.6)
          }
          ;
          try{
            MX.pit.obj.updateMatrixWorld(true);
            MX.pit.hand.getWorldPosition(_a);
            if(Math.hypot(_a.x-T2.x,_a.z-T2.z)<6&&_a.y>.6)T2.h0={
              x:_a.x,y:_a.y,z:_a.z
            }
            ;
          }
          catch(x){
          }
        }
        const u=clamp((e-rel)/.5,0,1),ax=T2.h0.x,az=T2.h0.z;
        ball.visible=true;
        ball.scale.setScalar(1.05);
        ball.position.set(lerp(ax,Q.fx,u),lerp(T2.h0.y,1.5,u)+Math.sin(u*PI)*.22,lerp(az,Q.fz,u));
        try{
          trail(T2,T2.pend?[1,.6,.15]:[1,1,1],false,!!T2.pend);
        }
        catch(x){
        }
        if(!T2.snd){
          T2.snd=1;
          try{
            SND.whoosh();
          }
          catch(x){
          }
        }
      }
      if(e>=rel+.34){
        qteDone(T2.pend);
      }
      /* (the ball is a third of the way there: cut to the bag) */
    }
    else if(Q.ph==='run'||Q.ph==='input'){
      ball.visible=false;
      /* (it is in his hand) */
      /* THE INFIELDER'S LEAD-IN: seen from behind him, he fields the grounder, takes two shuffles toward the bag with the arm coming back, and the picture holds there, cocked, for the inputs. Then he lets it go. */
      if(Q.ph==='run'){
        const fT=.7,v=clamp((pe-fT)/Math.max(.2,Q.runT-fT),0,1);
        T2.adv=HOP_D*(v-1)*(T2.of?1.3:1);
        T2.hy=T2.of?Math.sin(clamp(v*1.25,0,1)*PI)*.34:Math.abs(Math.sin(v*2*PI))*.15;
        /* (the outfielder: he comes up with it and takes one long crow hop toward the base, arm back, and the picture holds on him cocked for the inputs. The infielder: two quick shuffles.) */
        if(pe<fT){
          if(!T2.fl){
            T2.fl=1;
            const bh=MX.pit&&MX.pit.taunts.f_barehand;
            QT.f={
              n:'f_ready',t:now,loop:true
            }
            ;
            void bh;
            /* (down in the fielder's ready position for the ball: never the catcher's squat) */
          }
          const r=clamp(pe/.42,0,1);
          if(r<1){
            const d=7*(1-r),h=Math.hypot(T2.x,T2.z)||1;
            ball.visible=true;
            ball.scale.setScalar(1.05);
            ball.position.set(T2.x-Math.sin(T2.ry)*HOP_D-T2.x/h*d,.12+Math.abs(Math.sin(r*9))*.12*(1-r),T2.z-Math.cos(T2.ry)*HOP_D-T2.z/h*d);
          }
        }
        else if(!T2.sh){
          T2.sh=1;
          QT.f={
            n:'throw_cap',t:now,hold:true,rate:.3/Math.max(.2,Q.runT-fT),t0:0,end:.3
          }
          ;
        }
      }
      else if(Q.ph==='input'){
        T2.adv=0;
        T2.hy=0;
      }
    }
  }
  if(!(Q.thr&&Q.thr.on)&&(Q.ph==='run'||Q.ph==='input'||(Q.ph==='out'&&!Q.hit))){
    const k=Q.ph==='run'?clamp(pe/Q.runT,0,1)*.84:Q.ph==='input'?.84:Math.min(1,.84+.16*(now-Q.t1)/(Q.M.soft?((Q.M.def?!Q.ok:Q.ok)?.56:.4):.4))
    /* ("ok" means SAFE when you are the runner and OUT when you are the defense: the ball is early whenever the call is out) */
    ,
    /* THE PICTURE MATCHES THE CALL at first base: when he is out the throw is in the glove a clear beat before his foot comes down, and when he is safe it is still in the air as he crosses the bag */
    gx=Q.fx+Q.nx*.25,gz=Q.fz+Q.nz*.25;
    // the throw is on its way the whole time
    ball.visible=!(Q.M.solo&&Q.ph!=='out');
    ball.scale.setScalar(1.05);
    /* MAKE THE CATCH: no ball hanging in the air while the inputs are made. It comes in only once they are in: into the glove at the top of his leap, or off him. */
    const sx=Q.M.solo?gx+Q.ux*15:Q.M.soft?gx+Q.nx*(Q.flip?4.2:12):gx-Q.ux*11+Q.nx*1.5,sz=Q.M.solo?gz+Q.uz*15:Q.M.soft?gz+Q.nz*(Q.flip?4.2:12):gz-Q.uz*11+Q.nz*1.5;
    /* (a line drive comes straight at him from the plate) */
    /* (beating out a grounder: the throw comes across the infield) */
    {
      const st=Q.f&&(Q.f.n==='f_stretch'||Q.f.n==='f_jumpcatch');
      let ex=st?Q.fx+Math.sin(Q.fry)*1.12:gx,ez=st?Q.fz+Math.cos(Q.fry)*1.12:gz,ey=st?1.5:1.25;
      /* THE BALL GOES INTO THE MITT: its path ends at the fielder's actual glove hand, wherever the stretch has put it that instant, and once it is there it stays in the pocket and moves with the glove. */
      if(st&&MX.pit&&MX.pit.obj){
        try{
          if(!MX.pit._gl){
            MX.pit.obj.traverse(o=>{
              if(o.isBone&&/LeftHand$/.test(o.name))MX.pit._gl=o;
              if(o.isBone&&/LeftHandMiddle1$/.test(o.name))MX.pit._gm=o;
            }
            );
          }
          const G=MX.pit._gl;
          if(G){
            G.getWorldPosition(_a);
            if(MX.pit._gm){
              MX.pit._gm.getWorldPosition(_b);
              _a.lerp(_b,.6);
            }
            ex=_a.x;
            ey=_a.y;
            ez=_a.z;
          }
        }
        catch(e){
        }
      }
      /* (the throw ends in his glove, out in front of the bag where the stretch puts it, not at the bag behind him) */
      {
        const k2=Q.M.solo&&Q.ph==='out'?lerp(.25,1,clamp((now-Q.t1)/.42,0,1)):k,kk=Q.M.solo&&Q.ph==='out'?k2:k*k*(3-2*k);
        ball.position.set(lerp(sx,ex,kk),lerp(Q.flip?1.0:2.7,ey,kk)+Math.sin(k*PI)*(Q.flip?.9:.35)*(1-k),lerp(sz,ez,kk));
        if(st&&k>=.98)ball.scale.setScalar(1.05);
        else if(ball.visible&&!Q.M.solo){
          const h=!!(Q.M.def&&Q.ph==='out'&&Q.ok);
          try{
            trail(Q.btr||(Q.btr={
            }
            ),h?[1,.6,.15]:[1,1,1],false,h);
          }
          catch(x){
          }
        }
      }
    }
  }
  if(Q.ph==='out'&&Q.hit&&Q.f&&(Q.f.n==='f_stretch'||Q.f.n==='f_jumpcatch')&&MX.pit&&MX.pit._gl&&ball.visible){
    try{
      MX.pit._gl.getWorldPosition(_a);
      if(MX.pit._gm){
        MX.pit._gm.getWorldPosition(_b);
        _a.lerp(_b,.6);
      }
      ball.position.copy(_a);
      ball.scale.setScalar(1.05);
    }
    catch(e){
    }
  }
  /* (caught: it rides in the glove for the rest of the play) */
  if(Q.ph==='heads'){
    const k=clamp(pe/Q.headT,0,1),d=lerp(17,d0,k);
    Q.rx=Q.bx+Q.ux*d;
    Q.rz=Q.bz+Q.uz*d;
    if(k>=1){
      Q.ph='run';
      Q.tp=now;
      Q.b={
        n:'run',t:now,loop:true,rate:.5
      }
      ;
      $('pop').className='';
      if(Q.thr){
        Q.thr.on=true;
        try{
          if(Q.b1)Q.b1.visible=true;
        }
        catch(e){
        }
      }
    }
  }
  // the heads-up: he is going, seen from in front
  else if(Q.ph==='run'){
    const k=clamp(pe/Q.runT,0,1),d=lerp(d0,d1,k);
    Q.rx=Q.bx+Q.ux*d;
    Q.rz=Q.bz+Q.uz*d;
    if(k>=1){
      Q.ph='input';
      Q.t1=now;
      if(Q.stop){
        // STOP THE NEEDLE. Green is safe and its width is the runner's speed; the thin gold strip, set well away from it, is the gamble: safe AND two bars of Juice, with red on both sides of it.
        const D=Q.D||1,gw=clamp(clamp(.2/D,.11,.33)*clamp(.74-(D-1)*.42,.4,.92)/.74,.06,.33),g0=rand(.06,.94-gw),ow=.055;
        let o0=0;
        for(let i=0;
        i<30;
        i++){
          o0=rand(.03,.97-ow);
          if(o0>g0+gw+.1||o0+ow<g0-.1)break;
        }
        Object.assign(Q,{
          lim:3.6+(qteSeen?0:1.2),sg:[g0,gw],so:[o0,ow],sx:Math.random()<.5?0:1,sv:rand(.95,1.25)*Math.sqrt(D),lt:now,hist:[],sw:0
        }
        );
        Q.sd=Q.sx?-1:1;
        $('qtr').innerHTML='';
      }
      if(Q.mash){
        Q.lim=3.1+(qteSeen?0:1.2);
        Q.fill=0;
        Q.lt=now;
        $('qtr').innerHTML='';
      }
      Q.b={
        n:'run',t:now,freeze:((now-Q.b.t)*.5)%.7,loop:true
      }
      ;
      qteShow();
      buzz(40);
      tone('sine',880,880,.1,.3);
    }
  }
  else if(Q.ph==='input'){
    if(Q.stop){
      const dt=Math.min(.05,now-(Q.lt||now));
      Q.lt=now;
      Q.sx+=Q.sd*Q.sv*dt;
      if(Q.sx>=1){
        Q.sx=1;
        Q.sd=-1;
        Q.sv*=1.13;
      }
      else if(Q.sx<=0){
        Q.sx=0;
        Q.sd=1;
        Q.sv*=1.13;
      }
      const n=$('qsn');
      if(n){
        if(!Q.sw)Q.sw=n.parentNode.clientWidth||300;
        n.style.transform='translateX('+(Q.sx*Q.sw).toFixed(1)+'px)';
      }
      (Q.hist||(Q.hist=[])).push([performance.now(),Q.sx]);
      if(Q.hist.length>40)Q.hist.shift();
    }
    /* it gets quicker every time it turns round */
    if(Q.mash){
      const dt=Math.min(.05,now-(Q.lt||now));
      Q.lt=now;
      Q.fill=Math.max(0,Q.fill-.11*dt);
      const f=$('qmf');
      if(f)f.style.transform='scaleX('+Math.min(1,Q.fill).toFixed(3)+')';
    }
    // the bar leaks, so you cannot stop
    const left=1-(now-Q.t1)/Q.lim;
    $('qtb').style.transform='scaleX('+Math.max(0,left).toFixed(3)+')';
    $('qtb').classList.toggle('low',left<.35);
    if(left<=0)qteDone(false);
  }
  else{
    const e=now-Q.t1,sf=Q.M&&Q.M.soft,d=sf?d1-(d1+8)*clamp(e/((Q.M.def?!Q.ok:Q.ok)?1.25:2.6),0,1):
    /* (when he is out he is a clear step short as the ball goes into the mitt, THEN he runs through the bag) */
    /* A RACE TO FIRST: he runs THROUGH the bag and on down the line at full speed, the way every hitter does, instead of pulling up at it and running on the spot */
    Q.rv?lerp(lerp(d1,1.05,ease(clamp(e/.45,0,1))),.15,ease(clamp((e-.5)/.6,0,1))):lerp(d1,1.0,ease(clamp(e/.45,0,1)))+(Q.blow?1.9*(1-Math.pow(1-clamp((now-Q.blow)/.55,0,1),2)):0);
    Q.rx=Q.bx+Q.ux*d;
    Q.rz=Q.bz+Q.uz*d;
    if(sf){
      const sd=.75*clamp((3.5-d)/3,0,1);
      Q.rx-=Q.nx*sd;
      Q.rz-=Q.nz*sd;
    }
    /* (a step to the foul side of the bag, clear of the first baseman) */
    /* a made kick carries him through the fielder and onto the bag, and no further */
    if(!Q.hit&&e>=.42){
      Q.hit=true;
      const M=Q.M;
      SND.mitt();
      tone('sine',120,45,.2,.7);
      shake=Math.max(shake,.55*FX);
      rumble=Math.max(rumble,1.3);
      flash(.5);
      burst(fxS,_p.set(Q.fx+Q.ux*.4,1.2,Q.fz+Q.uz*.4),22,4,.5,[1,.9,.5],2,1);
      if(M.solo&&!Q.ok){
        Q.f={
          n:'p_dying',t:now-1.1,hold:true
        }
        ;
        Q.fx0=Q.fx;
        Q.fz0=Q.fz;
        Q.blow=now;
        Q.ball={
          t:now,x:Q.fx,z:Q.fz
        }
        ;
        rumble=1;
        try{
          SND.boom();
        }
        catch(e){
        }
      }
      /* missed: it goes off him and he goes down */
      if(M.solo&&Q.ok&&!(Q.f&&Q.f.n==='f_jumpcatch'))ball.visible=false;
      if(M.soft){
        const safe=M.def?!Q.ok:Q.ok;
        /* THE CALL MATCHES THE PLAY, WHICHEVER SIDE YOU ARE ON: winning this on DEFENSE means the runner is OUT, and the umpire, the badges and the lettering now all say so. (The umpire used to shout SAFE whenever the player won, which is right when you are the runner and exactly wrong when you just threw him out.) */
        if(Q.ok){
          crowdPump(1);
          setTimeout(()=>SND.ump(safe),200);
          M.ok();
          if(M.def){
            badge('gunned');
            try{
              badge('web');
            }
            catch(e){
            }
          }
          else{
            badge('send');
            badge('legged');
          }
          if(!S.over)S.juice=Math.min(1,S.juice+.25);
          pop(M.okT[0],M.okT[1]+(S.over?'':' · +1 JUICE'),M.def?'cool':'hot',true);
        }
        else{
          crowdDrop();
          setTimeout(()=>SND.ump(safe),200);
          M.no();
          pop(M.noT[0],M.noT[1],M.def?'hot':'cool',true);
        }
      }
      /* bang-bang at first: no collision, just the call */
      else if(Q.rv&&M.def){
        Q.f={
          n:'p_dying',t:now-1.1,hold:true
        }
        ;
        Q.fx0=Q.fx;
        Q.fz0=Q.fz;
        Q.blow=now;
        Q.ball={
          t:now,x:Q.fx,z:Q.fz
        }
        ;
        rumble=1;
        crowdDrop();
        setTimeout(()=>SND.ump(true),260);
        try{
          boo(.5);
        }
        catch(e){
        }
        M.no();
        pop(M.noT[0],M.noT[1],'hot',true);
      }
      /* on defense, beaten: he comes in hard, the fielder goes flying and he has the base */
      else if(!Q.rv&&M.def){
        badge(Q.kind==='dplate'||Q.kind==='dtag3'?'cannon':'gunned');
        ball.visible=false;
        Q.b={
          n:'p_dying',t:now-1.1,hold:true
        }
        ;
        Q.blow=now;
        crowdPump(1);
        setTimeout(()=>SND.ump(false),260);
        M.ok();
        try{
          badge('web');
        }
        catch(e){
        }
        if(!S.over)S.juice=Math.min(1,S.juice+(Q.gold?.5:.25));
        pop(M.okT[0],M.okT[1]+(S.over?'':' · +1 JUICE'),'cool',true);
      }
      /* on defense, won: the tag is on him and he is out */
      else if(Q.ok){
        if(Q.b&&Q.b.n==='q_takeout')badge('trucked');
        Q.f={
          n:'p_dying',t:now-1.1,hold:true
        }
        ;
        Q.fx0=Q.fx;
        Q.fz0=Q.fz;
        Q.blow=now;
        Q.ball={
          t:now,x:Q.fx,z:Q.fz
        }
        ;
        rumble=1;
        crowdPump(1);
        setTimeout(()=>SND.ump(true),260);
        M.ok();
        badge('send');
        if(!S.over)S.juice=Math.min(1,S.juice+(Q.gold?.5:.25));
        /* winning the showdown is worth a bar of Juice; gold on the needle is worth two */
        if(Q.gold)badge('jump');
        pop(M.okT[0],S.over?(Q.gold?'PERFECT JUMP':''):Q.gold?'PERFECT JUMP · +2 JUICE':'+1 JUICE','hot',true);
      }
      /* no Juice is promised when the meter is already full */
      else{
        ball.visible=false;
        Q.b={
          n:'p_dying',t:now-1.1,hold:true
        }
        ;
        Q.blow=now;
        crowdDrop();
        setTimeout(()=>SND.ump(false),260);
        /* the umpire's out call */
        /* tagged hard: he goes back off his feet the way the fielder does when the kick lands */
        M.no();
        pop(M.noT[0],M.noT[1],'cool',true);
      }
      hud();
    }
    if(Q.rv&&Q.blow){
      const k=1-Math.pow(1-clamp((now-Q.blow)/.55,0,1),2);
      Q.fx=Q.fx0-Q.ux*1.8*k;
      Q.fz=Q.fz0-Q.uz*1.8*k;
    }
    // the kick sends him back off his feet, well clear of the bag
    if(Q.ball){
      const t=now-Q.ball.t;
      ball.visible=t<1.6;
      ball.scale.setScalar(1.05);
      ball.position.set(Q.ball.x-Q.ux*1.4*t+Q.nx*.9*t,1.1+4.2*t-4.9*t*t,Q.ball.z-Q.uz*1.4*t+Q.nz*.9*t);
      if(ball.position.y<.06)ball.position.y=.06;
    }
    if(e>=(Q.M.def&&Q.rv?3.2:2.4)){
      Q.hid.forEach(r=>{
        r.visible=true;
      }
      );
      /* (a play you LOST on defense is held most of a second longer, so the call and what it cost are read before the game moves on) */
      Q.hid=[];
      ball.visible=false;
      ball.scale.setScalar(1);
      $('qte').hidden=true;
      if(Q.M.def){
        S.state='pduel';
        S.t=now;
        PD.hideBat=true;
        PD.ph=4;
        try{
          $('pd').style.visibility='';
        }
        catch(e){
        }
        PD.t=now-2;
        PD.after=PD.qAfter||(()=>{
        }
        );
        PD.qAfter=null;
        try{
          pdUI();
          hud();
        }
        catch(x){
        }
        return;
      }
      /* back to the mound: the next man is called up as after any play */
      syncRunners();
      if(Q.M.pa&&!Q.noPA)afterPA(.9);
      else toReady(PACE.newBatter);
    }
  }
}
