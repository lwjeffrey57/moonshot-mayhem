// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── updateTrot  (index.html L4083)
function updateTrot(dt){
  const R=TROT.R;
  if(!R||S.state!=='trot')return;
  const e=now-S.t,root=R.fig.root,seg=TROT.segs.find(g=>e>=g[0]&&e<g[1]);
  let mode='fist',mir=false;
  root.visible=!(TROT.pcut&&seg);
  if(seg){
    const sv=lerp(seg[2],seg[3],(e-seg[0])/(seg[1]-seg[0]));
    basePos(sv,_rv);
    root.position.copy(_rv);
    root.scale.setScalar(lerp(FSCALE.inf,1,ease(clamp((sv-3.35)/.6,0,1))));
    // infielder-sized on the bases, easing to the hitter's own size as he comes down the line to the plate
    basePos(Math.min(3.999,sv+.04),_a);
    basePos(Math.max(0,sv-.04),_b);
    root.rotation.y=Math.atan2(_a.x-_b.x,_a.z-_b.z);
    // heading follows the path, so it swings round at the bag
    const near=Math.abs(sv-Math.round(sv))<.17&&Math.round(sv)>0&&Math.round(sv)<4;
    mode=near&&R.turnAct?'turn':'jog';
    mir=mode==='turn';
    basePos(Math.min(3.999,sv+.3),_a);
    _b.set(_a.x,0,_a.z+19.4).normalize();
    TROT.cam.set(_a.x+_b.x*3.5,1.5,_a.z+_b.z*3.5);
    if(seg[4]){
      mode='mw';
      mir=false;
      root.rotation.y+=PI;
      TROT.cam.set(_rv.x+.7071*4.6+.7071*1.6,1.25,_rv.z-.7071*4.6+.7071*1.6);
      // back to the plate, gliding home; watched side-on from the infield
      if(!TROT.mwS){
        TROT.mwS=true;
        crowdPump(.8);
        $('pop').className='';
        const e2=$('shout');
        e2.textContent='MOONWALK!';
        e2.style.left='50%';
        e2.style.top=(MOB?'30%':'24%');
        e2.classList.remove('b','go');
        void e2.offsetWidth;
        e2.classList.add('go');
      }
    }
  }
  else{
    root.position.set(0,0,0);
    root.rotation.y=PI/4;
    // cut on the action: the frame his foot hits the plate, the camera jumps to a new, low angle and the celebration starts on the cut
    if(!TROT.cut){
      TROT.cut=true;
      flash(.4);
      crowdPump();
    }
    if(TROT.clip==='p_loser')TROT.cam.set(1.1,1.35,-3.6);
    else TROT.cam.set(1.5,.6,2.7);
    // camera ahead of him, looking back up the third-base line
    TROT.cele=!!(TROT.clip&&MX.clip&&MX.clip.intros[TROT.clip]);
    root.visible=!TROT.cele;
    if(!R.fistAct)mode='jog';
  }
  // the batter's own model takes over for the celebration
  if(mode!==R.mode){
    R.mode=mode;
    R.mixer.stopAllAction();
    (mode==='mw'?R.mwAct:mode==='turn'?R.turnAct:mode==='fist'?R.fistAct:R.jogAct).reset().play();
  }
  R.obj.scale.x=R.sx*(mir?-1:1);
  // the clip turns right; runners turn left
  const a=mode==='mw'?R.mwAct:mode==='turn'?R.turnAct:mode==='fist'?R.fistAct:R.jogAct,d=mode==='jog'?R.jogDur:a.dur;
  R.runT=(R.runT+dt*(mode==='jog'?1.25:mode==='mw'?1.35:1))%d;
  a.time=R.runT;
  R.mixer.update(0);
}


// ───────── syncRunners  (index.html L4102)
function syncRunners(){
  const L=RUN.list;
  TROT.R=null;
  TROT.cele=false;
  L.forEach(R=>{
    R.keep=false;
    R.trot=false;
    R.lead=false;
    R.fig.root.scale.setScalar(1.25);
    if(R.obj)R.obj.scale.x=R.sx;
  }
  );
  for(let b=0;
  b<3;
  b++)if(S.bases[b]){
    const R=L.find(R=>R.active&&!R.keep&&Math.round(R.target)===b+1)||L.filter(R=>R.active&&!R.keep&&!S.bases[Math.round(R.target)-1]).sort((x,y)=>Math.abs(x.target-b-1)-Math.abs(y.target-b-1))[0]||L.find(R=>!R.keep&&!R.active)||L.find(R=>!R.keep);
    /* a man who has moved up (or back) a base is still the same man, in the same body */
    if(R){
      R.keep=true;
      R.active=true;
      R.s=R.target=b+1;
      R.delay=0;
      R.jog=false;
    }
  }
  L.forEach(R=>{
    if(!R.keep)R.active=false;
  }
  );
}


// ───────── walkRunners  (index.html L4109)
function walkRunners(){
  let b=1;
  const at=k=>RUN.list.find(R=>R.active&&R.s===k&&R.target===k),forced=[];
  for(;
  b<=3;
  b++){
    const R=at(b);
    if(!R)break;
    forced.push(R);
  }
  forced.forEach(R=>{
    R.target=R.s+1;
    R.jog=true;
  }
  );
  sendRunners(0,{
    batter:1,jog:true
  }
  );
}


// ───────── updateRunners  (index.html L4113)
function updateRunners(dt){
  for(const R of RUN.list){
    const root=R.fig.root;
    if(R.trot)continue;
    if(S.state==='qte'){
      root.visible=false;
      continue;
    }
    // the close-up has its own runner; the real ones wait out of shot
    if(S.state==='celly2'&&R.active&&Math.abs(R.s-D2.base)<.05){
      root.visible=false;
      continue;
    }
    // the hitter's own model is celebrating on the bag
    if(!R.active){
      root.visible=false;
      continue;
    }
    if(R.delay>0){
      R.delay-=dt;
      root.visible=false;
      continue;
    }
    const moving=R.s<R.target-1e-4;
    const hold=flight&&flight.admire&&!flight.done&&R.s<=3?3:9;
    // while the camera is still on the hitter admiring his shot, nobody comes home past him: runners wait at third until he is on his way
    if(moving)R.s=Math.min(R.target,hold,R.s+(R.raceV?R.raceV*dt:(R.hurt?6.2:R.lead?17.5:R.jog?10.5:16)*dt/27.43));
    else{
      if(R.raceV&&R.target===1&&!R.thru)R.thru=now;
      R.raceV=0;
      R.hurt=false;
    }
    if(R.thru&&(now-R.thru>3.2||!(S.state==='result'||S.state==='flight')))R.thru=0;
    if(R.s>=4){
      R.active=false;
      R.lead=false;
      root.visible=false;
      continue;
    }
    // crossed the plate
    // THE LEAD: with a pitch coming, a man on base stands a few steps off it toward the next one (so the runner on second is no longer hidden
    // dead behind the pitcher: you see him, in his own body, off the bag). When he goes he starts from there; if he stays he steps back.
    {
      const bs=Math.floor(R.s+1e-6),live=S.state==='ready'||S.state==='windup'||S.state==='pitch',tgt=live&&!moving&&bs>=1&&bs<=3&&!R.thru?[0,.085,S.state==='ready'?.125:.215,.07][bs]:moving?(R.ld||0):0;
      /* the man on second takes his lead, then shuffles off another couple of steps as the pitcher starts his delivery (a secondary lead) */
      R.ldGo=!moving&&Math.abs(tgt-(R.ld||0))>.006?(tgt>(R.ld||0)?1:-1):0;
      /* stepping out to his lead (or back to the bag): he walks it, he does not slide */
      R.ld=(R.ld||0)+clamp(tgt-(R.ld||0),-dt*.075,dt*(bs===2&&S.state!=='ready'?.11:.075));
      root.visible=true;
      basePos(R.s-bs<R.ld?Math.min(3.999,bs+R.ld):R.s,_rv);
      root.position.copy(_rv);
    }
    // beating the throw: he runs through the bag the way a hitter does, a few strides down the line into foul ground, easing up
    const thru=R.thru?now-R.thru:-1,thruRun=thru>=0&&thru<1.15;
    if(thru>=0){
      const d=5.5*(1-Math.pow(1-clamp(thru/1.3,0,1),2));
      root.position.x+=.7071*d;
      root.position.z-=.7071*d;
    }
    const i=clamp(Math.floor(R.s),0,3);
    root.rotation.y=thru>=0?Math.atan2(.7071,-.7071):moving?Math.atan2(BASES[i+1][0]-BASES[i][0],BASES[i+1][1]-BASES[i][1]):Math.atan2(-_rv.x,-_rv.z);
    if(R.ldGo&&thru<0){
      const j=clamp(Math.floor(R.s+1e-6),0,3);
      root.rotation.y=Math.atan2(BASES[(j+1)%4][0]-BASES[j][0],BASES[(j+1)%4][1]-BASES[j][1])+(R.ldGo<0?PI:0);
    }
    const mode=thruRun?'run':moving?(R.hurt&&R.crawl&&R.crawlAct?'crawl':R.hurt&&R.hurtAct?'hurt':R.jog&&R.jogAct?'jog':'run'):R.ldGo&&R.jogAct?'jog':'pose';
    if(mode!==R.mode){
      R.mode=mode;
      R.mixer.stopAllAction();
      if(mode==='run')R.runAct.reset().play();
      else if(mode==='jog')R.jogAct.reset().play();
      else if(mode==='hurt')R.hurtAct.reset().play();
      else if(mode==='crawl')R.crawlAct.reset().play();
    }
    if(mode==='hurt'){
      R.runT=(R.runT+dt)%R.hurtAct.dur;
      R.hurtAct.time=R.runT;
      R.mixer.update(0);
    }
    else if(mode==='crawl'){
      R.runT=(R.runT+dt*1.15)%R.crawlAct.dur;
      R.crawlAct.time=R.runT;
      R.mixer.update(0);
    }
    /* drilled, and making a meal of it: he goes to first on his hands and knees */
    else if(mode==='run'){
      R.runT=(R.runT+dt*1.5)%R.runDur;
      R.runAct.time=R.runT;
      R.mixer.update(0);
    }
    else if(mode==='jog'){
      R.runT=(R.runT+dt*1.25)%R.jogDur;
      R.jogAct.time=R.runT;
      R.mixer.update(0);
    }
    else{
      applyPose(R.fig,RUN.pose);
      retargetFig(R.fig,R.rt);
    }
  }
}


// ───────── hbpRunEnd  (index.html L4386)
function hbpRunEnd(){
  $('statfx').className='';
  $('walk').hidden=true;
  $('walk').classList.remove('pc','pc3');
  $('walk').style.top='';
  $('hud').classList.remove('wk');
  afterPA(.5);
}


// ───────── advance  (index.html L4972)
function advance(n,walk){
  let r=0;
  const b=S.bases;
  if(walk){
    if(b[0]){
      if(b[1]){
        if(b[2])r++;
        b[2]=1;
      }
      b[1]=1;
    }
    b[0]=1;
  }
  else{
    for(let i=2;
    i>=0;
    i--)if(b[i]){
      b[i]=0;
      if(i+n>=3)r++;
      else b[i+n]=1;
    }
    if(n>=4)r++;
    else b[n-1]=1;
  }
  addRuns(r);
  return r;
}


// ───────── celOpen  (index.html L6952)
function celOpen(){
  const lv=lvOf(XP),all=CEL_START.map(c=>[c[0],c[1],1]).concat(CEL_LADDER.map((c,i)=>[c[0],c[1],i+2]));
  $('celnote').textContent=(RELEASE?'LEVEL '+lv+' \u00B7 ONE MORE AT EVERY LEVEL':'PLAYTEST: EVERYTHING IS IN THE MIX \u00B7 THE LEVELS SHOW WHERE EACH WOULD UNLOCK')+' \u00B7 TAP ONE TO MAKE IT YOUR SIGNATURE (FIRST HOMER OF EVERY GAME)';
  $('cellist').innerHTML=all.map(c=>{
    const ok=!RELEASE||lv>=c[2],sig=CEL_SIG===c[0];
    return '<button type="button" data-k="'+c[0]+'" class="'+(ok?'':'lk')+(sig?' sig':'')+'"'+(ok?'':' disabled')+'><b>'+c[1]+'</b><i>'+(sig?'YOUR SIGNATURE':ok?(c[2]>1?'LEVEL '+c[2]:'STARTER'):'UNLOCKS AT LEVEL '+c[2])+'</i></button>';
  }
  ).join('');
  $('prof').hidden=true;
  $('cels').hidden=false;
}
