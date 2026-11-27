// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── newGame  (index.html L4524)
function newGame(){
  pdAbort();
  try{
    weekRestore();
  }
  catch(e){
  }
  try{
    shotOff();
  }
  catch(e){
  }
  try{
    $('count').style.visibility='';
  }
  catch(e){
  }
  S.scn=null;
  S.mode=null;
  S._ik=0;
  S.maxDef=0;
  S.kinds={
  }
  ;
  try{
    goHide();
    S.goK=null;
    S.stealArm='';
    S.stealCut=null;
    S.hnr='';
    const sb=$('stealbtn');
    sb.classList.remove('on','arm');
    sb._key=null;
    $('pdask').hidden=true;
  }
  catch(e){
  }
  /* A NEW GAME STARTS CLEAN: any GO! / NO, STAY offer, steal call or pitching prompt left over from the game that was restarted is taken down */
  LINEUP.forEach(b=>{
    if(b.base)Object.assign(b,b.base);
    b.hb=0;
    b.badUsed=false;
    b.phUsed=false;
  }
  );
  /* stat changes from getting hit last only for the game */
  gamesPlayed++;
  try{
    localStorage.setItem('mm_games',gamesPlayed);
  }
  catch(e){
  }
  S.wuBi=-9;
  S.pStam=1;
  S.pSt=[];
  S.ptBi=null;
  S.apoG=false;
  S.dqG=false;
  S.dmG=false;
  S.dcG=false;
  S.odUsed={
  }
  ;
  S.pkLog={
  }
  ;
  S.crawlG=false;
  S.sigG=false;
  S.boogK=false;
  S.boogT=false;
  S.newSeen={
  }
  ;
  S.dpG=false;
  S.dtG=false;
  S.daG=false;
  S.pdJG=false;
  S.mJ=undefined;
  S.mO=false;
  S.pdPN=0;
  PD.jzAsk=0;
  PD.hist=[];
  S.pdJ0=undefined;
  PD.tutDone=false;
  PD.k=0;
  LINEUP.forEach(q=>{
    q.gs={
      ab:0,h:0,hr:0
    }
    ;
    q.hs=0;
    q.lock=false;
    q.sp=false;
  }
  );
  S.lockG=null;
  Object.assign(S,{
    inning:1,outs:0,balls:0,strikes:0,runs:0,bases:[0,0,0],hits:0,hrs:0,longest:0,streak:0,bestStreak:0,juice:.75
    /* three bars: a hit in the very first at-bat fills the fourth and unlocks Overdrive */
    ,heat:.2,over:false,stk:false,opp:0,bi:-1,pitches:0,seen:{
    }
    ,kOut:null
  }
  );
  S.podN=0;
  S.podBi=-9;
  S.goal=null;
  /* per-game goals are switched off for now: pickGoal() is still here to bring them back */
  S.ks=0;
  S.d2=0;
  S.cardBi=-1;
  S.pChanges=0;
  S.pRuns0=0;
  S.pc3=false;
  S.pcPending=false;
  S.lastHRbi=-9;
  S.bdgGame={
  }
  ;
  S.pStart=gamesPlayed%BULLPEN.length;
  S.pName=BULLPEN[S.pStart];
  setTimeout(pitcherModel,0);
  /* a different starter each game, so left-handers start some of them */
  $('pcap').textContent='PITCHER';
  S.sTaunt=null;
  S.stLast=false;
  jPend=false;
  S.orbN=0;
  S.odUses=0;
  S.brawled=false;
  S.qteN=0;
  S.celN=0;
  S.pdBrN=0;
  S.goK=null;
  S.retalBi=-9;
  S.forceHbpBi=-9;
  S.walkoff=false;
  S.duel=false;
  $('hud').classList.remove('duel');
  S.pdLast=false;
  S.pOver=false;
  S.podPending=false;
  S.jSaid=false;
  S.overOn=false;
  S.spSeen=false;
  lastWalk='';
  $('title').hidden=true;
  $('over').hidden=true;
  $('pausebtn').hidden=false;
  $('mutebtn').hidden=false;
  setBatter();
  renderRep();
  scoreboard('PLAY BALL','INNING 1');
  S.opp=0;
  toReady(2);
  pop('PLAY BALL!','MOONSHOT MAYHEM','logo');
  hud();
  SND.playball();
  cheer(.14,1.5);
}


// ───────── toMenu  (index.html L5343)
function toMenu(){
  pdAbort();
  setPaused(false);
  fireworks.length=0;
  toReady();
  S.state='title';
  $('over').hidden=true;
  $('title').hidden=false;
  $('pausebtn').hidden=true;
  $('mutebtn').hidden=true;
  $('rep').hidden=true;
  $('walk').hidden=true;
  $('hud').classList.remove('wk');
  $('pop').className='';
  $('tim').className='';
  $('pitchinfo').classList.remove('on'),$('plast').classList.remove('on');
  scoreboard('MOONSHOT','MAYHEM');
  try{
    const b=+localStorage.getItem('mm_best')||0;
    if(b)$('best').textContent='Best game: '+b+' runs';
  }
  catch(e){
  }
  try{
    $('dgoal').hidden=true;
    shotOff();
    homeUI();
  }
  catch(e){
  }
  try{
    if(MX.titlePrep&&!MX.prepN&&!MX.loading)setTimeout(()=>{
      try{
        if(S.state==='title'&&!MX.prepN)MX.titlePrep();
      }
      catch(e){
      }
    }
    ,600);
  }
  catch(e){
  }
  /* BACK AT THE MENU: any pitcher or hitter not yet built is built now, while nothing is happening (the phone reports showed bullpen arms still being unpacked in the middle of games) */
}


// ───────── dailySpec  (index.html L6743)
function dailySpec(date){
  const d=date||dayStr(),kind=dailyKind(d);
  if(kind==='pitch'||kind==='boss'){
    const pk=(k,a)=>a[scnHash(d+'|'+k)%a.length],sit=pk('psit',SCN_PITCH.sit),goal=kind==='boss'?SCN_PITCH.goal[1]:pk('pgoal',SCN_PITCH.goal),k0=kind==='boss'?5:scnHash(d+'|pk')%KBAT.length;
    /* (the boss day: the toughest hitter, and nothing gets through) */
    return {
      date:d,kind,pitch:true,sit,goal,k:k0,text:(kind==='boss'?'BOSS · ':'')+sit.t+' · '+goal.t+' · facing '+KBAT[k0].name
    }
    ;
  }
  const pick=(k,a)=>a[scnHash(d+'|'+k)%a.length],sit=pick('sit',SCN_PARTS.sit),score=pick('score',SCN_PARTS.score),goal=pick('goal',SCN_PARTS.goal),twist=pick('twist',SCN_PARTS.twist);
  let goal2=goal;
  if(goal.id==='lead'&&score.runs>score.opp)goal2=SCN_PARTS.goal[0];
  /* (already ahead: the goal becomes driving in a run, so no day is won before a pitch is thrown) */
  if(goal.id==='lead'&&score.opp-score.runs>sit.bases.reduce((a,b)=>a+b,0)+1)goal2=SCN_PARTS.goal[0];
  /* (and never a lead that one swing cannot reach) */
  const derby=kind==='derby',run=kind==='run',G=derby?SCN_PARTS.goal[2]:run?SCN_PARTS.goal[0]:goal2,SI=run?SCN_PARTS.sit[2]:sit,TW=derby?SCN_PARTS.twist[1]:twist;
  /* Friday: go deep with Overdrive ready. Wednesday: a man on first and a run to make with your legs. (Defense and wild-card days use the batting set until they have their own.) */
  return {
    date:d,kind,sit:SI,score,goal:G,twist:TW,bi:scnHash(d+'|bi')%LINEUP.length,text:SI.t+', '+score.t+' · '+G.t+' · '+TW.t
  }
  ;
}


// ───────── dailyStart  (index.html L6802)
function dailyStart(){
  if(MX.loading||MX.pdW)return;
  try{
    audioInit();
    if(AC&&AC.state==='suspended')AC.resume();
  }
  catch(e){
  }
  const sp=dailySpec(),z=scnStart(sp);
  z.daily=true;
  const e=$('dgoal');
  e.textContent='DAILY: '+sp.goal.t.toUpperCase();
  e.hidden=false;
  try{
    pop('DAILY CHALLENGE',(sp.sit.t+(sp.score?', '+sp.score.t:'')+' \u00B7 '+sp.goal.t).toUpperCase(),'cool',true);
  }
  catch(x){
  }
}


// ───────── dailyTick  (index.html L6804)
function dailyTick(){
  const z=S.scn;
  if(!z||!z.daily||z.shown)return;
  const r=scnCheck();
  if(r===null)return;
  if(z.endAt===undefined)z.endAt=now;
  const st=S.state,e=now-z.endAt,
  busy=st==='flight'||st==='result'||st==='trot'||st==='celebrate'||st==='celly2'||st==='qte'||st==='pitch'||st==='windup'||st==='brawl'||st==='hbp'||st==='hbprun'||(st==='pduel'&&PD.ph>0);
  if(e<1.1||(busy&&e<14))return;
  /* the play that settled it is allowed to finish: the homer lands, he rounds the bases, the strikeout gets its beat */
  z.shown=true;
  dailyEnd(r,z);
}


// ───────── dailyEnd  (index.html L6807)
function dailyEnd(r,z){
  let stars=0;
  try{
    if(r){
      stars=1;
      if(z.spec.pitch){
        if(PD.ks>0)stars++;
        if(PD.perf>0)stars++;
      }
      else{
        if(S.bi<=z.bi0)stars++;
        if(S.hrs>z.hrs0||S.runs-z.runs0>=2)stars++;
      }
    }
  }
  catch(e){
  }
  const res=streakPlay(streakLoad(),stars),k=res.z,ev=res.ev;
  streakSave(k);
  try{
    if(PD.on)pdEnd();
  }
  catch(e){
  }
  S.scn=null;
  toMenu();
  $('title').hidden=true;
  lastMode='daily';
  $('drtitle').textContent='DAILY CHALLENGE';
  const H=$('drhead');
  H.textContent=r?'NAILED IT!':'NOT TODAY';
  H.classList.toggle('l',!r);
  $('drstars').innerHTML='\u2605'.repeat(stars)+'<i>'+'\u2605'.repeat(3-stars)+'</i>';
  $('drtext').textContent=z.spec.text;
  $('drstreak').innerHTML='\uD83D\uDD25 '+k.n+'-DAY STREAK'+'<small>'+(ev.broke?'YOUR OLD STREAK ENDED \u00B7 A NEW ONE STARTS TODAY':ev.used?'A FREEZE SAVED YOUR STREAK':ev.earned?'7 DAYS: YOU EARNED A STREAK FREEZE':r?'SHOWING UP COUNTS \u00B7 COME BACK TOMORROW':'THE STREAK COUNTS FOR SHOWING UP \u00B7 TRY AGAIN FOR STARS')+(k.freezes?' \u00B7 FREEZES HELD: '+k.freezes:'')+'</small>';
  {
    const got=[badgeQuiet('d1'),r?badgeQuiet('dwin'):'',stars>=3?badgeQuiet('d3s'):'',r&&z.spec.kind==='boss'?badgeQuiet('dboss'):'',k.n>=3?badgeQuiet('dstk3'):'',k.n>=7?badgeQuiet('dstk7'):'',k.n>=30?badgeQuiet('dstk30'):'',k.n>=100?badgeQuiet('dstk100'):'',ev.earned?badgeQuiet('dfrz'):''].filter(Boolean);
    $('drach').innerHTML=got.length?'<b>ACHIEVEMENT'+(got.length>1?'S':'')+' UNLOCKED</b>'+got.join(' \u00B7 '):'';
    $('drach').hidden=!got.length;
  }
  try{
    let paid=false;
    try{
      paid=localStorage.getItem('mm_dxp')===dayStr();
      localStorage.setItem('mm_dxp',dayStr());
    }
    catch(e){
    }
    $('drxp').textContent=xpLine(xpAdd(paid?20:100+50*stars));
  }
  catch(e){
  }
  /* the day's full XP is paid once; a replay for more stars pays a little */
  $('dragain').textContent=stars>=3?'PLAY AGAIN':'TRY AGAIN';
  $('dres').hidden=false;
  try{
    if(r){
      cheer(.3,2);
      buzz([30,40,60]);
    }
  }
  catch(e){
  }
}


// ───────── derbyPick  (index.html L6818)
function derbyPick(){
  if(MX.loading||MX.pdW)return;
  const L=$('dplist');
  L.innerHTML=LINEUP.map((b,i)=>'<button type="button" data-i="'+i+'"'+(i===derbyBi?' class="on"':'')+'><b>'+bdn(b)+'</b><i>PWR '+statGrade(b.pwr)+gradeMod(b.pwr)+' \u00B7 CON '+statGrade(b.con)+gradeMod(b.con)+(b.lh?' \u00B7 BATS L':'')+'</i></button>').join('');
  $('title').hidden=true;
  $('dpick').hidden=false;
}


// ───────── weekKey  (index.html L6822)
function weekKey(){
  const d=new Date(),days=Math.floor((d.getTime()-d.getTimezoneOffset()*6e4)/864e5);
  return Math.floor((days-1)/7);
}


// ───────── weekBest  (index.html L6823)
function weekBest(){
  try{
    const z=JSON.parse(localStorage.getItem('mm_week')||'null');
    return z&&z.k===weekKey()?z.b|0:0;
  }
  catch(e){
    return 0;
  }
}


// ───────── weekSpec  (index.html L6824)
function weekSpec(){
  const k=weekKey();
  return {
    bi:((k%LINEUP.length)+LINEUP.length)%LINEUP.length,p:((k*3%BULLPEN.length)+BULLPEN.length)%BULLPEN.length
  }
  ;
}


// ───────── weekPA  (index.html L6828)
function weekPA(M,hr,hit){
  const pl=flight&&flight.play;
  if(hit){
    const pts=hr?400+(M.last||0):100*clamp((pl&&pl.bases)||1,1,3),got=Math.round(pts*M.mult);
    M.score+=got;
    M.streak++;
    M.mult+=hr?1.5:.5;
    try{
      timing('+'+got.toLocaleString()+' \u00B7 NOW '+wkX(M.mult),'#ffd23b',3);
    }
    catch(e){
    }
    const lv=weekLv(M);
    if(lv>M.lv){
      M.lv=lv;
      diffI=lv;
      try{
        pop(DIFF[lv].n,'THE PITCHING STEPS UP','hot',true);
      }
      catch(e){
      }
    }
  }
  else if(S.walked){
    M.mult+=.5;
  }
  else{
    M.outs++;
    M.streak=0;
    M.mult=1;
    try{
      timing('OUT '+M.outs+' OF 3 \u00B7 MULTIPLIER BACK TO x1','#ff8a2e',3);
    }
    catch(e){
    }
    if(M.outs>=3){
      M.done=true;
      M.endAt=now;
    }
  }
}


// ───────── modeStart  (index.html L6832)
function modeStart(id,bi){
  if(MX.loading||MX.pdW)return;
  try{
    audioInit();
    if(AC&&AC.state==='suspended')AC.resume();
  }
  catch(e){
  }
  newGame();
  S.mode={
    id,pa:0,hits:0,hrs:0,outs:0,ft:0,last:0,best:0,done:false,h0:0,r0:0
  }
  ;
  lastMode=id;
  if(id==='weekly'){
    const w=weekSpec();
    Object.assign(S.mode,{
      score:0,mult:1,streak:0,lv:0,bi:w.bi
    }
    );
    wkD0=diffI;
    diffI=0;
    S.juice=0;
    try{
      S.pStart=w.p;
      S.pName=BULLPEN[w.p];
    }
    catch(e){
    }
    S.bi=w.bi-1;
    try{
      setBatter();
      renderRep();
    }
    catch(e){
    }
    try{
      pop('WEEKLY CHALLENGE','THREE OUTS \u00B7 BUILD YOUR MULTIPLIER','cool',true);
      scoreboard('WEEKLY','CHALLENGE');
    }
    catch(e){
    }
    modeHud();
    return;
  }
  if(id==='bp')shotFielders(true);
  /* batting practice is the hitter and the pitcher: nobody shagging */
  if(id==='derby'){
    S.juice=0;
    try{
      $('count').style.visibility='hidden';
    }
    catch(e){
    }
    shotFielders(true);
    /* nobody in the field: it is the hitter, the pitcher and the fences */
    if(bi!==undefined)derbyBi=bi;
    try{
      localStorage.setItem('mm_derbybi',derbyBi);
    }
    catch(e){
    }
    S.mode.bi=derbyBi;
    S.bi=derbyBi-1;
    try{
      setBatter();
      renderRep();
    }
    catch(e){
    }
  }
  try{
    pop(id==='derby'?'HOME RUN DERBY':'BATTING PRACTICE',id==='derby'?'TEN OUTS \u00B7 ANYTHING THAT STAYS IN THE PARK IS AN OUT':'NO OUTS \u00B7 NO SCORE \u00B7 JUST HIT','cool',true);
    scoreboard(id==='derby'?'HOME RUN':'BATTING',id==='derby'?'DERBY':'PRACTICE');
  }
  catch(e){
  }
  modeHud();
  if(id==='bp')badgeQuiet('cage');
}


// ───────── modePA  (index.html L6834)
function modePA(){
  const M=S.mode;
  if(!M||M.done)return;
  M.sw0=M.swN;
  if(M.id==='shot'){
    shotPitch();
    S.outs=0;
    S.bases=[0,0,0];
    S.inning=1;
    try{
      syncRunners();
    }
    catch(e){
    }
    return;
  }
  M.pa++;
  const hr=S.hrs>M.h0,hit=S.hits>M.r0;
  M.h0=S.hrs;
  M.r0=S.hits;
  if(hit)M.hits++;
  if(M.id==='weekly'){
    if(hr){
      M.hrs++;
      M.best=Math.max(M.best,M.last);
    }
    weekPA(M,hr,hit);
    S.outs=0;
    S.bases=[0,0,0];
    S.inning=1;
    try{
      syncRunners();
    }
    catch(e){
    }
    modeHud();
    return;
  }
  if(hr){
    M.hrs++;
    M.ft+=M.last;
    M.best=Math.max(M.best,M.last);
    if(M.id==='derby'&&M.hrs%10===0&&derbyLv(M)>(M.lv||0)){
      M.lv=derbyLv(M);
      try{
        pop('LEVEL '+(M.lv+1),M.hrs+' HOME RUNS \u00B7 THE PITCHING TIGHTENS UP','hot',true);
        cheer(.3,2);
      }
      catch(e){
      }
    }
    else if(M.id==='derby')try{
      timing('+'+M.last+' FOR '+M.last+' FT'+(M.tgLast?' \u00B7 +'+M.tgLast[0]+' '+M.tgLast[2]:''),'#ffd23b',3);
    }
    catch(e){
    }
    M.tgLast=null;
  }
  else if(M.id==='derby')M.outs++;
  S.outs=0;
  S.bases=[0,0,0];
  S.inning=1;
  try{
    syncRunners();
  }
  catch(e){
  }
  if(M.id==='derby'){
    if(!hr)try{
      timing('OUT '+M.outs+' OF 10','#ff8a2e',2.5);
    }
    catch(e){
    }
    if(M.outs>=10){
      M.done=true;
      M.endAt=now;
    }
  }
  modeHud();
}


// ───────── derbyTarget  (index.html L6840)
function derbyTarget(nm){
  const M=S.mode,T2=DERBY_T[nm]||[100,'OFF THE IRONWORK!','TARGET'];
  if(!M)return;
  M.bonus=(M.bonus||0)+T2[0];
  M.tg=(M.tg||0)+1;
  M.tgLast=T2;
  try{
    pop(T2[1],T2[2]+' \u00B7 +'+T2[0]+' BONUS','hot',true);
    cheer(.3,2);
  }
  catch(e){
  }
  modeHud();
}


// ───────── derbyPitch  (index.html L6841)
function derbyPitch(){
  const M=S.mode;
  if(!M||M.done)return;
  if((M.swN||0)!==(M.sw0||0)){
    M.sw0=M.swN;
    M.outs++;
    try{
      timing('OUT '+M.outs+' OF 10','#ff8a2e',2.5);
    }
    catch(e){
    }
    if(M.outs>=10){
      M.done=true;
      M.endAt=now;
    }
  }
  S.balls=0;
  S.strikes=0;
  modeHud();
  try{
    hud();
  }
  catch(e){
  }
}


// ───────── modeHud  (index.html L6843)
function modeHud(){
  const M=S.mode,e=$('dgoal');
  if(!M){
    return;
  }
  if(M.id==='shot'){
    shotHud();
    return;
  }
  if(M.id==='weekly'){
    e.hidden=false;
    e.textContent='WEEKLY: '+M.score.toLocaleString()+' \u00B7 '+wkX(M.mult)+' \u00B7 OUTS '+M.outs+'/3 \u00B7 '+DIFF[M.lv||0].n;
    return;
  }
  e.hidden=false;
  e.textContent=M.id==='derby'?'DERBY: '+derbyScore(M).toLocaleString()+' PTS \u00B7 '+M.hrs+' HR \u00B7 OUTS '+M.outs+'/10'+(derbyLv(M)?' \u00B7 LV '+(derbyLv(M)+1):''):'PRACTICE: '+M.hits+' HITS IN '+M.pa+(M.hrs?' \u00B7 '+M.hrs+' HR':'')+(M.best?' \u00B7 LONG '+M.best+' FT':'');
}


// ───────── modeTick  (index.html L6844)
function modeTick(){
  try{
    shotGfxTick();
  }
  catch(e){
  }
  try{
    hrFtTick();
  }
  catch(e){
  }
  try{
    pcardTick();
  }
  catch(e){
  }
  const M=S.mode;
  if(M&&(M.id==='derby'||M.id==='shot'||M.id==='weekly')&&S.state!=='title'){
    try{
      for(const R of RUN.list)if(R.fig.root.visible)R.fig.root.visible=false;
    }
    catch(e){
    }
  }
  /* (no baserunning in the derby or the gauntlet) */
  if(M&&M.id!=='weekly'&&S.state!=='title'){
    for(const c of fielders)if(!c.isP&&c.fig.root.visible)c.fig.root.visible=false;
  }
  if(!M||!M.done||M.shown)return;
  const st=S.state,e=now-M.endAt,busy=st==='flight'||st==='result'||st==='trot'||st==='celebrate'||st==='pitch'||st==='windup';
  if(e<1.2||(busy&&e<12))return;
  M.shown=true;
  modeEnd();
}


// ───────── modeEnd  (index.html L6845)
function modeEnd(){
  const M=S.mode;
  if(!M)return;
  if(M.id==='weekly'){
    weekRestore();
    const b0=weekBest(),rec=M.score>b0;
    if(rec)try{
      localStorage.setItem('mm_week',JSON.stringify({
        k:weekKey(),b:M.score
      }
      ));
    }
    catch(e){
    }
    S.mode=null;
    toMenu();
    $('title').hidden=true;
    $('drtitle').textContent='WEEKLY CHALLENGE';
    const H=$('drhead');
    H.textContent=M.score.toLocaleString();
    H.classList.toggle('l',M.score<=0);
    $('drstars').innerHTML='';
    $('drtext').textContent=M.hits+' hit'+(M.hits===1?'':'s')+' \u00B7 '+M.hrs+' homer'+(M.hrs===1?'':'s')+' \u00B7 reached '+DIFF[M.lv||0].n;
    $('drstreak').innerHTML=(rec&&M.score>0?'NEW BEST THIS WEEK!':'BEST THIS WEEK: '+b0.toLocaleString())+'<small>A NEW HITTER AND PITCHER EVERY FRIDAY</small>';
    $('drach').hidden=true;
    try{
      $('drxp').textContent=xpLine(xpAdd(Math.min(600,M.score/25)));
    }
    catch(e){
    }
    $('dragain').textContent='GO AGAIN';
    $('dres').hidden=false;
    return;
  }
  if(M.id==='derby'){
    const sc=derbyScore(M);
    M.recP=sc>DERBY_PTS;
    if(M.recP){
      DERBY_PTS=sc;
      try{
        localStorage.setItem('mm_derbyp',sc);
      }
      catch(e){
      }
    }
  }
  if(M.id==='shot'){
    const rec=M.total>SHOT_BEST;
    if(rec){
      SHOT_BEST=M.total;
      try{
        localStorage.setItem('mm_shot',M.total);
      }
      catch(e){
      }
    }
    S.mode=null;
    shotOff();
    toMenu();
    $('title').hidden=true;
    $('drtitle').textContent='THE GAUNTLET';
    const H=$('drhead');
    H.textContent=M.total.toLocaleString();
    H.classList.toggle('l',M.total<=0);
    $('drstars').innerHTML='';
    $('drtext').textContent='Reached round '+M.round+' \u00B7 '+M.good+' target'+(M.good===1?'':'s')+' hit';
    $('drstreak').innerHTML=(rec&&M.total>0?'NEW BEST!':'BEST: '+SHOT_BEST.toLocaleString())+'<small>'+(rec&&M.total>0?'YOUR OLD MARK IS GONE':'FILL THE METER IN TEN PITCHES TO MOVE ON')+'</small>';
    {
      const got=[M.round>=3?badgeQuiet('shot3'):'',M.round>=5?badgeQuiet('shot5'):'',M.total>=10000?badgeQuiet('shot10k'):'',M.round>=7?badgeQuiet('shot7'):'',M.total>=25000?badgeQuiet('shot25k'):''].filter(Boolean);
      $('drach').innerHTML=got.length?'<b>ACHIEVEMENT'+(got.length>1?'S':'')+' UNLOCKED</b>'+got.join(' \u00B7 '):'';
      $('drach').hidden=!got.length;
    }
    try{
      $('drxp').textContent=xpLine(xpAdd(Math.max(0,M.total)/40));
    }
    catch(e){
    }
    $('dragain').textContent='GO AGAIN';
    $('dres').hidden=false;
    return;
  }
  const rec=M.hrs>DERBY_BEST;
  if(rec){
    DERBY_BEST=M.hrs;
    try{
      localStorage.setItem('mm_derby',M.hrs);
    }
    catch(e){
    }
  }
  S.mode=null;
  toMenu();
  $('title').hidden=true;
  $('drtitle').textContent='HOME RUN DERBY';
  const H=$('drhead');
  H.textContent=derbyScore(M).toLocaleString();
  H.classList.toggle('l',!M.hrs);
  $('drstars').innerHTML='';
  $('drtext').textContent=M.hrs?M.hrs+(M.hrs===1?' homer':' homers')+' \u00B7 '+M.ft.toLocaleString()+' ft of distance'+(M.bonus?' \u00B7 '+M.bonus.toLocaleString()+' in bonuses from '+M.tg+' target'+(M.tg===1?'':'s'):'')+' \u00B7 longest '+M.best+' ft':'Ten up, ten down. The fences are not going anywhere.';
  $('drstreak').innerHTML=(M.recP&&M.hrs?'NEW BEST!':'BEST: '+DERBY_PTS.toLocaleString())+'<small>'+(M.recP&&M.hrs?'YOUR OLD MARK IS GONE':'BEAT '+DERBY_PTS.toLocaleString()+' TO SET A NEW MARK')+' \u00B7 MOST HOMERS: '+DERBY_BEST+'</small>';
  {
    const got=[M.tg?badgeQuiet('derbytg'):'',derbyScore(M)>=5000?badgeQuiet('derby5k'):'',M.hrs>=5?badgeQuiet('derby5'):'',M.hrs>=10?badgeQuiet('derby10'):'',M.hrs>=15?badgeQuiet('derby15'):'',M.hrs>=20?badgeQuiet('derby20'):'',derbyScore(M)>=10000?badgeQuiet('derby10k'):'',M.best>=550?badgeQuiet('derbylong'):''].filter(Boolean);
    $('drach').innerHTML=got.length?'<b>ACHIEVEMENT'+(got.length>1?'S':'')+' UNLOCKED</b>'+got.join(' \u00B7 '):'';
    $('drach').hidden=!got.length;
  }
  try{
    $('drxp').textContent=xpLine(xpAdd(20*M.hrs));
  }
  catch(e){
  }
  $('dragain').textContent='SWING AGAIN';
  $('dres').hidden=false;
  try{
    if(M.hrs){
      cheer(.3,2);
      buzz([30,40,60]);
    }
  }
  catch(e){
  }
}
