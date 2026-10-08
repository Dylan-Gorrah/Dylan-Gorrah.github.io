/* utils.js: shared helpers. Loaded FIRST; every other script reads from window.Site.
   Docs: Doc/Elements/JavaScript Structure.md */
window.Site = window.Site || {};
(function(S){
  S.$=function(s,r){return (r||document).querySelector(s)};
  S.$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  /* true when the visitor asked their OS for less motion: scripts skip animations */
  S.rm=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
})(window.Site);
