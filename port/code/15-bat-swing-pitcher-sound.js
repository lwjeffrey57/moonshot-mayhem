// Extra functions pulled for the batting-feel pass: the bat in the hands, the swing and stance clips, the pitcher's delivery, the flash and bursts, vibration.
// Reformatted one statement per line; logic and numbers unchanged from index.html.


// ───────── clipBat  (index.html L5470)
function clipBat(){
  const C=MX.clip;
  C.hL.getWorldPosition(_pl);
  C.mL.getWorldPosition(_b);
  _pl.lerp(_b,.55);
  C.hL.getWorldQuaternion(_hq);
  _bd.copy(C.dl).applyQuaternion(_hq).normalize();
  if(C.upW>0){
    _t1.copy(_bd).multiplyScalar(.3).add(_t2.set(0,.7,0)).normalize();
    _bd.lerp(_t1,C.upW).normalize();
  }
  // carried upright on the walk to the plate
  if(C.dnW>0){
    C.hips.getWorldQuaternion(_q3);
    _t1.set(0,0,-1).applyQuaternion(_q3);
    _t1.y=0;
    _t1.normalize().multiplyScalar(.5).add(_t2.set(0,-.86,0)).normalize();
    _bd.lerp(_t1,C.dnW).normalize();
  }
  // sad walk: barrel down and trailing behind him, dragging
  if(C.flatW>0){
    C.hips.getWorldQuaternion(_q3);
    _t1.set(1,0,0).applyQuaternion(_q3);
    _t1.y=0;
    _t1.normalize();
    _bd.lerp(_t1,C.flatW).normalize();
    _pl.y=Math.max(_pl.y,.07);
  }
  // push-ups: bat lies flat under his hand, across his body
  if(C.crW>0&&C.hR){
    // crouched stance: the hands sit differently, so run the bat through both hands and stand it up more
    C.hR.getWorldPosition(_t1);
    C.mR.getWorldPosition(_t2);
    _t1.lerp(_t2,.55).sub(_pl);
    if(_t1.lengthSq()>1e-4){
      _t1.normalize().multiplyScalar(.55).add(_t2.set(0,.45,0)).normalize();
      _bd.lerp(_t1,C.crW).normalize();
    }
  }
  {
    const bu=C.bi!==undefined&&LINEUP[C.bi%LINEUP.length].up;
    if(bu&&!C.upW&&!C.dnW&&!C.flatW&&!C.liftW){
      const w=bu*(1-clamp((C.h||0)*4,0,1));
      if(w>0)_bd.lerp(_t1.set(0,1,0),w).normalize();
    }
  }
  /* a hitter whose hands sit oddly on this body carries the bat more upright in his stance (it eases back into the swing's own line as he starts it) */
  /* THE WAGGLE: a hitter with one keeps the barrel moving while he waits, tipping it toward the pitcher and back in a small loop (the hands hold still; phone capture does not pick up wrist roll, so the bat's own motion is added here). It stops the instant he starts his swing. */
  {
    const lw=C.bi!==undefined?LINEUP[C.bi%LINEUP.length]:null;
    if(lw&&lw.wag&&C.stW>0&&!C.flatW&&!C.liftW){
      const w=C.stW*(1-clamp((C.h||0)*4,0,1)),ph=now*lw.wag;
      if(w>0){
        _bd.z-=(Math.sin(ph)*.4+.12)*w;
        _bd.x+=Math.cos(ph)*.16*w;
        _bd.normalize();
      }
    }
  }
  if(C.liftW>0&&C.hR){
    // clean and jerk: the bat is the barbell, gripped in both hands and centerd between them
    C.hR.getWorldPosition(_t1);
    C.mR.getWorldPosition(_t2);
    _t1.lerp(_t2,.55);
    _t2.copy(_t1).sub(_pl);
    if(_t2.lengthSq()>1e-4){
      _t2.normalize();
      _pl.add(_t1).multiplyScalar(.5).addScaledVector(_t2,-.36);
      _bd.copy(_t2);
    }
  }
  // THE BAT NEVER GOES THROUGH HIS HEAD OR NECK, on any body: if the barrel's line would pass inside either, it is tipped just far enough to clear.
  if(C.head&&!C.flatW&&!C.liftW){
    const keep=(c,r)=>{
      const t=clamp(_t1.copy(c).sub(_pl).dot(_bd),.1,.92);
      _t2.copy(_pl).addScaledVector(_bd,t).sub(c);
      const d=_t2.length();
      if(d<r){
        if(d<1e-4)_t2.set(1,0,0);
        else _t2.multiplyScalar(1/d);
        _t1.copy(c).addScaledVector(_t2,r).sub(_pl);
        if(_t1.lengthSq()>1e-6)_bd.copy(_t1).normalize();
      }
    }
    ;
    C.head.getWorldPosition(_bk0);
    let hr=.11;
    if(C.top){
      C.top.getWorldPosition(_bk1);
      hr=clamp(_bk0.distanceTo(_bk1)*.62,.09,.26);
      _bk0.lerp(_bk1,.5);
    }
    keep(_bk0,hr+.05);
    if(C.neck){
      C.neck.getWorldPosition(_bk1);
      keep(_bk1,.1);
    }
  }
  bat.position.copy(_pl).addScaledVector(_bd,-.07);
  bat.quaternion.setFromUnitVectors(UP,_bd);
  bat.updateMatrixWorld(true);
}


// ───────── gripIK  (index.html L5495)
function gripIK(C){
  if(!C.aR||!C.fR||!C.hR||C.upW||C.dnW||C.flatW||C.liftW)return;
  const [Sp,E,H,G,Tg,ax]=_ik;
  C.hR.getWorldPosition(H);
  C.mR.getWorldPosition(G);
  G.lerp(H,.45);
  Tg.copy(_pl).addScaledVector(_bd,.1);
  /* G: where the top hand grips; Tg: where on the handle it belongs */
  const far=G.distanceTo(Tg);
  if(far<.012||far>.34)return;
  C.hR.getWorldQuaternion(_ikh);
  /* the hand keeps the grip it had: only the arm moves to carry it there */
  const k=1-clamp((far-.2)/.14,0,1);
  Tg.sub(G).multiplyScalar(k).add(H);
  /* Tg is now where the hand joint itself must go */
  C.aR.getWorldPosition(Sp);
  C.fR.getWorldPosition(E);
  const l1=Sp.distanceTo(E),l2=E.distanceTo(H),d=clamp(Sp.distanceTo(Tg),Math.abs(l1-l2)+.01,l1+l2-.004);
  const a0=_t1.copy(Sp).sub(E).angleTo(_t2.copy(H).sub(E)),a1=Math.acos(clamp((l1*l1+l2*l2-d*d)/(2*l1*l2),-1,1));
  ax.copy(_t1).cross(_t2);
  if(ax.lengthSq()>1e-10){
    ikTurn(C.fR,_ikq.setFromAxisAngle(ax.normalize(),a1-a0));
    C.hR.getWorldPosition(H);
  }
  _t1.copy(H).sub(Sp).normalize();
  _t2.copy(Tg).sub(Sp).normalize();
  ikTurn(C.aR,_ikq.setFromUnitVectors(_t1,_t2));
  C.hR.parent.getWorldQuaternion(_ikp);
  C.hR.quaternion.copy(_ikp.invert()).multiply(_ikh);
  C.hR.updateMatrixWorld(true);
}


// ───────── setupClip  (index.html L5504)
function setupClip(obj,clip,B,sk){
  const keep=c=>{
    if(c)c.tracks=c.tracks.filter(t=>/quaternion$/.test(t.name)||/Hips\.position$/.test(t.name));
    return c;
  }
  ;
  keep(clip);
  const ic=keep(obj.animations.find(c=>c.name==='idle')),sc=keep(obj.animations.find(c=>c.name==='strike'));
  scene.add(obj);
  scene.add(bat);
  obj.rotation.y=PI;
  obj.position.set(0,0,0);
  const hL=B('LeftHand'),hR=B('RightHand'),mL=B('LeftHandMiddle1'),mR=B('RightHandMiddle1');
  const C=MX.clip={
    hL,mL,hR,mR,head:B('Head'),top:B('HeadTop_End'),neck:B('Neck'),crW:0,dl:new V3(),spine:B('Spine'),hips:B('Hips'),t:0,st:0,c0:0,h:0,sk:0,mode:'idle',sw:null
  }
  ;
  // pose the skeleton from one clip at a time while measuring
  const probe=(c,fn)=>{
    const m=new T.AnimationMixer(obj);
    m.clipAction(c).play();
    fn(t=>{
      m.setTime(t);
      obj.updateMatrixWorld(true);
    }
    );
    m.stopAllAction();
    m.uncacheRoot(obj);
  }
  ;
  // grip axis in the bottom hand's frame, taken from the stance so both hands sit on the handle
  const pa=new V3(),pb=new V3(),q=new T.Quaternion();
  probe(ic||clip,at=>{
    const n=ic?ic.duration:.5;
    for(let t=.05;
    t<n;
    t+=n/10){
      at(t);
      hL.getWorldPosition(pa).lerp(mL.getWorldPosition(_b),.55);
      hR.getWorldPosition(pb).lerp(mR.getWorldPosition(_b),.55);
      hL.getWorldQuaternion(q);
      C.dl.add(pb.sub(pa).normalize().applyQuaternion(q.invert()));
    }
  }
  );
  C.dl.normalize();
  if(MX.dlRef){
    C.dl.copy(MX.dlRef);
    C.ik=true;
    C.aR=B('RightArm');
    C.fR=B('RightForeArm');
  }
  /* another body: the bat sits in the bottom hand exactly as it does in the house model's, and the top hand is brought to the handle (gripIK) */
  // contact = the frame the bat is square to the pitch: pointing straight out over the plate, at hitting height
  const sp=new V3(),contact=(c,t0,t1,fb)=>{
    let r=fb,best=-1e9;
    probe(c,at=>{
      for(let t=t0;
      t<Math.min(t1,c.duration);
      t+=1/120){
        at(t);
        clipBat();
        sp.set(0,.62,0);
        bat.localToWorld(sp);
        if(sp.y<1.25&&_bd.x>best){
          best=_bd.x;
          r=t;
        }
      }
    }
    );
    return r;
  }
  ;
  const tC=contact(clip,.3,1.8,.69);
  C.tC=tC;
  C.tL=Math.max(.1,tC-.22);
  C.tE=Math.min(clip.duration,tC+.6);
  C.loadAt=clamp(1.2-C.tL/1.25,.3,.85);
  // when in the windup to start loading, so he is set just after release
  probe(clip,at=>{
    at(tC);
    clipBat();
    const sw=bat.localToWorld(new V3(0,.62,0));
    obj.position.set(clamp(-sw.x,-1.5,-.5),0,clamp(-sw.z,-.1,.12));
    C.y0=sw.y;
  }
  );
  // keep him in the batter's box: measure where his feet are in the stance and at contact, and back him off the plate if needed
  {
    const v=new V3();
    let fx=-1e9;
    const feet=['LeftFoot','RightFoot','LeftToeBase','RightToeBase'].map(B).filter(Boolean),far=()=>feet.forEach(f=>{
      fx=Math.max(fx,f.getWorldPosition(v).x);
    }
    );
    probe(ic||clip,at=>{
      at(0);
      far();
    }
    );
    probe(clip,at=>{
      at(tC);
      far();
    }
    );
    C.backOff=Math.min(0,BOX_EDGE-fx);
    obj.position.x+=C.backOff;
    C.baseX=obj.position.x;
    C.baseZ=obj.position.z;
  }
  if(sc){
    C.tCs=contact(sc,.4,1.8,1.1);
    C.sDur=sc.duration;
  }
  const mixer=C.mixer=new T.AnimationMixer(obj);
  C.hit=mixer.clipAction(clip);
  C.hit.play();
  if(ic){
    C.idle=mixer.clipAction(ic);
    C.idle.play();
    C.idleDur=ic.duration;
  }
  const ic2=keep(obj.animations.find(c=>c.name==='idle2'));
  if(ic2){
    C.idle2=mixer.clipAction(ic2);
    C.idle2.play();
    C.idle2.setEffectiveWeight(0);
    C.idle2Dur=ic2.duration;
  }
  // second stance: a deep crouch
  if(sc){
    C.strike=mixer.clipAction(sc);
    C.strike.play();
    C.strike.setEffectiveWeight(0);
  }
  // intros stay in the batter's box: work out how far each clip sits (or finishes) from where he stands in his stance
  const hipsAt=(c,ts)=>{
    const v=new V3(),sum=new V3();
    probe(c,at=>ts.forEach(t=>{
      at(t);
      C.hips.getWorldPosition(v);
      sum.add(v);
    }
    ));
    return sum.multiplyScalar(1/ts.length);
  }
  ,home=hipsAt(ic||clip,[0]);
  C.intros={
  }
  ;
  obj.animations.filter(c=>/^[wdcbq]_/.test(c.name)||/^st_/.test(c.name)||c.name==='a_look'||c.name==='run'||/^p_(loser|twerk|chicken|runman|fist|clap|threat|dying|boogie|joy|shuffle|wavy|town|chick2|outta|float|dosido|shrug)$/.test(c.name)).forEach(c=>{
    keep(c);
    if(c.name==='q_flykick'||c.name==='q_slide'||c.name==='q_takeout'||c.name==='run'||c.name==='w_hurricane'){
      const ht=c.tracks.find(t=>/Hips\.position$/.test(t.name));
      if(ht){
        const v=ht.values,z0=c.name==='q_takeout';
        for(let k=z0?0:3;
        k<v.length;
        k+=3){
          v[k]=z0?0:v[0];
          v[k+2]=z0?0:v[2];
        }
      }
    }
    /* these two play on the spot: the game moves him, so the kick lands him on the bag instead of carrying him past it */
    const loop=c.duration<2.5,ref=hipsAt(c,loop?[0,1,2,3,4,5,6,7].map(k=>k/8*c.duration):[c.duration-.02]);
    C.intros[c.name]=lazyAct(mixer,c,{
      dur:c.duration,loop,off:{
        x:home.x-ref.x,z:home.z-ref.z
      }
      ,loc:{
        x:-(ref.x-obj.position.x),z:-(ref.z-obj.position.z)
      }
    }
    );
  }
  );
  // loc: where the routine sits relative to the model's own origin
}


// ───────── updateClip  (index.html L5543)
function updateClip(dt){
  if(MX.clip.bi!==undefined&&MX.clip.bi!==MX.bshown){
    MX.bshown=MX.clip.bi;
    const b=LINEUP[MX.clip.bi%LINEUP.length].body||0;
    if(b&&!(MX.brigs&&MX.brigs[b])&&MX.batVar&&MX.batVar[b]&&MX.batRig){
      try{
        MX.batRig(b);
      }
      catch(e){
      }
    }
    /* his body has arrived but has not been dressed yet: dress it now rather than send the stand-in up */
    if(MX.brigs)batSwap(MX.brigs[b]?b:0);
  }
  /* decided once, as the new man is about to fade in */
  const C=MX.clip,o=MX.obj;
  let w=0,want=0,rate=.55,skT=0;
  o.rotation.y=PI;
  o.scale.x=Math.abs(o.scale.x);
  o.position.x=C.baseX;
  o.position.z=C.baseZ;
  // everything below is worked out right-handed; a lefty is mirrored at the end
  // The next hitter is announced as soon as a play ends, but the man on screen is still the one who just swung.
  // Keep showing him (and his side of the plate) until he is back in his stance, then fade to the new batter.
  if(S.bi>=0&&C.bi!==S.bi){
    if(C.bi===undefined){
      C.bi=S.bi;
      MX.lefty=!!curBatter().lh;
    }
    else if(C.swap==null&&S.state!=='trot'&&!(S.kOut&&now<S.kOut.t+DEFEAT)&&((C.mode==='idle'&&C.h<=.001)||(S.state==='ready'&&now-S.t>.6)||S.state==='walkup'||S.state==='pduel'))C.swap=0;
  }
  /* (while the player pitches there is always a man in the box) */
  // if the next hitter has a walk-up coming, the box stays empty after the last man fades out; he first appears in his intro
  const waitWalk=S.state!=='pduel'&&S.state!=='pask'&&S.bi>=0&&C.bi!==S.bi&&S.state!=='walkup'&&WALK.on&&S.fresh&&walkWant()&&!!C.intros[WALK.by[curBatter().name]];
  /* NO STAND-IN AT THE PLATE: if the next hitter's own body has not arrived yet, the box stays empty and the game waits for it (his download goes to the head of the line) instead of sending the stand-in up and changing him mid at-bat. Six seconds at most; after that the stand-in bats, as before. */
  let bodyWait=false;
  try{
    if(!PD.on&&S.bi>=0&&C.bi!==S.bi&&C.swap!=null&&MX._bwSkip!==S.bi){
      const b=curBatter().body||0;
      if(b&&b!==MX.bcur&&!(MX.brigs&&MX.brigs[b])&&!(MX.batVar&&MX.batVar[b])&&MX.batLoad){
        if(!MX._bw||MX._bw.bi!==S.bi){
          MX._bw={
            bi:S.bi,t:performance.now()
          }
          ;
          try{
            MX.batLoad(b);
            MX.batBoost(b);
          }
          catch(e){
          }
        }
        bodyWait=performance.now()-MX._bw.t<BODY_WAIT;
        if(bodyWait){
          window.__bwN=(window.__bwN||0)+1;
          if(S.state==='ready'||S.state==='walkup')S.t=now;
        }
      }
    }
  }
  catch(e){
  }
  HEAVY.bw=bodyWait;
  if(C.swap!=null){
    C.swap+=dt;
    if(waitWalk||bodyWait)C.swap=Math.min(C.swap,.2);
    if(C.swap>=.2&&C.bi!==S.bi&&!waitWalk&&!bodyWait){
      C.bi=S.bi;
      MX.lefty=!!curBatter().lh;
      C.mode='idle';
      C.h=0;
      C.sk=0;
      C.t=0;
    }
    batterOpacity(C.swap<.2?1-C.swap/.2:Math.min(1,(C.swap-.2)/.25));
    if(C.swap>=.45){
      C.swap=null;
      batterOpacity(1);
    }
  }
  if(S.state==='celly2'||S.state==='hbp'||S.state==='brawl'||S.state==='qte'||(S.state==='celebrate'&&LOCKFX.hr&&LOCKFX.plate&&LOCKFX.cel)){
    if(C.swap!=null&&S.state==='celebrate')C.swap=null;
    batterOpacity(1);
    try{
      o.visible=true;
    }
    catch(e){
    }
  }
  // the man who just doubled is on show at second, whatever the box is doing
  const incoming=S.state==='pitch'||(S.state==='windup'&&now-windupT0>C.loadAt)||(S.state==='pduel'&&(PD.ph===3||(PD.ph===2&&now-PD.wuT>.5))),wasInc=C._inc;
  C._inc=incoming;
  /* (the Kraken at the plate loads up for your pitch too) */
  if(swing&&C.sw!==swing){
    C.sw=swing;
    C.c0=C.t;
    C.mode='swing';
  }
  if(C.mode==='swing'){
    const ts=now-C.sw.t0;
    w=ts<SW_T?ease(ts/SW_T):clamp(1-(ts-SW_T-.1)/.3,0,1);
    if(ts<SW_T){
      C.t=lerp(C.c0,C.tC,ts/SW_T);
      want=1;
      C.h=Math.max(C.h,Math.min(1,ts/.06));
    }
    else if(C.sw.miss&&C.strike){
      C.mode='whiff';
      C.ws=C.sw.t0+SW_T;
    }
    // missed: hand over to the swing-and-miss clip
    else{
      C.t=Math.min(C.tE,C.tC+(ts-SW_T)*1.1);
      want=C.t<C.tE-.001||(flight&&flight.admire&&!flight.done&&now-flight.t0<flight.A+.4)?1:0;
      rate=.7;
      if(!want&&C.h<.01)C.mode='idle';
    }
    // follow-through done → flow back to the stance
  }
  if(C.mode==='whiff'){
    const u=now-C.ws;
    {
      const x=u*1.1,a=WHIFF_CUT[0],b=WHIFF_CUT[1];
      C.st=Math.min(C.sDur-.01,C.tCs+(x<a?x:a+b*(1-Math.exp(-(x-a)/b))));
    }
    skT=1;
    want=1;
    rate=.5;
    // play the miss and the first beat of the reaction, then ease back to the stance
    if(C.sk>.98)C.t=0;
    if(u>=WHIFF_HOLD||(incoming&&u>.6))C.mode='idle';
  }
  else if(C.mode==='idle'){
    // THE TAKE. He does not just go limp the instant the ball is past him: he stays loaded and watches it into the mitt, and on a pitch
    // close enough to tempt him he starts his hands, checks the swing, and brings the bat back. Then he relaxes into his stance.
    if(wasInc&&!incoming&&S.state!=='hbp'&&!(swing&&now-swing.t0<1.2)){
      C.takeT=now;
      let close=false;
      try{
        const P=PD.on?PD.pt:pitch;
        close=!!P&&P.tx>ZONE.x0-.24&&P.tx<ZONE.x1+.24&&P.ty>ZONE.y0-.24&&P.ty<ZONE.y1+.24&&!zoneHit(P.tx,P.ty);
      }
      catch(e){
      }
      C.chk=close;
    }
    /* THE TAKE: a ball just off the plate gets the full take (hands start, he checks it and brings the bat back); a strike he lets go, or one way out of the zone, gets the freeze: it locked him up */
    const tk=now-(C.takeT===undefined?-9:C.takeT),tkOn=!incoming&&tk<(C.chk?.66:.5)&&S.state!=='hbp';
    want=incoming||tkOn?1:0;
    if(incoming)C.t=Math.min(C.tL,C.t+dt*1.25);
    else if(tkOn)C.t=C.chk?C.tL+(C.tC-C.tL)*.5*Math.sin(Math.min(1,tk/.56)*PI):C.tL;
    else if(C.h<=.001){
      C.t=0;
      C.sk=0;
    }
    skT=C.sk>0&&!incoming&&C.h>.001?1:0;
  }
  C.h=clamp(C.h+clamp(want-C.h,-dt/rate,dt/.22),0,1);
  C.sk=clamp(C.sk+clamp(skT-C.sk,-dt/.25,dt/.12),0,1);
  const hw=C.idle?ease(C.h):1;
  // walk-up: his intro clip takes over; he stays facing the pitcher, so it plays as a taunt
  const intro=(S.state==='walkup'&&C.bi===S.bi)||wkPD()?C.intros[S.walkClip||WALK.by[curBatter().name]]:null;
  let base=intro?0:1;
  C.upW=intro&&S.walkClip==='w_walkin'?1:0;
  C.dnW=intro&&S.walkClip==='w_sad'?1:0;
  C.flatW=intro&&S.walkClip==='w_pushup'?1:0;
  C.liftW=(intro&&S.walkClip==='w_lift')||(S.state==='trot'&&TROT.cele&&TROT.clip==='w_lift')||(S.state==='celly2'&&D2.clip==='w_lift')?1:0;
  for(const k in C.intros)if(C.intros[k].made)C.intros[k].a.setEffectiveWeight(0);
  if(S.kOut&&C.bi===S.kOut.bi){
    const e=now-S.kOut.t,ci=C.intros[S.kOut.clip],k=ci&&e<DEFEAT?ease(clamp(e/.3,0,1))*ease(clamp((DEFEAT-e)/.3,0,1)):0;
    if(k>0){
      ci.a.time=Math.min(ci.dur-.01,e);
      ci.a.setEffectiveWeight(k);
      base=1-k;
      o.position.x+=ci.off.x*k;
      o.position.z+=ci.off.z*k;
    }
    if(S.kOut.rob&&e>-.05&&e<DEFEAT){
      o.position.x=23.5;
      o.position.z=-25.5;
    }
  }
  if(PD.on&&PD.frz){
    if(PD.ph>=2&&now>PD.frz.t+.5)PD.frz.d=Math.min(PD.frz.d,now-PD.frz.t+.25);
    if(now>=PD.frz.t){
      const e=now-PD.frz.t,D=PD.frz.d,ci=C.intros[PD.frz.clip],k=ci&&e<D?ease(clamp(e/.22,0,1))*ease(clamp((D-e)/.3,0,1)):0;
      if(k>0){
        ci.a.time=Math.min(ci.dur-.01,e);
        ci.a.setEffectiveWeight(k);
        base=Math.min(base,1-k);
      }
      else if(e>=D)PD.frz=null;
    }
  }
  /* (it lets go the moment you start the next pitch) */
  /* robbed: he is found where he was when it was caught, a few strides past first base, and that is where it sinks in */
  if(S.state==='celly2'&&C.intros[D2.clip]){
    const ci=C.intros[D2.clip],e=now-S.t;
    ci.a.time=ci.loop?e%ci.dur:Math.min(ci.dur-.01,Math.max(0,e));
    ci.a.setEffectiveWeight(1);
    base=0;
  }
  if((S.state==='hbp'||(S.state==='pduel'&&PD.hbpT))&&C.intros.c_hbpfall){
    const e=S.state==='hbp'?now-S.t:now-PD.hbpT,
    /* (the same going down and getting up when the player drills a batter on purpose) */
    fa=C.intros.c_hbpfall,kip=S.hbpKip&&C.intros.c_kipup,up=kip||C.intros.c_hbpup;
    // goes down, then (after the cut) gets back up (now and then with a kip-up)
    if(e<HB1||!up){
      fa.a.time=Math.min(fa.dur-.01,e);
      fa.a.setEffectiveWeight(1);
    }
    else{
      up.a.time=Math.min(up.dur-.01,(e-HB1)*(kip?1.2:1.55));
      up.a.setEffectiveWeight(1);
      if(kip)o.translateZ(.89*Math.abs(o.scale.z)*100);
    }
    base=0;
  }
  /* (the kip-up starts from where the fall left him lying) */
  if(S.state==='brawl'&&BRW.b){
    const Bq=BRW.b,st=C.intros.b_stance;
    let ci=C.intros[Bq.n]||st,te=now-Bq.t,loop=!!Bq.loop;
    if(!loop&&!Bq.hold&&te>ci.dur-.05){
      ci=st;
      loop=true;
    }
    ci.a.time=loop?te%ci.dur:Math.min(Bq.hold&&Bq.n==='b_liver'?1.45:ci.dur-.01,te);
    /* (the knockout blow: he goes down and STAYS down. That clip ends with him getting back to his feet, so it is stopped while he is on the floor) */
    ci.a.setEffectiveWeight(1);
    base=0;
    o.rotation.y=PI;
    o.position.x=BRW.bx;
    o.position.z=BRW.bz;
    o.position.y=.25*clamp(1-(Math.hypot(BRW.bx,BRW.bz+18.4)-.8)/1.9,0,1);
  }
  else if(S.state==='qte'&&QT.b){
    const Bq=QT.b,st=C.intros.b_stance;
    let ci=C.intros[Bq.n]||st,te=(now-Bq.t)*(Bq.rate||1),loop=!!Bq.loop;
    if(!loop&&!Bq.hold&&te>ci.dur-.05){
      ci=st;
      loop=true;
    }
    ci.a.time=Bq.freeze!==undefined?Bq.freeze:loop?te%ci.dur:Math.min(ci.dur-.01,Math.max(0,te));
    ci.a.setEffectiveWeight(1);
    base=0;
    o.rotation.y=QT.rry+(Bq.rot||0);
    o.position.x=QT.rx;
    o.position.z=QT.rz;
    o.position.y=QT.M&&QT.M.solo?-80:0;
  }
  /* (no runner in MAKE THE CATCH: he is kept out of the picture) */
  else if(o.position.y)o.position.y=0;
  if(S.state==='celebrate'&&LOCKFX.hr&&LOCKFX.plate&&LOCKFX.cel){
    // GETTING LOCKED IN at the plate: he is never just standing there with a fire on him, he celebrates in it
    if(!LOCKFX.clip||!C.intros[LOCKFX.clip]){
      const o=['p_boogie','c_fist','w_flair','w_bboy','p_fist'].filter(k=>C.intros[k]);
      LOCKFX.clip=o[(Math.random()*Math.min(3,o.length))|0]||'';
      LOCKFX.clipT=now;
    }
    /* (it was only ever looking for clips that do not loop, found none, and left him standing there, faded out) */
    const ci=C.intros[LOCKFX.clip];
    if(ci){
      const e=now-LOCKFX.clipT;
      ci.a.time=ci.loop?Math.max(0,e)%ci.dur:Math.min(ci.dur-.01,Math.max(0,e));
      ci.a.setEffectiveWeight(1);
      base=0;
      try{
        batterOpacity(1);
      }
      catch(x){
      }
    }
  }
  if(S.state==='trot'&&TROT.cele&&C.intros[TROT.clip]){
    const ci=C.intros[TROT.clip],e=now-S.t-TROT.celT;
    // he has touched home: his celebration, on the plate
    ci.a.time=ci.loop?e%ci.dur:Math.min(ci.dur-.01,Math.max(0,e));
    ci.a.setEffectiveWeight(1);
    base=0;
  }
  if(flight&&flight.admire&&!flight.done&&C.bi===S.bi){
    if(flight.cel===undefined){
      flight.cel=C.intros.c_fist&&DBG.fist?'c_fist':
      /* the fist-pump is no longer used in the box after a no-doubter: he holds the finish and flips the bat */
      flight.admire==='show'&&!flight.trot?(c=>c==='w_boxing'?'':c)(celClip(WALK.by[curBatter().name])):'';
      /* never the shadow-boxing routine here: no punching in the box after a no-doubter */
      // a single fist pump straight out of the swing, or his routine
      if(!flight.cel&&C.intros.a_look&&(DBG.look||Math.random()<.6))flight.cel='a_look';
      /* HAND OVER THE BROW: on a no-doubter he now often shades his eyes and watches it go, right there in the box */
      if(flight.cel==='c_fist')flight.A=Math.max(flight.A,1.25+C.intros.c_fist.dur+.1);
    }
    const ci=C.intros[flight.cel],tf=now-flight.t0,k=ci?ease(clamp((tf-1.25)/.3,0,1))*ease(clamp((flight.A+.35-tf)/.3,0,1)):0;
    if(k>0){
      if(!flight.celP){
        flight.celP=true;
        crowdPump(.8);
      }
      const e=tf-1.25;
      ci.a.time=ci.loop&&flight.cel!=='c_fist'?e%ci.dur:Math.min(ci.dur-.01,e);
      ci.a.setEffectiveWeight(k);
      base=1-k;
      if(flight.cel==='c_fist'){
        o.position.x+=ci.off.x*k;
        o.position.z+=ci.off.z*k;
      }
    }
  }
  if(intro){
    const e=now-S.t;
    intro.a.time=intro.loop?e%intro.dur:clamp(intro.dur-(WALK.dur-.25-e),0,intro.dur-.01);
    intro.a.setEffectiveWeight(1);
    // a walk-in is timed to arrive in the box as the intro ends
    o.position.x+=intro.off.x;
    o.position.z+=intro.off.z;
    const rem=WALK.dur-e;
    if(rem<.2&&C.swap==null)batterOpacity(Math.max(0,rem/.2));
    else if(C.swap==null&&C._opq!==S.t){
      C._opq=S.t;
      batterOpacity(1);
    }
  }
  /* (he is always solid for his walk-up: a fade left over from a play at a bag while pitching had him see-through) */
  C.hit.time=C.t;
  C.hit.setEffectiveWeight(base*hw*(1-C.sk));
  if(C.strike){
    C.strike.time=C.st;
    C.strike.setEffectiveWeight(base*hw*C.sk);
  }
  if(C.idle){
    const lb=C.bi>=0?LINEUP[C.bi%LINEUP.length]:null,sk=lb&&lb.stance&&C.intros&&C.intros[lb.stance]&&!window.__noStance?C.intros[lb.stance]:null,cr=!sk&&C.idle2&&lb&&lb.crouch?1:0,wI=base*(1-hw);
    // which stance this hitter uses
    /* MORE STANCES: a hitter can have a stance clip of his own (wide and squatted, or a second upright one). It takes the place of the standard stance while he waits; the swing itself is the same swing. */
    for(const k of STANCES){
      const q=C.intros&&C.intros[k];
      if(q&&(!sk||q!==sk)&&!(intro&&intro===q))q.a.setEffectiveWeight(0);
    }
    if(sk){
      sk.a.time=STANCE_HOLD[lb.stance]!==undefined?STANCE_HOLD[lb.stance]:(now*.9)%sk.dur;
      sk.a.setEffectiveWeight(wI);
    }
    C.stW=sk?wI:0;
    C.idle.time=(now*.9)%C.idleDur;
    C.idle.setEffectiveWeight(sk?0:wI*(1-cr));
    if(C.idle2){
      C.idle2.time=(now*.9)%C.idle2Dur;
      C.idle2.setEffectiveWeight(sk?0:wI*cr);
    }
    C.crW=wI*cr;
  }
  C.mixer.update(0);
  if(w>0){
    // lean the upper body so the barrel meets the height you aimed at
    const th=clamp((aim.y-C.y0)/.9,-.45,.45)*w*(MX.leanSign||1);
    C.spine.parent.getWorldQuaternion(_qp);
    C.spine.getWorldQuaternion(_qd);
    _q2.setFromAxisAngle(ZAX,th);
    _qd.premultiply(_q2);
    C.spine.quaternion.copy(_qp.invert()).multiply(_qd);
  }
  o.updateMatrixWorld(true);
  clipBat();
  if(C.ik)gripIK(C);
  if(MX.lefty&&S.state!=='qte'&&S.state!=='brawl'){
    // mirror the batter and his bat across the plate (not while he is away from it, in a brawl or a play on the bases: there he is placed directly)
    bat.position.x*=-1;
    _bd.x*=-1;
    bat.quaternion.setFromUnitVectors(UP,_bd);
    bat.updateMatrixWorld(true);
    o.scale.x=-o.scale.x;
    o.position.x=-o.position.x;
    o.updateMatrixWorld(true);
  }
  if(S.state==='celly2'&&C.intros[D2.clip]){
    const L=C.intros[D2.clip].loc;
    // on the bag at second, facing home
    const B=BASES[D2.base],th=D2.base===3?PI/4:0,cs=Math.cos(th),sn=Math.sin(th);
    // on third he faces down the line toward the plate
    o.scale.x=Math.abs(o.scale.x);
    o.rotation.y=th;
    o.position.set(B[0]-(L.x*cs+L.z*sn),0,B[1]-(-L.x*sn+L.z*cs));
    o.updateMatrixWorld(true);
    if(C.liftW)clipBat();
  }
  if(S.state==='trot'&&TROT.cele&&C.intros[TROT.clip]){
    // stand him on the plate facing the way he came in, up the third-base line toward home
    const L=C.intros[TROT.clip].loc,th=TROT.clip==='p_loser'?PI:PI/4,cs=Math.cos(th),sn=Math.sin(th);
    o.scale.x=Math.abs(o.scale.x);
    o.rotation.y=th;
    o.position.set(-(L.x*cs+L.z*sn),0,-(-L.x*sn+L.z*cs));
    o.updateMatrixWorld(true);
    if(C.liftW)clipBat();
  }
  // the bat follows him to where he now stands
  if(flight&&flight.admire){
    const F=flight,tf=now-F.t0;
    if(!F.done&&!MX.lefty&&tf>.35&&tf<F.A+.4){
      // watch it go: turn the head toward the ball
      const hd=C.head||(C.head=o.getObjectByName(C.hips.name.replace('Hips','Head')));
      if(hd){
        const k=.7*ease(clamp((tf-.35)/.4,0,1));
        hd.getWorldPosition(_a);
        _b.copy(ball.position).sub(_a).normalize();
        hd.getWorldQuaternion(_qd);
        _c.set(0,0,1).applyQuaternion(_qd);
        _q2.setFromUnitVectors(_c,_b);
        _q3.set(0,0,0,1).slerp(_q2,k);
        _qd.premultiply(_q3);
        hd.parent.getWorldQuaternion(_qp);
        hd.quaternion.copy(_qp.invert()).multiply(_qd);
        o.updateMatrixWorld(true);
      }
    }
    if(!F.bat&&tf>(F.admire==='show'?.75:1.0)){
      const flip=F.admire==='show';
      // let go of the bat: a casual drop, or a full flip on the big ones
      F.bat={
        p:bat.position.clone(),q:bat.quaternion.clone(),v:new V3((MX.lefty?-1:1)*(flip?-.9:-.4),flip?4.4:.9,flip?-.6:.2),ax:new V3(rand(-.3,.3),rand(-.2,.2),1).normalize(),w:flip?-15:-5,rest:false
      }
      ;
    }
    if(F.bat&&!C.liftW){
      const B=F.bat;
      if(!B.rest){
        B.v.y-=9.8*dt;
        B.p.addScaledVector(B.v,dt);
        _q2.setFromAxisAngle(B.ax,B.w*dt);
        B.q.premultiply(_q2);
        if(B.p.y<.06){
          B.p.y=.06;
          B.rest=true;
          _bd.set(0,1,0).applyQuaternion(B.q);
          _bd.y=0;
          if(_bd.lengthSq()<.01)_bd.set(1,0,0);
          _bd.normalize();
          B.q.setFromUnitVectors(UP,_bd);
        }
      }
      // comes to rest lying flat
      bat.position.copy(B.p);
      bat.quaternion.copy(B.q);
      bat.updateMatrixWorld(true);
    }
  }
}


// ───────── updateBatter  (index.html L6116)
function updateBatter(dt){
  if(MX.ready&&MX.on&&MX.clip){
    updateClip(dt);
    batAura();
    return;
  }
  const wantLoad=(S.state==='windup'&&now-windupT0>.5)||S.state==='pitch';
  batS.b=clamp(batS.b+(wantLoad?dt/.28:-dt/.4),0,1);
  let P;
  if(swing){
    const ts=now-swing.t0;
    const s=ts<SW_T?ts/SW_T*.5:Math.min(1,.5+(ts-SW_T)/.34*.5);
    // contact key follows the aim ring so the barrel goes where you point
    const low=clamp((1.0-aim.y)/.7,0,1);
    const cPose=lerpPose(POSE.bContact,POSE.bContact,0,tmpPose);
    cPose.lean=.34+.3*low;
    cPose.y=.83-.1*low;
    const cd=_t1.set(.1,-.1-.25*low+.18*clamp((aim.y-1)/.5,0,1),1).normalize();
    const ch=_t2.set(.12,aim.y,aim.x+.97).addScaledVector(cd,-.6);
    const C=[ch.clone(),cd.clone()];
    if(s<.5){
      const u=s*2;
      P=lerpPose(POSE.bLoad,cPose,ease(u));
      if(u<.5)seg(BK.load,BK.lag,ease(u*2));
      else seg(BK.lag,C,(u-.5)*2);
    }
    else{
      const u=(s-.5)*2,e=1-(1-u)*(1-u);
      P=lerpPose(cPose,POSE.bFollow,e);
      if(u<.3)seg(C,BK.thru,u/.3);
      else if(u<.65)seg(BK.thru,BK.wrap,(u-.3)/.35);
      else seg(BK.wrap,BK.fin,(u-.65)/.35);
    }
    batS.pose=P;
    batS.h.copy(_h);
    batS.d.copy(_d);
  }
  else{
    const tgt=lerpPose(POSE.bStance,POSE.bLoad,ease(batS.b));
    const k=1-Math.exp(-14*dt);
    batS.pose=lerpPose(batS.pose,tgt,k);
    P=batS.pose;
    seg(BK.stance,BK.load,ease(batS.b));
    const wag=(1-batS.b);
    _d.x+=Math.sin(now*5)*.09*wag;
    _d.z+=Math.cos(now*3.7)*.06*wag;
    _d.normalize();
    _h.y+=Math.sin(now*2.5)*.012*wag;
    batS.h.lerp(_h,k);
    batS.d.lerp(_d,k).normalize();
  }
  applyPose(batter,P,false);
  batter.root.updateMatrixWorld(true);
  // keep the knob within reach of the lead shoulder
  batter.shL.getWorldPosition(_s);
  batter.root.worldToLocal(_s);
  _h.copy(batS.h).sub(_s);
  if(_h.length()>.6)_h.setLength(.6);
  _h.add(_s);
  bat.position.copy(_h);
  bat.quaternion.setFromUnitVectors(UP,batS.d);
  bat.updateMatrixWorld(true);
  _t1.set(0,.05,0);
  bat.localToWorld(_t1);
  ik(batter.shL,batter.elL,_t1,batter.L1||.31,batter.L2||.33,POLE_L);
  _t2.set(0,.15,0);
  bat.localToWorld(_t2);
  ik(batter.shR,batter.elR,_t2,batter.L1||.31,batter.L2||.33,POLE_R);
  if(MX.ready&&!MX.clip)retarget();
  batAura();
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


// ───────── applyPose  (index.html L3150)
function applyPose(f,p,arms=true){
  const hw=f.hipW||.115,py=p.y-(f.yOff||0);
  f.upper.position.set(p.ux,py+(f.hipDrop||0),p.uz);
  f.upper.rotation.x=p.lean;
  f.hipL.position.set(hw+p.ux*.6,py,p.uz*.6);
  f.hipR.position.set(-hw+p.ux*.6,py,p.uz*.6);
  f.spine.rotation.y=p.yaw;
  f.spine.rotation.x=p.bend;
  f.pelvis.rotation.y=p.yaw*.55;
  f.hipL.rotation.set(p.hL[0],p.hL[1],p.hL[2]);
  f.kneeL.rotation.x=p.kL;
  f.footL.rotation.set(-(p.hL[0]+p.kL),0,-p.hL[2]);
  f.hipR.rotation.set(p.hR[0],p.hR[1],p.hR[2]);
  f.kneeR.rotation.x=p.kR;
  f.footR.rotation.set(-(p.hR[0]+p.kR),0,-p.hR[2]);
  f.head.rotation.y=p.head;
  if(arms){
    f.shL.rotation.set(p.sL[0],p.sL[1],p.sL[2]);
    f.elL.rotation.set(p.eL,0,0);
    f.shR.rotation.set(p.sR[0],p.sR[1],p.sR[2]);
    f.elR.rotation.set(p.eR,0,0);
  }
}


// ───────── mkGlove  (index.html L5657)
function mkGlove(kind){
  if(!GLOVE.sph){
    GLOVE.sph=new T.SphereGeometry(1,10,8);
    GLOVE.box=new T.BoxGeometry(1,1,1);
    GLOVE.tor=new T.TorusGeometry(1,.26,6,16);
    GLOVE.vc=new T.MeshLambertMaterial({
      vertexColors:true,side:T.DoubleSide
    }
    );
    GLOVE.tan=new T.MeshLambertMaterial({
      color:0x7a4a24
    }
    );
    GLOVE.dark=new T.MeshLambertMaterial({
      color:0x24150b
    }
    );
    GLOVE.mittC=new T.MeshLambertMaterial({
      color:0x4d2c15
    }
    );
    // matte leather, dark enough that the stadium bloom doesn't make it glow
    const S=GLOVE.sph,B=GLOVE.box,To=GLOVE.tor;
    GLOVE.fa=gloveGeo([[S,0,8,0, 9.6,9,4.4],
    // palm and pocket
    [S,-6.6,16.4,0, 2.6,6.2,2.7,.2],[S,-2.3,18,0, 2.6,6.8,2.7,.06],[S,2.1,18,0, 2.6,6.8,2.7,-.06],[S,6.3,16.5,0, 2.6,6.2,2.7,-.2],
    // finger stalls, fanned
    [S,11.2,10.5,0, 3,7.4,3,-.5],
    // thumb
    [B,0,.8,0, 15,4.6,6.2]]);
    // heel pad
    GLOVE.fb=gloveGeo([[B,9.2,15.2,0, 5.2,9,1.5,-.3],
    // the web
    [B,0,-1.6,0, 12.5,2.2,6.6],
    // wrist strap
    [B,-2.2,13.6,2.9, 13,1,1,0],[B,-2.2,16.2,2.9, 13,1,1,0]]);
    // lacing across the fingers
    GLOVE.ma=gloveGeo([[S,0,10.5,0, 12.2,12.6,5.4],[To,0,10.5,-.6, 10.4,10.8,7.5],[S,12,9,0, 3.6,8,3.6,-.45],[B,0,-.6,0, 13,4.4,6.6]]);
    // round body, thick rim, thumb, heel
    GLOVE.mb=gloveGeo([[S,-.6,11,-3.4, 7.6,7.8,2.2],[B,11,15.5,0, 5.6,8,1.6,-.35],[B,0,-3,0, 11,2.2,7]]);
  }
  // deep pocket, web, strap
  const g=new T.Group(),mitt=kind==='mitt';
  g.rotation.y=GLOVE_PHI;
  if(mitt){
    const a=new T.Mesh(GLOVE.ma,GLOVE.mittC),b=new T.Mesh(GLOVE.mb,GLOVE.dark);
    a.castShadow=true;
    g.rotation.y=0;
    g.add(a,b);
    return g;
  }
  // the simple round mitt (the sculpted one, mittGeo below, is kept but unused)
  const a=new T.Mesh(GLOVE.fa,GLOVE.tan),b=new T.Mesh(GLOVE.fb,GLOVE.dark);
  a.castShadow=true;
  g.add(a,b);
  g.userData.simple=[a,b];
  GLOVE.list.push(g);
  if(GLOVE.real)gloveReal(g);
  return g;
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


// ───────── burst  (index.html L3373)
function burst(fx,p,n,sp,life,col,gr=0,up=0){
  for(let i=0;
  i<n;
  i++){
    _v.set(rand(-1,1),rand(-1,1),rand(-1,1)).normalize().multiplyScalar(sp*rand(.3,1));
    _v.y+=up;
    fx.emit(p,_v,life*rand(.5,1),col[0],col[1],col[2],gr);
  }
}


// ───────── makeFx  (index.html L3358)
function makeFx(n,size){
  const pos=new Float32Array(n*3),col=new Float32Array(n*3),g=new T.BufferGeometry();
  g.setAttribute('position',new T.BufferAttribute(pos,3));
  g.setAttribute('color',new T.BufferAttribute(col,3));
  const pts=new T.Points(g,new T.PointsMaterial({
    size,map:glowTex,vertexColors:true,blending:T.AdditiveBlending,transparent:true,depthWrite:false,fog:false
  }
  ));
  pts.frustumCulled=false;
  scene.add(pts);
  const P=[];
  for(let i=0;
  i<n;
  i++){
    P.push({
      l:0,m:1,vx:0,vy:0,vz:0,r:0,g:0,b:0,gr:0
    }
    );
    pos[i*3+1]=-999;
  }
  let k=0;
  return {
    emit(p,v,life,r,gc,b,gr=0){
      const q=P[k];
      pos[k*3]=p.x;
      pos[k*3+1]=p.y;
      pos[k*3+2]=p.z;
      q.vx=v.x;
      q.vy=v.y;
      q.vz=v.z;
      q.l=q.m=life;
      q.r=r;
      q.g=gc;
      q.b=b;
      q.gr=gr;
      k=(k+1)%n;
    }
    ,
    update(dt){
      for(let i=0;
      i<n;
      i++){
        const q=P[i];
        if(q.l<=0)continue;
        q.l-=dt;
        const j=i*3;
        if(q.l<=0){
          pos[j+1]=-999;
          col[j]=col[j+1]=col[j+2]=0;
          continue;
        }
        q.vy-=q.gr*dt;
        pos[j]+=q.vx*dt;
        pos[j+1]+=q.vy*dt;
        pos[j+2]+=q.vz*dt;
        const a=q.l/q.m;
        col[j]=q.r*a;
        col[j+1]=q.g*a;
        col[j+2]=q.b*a;
      }
      g.attributes.position.needsUpdate=true;
      g.attributes.color.needsUpdate=true;
    }
  }
  ;
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


// ───────── SND: every synthesized sound (index.html L3617)
SND={
  crack(q,power){
    noise(.07,'bandpass',2400,900,.9*q+.3,1.2);
    tone('triangle',1100,260,.06,.5*q+.2);
    if(power&&q>.6){
      tone('sine',150,38,.5,.9*q);
      noise(.35,'lowpass',900,120,.5*q);
    }
  }
  ,
  whoosh(){
    sfx('swing'+(1+(Math.random()*4|0)),.8,rand(.94,1.08));
  }
  ,
  pitch(){
    noise(.09,'bandpass',700,2600,.5,1.3);
    tone('sine',190,80,.09,.4);
  }
  ,
  // the ball leaving the hand: one short snap, identical for every pitch. It used to be a long whoosh, and on slow pitches the whoosh ended well before the ball arrived, which read as 'it's there' too early
  playball(n=14){
    if(sfx('playball',.95))return;
    if(n>0)setTimeout(()=>SND.playball(n-1),250);
  }
  ,
  // the umpire's call; waits up to a few seconds for the file, and stays silent sooner than play a jingle // the umpire's call; waits briefly for the file on the first game, falls back to the jingle
  mitt(k){
    if(k!=null){
      noise(.055,'bandpass',3000,1500,.85,1.1);
      noise(.03,'highpass',2500,2500,.35,.7);
      tone('triangle',1200,480,.04,.34);
      if(AC&&crowdReal&&!roarG){
        const t=AC.currentTime,g=crowdGain.gain;
        g.cancelScheduledValues(t);
        g.setTargetAtTime(crowdBase*.4,t,.015);
        g.setTargetAtTime(crowdBase,t+.22,.25);
      }
    }
    // the crowd dips for a fifth of a second under the pop, so it stands on its own /* a pitch into the catcher's glove also gets a bright snap on top: the recorded pop is mostly low thud, which phone speakers and the crowd swallow */
    sfx('catch2',k==null?.34:lerp(1.05,1.2,k),k==null?rand(.95,1.05):lerp(.94,1.08,k));
  }
  ,
  // recorded glove pop; pitches play it louder and brighter the faster they are
  call(hi,n){
    if(hi&&n>1&&sfx('ball'+Math.min(4,n),.95))return;
    // the umpire counts them: ball two, ball three, ball four
    if(!hi&&n>=3&&((Math.random()<.2&&sfx('ump_k3',1))||sfx('out',.95)))return;
    // strike three: mostly the old emphatic call, now and then STRIKE THREE, YOU'RE OUT!
    if(hi&&sfx('ump_ball',1))return;
    if(!hi&&Math.random()<.35&&sfx('ump_strike',1))return;
    // now and then the long, drawn-out STEEERIIIKE...
    if(!hi&&n===2&&sfx('strike2',.95))return;
    // ...otherwise the old calls: STRIKE TWO
    sfx(hi?'ball':'strike',.9);
  }
  ,
  ump(safe){
    const a=safe?['ump_safe','ump_safe2']:['ump_out','ump_out2'],k=a[(Math.random()*2)|0];
    if(!sfx(k,1))sfx(safe?k:'out',.95);
  }
  ,
  // the call at the bag
  boom(){
    tone('sine',90,30,.6,.6);
    noise(.5,'bandpass',2400,5000,.18,.6,.05);
  }
  ,
  zap(){
    noise(.25,'highpass',2500,6000,.25,3);
    tone('sawtooth',1400,200,.2,.12);
  }
  ,
}
