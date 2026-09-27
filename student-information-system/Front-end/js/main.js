// Listahan ng mga package/tier at presyo nila
var tierNames = {
  basic: "Basic",
  classb: "Class B",
  classa: "Class A"
};
 
var tierPrices = {
  basic: 3500,
  classb: 6000,
  classa: 8000
};
 
// Listahan ng mga add-ons at presyo nila
var addonNames = {
  projector: "Projector with white screen",
  moving: "Moving head (pair)",
  smoke: "Smoke machine",
  bubble: "Bubble machine",
  mic: "Additional microphone",
  lights: "Additional lights"
};
 
var addonPrices = {
  projector: 1000,
  moving: 500,
  smoke: 1000,
  bubble: 500,
  mic: 500,
  lights: 100
};
 
// Dito naka-save yung mga napili ng user
var selectedTier = null;
var selectedAddons = []; // array lang, hindi Set
var selectedDate = null;
 
 
// Tinatawag ito kapag pinindot yung isang tier card
function selectTier(key, el) {
  selectedTier = key;
 
  // tanggalin muna yung "selected" style sa lahat ng tier card
  var allTierCards = document.querySelectorAll(".tier-card");
  for (var i = 0; i < allTierCards.length; i++) {
    allTierCards[i].classList.remove("is-selected");
  }
 
  // idagdag yung "selected" style sa pinindot lang
  el.classList.add("is-selected");
 
  updateSummary();
}
 
 
// Tinatawag ito kapag pinindot yung isang add-on
function toggleAddon(key, el) {
  // check muna kung nasa array na yung key
  var index = selectedAddons.indexOf(key);
 
  if (index === -1) {
    // wala pa sa listahan, idagdag
    selectedAddons.push(key);
    el.classList.add("is-selected");
  } else {
    // nasa listahan na, tanggalin
    selectedAddons.splice(index, 1);
    el.classList.remove("is-selected");
  }
 
  updateSummary();
}
 
 
// Tinatawag ito kapag pumili ng date sa calendar
function selectDate(day, el) {
  selectedDate = day;
 
  var allDays = document.querySelectorAll(".calendar-day");
  for (var i = 0; i < allDays.length; i++) {
    allDays[i].classList.remove("is-selected");
  }
 
  if (el) {
    el.classList.add("is-selected");
  }
 
  updateSummary();
}
 
 
// I-update yung summary box (yung nasa side na nagpapakita ng total)
function updateSummary() {
  var summaryBox = document.getElementById("booking-summary");
  if (!summaryBox) {
    return;
  }
 
  var total = 0;
  var htmlText = "";
 
  // idagdag yung presyo ng napiling tier
  if (selectedTier !== null) {
    total = total + tierPrices[selectedTier];
    htmlText = htmlText + '<div class="summary-line"><span>' + tierNames[selectedTier] + '</span><span>₱' + tierPrices[selectedTier].toLocaleString() + '</span></div>';
  }
 
  // idagdag yung presyo ng bawat napiling add-on
  for (var i = 0; i < selectedAddons.length; i++) {
    var addonKey = selectedAddons[i];
    total = total + addonPrices[addonKey];
    htmlText = htmlText + '<div class="summary-line"><span>' + addonNames[addonKey] + '</span><span>+₱' + addonPrices[addonKey].toLocaleString() + '</span></div>';
  }
 
  // kung wala pang napipili, magpakita ng message
  if (htmlText === "") {
    htmlText = '<p class="text-muted">Pumili ng package para makita ang total.</p>';
  }
 
  summaryBox.innerHTML = htmlText;
 
  var totalBox = document.getElementById("booking-total");
  if (totalBox) {
    totalBox.textContent = "₱" + total.toLocaleString();
  }
}
 
 
// Gumagawa ng calendar grid (halimbawa: August 2026)
function renderCalendar(containerId, year, month) {
  var container = document.getElementById(containerId);
  if (!container) {
    return;
  }
 
  var firstDayOfMonth = new Date(year, month, 1).getDay();
  var totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  var monthName = new Date(year, month, 1).toLocaleString("en-US", { month: "long" });
 
  var dayLabels = ["S", "M", "T", "W", "TH", "F", "S"];
 
  var html = "";
  html = html + '<div class="calendar-header">';
  html = html + '<button type="button" class="calendar-nav">&lt;</button>';
  html = html + '<span class="calendar-title">' + monthName + " " + year + "</span>";
  html = html + '<button type="button" class="calendar-nav">&gt;</button>';
  html = html + "</div>";
 
  html = html + '<div class="calendar-grid">';
 
  // header ng mga araw (S, M, T, W...)
  for (var i = 0; i < dayLabels.length; i++) {
    html = html + '<div class="calendar-dow">' + dayLabels[i] + "</div>";
  }
 
  // blangkong kahon bago magsimula yung araw 1
  for (var j = 0; j < firstDayOfMonth; j++) {
    html = html + '<div class="calendar-day is-empty"></div>';
  }
 
  // yung mga actual na araw, clickable
  for (var day = 1; day <= totalDaysInMonth; day++) {
    html = html + '<button type="button" class="calendar-day" onclick="selectDate(' + day + ', this)">' + day + "</button>";
  }
 
  html = html + "</div>";
 
  container.innerHTML = html;
}
 
 
// Buksan yung "Are you sure?" confirmation box
function openConfirmModal(label) {
  var modal = document.getElementById("confirm-modal");
  var text = document.getElementById("confirm-modal-text");
 
  if (!modal) {
    return;
  }
 
  if (text) {
    text.textContent = 'Are you sure you want to cancel "' + label + '"?';
  }
 
  modal.classList.add("is-open");
}
 
 
// Isara yung confirmation box
function closeConfirmModal() {
  var modal = document.getElementById("confirm-modal");
  if (modal) {
    modal.classList.remove("is-open");
  }
}
 
 
// Para sa mobile menu (kung meron mang hamburger button)
document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById("nav-toggle");
  var nav = document.querySelector(".site-nav");
 
  if (toggleButton && nav) {
    toggleButton.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
  }
});
