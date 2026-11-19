// Jewelry-only lightbox magnification.
document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.lightbox');
  if (!box || !document.querySelector('.detail-gallery')) return;
  const img = box.querySelector('img');
  const controls = document.createElement('div');
  controls.className = 'jewelry-zoom-controls';
  controls.innerHTML = '<button type="button" class="jewelry-zoom-toggle" aria-label="Magnify image" title="Magnify image">⌕</button>';
  box.append(controls);
  let scale = 1, x = 0, y = 0, start = null, pinch = null;
  const pointers = new Map();
  const toggle = controls.querySelector('.jewelry-zoom-toggle');
  function render() {
    img.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
    img.style.cursor = scale > 1 ? 'grab' : 'zoom-in';
    toggle.textContent = scale > 1 ? '↺' : '⌕';
    toggle.setAttribute('aria-label', scale > 1 ? 'Reset zoom' : 'Magnify image');
    toggle.title = scale > 1 ? 'Reset zoom' : 'Magnify image';
  }
  function reset() { scale = 1; x = 0; y = 0; pointers.clear(); start = null; pinch = null; render(); }
  function zoom(next) {
    scale = Math.max(1, Math.min(5, next));
    if (scale === 1) { x = 0; y = 0; }
    render();
  }
  toggle.addEventListener('click', () => scale > 1 ? reset() : zoom(2.5));
  img.addEventListener('dblclick', e => { e.preventDefault(); zoom(scale > 1 ? 1 : 2.5); });
  img.addEventListener('wheel', e => {
    if (box.hidden) return;
    e.preventDefault();
    zoom(scale * (e.deltaY < 0 ? 1.2 : 1 / 1.2));
  }, { passive: false });
  img.addEventListener('pointerdown', e => {
    if (box.hidden) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    img.setPointerCapture(e.pointerId);
    if (pointers.size === 1) start = { x: e.clientX, y: e.clientY, tx: x, ty: y };
    if (pointers.size === 2) {
      const p = [...pointers.values()];
      pinch = { distance: Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y), scale };
      start = null;
    }
  });
  img.addEventListener('pointermove', e => {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2 && pinch) {
      const p = [...pointers.values()];
      zoom(pinch.scale * Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y) / Math.max(1,pinch.distance));
    } else if (pointers.size === 1 && start && scale > 1) {
      x = start.tx + e.clientX - start.x;
      y = start.ty + e.clientY - start.y;
      render();
    }
  });
  function end(e) { pointers.delete(e.pointerId); start = null; pinch = null; }
  img.addEventListener('pointerup', end);
  img.addEventListener('pointercancel', end);
  img.addEventListener('click', () => { if (scale === 1) zoom(2); });
  box.querySelectorAll('.lightbox-prev,.lightbox-next,.lightbox-close').forEach(b => b.addEventListener('click', reset));
  new MutationObserver(() => { if (!box.hidden) reset(); }).observe(img, { attributes: true, attributeFilter: ['src'] });
  render();
});