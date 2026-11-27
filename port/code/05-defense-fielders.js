// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── updateThrow  (index.html L4154)
function updateThrow(){
  if(!(flight&&flight.thr))return;
  const Th=flight.thr;
  if(Th.hold){
    if(S.goK&&S.state==='result'){
      if(now>Th.t0-.3||Th.hd){
        Th.hd=1;
        Th.t0=now-.23;
        Th.bt=Th.t0+THROW_REL;
      }
      /* (he stands set, ball in hand, a third of the way into his motion; the moment you decide, the arm comes through: the ball is out about half a second later) */
    }
    else Th.hold=false;
  }
  if(Th.bt===undefined)Th.bt=Th.t0+THROW_REL;
  const e=now-Th.bt;
  if(e<0){
    if(Th.pick&&now>=Th.t0-Th.pick){
      ball.visible=false;
      ballShadow.visible=false;
    }
    return;
  }
  // picked up: the ball is in his glove until he lets it go
  if(!Th.from){
    const f=flight.play.f,r=f.fig.root;
    Th.from=new V3(r.position.x,1.75*(f.scale||1),r.position.z);
    try{
      if(f._rh===undefined){
        f._rh=null;
        r.traverse(o=>{
          if(o.isBone&&/RightHand$/.test(o.name))f._rh=o;
        }
        );
      }
      if(f._rh&&f.thrAct){
        r.updateMatrixWorld(true);
        f._rh.getWorldPosition(_a);
        if(Math.hypot(_a.x-r.position.x,_a.z-r.position.z)<3&&_a.y>.6)Th.from.copy(_a);
      }
    }
    catch(x){
    }
    /* (it leaves from his hand, not from the middle of his chest) */
    Th.len=Th.from.distanceTo(Th.to);
    Th.dur=clamp(Th.len/42,.3,1.3);
    Th.hot=Th.len>36||Math.random()<.4;
    Th.lp=null;
    SND.whoosh();
  }
  /* (a long throw, and some of the short ones, come out with the flame on them) */
  const u=e/Th.dur;
  // outfield throws show only the release and the first part of the flight; infield throws (full) are followed all the way to the bag
  if(u<=1&&(Th.full||e<.45)){
    ball.visible=true;
    ball.position.lerpVectors(Th.from,Th.to,u);
    ball.position.y+=Math.sin(u*PI)*Th.len*.022;
    ball.scale.setScalar(Math.max(1,camera.position.distanceTo(ball.position)*.036));
    try{
      trail(Th,Th.hot?[1,.6,.15]:[1,1,1],camera.position.distanceTo(ball.position)>9,!!Th.hot);
    }
    catch(x){
    }
  }
  /* A SEED, NOT A LOB: thrown on a line, a smaller ball, with the thin white smoke behind it and, on the strong ones, the same skinny flame a hard-hit ball carries */
  else if(Th.next&&u>1){
    SND.mitt();
    Th.from=Th.to.clone();
    Th.to=Th.next;
    Th.next=null;
    Th.len=Th.from.distanceTo(Th.to);
    Th.dur=clamp(Th.len/42,.3,1.3);
    Th.bt=now+.22;
    Th.lp=null;
    SND.whoosh();
  }
  // the pivot: on to first
  else if(!Th.done){
    Th.done=true;
    ball.visible=false;
    if(Th.call){
      Th.call();
      Th.call=null;
    }
    if(Th.full){
      SND.mitt();
      if(Th.q!==undefined){
        roarOff(.9);
        crowdOut(Math.max(Th.q,.55));
      }
      if(Th.safe){
        const r=flight.raceR||0;
        pop('SAFE!',[r?`+${r} RUN${r>1?'S':''}`:'','BEAT THE THROW'].filter(Boolean).join(' · '),'',true);
        buzz([30,40,70]);
        roar(1,.15);
        sfxSlice('cheer_big',.8,rand(1,1.08),rand(0,.25),2.8);
        if(AC)cheerBusy=AC.currentTime+2.4;
      }
    }
  }
}


// ───────── updatePlateCrew  (index.html L5814)
function updatePlateCrew(){
  const c=MX.crew;
  if(!c)return;
  const SC=S.stealCut&&now>=S.stealCut.t?S.stealCut:null,on=S.state==='walkup'||S.state==='pduel'||!!SC;
  if(c.thr){
    const w=SC?1:0;
    if(w!==c._tw){
      c._tw=w;
      if(w){
        c.thr.reset().play();
        c.thr.setEffectiveWeight(1);
        c.act.setEffectiveWeight(0);
      }
      else{
        c.thr.stop();
        c.act.setEffectiveWeight(1);
      }
    }
    if(SC){
      c.cat.rotation.y=PI-Math.atan2(SC.bx,-SC.bz);
      /* (he was turning the wrong way for a throw to third: his body went toward first while the ball went to third) */
      c.thr.time=Math.min(c.thr.dur-.02,(now-SC.t)*1.5);
      c.mixer.update(0);
    }
    else if(c.cat.rotation.y!==PI)c.cat.rotation.y=PI;
  }
  if(S.state==='pduel'&&c.cat2===undefined&&(PD.ph===-1||PD.ph===4))crewComet(c);
  {
    const mine=S.state==='pduel'&&!!c.cat2;
    if(c.cat2&&c.cat2.visible!==mine){
      c.cat2.visible=mine;
      c.show=null;
    }
    if(mine){
      c.cat.visible=false;
      c.act2.time=.45+.3*Math.sin(now*1.4);
      c.mixer2.update(0);
    }
    c.mine=mine;
  }
  /* the catcher and the umpire are behind the plate while the player pitches too */
  {
    const ump=on;
    if(on!==c.show||ump!==c.showU){
      c.show=on;
      c.showU=ump;
      c.cat.visible=on&&!c.mine;
      c.uf.fig.root.visible=ump;
    }
  }
  /* (no umpire while the player pitches: he stood right behind the zone and muddied it) */
  if(on&&!SC){
    if(!c.mine){
      c.act.time=.45+.3*Math.sin(now*1.4);
      c.mixer.update(0);
    }
    if(c.ua){
      const e=(now-c.uT)*1.15,t=e>=0&&e<c.ud-.04?e:0;
      if(t!==c._ut){
        c._ut=t;
        c.ua.time=t;
        c.um.update(0);
      }
    }
    /* (only touched when the frame actually changes: standing still costs nothing) */
    else{
      const P=lerpPose(c.up,c.up,0,tmpPose);
      P.y+=Math.sin(now*1.7)*.008;
      applyPose(c.uf.fig,P);
      retargetFig(c.uf.fig,c.uf.rt);
    }
  }
}


// ───────── updateFielders  (index.html L6195)
function updateFielders(dt){
  if(flight&&flight._res&&!flight.thr)return;
  /* the play has been called (the player is pitching): everyone holds exactly as they were at that moment. Before, the man who made the play wheeled round and started back to his spot while the call was still up. */
  const tf=flight?now-flight.t0:0;
  for(const f of fielders){
    if(f.isP)continue;
    const r=f.fig.root;
    let clipT=-1,running=false,strafe=0,turnT=-1;
    let diving=false,dmir=false,wallj=false,idle=false;
    if(flight&&flight.play.f===f){
      const pl=flight.play,mocap=pl.air&&f.act&&!pl.dive&&!(pl.rob&&f.wallAct);
      if(!pl.tgt){
        pl.tgt={
          x:pl.p.x,z:pl.p.z,face:Math.atan2(-pl.p.x,-pl.p.z),lead:pl.air||pl.late?0:Math.min(.3,pl.endT*.3)
        }
        ;
        /* on a ball on the ground he gets there a beat early, to set his feet and get down for it */
        if(mocap){
          // stop where the clip starts him, so its own drift carries the glove to the ball
          const dx=f.startOff.x-f.catchOff.x,dz=f.startOff.z-f.catchOff.z,c=Math.cos(pl.tgt.face),sn=Math.sin(pl.tgt.face);
          const k=f.scale||1;
          pl.tgt.x+=(dx*c+dz*sn)*k;
          pl.tgt.z+=(-dx*sn+dz*c)*k;
          pl.tgt.lead=Math.min(CATCH.t-CATCH.start,pl.endT*.5);
        }
        if(pl.dive&&pl.dive.f===f&&f.diveAct){
          const D=pl.dive,k=f.scale||1,run=Math.atan2(D.x-f.home.x,D.z-f.home.z),plate=Math.atan2(-D.x,-D.z);
          // he lunges along the line he was running; of the two ways to do that (the clip, or its mirror image) take the one that leaves his chest toward the infield
          const opt=m=>{
            const lx=f.diveG.x*(m?-1:1),lz=f.diveG.z,yaw=run-Math.atan2(lx,lz),d=Math.atan2(Math.sin(yaw-plate),Math.cos(yaw-plate));
            return {
              m,yaw,lx,lz,off:Math.abs(d)
            }
            ;
          }
          ;
          const A=opt(false),Bm=opt(true),O=A.off<=Bm.off?A:Bm,cs=Math.cos(O.yaw),sn=Math.sin(O.yaw);
          D.mir=O.m;
          D.yaw=O.yaw;
          D.sx=D.x-(O.lx*cs+O.lz*sn)*k;
          D.sz=D.z-(-O.lx*sn+O.lz*cs)*k;
          D.t0=D.t-(f.dv||DIVE).t;
          {
            const ex=f.diveE.x*(O.m?-1:1),ez=f.diveE.z;
            D.ex=D.sx+(ex*cs+ez*sn)*k;
            D.ez=D.sz+(-ex*sn+ez*cs)*k;
          }
          pl.tgt={
            x:D.sx,z:D.sz,face:O.yaw,lead:Math.max(0,(pl.tField||pl.endT)-D.t0)
          }
          ;
        }
        // he has to be at the take-off spot when the dive starts
        if(pl.rob&&f.wallAct&&!pl.dive){
          // ROBBED: he faces the wall, runs along it the way he came, goes up and takes it off the top of it, and comes down on his back
          const p=pl.p,k=f.scale||1,yaw=Math.atan2(p.x,p.z),cs=Math.cos(yaw),sn=Math.sin(yaw),m=(p.x-r.position.x)*cs-(p.z-r.position.z)*sn<0,lx=f.wallG.x*(m?-1:1),lz=f.wallG.z;
          const D=pl.wj={
            f,t:pl.endT,x:p.x,z:p.z,mir:m,yaw,wall:true
          }
          ;
          D.sx=D.x-(lx*cs+lz*sn)*k;
          D.sz=D.z-(-lx*sn+lz*cs)*k;
          D.t0=D.t-f.wv.t;
          f.wLift=clamp(p.y-f.wv.y*k,0,2)/k;
          /* a ball higher than his glove can reach: he gets up that much higher */
          {
            const ex=f.wallE.x*(m?-1:1),ez=f.wallE.z;
            D.ex=D.sx+(ex*cs+ez*sn)*k;
            D.ez=D.sz+(-ex*sn+ez*cs)*k;
          }
          if(f.wallB){
            const bx=f.wallB.x*(m?-1:1),bz=f.wallB.z;
            D.bx=D.sx+(bx*cs+bz*sn)*k;
            D.bz=D.sz+(-bx*sn+bz*cs)*k;
          }
          /* (where his BODY is as he goes up: the circle on the ground is drawn there, under him, not out at the end of his glove arm) */
          pl.tgt={
            x:D.sx,z:D.sz,face:yaw,lead:Math.max(0,pl.endT-D.t0)
          }
          ;
        }
      }
      const tS=pl.tS||0,g=pl.tgt,u=clamp((tf-tS)/Math.max(.2,(pl.tField||pl.endT)-tS-g.lead),0,1);
      // A ball that is going to drop and then carry on (to the wall, into the gap): he runs at the landing circle first, the way a
      // fielder reads it, and only then plays the hop. Not a bee-line to where it will end up, as if he knew.
      let A=pl.from,Bq=g,uu=u;
      {
        const L=flight.tr.land,tE=(pl.tField||pl.endT)-g.lead;
        if(f.of&&pl.type==='hit'&&!pl.air&&!pl.dive&&L&&!tS&&L.t>.8&&L.t<tE-.5){
          if(pl.via===undefined){
            const dx=L.x-pl.from.x,dz=L.z-pl.from.z,d=Math.hypot(dx,dz)||1;
            let k=Math.min(1,f.speed*1.1*Math.max(0,L.t-f.react)/d)*Math.max(0,(d-1.5)/d);
            for(let i=0;
            i<6;
            i++){
              const vx=pl.from.x+dx*k,vz=pl.from.z+dz*k;
              if(Math.hypot(g.x-vx,g.z-vz)/(tE-L.t)<=f.speed*1.5)break;
              k*=.6;
            }
            pl.via=k*d>1.5?{
              x:pl.from.x+dx*k,z:pl.from.z+dz*k
            }
            :null;
          }
          if(pl.via){
            if(tf<L.t){
              Bq=pl.via;
              uu=clamp(tf/L.t,0,1);
            }
            else{
              A=pl.via;
              uu=clamp((tf-L.t)/Math.max(.2,tE-L.t),0,1);
            }
          }
        }
      }
      const px=lerp(A.x,Bq.x,ease(uu)),pz=lerp(A.z,Bq.z,ease(uu));
      const moving=Math.hypot(Bq.x-A.x,Bq.z-A.z)>1.2&&uu<.97;
      if(moving){
        const mx=Bq.x-A.x,mz=Bq.z-A.z,ml=Math.hypot(mx,mz),face=Math.atan2(-r.position.x,-r.position.z);
        // moving mostly across the field (not in or back) over a shortish distance: shuffle sideways, still facing the plate
        const lat=(mx*Math.cos(face)-mz*Math.sin(face))/ml;
        if(f.strAct&&Math.abs(lat)>.86&&ml<22){
          strafe=lat>0?1:-1;
          r.rotation.y=face;
        }
        else r.rotation.y=Math.atan2(mx,mz);
        if(f.t180Act&&!tS&&!strafe&&ml>9&&(mx*Math.sin(face)+mz*Math.cos(face))/ml<-.55){
          const tt=tf*1.3;
          if(tt<f.t180Act.dur-.04){
            turnT=tt;
            let dd=Math.atan2(mx,mz)-(face+PI);
            dd=Math.atan2(Math.sin(dd),Math.cos(dd));
            r.rotation.y=face+dd*ease(clamp(tt/f.t180Act.dur,0,1));
          }
        }
        /* going back on one: the turn-and-run clip does the spin (it ends facing dead away from the plate), and he is eased onto his real line as it plays */
        f.ph+=dt*13;
        applyPose(f.fig,runPose(f.ph));
        running=true;
      }
      else if(pl.air)applyPose(f.fig,POSE.fCatch);
      else{
        // a ball on the ground is fielded: square up to it, get the glove down as it arrives, come up with it, then turn to throw
        const tA=pl.tField||pl.endT,k=clamp(1-(tA-tf)/.26,0,1)*(1-clamp((tf-tA-.1)/.2,0,1));
        applyPose(f.fig,lerpPose(POSE.fReady,POSE.fScoop,ease(k),tmpPose));
        const bx=ball.position.x-r.position.x,bz=ball.position.z-r.position.z;
        if(tf<tA&&Math.hypot(bx,bz)>.8){
          let d=Math.atan2(bx,bz)-r.rotation.y;
          d=Math.atan2(Math.sin(d),Math.cos(d));
          r.rotation.y+=d*Math.min(1,dt*9);
        }
        else if(flight.thr&&tf>tA+.1){
          let d=Math.atan2(flight.thr.to.x-r.position.x,flight.thr.to.z-r.position.z)-r.rotation.y;
          d=Math.atan2(Math.sin(d),Math.cos(d));
          r.rotation.y+=d*Math.min(1,dt*9);
        }
      }
      {
        const rr=Math.hypot(px,pz),fr=fenceR(Math.atan2(px,-pz))-1.1;
        if(rr>fr){
          r.position.x=px*fr/rr;
          r.position.z=pz*fr/rr;
        }
        else{
          r.position.x=px;
          r.position.z=pz;
        }
      }
      // no fielder ever goes into or through the wall
      {
        const sd=r.position.x<0?-1:1,d=(r.position.x*sd-70)*-.855+(r.position.z+70)*-.518;
        if(d<1.1){
          r.position.x+=sd*-.855*(1.1-d);
          r.position.z+=-.518*(1.1-d);
        }
      }
      // ...nor through the side walls down the lines: a ball that hops out of play is left for the umpire
      if(mocap&&!moving){
        const ct=CATCH.t-(pl.endT-tf);
        if(ct>=CATCH.t-g.lead-.001){
          clipT=clamp(ct,CATCH.start,CATCH.end);
          r.rotation.y=g.face;
        }
      }
      {
        const D=pl.dive&&pl.dive.f===f?pl.dive:pl.wj&&pl.wj.f===f?pl.wj:null;
        if(D&&D.t0!==undefined){
          const dT=tf-D.t0;
          const DV=D.wall?f.wv:(f.dv||DIVE);
          if(dT>=0&&(dT<DV.end||(!D.miss&&!D.up&&!flight.thr))){
            diving=true;
            wallj=!!D.wall;
            dmir=D.mir;
            clipT=Math.min(dT,DV.end-.02);
            /* HE MADE THE CATCH: he stays down with it where he landed until the play is over. (He used to snap from flat on the ground to standing in a ready crouch the instant the clip ran out, which read as a teleport.) */
            running=false;
            r.position.x=D.sx;
            r.position.z=D.sz;
            r.rotation.y=D.yaw;
            if(!D.thud&&dT>=DV.t+.12){
              D.thud=true;
              noise(.12,'lowpass',420,90,.6);
              tone('sine',95,40,.18,.5);
              burst(fxS,_p.set(D.x,.15,D.z),14,3,.5,[.75,.75,.78],4);
            }
          }
          // he hits the dust
          else if(dT>=DV.end&&!D.up){
            D.up=true;
            r.position.x=D.ex;
            r.position.z=D.ez;
            // back on his feet where the dive left him
            if(D.miss){
              const bp={
                x:D.cx,z:D.cz
              }
              ;
              pl.from=new V3(D.ex,0,D.ez);
              pl.tS=tf;
              pl.tgt={
                x:bp.x,z:bp.z,face:Math.atan2(-bp.x,-bp.z),lead:0
              }
              ;
            }
            // up, and after the ball wherever it has rolled to
            else{
              pl.from=new V3(D.ex,0,D.ez);
              pl.tS=tf;
              pl.tgt={
                x:D.ex,z:D.ez,face:D.yaw,lead:0
              }
              ;
            }
          }
        }
      }
    }
    else if(flight&&flight.tr.offF&&flight.tr.offF.f===f&&flight.play.type==='hit'&&flight.tr.offF.px!==undefined){
      /* THE MAN WHO IS ABOUT TO WEAR ONE GETS IN FRONT OF IT FIRST: he breaks from where he was playing to the spot the ball crosses, so it really does hit him (he used to stand at his position and fall over while the ball went by yards away) */
      const O=flight.tr.offF;
      if(tf<O.t){
        const u=clamp((tf-Math.min(f.react,O.t*.4))/Math.max(.05,O.t-Math.min(f.react,O.t*.4)),0,1),mv=Math.hypot(O.px-f.home.x,O.pz-f.home.z);
        r.position.x=lerp(f.home.x,O.px,u);
        r.position.z=lerp(f.home.z,O.pz,u);
        if(mv>.6&&u>0&&u<.92){
          r.rotation.y=Math.atan2(O.px-f.home.x,O.pz-f.home.z);
          f.ph+=dt*13;
          applyPose(f.fig,runPose(f.ph));
          running=true;
        }
        else{
          r.rotation.y=Math.atan2(-r.position.x,-r.position.z);
          idle=true;
          if(!f.rdyAct)applyPose(f.fig,POSE.fReady);
        }
      }
    }
    else if(flight&&!flight.play.f&&f.of&&flight.play.type==='hr'){
      // watch it leave
      applyPose(f.fig,POSE.pSet);
      r.rotation.y=Math.atan2(ball.position.x-r.position.x,ball.position.z-r.position.z);
    }
    else if(flight&&flight.play.f&&flight.play.f!==f&&!flight.play.f.of&&!flight.play.air&&f===fielders[0]){
      // a ground ball to another infielder: the first baseman breaks for the bag, sets up on it and gives a target
      const bx=19.15,bz=-19.75,u=clamp(tf/.85,0,1),px=lerp(f.home.x,bx,ease(u)),pz=lerp(f.home.z,bz,ease(u)),src=flight.play.f.fig.root.position;
      r.position.x=px;
      r.position.z=pz;
      if(u<.97){
        r.rotation.y=Math.atan2(bx-f.home.x,bz-f.home.z);
        f.ph+=dt*13;
        applyPose(f.fig,runPose(f.ph));
        running=true;
      }
      else{
        let d=Math.atan2(src.x-px,src.z-pz)-r.rotation.y;
        d=Math.atan2(Math.sin(d),Math.cos(d));
        r.rotation.y+=d*Math.min(1,dt*10);
        applyPose(f.fig,POSE.fCatch);
      }
    }
    else{
      idle=true;
      if(!f.rdyAct){
        const P=lerpPose(POSE.fReady,POSE.fReady,0,tmpPose);
        P.y+=Math.sin(now*2+f.ph)*.012;
        applyPose(f.fig,P);
      }
    }
    if(f.rt){
      let thrT=-1;
      if(flight&&flight.thr&&flight.play.f===f&&f.thrAct){
        const e=(now-flight.thr.t0)*1.3;
        if(e>=0){
          thrT=Math.min(e,f.thrDur-.02);
          // hold the follow-through until the play is over
          r.rotation.y=Math.atan2(flight.thr.to.x-r.position.x,flight.thr.to.z-r.position.z)-(THROW_CAP?THR_YAW:0);
        }
        else if(f.of&&now>=flight.thr.t0-(flight.thr.pick||.3)&&!running){
          thrT=.02;
          r.rotation.y=Math.atan2(flight.thr.to.x-r.position.x,flight.thr.to.z-r.position.z)-(THROW_CAP?THR_YAW:0);
        }
      }
      /* HE HAS IT AND HE IS SET: from the moment he picks the ball up he stands turned to his target at the start of his throwing motion and stays there. (He used to drop back into the fielder's ready crouch between fielding it and throwing it.) */
      // a no-doubter: the outfielders sag as it goes over; during the trot everyone does
      let defT=-1;
      if(f.defActs&&f.defActs.length&&flight&&flight.play.type==='hr'&&flight.admire&&(f.of||S.state==='trot')){
        const e=now-flight.t0-1.1-(f.ph%1)*.5;
        if(e>=0)defT=e;
      }
      let drT=-1;
      const _ko=f.dieAct||f.koAct,_mis=flight&&flight.play&&flight.play.misplay&&flight.play.f===f&&f.koAct?(flight.play.mis||(flight.play.mis={
        t:Math.max(0,flight.play.p.t-.16),f
      }
      )):null,_of=flight&&flight.tr.offF&&flight.tr.offF.f===f&&f.dieAct?flight.tr.offF:_mis;
      /* (an outfielder's misplay: he is under it, it hits him a beat before it would have landed, and he goes down) */
      if(_ko&&_of&&flight.play.type==='hit'){
        const e=now-flight.t0-_of.t;
        if(e>=0){
          drT=e;
          const O=_of;
          if(O===_mis&&!O.fx){
            O.fx=1;
            try{
              SND.mitt();
              tone('sine',120,45,.2,.6);
              shake=Math.max(shake,.4*FX);
              burst(fxS,_p.set(r.position.x,1.3,r.position.z),18,4,.5,[1,.9,.5],2,1);
            }
            catch(x){
            }
          }
          if(O.x===undefined){
            O.x=r.position.x;
            O.z=r.position.z;
            O.yaw=Math.atan2(-r.position.x,-r.position.z);
          }
          {
            const h=Math.hypot(O.x,O.z)||1,kb=1.5*(1-Math.pow(1-Math.min(1,e/.4),2));
            r.position.x=O.x+O.x/h*kb;
            r.position.z=O.z+O.z/h*kb;
          }
          r.rotation.y=O.yaw;
        }
      }
      /* it takes him off his feet and carries him back a stride and a half */
      const mode=drT>=0?'drilled':defT>=0?'defeat':diving?(wallj?'wall':'dive'):thrT>=0?'throw':clipT>=0?'catch':turnT>=0?'turn180':running&&strafe?'strafe':running&&f.runAct?'run':idle&&f.rdyAct?'ready':'pose';
      if(mode!==f.mode){
        f.mode=mode;
        if(f.mixer)f.mixer.stopAllAction();
        f.obj.position.set(0,0,0);
        if(f.glR){
          f.glR.visible=mode==='wall';
          if(f.glL)f.glL.visible=mode!=='wall';
        }
        /* the leap is made with the glove on the other hand */
        if(mode==='wall')f.wallAct.reset().play();
        else if(mode==='ready'){
          f.rdyAct.reset().play();
          f.rdyLast=-1;
        }
        else if(mode==='dive')f.diveAct.reset().play();
        else if(mode==='catch')f.act.reset().play();
        else if(mode==='run')f.runAct.reset().play();
        else if(mode==='strafe')f.strAct.reset().play();
        else if(mode==='turn180')f.t180Act.reset().play();
        else if(mode==='throw')f.thrAct.reset().play();
        else if(mode==='drilled')(f.dieAct||f.koAct).reset().play();
        else if(mode==='defeat'){
          f.defAct=f.defActs[(Math.random()*f.defActs.length)|0];
          f.defAct.reset().play();
        }
      }
      f.obj.scale.x=f.sx*((mode==='strafe'&&strafe<0)||((mode==='dive'||mode==='wall')&&dmir)?-1:1);
      if(mode==='dive'){
        f.diveAct.time=clipT;
        f.mixer.update(0);
      }
      else if(mode==='wall'){
        f.wallAct.time=clipT;
        f.mixer.update(0);
        const u=(clipT-f.wv.t+.32)/.64;
        f.obj.position.y=u>0&&u<1?(f.wLift||0)*Math.sin(PI*u):0;
      }
      else if(mode==='ready'){
        f.rdyT=((f.rdyT||0)+dt)%f.rdyDur;
        const q=Math.floor(f.rdyT*30);
        if(q!==f.rdyLast){
          f.rdyLast=q;
          f.rdyAct.time=f.rdyT;
          f.mixer.update(0);
        }
      }
      /* the set position between pitches: up on the balls of his feet, swaying (posed 30 times a second, which is plenty for a man standing still) */
      else if(mode==='drilled'){
        const A=f.dieAct||f.koAct;
        A.time=Math.min(A.dur-.02,drT+1.15);
        f.mixer.update(0);
      }
      /* the clip opens with a slow stagger: skipped, so he is going down the instant it hits him */
      else if(mode==='catch'){
        f.act.time=clipT;
        f.mixer.update(0);
        f.obj.position.set(-f.startOff.x,0,-f.startOff.z);
      }
      else if(mode==='defeat'){
        f.defAct.time=Math.min(f.defAct.dur-.02,defT);
        f.mixer.update(0);
      }
      else if(mode==='throw'){
        f.thrAct.time=thrT;
        f.mixer.update(0);
      }
      else if(mode==='strafe'){
        f.runT=(f.runT+dt*f.speed/4.2)%f.strDur;
        f.strAct.time=f.runT;
        f.mixer.update(0);
      }
      else if(mode==='turn180'){
        f.t180Act.time=turnT;
        f.mixer.update(0);
      }
      else if(mode==='run'){
        f.runT%=f.runDur;
        f.runT=(f.runT+dt*f.speed/4.4)%f.runDur;
        f.runAct.time=f.runT;
        f.mixer.update(0);
      }
      // stride rate follows how fast he is covering ground
      else retargetFig(f.fig,f.rt);
    }
  }
}
