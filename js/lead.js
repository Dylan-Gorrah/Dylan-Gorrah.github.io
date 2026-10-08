/* lead.js: on phones the intro shows one short line + a "…" button. Tapping it smoothly grows the
   paragraph to the full text (and the button becomes "less"); tapping again shrinks it back.
   Desktop never shows the button. Docs: Doc/Elements/Profile Card.md */
(function(S){
  var lead=S.$('#lead'), more=lead&&S.$('.lead-more',lead); if(!more) return;
  more.addEventListener('click',function(){
    var h0=lead.offsetHeight, open=!lead.classList.contains('open');
    lead.classList.toggle('open',open);
    more.textContent=open?'less':'…';
    more.setAttribute('aria-expanded',open?'true':'false');
    more.setAttribute('aria-label',open?'Show less':'Read more');
    if(S.haptics) S.haptics.play('tap');
    /* animate from the old height to the new one with the site's easing (the cards below follow along) */
    var h1=lead.offsetHeight;
    if(!S.rm&&lead.animate&&h0!==h1) lead.animate([{height:h0+'px'},{height:h1+'px'}],{duration:450,easing:'cubic-bezier(.2,.7,.2,1)'});
  });
})(window.Site);
