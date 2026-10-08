/* utils.js: shared helpers. Loaded FIRST; every other script reads from window.Site.
   Docs: Doc/Elements/JavaScript Structure.md */
window.Site = window.Site || {};
(function(S){
  S.$=function(s,r){return (r||document).querySelector(s)};
  S.$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  /* true when the visitor asked their OS for less motion: scripts skip animations */
  S.rm=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
  /* The big "grow / shrink" motions, in ONE place. views.js and profile-pop.js animate with these,
     and haptics.js builds its wheel ticks from the same numbers, so motion and feel never drift apart.
     ease = cubic-bezier control points. */
  function m(ms,e){ return {ms:ms, ease:e, css:'cubic-bezier('+e.join(',')+')'}; }
  S.motion={
    viewOpen: m(560,[.2,.7,.2,1]),   /* view grows out of its tile: fast, then settles */
    viewClose:m(420,[.5,0,.8,.4]),   /* view shrinks into its tile: slow, then quickens */
    popOpen:  m(520,[.2,.7,.2,1]),   /* profile card grows out of the avatar */
    popClose: m(380,[.5,0,.8,.4])    /* profile card shrinks back into the avatar */
  };
})(window.Site);
