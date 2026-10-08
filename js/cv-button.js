/* cv-button.js: shows the small Download CV button once the visitor has been idle
   on the home screen for IDLE ms. Once shown it stays until a view opens; going back home restarts
   the timer.
   Docs: Doc/Elements/CV Button.md */
(function(S){
  var btn=S.$('#cvBtn'); if(!btn) return;
  var IDLE=5000, t=null, onHome=true;

  /* ---------- Idle timer ---------- */
  function show(){ if(onHome) btn.classList.add('show'); }
  function hide(){ clearTimeout(t); btn.classList.remove('show'); }
  /* (Re)start the countdown. Any activity calls this, so the 5s only counts while idle. */
  function arm(){ clearTimeout(t); if(onHome&&!btn.classList.contains('show')) t=setTimeout(show,IDLE); }

  ['pointermove','pointerdown','keydown','wheel','touchstart'].forEach(function(e){ window.addEventListener(e,arm,{passive:true}); });
  window.addEventListener('scroll',arm,{passive:true,capture:true});
  /* views.js announces every view change: hide when a view opens, restart the timer when back home */
  document.addEventListener('site:view',function(e){ onHome=!e.detail.id; if(onHome) arm(); else hide(); });

  arm();
})(window.Site);
