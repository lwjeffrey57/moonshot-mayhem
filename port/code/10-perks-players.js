// The prototype's own source for this system, function by function, reformatted one statement per line for reading.
// The logic and every number are unchanged from index.html. The comments are the owner's rules: keep them in mind as requirements.


// ───────── gradeMod  (index.html L3858)
function gradeMod(v){
  const t=(v-.85)/.32,B=[0,.2,.36,.52,.72,.9,1.04],i=t>=.9?5:t>=.72?4:t>=.52?3:t>=.36?2:t>=.2?1:0;
  return t>=(B[i]+B[i+1])/2?(i===5?'':'+'):'-';
}


// ───────── perk3  (index.html L3897)
function perk3(b,la,q,pw){
  let m=1;
  try{
    switch(b&&b.name){
      case 'RAZOR':if(q>.5)la+=(17-la)*.22;
      break;
      case 'VREL':if(q>.7)la+=3;
      break;
      case 'XENON':if(la<8)m=1.06;
      break;
      case 'BRICKHOUSE':if(q>.8&&la>=24&&la<=32)m=1.05;
      break;
      case 'DRAAK':if(la>=8&&la<=18)m=1.05;
      break;
      case 'VANTA':if(la>=25&&la<=35)m=1.04;
      break;
      case 'ZEPHRA':if(la<6)m=1.06;
      break;
      case 'CRASH':if(pw)la+=4;
      break;
      case 'GORMAK':if(la>38)la=38+(la-38)*.45;
      break;
    }
  }
  catch(e){
  }
  return [la,m];
}


// ───────── perk2  (index.html L3902)
function perk2(b){
  const o={
    r:1,v:1
  }
  ;
  try{
    if(!b||!PERKS2[b.name])return o;
    const B=S.bases,n=(B[0]?1:0)+(B[1]?1:0)+(B[2]?1:0),first=S.balls+S.strikes===0;
    switch(b.name){
      case 'RAZOR':if(B[1]||B[2])o.r=1.1;
      break;
      case 'VREL':if(first)o.v=1.04;
      break;
      case 'XENON':if(S.outs===0&&n===0)o.r=1.12;
      break;
      case 'BRICKHOUSE':if(pitch&&Math.abs(pitch.tx-(ZONE.x0+ZONE.x1)/2)<(ZONE.x1-ZONE.x0)*.2&&Math.abs(pitch.ty-(ZONE.y0+ZONE.y1)/2)<(ZONE.y1-ZONE.y0)*.2)o.v=1.05;
      break;
      case 'DRAAK':if(S.outs===2)o.v=1.04;
      break;
      case 'VANTA':if(!S.mode&&S.opp>S.runs)o.r=1.1;
      break;
      case 'ZEPHRA':if(B[0])o.r=1.1;
      break;
      case 'CRASH':if(S.balls>S.strikes)o.v=1.04;
      break;
      case 'GORMAK':if(n>=2)o.v=1.05;
      break;
    }
  }
  catch(e){
  }
  return o;
}


// ───────── perkSay  (index.html L3910)
function perkSay(b,k0){
  try{
    const k=k0||perkOf(b);
    if(!k||S._pkT===S.bi+'/'+S.pitches)return;
    S._pkT=S.bi+'/'+S.pitches;
    (S.pkLog=S.pkLog||{
    }
    )[k.n]=(S.pkLog[k.n]||0)+1;
  }
  catch(e){
  }
}


// ───────── ovrBat  (index.html L3914)
function ovrBat(b){
  try{
    return Math.round(60+38*clamp(.4*ovrT(b.pwr)+.4*ovrT(b.con)+.2*ovrT(b.spd),0,1.03)+(b.sp?3:0));
  }
  catch(e){
    return 75;
  }
}


// ───────── ovrK  (index.html L3915)
function ovrK(h){
  try{
    return Math.round(60+38*clamp(.42*ovrT(h.pow)+.42*ovrT(h.con)+.16*clamp(h.eye||.5,0,1),0,1.03));
  }
  catch(e){
    return 75;
  }
}


// ───────── ovrAce  (index.html L3916)
function ovrAce(){
  try{
    return Math.round(PPITCH.reduce((a,q)=>a+.6*Math.max(q.v,q.b)+.4*q.c,0)/PPITCH.length);
  }
  catch(e){
    return 80;
  }
}


// ───────── walkTier  (index.html L3917)
function walkTier(o){
  try{
    const W=$('walk');
    if(o==null){
      delete W.dataset.ovr;
      delete W.dataset.tier;
      return;
    }
    W.dataset.ovr=o;
    W.dataset.tier=tierOf(o);
  }
  catch(e){
  }
}


// ───────── sqFace  (index.html L6961)
function sqFace(b){
  try{
    const F=MUGS[b.name],u=(F&&F.url)||MUGSAVE[b.name];
    return u?'<img src="'+u+'" alt="">':'<s>'+b.num+'</s>';
  }
  catch(e){
    return '<s>'+b.num+'</s>';
  }
}


// ───────── sqMove  (index.html L6966)
function sqMove(d){
  const i=sqPick,j=i+d;
  if(i<0||j<0||j>=LINEUP.length)return;
  const t=LINEUP[i];
  LINEUP[i]=LINEUP[j];
  LINEUP[j]=t;
  try{
    localStorage.setItem('mm_order',JSON.stringify(LINEUP.map(q=>q.name)));
  }
  catch(x){
  }
  buzz(20);
  try{
    badge1('skipper');
  }
  catch(x){
  }
  squadOpen();
  bcardShow(j);
}


// ───────── sqCard  (index.html L6969)
function sqCard(o,ord,nm,face,ps,i,cur){
  return '<button type="button" class="sqc'+(cur?' cur':'')+'" data-i="'+i+'" data-tier="'+tierOf(o)+'"__ST__><span class="ps">'+ps+'</span><span class="cd"><u>'+ord+'</u><span class="ov">'+o+'<small>OVR</small></span>'+face+'<b>'+nm+'</b></span><span class="gem"></span></button>';
}


// ───────── squadOpen  (index.html L6970)
function squadOpen(){
  const t=squadOvr(),T2=$('sqteam');
  T2.dataset.tier=tierOf(t);
  T2.innerHTML='<small>OVR</small>'+t;
  $('sqtb').classList.toggle('on',!sqTab);
  $('sqtp').classList.toggle('on',!!sqTab);
  const pcard=(st,k,pos)=>sqCard(staffOvr(st),st.hand==='L'?'L':'R',st.n,'<s>'+st.num+'</s>','P',-(k+1),k===mypI).replace('__ST__',pos||'');
  let h;
  if(sqTab){
    h='<div class="sqpit">'+STAFF.map((st,k)=>pcard(st,k)).join('')+'</div>';
  }
  else{
    const P={
      CF:[50,14],LF:[15,20],RF:[85,20],SS:[35,38],'2B':[62,38],'3B':[14,48],'1B':[86,48],DH:[14,68],C:[50,68]
    }
    ;
    h='<svg class="fld" viewBox="0 0 100 130" preserveAspectRatio="none"><defs><linearGradient id="sqg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2260"/><stop offset=".3" stop-color="#3b4057"/><stop offset="1" stop-color="#2a2e42"/></linearGradient></defs><rect width="100" height="130" fill="#0a0f2c"/><path d="M-12 30 Q50 2 112 30 L112 130 L-12 130 Z" fill="url(#sqg)"/><path d="M-12 30 Q50 2 112 30" fill="none" stroke="#ff7a1a" stroke-width="1.6"/><path d="M-12 26 Q50 -2 112 26" fill="none" stroke="#2b3a9a" stroke-width="5" opacity=".7"/><path d="M50 96 L-6 62 M50 96 L106 62" stroke="#fff" stroke-width=".8" fill="none"/><path d="M50 96 L22 76 Q50 50 78 76 Z" fill="#666b84" stroke="none"/><path d="M50 96 L28 78 L50 62 L72 78 Z" fill="#4a4f66" stroke="#fff" stroke-width=".6"/><ellipse cx="50" cy="79" rx="4.4" ry="2.4" fill="#8a8fa6"/><ellipse cx="50" cy="97" rx="7" ry="3.6" fill="#666b84"/></svg>'
    +LINEUP.map((b,i)=>{
      const ps=POS_BY[b.name]||'DH',xy=P[ps]||P.DH;
      return sqCard(ovrBat(b),i+1,bdn(b),sqFace(b),ps,i,false).replace('__ST__',' style="left:'+xy[0]+'%;top:'+xy[1]+'%"');
    }
    ).join('')
    +'<div class="sqbench"><em>Bullpen</em><div>'+STAFF.map((st,k)=>pcard(st,k)).join('')+'</div></div>';
  }
  $('sqlist').innerHTML=h;
  $('title').hidden=true;
  $('squad').hidden=false;
}
