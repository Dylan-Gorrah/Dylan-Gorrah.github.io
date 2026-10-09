/* radar.js: the "Overall stats" skill graph on home (radar chart, side bars, readout box).
   Scores come from Site.data.skills. Docs: Doc/Elements/Skill Graph.md */
(function(S){
  var $=S.$, rm=S.rm, SK=S.data.skills;
  var N=SK.length, C=200, RR=150, NS='http://www.w3.org/2000/svg';
  var svg=$('#radar'), chart=$('#chart'), stats2=$('#stats2'), read=$('#read');
  function pt(i,f){ var a=-Math.PI/2+i*2*Math.PI/N; return [C+Math.cos(a)*RR*f, C+Math.sin(a)*RR*f]; }
  function el(n,at){ var e=document.createElementNS(NS,n); for(var k in at) e.setAttribute(k,at[k]); svg.appendChild(e); return e; }

  /* Build: grid rings, spokes, filled area, dots, axis labels, side bar rows */
  [.25,.5,.75,1].forEach(function(f){ el('polygon',{'class':'rg',points:SK.map(function(_,i){return pt(i,f).join(',')}).join(' ')}); });
  SK.forEach(function(_,i){ var p=pt(i,1); el('line',{'class':'rs',x1:C,y1:C,x2:p[0],y2:p[1]}); });
  var area=el('polygon',{'class':'ra',points:''}), dots=SK.map(function(){ return el('circle',{'class':'rd',r:4.5,cx:C,cy:C}); });
  var labels=[], rows=[];
  SK.forEach(function(s,i){
    var lp=pt(i,1.2), b=document.createElement('button'); b.type='button'; b.className='al'; b.textContent=s.k;
    b.style.left=(lp[0]/4)+'%'; b.style.top=(lp[1]/4)+'%'; chart.appendChild(b); labels.push(b);
    var r=document.createElement('button'); r.type='button'; r.className='srow';
    r.innerHTML='<span>'+s.k+'</span><span class="sb"><i></i></span><span class="sv">'+s.v+'</span>'; stats2.appendChild(r); rows.push(r);
  });

  /* Grow the shape from the centre (p = 0..1) */
  function draw(p){
    var pts=SK.map(function(s,i){ return pt(i,s.v/100*p); });
    area.setAttribute('points',pts.map(function(q){return q.join(',')}).join(' '));
    pts.forEach(function(q,i){ dots[i].setAttribute('cx',q[0]); dots[i].setAttribute('cy',q[1]); });
  }
  function fillBars(){ rows.forEach(function(r,i){ $('i',r).style.width=SK[i].v+'%'; }); }
  var growing=0;
  function grow(){ var me=++growing, t0=null; (function f(ts){ if(me!==growing) return; if(t0===null) t0=ts; var p=Math.min((ts-t0)/1200,1); draw(1-Math.pow(1-p,3)); if(p<1) requestAnimationFrame(f); })(performance.now()); }
  if(rm){ draw(1); fillBars(); }
  else {
    draw(0);
    setTimeout(function(){ fillBars(); grow(); },450+(S.introLag||0));   /* introLag: wait for the loading animation (js/intro.js) */
  }

  /* Readout box. Every description is also laid out invisibly in the same spot (.ghost), so the
     box is always as tall as the LONGEST one at the current screen width. Switching skills then
     never changes its height, and nothing around it shifts. */
  read.innerHTML='';
  var sm=document.createElement('small'), rb=document.createElement('span'), live=document.createElement('b');
  rb.className='rb'; rb.appendChild(live);
  ['Hover or tap an axis'].concat(SK.map(function(s){ return s.d; })).forEach(function(t){
    var g=document.createElement('b'); g.className='ghost'; g.setAttribute('aria-hidden','true'); g.textContent=t; rb.appendChild(g);
  });
  read.appendChild(sm); read.appendChild(rb);

  /* Highlight one axis (label + bar + dot) and show its tools in the readout */
  var hold=false, idx=-1, holdT;
  function setHot(i){
    labels.forEach(function(l,k){ l.classList.toggle('on',k===i); });
    rows.forEach(function(r,k){ r.classList.toggle('on',k===i); });
    dots.forEach(function(d,k){ d.setAttribute('class','rd'+(k===i?' on':'')); });
    if(i<0){ sm.textContent='Overall stats'; live.textContent='Hover or tap an axis'; }
    else { sm.textContent=SK[i].k+' · '+SK[i].v+' / 100'; live.textContent=SK[i].d; }
  }
  labels.concat(rows).forEach(function(n,j){
    var i=j%N;
    n.addEventListener('mouseenter',function(){ hold=true; idx=i; setHot(i); });
    n.addEventListener('mouseleave',function(){ hold=false; });
    n.addEventListener('click',function(){ hold=true; idx=i; setHot(i); clearTimeout(holdT); holdT=setTimeout(function(){hold=false;},5000); });
  });
  setHot(0); idx=0;
  /* Auto-cycle every 2.4s, paused while hovered, while the tab is hidden, or while a view is open */
  if(!rm){ setInterval(function(){ if(hold||document.hidden||$('.view:not([hidden])')) return; idx=(idx+1)%N; setHot(idx); },2400); }

  /* ---------- Phones: bars and radar as two swipeable slides ----------
     Slide 0 = the bars (shown first), slide 1 = the radar. The readout box stays underneath both.
     Swipe sideways or tap a dot to switch; it also moves on by itself every AUTO ms, and holds still
     for PAUSE ms after you touch it. Layout is in css/responsive.css (the .pg rules for phones). */
  var AUTO=4500, PAUSE=9000;
  var pg=$('.pg'), phone=matchMedia('(max-width:680px)'), slide=0, pauseUntil=0;
  var nav=document.createElement('div'); nav.className='pg-dots'; nav.setAttribute('role','tablist'); nav.setAttribute('aria-label','Skill graph view');
  var navB=['Bars','Radar'].map(function(name,i){
    var b=document.createElement('button'); b.type='button'; b.setAttribute('role','tab'); b.setAttribute('aria-label',name+' view');
    b.addEventListener('click',function(){ pauseUntil=Date.now()+PAUSE; show(i); }); nav.appendChild(b); return b;
  });
  $('.tech-head').appendChild(nav);
  function show(i,quiet){
    var changed=i!==slide; slide=i; pg.classList.toggle('s1',i===1);
    navB.forEach(function(b,k){ b.setAttribute('aria-selected',k===i); });
    if(!changed||quiet||rm) return;
    /* replay the slide's own grow animation as it comes in */
    if(i===0){ rows.forEach(function(r){ $('i',r).style.transition='none'; $('i',r).style.width='0'; }); pg.offsetWidth;
      rows.forEach(function(r){ $('i',r).style.transition=''; }); fillBars(); }
    else { draw(0); grow(); }
  }
  show(0,true);
  if(!rm) setInterval(function(){
    if(!phone.matches||dragging||document.hidden||Date.now()<pauseUntil||$('.view:not([hidden])')) return;
    show(1-slide);
  },AUTO);

  /* Swipe: follow the finger while dragging, then settle on a slide. Vertical moves are left to the
     browser (touch-action:pan-y in the CSS), so the page still scrolls normally. */
  var sx=0, sy=0, dx=0, down=false, dragging=false, justDragged=false, parts=[$('.stats2'),chart];
  pg.addEventListener('pointerdown',function(e){ if(!phone.matches||e.button>0) return; down=true; dragging=false; sx=e.clientX; sy=e.clientY; dx=0; });
  pg.addEventListener('pointermove',function(e){
    if(!down) return;
    dx=e.clientX-sx; var dy=e.clientY-sy;
    if(!dragging){ if(Math.abs(dx)<10||Math.abs(dx)<Math.abs(dy)) return; dragging=true; pg.classList.add('drag'); try{ pg.setPointerCapture(e.pointerId); }catch(_){} }
    /* resist past the first/last slide */
    var d=(slide===0&&dx>0)||(slide===1&&dx<0)?dx/3:dx, W=innerWidth;
    parts[0].style.translate=(slide?-W:0)+d+'px 0'; parts[1].style.translate=(slide?0:W)+d+'px 0';
  });
  function end(){
    if(!down) return; down=false;
    if(!dragging) return;
    dragging=false; justDragged=true; setTimeout(function(){ justDragged=false; },350);
    pg.classList.remove('drag'); parts.forEach(function(p){ p.style.translate=''; });
    pauseUntil=Date.now()+PAUSE;
    if(dx<-40&&slide===0) show(1); else if(dx>40&&slide===1) show(0);
  }
  pg.addEventListener('pointerup',end); pg.addEventListener('pointercancel',end);
  /* a drag shouldn't also count as tapping the bar or axis label it started on */
  pg.addEventListener('click',function(e){ if(justDragged){ e.stopPropagation(); e.preventDefault(); } },true);
})(window.Site);
