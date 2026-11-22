# Rewrites a binary FBX for shipping: embedded media ("Content" blobs) emptied, tangent/binormal layers dropped,
# and uncompressed arrays deflated. usage: fbxpack.py in out
import zlib
import sys,struct
d=open(sys.argv[1],'rb').read()
ver=struct.unpack_from('<I',d,23)[0];W=8 if ver>=7500 else 4;F='<Q' if W==8 else '<I';NULL=b'\0'*(W*3+1)
def rprops(o,n):
    ps=[]
    for _ in range(n):
        t=chr(d[o]);o+=1
        if t in 'YCIFDL':
            L={'Y':2,'C':1,'I':4,'F':4,'D':8,'L':8}[t];ps.append((t,d[o:o+L]));o+=L
        elif t in 'fdlib':
            cl=struct.unpack_from('<I',d,o+8)[0];enc=struct.unpack_from('<I',d,o+4)[0]
            if not enc: cl=struct.unpack_from('<I',d,o)[0]*{'f':4,'d':8,'l':8,'i':4,'b':1}[t]
            ps.append((t,d[o:o+12+cl]));o+=12+cl
        elif t in 'SR':
            L=struct.unpack_from('<I',d,o)[0];ps.append((t,d[o:o+4+L]));o+=4+L
        else: raise Exception('type '+t)
    return ps
def rnode(o):
    end=struct.unpack_from(F,d,o)[0]
    if end==0: return None,o+len(NULL)
    np=struct.unpack_from(F,d,o+W)[0];pl=struct.unpack_from(F,d,o+2*W)[0];nl=d[o+3*W];name=d[o+3*W+1:o+3*W+1+nl]
    p0=o+3*W+1+nl;props=rprops(p0,np);o2=p0+pl;kids=[]
    while o2<end:
        k,o2=rnode(o2)
        if k is None:break
        kids.append(k)
    return (name,props,kids,end>p0+pl),end
stripped=0
def wnode(n,base):
    global stripped
    name,props,kids,hadnull=n
    if name==b'Content':
        for i,(t,b) in enumerate(props):
            if t=='R' and len(b)>1024: stripped+=len(b);props[i]=('R',struct.pack('<I',0))
    kids=[k for k in kids if k[0] not in (b'LayerElementBinormal',b'LayerElementTangent')]
    for i,(t,b) in enumerate(props):
        if t in 'fdlib':
            cnt,enc,cl=struct.unpack_from('<III',b,0)
            if not enc and len(b)>12+512:
                z=zlib.compress(b[12:],9);props[i]=(t,struct.pack('<III',cnt,1,len(z))+z)
    pb=b''.join(t.encode()+b for t,b in props)
    head=3*W+1+len(name);body=b'';off=base+head+len(pb)
    for k in kids:
        kb=wnode(k,off);body+=kb;off+=len(kb)
    if kids or hadnull: body+=NULL;off+=len(NULL)
    return struct.pack(F,off)+struct.pack(F,len(props))+struct.pack(F,len(pb))+bytes([len(name)])+name+pb+body
o=27;nodes=[]
while True:
    n,o=rnode(o)
    if n is None:break
    nodes.append(n)
footer=d[o:]
out=d[:27];
for n in nodes: out+=wnode(n,len(out))
out+=NULL
# keep footer; re-pad so the tail keeps the same alignment relationship
out+=footer
open(sys.argv[2],'wb').write(out);print('version',ver,'in',len(d),'out',len(out),'stripped',stripped,'footer',len(footer))
