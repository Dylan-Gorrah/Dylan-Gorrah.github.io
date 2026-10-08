/* fullscreen.js: the full-screen toggle in the top bar (#fsBtn).
   Browsers only allow full screen after a click/tap, so this is a button, never automatic.
   The button stays hidden where it can't work (iPhone Safari) and when the site is already
   running as a home-screen app. Docs: Doc/Elements/Fullscreen & App Mode.md */
(function(S){
  var btn=S.$('#fsBtn'); if(!btn) return;
  var d=document, root=d.documentElement;
  var enabled=d.fullscreenEnabled||d.webkitFullscreenEnabled;
  var asApp=window.matchMedia&&(matchMedia('(display-mode: fullscreen)').matches||matchMedia('(display-mode: standalone)').matches||navigator.standalone);
  if(!enabled||asApp) return;   /* stays hidden */

  function isFull(){ return !!(d.fullscreenElement||d.webkitFullscreenElement); }
  function enter(){ var f=root.requestFullscreen||root.webkitRequestFullscreen; if(f){ var p=f.call(root); if(p&&p.catch) p.catch(function(){}); } }
  function exit(){ var f=d.exitFullscreen||d.webkitExitFullscreen; if(f){ var p=f.call(d); if(p&&p.catch) p.catch(function(){}); } }
  /* swap icon + label to match the current state */
  function sync(){
    var on=isFull();
    S.$('use',btn).setAttribute('href',on?'#i-shrink':'#i-expand');
    btn.setAttribute('aria-label',on?'Exit full screen':'Enter full screen');
    btn.title=on?'Exit full screen':'Full screen';
  }

  btn.hidden=false; sync();
  btn.addEventListener('click',function(){ isFull()?exit():enter(); });
  d.addEventListener('fullscreenchange',sync); d.addEventListener('webkitfullscreenchange',sync);
})(window.Site);
