'use strict';
const $ = s => document.querySelector(s);
const board = $('#board');
let products=[], selected=[], moves=0, pairs=0, start=0, timer, pending, locked=false, playing=false;
const bestKey='beauty-memory-best-moves-v1';
let streak=0, bestMoves=null;
try {
 const saved=Number(localStorage.getItem(bestKey));
 if(Number.isSafeInteger(saved)&&saved>=8)bestMoves=saved;
} catch { /* The game also works when browser storage is unavailable. */ }
function showBest(){
 $('#personal-best').textContent=bestMoves===null
  ? 'Earn 3 stars: match all 8 pairs in 12 moves or fewer.'
  : `Your best: ${bestMoves} moves. ${bestMoves===8?'A perfect round! Can you do it again?':'Play and try to beat it!'}`;
}
function updateStars(){
 const stars=moves<=12?3:moves<=18?2:1;
 $('#star-goal').textContent=stars===3?'★★★ · goal: 12 moves or fewer':stars===2?'★★ · goal: 18 moves or fewer':'★ · finish to earn a star';
 return stars;
}
function reward(){
 const stars=updateStars();
 $('#win-stars').textContent='★'.repeat(stars)+'☆'.repeat(3-stars);
 $('#win-stars').setAttribute('aria-label',`${stars} out of 3 stars`);
 const isRecord=bestMoves===null||moves<bestMoves;
 $('#record-message').textContent=isRecord
  ? (bestMoves===null?'Your first score!':`New best! ${bestMoves-moves} fewer moves.`)
  : moves===bestMoves?'You matched your best!':`Your best: ${bestMoves} moves. One more round?`;
 if(isRecord){
  bestMoves=moves;
  try { localStorage.setItem(bestKey,String(bestMoves)); }
  catch { $('#record-message').textContent+=' Score available only for this session.'; }
 }
 showBest();
}
showBest();
const format = seconds => `${Math.floor(seconds/60).toString().padStart(2,'0')}:${(seconds%60).toString().padStart(2,'0')}`;
function tick(){ $('#time').textContent=format(start ? Math.floor((performance.now()-start)/1000):0); }
function reset(){
 clearInterval(timer);clearTimeout(pending);selected=[];moves=0;pairs=0;start=0;locked=false;streak=0;updateStars();
 $('#pair-progress').value=0;$('#moves').textContent='0';$('#pairs').textContent='0';$('#time').textContent='00:00';$('#hint').textContent='Game started. Find all eight pairs.';
 const deck=[...products,...products];
 for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
 board.replaceChildren(...deck.map((product,index)=>{
 const button=document.createElement('button');button.className='card';button.dataset.id=product.id;button.setAttribute('aria-label',`Card ${index+1}: flip card`);button.setAttribute('aria-pressed','false');
 const inner=document.createElement('span');inner.className='card-inner';inner.setAttribute('aria-hidden','true');
 const back=document.createElement('span');back.className='face back';back.innerHTML='<span class="card-flower">✳</span><span class="back-label">BEAUTY<br>MEMORY</span>';
 const front=document.createElement('span');front.className='face front';const img=document.createElement('img');img.src=product.image;img.alt='';img.draggable=false;front.append(img);inner.append(back,front);button.append(inner);
 button.addEventListener('click',()=>flip(button,product,index));return button;
 }));
}
function flip(button,product,index){
 if(!playing||locked||button.classList.contains('flipped')||button.classList.contains('matched'))return;
 button.classList.add('flipped');button.setAttribute('aria-pressed','true');button.setAttribute('aria-label',`Card ${index+1}: ${product.name}`);selected.push(button);
 $('#hint').textContent='Flip another card';
 if(selected.length<2)return;
 moves++;$('#moves').textContent=moves;updateStars();
 const [a,b]=selected;
 if(a.dataset.id===b.dataset.id){
 pairs++;$('#pairs').textContent=pairs;$('#pair-progress').value=pairs;
 for(const card of selected){card.classList.add('matched');card.setAttribute('aria-disabled','true');card.setAttribute('aria-label',card.getAttribute('aria-label')+' — pair matched');}
 streak++;selected=[];$('#hint').textContent=streak>1?`${streak} pairs in a row! Great streak ✨`:'A match! Find another pair';
 if(pairs===8){reward();clearInterval(timer);tick();playing=false;locked=true;$('#hint').textContent='All pairs found!';$('#win-moves').textContent=moves;$('#win-time').textContent=$('#time').textContent;pending=setTimeout(()=>$('#win-dialog').showModal(),500);}
 }else{
 streak=0;locked=true;$('#hint').textContent='Remember these cards and try again';
 pending=setTimeout(()=>{for(const card of selected){card.classList.remove('flipped');card.setAttribute('aria-pressed','false');card.setAttribute('aria-label',`Card ${Array.from(board.children).indexOf(card)+1}: flip card`);}selected=[];locked=false;$('#hint').textContent='Find another pair';},1100);
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
 $('#start').textContent='Start game';
}).catch(()=>{$('#load-status').textContent='Could not load the cards. Please refresh the page.';$('#start').textContent='Game unavailable';});
