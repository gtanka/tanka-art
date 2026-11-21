document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navigation');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const box = document.querySelector('.lightbox');
  if (!box) return;

  const image = box.querySelector('img');
  const count = box.querySelector('.lightbox-count');
  const closeButton = box.querySelector('.lightbox-close');
  const items = [...document.querySelectorAll('.detail-gallery img, .detail-gallery [data-video]')];
  if (!items.length) return;
  let video;
  let index = 0;
  let previous;

  function stopVideo() {
    if (!video || video.hidden) return;
    video.pause();
    video.hidden = true;
    video.removeAttribute('src');
    video.load();
  }

  function show() {
    const item = items[index];
    stopVideo();
    image.hidden = Boolean(item.dataset.video);

    if (image.hidden) {
      if (!video) {
        video = document.createElement('video');
        video.className = 'lightbox-video';
        video.controls = true;
        video.playsInline = true;
        image.after(video);
      }
      video.poster = item.dataset.poster;
      video.src = item.dataset.video;
      video.setAttribute('aria-label', item.getAttribute('aria-label'));
      video.hidden = false;
    } else {
      image.src = item.currentSrc || item.src;
      image.alt = item.alt;
    }
    count.textContent = (index + 1) + ' / ' + items.length;
  }

  function close() {
    stopVideo();
    box.hidden = true;
    document.body.style.overflow = '';
    image.removeAttribute('src');
    previous?.focus();
  }

  function move(offset) {
    index = (index + offset + items.length) % items.length;
    show();
  }

  items.forEach((item, position) => {
    item.addEventListener('click', () => {
      previous = item;
      index = position;
      show();
      box.hidden = false;
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    });
    if (item instanceof HTMLImageElement) {
      item.tabIndex = 0;
      item.setAttribute('role', 'button');
      item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          item.click();
        }
      });
    }
  });

  closeButton.onclick = close;
  box.querySelector('.lightbox-prev').onclick = () => move(-1);
  box.querySelector('.lightbox-next').onclick = () => move(1);
  box.addEventListener('click', event => {
    if (event.target === box) close();
  });
  document.addEventListener('keydown', event => {
    if (box.hidden) return;
    if (event.key === 'Escape') close();
    if (event.target === video) return;
    if (event.key === 'ArrowRight') move(1);
    if (event.key === 'ArrowLeft') move(-1);
  });
});
// Static artwork gallery lightbox.
document.addEventListener('DOMContentLoaded',()=>{const tiles=[...document.querySelectorAll('.series-tile')],box=document.querySelector('.lightbox');if(!tiles.length||!box)return;const photo=box.querySelector('img'),counter=box.querySelector('.lightbox-count');let current=0,previous=null;function show(){const img=tiles[current].querySelector('img');photo.src=img.src;photo.alt=img.alt;counter.textContent=(current+1)+' / '+tiles.length}function open(i){previous=document.activeElement;current=i;show();box.hidden=false;document.body.style.overflow='hidden';box.querySelector('.lightbox-close').focus()}function close(){box.hidden=true;photo.removeAttribute('src');document.body.style.overflow='';previous?.focus()}function move(n){current=(current+n+tiles.length)%tiles.length;show()}tiles.forEach((tile,i)=>tile.addEventListener('click',()=>open(i)));box.querySelector('.lightbox-close').addEventListener('click',close);box.querySelector('.lightbox-prev').addEventListener('click',()=>move(-1));box.querySelector('.lightbox-next').addEventListener('click',()=>move(1));box.addEventListener('click',e=>{if(e.target===box)close()});document.addEventListener('keydown',e=>{if(box.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)})});


// Restore artwork list position after visiting a series and returning.
(function(){
  if(!document.querySelector('.artwork-series-list'))return;
  const key='tanka-art-scroll:'+location.pathname;
  const pendingKey=key+':pending';
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  function save(){
    try{sessionStorage.setItem(key,String(window.scrollY));sessionStorage.setItem(pendingKey,'1')}catch(e){}
  }
  document.querySelectorAll('.artwork-series-list a[href]').forEach(a=>a.addEventListener('click',save));
  function restore(){
    let y=0,pending=false;
    try{pending=sessionStorage.getItem(pendingKey)==='1';y=Number(sessionStorage.getItem(key))||0}catch(e){}
    if(!pending)return;
    try{sessionStorage.removeItem(pendingKey)}catch(e){}
    const go=()=>window.scrollTo({top:y,left:0,behavior:'instant'});
    go();
    requestAnimationFrame(()=>requestAnimationFrame(go));
    [120,350,800,1500].forEach(ms=>setTimeout(go,ms));
  }
  window.addEventListener('pageshow',restore);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restore,{once:true});
  else restore();
})();
