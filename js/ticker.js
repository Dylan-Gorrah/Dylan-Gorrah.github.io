/* ticker.js: the scrolling tech strip at the top of home. Words come from Site.data.ticker.
   Docs: Doc/Elements/Ticker.md */
(function(S){
  var $=S.$, rm=S.rm, TECH=S.data.ticker;
  /* Scroll speed in pixels per second. Lower = slower (originally 49.5). */
  var SPEED=35.6;
  var tk=$('#tk');
  function mk(){ TECH.forEach(function(t){ var s=document.createElement('span'); s.className='tk'+(t[1]?' t':''); s.textContent=t[0]; tk.appendChild(s); }); }
  /* Repeat the list until it is wider than the screen (twice over), so the loop has no gap,
     and set the speed from its width so it always moves at the same pace. */
  function buildTicker(){
    tk.innerHTML='';
    mk(); var setW=tk.scrollWidth, boxW=tk.parentNode.clientWidth||innerWidth;
    var k=Math.ceil(boxW/setW)+1; tk.innerHTML='';
    for(var i=0;i<k*2;i++) mk();
    tk.style.setProperty('--t',(setW*k/SPEED).toFixed(1)+'s');
  }
  if(rm){ $('.ticker').style.overflowX='auto'; $('.ticker').style.borderRadius='999px'; mk(); tk.style.animation='none'; }
  else { buildTicker(); var rz; window.addEventListener('resize',function(){ clearTimeout(rz); rz=setTimeout(buildTicker,250); }); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(buildTicker); }
})(window.Site);
