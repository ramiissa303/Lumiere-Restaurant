/* ================================================================
   LUMIÈRE — forms.js
   Generic client-side validation + success state for enquiry forms.
   Any <form data-mock-form> with a sibling .form-success is handled.
   Required fields use [required]; emails validated by type="email".
   ================================================================ */
'use strict';

(function () {
  const forms = document.querySelectorAll('[data-mock-form]');
  if (!forms.length) return;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  forms.forEach(form => {
    const success = form.parentElement.querySelector('.form-success');

    function markInvalid(field) {
      field.classList.add('invalid');
      const clear = () => field.classList.remove('invalid');
      field.addEventListener('input', clear, { once: true });
      field.addEventListener('change', clear, { once: true });
    }

    function validate() {
      let ok = true;
      form.querySelectorAll('[required]').forEach(f => {
        const v = f.value.trim();
        if (!v) { markInvalid(f); ok = false; return; }
        if (f.type === 'email' && !emailRe.test(v)) { markInvalid(f); ok = false; }
      });
      return ok;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validate()) {
        const first = form.querySelector('.invalid');
        first && first.focus();
        return;
      }
      const btn = form.querySelector('[type="submit"]');
      const label = btn ? btn.innerHTML : '';
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

      setTimeout(() => {
        if (!success) { if (btn) { btn.innerHTML = label; btn.disabled = false; } return; }
        form.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        form.style.opacity = '0'; form.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          form.style.display = 'none';
          success.classList.add('show');
          success.style.opacity = '0'; success.style.transform = 'translateY(10px)';
          success.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
          requestAnimationFrame(() => { success.style.opacity = '1'; success.style.transform = 'translateY(0)'; });
        }, 350);
      }, 1200);
    });
  });
})();
