// Data Artikel Lengkap
const articlesData = {
  1: {
    title: "Mengapa Thrifting Menjadi Tren Fashion Berkelanjutan?",
    meta: "Diposting: 5 November 2026 • Oleh Admin",
    body: `
      <p>Industri <em>fast fashion</em> saat ini memproduksi jutaan ton pakaian setiap tahunnya, dan sebagian besar berakhir menjadi limbah tekstil yang sulit terurai. Thrifting hadir sebagai gerakan nyata untuk memperpanjang umur pakaian yang masih sangat layak pakai.</p>
      <p>Selain ramah lingkungan, thrifting juga memberikan kesempatan bagi para pecinta fashion untuk mendapatkan item unik—seperti jaket denim vintage atau kemeja flanel era 90-an—yang tidak lagi diproduksi secara massal. Di <strong>RetroRack Thrift</strong>, setiap pakaian melewati proses sortir, pencucian uap (<em>steam</em>), dan sterilisasi sehingga aman dan nyaman langsung dipakai.</p>
    `
  },
  2: {
    title: "5 Cara Merawat Jaket Denim Vintage Agar Tetap Awet",
    meta: "Diposting: 2 November 2026 • Oleh Tim Kurasi",
    body: `
      <p>Jaket denim vintage memiliki karakter bahan yang tebal dan warna <em>fading</em> alami yang sangat bernilai. Untuk menjaga kualitasnya, perhatikan 5 langkah berikut:</p>
      <ol style="margin-left: 20px; margin-top: 8px;">
        <li>Jangan terlalu sering mencuci jaket denim; cukup angin-anginkan setelah dipakai.</li>
        <li>Gunakan air dingin dan deterjen lembut saat mencuci secara manual.</li>
        <li>Hindari penggunaan mesin pengering bersuhu tinggi agar serat kain tidak menyusut.</li>
        <li>Jemur dengan cara dibalik di tempat yang teduh, hindari sinar matahari langsung.</li>
        <li>Simpan dengan gantungan baju (hanger) yang kokoh agar bentuk bahu tetap terjaga.</li>
      </ol>
    `
  },
  3: {
    title: "Grand Opening Drop #12: Koleksi Flanel & Crewneck 90s",
    meta: "Diposting: 28 Oktober 2026 • Oleh Uda Ucon",
    body: `
      <p>Kabar gembira untuk seluruh pelanggan setia RetroRack Thrift! Akhir pekan ini kami merilis <strong>Drop #12</strong> yang berisi lebih dari 50 item flanel kotak-kotak, crewneck heavyweight, dan windbreaker klasik dari era 1990-an.</p>
      <p>Bagi kamu yang sudah mendaftar sebagai member melalui menu <strong>Registration</strong>, kamu berhak mendapatkan akses katalog 2 jam lebih awal serta potongan harga 10% untuk transaksi pertama. Jangan sampai kehabisan karena setiap item hanya tersedia 1 pcs!</p>
    `
  }
};

// Navigasi Halaman (SPA Routing)
const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
const pageSections = document.querySelectorAll('.page-section');
const navList = document.getElementById('navList');
const navToggle = document.getElementById('navToggle');

function showPage(pageId, sectionId = null) {
  pageSections.forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(`page-${pageId}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });

  if (sectionId) {
    setTimeout(() => {
      const el = document.getElementById(`about-${sectionId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navList.classList.remove('open');
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    const section = link.dataset.section || null;
    showPage(page, section);
  });
});

navToggle.addEventListener('click', () => {
  navList.classList.toggle('open');
});

// Artikel Read More
function openArticle(id) {
  const data = articlesData[id];
  if (!data) return;
  const container = document.getElementById('articleFullContent');
  container.innerHTML = `
    <h2>${data.title}</h2>
    <p class="article-meta">${data.meta}</p>
    ${data.body}
  `;
  showPage('article-detail');
}

document.querySelectorAll('.btn-readmore, .article-title-link').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openArticle(el.dataset.article);
  });
});

document.getElementById('backToHome').addEventListener('click', () => {
  showPage('home');
});

// Carousel Otomatis
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.getElementById('nextSlide').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

document.getElementById('prevSlide').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}, 5000);

// Lightbox Galeri
const lightbox = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${item.dataset.title} — ${item.dataset.price}`;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

document.getElementById('lightboxClose').addEventListener('click', () => {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
});

// Form Registration & Contact
document.getElementById('regForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  document.getElementById('regFeedback').textContent = `Terima kasih, ${name}! Pendaftaran member RetroRack Thrift berhasil.`;
  e.target.reset();
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  document.getElementById('contactFeedback').textContent = `Pesan dari ${name} telah terkirim. Tim kami akan segera menghubungi Anda.`;
  e.target.reset();
});

// Live Clock & Date Sidebar
function updateClock() {
  const now = new Date();
  document.getElementById('liveClock').textContent = now.toLocaleTimeString('id-ID');
  document.getElementById('liveDate').textContent = now.toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}
setInterval(updateClock, 1000);
updateClock();
