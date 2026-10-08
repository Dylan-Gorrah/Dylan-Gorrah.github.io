/* haptics.js: phone vibration "ticks" timed to the site's animations. Site.haptics.play(name).
   Docs: Doc/Elements/Haptics.md

   How each platform gets it:
   - Android (Chrome etc.): navigator.vibrate() with an on/off pattern, so the whole rhythm plays.
   - iPhone: Safari has no vibrate(). Instead, flipping an <input type="checkbox" switch> plays the
     system haptic tick. iOS 17.4–26.4 let scripts flip a hidden one, so the full rhythm plays.
     iOS 26.5+ only ticks on a REAL finger tap on the switch, so invisible native switches sit on
     top of the profile avatar and the popup's × (.hx-tap in index.html), which give the tap tick;
     later ticks in a pattern are silently skipped there.
   - Desktop: nothing. */
window.Site = window.Site || {};
(function(S){
  /* ---------- Patterns: [time in ms after the tap, buzz length in ms (Android only)] ----------
     Times are matched to the CSS/JS animations, so the feel follows the motion. */
  var P={
    tap:      [[0,12]],
    /* Profile popup opening (profile-pop.css): the card's rows rise one by one, starting at
       180ms and 55ms apart (.me-card>* animation-delay), so a light tick lands as each row "rolls" in. */
    popOpen:  [[0,14],[180,9],[235,9],[290,8],[345,8],[400,8],[455,8],[510,8],[565,8]],
    /* Popup closing: tap, then a firmer tick as the card docks back into the avatar (380ms) */
    popClose: [[0,10],[380,14]],
    /* Views (views.js): tile tap, then a tick when the circle finishes growing (560ms) */
    viewOpen: [[0,10],[560,9]],
    /* Prev/next/swipe between views */
    viewStep: [[0,8]],
    /* Back home: tap, then a tick as the view shrinks into its tile (420ms) */
    viewClose:[[0,8],[420,12]]
  };

  var ua=navigator.userAgent;
  var isIOS=/iP(hone|ad|od)/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);
  var iosSwitch=isIOS&&('switch' in document.createElement('input'));          /* Safari 17.4+ */
  var canVibrate=!isIOS&&typeof navigator.vibrate==='function';
  var timers=[];

  /* iPhone: one hidden switch + label. Clicking the label flips the switch = one tick. */
  var label=null;
  if(iosSwitch){
    document.documentElement.classList.add('ios-haptics');   /* reveals the .hx-tap overlays */
    var box=document.createElement('div'), sw=document.createElement('input');
    box.setAttribute('aria-hidden','true');
    box.style.cssText='position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden';
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

  /* opts.tapped = the user's finger already hit a native switch overlay, which played the first tick */
  function play(name,opts){
    var p=P[name]; if(!p) return;
    opts=opts||{}; cancel();
    if(S.rm) p=[p[0]];                      /* reduced motion: no rhythm to follow, just the tap */
    if(canVibrate){ try{ navigator.vibrate(toVibrate(p)); }catch(e){} return; }
    if(iosSwitch){
      p.forEach(function(s,i){
        if(i===0&&opts.tapped) return;
        if(s[0]===0) iosTick(); else timers.push(setTimeout(iosTick,s[0]));
      });
    }
  }

  S.haptics={play:play, cancel:cancel, ios:iosSwitch, patterns:P};
})(window.Site);
