const $=id=>document.getElementById(id),V=(x,y,z)=>new THREE.Vector3(x,y,z),cl=(x,a,b)=>Math.max(a,Math.min(b,x));
const R=[
{n:'Kaito',t:'Equilibrado',c:0xc8281e,a:0xffc857,sk:0xe8b894,hr:0x15121a,st:0,w:1,hh:1,hp:100,sta:100,dm:1,sp:5},
{n:'Mira',t:'Veloz e ágil',c:0x1f6fd1,a:0xbff1ff,sk:0xf0c8a8,hr:0xe8e8f5,st:1,w:.88,hh:.97,hp:80,sta:120,dm:.85,sp:6.6},
{n:'Brutus',t:'Pesado',c:0x2f7a40,a:0xd9a520,sk:0x9a6a48,hr:0x1a1a1a,st:2,w:1.28,hh:1.08,hp:130,sta:80,dm:1.25,sp:3.9}];
const ENM=[[0x7a2fd0,0xff7ad9],[0xd0a02f,0xffffff],[0x2fb5a0,0x113a35]];
const AT={a:{d:.42,h:.38,dmg:7,st:7,rng:2.2,kb:.4,lunge:2.5},b:{d:.46,h:.38,dmg:9,st:8,rng:2.2,kb:.5,lunge:3},
c:{d:.62,h:.42,dmg:13,st:11,rng:2.4,kb:1.2,lunge:4},k:{d:.85,h:.5,dmg:22,st:22,rng:2.7,kb:1.8,lunge:5}};
/* poses (ângulos das juntas): hy altura do quadril, hrx/crx inclinação, cry torção, hdx cabeça, L/R=braços e pernas (u=superior, l=inferior) */
const S={hy:.92,hrx:.1,cry:.35,crx:.06,hdx:-.08,Lux:-.75,Luz:.15,Llx:-1.9,Rux:-.6,Ruz:-.15,Rlx:-2,tLx:-.4,tLz:.1,kLx:.7,tRx:.3,tRz:-.1,kRx:.3};
const BL={Lux:-1,Luz:.4,Llx:-2.3,Rux:-1,Ruz:-.4,Rlx:-2.3,crx:.25,hy:.84,hdx:.2,cry:.1};
const STN={hy:.95,crx:-.4,hrx:-.25,hdx:-.4,Lux:.3,Rux:.3,Llx:-.4,Rlx:-.4,cry:0};
const DG={hy:.55,crx:.55,hrx:.4,tLx:-1,kLx:1.4,tRx:-1,kRx:1.4,Lux:-.4,Rux:-.4};
const KO={hy:.95,crx:-.2,hrx:-.1,Lux:.5,Rux:.4,Llx:-.3,Rlx:-.3,tLx:-.1,kLx:.1,tRx:.1,kRx:.1,cry:0,hdx:-.2};
const WN={Lux:-2.8,Rux:-2.8,Llx:-.3,Rlx:-.3,Luz:.5,Ruz:-.5,hy:.98,crx:-.1};
const SP={a:{Lux:-1.55,Llx:-.1,cry:-.05,Rux:-.9},b:{Rux:-1.55,Rlx:-.1,cry:-.6,hrx:.2,Lux:-.9},
c:{Lux:-1.3,Luz:-1.2,Llx:-1.2,cry:-1,crx:.15,hy:.82},k:{tRx:-1.75,kRx:.1,crx:-.4,hrx:-.15,tLx:.15,kLx:.35,Lux:-1.1,Rux:-.5,hy:.95}};
let P,E,wave=1,lvl=1,xp=0,state='menu',shake=0,sel=0,T=0,hs=0,ts=1,combo=0,comboT=0;
const keys={};
addEventListener('keydown',e=>{keys[e.code]=true;if(e.code==='Space')e.preventDefault();
 if(state==='menu'){if(e.code==='ArrowRight')pick((sel+1)%3);if(e.code==='ArrowLeft')pick((sel+2)%3);if(e.code==='Enter')begin()}
 if(state==='play'&&!e.repeat){if(e.code==='KeyJ')atk(P,'j');if(e.code==='KeyK')atk(P,'k');if(e.code==='Space')dodge(P)}});
addEventListener('keyup',e=>keys[e.code]=false);

/* ===== cena e iluminação ===== */
const ren=new THREE.WebGLRenderer({antialias:true});ren.setPixelRatio(Math.min(devicePixelRatio,2));ren.setSize(innerWidth,innerHeight);
ren.outputEncoding=THREE.sRGBEncoding;ren.toneMapping=THREE.ACESFilmicToneMapping;ren.toneMappingExposure=1.2;
ren.shadowMap.enabled=true;ren.shadowMap.type=THREE.PCFSoftShadowMap;document.body.prepend(ren.domElement);
const sc=new THREE.Scene();sc.fog=new THREE.Fog(0x5a2a55,20,80);
const cam=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,200);
const tex=c=>{const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;return t};
const cnv=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return[c,c.getContext('2d')]};
{const[c,x]=cnv(512,512),g=x.createLinearGradient(0,0,0,512);
 [[0,'#05030c'],[.55,'#2b1650'],[.85,'#b3456a'],[1,'#ff9a5c']].forEach(s=>g.addColorStop(s[0],s[1]));x.fillStyle=g;x.fillRect(0,0,512,512);
 for(let i=0;i<240;i++){x.fillStyle='rgba(255,255,255,'+Math.random()*.9+')';x.fillRect(Math.random()*512,Math.random()*270,1+Math.random()*1.5,1+Math.random()*1.5)}
 x.fillStyle='#fff4d6';x.shadowColor='#fff';x.shadowBlur=30;x.beginPath();x.arc(380,170,26,0,7);x.fill();
 sc.add(new THREE.Mesh(new THREE.SphereGeometry(100,32,16),new THREE.MeshBasicMaterial({map:tex(c),side:THREE.BackSide,fog:false})))}
sc.add(new THREE.HemisphereLight(0x8a9cff,0x3a1838,.7));
const moon=new THREE.DirectionalLight(0xaab8ff,1.0);moon.position.set(6,14,6);moon.castShadow=true;
Object.assign(moon.shadow.camera,{left:-14,right:14,top:14,bottom:-14});moon.shadow.mapSize.set(2048,2048);moon.shadow.bias=-.0005;sc.add(moon);
const rim=new THREE.DirectionalLight(0xff8a5c,.7);rim.position.set(-8,4,-10);sc.add(rim);
const spot=new THREE.SpotLight(0xffffff,1.6,20,.6,.5);spot.position.set(2,5,5);sc.add(spot);sc.add(spot.target);
{const[c,x]=cnv(1024,1024);x.fillStyle='#2b2342';x.fillRect(0,0,1024,1024);
 for(let i=0;i<1024;i+=64)for(let j=0;j<1024;j+=64){x.fillStyle='hsl(260,25%,'+(16+Math.random()*7)+'%)';x.fillRect(i+2,j+2,60,60)}
 x.strokeStyle='#ff5a36';x.shadowColor='#ff5a36';x.shadowBlur=14;x.lineWidth=7;[470,350,160].forEach(r=>{x.beginPath();x.arc(512,512,r,0,7);x.stroke()});
 x.strokeStyle='#ffc857';x.shadowColor='#ffc857';x.lineWidth=3;for(let i=0;i<8;i++){const a=i*Math.PI/4;x.beginPath();x.moveTo(512+Math.cos(a)*165,512+Math.sin(a)*165);x.lineTo(512+Math.cos(a)*345,512+Math.sin(a)*345);x.stroke()}
 const f=new THREE.Mesh(new THREE.CircleGeometry(12,64),new THREE.MeshStandardMaterial({map:tex(c),roughness:.4,metalness:.35}));
 f.rotation.x=-Math.PI/2;f.receiveShadow=true;sc.add(f);
 const b=new THREE.Mesh(new THREE.CylinderGeometry(12.2,12.8,.8,64),new THREE.MeshStandardMaterial({color:0x2a2140,roughness:.8}));b.position.y=-.41;sc.add(b)}
const ropeM=new THREE.MeshStandardMaterial({color:0xc8281e,emissive:0x601008,roughness:.5});
[.5,.95,1.4].forEach(y=>{const r=new THREE.Mesh(new THREE.TorusGeometry(11.9,.05,8,96),ropeM);r.rotation.x=Math.PI/2;r.position.y=y;sc.add(r)});
const posts=[],fire=[];
for(let i=0;i<8;i++){const a=i/8*Math.PI*2+.4,x=Math.cos(a)*11.9,z=Math.sin(a)*11.9;
 const p=new THREE.Mesh(new THREE.CylinderGeometry(.14,.18,1.8,10),new THREE.MeshStandardMaterial({color:0x4a3b70,metalness:.5,roughness:.4}));p.position.set(x,.9,z);p.castShadow=true;sc.add(p)}
for(let i=0;i<4;i++){const a=i*Math.PI/2+Math.PI/4,x=Math.cos(a)*14,z=Math.sin(a)*14;
 const bw=new THREE.Mesh(new THREE.CylinderGeometry(.7,.35,.7,12),new THREE.MeshStandardMaterial({color:0x3b2f5c,metalness:.6,roughness:.4}));bw.position.set(x,1.6,z);sc.add(bw);
 const st=new THREE.Mesh(new THREE.CylinderGeometry(.12,.2,1.6,8),bw.material);st.position.set(x,.8,z);sc.add(st);
 const fl=new THREE.Mesh(new THREE.ConeGeometry(.5,1.4,10),new THREE.MeshBasicMaterial({color:0xff8a3c,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}));fl.position.set(x,2.5,z);sc.add(fl);
 const L=new THREE.PointLight(0xff8a3c,1.3,20);L.position.set(x,2.8,z);sc.add(L);fire.push({fl,L})}
for(let i=0;i<22;i++){const a=i/22*Math.PI*2,m=new THREE.Mesh(new THREE.ConeGeometry(7+Math.random()*5,12+Math.random()*14,6),new THREE.MeshStandardMaterial({color:0x2a1d40,roughness:1,flatShading:true}));
 m.position.set(Math.cos(a)*60,4,Math.sin(a)*60);sc.add(m)}
const emN=160,emP=new Float32Array(emN*3);for(let i=0;i<emN;i++){emP[i*3]=(Math.random()-.5)*30;emP[i*3+1]=Math.random()*9;emP[i*3+2]=(Math.random()-.5)*30}
const emG=new THREE.BufferGeometry();emG.setAttribute('position',new THREE.BufferAttribute(emP,3));
sc.add(new THREE.Points(emG,new THREE.PointsMaterial({color:0xff9a4c,size:.1,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false})));
/* efeitos */
const sparkG=new THREE.SphereGeometry(.07,6,6),sparks=[],rings=[];
const addM=c=>new THREE.MeshBasicMaterial({color:c,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
function spark(p,col,n){for(let i=0;i<n;i++){const m=new THREE.Mesh(sparkG,addM(col));m.position.copy(p).add(V(0,1.3,0));
 m.v=V((Math.random()-.5)*8,Math.random()*6,(Math.random()-.5)*8);m.life=.55;sc.add(m);sparks.push(m)}}
function ring(p,col){const m=new THREE.Mesh(new THREE.RingGeometry(.2,.32,32),addM(col));m.rotation.x=-Math.PI/2;m.position.set(p.x,.06,p.z);m.life=.35;sc.add(m);rings.push(m)}

/* ===== personagem articulado ===== */
function mk(c){
 const M=(col,r,m)=>new THREE.MeshStandardMaterial({color:col,roughness:r,metalness:m||.05});
 const cloth=M(c.c,.6),acc=M(c.a,.35,.4),skin=M(c.sk,.7),hair=M(c.hr,.5),dark=M(0x1a1620,.8);
 acc.emissive=new THREE.Color(c.a);acc.emissiveIntensity=.25;
 const g=new THREE.Group();g.rotation.order='YXZ';
 const add=(geo,mt,p,x,y,z)=>{const m=new THREE.Mesh(geo,mt);m.position.set(x||0,y||0,z||0);m.castShadow=true;p.add(m);return m};
 const cy=(a,b,h)=>new THREE.CylinderGeometry(a,b,h,14),sp=r=>new THREE.SphereGeometry(r,16,12);
 const hips=new THREE.Group();hips.position.y=.95;g.add(hips);add(cy(.26,.24,.24),dark,hips);
 const chest=new THREE.Group();chest.position.y=.12;hips.add(chest);
 add(cy(.25,.22,.3),cloth,chest,0,.15,0);add(cy(.36,.26,.42),cloth,chest,0,.5,0).scale.z=.65;
 add(new THREE.TorusGeometry(.25,.04,8,18),acc,chest,0,.02,0).rotation.x=Math.PI/2;
 add(cy(.09,.1,.16),skin,chest,0,.78,0);
 const head=new THREE.Group();head.position.y=.84;chest.add(head);
 add(sp(.2),skin,head,0,.12,0).scale.set(.95,1.1,1);
 [-.075,.075].forEach(x=>add(sp(.028),dark,head,x,.14,.185));
 if(c.st<2){add(new THREE.SphereGeometry(.215,16,10,0,6.3,0,1.8),hair,head,0,.14,-.015).rotation.x=-.25}
 if(c.st===0){for(let i=0;i<5;i++){const s=add(new THREE.ConeGeometry(.06,.28,6),hair,head,(i-2)*.07,.32,-.05);s.rotation.set(-.5,0,(i-2)*.25)}
  add(new THREE.TorusGeometry(.205,.03,8,18),acc,head,0,.2,0).rotation.x=Math.PI/2}
 if(c.st===1){add(cy(.05,.02,.55),hair,head,0,.05,-.32).rotation.x=-.9;add(sp(.05),acc,head,0,.22,-.2)}
 if(c.st===2){add(new THREE.BoxGeometry(.2,.13,.1),hair,head,0,0,.17);[-.45,.45].forEach(x=>add(sp(.2),acc,chest,x,.68,0))}
 const limb=(par,x,y,l1,l2,r,m1,end)=>{const up=new THREE.Group();up.position.set(x,y,0);par.add(up);
  add(sp(r*1.15),m1,up);add(cy(r,r*.85,l1),m1,up,0,-l1/2,0);
  const lo=new THREE.Group();lo.position.y=-l1;up.add(lo);add(sp(r*.9),m1,lo);add(cy(r*.85,r*.68,l2),m1,lo,0,-l2/2,0);end(lo,l2);return{up,lo}};
 const glove=(lo,l)=>add(sp(.14),acc,lo,0,-l-.02,0),foot=(lo,l)=>{add(new THREE.BoxGeometry(.2,.12,.36),dark,lo,0,-l-.04,.08);add(cy(.12,.1,.12),acc,lo,0,-l*.55,0)};
 const aL=limb(chest,-.43,.66,.36,.34,.095,skin,glove),aR=limb(chest,.43,.66,.36,.34,.095,skin,glove);
 const lL=limb(hips,-.15,-.05,.5,.5,.13,cloth,foot),lR=limb(hips,.15,-.05,.5,.5,.13,cloth,foot);
 return{g,hips,chest,head,aL,aR,lL,lR,mats:[cloth,skin]}}
function fighter(c,isP,pos,hm){const m=mk(c);m.g.scale.set(c.w,c.hh,c.w);sc.add(m.g);const hp=c.hp*hm;
 return{m,c,isP,pos,hp,maxHp:hp,st:c.sta,maxSt:c.sta,dm:c.dm,atk:null,t:0,done:false,block:false,blockT:0,stun:0,dodge:0,dv:V(0,0,0),push:V(0,0,0),
 mv:V(0,0,0),vel:V(0,0,0),fw:V(0,0,isP?-1:1),ang:isP?Math.PI:0,dist:5,ph:0,think:0,mode:'chase',sd:1,cur:{...S},cmb:0,cmbT:0,queued:null,
 flash:0,lg:0,ko:false,win:false,demoT:0,id:Math.random()*6}}

/* ===== animação procedural ===== */
function target(f){const t={...S};
 if(f.ko)Object.assign(t,KO);else if(f.win)Object.assign(t,WN);else if(f.stun>0)Object.assign(t,STN);else if(f.dodge>0)Object.assign(t,DG);
 else if(f.atk){const a=f.atk,p=f.t/a.d,s=p<a.h?-.3*p/a.h:p<a.h+.12?1:1-(p-a.h-.12)/(1-a.h-.12),q=SP[a.t];for(const k in q)t[k]=S[k]+(q[k]-S[k])*s}
 else{if(f.block)Object.assign(t,BL);
  const A=cl(f.vel.length()/f.c.sp,0,1),rt=V(-f.fw.z,0,f.fw.x),vf=f.vel.dot(f.fw),vs=f.vel.dot(rt),ax=Math.abs(vf)/(Math.abs(vf)+Math.abs(vs)+.001),sn=Math.sin(f.ph),g=Math.sign(vf);
  t.tLx+=sn*.55*A*ax*g;t.tRx-=sn*.55*A*ax*g;t.kLx+=Math.max(0,-sn)*.8*A;t.kRx+=Math.max(0,sn)*.8*A;
  t.tLz+=Math.max(0,sn)*.35*A*(1-ax);t.tRz-=Math.max(0,-sn)*.35*A*(1-ax);t.crx+=cl(vf/f.c.sp,-1,1)*.12;t.hy+=Math.abs(sn)*.03*A}
 t.hy+=Math.sin(T*3+f.id)*.01;return t}
function apply(f,dt){const t=target(f),c=f.cur,k=Math.min(1,dt*(f.atk?30:14));for(const x in t)c[x]+=(t[x]-c[x])*k;
 const m=f.m;m.hips.position.y=c.hy+.03;m.hips.rotation.x=c.hrx;m.chest.rotation.set(c.crx,c.cry,0);m.head.rotation.x=c.hdx;
 m.aL.up.rotation.set(c.Lux,0,c.Luz);m.aL.lo.rotation.x=c.Llx;m.aR.up.rotation.set(c.Rux,0,c.Ruz);m.aR.lo.rotation.x=c.Rlx;
 m.lL.up.rotation.set(c.tLx,0,c.tLz);m.lL.lo.rotation.x=c.kLx;m.lR.up.rotation.set(c.tRx,0,c.tRz);m.lR.lo.rotation.x=c.kRx;
 f.flash=Math.max(0,f.flash-dt);m.mats.forEach(x=>x.emissive.setRGB(f.flash*4,f.flash*1.4,f.flash))}

/* ===== combate ===== */
function atk(f,t){if(f.ko)return;
 if(f.atk){if(t==='j'&&f.atk.t!=='k'&&f.t/f.atk.d>.45)f.queued='j';return}
 if(f.stun>0||f.dodge>0)return;
 let ty=t;if(t==='j'){if(f.cmbT<=0)f.cmb=0;ty='abc'[f.cmb%3];f.cmb++}
 const a=AT[ty];if(f.st<a.st)return;f.st-=a.st;f.atk={...a,t:ty};f.t=0;f.done=false;f.block=false;f.cmbT=1}
function dodge(f){if(f.atk||f.stun>0||f.st<15)return;f.st-=15;f.dodge=.35;f.dv=(f.mv.lengthSq()>0?f.mv.clone():f.fw.clone().negate()).normalize().multiplyScalar(9)}
function msg(t,c){const m=$('msg');m.textContent=t;m.style.color=c||'';m.style.opacity=1;clearTimeout(msg.id);msg.id=setTimeout(()=>m.style.opacity=0,1000)}
function hit(a,d,at){if(d.dodge>0||d.ko)return;
 const dir=d.pos.clone().sub(a.pos).setY(0).normalize(),hp=d.pos.clone();let dmg=at.dmg*a.dm*(a.isP?1:1+(wave-1)*.07);
 if(d.block&&d.blockT<.2){a.stun=.9;a.atk=null;a.queued=null;d.st=Math.min(d.maxSt,d.st+18);spark(hp,0x5cc8ff,26);ring(hp,0x5cc8ff);msg('APARADO!','#5cc8ff');hs=.1;shake=.2;return}
 if(d.block&&d.st>0){dmg*=.2;d.st-=at.dmg*1.6;d.push.add(dir.multiplyScalar(at.kb*3));spark(hp,0xffffff,8);hs=.04;
  if(d.st<=0){d.st=0;d.stun=1;d.block=false;msg('GUARDA QUEBRADA!','#ff5a36')}}
 else{d.stun=at.kb>1?.55:.26;d.atk=null;d.queued=null;d.push.add(dir.multiplyScalar(at.kb*5.5));spark(hp,0xff7a3c,18);hs=at.kb>1?.12:.06;shake=at.kb>1?.4:.18;d.flash=.2;
  if(at.kb>1){ring(hp,0xff7a3c);cam.fov=53}if(a.isP){combo++;comboT=1.6}else combo=0}
 d.hp-=dmg}
function ai(e,dt){e.mv.set(0,0,0);e.block=false;if(e.stun>0||e.atk||e.dodge>0||e.ko)return;
 const rt=V(-e.fw.z,0,e.fw.x),lv=Math.min(1,.45+wave*.07);e.think-=dt;
 if(P.atk&&e.dist<3&&Math.random()<dt*lv*3){e.mode='block';e.think=.45}
 if(e.think<=0){e.think=.3+Math.random()*.5;const r=Math.random();e.mode=e.dist>2.4?'chase':r<.4?'j':r<.55?'k':r<.72?'block':'strafe';e.sd=Math.random()<.5?1:-1}
 if(e.mode==='chase')e.mv.copy(e.fw);
 else if(e.mode==='strafe')e.mv.copy(rt).multiplyScalar(e.sd).addScaledVector(e.fw,e.dist>2.4?.6:-.2);
 else if(e.mode==='block')e.block=true;
 else{const a=AT[e.mode==='j'?'a':'k'];if(e.dist<a.rng-.1){atk(e,e.mode);e.mode='strafe'}else e.mv.copy(e.fw)}
 e.mv.multiplyScalar(.75+lv*.2)}
function upd(f,o,dt){
 const d=o.pos.clone().sub(f.pos).setY(0);f.dist=d.length();if(f.dist>.001)f.fw=d.divideScalar(f.dist);
 let da=Math.atan2(f.fw.x,f.fw.z)-f.ang;da=Math.atan2(Math.sin(da),Math.cos(da));f.ang+=da*Math.min(1,dt*12);
 f.m.g.rotation.y=f.ang;f.m.g.rotation.x+=((f.ko?-1.4:0)-f.m.g.rotation.x)*Math.min(1,dt*6);
 f.stun=Math.max(0,f.stun-dt);f.dodge=Math.max(0,f.dodge-dt);f.blockT=f.block?f.blockT+dt:0;if(!f.atk)f.cmbT-=dt;
 if(f.atk){f.t+=dt;const a=f.atk,p=f.t/a.d;
  if(!f.done&&p>=a.h){f.done=true;if(f.dist<a.rng+.2)hit(f,o,a)}
  f.lg=p>=a.h&&p<a.h+.15?a.lunge:0;
  if(p>=1){f.atk=null;f.lg=0;f.cmbT=.7;if(f.queued){f.queued=null;atk(f,'j')}}}
 const want=f.mv.clone().multiplyScalar(f.c.sp*(f.block?.4:1));if(f.atk||f.stun>0||f.ko)want.set(0,0,0);
 if(f.atk&&f.lg&&f.dist>1.3)want.addScaledVector(f.fw,f.lg);if(f.dodge>0)want.copy(f.dv);
 f.vel.lerp(want,Math.min(1,dt*(f.dodge>0?30:9)));f.pos.addScaledVector(f.vel,dt).addScaledVector(f.push,dt);f.push.multiplyScalar(Math.max(0,1-dt*8));
 f.ph+=f.vel.length()*dt*2.2;
 if(!f.atk&&!f.block&&f.stun<=0)f.st=Math.min(f.maxSt,f.st+17*dt);
 f.m.g.position.copy(f.pos);apply(f,dt)}

/* ===== progresso ===== */
function gainXp(n){xp+=n;while(xp>=60*lvl){xp-=60*lvl;lvl++;P.maxHp+=12;P.maxSt+=8;P.dm+=.1;P.hp=Math.min(P.maxHp,P.hp+P.maxHp*.5);msg('NÍVEL '+lvl+'!','#ffc857')}}
function spawn(){if(E)sc.remove(E.m.g);const c=R[Math.floor(Math.random()*3)],v=ENM[(wave+sel)%3];
 E=fighter({...c,c:v[0],a:v[1],sp:c.sp*.85+wave*.05},false,V(0,0,-4),1+(wave-1)*.18);
 P.win=false;$('en').textContent=c.n+' (onda '+wave+')';state='play';msg('ONDA '+wave)}
function begin(){if(state!=='menu'&&state!=='over')return;pv.forEach(f=>f.m.g.visible=false);spot.visible=false;if(P)sc.remove(P.m.g);
 wave=1;lvl=1;xp=0;ts=1;P=fighter(R[sel],true,V(0,0,4),1);$('pn').textContent=R[sel].n;
 $('menu').hidden=$('over').hidden=true;$('hud').hidden=false;spawn()}
function end(){state='over';$('hud').hidden=true;$('over').hidden=false;$('os').textContent='Você chegou à onda '+wave+' com nível '+lvl+'.'}

/* ===== menu 3D ===== */
const pv=R.map((c,i)=>{const f=fighter(c,true,V(0,0,0),1);f.m.g.visible=i===0;return f}),dummy={pos:V(0,0,7)};
function pick(i){sel=i;document.querySelectorAll('.card').forEach((x,j)=>x.classList.toggle('on',j===i));pv.forEach((f,j)=>f.m.g.visible=j===i)}
const bar=(l,v)=>'<div class="row">'+l+'<div class="mini"><i style="width:'+Math.round(v*100)+'%"></i></div></div>';
R.forEach((c,i)=>{const b=document.createElement('button');b.className='card'+(i?'':' on');
 b.innerHTML='<b>'+c.n+'</b><small>'+c.t+'</small>'+bar('Vida',c.hp/130)+bar('Fôlego',c.sta/120)+bar('Força',c.dm/1.25)+bar('Velocidade',c.sp/6.6);
 b.onclick=()=>pick(i);$('cards').appendChild(b)});
$('start').onclick=begin;$('again').onclick=()=>{state='over';begin()};
addEventListener('resize',()=>{ren.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()});

/* ===== loop principal ===== */
const clk=new THREE.Clock(),camT=V(0,1.7,5),look=V(0,.9,0);
function loop(){requestAnimationFrame(loop);const raw=Math.min(clk.getDelta(),.05);T+=raw;hs=Math.max(0,hs-raw);ts+=(1-ts)*Math.min(1,raw*1.5);
 const dt=hs>0?0:raw*ts;
 if(state==='menu'){const f=pv[sel];f.demoT-=raw;if(f.demoT<=0){f.demoT=2.4;f.st=f.maxSt;atk(f,Math.random()<.35?'k':'j');f.queued=Math.random()<.6?'j':null}
  upd(f,dummy,raw);f.pos.set(0,0,0);f.m.g.position.set(0,0,0);f.m.g.rotation.y=Math.sin(T*.6)*.8;
  camT.set(0,1.5,4.6);look.set(0,.55,0);spot.visible=true;spot.target.position.set(0,1,0)}
 else if(state==='over'){const a=T*.25;camT.set(Math.cos(a)*13,5,Math.sin(a)*13);look.set(0,1.5,0)}
 else{
  if(state==='play'){const fw=P.fw,rt=V(-fw.z,0,fw.x);P.mv.set(0,0,0);
   if(keys.KeyW)P.mv.add(fw);if(keys.KeyS)P.mv.sub(fw);if(keys.KeyD)P.mv.add(rt);if(keys.KeyA)P.mv.sub(rt);P.mv.normalize();
   P.block=!!(keys.ShiftLeft||keys.ShiftRight||keys.KeyL)&&!P.atk&&P.stun<=0&&P.dodge<=0&&P.st>0;ai(E,dt)}
  else{P.mv.set(0,0,0);E.mv.set(0,0,0);P.block=E.block=false}
  upd(P,E,dt);upd(E,P,dt);
  const sep=P.pos.distanceTo(E.pos);if(sep<1.1&&sep>0){const n=P.pos.clone().sub(E.pos).setY(0).normalize().multiplyScalar((1.1-sep)/2);P.pos.add(n);E.pos.sub(n)}
  [P,E].forEach(f=>{if(f.pos.length()>11)f.pos.setLength(11)});
  if(state==='play'){
   if(E.hp<=0){E.ko=true;P.win=true;state='won';ts=.3;msg('VITÓRIA!','#3ddc97');gainXp(30+wave*10);P.hp=Math.min(P.maxHp,P.hp+P.maxHp*.25);wave++;setTimeout(()=>{if(state==='won')spawn()},2400)}
   else if(P.hp<=0){P.ko=true;state='dying';ts=.35;setTimeout(()=>{$('ot').textContent='DERROTA';end()},2000)}}
  comboT-=raw;if(comboT<=0)combo=0;$('cmb').textContent=combo>1?combo+' GOLPES':'';
  $('php').style.width=Math.max(0,P.hp/P.maxHp*100)+'%';$('pst').style.width=P.st/P.maxSt*100+'%';
  $('ehp').style.width=Math.max(0,E.hp/E.maxHp*100)+'%';$('pxp').style.width=xp/(60*lvl)*100+'%';$('lv').textContent='Nv '+lvl;
  const fw=P.fw,rt=V(-fw.z,0,fw.x),mid=P.pos.clone().add(E.pos).multiplyScalar(.5);
  camT.copy(P.pos).addScaledVector(fw,-6).addScaledVector(rt,1.4);camT.y=3.1+P.dist*.12;look.lerp(mid.setY(1.3),raw*6);spot.visible=false}
 cam.position.lerp(camT,Math.min(1,raw*5));
 if(shake>0){cam.position.add(V((Math.random()-.5)*shake,(Math.random()-.5)*shake,0));shake=Math.max(0,shake-raw)}
 cam.fov+=(60-cam.fov)*Math.min(1,raw*6);cam.updateProjectionMatrix();cam.lookAt(look);
 for(let i=sparks.length-1;i>=0;i--){const s=sparks[i];s.life-=raw;s.v.y-=16*raw;s.position.addScaledVector(s.v,raw);s.material.opacity=s.life*2;
  if(s.life<=0){sc.remove(s);s.material.dispose();sparks.splice(i,1)}}
 for(let i=rings.length-1;i>=0;i--){const r=rings[i];r.life-=raw;r.scale.setScalar(1+(.35-r.life)*16);r.material.opacity=r.life*2.8;
  if(r.life<=0){sc.remove(r);r.material.dispose();r.geometry.dispose();rings.splice(i,1)}}
 fire.forEach((f,i)=>{f.fl.scale.set(1,1+Math.sin(T*9+i)*.18,1);f.L.intensity=1.2+Math.random()*.4});
 for(let i=0;i<emN;i++){emP[i*3+1]+=raw*.7;emP[i*3]+=Math.sin(T+i)*raw*.2;if(emP[i*3+1]>9)emP[i*3+1]=0}emG.attributes.position.needsUpdate=true;
 ren.render(sc,cam)}
loop();