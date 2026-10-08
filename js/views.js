/* views.js: opens/closes the full-screen views. A view grows out of its tile as a circle,
   with Back, prev/next, Esc/arrow keys, phone swipes and the browser Back/Forward buttons
   (each view has its own address, e.g. #projects).
   Order and titles come from Site.data.viewOrder / viewNames. Docs: Doc/Elements/View System.md */
(function(S){
  var $=S.$, $$=S.$$, rm=S.rm, ORDER=S.data.viewOrder, NAMES=S.data.viewNames;
  var cur=null, z=10, token=0;
  function pad(n){ return (n<10?'0':'')+n; }
  /* Tell other scripts a view opened (id) or we're back home (null). cv-button.js listens. */
  /* vibration ticks timed to the grow/shrink (js/haptics.js). Off until the page has loaded, so a
     #projects link opening on load doesn't buzz. */
  var hapticsOn=false; setTimeout(function(){ hapticsOn=true; },0);
  function buzz(name){ if(hapticsOn&&S.haptics) S.haptics.play(name); }
  function announce(id){ document.dispatchEvent(new CustomEvent('site:view',{detail:{id:id}})); }

  /* ---------- Browser history ----------
     Opening a view from home adds ONE history entry (#projects). Moving between views (prev/next,
     arrow keys, swipe) replaces it, so the browser Back button always returns home and Forward
     reopens the last view. Wrapped in try/catch: if a browser refuses, the site still works. */
  function hist(method,id){ try{ history[method]({view:id||null},'',id?'#'+id:location.pathname+location.search); }catch(e){} }

  /* Wire up every view: stagger index for the rise-in animation, "01 / 08" label, buttons */
  $$('.view').forEach(function(v){
    $$('.vin > *',v).forEach(function(e,i){ e.style.setProperty('--i',i); });
    var id=v.id.slice(2), i=ORDER.indexOf(id);
    $('.pos',v).textContent=pad(i+1)+' / '+pad(ORDER.length);
    $('.back',v).addEventListener('click',function(){ home(); });
    $('.nb.l',v).addEventListener('click',function(e){ step(-1,e.currentTarget); });
    $('.nb.r',v).addEventListener('click',function(e){ step(1,e.currentTarget); });
  });

  function center(e){ var r=e.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }
  function tileCenter(id){ var t=$('.tile[data-go="'+id+'"]'); return t?center(t):{x:innerWidth/2,y:innerHeight/2}; }
  function reach(o){ return Math.hypot(Math.max(o.x,innerWidth-o.x),Math.max(o.y,innerHeight-o.y))+6; }
  function clip(o,r){ return 'circle('+r+'px at '+o.x+'px '+o.y+'px)'; }
  function stopAnims(v){ if(v.getAnimations) v.getAnimations().forEach(function(a){ a.cancel(); }); }
  function hideNow(v){ stopAnims(v); v.hidden=true; v.classList.remove('play'); }
  function step(d,btn){ var i=ORDER.indexOf(cur); if(i<0) return; go(ORDER[(i+d+ORDER.length)%ORDER.length],btn?center(btn):null); }

  /* Elements with data-count="N" count up from 0 when their view opens */
  function countUp(v){
    $$('[data-count]',v).forEach(function(e){
      var to=+e.dataset.count; if(rm) return;
      var t0=null; function f(ts){ if(t0===null) t0=ts; var p=Math.min((ts-t0)/1200,1); e.textContent=Math.round(to*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(f); else e.textContent=to; }
      e.textContent=0; setTimeout(function(){ requestAnimationFrame(f); },500);
    });
  }

  /* Open view `id`, growing from point `from` (defaults to its tile) */
  function go(id,from,viaHistory){
    if(ORDER.indexOf(id)<0||id===cur) return;
    var v=$('#v-'+id), o=from||tileCenter(id), tk=++token;
    buzz(cur?'viewStep':'viewOpen');
    if(!viaHistory) hist(cur?'replaceState':'pushState',id);
    stopAnims(v); v.hidden=false; v.style.zIndex=++z; v.classList.remove('play'); void v.offsetWidth; v.classList.add('play');
    $('.vbody',v).scrollTop=0; cur=id; document.title=NAMES[id]+' · Dylan Gorrah';
    announce(id);
    var done=function(){ if(tk!==token) return; $$('.view').forEach(function(x){ if(x!==v) hideNow(x); }); };
    if(!rm&&v.animate){ v.animate([{clipPath:clip(o,0)},{clipPath:clip(o,reach(o))}],{duration:S.motion.viewOpen.ms,easing:S.motion.viewOpen.css}).onfinish=done; } else done();
    var b=$('.back',v); if(b) b.focus({preventScroll:true});
    if(id==='stack'&&S.renderChips) S.renderChips();
    countUp(v);
  }

  /* Close the open view, shrinking back into its tile.
     From the UI (Back button, Esc) we step the browser history back instead, and the popstate
     handler below calls home(true), so the history and the screen always agree. */
  function home(viaHistory){
    if(!cur) return;
    if(!viaHistory){ if(history.state&&history.state.view){ history.back(); return; } hist('replaceState',null); }
    var id=cur, v=$('#v-'+id), o=tileCenter(id), t=$('.tile[data-go="'+id+'"]'), tk=++token;
    buzz('viewClose');
    cur=null; document.title='Dylan Gorrah | Software Developer & QA Tester, Bloemfontein';
    announce(null);
    var done=function(){ if(tk!==token) return; hideNow(v); if(t) t.focus({preventScroll:true}); };
    if(!rm&&v.animate){ v.animate([{clipPath:clip(o,reach(o))},{clipPath:clip(o,0)}],{duration:S.motion.viewClose.ms,easing:S.motion.viewClose.css,fill:'forwards'}).onfinish=done; } else done();
  }

  $$('.tile').forEach(function(t){ t.addEventListener('click',function(){ go(t.dataset.go,center(t)); }); });
  document.addEventListener('keydown',function(e){
    if(!cur) return;
    if(e.key==='Escape'){ home(); }
    else if(e.key==='ArrowRight'){ step(1); }
    else if(e.key==='ArrowLeft'){ step(-1); }
  });

  /* Browser Back/Forward (and editing the #address by hand) */
  window.addEventListener('popstate',function(){
    var id=location.hash.slice(1);
    if(ORDER.indexOf(id)>=0) go(id,null,true); else home(true);
  });
  /* Opened from a link like site/#projects: put "home" underneath it in the history, then open the view,
     so Back lands on home instead of leaving the site. */
  var start=location.hash.slice(1);
  if(ORDER.indexOf(start)>=0){ hist('replaceState',null); hist('pushState',start); go(start,null,true); }

  /* Swipe sideways on a phone to move between views */
  var sx=0, sy=0, st=0;
  document.addEventListener('pointerdown',function(e){ if(e.pointerType==='touch'&&cur&&e.target.closest('.view')){ sx=e.clientX; sy=e.clientY; st=Date.now(); } else { st=0; } });
  document.addEventListener('pointerup',function(e){
    if(!st||!cur||e.pointerType!=='touch') return;
    var dx=e.clientX-sx, dy=e.clientY-sy;
    if(Math.abs(dx)>90&&Math.abs(dy)<45&&Date.now()-st<600&&!e.target.closest('.fil')){
      var d=dx<0?1:-1, i=ORDER.indexOf(cur);
      go(ORDER[(i+d+ORDER.length)%ORDER.length],{x:d>0?innerWidth:0,y:innerHeight/2});
    }
    st=0;
  });
})(window.Site);
