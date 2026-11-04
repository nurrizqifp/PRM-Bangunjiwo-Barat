/**
 * Portal Resmi PRM Bangunjiwo Barat
 * Utility Functions: dom-utils.js
 * Principles: Clean Code, Security First (Safe DOM manipulation), DRY
 */

/**
 * Escape HTML to prevent XSS injection
 * @param {string} str
 * @returns {string}
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Format number to Indonesian Rupiah currency format
 * @param {number} amount
 * @returns {string}
 */
export function formatRupiah(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp 0';
  return 'Rp ' + amount.toLocaleString('id-ID');
}

/**
 * Format standard Date object or string to Indonesian locale
 * @param {string|Date} dateVal
 * @returns {string}
 */
export function formatDateID(dateVal) {
  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal || '');
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return String(dateVal || '');
  }
}

/**
 * Debounce helper for high frequency input events (search, resize)
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
export function debounce(func, wait = 250) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Create an element safely with attributes and children
 * @param {string} tag
 * @param {Object} attrs
 * @param {Array<HTMLElement|string>} children
 * @returns {HTMLElement}
 */
export function createElementSafe(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [key, val] of Object.entries(attrs)) {
    if (key === 'className') {
      el.className = val;
    } else if (key.startsWith('on') && typeof val === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), val);
    } else if (key === 'dataset' && typeof val === 'object') {
      for (const [dKey, dVal] of Object.entries(val)) {
        el.dataset[dKey] = dVal;
      }
    } else {
      el.setAttribute(key, val);
    }
  }
  for (const child of children) {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement || child instanceof SVGElement) {
      el.appendChild(child);
    }
  }
  return el;
}

