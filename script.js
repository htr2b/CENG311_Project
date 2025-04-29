document.addEventListener('DOMContentLoaded', function() {
  $(document).ready(function () {
    $("#splash-screen").backstretch("assets/matrixSunglasses.gif", {
        fade: 500
    });

    setTimeout(function () {
        $("#splash-screen").fadeOut(1000, function () {
            $(this).remove();
        });
    }, 1000);
});
  const slidesEl = document.querySelector('.slides');
  if (slidesEl) {
    const slideCount = slidesEl.children.length;
    let idx = 0;
    function update() {
      slidesEl.style.transform = `translateX(-${idx * 100}%)`;
    }
    document.getElementById('next')?.addEventListener('click', () => {
      idx = (idx + 1) % slideCount; update();
    });
    document.getElementById('prev')?.addEventListener('click', () => {
      idx = (idx - 1 + slideCount) % slideCount; update();
    });
    setInterval(() => { idx = (idx + 1) % slideCount; update(); }, 5000);
  }

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  const form    = document.getElementById('contactForm');
  const overlay = document.getElementById('loadingOverlay');
  const progress= overlay?.querySelector('.progress');
  const dialog  = document.getElementById('successDialog');
  const closeBtn= document.getElementById('closeDialog');

  if (form && overlay && progress && dialog && closeBtn) {
    form.setAttribute('novalidate', '');
    form.addEventListener('invalid', e => e.preventDefault(), true);
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) return;
      overlay.classList.remove('hidden');
      progress.style.width = '0%';
      let pct = 0;
      const timer = setInterval(() => {
        pct += 10;
        progress.style.width = pct + '%';
        if (pct >= 100) {
          clearInterval(timer);
          overlay.classList.add('hidden');
          if (typeof dialog.showModal === 'function') dialog.showModal();
          else dialog.classList.remove('hidden');
        }
      }, 200);
    });
    closeBtn.addEventListener('click', () => {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.classList.add('hidden');
      form.reset();
    });
  }

  if (window.jQuery && typeof $.fn.tooltip === 'function') {
    $('[title]').tooltip({ show:{delay:100}, hide:{delay:100} });
  }
});
