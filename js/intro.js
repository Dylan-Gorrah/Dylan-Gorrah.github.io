/* intro.js: the "blueprint plotter" loading animation on the home screen.
   A pencil-grey pen traces the outline of each block in turn (ticker, top bar, cards, tiles, footer), then the
   block inks in and the outline fades. Big cards get a size label that counts up as the line draws.
   Only runs when the inline script in <head> added html.intro (skipped for reduced motion, #links and
   after the first time in a browser tab).
   Loaded straight after the home markup, BEFORE the other scripts, so it starts as soon as the page
   can be measured instead of waiting for every script to download. So it can't use Site.$ etc.
   Styles: css/intro.css · Docs: Doc/Elements/Intro Animation.md */
(function(){
  var root=document.documentElement; if(!root.classList.contains('intro')) return;
  var S=window.Site=window.Site||{};
  try{ sessionStorage.setItem('introSeen','1'); }catch(e){}

  /* Snappy on slow phones: if the page took a while to get here, play the whole thing faster;
     if it was very slow, skip it and just show the page. */
  var late=performance.now(), speed=late>2200?0:late>1100?.55:1;
  function done(){ root.classList.add('intro-done'); }
  if(!speed){ done(); return; }
  S.introLag=Math.round(520*speed);   /* js/radar.js waits this much longer, so the graph grows once its card has inked in */

  var NS='http://www.w3.org/2000/svg', FADE=360*speed, SAMPLES=40;
  /* The sequence: [selector, outline kind, start ms, draw ms, size label?]. Tiles follow each other 60ms apart. */
  var plan=[
    ['.ticker','box',0,420],
    ['.topbar','under',140,380],
    ['.left','box',240,640,true],
    ['.tech-card','box',360,640,true],
    ['.tile','box',560,360],
    ['.bottom','over',1000,380]
  ], steps=[];
  plan.forEach(function(p){
    var els=document.querySelectorAll(p[0]);
    for(var i=0;i<els.length;i++) steps.push({el:els[i],kind:p[1],at:(p[2]+i*60)*speed,dur:p[3]*speed,label:!!p[4]});
  });

  /* rounded rectangle as one path, starting at the top-left and going clockwise */
  function rr(x,y,w,h,r){
    return 'M'+(x+r)+','+y+'H'+(x+w-r)+'A'+r+','+r+' 0 0 1 '+(x+w)+','+(y+r)+'V'+(y+h-r)+'A'+r+','+r+' 0 0 1 '+(x+w-r)+','+(y+h)+
      'H'+(x+r)+'A'+r+','+r+' 0 0 1 '+x+','+(y+h-r)+'V'+(y+r)+'A'+r+','+r+' 0 0 1 '+(x+r)+','+y+'Z';
  }
  function el(tag,cls,parent){ var e=document.createElementNS(NS,tag); if(cls) e.setAttribute('class',cls); parent.appendChild(e); return e; }
  /* set the size tag's text and size its paper backing to fit */
  function tag(s,txt){ if(s.tag.textContent===txt) return; s.tag.textContent=txt; s.tagBg.setAttribute('width',txt.length*6.1+8); }
  function ease(p){ return p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2; }

  function start(){
    var svg=el('svg','ink-layer',document.body); svg.setAttribute('aria-hidden','true');
    steps.forEach(function(s){
      var b=s.el.getBoundingClientRect();
      /* Hidden blocks sit lower (the 8px lift of inkIn in css/animations.css). Measure where they will
         END UP, not where they wait, or every outline lands 8px too low and cuts across its neighbours. */
      var tr=(getComputedStyle(s.el).translate||'').split(' '), tx=parseFloat(tr[0])||0, ty=parseFloat(tr[1])||0;
      var r={left:b.left-tx,top:b.top-ty,right:b.right-tx,bottom:b.bottom-ty,width:b.width,height:b.height};
      if(!r.width||!r.height||r.bottom<0||r.top>innerHeight){ s.skip=true; return; }   /* hidden or off-screen: just ink in */
      var d, rad=0;
      if(s.kind==='box'){
        rad=Math.min(parseFloat(getComputedStyle(s.el).borderTopLeftRadius)||0,r.width/2,r.height/2);
        d=rr(r.left+.5,r.top+.5,r.width-1,r.height-1,Math.max(rad-.5,0));
      } else { var y=s.kind==='under'?r.bottom-.5:r.top+.5; d='M'+r.left+','+y+'H'+r.right; }
      s.path=el('path','',svg); s.path.setAttribute('d',d);
      s.len=s.path.getTotalLength(); s.path.style.strokeDasharray=s.len; s.path.style.strokeDashoffset=s.len;
      /* the pen's route, measured once up front (asking the path every frame is slow on phones) */
      s.pts=[]; for(var k=0;k<=SAMPLES;k++){ var q=s.path.getPointAtLength(s.len*k/SAMPLES); s.pts.push(q.x,q.y); }
      /* pen tip: a soft halo + a solid dot (two circles are far cheaper than a CSS glow filter) */
      s.pen=el('g','ink-pen',svg); el('circle','halo',s.pen).setAttribute('r',7); el('circle','',s.pen).setAttribute('r',2.6); s.pen.setAttribute('transform','translate(-50,-50)');   /* off-screen until its turn */
      if(s.label){ s.w=Math.round(r.width); s.h=Math.round(r.height);
        /* size tag sits ON the top edge, just past the corner, with a paper-coloured backing that
           breaks the line (like a dimension on a technical drawing), so no other line runs through it */
        s.text=el('g','ink-dim',svg); s.text.setAttribute('transform','translate('+(r.left+rad+10)+','+r.top+')');
        s.tagBg=el('rect','',s.text); s.tagBg.setAttribute('x',-5); s.tagBg.setAttribute('y',-7); s.tagBg.setAttribute('height',14); s.tagBg.setAttribute('rx',3);
        s.tag=el('text','',s.text); s.tag.setAttribute('y',3.2); }
    });

    var t0=performance.now();
    requestAnimationFrame(function frame(now){
      var t=now-t0, live=false;
      steps.forEach(function(s){
        if(s.over) return;
        var p=(t-s.at)/s.dur;
        if(!s.inked&&(s.skip?p>=0:p>=.9)){ s.el.classList.add('inked'); s.inked=true; }
        if(s.skip){ if(p<0) live=true; else s.over=true; return; }
        live=true;
        if(p<=0) return;
        if(p<1){
          var e=ease(p), f=e*SAMPLES, k=Math.min(f|0,SAMPLES-1), m=f-k, P=s.pts;
          s.path.style.strokeDashoffset=s.len*(1-e);
          s.pen.setAttribute('transform','translate('+(P[2*k]+(P[2*k+2]-P[2*k])*m)+','+(P[2*k+1]+(P[2*k+3]-P[2*k+1])*m)+')');
          if(s.text) tag(s,Math.round(s.w*e)+' × '+Math.round(s.h*e));
        } else if(!s.closed){
          /* outline finished: snap it shut, drop the pen, and let CSS fade the outline + label away */
          s.closed=true; s.path.style.strokeDashoffset=0; s.pen.remove();
          if(s.text) tag(s,s.w+' × '+s.h);
          s.path.classList.add('fade'); if(s.text) s.text.classList.add('fade');
        } else if(t-s.at-s.dur>FADE) s.over=true;
      });
      if(live) requestAnimationFrame(frame); else { svg.remove(); done(); }
    });
  }
  root.style.setProperty('--ink-fade',FADE+'ms');
  requestAnimationFrame(start);
})();
