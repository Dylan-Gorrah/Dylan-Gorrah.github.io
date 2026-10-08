/* haptics.js: phone vibration "ticks" timed to the site's animations. Site.haptics.play(name).
   Docs: Doc/Elements/Haptics.md

   How each platform gets it:
   - Android (Chrome etc.): navigator.vibrate() with an on/off pattern, so the whole rhythm plays.
   - iPhone: Safari has no vibrate(). Instead, flipping an <input type="checkbox" switch> plays the
     system haptic tick. iOS 17.4–26.4 let scripts flip a hidden one, so the full rhythm plays.
     iOS 26.5+ only ticks on a real finger tap ON a switch, and iOS draws switches even at
     opacity 0 (a slider showed up next to the name), so there are no tap overlays: those
     iPhones simply get no haptics.
   - Desktop: nothing. */
window.Site = window.Site || {};
(function(S){
  /* ---------- The wheel ----------
     A section opening should feel like a wheel spinning through detents until the motion stops.
     The gap between ticks follows the animation's SPEED at that moment, read from its own easing
     curve (Site.motion in utils.js): while the circle grows fast the ticks come close together, and
     as it slows they spread out, like a wheel winding down, until a firmer "click" the moment it
     stops. Closing (ease-in) runs the other way: slow and sparse, then quickening into the tile.
     Rules from Android's haptic guidelines: ticks are crisp (10-20ms) and never closer than GAP,
     because the motor keeps ringing 20-50ms after each pulse and closer ticks smear into a buzz.
     MAXGAP keeps the wheel turning (no dead air) right up to the stop.
     (Pulse lengths only matter on Android; iPhone ticks are all the same.) */
  var GAP=45, MAXGAP=130;
  /* progress (0-1) of a cubic-bezier easing at time x (0-1) */
  function ease(e,x){
    var lo=0, hi=1, s=.5;
    for(var i=0;i<28;i++){ s=(lo+hi)/2; var bx=3*e[0]*s*(1-s)*(1-s)+3*e[2]*s*s*(1-s)+s*s*s; if(bx<x) lo=s; else hi=s; }
    return 3*e[1]*s*(1-s)*(1-s)+3*e[3]*s*s*(1-s)+s*s*s;
  }
  function speed(e,x){ var h=.01, a=Math.max(0,x-h), b=Math.min(1,x+h); return (ease(e,b)-ease(e,a))/(b-a); }
  /* m = a Site.motion entry; gap/maxGap = closest / widest tick spacing; tap = first pulse length */
  function wheel(m,gap,maxGap,tap){
    var peak=0; for(var x=0;x<=1;x+=.02) peak=Math.max(peak,speed(m.ease,x));
    var out=[[0,tap]], t=0;
    while(true){
      /* spacing from the speed in the MIDDLE of the coming gap (read once, then refined) */
      var f=function(x){ var v=speed(m.ease,Math.min(1,x/m.ms))||.0001; return Math.min(maxGap,Math.max(gap,gap*peak/v)); };
      var step=f(t+f(t)/2);
      t+=step;
      if(m.ms-t<gap){ break; }                        /* too close to the end: let the final click take it */
      var p=t/m.ms; out.push([Math.round(t),Math.round(9+4*p)]);   /* pulses ramp 9 → 13ms toward the snap */
    }
    /* a slowing wheel never speeds up at the end: if the final click would come much sooner than
       the last gap, drop the last notch so the spacing keeps widening into the stop */
    var n=out.length;
    if(speed(m.ease,1)<speed(m.ease,0)&&n>2&&(m.ms-out[n-1][0])<.8*(out[n-1][0]-out[n-2][0])) out.pop();
    out.push([m.ms,18]);                              /* the click as it settles, exactly when the motion stops */
    return out;
  }

  /* ---------- Patterns: [time in ms after the tap, pulse length in ms (Android only)] ---------- */
  var M=S.motion||{};
  var P={
    tap:      [[0,12]],
    viewOpen: M.viewOpen ? wheel(M.viewOpen,GAP,MAXGAP,14) : [[0,12]],   /* tile → view: the full wheel */
    viewStep: M.viewOpen ? wheel(M.viewOpen,70,180,10) : [[0,10]],    /* prev/next/swipe: same motion, fewer notches (it's frequent) */
    viewClose:M.viewClose? wheel(M.viewClose,GAP,MAXGAP,10) : [[0,10]], /* view → home: winds in, clicks shut */
    popOpen:  M.popOpen  ? wheel(M.popOpen,GAP,MAXGAP,14)  : [[0,12]],  /* avatar → profile card */
    popClose: M.popClose ? wheel(M.popClose,GAP,MAXGAP,10) : [[0,10]]   /* card → avatar */
  };

  var ua=navigator.userAgent;
  var isIOS=/iP(hone|ad|od)/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);
  var iosSwitch=isIOS&&('switch' in document.createElement('input'));          /* Safari 17.4+ */
  var canVibrate=!isIOS&&typeof navigator.vibrate==='function';
  var timers=[];

  /* iPhone: one hidden switch + label. Clicking the label flips the switch = one tick. */
  var label=null;
  if(iosSwitch){
    var box=document.createElement('div'), sw=document.createElement('input');
    box.setAttribute('aria-hidden','true');
    /* clip-path hides it for real: iOS ignores opacity on native switches */
    box.style.cssText='position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden;clip-path:inset(50%)';
    sw.type='checkbox'; sw.setAttribute('switch',''); sw.id='hx-sw'; sw.tabIndex=-1;
    label=document.createElement('label'); label.htmlFor='hx-sw';
    box.appendChild(sw); box.appendChild(label);
    (document.body||document.documentElement).appendChild(box);
  }
  function iosTick(){ try{ label.click(); }catch(e){} }

  /* [[t,len],...] → navigator.vibrate's [on, off, on, off, ...] */
  function toVibrate(p){
    var out=[], at=0;
    p.forEach(function(s,i){ if(i>0) out.push(Math.max(0,s[0]-at)); out.push(s[1]); at=s[0]+s[1]; });
    return out;
  }
  function cancel(){ timers.forEach(clearTimeout); timers=[]; }

  function play(name){
    var p=P[name]; if(!p) return;
    cancel();
    if(S.rm) p=[p[0]];                      /* reduced motion: no rhythm to follow, just the tap */
    if(canVibrate){ try{ navigator.vibrate(toVibrate(p)); }catch(e){} return; }
    if(iosSwitch){
      p.forEach(function(s){
        if(s[0]===0) iosTick(); else timers.push(setTimeout(iosTick,s[0]));
      });
    }
  }

  S.haptics={play:play, cancel:cancel, ios:iosSwitch, patterns:P};
})(window.Site);
