# When each sound plays

Every sound call in the prototype, grouped by the function it fires from (the function name tells you the moment: `tryContact` is bat on ball, `strike` is a called or swinging strike, `brawlTick` is a punch landing, and so on). `SND.x()` are sounds the game synthesizes itself (defined in the `SND` table in `data/TABLES.md`); `sfx('name')` plays the recorded file `sfx/name.mp3`; `roar`, `cheer`, `boo` and `crowd…` drive the crowd bed. The recorded files are placeholders and not cleared for release (see the sound audit in the private owner record).


## `pdDom`

- `SND.zap()`

## `pdStart`

- `cheer(.2,2)`

## `pdHitter`

- `crowdHush(.7)`
- `boo(.3)`

## `pdThrow`

- `cheer(.35,1.6)`

## `pdTick`

- `cheer(.4,2)`
- `boo(.35)`
- `SND.pitch()`
- `sfx('crush',PD.grade===2?.75:.6,PD.jzOn?.8:1)`
- `SND.whoosh()`

## `cqStart`

- `crowdRise(.7,2.5,true)`

## `pdResolve`

- `SND.mitt()` ×3
- `boo(.8)`
- `SND.call(false,n)`
- `cheer(.6,3)`
- `roar(.7,.3)`
- `cheer(.3,1.5)`
- `cheer(.2,1.5)`
- `SND.call(true,n)`
- `boo(.4)`
- `SND.crack(.4,false)`
- `SND.crack(.4)`
- `SND.crack(qq,qq>.6)`

## `pdFinish`

- `SND.mitt()` ×2
- `SND.ump(false)`
- `cheer(.5,2.5)`
- `roar(.8,.3)`

## `draw`

- `SND.zap()`
- `crowdPump(1)`

## `apoLand`

- `cheer(.9,4)`
- `SND.boom()`

## `zapStart`

- `SND.zap()` ×2

## `crowdFx`

- `crowdFx(dt)`

## `roar`

- `roar(level,ramp,top,now1)`

## `roarOff`

- `sfxSlice('cheer',.22,rand(.92,1.02)`

## `crowdHush`

- `crowdHush(fade=.6)`

## `crowdRise`

- `crowdRise(q,dur,big)`
- `sfxSlice('cheer_big',.8,rand(.97,1.05)`

## `crowdHold`

- `crowdHold(d)`

## `crowdDrop`

- `crowdDrop()`
- `sfxSlice('cheer',.3,rand(.6,.68)`

## `crowdOut`

- `crowdOut(q)`
- `sfxSlice('cheer_big',.34+.3*q,rand(1.08,1.18)`
- `sfxSlice('cheer',.7,rand(1.14,1.24)`
- `sfxSlice('cheer_big',.3+.2*q,rand(.8,.88)`
- `sfxSlice('cheer',.5,rand(.98,1.06)`
- `sfxSlice('cheer',.42,rand(.95,1.05)`
- `sfxSlice('cheer',.34,rand(.7,.78)`

## `crowdTick`

- `crowdTick(dt)`

## `lampSmash`

- `SND.boom()`
- `crowdPump(1)`

## `laserStart`

- `SND.zap()`

## `vendorTick`

- `sfx('vendor',.55)`

## `roarTick`

- `sfxSlice('cheer_big',clamp(roarG.gain.value*1.15,.3,.8)`

## `crowdPump`

- `crowdPump(k=1)`
- `roar(.95*k,.3)`
- `sfxSlice('cheer_big',.5*k,rand(1,1.06)`

## `boo`

- `boo(vol)`

## `cheer`

- `cheer(level,dur)`
- `sfxSlice('pop_max',.6,1,0,4.6)`
- `sfxSlice('cheer_big',.95,rand(.95,1.06)`
- `sfxSlice('cheer',.45+level,rand(.9,1.12)`
- `sfx('swing'+(1+(Math.random()`
- `sfx('playball',.95)`
- `SND.playball(n-1)`
- `sfx('catch2',k==null?.34:lerp(1.05,1.2,k)`
- `sfx('ball'+Math.min(4,n)`
- `sfx('ump_k3',1)`
- `sfx('out',.95)`
- `sfx('ump_ball',1)`
- `sfx('ump_strike',1)`
- `sfx('strike2',.95)`

## `duelCheck`

- `SND.zap()` ×2
- `cheer(.45,4)`

## `duelEnd`

- `cheer(.5,3)`
- `boo(.6)`

## `overCheck`

- `SND.zap()`

## `startWalkup`

- `cheer(.16,2)`

## `updateTrot`

- `crowdPump(.8)`
- `crowdPump()`

## `updateThrow`

- `SND.whoosh()` ×2
- `SND.mitt()` ×2
- `crowdOut(Math.max(Th.q,.55)`
- `roar(1,.15)`
- `sfxSlice('cheer_big',.8,rand(1,1.08)`

## `toReady`

- `cheer(.3,2.4)`

## `pdBrawlEnd`

- `cheer(.5,3)`
- `roar(.9,.3)`
- `boo(.7)`

## `brawlStart`

- `roar(1.05,.4)`

## `brawlTick`

- `SND.mitt()`
- `crowdPump(last?1:.6)`
- `boo(.6)`

## `hbpStart`

- `boo(.75)`

## `hbpEnd`

- `cheer(.5,3)`
- `roar(.9,.3)`
- `crowdDrop()`
- `cheer(.3,2)`

## `stealRun`

- `crowdRise(.7,2,true)`

## `qteStart`

- `crowdRise(.8,3,true)`

## `qteDone`

- `SND.zap()` ×3

## `qteTick`

- `SND.step()`
- `SND.whoosh()`
- `SND.mitt()`
- `SND.boom()`
- `crowdPump(1)` ×3
- `SND.ump(safe)` ×2
- `crowdDrop()` ×3
- `SND.ump(true)` ×2
- `boo(.5)`
- `SND.ump(false)` ×2

## `podReveal`

- `boo(.6)`
- `SND.zap()` ×2

## `pcIntro`

- `boo(.55)`

## `propReflect`

- `SND.mitt()`

## `goalHud`

- `cheer(.3,2.5)`

## `newGame`

- `SND.playball()`
- `cheer(.14,1.5)`

## `tryContact`

- `SND.crack(q,pw||tb)`
- `SND.zap()`
- `sfx('crush',1)`
- `sfx('nodoubt',.85)`
- `cheer(.42,5)`
- `crowdRise(q,Math.min(play.endT,8)`
- `roar(.28+.34*q+(q>.82&&pw?.2:0)`
- `cheer(.06,1)`
- `roar(odHR?1.15:.85,odHR?.1:.6)`
- `sfxSlice('cheer_big',.9,rand(1,1.06)`

## `addRuns`

- `roar(1.6,.15,true,true)`

## `afterPA`

- `boo(.4)`

## `strike`

- `SND.call(false,n)`
- `boo(.5)`
- `crowdDrop()`
- `boo(.45)`

## `finishPlay`

- `sfx('foul',.9)`
- `SND.mitt()` ×2
- `crowdRise(.6,1.5,true)`
- `SND.ump(false)`
- `crowdOut(lq)` ×2
- `boo(.4)`
- `cheer(.5,3.5)`
- `roar(f.roarL||1,.4)`
- `crowdHold(2.4)`
- `cheer(.25,2)`
- `roar(.6+.1*pl.bases+.05*r,.3)`
- `roar(1,.2)`
- `sfxSlice('cheer_big',.75,rand(1,1.08)`
- `crowdHold(2+wait)`
- `crowdPump()`

## `revTick`

- `SND.zap()`
- `crowdPump(1)`

## `juiceTap`

- `SND.zap()`

## `doSwing`

- `SND.whoosh()` ×3

## `updateClip`

- `crowdPump(.8)`

## `updatePitcher`

- `SND.pitch()`
- `SND.mitt(.7)`

## `updateFielders`

- `SND.mitt()`

## `step`

- `SND.pitch()`
- `sfx('crush',.7,.72)`
- `roar(.42,1.2)`
- `roar(.62,.9)`
- `SND.mitt(clamp((.95-pitch.dur)`
- `SND.call(true,n)`
- `boo(.5)`
- `SND.boom()` ×7
- `SND.zap()` ×7
- `SND.mitt()` ×4
- `crowdOut(.9)` ×2
- `roar(flight.roarL||1,.35)`
- `roar(.75,.3)`
- `sfx('horn',1.5)`
- `crowdTick(dt)`

## `updateCamera`

- `crowdPump(1)`

## `frame0`

- `crowdFx(rdt)`

## `dailyEnd`

- `cheer(.3,2)`

## `modePA`

- `cheer(.3,2)`

## `derbyTarget`

- `cheer(.3,2)`

## `modeEnd`

- `cheer(.3,2)`

## `shotPitch`

- `cheer(.25,2)`
