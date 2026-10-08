/* profile-pop.js: the phone avatar (#meOpen) opens a quick-summary card (#mePop) that grows out of
   it as a circle, like the views do. Closes with ×, a tap outside, Esc or the browser/phone Back button;
   focus stays inside while open.
   Docs: Doc/Elements/Profile Popup.md */
(function(S){
  var $=S.$, $$=S.$$, rm=S.rm;
  var btn=$('#meOpen'), pop=$('#mePop'); if(!btn||!pop) return;
  var isOpen=false, token=0;
  /* stagger index for the rows' rise-in (the invisible haptic switch .hx-tap doesn't count) */
  $$('.me-card > :not(.hx-tap)',pop).forEach(function(e,i){ e.style.setProperty('--i',i); });
  /* vibration ticks timed to these animations (js/haptics.js); tapped = finger hit a native switch overlay */
  function buzz(name,tapped){ if(S.haptics) S.haptics.play(name,{tapped:!!tapped}); }
  var uiClose=false;

  function origin(){ var r=btn.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }
  function clip(o,r){ return 'circle('+r+'px at '+o.x+'px '+o.y+'px)'; }
  var card=$('.me-card',pop);
  function stopAnims(){ if(card.getAnimations) card.getAnimations().forEach(function(a){ a.cancel(); }); }
  /* The circle is drawn in the CARD's own coordinates, starting at the avatar and reaching its far corner */
  function cardClip(){
    var o=origin(), r=card.getBoundingClientRect(), p={x:o.x-r.left,y:o.y-r.top};
    return {p:p, far:Math.hypot(Math.max(p.x,r.width-p.x),Math.max(p.y,r.height-p.y))+6};
  }

  /* Two layers move separately: the background blurs in/out (CSS transition on .on, see
     profile-pop.css) while the card grows out of / shrinks back into the avatar. */
  function open(tapped){
    if(isOpen) return; isOpen=true; ++token;
    buzz('popOpen',tapped);      /* tap, then a tick as each row rolls in */
    try{ history.pushState({pop:1},''); }catch(e){}   /* so the phone's Back gesture closes the card */
    stopAnims(); pop.hidden=false; pop.classList.remove('play','on'); void pop.offsetWidth; pop.classList.add('play','on');
    btn.setAttribute('aria-expanded','true');
    if(!rm&&card.animate){ var c=cardClip(); card.animate([{clipPath:clip(c.p,0)},{clipPath:clip(c.p,c.far)}],{duration:520,easing:'cubic-bezier(.2,.7,.2,1)'}); }
    $('.me-x',pop).focus({preventScroll:true});
  }
  function close(viaHistory,tapped){
    if(!isOpen) return;
    /* closed from the UI: buzz now, then step history back; the popstate handler below calls close(true) */
    if(!viaHistory){ buzz('popClose',tapped); if(history.state&&history.state.pop){ uiClose=true; history.back(); return; } }
    else if(!uiClose) buzz('popClose');   /* closed by the phone's Back gesture */
    uiClose=false;
    isOpen=false; var tk=++token;
    btn.setAttribute('aria-expanded','false');
    pop.classList.remove('on');   /* starts the background un-blurring (0.5s) */
    var done=function(){ if(tk!==token) return; stopAnims(); pop.hidden=true; pop.classList.remove('play'); btn.focus({preventScroll:true}); };
    if(rm){ done(); return; }
    if(card.animate){ var c=cardClip(); card.animate([{clipPath:clip(c.p,c.far)},{clipPath:clip(c.p,0)}],{duration:380,easing:'cubic-bezier(.5,0,.8,.4)',fill:'forwards'}); }
    setTimeout(done,500);         /* hide once the blur has fully faded */
  }

  btn.addEventListener('click',function(){ open(false); });
  /* iPhone: taps land on the invisible native switches (tick!), which then drive the popup */
  var hxA=$('.hx-avatar'), hxX=$('.hx-x',pop);
  if(hxA) hxA.addEventListener('click',function(){ open(true); });
  if(hxX) hxX.addEventListener('click',function(){ close(false,true); });
  window.addEventListener('popstate',function(){ if(isOpen&&!(history.state&&history.state.pop)) close(true); });
  $$('[data-close]',pop).forEach(function(e){ e.addEventListener('click',function(){ close(); }); });
  document.addEventListener('keydown',function(e){
    if(!isOpen) return;
    if(e.key==='Escape'){ close(); return; }
    /* keep Tab inside the card */
    if(e.key==='Tab'){
      var f=$$('button,a[href]',pop), first=f[0], last=f[f.length-1];
      if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  });
  btn.setAttribute('aria-expanded','false');
})(window.Site);
