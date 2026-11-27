// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── nextCam  (index.html L6497)
function nextCam(){
  camI=(camI+1)%CAMS.length;
  try{
    localStorage.setItem('mm_cam2',camI);
  }
  catch(e){
  }
  applyCam();
  camLabel();
  if(S.state!=='title'&&S.state!=='over'&&!paused)timing('CAMERA: '+CAMS[camI].n,'#3ad6ff');
}


// ───────── updateCamera  (index.html L6498)
function updateCamera(rdt){
  if(!DBG.cam)applyCam();
  if(S.state==='flight'&&flight&&!flight.done&&now-flight.t0>.02)camMode='chase';
  if(DBG.cam){
    camPos.copy(CAM_HOME);
    camLook.copy(CAM_LOOK);
  }
  else if(S.stealCut&&S.stealCut.R&&now>=S.stealCut.r0&&now<S.stealCut.t&&S.state==='result'){
    const C=S.stealCut,p=C.R.fig.root.position,A=BASES[C.from],B2=BASES[C.from+1],dl=Math.hypot(B2[0]-A[0],B2[1]-A[1])||1,dx=(B2[0]-A[0])/dl,dz=(B2[1]-A[1])/dl,ml=Math.hypot(p.x,p.z+18.4)||1;
    camPos.set(A[0]+dx*21-p.x/ml*3.4,1.5,A[1]+dz*21-(p.z+18.4)/ml*3.4);
    camLook.set(p.x,1.25,p.z);
    pcutT=now;
    pcutH.set(p.x,3.1,p.z);
    camera.position.copy(camPos);
  }
  /* THE JUMP: from up the line ahead of him, a step toward the mound, as he breaks */
  else if(S.stealCut&&now>=S.stealCut.t&&S.state==='result'){
    const C=S.stealCut;
    if(C.R)C.R.fig.root.visible=false;
    const sg=C.bx>=0?-1:1;
    camPos.set(1.3*sg,2.5,6.8);
    camLook.set(C.bx*.12,1.5,-5);
    pcutT=now;
    pcutH.set(0,3.6,0);
    camera.position.copy(camPos);
  }
  /* THE THROW DOWN: from just behind the catcher as he comes up and fires */
  else if(PD.on&&kCelOn()){
    const u=Math.min(1,(now-PD.celA)/2.3);
    camPos.set(2-.6*u,1.4,-13.5-.5*u);
    camLook.set(0,1.7,-18.4);
    pcutT=now;
    pcutH.set(0,3.3,-18.4);
    camera.position.copy(camPos);
  }
  /* AFTER A STRIKEOUT: cut to him celebrating on the mound, framed loose enough that the call sits above his head */
  else if(PD.on&&PD.introT&&now<PD.introT){
    const u=1-(PD.introT-now)/2.7;
    camPos.set(2.2-1*u,1.75,-13.2+.7*u);
    camLook.set(0,2.45,-18.4);
    pcutT=now;
    pcutH.set(0,4.75,-18.4);
    camera.position.copy(camPos);
  }
  /* from in front of the mound, drifting in on him */
  else if(S.state==='pduel'&&!wkPD()){
    if(PD.ph===5&&now-PD.fly.t0>.5){
      camPos.set(0,15,17);
      camLook.set(PD.bx*.5,3,PD.bz*.5-12);
    }
    /* (the first half second of a ball in play is still seen from the mound: the swing, and the ball coming off the bat) */
    else if(camera.aspect<1){
      const sg=curBatter().lh?-1:1;
      camPos.set(-.5*sg,2.55,-26);
      camLook.set(.16*sg,.35,0);
      /* aimed lower: the plate sits higher on the screen, with only a couple of rows of the backstop crowd above it, and the room goes to the controls */
    }
    /* an upright phone: in tight over the pitcher's shoulder, so the strike zone is big in the middle of the screen */
    /* an upright phone: the pitcher stands on the left, the plate sits in the upper middle, clear of the aiming pad */
    else{
      const sg=curBatter().lh?-1:1;
      camPos.set(1.35*sg,2.55,-30);
      camLook.set(-.05*sg,1.2,0);
    }
    /* mirrored for a left-handed hitter, so the pitcher never stands between the camera and the man at the plate */
    camera.position.copy(camPos);
  }
  /* from behind and just to the side of your pitcher, long lens, the zone in the clear beside him; a ball in play is watched from behind the plate */
  else if(flight&&flight.aerial&&!flight.done&&flight.clr){
    if(!flight.aerT){
      flight.aerT=now;
      {
        const BAG=[0,0,0,1,2,3,4];
        /* (the chase shot riding over the interceptors is gone: it clipped through the ridges) */
        /* the interceptor shots come up most: the chase camera behind them (5) and the straight-down view with them crossing underneath (0) */
        let k=DBG.aerK!==undefined?DBG.aerK:BAG[(Math.random()*BAG.length)|0];
        if(DBG.aerK===undefined&&k===aerLast){
          const o=BAG.filter(q=>q!==aerLast);
          k=o[(Math.random()*o.length)|0];
        }
        aerLast=flight.aerK=k;
        flight.aerA=rand(0,6.28);
        if(k===2&&now-ROCKET.t>19)ROCKET.t=now+.8;
        if(k===5||k===0){
          FLY.t=now+(k===5?.15:.5);
          try{
            tone('sawtooth',420,70,2.6,.4,.3);
          }
          catch(e){
          }
        }
      }
      flight.play.endT=Math.max(flight.play.endT,now-flight.t0+5.2);
      /* held for a good five seconds */
      // THE SHOW IS TIMED TO THE SHOT: the lasers come on as the camera goes up, fireworks burst over the bowl through it, and the scoreboard takes a power surge near the end
      if(!LAS.on&&!LAMP.on)laserStart();
      for(let i=0;
      i<14;
      i++)fireworks.push({
        t:now+.3+i*.33,p:new V3(rand(-70,70),rand(40,80),rand(-150,-20))
      }
      );
      flight.aerZap=now+3.1;
      crowdPump(1);
    }
    if(flight.aerZap&&now>=flight.aerZap){
      flight.aerZap=0;
      try{
        zapStart(_p.set(SBX,39,-(fenceR(0)+13)),true,true);
      }
      catch(e){
      }
    }
    // FIVE DIFFERENT SHOTS FROM THE AIR, never the same one twice running: straight down over the mound, the blimp circling the bowl, from
    // behind the rocket on its pad (which lifts off), a crane rising behind home plate, and riding high above the ball itself. All of them
    // stay well above every roof, tower and ridge.
    const e=now-flight.aerT,K=flight.aerK;
    if(K===5&&FLY.g){
      const u=clamp((now-FLY.t)/4.6,0,1.1),fz=lerp(-680,330,u),fy=flyY(fz);
      camPos.set(Math.sin(u*3.1)*14+10,fy+62,fz-190);
      camLook.set(0,34,fz+110);
    }
    /* well back and above: all three ships, their trails and the park ahead of them in one picture */
    /* riding just behind and above the interceptors as they cross the park */
    else if(K===1){
      const a=flight.aerA+e*.2;
      camPos.set(Math.sin(a)*150,128-e*2,-62+Math.cos(a)*150);
      camLook.set(0,8,-62);
    }
    else if(K===2&&ROCKET.at){
      const A=ROCKET.at;
      camPos.set(78-e*3,124+e*3,72);
      camLook.set(A.x*.72,46+e*9,A.z*.72);
    }
    /* from high over the first-base side, looking across the whole park to the rocket going up beyond left field */
    else if(K===3){
      camPos.set(0,72+e*13,78+e*4);
      camLook.set(0,0,-70);
    }
    else if(K===4){
      camPos.set(ball.position.x*.55,Math.max(96,ball.position.y+62),ball.position.z*.55+62);
      camLook.copy(ball.position);
    }
    else{
      const a=.4+e*.2;
      camPos.set(Math.sin(a)*40,268-e*5,-62+Math.cos(a)*40);
      camLook.set(0,0,-62);
    }
    /* high enough that the interceptors crossing underneath are seen whole, with the park all round them */
    camera.position.lerp(camPos,e<.08?1:.3);
  }
  /* a slow sweep high over the stadium, the ball a streak below */
  else if(flight&&flight.sky&&!flight.done&&now-flight.t0>.22){
    const k=clamp((now-flight.t0-.22)/4,0,1),bp=ball.position;
    camPos.set(bp.x*.3,lerp(150,132,k),lerp(48,36,k));
    camLook.set(bp.x*.5,0,Math.min(-62,bp.z*.5-40));
    pcutT=now;
    pcutH.set(0,2.3,0);
  }
  else if(flight&&flight.trailCam&&!flight.done&&now-flight.t0>.25&&!(flight.tr.eyeT&&now-flight.t0>flight.tr.eyeT-.25)){
    const tr=flight.tr,
    // (the chase camera lets go just before a ball hits the batter's eye, so the carom and the short circuit are watched from the field)
    i=Math.min(tr.pts.length-1,Math.floor((now-flight.t0)*120)),q=tr.pts[Math.min(tr.pts.length-1,i+6)],p0=tr.pts[i];
    _a.set(q.x-p0.x,q.y-p0.y,q.z-p0.z);
    if(_a.lengthSq()<1e-6)_a.set(0,0,-1);
    _a.normalize();
    // riding just behind and above the ball, looking where it is going
    camPos.set(p0.x,p0.y,p0.z).addScaledVector(_a,-7).add(_b.set(0,1.7,0));
    camLook.set(p0.x,p0.y,p0.z).addScaledVector(_a,14);
    if(tr.twT&&now-flight.t0>=tr.twT-.05){
      const D=tr.twD,P=tr.twP;
      camPos.set(P.x-D.x*20,P.y-D.y*20+3,P.z-D.z*20);
      camLook.set(p0.x,p0.y,p0.z);
    }
    /* OFF THE TOWER: the chase camera stops short and watches the ball come off the steel and drop, instead of spinning round with it */
    {
      const cr=Math.hypot(camPos.x,camPos.z),cph=Math.atan2(camPos.x,-camPos.z),cd=cr-fenceR(clamp(cph,-PI/4,PI/4)),sm=(a,b,x)=>{
        const u=clamp((x-a)/(b-a),0,1);
        return u*u*(3-2*u);
      }
      ,top=Math.abs(cph)<.3?58:38;
      /* THE CAMERA NEVER GOES THROUGH THE BUILDING: while it is over the seats, the board or the back wall it is held above them (higher still over the scoreboard in center), so a ball leaving the park is watched over the rim, not through it */
      const y0=camPos.y;
      camPos.y=Math.max(camPos.y,top*sm(-16,-5,cd)*(1-sm(40,56,cd)));
      camLook.y+=(camPos.y-y0)*.75;
    }
  }
  /* (and it keeps looking out along the flight, not down at its feet) */
  else if(flight&&flight.orb&&!flight.done){
    // from just outside the park, watching it climb away toward Earth
    if(flight.lamp){
      const T1=TOWERS[flight.lamp-1].p,h1=Math.hypot(T1.x,T1.z)||1,sd=T1.x>0?1:-1;
      camPos.set(T1.x*.46+(-T1.z/h1)*sd*48,26,T1.z*.46+(T1.x/h1)*sd*48);
      camLook.copy(flight.lampHit?T1:_b.copy(ball.position).lerp(T1,.6));
      /* from off to the side, toward the foul line (clear of the scoreboard): the rope is seen side-on, climbing all the way into the lights */
      pcutT=now;
      pcutH.set(T1.x,T1.y+11,T1.z);
    }
    // from the outfield grass, looking up at the tower as it comes in
    else if(flight.sat){
      camPos.set(flight.orbFrom.x*.45+16,104,flight.orbFrom.z*.45+34).addScaledVector(_b.copy(ball.position).sub(flight.orbFrom),.04);
      camLook.copy(flight.satHit?(flight.ufo?UFO.g.position:SAT.g.position):ball.position);
    }
    // from high over the park, clear of every deck and roof, looking up and out at it
    else{
      camPos.set(flight.orbFrom.x*.45+16,104,flight.orbFrom.z*.45+34).addScaledVector(_b.copy(ball.position).sub(flight.orbFrom),.04);
      camLook.copy(ball.position);
    }
    /* from high over the park, clear of every deck and roof (the old spot just outside the wall could sit inside the stands) */
    if(flight.rev&&!flight.revOn){
      camPos.set(-2.2,3.4,9);
      camLook.copy(ball.position);
    }
    /* from behind the plate, a little up: the ball climbing out over the outfield bowl and away */
    if(flight.revOn){
      camPos.copy(REV.cam);
      camLook.copy(REV.look);
    }
    camera.position.lerp(camPos,now-flight.orb<.08||flight.revOn||flight.rev?1:.2);
  }
  else if(LOCKFX.hr&&LOCKFX.plate&&LOCKFX.cel&&S.state==='celebrate'&&now>LOCKFX.t-.05){
    const L=LOCKFX,sg=MX.lefty?-1:1;
    camLook.set(L.x,1.35,L.z);
    camPos.set(L.x+2.6*sg,1.9,L.z-5.2);
    pcutT=now;
    pcutH.set(L.x,3.3,L.z);
  }
  /* LOCKED IN after a homer: the cut to him at the plate, burning */
  else if(!LOCKFX.hr&&now>LOCKFX.t-.05&&now<LOCKFX.t+1.75&&S.state==='result'&&!S.goK){
    const L=LOCKFX,h=Math.hypot(L.x,L.z)||1;
    camLook.set(L.x,1.5,L.z);
    camPos.set(L.x*.62-(L.z/h)*1.5,2.1,L.z*.62+4.2);
    pcutT=now;
    pcutH.set(L.x,3.2,L.z);
  }
  /* a quick cut to the man who just got locked in, from the infield side of his base */
  else if(S.kOut&&S.kOut.taunt&&MX.pit&&now>S.kOut.t+DEF_CUT&&now<S.kOut.t+DEFEAT&&S.state==='result'){
    // ...then the pitcher, from the plate side
    pcutT=now;
    pcutH.set(0,2.3,-18.4);
    const e=clamp((now-S.kOut.t-DEF_CUT)/(DEFEAT-DEF_CUT),0,1);
    camLook.set(0,1.45,-18.4);
    camPos.set(lerp(1.6,1.1,e),1.35,-18.4+lerp(4.6,3.8,ease(e)));
  }
  else if(S.kOut&&MX.clip&&MX.clip.bi===S.kOut.bi&&now>S.kOut.t&&now<S.kOut.t+DEFEAT&&S.state==='result'){
    // strikeout: close on the hitter from the pitcher's side
    const e=clamp((now-S.kOut.t)/DEFEAT,0,1);
    MX.clip.hips.getWorldPosition(_a);
    const sd=_a.x<0?1:-1;
    camLook.set(_a.x,1.2,_a.z);
    camPos.set(_a.x+sd*lerp(1.5,1.0,ease(e)),1.25,_a.z-lerp(3.2,2.5,ease(e)));
  }
  else if(flight&&flight.thr&&flight.thr.safe&&now>flight.thr.t0+.45&&S.state==='result'){
    camPos.set(28.6,1.6,-20.4);
    camLook.set(20.6,1.05,-20.6);
    pcutT=now;
    pcutH.set(19.4,2.9,-19.4);
  }
  // the race: from foul ground past the bag, the runner coming up the line and the first baseman stretching for the throw
  else if(S.state==='hbprun'){
    const R=RUN.list.find(R=>R.active&&R.target===1);
    // in front of him, up the first-base line, as he comes
    if(R){
      R.fig.root.getWorldPosition(_a);
      {
        const wd=camera.aspect>1;
        camPos.set(_a.x+(wd?5.4:5.2),1.25,_a.z-(wd?4.3:4.15));
        camLook.set(_a.x,wd?2.5:2.25,_a.z);
        pcutT=now;
        pcutH.set(_a.x,wd?4.9:4.55,_a.z);
      }
      try{
        const W=$('walk');
        if(!W.hidden&&W.classList.contains('pc')){
          const P0=$('pop'),sE=P0.querySelector('.s');
          if(P0.offsetHeight>4)W.style.top=(P0.offsetTop+(sE&&sE.offsetHeight?sE.offsetTop+sE.offsetHeight:P0.offsetHeight)+10)+'px';
          /* (from its laid-out box, not its on-screen box: it does not bounce with the call's slam-in) */
        }
      }
      catch(e){
      }
    }
  }
  /* the result call sits above his head, never across him */
  else if(S.state==='qte'){
    pcutT=now;
    if(QT.ph==='heads')pcutH.set(QT.rx,2.6,QT.rz);
    else pcutH.set(QT.mx,2.75,QT.mz);
    /* calls sit above the players' heads, never across them */
    if(QT.ph==='heads'){
      camPos.set(QT.rx-QT.ux*5.4+QT.nx*1.3,1.3,QT.rz-QT.uz*5.4+QT.nz*1.3);
      camLook.set(QT.rx,1.1,QT.rz);
    }
    // in front of him as he goes
    else if(QT.thr&&QT.thr.on){
      const T2=QT.thr,fx=Math.sin(T2.ry),fz=Math.cos(T2.ry),sx=fz,sz=-fx,k=QT.ph==='throw'?ease(clamp((now-QT.tt)/.5,0,1)):0;
      if(MOB){
        camPos.set(T2.x-fx*(9-1.5*k)+sx*1.2,1.6,T2.z-fz*(9-1.5*k)+sz*1.2);
        camLook.set(T2.x+fx*4,0,T2.z+fz*4);
      }
      else{
        camPos.set(T2.x-fx*(6.4-1.2*k)+sx*1.1,3.0,T2.z-fz*(6.4-1.2*k)+sz*1.1);
        camLook.set(T2.x+fx*5,-1.2,T2.z+fz*5);
      }
      pcutH.set(T2.x,2.9,T2.z);
    }
    /* (on a phone the shot is framed, by measurement, so the thrower and first base both sit in the clear band between the row of prompts and the arrow pad) /* over his throwing-side shoulder, first base and the runner in front of him */
    else{
      const k=QT.ph==='run'?ease(clamp((now-QT.tp)/QT.runT,0,1)):1,d=6.6-1.6*k,o=QT.ph==='out'&&QT.ok?ease(clamp((now-QT.t1-.4)/.8,0,1)):0;
      camPos.set(QT.mx+QT.nx*(d+1.4*o),1.25,QT.mz+QT.nz*(d+1.4*o));
      camLook.set(QT.mx-QT.ux*1.6*o,1.05-.2*o,QT.mz-QT.uz*1.6*o);
    }
  }
  else if(S.state==='brawl'){
    const el=now-S.t;
    pcutT=now;
    pcutH.set(0,2.75,BR_Z-.6);
    if(BRW.cut&&el>.2&&el<1.2){
      camPos.set(-1.6,1.55,BR_Z+3.2);
      camLook.set(0,1.25,BR_Z-.4);
    }
    /* the cutaway, from in front of the mound */
    else if(el<BRW.ch){
      camPos.set(BRW.bx+1.5,1.55,BRW.bz+3.4);
      camLook.set(0,1.2,-18.4);
    }
    // behind him as he goes
    else{
      const a=.25*Math.sin(Math.max(0,el-BRW.f0)*.5),
      /* one cut only: from the run straight to the side-on fight camera the moment he gets there */
      ko=BRW.ko?ease(clamp((el-BRW.f1+.6)/1.2,0,1)):0,zt=4.1-.27*Math.min(3,BRW.hits||0),d=(BRW.zd=lerp(BRW.zd||4.1,zt,.12))+3.4*ko,
      /* and the camera crowds in a step closer with each one */
      cz=BR_Z-.6+(BRW.win?-1.1:1.1)*ko;
      camPos.set(d*Math.cos(a),1.45+.4*ko,cz+d*Math.sin(a));
      camLook.set(0,1.42-.5*ko,cz);
    }
  }
  /* framed with headroom above the fighters: that strip is where every call goes */
  /* after the knockdown it pulls back to keep the man on the ground in the picture */
  // side-on for the fight, drifting a little
  else if(S.state==='hbp'&&MX.clip){
    MX.clip.hips.getWorldPosition(_a);
    const sd=_a.x<0?1:-1;
    camPos.set(_a.x+sd*1.9,.95,_a.z-2.5);
    camLook.set(_a.x,Math.max(.4,_a.y*.8),_a.z);
  }
  // from the pitcher's side, low, on the man who got hit
  else if(S.state==='celly2'){
    const B=BASES[D2.base];
    if(D2.base===3){
      camPos.set(B[0]+3.6,.8,B[1]+1.2);
    }
    else camPos.set(1.7,.8,-35.4);
    camLook.set(B[0],1.2,B[1]);
  }
  else if(flight&&flight.tr.offF&&flight.tr.offF.x!==undefined&&flight.play.type==='hit'&&now-flight.t0-flight.tr.offF.t>.06&&now-flight.t0-flight.tr.offF.t<2.5&&(S.state==='flight'||S.state==='result')&&!S.goK){
    /* (not while a send is on offer: then the picture stays on the field, the ball and the runners, so the decision can be read) */
    // the infielder who wore one: from the plate side of him, low
    const O=flight.tr.offF,h=Math.hypot(O.x,O.z)||1,k=(h-2.9)/h;
    pcutT=now;
    pcutH.set(O.x,2.3,O.z);
    camPos.set(O.x*k+1.2,1.2,O.z*k);
    camLook.set(O.x,.8,O.z);
  }
  else if(flight&&flight.offPd&&flight.play.type==='hit'&&MX.pit&&MX.pit.taunts.p_dying&&now-flight.t0-flight.tr.offP>.06&&now-flight.t0-flight.tr.offP<2.6&&(S.state==='flight'||S.state==='result')&&!S.goK){
    // the pitcher who wore the comebacker: cut to the mound from the plate side, low
    pcutT=now;
    pcutH.set(0,2.3,-18.4);
    camPos.set(1.5,1.1,-14.2);
    camLook.set(0,.75,-18.4);
  }
  else if(pcWalk()&&MX.pit){
    pcutT=now;
    const o=MX.pit.obj.position;
    pcutH.set(o.x,2.3,o.z);
    camPos.set(o.x-3.1,1.15,o.z+2.2);
    camLook.set(o.x,1.15,o.z);
  }
  // walking toward the camera, which backs away with him
  else if(pitCut()>=0||trotPit()||S.state==='pdef'||S.state==='pchange'||S.state==='pod'){
    pcutT=now;
    if(S.state==='pod'){
      pcutH.set(0,3.3,-18.4);
      camPos.set(1.9,1.35,-12.9);
      camLook.set(0,1.7,-18.4);
    }
    /* his Overdrive: the shot sits further back and looks a little higher, so the call has clear sky above his head */
    else if(S.state==='pchange'&&S.pcI){
      pcutH.set(0,2.3,-18.4);
      camPos.set(1.3,1.3,-14.2);
      camLook.set(0,2.2,-18.4);
    }
    /* THE NEW ARM, WITH HIS CARD: the camera stands a step further back and looks up a little, which puts his head lower in the picture: room above it for his card and, above that, the PITCHING CHANGE banner. Nothing overlaps and nothing covers him. */
    else{
      pcutH.set(0,2.3,-18.4);
      camPos.set(1.3,1.25,-15.4);
      camLook.set(0,1.25,-18.4);
    }
  }
  else if(S.state==='trot'&&TROT.R){
    camPos.copy(TROT.cam);
    TROT.R.fig.root.getWorldPosition(_a);
    camLook.set(_a.x,TROT.cut&&TROT.clip!=='p_loser'?1.15:1.3,_a.z);
  }
  else if((S.state==='walkup'||wkPD())&&MX.clip){
    // from the pitcher's side, across the plate: his front three-quarter, with the stands behind him
    const e=clamp((now-S.t)/WALK.dur,0,1);
    MX.clip.hips.getWorldPosition(_a);
    const sd=_a.x<0?1:-1;
    const ly=camLook.y=lerp(camLook.y>0&&camLook.y<1.2?camLook.y:1.1,clamp(_a.y*.75+.1,.2,1.1),.08);
    // follow him down when he is on the ground, so the name card doesn't cover him
    // The camera stands closer to him with a wider lens: he is the same size in the picture, but the backstop and the seats behind him
    // fall well back, so he has room around him instead of a wall at his shoulder.
    const bf=camera.userData.baseFov,kq=Math.max(.66,Math.tan(bf*DEG/2)/Math.tan(39*DEG));
    wkFovT=2*Math.atan(Math.tan(bf*DEG/2)/kq)/DEG-bf;
    camLook.set(_a.x,ly,_a.z);
    camPos.set(_a.x+(sd*lerp(2.3,1.7,ease(e))-_a.x)*kq,1.0+.2*e,_a.z-lerp(3.6,2.6,ease(e))*kq);
  }
  else if(flight&&flight.admire&&!flight.done&&now-flight.t0<flight.A&&MX.clip){
    // stay on the hitter: low, from the pitcher's side, creeping in
    const e=clamp((now-flight.t0)/flight.A,0,1);
    MX.clip.hips.getWorldPosition(_a);
    const sd=_a.x<0?1:-1;
    camLook.set(_a.x,1.18,_a.z);
    camPos.set(sd*lerp(2.5,1.8,ease(e)),.7,_a.z-lerp(3.3,2.5,ease(e)));
    flight.cut=true;
  }
  else if(camMode==='bat'){
    camPos.copy(CAM_HOME);
    camLook.copy(CAM_LOOK);
    if(S.state==='title'||S.state==='over'){
      const a=performance.now()*.00012;
      camPos.set(Math.sin(a)*9,3.2+Math.sin(a*2)*.6,7);
      camLook.set(0,3,-40);
    }
  }
  else if(S.state==='celebrate'){
    const k=1-Math.exp(-3*rdt);
    if(camPos.y<3||camPos.lengthSq()>250000){
      camPos.set(0,18,-12);
      camLook.set(8,58,-150);
    }
    /* coming back from a far-off shot (the Moon from space, the blimp): cut straight to the fireworks, never glide up through the ground or the stands */
    camPos.lerp(_p.set(0,18,-12),k);
    camLook.lerp(_t1.set(8,58,-150),k);
  }
  else if(flight&&flight.thr){
    // hold the shot on the fielder while he throws; no chasing the ball back in
  }
  else if(flight){
    const bp=ball.position,h=Math.hypot(bp.x,bp.z)||1,k=1-Math.exp(-2.6*rdt);
    const back=13+h*.14,r=Math.min(72,Math.max(0,h-back));
    _p.set(bp.x/h*r+(-0.1)*(1-Math.min(1,h/30)),Math.max(1.9,3+bp.y*.45+h*.05),bp.z/h*r+3.7*(1-Math.min(1,h/30)));
    if(flight.cut){
      flight.cut=false;
      camPos.copy(_p);
      camLook.copy(bp);
    }
    // hard cut from the hitter to the ball
    if(camPos.y<.4||camPos.distanceToSquared(_p)>90000){
      camPos.copy(_p);
      camLook.copy(bp);
    }
    camPos.lerp(_p,k);
    camLook.lerp(bp,1-Math.exp(-9*rdt));
  }
  camera.position.copy(camPos);
  if(shake>.002){
    camera.position.x+=rand(-1,1)*shake;
    camera.position.y+=rand(-1,1)*shake;
    shake*=Math.exp(-7*rdt);
  }
  if(now-pcutT<.06&&S.state!=='qte'&&S.state!=='brawl')camLook.y+=MOB?.42:.24;
  /* close-ups are framed with the man a little lower in the picture, so there is clear space above his head for the call */
  camera.lookAt(camLook);
  for(const o of SKYG)o.position.copy(camera.position);
  if(rumble>.02){
    const t=performance.now()/1000,a=rumble*FX;
    // the whole picture trembles, like a broadcast camera on a deck that 50,000 people are jumping on: the frame shakes, not the stands (applied after the camera is aimed, or the aim would undo it)
    camera.rotateZ((Math.sin(t*47)+Math.sin(t*71.3))*.007*a);
    camera.rotateX((Math.sin(t*53.7)+Math.sin(t*83.1))*.0045*a);
    camera.rotateY(Math.sin(t*61.3)*.0035*a);
    rumble*=Math.exp(-3.5*rdt);
  }
  if(S.state!=='walkup')wkFovT=0;
  wkFov+=(wkFovT-wkFov)*Math.min(1,rdt*(wkFovT?30:8));
  fovKick*=Math.exp(-5*rdt);
  const f=S.state==='pduel'&&!wkPD()&&!(PD.introT&&now<PD.introT)&&!kCelOn()&&!(PD.ph===5&&now-PD.fly.t0>.5)?(camera.aspect<1?11:14)*(PD.ph===3&&PD.pt?1-.2*Math.min(1,Math.pow((now-PD.pt.t0)/PD.pt.dur,2)):1):
  /* the lens punches in with the pitch */
  camera.userData.baseFov+fovKick+wkFov;
  if(Math.abs(f-camera.fov)>.01){
    camera.fov=f;
    camera.updateProjectionMatrix();
  }
  towerGlows.forEach((g,i)=>g.material.opacity=Math.min(1,(LAMP.out===(i>>1)?0:1)*(i%2?.5:.75)*(1+.1*Math.sin(performance.now()*.004+i))*(ZAP.lv===undefined?1:ZAP.lv)));
}
