#!/bin/sh
# usage: addclip.sh <driveFileId> <clipName> [start] [len]   -> adds clip to ely_clips.json (trimmed to len seconds from start, default whole/first 3.4s)
set -e
D=/tmp/claude-0/-home-user/408f19c5-9661-5cb4-81eb-ddec53c41e45/scratchpad/dl/elyanim; S=/tmp/claude-0/-home-user/408f19c5-9661-5cb4-81eb-ddec53c41e45/scratchpad/tools; T=/tmp/claude-0/-home-user/408f19c5-9661-5cb4-81eb-ddec53c41e45/scratchpad/t
cd $D && curl -sSL -m 300 -o "in_$2.fbx" -w "%{http_code} %{size_download}\n" "https://drive.usercontent.google.com/download?id=$1&export=download&confirm=t"
python3 -I $S/fbxstrip.py "in_$2.fbx" $T/c_wtmp.fbx | tail -1 | cut -c1-60
cd $T && sed -i "s/for(const n of \[[^]]*\])/for(const n of ['wtmp'])/" clips.html && sed -i "s#clips_[a-z]*\.json#clips_tmp.json#g" clips.js && node clips.js | cut -c1-170
python3 - "$2" "${3:-0}" "${4:-3.4}" <<'P'
import json,sys
name,t0,ln=sys.argv[1],float(sys.argv[2]),float(sys.argv[3])
a=json.load(open('clips_tmp.json'))['wtmp'];b=json.load(open('/home/user/moonshot-mayhem/ely_clips.json'))
d=a['duration']
if d>ln+.25:
    t0=min(t0,d-ln);t1=t0+ln;out={'duration':round(ln,4),'tracks':[]}
    for tr in a['tracks']:
        n=len(tr['v'])//len(tr['t']);ts=[];vs=[]
        for i,t in enumerate(tr['t']):
            if t0-1e-6<=t<=t1+1e-6: ts.append(round(t-t0,4));vs+=tr['v'][i*n:(i+1)*n]
        if not ts:
            i=min(range(len(tr['t'])),key=lambda k:abs(tr['t'][k]-t0));ts=[0];vs=tr['v'][i*n:(i+1)*n]
        out['tracks'].append({'n':tr['n'],'t':ts,'v':vs})
    a=out
b[name]=a;json.dump(b,open('/home/user/moonshot-mayhem/ely_clips.json','w'),separators=(',',':'));print('added',name,'src',round(d,2),'s ->',a['duration'],'s')
P
