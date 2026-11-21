#!/usr/bin/env python3
"""Shrinks ely_clips.json (the full-fidelity source) into ely_clips.min.json (what the page loads).
 - finger bones keep a single pose per clip instead of a key every frame
 - evenly spaced key times are stored as a count ("t":N, 30 per second) instead of a list"""
import json,re,sys,os
R=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
d=json.load(open(os.path.join(R,'ely_clips.json')));out={}
for name,c in d.items():
    tr2=[]
    for t in c['tracks']:
        ts,vs=t['t'],t['v'];n=len(vs)//len(ts)
        if re.search('Thumb|Index|Middle|Ring|Pinky',t['n']):ts,vs=[0],vs[:n]
        if len(ts)>1 and all(abs(x-i/30)<2e-3 for i,x in enumerate(ts)):ts=len(ts)
        tr2.append({'n':t['n'],'t':ts,'v':vs})
    out[name]={'duration':c['duration'],'tracks':tr2}
p=os.path.join(R,'ely_clips.min.json');json.dump(out,open(p,'w'),separators=(',',':'));print('packed',len(out),'clips ->',os.path.getsize(p)//1024,'KB')
