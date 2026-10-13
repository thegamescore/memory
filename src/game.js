'use strict';
const $ = s => document.querySelector(s);
const board = $('#board');
let products=[], selected=[], moves=0, pairs=0, start=0, timer, pending, locked=false, playing=false;
const format = seconds => `${Math.floor(seconds/60).toString().padStart(2,'0')}:${(seconds%60).toString().padStart(2,'0')}`;
function tick(){ $('#time').textContent=format(start ? Math.floor((performance.now()-start)/1000):0); }
function reset(){
 clearInterval(timer);clearTimeout(pending);selected=[];moves=0;pairs=0;start=0;locked=false;
 $('#pair-progress').value=0;$('#moves').textContent='0';$('#pairs').textContent='0';$('#time').textContent='00:00';$('#hint').textContent='Gra rozpoczęta. Znajdź osiem par.';
 const deck=[...products,...products];
 for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
 board.replaceChildren(...deck.map((product,index)=>{
 const button=document.createElement('button');button.className='card';button.dataset.id=product.id;button.setAttribute('aria-label',`Karta ${index+1}: odkryj`);button.setAttribute('aria-pressed','false');
 const inner=document.createElement('span');inner.className='card-inner';inner.setAttribute('aria-hidden','true');
 const back=document.createElement('span');back.className='face back';back.innerHTML='<span class="card-flower">✳</span><span class="back-label">BEAUTY<br>MEMORY</span>';
 const front=document.createElement('span');front.className='face front';const img=document.createElement('img');img.src=product.image;img.alt='';img.draggable=false;front.append(img);inner.append(back,front);button.append(inner);
 button.addEventListener('click',()=>flip(button,product,index));return button;
 }));
}
function flip(button,product,index){
 if(!playing||locked||button.classList.contains('flipped')||button.classList.contains('matched'))return;
 button.classList.add('flipped');button.setAttribute('aria-pressed','true');button.setAttribute('aria-label',`Karta ${index+1}: ${product.name}`);selected.push(button);
 $('#hint').textContent='Odkryj drugą kartę';
 if(selected.length<2)return;
 moves++;$('#moves').textContent=moves;
 const [a,b]=selected;
 if(a.dataset.id===b.dataset.id){
 pairs++;$('#pairs').textContent=pairs;$('#pair-progress').value=pairs;
 for(const card of selected){card.classList.add('matched');card.setAttribute('aria-disabled','true');card.setAttribute('aria-label',card.getAttribute('aria-label')+' — para znaleziona');}
 selected=[];$('#hint').textContent='Jest para! Znajdź kolejną';
 if(pairs===8){clearInterval(timer);tick();playing=false;locked=true;$('#hint').textContent='Wszystkie pary odnalezione!';$('#win-moves').textContent=moves;$('#win-time').textContent=$('#time').textContent;pending=setTimeout(()=>$('#win-dialog').showModal(),500);}
 }else{
 locked=true;$('#hint').textContent='Zapamiętaj je i spróbuj ponownie';
 pending=setTimeout(()=>{for(const card of selected){card.classList.remove('flipped');card.setAttribute('aria-pressed','false');card.setAttribute('aria-label',`Karta ${Array.from(board.children).indexOf(card)+1}: odkryj`);}selected=[];locked=false;$('#hint').textContent='Znajdź kolejną parę';},1100);
 }
}
function startGame(){
 $('#win-dialog').close();
 reset();
 $('#start-screen').hidden=true;
 $('#game-screen').hidden=false;
 playing=true;
 start=performance.now();
 timer=setInterval(tick,100);
 board.firstElementChild.focus({preventScroll:true});
}
function goHome(){
 clearInterval(timer);
 clearTimeout(pending);
 playing=false;
 $('#win-dialog').close();
 $('#game-screen').hidden=true;
 $('#start-screen').hidden=false;
 $('#start').focus({preventScroll:true});
}
$('#start').addEventListener('click',startGame);
$('#again').addEventListener('click',startGame);
$('#exit').addEventListener('click',goHome);
$('#home').addEventListener('click',goHome);
$('#win-dialog').addEventListener('cancel',event=>{event.preventDefault();goHome();});
fetch('assets/products.json').then(r=>{if(!r.ok)throw Error('assets');return r.json();}).then(async data=>{
 products=data;
 await Promise.all(products.map(product=>new Promise((resolve,reject)=>{
  const img=new Image();img.onload=resolve;img.onerror=reject;img.src=product.image;
 })));
 $('#start').disabled=false;
 $('#start').textContent='Rozpocznij grę';
}).catch(()=>{$('#load-status').textContent='Nie udało się wczytać kart. Odśwież stronę.';$('#start').textContent='Gra niedostępna';});
