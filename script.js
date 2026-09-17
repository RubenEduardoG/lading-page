const body = document.body;
const modal = document.querySelector('#videoModal');

document.querySelectorAll('.module button').forEach((button) => {
  button.addEventListener('click', () => {
    const module = button.closest('.module');
    const isOpen = module.classList.contains('module--active');
    document.querySelectorAll('.module').forEach((item) => {
      item.classList.remove('module--active');
      item.querySelector('button').setAttribute('aria-expanded', 'false');
      item.querySelector('button i').textContent = '+';
    });
    if (!isOpen) {
      module.classList.add('module--active');
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('i').textContent = '−';
    }
  });
});

function openModal() {
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
  modal.querySelector('.modal__close').focus();
}

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
  document.querySelector('#playVideo').focus();
}

document.querySelector('#playVideo').addEventListener('click', openModal);
modal.querySelector('.modal__close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

document.querySelector('#scheduleButton').addEventListener('click', () => {
  window.location.href = 'https://calendly.com/tu-usuario';
});
