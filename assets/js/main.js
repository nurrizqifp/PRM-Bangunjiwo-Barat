/**
 * Portal Resmi PRM Bangunjiwo Barat
 * Main Entry Script: main.js
 * Principles: DRY, Modularity, Automatic Component Initialization
 */

import { renderHeader, renderFooter, renderMobileDock, renderBreadcrumbs } from './core/layout-shell.js';
import {
  renderMasjidDirectory,
  renderFinancialDashboard,
  renderLibraryCatalog,
  renderLeadershipDirectory,
  renderSchoolsDirectory,
  renderProkerTimeline,
  renderYouTubeLite
} from './core/page-renderer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render layout shells
  const headerEl = document.getElementById('site-header');
  if (headerEl) renderHeader(headerEl);

  const footerEl = document.getElementById('site-footer');
  if (footerEl) renderFooter(footerEl);

  const dockEl = document.getElementById('mobile-dock');
  if (dockEl) renderMobileDock(dockEl);

  // 2. Render breadcrumbs if metadata is present
  const breadcrumbEl = document.getElementById('breadcrumb-container');
  if (breadcrumbEl && window.SITE_BREADCRUMBS) {
    renderBreadcrumbs(breadcrumbEl, window.SITE_BREADCRUMBS);
  }

  // 3. Initialize dynamic page sections if corresponding containers exist
  const masjidContainer = document.getElementById('masjid-directory-container');
  if (masjidContainer) renderMasjidDirectory(masjidContainer);

  const financeContainer = document.getElementById('financial-dashboard-container');
  if (financeContainer) renderFinancialDashboard(financeContainer);

  const libraryContainer = document.getElementById('library-catalog-container');
  if (libraryContainer) renderLibraryCatalog(libraryContainer);

  const leadershipContainer = document.getElementById('leadership-roster-container');
  if (leadershipContainer) renderLeadershipDirectory(leadershipContainer);

  const schoolsContainer = document.getElementById('schools-directory-container');
  if (schoolsContainer) renderSchoolsDirectory(schoolsContainer);

  const prokerContainer = document.getElementById('proker-timeline-container');
  if (prokerContainer) {
    const year = prokerContainer.dataset.year || 'all';
    renderProkerTimeline(prokerContainer, year);
  }

  // 4. Initialize YouTube Lite players
  document.querySelectorAll('.yt-lite-player[data-video-id]').forEach(el => {
    const videoId = el.dataset.videoId;
    const title = el.dataset.videoTitle || 'Video PRM Bangunjiwo Barat';
    renderYouTubeLite(el, videoId, title);
  });
});

