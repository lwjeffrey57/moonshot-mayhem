# Trails, markers and impact effects

Everything that is drawn around the ball: what it is, when it shows, its color, size and shape. The owner was specific about all of this; the rules below are his. The exact code is in the appendix at the bottom and in `code/02-ball-flight-and-park.js` (`trail`).

Pictures: `phone_05_pitch_in_flight_timing_circle`, `*_06b_took_a_pitch_*_marker`, `*_06_swing_and_miss_replay`, `*_07_ball_in_play_feedback_panel`, and the `phone_strip_homer_*` strips in `look/`.

## The standing rules

- **The ball is always the clearest thing on screen.** A trail never hides it. (The first Unity rig failed this: its trail was as wide as the ball and solid white.)
- **Trails are thin.** "A thin flame ribbon behind the ball: small particles laid end to end along its path, a hot core that dies quickly and a cooler tail that lingers, so the trail tapers instead of ballooning."
- **The ball is one consistent size and look everywhere.** True size up close; scaled up gently with distance so it never vanishes.
- The reference for the batted-ball trail was the old Slugfest games' trail.

## How a trail is made

Each frame, small glowing additive particles are laid along the segment the ball just traveled, a few centimeters apart, with a tiny random jitter so it reads as fire and not as a line.

- **Close to the camera:** particles about 0.13 m, one every 0.05 m, jitter 0.012 m.
- **Far from the camera (more than about 9 m):** particles about 0.55 m, one every 0.16 m, jitter 0.05 m.
- **Hot trail** (hard contact, Juice, Overdrive, every pitch): two layers per point. A cooler tail that lives 0.45–0.8 s, tinted toward red-orange (green ×0.55, blue ×0.4 of the trail color), and a bright near-white core that lives only 0.1–0.2 s on every second point. That is what makes it taper.
- **Cold trail** (ordinary contact): one faint layer at 60% of the color, living 0.12–0.22 s. A whisper of smoke.
- Particles drift slightly upward and outward as they fade.

## Batted-ball trail colors (chosen at contact)

| Situation | Color (r,g,b) | Hot? |
|---|---|---|
| Overdrive swing | (0.2, 0.55, 1.0) electric blue | yes |
| Juice swing | (1.0, 0.45, 0.1) orange flame | yes |
| Power swing, quality above 0.75 | (1.0, 0.85, 0.25) gold | yes |
| Everything else | (0.5, 0.5, 0.55) gray smoke | no |

The contact burst uses the same family: blue for Overdrive, orange for Juice, pale gold otherwise.

## Pitch trails (the pitch coming at you, and your own pitch from the mound)

- **A normal pitch coming at the hitter has no trail at all.** (Correction, 27 Nov: an earlier version of this file said it had a thin white one. The code only trails pitches that carry a color, which is the Juice and Overdrive pitches. The Unity session caught this.) Trailed pitches use the far size for the first three-quarters of the flight and the near size for the last quarter.
- **Your own pitch, seen from the mound, always has a trail:** white normally, gold on a perfect release, the pitch's own color for a Juice pitch.
- **Every Juice pitch has its own color and its own shape of trail**, so it can be read on the way in:

| Pitch | Color | Shape |
|---|---|---|
| METEOR | (1, .25, .05) red-orange | thick: a fat streak |
| ZIG-ZAG | (.2, 1, .35) green | zig: a zig-zag |
| CORKSCREW | (1, .3, .75) pink | helix: a corkscrew |
| FREEZE FRAME | (.1, .95, .85) teal | dash: broken dashes |
| DOUBLE TROUBLE | (1, .62, .08) amber | thin |
| RISER | (.2, .45, 1) blue | wave |
| GEAR SHIFT | (.72, 1, .1) lime | zig |
| BOOMERANG | (1, .1, .3) crimson | helix |
| KNUCKLER | (1, 1, 1) white | burst: a spray of sparks |
| SKY DROP | (1, .95, .1) yellow | thick |
| SUPERNOVA (Overdrive only) | (1, .95, .55) pale gold | burst |
| GHOST BALL (Overdrive only) | (.45, .9, 1) ice blue | dash |
| BLACK HOLE (Overdrive only) | (.5, .2, 1) violet | double: a double helix |

  Shapes: `thick` scatters points ±7 cm; `zig` offsets side to side in a triangle wave of 11 cm; `helix` circles at 9 cm; `wave` rises and falls 10 cm; `double` runs two opposite helices at 15 cm; `dash` skips alternate stretches; `burst` throws sparks outward. All are 1.6× larger in the far size.
- When you pitch, a perfectly timed normal pitch gets a gold-tinted trail (1, .85, .25), and a Juice pitch draws in blue: preview path, target and speed read-out included (blue is the Juice color on the mound, #1432d8).

## Throw trails

- Every throw: flat, a small ball, and the thin white smoke.
- The skinny flame is added on long throws (over 36 m), on about 40% of the short ones, and on any event throw the player nails.
- "A seed, not a lob."

## The blimp home-run shot

From high above the park the ordinary trail is too small to read, so this shot adds a larger, longer-lived flame (particles about 2.2 m, living 1.1–1.6 s, orange with a bright core) while the ball itself stays small. The owner rejected a version with an enlarged ball: "makes it look like it's a popup."

## The ball itself

- White with red seams, spinning on an axis that depends on the pitch type (mirrored for a left-hander).
- True size in flight toward the plate. Batted balls scale to about 5% of camera distance once that exceeds true size, so a deep fly is still visible. During orbit-type show shots it gets a glow and scales a little more.
- A small dark shadow under it on the ground.
- Close-up events (throws, plays at the bag, a ball knocked loose) use the same near-true size; it used to be up to 1.6× and the owner called it goofy.

## Markers at the plate

- **Timing circle:** a yellow ring (#ffe53b) at the spot the pitch will cross, closing steadily onto the target and flashing green (#39ff6a) at the on-time moment. See `PORT_SPEC_HITTING.md`.
- **Pitch-location marker:** a small bright baseball at that spot, no halo around it. The owner removed the halo ("filled the space") and asked for the baseball in place of a plain circle.
- **After a taken pitch:** the same small baseball stays where the pitch crossed for about 1.7 s, with the speed in large italic and the pitch name beneath it, beside the ball on whichever side is clear. The zone outline stays up with it so the spot is read against the zone. The pitch line ("SPLITTER · 83 MPH") also shows in gold at the top-left. See `phone_06b_took_a_pitch_ball_marker` and `…_called_strike_marker`.
- **After a swing and miss:** that marker plus the frozen bat ring with the center marker (see `*_06_swing_and_miss_replay`).
- **When you pitch:** the release timing ring shows a small baseball in its center with the circle kept visible around it; the spot the pitch finished gets a true-size baseball marker.

## Markers in the field

- **Landing ring:** a thin yellow ring (#ffe53b, inner radius 0.8 of outer) flat on the ground where a ball in the air will come down. Its radius shrinks steadily from 5 m when the ball is hit to 1.4 m as it arrives (`lerp(1.4, 5, 1 − time/landing time)`). Shown for fly balls and liners that hang longer than 0.45 s and for every ball that will be caught in the air; never for a home run, and never after the catch. On a robbed home run it is drawn under the fielder's body, not at the end of his glove arm.

## Impact effects

- **Camera shake:** the camera's x and y are jittered each frame by a random amount up to the shake value, which decays by `exp(−7 × dt)`.
- **Contact:** a brief freeze of the action (longer for better contact, power and Juice), a camera shake, a field-of-view kick, a white flash, a shock ring at the contact point sized by quality, and a burst of sparks in the swing's color. Slow motion for about half a second on a crushed power or Juice swing.
- **A perfectly timed pitch release** (or a Juice pitch) gets a smaller version of the same: freeze, kick, flash, shock ring and sparks at the pitcher's fingertips. A merely good release gets a hint; a mistimed one gets nothing.
- **Ball off a wall, pole, batter's eye or light tower:** a spark burst at the point of impact with its own sound; the batter's eye adds an electric zap, the pole a doink, the tower a clang.
- **A homer landing in the seats:** a spray and a thud at the landing spot, and a distance label.
- **A dive:** a puff of dust where he lands.
- **A punch in a brawl:** a comic burst word (POW! WHAM! BLOCKED!) above the two heads, never on a body.

## In Unity

Keep the look and the rules; build it properly. A real ribbon for the smoke and a separate flame effect, each Juice pitch's shape as its own effect, sparks and a shock ring on contact. Measure on the phone. The colors, the thinness, the taper and "the ball is the clearest thing" are not negotiable.

## Appendix: the prototype's own code for trails and effects (verbatim lines)


### The particle systems (three pools: small/near, large, and far)

```js
// index.html L3358
function makeFx(n,size){

// index.html L3359
const pos=new Float32Array(n*3),col=new Float32Array(n*3),g=new T.BufferGeometry();

// index.html L3360
g.setAttribute('position',new T.BufferAttribute(pos,3));g.setAttribute('color',new T.BufferAttribute(col,3));

// index.html L3361
const pts=new T.Points(g,new T.PointsMaterial({size,map:glowTex,vertexColors:true,blending:T.AdditiveBlending,transparent:true,depthWrite:false,fog:false}));

// index.html L3362
pts.frustumCulled=false;scene.add(pts);

// index.html L3363
const P=[];for(let i=0;i<n;i++){P.push({l:0,m:1,vx:0,vy:0,vz:0,r:0,g:0,b:0,gr:0});pos[i*3+1]=-999;}

// index.html L3364
let k=0;

// index.html L3365
return {emit(p,v,life,r,gc,b,gr=0){const q=P[k];pos[k*3]=p.x;pos[k*3+1]=p.y;pos[k*3+2]=p.z;q.vx=v.x;q.vy=v.y;q.vz=v.z;q.l=q.m=life;q.r=r;q.g=gc;q.b=b;q.gr=gr;k=(k+1)%n;},

// index.html L3366
update(dt){for(let i=0;i<n;i++){const q=P[i];if(q.l<=0)continue;q.l-=dt;const j=i*3;

// index.html L3367
if(q.l<=0){pos[j+1]=-999;col[j]=col[j+1]=col[j+2]=0;continue;}

// index.html L3368
q.vy-=q.gr*dt;pos[j]+=q.vx*dt;pos[j+1]+=q.vy*dt;pos[j+2]+=q.vz*dt;const a=q.l/q.m;col[j]=q.r*a;col[j+1]=q.g*a;col[j+2]=q.b*a;}

// index.html L3369
g.attributes.position.needsUpdate=true;g.attributes.color.needsUpdate=true;}};

// index.html L3370
}

// index.html L3371
const fxS=makeFx(900,.13),fxL=makeFx(900,2.2),fxT=makeFx(2600,.55);

// index.html L3372
const _v=new V3(),_p=new V3();
```


### Pitch trail call (your view while batting)

```js
// index.html L6378
{const gone=pitch.P.ghost&&u>.36&&u<.7;if(pitch.P.ghost&&u<1)ball.visible=!gone;if(pitch.P.col&&u<1&&!gone)trail(pitch,pitch.P.col,u<.75,true,pitch.P.tp);}
```


### Batted-ball trail call and the blimp-shot flame

```js
// index.html L6427
if(!dead){trail(flight,flight.sky&&dc>90?[1,.55,.15]:flight.trailC,dc>9,flight.sky&&dc>90?true:(flight.tb||(flight.pw&&flight.q>.75)));if(flight.sky&&dc>90){try{const o=flight._sk||(flight._sk={lp:ball.position.clone()}),d=o.lp.distanceTo(ball.position),n=d>15?0:Math.min(30,Math.max(1,Math.round(d/.55)));for(let i=1;i<=n;i++){_tp.lerpVectors(o.lp,ball.position,i/n);_v.set(0,0,0);fxL.emit(_tp,_v,rand(1.1,1.6),1,.5,.12);if(i%2===0)fxL.emit(_tp,_v,rand(.35,.55),1,.92,.55);}o.lp.copy(ball.position);}catch(e){}}} /* FROM THE BLIMP the ball stays its ordinary small size and the flame does the work: every one of these is drawn with the full fire trail (doubled up so it reads from that height), tracing the same flight it left the bat on */
```


### Trail colors chosen at contact

```js
// index.html L4878
flight={tr,play,t0:now,q,pw,tb,jp:!!(pitch&&pitch.P&&pitch.P.sp),pod:!!pOD(),fp:(S.balls|0)+(S.strikes|0)===0,od:!!(S.over&&S.overOn),v,done:false,called:false,trailC:S.over&&S.overOn?[.2,.55,1]:tb?[1,.45,.1]:pw&&q>.75?[1,.85,.25]:[.5,.5,.55]}; // Overdrive hits burn blue, Juice hits orange
```


### Throw trails

```js
// index.html L4160
if(u<=1&&(Th.full||e<.45)){ball.visible=true;ball.position.lerpVectors(Th.from,Th.to,u);ball.position.y+=Math.sin(u*PI)*Th.len*.022;ball.scale.setScalar(Math.max(1,camera.position.distanceTo(ball.position)*.036));try{trail(Th,Th.hot?[1,.6,.15]:[1,1,1],camera.position.distanceTo(ball.position)>9,!!Th.hot);}catch(x){}} /* A SEED, NOT A LOB: thrown on a line, a smaller ball, with the thin white smoke behind it and, on the strong ones, the same skinny flame a hard-hit ball carries */

// index.html L4346
if(Q.thr&&Q.thr.on){const T2=Q.thr;if(Q.ph==='throw'){const H=0,e=now-Q.tt,rel=H+(1.0-.3)/1.25,hu=H?clamp(e/H,0,1):1;T2.adv=(H?HOP_D*hu*(2-hu):0)+.5*clamp((e-H)/.4,0,1);T2.hy=H?Math.sin(hu*PI)*.3:0;if(e>=H&&!T2.hop){T2.hop=1;QT.f={n:'throw_cap',t:Q.tt+H,hold:true,rate:1.25,t0:.3};try{SND.step&&SND.step();}catch(x){}}if(e<rel){ball.visible=false;}else{if(!T2.h0){T2.h0={x:T2.x+Math.sin(T2.ry)*(T2.adv+.6),y:1.75,z:T2.z+Math.cos(T2.ry)*(T2.adv+.6)};try{MX.pit.obj.updateMatrixWorld(true);MX.pit.hand.getWorldPosition(_a);if(Math.hypot(_a.x-T2.x,_a.z-T2.z)<6&&_a.y>.6)T2.h0={x:_a.x,y:_a.y,z:_a.z};}catch(x){}}const u=clamp((e-rel)/.5,0,1),ax=T2.h0.x,az=T2.h0.z;ball.visible=true;ball.scale.setScalar(1.05);ball.position.set(lerp(ax,Q.fx,u),lerp(T2.h0.y,1.5,u)+Math.sin(u*PI)*.22,lerp(az,Q.fz,u));try{trail(T2,T2.pend?[1,.6,.15]:[1,1,1],false,!!T2.pend);}catch(x){}if(!T2.snd){T2.snd=1;try{SND.whoosh();}catch(x){}}}
```


### Your pitch trail when you are the pitcher

```js
// index.html L1849
if(PD.ph===3){const pt=PD.pt,u=(now-pt.t0)/pt.dur;pitchPos(pt,Math.min(u,1.04),ball.position);ball.scale.setScalar(.62);ballShadow.scale.setScalar(.1); /* a smaller ball out of your pitcher's hand: it reads as quicker */ /* its true size, as when batting (it had been left at the blown-up size of the last ball in flight) */if(u<1){try{trail(pt,pt.P.col||(PD.grade===2?[1,.85,.25]:[1,1,1]),u<.75,true,pt.P.tp||'thin');}catch(e){}} /* every pitch leaves a streak: seen from behind the mound through a long lens, the streak is what reads as speed */ballShadow.position.set(ball.position.x,.02,ball.position.z);
```


### Ball, glow, shadow, shock ring, landing ring, pitch markers (definitions)

```js
// index.html L3241
const ballShadow=new T.Mesh(GEO.blob,blobMat.clone());ballShadow.rotation.x=-PI/2;ballShadow.visible=false;scene.add(ballShadow);

// index.html L3242
const ballGlow=new T.Sprite(new T.SpriteMaterial({map:glowTex,color:0xffe53b,blending:T.AdditiveBlending,depthWrite:false,transparent:true,opacity:0}));scene.add(ballGlow);

// index.html L3272
const landRing=new T.Mesh(new T.RingGeometry(.8,1,36),new T.MeshBasicMaterial({color:0xffe53b,transparent:true,opacity:.9,depthWrite:false,side:T.DoubleSide,fog:false,polygonOffset:true,polygonOffsetFactor:-6,polygonOffsetUnits:-12})); // the original thin ring, kept clear of the shadow layer so it cannot be buried

// index.html L3276
const trackRing=new T.Mesh(new T.PlaneGeometry(2,2),new T.MeshBasicMaterial({map:(()=>{const t=tex(1024,1024,(g,w)=>{g.clearRect(0,0,w,w);g.scale(w/256,w/256);const c=128;g.lineCap='butt';

// index.html L3284
const echoBall=(()=>{const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d');g.beginPath();g.arc(48,48,44,0,7);g.fillStyle='#fbfaf2';g.fill();g.lineWidth=5;g.strokeStyle='#05060f';g.stroke();g.strokeStyle='#e0262b';g.lineWidth=4;g.beginPath();g.arc(-8,48,40,-.85,.85);g.stroke();g.beginPath();g.arc(104,48,40,Math.PI-.85,Math.PI+.85);g.stroke();

// index.html L3352
const pring=new T.Mesh(new T.RingGeometry(.86,1,28),overlayMat(0xffe53b,.95));pring.renderOrder=10;pring.visible=false;scene.add(pring);

// index.html L3354
const ptarget=new T.Mesh(new T.RingGeometry(.84,1,28),overlayMat(0xffffff,.95));ptarget.renderOrder=10;ptarget.visible=false;ptarget.scale.setScalar(PT_R);scene.add(ptarget);

// index.html L3356
const shock=new T.Mesh(new T.RingGeometry(.8,1,28),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthTest:false,blending:T.AdditiveBlending,side:T.DoubleSide}));shock.renderOrder=11;scene.add(shock);
```
