// تحميل الأعمال من localStorage
function loadWorks(filter = 'all') {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  const works = JSON.parse(localStorage.getItem('works') || '[]');
  const filtered = filter === 'all' ? works : works.filter(w => w.category === filter);

  gallery.innerHTML = filtered.length ? filtered.map(w => `
    <div class="card">
      <img src="${w.image}" alt="${w.title}">
      <div class="overlay">
        <h4>${w.title}</h4>
        <small>${w.category === 'logo' ? 'شعار' : 'تصميم جرافيك'}</small>
      </div>
    </div>
  `).join('') : '<p style="text-align:center;grid-column:1/-1;">لا توجد أعمال بعد.</p>';
}

// فلترة
document.querySelectorAll('.filter button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadWorks(btn.dataset.filter);
  });
});

// نموذج التواصل - يفتح بريد المستخدم مباشرة
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent(`رسالة من ${data.get('name')}`);
    const body = encodeURIComponent(`الاسم: ${data.get('name')}\nالبريد: ${data.get('email')}\n\n${data.get('message')}`);
    window.location.href = `mailto:ousik.hamid@gmail.com?subject=${subject}&body=${body}`;
  });
}

// تحميل أولي
loadWorks();