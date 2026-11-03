// Motion direction: a poem opens, the landscape breathes, reading stays still.
(()=>{
const preference=matchMedia('(prefers-reduced-motion: reduce)');
let dispose=()=>{};
const ease='cubic-bezier(.16,1,.3,1)';
function mount(){
 dispose();const animations=[],cleanups=[];let observer,raf=0;
 const play=(el,frames,options={})=>{if(!el)return;const animation=el.animate(frames,{duration:850,easing:ease,...options});animations.push(animation);return animation};
 dispose=()=>{observer?.disconnect();cancelAnimationFrame(raf);animations.forEach(a=>a.cancel());cleanups.forEach(fn=>fn());document.querySelectorAll('[data-motion]').forEach(el=>el.removeAttribute('data-motion'))};
 if(preference.matches)return;
 const heading=document.querySelector('.intro h1');
 if(heading){play(heading,[{transform:'translateY(22px)',opacity:.25},{transform:'translateY(0)',opacity:1}],{duration:1100});play(document.querySelector('.intro p'),[{opacity:.2,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:950,delay:100});}
 const covers=[...document.querySelectorAll('.poem-cover')];
 covers.forEach((el,i)=>{const transform=el.style.transform;play(el,[{transform:transform+' translateY(65px) rotateY(12deg)',opacity:0},{transform,opacity:el.style.opacity}],{duration:1200,delay:Math.abs(i-active)*65});
  const image=el.querySelector('img');
  const move=e=>{if(el.getAttribute('aria-current')!=='true'||e.pointerType==='touch')return;const r=el.getBoundingClientRect();image.style.transform=`scale(1.06) translate(${(e.clientX-r.left-r.width/2)*-.018}px,${(e.clientY-r.top-r.height/2)*-.018}px)`};
  const reset=()=>image.style.transform='';el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset);cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);reset()});
 });
 const onCoverInteraction=()=>animations.forEach(a=>{if(a.effect?.target?.classList?.contains('poem-cover'))a.cancel()});
 const daily=document.querySelector('.daily');if(daily){daily.addEventListener('pointerdown',onCoverInteraction);daily.addEventListener('keydown',onCoverInteraction);cleanups.push(()=>{daily.removeEventListener('pointerdown',onCoverInteraction);daily.removeEventListener('keydown',onCoverInteraction)})}
 const seen=new WeakSet();observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting||seen.has(entry.target))continue;seen.add(entry.target);observer.unobserve(entry.target);const el=entry.target;if(el.classList.contains('feature'))play(el,[{clipPath:'inset(0 0 12% 0 round 12px)',transform:'translateY(25px)'},{clipPath:'inset(0 0 0% 0 round 12px)',transform:'translateY(0)'}],{duration:1150});else if(el.classList.contains('section-head'))play(el,[{transform:'translateY(18px)',opacity:.35},{transform:'translateY(0)',opacity:1}],{duration:750});else if(el.classList.contains('poem-grid'))[...el.children].forEach((child,i)=>play(child,[{transform:'translateY(16px)',opacity:.3},{transform:'translateY(0)',opacity:1}],{duration:700,delay:Math.min(i,5)*60}));}},{threshold:.12});
 document.querySelectorAll('.section-head,.feature,.poem-grid').forEach(el=>observer.observe(el));
 const reader=document.querySelector('.reader');if(reader)play(reader,[{opacity:.4,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:650});
 const feature=document.querySelector('.feature-image');
 if(feature&&matchMedia('(pointer:fine)').matches){feature.dataset.motion='landscape';const scroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const r=feature.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight)feature.style.backgroundPosition=`center ${50+(r.top/innerHeight-.5)*12}%`})};addEventListener('scroll',scroll,{passive:true});cleanups.push(()=>{removeEventListener('scroll',scroll);feature.style.backgroundPosition=''});scroll();}
}
addEventListener('hashchange',mount);preference.addEventListener('change',mount);mount();
})();
