/* cv-button.js: shows the floating liquid-glass Download CV button once the visitor has been idle
   on the home screen for IDLE ms. Once shown it stays until a view opens; going back home restarts
   the timer. Also builds the refraction map and moves the specular highlight.
   Docs: Doc/Elements/CV Button.md */
(function(S){
  var btn=S.$('#cvBtn'); if(!btn) return;
  var IDLE=5000, t=null, onHome=true;

  /* ---------- Idle timer ---------- */
  function show(){ if(onHome){ fitGlass(); btn.classList.add('show'); } }
  function hide(){ clearTimeout(t); btn.classList.remove('show'); }
  /* (Re)start the countdown. Any activity calls this, so the 5s only counts while idle. */
  function arm(){ clearTimeout(t); if(onHome&&!btn.classList.contains('show')) t=setTimeout(show,IDLE); }

  ['pointermove','pointerdown','keydown','wheel','touchstart'].forEach(function(e){ window.addEventListener(e,arm,{passive:true}); });
  window.addEventListener('scroll',arm,{passive:true,capture:true});
  /* views.js announces every view change: hide when a view opens, restart the timer when back home */
  document.addEventListener('site:view',function(e){ onHome=!e.detail.id; if(onHome) arm(); else hide(); });

  /* ---------- Liquid glass refraction (Chromium only) ----------
     Safari/Firefox draw NOTHING for backdrop-filter:url(), and @supports wrongly says yes,
     so detect Chromium directly; everyone else keeps the frosted fallback from the CSS. */
  var brands=navigator.userAgentData&&navigator.userAgentData.brands;
  var chromium=!!(brands&&brands.some(function(b){ return /Chromium/.test(b.brand); }));
  var map=document.getElementById('lg-map'), filter=document.getElementById('lg-cv'), lastW=0, lastH=0;

  /* Displacement map, drawn pixel by pixel to fit the button.
     Red = sideways shift, blue = up/down shift, 128 = no shift. The middle of the pill stays 128
     (clear glass); in a thin rim the shift ramps up, pointing out through the nearest edge. So the
     rim shows a squeezed view of what's just outside it: the thick-lens look of Apple's glass.
     (Drawn on a canvas rather than as an SVG because Chrome ignores blend modes inside feImage.) */
  var RIM=.38; /* rim width as a fraction of the button's height */
  function mapURL(w,h){
    var S=2, W=Math.round(w*S), H=Math.round(h*S), r=H/2, band=H*RIM;
    var cv=document.createElement('canvas'); cv.width=W; cv.height=H;
    var ctx=cv.getContext('2d'), img=ctx.createImageData(W,H), d=img.data;
    for(var y=0;y<H;y++) for(var x=0;x<W;x++){
      /* nearest point on the pill's centre line, then distance/direction to it */
      var cx=Math.min(Math.max(x+.5,r),W-r), dx=x+.5-cx, dy=y+.5-r, dist=Math.sqrt(dx*dx+dy*dy)||1;
      var depth=r-dist, k=depth<band?Math.pow(1-Math.max(depth,0)/band,2):0; /* 0 in the middle → 1 at the edge */
      var i=(y*W+x)*4;
      d[i]=128+127*k*dx/dist; d[i+1]=128; d[i+2]=128+127*k*dy/dist; d[i+3]=255;
    }
    ctx.putImageData(img,0,0);
    return cv.toDataURL();
  }
  function fitGlass(){
    if(!chromium||!map) return;
    var w=btn.offsetWidth, h=btn.offsetHeight; if(!w||!h||(w===lastW&&h===lastH)) return;
    lastW=w; lastH=h;
    map.setAttribute('href',mapURL(w,h)); map.setAttribute('width',w); map.setAttribute('height',h);
    /* filter region = exactly the button, so the map lines up with the glass */
    filter.setAttribute('filterUnits','userSpaceOnUse'); filter.setAttribute('x',0); filter.setAttribute('y',0); filter.setAttribute('width',w); filter.setAttribute('height',h);
    btn.classList.add('lg-refract');
  }
  fitGlass();
  var rz; window.addEventListener('resize',function(){ clearTimeout(rz); rz=setTimeout(fitGlass,200); });

  /* ---------- Specular highlight follows the pointer across the glass ---------- */
  btn.addEventListener('pointermove',function(e){
    var r=btn.getBoundingClientRect();
    btn.style.setProperty('--lx',(e.clientX-r.left)+'px'); btn.style.setProperty('--ly',(e.clientY-r.top)+'px');
  });
  btn.addEventListener('pointerleave',function(){ btn.style.setProperty('--lx','30%'); btn.style.setProperty('--ly','0%'); });

  arm();
})(window.Site);
