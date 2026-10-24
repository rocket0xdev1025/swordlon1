(()=>{
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
// marquee
const sw='<svg><use href="#i-sword"/></svg>';let h='';for(let i=0;i<16;i++)h+=`<span>$SWORDLON ${sw} ELON WIF SWORD ${sw}</span>`;$('#track').innerHTML=h;
// nav
const nav=$('#nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
$('#burger').onclick=()=>$('#menu').classList.toggle('open');$$('#menu a').forEach(a=>a.onclick=()=>$('#menu').classList.remove('open'));
// copy
const toast=$('#toast');function showToast(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1600)}
$('#copyBtn').onclick=async()=>{const t=$('#caText').textContent.trim();try{await navigator.clipboard.writeText(t)}catch(e){}showToast(t==='Coming soon'?'CA coming soon':'Copied')};
// slash
function slash(){const i=document.createElement('i');i.style.top=(30+Math.random()*40)+'%';$('#slashFx').appendChild(i);setTimeout(()=>i.remove(),800)}
setTimeout(slash,300);
// reveal + section slash + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});$$('.reveal').forEach(el=>io.observe(el));
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){slash();so.unobserve(e.target)}}),{threshold:.3});$$('.section').forEach(el=>so.observe(el));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,to=+el.dataset.to,t0=performance.now();(function f(t){const p=Math.min((t-t0)/1600,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0);co.unobserve(el)}),{threshold:.5});$$('.count').forEach(el=>co.observe(el));
// parallax
const layers=$$('[data-depth]');addEventListener('scroll',()=>{const y=scrollY;if(y>innerHeight*1.2)return;layers.forEach(l=>l.style.transform=`translateY(${y*l.dataset.depth}px)`)},{passive:true});
// tilt
$$('.tilt').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform=`perspective(800px) rotateY(${(x-.5)*14}deg) rotateX(${(.5-y)*14}deg)`;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});c.addEventListener('mouseleave',()=>c.style.transform='')});
// embers
const ec=$('#embers'),ex=ec.getContext('2d'),tc=$('#trail'),tx=tc.getContext('2d');let W,H;
function rs(){W=ec.width=tc.width=innerWidth;H=ec.height=tc.height=innerHeight}rs();addEventListener('resize',rs);
const N=innerWidth<700?45:90,em=[];function ne(r){return{x:Math.random()*W,y:r?Math.random()*H:H+10,r:Math.random()*2.2+.5,vy:Math.random()*.8+.3,vx:Math.random()*.6-.3,a:Math.random()*.6+.3,p:Math.random()*6}}
for(let i=0;i<N;i++)em.push(ne(1));
const sp=[];addEventListener('mousemove',e=>{for(let i=0;i<3;i++)sp.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*2,vy:(Math.random()-.5)*2+.5,l:1})});
function loop(){ex.clearRect(0,0,W,H);ex.globalCompositeOperation='lighter';
em.forEach((p,i)=>{p.y-=p.vy;p.p+=.03;p.x+=p.vx+Math.sin(p.p)*.4;if(p.y<-10)em[i]=ne();const g=ex.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*4);g.addColorStop(0,`rgba(255,220,120,${p.a})`);g.addColorStop(1,'rgba(255,140,20,0)');ex.fillStyle=g;ex.beginPath();ex.arc(p.x,p.y,p.r*4,0,7);ex.fill()});
tx.clearRect(0,0,W,H);tx.globalCompositeOperation='lighter';for(let i=sp.length-1;i>=0;i--){const s=sp[i];s.x+=s.vx;s.y+=s.vy;s.l-=.03;if(s.l<=0){sp.splice(i,1);continue}tx.fillStyle=`rgba(255,${190+s.l*50|0},80,${s.l})`;tx.beginPath();tx.arc(s.x,s.y,2.5*s.l+.5,0,7);tx.fill()}
requestAnimationFrame(loop)}loop();
})();
(()=>{const c=document.getElementById('stars'),x=c.getContext('2d');let W,H,st=[],sh=[];
function rs(){W=c.width=innerWidth;H=c.height=innerHeight;st=[];const n=Math.min(260,W*H/5000|0);for(let i=0;i<n;i++)st.push({x:Math.random()*W,y:Math.random()*H*3,r:Math.random()*1.4+.2,d:[.05,.15,.3][i%3],p:Math.random()*6,s:Math.random()*.04+.01})}
rs();addEventListener('resize',rs);
function f(){x.clearRect(0,0,W,H);const y=scrollY;
for(const s of st){s.p+=s.s;const yy=((s.y-y*s.d)%(H*3)+H*3)%(H*3);if(yy>H)continue;x.globalAlpha=.4+.6*Math.abs(Math.sin(s.p));x.fillStyle=s.d>.2?'#fff2cc':'#cfe0ff';x.beginPath();x.arc(s.x,yy,s.r,0,7);x.fill()}
if(Math.random()<.006&&sh.length<2)sh.push({x:Math.random()*W,y:Math.random()*H*.5,vx:-(6+Math.random()*6),vy:3+Math.random()*3,l:1});
for(let i=sh.length-1;i>=0;i--){const s=sh[i];s.x+=s.vx;s.y+=s.vy;s.l-=.015;if(s.l<=0){sh.splice(i,1);continue}const g=x.createLinearGradient(s.x,s.y,s.x-s.vx*12,s.y-s.vy*12);g.addColorStop(0,`rgba(255,240,200,${s.l})`);g.addColorStop(1,'rgba(255,240,200,0)');x.globalAlpha=1;x.strokeStyle=g;x.lineWidth=2;x.beginPath();x.moveTo(s.x,s.y);x.lineTo(s.x-s.vx*12,s.y-s.vy*12);x.stroke()}
requestAnimationFrame(f)}f();
const r=document.getElementById('rocket');addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight,p=max>0?scrollY/max:0;const px=-100+p*(innerWidth+200),py=innerHeight*(.85-p*.7);r.style.opacity=p>.02&&p<.98?1:0;r.style.transform=`translate(${px}px,${py}px) rotate(-20deg)`},{passive:true});})();
