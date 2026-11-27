// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── wallV  (index.html L4635)
function wallV(phiDeg,la,h){
  try{
    const a=phiDeg*DEG,e=la*DEG,at=sp=>{
      const tr=simulate(new V3(0,1,0),new V3(Math.sin(a)*Math.cos(e)*sp,Math.sin(e)*sp,-Math.cos(a)*Math.cos(e)*sp));
      if(tr.hr)return 99;
      if(!tr.wall)return -1;
      for(const q of tr.pts)if(q.t>=tr.wallT)return q.y;
      return -1;
    }
    ;
    let lo=36,hi=58;
    if(at(hi)<h)return 0;
    for(let i=0;
    i<8;
    i++){
      const mid=(lo+hi)/2;
      if(at(mid)<h)lo=mid;
      else hi=mid;
    }
    const y=at(hi);
    return y<90&&Math.abs(y-h)<2.2?hi:0;
  }
  catch(x){
    return 0;
  }
}


// ───────── simulate  (index.html L4637)
function simulate(p0,v0,spin,opt){
  spin=spin||{
    side:0,lift:0
  }
  ;
  opt=opt||{
  }
  ;
  const GG=G*(opt.g||1);
  let tag='',hrY=0,poleT=0,nb=0,hopT=0;
  // opt.chop: first bounce is a big one; opt.g: a low-gravity pocket; tag: anything unusual that happened to it
  const p=p0.clone(),v=v0.clone(),pts=[];
  let t=0,land=null,hr=false,hrT=0,wall=false,wallT=0,foul=false,dist=0,grd=false,eyeT=0,twT=0,twD=null,twP=null,seatT=0,seatB=0,patN=0,patOut=false,outT=0,outD=0,foulT,bagPast=false,foulOver=false;
  const dt=1/120;
  while(t<(outT?outT+7:hr?14:9)){
    const sp=v.length();
    v.multiplyScalar(1-DRAG*sp*dt);
    if(p.y>0||v.y>0)v.y-=GG*dt;
    if(!land&&p.y>.3){
      const h=Math.hypot(v.x,v.z)||1,k=sp/40*dt;
      // sidespin hooks/slices, backspin carries, topspin dives
      v.x+=-v.z/h*spin.side*k;
      v.z+=v.x/h*spin.side*k;
      v.y+=spin.lift*k;
    }
    p.addScaledVector(v,dt);
    t+=dt;
    if(foulOver){
      pts.push({
        x:p.x,y:p.y,z:p.z,t
      }
      );
      if(p.y<=Math.min(24,4+(Math.hypot(p.x,p.z)-95)*.6)||p.y<=3||t>8.9){
        seatT=t;
        break;
      }
      continue;
    }
    /* comes down onto the bank of seats beyond the wall */
    const r=Math.hypot(p.x,p.z),phi=Math.atan2(p.x,-p.z),fr=fenceR(phi);
    // The walls down the lines and the seats behind them are solid. A ball that reaches the wall below its top comes back off it; one that
    // clears it comes down among the fans and stays there. (Everything beyond those walls is foul ground.)
    if(!hr&&!grd&&p.z<-4&&p.z>-71){
      const sw=p.x<0?-1:1,e=-((p.x*sw-70)*-.855+(p.z+70)*-.518);
      if(e>0){
        const nx=.855*sw,nz=.518;
        if(p.y<=1.9&&e<.8){
          const vn=v.x*nx+v.z*nz;
          if(vn>0){
            v.x-=1.45*vn*nx;
            v.z-=1.45*vn*nz;
            v.multiplyScalar(.6);
          }
          p.x-=nx*(e+.06);
          p.z-=nz*(e+.06);
          if(!land){
            land={
              x:p.x,z:p.z,t
            }
            ;
            foul=true;
          }
        }
        else if(p.y<=(e<1?1.9:1.9+(e-1)*.64)+.9){
          if(!land){
            land={
              x:p.x,z:p.z,t
            }
            ;
            foul=true;
          }
          seatT=t;
          pts.push({
            x:p.x,y:p.y,z:p.z,t
          }
          );
          break;
        }
      }
    }
    if(!hr&&!grd&&r>=fr){
      const WH=wallH(phi);
      {
        const off=Math.abs(p.x)-(.216-p.z);
        // how far outside the chalk it is as it reaches the fence
        if(!land&&off>LINE_TOL&&off<LINE_TOL+.7&&p.y>WH&&p.y<26){
          hr=true;
          hrT=t;
          hrY=p.y;
          poleT=t;
          tag='OFF THE FOUL POLE';
          v.x*=-.35;
          v.z*=.25;
          v.y*=.4;
        }
        else if(!land&&off<=LINE_TOL&&off>-3.2&&p.y>WH&&p.y<26){
          hr=true;
          hrT=t;
          hrY=p.y;
          poleT=t;
          tag='OFF THE FOUL POLE';
          v.x*=.12;
          v.z*=-.12;
          v.y=v.y*.3-1;
        }
      }
      /* the screen that runs up the fair side of the pole: it catches the ball and drops it, and it is a home run */
      // the pole is fair: it clangs off and drops
      if(!hr&&Math.abs(p.x)>.216-p.z+LINE_TOL){
        if(!land)foul=true;
        else wall=true;
        if(!land&&p.y>WH+1){
          foulOver=true;
          pts.push({
            x:p.x,y:p.y,z:p.z,t
          }
          );
          continue;
        }
        /* a foul fly past the pole keeps going: it finishes its flight and drops into the seats, it is never frozen in mid-air */
        pts.push({
          x:p.x,y:p.y,z:p.z,t
        }
        );
        break;
      }
      // out of play down the line: foul only if it never came down fair
      if(hr){
      }
      else if(p.y>WH&&!land){
        hr=true;
        hrT=t;
        hrY=p.y;
      }
      else if(!land&&!wall&&p.y>WH-.4&&Math.random()<.5){
        hr=true;
        hrT=t;
        hrY=WH;
        tag='OFF THE TOP OF THE WALL';
        v.y=Math.abs(v.y)*.3+4.5;
        v.x*=.45;
        v.z*=.45;
      }
      // catches the top of the wall and hops over
      else if(p.y>WH&&!wall){
        grd=true;
      }
      // bounced in play and hopped the wall: ground-rule double
      else{
        if(WH>3.5&&p.y>3.4&&!land&&!tag)tag=phi>0?'OFF THE ARCADE':'OFF THE PORCH';
        const rx=p.x/r,rz=p.z/r,_fn=ALLEY_R&&phi>0&&phi<PI/4?fenceN(phi):[rx,rz],nx=_fn[0],nz=_fn[1],vn=v.x*nx+v.z*nz;
        if(vn>0){
          v.x-=1.35*vn*nx;
          v.z-=1.35*vn*nz;
          v.multiplyScalar(.7);
        }
        p.x=rx*(fr-.15);
        p.z=rz*(fr-.15);
        /* THE BALL STAYS WHERE IT HIT: it is set back just inside the wall along its own line from the plate (BUILD 935 set it back along the wall's normal instead, which moved it sideways round the park, as far as foul ground). Left and center come off the wall exactly as they always did; only the two straight walls in right use the wall's true face. */
        if(!wall)wallT=t;
        wall=true;
      }
    }
    if(hr&&Math.abs(phi)<8*DEG){
      // the batter's eye is a solid slanted wall behind the center-field fence: the ball caroms off it
      const d=r-fr,hy=WALL_H+(d-1.3)*2.026;
      if(d>1.3&&d<9&&p.y<hy){
        const nx=p.x/r,nz=p.z/r,n3x=-.897*nx,n3y=.443,n3z=-.897*nz,vn=v.x*n3x+v.y*n3y+v.z*n3z;
        if(vn<0){
          if(!eyeT){
            eyeT=t;
            const q=p.clone(),w=v.clone();
            let n=0;
            while(q.y>0&&n++<2000){
              const sp2=w.length();
              w.multiplyScalar(1-DRAG*sp2*dt);
              w.y-=G*dt;
              q.addScaledVector(w,dt);
            }
            dist=Math.hypot(q.x,q.z);
          }
          // distance is where it would have come down
          v.x-=1.62*vn*n3x;
          v.y-=1.62*vn*n3y;
          v.z-=1.62*vn*n3z;
          v.multiplyScalar(.8);
          p.y=hy+.03;
        }
      }
    }
    // comes off the panel up and back toward the field
    /* THE LIGHT TOWERS ARE SOLID: a homer that carries all the way to one no longer passes through it. It clangs off the mast (or the bank of lamps on top), and drops. */
    if(hr&&!twT&&r-fr>48&&r-fr<84&&p.y<95){
      if(!TWP.length)[-58,-24,24,58].forEach(d=>{
        const q=pol(fenceR(d*DEG)+66,d*DEG,0);
        TWP.push([q.x,q.z]);
      }
      );
      for(const W of TWP){
        const ex=p.x-W[0],ez=p.z-W[1],dd=Math.hypot(ex,ez),hw=p.y>79?10.5:lerp(5.6,2.6,p.y/79);
        if(dd<hw){
          const nx=ex/(dd||1),nz=ez/(dd||1),vn=v.x*nx+v.z*nz;
          if(vn<0){
            twT=t;
            const sp=v.length()||1;
            twD={
              x:v.x/sp,y:v.y/sp,z:v.z/sp
            }
            ;
            twP={
              x:p.x,y:p.y,z:p.z
            }
            ;
            {
              const q=p.clone(),w=v.clone();
              let n=0;
              while(q.y>0&&n++<2000){
                const sp2=w.length();
                w.multiplyScalar(1-DRAG*sp2*dt);
                w.y-=G*dt;
                q.addScaledVector(w,dt);
              }
              dist=Math.hypot(q.x,q.z);
            }
            /* (the distance called is where it would have come down) */
            v.x-=1.55*vn*nx;
            v.z-=1.55*vn*nz;
            v.multiplyScalar(.55);
            if(!tag)tag='OFF THE LIGHT TOWER';
          }
          break;
        }
      }
    }
    if(patN&&r-fr>ARC_W&&!patOut){
      if(p.y<ARC_H+PAT_H+1.1){
        const nx=p.x/r,nz=p.z/r,vr=v.x*nx+v.z*nz;
        if(vr>0){
          v.x-=1.45*vr*nx;
          v.z-=1.45*vr*nz;
          p.x-=nx*.3;
          p.z-=nz*.3;
        }
      }
      else patOut=true;
    }
    /* (the back rail) */
    if(seatB&&!patN&&t-seatB>.85){
      pts.push({
        x:p.x,y:p.y,z:p.z,t
      }
      );
      seatT=t;
      break;
    }
    /* (the hop is short: under a second, then it is somebody's souvenir) */
    if(hr||grd){
      const d=r-fr,deck=false;
      // it comes down among the fans: stopped at head height on the lower deck, or by the upper deck and its facade where there is one
      const inCv=phi>COVE_A0&&phi<COVE_A1,sy=inCv?(d>ARC_W?.7:d>PAT_D?ARC_H+PAT_H+.04:d>0?ARC_H+.25+Math.min(1,d/PAT_D)*(PAT_H-.25)+.9:0):d>34?0:d>1.5?WALL_H+.3+(d-1.5)*.667+.9:WALL_H+.2*Math.max(0,d)/1.5+.25;
      // beyond the back row there is nothing: it has left the ballpark and comes down on the Moon // the first meter and a half behind the wall is the ledge in front of row one: it stops there too
      if(p.y<=sy||d>300||(deck&&d>=30&&p.y>25&&p.y<=32+(d-30)*.667+.9)){
        // OUT OF THE STADIUM AND ONTO THE MOON: it is not swallowed up where it lands. It comes down on the regolith, bounces (long, lazy,
        // low-gravity bounces) and rolls to a stop, and that is where its flight ends.
        if(hr&&sy===0&&d>34&&d<=300&&p.y<=0){
          if(!outT){
            outT=t;
            outD=Math.hypot(p.x,p.z);
          }
          p.y=0;
          if(v.y<-1.4){
            v.y*=-.46;
            v.x*=.7;
            v.z*=.7;
          }
          else{
            v.y=0;
            const h=Math.hypot(v.x,v.z);
            if(h<.9){
              pts.push({
                x:p.x,y:0,z:p.z,t
              }
              );
              break;
            }
            const k=Math.max(0,h-6.5*dt)/h;
            v.x*=k;
            v.z*=k;
          }
          pts.push({
            x:p.x,y:p.y,z:p.z,t
          }
          );
          continue;
        }
        /* INTO THE SEATS, AND SEEN TO BE: it does not vanish the instant it reaches the crowd. It lands, kicks up off the seats (or the deck) in one short hop and THEN somebody has it. (Not the lava: that swallows it whole.) */
        /* THE PATIO IS A FLOOR, NOT A CROWD: the ball bounces on it (up to four times). A hop that clears the back rail goes on down into the lava and is a cove shot; one that does not comes off the rail and dies on the deck. */
        if(inCv&&d>PAT_D&&d<=ARC_W){
          if(!seatB)seatB=t;
          patN++;
          p.y=sy+.02;
          if(patN<=4&&Math.abs(v.y)>1.3){
            v.y=Math.abs(v.y)*.3;
            v.x*=.36;
            v.z*=.36;
            pts.push({
              x:p.x,y:p.y,z:p.z,t
            }
            );
            continue;
          }
          pts.push({
            x:p.x,y:p.y,z:p.z,t
          }
          );
          seatT=t;
          break;
        }
        if(!seatB&&sy>1.2&&d<=300){
          seatB=t;
          p.y=sy+.03;
          v.y=Math.min(6.5,Math.abs(v.y)*.36+2.4);
          v.x*=.16;
          v.z*=.16;
          pts.push({
            x:p.x,y:p.y,z:p.z,t
          }
          );
          continue;
        }
        if(seatB&&t-seatB<.12){
          pts.push({
            x:p.x,y:p.y,z:p.z,t
          }
          );
          continue;
        }
        pts.push({
          x:p.x,y:p.y,z:p.z,t
        }
        );
        seatT=t;
        break;
      }
    }
    else if(p.y<=0){
      if(!land){
        land={
          x:p.x,z:p.z,t
        }
        ;
        if(Math.abs(p.x)>.216-p.z+LINE_TOL)foul=true;
      }
      // fair or foul is settled by where it first lands, measured from the chalked lines
      p.y=0;
      if(v.y<-1.6){
        const big=opt.chop&&!nb;
        nb++;
        v.y*=big?-.45:-.42;
        v.x*=big?.84:.8;
        v.z*=big?.84:.8;
        if(!big&&!tag&&!foul&&nb<=3&&Math.hypot(v.x,v.z)>8&&(DBG.hop||Math.random()<.011)){
          const a=(Math.random()<.5?-1:1)*rand(.25,.55),cs=Math.cos(a),sn=Math.sin(a),x=v.x;
          v.x=x*cs-v.z*sn;
          v.z=x*sn+v.z*cs;
          v.y*=1.6;
          tag='MOON HOP!';
          hopT=t;
        }
      }
      // now and then it takes a wicked hop
      else{
        v.y=0;
        const h=Math.hypot(v.x,v.z);
        if(h<.6){
          pts.push({
            x:p.x,y:0,z:p.z,t
          }
          );
          break;
        }
        const k=Math.max(0,h-5.5*dt)/h;
        v.x*=k;
        v.z*=k;
      }
    }
    if(land&&!tag&&!foul&&p.y<.3){
      for(const B of [[19.4,-19.4],[0,-38.8],[-19.4,-19.4]])if(Math.hypot(p.x-B[0],p.z-B[1])<.36){
        // kicks off the bag
        const a=(Math.random()<.5?-1:1)*rand(.3,.8),cs=Math.cos(a),sn=Math.sin(a),x=v.x;
        v.x=x*cs-v.z*sn;
        v.z=x*sn+v.z*cs;
        v.y=rand(3.5,5.5);
        tag='OFF THE BAG';
        break;
      }
    }
    // The rule on a ball that comes down fair in front of the bag: it is judged where it is when it passes first or third (or where it is
    // touched). Roll foul before the bag and it is a foul ball; get past the bag fair and it is fair for good, wherever it goes after that.
    if(land&&!foul&&!hr&&!bagPast&&foulT===undefined){
      const along=(Math.abs(p.x)-p.z)*.7071,out=Math.abs(p.x)>.216-p.z+LINE_TOL;
      if(along>=27.4){
        if(out&&p.y<1.2)foulT=t;
        else bagPast=true;
      }
      else if(out&&p.y<1.2)foulT=t;
    }
    pts.push({
      x:p.x,y:p.y,z:p.z,t
    }
    );
  }
  if(outD)dist=outD;
  else if(hr&&!eyeT){
    const q=p.clone(),w=v.clone();
    let n=0;
    while(q.y>0&&n++<2000){
      const sp=w.length();
      w.multiplyScalar(1-DRAG*sp*dt);
      w.y-=G*dt;
      q.addScaledVector(w,dt);
    }
    dist=Math.hypot(q.x,q.z);
  }
  let cove=false;
  if(hr&&seatT){
    const L=pts[pts.length-1],pL=Math.atan2(L.x,-L.z),dL=Math.hypot(L.x,L.z)-fenceR(pL);
    cove=pL>COVE_A0&&pL<COVE_A1&&dL>ARC_W&&L.y<1.6;
  }
  return {
    pts,land,hr,hrT,hrY,poleT,tag,hopT,wall,wallT,foul,foulT,dist,grd,eyeT,twT,twD,twP,seatT,seatB,outT,outD,cove,endT:t
  }
  ;
}


// ───────── judge  (index.html L4711)
function judge(tr,bt){
  const pl=judge0(tr,bt),L=tr.land;
  if(pl.type!=='hit'||!L||tr.grd||(tr.wall&&tr.wallT<L.t)||L.t<2.1||Math.hypot(L.x,L.z)<46)return pl;
  let c=null,bg=1e9;
  for(const o of fielders){
    if(!o.of||!o.diveAct)continue;
    const hang=hangK(L.t),gap=Math.hypot(o.home.x-L.x,o.home.z-L.z)-(o.reach+o.speed*hang*Math.max(0,L.t-o.react));
    if(gap<bg){
      bg=gap;
      c=o;
    }
  }
  if(!c||bg<=0||bg>(DBG.dive?30:3.5))return pl;
  // a fly ball that hangs up and comes down a stride or so beyond where he could get to is caught on the run: if he is in the circle, he has it
  if(!DBG.dive&&bg<=1.6&&L.t>=2.8){
    let ci=Math.min(tr.pts.length-1,Math.round(L.t*120));
    while(ci>1&&tr.pts[ci].y<1.3)ci--;
    const q=tr.pts[ci];
    return {
      type:'out',label:'FLY OUT',endT:q.t,f:c,p:{
        x:q.x,y:q.y,z:q.z,t:q.t
      }
      ,air:true
    }
    ;
  }
  if(DBG.dive==='catch'||(DBG.dive!=='miss'&&Math.random()<.3)){
    // the catch is made while the ball is still clearly off the ground (knee height on its way down): it must never be seen to touch down first
    let ci=Math.min(tr.pts.length-1,Math.round(L.t*120));
    while(ci>1&&tr.pts[ci].y<.55)ci--;
    const q=tr.pts[ci];
    return {
      type:'out',label:'DIVING CATCH',endT:q.t,f:c,p:{
        x:q.x,y:q.y,z:q.z,t:q.t
      }
      ,air:true,dive:{
        f:c,t:q.t,x:q.x,z:q.z
      }
    }
    ;
  }
  // a dive that comes up empty is only shown when the ball stays in front of the wall: he has to be able to get up and run it down
  // in plain sight, so the play is held open long enough for that (no carom plays: they made him appear to jump to the wall)
  if(c===pl.f&&!tr.wall&&!pl.wall){
    const up=L.t+(DIVE.end-DIVE.t);
    let T=Math.max(up+.5,pl.tField||pl.endT),q=null;
    // he picks it up only when he could really have run to it from where the dive left him
    for(;
    ;
    T+=.1){
      q=tr.pts[Math.min(tr.pts.length-1,Math.round(T*120))];
      if(Math.hypot(q.x-L.x,q.z-L.z)<=7*(T-up)||T>up+7)break;
    }
    pl.dive={
      f:c,t:L.t,x:L.x,z:L.z,miss:true,cx:q.x,cz:q.z
    }
    ;
    pl.endT=Math.max(pl.endT,T);
    pl.tField=T;
  }
  return pl;
}


// ───────── judge0  (index.html L4726)
function judge0(tr,bt){
  const spd=bt&&bt.spd||1;
  // batter's speed: 0.85 (plodder) to 1.15 (burner)
  if(tr.hr){
    // a ball that only just clears can be brought back: an outfielder who can get to that spot on the wall in time sometimes goes up and takes it away
    if(!tr.tag&&!tr.eyeT&&tr.hrY-WALL_H<(DBG.robH||1.5)){
      const w=tr.pts[Math.min(tr.pts.length-1,Math.round(tr.hrT*120))];
      let c=null,bd=1e9;
      for(const o of fielders){
        if(!o.of)continue;
        const d=Math.hypot(o.home.x-w.x,o.home.z-w.z);
        if(d<bd){
          bd=d;
          c=o;
        }
      }
      if(c&&!DBG.norob&&tr.hrT>=HANG_CATCH&&bd<=10+c.speed*1.6*tr.hrT&&(DBG.rob||Math.random()<.3)){
        const wr=Math.hypot(w.x,w.z),k=(wr-1.6)/wr;
        // he makes the catch standing in front of the wall, not in it
        return {
          type:'out',label:'ROBBED AT THE WALL',endT:tr.hrT,f:c,p:{
            x:w.x*k,y:w.y,z:w.z*k,t:tr.hrT
          }
          ,air:true,rob:true,dist:tr.dist
        }
        ;
      }
    }
    return {
      type:'hr',endT:tr.endT,dist:tr.dist,tag:tr.tag||''
    }
    ;
  }
  if(tr.grd&&!tr.foul){
    // ground-rule double: the nearest outfielder still goes after it until it hops the wall
    const L=tr.land||tr.pts[tr.pts.length-1],endT=tr.endT;
    let f=null,bd=1e9;
    for(const c of fielders){
      if(c.isP||!c.of)continue;
      const d=Math.hypot(c.home.x-L.x,c.home.z-L.z);
      if(d<bd){
        bd=d;
        f=c;
      }
    }
    if(!f)return {
      type:'hit',bases:2,endT,grd:true
    }
    ;
    // IF HE WAS RIGHT THERE, IT IS HIS ERROR: an outfielder who gets under the ball and still lets it bounce over the wall did not just stand
    // and watch. He is shown arriving on the spot as it comes down, and the play is called as a misplay, so it reads as a mistake by the
    // fielder and never as the game forgetting to catch it.
    {
      const Lt=(tr.land&&tr.land.t)||endT,can=f.speed*Math.max(0,Lt-f.react);
      if(can>=bd-2.5){
        const tags=['ERROR · LOST IT IN THE LIGHTS','ERROR · MISJUDGED IT','ERROR · OFF HIS CHEST','ERROR · CLANKED IT'];
        /* (he WEARS it: the ball comes down on him and he goes over, the way an infielder does on a comebacker. The picture says "error" before the words do.) */
        return {
          type:'hit',bases:2,endT,grd:true,f,p:{
            x:L.x,y:0,z:L.z,t:Lt
          }
          ,chase:true,tag:tags[(Math.random()*tags.length)|0],misplay:true
        }
        ;
      }
    }
    const go=Math.min(bd*.85,f.speed*.9*Math.max(0,endT-f.react)),k=bd>0?go/bd:0;
    return {
      type:'hit',bases:2,endT,grd:true,f,p:{
        x:lerp(f.home.x,L.x,k),y:0,z:lerp(f.home.z,L.z,k),t:endT
      }
      ,chase:true
    }
    ;
  }
  if(!tr.foul&&tr.foulT!==undefined&&!tr.hr){
    let got=false;
    // it rolled foul short of the bag: fair only if somebody got to it first
    for(const q of tr.pts){
      if(q.t>=tr.foulT)break;
      if(q.y>2.2)continue;
      for(const c of fielders){
        if(c.of)continue;
        if(Math.hypot(c.home.x-q.x,c.home.z-q.z)<=c.reach+c.speed*Math.max(0,q.t-c.react)){
          got=true;
          break;
        }
      }
      if(got)break;
    }
    if(!got){
      tr.foul=true;
      tr.rolledFoul=true;
    }
  }
  if(tr.foul){
    const endT=tr.rolledFoul?Math.min(tr.foulT+.6,tr.endT):tr.land?Math.min(tr.land.t+.55,tr.endT):tr.endT,L=tr.rolledFoul?tr.pts[Math.min(tr.pts.length-1,Math.round(tr.foulT*120))]:tr.land||tr.pts[tr.pts.length-1];
    // a foul fly that stays in the park can be caught: inside the side walls and in front of the backstop
    const perp=(Math.abs(L.x)-(.216-L.z))/Math.SQRT2,playable=tr.land&&L.z<11&&perp<13;
    if(playable)for(const q of tr.pts){
      if(q.t>=tr.land.t)break;
      if(q.t<1.2)continue;
      for(const c of fielders){
        if(c.isP||q.y>2.2*(c.scale||1))continue;
        const d=Math.hypot(c.home.x-q.x,c.home.z-q.z);
        if(d<=c.reach+c.speed*Math.max(0,q.t-c.react))return {
          type:'out',label:'FOUL OUT',endT:q.t,f:c,p:q,air:true
        }
        ;
      }
    }
    // otherwise the nearest man gives it a courtesy run for as long as the ball is in the air
    let f=null,bd=1e9;
    for(const c of fielders){
      if(c.isP)continue;
      const d=Math.hypot(c.home.x-L.x,c.home.z-L.z);
      if(d<bd){
        bd=d;
        f=c;
      }
    }
    const go=Math.min(bd*.8,f.speed*.8*Math.max(0,endT-f.react)),k=bd>0?go/bd:0;
    return {
      type:'foul',endT,f,p:{
        x:lerp(f.home.x,L.x,k),y:0,z:lerp(f.home.z,L.z,k),t:endT
      }
      ,chase:true
    }
    ;
  }
  // A ball that is going to reach the wall on the fly burns the outfield: nobody catches it unless it hung up there long enough (4.2 s) to run down.
  const wallAir=tr.wall&&(!tr.land||tr.wallT<tr.land.t),burned=wallAir&&tr.wallT<HANG_CATCH;
  let f=null,p=null;
  const odH=!!(S.over&&S.overOn),pMiss=odH||Math.random()<.65;
  /* in Overdrive the pitcher never gloves one: anything back through the box takes him out */
  // sometimes the comebacker gets through the box
  outer:for(const q of tr.pts){
    if(q.y>3.5)continue;
    for(const c of fielders){
      if(c.isP&&pMiss&&!tr.offP&&q.t<=1.5&&q.y<=2.2&&Math.hypot(c.home.x-q.x,c.home.z-q.z)<=(c.reach+c.speed*Math.max(0,q.t-c.react))*(odH?1.7:1))tr.offP=q.t;
      // the comebacker he didn't handle: it goes off him
      const d=Math.hypot(c.home.x-q.x,c.home.z-q.z),hang=c.of?hangK(q.t):1;
      if(q.y>2.2*(c.scale||1)||(c.isP&&(q.t>1.5||pMiss))||(burned&&c.of&&q.t<tr.wallT&&d>c.reach+c.speed*Math.max(0,q.t-c.react-.7)))continue;
      /* a ball headed for the wall burns the outfield, UNLESS the man is camped under it with time to spare: then it is his */
      // a ball that hangs up there gets run down: past 4.2 s an outfielder covers up to half as much ground again
      if(d<=c.reach+c.speed*hang*Math.max(0,q.t-c.react)){
        // now and then a rocket eats an infielder up: it is on him too fast, goes off him and he goes down. Rare, so it keeps its charm,
        // except in Overdrive: a liner hit right at an infielder by a hitter in Overdrive always goes through him.
        if(!c.isP&&!c.of&&c.dieAct&&!tr.offF&&!tr.offP&&(odH||(q.t<=1.7&&q.y>.15&&q.y<=2.0&&(DBG.drill||Math.random()<.6)&&d<=c.reach+3.2))){
          tr.offF={
            t:q.t,f:c,px:q.x,pz:q.z
          }
          ;
          continue;
        }
        /* OVERDRIVE: no infielder ever handles one. Liner or grounder, the first man it reaches wears it and goes down */
        if(odH&&c.of&&c.dieAct&&!tr.offF&&!tr.offP&&q.y>.25&&q.t<=3.4&&d<=c.reach+2.2){
          tr.offF={
            t:q.t,f:c,px:q.x,pz:q.z
          }
          ;
          continue;
        }
        /* OVERDRIVE LINERS FLATTEN OUTFIELDERS TOO: a line drive hit right at one (he barely has to move for it) goes off him and he goes down */
        if(tr.offF&&tr.offF.f===c)continue;
        f=c;
        p=q;
        break outer;
      }
    }
  }
  // the pitcher only handles what comes straight back at him
  if(!f){
    p=tr.pts[tr.pts.length-1];
    let bd=1e9;
    for(const c of fielders){
      const d=Math.hypot(c.home.x-p.x,c.home.z-p.z);
      if(d<bd){
        bd=d;
        f=c;
      }
    }
    p={
      x:p.x,y:0,z:p.z,t:p.t
    }
    ;
  }
  const air=(!tr.land||p.t<tr.land.t)&&!(tr.wall&&p.t>=tr.wallT);
  // once it has come off the wall it is a live ball, not a catch
  if(air){
    // named by how it came off the bat, not by who caught it: under 20 degrees is a line drive wherever it is caught
    const a=tr.pts[0],b=tr.pts[Math.min(tr.pts.length-1,8)],la=Math.atan2(b.y-a.y,Math.hypot(b.x-a.x,b.z-a.z)||1e-6)/DEG;
    return {
      type:'out',label:f.isP?'SNAGGED BY THE PITCHER':la<20?'LINE OUT':f.of?'FLY OUT':'POP OUT',endT:p.t,f,p,air:true
    }
    ;
  }
  if(!f.of){
    const tt=p.t+1.0+Math.hypot(p.x-19.4,p.z+19.4)/36;
    // field it, a second to set and release, then the throw to first
    // the throw has to beat the runner to first: quicker men (and lefties, a step closer) get there sooner
    if(tt<3.35-(spd-1)*1.8-(bt&&bt.lh?.08:0)){
      /* a routine grounder is not always an out: about one in twelve, the throw sails or pulls the first baseman off the bag and the runner is safe on the error */
      if(Math.random()<.085)return {
        type:'hit',bases:1,endT:p.t,f,p,infield:true,tag:Math.random()<.5?'ERROR · BAD THROW':'ERROR · PULLED HIM OFF THE BAG'
      }
      ;
      return {
        type:'out',label:'GROUND OUT',endT:p.t,f,p
      }
      ;
    }
    return {
      type:'hit',bases:1,endT:p.t,f,p,infield:tt<4.2
    }
    ;
  }
  // Extra bases are a race: the runner against the fielder picking the ball up, setting, and throwing to the bag.
  // An average runner needs about 8.2 s to reach second and 11.6 s to reach third; a ball fielded cleanly in front of an outfielder is a single.
  const run=1+(spd-1)*.9,wallBall=tr.wall&&tr.wallT<p.t,relay=(bx,bz)=>p.t+.9+(wallBall?1:0)+Math.hypot(p.x-bx,p.z-bz)/38;
  // a carom takes longer to pick up and turn with
  let bases=11.6/run<relay(-19.4,-19.4)?3:8.2/run<relay(0,-38.8)?2:1;
  if(wallBall)bases=Math.max(2,bases);
  // off the wall is at least a double
  // show the ball come down (and carom off the wall) before the call; long flies used to be cut off in mid-air
  const shown=Math.max(4.4,tr.land?tr.land.t+.7:0,tr.wall?tr.wallT+.6:0);
  // A ball that gets past the outfielder (smoked into the gap, or all the way to the wall) is chased, not met: it arrives first, hits the
  // wall or rolls on, and he gets to it half a second or more behind it.
  let tF=p.t,pp=p,late=false;
  if(f.of&&(wallBall||Math.hypot(p.x,p.z)>Math.hypot(f.home.x,f.home.z)+3)){
    late=true;
    tF=p.t+(wallBall?.75:.5);
    const q=tr.pts[Math.min(tr.pts.length-1,Math.round(tF*120))];
    pp={
      x:q.x,y:0,z:q.z,t:tF
    }
    ;
  }
  return {
    type:'hit',bases,endT:Math.min(tF,shown),tField:tF,f,p:pp,wall:wallBall,late
  }
  ;
  // wall: it reached the fence before anyone got to it
}


// ───────── camped  (index.html L4987)
function camped(pl){
  try{
    if(!pl||!pl.air||pl.dive||pl.rob||!pl.f||!pl.p||!/FLY OUT|POP OUT/.test(pl.label||''))return false;
    const f=pl.f,d=Math.hypot(f.home.x-pl.p.x,f.home.z-pl.p.z),arr=(f.react||.3)+d/Math.max(3,f.speed||7);
    return (pl.p.t||pl.endT)-arr>1.2||DBG.corn;
  }
  catch(e){
    return false;
  }
}


// ───────── trail  (index.html L6298)
function trail(o,c,far,hot,pat){
  const p=ball.position,lp=o.lp||(o.lp=p.clone()),d=lp.distanceTo(p);
  if(d>12){
    lp.copy(p);
    return;
  }
  const fx=far?fxT:fxS,step=far?.16:.05,n=Math.min(40,Math.max(1,Math.round(d/step))),j=far?.05:.012;
  const ph0=o.tph||0;
  if(pat)o.tph=ph0+d;
  for(let i=1;
  i<=n;
  i++){
    _tp.lerpVectors(lp,p,i/n);
    _tp.x+=rand(-j,j);
    _tp.y+=rand(-j,j);
    _tp.z+=rand(-j,j);
    _v.set(rand(-.15,.15),rand(-.05,.3),rand(-.15,.15));
    if(pat){
      const ph=ph0+d*i/n,R=far?1.6:1;
      if(pat==='thick'){
        _tp.x+=rand(-.07,.07)*R;
        _tp.y+=rand(-.07,.07)*R;
      }
      else if(pat==='zig'){
        _tp.x+=(Math.abs((ph*1.1)%2-1)*2-1)*.11*R;
      }
      else if(pat==='helix'){
        _tp.x+=Math.cos(ph*5)*.09*R;
        _tp.y+=Math.sin(ph*5)*.09*R;
      }
      else if(pat==='burst'){
        _v.set(rand(-1.6,1.6),rand(-1.6,1.6),rand(-.4,.4));
      }
      else if(pat==='dash'){
        if(Math.floor(ph*1.6)%2)continue;
      }
      else if(pat==='wave'){
        _tp.y+=Math.sin(ph*4)*.1*R;
      }
      else if(pat==='thin'){
      }
      else if(pat==='double'){
        const sg=i%2?1:-1;
        _tp.x+=Math.cos(ph*3.2)*.15*R*sg;
        _tp.y+=Math.sin(ph*3.2)*.15*R*sg;
      }
      fx.emit(_tp,_v,rand(.45,.8),c[0]*.85,c[1]*.85,c[2]*.85);
      if(i%2===0)fx.emit(_tp,_v,rand(.1,.2),Math.min(1,c[0]+.4),Math.min(1,c[1]+.4),Math.min(1,c[2]+.4));
      continue;
    }
    if(hot){
      fx.emit(_tp,_v,rand(.45,.8),c[0],c[1]*.55,c[2]*.4);
      // cooler, longer tail
      if(i%2===0)fx.emit(_tp,_v,rand(.1,.2),Math.min(1,c[0]+.5),Math.min(1,c[1]+.5),Math.min(1,c[2]+.45));
    }
    // bright core
    else fx.emit(_tp,_v,rand(.12,.22),c[0]*.6,c[1]*.6,c[2]*.6);
  }
  lp.copy(p);
}
