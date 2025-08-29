const openModalBtn = document.getElementById('openModal') || document.getElementById('openCreate');
const backdrop = document.getElementById('modalBackdrop');
const closeBtn = document.getElementById('closeModal');

function openModal(){
  if(!backdrop) return;
  backdrop.classList.add('open');
  backdrop.style.display = 'flex';
  // trap focus
  const focusables = backdrop.querySelectorAll('button, [href], input, select, textarea');
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  function handleTab(e){
    if(e.key !== 'Tab') return;
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
  backdrop.addEventListener('keydown', handleTab);
  backdrop.dataset.trap = '1';
  first && first.focus();
}

function closeModal(){
  if(!backdrop) return;
  backdrop.classList.remove('open');
  backdrop.style.display = 'none';
}

openModalBtn && openModalBtn.addEventListener('click', openModal);
closeBtn && closeBtn.addEventListener('click', closeModal);
backdrop && backdrop.addEventListener('click', (e)=>{ if(e.target === backdrop) closeModal(); });

