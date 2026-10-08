/* spotlight.js: feeds the mouse position to any element with class "spot" so its copper glow
   follows the pointer (the glow itself is in base.css). Docs: Doc/Elements/Spotlight Effect.md */
(function(){
  document.addEventListener('pointermove',function(e){
    if(e.pointerType==='touch') return;
    var s=e.target.closest&&e.target.closest('.spot'); if(!s) return;
    var r=s.getBoundingClientRect(); s.style.setProperty('--mx',(e.clientX-r.left)+'px'); s.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
})();
