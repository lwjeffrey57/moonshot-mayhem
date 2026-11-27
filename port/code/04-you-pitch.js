// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── pRate  (index.html L1548)
function pRate(st){
  const P=st.p||[],n=Math.max(1,P.length),v=Math.max(...P.map(q=>q[0])),b=P.reduce((a,q)=>a+q[2],0)/n,c=P.reduce((a,q)=>a+q[1],0)/n,g=x=>statGrade(x)+gradeMod(x);
  return {
    v,b,c,txt:'VELO '+g(.8+.4*v/100)+' \u00B7 CONTROL '+g(.82+.4*c/100)+' \u00B7 BREAK '+g(.82+.4*b/100)
  }
  ;
}


// ───────── pdTell  (index.html L1549)
function pdTell(hold){
  try{
    if(PD.gt||PD.wk)return '';
    if(PD.wsp&&PD.ph<3)return 'SCOUTING REPORT \u00B7 HIT THE GOLD TARGET TO PUT HIM AWAY';
    if(hold){
      if((S.pdPN||0)<4)return '';
      const q=pdQ(),d=PDESC[q.n]||'';
      return q.n+(d?' \u00B7 '+d:'');
    }
    /* (while you are holding a pitch: its name and what it does, once the how-to is old news) */
    const jz=!!PD.jz&&!(S.over&&S.overOn),od=!!(S.over&&S.overOn);
    if(!pdSel())return jz?'JUICE ON \u00B7 PICK A PITCH \u00B7 COSTS 1 BAR':od?'OVERDRIVE \u00B7 PICK ANY JUICE PITCH \u00B7 FREE':(S.juice<.25&&(S.pdPN||0)>=4?'NO JUICE \u00B7 PERFECT STRIKES, OUTS AND STRIKEOUTS BUILD IT':'');
    if(!(jz||od)&&(S.pdPN||0)<4)return '';
    /* (the first few pitches of a game keep the how-to line) */
    const q=pdQ(),d=PDESC[q.n]||'';
    return (jz?'JUICE \u00B7 ':'')+q.n+(d?' \u00B7 '+d:'');
  }
  catch(e){
    return '';
  }
}


// ───────── pdJz  (index.html L1551)
function pdJz(){
  try{
    const a=STAFF[mypI].jz,L=jpl().filter(q=>!q.od&&a.includes(q.n));
    return L.length?L:jpl().slice(0,4);
  }
  catch(e){
    return jpl().slice(0,4);
  }
}


// ───────── pdBtns  (index.html L1554)
function pdBtns(){
  const L=pdList(),B=$('pdbtns');
  B.classList.toggle('odf',!!(S.over&&S.overOn));
  const sig=L.map(q=>q.n).join();
  if(B._sig===sig){
    [...B.children].forEach((b,k)=>b.classList.toggle('on',k===PD.pk&&pdSel()));
    return;
  }
  B._sig=sig;
  B.innerHTML='';
  B.classList.toggle('jz',L!==PPITCH);
  if(PD.pk>=L.length)PD.pk=0;
  L.forEach((q,i)=>{
    const b=document.createElement('button');
    b.type='button';
    b.innerHTML=pdBallSvg(q)+'<span class="ab">'+(PAB[q.n]||q.n.slice(0,3))+'<em>'+pdMph(q)+'</em></span><span class="fl">'+q.n+'<small><i>VELO<b>'+q.v+'</b></i><i>CTRL<b>'+q.c+'</b></i><i>BRK<b>'+q.b+'</b></i></small></span>';
    if(q.od)b.classList.add('odp');
    b.addEventListener('pointerdown',e=>{
      e.preventDefault();
      e.stopPropagation();
      if(PD.ph===1){
        if(e!==pdEv)pdTap();
        return;
      }
      if(PD.ph!==0)return;
      pdPick(i);
      pdUI();
    }
    );
    B.appendChild(b);
  }
  );
  /* on a phone a pitch button is also the throw button, the way CONTACT and POWER are the swing: tap the pitch to start it, tap again to release */
  if(PW){
    const jz=L!==PPITCH,n=L.length;
    B.classList.toggle('many',n>4);
    [...B.children].forEach((b,k)=>{
      const a=((n>4?k*21:36+k*42))*DEG,R=n>4?120:100;
      /* clear air between the dial and the keys, even when one is pressed, picked or pulsing */
      b.style.left=(112+Math.sin(a)*R)+'px';
      b.style.top=(112-Math.cos(a)*R)+'px';
    }
    );
  }
  /* round the dial, clockwise from the top right */
  [...B.children].forEach((b,k)=>b.classList.toggle('on',k===PD.pk&&pdSel()));
}


// ───────── pdDom  (index.html L1558)
function pdDom(){
  if(PD.dom)return;
  PD.dom=true;
  const B=$('pdbtns');
  [].forEach((q,i)=>{
    const b=document.createElement('button');
    b.type='button';
    b.innerHTML=q.n+'<small><i>VELO<b>'+q.v+'</b></i><i>CTRL<b>'+q.c+'</b></i><i>BRK<b>'+q.b+'</b></i></small>';
    b.addEventListener('pointerdown',e=>{
      e.preventDefault();
      e.stopPropagation();
      pdPick(i);
    }
    );
    B.appendChild(b);
  }
  );
  const pad=$('pdpad'),mv=e=>{
    if(PD.ph!==0)return;
    const r=pad.getBoundingClientRect(),u=clamp((e.clientX-r.left)/r.width,0,1),v=clamp((e.clientY-r.top)/r.height,0,1);
    // the pad is the catcher's view turned round: left on the pad is left as the PITCHER sees it, which is the plate's +x side
    PD.tx=lerp(ZONE.x1+ (ZONE.x1-ZONE.x0)*.5,ZONE.x0-(ZONE.x1-ZONE.x0)*.5,u);
    PD.ty=lerp(ZONE.y1+(ZONE.y1-ZONE.y0)*.393,ZONE.y0-(ZONE.y1-ZONE.y0)*.393,v);
    pdCur();
  }
  ;
  // AIM ON THE STRIKE ZONE ITSELF. With a mouse the target goes where the pointer is, out at the plate. With a finger it is dragged like a
  // trackpad (the target moves as the finger moves, from wherever it touched), so the thumb never has to sit on top of the zone.
  {
    const A=$('pdaim'),lim=()=>{
      PD.tx=clamp(PD.tx,ZONE.x0-.3,ZONE.x1+.3);
      PD.ty=clamp(PD.ty,ZONE.y0-.28,ZONE.y1+.28);
      pdCur();
    }
    ,
    at=e=>{
      const h=$('hud').getBoundingClientRect();
      ray.setFromCamera({
        x:(e.clientX-h.left)/h.width*2-1,y:-((e.clientY-h.top)/h.height*2-1)
      }
      ,camera);
      const o=ray.ray.origin,d=ray.ray.direction;
      if(Math.abs(d.z)<1e-5)return null;
      const t=-o.z/d.z;
      return t>0?[o.x+d.x*t,o.y+d.y*t]:null;
    }
    ;
    let last=null,dn=null,aDrag=false;
    A.addEventListener('pointerdown',e=>{
      e.preventDefault();
      if(PD.ph===1){
        if(e!==pdEv)pdTap();
        return;
      }
      if(PD.ph!==0)return;
      if(e.pointerType==='touch'&&PD.padDown){
        dn=null;
        last=null;
        return;
      }
      /* A STRAY THUMB DOES NOTHING: with the stick held, a touch anywhere that is not a button (a missed PITCH, say) neither moves the target nor lets it spring home */
      dn=[e.clientX,e.clientY,performance.now()];
      aDrag=false;
      if(e.pointerType==='touch'){
        last=[e.clientX,e.clientY];
        try{
          A.setPointerCapture(e.pointerId);
        }
        catch(x){
        }
      }
      else{
        const q=at(e);
        if(q){
          PD.tx=q[0];
          PD.ty=q[1];
          lim();
        }
      }
    }
    );
    A.addEventListener('pointermove',e=>{
      if(PD.ph!==0)return;
      if(e.pointerType==='touch'){
        if(!last)return;
        const h=$('hud').getBoundingClientRect(),k=1.5/Math.min(h.width,h.height*.6);
        if(dn&&!PD.padDown){
          let kx=e.clientX-dn[0],ky=e.clientY-dn[1];
          if(!aDrag&&Math.hypot(kx,ky)<8)return;
          aDrag=true;
          PD.holding=true;
          pdHold(kx,ky);
          const Ln=Math.hypot(kx,ky);
          if(Ln>42){
            kx*=42/Ln;
            ky*=42/Ln;
          }
          const kn=$('pdcur');
          kn.style.transition='none';
          kn.style.transform='translate('+kx+'px,'+ky+'px)';
        }
      }
      else{
        const q=at(e);
        if(q){
          PD.tx=q[0];
          PD.ty=q[1];
          lim();
        }
      }
    }
    );
    A.addEventListener('pointerup',e=>{
      if(MOB){
        if(PD.padDown||!aDrag){
          dn=null;
          last=null;
          return;
        }
        /* (a tap that never dragged, or one made while the stick is held, leaves the target exactly where it is) */
        const kn=$('pdcur');
        kn.style.transition='';
        kn.style.transform='';
        dn=null;
        aDrag=false;
        PD.holding=false;
        pdHome();
        return;
      }
      if(dn&&PD.ph===0&&Math.hypot(e.clientX-dn[0],e.clientY-dn[1])<10&&performance.now()-dn[2]<350)pdTap();
      dn=null;
    }
    );
    /* a plain tap (or click) with the spot already chosen starts the delivery: no need to reach for THROW */
    ['pointerup','pointercancel'].forEach(n=>A.addEventListener(n,()=>{
      last=null;
    }
    ));
  }
  // THE THUMB PAD (phones): the left thumb rests on it. Where the thumb is on the pad is where the pitch goes in the zone, and a tap right
  // where the thumb already was throws it: no reaching across the screen. (A tap somewhere else on the pad just moves the target there.)
  /* THE STICK WORKS LIKE THE BATTING ONE: push it and the target moves that way from where it was; let go and the cap springs back (the target stays put). */
  let st=null;
  const kn=$('pdcur'),zw=ZONE.x1-ZONE.x0,zh=ZONE.y1-ZONE.y0;
  pad.addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    if(PD.ph===1){
      if(e!==pdEv)pdTap();
      return;
    }
    if(PD.ph!==0)return;
    if(PD.drillArm){
      PD.drillArm=false;
      pdUI();
    }
    /* (back on the stick: the drill is called off) */
    try{
      pad.setPointerCapture(e.pointerId);
    }
    catch(x){
    }
    st=[e.clientX,e.clientY];
    PD.holding=true;
    PD.padDown=true;
    pad.classList.add('drag');
  }
  );
  pad.addEventListener('pointermove',e=>{
    if(!st||PD.ph!==0)return;
    let kx=e.clientX-st[0],ky=e.clientY-st[1];
    pdHold(kx,ky);
    const Ln=Math.hypot(kx,ky),R=42;
    if(Ln>R){
      kx*=R/Ln;
      ky*=R/Ln;
    }
    kn.style.transform='translate('+kx+'px,'+ky+'px)';
  }
  );
  ['pointerup','pointercancel'].forEach(n=>pad.addEventListener(n,()=>{
    st=null;
    PD.holding=false;
    PD.padDown=false;
    pad.classList.remove('drag');
    kn.style.transform='';
    pdHome();
  }
  ));
  document.addEventListener('pointerdown',e=>{
    if(S.state==='pduel'&&PD.on&&PD.ph===1&&!paused&&!PD.gt&&!(e.target.closest&&e.target.closest('#pausebtn,#mutebtn'))){
      inT=e.timeStamp||performance.now();
      pdEv=e;
      pdTap();
    }
  }
  ,{
    capture:true
  }
  );
  /* (pdEv: ONE TOUCH IS ONE TAP. The control under the finger also hears this touch; with three taps it was counting it twice, so the power tap threw the pitch as well) */
  /* while the ring is closing the WHOLE SCREEN is the button: the release tap counts wherever the thumb lands, the instant it lands */
  $('pdgo').addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    try{
      const g=$('pdgo');
      g.classList.remove('tap');
      void g.offsetWidth;
      g.classList.add('tap');
      setTimeout(()=>g.classList.remove('tap'),220);
    }
    catch(x){
    }
    if(PD.drillArm){
      PD.drillArm=false;
      pdDrill();
      pdUI();
      return;
    }
    if(e!==pdEv)pdTap();
  }
  );
  $('pddrill').addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    if(PW){
      if(PD.ph===0&&!PD.drilled&&!paused&&!PD.gt){
        PD.drillArm=true;
        buzz(15);
        pdUI();
      }
      return;
    }
    pdDrill();
  }
  );
  /* on a phone: choose it, then one DRILL! button to do it */
  $('pdjuice').addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    if(PD.ph!==0||paused||PD.gt)return;
    if(S.over){
      if(!S.overOn){
        S.overOn=true;
        PD.odUsed=false;
        PD.jUsedAB=true;
        PDODFX.t=now+.05;
        PDODFX.fired=false;
        SND.zap();
        buzz([20,30,60]);
        flash(.25);
        pop('OVERDRIVE!','EVERY JUICE PITCH · THIS BATTER','hot');
      }
      else if(!PD.odUsed){
        S.overOn=false;
      }
      PD.jz=false;
      PD.pk=0;
      PD.sel=false;
      pdGoHome();
      pdUI();
      return;
    }
    /* a full bar: the same button is the OVERDRIVE switch, as when batting */
    if(S.juice<.245)return;
    PD.jz=!PD.jz;
    if(PD.jz)PD.jUsedAB=true;
    PD.pk=0;
    PD.sel=!PD.jz;
    pdGoHome();
    buzz(15);
    pdUI();
  }
  );
  {
    const z=$('pdzone');
    for(let k=0;
    k<9;
    k++){
      const u=document.createElement('u');
      u.style.left=(k%3*33.33)+'%';
      u.style.top=(((k/3)|0)*33.33)+'%';
      z.appendChild(u);
    }
  }
  try{
    $('pdstyle').style.display='none';
  }
  catch(x){
  }
  $('pdstyle').addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    return;
    if(PD.ph!==0)return;
    PD.style=PD.style?0:1;
    try{
      localStorage.setItem('mm_pstyle',PD.style);
    }
    catch(x){
    }
    pdUI();
  }
  );
}


// ───────── pdCur  (index.html L1584)
function pdCur(){
  {
    const c=$('pdcur'),w=Math.round(2+pdWin()*95);
    if(c._w!==w&&!MOB){
      c._w=w;
      c.style.borderWidth=w+'px';
      c.style.width=c.style.height=(20+w*2)+'px';
      c.style.margin=(-(10+w))+'px 0 0 '+(-(10+w))+'px';
    }
  }
  /* the thicker the yellow circle, the easier the perfect release */
  const u=(ZONE.x1+(ZONE.x1-ZONE.x0)*.5-PD.tx)/((ZONE.x1-ZONE.x0)*2),v=(ZONE.y1+(ZONE.y1-ZONE.y0)*.393-PD.ty)/((ZONE.y1-ZONE.y0)*1.786),c=$('pdcur');
  if(!MOB){
    c.style.left=(u*100)+'%';
    c.style.top=(v*100)+'%';
  }
  if(PD.mark){
    PD.mark.position.set(PD.tx,PD.ty,.02);
  }
  pdArc();
}


// ───────── pdArc  (index.html L1588)
function pdArc(){
  if(!PD.on)return;
  const N=28;
  if(!PD.arc){
    const g=new T.BufferGeometry();
    g.setAttribute('position',new T.Float32BufferAttribute(new Float32Array(N*3),3));
    g.setAttribute('color',new T.Float32BufferAttribute(new Float32Array(N*3),3));
    PD.arc=new T.Line(g,new T.LineBasicMaterial({
      vertexColors:true,transparent:true,opacity:.95,depthTest:false,fog:false
    }
    ));
    PD.arc.renderOrder=27;
    PD.arc.frustumCulled=false;
    scene.add(PD.arc);
    PD.arcDots=new T.Points(g,new T.PointsMaterial({
      size:5,sizeAttenuation:false,vertexColors:true,transparent:true,opacity:.95,depthTest:false,fog:false
    }
    ));
    PD.arcDots.renderOrder=27;
    PD.arcDots.frustumCulled=false;
    scene.add(PD.arcDots);
    PD.arcP={
      rel:new V3(),brk:new V3()
    }
    ;
  }
  const show=PD.ph===0;
  PD.arc.visible=PD.arcDots.visible=show;
  if(!show)return;
  const Q=pdQ(),P=PITCHES[Q.i],pt=PD.arcP,c=P.col||[1,.9,.25],pos=PD.arc.geometry.attributes.position,col=PD.arc.geometry.attributes.color,bk=(.62+.6*Q.b/100)*PDBRK*(((!!PD.jz&&S.juice>=.245)||(S.over&&S.overOn))?1.85:1)*(1-pdTired()*.45)*pdBm();
  const SH=pdSh(P);
  pt.P=P;
  pt.k=(P.k||2.5)*PDK*SH.k;
  pt.tx=PD.tx;
  pt.ty=PD.ty;
  pt.arc=P.arc*SH.arc;
  pt.brk.set(P.brk[0]*bk*SH.bx*PDHS(),P.brk[1]*bk*SH.by,0);
  pdApex(pt);
  pt.sd=1;
  pt.wk=2.9;
  pt.ph=[0,0,0];
  try{
    MX.pit.hand.getWorldPosition(pt.rel);
  }
  catch(e){
    pt.rel.set(0,1.9,-17.2);
  }
  if(pt.rel.z>-10)pt.rel.set(0,1.9,-17.2);
  for(let i=0;
  i<N;
  i++){
    const u=i/(N-1);
    pitchPos(pt,u,_s0);
    pos.setXYZ(i,_s0.x,_s0.y,_s0.z);
    const k=.25+.75*u;
    col.setXYZ(i,c[0]*k,c[1]*k,c[2]*k);
  }
  /* faint at the hand, bright at the plate, in the pitch's own color */
  pos.needsUpdate=true;
  col.needsUpdate=true;
  PD.arc.material.visible=false;
  PD.arcDots.material.visible=false;
  pdSvg();
}


// ───────── pdApex  (index.html L1601)
function pdApex(pt){
  const bk=pt.brk;
  if(Math.hypot(bk.x,bk.y)<.15||/CURVEBALL|SLIDER|FASTBALL|METEOR|RISER|SUPERNOVA/.test(pt.P.n))return;
  /* (the curveball keeps its original big arc) */
  const ay=pt.ty-bk.y,ax=pt.tx-bk.x,Y1=ZONE.y1+.1,X0=ZONE.x0-.12,X1=ZONE.x1+.12;
  if(ay>Y1)bk.y=pt.ty-Y1;
  if(ax<X0)bk.x=pt.tx-X0;
  else if(ax>X1)bk.x=pt.tx-X1;
  const bm=pdBm();
  pt.k*=1+.35*clamp(bm-1,0,1.1);
}


// ───────── pdSvg  (index.html L1603)
function pdSvg(){
  const sv=$('pdsvg');
  if(!sv||!PD.on)return;
  const ringOn=now<(PD.ringT||0),hold=PD.ph>=2&&PD.ph<=4,show=(PD.ph===0||PD.ph===1||hold)&&S.state==='pduel';
  sv.style.display=show?'':'none';
  if(!show||!PD.arcP||!PD.arcP.P)return;
  {
    const pv=PD.ph===0?'':'none';
    /* ONCE PITCH IS PRESSED THE PATH GOES: only the timing ring is left to watch */
    $('pdpb').style.display=pv;
    $('pdpp').style.display=pv;
    $('pdgh').style.display=pv;
  }
  /* (the path only while aiming and timing) */
  const h=$('hud').getBoundingClientRect(),W=h.width,H=h.height,pt=PD.arcP,P=pt.P,c=P.col,N=40;
  let str='';
  let topY=-1e9;
  if(PD.gt){
    _s0.set(0,ZONE.y1+.14,0).project(camera);
    topY=(-_s0.y*.5+.5)*H+4;
  }
  /* (in the guide the line is kept inside the strike-zone window, clear of the caption above it) */
  const bkx=pt.brk.x,bky=pt.brk.y;
  if(Math.hypot(bkx,bky)>.15&&!/CURVEBALL|SLIDER|FASTBALL|METEOR|RISER|SUPERNOVA/.test(P.n)){
    // A BREAKING BALL IS DRAWN THE WAY THE BROADCAST TRACKERS DRAW IT: it climbs out over the top of the zone, crests, then falls off the table into the spot (the bigger the break, the higher the crest and the steeper the drop)
    const E={
      x:pt.tx,y:pt.ty,z:0
    }
    ,Ay=Math.min(Math.max(pt.ty-bky*.85,pt.ty+.12),ZONE.y1+.3),A={
      x:pt.tx-bkx*.9,y:Ay,z:-1.6
    }
    ,S0={
      x:A.x-(E.x-A.x)*.45,y:A.y-.05-Math.abs(bky)*.08,z:-5
    }
    ;
    const Q=(p0,c,p1,t)=>{
      const m=1-t;
      return {
        x:m*m*p0.x+2*m*t*c.x+t*t*p1.x,y:m*m*p0.y+2*m*t*c.y+t*t*p1.y,z:m*m*p0.z+2*m*t*c.z+t*t*p1.z
      }
      ;
    }
    ;
    const c1={
      x:(S0.x+A.x)/2,y:A.y+.03,z:(S0.z+A.z)/2
    }
    ,c2={
      x:A.x+(E.x-A.x)*.35,y:A.y+.02,z:(A.z+E.z)/2
    }
    ;
    for(let i=0;
    i<=30;
    i++){
      const t=i/30,q=t<.4?Q(S0,c1,A,t/.4):Q(A,c2,E,(t-.4)/.6);
      _s0.set(q.x,q.y,q.z).project(camera);
      const py=(-_s0.y*.5+.5)*H;
      if(py<topY)continue;
      str+=((_s0.x*.5+.5)*W).toFixed(1)+','+py.toFixed(1)+' ';
    }
  }
  else for(let N2=P.sp?110:N,i=P.sp?5:(pdSh(P).from||13);
  i<N2;
  i++){
    const u=i/(N2-1);
    pitchPos(pt,u,_s0);
    /* (a Juice pitch is drawn from much nearer the hand and with nearly three times the points, so its zig-zag, corkscrew, loop or hop is all there on the line instead of a flat streak) */
    _s0.project(camera);
    const py=(-_s0.y*.5+.5)*H;
    if(py<topY)continue;
    str+=((_s0.x*.5+.5)*W).toFixed(1)+','+py.toFixed(1)+' ';
  }
  $('pdpb').setAttribute('points',str);
  const pp=$('pdpp');
  pp.setAttribute('points',str);
  {
    const jp=!!P.sp,pd=$('pd');
    if(pd._jzp!==jp){
      pd._jzp=jp;
      pd.classList.toggle('jzp',jp);
    }
  }
  pp.setAttribute('stroke',P.sp?'#1432d8':'#d0000e');
  pp.setAttribute('stroke-width',P.sp?'5.5':'4');
  $('pdpb').setAttribute('stroke-width',P.sp?'9':'6.5');
  /* (a Juice pitch's path is drawn in dark blue and heavier, so it never reads as just another red line) */
  const lnd=PD.ph===4&&PD.pt&&PD._lp===PD.pt,mt=!lnd&&PD.meat&&PD.ph>=2&&PD.ph<=4&&PD.meatXY?clamp((now-PD.meatT)/.16,0,1):0,TX=lnd?PD.pt.tx:mt?lerp(PD.tx,PD.meatXY[0],mt):PD.tx,TY=lnd?PD.pt.ty:mt?lerp(PD.ty,PD.meatXY[1],mt):PD.ty;
  /* A MEATBALL: the target itself slides to the middle of the plate the instant it is released, and the frozen red ring goes with it (same numbers, so still concentric) */
  _s0.set(TX,TY,.02).project(camera);
  const cx=(_s0.x*.5+.5)*W,cy=(-_s0.y*.5+.5)*H;
  _s0.set(TX+.0875,TY,.02).project(camera);
  const r=Math.max(6,Math.abs((_s0.x*.5+.5)*W-cx));
  if(PD3){
    let pe=$('pdpwr'),pg=$('pdpwg');
    if(!pe){
      const par=$('pdring').parentNode;
      pg=document.createElement('div');
      pg.id='pdpwg';
      par.appendChild(pg);
      pe=document.createElement('div');
      pe.id='pdpwr';
      par.appendChild(pe);
    }
    const on=PD.ph===1&&PD.pwOn,fl=PD.ph===1&&!PD.pwOn&&PD.pwFl&&now<PD.pwFl;
    if(PD.gt){
    }
    else
    /* THE POWER RING: it swells out from the target to the outer line (everything he has) and back; the tap stops it, and the timing ring takes over from the outside in */
    if(on||fl){
      const p=on?pdPwAt(pwEl()):PD.pw,R=r*(1+6.5*p)+2,Rm=r*7.5+2;
      pe.style.display='block';
      pe.style.width=pe.style.height=(R*2)+'px';
      pe.style.transform='translate('+(cx-R)+'px,'+(cy-R)+'px)';
      pe.className=fl?(PD.pw>=1?'mx':'st'):(on&&pwEl()>PW_UP+.16?'lt':on&&pwEl()>=PW_UP*.8?'now':'');
      /* (green while it is in the MAX window, red once it is past the line and coming back) */
      {
        let cu=$('pdcue');
        if(!cu){
          cu=document.createElement('div');
          cu.id='pdcue';
          pe.parentNode.appendChild(cu);
        }
        const e2=pwEl(),teach=S.pdJ0!==undefined||gamesPlayed<=3,show=on&&teach&&e2>=PW_UP*.8&&e2<=PW_UP+.14;
        if(show){
          const held=PD.pwDown&&e2>.2;
          cu.textContent=held?'LET GO!':'TAP!';
          cu.style.transform='translate('+cx+'px,'+(cy-Rm-34)+'px) translate(-50%,-50%)';
        }
        cu.style.display=show?'block':'none';
      }
      /* TAP! (or LET GO! if the button is held): shown at the moment the ring reaches full power, on every pitch of the first half you pitch in a game, and in a new player's first three games */
      /* (the ring turns red once it is past the line and coming back: too late) */
      pe.style.opacity=fl?String(clamp((PD.pwFl-now)/.28,0,1)):'';
      pg.style.display=on?'block':'none';
      pg.style.width=pg.style.height=(Rm*2)+'px';
      pg.style.transform='translate('+(cx-Rm)+'px,'+(cy-Rm)+'px)';
    }
    else{
      pe.style.display='none';
      pg.style.display='none';
      try{
        $('pdcue').style.display='none';
      }
      catch(x){
      }
    }
    try{
      $('pdring').style.visibility=on?'hidden':'';
    }
    catch(x){
    }
  }
  if(PD.ph>=2&&PD.ph<=4&&PD.ringT&&now<PD.ringT){
    const rg=$('pdring'),g2=PD.grade===2,R=(g2?r:PD.ringLate?Math.max(4,Math.min(r*.55,r-7)):Math.max(r*(1+(PD.ringK||0)),r+8))+2;
    /* IT IS EITHER PERFECT OR IT IS NOT: perfect is one green ring exactly on the target (the white circle steps aside); anything else leaves a clear gap: early outside it, late inside it */
    rg.style.width=rg.style.height=(R*2)+'px';
    rg.style.transform='translate('+(cx-R)+'px,'+(cy-R)+'px)';
    PD.ringR=R;
  }
  if(lnd){
    const L=$('pdland'),rr=Math.max(5,r*.42);
    L.style.width=L.style.height=(rr*2)+'px';
    L.style.transform='translate('+(cx-rr)+'px,'+(cy-rr)+'px)';
    L.style.setProperty('--lo',(rr+7)+'px');
  }
  /* WHERE IT CROSSED: a baseball drawn at the ball's real size against the zone, so one that just nicks the edge is seen nicking it */
  /* the frozen ring is placed from exactly the same numbers as the target circle, in the same frame, so the two are always concentric */
  for(const id of ['pdcb','pdcc']){
    const e=$(id);
    e.style.display=(PCI_BALL&&PD.ph===0)||(PD.ph>=2&&PD.grade===2&&PD.ringT&&now<PD.ringT)?'none':'';
    /* (the timing circle stays: the ring closes onto it, and the baseball sits inside it) */
    e.style.opacity=PD.ph>=2?String(clamp((PD.ringT-now)/.35,0,1)):'';
    e.setAttribute('cx',cx.toFixed(1));
    e.setAttribute('cy',cy.toFixed(1));
    e.setAttribute('r',r.toFixed(1));
  }
  /* (with PCI_BALL the rings around the target are gone: the spinning ball IS the cursor) */
  // A BASEBALL SITS IN THE TARGET, SPINNING THE WAY THIS PITCH SPINS: its seams run across the face you see from the mound, opposite to the way the pitch breaks (a fastball's backspin rolls down toward you, a curve's topspin rolls up and away, a slider's goes sideways)
  {
    const sm=$('pdseam'),R=PD.ph>=1?Math.max(4,r*.56):PCI_BALL?Math.max(5,r*.58):Math.max(5,(r-2.5)*.68);
    /* (once PITCH is pressed the ball is small, well inside the timing circle, so the circle and the closing ring are both in plain view) */
    {
      const bv=PD.ph<=1||(PD.ph<=3&&ringOn)?'':'none';
      for(const id of ['pdbw','pdseam'])$(id).style.display=bv;
    }
    /* once PITCH is pressed the ball goes: the timing ring closes on the spot by itself */
    if(!sm.firstChild){
      let h='';
      for(let k=-3;
      k<=3;
      k++){
        const y=k*30;
        h+='<path d="M-11,'+y+' Q0,'+(y-9)+' 11,'+y+'" fill="none" stroke="#d0101c" stroke-width="1.7"/><path d="M-11,'+y+' Q0,'+(y-9)+' 11,'+y+'" fill="none" stroke="#fbfbf6" stroke-width="2.4" stroke-dasharray="1.2 2.2"/><path d="M-11,'+(y+15)+' Q0,'+(y+24)+' 11,'+(y+15)+'" fill="none" stroke="#d0101c" stroke-width="1.7"/><path d="M-11,'+(y+15)+' Q0,'+(y+24)+' 11,'+(y+15)+'" fill="none" stroke="#fbfbf6" stroke-width="2.4" stroke-dasharray="1.2 2.2"/>';
      }
      sm.innerHTML=h;
    }
    for(const id of ['pdbc','pdbw']){
      const e=$(id);
      e.setAttribute('cx',cx.toFixed(1));
      e.setAttribute('cy',cy.toFixed(1));
      e.setAttribute('r',R.toFixed(1));
    }
    let vx=P.brk[0],vy=P.brk[1];
    const L=Math.hypot(vx,vy)||1,fast=/FASTBALL|METEOR|RISER/.test(P.n);
    if(L<.12){
      vx=0;
      vy=1;
    }
    else{
      vx/=L;
      vy/=L;
    }
    if(P.n==='CHANGEUP'){
      vx=-.5;
      vy=.87;
    }
    /* a changeup is thrown with backspin tilted to the arm side, like a two-seamer: it sinks because it is slow, not because it has topspin */
    const a=Math.atan2(-vx,vy)/DEG,pnS=performance.now()/1000,off=(PD.smPh=((PD.smPh||0)+Math.min(.1,pnS-(PD.smT||pnS))*(fast?170:105))%30);
    PD.smT=pnS;
    /* the roll carries on from where it was when the pitch is changed: it used to jump to a new place in its turn (each pitch spins at its own rate), which read as a hitch */
    sm.setAttribute('transform','translate('+cx.toFixed(1)+','+cy.toFixed(1)+') rotate('+a.toFixed(1)+') scale('+(R/10).toFixed(3)+') translate(0,'+off.toFixed(2)+')');
  }
}


// ───────── pdPick  (index.html L1631)
function pdPick(i){
  if(PD.ph!==0)return;
  if(PD.gt)return;
  try{
    const b=$('pdbtns').children[i];
    if(b){
      b.classList.remove('tap');
      void b.offsetWidth;
      b.classList.add('tap');
      setTimeout(()=>b.classList.remove('tap'),240);
    }
  }
  catch(e){
  }
  /* pressed like a button on a gamepad: it keeps its own color */
  if(PD.odForce){
    buzz(8);
    return;
  }
  /* (the first Overdrive has to be switched on before anything else) */
  PD.pk=i;
  PD.sel=true;
  pdGoHome();
  try{
    pdBtns();
    pdCur();
  }
  catch(e){
  }
  [...$('pdbtns').children].forEach((b,k)=>b.classList.toggle('on',k===i));
  buzz(10);
}


// ───────── pdBallSvg  (index.html L1634)
function pdBallSvg(q){
  if(!PW)return '';
  if(!PD_SEAM){
    for(let k=-3;
    k<=3;
    k++){
      const y=k*30;
      for(const yy of [[y,y-9],[y+15,y+24]])PD_SEAM+='<path d="M-11,'+yy[0]+' Q0,'+yy[1]+' 11,'+yy[0]+'" fill="none" stroke="#d0101c" stroke-width="1.5"/><path d="M-11,'+yy[0]+' Q0,'+yy[1]+' 11,'+yy[0]+'" fill="none" stroke="#fbfbf6" stroke-width="2.2" stroke-dasharray="1.2 2.2"/>';
    }
  }
  let vx=0,vy=1,fast=false;
  try{
    const P=PITCHES[q.i],L=Math.hypot(P.brk[0],P.brk[1]);
    fast=/FASTBALL|METEOR|RISER|SINKER|CUTTER/.test(P.n);
    if(L>=.12){
      vx=P.brk[0]/L;
      vy=P.brk[1]/L;
    }
    if(P.n==='CHANGEUP'){
      vx=-.5;
      vy=.87;
    }
  }
  catch(e){
  }
  return '<svg class="bl" viewBox="-10 -10 20 20" aria-hidden="true"><g transform="rotate('+(Math.atan2(-vx,vy)/DEG).toFixed(1)+')"><g class="sm">'+PD_SEAM+'<animateTransform attributeName="transform" type="translate" from="0 0" to="0 30" dur="'+(fast?.3:.5)+'s" repeatCount="indefinite"/></g></g></svg>';
}


// ───────── pdUI  (index.html L1639)
function pdUI(){
  const h=KBAT[PD.k],on=['','MAN ON 1ST','MAN ON 2ND','1ST & 2ND','MAN ON 3RD','CORNERS','2ND & 3RD','BASES LOADED'][PD.bases[0]+PD.bases[1]*2+PD.bases[2]*4];
  S.balls=PD.balls;
  S.strikes=PD.strikes;
  S.outs=Math.min(2,PD.outs);
  S.bases=PD.bases.slice();
  /* the scorebug and the little diamond show the Krakens' at-bat while the player pitches */
  [...$('pdzone').children].forEach((u,k)=>{
    u.className=h.hot[k]>0?'h':h.hot[k]<0?'c':'';
  }
  );
  if(PD.hz)PD.hz.forEach((m,k)=>{
    const v=h.hot[k];
    m.material.color.setHex(v>0?0xff3a1e:0x2a8cff);
    m.material.opacity=v?.5:0;
  }
  );
  /* his hot zones (red) and cold zones (blue) on the aiming pad */
  {
    const st=$('pdstam');
    st.firstChild.style.width=Math.round(clamp(S.pStam,0,1)*100)+'%';
    st.classList.toggle('lo',S.pStam<.4);
    $('pddrill').disabled=!!PD.drilled||PD.ph!==0;
    $('pdgo').style.visibility=PD.ph===-1?'hidden':'';
    if(PW){
      const arm=PD.ph===1||(PD.ph===0&&!!PD.drillArm),g=$('pdgo');
      $('pd').classList.toggle('arm',arm);
      g.classList.toggle('dr',!!PD.drillArm);
    }
    try{
      overCheck();
    }
    catch(e){
    }
    const j=$('pdjuice');
    j.disabled=S.juice<.245&&!PD.jz&&!S.over;
    if(S.juice<.245)PD.jz=false;
    j.classList.toggle('on',!!PD.jz||(S.over&&S.overOn));
    j.classList.toggle('od',!!S.over);
    j.textContent=S.over?(S.overOn?'OD\nON':'OVER\nDRIVE'):PD.jz?'JUICE\nON':'JUICE';
    if(PW)$('pddrill').textContent='DRILL\nHIM';
    j.dataset.n='×'+Math.floor(S.juice*4+.02);
  }
  {
    const gr=v=>{
      const g=statGrade(.85+.32*clamp((v-.8)/.4,0,1)*1.02);
      return '<b class="g'+g+'" style="color:'+GRADE_COL[g]+'">'+g+gradeMod(.85+.32*clamp((v-.8)/.4,0,1)*1.02)+'</b>';
    }
    ,th=h.pow*.55+h.con*.45,lv=th>1.06?['DANGEROUS','#d2261a']:th>.98?['SOLID','#c98a12']:['BEATABLE','#1f8a4a'];
    $('pdrat').innerHTML='<b class="tgem" data-tier="'+tierOf(ovrK(h))+'">'+ovrK(h)+'</b><i>'+(MOB?'PWR ':'POWER ')+gr(h.pow)+'</i><i>'+(MOB?'CON ':'CONTACT ')+gr(h.con)+'</i><i>EYE '+gr(.8+.4*h.eye)+'</i><em style="background:'+lv[1]+'">'+lv[0]+'</em>';
  }
  /* who he is and how much of a threat: his ratings, graded the same way as your own hitters */
  $('pdwho').innerHTML='<small class="bl">BATTER:</small>'+h.name;
  $('pdcnt').textContent=PD.balls+'-'+PD.strikes+' · '+PD.outs+' OUT'+(on?' · '+on:'')+' · BATTER '+(PD.n+1)+' OF 3'+(PD.rattle?' · RATTLED':'');
  try{
    pdBtns();
    const q=pdQ();
    $('pdin').textContent=q.n;
    $('pdir').innerHTML='<i>VELO<b>'+q.v+'</b></i><i>CTRL<b>'+q.c+'</b></i><i>BRK<b>'+q.b+'</b></i>';
  }
  catch(e){
  }
  try{
    hud();
  }
  catch(e){
  }
  $('pdstyle').textContent='STYLE: '+(PD.style?'METER':'TWO-TAP');
  $('pdmeter').hidden=!PD.style||PD.ph>1;
  $('pdmline').style.height=Math.max(5,Math.round(pdWin()/.8*2*100*2.3))/1+'px';
  /* the thicker the yellow band, the easier the perfect release (better control, or a Juice pitch) */
  {
    const jp=PD.ph===0&&!PD.gt&&!PD.wk&&!PD.jz&&!(S.over&&S.overOn)&&!PD.jUsedAB&&(S.over||S.juice>=.245)&&(PD.strikes===2||PD.balls+PD.strikes===0||S.over),hn=$('pdhint'),jb=$('pdjuice');
    hn.classList.toggle('jp',jp);
    jb.classList.toggle('jp',jp);
    if(jp){
      hn.textContent=S.over?'▲ OVERDRIVE READY · TAP IT: EVERY JUICE PITCH, FREE':PD.strikes===2?'▲ PUT HIM AWAY · TAP JUICE FOR A NASTIER PITCH':'JUICE READY · TAP FOR A NASTIER PITCH';
    }
  }
  /* THE JUICE NUDGE: at the start of every at-bat, and with two strikes, a bar in the tank is pointed out (once it has been used on this batter, it stops nagging) */
  if(!$('pdhint').classList.contains('jp'))$('pdhint').textContent=PD.ph===0?(pdTell()||(MOB?'AIM · HOLD PITCH · LET GO · TAP':PW?'MOUSE AIMS · 1-4 PICKS · CLICK OR SPACE TO PITCH':'POINT AT THE ZONE TO AIM · 1-4 PICK A PITCH · SPACE OR CLICK THROW TO THROW')):PD.ph===1?pdTell(true)||(PD.style?(PD.mph?'TAP ON THE YELLOW LINE':'TAP AT THE TOP FOR POWER'):(PD3&&PD.pwOn?(MOB?'HOLD · LET GO AT THE OUTER LINE · MAX POWER':'HOLD SPACE OR CLICK · LET GO AT THE OUTER LINE'):(MOB?'TAP AGAIN AS THE RING MEETS THE CIRCLE':'TAP ANYWHERE WHEN THE RING MEETS THE CIRCLE'))):'';
  const g=$('pdgo');
  if(PW){
    if(PD.drillArm&&PD.ph===0)g.textContent='DRILL!';
    else if(PD.ph>=1&&PD.ph<=3)g.textContent='TAP!';
    else if(!PD.sel)g.innerHTML='PICK A<br>PITCH';
    else{
      let q=null;
      try{
        q=pdQ();
      }
      catch(e){
      }
      g.textContent='PITCH';
    }
    /* PITCH to start the delivery, then it reads TAP! while the ring closes: the pitch's name and speed are on its key */
    g.classList.toggle('rdy',PD.ph===0&&!!PD.sel&&!PD.drillArm);
    {
      const od=!!(S.over&&S.overOn);
      g.classList.toggle('jzg',!!PD.jz||od);
      g.classList.toggle('odg',od);
    }
    $('pdbtns').classList.toggle('need',PD.ph===0&&!PD.sel&&!PD.drillArm);
  }
  else g.textContent=PD.ph===1?'NOW!':'THROW';
  g.classList.toggle('now',PD.ph===1);
  g.disabled=PD.ph>1;
  $('pdring').style.display=(PD.ph===1&&!PD.style)||(PD.ph>=2&&PD.ph<=4&&now<(PD.ringT||0))?'block':'none';
  pdCur();
}


// ───────── pdTut  (index.html L1707)
function pdTut(i){
  const T=$('ptut'),SP=$('ptspot');
  T.classList.remove('gt');
  SP.classList.remove('arw','gts');
  SP.style.borderRadius='';
  if(PW&&i===0){
    PD.tutI=-1;
    infoHold=true;
    try{
      pdUI();
    }
    catch(e){
    }
    gtEnter(1);
    gtShow();
    requestAnimationFrame(gtLoop);
    return;
  }
  if(i>=PTUT.length||i<0){
    const was=PD.gt;
    PD.gt=0;
    if(was){
      const go=$('pdgo');
      go.style.transform='';
      go.style.filter='';
      gtOff();
    }
  }
  if(i>=PTUT.length||i<0){
    T.hidden=true;
    SP.hidden=true;
    infoHold=false;
    PD.tutI=-1;
    try{
      localStorage.setItem('mm_ptut3','1');
    }
    catch(e){
    }
    PD.t=now;
    return;
  }
  PD.tutI=i;
  infoHold=true;
  const q=PTUT[i],h=$('hud').getBoundingClientRect();
  $('ptn').textContent='HOW TO PITCH · '+(i+1)+' OF '+PTUT.length;
  $('ptt').textContent=q[1];
  $('ptx').innerHTML=q[2];
  $('ptnext').textContent=i===PTUT.length-1?'PLAY BALL':'NEXT';
  let r;
  if(q[0]==='ZONE'){
    const P=(x,y)=>{
      _s0.set(x,y,0).project(camera);
      return [(_s0.x*.5+.5)*h.width,(-_s0.y*.5+.5)*h.height];
    }
    ,a=P(ZONE.x0-.3,ZONE.y1+.28),b=P(ZONE.x1+.3,ZONE.y0-.28);
    r={
      left:Math.min(a[0],b[0]),top:Math.min(a[1],b[1]),right:Math.max(a[0],b[0]),bottom:Math.max(a[1],b[1])
    }
    ;
  }
  else if(!$(q[0]).getBoundingClientRect().width){
    pdTut(i+1);
    return;
  }
  /* (a step about something this screen does not have is skipped) */
  else{
    const e=$(q[0]).getBoundingClientRect();
    r={
      left:e.left-h.left,top:e.top-h.top,right:e.right-h.left,bottom:e.bottom-h.top
    }
    ;
    if(q[0]==='pdjuice'){
      const d=$('pddrill').getBoundingClientRect();
      if(d.width){
        r.left=Math.min(r.left,d.left-h.left);
        r.top=Math.min(r.top,d.top-h.top);
        r.right=Math.max(r.right,d.right-h.left);
        r.bottom=Math.max(r.bottom,d.bottom-h.top);
      }
    }
  }
  const pad=8;
  SP.style.width=(r.right-r.left+pad*2)+'px';
  SP.style.height=(r.bottom-r.top+pad*2)+'px';
  SP.style.transform='translate('+(r.left-pad)+'px,'+(r.top-pad)+'px)';
  SP.hidden=false;
  T.hidden=false;
  /* the card goes in whichever half of the screen the spotlight is not in */
  const low=(r.top+r.bottom)/2>h.height*.5;
  T.style.top=low?'max(110px,15%)':'auto';
  T.style.bottom=low?'auto':'20px';
}


// ───────── pdAsk  (index.html L1717)
function pdAsk(fin){
  pdDom();
  S.state='pask';
  S.t=now;
  const A=$('pdask'),go=y=>{
    A.hidden=true;
    if(y)pdStart(fin);
    else{
      S.state='result';
      S.t=now;
      readyDur=.05;
      S.next=()=>fin(cpuInning(S.inning));
    }
  }
  ;
  A.hidden=false;
  $('pdyes').onpointerdown=e=>{
    e.preventDefault();
    e.stopPropagation();
    go(true);
  }
  ;
  $('pdno').onpointerdown=e=>{
    e.preventDefault();
    e.stopPropagation();
    go(false);
  }
  ;
  PD.askGo=go;
  hud();
}


// ───────── pdStart  (index.html L1719)
function pdStart(done){
  pdDom();
  if(!S.pdJG){
    PD.introT=now+2.7;
    PD.introS=false;
    /* YOU'RE ON THE MOUND: the first time you pitch in a game the picture goes to your man on the hill, clapping into his glove, before the first hitter walks up */
    S.pdJG=true;
    S.mJ=.25;
    S.mO=false;
    /* (and never with Overdrive in hand: a full bar carried over from the plate was putting OVERDRIVE READY and its explainer in front of the very first hitter. It is handed back with the bars after the half.) */
    try{
      $('hud').classList.remove('odon','zone');
      hud();
    }
    catch(e){
    }
  }
  /* THE FIRST TIME YOU PITCH IN A GAME you start with one bar of Juice, not a full meter: it is earned on the mound (the bars the batting side had are given back afterwards) *//* THE PITCHER HAS HIS OWN JUICE BAR. On the mound the meter is his and only his: it starts at one bar the first time you pitch, keeps whatever he
   earned from one pitching half to the next, and never shows what the hitters had (their bar is put away untouched and handed back afterwards). */
  if(!(S.scn&&S.scn.daily)){
    S.pdJ0=S.juice;
    S.pdO0=!!S.over;
    S.juice=S.mJ===undefined?.25:S.mJ;
    S.over=!!S.mO;
    if(S.over)S.juice=1;
    S.overOn=false;
  }
  try{
    $('hud').classList.add('pdj');
    const c=document.querySelector('#juice .mcap');
    if(c)c.textContent='YOUR PITCHER';
    hud();
  }
  catch(e){
  }
  try{
    $('hud').classList.toggle('pdw',PW&&!MOB);
  }
  catch(e){
  }
  try{
    if(MX.batBoost){
      [2,1,0].map(i=>KBAT[(PD.k+i)%KBAT.length].body).forEach(k=>MX.batBoost(k));
      MX.pitBoost(14);
    }
  }
  catch(e){
  }
  /* what the mound needs goes to the head of the download line: your pitcher first, then the three Kraken hitters in order */
  if(S.overOn){
    S.overOn=false;
  }
  /* an Overdrive that was switched on at the plate does not come to the mound switched on: it is ready, and it is the player's call again */
  if(S.duel){
    S.duel=false;
  }
  try{
    $('hud').classList.remove('duel','odon','zone','pod');
    zoneOn=false;
    podOn=false;
  }
  catch(e){
  }
  PD._p0=0;
  PD._pn=0;
  PD._pl=0;
  PD.hideBat=false;
  PD.showT=0;
  PD.odForce=false;
  shake=0;
  rumble=0;
  fovKick=0;
  try{
    roarOff(1);
  }
  catch(e){
  }
  /* (skipping here mid-homer left the camera shaking on the mound) */
  if(S.pStam===undefined)S.pStam=1;
  /* (stamina is set to full at the start of a game and carries from one inning to the next) */
  {
    let seen=false;
    try{
      seen=localStorage.getItem('mm_ptut3')==='1';
    }
    catch(e){
    }
    PD.wantTut=(!seen||PD.forceTut||(PTUT_EVERY_GAME&&!PD.tutDone))&&!window.__mmManual;
    if(PD.wantTut)PD.tutDone=true;
    PD.forceTut=false;
  }
  Object.assign(PD,{
    gt:0,sel:true,pk:0,
    /* the fastball is already picked for the first pitch */
    hbpT:0,ks:0,perf:0,jz:false,drilled:false,drillOn:false,rattle:false,on:true,ph:0,n:0,balls:0,strikes:0,outs:0,o0:0,r1:null,stK:null,bases:[0,0,0],runs:0,last:-1,done,tx:0,ty:.825,res:null
  }
  );
  PD.sv={
    pName:S.pName
  }
  ;
  fielders.forEach(f=>{
    if(f.isP||f._sp)return;
    f._sp=[f.speed,f.react,f.reach];
    f.speed*=1.08;
    f.react*=.85;
    f.reach*=1.06;
  }
  );
  /* YOUR defense: quicker off the bat, more range, longer reach than the one you hit against */
  {
    const st=STAFF[mypI];
    S.pName=[st.n,st.num,st.hand,14,''];
  }
  S.state='pduel';
  S.t=now;
  flight=null;
  pitch=null;
  swing=null;
  ball.visible=false;
  ballShadow.visible=false;
  if(!PD.mark){
    PD.mark=new T.Mesh(new T.RingGeometry(.075,.1,24),new T.MeshBasicMaterial({
      color:0xffe53b,side:T.DoubleSide,depthTest:false,transparent:true,opacity:.95,fog:false
    }
    ));
    PD.mark.renderOrder=30;
    PD.mark.material.visible=false;
    scene.add(PD.mark);
  }
  PD.mark.visible=true;
  try{
    pitcherModel(14);
    const pr=MX.pitLoad&&MX.pitLoad(14);
    if(pr&&pr.then)pr.then(()=>{
      if(PD.on)try{
        pitcherModel(14);
      }
      catch(e){
      }
    }
    );
  }
  catch(e){
  }
  /* the Comets' own pitcher: if his body is still on its way, he takes the mound the moment it arrives (never left as the Krakens' starter) */
  $('hud').classList.add('pd');
  $('pd').hidden=false;
  pdPick(PD.pk||0);
  pdHitter();
  if(!PD.kz){
    const g=new T.BufferGeometry(),x0=ZONE.x0,x1=ZONE.x1,y0=ZONE.y0,y1=ZONE.y1,dx=(x1-x0)/3,dy=(y1-y0)/3,v=[];
    [[x0,y0,x1,y0],[x1,y0,x1,y1],[x1,y1,x0,y1],[x0,y1,x0,y0],[x0+dx,y0,x0+dx,y1],[x0+2*dx,y0,x0+2*dx,y1],[x0,y0+dy,x1,y0+dy],[x0,y0+2*dy,x1,y0+2*dy]].forEach(q=>v.push(q[0],q[1],0,q[2],q[3],0));
    g.setAttribute('position',new T.Float32BufferAttribute(v,3));
    PD.kz=new T.LineSegments(g,new T.LineBasicMaterial({
      color:0xffffff,transparent:true,opacity:.95,depthTest:false,fog:false
    }
    ));
    {
      const fr=(a,b,c,d)=>{
        const m=new T.Mesh(new T.PlaneGeometry(Math.abs(c-a)||.022,Math.abs(d-b)||.022),new T.MeshBasicMaterial({
          color:0xffffff,depthTest:false,fog:false
        }
        ));
        m.position.set((a+c)/2,(b+d)/2,.006);
        m.renderOrder=29;
        return m;
      }
      ;
      PD.kzF=[fr(x0,y0,x1,y0),fr(x0,y1,x1,y1),fr(x0,y0,x0,y1),fr(x1,y0,x1,y1)];
    }
    /* a solid white frame round the zone: hairlines alone vanish on a phone */
    PD.kz.renderOrder=29;
    scene.add(PD.kz);
    PD.kzF.forEach(m=>PD.kz.add(m));
    {
      const bk=new T.Mesh(new T.PlaneGeometry(x1-x0,y1-y0),new T.MeshBasicMaterial({
        color:0x05060f,transparent:true,opacity:.42,depthTest:false,fog:false
      }
      ));
      bk.position.set((x0+x1)/2,(y0+y1)/2,.002);
      bk.renderOrder=27;
      PD.kz.add(bk);
    }
    /* a dark pane behind the zone, so its squares read cleanly against the catcher */
    PD.hz=[];
    for(let k=0;
    k<9;
    k++){
      const m=new T.Mesh(new T.PlaneGeometry(dx*.94,dy*.94),new T.MeshBasicMaterial({
        color:0xffffff,transparent:true,opacity:0,depthTest:false,side:T.DoubleSide,fog:false
      }
      ));
      m.position.set(x1-dx*(k%3+.5),y1-dy*(((k/3)|0)+.5),.005);
      m.renderOrder=28;
      PD.kz.add(m);
      PD.hz.push(m);
    }
  }
  PD.kz.visible=true;
  /* (nine squares behind the lines carry the hitter's hot and cold zones: red where he is dangerous, blue where he is not) */
  /* the K zone, drawn at the plate in front of the catcher */
  cheer(.2,2);
  hud();
}


// ───────── pdHomeXY  (index.html L1731)
function pdHomeXY(){
  const zw=ZONE.x1-ZONE.x0,zh=ZONE.y1-ZONE.y0,cx=(ZONE.x0+ZONE.x1)/2,cy=(ZONE.y0+ZONE.y1)/2;
  if(!PW)return [cx,cy];
  let P=null;
  try{
    P=PITCHES[pdQ().i];
  }
  catch(e){
  }
  if(!P)return [cx,cy];
  const fb=P.n==='FASTBALL'||P.n==='METEOR'||P.n==='RISER';
  return [cx+clamp(P.brk[0]*PDHS()*.3,-zw*.3,zw*.3),cy+(fb?zh*.22:clamp(P.brk[1]*.32,-zh*.3,zh*.3))];
}


// ───────── pdBm  (index.html L1733)
function pdBm(){
  try{
    const P=PITCHES[pdQ().i],L=Math.hypot(P.brk[0],P.brk[1]);
    if(L<.2)return 1;
    const h=pdHomeXY(),zw=ZONE.x1-ZONE.x0,zh=(ZONE.y1-ZONE.y0)*.893,d=((PD.tx-h[0])/zw*P.brk[0]*PDHS()+(PD.ty-h[1])/zh*P.brk[1])/L;
    return d>=0?1+(P.n==='CURVEBALL'?.7:1.1)*clamp(d,0,1):Math.max(.4,1+.6*Math.max(d,-1));
  }
  catch(e){
    return 1;
  }
}


// ───────── pdGoHome  (index.html L1734)
function pdGoHome(){
  if(PD.ph!==0||PD.holding)return;
  const h=pdHomeXY();
  PD._hm=(PD._hm||0)+1;
  PD.tx=h[0];
  PD.ty=h[1];
  try{
    pdCur();
  }
  catch(e){
  }
}


// ───────── pdHold  (index.html L1735)
function pdHold(kx,ky){
  if(PD.ph!==0||(PD.gt&&PD.gt<2))return;
  PD._hm=(PD._hm||0)+1;
  const zw=ZONE.x1-ZONE.x0,zh=ZONE.y1-ZONE.y0,hm=pdHomeXY(),cx=hm[0],cy=hm[1];
  PD.tx=clamp(cx-kx/58*zw,ZONE.x0-zw*.5,ZONE.x1+zw*.5);
  PD.ty=clamp(cy-ky/58*zh*.893,ZONE.y0-zh*.393,ZONE.y1+zh*.393);
  pdCur();
}


// ───────── pdHome  (index.html L1736)
function pdHome(){
  if(PD.ph!==0||!MOB)return;
  PD.rel={
    x:PD.tx,y:PD.ty,t:performance.now()
  }
  ;
  /* (where the target was when the thumb came off: see pdTap) */
  const hm=pdHomeXY(),cx=hm[0],cy=hm[1],id=PD._hm=(PD._hm||0)+1,go=()=>{
    if(PD._hm!==id||PD.ph!==0||S.state!=='pduel')return;
    PD.tx+=(cx-PD.tx)*.72;
    PD.ty+=(cy-PD.ty)*.72;
    if(Math.abs(PD.tx-cx)+Math.abs(PD.ty-cy)>.004)requestAnimationFrame(go);
    else{
      PD.tx=cx;
      PD.ty=cy;
    }
    pdCur();
  }
  ;
  setTimeout(go,80);
}


// ───────── pdOdEnd  (index.html L1737)
function pdOdEnd(){
  if((S.over&&S.overOn)){
    S.over=false;
    S.overOn=false;
    S.juice=0;
    PD.pk=0;
    PD.sel=true;
  }
  PD.odUsed=false;
  if(!(S.over&&S.overOn)){
    try{
      $('hud').classList.remove('odon','zone');
      zoneOn=false;
    }
    catch(e){
    }
  }
}


// ───────── pdHitter  (index.html L1738)
function pdHitter(){
  const h=KBAT[PD.k];
  PD.abP=0;
  PD._si=0;
  PD.jUsedAB=false;
  PD._fs=0;
  PD.needBody=h.body||0;
  PD.bodyBy=now+(MX.batErr&&MX.batErr[h.body]?0:PD.n===0?2.5:.6);
  /* never a long empty pause: two and a half seconds at most for the first man, barely a second after that, none if his download has failed */
  try{
    const nb=KBAT[(PD.k+1)%KBAT.length].body||0;
    if(nb&&MX.batLoad&&!(MX.brigs&&MX.brigs[nb])){
      const pr=MX.batLoad(nb);
      if(pr&&pr.then)pr.then(()=>safeMoment(3000,true)).then(()=>{
        try{
          if(PD.on&&MX.batRig&&!(MX.brigs&&MX.brigs[nb]))MX.batRig(nb);
        }
        catch(e){
        }
      }
      );
    }
  }
  catch(e){
  }
  /* the man on deck is dressed while this one bats, so he is ready the moment he is called */
  try{
    if(PD.needBody&&MX.brigs&&MX.brigs[PD.needBody]&&MX.bcur!==PD.needBody){
      batSwap(PD.needBody);
      MX.clip.swap=null;
      batterOpacity(1);
    }
  }
  catch(e){
  }
  /* THE BOX STAYS EMPTY UNTIL THE NEW MAN IS IN HIS OWN BODY: the retired hitter was coming back into view for a moment and then changing into the next one */
  PD._wu=0;
  PD.holding=false;
  PD.hideBat=false;
  PD.showT=(!PD.needBody||MX.bcur===PD.needBody)?0:now+.28;
  /* if he is already in his own body he is there on the first frame of his walk-up: no empty beat and no pop-in */
  try{
    if(!PD.showT&&MX.clip){
      MX.clip.swap=null;
      batterOpacity(1);
      MX.obj.visible=true;
    }
  }
  catch(e){
  }
  pdOdEnd();
  /* pitcher Overdrive lasts for the one batter */
  PD.drillArm=false;
  PD.balls=0;
  PD.strikes=0;
  PD.last=-1;
  PD.ph=0;
  PD.rattle=false;
  // the Kraken at the plate wears his own body (fetched in the background; until it is here the stand-in bats)
  try{
    if(MX.batLoad){
      const pr=MX.batLoad(h.body);
      if(pr&&pr.then)pr.then(()=>{
        if(S.state!=='pduel'||KBAT[PD.k]!==h)return;
        try{
          if(MX.batRig)MX.batRig(h.body);
          if(MX.brigs&&MX.brigs[h.body]){
            batSwap(h.body);
            MX.clip.swap=null;
            batterOpacity(1);
          }
        }
        catch(e){
        }
      }
      );
    }
  }
  catch(e){
  }
  // HE GETS A WALK-UP TOO: a couple of seconds of his routine and his name before the first pitch
  try{
    const I=MX.clip.intros,ws=Object.keys(I).filter(k=>/^w_/.test(k)&&k!==lastWalk&&k!=='w_walkin');
    if(ws.length||I.w_walkin){
      PD.ph=-1;
      PD.t=now;
      S.t=now;
      S.kOut=null;
      PD.wk=true;
      S.walkClip=PD.n===0&&I.w_walkin?plainWalk(I):ws[(Math.random()*ws.length)|0];
      lastWalk=S.walkClip;
      /* the first man of the half walks in; the rest bring a routine, never the same one twice running */
      const gb=v=>{
        const x=.85+.32*clamp((v-.8)/.4,0,1)*1.02,g=statGrade(x);
        return '<b class="gr g'+g+'"><u>'+g+gradeMod(x)+'</u></b>';
      }
      ,num=[27,8,44,13,3,61][PD.k%6];
      try{
        walkTier(ovrK(h));
      }
      catch(e){
      }
      $('wnum').textContent=num;
      $('wname').innerHTML='<small>#'+num+' · KRAKENS · BATS '+(curBatter().lh?'L':'R')+'</small>'+h.name;
      $('wrat').classList.remove('tv');
      $('wrat').innerHTML='<span>'+(MOB?'PWR':'POWER')+' '+gb(h.pow)+'</span><span>'+(MOB?'CON':'CONTACT')+' '+gb(h.con)+'</span><span>EYE '+gb(.8+.4*h.eye)+'</span>';
      {
        let a=80,k=80;
        try{
          a=ovrAce();
          k=ovrK(h);
        }
        catch(e){
        }
        $('wspot').textContent='THE DUEL · '+MYP_NAME+' '+a+' vs '+h.name+' '+k+' · '+(a-k>=3?'YOUR EDGE':k-a>=3?'HIS EDGE':'DEAD EVEN')+(KPERK[h.name]?' · \u2605 '+KPERK[h.name].n:'');
      }
      /* every hitter you face is a one-on-one: his card says who has the edge before the first pitch */
      $('walk').classList.remove('lockd');
      $('wskip').textContent=MOB?'TAP TO SKIP':'ANY KEY TO SKIP';
      try{
        faceShow(h);
      }
      catch(e){
      }
      PD.wkPend=!!(PD.needBody&&MX.bcur!==PD.needBody);
      /* his body is not in yet: the picture stays on the mound, and cuts to his walk-up (card and all) the moment he is there to walk. No empty shot, no pop-in. */
      $('walk').hidden=PD.wkPend;
      $('hud').classList.add('wk');
      if(PD.kz)PD.kz.visible=false;
      crowdHush(.7);
      if(!PD.wkPend)setTimeout(()=>{
        if(PD.wk)boo(.3);
      }
      ,700);
    }
  }
  catch(e){
  }
  pdUI();
}


// ───────── pdTap  (index.html L1753)
function pdTap(){
  if(S.state!=='pduel'||paused)return;
  if(PD.gt)return;
  PD.drillArm=false;
  if(PD.ph===0&&(!pdSel()||PD.odForce)){
    buzz(8);
    return;
  }
  /* LETTING GO OF THE STICK AS YOU START THE PITCH IS NOT A MISTAKE. The stick still springs back when it is let go, but if the thumb came off within the last
     four tenths of a second before the pitch was started (or comes off any time after), the pitch goes where it was aimed: the target is put back on that spot and stays there. */
  if(PD.ph===0&&PD.rel&&performance.now()-PD.rel.t<400){
    PD.tx=PD.rel.x;
    PD.ty=PD.rel.y;
    PD._hm=(PD._hm||0)+1;
    try{
      pdCur();
    }
    catch(e){
    }
  }
  PD.rel=null;
  if(PD.ph===0){
    PD.ph=1;
    PD.t=now;
    PD.wuT=now;
    /* the wind-up starts on this tap, not after the release: the pitcher answers the thumb at once */
    PD.mph=0;
    PD.pw=1;
    if(PD3&&!PD.style){
      PD.pwOn=true;
      PD.pwT=now;
      PD.pwFl=0;
      PD.pwLate=false;
      PD.pwDown=true;
    }
    buzz(15);
    tone('triangle',520,620,.06,.2);
    pdUI();
    return;
  }
  if(PD.ph!==1)return;
  if(PD3&&PD.pwOn){
    let lg=-(MOB?.075:.03);
    /* JUDGED WHERE THE THUMB SAW IT: a phone shows the ring about three frames behind the game and takes a moment more to report the touch. Without this a tap made exactly as the ring met the circle was being read as late. */
    try{
      const d=(performance.now()-inT)/1000;
      if(d>=0&&d<.08)lg-=d;
    }
    catch(x){
    }
    {
      const pe=Math.max(0,pwEl()+lg);
      pdPwSet(pdPwAt(pe),pe>PW_UP+.12);
    }
    return;
  }
  /* THE SECOND TAP IS THE POWER: stop the bar at the top for everything he has */
  // JUDGED WHERE YOU SAW IT: the tap is timed from the moment the finger actually landed (the browser's own stamp), not from the next frame, and
  // from what was on the glass then (the screen is about a frame behind the game, a little more on a phone). The ring is frozen at exactly that size.
  let lag=0;
  try{
    const d=(inT-last)/1000;
    lag=(d>=0&&d<.05?d:0)-(MOB?.026:.017);
  }
  catch(x){
  }
  const e=Math.max(0,now-PD.t+lag),Q=pdQ();
  if(!PD.style)PD.tapK=Math.max(0,1-(e/Q.T)/.84)*6.5;
  if(PD.style){
    // the meter: first tap here sets power on the way up, the next sets accuracy on the way down
    if(!PD.mph){
      PD.pw=clamp(e/.8,0,1);
      PD.mph=1;
      PD.t=now;
      buzz(15);
      tone('triangle',700,760,.06,.2);
      pdUI();
      return;
    }
    const lv=1-clamp(e/.8,0,1);
    pdThrow((lv-.75)*.8);
    return;
  }
  pdThrow(e-Q.T*.84);
}


// ───────── pdRel  (index.html L1774)
function pdRel(ts){
  PD.pwDown=false;
  if(S.state!=='pduel'||paused||PD.gt||PD.ph!==1||!PD3||!PD.pwOn)return;
  const held=now-PD.pwT;
  if(held<.16)return;
  /* a tap, not a hold: the next tap sets the power */
  let lg=-(MOB?.06:.025);
  try{
    const d=(performance.now()-(ts||performance.now()))/1000;
    if(d>=0&&d<.08)lg-=d;
  }
  catch(x){
  }
  const pe=Math.max(0,held+lg);
  pdPwSet(pdPwAt(pe),pe>PW_UP+.12);
}


// ───────── pdPwSet  (index.html L1782)
function pdPwSet(p,late){
  PD.pw=clamp(p,0,1);
  PD.pwOn=false;
  PD.pwLate=!!late&&PD.pw<.86;
  if(PD.pwLate){
    PD.pw=Math.max(.2,PD.pw*.85);
    timing('OVERTHREW IT · WILD','#ff4d2e',3);
    buzz([40,30,40]);
  }
  /* TOO LATE: the ring was already on its way back in. He has overthrown it: less on the ball AND it will not go where it was aimed. (Early is only soft: less power, no wildness.) */
  if(PD.pw>=.86)PD.pw=1;
  /* (a generous top: anything within about a tenth of a second of the line is MAX) */
  PD.pwFl=PD.pw>=1?now+.28:0;
  if(PD.pw<1&&!PD.pwLate)timing('POWER '+Math.round(PD.pw*100)+'%','#ffd23b',2);
  /* every power tap is answered at once, so it is never in doubt that the touch was taken */
  PD.t=now;
  if(PD.pw>=1){
    pop('MAX POWER!','','sharp grn');
    badge1('maxpow');
  }
  /* (the power rings go the instant it is set; only a full-power stop leaves a green flash behind) */
  buzz(PD.pw>=1?[15,20,40]:12);
  tone('triangle',500+500*PD.pw,560+640*PD.pw,.07,.25);
  pdUI();
}


// ───────── pdFB  (index.html L1783)
function pdFB(){
  if(PD.gt)return;
  PD.pk=0;
  PD.sel=true;
  try{
    pdBtns();
    [...$('pdbtns').children].forEach((b,k)=>b.classList.toggle('on',k===0));
    pdCur();
  }
  catch(e){
  }
}


// ───────── pdDrill  (index.html L1784)
function pdDrill(){
  if(S.state!=='pduel'||paused||PD.ph!==0||PD.drilled)return;
  pdArcOff();
  PD.drilled=true;
  PD.drillOn=true;
  PD.jz=false;
  PD.grade=1;
  PD.ph=2;
  PD.wuT=now;
  const lh=!!curBatter().lh,P=PITCHES[0];
  PD.pt={
    P,tx:lh?.6:-.6,ty:1.15,dur:P.dur*1.05,brk:new V3(0,0,0),arc:.05,rel:new V3(0,1.9,-17.2),t0:0,lh:false
  }
  ;
  S.pStam=Math.max(0,S.pStam-.03);
  timing('SENDING A MESSAGE...','#ff4d2e',3);
  buzz([20,30,20]);
  pdUI();
}


// ───────── pdWin  (index.html L1788)
function pdWin(){
  const Q=pdQ(),jz=(!!PD.jz&&S.juice>=.245)||(S.over&&S.overOn);
  return .82*(.024+.044*Math.pow(clamp((Q.c-50)/45,0,1),1.5))*(jz?(S.over?2:1.6):1)*lerp(.6,1,clamp((S.pStam-.15)/.55,0,1));
}


// ───────── pdThrow  (index.html L1789)
function pdThrow(dt){
  S.pdPN=(S.pdPN||0)+1;
  pdArcOff();
  PD.pwOn=false;
  const a=Math.abs(dt),W=pdWin(),g=a<W?2:a<W+.07?1:0;
  PD.grade=g;
  PD.wuT=PD.style||PD.ph!==1?now:now-clamp(PD.eNow||.82,.3,.98);
  if(PD.ph===1&&!PD.style)PD.kickE=1;
  /* (the delivery carries on from exactly where his stride had got to) */
  /* (he is already most of the way through his delivery when the release is tapped: the ball is out of his hand a beat later, not a full second later) */
  PD.ph=2;
  PD.rel=false;
  const Q=pdQ(),od=(S.over&&S.overOn),jz=od||(!!PD.jz&&S.juice>=.245),tired=Math.max(0,.45-S.pStam)/.45;
  /* 0 fresh, 1 gassed */
  if(jz&&!od){
    S.juice=Math.max(0,S.juice-.25);
  }
  if(od)PD.odUsed=true;
  PD.jzOn=jz;
  if(jz&&!od){
    PD.pk=0;
    PD.sel=true;
  }
  PD.jz=false;
  /* (your pitch stays picked for the next one; a Juice pitch has to be chosen again) */
  S.pStam=Math.max(0,S.pStam-(.03+.00018*Q.v+(jz?.03:0))*(1.35-NOVA.stam/200));
  PD.lastI=Q.i;
  const P=PITCHES[Q.i],er=(g===2?.012:g===1?.075:.2)*(1.55-Q.c/100)*(1+tired*.9)*(jz?.75:1)*(PD3&&PD.pwLate?2.4:1)+(PD3&&PD.pwLate?.07:0),an=rand(0,6.283),r=er*Math.sqrt(Math.random());
  let tx=PD.tx+Math.cos(an)*r,ty=PD.ty+Math.sin(an)*r*1.15;
  PD.meat=false;
  if(g===0){
    PD.meat=Math.random()<.72;
    if(PD.meat){
      tx=rand(-.05,.05);
      ty=rand(.8,.92);
      PD.meatXY=[tx,ty];
      PD.meatT=now;
    }
    else{
      const k=rand(.35,.75);
      tx=lerp(tx,0,k);
      ty=lerp(ty,.86,k);
    }
  }
  /* A BAD RELEASE IS PUNISHED: most of the time it is a MEATBALL, flat and right down the middle; otherwise it still drifts up and over the plate */
  const bk=(PD3&&!PD.style?.8+.24*PD.pw:1)*(g>=1?1:PD.meat?.3:.7)*(.62+.6*Q.b/100)*PDBRK*(jz?1.85:1)*(1-tired*.45)*pdBm(),pw3=PD3&&!PD.style?PD.pw:1,sp=(PD.style?1.1-.14*PD.pw:1)*(1.075-.105*pw3)*(g===2?.97:1)*(1.526-.62*Q.v/100)
  /* VELO IS FELT: the rating now moves the ball's speed more than twice as much as it did (a 76 fastball is about 93, a 100 is about 108; it used to be 98 against 104). An average-velocity arm is unchanged. */
  *(1+tired*.16)*(jz?.9:1);
  PD.perf=g===2?(PD.perf||0)+1:0;
  if(PD.perf===3)badge('dialed');
  if(PD.perf===5)badge('machine');
  const SH=pdSh(P);
  PD.pt={
    P,k:(P.k||2.5)*PDK*SH.k,tx,ty,dur:P.dur*sp*(PD.meat?1.06:1)*.8,
    /* the same speeds the player faces when he bats */
    brk:new V3(P.brk[0]*bk*SH.bx*PDHS(),P.brk[1]*bk*SH.by,0),arc:P.arc*SH.arc,rel:new V3(0,1.9,-17.2),t0:0,lh:PDHS()<0,wk:2.9,sd:1,ph:[0,0,0]
  }
  ;
  pdApex(PD.pt);
  /* (same side and same phases as the preview: the pitch goes down the path that was drawn) */
  if(g===2){
    // A PERFECT RELEASE PAYS OFF: the ring bursts gold, the screen kicks, a rising chord, the crowd reacts, and the pitch leaves a gold streak
    {
      const pp=PD.style||(!PD.pwLate&&(PD.pw||0)>=.9);
      flash(pp?.2:.1);
      shake=Math.max(shake,(pp?.16:.045)*FX);
    }
    /* THE CAMERA KICK IS FOR PERFECT-PERFECT: full power AND a perfect release. A perfect release alone gets only a faint nudge. */
    buzz([15,20,15,20,90]);
    cheer(.35,1.6);
    if(PD.mark){
      PD.mark.material.color.setHex(0xffffff);
      setTimeout(()=>{
        if(PD.mark)PD.mark.material.color.setHex(0xffe53b);
      }
      ,260);
    }
    pop('PERFECT!','','sharp grn');
  }
  PD.relQ=g===2?'PERFECT':g===1?'GOOD':dt<0?'EARLY':'LATE';
  /* (shown on the location marker when the pitch gets there) */
  {
    const r=$('pdring');
    PD.ringK=PD.style?0:PD.tapK||0;
    PD.ringLate=dt>0;
    PD.ringT=now+.75;
    /* THE TIMING RING GOES QUICKLY: long enough to see whether the release was perfect, early or late (three quarters of a second), then it is out of the way and the eye is on where the pitch actually goes */
    r.classList.remove('rq0','rq1','rq2');
    r.classList.add('rq'+g);
    r.style.opacity='';
    r.style.borderColor='';
  }
  /* THE RING STAYS WHERE YOU STOPPED IT: frozen at the size it was when you tapped (still big = early), green for perfect, white for good, red for way off */
  if(jz){
    flash(.12);
    buzz([15,25,15,25,70]);
  }
  /* a Juice pitch is felt as well as seen (on phones that can vibrate) */
  timing(g===2?'PERFECT RELEASE!':g===1?'GOOD RELEASE':PD.meat?'MEATBALL! · '+(dt<0?'TOO EARLY':'TOO LATE'):dt<0?'TOO EARLY · HUNG IT':'TOO LATE · HUNG IT',g===2?'#ffe53b':g===1?'#f2f5ff':'#ff4d2e',g===2?4:2);
  buzz(g===2?[20,30,60]:20);
  if(g===0)tone('sine',200,120,.14,.3);
  pdUI();
}


// ───────── pdPitFix  (index.html L1803)
function pdPitFix(){
  if(!PD.on||!MX.pit||!MX.pit.obj)return;
  const ok=MX.pitCur===14,pn=performance.now();
  if(!PD._p0)PD._p0=pn;
  MX.pit.obj.visible=ok||PD.ph!==-1;
  /* nothing makes the player wait: if his own body is not in yet when the first pitch is due, the stand-in takes the mound until it is */
  /* YOUR pitcher is the Comets' own man. While his body is still arriving the mound is left empty for a moment rather than show the stand-in; if he is not there after two and a half seconds the stand-in pitches, because a pitcher nobody can see is worse */
  if(!ok&&(PD._pn|0)<8&&pn-(PD._pl||0)>1500){
    PD._pl=pn;
    PD._pn=(PD._pn|0)+1;
    try{
      pitcherModel(14);
      const pr=MX.pitLoad&&MX.pitLoad(14);
      if(pr&&pr.then)pr.then(()=>{
        if(PD.on)try{
          pitcherModel(14);
        }
        catch(e){
        }
      }
      );
    }
    catch(e){
    }
  }
}


// ───────── pdOdGuide  (index.html L1806)
function pdOdGuide(){
  if(PD.ph!==0||PD.gt)return;
  if(!PD.odForce&&!PD.odAsk&&S.over&&!S.overOn){
    let seen=false;
    try{
      seen=localStorage.getItem('mm_odpf')==='1';
    }
    catch(e){
    }
    if(!seen){
      PD.odAsk=true;
      PD.odForce=true;
      /* forced from this moment, whether or not the explainer gets to show */
      try{
        localStorage.removeItem('mm_odp');
      }
      catch(e){
      }
      infoOnce('mm_odp',250,()=>S.state==='pduel'&&PD.ph===0&&S.over&&!S.overOn,'blue thru','YOUR OVERDRIVE','<span>Your Juice bar is <i>full</i>. The JUICE button is now the <i>OVERDRIVE</i> button.</span><ul><li>Switch it on and <i>every Juice pitch</i> is yours, <i>free</i>, for this batter.</li><li>They move more and the release ring is easier to hit.</li><li>It ends when this batter is done, and the bar empties.</li></ul><span>Tap <i>OVERDRIVE</i> now.</span>');
    }
  }
  /* JUICE IS EXPLAINED AFTER A FEW PITCHES, not in the first tutorial: once three have been thrown and there is a bar to spend, a card and a spotlight point at the JUICE button. Any touch closes it. */
  if(!PD.jzAsk&&!PD.odForce&&!PD.gt&&PD.ph===0&&!S.over&&S.juice>=.245&&(S.pdPN||0)>=3&&S.state==='pduel'){
    PD.jzAsk=1;
    PD._jzW=0;
    infoOnce('mm_pjz',200,()=>S.state==='pduel'&&PD.ph===0&&!S.over,'thru','JUICE PITCHES','<span>That is your <i>Juice</i> bar up top. Each bar buys one <i>Juice pitch</i>.</span><ul><li>Tap <i>JUICE</i> and your four pitches become four nastier ones.</li><li>They break harder and the release is easier to nail.</li><li>Strikeouts earn bars back. Fill the bar for <i>Overdrive</i>.</li></ul><b class="jzgo">TAP THE JUICE BUTTON</b>');
    jzGuideStart();
  }
  /* (the Juice guide runs on its own clock: see jzGuideStart) */
  if(PD.odForce){
    const SP=$('ptspot');
    if(S.overOn||!S.over){
      if(S.overOn){
        try{
          localStorage.setItem('mm_odpf','1');
        }
        catch(e){
        }
      }
      PD.odForce=false;
      SP.hidden=true;
      SP.classList.remove('arw','gts');
      SP.style.borderRadius='';
      return;
    }
    const h=$('hud').getBoundingClientRect(),e=$('pdjuice').getBoundingClientRect(),pad=8;
    if(e.width>4){
      SP.hidden=false;
      SP.classList.add('arw','gts');
      SP.style.borderRadius='50%';
      SP.style.transform='translate('+(e.left-h.left-pad)+'px,'+(e.top-h.top-pad)+'px)';
      SP.style.width=(e.width+pad*2)+'px';
      SP.style.height=(e.height+pad*2)+'px';
    }
  }
}


// ───────── pdWeak  (index.html L1815)
function pdWeak(){
  const want=PD.on&&S.state==='pduel'&&PD.strikes===2&&PD.balls===0&&!PD.drillOn&&!!(STAFF[mypI]&&STAFF[mypI].pk2);
  if(PD.ph===0){
    if(!PD._ws0){
      PD._ws0=1;
      PD.wsp=null;
      PD.wspHit=0;
      if(want){
        const h=KBAT[PD.k],cold=[];
        for(let k=0;
        k<9;
        k++)if(h.hot[k]<0)cold.push(k);
        const k=cold.length?cold[(Math.random()*cold.length)|0]:(Math.random()<.5?6:8),dx=(ZONE.x1-ZONE.x0)/3,dy=(ZONE.y1-ZONE.y0)/3;
        PD.wsp={
          x:ZONE.x1-dx*(k%3+.5),y:ZONE.y1-dy*(((k/3)|0)+.5),k
        }
        ;
      }
    }
  }
  else PD._ws0=0;
  if(PD.kz){
    if(!PD.wsM){
      const g=new T.Group(),mk=(a,b,c)=>{
        const m=new T.Mesh(new T.RingGeometry(a,b,28),new T.MeshBasicMaterial({
          color:c,transparent:true,opacity:.95,depthTest:false,side:T.DoubleSide,fog:false
        }
        ));
        m.renderOrder=31;
        return m;
      }
      ;
      g.add(mk(.05,.066,0xffd23b));
      g.add(mk(0,.016,0xffd23b));
      g.position.z=.009;
      PD.kz.add(g);
      PD.wsM=g;
    }
    const on=!!PD.wsp&&PD.ph<3;
    PD.wsM.visible=on;
    if(on){
      PD.wsM.position.x=PD.wsp.x;
      PD.wsM.position.y=PD.wsp.y;
      PD.wsM.scale.setScalar(1+.12*Math.sin(now*7));
    }
  }
  try{
    const z=$('pdzone');
    if(z){
      const c=z.children;
      for(let i=0;
      i<c.length;
      i++)c[i].classList.toggle('w',!!PD.wsp&&PD.ph<3&&PD.wsp.k===i);
    }
  }
  catch(e){
  }
}


// ───────── pdBallHand  (index.html L1821)
function pdBallHand(){
  if(!(PD.on&&S.state==='pduel'&&PD.ph>=0&&PD.ph<3&&MX.pit&&MX.pit.hand&&MX.on))return;
  const P=MX.pit,H=P.hand;
  if(P._bm===undefined||P._bmH!==H){
    P._bm=null;
    P._bmH=H;
    H.traverse(o=>{
      if(!P._bm&&o.isBone&&/HandMiddle1$/.test(o.name))P._bm=o;
    }
    );
  }
  P.obj.updateMatrixWorld(true);
  H.getWorldPosition(_a);
  if(P._bm){
    P._bm.getWorldPosition(_b);
    _a.lerp(_b,1.15);
  }
  else{
    const K=window.__bh||[.13,.045,0];
    _b.set(0,1,0).transformDirection(H.matrixWorld);
    _a.addScaledVector(_b,K[0]);
    _b.set(0,0,1).transformDirection(H.matrixWorld);
    _a.addScaledVector(_b,K[1]);
    _b.set(1,0,0).transformDirection(H.matrixWorld);
    _a.addScaledVector(_b,K[2]);
  }
  /* (no finger bones on this body: out along the hand from the wrist, and into the palm) */
  if(!isFinite(_a.x)||_a.y<.2)return;
  ball.position.copy(_a);
  ball.scale.setScalar(.56);
  ball.visible=true;
  ballShadow.visible=false;
}


// ───────── pdGas  (index.html L1824)
function pdGas(){
  let e=$('pdgas');
  if(!e){
    e=document.createElement('button');
    e.id='pdgas';
    e.type='button';
    e.innerHTML='GASSED<small>CHANGE PITCHER?</small>';
    $('pd').appendChild(e);
    e.addEventListener('pointerdown',ev=>{
      ev.preventDefault();
      ev.stopPropagation();
      try{
        PGN=(+localStorage.getItem('mm_pchg')||0)+1;
        localStorage.setItem('mm_pchg',PGN);
      }
      catch(x){
      }
      try{
        setPaused(true);
        staffOpen();
      }
      catch(x){
      }
    }
    );
  }
  if(PGN<0){
    try{
      PGN=+localStorage.getItem('mm_pchg')||0;
    }
    catch(x){
      PGN=0;
    }
  }
  const on=PD.on&&S.state==='pduel'&&PD.ph===0&&(S.pStam||0)<.3&&!PD.gt&&!PD.wk&&PGN<3&&!paused;
  if(on!==e._on){
    e._on=on;
    e.classList.toggle('on',on);
  }
}


// ───────── pdTick  (index.html L1827)
function pdTick(){
  if(PD.ph===0){
    if(!PD._ph0){
      PD._ph0=true;
      pdFB();
    }
  }
  else PD._ph0=false;
  try{
    pdGas();
  }
  catch(e){
  }
  if(PD.brT&&now>=PD.brT){
    PD.brT=0;
    try{
      $('pd').style.visibility='hidden';
      if(PD.kz)PD.kz.visible=false;
      brawlStart();
      BRW.pd=true;
    }
    catch(e){
      S.state='pduel';
    }
    return;
  }
  try{
    pdWeak();
  }
  catch(e){
  }
  try{
    pdBallHand();
  }
  catch(e){
  }
  {
    const c=kCelOn();
    if(c||PD.celUI){
      PD.celUI=c;
      try{
        $('pd').style.visibility=c?'hidden':'';
        if(c){
          if(PD.kz)PD.kz.visible=false;
          if(PD.mark)PD.mark.visible=false;
        }
      }
      catch(e){
      }
    }
  }
  /* THE PUNCHOUT CUT: the pitching controls are off the screen while he celebrates on the mound */
  if(PD.introT&&now<PD.introT){
    PD.t=now;
    S.t=now;
    try{
      $('pd').style.visibility='hidden';
      if(PD.kz)PD.kz.visible=false;
      if(PD.mark)PD.mark.visible=false;
      $('walk').hidden=!PD.pcSave;
      $('hud').classList.remove('wk');
      if(PD.pcSave){
        const P0=$('pop');
        if(P0.offsetHeight>4)$('walk').style.top=(P0.offsetTop+P0.offsetHeight+10)+'px';
      }
    }
    catch(e){
    }
    if(!PD.introS&&now>PD.introT-2.45){
      PD.introS=true;
      try{
        const W=$('walk'),gb=v=>{
          const g=statGrade(v);
          return '<b class="gr g'+g+'"><u>'+g+gradeMod(v)+'</u></b>';
        }
        ,av=k=>PPITCH.reduce((a,q)=>a+q[k],0)/PPITCH.length/100;
        PD.pcSave={
          n:$('wnum').textContent,nm:$('wname').innerHTML,r:$('wrat').innerHTML,rc:$('wrat').className,sp:$('wspot').textContent,sk:$('wskip').textContent,wc:W.className
        }
        ;
        PD.pcSave.tr=W.dataset.tier;
        PD.pcSave.ov=W.dataset.ovr;
        walkTier(ovrAce());
        $('wnum').textContent='21';
        $('wname').innerHTML='<small>#21 · SP · THROWS R</small>'+MYP_NAME;
        $('wrat').className='wrow';
        $('wrat').innerHTML='<span>'+(MOB?'VEL':'VELO')+' '+gb(.8+.4*Math.max(...PPITCH.map(q=>q.v))/100)+'</span><span>'+(MOB?'CTL':'CONTROL')+' '+gb(.82+.4*av('c'))+'</span><span>'+(MOB?'BRK':'BREAK')+' '+gb(.82+.4*av('b'))+'</span>';
        $('wspot').textContent='FASTBALL · CURVE · SLIDER · CHANGE';
        $('wskip').textContent='';
        W.className='pc';
        W.hidden=false;
      }
      catch(e){
      }
      /* HIS CARD goes up under the call: name, arm, ratings and what he throws */
      pop(PD.introChg?'NOW PITCHING':"YOU'RE ON THE MOUND!",PD.introChg?'#'+STAFF[mypI].num+' '+STAFF[mypI].n+' \u00B7 '+(STAFF[mypI].hand==='L'?'LEFTY':'RIGHTY'):'STRIKE THEM OUT','hot',true);
      PD.introChg=false;
      try{
        const ts=MX.pit?['p_clap','p_fist','p_threat'].filter(k=>MX.pit.taunts[k]):[];
        if(ts.length)S.sTaunt={
          t:now+.05,clip:ts[(Math.random()*ts.length)|0],dur:2.3
        }
        ;
      }
      catch(e){
      }
      cheer(.4,2);
    }
    return;
  }
  if(PD.introT){
    PD.introT=0;
    try{
      if(PD.pcSave){
        const q=PD.pcSave,W=$('walk');
        PD.pcSave=null;
        if(q.ov)walkTier(+q.ov);
        else walkTier(null);
        $('wnum').textContent=q.n;
        $('wname').innerHTML=q.nm;
        $('wrat').innerHTML=q.r;
        $('wrat').className=q.rc;
        $('wspot').textContent=q.sp;
        $('wskip').textContent=q.sk;
        W.className=q.wc;
        W.style.top='';
        W.hidden=true;
      }
    }
    catch(e){
    }
    try{
      $('pd').style.visibility='';
      if(PD.wk){
        $('hud').classList.add('wk');
        if(!PD.wkPend)$('walk').hidden=false;
      }
    }
    catch(e){
    }
  }
  /* (the walk-up flag goes back on even while his card is still waiting for his body: without it the stick and the pitch wheel sat on top of the walk-up) */
  const el=now-PD.t;
  if(!(S.over&&S.overOn)){
    const hc=$('hud').classList;
    if(hc.contains('odon')||hc.contains('zone')||hc.contains('duel')){
      hc.remove('odon','zone','duel');
      zoneOn=false;
      S.duel=false;
    }
  }
  /* belt and braces: no Overdrive, no flames, checked every frame while the player pitches */
  if(PD.kz&&PD.ph===-1&&PD.kz.visible)PD.kz.visible=false;
  /* (no strike-zone grid hanging in the walk-up shot) */
  if(PW){
    const h=$('hud').getBoundingClientRect(),W=h.width,H=h.height,lf=!!MX.lefty,T2=$('tim');
    _s0.set(lf?ZONE.x0-.2:ZONE.x1+.2,(ZONE.y0+ZONE.y1)/2,.02).project(camera);
    const mx=(_s0.x*.5+.5)*W,my=(-_s0.y*.5+.5)*H,lft=mx<W/2,x=Math.round(lft?mx-150:mx),y=Math.round(my-64);
    if(T2._px!==x||T2._py!==y){
      T2._px=x;
      T2._py=y;
      T2.style.left=x+'px';
      T2.style.top=y+'px';
      T2.style.textAlign=lft?'right':'left';
    }
  }
  {
    const L=$('pdland');
    if(PD.ph===4&&PD.pt&&PD._lp!==PD.pt){
      PD._lp=PD.pt;
      PD.landT=now+2.6;
      if(PD.ringT)PD.ringT=PD.landT;
      L.className='q'+(PD.grade|0);
      L.dataset.q=(PD.relQ||'')+(PD.grade===2&&PD.res&&PD.res.inZ&&PD.res.e>.75?' · PAINTED':'');
    }
    if(PD.mark)PD.mark.material.opacity=PCI_BALL||(PD.ph>=2&&PD.ph<=4)?0:.95;
    /* the yellow aiming circle is gone once the ball is thrown */
    const on=!!PD.pt&&PD._lp===PD.pt&&now<(PD.landT||0)&&(PD.ph===4||PD.ph===0)&&!(PD.res&&PD.res.hbp);
    L.style.opacity=on?String(clamp((PD.landT-now)/.4,0,1)):'';
    if(on){
      const h=$('hud').getBoundingClientRect(),W=h.width,H=h.height;
      _s0.set(PD.pt.tx,PD.pt.ty,.02).project(camera);
      const cx=(_s0.x*.5+.5)*W,cy=(-_s0.y*.5+.5)*H;
      _s0.set(PD.pt.tx+.0875,PD.pt.ty,.02).project(camera);
      const r=Math.max(4,Math.abs((_s0.x*.5+.5)*W-cx)*.32);
      L.style.display='block';
      L.style.setProperty('--lo',Math.max(7,(PD.ringT&&now<PD.ringT&&PD.ringR?PD.ringR-r:0)+7)+'px');
      L.style.width=L.style.height=(r*2)+'px';
      L.style.transform='translate('+(cx-r)+'px,'+(cy-r)+'px)';
      const M=$('pdmph');
      if(M.style.display!=='block'){
        M.style.display='block';
        M.classList.toggle('jz',!!(PD.pt&&PD.pt.P&&PD.pt.P.sp));
        /* (a Juice pitch's speed reads in blue) */
        let mph='';
        try{
          mph=pitchMph(PD.pt.dur/.8);
        }
        catch(e){
        }
        const R0=PD.res;
        M.innerHTML=mph+'<small>MPH · '+(PAB[PD.pt.P.n]||PD.pt.P.n)+'</small>'+(R0&&R0.swing&&R0.kind==='whiff'&&R0.tim?'<em class="'+(R0.timE?'e':'l')+'">SWUNG '+R0.tim+'</em>':'');
      }
      const lf=!!MX.lefty;
      _s0.set(lf?ZONE.x0-.2:ZONE.x1+.2,(ZONE.y0+ZONE.y1)/2,.02).project(camera);
      const mx=(_s0.x*.5+.5)*W,my=(-_s0.y*.5+.5)*H;
      M.style.transform='translate('+(mx-(mx<W/2?M.offsetWidth:0))+'px,'+(my-M.offsetHeight/2)+'px)';
    }
    else if(L.style.display!=='none'){
      L.style.display='none';
      $('pdmph').style.display='none';
    }
  }
  try{
    pdPitFix();
  }
  catch(e){
  }
  try{
    pdOdGuide();
  }
  catch(e){
  }
  if(PD.ph<=4)pdSvg();
  {
    const lp=PD._lp;
    PD._lp=PD.ph;
    if(PD.ph===0&&lp!==0){
      try{
        pdUI();
      }
      catch(e){
      }
    }
    if(PD.ph===0&&lp>=2){
      PD.holding=false;
      PD.pk=0;
      PD.sel=!(S.over&&S.overOn);
      pdGoHome();
      try{
        pdUI();
      }
      catch(e){
      }
    }
    /* every new pitch starts clean: back on the fastball, target back on the fastball's spot (in Overdrive, a pitch has to be picked) */
  }
  /* the target goes back to the middle after every pitch */
  if(PD.ph<=1&&!PD.hideBat&&now>(PD.showT||0)&&!(PD.needBody&&MX.bcur!==PD.needBody&&now<(PD.bodyBy||0))&&MX.obj&&MX.clip&&now-(PD._gh||0)>.4){
    PD._gh=now;
    try{
      if(!MX.obj.parent)scene.add(MX.obj);
      MX.obj.visible=true;
      if(MX.clip.swap==null)batterOpacity(1);
      if(MX.obj!==PD._ghO){
        PD._ghO=MX.obj;
        MX.obj.traverse(n=>{
          if(n.isMesh)n.frustumCulled=false;
        }
        );
      }
    }
    catch(e){
    }
  }
  /* THERE IS ALWAYS A MAN IN THE BOX: a hitter left faded out (or culled by the long lens) by whatever was going on when pitching began is put back */
  {
    const th=PD.ph>=2;
    if(th!==PD._thr){
      PD._thr=th;
      $('pd').classList.toggle('thr',th);
    }
    const t4=PD.ph>=4;
    if(t4!==PD._thr4){
      PD._thr4=t4;
      $('pd').classList.toggle('thr4',t4);
    }
  }
  /* (the PITCH / TAP! button stays up through the delivery and the flight, the pitch keys go as before) */
  /* once the pitch is made the controls are gone until the next one */
  if(PD.ph<=1&&roarG)roarOff(2);
  /* the crowd's roar is a loop that the batting side shuts off before each pitch; pitching never did, so it roared on for good */
  if(PD.ph===-1){
    if(PD.wk&&!$('hud').classList.contains('wk'))$('hud').classList.add('wk');
    /* NO PITCHING CONTROLS DURING A WALK-UP, whatever path led here */
    if(PD.wk&&PD.needBody&&MX.bcur!==PD.needBody&&now<(PD.bodyBy||0)&&now-PD.t<5){
      PD.t=now;
      S.t=now;
      PD.waitMax=Math.max(PD.waitMax||0,+(4-(PD.bodyBy-now)).toFixed(1));
      return;
    }
    if(PD.wk&&PD.wkPend){
      PD.wkPend=false;
      PD.t=now;
      S.t=now;
      $('walk').hidden=false;
      $('hud').classList.add('wk');
      boo(.35);
      try{
        if(MX.clip){
          MX.clip.swap=null;
          batterOpacity(1);
        }
      }
      catch(e){
      }
      return;
    }
    if(PD.wk&&PD.needBody&&MX.bcur!==PD.needBody&&!PD._si){
      PD._si=1;
      PD.standin=(PD.standin||0)+1;
    }
    /* (a tap still skips it) */
    /* HIS WALK-UP DOES NOT START UNTIL HE IS THERE TO DO IT: the card is up, and the routine begins the moment his own body is in (four seconds at the very most, then the stand-in walks) */
    if(el>=(PD.wk?WALK.dur:2.7)){
      if(PD.wk){
        PD.wk=false;
        $('walk').hidden=true;
        $('hud').classList.remove('wk');
        if(PD.kz)PD.kz.visible=true;
        try{
          if(MX.clip)MX.clip.swap=.2;
        }
        catch(e){
        }
      }
      S.kOut=null;
      PD._p0=0;
      PD.ph=0;
      PD.t=now;
      PD.holding=false;
      pdGoHome();
      pdUI();
      if(PD.wantTut){
        PD.wantTut=false;
        pdTut(0);
      }
    }
    return;
  }
  /* the guide comes up once the first batter is in and the controls are live */
  if(PD.ph!==1&&PD.ringT){
    const r=$('pdring');
    if(now>=PD.ringT||PD.ph>=5||PD.ph===0||(PD.res&&PD.res.hbp&&PD.ph>=4)){
      PD.ringT=0;
      r.style.display='none';
      r.classList.remove('rq0','rq1','rq2');
    }
    else{
      r.style.opacity=String(clamp((PD.ringT-now)/.35,0,1));
    }
  }
  /* ONE CIRCLE: held at the size it was tapped at, on the spot you aimed while the ball is on its way, then centerd on where it actually finished */
  if(PD.ph===1&&PD3&&PD.pwOn){
    PD.t=now;
    if(pwEl()>PW_UP+PW_DN+.05)pdPwSet(.12,true);
  }
  /* (the ring waits, open, until the power is set; nobody taps and it goes with nothing on it) */
  if(PD.ph===1){
    // the ring closes (two-tap), or the bar runs (meter). Nobody taps: it goes anyway, badly.
    if(PD.style){
      const m=$('pdmfill');
      if(!PD.mph){
        m.style.height=(clamp(el/.8,0,1)*100)+'%';
        if(el>=.8){
          PD.pw=1;
          PD.mph=1;
          PD.t=now;
          pdUI();
        }
      }
      else{
        m.style.height=((1-clamp(el/.8,0,1))*100)+'%';
        if(el>=.5)pdThrow(.3);
      }
    }
    else{
      // THE RING CLOSES ON THE TARGET ITSELF, out at the plate: it shrinks onto the yellow circle there, centerd on it exactly
      const Q=pdQ(),u=clamp(el/Q.T,0,1.05),r=$('pdring'),h=$('hud').getBoundingClientRect(),W=h.width,H=h.height;
      _s0.set(PD.tx,PD.ty,.02).project(camera);
      const cx=(_s0.x*.5+.5)*W,cy=(-_s0.y*.5+.5)*H;
      _s0.set(PD.tx+.0875,PD.ty,.02).project(camera);
      const mp=Math.max(5,Math.abs((_s0.x*.5+.5)*W-cx)),R=mp*(1+Math.max(0,1-u/.84)*6.5)+2;
      PD.tapK=Math.max(0,1-u/.84)*6.5;
      r.classList.remove('rq0','rq1','rq2');
      r.style.opacity='';
      r.style.width=r.style.height=(R*2)+'px';
      r.style.transform='translate('+(cx-R)+'px,'+(cy-R)+'px)';
      r.style.borderColor=Math.abs(el-Q.T*.84)<pdWin()?'#39ff6a':'#fff';
      /* TAP! FOR THE RELEASE TOO: as the closing ring comes onto the target the same green TAP! goes up that marks full power, a beat ahead so the thumb can answer it */
      try{
        let cu=$('pdcue');
        if(!cu){
          cu=document.createElement('div');
          cu.id='pdcue';
          r.parentNode.appendChild(cu);
        }
        const dT=el-Q.T*.84,showT=dT>-.13&&dT<.05;
        if(showT){
          cu.textContent='TAP!';
          cu.style.transform='translate('+cx+'px,'+(cy-(mp*7.5+2)-34)+'px) translate(-50%,-50%)';
        }
        cu.style.display=showT?'block':'none';
      }
      catch(x){
      }
      if(el>=Q.T*1.06)pdThrow(.3);
    }
    return;
  }
  if(PD.ph===2){
    if(now-PD.wuT>=1.0){
      const pt=PD.pt;
      try{
        MX.pit.obj.updateMatrixWorld(true);
        MX.pit.hand.getWorldPosition(pt.rel);
      }
      catch(e){
      }
      pt.t0=now;
      PD.ph=3;
      ball.visible=true;
      ballShadow.visible=true;
      SND.pitch();
      if(!PD.drillOn&&(PD.grade===2||PD.jzOn)){
        try{
          sfx('crush',PD.grade===2?.75:.6,PD.jzOn?.8:1);
        }
        catch(e){
        }
      }
      /* the turbo whoosh goes with the ball leaving his hand, not with the tap */
      try{
        if(!PD.drillOn){
          const g=PD.grade,jz=!!PD.jzOn;
          if(g===2||jz){
            hitstop=(g===2?.075:.04)*(REDUCE?.5:1);
            shake=Math.max(shake,(g===2?.24:.12)*FX);
            fovKick=(g===2?9:5)*FX;
            flash(g===2?.35:.18);
            shock.position.copy(pt.rel);
            shock.userData.t=0;
            shock.userData.s=g===2?.7:.45;
            burst(fxS,pt.rel,g===2?20:10,5,.4,jz?[.3,.5,1]:[1,.9,.5],3,1);
            buzz(g===2?[25,20,50]:20);
          }
          else if(g===1){
            shake=Math.max(shake,.06*FX);
            fovKick=3*FX;
          }
        }
      }
      catch(e){
      }
      /* OUT OF THE HAND LIKE OFF THE BARREL: a perfectly timed release (or a Juice pitch) gets what a squared-up ball gets: a beat of freeze, the camera kick, the flash, a shock ring and sparks at his fingertips. A good release gets a little of it; a mistimed one gets none, and you feel the difference. */
      pdDecide();
    }
    return;
  }
  if(PD.ph===3){
    const pt=PD.pt,u=(now-pt.t0)/pt.dur;
    pitchPos(pt,Math.min(u,1.04),ball.position);
    ball.scale.setScalar(.62);
    ballShadow.scale.setScalar(.1);
    /* a smaller ball out of your pitcher's hand: it reads as quicker */
    /* its true size, as when batting (it had been left at the blown-up size of the last ball in flight) */
    if(u<1){
      try{
        trail(pt,pt.P.col||(PD.grade===2?[1,.85,.25]:[1,1,1]),u<.75,true,pt.P.tp||'thin');
      }
      catch(e){
      }
    }
    /* every pitch leaves a streak: seen from behind the mound through a long lens, the streak is what reads as speed */
    ballShadow.position.set(ball.position.x,.02,ball.position.z);
    if(PD.res.swing&&!PD.sw&&u>=.72){
      PD.sw=true;
      swing={
        t0:now,type:PD.res.kind==='play'&&PD.res.q>.6?'power':'contact',turbo:false,done:true,miss:true,practice:true
      }
      ;
      SND.whoosh();
    }
    if(u>=1){
      shake=Math.max(shake,.07*FX);
      PD.ph=4;
      PD.t=now;
      pdResolve();
    }
    return;
  }
  if(PD.ph===5){
    const B=PD.fly,u=clamp((now-B.t0)/B.T,0,1);
    ball.scale.setScalar(Math.max(1,camera.position.distanceTo(ball.position)*.04));
    ball.position.set(B.x*u,.9+B.h*4*u*(1-u)-.9*u,B.z*u);
    ballShadow.position.set(ball.position.x,.02,ball.position.z);
    PD.bx=ball.position.x;
    PD.bz=ball.position.z;
    if(u>=1){
      ball.visible=false;
      ballShadow.visible=false;
      PD.ph=4;
      PD.t=now-(B.hr?-.9:.2);
      B.end();
    }
    return;
  }
  if(PD.ph===4&&el>=(PD.ringT&&now<PD.ringT?1.9:1.25)){
    if(PD.after){
      const f=PD.after;
      PD.after=null;
      f();
    }
  }
}


// ───────── pdDecide  (index.html L1856)
function pdDecide(){
  if(PD.drillOn){
    PD.sw=false;
    PD.res={
      swing:false,hbp:true,e:2
    }
    ;
    return;
  }
  const rat=PD.rattle?1:0,h=KBAT[PD.k],pt=PD.pt,g=PD.grade,newAB=PD.tunAB!==PD.n+'/'+PD.k;
  PD.tunAB=PD.n+'/'+PD.k;
  if(newAB)PD.tunL=null;
  const _u=0,inZ=zoneHit(pt.tx,pt.ty),cx=(ZONE.x0+ZONE.x1)/2,cy=(ZONE.y0+ZONE.y1)/2,
  ex=Math.abs(pt.tx-cx)/((ZONE.x1-ZONE.x0)/2),ey=Math.abs(pt.ty-cy)/((ZONE.y1-ZONE.y0)/2),e=Math.max(ex,ey),
  /* 0 dead center, 1 on the black, more than 1 off the plate */
  brk=pdQ().i!==0,same=PD.last===pdQ().i,spdCh=PD.last>=0&&((PD.last===0)!==(pdQ().i===0)),Q=pdQ(),jz=!!PD.jzOn,
  col=clamp(Math.floor((ZONE.x1-pt.tx)/((ZONE.x1-ZONE.x0)/3)),0,2),row=clamp(Math.floor((ZONE.y1-pt.ty)/((ZONE.y1-ZONE.y0)/3)),0,2),hz=(PD.wsp&&Math.hypot(pt.tx-PD.wsp.x,pt.ty-PD.wsp.y)<.075&&(PD.wspHit=1))?-2.5:inZ?h.hot[row*3+col]:0;
  /* which ninth of the zone it finished in, as shown on the pad */
  // TUNNELING: this pitch comes out on the same line as the last one (they look alike halfway to the plate) but finishes somewhere else entirely
  let tun=0;
  PD.tunHit=0;
  {
    pitchPos(pt,.45,_s1);
    const mx=_s1.x,my=_s1.y,T0=PD.tunL;
    if(T0&&T0.i!==Q.i){
      const dm=Math.hypot(mx-T0.mx,my-T0.my),de=Math.hypot(pt.tx-T0.ex,pt.ty-T0.ey);
      tun=clamp((.3-dm)/.18,0,1)*clamp((de-.18)/.25,0,1);
    }
    PD.tunL={
      i:Q.i,mx,my,ex:pt.tx,ey:pt.ty
    }
    ;
  }
  if(tun>.35){
    PD.tunN=(PD.tunN||0)+1;
    PD.tunHit=1;
    try{
      badge('tunnel');
    }
    catch(e){
    }
  }
  /* (the call comes once the ball is on its way) */
  // a nasty pitch that finishes just off the plate (a slider away, a curve in the dirt, painted heat) looks like a strike for most of the way: he chases it far more often than one that is obviously out
  /* SHARP BREAK: a breaking ball thrown with the stick leaned the way it breaks (more break) and finishing on or near the edge is the one that gets the ugly swing: missed by a foot */
  const bm=brk?pdBm():1,edge=clamp(1-Math.abs(e-1.05)/.45,0,1),sharp=brk?(.06+.14*clamp((bm-1)/.5,0,1.4))*(Q.b/75)*(.4+.6*edge)*(g===0?.3:1):0;
  const near=clamp(1-(e-1)/.8,0,1),nasty=(.34+(brk?.28*Q.b/75:0)+(g===2?.1:0)+(jz?.1:0)+tun*.18)*(1-h.eye*.45);
  const oh2=PD.strikes===2&&PD.balls===0;
  /* 0-2: he is protecting, and a nasty one just off the plate gets him */
  // HE SEES IT COMING: the same pitch in the same spot again and again and the hitters start sitting on it (the memory runs across the game,
  // fading pitch by pitch): he swings at it if it is a strike, lays off it if it is not, and squares it up when he swings
  const H=PD.hist||(PD.hist=[]);
  let rep=0;
  H.forEach((q,k)=>{
    if(q.i===Q.i&&Math.hypot(q.x-pt.tx,q.y-pt.ty)<.17)rep+=Math.pow(.8,H.length-1-k);
  }
  );
  H.push({
    i:Q.i,x:pt.tx,y:pt.ty
  }
  );
  if(H.length>10)H.shift();
  rep=Math.min(2.2,rep);
  PD.rep=rep;
  if(rep>=1.2&&!PD.drillOn){
    PD.repN=(PD.repN||0)+1;
    setTimeout(()=>{
      if(PD.on)timing("HE'S SITTING ON IT · MIX IT UP",'#ff8a2e',3);
    }
    ,450);
  }
  let pS=inZ?.7+(PD.strikes===2?.2:0)+.1*rep-(e>.8?.12:0)+tun*.06:near*nasty*(oh2?1.3:1)+(oh2?.08*near+.03:0)+clamp(.5-(e-1)*1.5,0,.5)*(1-h.eye*.55)*.4+(PD.strikes===2?.12:0)+rat*.08-(PD.balls===3?.1:0)-(inZ?0:.24*rep);
  if(PD.meat&&!PD.drillOn)pS=.95;
  /* a meatball: he is all over it */
  // HONEST RESULTS: how well the pitch was thrown (exq, 0 to 1) decides most of what happens to it. Release, power and where it finished all count.
  // A pitch thrown right, to a good spot, is never taken deep and rarely hit hard; one left over the middle without a clean release gets hurt.
  const exLoc=inZ?clamp((e-.35)/.5,0,1):near,exPw=PD3&&!PD.style?(PD.pwLate?0:PD.pw):1,exq=PD.drillOn?.5:clamp((g===2?1:g===1?.55:0)*.5+exPw*.2+exLoc*.3-.12*Math.min(rep,1.5),0,1),fat=inZ&&e<.35&&g<2;
  /* fat: middle of the plate, not well released */
  PD.ex=exq;
  if(fat&&!PD.drillOn)pS=Math.max(pS,.86);
  /* A GOOD PITCH OFF THE PLATE GETS CHASED; A SLOPPY ONE GETS TAKEN. How well it was thrown (release, power, how close to the edge it finished) and how good
     the pitch itself is (its break or its velocity rating) raise or lower the chance he swings at a ball. Thrown right, the edge is where strikeouts
     come from; thrown badly, the same spot is ball one. */
  let chaseUp=0;
  if(!inZ&&!PD.meat&&!PD.drillOn){
    const rt=clamp(((brk?Q.b:Q.v)-60)/40,0,1);
    chaseUp=near*(.5*(exq-.45)+.14*(rt-.5));
    /* NASTY STUFF JUST OFF THE PLATE GETS SWUNG AT: a slider, curve, change-up or Juice pitch that finishes a ball or so off the edge pulls a swing far more often than a fastball there, and a perfect-perfect one (perfect release at full power) most of all */
    {
      const pp=g===2&&exPw>=.9;
      chaseUp+=near*((brk?.13:0)+(jz?.14:0)+(pp?.2:g===2?.07:0));
    }
    pS+=chaseUp;
  }
  const kp=h&&h.name,kOn=(PD.bases[0]||PD.bases[1]||PD.bases[2])?1:0;
  let kpC=0,kpH=1;
  /* Kraken perks */
  if(kp==='XANDU'&&!inZ)pS-=.14;
  if(kp==='KORVO'&&!brk&&!jz){
    if(inZ)pS+=.12;
    kpC+=.1;
    kpH=1.35;
  }
  if(kp==="M'NAR"&&PD.strikes===2)kpC+=.13;
  if(kp==='SKARR'&&kOn)kpC+=.09;
  if(kp==='NYXA'){
    kpC+=.12;
    kpH=.55;
  }
  if(kp==='ZLORP'&&fat)kpH=1.6;
  {
    const sp=STAFF[mypI].n;
    /* your pitcher's own perk */
    if(sp==='ACE'&&kOn)kpC-=.06;
    if(sp==='BLAZE'&&!brk&&!jz&&pt.ty>.93)kpC-=.1;
    if(sp==='SOUTHPAW'&&Q.n==='CURVEBALL'&&!inZ)pS+=.12;
    if(sp==='DOC'&&inZ&&e>.75)pS-=.15;
    if(sp==='VIPER'&&Q.n==='SLIDER'&&PD.strikes===2)kpC-=.14;
  }
  const R={
    swing:Math.random()<clamp(pS,0,.97),inZ,e
  }
  ;
  PD.sw=false;
  R.chase=!inZ&&R.swing&&chaseUp>.06;
  if(R.swing){
    let pC=h.con*(inZ?.95:.52)-.2*Math.min(e,1.3)*(inZ?1:1.4)-(brk?.07*Q.b/75:.06*(Q.v-75)/20)+(same?.08:0)-(spdCh?.07:0)-(g===2?.09:0)+(g===0?.14:0)+hz*.16-(jz?.15:0)-rat*.11-tun*.16-sharp*Math.max(0,1-.45*PD.rep)+(PD.meat?.3:0)+.16*PD.rep+(PD3&&!PD.style&&!PD.drillOn?(.55-PD.pw)*.22:0)-.26*(exq-.5)+(fat?.1:0)-(!inZ&&near>.25?(brk?.1:0)+(jz?.08:0)+(g===2&&exPw>=.9?.13:0):0);
    /* (and when he does chase the nasty one off the plate, he mostly comes up empty) */
    /* (power: at full power he is a little easier to miss; take a lot off and he squares it up more) */
    pC=clamp(pC+kpC,.08,.95);
    {
      const slow=brk&&!/METEOR|RISER/.test(Q.n),early=Math.random()<(slow?.82:.16)+(spdCh?(slow?.1:-.08):0);
      R.tim=(spdCh&&Math.random()<.6?'WAY ':'')+(early?'EARLY':'LATE');
      R.timE=early;
    }
    /* how his swing was timed: out in front of the slow stuff, behind the heat, and fooled worst when the speed has just changed */
    if(Math.random()>pC)R.kind='whiff';
    else if(Math.random()<.3+(e>.75?.16:0))R.kind='foul';
    else{
      R.kind='play';
      const gf=(g===2?.7:g===1?1:PD.meat?2.4:1.5)*(1+.4*PD.rep)*lerp(1.55,.4,exq)*(fat?1.3:1),soft=1-.5*Math.min(e,1.2),r=Math.random(),STF=(()=>{
        try{
          const st=.6*Math.max(Q.v,Q.b)+.4*Q.c;
          return lerp(1.3,.86,clamp((st-58)/34,0,1))*(1+pdTired()*.3);
        }
        catch(e){
          return 1;
        }
      }
      )(),
      /* THE STUFF COUNTS WHEN HE HITS IT: each pitch is rated on its own (its better of velocity and break, plus its command). A below-average pitch that gets hit is hit up to 30% harder (more homers, more extra bases, more singles); a top-shelf one, up to 14% softer. The swing-and-miss side already used these ratings; this is the contact side. */
      hr=.085*kpH*h.pow*soft*gf*(pt.ty>.95&&PD.pk===0?.8:1)*(hz>0?1.85:hz<0?.38:1)*(jz?.6:1)*STF,xb=hr+.1*soft*gf*(hz>0?1.4:hz<0?.55:1)*STF,sg=xb+.24*h.con*(.7+.3*soft)*Math.sqrt(gf)*(hz>0?1.18:hz<0?.74:1)*Math.sqrt(STF);
      /* THE HOT AND COLD SQUARES MEAN IT: in his red squares he makes more contact and it is hit harder (more extra bases and homers); in the blue ones he misses more, and what he does hit is weaker. Nothing is certain either way: a great pitch can still get him out in the red, and a bad one can still leave the park from the blue. */
      R.out=r<hr?'hr':r<xb?'2b':r<sg?'1b':'out';
      if(exq>=.85&&R.out==='hr')R.out=Math.random()<.5?'1b':'out';
      /* a pitch executed that well is never taken deep */
      R.q=r<xb?.9:.4;
    }
  }
  R.hz=hz;
  R.jz=jz;
  R.tun=tun;
  R.sharp=sharp;
  if(R.kind==='whiff'&&sharp*Math.max(0,1-.45*PD.rep)>.12)R.ugly=['BUCKLED HIM!','FOOLED HIM!','MISSED BY A FOOT!','NASTY!'][(Math.random()*4)|0];
  PD.res=R;
}


// ───────── pdAdvance  (index.html L1894)
function pdAdvance(nb,walk){
  let runs=0;
  const b=PD.bases;
  if(walk){
    if(b[0]){
      if(b[1]){
        if(b[2])runs++;
        b[2]=1;
      }
      b[1]=1;
    }
    b[0]=1;
  }
  else if(nb>=4){
    runs=1+b[0]+b[1]+b[2];
    b[0]=b[1]=b[2]=0;
  }
  else{
    for(let k=0;
    k<nb;
    k++){
      if(b[2]){
        runs++;
        b[2]=0;
      }
      if(b[1]){
        b[2]=1;
        b[1]=0;
      }
      if(b[0]){
        b[1]=1;
        b[0]=0;
      }
      if(k===0)b[0]=1;
    }
    if(nb===1&&b[2]&&Math.random()<.5){
      b[2]=0;
      runs++;
    }
  }
  /* a man on second scores on a single about half the time */
  if(runs){
    PD.runs+=runs;
    S.opp+=runs;
  }
  return runs;
}


// ───────── staffApply  (index.html L1914)
function staffApply(i,live){
  if(live){
    S.pSt=S.pSt||[];
    S.pSt[mypI]=S.pStam===undefined?1:S.pStam;
  }
  mypI=clamp(i|0,0,STAFF.length-1);
  if(live){
    S.pStam=S.pSt[mypI]===undefined?1:S.pSt[mypI];
  }
  /* EVERY ARM HAS ITS OWN TANK: bringing in a new pitcher brings in his stamina, and the man coming out keeps what he had left */
  const st=STAFF[mypI];
  PPITCH.length=0;
  st.a.forEach((nm,k)=>{
    PPITCH.push({
      n:nm,i:PITCHES.findIndex(z=>z.n===nm),T:(PPT[nm]||.88)*lerp(.72,1.06,clamp((st.p[k][1]-50)/45,0,1)),v:st.p[k][0],c:st.p[k][1],b:st.p[k][2]
    }
    );
    /* CONTROL IS FELT IN THE HANDS: on a pitch he does not command, the release ring closes up to 28% faster, the window to hit it is narrower, and the power meter races; on one he owns, the ring is a touch slower than before and the window is wide. */
  }
  );
  /* his own arsenal: two to four pitches, always a fastball */
  if(PD.pk>=PPITCH.length)PD.pk=0;
  MYP_NAME=st.n;
  try{
    localStorage.setItem('mm_myp',mypI);
  }
  catch(e){
  }
  if(live&&PD.on){
    S.pName=[st.n,st.num,st.hand,14,''];
    try{
      $('pdbtns')._sig='';
      pdGoHome();
      pdUI();
      hud();
    }
    catch(e){
    }
    try{
      PD.introT=now+2.7;
      PD.introS=false;
      PD.introChg=true;
    }
    catch(e){
    }
    /* A NEW ARM GETS AN ENTRANCE (his card comes up with it, as on your first trip to the mound):: the same cut to the mound, drifting in on him, that opens your first trip out there */
  }
}


// ───────── staffOpen  (index.html L1918)
function staffOpen(){
  const L=$('pslist');
  L.innerHTML=STAFF.map((st,i)=>'<button type="button" data-i="'+i+'" class="'+(i===mypI?'on':'')+'"><u>'+staffOvr(st)+'</u><b>#'+st.num+' '+st.n+'</b><em>'+(st.hand==='L'?'LEFTY':'RIGHTY')+(i===mypI?' \u00B7 IN THE GAME':'')+'</em><small>'+st.d+'</small><small style="color:#9fe8ff">'+pRate(st).txt+'</small><small style="color:#ffd23b">\u2605 '+st.pk[0]+': '+st.pk[1]+'</small>'+(st.pk2?'<small style="color:#ffd23b">\u2605 '+st.pk2[0]+': '+st.pk2[1]+'</small>':'')+'<small>'+st.a.map(n=>PAB[n]||n.slice(0,3)).map((a,k)=>a+' '+st.p[k][0]+'/'+st.p[k][1]+'/'+st.p[k][2]).join(' \u00B7 ')+'</small></button>').join('')+'<small style="font:700 10px/1.3 var(--hud);letter-spacing:.08em;color:#9aa3c7;text-align:center">EACH PITCH: VELOCITY / CONTROL / BREAK</small>';
  $('pstaff').hidden=false;
}


// ───────── pdKCall  (index.html L1920)
function pdKCall(R){
  if((PD.ks||0)>=2){
    const L=KCALL.shove.filter(c=>c!==PD.shLast);
    PD.shLast=kcLast=L[(Math.random()*L.length)|0];
    return kcLast;
  }
  /* the second strikeout of a half: he is dealing */
  let L;
  const fb=PD.pt&&/FASTBALL|METEOR|RISER/.test(PD.pt.P.n);
  if(!R.swing)L=R.e>.8?KCALL.paint:KCALL.look;
  else if(R.ugly)L=KCALL.ugly;
  else if(R.jz||(fb&&PD.grade===2))L=KCALL.gas;
  else L=KCALL.swing;
  let c=L[(Math.random()*L.length)|0];
  if(c===kcLast)c=L[(L.indexOf(c)+1)%L.length];
  kcLast=c;
  return c;
}


// ───────── pdResolve  (index.html L1950)
function pdResolve(){
  const R=PD.res,h=KBAT[PD.k];
  PD.abP=(PD.abP||0)+1;
  ball.visible=false;
  ballShadow.visible=false;
  PD.last=PD.lastI;
  const next=()=>{
    if(pdStealTry())return;
    PD.ph=0;
    pdUI();
  }
  ,over=()=>{
    if(PD.celA){
      PD.celHold=1;
      PD.celB=now+1.6;
    }
    {
      if(!PD.bases[0])PD.r1=null;
      else if(PD.outs===(PD.o0||0)||PD.r1==null)PD.r1=KBAT[PD.k].name;
      PD.o0=PD.outs;
    }
    /* (who is standing on first: the man who just reached, unless he made the out) */
    PD.n++;
    PD.k=(PD.k+1)%KBAT.length;
    if(PD.n>=3||PD.outs>=3)pdEnd();
    else pdHitter();
  }
  ;
  if(R.hbp){
    PD.drillOn=false;
    const r=pdAdvance(1,true);
    PD.hbpT=now;
    S.hbpKip=Math.random()<.45;
    SND.mitt();
    flash(.3);
    shake=Math.max(shake,.3*FX);
    buzz([40,40,120]);
    boo(.8);
    badge('plunk');
    pop('PLUNKED HIM!',h.name+' TAKES HIS BASE'+(r?' · KRAKENS +'+r:'')+' · NEXT BATTER RATTLED'+(S.over?'':' · +1 JUICE'),'hot',true);
    pdEarn(.25);
    PD.brLost=false;
    PD.brT=0;
    try{
      if(brawlNeedPD())PD.brT=now+1.35;
    }
    catch(e){
    }
    PD.t=now+2.6;
    PD.after=()=>{
      PD.hbpT=0;
      PD.rattle=!PD.brLost;
      PD.n++;
      PD.k=(PD.k+1)%KBAT.length;
      if(PD.n>=3||PD.outs>=3)pdEnd();
      else{
        pdHitter();
        PD.rattle=!PD.brLost;
      }
    }
    ;
    pdUI();
    hud();
    return;
  }
  if(!R.swing||R.kind==='whiff'){
    const strike=R.swing||R.inZ;
    if(strike){
      if(R.ugly)badge('buckle');
      PD.strikes++;
      if(PD.strikes<3&&!R.jz&&PD.grade===2)pdEarn(.0625);
      SND.mitt();
      {
        const n=PD.strikes;
        setTimeout(()=>SND.call(false,n),R.swing?60:240);
      }
      try{
        if(MX.crew)MX.crew.uT=now+.12;
      }
      catch(e){
      }
      if(PD.strikes>=3){
        PD.outs++;
        PD.ks=(PD.ks||0)+1;
        badge('pk');
        if(PD.abP===3)badge('immac');
        if(!R.swing&&R.e>.75)badge('paint');
        if(R.jz)badge('gas');
        if(PD.ks>=3)badge('kside');
        if(!S.over)S.juice=Math.min(1,S.juice+.25);
        /* a strikeout is worth a bar of Juice */
        pop(pdKCall(R),h.name+(R.swing?' GOES DOWN SWINGING':' CAUGHT LOOKING')+(PD.tunHit?' · TUNNELED':''),'cool',true);
        cheer(.6,3);
        roar(.7,.3);
        buzz([30,40,90]);
        PD.after=over;
        try{
          const ts=MX.pit?Object.keys(MX.pit.taunts).filter(k=>/^p_(twerk|chicken|macarena|fist|threat|clap|bboy|backflip|runman|boogie|joy|shuffle|wavy|town|chick2|outta|float|dosido|shrug)$/.test(k)&&k!==PD.lastCel)
          /* ONLY the real celebrations: never a brawl clip (taking a punch, lying winded), which had him floating flat in the air */
          :[];
          if(ts.length){
            const nk=PLAY_NEWEST_FIRST?NEW_K.find(k=>ts.includes(k)&&!(S.newSeen||(S.newSeen={
            }
            ))['k'+k]):null,c=nk?(S.newSeen['k'+nk]=1,nk):ts[(Math.random()*ts.length)|0];
            /* playtest: this game's first strikeouts show the newest celebrations, one after another, before the usual mix */
            PD.lastCel=c;
            S.sTaunt={
              t:now+.3,clip:c,dur:2.3
            }
            ;
            PD.t=now+1.5;
            PD.celA=now+(R.swing?.55:.4);
            PD.celB=now+9;
            PD.celHold=0;
            /* (held on him until the next thing is actually called: the wait before it is longer when the release read-out is still up, and the cut used to run out a fifth of a second early) */
          }
        }
        catch(e){
        }
      }
      else if(PD.tunHit){
        pop('TUNNELED!','STRIKE '+PD.strikes+' · SAME LOOK, DIFFERENT PITCH','cool');
        cheer(.3,1.5);
        PD.after=next;
      }
      else{
        timing(R.swing?(R.ugly?R.ugly+' · STRIKE '+PD.strikes:R.chase?'GOT HIM TO CHASE · STRIKE '+PD.strikes:'SWING AND A MISS · STRIKE '+PD.strikes):'CALLED STRIKE '+PD.strikes+(R.e>.8?' · PAINTED':''),'#58d6ff',3);
        cheer(.2,1.5);
        try{
          if(!R.swing&&(PD.ex||0)>=.6&&PD.strikes<3&&MX.clip&&now-(PD.frzL||-99)>14&&Math.random()<.5){
            const ds=Object.keys(MX.clip.intros).filter(k=>/^d_/.test(k)&&k!==PD.frzC);
            if(ds.length){
              PD.frzC=ds[(Math.random()*ds.length)|0];
              PD.frz={
                t:now+.3,clip:PD.frzC,d:1.7
              }
              ;
              PD.frzL=now;
            }
          }
        }
        catch(e){
        }
        PD.after=next;
      }
    }
    /* FROZE HIM: a good pitch he could only watch, and for a beat he sags in the box, seen from the mound with the next pitch already yours to throw. About half the time at most, never twice close together, never the same reaction twice running. */
    else{
      PD.balls++;
      SND.mitt();
      {
        const n=PD.balls;
        setTimeout(()=>SND.call(true,n),200);
      }
      if(PD.balls>=4){
        const r=pdAdvance(1,true);
        pop('WALK',h.name+' TAKES HIS BASE'+(r?' · KRAKENS +'+r:''),'hot');
        boo(.4);
        PD.after=over;
      }
      else{
        timing('BALL '+PD.balls+(R.e<1.25?' · JUST MISSED':''),'#9aa3c7',2);
        PD.after=next;
      }
    }
    pdUI();
    hud();
    return;
  }
  if(R.kind==='foul'){
    // A FOUL BALL IS SHOWN: it comes off the bat and is followed far enough to see it land foul, then it is back to the mound
    try{
      let tr=null;
      for(let i=0;
      i<6&&!(tr&&tr.foul);
      i++){
        const sd=Math.random()<.5?-1:1,ph=sd*rand(56,82)*DEG,la=rand(6,44)*DEG,v=rand(22,36);
        tr=simulate(new V3(PD.pt.tx,PD.pt.ty,0),new V3(Math.sin(ph)*Math.cos(la),Math.sin(la),-Math.cos(ph)*Math.cos(la)).multiplyScalar(v),{
          side:sd*3,lift:0
        }
        ,{
        }
        );
      }
      if(tr&&tr.foul){
        let play=judge(tr,{
          spd:1
        }
        );
        if(play.type==='foul'){
          const cq=cqSetup(tr,play,30);
          if(cq)play=cq.win;
          else play.endT=Math.min(play.endT,2.6);
          if(play.f)play.from=play.f.fig.root.position.clone();
          try{
            SND.crack(.4,false);
          }
          catch(e){
          }
          flight={
            cq,tr,play,t0:now,q:.3,pw:false,tb:false,jp:false,pod:false,fp:false,od:false,v:30,done:false,called:false,pd:true,trailC:[.5,.5,.55]
          }
          ;
          PD.ph=6;
          PD.ringT=0;
          try{
            $('pdring').style.display='none';
          }
          catch(e){
          }
          S.state='flight';
          S.t=now;
          ball.visible=true;
          ballShadow.visible=true;
          $('pd').style.visibility='hidden';
          if(PD.mark)PD.mark.visible=false;
          if(PD.kz)PD.kz.visible=false;
          return;
        }
      }
    }
    catch(e){
    }
    if(PD.strikes<2)PD.strikes++;
    SND.crack&&SND.crack(.4);
    timing('FOULED OFF','#f2f5ff',2);
    PD.after=next;
    pdUI();
    return;
  }
  // PUT IN PLAY: from here it is the real game. The ball is launched off his bat with the same physics as any batted ball, the fielders go
  // and get it (or do not) by the same rules, and the same cameras follow it. How hard and how squarely he hit it comes from the pitch.
  const g=PD.grade,soft=1-.5*Math.min(R.e,1.2),qq=clamp((.28+Math.random()*.72)*(.76+.38*soft)*(g===2?.8:g===1?1:1.25)*(R.hz>0?1.22:R.hz<0?.78:1)*(R.jz?.72:1)*h.pow,0,1),
  gs=()=>(Math.random()+Math.random()+Math.random()-1.5)/1.5,v=22+25*qq,la=clamp((qq>.6?17:7)+gs()*17,-18,52),lh=!!curBatter().lh,phi=clamp((lh?9:-9)+gs()*30,-52,52),pt=PD.pt;
  // HE CAN TAKE YOU DEEP THE WAY YOU TAKE HIM DEEP: a ball he squares up (a hung pitch most of all) now and then becomes a tape-measure shot, out of the park and onto the Moon
  let v1=v,la1=DBG.pdgb?-6:la,fo={
  }
  ;
  if(DBG.pdmon||(qq>.68&&Math.random()<(g===0?.5:R.hz>0?.34:.2))){
    const k=Math.random();
    la1=rand(24,34);
    v1=Math.max(v,44)*(1.14+.2*k);
    fo={
      g:.8-.2*k
    }
    ;
  }
  const p0=new V3(pt.tx,pt.ty,0),v0=new V3(Math.sin(phi*DEG)*Math.cos(la1*DEG),Math.sin(la1*DEG),-Math.cos(phi*DEG)*Math.cos(la1*DEG)).multiplyScalar(v1),tr=simulate(p0,v0,{
    side:phi/40*3.2,lift:clamp(gs()*2,-2,2)
  }
  ,fo);
  let play=judge(tr,{
    spd:1
  }
  );
  const cq=cqSetup(tr,play,v);
  if(cq)play=cq.win;
  try{
    if(!cq&&play.type==='out'&&play.air&&play.label==='LINE OUT'&&play.f&&!play.f.of&&!play.f.isP&&play.endT>.25&&qteParts()&&!DBG.nodq&&(DBG.dcatch||(PLAY_NEWEST_FIRST&&!S.dcG)||Math.random()<.5)){
      S.dcG=true;
      play.dc=true;
      S.dcPit=false;
    }
    else if(!cq&&play.type==='out'&&play.air&&play.f&&play.f.isP&&play.endT>.12&&qteParts()&&!DBG.nodq){
      play.dc=true;
      S.dcPit=true;
    }
    /* THE COMEBACKER IS ALWAYS YOURS: a ball hit back at the pitcher in the air used to vanish into him as he stood there. Now it is a MAKE THE CATCH on the mound, with your own pitcher going up for it. */
  }
  catch(e){
  }
  /* MAKE THE CATCH: a line drive right at an infielder is, half the time, the player's to catch */
  if(play.f)play.from=play.f.fig.root.position.clone();
  try{
    SND.crack(qq,qq>.6);
  }
  catch(e){
  }
  flight={
    cq,tr,play,t0:now,q:qq,pw:qq>.6,tb:false,jp:false,pod:false,fp:false,od:false,v,done:false,called:false,pd:true,trailC:qq>.75?[1,.85,.25]:[.5,.5,.55]
  }
  ;
  if(play.type==='hr'){
    const ft=play.dist*3.281,lastP=tr.pts[tr.pts.length-1];
    flight.dShow=true;
    flight.dFt=ft;
    flight.dEnd=tr.outD||Math.hypot(lastP.x,lastP.z);
    if(ft>=385)flight.trailCam=true;
    if(tr.outT)play.endT=Math.min(play.endT,tr.outT+.75);
  }
  /* the long ones are followed from behind the ball with the distance running up, just like yours */
  PD.ph=6;
  PD.ringT=0;
  try{
    $('pdring').style.display='none';
  }
  catch(e){
  }
  S.state='flight';
  S.t=now;
  ball.visible=true;
  ballShadow.visible=true;
  $('pd').style.visibility='hidden';
  if(PD.mark)PD.mark.visible=false;
  if(PD.kz)PD.kz.visible=false;
  crowdRise(play.type==='hr'?.45:.3,Math.min(play.endT,6),false);
}


// ───────── pdBack  (index.html L1982)
function pdBack(f){
  f.done=true;
  S.state='pduel';
  PD.ph=4;
  PD.t=now-.9;
  $('pd').style.visibility='';
  if(PD.mark)PD.mark.visible=true;
  if(PD.kz)PD.kz.visible=true;
  try{
    $('pop').className='';
  }
  catch(e){
  }
  try{
    pdUI();
    hud();
  }
  catch(e){
  }
  if(PD.after){
    const fn=PD.after;
    PD.after=null;
    try{
      fn();
    }
    catch(e){
    }
  }
}


// ───────── pdFinish  (index.html L1984)
function pdFinish(f,pl){
  try{
    const _pf=arguments[1]&&arguments[1].f;
    S.dmAt=_pf?{
      x:_pf.fig.root.position.x,z:_pf.fig.root.position.z
    }
    :null;
  }
  catch(e){
    S.dmAt=null;
  }
  /* (where the ball was fielded: the throw is staged from there) */
  if(f._res&&pl.dc&&PD.dmk){
    if(now-f._res>=.04){
      PD.dmk=false;
      pdBack(f);
    }
    return;
  }
  if(f._res&&PD.dmk&&now-f._res>=.1){
    PD.dmk=false;
    pdBack(f);
    return;
  }
  /* MAKE THE PLAY comes up the instant the infielder has the ball: no wait for a throw or a call first */
  if(f._res){
    f.t0=now-pl.endT;
    if(f.thr){
      if(!f.thr.done&&now-f._res<4)return;
      if(!f._thrD)f._thrD=now;
      if(now-f._thrD>=1.3)pdBack(f);
      return;
    }
    /* a grounder: the throw across the diamond is seen all the way to the bag, the out is called when it gets there, and the call has its moment */
    ball.visible=false;
    ballShadow.visible=false;
    ballGlow.material.opacity=0;
    /* THE PLAY IS OVER THE MOMENT IT IS CALLED: the clock of the flight is held at the catch, so the ball can never be seen carrying on past (or through) the man who caught it while the call is up */
    if(now-f._res>=(pl.type==='hr'?2.2:1.5))pdBack(f);
    return;
  }
  if(pl.type!=='foul'){
    f._res=now;
    PD.hideBat=true;
  }
  else{
    f.done=true;
    S.state='pduel';
    PD.ph=4;
    PD.t=now-9;
    PD._lp=PD.pt;
    PD.landT=0;
    PD.ringT=0;
    /* a foul ball: straight back to the next pitch, no look-in at the plate and no release read-out */
    $('pd').style.visibility='';
    if(PD.mark)PD.mark.visible=true;
    if(PD.kz)PD.kz.visible=true;
  }
  ball.visible=false;
  ballShadow.visible=false;
  ballGlow.material.opacity=0;
  const h=KBAT[PD.k];
  const next=()=>{
    if(pdStealTry())return;
    PD.ph=0;
    pdUI();
  }
  ,over=()=>{
    if(PD.celA){
      PD.celHold=1;
      PD.celB=now+1.6;
    }
    {
      if(!PD.bases[0])PD.r1=null;
      else if(PD.outs===(PD.o0||0)||PD.r1==null)PD.r1=KBAT[PD.k].name;
      PD.o0=PD.outs;
    }
    /* (who is standing on first: the man who just reached, unless he made the out) */
    PD.n++;
    PD.k=(PD.k+1)%KBAT.length;
    if(PD.n>=3||PD.outs>=3)pdEnd();
    else pdHitter();
  }
  ;
  if(pl.type==='foul'){
    if(PD.strikes<2)PD.strikes++;
    timing('FOULED OFF'+(PD.res&&PD.res.tim?' · '+PD.res.tim.replace('WAY ','')+' ON IT':''),'#f2f5ff',2);
    PD.after=next;
    pdUI();
    return;
  }
  if(pl.dc){
    PD.dmk=true;
    try{
      const r=pl.f.fig.root.position;
      S.qteAt={
        x:r.x,z:r.z
      }
      ;
    }
    catch(e){
      S.qteAt=null;
    }
    PD.after=()=>{
      PD.qAfter=over;
      PD.hideBat=false;
      try{
        S.goD=Math.random()<.3?1.2:.7;
        qteStart('dcatch',true);
      }
      catch(e){
        PD.hideBat=true;
        PD.outs++;
        over();
      }
    }
    ;
    pdUI();
    hud();
    return;
  }
  /* MAKE THE PLAY: a routine grounder to an infielder is sometimes the player's to finish. The arrows, short and with plenty of clock; now and then a tougher hop (a longer code, less time). Boot it and he is safe on the error. */
  try{
    if(pl.type==='out'&&pl.label==='GROUND OUT'&&!pl.dp&&!pl.dive&&!pl.cq&&!pl.rob&&pl.f&&!pl.f.of&&qteParts()&&!DBG.nodq&&(DBG.dmake||(PLAY_NEWEST_FIRST&&!S.dmG)||Math.random()<.3)){
      S.dmG=true;
      S.dmPit=pl.f===fielders[0];
      try{
        const rp=pl.f.fig.root.position;
        S.dmAt={
          x:rp.x,z:rp.z
        }
        ;
      }
      catch(e){
        S.dmAt=null;
      }
      SND.mitt();
      PD.dmk=true;
      PD.after=()=>{
        PD.qAfter=over;
        PD.hideBat=false;
        try{
          S.goD=DBG.dmakeH||Math.random()<.28?1.2:.6;
          qteStart('dmake',true);
        }
        catch(e){
          PD.hideBat=true;
          PD.outs++;
          over();
        }
      }
      ;
      pdUI();
      hud();
      return;
    }
  }
  catch(e){
  }
  if(pl.type==='out'){
    PD.outs++;
    const dp=!!pl.dp&&PD.bases[0]&&PD.outs<3;
    if(dp){
      PD.outs++;
      PD.bases[0]=0;
    }
    {
      const call=()=>{
        if(pl.label==='GROUND OUT')SND.ump(false);
        if(camped(pl))badge('corn');
        pop(dp?'DOUBLE PLAY!':pl.dive?'WHAT A CATCH!':pl.rob?'ROBBED HIM!':pl.cq?(pl.label==='FOUL OUT'?'WHAT A GRAB!':'SNARED IT!'):camped(pl)?'CAN OF CORN!':'OUT!',pl.label+' · '+h.name+' IS RETIRED','cool');
        pdEarn(dp?.25:.125);
        cheer(.5,2.5);
      }
      ;
      if(pl.label==='GROUND OUT'&&pl.f&&pl.f.thrAct&&pl.f!==fielders[0]){
        f.thr={
          t0:now+.05,to:new V3(BASES[1][0],1.2,BASES[1][1]),next:null,full:true,call
        }
        ;
      }
      else call();
    }
    if(pl.dive||pl.rob||dp||pl.cq){
      roar(.8,.3);
      badge('web');
    }
    SND.mitt();
    PD.after=over;
    /* TAGGING UP: a deep fly with a man on third and fewer than three out, and he tags and goes. The player makes the throw home (the first chance each game, then a bit under half the time) */
    try{
      if(pl.air&&!dp&&pl.f&&pl.f.of&&PD.bases[2]&&PD.outs<3&&Math.hypot(pl.p.x,pl.p.z)>65&&qteParts()&&!DBG.nodq&&(DBG.dtag||(PLAY_NEWEST_FIRST&&!S.dtG)||Math.random()<.45)){
        S.dtG=true;
        PD.after=()=>{
          PD.qAfter=over;
          PD.hideBat=false;
          try{
            qteStart('dtag3',true);
          }
          catch(e){
            PD.hideBat=true;
            over();
          }
        }
        ;
      }
    }
    catch(e){
    }
    pdUI();
    hud();
    return;
  }
  const nb=pl.type==='hr'?4:(pl.bases||1),r=pdAdvance(nb,false);
  pop(pl.type==='hr'?(pl.dist*3.281>=600?'TOOK YOU TO THE MOON':pl.dist*3.281>=470?'TOOK YOU DEEP':'KRAKENS GO DEEP'):['BASE HIT','DOUBLE','TRIPLE'][nb-1],h.name+(pl.type==='hr'?' · '+Math.round(pl.dist*3.281)+' FT':'')+(r?' · KRAKENS +'+r:'')+(pl.tag?' · '+pl.tag:''),'hot',pl.type==='hr');
  cheer(pl.type==='hr'?.3:r?.24:.18,1.4);
  if(pl.type==='hr'){
    flash(.25);
    shake=Math.max(shake,.2*FX);
  }
  PD.after=over;
  // HE GETS GREEDY: on a single or a double with the next base open, the Kraken sometimes tries to stretch it, and the player gets the play at the bag (the first chance each game always, then about two in five)
  // THE PLAY AT THE PLATE: a run that came in on a single or a double is sometimes a close one, and the player gets the tag (once a game at the first chance, then about one in three). Win it and the run comes off the board.
  let dq=false;
  try{
    if(pl.type!=='hr'&&r>0&&nb<=2&&PD.outs<3&&qteParts()&&!DBG.nodq&&(DBG.dplate||(PLAY_NEWEST_FIRST&&!S.dpG)||Math.random()<.33)){
      S.dpG=true;
      dq=true;
      PD.after=()=>{
        PD.qAfter=over;
        PD.hideBat=false;
        try{
          qteStart('dplate',true);
        }
        catch(e){
          PD.hideBat=true;
          over();
        }
      }
      ;
    }
  }
  catch(e){
  }
  try{
    if(!dq&&pl.type!=='hr'&&(nb===1||nb===2)&&PD.bases[nb]===0&&PD.outs<3&&qteParts()&&!DBG.nodq&&(DBG.dqte||(PLAY_NEWEST_FIRST&&!S.dqG)||Math.random()<.4)){
      S.dqG=true;
      const kind=nb===1?'dstretch2':'dstretch3';
      dq=true;
      PD.after=()=>{
        PD.qAfter=over;
        PD.hideBat=false;
        try{
          qteStart(kind,true);
        }
        catch(e){
          PD.hideBat=true;
          over();
        }
      }
      ;
    }
  }
  catch(e){
  }
  /* FIRST TO THIRD: a single with a man on first, and he keeps going round second. The player throws to third */
  try{
    if(!dq&&nb===1&&PD.bases[1]&&!PD.bases[2]&&PD.outs<3&&qteParts()&&!DBG.nodq&&(DBG.dadv||(PLAY_NEWEST_FIRST&&!S.daG)||Math.random()<.35)){
      S.daG=true;
      PD.after=()=>{
        PD.qAfter=over;
        PD.hideBat=false;
        try{
          qteStart('dadv3',true);
        }
        catch(e){
          PD.hideBat=true;
          over();
        }
      }
      ;
    }
  }
  catch(e){
  }
  pdUI();
  hud();
}


// ───────── pdStealTry  (index.html L2011)
function pdStealTry(){
  try{
    if(!PD.on||!PD.bases[0]||PD.bases[1]||PD.outs>=3||!PD.r1||PD.stK===PD.r1+PD.n||DBG.nodq||!qteParts())return false;
    const sp=KSPD[PD.r1]||.4,p=(sp>=.85?.17:sp>=.6?.07:.012)*(LINEUP.some(q=>perkOn(q,'CRASH'))?.5:1);
    /* (Crash behind the plate: they run half as often) */
    if(!(DBG.dsteal||Math.random()<p))return false;
    PD.stK=PD.r1+PD.n;
    S.goD=clamp(.75+.6*sp,.7,1.4);
    PD.qAfter=()=>{
      PD.o0=PD.outs;
      PD.r1=null;
      if(PD.outs>=3){
        PD.n++;
        PD.k=(PD.k+1)%KBAT.length;
        pdEnd();
      }
      else{
        PD.hideBat=false;
        PD.ph=0;
        PD.t=now;
        pdUI();
      }
    }
    ;
    PD.hideBat=false;
    qteStart('dsteal2',true);
    return true;
  }
  catch(e){
    PD.qAfter=null;
    return false;
  }
}


// ───────── pdEnd  (index.html L2013)
function pdEnd(){
  try{
    $('hud').classList.remove('pdj');
    const c=document.querySelector('#juice .mcap');
    if(c)c.textContent='BATTER';
  }
  catch(e){
  }
  PD.dmk=false;
  PD.celA=0;
  PD.celHold=0;
  try{
    if(MX.clip&&MX.clip.swap==null)batterOpacity(1);
  }
  catch(e){
  }
  try{
    cqOff();
  }
  catch(e){
  }
  if(PD.wk){
    PD.wk=false;
    $('walk').hidden=true;
    $('hud').classList.remove('wk');
  }
  try{
    const T2=$('tim');
    T2._px=T2._py=null;
    T2.style.left='';
    T2.style.top='';
    T2.style.textAlign='';
  }
  catch(e){
  }
  try{
    if(MX.pit&&MX.pit.obj)MX.pit.obj.visible=true;
  }
  catch(e){
  }
  pdOdEnd();
  const k=PD.runs,done=PD.done;
  PD.on=false;
  try{
    S.pStam=Math.min(S.pStam===undefined?1:S.pStam,.2);
  }
  catch(e){
  }
  /* AN INNING IS A FULL DAY'S WORK (for now): whoever finished the half comes off it drained. Send him back out and his timing windows are narrow; the bullpen is fresh. */
  if(S.pdJ0!==undefined){
    S.mJ=S.over?1:S.juice;
    S.mO=!!S.over;
    S.juice=S.pdJ0;
    S.over=!!S.pdO0;
    S.overOn=false;
    if(S.over)S.juice=1;
    S.pdJ0=undefined;
    S.pdO0=false;
  }
  /* (the batting side gets back the bars it had) */
  PD.ph=0;
  $('pd').hidden=true;
  $('hud').classList.remove('pd');
  pdArcOff();
  if(PD.mark)PD.mark.visible=false;
  if(PD.kz)PD.kz.visible=false;
  ball.visible=false;
  ballShadow.visible=false;
  swing=null;
  fielders.forEach(f=>{
    if(f._sp){
      f.speed=f._sp[0];
      f.react=f._sp[1];
      f.reach=f._sp[2];
      f._sp=null;
    }
  }
  );
  flight=null;
  $('pd').style.visibility='';
  S.kOut=null;
  S.balls=0;
  S.strikes=0;
  S.outs=0;
  S.bases=[0,0,0];
  S.pName=PD.sv.pName;
  try{
    pitcherModel();
  }
  catch(e){
  }
  MX.bshown=undefined;
  /* the Kraken pitcher is back on the mound and the next Comet takes his own body back */
  if(!k&&PD.outs>=3)badge('side');
  S.state='result';
  S.t=now;
  readyDur=.1;
  S.next=()=>{
    if(done)done(k);
  }
  ;
  hud();
}


// ───────── pdBrawlEnd  (index.html L4191)
function pdBrawlEnd(){
  const won=!BRW.win;
  BRW.pd=false;
  S.state='pduel';
  S.t=now;
  PD.ph=4;
  PD.t=now-.6;
  PD.brLost=!won;
  try{
    $('pd').style.visibility='';
    $('shout').classList.remove('go');
  }
  catch(e){
  }
  if(won){
    badge('brawl');
    const had=!!S.over;
    if(!S.over)S.juice=1;
    try{
      overCheck();
    }
    catch(e){
    }
    pop('WON THE BRAWL!','NEXT BATTER RATTLED'+(had?'':' \u00B7 OVERDRIVE READY'),'sup',true);
    /* (winning the fight fills the meter: your pitcher comes out of it with Overdrive in hand) */
    cheer(.5,3);
    roar(.9,.3);
    buzz([30,40,80]);
  }
  else{
    pop('YOU GOT WHOOPED!','NOBODY IS RATTLED NOW','hot',true);
    boo(.7);
    buzz([60,40,60]);
  }
  try{
    pdUI();
    hud();
  }
  catch(e){
  }
}


// ───────── pdAbort  (index.html L4523)
function pdAbort(){
  try{
    if(PD.on){
      PD.done=null;
      PD.after=null;
      PD.qAfter=null;
      PD.outs=0;
      pdEnd();
      S.next=null;
    }
  }
  catch(e){
    try{
      PD.on=false;
      $('pd').hidden=true;
      $('hud').classList.remove('pd','pdj','pdw');
      if(PD.kz)PD.kz.visible=false;
    }
    catch(x){
    }
  }
  try{
    $('hud').classList.remove('pd','pdj','pdw');
    $('pdask').hidden=true;
    if(PD.wsM)PD.wsM.visible=false;
    PD.wsp=null;
  }
  catch(e){
  }
}


// ───────── pcardTick  (index.html L6895)
function pcardTick(){
  const W=$('walk');
  if(!W)return;
  if(W.hidden||!W.classList.contains('pcp')){
    if(W._pcT){
      W._pcT=false;
      W.style.removeProperty('top');
    }
    return;
  }
  W._pcT=true;
  let ok=false;
  try{
    if(MX.pit&&MX.pit.obj){
      if(!_pcB||_pcB._o!==MX.pit.obj){
        _pcB=null;
        MX.pit.obj.traverse(o=>{
          if(o.isBone&&/Head$/.test(o.name)&&!_pcB)_pcB=o;
        }
        );
        if(_pcB)_pcB._o=MX.pit.obj;
      }
      if(_pcB){
        _pcB.getWorldPosition(_pcH);
        _pcH.y+=.52;
        ok=true;
      }
    }
  }
  catch(e){
  }
  if(!ok)_pcH.set(0,2.45,-18.4);
  _pcH.project(camera);
  const h=canvas.clientHeight||innerHeight,sy=(-_pcH.y*.5+.5)*h,ch=W.offsetHeight||110;
  const lo=MOB?150:96;
  if(!isFinite(sy)||_pcH.z>1)return;
  const top=Math.max(lo,sy-ch-18);
  W.style.setProperty('top',top+'px','important');
  PCARD.top=top;
}
