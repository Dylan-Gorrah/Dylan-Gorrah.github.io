/* profile-pop.js: the phone avatar (#meOpen) opens a quick-summary card (#mePop) that grows out of
   it as a circle, like the views do. Closes with ×, a tap outside, Esc or the browser/phone Back button;
   focus stays inside while open.
   Docs: Doc/Elements/Profile Popup.md */
(function(S){
  var $=S.$, $$=S.$$, rm=S.rm;
  var btn=$('#meOpen'), pop=$('#mePop'); if(!btn||!pop) return;
  var isOpen=false, token=0;
  $$('.me-card > *',pop).forEach(function(e,i){ e.style.setProperty('--i',i); });
  /* vibration ticks timed to these animations (js/haptics.js) */
  function buzz(name){ if(S.haptics) S.haptics.play(name); }
  var uiClose=false;

  /* what was tapped to open it: the phone avatar, or the big photo on tablets. The card grows out
     of it, shrinks back into it, and focus returns to it. */
  var opener=btn;
  function origin(){ var r=opener.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }
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
  function open(from){
    if(!isOpen) opener=(from&&from.nodeType===1)?from:btn;
    if(isOpen) return; isOpen=true; ++token;
    buzz('popOpen');      /* tap, then a tick as each row rolls in */
    try{ history.pushState({pop:1},''); }catch(e){}   /* so the phone's Back gesture closes the card */
    stopAnims(); pop.hidden=false; pop.classList.remove('play','on'); void pop.offsetWidth; pop.classList.add('play','on');
    btn.setAttribute('aria-expanded','true');
    if(!rm&&card.animate){ var c=cardClip(); card.animate([{clipPath:clip(c.p,0)},{clipPath:clip(c.p,c.far)}],{duration:S.motion.popOpen.ms,easing:S.motion.popOpen.css}); }
    $('.me-x',pop).focus({preventScroll:true});
  }
  function close(viaHistory){
    if(!isOpen) return;
    /* closed from the UI: buzz now, then step history back; the popstate handler below calls close(true) */
    if(!viaHistory){ buzz('popClose'); if(history.state&&history.state.pop){ uiClose=true; history.back(); return; } }
    else if(!uiClose) buzz('popClose');   /* closed by the phone's Back gesture */
    uiClose=false;
    isOpen=false; var tk=++token;
    btn.setAttribute('aria-expanded','false');
    pop.classList.remove('on');   /* starts the background un-blurring (0.5s) */
    var done=function(){ if(tk!==token) return; stopAnims(); pop.hidden=true; pop.classList.remove('play'); opener.focus({preventScroll:true}); };
    if(rm){ done(); return; }
    if(card.animate){ var c=cardClip(); card.animate([{clipPath:clip(c.p,c.far)},{clipPath:clip(c.p,0)}],{duration:S.motion.popClose.ms,easing:S.motion.popClose.css,fill:'forwards'}); }
    setTimeout(done,500);         /* hide once the blur has fully faded */
  }

  btn.addEventListener('click',function(){ open(btn); });

  /* Tablets and computers: clicking/tapping the big profile photo opens the summary too
     (computers still get the hover zoom from css/home.css first). Phones use the avatar above. */
  var photo=$('.photo');
  if(photo){
    photo.setAttribute('role','button'); photo.tabIndex=0;
    photo.setAttribute('aria-label','Quick summary about Dylan'); photo.setAttribute('aria-haspopup','dialog');
    photo.addEventListener('click',function(){ open(photo); });
    photo.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(photo); } });
  }
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
