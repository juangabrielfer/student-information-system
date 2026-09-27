/* ==========================================================================
   M&E Lights and Sounds — Shared Behaviors
   ========================================================================== */

/* ---------- Booking flow (index.html) ---------- */
const tierData = {
  basic: { name: 'Basic', price: 3500 },
  classb: { name: 'Class B', price: 6000 },
  classa: { name: 'Class A', price: 8000 },
};

const addonData = {
  projector: { name: 'Projector with white screen', price: 1000 },
  moving: { name: 'Moving head (pair)', price: 500 },
  smoke: { name: 'Smoke machine', price: 1000 },
  bubble: { name: 'Bubble machine', price: 500 },
  mic: { name: 'Additional microphone', price: 500 },
  lights: { name: 'Additional lights', price: 100 },
};

let selectedTier = null;
let selectedAddons = new Set();
let selectedDate = null;

function selectTier(key, el) {
  selectedTier = key;
  document.querySelectorAll('.tier-card').forEach((c) => c.classList.remove('is-selected'));
  el.classList.add('is-selected');
  updateSummary();
}

function toggleAddon(key, el) {
  if (selectedAddons.has(key)) {
    selectedAddons.delete(key);
    el.classList.remove('is-selected');
  } else {
    selectedAddons.add(key);
    el.classList.add('is-selected');
  }
  updateSummary();
}

function selectDate(day, el) {
  selectedDate = day;
  document.querySelectorAll('.calendar-day').forEach((d) => d.classList.remove('is-selected'));
  if (el) el.classList.add('is-selected');
  updateSummary();
}

function updateSummary() {
  const summaryEl = document.getElementById('booking-summary');
  if (!summaryEl) return;

  let total = 0;
  let lines = '';

  if (selectedTier) {
    total += tierData[selectedTier].price;
    lines += `<div class="summary-line"><span>${tierData[selectedTier].name}</span><span>₱${tierData[selectedTier].price.toLocaleString()}</span></div>`;
  }

  selectedAddons.forEach((key) => {
    total += addonData[key].price;
    lines += `<div class="summary-line"><span>${addonData[key].name}</span><span>+₱${addonData[key].price.toLocaleString()}</span></div>`;
  });

  summaryEl.innerHTML = lines || '<p class="text-muted">Pumili ng package para makita ang total.</p>';

  const totalEl = document.getElementById('booking-total');
  if (totalEl) totalEl.textContent = `₱${total.toLocaleString()}`;
}

function renderCalendar(containerId, year, month) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month, 1).toLocaleString('en-US', { month: 'long' });

  let html = `
    <div class="calendar-header">
      <button type="button" class="calendar-nav">&lt;</button>
      <span class="calendar-title">${monthName} ${year}</span>
      <button type="button" class="calendar-nav">&gt;</button>
    </div>
    <div class="calendar-grid">
      ${['S', 'M', 'T', 'W', 'TH', 'F', 'S'].map((d) => `<div class="calendar-dow">${d}</div>`).join('')}
  `;

  for (let i = 0; i < firstDay; i++) html += `<div class="calendar-day is-empty"></div>`;
  for (let d = 1; d <= daysInMonth; d++) {
    html += `<button type="button" class="calendar-day" onclick="selectDate(${d}, this)">${d}</button>`;
  }

  html += `</div>`;
  el.innerHTML = html;
}

/* ---------- Confirm modal (dashboard.html) ---------- */
function openConfirmModal(label) {
  const modal = document.getElementById('confirm-modal');
  const text = document.getElementById('confirm-modal-text');
  if (!modal) return;
  if (text) text.textContent = `Are you sure you want to cancel "${label}"?`;
  modal.classList.add('is-open');
}

function closeConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.classList.remove('is-open');
}

/* ---------- Mobile nav toggle (optional, safe no-op if absent) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
  }
});
