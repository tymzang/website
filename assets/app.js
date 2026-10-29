// Original interaction code. Plain browser JavaScript: no external dependencies.
(() => {
  const conf=window.SITE_CONFIG||{};
  document.querySelectorAll('[data-site-name]').forEach(el=>el.textContent=conf.displayName||'TYMZANG');
  document.querySelectorAll('[data-full-name]').forEach(el=>el.textContent=(document.documentElement.lang==='en'?(conf.fullNameEN||conf.fullName):conf.fullName)||'TYMZANG');
  document.querySelectorAll('[data-institution]').forEach(el=>el.textContent=(document.documentElement.lang==='en'?(conf.institutionEN||conf.institution):conf.institution)||'');
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  document.querySelectorAll('[data-email]').forEach(el=>{
    if(conf.email){el.href='mailto:'+conf.email;el.hidden=false}
    else el.remove();
  });
  document.querySelectorAll('[data-github]').forEach(el=>{
    if(conf.github && /^https:\/\/github\.com\//.test(conf.github)){el.href=conf.github;el.hidden=false}
    else el.remove();
  });
  const btn=document.querySelector('[data-menu-button]'),menu=document.querySelector('[data-mobile-menu]');
  const menuOpened=()=>document.documentElement.lang==='en'?'Close ×':'Đóng ×';
  const currentMenuClosed=()=>document.documentElement.lang==='en'?'Menu +':'Danh mục +';
  if(btn&&menu){
    const close=()=>{menu.classList.remove('open');document.body.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');btn.textContent=currentMenuClosed()};
    btn.addEventListener('click',()=>{const isOpen=menu.classList.toggle('open');document.body.classList.toggle('menu-open',isOpen);btn.setAttribute('aria-expanded',String(isOpen));btn.textContent=isOpen?menuOpened():currentMenuClosed()});
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  const filterBtns=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-category]')];
  filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});
    btn.classList.add('active');btn.setAttribute('aria-pressed','true');
    const choice=btn.dataset.filter;
    cards.forEach(card=>card.hidden=choice!=='all'&&card.dataset.category!==choice);
  }));
  const els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.08});els.forEach(el=>obs.observe(el));}
  else els.forEach(el=>el.classList.add('visible'));
})();
