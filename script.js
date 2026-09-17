document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const gate = document.querySelector('#accessGate');
  const site = document.querySelector('#siteContent');
  const leadForm = document.querySelector('#leadForm');
  const formError = document.querySelector('#formError');
  const modal = document.querySelector('#videoModal');
  const playButton = document.querySelector('#playVideo');
  const toast = document.querySelector('#toast');
  const scheduleButton = document.querySelector('#scheduleButton');

  function unlockSite() {
    gate.classList.add('is-hidden');
    body.classList.remove('is-locked');
    site.setAttribute('aria-hidden', 'false');
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.setTimeout(() => playButton.focus(), 520);
  }

  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = leadForm.elements.name.value.trim();
    const email = leadForm.elements.email.value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !validEmail) {
      formError.textContent = 'Completá tu nombre y un correo válido para continuar.';
      return;
    }

    formError.textContent = '';
    unlockSite();
  });

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
    playButton.focus();
  }

  playButton.addEventListener('click', openModal);
  modal.querySelector('.modal__close').addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  scheduleButton.addEventListener('click', () => {
    toast.classList.add('is-visible');
    window.setTimeout(() => toast.classList.remove('is-visible'), 3600);
  });
});
