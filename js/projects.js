/* projects.js: Projects view accordion. Only one card open at a time; opening one scrolls it into view.
   Docs: Doc/Elements/Sections/Projects.md */
(function(S){
  var $=S.$, $$=S.$$, rm=S.rm;
  $$('.pc').forEach(function(pc){
    var h=$('.ph',pc);
    h.addEventListener('click',function(){
      var open=!pc.classList.contains('open');
      $$('.pc').forEach(function(o){ o.classList.remove('open'); $('.ph',o).setAttribute('aria-expanded','false'); });
      if(open){ pc.classList.add('open'); h.setAttribute('aria-expanded','true'); setTimeout(function(){ pc.scrollIntoView({block:'nearest',behavior:rm?'auto':'smooth'}); },60); }
    });
  });
})(window.Site);
