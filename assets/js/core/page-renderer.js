/**
 * Portal Resmi PRM Bangunjiwo Barat
 * Page Renderer: page-renderer.js
 * Principles: Clean Code, Interactive Rich UI (ui-taste & animate), Semantic Layout, Zero Em-Dash
 */

import {
  WORSHIP_PLACES,
  FINANCIAL_REPORT,
  LEADERSHIP_DATA,
  DIGITAL_LIBRARY,
  EXTERNAL_LIBRARIES,
  EDUCATION_INSTITUTIONS,
  PROKER_DB
} from '../data/site-database.js';
import { escapeHTML, formatRupiah } from './dom-utils.js';
import { getRootPrefix } from './layout-shell.js';

/**
 * Render Masjid & Mushola Directory with Instant Filter & Authentic Photos
 * @param {HTMLElement} containerEl
 */
export function renderMasjidDirectory(containerEl) {
  if (!containerEl) return;

  const root = getRootPrefix();
  const padukuhanList = ['Semua', 'Sambikerep', 'Lemahdadi', 'Karangjati', 'Wonotawang', 'Kalibatok', 'Gendeng', 'Ngentak', 'Cikalan', 'Bibis', 'Kenalan', 'Pandan Asri'];

  containerEl.innerHTML = `
    <div class="filter-bar" role="tablist" aria-label="Filter Padukuhan">
      ${padukuhanList.map((p, i) => `
        <button type="button" class="filter-btn ${i === 0 ? 'is-active' : ''}" role="tab" aria-selected="${i === 0 ? 'true' : 'false'}" data-padukuhan="${p}">
          ${escapeHTML(p)}
        </button>
      `).join('')}
    </div>

    <div class="grid-masjid" id="masjid-cards-grid">
      <!-- Injected via updateGrid -->
    </div>
  `;

  const grid = containerEl.querySelector('#masjid-cards-grid');
  const buttons = containerEl.querySelectorAll('.filter-btn');

  const updateGrid = (selectedPadukuhan) => {
    const selLower = selectedPadukuhan.toLowerCase();
    const filtered = WORSHIP_PLACES.filter(m => {
      if (selectedPadukuhan === 'Semua') return true;
      const padukuhanVal = (m.padukuhan || '').toLowerCase();
      const nameVal = (m.name || '').toLowerCase();
      const descVal = (m.desc || '').toLowerCase();
      return padukuhanVal.includes(selLower) || nameVal.includes(selLower) || descVal.includes(selLower);
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--color-text-muted);">Tidak ada masjid atau mushola di padukuhan ini.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(m => {
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.name + ' Bangunjiwo Kasihan Bantul')}`;
      const detailUrl = m.slug ? `${root}masjid-mushola-binaan-prm/${m.slug}/index.html` : '#';
      const thumbSrc = m.thumb ? `${root}${m.thumb}` : '';

      return `
        <article class="masjid-card">
          ${thumbSrc ? `
            <a href="${detailUrl}" class="masjid-thumb-wrap" aria-label="Lihat foto ${escapeHTML(m.name)}">
              <img src="${thumbSrc}" alt="Foto ${escapeHTML(m.name)}" class="masjid-thumb-img" loading="lazy" />
            </a>
          ` : ''}
          <div class="masjid-card-header">
            <div class="masjid-badge-row">
              <span class="badge ${m.type === 'Masjid' ? 'badge-emerald' : 'badge-gold'}">${escapeHTML(m.type)}</span>
              <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">${m.images && m.images.length ? m.images.length + ' Foto Asli' : 'PRM BB'}</span>
            </div>
            <h3 class="masjid-name">${escapeHTML(m.name)}</h3>
            <p class="masjid-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Padukuhan ${escapeHTML(m.padukuhan || 'Bangunjiwo Barat')}</span>
            </p>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.75rem; line-height: 1.5;">
              ${escapeHTML(m.desc || 'Pusat kegiatan sholat berjamaah dan pengajian warga binaan.')}
            </p>
          </div>
          <div class="masjid-card-action">
            <a href="${detailUrl}" class="btn btn-outline" style="padding: 0.35rem 0.65rem; font-size: 0.8rem; min-height: 34px;">
              Profil &amp; Foto
            </a>
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.35rem 0.65rem; font-size: 0.8rem; min-height: 34px;">
              Buka Maps
            </a>
          </div>
        </article>
      `;
    }).join('');
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      updateGrid(btn.dataset.padukuhan);
    });
  });

  updateGrid('Semua');
}

/**
 * Render Financial Dashboard with Inflow/Outflow and Program Budget
 * @param {HTMLElement} containerEl
 */
export function renderFinancialDashboard(containerEl) {
  if (!containerEl) return;

  const f = FINANCIAL_REPORT;
  const totalIncome = f.summary ? f.summary.totalIncome : 87340000;
  const totalExpense = f.summary ? f.summary.totalExpense : 87340000;
  const finalBalance = f.summary ? f.summary.finalBalance : 0;

  containerEl.innerHTML = `
    <div class="finance-stats-grid">
      <div class="finance-stat-card">
        <span class="finance-stat-label">Total Pemasukan (${escapeHTML(f.period || '2023-2026')})</span>
        <span class="finance-stat-val" style="color: var(--color-primary-700);">${formatRupiah(totalIncome)}</span>
        <span class="badge badge-emerald" style="width: fit-content;">100% Terverifikasi</span>
      </div>
      <div class="finance-stat-card">
        <span class="finance-stat-label">Total Pengeluaran Program</span>
        <span class="finance-stat-val" style="color: var(--color-accent-600);">${formatRupiah(totalExpense)}</span>
        <span class="badge badge-gold" style="width: fit-content;">Terserap Optimal</span>
      </div>
      <div class="finance-stat-card">
        <span class="finance-stat-label">Saldo Kas Akhir (Sep 2026)</span>
        <span class="finance-stat-val">${formatRupiah(finalBalance)}</span>
        <span style="font-size: 0.8rem; color: var(--color-text-muted);">Saldo Awal: Rp 0</span>
      </div>
    </div>

    <div class="grid-cards" style="margin-bottom: 2.5rem;">
      <!-- Rincian Pemasukan -->
      <div class="card">
        <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: var(--color-primary-800);">Proporsi Sumber Pemasukan</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${(f.incomeBreakdown || []).map(item => `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.35rem;">
                <span>${escapeHTML(item.source)}</span>
                <span>${formatRupiah(item.amount)} (${item.percentage}%)</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${item.percentage}%;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Rincian Pengeluaran -->
      <div class="card">
        <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: var(--color-primary-800);">Alokasi Penggunaan Dana</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${(f.expenseBreakdown || []).map(item => `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.35rem;">
                <span>${escapeHTML(item.category)}</span>
                <span>${formatRupiah(item.amount)} (${item.percentage}%)</span>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill" style="width: ${item.percentage}%; background: linear-gradient(90deg, var(--color-accent-600), var(--color-accent-400));"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="data-table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>Kategori Transaksi</th>
            <th>Uraian Pos Keuangan</th>
            <th>Persentase</th>
            <th>Nominal Realisasi</th>
          </tr>
        </thead>
        <tbody>
          ${(f.incomeBreakdown || []).map(item => `
            <tr>
              <td><span class="badge badge-emerald">Pemasukan</span></td>
              <td style="font-weight: 600;">${escapeHTML(item.source)}</td>
              <td>${item.percentage}%</td>
              <td style="font-weight: 700; color: var(--color-primary-700);">${formatRupiah(item.amount)}</td>
            </tr>
          `).join('')}
          ${(f.expenseBreakdown || []).map(item => `
            <tr>
              <td><span class="badge badge-gold">Pengeluaran</span></td>
              <td style="font-weight: 600;">${escapeHTML(item.category)}</td>
              <td>${item.percentage}%</td>
              <td style="font-weight: 700; color: var(--color-accent-700);">${formatRupiah(item.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Render Digital Library Catalog & On-Demand PDF Reader Modal
 * @param {HTMLElement} containerEl
 */
export function renderLibraryCatalog(containerEl) {
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="grid-cards" style="margin-bottom: 2.5rem;">
      ${DIGITAL_LIBRARY.map(book => `
        <article class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span class="badge badge-emerald">${escapeHTML(book.category)}</span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">PDF Resmi</span>
          </div>
          <h3 class="card-title" style="font-size: 1.1rem;">${escapeHTML(book.title)}</h3>
          <p class="card-text">${escapeHTML(book.desc)}</p>
          <div class="card-footer-meta">
            <span>Koleksi Digital</span>
            <button type="button" class="btn btn-primary btn-open-pdf" data-drive-id="${book.driveId}" data-title="${escapeHTML(book.title)}" style="padding: 0.4rem 0.85rem; font-size: 0.825rem; min-height: 36px;">
              Baca Dokumen
            </button>
          </div>
        </article>
      `).join('')}
    </div>

    <div class="card" style="background-color: var(--color-surface-elevated);">
      <h3 style="font-size: 1.15rem; margin-bottom: 1rem; color: var(--color-primary-800);">Jaringan Pustaka &amp; Referensi Eksternal</h3>
      <div class="grid-cards">
        ${EXTERNAL_LIBRARIES.map(ext => `
          <a href="${ext.url}" target="_blank" rel="noopener noreferrer" class="card" style="text-decoration: none;">
            <h4 style="font-size: 1rem; color: var(--color-primary-700); margin-bottom: 0.35rem;">${escapeHTML(ext.name)} &nearr;</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin: 0;">${escapeHTML(ext.desc)}</p>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  initPdfReaderModal();
}

function initPdfReaderModal() {
  let modal = document.getElementById('pdf-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'pdf-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-dialog-pdf" role="dialog" aria-modal="true" aria-label="Pembaca Dokumen">
        <div class="modal-header">
          <h4 id="pdf-modal-title" style="margin: 0; font-size: 1rem;">Pratinjau Dokumen</h4>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <a id="pdf-external-link" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; min-height: 34px;">Buka Tab Baru &nearr;</a>
            <button type="button" class="btn-icon" id="pdf-modal-close" aria-label="Tutup pembaca dokumen">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
        <div class="modal-body-pdf" id="pdf-frame-container"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#pdf-modal-close');
    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.querySelector('#pdf-frame-container').innerHTML = '';
    };
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.querySelectorAll('.btn-open-pdf').forEach(btn => {
    btn.addEventListener('click', () => {
      const driveId = btn.dataset.driveId;
      const title = btn.dataset.title || 'Dokumen Persyarikatan';
      const titleEl = document.getElementById('pdf-modal-title');
      const extLink = document.getElementById('pdf-external-link');
      const frameContainer = document.getElementById('pdf-frame-container');

      if (titleEl) titleEl.textContent = title;
      if (extLink) extLink.href = `https://drive.google.com/file/d/${driveId}/view`;
      if (frameContainer) {
        frameContainer.innerHTML = `<iframe src="https://drive.google.com/file/d/${driveId}/preview" title="${escapeHTML(title)}" allow="autoplay"></iframe>`;
      }
      modal.classList.add('is-open');
    });
  });
}

/**
 * Render YouTube Lite Facade (Privacy-Enhanced & Vercel-Ready)
 * @param {HTMLElement} el
 * @param {string} videoId
 * @param {string} title
 */
export function renderYouTubeLite(el, videoId, title) {
  if (!el || !videoId) return;

  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  el.innerHTML = `
    <img src="${thumbUrl}" alt="${escapeHTML(title)}" loading="lazy" />
    <div class="yt-play-btn" aria-label="Putar Video ${escapeHTML(title)}">
      <svg viewBox="0 0 24 24"><polygon points="8 5 19 12 8 19 8 5"></polygon></svg>
    </div>
  `;

  el.addEventListener('click', () => {
    el.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0"
        title="${escapeHTML(title)}"
        frameborder="0"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
  }, { once: true });
}

/**
 * Render Interactive Hierarchical Leadership Directory (PRM & PRA Org Chart)
 * @param {HTMLElement} containerEl
 */
export function renderLeadershipDirectory(containerEl) {
  if (!containerEl) return;

  const { advisors, bph, viceChairmen, sections, praAisyiyah } = LEADERSHIP_DATA;

  // Map Vice Chairmen index to section numbers so clicking a Vice Chairman highlights/filters its sections
  const vcSectionMapping = {
    'all': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    '0': [0, 1, 7],      // Endro Dwi Hatmanto: Tarjih (1), Tabligh (2), Pembinaan Masjid (8)
    '1': [3, 10],        // Arie Kusuma Paksi: Ekraf/LH (4), Kesehatan (11)
    '2': [2, 9, 11],     // Agil Dwi Raharjo: Seni Budaya (3), Pendidikan (10), Kader (12)
    '3': [4, 5],         // Edisud: Resiliensi Bencana (5), Wakaf (6)
    '4': [6, 8]          // Iswinardi: Advokasi/Hukum/HAM (7), Pustaka & Info (9)
  };

  containerEl.innerHTML = `
    <!-- Interactive Organization Switcher Tabs (Filled Active State) -->
    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem;">
      <div class="org-tabs-bar" role="tablist" aria-label="Pilih Struktur Organisasi" style="margin-bottom: 0;">
        <button type="button" class="org-tab-btn is-active" role="tab" aria-selected="true" data-org-tab="all">
          Semua Struktur (PRM &amp; PRA)
        </button>
        <button type="button" class="org-tab-btn" role="tab" aria-selected="false" data-org-tab="prm">
          Bagan Hirarki PRM (Muhammadiyah)
        </button>
        <button type="button" class="org-tab-btn" role="tab" aria-selected="false" data-org-tab="pra">
          Bagan Hirarki PRA ('Aisyiyah)
        </button>
      </div>

      <div style="flex: 1; min-width: 250px; max-width: 360px;">
        <input
          type="search"
          id="leadership-search-input"
          placeholder="Cari nama pengurus atau bagian..."
          aria-label="Cari nama pengurus atau bagian"
          style="width: 100%; padding: 0.6rem 1rem; border-radius: var(--radius-md); border: 1.5px solid var(--color-border-medium); background-color: var(--color-surface-card); color: var(--color-text-main); font-size: 0.9rem;"
        />
      </div>
    </div>

    <!-- PANEL 1: STRUKTUR HIRARKI PRM BANGUNJIWO BARAT -->
    <div id="org-panel-prm" style="margin-bottom: 3.5rem;">
      <div class="org-tree-box">
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <span class="badge badge-emerald" style="margin-bottom: 0.4rem;">Bagan Struktur Organisasi Interaktif</span>
          <h3 style="color: var(--color-primary-800); margin-bottom: 0.25rem;">Badan Pembina &amp; Pimpinan Harian (BPH) PRM</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); margin: 0;">Klik pada salah satu kartu <b>Wakil Ketua</b> di bawah untuk memfilter Bagian Pelaksana yang dikoordinasikan.</p>
        </div>

        <!-- LEVEL 1: DEWAN PENASEHAT -->
        <div class="org-level">
          <div class="org-advisors-node">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-primary-700); margin-bottom: 0.5rem;">
              Dewan Penasehat PRM Bangunjiwo Barat
            </div>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.45rem;">
              ${advisors.map(adv => `<span class="badge badge-emerald" style="font-size: 0.82rem; padding: 0.35rem 0.75rem;">${escapeHTML(adv)}</span>`).join('')}
            </div>
          </div>

          <div class="org-connector-v" aria-hidden="true"></div>

          <!-- LEVEL 2: KETUA PRM -->
          <div class="org-ketua-node">
            <span class="badge badge-gold" style="margin-bottom: 0.35rem;">Ketua Umum PRM</span>
            <h4>${escapeHTML(bph.ketua)}</h4>
            <div style="font-size: 0.82rem; opacity: 0.9;">Pimpinan Ranting Muhammadiyah Bangunjiwo Barat (2022-2027)</div>
          </div>

          <div class="org-connector-v" aria-hidden="true"></div>

          <!-- LEVEL 3: SEKRETARIS & BENDAHARA (BPH) -->
          <div class="org-bph-branches">
            <div class="org-bph-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="badge badge-emerald">Kesekretariatan BPH</span>
                <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">Administrasi Umum</span>
              </div>
              <div style="margin-bottom: 0.5rem;">
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Sekretaris:</div>
                <div style="font-size: 1.05rem; font-weight: 700; color: var(--color-text-main);">${escapeHTML(bph.sekretaris)}</div>
              </div>
              <div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Wakil Sekretaris:</div>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-secondary);">${escapeHTML(bph.wakilSekretaris)}</div>
              </div>
            </div>

            <div class="org-bph-card is-treasury">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="badge badge-gold">Kebendaharaan BPH</span>
                <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">Manajemen Kas &amp; Aset</span>
              </div>
              <div style="margin-bottom: 0.5rem;">
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Bendahara:</div>
                <div style="font-size: 1.05rem; font-weight: 700; color: var(--color-text-main);">${escapeHTML(bph.bendahara)}</div>
              </div>
              <div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Wakil Bendahara:</div>
                <div style="font-size: 0.95rem; font-weight: 600; color: var(--color-text-secondary);">${escapeHTML(bph.wakilBendahara)}</div>
              </div>
            </div>
          </div>

          <div class="org-connector-v" aria-hidden="true"></div>

          <!-- LEVEL 4: 5 WAKIL KETUA KOORDINATOR BIDANG (INTERACTIVE FILTER) -->
          <div style="width: 100%; margin-bottom: 0.5rem;">
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.85rem;">
              <h4 style="margin: 0; font-size: 1rem; color: var(--color-primary-800);">5 Wakil Ketua Koordinator Bidang (Klik untuk Filter Bagian):</h4>
              <button type="button" class="filter-btn is-active" id="btn-reset-vc-filter" data-vc-index="all" style="min-height: 34px; padding: 0.35rem 0.85rem; font-size: 0.8rem;">
                Tampilkan Semua 12 Bagian
              </button>
            </div>

            <div class="org-vc-grid">
              ${viceChairmen.map((vc, idx) => `
                <button type="button" class="org-vc-card" data-vc-index="${idx}" aria-pressed="false">
                  <div>
                    <span class="badge badge-emerald" style="margin-bottom: 0.5rem;">${escapeHTML(vc.role)}</span>
                    <h4 style="font-size: 1.05rem; margin-bottom: 0.3rem; color: var(--color-text-main);">${escapeHTML(vc.name)}</h4>
                    <p style="font-size: 0.8rem; color: var(--color-primary-700); font-weight: 600; margin-bottom: 0.5rem; line-height: 1.4;">${escapeHTML(vc.bidang)}</p>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted); padding-top: 0.5rem; border-top: 1px solid rgba(0,0,0,0.06);">
                    Koordinasi: <b>${vc.sections.length} Bagian</b> &rarr;
                  </div>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- LEVEL 5: 12 BAGIAN PELAKSANA PROGRAM PRM -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem;">
          <h3 style="margin: 0; color: var(--color-primary-800);" id="prm-sections-heading">12 Bagian Pelaksana Program PRM</h3>
          <span class="badge badge-emerald" id="prm-sections-count">Menampilkan 12 Bagian</span>
        </div>
        <div class="grid-cards" id="prm-sections-grid">
          ${sections.map((sec, idx) => `
            <div class="card prm-section-card" data-sec-index="${idx}">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
                <h4 style="font-size: 1.05rem; color: var(--color-primary-800); margin: 0;">${escapeHTML(sec.name)}</h4>
                <span class="badge badge-gold" style="flex-shrink: 0;">${sec.anggota.length + 1} Personel</span>
              </div>
              <p style="font-size: 0.875rem; color: var(--color-text-main); margin-bottom: 0.5rem;">
                Ketua Bagian: <b style="color: var(--color-primary-700);">${escapeHTML(sec.koordinator)}</b>
              </p>
              <div style="font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; margin-bottom: 0.25rem;">Anggota Pelaksana:</div>
              <div class="member-chip-list">
                ${sec.anggota.map(a => `<span class="member-chip">${escapeHTML(a)}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- PANEL 2: STRUKTUR HIRARKI PRA 'AISYIYAH BANGUNJIWO BARAT -->
    <div id="org-panel-pra">
      <div class="org-tree-box">
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <span class="badge badge-gold" style="margin-bottom: 0.4rem;">Gerakan Perempuan Islam Berkemajuan</span>
          <h3 style="color: var(--color-primary-800); margin-bottom: 0.25rem;">Bagan Hirarki Pimpinan Ranting 'Aisyiyah (PRA)</h3>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); margin: 0;">Struktur Badan Pimpinan Harian (BPH) serta 9 Majelis &amp; Lembaga PRA Bangunjiwo Barat Periode 2022-2027.</p>
        </div>

        <div class="org-level">
          <!-- PENASEHAT PRA -->
          <div class="org-advisors-node" style="max-width: 480px;">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-accent-700); margin-bottom: 0.35rem;">
              Penasehat PRA Bangunjiwo Barat
            </div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-primary-800);">
              ${escapeHTML(praAisyiyah.bph.penasehat)}
            </div>
          </div>

          <div class="org-connector-v" aria-hidden="true"></div>

          <!-- KETUA I, II, III PRA -->
          <div class="org-bph-branches" style="max-width: 920px;">
            <div class="org-ketua-node" style="min-width: 220px; padding: 1rem 1.25rem;">
              <span class="badge badge-gold" style="margin-bottom: 0.25rem;">Ketua I PRA</span>
              <h4 style="font-size: 1.1rem;">${escapeHTML(praAisyiyah.bph.ketua1)}</h4>
            </div>
            <div class="org-ketua-node" style="min-width: 220px; padding: 1rem 1.25rem; background: linear-gradient(135deg, var(--color-primary-700), var(--color-primary-600));">
              <span class="badge badge-gold" style="margin-bottom: 0.25rem;">Ketua II PRA</span>
              <h4 style="font-size: 1.1rem;">${escapeHTML(praAisyiyah.bph.ketua2)}</h4>
            </div>
            <div class="org-ketua-node" style="min-width: 220px; padding: 1rem 1.25rem; background: linear-gradient(135deg, var(--color-primary-700), var(--color-primary-600));">
              <span class="badge badge-gold" style="margin-bottom: 0.25rem;">Ketua III PRA</span>
              <h4 style="font-size: 1.1rem;">${escapeHTML(praAisyiyah.bph.ketua3)}</h4>
            </div>
          </div>

          <div class="org-connector-v" aria-hidden="true"></div>

          <!-- SEKRETARIS & BENDAHARA PRA -->
          <div class="org-bph-branches">
            <div class="org-bph-card">
              <span class="badge badge-emerald" style="margin-bottom: 0.5rem;">Sekretaris I, II &amp; III PRA</span>
              <div style="font-size: 0.92rem; line-height: 1.6; color: var(--color-text-main);">
                <div>1. <b>${escapeHTML(praAisyiyah.bph.sekretaris1)}</b> (Sekretaris I)</div>
                <div>2. <b>${escapeHTML(praAisyiyah.bph.sekretaris2)}</b> (Sekretaris II)</div>
                <div>3. <b>${escapeHTML(praAisyiyah.bph.sekretaris3)}</b> (Sekretaris III)</div>
              </div>
            </div>
            <div class="org-bph-card is-treasury">
              <span class="badge badge-gold" style="margin-bottom: 0.5rem;">Bendahara I &amp; II PRA</span>
              <div style="font-size: 0.92rem; line-height: 1.6; color: var(--color-text-main);">
                <div>1. <b>${escapeHTML(praAisyiyah.bph.bendahara1)}</b> (Bendahara I)</div>
                <div>2. <b>${escapeHTML(praAisyiyah.bph.bendahara2)}</b> (Bendahara II)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 9 MAJELIS & LEMBAGA PRA -->
      <h3 style="margin-bottom: 1.25rem; color: var(--color-primary-800);">9 Majelis &amp; Lembaga Pelaksana PRA Bangunjiwo Barat</h3>
      <div class="grid-cards" id="pra-majelis-grid">
        ${praAisyiyah.majelis.map(m => `
          <div class="card pra-majelis-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
              <span class="badge badge-emerald">Majelis / Lembaga PRA</span>
              <span class="badge badge-gold">${m.anggota.length} Anggota</span>
            </div>
            <h4 style="font-size: 1.05rem; color: var(--color-primary-800); margin-bottom: 0.35rem;">${escapeHTML(m.nama)}</h4>
            <p style="font-size: 0.825rem; color: var(--color-primary-700); font-weight: 600; margin-bottom: 0.5rem;">${escapeHTML(m.pimpinan)}</p>
            <div class="member-chip-list">
              ${m.anggota.map(a => `<span class="member-chip">${escapeHTML(a)}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // 1. Interactive Tab Switcher (All / PRM / PRA)
  const tabBtns = containerEl.querySelectorAll('.org-tab-btn');
  const panelPrm = containerEl.querySelector('#org-panel-prm');
  const panelPra = containerEl.querySelector('#org-panel-pra');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const tab = btn.dataset.orgTab;
      if (tab === 'prm') {
        panelPrm.style.display = 'block';
        panelPra.style.display = 'none';
      } else if (tab === 'pra') {
        panelPrm.style.display = 'none';
        panelPra.style.display = 'block';
      } else {
        panelPrm.style.display = 'block';
        panelPra.style.display = 'block';
      }
    });
  });

  // 2. Interactive Vice Chairman Filter on Hierarchy Tree
  const vcCards = containerEl.querySelectorAll('.org-vc-card');
  const resetVcBtn = containerEl.querySelector('#btn-reset-vc-filter');
  const secCards = containerEl.querySelectorAll('.prm-section-card');
  const secCountBadge = containerEl.querySelector('#prm-sections-count');
  const sectionsHeading = containerEl.querySelector('#prm-sections-heading');

  const applyVcFilter = (vcKey) => {
    const allowedIndices = vcSectionMapping[vcKey] || vcSectionMapping['all'];
    let visibleCount = 0;
    secCards.forEach(card => {
      const idx = Number(card.dataset.secIndex);
      if (allowedIndices.includes(idx)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    if (secCountBadge) {
      secCountBadge.textContent = `Menampilkan ${visibleCount} Bagian`;
    }
  };

  vcCards.forEach(card => {
    card.addEventListener('click', () => {
      const vcIdx = card.dataset.vcIndex;
      const alreadySelected = card.classList.contains('is-selected');
      vcCards.forEach(c => {
        c.classList.remove('is-selected');
        c.setAttribute('aria-pressed', 'false');
      });

      if (alreadySelected) {
        if (resetVcBtn) resetVcBtn.classList.add('is-active');
        applyVcFilter('all');
      } else {
        card.classList.add('is-selected');
        card.setAttribute('aria-pressed', 'true');
        if (resetVcBtn) resetVcBtn.classList.remove('is-active');
        applyVcFilter(vcIdx);
      }
      if (sectionsHeading) sectionsHeading.scrollIntoView({ block: 'start' });
    });
  });

  if (resetVcBtn) {
    resetVcBtn.addEventListener('click', () => {
      vcCards.forEach(c => {
        c.classList.remove('is-selected');
        c.setAttribute('aria-pressed', 'false');
      });
      resetVcBtn.classList.add('is-active');
      applyVcFilter('all');
    });
  }

  // 3. Instant Search Filter across PRM Sections & PRA Majelis
  const searchInput = containerEl.querySelector('#leadership-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      let visiblePrm = 0;
      secCards.forEach(card => {
        const match = !q || card.textContent.toLowerCase().includes(q);
        card.style.display = match ? 'flex' : 'none';
        if (match) visiblePrm++;
      });
      if (secCountBadge) secCountBadge.textContent = `Menampilkan ${visiblePrm} Bagian`;

      containerEl.querySelectorAll('.pra-majelis-card').forEach(card => {
        const match = !q || card.textContent.toLowerCase().includes(q);
        card.style.display = match ? 'flex' : 'none';
      });
    });
  }
}

/**
 * Render Schools Directory (Amal Usaha Pendidikan) Complete Schema with Authentic Photos
 * @param {HTMLElement} containerEl
 */
export function renderSchoolsDirectory(containerEl) {
  if (!containerEl) return;
  const root = getRootPrefix();

  containerEl.innerHTML = `
    <div class="grid-cards grid-schools">
      ${EDUCATION_INSTITUTIONS.map(s => {
        const detailUrl = `${root}${s.url ? s.url.replace(/^\//, '') : 'amal-usaha-pendidikan/' + s.slug}/index.html`;
        const thumbSrc = s.thumb ? `${root}${s.thumb}` : '';
        return `
          <article class="card school-card">
            ${thumbSrc ? `
              <a href="${detailUrl}" class="masjid-thumb-wrap" aria-label="Foto ${escapeHTML(s.name)}">
                <img src="${thumbSrc}" alt="Foto ${escapeHTML(s.name)}" class="masjid-thumb-img" loading="lazy" />
              </a>
            ` : ''}
            <div class="school-card-body">
              <div class="school-badge-row">
                <span class="badge badge-emerald">${escapeHTML(s.level)}</span>
                <span class="badge badge-gold">${s.videos ? s.videos.length : 0} Video &bull; ${s.images ? s.images.length : 0} Foto</span>
              </div>
              <h3 class="card-title">${escapeHTML(s.name)}</h3>
              <p class="school-highlight">${escapeHTML(s.badge)}</p>
              <p class="card-text">${escapeHTML(s.desc)}</p>
              <div class="school-location-meta">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${escapeHTML(s.location)}</span>
              </div>
              <div class="card-footer-meta">
                <a href="${detailUrl}" class="btn btn-outline" style="width: 100%; justify-content: center; padding: 0.45rem 0.85rem; font-size: 0.85rem; min-height: 38px;">
                  Profil, Foto &amp; Video &rarr;
                </a>
              </div>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

/**
 * Render Program Kerja List by Year with Interactive Filter & Filled Active Buttons
 * @param {HTMLElement} containerEl
 * @param {number|string} year
 */
export function renderProkerTimeline(containerEl, year) {
  if (!containerEl) return;

  const renderItems = (selectedYear, searchQuery = '') => {
    const q = searchQuery.trim().toLowerCase();
    const items = PROKER_DB.filter(p => {
      const yearMatch = !selectedYear || selectedYear === 'all' || String(p.year) === String(selectedYear);
      if (!yearMatch) return false;
      if (!q) return true;
      return (p.title && p.title.toLowerCase().includes(q)) ||
             (p.description && p.description.toLowerCase().includes(q)) ||
             (p.pic && p.pic.toLowerCase().includes(q));
    });

    const listEl = containerEl.querySelector('#proker-cards-mount');
    const countEl = containerEl.querySelector('#proker-count-label');
    if (countEl) {
      countEl.innerHTML = `Menampilkan <b>${items.length}</b> agenda kerja terverifikasi${selectedYear && selectedYear !== 'all' ? ` untuk <b>Tahun ${escapeHTML(String(selectedYear))}</b>` : ' (2023-2026)'}.`;
    }

    if (!listEl) return;
    if (items.length === 0) {
      listEl.innerHTML = `<div style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--color-text-muted);">Tidak ditemukan program kerja yang cocok dengan kata kunci tersebut.</div>`;
      return;
    }

    listEl.innerHTML = items.slice(0, 60).map(item => `
      <article class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span class="badge badge-emerald">Tahun ${item.year}</span>
          <span class="badge ${item.status === 'Selesai' ? 'badge-emerald' : 'badge-gold'}">${escapeHTML(item.status)}</span>
        </div>
        <h3 class="card-title" style="font-size: 1.05rem;">${escapeHTML(item.title)}</h3>
        <p class="card-text" style="font-size: 0.85rem;">${escapeHTML(item.description)}</p>
        <div class="card-footer-meta">
          <span>Bidang: <b>${escapeHTML(item.pic)}</b></span>
        </div>
      </article>
    `).join('');
  };

  containerEl.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem;">
      <div id="proker-count-label" style="font-size: 0.92rem; color: var(--color-text-secondary);"></div>
      <div style="flex: 1; min-width: 240px; max-width: 340px;">
        <input
          type="search"
          id="proker-search-input"
          placeholder="Filter agenda atau bidang..."
          aria-label="Filter agenda atau bidang"
          style="width: 100%; padding: 0.55rem 0.9rem; border-radius: var(--radius-md); border: 1.5px solid var(--color-border-medium); background-color: var(--color-surface-card); color: var(--color-text-main); font-size: 0.875rem;"
        />
      </div>
    </div>
    <div class="grid-cards" id="proker-cards-mount"></div>
  `;

  let activeYear = year || 'all';
  renderItems(activeYear, '');

  const searchInput = containerEl.querySelector('#proker-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderItems(activeYear, e.target.value);
    });
  }
}

/**
 * Initialize Interactive Full-Screen Image Lightbox for all .gallery-card elements
 */
export function initImageLightbox() {
  const cards = Array.from(document.querySelectorAll('.gallery-card[data-lightbox-src]'));
  if (cards.length === 0) return;

  let modal = document.getElementById('image-lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Pratinjau Gambar Penuh');
    modal.innerHTML = `
      <div class="lightbox-content">
        <img id="lightbox-active-img" class="lightbox-img" src="" alt="" />
        <div class="lightbox-bar">
          <div>
            <div id="lightbox-active-caption" style="font-weight: 700;"></div>
            <div id="lightbox-active-counter" style="font-size: 0.8rem; opacity: 0.75;"></div>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" class="btn btn-outline" id="lightbox-prev-btn" style="color: #fff; border-color: rgba(255,255,255,0.4); padding: 0.4rem 0.85rem; min-height: 36px;">&larr; Sebelumnya</button>
            <button type="button" class="btn btn-outline" id="lightbox-next-btn" style="color: #fff; border-color: rgba(255,255,255,0.4); padding: 0.4rem 0.85rem; min-height: 36px;">Berikutnya &rarr;</button>
            <button type="button" class="btn btn-primary" id="lightbox-close-btn" style="padding: 0.4rem 0.85rem; min-height: 36px;">Tutup (Esc)</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  let currentIndex = 0;
  const imgEl = modal.querySelector('#lightbox-active-img');
  const capEl = modal.querySelector('#lightbox-active-caption');
  const countEl = modal.querySelector('#lightbox-active-counter');
  const prevBtn = modal.querySelector('#lightbox-prev-btn');
  const nextBtn = modal.querySelector('#lightbox-next-btn');
  const closeBtn = modal.querySelector('#lightbox-close-btn');

  const showAt = (idx) => {
    currentIndex = (idx + cards.length) % cards.length;
    const target = cards[currentIndex];
    imgEl.src = target.dataset.lightboxSrc;
    imgEl.alt = target.dataset.lightboxCaption || 'Dokumentasi PRM Bangunjiwo Barat';
    capEl.textContent = target.dataset.lightboxCaption || 'Dokumentasi PRM Bangunjiwo Barat';
    countEl.textContent = `Foto ${currentIndex + 1} dari ${cards.length}`;
    prevBtn.style.display = cards.length > 1 ? 'inline-flex' : 'none';
    nextBtn.style.display = cards.length > 1 ? 'inline-flex' : 'none';
    modal.classList.add('is-open');
  };

  const closeLightbox = () => {
    modal.classList.remove('is-open');
  };

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => showAt(idx));
  });

  prevBtn.onclick = () => showAt(currentIndex - 1);
  nextBtn.onclick = () => showAt(currentIndex + 1);
  closeBtn.onclick = closeLightbox;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showAt(currentIndex + 1);
    if (e.key === 'ArrowLeft') showAt(currentIndex - 1);
  });
}
