// Minimal renderer for portfolio using content.json (vanilla JS)
(async function(){
  'use strict';
  function qs(sel, root=document){return root.querySelector(sel)}
  function qsa(sel, root=document){return Array.from(root.querySelectorAll(sel))}
  function createEl(tag, props={}, children=[]){
    const el = document.createElement(tag);
    for(const k in props){
      if(k==='class') el.className = props[k];
      else if(k==='text') el.textContent = props[k];
      else el.setAttribute(k, props[k]);
    }
    (Array.isArray(children)?children:[children]).flat().forEach(c=>{ if(!c) return; if(typeof c==='string') el.appendChild(document.createTextNode(c)); else el.appendChild(c)});
    return el;
  }

  async function loadJSON(){
    try{
      const r = await fetch('content.json'); if(!r.ok) throw new Error('missing');
      return await r.json();
    }catch(e){console.warn('content.json not loaded', e); return null}
  }

  function renderHero(home, meta){
    const root = qs('#home-root'); if(!root) return;
    root.innerHTML = '';
    const heroWrap = createEl('div',{class:'hero hero-bg'});
    const left = createEl('div',{});
    left.appendChild(createEl('div',{class:'eyebrow', text: home.intro || "Hello"}));
    left.appendChild(createEl('h1',{text: (home.name? home.name : meta.name)}));
    left.appendChild(createEl('p',{text: (home.summary || 'Frontend developer building performant apps.')}));
    
    // rotating role display
    if(home.typing && home.typing.length){
      let i=0; 
      const span = createEl('div',{class:'kv', text: home.typing[0]}); 
      left.appendChild(span);
      setInterval(()=>{ i=(i+1)%home.typing.length; span.textContent = home.typing[i]; }, 3000);
    }

    const cta = createEl('div',{class:'cta'});
    const resumePath = (meta.resumeFile || 'premKumarSoftwareDeveloper.pdf');
    cta.appendChild(createEl('a',{class:'btn',href:resumePath, text:'Download CV', target:'_blank', rel:'noopener'}));
    cta.appendChild(createEl('a',{class:'btn secondary',href:'#contact', text:'Get in Touch'}));
    left.appendChild(cta);

    const right = createEl('div',{class:'card'});
    const img = createEl('img',{class:'profile-pic', src:(home.image || 'introduction2.png'), alt:'Profile picture'});
    right.appendChild(img);
    
    heroWrap.appendChild(left); heroWrap.appendChild(right);
    root.appendChild(heroWrap);
  }

  function renderAbout(about){
    const root = qs('#about-root'); if(!root) return;
    root.innerHTML='';
    const card = createEl('div',{class:'card'});
    const wrapper = createEl('div',{class:'about-grid'});
    const left = createEl('div',{}); 
    left.appendChild(createEl('img',{src: about.image || 'introduction2.png', class:'profile-pic', alt:'About image'}));
    const right = createEl('div',{});
    if(about.paragraphs) about.paragraphs.forEach(p=> right.appendChild(createEl('p',{text:p})));
    wrapper.appendChild(left); wrapper.appendChild(right); card.appendChild(wrapper);
    root.appendChild(card);
  }

  function renderExperiences(list){
    const root = qs('#experiences-root'); if(!root) return; 
    root.innerHTML='';
    const section = createEl('section',{class:'section experience'});
    section.appendChild(createEl('h2',{class:'title', text:'Experience'}));
    const grid = createEl('div',{class:'grid'});
    list.forEach(it=>{
      const card = createEl('div',{class:'card item'});
      const img = createEl('img',{src:it.logo || '', alt:it.company||'logo'});
      const meta = createEl('div',{class:'meta'});
      meta.appendChild(createEl('h4',{text:it.company}));
      meta.appendChild(createEl('p',{text: it.role}));
      meta.appendChild(createEl('p',{text: it.dates}));
      const bullets = createEl('ul',{});
      (it.bullets||[]).forEach(b=> bullets.appendChild(createEl('li',{text:b})));
      meta.appendChild(bullets);
      card.appendChild(img); card.appendChild(meta); grid.appendChild(card);
    });
    section.appendChild(grid); root.appendChild(section);
  }

  function renderProjects(list){
    const root = qs('#projects-root'); if(!root) return; 
    root.innerHTML='';
    const section = createEl('section',{class:'section projects'});
    section.appendChild(createEl('h2',{class:'title', text:'Projects'}));
    const grid = createEl('div',{class:'grid'});
    list.forEach(p=>{
      const card = createEl('a',{class:'card project-card', href:p.link||'#', target:'_blank', rel:'noopener noreferrer'});
      const thumb = createEl('div',{class:'thumb'});
      // If an embed URL is provided, show a non-interactive iframe preview.
      if(p.embed){
        const iframe = createEl('iframe',{src:p.embed, title: p.title});
        iframe.setAttribute('loading','lazy');
        iframe.setAttribute('frameborder','0');
        iframe.className = 'project-iframe';
        thumb.appendChild(iframe);
      } else if(p.image){
        const img = createEl('img',{src:p.image, alt:p.title});
        thumb.appendChild(img);
      } else {
        thumb.textContent = p.title;
      }
      card.appendChild(thumb);
      const meta = createEl('div',{class:'project-meta'});
      meta.appendChild(createEl('h4',{text:p.title}));
      const desc = createEl('p',{class:'small', text:p.description||''}); 
      meta.appendChild(desc);
      card.appendChild(meta);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    root.appendChild(section);
  }

  function renderEnterpriseProjects(list){
    const root = qs('#enterprise-root'); if(!root) return; 
    root.innerHTML='';
    const section = createEl('section',{class:'section enterprise'});
    section.appendChild(createEl('h2',{class:'title', text:'Enterprise Projects'}));
    const grid = createEl('div',{class:'grid'});
    list.forEach(p=>{
      const card = createEl('div',{class:'card enterprise-card'});
      const header = createEl('div',{class:'enterprise-header'});
      const titleSection = createEl('div',{});
      titleSection.appendChild(createEl('h4',{text:p.title}));
      titleSection.appendChild(createEl('p',{class:'small', text:p.company}));
      header.appendChild(titleSection);
      card.appendChild(header);
      
      const desc = createEl('p',{text:p.description});
      card.appendChild(desc);
      
      const techStack = createEl('div',{class:'tech-stack'});
      (p.techStack||[]).forEach(tech=>{
        techStack.appendChild(createEl('span',{class:'tech-tag', text:tech}));
      });
      card.appendChild(techStack);
      grid.appendChild(card);
    });
    section.appendChild(grid);
    root.appendChild(section);
  }

  function renderSkills(list){
    const root = qs('#skills-root'); if(!root) return; 
    root.innerHTML='';
    const section = createEl('section',{class:'section skills'});
    section.appendChild(createEl('h2',{class:'title', text:'Skills'}));
    const grid = createEl('div',{class:'grid'});
    list.forEach(s=>{
      const card = createEl('div',{class:'card'});
      card.appendChild(createEl('div',{text:s.name}));
      const bar = createEl('div',{class:'bar'});
      const i = createEl('i',{}); i.style.width = (s.percent||0) + '%'; bar.appendChild(i); card.appendChild(bar);
      const pct = createEl('div', {class:'small', text: s.percent + '%'});
      card.appendChild(pct);
      grid.appendChild(card);
    });
    section.appendChild(grid); 
    root.appendChild(section);
  }

  function renderContact(contact){
    const root = qs('#contact-info-root'); if(!root) return; 
    root.innerHTML='';
    const items = [
      {label: 'Name', value: contact.name},
      {label: 'Email', value: contact.email},
      {label: 'Phone', value: contact.phone},
      {label: 'Location', value: contact.address}
    ];
    items.forEach(item=>{
      const div = createEl('div',{});
      div.appendChild(createEl('strong', {text: item.label}));
      div.appendChild(createEl('p', {class:'small', text: item.value}));
      root.appendChild(div);
    });
    // set form action
    const form = qs('#contact-form'); 
    if(form && contact.formAction) form.action = contact.formAction;
  }

  function renderFooter(social){
    const root = qs('#social-links-root'); if(!root) return; 
    root.innerHTML='';
    social.forEach(s=>{
      const li = createEl('li',{});
      const a = createEl('a',{href:s.url||'#', target:'_blank', rel:'noopener noreferrer', title:s.platform});
      const img = createEl('img',{src:s.icon||'', alt:s.platform}); 
      a.appendChild(img); li.appendChild(a); root.appendChild(li);
    });
  }

  // Setup hamburger menu
  function setupHamburger(){
    const hamburger = qs('#hamburger');
    const nav = qs('.nav');
    if(!hamburger || !nav) return;
    
    hamburger.addEventListener('click', ()=>{
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    qsa('.nav a').forEach(link=>{
      link.addEventListener('click', ()=>{
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // Setup smooth scroll for nav links
  function setupNavScroll(){
    qsa('a[href^="#"]').forEach(link=>{
      link.addEventListener('click', (e)=>{
        const href = link.getAttribute('href');
        if(href === '#') return;
        const target = qs(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth'});
        }
      });
    });
  }

  const data = await loadJSON();
  if(!data){ console.warn('No data - leaving existing page'); return; }
  renderHero(data.home||{}, data.resumeMeta||{});
  renderAbout(data.about||{});
  renderProjects(data.projects||[]);
  if(data.enterpriseProjects && data.enterpriseProjects.length) renderEnterpriseProjects(data.enterpriseProjects);
  renderSkills(data.skills||[]);
  renderExperiences(data.experiences||[]);
  renderContact(data.contact||{});
  renderFooter(data.socialLinks||[]);

  // hide fallback markup if any
  document.querySelectorAll('.fallback-content').forEach(n=>n.style.display='none');
  
  // Setup interactions
  setupHamburger();
  setupNavScroll();
})();

