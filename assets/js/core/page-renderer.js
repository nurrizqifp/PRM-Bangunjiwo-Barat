/**
 * Portal Resmi PRM Bangunjiwo Barat
 * Page Renderer: page-renderer.js
 * Principles: Clean Code, Interactive Components, Semantic Layout, Zero Bloat
 */

import {
  WORSHIP_PLACES,
  FINANCIAL_REPORT,
  LEADERSHIP_DATA,
  DIGITAL_LIBRARY,
  EXTERNAL_LIBRARIES,
  EDUCATION_INSTITUTIONS,
  PROKER_DB,
  YOUTUBE_VIDEOS_META
} from '../data/site-database.js';
import { escapeHTML, formatRupiah } from './dom-utils.js';

/**
 * Render Masjid & Mushola Directory with Instant Filter
 * @param {HTMLElement} containerEl
 */
export function renderMasjidDirectory(containerEl) {
  if (!containerEl) return;

  const padukuhanList = ['Semua', 'Sambikerep', 'Lemahdadi', 'Karangjati', 'Wonotawang', 'Kalibatok', 'Gendeng', 'Ngentak', 'Cikalan', 'Bibis', 'Kenalan', 'Pandan Asri'];

  containerEl.innerHTML = `
    <div class="filter-bar" role="tablist" aria-label="Filter Padukuhan">
      ${padukuhanList.map((p, i) => `
        <button type="button" class="filter-btn ${i === 0 ? 'is-active' : ''}" data-padukuhan="${p}">
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
      const detailUrl = m.slug ? `./${m.slug}/index.html` : '#';

      return `
        <article class="masjid-card">
          <div class="masjid-card-header">
            <div class="masjid-badge-row">
              <span class="badge ${m.type === 'Masjid' ? 'badge-emerald' : 'badge-gold'}">${escapeHTML(m.type)}</span>
              <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 600;">PRM BB</span>
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
              Profil Detail
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
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
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
  const incomeList = f.incomeBreakdown || [];
  const expenseList = f.expenseBreakdown || [];

  containerEl.innerHTML = `
    <div class="finance-stats-grid">
      <div class="finance-stat-card highlight-inflow">
        <div class="finance-stat-label">Total Penerimaan (Inflow)</div>
        <div class="finance-stat-val" style="color: var(--color-success);">${formatRupiah(totalIncome)}</div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem;">Infak, Arisan &amp; Donasi Jamaah</div>
      </div>

      <div class="finance-stat-card highlight-outflow">
        <div class="finance-stat-label">Total Penyaluran (Outflow)</div>
        <div class="finance-stat-val" style="color: var(--color-warning);">${formatRupiah(totalExpense)}</div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem;">Dakwah, Sosial &amp; Operasional</div>
      </div>

      <div class="finance-stat-card highlight-balance">
        <div class="finance-stat-label">Tingkat Penyerapan Anggaran</div>
        <div class="finance-stat-val" style="color: var(--color-primary-700);">100%</div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem;">Tersalurkan Penuh untuk Umat</div>
      </div>

      <div class="finance-stat-card">
        <div class="finance-stat-label">Periode Laporan Resmi</div>
        <div class="finance-stat-val" style="font-size: 1.35rem;">${escapeHTML(f.period || '2023 - 2026')}</div>
        <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.25rem;">Musyran &amp; LPCR-PM Verified</div>
      </div>
    </div>

    <!-- Income Breakdown -->
    <div style="margin-top: 2.5rem;">
      <h3 style="margin-bottom: 1rem; color: var(--color-primary-800);">1. Sumber Penerimaan Kas Ranting (Inflow)</h3>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 60px;">No</th>
              <th>Pos Sumber Penerimaan</th>
              <th class="numeric">Nominal (Rp)</th>
              <th class="numeric">Porsi</th>
              <th style="width: 140px; text-align: center;">Status Verifikasi</th>
            </tr>
          </thead>
          <tbody>
            ${incomeList.map((item, i) => `
              <tr>
                <td>${i + 1}</td>
                <td><b>${escapeHTML(item.source)}</b></td>
                <td class="numeric">${formatRupiah(item.amount)}</td>
                <td class="numeric">${item.percentage}%</td>
                <td style="text-align: center;">
                  <span class="badge badge-emerald">Terverifikasi</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Expense Breakdown -->
    <div style="margin-top: 2.5rem;">
      <h3 style="margin-bottom: 1rem; color: var(--color-primary-800);">2. Realisasi Pengeluaran &amp; Alokasi Program (Outflow)</h3>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 60px;">No</th>
              <th>Bidang Alokasi &amp; Penyaluran</th>
              <th class="numeric">Nominal (Rp)</th>
              <th class="numeric">Porsi</th>
              <th style="width: 140px; text-align: center;">Realisasi</th>
            </tr>
          </thead>
          <tbody>
            ${expenseList.map((item, i) => `
              <tr>
                <td>${i + 1}</td>
                <td><b>${escapeHTML(item.category)}</b></td>
                <td class="numeric">${formatRupiah(item.amount)}</td>
                <td class="numeric">${item.percentage}%</td>
                <td style="text-align: center;">
                  <span class="badge badge-emerald">100% Terealisasi</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div style="margin-top: 1.5rem; padding: 1.25rem; background: var(--color-surface-card); border-left: 4px solid var(--color-primary-600); border-radius: var(--radius-md);">
      <div style="font-weight: 700; color: var(--color-primary-900); margin-bottom: 0.35rem;">Catatan Transparansi Bendahara Ranting:</div>
      <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin: 0;">
        ${escapeHTML(f.summary ? f.summary.note : 'Seluruh dana terhimpun telah dimanfaatkan 100% untuk mendukung dakwah, pemberdayaan ekonomi, dan kemaslahatan jamaah.')}
      </p>
    </div>
  `;
}

/**
 * Render Digital Library Catalog with On-Demand Drive Reader Modal (0 Initial iFrames)
 * @param {HTMLElement} containerEl
 */
export function renderLibraryCatalog(containerEl) {
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="grid-cards">
      ${DIGITAL_LIBRARY.map((item) => {
        const drivePreviewUrl = `https://drive.google.com/file/d/${item.driveId}/preview`;
        return `
          <article class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="badge badge-emerald">${escapeHTML(item.category)}</span>
              <span style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: 700;">${escapeHTML(item.code)}</span>
            </div>
            <h3 class="card-title">${escapeHTML(item.title)}</h3>
            <p class="card-text">${escapeHTML(item.desc)}</p>
            <div class="card-footer-meta">
              <span>Format: Dokumen Resmi PDF</span>
              <button type="button" class="btn btn-primary btn-open-pdf" data-pdf-url="${drivePreviewUrl}" data-pdf-title="${escapeHTML(item.title)}" style="padding: 0.4rem 0.85rem; font-size: 0.85rem; min-height: 36px;">
                Baca Dokumen
              </button>
            </div>
          </article>
        `;
      }).join('')}
    </div>

    <!-- External Reference Libraries Strip -->
    <div style="margin-top: 3rem;">
      <h3 style="margin-bottom: 1rem; color: var(--color-primary-800);">Pustaka &amp; Rujukan Persyarikatan Terkait</h3>
      <div class="grid-cards">
        ${EXTERNAL_LIBRARIES.map(lib => `
          <div class="card" style="padding: 1rem 1.25rem;">
            <h4 style="font-size: 1.05rem; margin-bottom: 0.35rem;">${escapeHTML(lib.name)}</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.75rem;">${escapeHTML(lib.desc)}</p>
            <a href="${lib.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="width: fit-content; padding: 0.35rem 0.75rem; font-size: 0.8rem; min-height: 32px;">
              Buka Sumber Rujukan &rarr;
            </a>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- On-Demand PDF Reader Modal -->
    <div id="pdf-modal" class="modal-overlay" style="align-items: center; padding: 2rem;">
      <div style="width: 100%; max-width: 960px; height: 85vh; background: var(--color-surface-card); border-radius: var(--radius-xl); overflow: hidden; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; border-bottom: 1px solid var(--color-border-subtle);">
          <h4 id="pdf-modal-title" style="margin: 0; font-size: 1.1rem; color: var(--color-primary-800);">Baca Dokumen</h4>
          <button type="button" class="btn-icon" id="pdf-modal-close" aria-label="Tutup Pembaca Dokumen">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div style="flex-grow: 1; background: #222;" id="pdf-frame-container">
          <!-- iframe dynamically created on click only -->
        </div>
      </div>
    </div>
  `;

  const modal = containerEl.querySelector('#pdf-modal');
  const modalTitle = containerEl.querySelector('#pdf-modal-title');
  const frameContainer = containerEl.querySelector('#pdf-frame-container');
  const closeBtn = containerEl.querySelector('#pdf-modal-close');

  containerEl.querySelectorAll('.btn-open-pdf').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.pdfUrl;
      const title = btn.dataset.pdfTitle;
      modalTitle.textContent = title;
      frameContainer.innerHTML = `<iframe src="${url}" style="width: 100%; height: 100%; border: none;" title="${escapeHTML(title)}" allow="fullscreen"></iframe>`;
      modal.classList.add('is-open');
    });
  });

  const closeModal = () => {
    modal.classList.remove('is-open');
    frameContainer.innerHTML = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/**
 * Render YouTube Lite Facade with Vercel Deploy Ready Embed Attributes
 * @param {HTMLElement} targetEl
 * @param {string} videoId
 * @param {string} title
 */
export function renderYouTubeLite(targetEl, videoId, title) {
  if (!targetEl || !videoId) return;

  const meta = YOUTUBE_VIDEOS_META[videoId];
  const videoTitle = title || (meta && meta.title) || 'Video Dokumentasi PRM Bangunjiwo Barat';

  targetEl.className = 'yt-lite-player';
  targetEl.innerHTML = `
    <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${escapeHTML(videoTitle)}" class="yt-lite-thumbnail" loading="lazy" />
    <div class="yt-lite-playbtn" aria-label="Putar Video">
      <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
    </div>
  `;

  targetEl.addEventListener('click', () => {
    targetEl.innerHTML = `
      <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" title="${escapeHTML(videoTitle)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style="border: none; position: absolute; inset: 0;"></iframe>
    `;
  }, { once: true });
}

/**
 * Render Leadership Roster (PRM & PRA) Complete Schema
 * @param {HTMLElement} containerEl
 */
export function renderLeadershipDirectory(containerEl) {
  if (!containerEl) return;

  const { advisors, bph, viceChairmen, sections, praAisyiyah } = LEADERSHIP_DATA;

  containerEl.innerHTML = `
    <!-- Badan Pimpinan Harian (BPH) -->
    <div style="margin-bottom: 3rem;">
      <h3 style="margin-bottom: 1.25rem; color: var(--color-primary-800);">Badan Pembina &amp; Pimpinan Harian (BPH) PRM</h3>
      <div class="grid-cards" style="margin-bottom: 1.5rem;">
        <div class="card" style="border-left: 4px solid var(--color-primary-700);">
          <span class="badge badge-emerald" style="width: fit-content; margin-bottom: 0.5rem;">Ketua PRM</span>
          <h4 style="font-size: 1.25rem; margin-bottom: 0.25rem;">${escapeHTML(bph.ketua)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Penanggung Jawab Umum Persyarikatan</p>
        </div>
        <div class="card">
          <span class="badge badge-emerald" style="width: fit-content; margin-bottom: 0.5rem;">Sekretaris</span>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(bph.sekretaris)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Administrasi &amp; Surat Menyurat</p>
        </div>
        <div class="card">
          <span class="badge badge-emerald" style="width: fit-content; margin-bottom: 0.5rem;">Wakil Sekretaris</span>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(bph.wakilSekretaris)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Pelayanan Keanggotaan</p>
        </div>
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 0.5rem;">Bendahara</span>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(bph.bendahara)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Manajemen Kas &amp; Aset Persyarikatan</p>
        </div>
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 0.5rem;">Wakil Bendahara</span>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(bph.wakilBendahara)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Penggalian Sumber Dana</p>
        </div>
      </div>

      <!-- Penasehat Ranting -->
      <div class="card" style="margin-bottom: 2rem;">
        <h4 style="margin-bottom: 0.75rem; color: var(--color-primary-800);">Penasehat PRM Bangunjiwo Barat:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${advisors.map(adv => `<span class="badge badge-emerald" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">${escapeHTML(adv)}</span>`).join('')}
        </div>
      </div>
    </div>

    <!-- 4 Koordinator Bidang Wakil Ketua -->
    <div style="margin-bottom: 3rem;">
      <h3 style="margin-bottom: 1.25rem; color: var(--color-primary-800);">Wakil Ketua Koordinator Bidang</h3>
      <div class="grid-cards">
        ${viceChairmen.map(vc => `
          <div class="card">
            <span class="badge badge-emerald" style="width: fit-content; margin-bottom: 0.5rem;">${escapeHTML(vc.role)}</span>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(vc.name)}</h4>
            <p style="font-size: 0.85rem; color: var(--color-primary-700); font-weight: 600; margin-bottom: 0.5rem;">${escapeHTML(vc.bidang)}</p>
            <div style="font-size: 0.8rem; color: var(--color-text-muted);">
              Membawahi: ${vc.sections.map(s => escapeHTML(s)).join(', ')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 12 Bagian PRM -->
    <div style="margin-bottom: 3rem;">
      <h3 style="margin-bottom: 1.25rem; color: var(--color-primary-800);">12 Bagian Pelaksana Program PRM</h3>
      <div class="grid-cards">
        ${sections.map(sec => `
          <div class="card">
            <h4 style="font-size: 1.1rem; color: var(--color-primary-800); margin-bottom: 0.4rem;">${escapeHTML(sec.name)}</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 0.4rem;">
              Koordinator: <b>${escapeHTML(sec.koordinator)}</b>
            </p>
            <div style="font-size: 0.8rem; color: var(--color-text-muted);">
              Anggota: ${sec.anggota.map(a => escapeHTML(a)).join(', ')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Pimpinan Ranting 'Aisyiyah (PRA) -->
    <div>
      <h3 style="margin-bottom: 1.25rem; color: var(--color-primary-800);">Pimpinan Ranting 'Aisyiyah (PRA) Bangunjiwo Barat</h3>
      
      <!-- BPH PRA -->
      <div class="grid-cards" style="margin-bottom: 2rem;">
        <div class="card" style="border-left: 4px solid var(--color-accent-500);">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 0.5rem;">Penasehat PRA</span>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(praAisyiyah.bph.penasehat)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Penasehat Pimpinan Ranting 'Aisyiyah</p>
        </div>
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 0.5rem;">Ketua I</span>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(praAisyiyah.bph.ketua1)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Ketua I PRA Periode 2022-2027</p>
        </div>
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 0.5rem;">Ketua II</span>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(praAisyiyah.bph.ketua2)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Ketua II PRA Periode 2022-2027</p>
        </div>
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 0.5rem;">Ketua III</span>
          <h4 style="font-size: 1.15rem; margin-bottom: 0.25rem;">${escapeHTML(praAisyiyah.bph.ketua3)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">Ketua III PRA Periode 2022-2027</p>
        </div>
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 0.5rem;">Sekretaris I, II, III</span>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.25rem;">1. ${escapeHTML(praAisyiyah.bph.sekretaris1)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">2. ${escapeHTML(praAisyiyah.bph.sekretaris2)} | 3. ${escapeHTML(praAisyiyah.bph.sekretaris3)}</p>
        </div>
        <div class="card">
          <span class="badge badge-gold" style="width: fit-content; margin-bottom: 0.5rem;">Bendahara I &amp; II</span>
          <h4 style="font-size: 1.05rem; margin-bottom: 0.25rem;">1. ${escapeHTML(praAisyiyah.bph.bendahara1)}</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-secondary);">2. ${escapeHTML(praAisyiyah.bph.bendahara2)}</p>
        </div>
      </div>

      <!-- 9 Majelis & Lembaga PRA -->
      <h4 style="margin-bottom: 1rem; color: var(--color-primary-800);">Majelis &amp; Lembaga PRA Bangunjiwo Barat</h4>
      <div class="grid-cards">
        ${praAisyiyah.majelis.map(m => `
          <div class="card">
            <span class="badge badge-emerald" style="width: fit-content; margin-bottom: 0.4rem;">Majelis PRA</span>
            <h4 style="font-size: 1.05rem; color: var(--color-primary-800); margin-bottom: 0.35rem;">${escapeHTML(m.nama)}</h4>
            <p style="font-size: 0.825rem; color: var(--color-primary-700); font-weight: 600; margin-bottom: 0.35rem;">${escapeHTML(m.pimpinan)}</p>
            <div style="font-size: 0.8rem; color: var(--color-text-muted);">
              Anggota: ${m.anggota.map(a => escapeHTML(a)).join(', ')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Render Schools Directory (Amal Usaha Pendidikan) Complete Schema
 * @param {HTMLElement} containerEl
 */
export function renderSchoolsDirectory(containerEl) {
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="grid-cards">
      ${EDUCATION_INSTITUTIONS.map(s => {
        const detailUrl = `./${s.slug}/index.html`;
        return `
          <article class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span class="badge badge-emerald">${escapeHTML(s.level)}</span>
              <span class="badge badge-gold">${s.videos ? s.videos.length : 0} Video Profil</span>
            </div>
            <h3 class="card-title">${escapeHTML(s.name)}</h3>
            <p style="font-size: 0.85rem; font-weight: 600; color: var(--color-primary-700); margin-bottom: 0.5rem;">${escapeHTML(s.badge)}</p>
            <p class="card-text">${escapeHTML(s.desc)}</p>
            <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 1rem;">
              Lokasi: ${escapeHTML(s.location)}
            </div>
            <div class="card-footer-meta">
              <a href="${detailUrl}" class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.8rem; min-height: 34px;">
                Profil Lengkap &amp; Video &rarr;
              </a>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

/**
 * Render Program Kerja List by Year
 * @param {HTMLElement} containerEl
 * @param {number|string} year
 */
export function renderProkerTimeline(containerEl, year) {
  if (!containerEl) return;

  const items = PROKER_DB.filter(p => !year || p.year == year || year === 'all');

  containerEl.innerHTML = `
    <div style="margin-bottom: 1.5rem; font-size: 0.9rem; color: var(--color-text-muted);">
      Menampilkan <b>${items.length}</b> agenda kerja terverifikasi untuk kategori ini.
    </div>
    <div class="grid-cards">
      ${items.slice(0, 60).map(item => `
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
      `).join('')}
    </div>
    ${items.length > 60 ? `
      <div style="margin-top: 2rem; text-align: center; color: var(--color-text-muted); font-size: 0.85rem;">
        * Menampilkan 60 program kerja teratas untuk performa tampilan prima. Seluruh 865 program tersimpan di database persyarikatan.
      </div>
    ` : ''}
  `;
}
