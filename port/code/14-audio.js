// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── crowdFx  (index.html L3302)
function crowdFx(dt){
  if(REDUCE||!EYE.cm)return;
  crowdE=Math.max(0,crowdE-dt*.42);
  crowdShow+=(crowdE-crowdShow)*Math.min(1,dt*6);
  const e=crowdShow,t=performance.now()/1000,b=.8+.7*e+.06*e*Math.sin(t*9);
  /* a quiet crowd sits a shade darker under the lamps; an excited one is far brighter than before */
  if(CROWD_WAVE){
    const k=clamp((e-.45)/.4,0,1);
    CROWD_WAVE.opacity=.5*k;
    if(k>0)CROWD_WAVE.map.offset.x=(-t*.55)%1;
  }
  EYE.cm.color.setScalar(b);
  EYE.fm.color.setScalar(b);
  EYE.crowd.offset.y=Math.sin(t*11)*.0035*e;
  EYE.fans.offset.y=Math.sin(t*11+2.1)*.012*e;
  if(!FLASH.pts){
    const g=new T.BufferGeometry();
    g.setAttribute('position',new T.BufferAttribute(new Float32Array(FLASH.n*3).fill(-999),3));
    FLASH.pts=new T.Points(g,new T.PointsMaterial({
      map:glowTex,color:0xffffff,size:7.5,sizeAttenuation:true,transparent:true,blending:T.AdditiveBlending,depthWrite:false,fog:false
    }
    ));
    FLASH.pts.frustumCulled=false;
    scene.add(FLASH.pts);
  }
  const P=FLASH.pts.geometry.attributes.position;
  let spawn=(.8+70*e*e)*dt;
  // a few sparkles at rest, a storm of them when the place erupts
  for(let i=0;
  i<FLASH.n;
  i++){
    if(FLASH.life[i]>0){
      FLASH.life[i]-=dt;
      if(FLASH.life[i]<=0)P.setXYZ(i,0,-999,0);
    }
    else if(spawn>0&&Math.random()<spawn){
      spawn-=1;
      FLASH.life[i]=rand(.07,.17);
      standPt(_s0);
      P.setXYZ(i,_s0.x,_s0.y,_s0.z);
    }
  }
  P.needsUpdate=true;
}


// ───────── sfx  (index.html L3395)
function sfx(name,vol=1,rate=1){
  const b=SFX[name];
  if(!AC||!b)return false;
  const s=AC.createBufferSource(),g=AC.createGain();
  s.buffer=b;
  s.playbackRate.value=rate;
  g.gain.value=vol;
  s.connect(g);
  g.connect(master);
  s.start();
  return true;
}


// ───────── audioInit  (index.html L3417)
function audioInit(){
  if(AC)return;
  try{
    AC=new (window.AudioContext||window.webkitAudioContext)();
  }
  catch(e){
    return;
  }
  master=AC.createGain();
  master.gain.value=muted?0:VOLS[volI];
  /* LOUD, BUT WITH A CEILING. Everything goes through one limiter before the speaker: the crowd still swells and a homer still hits hard, but when
     the roar, the organ, the crack of the bat and the fireworks all land together the total is held down instead of stacking up. Then the whole mix
     is trimmed about 3 dB, because it was hot even with the phone's volume low. */
  try{
    const lim=AC.createDynamicsCompressor();
    lim.threshold.value=-18;
    lim.knee.value=10;
    lim.ratio.value=6;
    lim.attack.value=.004;
    lim.release.value=.22;
    const trim=AC.createGain();
    trim.gain.value=.56;
    /* (a second notch down, about 2 dB more: still loud, less hot) */
    master.connect(lim);
    lim.connect(trim);
    trim.connect(AC.destination);
    MASTER_OUT={
      lim,trim
    }
    ;
  }
  catch(e){
    master.connect(AC.destination);
  }
  noiseBuf=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);
  const d=noiseBuf.getChannelData(0);
  for(let i=0;
  i<d.length;
  i++)d[i]=Math.random()*2-1;
  // (noiseBuf is still used for short percussive effects: the bat crack, the glove snap, the zap. There is no hiss crowd any more:
  // the crowd is the recording or nothing.)
  crowdGain=AC.createGain();
  crowdGain.gain.value=0;
  zoneLP=AC.createBiquadFilter();
  zoneLP.type='lowpass';
  zoneLP.frequency.value=20000;
  zoneLP.Q.value=.6;
  crowdGain.connect(zoneLP);
  zoneLP.connect(master);
  loadSfx(null);
}


// ───────── noise  (index.html L3429)
function noise(dur,type,f0,f1,vol,q=1,delay=0){
  if(!AC)return;
  const t=AC.currentTime+delay,s=AC.createBufferSource();
  s.buffer=noiseBuf;
  const f=AC.createBiquadFilter();
  f.type=type;
  f.Q.value=q;
  f.frequency.setValueAtTime(f0,t);
  f.frequency.exponentialRampToValueAtTime(f1,t+dur);
  const g=AC.createGain();
  g.gain.setValueAtTime(vol,t);
  g.gain.exponentialRampToValueAtTime(.001,t+dur);
  s.connect(f);
  f.connect(g);
  g.connect(master);
  s.start(t,Math.random());
  s.stop(t+dur+.02);
}


// ───────── tone  (index.html L3432)
function tone(type,f0,f1,dur,vol,delay=0){
  if(!AC)return;
  const t=AC.currentTime+delay,o=AC.createOscillator();
  o.type=type;
  o.frequency.setValueAtTime(f0,t);
  o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);
  const g=AC.createGain();
  g.gain.setValueAtTime(vol,t);
  g.gain.exponentialRampToValueAtTime(.001,t+dur);
  o.connect(g);
  g.connect(master);
  o.start(t);
  o.stop(t+dur+.02);
}


// ───────── roar  (index.html L3437)
function roar(level,ramp,top,now1){
  crowdE=Math.max(crowdE,Math.min(1,level));
  if(!AC)return;
  const t=AC.currentTime,b=SFX.cheer_big;
  if(!roarG&&top&&SFX.pop_max){
    // the biggest moments: the whole place comes unglued. The recording's own build-up plays once, then its sustained peak loops.
    const pb=SFX.pop_max,src=AC.createBufferSource();
    roarG=AC.createGain();
    roarG.gain.value=.6*level;
    roarG.connect(master);
    src.buffer=pb;
    src.loop=true;
    src.loopStart=3.5;
    src.loopEnd=Math.max(5,pb.duration-1.5);
    {
      const pg=AC.createGain();
      pg.gain.value=1.9;
      src.connect(pg);
      pg.connect(roarG);
    }
    src.start(t,now1?3.5:0);
    roarS=[src];
    roarTop=true;
    if(!now1)return;
  }
  // now1: skip the recording's own build-up and go straight to the peak
  if(!b)return;
  if(!roarG){
    roarG=AC.createGain();
    roarG.gain.value=0;
    roarG.connect(master);
    roarS=[[.8,1],[1.9,1.06]].map(o=>{
      const src=AC.createBufferSource();
      src.buffer=b;
      src.loop=true;
      src.loopStart=.8;
      src.loopEnd=Math.max(1.6,Math.min(3,b.duration-.6));
      src.playbackRate.value=o[1];
      src.connect(roarG);
      src.start(t,o[0]);
      return src;
    }
    );
  }
  const g=roarG.gain;
  g.cancelScheduledValues(t);
  g.setValueAtTime(g.value,t);
  g.linearRampToValueAtTime(Math.min(roarTop?.86:1.2,(roarTop?.6:.62)*level),t+ramp);
}


// ───────── roarOff  (index.html L3447)
function roarOff(fade=3.6){
  // a crowd comes down in a long tail, quick at first and then lingering: never a switch
  if(!roarG)return;
  const t=AC.currentTime,g=roarG.gain,ss=roarS;
  roarG=null;
  roarS=[];
  roarTop=false;
  roarHR=false;
  const lvl=g.value;
  g.cancelScheduledValues(t);
  g.setValueAtTime(lvl,t);
  g.setTargetAtTime(0,t,fade/3.2);
  ss.forEach(x=>{
    try{
      x.stop(t+fade*1.7);
    }
    catch(e){
    }
  }
  );
  if(crowdReal&&lvl>.2&&fade>1.5){
    // and the bed stays lifted underneath, settling over the next several seconds, so the next pitch arrives into a buzz, not a void
    const b=crowdGain.gain;
    b.cancelScheduledValues(t);
    b.setValueAtTime(Math.max(b.value,crowdBase*(1.3+.6*Math.min(1,lvl))),t);
    b.setTargetAtTime(crowdBase,t+.6,1.7);
    crowdCool=t+6;
    crowdNext=t+7;
    if(lvl>.45)setTimeout(()=>{
      if(!roarG)sfxSlice('cheer',.22,rand(.92,1.02),rand(1.6,2.2),2.4);
    }
    ,900);
  }
}


// ───────── sfxSlice  (index.html L3455)
function sfxSlice(name,vol,rate,off,dur){
  const b=SFX[name];
  if(!AC||!b)return false;
  const t=AC.currentTime,src=AC.createBufferSource(),g=AC.createGain();
  src.buffer=b;
  src.playbackRate.value=rate;
  off=Math.min(off,Math.max(0,b.duration-dur*rate-.05));
  g.gain.setValueAtTime(0,t);
  g.gain.linearRampToValueAtTime(vol,t+.12);
  g.gain.setValueAtTime(vol,t+Math.max(.15,dur-.7));
  g.gain.linearRampToValueAtTime(0,t+dur);
  src.connect(g);
  g.connect(master);
  src.start(t,off,dur*rate+.05);
  if(/cheer|pop_|boo/.test(name)){
    CSL.push({
      g,src,end:t+dur
    }
    );
    if(CSL.length>12)CSL.shift();
  }
  return true;
}


// ───────── crowdHush  (index.html L3460)
function crowdHush(fade=.6){
  if(!AC)return;
  const t=AC.currentTime;
  try{
    roarOff(fade);
  }
  catch(e){
  }
  CSL.forEach(c=>{
    if(c.end<=t)return;
    try{
      c.g.gain.cancelScheduledValues(t);
      c.g.gain.setValueAtTime(c.g.gain.value,t);
      c.g.gain.setTargetAtTime(0,t,fade/3);
      c.src.stop(t+fade*1.5);
    }
    catch(e){
    }
  }
  );
  CSL.length=0;
  if(crowdReal){
    const b=crowdGain.gain;
    b.cancelScheduledValues(t);
    b.setValueAtTime(b.value,t);
    b.setTargetAtTime(crowdBase*.8,t,fade/2);
    crowdCool=t+3;
    crowdNext=t+4;
    cheerBusy=0;
  }
}


// ───────── crowdRise  (index.html L3467)
function crowdRise(q,dur,big){
  crowdE=Math.max(crowdE,big?.8:.35+.3*q);
  if(!AC||!crowdReal||roarG)return;
  const t=AC.currentTime,g=crowdGain.gain;
  // the bed is a continuous recording, so holding it up for the whole flight is what guarantees the park never goes quiet while the ball is in the air
  g.cancelScheduledValues(t);
  g.setValueAtTime(g.value,t);
  g.linearRampToValueAtTime(crowdBase*(big?2.8:1.9+.8*q),t+.18);
  g.setTargetAtTime(crowdBase,t+Math.max(.8,dur+.4),.7);
  if(big)sfxSlice('cheer_big',.8,rand(.97,1.05),rand(0,.3),clamp(dur+1.2,2.2,3.6));
  // squared up with the POWER swing ('CRUSHED!', 'OBLITERATED!'): the place jumps, home run or not
  cheerBusy=t+1.2;
  crowdNext=t+dur+2;
}


// ───────── crowdHold  (index.html L3473)
function crowdHold(d){
  if(!AC||!crowdReal||roarG)return;
  const t=AC.currentTime,g=crowdGain.gain;
  g.cancelScheduledValues(t);
  g.setTargetAtTime(crowdBase*2,t,.2);
  g.setTargetAtTime(crowdBase,t+d,.9);
  crowdNext=t+d+2;
}


// ───────── crowdDrop  (index.html L3474)
function crowdDrop(){
  if(!AC||!crowdReal||roarG)return;
  const t=AC.currentTime,g=crowdGain.gain;
  g.cancelScheduledValues(t);
  g.setTargetAtTime(crowdBase*.85,t,.2);
  g.setTargetAtTime(crowdBase,t+1.6,.9);
  sfxSlice('cheer',.3,rand(.6,.68),rand(.6,1.4),1.6);
  cheerBusy=t+1.6;
  crowdNext=t+3.2;
}


// ───────── crowdOut  (index.html L3480)
function crowdOut(q){
  if(!AC||!crowdReal)return;
  const t=AC.currentTime,g=crowdGain.gain,hard=q>.4;
  g.cancelScheduledValues(t);
  g.setValueAtTime(Math.max(g.value,crowdBase*1.3),t);
  g.setTargetAtTime(crowdBase*(hard?1.7:1.3),t,.1);
  g.setTargetAtTime(crowdBase,t+(hard?1.8:1.1),.9);
  // several different reactions, and never the same one twice running
  const boos=['boo1','boo2','boo3'].filter(n=>SFX[n]),bn=boos[(Math.random()*boos.length)|0];
  const V=hard?[
  ()=>sfxSlice('cheer_big',.34+.3*q,rand(1.08,1.18),rand(.2,.6),rand(1.7,2.1)),
  // sharp, surprised 'OHH!'
  ()=>sfxSlice('cheer',.7,rand(1.14,1.24),rand(.7,1.2),1.6),
  // a quick bright burst
  ()=>bn&&sfxSlice(bn,.34,rand(.78,.86),rand(.3,2),1.7),
  // a low groan
  ()=>sfxSlice('cheer_big',.3+.2*q,rand(.8,.88),rand(.4,.9),2.1),
  // a deeper, longer 'ohhh'
  ()=>{
    sfxSlice('cheer',.5,rand(.98,1.06),rand(.8,1.3),1.2);
    if(bn)setTimeout(()=>sfxSlice(bn,.26,rand(.82,.9),rand(.3,2),1.4),450);
  }
  // burst, then the air goes out
  ]:[
  ()=>sfxSlice('cheer',.42,rand(.95,1.05),rand(.7,1.3),1.5),
  // a ripple
  ()=>bn&&sfxSlice(bn,.24,rand(.8,.9),rand(.3,2),1.4),
  // a murmur of a groan
  ()=>sfxSlice('cheer',.34,rand(.7,.78),rand(.6,1.2),1.6)
  // a low 'aww'
  ];
  let i;
  do{
    i=(Math.random()*V.length)|0;
  }
  while(i===outLast&&V.length>1);
  outLast=i;
  V[i]();
  cheerBusy=t+1.8;
  crowdNext=t+3.4;
}


// ───────── crowdTick  (index.html L3498)
function crowdTick(dt){
  if(!AC||!crowdReal||roarG||S.state==='title'||S.state==='over')return;
  const t=AC.currentTime,live=S.state==='windup'||S.state==='pitch';
  if(live!==(crowdSt==='live')){
    crowdSt=live?'live':'';
    const g=crowdGain.gain;
    // the hush as the pitcher comes set, released if nothing comes of the pitch
    if(live){
      if(t>crowdCool){
        g.cancelScheduledValues(t);
        g.setTargetAtTime(crowdBase*.72,t,.3);
      }
    }
    else if(t>cheerBusy&&t>crowdCool)g.setTargetAtTime(crowdBase,t,.4);
  }
  // no hush while the crowd is still coming down from something big
  if(live||t<crowdNext)return;
  crowdNext=t+rand(2.2,5);
  if(t>cheerBusy){
    const g=crowdGain.gain;
    g.cancelScheduledValues(t);
    g.setTargetAtTime(crowdBase*rand(.9,1.2),t,.7);
    g.setTargetAtTime(crowdBase,t+1.4,.8);
  }
}


// ───────── roarTick  (index.html L3573)
function roarTick(){
  if(roarG&&roarG.gain.value>=(roarTop?.66:.95))rumble=1;
  // at its very loudest the crowd shakes the camera itself
  if(!AC||!roarG||!roarHR)return;
  const t=AC.currentTime;
  if(t<roarWave)return;
  roarWave=t+rand(.8,1.4);
  sfxSlice('cheer_big',clamp(roarG.gain.value*1.15,.3,.8),rand(.95,1.12),rand(0,.25),rand(1.4,1.9));
}


// ───────── crowdPump  (index.html L3581)
function crowdPump(k=1){
  if(!AC)return;
  const t=AC.currentTime;
  if(roarG){
    const g=roarG.gain;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value,t);
    g.linearRampToValueAtTime(Math.min(roarTop?1:1.25,g.value*1.45+.12*k),t+.35);
  }
  else roar(.95*k,.3);
  sfxSlice('cheer_big',.5*k,rand(1,1.06),rand(0,.3),2.6);
  cheerBusy=t+2.4;
}


// ───────── boo  (index.html L3608)
function boo(vol){
  const have=['boo1','boo2','boo3'].filter(n=>SFX[n]);
  if(!AC||!have.length||roarG)return;
  sfxSlice(have[(Math.random()*have.length)|0],vol,rand(.94,1.06),rand(0,2.4),rand(2.4,3.3));
  cheerBusy=AC.currentTime+2.4;
}


// ───────── cheer  (index.html L3610)
function cheer(level,dur){
  crowdE=Math.max(crowdE,Math.min(1,level*1.6));
  if(!AC)return;
  if(!crowdReal)level*=.25;
  const t=AC.currentTime,g=crowdGain.gain;
  if(crowdReal){
    // the ambience swells a little; the reaction itself is a recorded cheer on top
    if(roarG){
    }
    else if(level>=.5&&SFX.pop_max){
      sfxSlice('pop_max',.6,1,0,4.6);
      cheerBusy=t+4;
    }
    else if(level>=.4){
      sfxSlice('cheer_big',.95,rand(.95,1.06),rand(0,.4),3.4);
      cheerBusy=t+3;
    }
    else if(level>=.2&&t>cheerBusy-1.2){
      sfxSlice('cheer',.45+level,rand(.9,1.12),rand(0,1.6),rand(2.4,3.2));
      cheerBusy=t+2.6;
    }
    level=crowdBase*clamp(Math.sqrt(level/.05),.6,2.2);
  }
  g.cancelScheduledValues(t);
  g.setValueAtTime(g.value,t);
  g.linearRampToValueAtTime(level,t+.25);
  g.setTargetAtTime(crowdBase,t+dur,.9);
}
