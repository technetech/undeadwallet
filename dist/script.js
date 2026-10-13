const intro=document.querySelector('.intro');
const gifToggle=document.querySelector('.gif-toggle');
const tradingFloor=document.querySelector('#trading-floor');
gifToggle.addEventListener('click',()=>{
  const paused=gifToggle.getAttribute('aria-pressed')!=='true';
  tradingFloor.src=paused?'assets/trading-floor-still.png':'assets/trading-floor.gif';
  gifToggle.setAttribute('aria-pressed',String(paused));
  gifToggle.textContent=paused?'Play animation ▷':'Pause animation Ⅱ';
});
let introTimer;
function closeIntro(){intro.classList.add('dismissed');clearTimeout(introTimer);}
document.querySelector('.skip').addEventListener('click',closeIntro);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeIntro()});
introTimer=setTimeout(closeIntro,matchMedia('(prefers-reduced-motion: reduce)').matches?600:4200);
document.querySelector('#replay').addEventListener('click',e=>{e.preventDefault();intro.classList.remove('dismissed');intro.classList.add('restarting');void intro.offsetWidth;intro.classList.remove('restarting');introTimer=setTimeout(closeIntro,4200)});
const quotes=[['ADA','0.23755','−2.14%'],['BNB','745.26','−0.07%'],['BTC','83,655.76','+1.18%'],['DOGE','0.084775','−0.40%'],['ETH','2,522.38','−0.01%'],['HYPE','81.77','−3.09%'],['LINK','13.03','+0.06%'],['LIT','3.35','−6.96%'],['MANA','0.09245','−2.32%'],['SOL','107.87','−0.96%'],['XRP','1.38','−0.20%'],['AAOIB','97.64','−4.41%']];
document.querySelector('#ticker').innerHTML=quotes.map(([name,price,change])=>`<div class="asset"><strong>${name}</strong><div>$${price}</div><small class="${change.startsWith('+')?'positive':''}">${change}</small></div>`).join('');
const sheets=[...document.querySelectorAll('.sheet')];let queued=false;
function animatePages(){const height=innerHeight;sheets.forEach(sheet=>{const r=sheet.getBoundingClientRect();const entering=Math.max(0,Math.min(1,(r.top-height*.55)/(height*.6)));const leaving=Math.max(0,Math.min(1,(-r.bottom+height*.18)/(height*.7)));sheet.style.transform=`perspective(1800px) rotateY(${entering*-9+leaving*5}deg) rotateX(${entering*4}deg) translateY(${entering*22}px)`;sheet.style.opacity=1-entering*.23});queued=false}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(animatePages)}},{passive:true});addEventListener('resize',animatePages);animatePages()}
document.querySelector('#copy').addEventListener('click',async()=>{const button=document.querySelector('#copy');try{await navigator.clipboard.writeText('curl -H "X-Asset-Key: $KEY" \\\n  https://undeadwallet.com/api/trading/agent/learn');button.textContent='Copied ✓';setTimeout(()=>button.textContent='Copy ↗',2000)}catch{button.textContent='Select code below';const range=document.createRange();range.selectNodeContents(document.querySelector('code'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range)}});
