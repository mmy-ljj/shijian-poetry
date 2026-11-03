(()=>{
 const previous=updateDeck;
 function paint(){if(!document.querySelector('.daily')){document.body.classList.remove('landscape-home');return}document.body.classList.add('landscape-home');let scene=document.querySelector('.landscape-scene');if(!scene){scene=document.createElement('div');scene.className='landscape-scene';scene.setAttribute('aria-hidden','true');scene.innerHTML='<div class="landscape-layer landscape-mountain"></div><div class="landscape-layer landscape-water"></div><div class="landscape-veil"></div>';app.prepend(scene)}const poem=deck[active];scene.dataset.weather=/雨|雪|江|夜|月/.test(poem.title)?'water':'mountain';}
 updateDeck=function(){previous();paint()};addEventListener('hashchange',paint);paint();
})();
