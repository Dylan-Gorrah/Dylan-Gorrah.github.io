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
  if(rm){ draw(1); rows.forEach(function(r,i){ $('i',r).style.width=SK[i].v+'%'; }); }
  else {
    draw(0);
    setTimeout(function(){
      rows.forEach(function(r,i){ $('i',r).style.width=SK[i].v+'%'; });
      var t0=null; (function f(ts){ if(t0===null) t0=ts; var p=Math.min((ts-t0)/1200,1); draw(1-Math.pow(1-p,3)); if(p<1) requestAnimationFrame(f); })(performance.now());
    },450+(S.introLag||0));   /* introLag: wait for the loading animation (js/intro.js) */
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
})(window.Site);
