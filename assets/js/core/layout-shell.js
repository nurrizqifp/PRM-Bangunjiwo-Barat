/**
 * Portal Resmi PRM Bangunjiwo Barat
 * Component Shell: layout-shell.js
 * Principles: DRY (Single layout logic), Semantic, Accessible, Zero Bloat
 */

import { SITE_INFO, NAVIGATION_TREE, ALL_83_PAGES_MANIFEST } from '../data/site-database.js';
import { escapeHTML } from './dom-utils.js';

/**
 * Determine relative path prefix to site root based on document script/link src
 * Bulletproof across file://, localhost, custom subpaths, and Vercel
 * @returns {string}
 */
export function getRootPrefix() {
  const scriptEl = document.querySelector('script[src*="assets/js/"]');
  if (scriptEl) {
    const src = scriptEl.getAttribute('src');
    const idx = src.indexOf('assets/js/');
    if (idx !== -1) {
      return src.substring(0, idx) || './';
    }
  }
  const linkEl = document.querySelector('link[href*="assets/css/"]');
  if (linkEl) {
    const href = linkEl.getAttribute('href');
    const idx = href.indexOf('assets/css/');
    if (idx !== -1) {
      return href.substring(0, idx) || './';
    }
  }
  return './';
}

/**
 * Render Header with Navigation & Search Bar
 * @param {HTMLElement} headerEl
 * @param {string} currentPath
 */
export function renderHeader(headerEl, currentPath = window.location.pathname) {
  if (!headerEl) return;

  const root = getRootPrefix();

  headerEl.className = 'site-header';
  headerEl.innerHTML = `
    <div class="container header-inner">
      <a href="${root}index.html" class="brand-identity" aria-label="PRM Bangunjiwo Barat Beranda">
        <img src="${root}assets/images/favicon.png" alt="Logo PRM" class="brand-emblem-img" width="36" height="36" />
        <span class="brand-title">${escapeHTML(SITE_INFO.name)}</span>
      </a>

      <nav class="nav-menu-desktop" aria-label="Navigasi Utama">
        <!-- Serambi Dropdown -->
        <div class="nav-item">
          <a href="${root}serambi/index.html" class="nav-link">
            <span>Serambi</span>
            <svg class="chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="dropdown-menu">
            <a href="${root}profil/index.html" class="dropdown-item">Profil &amp; Sejarah Singkat</a>
            <a href="${root}serambi/pengajian-malam-rabu/index.html" class="dropdown-item">Pengajian Malam Rabu</a>
            <a href="${root}serambi/kultum-harian/index.html" class="dropdown-item">Kultum Harian</a>
            <a href="${root}serambi/pengajian-ahad-pagi/index.html" class="dropdown-item">Pengajian Ahad Pagi</a>
            <a href="${root}serambi/semarak-musycab-muhammadiyah-kasihan/index.html" class="dropdown-item">Semarak Musycab</a>
            <a href="${root}serambi/sholat-ied/index.html" class="dropdown-item">Sholat Ied Berjamaah</a>
            <a href="${root}serambi/rib/index.html" class="dropdown-item">Risalah Islam Berkemajuan</a>
            <a href="${root}laporan-keuangan/index.html" class="dropdown-item">Laporan Keuangan Ranting</a>
          </div>
        </div>

        <!-- Kepengurusan Dropdown -->
        <div class="nav-item">
          <a href="${root}kepengurusan-periode-2022-2027/index.html" class="nav-link">
            <span>Kepengurusan</span>
            <svg class="chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="dropdown-menu">
            <a href="${root}kepengurusan-periode-2022-2027/index.html" class="dropdown-item">Struktur Pimpinan PRM &amp; PRA</a>
            <a href="${root}sejarah-awal/index.html" class="dropdown-item">Sejarah Awal &amp; SK Pendirian</a>
            <a href="${root}kepengurusan-periode-2022-2027/ortom/index.html" class="dropdown-item">Organisasi Otonom (Ortom)</a>
          </div>
        </div>

        <!-- Proker Dropdown -->
        <div class="nav-item">
          <a href="${root}progam-kerja-dan-pelaksanaannya/index.html" class="nav-link">
            <span>Program Kerja</span>
            <svg class="chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="dropdown-menu">
            <a href="${root}progam-kerja-dan-pelaksanaannya/pelaksanaan-progam-kerja/index.html" class="dropdown-item">Pelaksanaan Program Kerja</a>
            <a href="${root}progam-kerja-dan-pelaksanaannya/2023/index.html" class="dropdown-item">Agenda &amp; Capaian 2023</a>
            <a href="${root}progam-kerja-dan-pelaksanaannya/2024/index.html" class="dropdown-item">Agenda &amp; Capaian 2024</a>
            <a href="${root}progam-kerja-dan-pelaksanaannya/2025/index.html" class="dropdown-item">Agenda &amp; Capaian 2025</a>
            <a href="${root}progam-kerja-dan-pelaksanaannya/2026/index.html" class="dropdown-item">Agenda &amp; Capaian 2026</a>
          </div>
        </div>

        <!-- More Mega Menu -->
        <div class="nav-item">
          <button class="nav-link" type="button" aria-haspopup="true">
            <span>Lainnya</span>
            <svg class="chevron" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="dropdown-menu mega-menu">
            <div class="mega-column">
              <div class="mega-column-heading">Amal Usaha &amp; Dakwah</div>
              <div class="mega-list">
                <a href="${root}amal-usaha-pendidikan/index.html" class="mega-link">Amal Usaha Pendidikan (7 Unit)</a>
                <a href="${root}masjid-mushola-binaan-prm/index.html" class="mega-link">Masjid &amp; Mushola (26 Titik)</a>
                <a href="${root}warta-kegiatan/index.html" class="mega-link">Warta Kegiatan Dakwah</a>
                <a href="${root}perpustakaanmu/index.html" class="mega-link">PerpustakaanMu (Koleksi Digital)</a>
              </div>
            </div>

            <div class="mega-column">
              <div class="mega-column-heading">Ortom &amp; Sinergi</div>
              <div class="mega-list">
                <a href="${root}aisyiyah/index.html" class="mega-link">Pimpinan Ranting ’Aisyiyah</a>
                <a href="${root}amm/index.html" class="mega-link">Angkatan Muda Muhammadiyah (AMM)</a>
                <a href="${root}tapak-suci/index.html" class="mega-link">Tapak Suci Putera Muhammadiyah</a>
                <a href="${root}festifal-takbir-keliling-bangunjiwo-barat/index.html" class="mega-link">Festival Takbir Keliling</a>
              </div>
            </div>

            <div class="mega-column">
              <div class="mega-column-heading">Ekonomi &amp; Layanan</div>
              <div class="mega-list">
                <a href="${root}unit-layanan-lazismu/index.html" class="mega-link">Unit Layanan Lazismu (ZIS)</a>
                <a href="${root}tokomu-bb-mart/index.html" class="mega-link">Tokomu BB Mart</a>
                <a href="${root}produk-muhammadiyah/index.html" class="mega-link">Produk &amp; Wirausaha Warga</a>
                <a href="${root}rapat-bulanan/index.html" class="mega-link">Dokumentasi Rapat Bulanan</a>
                <a href="${root}presentasi/index.html" class="mega-link">Materi Presentasi Cabang Ranting</a>
                <a href="${root}bukti/index.html" class="mega-link">Portofolio Bukti LPCR Award</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="header-actions">
        <button type="button" class="btn-search-trigger" id="btn-open-search" aria-label="Buka Pencarian Cepat">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>Cari...</span>
          <kbd class="kbd-shortcut">Ctrl+K</kbd>
        </button>

        <button type="button" class="btn-icon" id="btn-theme-toggle" aria-label="Ganti Tema">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none;">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>
    </div>
  `;

  initSearchModal();
  initThemeToggle();
}

/**
 * Render Breadcrumb navigation
 * @param {HTMLElement} containerEl
 * @param {Array<{title: string, url?: string}>} breadcrumbs
 */
export function renderBreadcrumbs(containerEl, breadcrumbs = []) {
  if (!containerEl || breadcrumbs.length === 0) return;
  const root = getRootPrefix();

  containerEl.className = 'breadcrumb-strip';
  containerEl.innerHTML = `
    <div class="container">
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li><a href="${root}index.html">Beranda</a></li>
          ${breadcrumbs.map((b, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return `
              <li class="breadcrumb-separator">/</li>
              <li ${isLast ? 'class="breadcrumb-current" aria-current="page"' : ''}>
                ${isLast || !b.url ? `<span>${escapeHTML(b.title)}</span>` : `<a href="${b.url}">${escapeHTML(b.title)}</a>`}
              </li>
            `;
          }).join('')}
        </ol>
      </nav>
    </div>
  `;
}

/**
 * Render Site Footer
 * @param {HTMLElement} footerEl
 */
export function renderFooter(footerEl) {
  if (!footerEl) return;
  const root = getRootPrefix();

  footerEl.className = 'site-footer';
  footerEl.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3 class="footer-brand-title">${escapeHTML(SITE_INFO.name)}</h3>
          <p class="footer-brand-desc">${escapeHTML(SITE_INFO.tagline)}</p>
          <p style="font-size: 0.85rem; color: #9bb0a8; margin-bottom: 0.75rem;">
            ${escapeHTML(SITE_INFO.address)}
          </p>
          <p style="font-size: 0.85rem; color: #f3a81a; font-weight: 600;">
            ${escapeHTML(SITE_INFO.award)}
          </p>
        </div>

        <div>
          <h4 class="footer-col-title">Navigasi Utama</h4>
          <ul class="footer-links-list">
            <li><a href="${root}profil/index.html">Profil Ranting &amp; Sejarah</a></li>
            <li><a href="${root}kepengurusan-periode-2022-2027/index.html">Pimpinan PRM &amp; PRA</a></li>
            <li><a href="${root}progam-kerja-dan-pelaksanaannya/index.html">Program Kerja 2022-2027</a></li>
            <li><a href="${root}masjid-mushola-binaan-prm/index.html">26 Masjid &amp; Mushola Binaan</a></li>
            <li><a href="${root}amal-usaha-pendidikan/index.html">Amal Usaha Pendidikan</a></li>
            <li><a href="${root}laporan-keuangan/index.html">Transparansi Keuangan</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Layanan &amp; Warta</h4>
          <ul class="footer-links-list">
            <li><a href="${root}unit-layanan-lazismu/index.html">Unit Layanan Lazismu Bangunjiwo</a></li>
            <li><a href="${root}tokomu-bb-mart/index.html">Tokomu BB Mart</a></li>
            <li><a href="${root}perpustakaanmu/index.html">Perpustakaan Digital (PerpustakaanMu)</a></li>
            <li><a href="${root}warta-kegiatan/index.html">Warta Kegiatan &amp; Dokumentasi</a></li>
            <li><a href="${root}presentasi/index.html">Materi Tour De Cabang Ranting</a></li>
            <li><a href="${root}bukti/index.html">Bukti LPCR Award PP Muhammadiyah</a></li>
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Kontak &amp; Sekretariat</h4>
          <ul class="footer-links-list">
            <li><span>Telepon: ${escapeHTML(SITE_INFO.contacts.phone)}</span></li>
            <li><span>WhatsApp 1: ${escapeHTML(SITE_INFO.contacts.wa1)}</span></li>
            <li><span>WhatsApp 2: ${escapeHTML(SITE_INFO.contacts.wa2)}</span></li>
            <li><span>Email: ${escapeHTML(SITE_INFO.contacts.email)}</span></li>
            <li><span>Instagram: ${escapeHTML(SITE_INFO.contacts.instagram)}</span></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>&copy; ${new Date().getFullYear()} ${escapeHTML(SITE_INFO.name)}. Seluruh Hak Cipta Dilindungi.</div>
        <div>Meninggikan Akhlak &bull; Membumikan Dakwah &bull; Membangun Ekonomi Umat</div>
      </div>
    </div>
  `;
}

/**
 * Render Mobile Bottom Navigation Dock (iOS Style)
 * @param {HTMLElement} dockEl
 */
export function renderMobileDock(dockEl) {
  if (!dockEl) return;
  const root = getRootPrefix();

  dockEl.className = 'mobile-bottom-dock';
  dockEl.innerHTML = `
    <a href="${root}index.html" class="dock-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      <span>Beranda</span>
    </a>
    <a href="${root}masjid-mushola-binaan-prm/index.html" class="dock-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
      <span>Masjid</span>
    </a>
    <button type="button" class="dock-item" id="btn-dock-search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <span>Cari</span>
    </button>
    <a href="${root}perpustakaanmu/index.html" class="dock-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
      <span>Pustaka</span>
    </a>
    <a href="${root}laporan-keuangan/index.html" class="dock-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      <span>Keuangan</span>
    </a>
  `;

  const dockSearch = document.getElementById('btn-dock-search');
  if (dockSearch) {
    dockSearch.addEventListener('click', () => {
      const searchModal = document.getElementById('search-modal');
      if (searchModal) {
        searchModal.classList.add('is-open');
        const input = searchModal.querySelector('input');
        if (input) input.focus();
      }
    });
  }
}

/**
 * Initialize Command Palette (Search Ctrl+K)
 */
function initSearchModal() {
  if (document.getElementById('search-modal')) return;

  const root = getRootPrefix();
  const modal = document.createElement('div');
  modal.id = 'search-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-dialog-search" role="dialog" aria-modal="true" aria-label="Pencarian Cepat">
      <div class="search-input-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="search-input" id="search-query-input" placeholder="Ketik kata kunci (contoh: masjid, sejarah, lazismu, sk)..." autocomplete="off" />
        <button type="button" class="btn-icon" id="btn-close-search" aria-label="Tutup pencarian">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="search-results-list" id="search-results-container">
        <!-- Results injected here -->
      </div>
      <div class="search-modal-footer">
        <span>Tekan <b>ESC</b> untuk keluar</span>
        <span><b>${ALL_83_PAGES_MANIFEST.length}</b> Halaman Terindeks</span>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const openBtn = document.getElementById('btn-open-search');
  const closeBtn = document.getElementById('btn-close-search');
  const queryInput = document.getElementById('search-query-input');
  const resultsContainer = document.getElementById('search-results-container');

  const openSearch = () => {
    modal.classList.add('is-open');
    queryInput.value = '';
    renderSearchResults('');
    setTimeout(() => queryInput.focus(), 50);
  };

  const closeSearch = () => {
    modal.classList.remove('is-open');
  };

  if (openBtn) openBtn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeSearch();
    }
  });

  const renderSearchResults = (query) => {
    const q = query.trim().toLowerCase();
    const matches = ALL_83_PAGES_MANIFEST.filter(p => {
      if (!q) return true;
      return p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q) || (p.preview && p.preview.toLowerCase().includes(q));
    }).slice(0, 15);

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--color-text-muted);">Tidak ditemukan hasil untuk "${escapeHTML(query)}"</div>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(m => {
      const localRelPath = m.path.replace('/view/prm-bangunjiwo-barat', '').replace(/^\//, '');
      const targetUrl = localRelPath === '' ? `${root}index.html` : `${root}${localRelPath}/index.html`;
      const displayPath = localRelPath === '' ? '/' : `/${localRelPath}`;

      return `
        <a href="${targetUrl}" class="search-result-item">
          <div>
            <div style="font-weight: 600; font-size: 0.95rem;">${escapeHTML(m.title)}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted); font-family: monospace;">${escapeHTML(displayPath)}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      `;
    }).join('');
  };

  queryInput.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });
}

/**
 * Initialize Light / Dark theme toggle
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  if (!toggleBtn) return;

  const sunIcon = toggleBtn.querySelector('.icon-sun');
  const moonIcon = toggleBtn.querySelector('.icon-moon');

  const updateIcons = (theme) => {
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }
  };

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcons(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateIcons(next);
  });
}
