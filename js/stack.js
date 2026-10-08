/* stack.js: the Stack view's filter buttons, tool chips and "where I used it" box.
   Lists come from Site.data.stackGroups / stackTools / stackUsed. Docs: Doc/Elements/Sections/Stack.md */
(function(S){
  var $=S.$, $$=S.$$, GROUPS=S.data.stackGroups, TOOLS=S.data.stackTools, USED=S.data.stackUsed;
  var group='all', picked=null;
  var fil=$('#fil'), chipsEl=$('#chips'), used=$('#used');
  GROUPS.forEach(function(g){
    var b=document.createElement('button'); b.type='button'; b.textContent=g.n; b.setAttribute('aria-pressed',g.k==='all'?'true':'false');
    b.addEventListener('click',function(){ group=g.k; picked=null; $$('button',fil).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')}); renderChips(); setUsed(null); });
    fil.appendChild(b);
  });
  function setUsed(name){
    used.innerHTML=''; var s=document.createElement('small'), b=document.createElement('b');
    if(!name){ s.textContent='Tap a tool'; b.textContent='See where I used it'; } else { s.textContent=name; b.textContent=USED[name]||'Part of my everyday toolkit'; }
    used.appendChild(s); used.appendChild(b);
  }
  function renderChips(){
    chipsEl.innerHTML=''; var n=0;
    TOOLS.forEach(function(t){
      if(group!=='all'&&t[0]!==group) return;
      var b=document.createElement('button'); b.type='button'; b.textContent=t[1]; b.style.setProperty('--c',n++);
      if(t[0]==='test') b.className='t';
      b.setAttribute('aria-pressed',picked===t[1]?'true':'false');
      b.addEventListener('click',function(){ picked=t[1]; $$('button',chipsEl).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')}); setUsed(t[1]); });
      chipsEl.appendChild(b);
    });
  }
  renderChips();
  /* views.js calls this each time Stack opens, so the chips replay their pop-in animation */
  S.renderChips=renderChips;
})(window.Site);
