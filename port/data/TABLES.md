# Every data table in the prototype, verbatim

Each block is copied character for character from `index.html` (the name, the line it starts on, then the literal). These are the rosters, ratings, pitches, perks, difficulty tiers, event definitions, callout lists, badges, cameras and tuning tables. Port them as data; do not retype numbers by hand.


## `ASV` (L1359, 3177 chars)

```js
ASV = {'abe.txt':'1914220-0323b823','alien.txt':'3118480-8dd64ee4','astra.txt':'3654456-8941a113','bat.txt':'61308-5a6a2b16','brady.txt':'4045180-75d02c7f','crypto.txt':'1956052-08bffa65','david.txt':'3470232-d70bbcc4','demon.txt':'2097240-b76b16fd','dish.txt':'521384-5e7e27b3','dome.txt':'645320-97630611','drake.txt':'2728532-ffe82ade','dreyar.txt':'2004240-694b263a','dugout.txt':'434956-247452a2','dummy.txt':'2751732-81fb847b','ely.txt':'1133932-b7603439','exo.txt':'3350108-7cc71bca','exored.txt':'3354476-f000ff25','fuel.txt':'505164-6487db96','glove.txt':'327600-c4f3788a','jolleen.txt':'2928668-ac97ed98','jones.txt':'3401088-0879faf0','lander.txt':'686988-b179df40','maynar.txt':'2636252-2b5f47b9','mc.txt':'489180-4ec38f8e','olivia.txt':'3467496-4ee417f0','parker.txt':'1536712-b1e81c8c','racer.txt':'3320524-85c8cceb','rocket.txt':'726896-d393cb2c','romero.txt':'3362156-8633ea20','sat.txt':'548012-f08bb036','soda.txt':'519648-f6183fdb','tower.txt':'496632-9e96f846','ufo.txt':'328872-25eb1e60','vboard.txt':'492896-910c3ee7','zlorp.txt':'2167800-d6900988','abe_d0.jpg':'146334-576a9c4b','abe_n0.jpg':'199287-d499d34c','alien_d0.jpg':'119110-9c7aa178','alien_d1.jpg':'116537-39242db4','alien_n0.jpg':'219586-063c2f39','alien_n1.jpg':'218172-e18fcef2','astra_d0.jpg':'127921-bd183c0a','astra_d1.jpg':'144956-405e4a2b','astra_n0.jpg':'252470-b3b1d9e4','astra_n1.jpg':'184469-3fd37704','brady_d0.jpg':'155172-3bd5e583','brady_d1.jpg':'102950-995c3e5a','brady_n0.jpg':'176341-fb08ae02','brady_n1.jpg':'178007-24f8db93','crypto_d.jpg':'157953-2713e2d5','crypto_n.jpg':'308635-4a38def7','david_d0.jpg':'81151-a95159c5','david_n0.jpg':'158324-3e97f1ef','demon_d0.jpg':'156250-5c8d5425','demon_n0.jpg':'183054-76bc071c','drake_d0.jpg':'145035-b8fc7203','drake_d1.jpg':'112076-85fb7db9','drake_n0.jpg':'119745-eea7c633','drake_n1.jpg':'98714-501b5dda','dreyar_d0.jpg':'127836-e41cff8e','dreyar_n0.jpg':'171275-2f739353','dummy_d0.jpg':'94644-c9146a95','dummy_n0.jpg':'155883-8ce25203','ely_d.jpg':'257837-cb9b1a0a','ely_g.jpg':'29228-743709cc','ely_n.jpg':'258265-24fa5e70','ely_s.jpg':'318655-470e38d8','exo_suit.jpg':'54831-c7b1c389','exored_d0.jpg':'291336-1b5c4e5e','exored_d1.jpg':'223612-255c39a9','exored_n0.jpg':'164422-2c78f2d5','exored_n1.jpg':'175209-19bf68fa','jolleen_d0.jpg':'126788-1a91b365','jolleen_n0.jpg':'193621-006989a7','jones_d0.jpg':'241502-b2de1bc0','jones_n0.jpg':'156648-63207a0a','maynar_d0.jpg':'191759-cddb0201','maynar_d1.jpg':'174970-1c994506','maynar_n0.jpg':'167002-1683b675','maynar_n1.jpg':'156187-b2b2667f','moon_d.jpg':'68530-f677f808','moon_n.jpg':'320746-9459f119','olivia_d0.jpg':'123833-87a9de13','olivia_d1.jpg':'71566-46b63db7','olivia_n0.jpg':'170491-50121fda','olivia_n1.jpg':'154135-a756ccd7','parker_d0.jpg':'116582-74f08a7a','racer_d0.jpg':'137768-f784f946','racer_n0.jpg':'152169-7608d03a','romero_d0.jpg':'154931-3a9e1169','romero_d1.jpg':'155946-bfa635e7','romero_n0.jpg':'249319-17aa6d9f','romero_n1.jpg':'229069-95198999','zlorp_d0.jpg':'165623-6ab9ac63','zlorp_d1.jpg':'168391-211f71db','zlorp_n1.jpg':'148070-279d0d42','clips.json':'533567-0d648a4d','ely_clips.min.json':'6593811-41febb8b','exo_body.jpg':'71491-d64a467a'}
```


## `S2` (L1483, 130 chars)

```js
S2 = [[0,255,255,255],[350,255,255,255],[410,255,229,59],[470,255,138,30],[530,255,42,30],[700,214,18,26],[900,150,8,18],[1134,92,0,8]]
```


## `KPERK` (L1525, 435 chars)

```js
KPERK = {ZLORP:{n:'MISTAKE CRUSHER',d:'Leave one over the middle and it goes a long way.'},XANDU:{n:'GOOD EYE',d:'Rarely chases off the plate.'},"M'NAR":{n:'TWO-STRIKE FIGHTER',d:'Much harder to put away with two strikes.'},KORVO:{n:'DEAD-RED',d:'Sits on fastballs: throw him one and he is on it.'},SKARR:{n:'RALLY BAT',d:'A tougher out with runners on base.'},NYXA:{n:'SLAP HITTER',d:'Puts almost everything in play, but with little power.'}}
```


## `KBAT` (L1526, 455 chars)

```js
KBAT = [{name:'ZLORP',body:10,con:.92,pow:1.15,eye:.45,hot:[0,1,1, 0,1,0, -1,-1,0]},{name:'XANDU',body:11,con:1.1,pow:.9,eye:.7,hot:[-1,0,0, 1,1,0, 1,0,-1]},{name:"M'NAR",body:12,con:1.0,pow:1.05,eye:.55,hot:[0,-1,-1, 0,1,1, 0,1,0]},
  {name:'KORVO',body:13,con:.85,pow:1.2,eye:.4,hot:[1,1,0, 1,0,-1, 0,-1,-1]},{name:'SKARR',body:14,con:1.05,pow:.95,eye:.65,hot:[0,0,1, -1,1,1, -1,0,0]},{name:'NYXA',body:15,con:1.15,pow:.85,eye:.75,hot:[-1,1,0, 0,1,0, 1,0,-1]}]
```


## `PPITCH` (L1530, 160 chars)

```js
PPITCH = [{n:'FASTBALL',i:0,T:.78,v:91,c:78,b:52},{n:'SLIDER',i:2,T:.88,v:76,c:70,b:84},{n:'CURVEBALL',i:1,T:.95,v:58,c:64,b:92},{n:'CHANGEUP',i:3,T:.92,v:60,c:86,b:68}]
```


## `PD` (L1531, 172 chars)

```js
PD = {on:false,ph:0,n:0,k:0,balls:0,strikes:0,outs:0,bases:[0,0,0],runs:0,tx:0,ty:.825,pk:0,last:-1,t:0,wuT:0,pt:null,res:null,bx:0,bz:-40,style:0,done:null,_p:new V3(),sv:null}
```


## `JPL` (L1537, 263 chars)

```js
JPL = [JP('METEOR',.72,99,74,40),JP('RISER',.78,92,70,88),JP('ZIG-ZAG',.92,70,66,95),JP('CORKSCREW',.92,70,64,97),JP('BOOMERANG',.95,66,62,99),JP('KNUCKLER',.98,58,58,96),
    JP('SUPERNOVA',.7,99,80,45,1),JP('GHOST BALL',.9,78,72,90,1),JP('BLACK HOLE',.98,60,66,99,1)]
```


## `PAB` (L1539, 305 chars)

```js
PAB = {FASTBALL:'FB',CURVEBALL:'CB',SLIDER:'SL',CHANGEUP:'CH',SINKER:'SNK',CUTTER:'CUT',SPLITTER:'SPL',SWEEPER:'SWP','KNUCKLE CURVE':'KC',EEPHUS:'EEP',SCREWBALL:'SCR',METEOR:'MTR',RISER:'RSR','ZIG-ZAG':'ZIG',CORKSCREW:'CRK',BOOMERANG:'BMR',KNUCKLER:'KNK',SUPERNOVA:'NOVA','GHOST BALL':'GST','BLACK HOLE':'HOLE'}
```


## `PDESC` (L1541, 502 chars)

```js
PDESC = {FASTBALL:'STRAIGHT HEAT',SLIDER:'DARTS SIDEWAYS LATE',CURVEBALL:'BIG LOOPING DROP',CHANGEUP:'SLOW, DIES AT THE PLATE',SINKER:'RUNS IN AND SINKS',CUTTER:'HARD, LATE CUT',SPLITTER:'THE BOTTOM FALLS OUT',SWEEPER:'SWEEPS RIGHT ACROSS',SCREWBALL:'BREAKS THE OTHER WAY',EEPHUS:'SLOW RAINBOW LOB','KNUCKLE CURVE':'HARD, SHARP BITE',METEOR:'PURE GAS',RISER:'JUMPS LATE','ZIG-ZAG':'CUTS LEFT AND RIGHT',CORKSCREW:'DRILLS IN A SPIRAL','FREEZE FRAME':'STOPS, THEN GOES','DOUBLE TROUBLE':'TWO BALLS, ONE IS REAL'}
```


## `PDSHAPE` (L1597, 76 chars)

```js
PDSHAPE = {FASTBALL:{bx:1,by:1,arc:0,k:1},CURVEBALL:{bx:.8333,by:.8333,arc:1,k:.7143}}
```


## `S0` (L1609, 54 chars)

```js
S0 = {x:A.x-(E.x-A.x)*.45,y:A.y-.05-Math.abs(bky)*.08,z:-5}
```


## `PTUT` (L1653, 1201 chars)

```js
PTUT = [['pdpad','LEFT THUMB: HOLD TO AIM','Push the stick and <i>hold it</i>: the <i>yellow target</i> sits where your thumb holds it. Let go early and it snaps back to the middle. (With a mouse, just point at the zone.)'],
  ['ZONE','THE STRIKE ZONE','The target is where the pitch will go. <i>Red</i> squares are where this batter is hot, <i>blue</i> where he is cold. The dotted line shows how the pitch will move. Aim off the plate to make him chase.'],
  ['pdbtns','PICK · AIM · TAP · TAP','<i>Pick a pitch</i> on the arc. <i>Hold your aim</i> with the left thumb. <i>Tap the dial</i> in the middle: a ring starts closing on your target and the dial becomes one big <i>PITCH!</i> button. <i>Tap it</i> as the ring meets the yellow circle. On the money, it goes exactly where you aimed. Miss badly and you hung it.'],
  ['pdjuice','JUICE, OVERDRIVE, DRILL','<i>JUICE</i> swaps in four trick pitches for a quarter of your bar each. Fill the bar and the same button becomes <i>OVERDRIVE</i>: every Juice pitch, free, for one batter. <i>DRILL HIM</i> plunks the batter once a half. In the zone, <i>red</i> is where he is hot and <i>blue</i> where he is cold. The green bar up top is your <i>stamina</i>.']]
```


## `STAFF` (L1902, 2564 chars)

```js
STAFF = [{n:'ACE',num:21,hand:'',pk:['BULLDOG','Tougher to hit with runners on base.'],pk2:['SCOUTING REPORT','On 0-2 he sees the hitter\'s weak spot: hit the gold target to put him away.'],d:'BALANCED RIGHTY',jz:['METEOR','RISER','ZIG-ZAG','CORKSCREW'],a:['FASTBALL','SLIDER','CURVEBALL','CHANGEUP'],p:[[91,78,52],[76,70,84],[58,64,92],[60,86,68]]},
  {n:'BLAZE',num:45,hand:'',pk:['HIGH HEAT','Fastballs up in the zone get swung through.'],d:'POWER RIGHTY \u00B7 THREE HARD ONES, LESS CONTROL',jz:['METEOR','RISER','KNUCKLER'],a:['FASTBALL','SINKER','SPLITTER'],p:[[98,68,55],[94,64,76],[86,60,90]]},
  {n:'SOUTHPAW',num:33,hand:'L',pk:['UNCLE CHARLIE','Hitters chase his curveball off the plate.'],d:'LEFTY \u00B7 BIG CURVE AND A SCREWBALL',jz:['CORKSCREW','BOOMERANG','ZIG-ZAG'],a:['FASTBALL','CURVEBALL','CHANGEUP','SCREWBALL'],p:[[88,80,58],[56,72,96],[58,88,74],[66,74,88]]},
  {n:'DOC',num:12,hand:'',pk:['PAINTER','Pitches on the edge of the zone get taken for strikes.'],pk2:['SCOUTING REPORT','On 0-2 he sees the hitter\'s weak spot: hit the gold target to put him away.'],d:'CONTROL RIGHTY \u00B7 PAINTS, AND LOBS THE EEPHUS',jz:['KNUCKLER','BOOMERANG','CORKSCREW','ZIG-ZAG'],a:['FASTBALL','CUTTER','CHANGEUP','EEPHUS'],p:[[86,94,50],[84,90,72],[58,96,80],[40,92,70]]},
  {n:'VIPER',num:7,hand:'L',pk:['WIPEOUT','His slider with two strikes is nearly unhittable.'],d:'LEFTY \u00B7 FILTHY SLIDER AND A SWEEPER, WILD',jz:['BOOMERANG','ZIG-ZAG','RISER'],a:['FASTBALL','SLIDER','SWEEPER'],p:[[85,70,60],[79,64,97],[72,60,95]]},
  /* FOUR TEST ARMS, uneven on purpose, so the ratings can be felt against each other: all gas and no idea where it is going; all command and nothing on it; one filthy pitch and nothing else; and a man who is just not very good. */
  {n:'WILD THING',num:99,hand:'',pk:['TEST ARM','No perk.'],d:'TRIPLE-DIGIT GAS \u00B7 NO CONTROL AT ALL',jz:['METEOR','RISER'],a:['FASTBALL','SLIDER'],p:[[100,40,50],[88,36,86]]},
  {n:'SOFT TOSS',num:50,hand:'',pk:['TEST ARM','No perk.'],d:'PINPOINT CONTROL \u00B7 NOTHING ON IT',jz:['KNUCKLER','CORKSCREW'],a:['FASTBALL','CHANGEUP','CURVEBALL','EEPHUS'],p:[[76,98,40],[60,98,62],[56,96,70],[38,97,60]]},
  {n:'ONE TRICK',num:13,hand:'L',pk:['TEST ARM','No perk.'],d:'LEFTY \u00B7 ONE UNHITTABLE SWEEPER, A BATTING-PRACTICE FASTBALL',jz:['BOOMERANG','ZIG-ZAG'],a:['FASTBALL','SWEEPER'],p:[[80,58,42],[74,62,99]]},
  {n:'MOP-UP',num:61,hand:'',pk:['TEST ARM','No perk.'],d:'BELOW AVERAGE AT EVERYTHING',jz:['METEOR','ZIG-ZAG'],a:['FASTBALL','CURVEBALL','CHANGEUP'],p:[[82,56,45],[64,50,58],[68,54,50]]}]
```


## `PPT` (L1916, 141 chars)

```js
PPT = {FASTBALL:.78,SLIDER:.88,CURVEBALL:.95,CHANGEUP:.92,SINKER:.8,CUTTER:.81,SPLITTER:.86,SWEEPER:.9,'KNUCKLE CURVE':.93,EEPHUS:1.2,SCREWBALL:.9}
```


## `KCALL` (L1919, 414 chars)

```js
KCALL = {shove:["YOU'RE SHOVING!","YOU'RE DEALING!","YOU'RE CARVING!"],look:['FROZE HIM!','GRAB SOME PINE!','CAUGHT LOOKING!','SIT DOWN!','LOCKED HIM UP!'],swing:['BY YOU!','GOODNIGHT!','PUNCHED OUT!','SIT DOWN!','SAT HIM DOWN!','FANNED HIM!'],gas:['BLEW HIS DOORS OFF!','BY YOU!','PURE GAS!','CHEESE!'],ugly:['BUCKLED HIM!','MADE HIM DANCE!','BROKE HIS ANKLES!','FILTHY!'],paint:['PAINTED!','FROZE HIM!','ON THE BLACK!']}
```


## `KSPD` (L2008, 57 chars)

```js
KSPD = {ZLORP:.3,XANDU:.9,"M'NAR":.5,KORVO:.4,SKARR:.7,NYXA:.95}
```


## `DRS` (L2081, 51 chars)

```js
DRS = {k:1,n:0,t:0,good:0,lows:0,cap:false,capT:0,last:0}
```


## `LOCKFX` (L2101, 57 chars)

```js
LOCKFX = {t:-99,x:0,z:0,hr:false,name:'',fired:true,a:null,b:null}
```


## `LEAGUE` (L2111, 247 chars)

```js
LEAGUE = [['TRANQUILITY','COMETS','#ff8a3a'],['KEPLER','KRAKENS','#7fe6ff'],['TYCHO','THUNDER','#ffe53b'],['APOLLO','ACES','#ff4d6d'],['MARE','MAMMOTHS','#b79cff'],['CRATER','KINGS','#ffd08a'],['ECLIPSE','OUTLAWS','#9aa3c7'],['DARKSIDE','DJINN','#5dffb0']]
```


## `NEW_T` (L2177, 61 chars)

```js
NEW_T = ['p_dosido','p_town','p_shuffle','p_wavy','p_chick2','p_joy']
```


## `NEW_K` (L2177, 73 chars)

```js
NEW_K = ['p_shrug','p_dosido','p_outta','p_chick2','p_town','p_shuffle','p_wavy']
```


## `SH` (L2489, 102 chars)

```js
SH = [[.95,.32,.2],[.2,.5,.95],[.96,.8,.2],[.92,.92,.96],[.25,.75,.45],[1,.48,.12],[.6,.3,.85],[.1,.14,.4]]
```


## `SK` (L2489, 53 chars)

```js
SK = [[.93,.74,.6],[.62,.42,.3],[.82,.6,.45],[.45,.3,.22]]
```


## `MSG` (L2571, 5094 chars)

```js
MSG = {idle0:LEAGUE.map(t=>[t[0]+' '+t[1],t[2]]),idle1:four(['TRANQUILITY COMETS',O],['VS',W],['KEPLER KRAKENS',I],['LUNAR LEAGUE BASEBALL',Y]),
        idle2:four(['MOONSHOT PARK',Y],['SEA OF TRANQUILITY',I],['ONE-SIXTH GRAVITY',G],['SIX TIMES THE DISTANCE',O]),// THE BOARD WORKS THE CROWD: a different chant every time it comes round
        idle3:()=>{const s=[[['GET LOUD!',Y],['LOUDER!',O],['GET LOUD!',Y],['LET\'S GO COMETS',W]],[['MAKE SOME NOISE',Y],['LET\'S GO COMETS',O],['EVERYBODY CLAP',W],['LET\'S GO COMETS',O]],[['ON YOUR FEET!',Y],['STOMP THE MOON',I],['ON YOUR FEET!',Y],['LET\'S GO COMETS',O]]];return four(...s[(Math.random()*s.length)|0]);},
        idle6:()=>{const s=[[['I CAN\'T HEAR YOU!',Y],['NOISE METER: WEAK',R],['I CAN\'T HEAR YOU!',Y],['SHAKE THE DOME',I]],[['EVERYBODY UP!',Y],['CLAP · CLAP · CLAP-CLAP-CLAP',W],['LET\'S GO COMETS',O],['WAKE UP THE CRATER',I]],[['GET LOUD!',Y],['RATTLE THE AIRLOCKS',O],['GET LOUD!',Y],['THEY CAN HEAR US ON EARTH',G]]];return four(...s[(Math.random()*s.length)|0]);},
        // ...and so does the League office. Every ballpark on the Moon is company property, and so, technically, are the fans.
        idle7:()=>{const a=['CHEERING IS MANDATORY','APPLAUSE QUOTA: '+(41+((Math.random()*50)|0))+'% MET','YOUR ENTHUSIASM IS BEING MONITORED','FUN IS A CONTRACTUAL OBLIGATION'],b=['LOUD FANS BREATHE PREMIUM AIR','SECTION 114: CLAP OR BE RESEATED','QUIET FANS WILL BE BILLED','THE LEAGUE THANKS YOU FOR YOUR COMPULSORY SUPPORT'],c=['THIS INNING BROUGHT TO YOU BY OXYGEN™','CONCESSIONS ACCEPT CREDITS, SCRIP AND LABOR','EXIT DOORS UNLOCK AFTER THE FINAL OUT','REPORT UNSPONSORED JOY TO AN USHER'],r=x=>x[(Math.random()*x.length)|0];
          return four([r(a),R],[r(b),W],['GET LOUD!',Y],[r(c),G]);},
        // the 50/50 raffle, Moon style: the numbers are different every time it comes round
        idle4:()=>{const pot=(rand(1.2,98.6)).toFixed(1),tk=String((Math.random()*1e6)|0).padStart(6,'0'),gag=['WINNER TAKES HALF THE MOON','LOSER RAKES THE CRATERS','PAID IN MOON ROCKS','OXYGEN NOT INCLUDED','MUST BE PRESENT ON THE MOON TO WIN','SECOND PRIZE: A RIDE HOME'][(Math.random()*6)|0];
          return four(['50/50 RAFFLE',Y],['POT: '+pot+' MILLION MOON BUCKS',G],['WINNING TICKET '+tk,W],[gag,O]);},
        idle5:()=>{const n=(18000+((Math.random()*24000)|0)).toLocaleString('en-US'),gag=['HOT DOGS FLOAT. HOLD ON TO YOURS.','LOST HELMET? SEE GUEST SERVICES','NEXT SHUTTLE TO EARTH: NEVER','FOUL BALLS MAY LEAVE ORBIT','PLEASE DO NOT FEED THE KRAKENS'][(Math.random()*5)|0];
          return four(['TONIGHT\'S CROWD: '+n,W],[gag,Y],['GRAVITY: STILL ONE-SIXTH',G],['KISS CAM IS BROKEN AGAIN',P]);},
        // PROPAGANDA: the League owns the board, the park, the air and the players, and says so cheerfully between pitches...
        idle8:()=>{const a=['ONE MOON. ONE LEAGUE. ONE INVOICE.','THE LEAGUE PROVIDES','WORK. CHEER. REPEAT.','BASEBALL IS FREEDOM* (*TERMS APPLY)','GRAVITY IS A PRIVILEGE','EARTH IS OVERRATED. STAY.','DISSENT IS A BALK','A LOYAL FAN IS A HAPPY FAN','THE SEASON NEVER ENDS. NEITHER DOES YOUR CONTRACT.'],
            b=['PLAYERS ARE ASSETS. LOVE YOUR ASSETS.','THE COMMISSIONER IS WATCHING. WAVE!','YOUR SEAT. YOUR DEBT. YOUR TEAM.','RE-ENLIST AT ANY CONCOURSE KIOSK','TRANQUILITY BASE: '+((Math.random()*3)|0)+' DAYS SINCE LAST INCIDENT','HOME RUNS ARE PROPERTY OF THE LEAGUE','THE KRAKENS ARE A LICENSED RIVAL. BOO RESPONSIBLY.','REPORT EMPTY SEATS TO SECURITY','TODAY\'S AIR IS SPONSORED BY: AIR'],pk=x=>{const i=(Math.random()*x.length)|0;return x.splice(i,1)[0];};
          return four([pk(a),Y],[pk(b),W],[pk(a),I],[pk(b),O]);},
        // ...and so do its sponsors (the names on the outfield wall)
        idle9:()=>{const a=['ZAPP COLA: OFFICIAL THIRST OF THE WORKFORCE','BURGER BARN: MEAT-ADJACENT SINCE THE MERGER','DINO MART: OWN NOTHING. RENT EVERYTHING.','NITRO SHOES: OUTRUN YOUR DEBT','MEGA ARCADE: SPEND YOUR SHIFT CREDITS HERE','ROCKET FUEL: LEGAL ON THREE MOONS','TURBO TIRE: THE ROAD ENDS. WE DON\'T.','NUTRIPASTE™: NOW IN BEIGE','KRAKEN INSURANCE: ACTS OF KRAKEN NOT COVERED','LUNAR LOANS: 400% APR. 100% FUN.'],pk=()=>{const i=(Math.random()*a.length)|0;return a.splice(i,1)[0];};
          return four([pk(),G],[pk(),Y],[pk(),P],[pk(),I]);},
        hr:four(['HOME RUN!',Y],['GONE!',O],['HOME RUN!',Y],['SEE YA!',W]),nodoubt:four(['NO DOUBTER',Y],['NO DOUBTER',W]),slam:four(['GRAND SLAM',Y],['GRAND SLAM',O]),orbit:four(['INTO ORBIT',I],['MOONSHOT',W]),
        od:four(['OVERDRIVE',W],['OVERDRIVE',I]),pod:four(['DANGER',R],['PITCHER OVERDRIVE','#ffd0c0']),duel:four(['SHOWDOWN',W],['OVERDRIVE',I],['SHOWDOWN',W],['DANGER',R]),
        rally:four(['RALLY TIME',Y],['BRING HIM IN',O],['RALLY TIME',Y],['LET\'S GO COMETS',W]),two:four(['TWO STRIKES',I],['HANG IN THERE',W]),full:four(['FULL COUNT',Y],['HERE IT COMES',W]),
        k:four(['K',I],['STRUCK HIM OUT',W],['K',I],['SIT DOWN',W]),fight:four(['FIGHT!',R],['FIGHT!',Y]),change:four(['PITCHING CHANGE',W],['HIT THE SHOWERS',O]),walkoff:four(['WALK-OFF!',Y],['COMETS WIN',O]),hit:four(['BASE HIT',G],['KEEP IT ROLLING',W])}
```


## `THEME` (L2594, 330 chars)

```js
THEME = {idle:['#070b1e','#ff4d2e'],hr:['#2a1602',Y],nodoubt:['#2a1602',Y],slam:['#3a0a02',O],orbit:['#031436',I],od:['#031436','#3ad6ff'],pod:['#2a0504','#ff2a1e'],duel:['#1a0424',P],rally:['#1c1602',Y],two:['#04122a',I],full:['#1c1602',Y],k:['#04122a',I],fight:['#2a0504',R],change:['#101326',W],walkoff:['#2a1602',Y],hit:['#04201a',G]}
```


## `ROOF` (L2767, 189 chars)

```js
ROOF = {under:basic({map:roofT}),top:basic({color:0x232a5c}),fascia:basic({color:0xeef1ff}),lamp:new T.MeshBasicMaterial({color:0xffe9b0,side:T.DoubleSide,fog:false}),wall:basic({color:0x14183a})}
```


## `ZAP` (L3016, 50 chars)

```js
ZAP = {t:-9,p:new V3(),sb:false,bolts:[],glow:null,nb:0}
```


## `GEO` (L3043, 1184 chars)

```js
GEO = {
  thigh:limb(.46,[.112,.132,.134,.124,.108,.092,.084]),shin:limb(.41,[.084,.094,.098,.09,.076,.068,.07,.074]),
  knee:new T.SphereGeometry(.086,10,8),
  sleeve:limb(.17,[.1,.108,.104,.098,.096]),cuff:new T.CylinderGeometry(.098,.098,.022,12),
  uarm:limb(.31,[.074,.088,.092,.084,.07,.06]),farm:limb(.27,[.06,.07,.068,.058,.047,.042]),elbow:new T.SphereGeometry(.062,8,6),
  wrist:new T.CylinderGeometry(.047,.045,.055,10),fist:new T.SphereGeometry(.058,8,6),
  pelvis:lathe([[.03,-.2],[.15,-.17],[.205,-.08],[.22,0],[.212,.1]]),belt:new T.CylinderGeometry(.216,.218,.05,14),buckle:new T.BoxGeometry(.05,.04,.02),
  torso:lathe([[.21,0],[.218,.06],[.245,.16],[.285,.28],[.305,.38],[.295,.45],[.22,.5],[.12,.54],[.075,.56]],16),
  neck:new T.CylinderGeometry(.062,.072,.12,10),head:new T.SphereGeometry(.12,14,12),ear:new T.SphereGeometry(.028,6,5),
  dome:new T.SphereGeometry(.137,14,7,0,PI*2,0,PI*.5),brim:new T.CylinderGeometry(.105,.105,.014,14),flap:new T.SphereGeometry(.055,8,6),
  shoe:new T.SphereGeometry(.06,10,6),sole:new T.BoxGeometry(.1,.022,.27),ankle:new T.CylinderGeometry(.052,.058,.07,8),
  glove:new T.SphereGeometry(.12,8,6),blob:new T.CircleGeometry(.72,16),
}
```


## `P0` (L3146, 127 chars)

```js
P0 = {y:.95,lean:0,yaw:0,bend:0,ux:0,uz:0,rz:0,head:0,hL:[0,0,.05],kL:0,hR:[0,0,-.05],kR:0,sL:[0,0,.12],eL:-.2,sR:[0,0,-.12],eR:-.2}
```


## `HOME` (L3172, 59 chars)

```js
HOME = {base:'#1b2a6b',trim:'#f26a1b',ink:'#f4f4f0',word:'Comets'}
```


## `AWAY` (L3173, 85 chars)

```js
AWAY = {base:'#f4f4f0',trim:'#0e7c86',ink:'#0e3c46',pin:'rgba(14,60,70,.35)',word:'Krakens'}
```


## `LINEUP` (L3175, 934 chars)

```js
LINEUP = [ /* batting order: the three hitters in similar armor (Razor, Xenon, Draak) are never next to each other */
  {name:'RAZOR',ini:'',num:27,spd:1.0,pwr:1.0,con:1.05,skin:0xb9794f},
  {name:'VREL',ini:'',body:7,num:3,crouch:true,spd:1.02,pwr:1.06,con:1.0,skin:0xe2b08a},
  {name:'XENON',ini:'',body:1,lh:true,num:8,spd:1.14,pwr:.96,con:1.12,skin:0x6b4226},
  {name:'BRICKHOUSE',ini:'',body:2,num:44,stance:'st_wide',spd:0.78,pwr:1.16,con:.82,skin:0xd9a47c},
  {name:'DRAAK',ini:'',body:9,up:.45,num:19,crouch:true,stance:'st_sword',spd:0.95,pwr:1.1,con:.95,skin:0xa8683e},
  {name:'VANTA',ini:'',body:6,lh:true,num:51,spd:1.1,pwr:1.02,con:1.08,skin:0xe6bd94},
  {name:'ZEPHRA',ini:'',body:4,lh:true,num:12,spd:1.15,pwr:.94,con:1.1,skin:0xf0c4a0},
  {name:'CRASH',ini:'',body:8,num:35,crouch:true,spd:0.81,pwr:1.12,con:.93,skin:0x5a3820},
  {name:'GORMAK',ini:'',body:5,num:6,stance:'st_norm2',spd:1.04,pwr:.98,con:1.04,skin:0xe8b690},
]
```


## `FIELD` (L3204, 114 chars)

```js
FIELD = [['1B',16,-23,0],['2B',9,-34,0],['SS',-10,-34,0],['3B',-16,-23,0],['LF',-36,-71,1],['CF',0,-90,1],['RF',36,-71,1]]
```


## `KRAKENS` (L3207, 182 chars)

```js
KRAKENS = [['ARKON','',47,9,1.0,1.0],['TODD','',7,3,1.06,.95],['LIV','',13,2,1.1,.9],['ZLORP','',50,4,.94,1.05],['EDDIE','',25,8,1.04,1.0],['XANDU','',4,7,1.12,.92],["M'NAR",'',30,6,.97,1.08]]
```


## `POSE` (L3213, 1447 chars)

```js
POSE = {
  bStance:pose({y:.865,lean:.22,yaw:-.3,hL:[-.42,0,.3],kL:.84,hR:[-.42,0,-.3],kR:.84,head:1.25}),
  bLoad:pose({y:.85,lean:.26,yaw:-.52,ux:-.07,hL:[-.62,0,.2],kL:1.15,hR:[-.46,0,-.32],kR:.92,head:1.35}),
  bContact:pose({y:.83,lean:.42,yaw:1.12,ux:.1,uz:.05,hL:[-.22,0,.46],kL:.36,hR:[-.55,.9,-.16],kR:1.15,head:.2}),
  bFollow:pose({y:.89,lean:.14,yaw:1.95,ux:.13,hL:[-.14,0,.42],kL:.28,hR:[-.5,1.25,-.12],kR:1.05,head:-.5}),
  pSet:pose({y:.95,hL:[-.05,0,.07],kL:.1,hR:[-.05,0,-.07],kR:.1,sL:[-.9,0,-.45],eL:-1.7,sR:[-.9,0,.45],eR:-1.7}),
  pKick:pose({y:.95,yaw:-1.3,hL:[-1.65,0,0],kL:1.8,hR:[0,0,-.03],kR:.06,sL:[-.9,0,-.45],eL:-1.7,sR:[-.9,0,.45],eR:-1.7}),
  pStride:pose({y:.76,yaw:-1.2,lean:.1,rz:.9,hL:[-1.0,0,.1],kL:.55,hR:[.55,0,-.05],kR:.45,sL:[0,0,1.45],eL:-.3,sR:[.4,0,-1.5],eR:-1.5}),
  pRelease:pose({y:.78,yaw:.55,lean:.55,rz:1.3,hL:[-.9,0,.1],kL:.7,hR:[.75,0,-.1],kR:.7,sL:[.3,0,.4],eL:-2,sR:[-2.7,0,-.3],eR:-.12}),
  pFollow:pose({y:.74,yaw:1.05,lean:.9,rz:1.5,hL:[-.8,0,.1],kL:.85,hR:[1.05,0,-.3],kR:1.25,sL:[.3,0,.4],eL:-2,sR:[-.6,0,.55],eR:-.3}),
  fReady:pose({y:.8,lean:.5,hL:[-.62,0,.36],kL:1.1,hR:[-.62,0,-.36],kR:1.1,sL:[-.7,0,.2],eL:-.7,sR:[-.7,0,-.2],eR:-.7}),
  fScoop:pose({y:.6,lean:1.05,hL:[-1.15,0,.42],kL:1.75,hR:[-1.15,0,-.42],kR:1.75,sL:[-.5,0,-.12],eL:-.12,sR:[-.5,0,.12],eR:-.12}),
  fCatch:pose({y:.93,lean:-.05,hL:[-.1,0,.12],kL:.2,hR:[-.1,0,-.12],kR:.2,sL:[-2.85,0,.15],eL:-.2,sR:[-.3,0,-.3],eR:-.6}),
}
```


## `SPIN` (L3240, 252 chars)

```js
SPIN = {FASTBALL:[1,0,0,34],CURVEBALL:[-1,0,0,30],SLIDER:[.3,.25,.92,38],CHANGEUP:[.85,.5,.1,17],SCREWBALL:[-.5,.6,.6,26],SINKER:[.9,-.4,.2,30],CUTTER:[.8,.25,.55,35],SPLITTER:[1,0,.1,11],SWEEPER:[.1,.3,.95,40],'KNUCKLE CURVE':[-1,.1,.15,34],EEPHUS:[1,0,0,9]}
```


## `SFX_FILES` (L3379, 413 chars)

```js
SFX_FILES = ['ump_strike','ump_ball','ump_k3','ump_out','ump_out2','ump_safe','ump_safe2','bed','cheer','cheer_big','strike','ball','swing1','swing2','swing3','swing4','playball','ball2','ball3','ball4','strike2','out','catch2','crush','nodoubt','boo1','boo2','boo3','pop_max','foul','horn','clap1','clap2','org_charge','org_chord','org_post','org_clap','org_letsgo','org_neenaa','org_mariachi','org_lgo','org_rise','vendor']
```


## `SND` (L3617, 2429 chars)

```js
SND = {
  crack(q,power){noise(.07,'bandpass',2400,900,.9*q+.3,1.2);tone('triangle',1100,260,.06,.5*q+.2);
    if(power&&q>.6){tone('sine',150,38,.5,.9*q);noise(.35,'lowpass',900,120,.5*q);}},
  whoosh(){sfx('swing'+(1+(Math.random()*4|0)),.8,rand(.94,1.08));},
  pitch(){noise(.09,'bandpass',700,2600,.5,1.3);tone('sine',190,80,.09,.4);}, // the ball leaving the hand: one short snap, identical for every pitch. It used to be a long whoosh, and on slow pitches the whoosh ended well before the ball arrived, which read as 'it's there' too early
  playball(n=14){if(sfx('playball',.95))return;if(n>0)setTimeout(()=>SND.playball(n-1),250);}, // the umpire's call; waits up to a few seconds for the file, and stays silent sooner than play a jingle // the umpire's call; waits briefly for the file on the first game, falls back to the jingle
  mitt(k){if(k!=null){noise(.055,'bandpass',3000,1500,.85,1.1);noise(.03,'highpass',2500,2500,.35,.7);tone('triangle',1200,480,.04,.34);
      if(AC&&crowdReal&&!roarG){const t=AC.currentTime,g=crowdGain.gain;g.cancelScheduledValues(t);g.setTargetAtTime(crowdBase*.4,t,.015);g.setTargetAtTime(crowdBase,t+.22,.25);}} // the crowd dips for a fifth of a second under the pop, so it stands on its own /* a pitch into the catcher's glove also gets a bright snap on top: the recorded pop is mostly low thud, which phone speakers and the crowd swallow */
    sfx('catch2',k==null?.34:lerp(1.05,1.2,k),k==null?rand(.95,1.05):lerp(.94,1.08,k));}, // recorded glove pop; pitches play it louder and brighter the faster they are
  call(hi,n){if(hi&&n>1&&sfx('ball'+Math.min(4,n),.95))return; // the umpire counts them: ball two, ball three, ball four
    if(!hi&&n>=3&&((Math.random()<.2&&sfx('ump_k3',1))||sfx('out',.95)))return; // strike three: mostly the old emphatic call, now and then STRIKE THREE, YOU'RE OUT!
    if(hi&&sfx('ump_ball',1))return;
    if(!hi&&Math.random()<.35&&sfx('ump_strike',1))return; // now and then the long, drawn-out STEEERIIIKE...
    if(!hi&&n===2&&sfx('strike2',.95))return; // ...otherwise the old calls: STRIKE TWO
    sfx(hi?'ball':'strike',.9);},
  ump(safe){const a=safe?['ump_safe','ump_safe2']:['ump_out','ump_out2'],k=a[(Math.random()*2)|0];if(!sfx(k,1))sfx(safe?k:'out',.95);}, // the call at the bag
  boom(){tone('sine',90,30,.6,.6);noise(.5,'bandpass',2400,5000,.18,.6,.05);},
  zap(){noise(.25,'highpass',2500,6000,.25,3);tone('sawtooth',1400,200,.2,.12);},
}
```


## `POS_BY` (L3649, 105 chars)

```js
POS_BY = {RAZOR:'CF',XENON:'SS',VREL:'2B',BRICKHOUSE:'1B',VANTA:'RF',DRAAK:'3B',ZEPHRA:'LF',CRASH:'C',GORMAK:'DH'}
```


## `TIPS` (L3664, 1296 chars)

```js
TIPS = [['AIM','Drag your left thumb anywhere on the screen to move the bat ring onto the pitch.'],['SWING','Tap CONTACT or POWER the moment the shrinking yellow ring meets the white circle and turns green. Bigger is too early, smaller is late.'],
  ['CONTACT OR POWER','Contact has a big sweet spot and sprays line drives. Power has a small one and hits moonshots.'],
  ['INSIDE THE RING','To hit it, the ball has to be inside your ring when you swing: anywhere in the green ring for CONTACT, inside the red core for POWER.'],
  ['JUICE','Tap JUICE before you swing to burn one quarter of the meter: the ball comes off about 20% harder and the sweet spot grows.'],
  ['EARN YOUR JUICE','Every hit adds a quarter to the Juice meter, and so does a walk. Nothing else moves it.'],
  ['LAY OFF','Pitches outside the white box are balls. Chase them and you get weak contact.'],
  ['READ THE SWING','After every swing, the line under the zone tells you your timing and where the barrel missed.'],
  ['OVERDRIVE','Fill the Juice meter all the way and JUICE turns into a blue OVERDRIVE button. Tap it: every swing that at-bat is a free Juice swing.'],
  ['SPEND OR SAVE','Spend Juice a quarter at a time, or save all four quarters for Overdrive. Overdrive lasts one at-bat, then the meter starts from empty.']]
```


## `SHOUT_A` (L3746, 116 chars)

```js
SHOUT_A = ["YESSIR!","BEAST MODE!","LET'S GO!!","LET'S GOOO!","YEAH!!","HEATING UP!","YOU'RE SEEING IT!","YOU'RE TEEING OFF!"]
```


## `SHOUT_H` (L3746, 427 chars)

```js
SHOUT_H = ['PIMPED IT!','PIMPED IT!',"STUNT ON 'EM!","STUNT ON 'EM!","FLEX ON 'EM!","FLEX ON 'EM!",'SEE YA!','YOU WENT YARD!','BIG FLY!','TATER!','GOT ALL OF IT!','NO DOUBTER!','TOUCH \'EM ALL!','ABSOLUTE TANK!','GONE FOREVER!','DINGER!','ADIOS PELOTA!','PLAKATA!','BARRELED!','SAYONARA!','HASTA LA VISTA!','SMELL YA!','GET OFF ME, BALL!','NUKED!','SMELL YA, BALL!','YOU WENT YA YA!','YEETED!','GO, BALL!','GET OUT, BALL!','BEAST MODE!']
```


## `HOT_CALLS` (L3776, 182 chars)

```js
HOT_CALLS = ["YOU'RE COOKING!","YOU'RE GOING OFF!","YOU'RE ON ONE!","YOU'RE RAKING!","YOU'RE GOING HAM!","YOU'RE UNSTOPPABLE!","YOU'RE UNCONSCIOUS!","HIT PARADE!","RAMPAGE!","YOU'RE ON A TEAR!"]
```


## `WALK_ONLY` (L3842, 50 chars)

```js
WALK_ONLY = ['w_milling','w_drive','w_golf','w_sad','w_drunk']
```


## `CEL_LADDER` (L3846, 503 chars)

```js
CEL_LADDER = [['p_joy','JOY JUMP'],['w_wave','THE WAVE'],['p_runman','RUNNING MAN'],['w_macarena','MACARENA'],['p_chicken','FUNKY CHICKEN'],['w_salsa','SALSA'],['w_bdance','BELLY DANCE'],['p_twerk','TWERK'],['w_cartwheel','CARTWHEEL'],['p_town','AROUND TOWN'],['w_backflip','BACKFLIP'],['p_shuffle','SHUFFLE'],['w_bboy','BREAK DANCE'],['p_wavy','WAVE DANCE'],['w_salsa2','SALSA SPIN'],['p_chick2','CHICKEN DANCE'],['w_hurricane','HURRICANE KICK'],['p_boogie','BOOGIE'],['p_float','FLOATING'],['p_dosido','DO-SI-DO']]
```


## `CEL_START` (L3847, 176 chars)

```js
CEL_START = [['w_flair','FLAIR'],['w_salute','SALUTE'],['p_fist','FIST PUMP'],['p_clap','CLAP'],['w_arrow','ARROW'],['w_lift','BAT LIFT'],['w_pushup','PUSH-UPS'],['w_boxing','SHADOW BOX']]
```


## `CEL_FAV` (L3850, 131 chars)

```js
CEL_FAV = ['p_dosido','p_float','p_town','p_shuffle','p_boogie','w_bboy','w_backflip','p_twerk','w_macarena','w_flair','w_salute','w_salsa2']
```


## `WILD_CEL` (L3852, 320 chars)

```js
WILD_CEL = ['p_dosido','p_float','p_joy','p_shuffle','p_wavy','p_town','p_chick2','p_boogie','w_cartwheel','w_salsa2','w_salute','w_backflip','w_bboy','w_macarena','w_salsa','w_bdance','w_flair','w_lift','w_pushup','p_loser','p_twerk','p_chicken','p_runman','p_fist','p_clap','p_threat','w_boxing','w_arrow','w_wave','w_hurricane']
```


## `WILD_TAUNT` (L3852, 69 chars)

```js
WILD_TAUNT = ['p_twerk','p_chicken','p_backflip','p_bboy','p_macarena','p_runman']
```


## `GRADE_COL` (L3855, 73 chars)

```js
GRADE_COL = {S:'#ffd23b',A:'#3ddc6a',B:'#3ad6ff',C:'#f2f5ff',D:'#ff9a3b',F:'#ff4d2e'}
```


## `PERKS` (L3863, 1400 chars)

```js
PERKS = {RAZOR:{n:'PROFESSIONAL HITTER',d:'With two strikes his contact ring is 15% bigger. Two strikes against a pitcher in Overdrive: he sees where the next pitch is going.',c:'With two strikes the ball comes off 5% softer.',on:1},
  VREL:{n:'LOW BALL HITTER',d:'Sweet spot 18% bigger on pitches in the bottom third.',c:'12% smaller on pitches in the top third.',on:1},
  XENON:{n:'BAD-BALL HITTER',d:'On pitches out of the zone his contact ring and power core are 22% bigger: he squares up balls other hitters cannot reach.',c:'Nothing on strikes.',on:1},
  BRICKHOUSE:{n:'LIGHT TOWER POWER',d:'Squared-up balls carry about 8% further.',c:'Cannot steal or stretch a hit (not enforced yet).',on:1},
  DRAAK:{n:'BAD INTENTIONS',d:'After he is hit by a pitch, his next swing is at Overdrive power.',c:'One swing only.',on:1},
  VANTA:{n:'OPPO TACO',d:'Balls hit the other way carry further.',c:'Pulled balls lose a little distance.',on:1},
  ZEPHRA:{n:'BURNER',d:'Gets down the line faster on anything hit on the ground.',c:'Her fly balls die a little short.',on:1},
  CRASH:{n:'FIELD GENERAL',d:'When you pitch, runners try to steal half as often. Two strikes against a pitcher in Overdrive: he sees where the next pitch is going.',c:'Nothing else at the plate.',on:1},
  GORMAK:{n:'PINCH HITTER',d:'Comes up for his first at-bat with at least three bars of Juice.',c:'First at-bat of the game only.',on:1}}
```


## `PERKS2` (L3876, 1033 chars)

```js
PERKS2 = {RAZOR:{n:'CLUTCH GENE',d:'Runner on second or third: the contact ring is 10% bigger.',c:'Nothing with nobody in scoring position.'},
  VREL:{n:'AMBUSH',d:'First pitch of the at-bat: squared-up balls come off 4% harder.',c:'First pitch only.'},
  XENON:{n:'SPARK PLUG',d:'Leading off an inning: the contact ring is 12% bigger.',c:'Leadoff only.'},
  BRICKHOUSE:{n:'MISTAKE CRUSHER',d:'Pitches over the heart of the plate come off 5% harder.',c:'Nothing on the corners.'},
  DRAAK:{n:'TWO-OUT TERROR',d:'With two outs the ball comes off 4% harder.',c:'Two outs only.'},
  VANTA:{n:'RALLY CAP',d:'When the team is behind: the contact ring is 10% bigger.',c:'Nothing with the lead.'},
  ZEPHRA:{n:'HIT AND RUN',d:'Runner on first: the contact ring is 10% bigger.',c:'Nothing with first base open.'},
  CRASH:{n:'HITTER\u2019S COUNT',d:'Ahead in the count: squared-up balls come off 4% harder.',c:'Nothing when behind.'},
  GORMAK:{n:'DUCKS ON THE POND',d:'Two or more runners on: the ball comes off 5% harder.',c:'Nothing with fewer.'}}
```


## `PERKS3` (L3886, 767 chars)

```js
PERKS3 = {RAZOR:{n:'LINE-DRIVE MACHINE',d:'His launch angles are pulled toward a line drive (about 17 degrees).'},
  VREL:{n:'LIFT',d:'Squared-up balls leave 3 degrees higher.'},
  XENON:{n:'WORM BURNER',d:'Ground balls come off the bat 6% harder.'},
  BRICKHOUSE:{n:'BARREL',d:'Squared up between 24 and 32 degrees, the ball leaves 5% harder.'},
  DRAAK:{n:'TOPSPIN LASERS',d:'Line drives (8 to 18 degrees) leave 5% harder.'},
  VANTA:{n:'BACKSPIN',d:'Fly balls (25 to 35 degrees) leave 4% harder and carry.'},
  ZEPHRA:{n:'HIGH CHOPPER',d:'Balls beaten into the ground come off 6% harder and are tough to field.'},
  CRASH:{n:'LOFT',d:'Power swings leave 4 degrees higher.'},
  GORMAK:{n:'FLAT BAT',d:'No pop-ups: anything above 38 degrees is brought back down toward it.'}}
```


## `TIERS` (L3911, 67 chars)

```js
TIERS = [[90,'ruby'],[85,'diamond'],[80,'gold'],[75,'silver'],[0,'bronze']]
```


## `WALK` (L3954, 177 chars)

```js
WALK = {on:true,dur:3.4,by:{RAZOR:'w_milling',XENON:'w_flair',VREL:'w_drive',BRICKHOUSE:'w_boxing',VANTA:'w_arrow',DRAAK:'w_macarena',ZEPHRA:'w_bdance',CRASH:'w_sad',GORMAK:'w_salsa'}}
```


## `SPONSOR` (L3958, 258 chars)

```js
SPONSOR = {RAZOR:'A ZAPP COLA ATHLETE',XENON:'SEEKING SPONSOR',VREL:'DRIVEN BY TURBO TIRE',BRICKHOUSE:'FED BY BURGER BARN',VANTA:'BETWEEN SPONSORS',DRAAK:'A MEGA ARCADE PLAYER',ZEPHRA:'14 SPONSORS AND COUNTING',CRASH:'SEEKING SPONSOR',GORMAK:'FINANCED BY LUNAR LOANS'}
```


## `TRIVIA` (L3959, 6610 chars)

```js
TRIVIA = { /* ten each, and every one has to be funny cold: nothing that needs the backstory to land */
  RAZOR:['Makes 40 million a year. Sees about six of it.','Paid to drink Zapp Cola on camera. Spits it out when the light goes off.','Hit one into orbit as a rookie. Got billed for the satellite.','Oxygen plan is Premium. The free tier has ads. You breathe the ads.','80 million followers. The League owns 60 million of them.','Signed at 17 in a parking structure. The agent got a house. Razor got a hat.','Favorite meal is mom’s rice. Eleven years since the last plate.','Current deal: 12 years, 480 million. The League can end it with one phone call. Razor can’t.','Sends money home every month. The League takes 30% for the transfer.','Career home runs: 412. Baseballs recovered: 3.','Three-time Moonball MVP. The League keeps the trophies. For safekeeping.'],
  XENON:['Paid per stolen base, like a delivery driver. Tips not included.','The helmet plays an unskippable ad before every at-bat.','Stole 71 bases last year. Fined for 70 under a rule written that winter.','Tested positive for moondust. Says it was secondhand. Lives on the Moon. The appeal is ongoing.','Seeking sponsor. Will breakdance for footwear.','Shoe deal died when the shoes were ruled “load-bearing evidence.”','Favorite color is green. It’s the airlock light that means you can breathe.','Won’t ride the lift. Stairs only.','3.4 seconds home to first. Faster with a repo drone behind.','Favorite movie: the safety video. It’s the only one licensed in the dorms.'],
  VREL:['Clicked “I do not agree” on the terms of service. Nothing happened. The button isn’t connected to anything.','Posted the contract online. It was taken down for copyright. By the League.','Argues every call with the robot umpire. Calls it the only honest official left.','Turbo Tire paid a record fee for the face. Then a bigger one to stop the interviews.','The deal has a morality clause. Four pages. Three are about talking.','Batting .340 against humans, .900 against robots, .000 against Legal.','Sponsor: Turbo Tire. Has never seen a road.','Owns 14 moon buggies. All 14 are advertisements.','Signs nothing on game day. Not autographs, not receipts.','Was offered a front office job to go quiet. Framed the letter.'],
  BRICKHOUSE:['Face of Burger Barn. Asked twice what’s in it. Was told to stop.','The protein shake is a subscription. Cancelling takes a notarised letter and a blood test.','Burger Barn patented the home run swing. A royalty is owed per swing.','Broke the weight room. Not a machine. The room.','Suspended 25 games for moondust. It was in the tomatoes. Nobody believes the tomato thing.','Apologises to pitchers after home runs. Means it.','Hit a ball 1,104 feet. It landed in a different tax bracket.','Was once intentionally walked in a home run derby.','Favorite food is a real tomato. Has eaten four.','Each arm is insured separately. The left bicep has a board of directors.'],
  VANTA:['Actually reads the terms and conditions. Is the reason they got longer.','Turned notifications off years ago. The League turned them back on.','Read the whole contract. All 4,000 pages. Stopped talking around page 900.','Sponsor was bought mid-season. Found out from the patch on the jersey.','Counts the cameras in the dugout before sitting down. The number changes.','Sleeps in the batting cage. The rent is lower.','Year four of a seven-year deal. Years five to seven are the club’s option. So is year four.','Favorite number is 51. It was assigned.','Favorite book: the rulebook. Second favorite: the appendix.','Won the Compliance Award three times. Has never picked it up.'],
  DRAAK:['The home run dance is a paid download. Draak gets 0.3%.','Went viral for crying in the dugout. The League sells it as a ringtone.','Got caught using moondust. Suspended 40 games. Came back hitting .380, which raised more questions.','Paid in arcade tokens. Three colonies take them as money now.','Every celebration is cleared by Legal the night before.','Jersey outsells the rest of the roster combined. Royalty check last year: zero.','Lifetime deal with Mega Arcade, signed at 19. “Lifetime” is defined on page 212.','Sells signed moon rocks. They are rocks. Signed.','Banned from three craters. Two for dancing. Nobody talks about the third.','Favorite holiday is payday. It has been moved four times.','Runner-up for Moonball MVP four times. Lost once to a sponsor.'],
  ZEPHRA:['Verified on every platform, including two that don’t exist yet.','Richest player on the Moon. Not from the Moon. Owns a crater, a yacht and two teammates’ debt.','14 sponsors. Remembers the names of 3.','Has never failed a moondust test. Has never been given one, either.','Smile is trademarked. Frown remains in the public domain.','The walk-up dance has its own agent, who takes 15% of the dance.','The fragrance line was recalled. Sold out anyway.','On-base percentage: .412. On-camera percentage: 97.','Current deal has no end date. Zephra says that’s a good thing.','Hosts a podcast with the Commissioner. The Commissioner has never spoken on it.','Reigning Moonball MVP. The vote was 1 to 0. The Commissioner voted.'],
  CRASH:['Was traded for a vending machine. The vending machine is hitting .310.','Transfer requests go to the League chatbot. It says “Great question!” and nothing else.','Two stars on the fan app. One of them is from family.','Batting average with runners in scoring position: sad.','Leads the League in sighs. The sighs are sponsored.','Brought a houseplant up from Earth. It is doing better than Crash is.','No sponsor. A tissue company called once. It was the front office, joking.','Buys one snack from the vending machine before every game. Never eats it.','Was a crash test dummy for nine years. Says this job is worse.','Taps the bad knee twice with the bat. It has never once helped.','Got one Moonball MVP vote last year. It was a write-in for the vending machine.'],
  GORMAK:['Does not believe in aliens. Is one.','Thinks the Krakens are “guys in suits.” Has shaken hands with Zlorp.','Still carries a flip phone. Only device on the Moon the League can’t read.','Remembers when you bought a ticket and just owned it.','Sponsor is Lunar Loans. It isn’t a sponsorship. It’s the payment plan.','Bats ninth by choice. “Less paperwork.”','Retirement isn’t in the contract. Checked. Twice.','Games played: 3,112. Days off: 0. Days off requested: 3,112.','Has seen real grass. Once. Talks about it too much.','Favorite food: soup. “You know where you stand with soup.”','Moonball MVP, a long time ago. The plaque spells the name wrong.']}
```


## `BASES` (L4030, 50 chars)

```js
BASES = [[0,0],[19.4,-19.4],[0,-38.8],[-19.4,-19.4],[0,0]]
```


## `RUN_CLIPS` (L4033, 61 chars)

```js
RUN_CLIPS = ['run','jog','turn','c_fist','x_limp','x_crawl','c_moonwalk']
```


## `RUN_KEYS` (L4033, 171 chars)

```js
RUN_KEYS = ['obj','rt','mixer','act','runAct','runDur','strAct','strDur','thrAct','thrDur','dieAct','defActs','turnAct','fistAct','hurtAct','crawlAct','mwAct','jogAct','jogDur','sx']
```


## `TROT` (L4061, 83 chars)

```js
TROT = {dur:5.85,celT:3.05,cele:false,clip:'',R:null,cam:new V3(),segs:[[0,3.05,1.7,3.5]]}
```


## `ARS` (L4177, 234 chars)

```js
ARS = {MAC:['FASTBALL','SLIDER','CURVEBALL','CHANGEUP'],CARLOS:['FASTBALL','SINKER','SPLITTER'],LEE:['FASTBALL','CURVEBALL','CHANGEUP','SCREWBALL'],BRAXX:['FASTBALL','CUTTER','SWEEPER','KNUCKLE CURVE'],MALGOR:['FASTBALL','SLIDER','EEPHUS']}
```


## `BULLPEN` (L4178, 109 chars)

```js
BULLPEN = [['MAC',99,'',0,''],['CARLOS',66,'',10,''],['LEE',48,'L',11,''],['BRAXX',40,'',12,''],['MALGOR',6,'L',13,'']]
```


## `BRW` (L4185, 114 chars)

```js
BRW = {ch:1.7,st:.3,rd:1.2,n:3,hold:2.3,dur:0,b:null,p:null,cur:null,r:-1,win:false,seq:[],bx:0,bz:0,x0:0,z0:0,ko:false}
```


## `BR_ATT` (L4186, 93 chars)

```js
BR_ATT = {b_jab:.36,b_jabstep:.62,b_quad:.42,b_kickl:.95,b_kickr:.62,b_butt:.8,b_knee:.55,b_round:.95}
```


## `QT` (L4251, 182 chars)

```js
QT = {ph:'',kind:'',M:null,code:[],i:0,lim:0,t1:0,tp:0,ok:false,runT:1.5,headT:1.15,b:null,f:null,rx:0,rz:0,rry:0,fx:0,fz:0,fry:0,mx:0,mz:0,nx:0,nz:0,ux:0,uz:0,bx:0,bz:0,hid:[],ball:null}
```


## `QTE_MOVES` (L4255, 5168 chars)

```js
QTE_MOVES = {
  plate:{name:'BEAT THE THROW!',code:['R','R','U','D','R','L','U','R'],base:0,u:[-.7071,-.7071],call:"HE'S COMING HOME!",ok:()=>{S.bases[2]=0;addRuns(1);},okT:['SAFE!',''],no:()=>{S.bases[2]=0;recordOut();},noT:['OUT!','']},
  dp:{name:'TAKE-OUT KICK',code:['D','L','D','R','U','R','D'],base:2,u:[.7071,.7071],call:'BREAK UP THE PLAY!',ok:()=>{S.bases[0]=1;},okT:['SAFE!',''],no:()=>{S.bases[0]=0;recordOut();},noT:['OUT!',''],pa:true},
  stretch2:{name:'GOING FOR TWO',code:['R','D','R','U','L','R'],base:2,u:[.7071,.7071],call:"HE'S GOING FOR TWO!",ok:()=>{S.bases[0]=0;S.bases[1]=1;},okT:['SAFE!',''],no:()=>{S.bases[0]=0;recordOut();},noT:['OUT!','']},
  stretch3:{name:'GOING FOR THREE',code:['U','R','U','L','D','R','U'],base:3,u:[.7071,-.7071],call:"HE'S GOING FOR THREE!",ok:()=>{S.bases[1]=0;S.bases[2]=1;},okT:['SAFE!',''],no:()=>{S.bases[1]=0;recordOut();},noT:['OUT!','']},
  adv3:{name:'FIRST TO THIRD',code:['R','U','L','U','R','D','R'],base:3,u:[.7071,-.7071],call:"HE'S GOING TO THIRD!",ok:()=>{S.bases[1]=0;S.bases[2]=1;},okT:['SAFE!',''],no:()=>{S.bases[1]=0;recordOut();},noT:['OUT!','']},
  tag2:{name:'TAGGING UP',code:['L','U','R','D','R','U'],base:2,u:[.7071,.7071],call:"HE'S TAGGING UP!",ok:()=>{S.bases[0]=0;S.bases[1]=1;},okT:['SAFE!',''],no:()=>{S.bases[0]=0;recordOut();},noT:['OUT!',''],pa:true},
  // ON DEFENSE (the player is pitching): the same close-up at the bag, but now the player is the man with the ball. Win it and the runner is out; lose it and he takes the base.
  dstretch2:{def:true,name:'THROW HIM OUT!',code:['R','D','R','U','L','R'],base:2,u:[.7071,.7071],call:"HE'S GOING FOR TWO!",ok:()=>{PD.bases[0]=0;PD.outs++;},okT:['GUNNED DOWN!','OUT AT SECOND'],no:()=>{PD.bases[0]=0;PD.bases[1]=1;},noT:['SAFE!','HE TAKES SECOND']},
  dplate:{def:true,name:'CUT HIM DOWN!',code:['R','R','U','D','R','L','U','R'],base:0,u:[-.7071,-.7071],call:"HE'S COMING HOME!",ok:()=>{PD.runs=Math.max(0,PD.runs-1);S.opp=Math.max(0,S.opp-1);PD.outs++;},okT:['OUT AT THE PLATE!','THE RUN COMES OFF THE BOARD'],no:()=>{},noT:['SAFE!','THE RUN SCORES']},
  dstretch3:{def:true,name:'THROW HIM OUT!',code:['U','R','U','L','D','R','U'],base:3,u:[.7071,-.7071],call:"HE'S GOING FOR THREE!",ok:()=>{PD.bases[1]=0;PD.outs++;},okT:['GUNNED DOWN!','OUT AT THIRD'],no:()=>{PD.bases[1]=0;PD.bases[2]=1;},noT:['SAFE!','HE TAKES THIRD']},
  // BEAT IT OUT: a routine grounder in the infield with nobody on. It is a race to the bag: hammer the bar and he legs out an infield single.
  beat1:{name:'BEAT IT OUT!',code:['R','U','R','U','R'],base:1,u:[-.7071,.7071],call:'BEAT IT OUT!',mash:true,soft:true,ok:()=>{S.bases[0]=1;S.hits=(S.hits||0)+1;const q=curBatter();if(q.gs)q.gs.h++;},okT:['SAFE!','INFIELD SINGLE'],no:()=>{recordOut();},noT:['OUT!','GROUND OUT'],pa:true},
  dcatch:{def:true,soft:true,solo:true,name:'MAKE THE CATCH!',code:['L','U','R','D','U','R'],base:1,u:[-.7071,.7071],call:'SCREAMER!',ok:()=>{PD.outs++;},okT:['WHAT A GRAB!','LINE OUT'],no:()=>{pdAdvance(1,false);},noT:['OFF HIS CHEST!','BASE HIT \u00B7 HE WORE IT']}, /* a sharp line drive at an infielder while you pitch: the picture cuts to him set and waiting. Win it and he has it; lose it and it goes off him and he goes down. */
  dmake:{def:true,arrows:true,soft:true,name:'MAKE THE PLAY!',code:['R','U','L','D','R','U'],base:1,u:[-.7071,.7071],call:'MAKE THE PLAY!',ok:()=>{PD.outs++;},okT:['OUT!','GROUND OUT · NICE PLAY'],no:()=>{pdAdvance(1,false);},noT:['SAFE!','E · BOOTED IT']},
  dsteal2:{def:true,name:'THROW HIM OUT!',code:['R','U','R','D','L','R'],base:2,u:[.7071,.7071],call:"HE'S STEALING!",ok:()=>{PD.bases[0]=0;PD.outs++;},okT:['CAUGHT STEALING!','GUNNED DOWN AT SECOND'],no:()=>{PD.bases[0]=0;PD.bases[1]=1;},noT:['SAFE!','STOLEN BASE']},
  dtag3:{def:true,name:'GUN HIM DOWN!',code:['U','R','D','R','L','U','R'],base:0,u:[-.7071,-.7071],call:"HE'S TAGGING UP!",ok:()=>{PD.bases[2]=0;PD.outs++;},okT:['OUT AT THE PLATE!','A STRIKE FROM THE OUTFIELD'],no:()=>{PD.bases[2]=0;PD.runs++;S.opp++;},noT:['SAFE!','HE TAGS AND SCORES']},
  dadv3:{def:true,name:'THROW HIM OUT!',code:['R','U','L','U','R','D','R'],base:3,u:[.7071,-.7071],call:"HE'S GOING TO THIRD!",ok:()=>{PD.bases[1]=0;PD.outs++;},okT:['GUNNED DOWN!','OUT AT THIRD'],no:()=>{PD.bases[1]=0;PD.bases[2]=1;},noT:['SAFE!','FIRST TO THIRD']},
  // STEALING: called by the player from the batter's box, between pitches. Same showdown at the bag; the count carries on afterwards.
  steal2:{name:'STEAL SECOND',code:['R','U','R','D','L','R'],base:2,u:[.7071,.7071],call:"HE'S GOING!",ok:()=>{S.bases[0]=0;S.bases[1]=1;badge('thief');},okT:['SAFE!','STOLEN BASE'],no:()=>{S.bases[0]=0;recordOut();},noT:['OUT!','CAUGHT STEALING']},
  steal3:{name:'STEAL THIRD',code:['U','R','L','U','D','R','U'],base:3,u:[.7071,-.7071],call:"HE'S GOING!",ok:()=>{S.bases[1]=0;S.bases[2]=1;badge('thief');},okT:['SAFE!','STOLEN BASE'],no:()=>{S.bases[1]=0;recordOut();},noT:['OUT!','CAUGHT STEALING']},
  tag3:{name:'TAGGING UP',code:['D','R','U','R','D','L','U'],base:3,u:[.7071,-.7071],call:"HE'S TAGGING UP!",ok:()=>{S.bases[1]=0;S.bases[2]=1;},okT:['SAFE!',''],no:()=>{S.bases[1]=0;recordOut();},noT:['OUT!',''],pa:true}}
```


## `GO_LABEL` (L4282, 128 chars)

```js
GO_LABEL = {adv3:'SEND HIM TO THIRD?',plate:'SEND HIM HOME?',stretch2:'GO FOR TWO?',stretch3:'GO FOR THREE?',tag2:'TAG UP?',tag3:'TAG UP?'}
```


## `PITCHES` (L4532, 4009 chars)

```js
PITCHES = [
  {n:'FASTBALL',dur:.64,brk:[-.05,.14],arc:.1,k:1.6,w:4},        // rides in almost flat with a little late hop
  {n:'CURVEBALL',dur:.86,brk:[.2,-.85],arc:.62,k:2.2,w:2},       // big looping 12-to-6 hump that drops off the table
  {n:'SLIDER',dur:.74,brk:[.78,-.2],arc:.16,k:3.4,w:2},          // looks like a fastball, then darts sideways late
  {n:'CHANGEUP',dur:.95,brk:[-.14,-.5],arc:.34,k:2.8,w:2},       // floats, then dies and fades at the end
  {n:'SCREWBALL',dur:.8,brk:[-.72,-.36],arc:.24,k:2.6,w:1},      // breaks the opposite way to the slider and sinks
  {n:'METEOR',dur:.5,brk:[0,.06],arc:.04,k:2,w:0,sp:1,col:[1,.25,.05],tp:'thick'},
  {n:'ZIG-ZAG',dur:.92,brk:[0,-.1],arc:.25,k:2.5,w:0,sp:1,wob:.6,wobF:15,zz:1,col:[.2,1,.35],tp:'zig'}, /* hard left-right cuts with sharp corners, flat (no up and down): nothing like the corkscrew's round spiral */
  {n:'CORKSCREW',dur:.9,brk:[0,-.1],arc:.25,k:2.5,w:0,sp:1,wob:.34,wobF:31,cork:1,col:[1,.3,.75],tp:'helix'}, /* a tight, fast drill-bit spiral: many small round turns */
  // More Juice pitches. Each has its own path, its own color and its own trail shape. Whatever the ball does on the way, it still
  // arrives at the plate exactly when the timing ring says it will: only the look of the flight is bent, never the timing.
  {n:'FREEZE FRAME',dur:.9,brk:[0,-.12],arc:.2,k:2.4,w:0,sp:1,warp:u=>u<.38?u*1.16:u<.6?.44:.44+(u-.6)*1.4,col:[.1,.95,.85],tp:'dash'},          // stops dead in mid-air, then goes again
  {n:'DOUBLE TROUBLE',dur:.8,brk:[0,-.15],arc:.2,k:2.4,w:0,sp:1,split:.3,col:[1,.62,.08],tp:'thin'},                                              // two balls, one real: the fake peels off and fades late
  {n:'RISER',dur:.62,brk:[0,.9],arc:.02,k:5,w:0,sp:1,col:[.2,.45,1],tp:'wave'},                                                                   // comes in flat, then jumps late
  {n:'GEAR SHIFT',dur:.92,brk:[.1,-.2],arc:.22,k:2.4,w:0,sp:1,warp:u=>u<.55?u*.62:.341+(u-.55)*1.4644,col:[.72,1,.1],tp:'zig'},                   // floats, then finds another gear
  {n:'BOOMERANG',dur:.95,brk:[0,-.15],arc:.22,k:2.4,w:0,sp:1,boom:.95,col:[1,.1,.3],tp:'helix'},                                                   // swings way out wide and comes back
  {n:'KNUCKLER',dur:.98,brk:[0,-.3],arc:.3,k:2.2,w:0,sp:1,knuck:1,col:[1,1,1],tp:'burst'},                                                         // no spin, dances all the way in
  {n:'SKY DROP',dur:1.08,brk:[0,-.2],arc:1.75,k:3,w:0,sp:1,col:[1,.95,.1],tp:'thick'},                                                             // a towering lob that falls out of the sky
  // thrown only while the pitcher is in Overdrive
  {n:'SUPERNOVA',dur:.44,brk:[0,.1],arc:.03,k:2,w:0,sp:1,od:1,col:[1,.95,.55],tp:'burst'},                          // the fastest thing he has
  {n:'GHOST BALL',dur:.82,brk:[.1,-.3],arc:.22,k:2.4,w:0,sp:1,od:1,ghost:1,col:[.45,.9,1],tp:'dash'},              // vanishes in mid-flight and reappears late
  {n:'BLACK HOLE',dur:.98,brk:[0,-.2],arc:.3,k:2.6,w:0,sp:1,od:1,wob:.6,wobF:13,cork:1,col:[.5,.2,1],tp:'double'},   // a slow, huge spiral
  /* MORE ORDINARY PITCHES. Nobody throws all of them: each pitcher has his own arsenal (two to four pitches, always with a fastball). x:1 = only thrown by a pitcher who has it. */
  {n:'SINKER',dur:.67,brk:[-.34,-.36],arc:.11,k:2.2,w:2,x:1},       // a fastball that runs in on the hands and sinks
  {n:'CUTTER',dur:.68,brk:[.36,-.05],arc:.1,k:3.6,w:2,x:1},         // a fastball with a short, late cut away
  {n:'SPLITTER',dur:.76,brk:[-.05,-.74],arc:.13,k:4.4,w:2,x:1},     // fastball out of the hand, then the bottom falls out late
  {n:'SWEEPER',dur:.8,brk:[1.08,-.14],arc:.2,k:2.3,w:2,x:1},        // a big, wide, frisbee slider that sweeps right across the plate
  {n:'KNUCKLE CURVE',dur:.82,brk:[.12,-1.02],arc:.5,k:3.2,w:2,x:1}, // a harder curve with a sharper, later bite
  {n:'EEPHUS',dur:1.22,brk:[0,-.34],arc:1.25,k:1.6,w:1,x:1},        // the blooper: a slow rainbow lobbed up and dropped in
]
```


## `DIFF` (L4576, 313 chars)

```js
DIFF = [{n:'ROOKIE',ring:1.18,dur:1.1,mid:1.35},{n:'PRO',ring:1,dur:1,mid:1},{n:'ALL-STAR',ring:.8,dur:.9,mid:.65,brk:1.08},{n:'LEGEND',ring:.66,dur:.84,mid:.5,brk:1.2},{n:'MOONSHOT',ring:.54,dur:.78,mid:.38,brk:1.32},{n:'GALACTIC',ring:.45,dur:.72,mid:.3,brk:1.45},{n:'INTERGALACTIC',ring:.38,dur:.67,mid:.24,brk:1.58}]
```


## `UFO` (L5103, 70 chars)

```js
UFO = {g:new T.Group(),B:new T.Group(),hold:new V3(),lights:[],ok:false,t:0}
```


## `REV` (L5116, 244 chars)

```js
REV = {g:null,cut:1.9, /* first the ball is watched leaving the park (from the plate, looking out over the field: a view that is always clear), then the cut to space */dur:6.2,C:new V3(0,-3000,0),R:60,cam:new V3(),look:new V3(),a:new V3(),b:new V3()}
```


## `BADGES` (L5141, 8897 chars)

```js
BADGES = [['invin','ROOKIE CONTRACT',"Joined with a friend's invite code",'\u270D\uFE0F'],['inv1','SCOUT','One friend joined with your code','\uD83E\uDD1D'],['inv3','RECRUITER','Three friends joined with your code','\uD83D\uDCE3'],['inv5','FRANCHISE BUILDER','Five friends joined with your code','\uD83C\uDFD7\uFE0F'],['inv10','GENERAL MANAGER','Ten friends joined with your code','\uD83D\uDC54'],['hr7','SEVEN-HOMER NIGHT','Seven home runs in one game','7️⃣'],['hr10','TEN-PIECE','Ten home runs in one game','🍗'],['hits15','FIFTEEN KNOCKS','Fifteen hits in one game','🥁'],['hits20','TWENTY-HIT NIGHT','Twenty hits in one game','🎆'],['streak5','FIVE STRAIGHT','Five hits in a row','🖐️'],['streak12',"CAN'T MISS",'Twelve hits in a row','🎯'],['r25','QUARTER CENTURY','Score 25 runs in one game','🪙'],['r30','THIRTY-PIECE','Score 30 runs in one game','🧨'],['in10','DIME INNING','Score ten runs in one inning','🔟'],['hr650','LEAVING THE SOLAR SYSTEM','Hit one 650 feet or more','🪐'],['show2','DOUBLE FEATURE','Two different Overdrive shows in one game','🎬'],['showall','THE FULL TOUR','All four Overdrive shows in one game','🎡'],['perk1','SIGNATURE MOVE','A player perk comes through for you','⭐'],['perk4','FULL TOOLBOX','Four different perks come through in one game','🧰'],['g250','PART OF THE FURNITURE','Play 250 games','🛋️'],['chr1000','THOUSAND-HOMER CLUB','1,000 career home runs','🏛️'],['cr1000','RUN FACTORY','1,000 career runs','🏭'],['lv15','EVERYDAY PLAYER','Reach level 15','🧱'],['lv50','HALL OF FAMER','Reach level 50','🏅'],['skipper','SKIPPER','Change your batting order in My Squad','📝'],['derby20','DERBY: TWENTY','Twenty homers in a Home Run Derby','🎇'],['derby10k','TEN THOUSAND','Score 10,000 in a Home Run Derby','🎰'],['shot7','RUN THE GAUNTLET','Reach round 7 of The Gauntlet','⚔️'],['shot25k','HIGH ROLLER','Score 25,000 in The Gauntlet','💎'],['eagle','THE EAGLE HAS LANDED','Land an Overdrive moonshot on the Apollo site','🦅'],['hit','KNOCK','Get your first hit','🧢'],['hr','WENT YARD','Hit your first home run','💥'],['hr450','TAPE MEASURE','Hit one 450 feet or more','📏'],['hr500','5 HUNNID','Hit one 500 feet or more','🚀'],
  ['odhr','PRIME TIME','Homer in Overdrive','🔥'],['juicehr','GOT HEEEM!','Homer off a Juice pitch','😂'],['duel','BEAT THE HEAT','Homer while the pitcher is in Overdrive','🥵'],['charge','BRAWLER','Charge the mound','😤'],['showboat','SHOWBOAT','Admire one and flip the bat','🕺'],['aura','MAX AURA','Take a pitcher deep while he is in Overdrive','✨'],['ambush','AMBUSH','Homer on the first pitch','⚡'],
  ['slam','GRAND SALAMI','Hit a grand slam','🍖'],['b2b','BACK TO BACK','Homers in consecutive at-bats','👯'],['five','DERBY NIGHT','Five homers in one game','🎆'],['heater','ON A HEATER','Five hits in a row','♨️'],
  ['rev','IN ORBIT','Put one into orbit round the Moon','🌕'],['earth','NEXT STOP: EARTH','Hit one clean off the Moon','🌍'],['sat','SPACE JUNK','Take out the satellite','🛰️'],['ufo','FIRST CONTACT','Hit a homer into a flying saucer','🛸'],['lamp','LIGHTS OUT','Smash a light tower','💡'],['pole','DOINK!','Homer off the foul pole','🔔'],['board','SCOREBOARD!','Homer off the scoreboard','📺'],['web','WEB GEM','Your defense turns a great play behind you','🕸️'],['side','SAT THEM DOWN','Retire all three batters you pitch to','🧊'],['plunk','MESSAGE SENT','Drill a batter on purpose','🎯'],['pk','PUNCHOUT','Strike a batter out','🥊'],['paint','PAINTED IT','Strikeout looking on the edge of the zone','🎨'],['kside','STRUCK OUT THE SIDE','Strike out all three batters in a half','🔥'],['dialed','DIALED IN','Three perfect releases in a row','🎯'],['tunnel','TUNNEL VISION','Tunnel one pitch off another','🕳️'],['machine','THE MACHINE','Five perfect releases in a row','🤖'],['immac','IMMACULATE','Strike a hitter out on three straight strikes','✨'],['buckle','BUCKLED HIM','Get an ugly swing on a sharp breaking ball','🌀'],['corn','CAN OF CORN','Get a lazy fly ball out while you pitch','🌽'],['cannon','CANNON','Throw a runner out at the plate while you pitch','🎯'],['gunned','GUNNED DOWN','Throw out a runner trying for an extra base','🔫'],['legged','LEGGED IT','Beat out an infield single','👟'],['thief','GRAND THEFT','Steal a base','🥷'],['trucked','TRUCKED','Run over the catcher at the plate','🚚'],['gas','PURE GAS','Strikeout on a Juice pitch','⛽'],['lock','LOCKED IN','Two hits in a row with one hitter','🔥'],['cove','MELTDOWN','Homer into the lava in the Cove','🌋'],['eye','OFF THE BATTER\'S EYE','Homer off the batter\'s eye','👁️'],
  ['send','WHEELS','Win a showdown at the bag','👟'],['jump','PERFECT JUMP','Stop the needle on gold','🥇'],['brawl','LAST MAN STANDING','Win a brawl','🥊'],['wore','WORE IT','Get hit by a pitch','🩹'],
  // THE DISTANCE TREE: every home run's feet are added to a career total, kept on the device. Seven rungs, from a thousand feet to a million.
  ['ft1','FIRST THOUSAND','1,000 career feet of home runs','📐'],['ft2','MILE HIGH','5,280 career feet: one mile of homers','🏔️'],['ft3','CRATER HOPPER','26,400 career feet: five miles','🦘'],['ft4','MARATHON','138,336 career feet: a marathon of homers','🏅'],
  ['ft5','LOW ORBIT','250,000 career feet','🛰️'],['ft6','HUNDRED MILER','528,000 career feet: one hundred miles','💯'],['ft7','MILLION FOOT CLUB','1,000,000 career feet','👑'],
  ['walkoff','WALK-OFF','Win it in your last at-bat','🏃'],['win','IN THE WIN COLUMN','Win a game','🏆'],['ten','DOUBLE DIGITS','Score ten runs in a game','🔟'],['double','TWO BAGS','Hit a double','✌️'],['triple','THREE BAGS','Hit a triple','🔱'],['cycle','TEAM CYCLE','A single, double, triple and homer in one game','🚲'],['cook','NOW YOU\'RE COOKING','Three hits in a row','🍳'],['parade','HIT PARADE','Eight hits in a row','🎺'],['tenhits','TEN-HIT NIGHT','Ten hits in one game','🔟'],['hat','HAT TRICK','Three homers in one game','🎩'],['hr550','NO DOUBT ABOUT IT','Hit one 550 feet or more','📏'],['hr600','OUT OF THE ATMOSPHERE','Hit one 600 feet or more','🚀'],['oppo','OPPO TACO','Homer to the opposite field','🌮'],['hop','MOON HOP','Get a hit on a wicked hop','🐇'],['ate','ATE HIM UP','Knock an infielder off his feet','🥴'],['chase','CHASED HIM','Knock the pitcher out of the game','🚿'],['bigin','BIG INNING','Score five runs in one inning','🖐️'],['rout','BATTED AROUND','Score eight runs in one inning','🌀'],['fifteen','FIFTEEN-SPOT','Score fifteen runs in a game','🎰'],['twenty','TWENTY-BURGER','Score twenty runs in a game','🍔'],['shutout','SHUTOUT','Win without giving up a run','🧱'],['blowout','LAUGHER','Win by seven or more','😂'],['comeback','RALLY CAPS','Win after trailing by three or more','🧢'],['smallball','SMALL BALL','Win a game without a home run','🐜'],['nailbiter','NAIL-BITER','Win by exactly one run','💅'],['allstar','ALL-STAR','Win a game on All-Star or harder','⭐'],['legend','LEGEND','Win a game on Legend or harder','👑'],['moonshot','MOONSHOT','Win a game on Moonshot','🌕'],['g5','REGULAR','Play five games','🎟️'],['g25','SEASON TICKET','Play 25 games','🎫'],['g100','LIFER','Play 100 games','🏟️'],['w10','TEN WINS','Win ten games','🔥'],['w50','FIFTY WINS','Win fifty games','🏆'],['chr25','SLUGGER','25 career home runs','💪'],['chr100','CENTURY CLUB','100 career home runs','💯'],['chr500','FIVE HUNDRED CLUB','500 career home runs','🐐'],['ch100','HUNDRED HITS','100 career hits','📈'],['ch1000','A THOUSAND KNOCKS','1,000 career hits','🗿'],['cr100','RUN PRODUCER','100 career runs','🏃'],['maxpow','MAX POWER','Throw a pitch at full power','💥'],['d1','SHOWED UP','Play your first Daily Challenge','📅'],['dwin','NAILED IT','Beat a Daily Challenge','✅'],['d3s','THREE STARS','Three stars on a Daily Challenge','🌟'],['dboss','BOSS DAY','Beat the Saturday boss challenge','👹'],['dstk3','THREE IN A ROW','A three-day daily streak','3️⃣'],['dstk7','FULL WEEK','A seven-day daily streak','7️⃣'],['dstk30','A MONTH OF MOONSHOTS','A thirty-day daily streak','🗓️'],['dstk100','IRON MAN','A hundred-day daily streak','🦾'],['dfrz','ON ICE','Earn a streak freeze','🧊'],['named','NAME ON THE JERSEY','Give yourself a name in your profile','✍️'],['cage','IN THE CAGE','Take batting practice','🥅'],['derby5','DERBY: FIVE','Five homers in a Home Run Derby','5️⃣'],['derby10','DERBY: TEN','Ten homers in a Home Run Derby','🔟'],['derby15','DERBY KING','Fifteen homers in a Home Run Derby','🤴'],['derbylong','DERBY MOONSHOT','A 550-foot homer in the Derby','🌙'],['shot3','CALLING IT','Reach round 3 of The Gauntlet','📣'],['shot5','POINT AND SHOOT','Reach round 5 of The Gauntlet','👉'],['shot10k','TEN GRAND','Score 10,000 in The Gauntlet','💰'],['lv5','PROSPECT','Reach level 5','🌱'],['lv10','REGULAR IN THE LINEUP','Reach level 10','📋'],['lv25','FRANCHISE PLAYER','Reach level 25','💎'],['galactic','GALACTIC','Win a game on Galactic','🌌'],['intergalactic','INTERGALACTIC','Win a game on Intergalactic','☄️'],['derbytg','TARGET PRACTICE','Hit a target in the Home Run Derby','🎯'],['derby5k','FIVE THOUSAND','Score 5,000 in the Home Run Derby','💫']]
```


## `MODELS` (L5372, 3345 chars)

```js
MODELS = {ely:{label:'armored',body:'ely.txt',clips:'ely_clips.min.json',tex:{d:'ely_d.jpg',n:'ely_n.jpg',s:'ely_s.jpg',g:'ely_g.jpg'},
  bat:[{body:'exored.txt',hide:/Eye_Spec|Brows/,tex:{Body_MAT:['exored_d0.jpg','exored_n0.jpg'],Exo_MAT:['exored_d1.jpg','exored_n1.jpg']}},{body:'dreyar.txt',tex:{dreyar_M3:['dreyar_d0.jpg','dreyar_n0.jpg']}},
    {body:'david.txt',tex:{Ch28_body:['david_d0.jpg','david_n0.jpg']}},{body:'jolleen.txt',tex:{phong1:['jolleen_d0.jpg','jolleen_n0.jpg']}},{body:'abe.txt',tex:{Ch39_Body:['abe_d0.jpg','abe_n0.jpg']}},{body:'crypto.txt',tex:{Ch45_Body:['crypto_d.jpg','crypto_n.jpg']}},
    {body:'alien.txt',tex:{Ch44_Body:['alien_d0.jpg','alien_n0.jpg'],Ch44_body1:['alien_d1.jpg','alien_n1.jpg']}},{body:'dummy.txt',tex:{Ch32_body:['dummy_d0.jpg','dummy_n0.jpg']}},{body:'drake.txt',tex:{Ch25_Body:['drake_d0.jpg','drake_n0.jpg'],Ch25_body1:['drake_d1.jpg','drake_n1.jpg']}},{body:'zlorp.txt',tex:{Ch50_body1:['zlorp_d0.jpg'],Ch50_body:['zlorp_d1.jpg','zlorp_n1.jpg']}},{body:'jones.txt',tex:{Ch04_body:['jones_d0.jpg','jones_n0.jpg']}},{body:'maynar.txt',tex:{Ch30_Body1:['maynar_d0.jpg','maynar_n0.jpg'],Ch30_Body:['maynar_d1.jpg','maynar_n1.jpg']}},{body:'racer.txt',tex:{Ch20_body:['racer_d0.jpg','racer_n0.jpg']}},{body:'romero.txt',tex:{Ch10_body:['romero_d0.jpg','romero_n0.jpg'],Ch10_body1:['romero_d1.jpg','romero_n1.jpg']}},{body:'olivia.txt',col:0xa4a4a8,tex:{Ch11_body1:['olivia_d0.jpg','olivia_n0.jpg'],Ch11_body:['olivia_d1.jpg','olivia_n1.jpg']}}], /* hitters who are not the house model: LINEUP[..].body is 1-based into this list */
  def:{body:'parker.txt',tex:{Body_MAT:['parker_d0.jpg']}}, /* the Krakens' defense (fielders, catcher, the man at the bag) and the stand-in while another body loads. It was the pale 'Vanguard' armor; that model is gone from the game. */ump:{body:'exo.txt',tex:{Body_MAT:'exo_body.jpg',Exo_MAT:'exo_suit.jpg'}},
  // other bodies for the mound: every pitching change brings a different-looking arm (each material: color map, normal map)
  pit:[{body:'crypto.txt',tex:{Ch45_Body:['crypto_d.jpg','crypto_n.jpg']}},{body:'olivia.txt',col:0xa4a4a8,tex:{Ch11_body1:['olivia_d0.jpg','olivia_n0.jpg'],Ch11_body:['olivia_d1.jpg','olivia_n1.jpg']}},
    {body:'racer.txt',tex:{Ch20_body:['racer_d0.jpg','racer_n0.jpg']}},{body:'zlorp.txt',tex:{Ch50_body1:['zlorp_d0.jpg'],Ch50_body:['zlorp_d1.jpg','zlorp_n1.jpg']}},
    {body:'drake.txt',tex:{Ch25_Body:['drake_d0.jpg','drake_n0.jpg'],Ch25_body1:['drake_d1.jpg','drake_n1.jpg']}},{body:'maynar.txt',tex:{Ch30_Body1:['maynar_d0.jpg','maynar_n0.jpg'],Ch30_Body:['maynar_d1.jpg','maynar_n1.jpg']}},
    {body:'jones.txt',tex:{Ch04_body:['jones_d0.jpg','jones_n0.jpg']}},{body:'parker.txt',tex:{Body_MAT:['parker_d0.jpg']}},{body:'exo.txt',hide:/Eye_Spec|Brows/,tex:{Body_MAT:['exo_body.jpg'],Exo_MAT:['exo_suit.jpg']}},
    {body:'romero.txt',tex:{Ch10_body:['romero_d0.jpg','romero_n0.jpg'],Ch10_body1:['romero_d1.jpg','romero_n1.jpg']}},{body:'astra.txt',hide:/hair/i,tex:{Ch48_body1:['astra_d0.jpg','astra_n0.jpg'],Ch48_body:['astra_d1.jpg','astra_n1.jpg']}},
    {body:'brady.txt',hide:/hair|beard/i,tex:{Ch40_body:['brady_d0.jpg','brady_n0.jpg'],Ch40_body1:['brady_d1.jpg','brady_n1.jpg']}},{body:'demon.txt',tex:{Demon_MAT:['demon_d0.jpg','demon_n0.jpg']}},{body:'david.txt',tex:{Ch28_body:['david_d0.jpg','david_n0.jpg']}}]}}
```


## `SW` (L5386, 139 chars)

```js
SW = {skin:[800,544],sleeve:[864,544],trim:[928,544],glove:[992,544],shoe:[800,608],sole:[864,608],band:[928,608],hair:[992,608],belt:[800,672]}
```


## `GRIP` (L5431, 1248 chars)

```js
GRIP = {"RightHandThumb1":[0.307,0.033,-0.268,0.913],"RightHandThumb2":[-0.061,0.027,0.235,0.97],"RightHandThumb3":[-0.129,0.095,0.514,0.843],"RightHandIndex1":[0.538,0.01,0.061,0.841],"RightHandIndex2":[0.7,0,0.057,0.712],"RightHandIndex3":[0.4,0,0.033,0.916],"RightHandMiddle1":[0.605,0.016,0.059,0.794],"RightHandMiddle2":[0.779,0,0.063,0.624],"RightHandMiddle3":[0.395,0,0.032,0.918],"RightHandRing1":[0.572,0.011,0.063,0.818],"RightHandRing2":[0.752,0,0.061,0.657],"RightHandRing3":[0.467,0,0.038,0.883],"RightHandPinky1":[0.447,0,0.095,0.889],"RightHandPinky2":[0.668,0,0.054,0.742],"RightHandPinky3":[0.442,0,0.036,0.896],"LeftHandThumb1":[0.292,-0.037,0.253,0.922],"LeftHandThumb2":[-0.017,-0.076,-0.32,0.944],"LeftHandThumb3":[-0.169,-0.086,-0.558,0.808],"LeftHandIndex1":[0.487,-0.01,-0.068,0.871],"LeftHandIndex2":[0.735,0,-0.075,0.674],"LeftHandIndex3":[0.489,0,-0.05,0.871],"LeftHandMiddle1":[0.487,-0.01,-0.068,0.871],"LeftHandMiddle2":[0.737,0,-0.075,0.672],"LeftHandMiddle3":[0.33,0,-0.034,0.943],"LeftHandRing1":[0.502,-0.01,-0.07,0.862],"LeftHandRing2":[0.666,0,-0.068,0.742],"LeftHandRing3":[0.489,0,-0.05,0.871],"LeftHandPinky1":[0.487,-0.01,-0.068,0.871],"LeftHandPinky2":[0.513,0,-0.053,0.857],"LeftHandPinky3":[0.489,0,-0.05,0.871]}
```


## `FN` (L6053, 122 chars)

```js
FN = ['catch','run','strafe','throw','throw_cap','x_dive','x_dive2','x_wall','f_ready','f_turn180','p_dying','d_1','d_2','d_3']
```


## `BK` (L6105, 431 chars)

```js
BK = { // bat keys in batter space: X toward pitcher, Z toward plate
  stance:[new V3(-.36,1.36,.36),new V3(-.3,1,-.2).normalize()],
  load:[new V3(-.48,1.43,.32),new V3(.15,1,-.4).normalize()],
  lag:[new V3(-.16,1.2,.4),new V3(-1,.3,-.1).normalize()],
  thru:[new V3(.42,1.08,.4),new V3(1,.12,.25).normalize()],
  wrap:[new V3(.4,1.36,.1),new V3(.5,.45,-.75).normalize()],
  fin:[new V3(.3,1.5,-.05),new V3(-.2,.35,-1).normalize()],
}
```


## `CAMS` (L6485, 339 chars)

```js
CAMS = [
  {n:'CLASSIC',p:[-.15,1.85,4.5],l:[.3,1,-18]},
  {n:'STRIKE ZONE',p:[0,1.3,2.9],l:[0,.95,-18]},
  {n:'OFF-CENTER',p:[1.9,1.8,5.7],l:[-1.6,1,-12],side:true}, // wider angle from the open side: hitter fully in frame, and the pitch's break is easier to read
  {n:'HIGH',p:[0,3.4,6.2],l:[0,.7,-18]},
  {n:'FAR',p:[0,2.6,8.2],l:[0,1,-18]},
]
```


## `PERF` (L6620, 184 chars)

```js
PERF = {id:'s'+Date.now().toString(36)+Math.random().toString(36).slice(2,7),t0:0,n:0,ms:0,ctx:{},hit:[],last:0,busy:false,db:null,dbTried:false,sent:0,hist:new Uint16Array(8),dev:null,st:''}
```


## `PLAG` (L6630, 71 chars)

```js
PLAG = {ch:null,t:0,lag:0,slowN:0,slowLag:0,slowBusy:0,allN:0,allLag:0,busy:0}
```


## `PAB2` (L6641, 59 chars)

```js
PAB2 = {arm:0,t:0,n:[0,0,0],slow:[0,0,0],lock:-1,skip:0,paused:[]}
```


## `PAB3` (L6650, 69 chars)

```js
PAB3 = {arm:0,t:0,n:[0,0],slow:[0,0],skip:0,done:false,fine:[0,0,0,0,0,0,0]}
```


## `DBG` (L6729, 392 chars)

```js
DBG = {slice:false,corn:false,dtag:false,dadv:false,beat:false,tko:false,dive:'',hbp:false,pcut:false,fl:'',rob:false,pc:false,staunt:false,pod:false,trail:false,orbit:false,sat:false,drill:false,brawl:false,qte:false,mash:false,slide:false,pn:'',laser:false,lamp:false,mw:false,rev:false,stop:false,aerial:false,pdef:false,dbl:false,cam:false,admire:'',trip:false,fist:false,pop:false,loser:false}
```


## `SCN_PARTS` (L6734, 1005 chars)

```js
SCN_PARTS = {sit:[{id:'loaded2',t:'Bases loaded, 2 out',outs:2,bases:[1,1,1]},{id:'third1',t:'Runner on third, 1 out',outs:1,bases:[0,0,1]},{id:'first0',t:'Runner on first, nobody out',outs:0,bases:[1,0,0]},{id:'empty2',t:'Bases empty, 2 out',outs:2,bases:[0,0,0]},{id:'second1',t:'Runner on second, 1 out',outs:1,bases:[0,1,0]}],
  score:[{id:'down2',t:'down 2',runs:0,opp:2},{id:'down1',t:'down 1',runs:1,opp:2},{id:'tied',t:'tied',runs:2,opp:2},{id:'up1',t:'up 1',runs:3,opp:2},{id:'down3',t:'down 3',runs:0,opp:3}],
  goal:[{id:'run',t:'Drive in a run',ok:(S,z)=>S.runs>z.runs0},{id:'hit',t:'Get a hit',ok:(S,z)=>S.hits>z.hits0},{id:'hr',t:'Go deep',ok:(S,z)=>S.hrs>z.hrs0},{id:'reach',t:'Reach base',ok:(S,z)=>S.hits>z.hits0||!!S.walked},{id:'lead',t:'Take the lead',ok:(S)=>S.runs>S.opp}],
  twist:[{id:'nojuice',t:'No Juice',juice:0},{id:'full',t:'Overdrive ready',juice:1,over:true},{id:'oh2',t:'Start 0-2',balls:0,strikes:2},{id:'threeoh',t:'Start 3-0',balls:3,strikes:0},{id:'plain',t:'No twist',juice:.5}]}
```


## `SCN_DAYS` (L6739, 51 chars)

```js
SCN_DAYS = ['wild','bat','pitch','run','field','derby','boss']
```


## `SCN_PITCH` (L6740, 558 chars)

```js
SCN_PITCH = {sit:[{id:'clean',t:'Bases empty, nobody out',outs:0,bases:[0,0,0]},{id:'jam',t:'Runners on the corners, 1 out',outs:1,bases:[1,0,1]},{id:'loadedp',t:'Bases loaded, 2 out',outs:2,bases:[1,1,1]},{id:'second0',t:'Runner on second, nobody out',outs:0,bases:[0,1,0]}],
  goal:[{id:'k',t:'Strike out the first hitter',one:true,ok:z=>PD.ks>0,fail:z=>PD.n>0&&!PD.ks},{id:'zero',t:'Get out of it without a run',ok:z=>z.pdDone===0,fail:z=>z.pdDone>0||PD.runs>0},{id:'out1',t:'Retire the first hitter',one:true,ok:z=>PD.outs>z.outs0,fail:z=>PD.n>0&&PD.outs<=z.outs0}]}
```


## `HSL` (L6774, 468 chars)

```js
HSL = [['PLAY BALL','⚾','Three innings against the Krakens','marc','#ffe53b','#ff9a1e'],['DAILY CHALLENGE','📅','','mdaily','#58d6ff','#2b6cff'],['WEEKLY CHALLENGE','\ud83d\uddd3\ufe0f','','mweek','#b98cff','#6a3ad8'],['HOME RUN DERBY','💥','','mderby','#ff7a5a','#d2261a'],['THE GAUNTLET','🎯','','mshot','#3ddc6a','#17933c'],['BATTING PRACTICE','🥎','No outs, no score: find your swing','mbp','#7fe6ff','#3aa0c8'],['LUNAR LEAGUE CUP','🏆','Coming soon','','#9aa3c7','#5a607e']]
```


## `DERBY_T` (L6838, 455 chars)

```js
DERBY_T = {mc:[250,'HOUSTON, WE HAVE A PROBLEM!','MISSION CONTROL'],soda:[250,'OFF THE COLA CAN!','ZAPP COLA CAN'],vboard:[400,'OFF THE BIG BOARD!','THE BIG BOARD'],tower:[400,'OFF THE TOWER!','LIGHT TOWER'],lamp:[750,'LIGHTS OUT!','TOWER LAMPS'],dome:[600,'ANYBODY HOME?','MOONBASE DOME'],dish:[750,'SIGNAL LOST!','DISH'],rocket:[1000,'SCRUB THE LAUNCH!','THE ROCKET'],fuel:[1000,'FUEL LEAK!','FUEL COLLECTOR'],lander:[1500,'THE EAGLE HAS BEEN HIT!','THE LANDER']}
```


## `SHOT_Z` (L6856, 224 chars)

```js
SHOT_Z = [{id:'L',t:'LEFT FIELD',a:-45,b:-15},{id:'C',t:'CENTER FIELD',a:-15,b:15},{id:'R',t:'RIGHT FIELD',a:15,b:45},{id:'LL',t:'DOWN THE LEFT-FIELD LINE',a:-45,b:-33,line:1},{id:'RL',t:'DOWN THE RIGHT-FIELD LINE',a:33,b:45,line:1}]
```


## `INV` (L6927, 51 chars)

```js
INV = {me:'',from:'',n:0,id:'',got:{},done:false,db:null}
```


## `INV_T` (L6927, 126 chars)

```js
INV_T = [[1,'SCOUT',1000,'inv1'],[3,'RECRUITER',3000,'inv3'],[5,'FRANCHISE BUILDER',6000,'inv5'],[10,'GENERAL MANAGER',15000,'inv10']]
```


## `LV_T` (L6948, 116 chars)

```js
LV_T = [[1,'ROOKIE'],[5,'PROSPECT'],[10,'REGULAR'],[15,'SLUGGER'],[20,'ALL-STAR'],[30,'MVP'],[40,'LEGEND'],[50,'MOONSHOT']]
```


## `SQ_POS` (L6960, 115 chars)

```js
SQ_POS = {CF:[50,11],LF:[17,25],RF:[83,25],SS:[34,44],'2B':[66,44],'3B':[16,63],'1B':[84,63],P:[50,61],C:[50,89],DH:[84,90]}
```
