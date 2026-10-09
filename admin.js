// ⚠️ غيّر كلمة المرور هنا قبل النشر
const ADMIN_PASSWORD = "HAMid__&&2620";

// حماية إضافية: تشفير بسيط للجلسة
function login() {
  const pass = document.getElementById('adminPass').value;
  if (pass === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_logged', 'true');
    showPanel();
  } else {
    document.getElementById('loginError').textContent = 'كلمة المرور غير صحيحة';
  }
}

function logout() {
  sessionStorage.removeItem('admin_logged');
  location.reload();
}

function showPanel() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'block';
  renderAdminGallery();
}

// إضافة عمل جديد
function addWork() {
  const title = document.getElementById('title').value.trim();
  const category = document.getElementById('category').value;
  const fileInput = document.getElementById('imageFile');

  if (!title || !fileInput.files[0]) {
    alert('يرجى إدخال العنوان واختيار صورة');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const works = JSON.parse(localStorage.getItem('works') || '[]');
    works.unshift({ id: Date.now(), title, category, image: e.target.result });
    localStorage.setItem('works', JSON.stringify(works));
    document.getElementById('title').value = '';
    fileInput.value = '';
    renderAdminGallery();
    alert('✅ تم رفع العمل بنجاح');
  };
  reader.readAsDataURL(file);
}

// عرض الأعمال في لوحة التحكم
function renderAdminGallery() {
  const gallery = document.getElementById('adminGallery');
  const works = JSON.parse(localStorage.getItem('works') || '[]');
  gallery.innerHTML = works.length ? works.map(w => `
    <div class="card">
      <img src="${w.image}" alt="${w.title}">
      <div class="overlay">
        <h4>${w.title}</h4>
        <small>${w.category}</small>
        <button onclick="deleteWork(${w.id})" style="margin-top:8px;background:#ff4757;color:#fff;border:none;padding:6px 12px;border-radius:8px;cursor:pointer;">حذف</button>
      </div>
    </div>
  `).join('') : '<p>لا توجد أعمال.</p>';
}

function deleteWork(id) {
  if (!confirm('هل تريد حذف هذا العمل؟')) return;
  let works = JSON.parse(localStorage.getItem('works') || '[]');
  works = works.filter(w => w.id !== id);
  localStorage.setItem('works', JSON.stringify(works));
  renderAdminGallery();
}

// التحقق من الجلسة عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('admin_logged') === 'true') showPanel();
});