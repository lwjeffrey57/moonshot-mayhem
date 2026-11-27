// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── eruptTick  (index.html L2017)
function eruptTick(L,cols,emb,onFire){
  const e=now-L.t;
  if(e>=0&&e<1.9&&S.state!=='title'&&S.state!=='over'){
    if(!L.a){
      const mk=c=>{
        const sp=new T.Sprite(new T.SpriteMaterial({
          map:glowTex,color:c,blending:T.AdditiveBlending,transparent:true,depthWrite:false,fog:false
        }
        ));
        sp.renderOrder=20;
        scene.add(sp);
        return sp;
      }
      ;
      L.a=mk(cols[0]);
      L.b=mk(cols[1]);
      L.c=mk(cols[2]);
    }
    if(!L.fired){
      L.fired=true;
      onFire(L);
      for(let i=0;
      i<(L===LOCKFX?2:3);
      i++)burst(fxL,_p.set(L.x,1,L.z),40,9,1,emb,-3,7);
    }
    const sf=L===LOCKFX?.42:1,k=(1-e/1.9)*sf,up=Math.min(1,e/.18);
    L.a.visible=L.b.visible=L.c.visible=true;
    /* (sf: the Locked In fire is turned well down, so the man celebrating in it can be seen: it was whiting him out) */
    L.a.position.set(L.x,1+5.5*up,L.z);
    L.a.scale.set((4.2+Math.sin(now*40)*.5)*(sf<1?.8:1),13*up,1);
    L.a.material.opacity=.9*k;
    L.b.position.set(L.x,1+3.2*up,L.z);
    L.b.scale.set(2+Math.sin(now*55)*.3,8*up,1);
    L.b.material.opacity=.8*k;
    L.c.position.set(L.x,.4,L.z);
    L.c.scale.set(3+e*16,1.6+e*2,1);
    L.c.material.opacity=.7*k*k;
    if(e<1.3)burst(fxL,_p.set(L.x+rand(-.5,.5),rand(.3,2.2),L.z+rand(-.5,.5)),sf<1?3:5,4,.8,emb,-4,5);
  }
  else if(L.a&&L.a.visible){
    L.a.visible=L.b.visible=L.c.visible=false;
  }
}


// ───────── overCheck  (index.html L3810)
function overCheck(){
  if(S.over||S.juice<.95||S.state==='title'||S.state==='over')return;
  S.juice=1;
  S.over=true;
  S.overOn=false;
  juiceArmed=false;
  hudLater=true;
  // a bar that looks full IS full: anything from 95% up snaps to full and becomes Overdrive on the spot
  SND.zap();
  buzz([30,40,30,40,80]);
  const call=()=>{
    if(!(S.over&&!S.overOn))return;
    if(S.state!=='ready'||now-S.t<.3){
      setTimeout(call,300);
      return;
    }
    pop('OVERDRIVE READY!','','cool',true);
  }
  ;
  // never over a celebration: it waits for the next hitter
  setTimeout(call,900);
}


// ───────── lkxExplain  (index.html L3874)
function lkxExplain(){
  try{
    infoOnce('mm_lkx',500,()=>{
      const st=S.state;
      if(st==='title'||st==='over'||st==='end')return false;
      let lk=false;
      try{
        lk=!!curBatter().lock;
      }
      catch(e){
      }
      if(!lk)return false;
      return st==='ready'&&now-S.t>.3?true:'wait';
    }
    ,'blue','LOCKED IN','<span>Two hits in a row with the same hitter and he is <i>LOCKED IN</i>.</span><ul><li>He comes up with <i>Overdrive ready</i> every at-bat, on top of the team’s own Juice bar.</li><li>It is still your call: press the Overdrive button to use it.</li><li>It lasts until that hitter makes an <i>out</i>.</li></ul>');
  }
  catch(e){
  }
}


// ───────── juiceTap  (index.html L5192)
function juiceTap(){
  const t=performance.now();
  if(t-jTapT<250)return;
  jTapT=t;
  // one press, one toggle, even if the browser reports the touch twice
  if(S.over){
    if(!S.overOn){
      S.overOn=true;
      if(!odEver){
        odEver=true;
        try{
          localStorage.setItem('mm_od','1');
        }
        catch(e){
        }
      }
      SND.zap();
      buzz([20,30,60]);
      S.odUses=(S.odUses||0)+1;
      if(S.odUses===1&&!pOD()){
        S.pOver=false;
        S.podPending=false;
      }
      // the first Overdrive of a game is always yours alone: he can't answer it, and if he was in his own he backs off
      else if(!S.pOver&&S.heat>=.33&&podOK()){
        S.pOver=true;
        S.podPending=true;
        S.duelPend=true;
      }
      /* after that, the pitcher answers. HE IS SEEN ANSWERING: the picture cuts to him catching fire with his callout first (his usual Overdrive reveal), and only THEN does the Showdown banner come up, back at the batting camera. It used to go straight from your tap to the Showdown banner, which came out of nowhere. */
      if(!S.duelPend)duelCheck();
      // NEVER A QUICK PITCH AFTER THE TAP: the hitter gets a good two seconds to settle. If the pitcher had already started his delivery he steps off and starts again.
      if(S.state==='windup'&&!released){
        S.state='ready';
        S.t=now;
        readyDur=2;
        pitch=null;
        S.pitches=Math.max(0,(S.pitches|0)-1);
      }
      else if(S.state==='ready'&&readyDur-(now-S.t)<2)S.t=now-(readyDur-2);
    }
    else if(!S.odSeen&&(S.state==='ready'||(S.state==='windup'&&!pitch))){
      // changed your mind: tap again before the pitch is thrown and it switches back off, still fully charged
      S.overOn=false;
      S.odUses=Math.max(0,(S.odUses||0)-1);
      if(S.duel){
        S.duel=false;
        $('hud').classList.remove('duel');
      }
      buzz(20);
      timing('OVERDRIVE OFF · STILL CHARGED','#9aa3c7',2);
    }
  }
  else juiceArmed=!juiceArmed;
  hud();
}
