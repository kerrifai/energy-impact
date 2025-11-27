
import { formatNumber } from "./utils.js";

const tbody = document.getElementById("actions-tbody");
const emptyMsg = document.getElementById("empty-message");
const filterCategoryEl = document.getElementById("filter-category");

const totalKwhEl = document.getElementById("total-kwh");
const totalCo2El = document.getElementById("total-co2");
const totalEurEl = document.getElementById("total-eur");

const previewBox = document.getElementById("preview-metrics");
const previewKwhEl = document.getElementById("preview-kwh");
const previewCo2El = document.getElementById("preview-co2");
const previewEurEl = document.getElementById("preview-eur");

export function getFilterCategory() {
  return filterCategoryEl.value;
}

export function onFilterChange(handler) {
  filterCategoryEl.addEventListener("change", handler);
}

export function renderActionsTable(actions) {
  tbody.innerHTML = "";

  if (!actions.length) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  actions.forEach(a => {
    const { savedKwh, savedCo2, savedEur } = a.impact || {
      savedKwh: 0,
      savedCo2: 0,
      savedEur: 0
    };
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.name}</td>
      <td><span class="tag">${a.category}</span></td>
      <td class="text-right">${formatNumber(savedKwh, 0)} kWh</td>
      <td class="text-right">${formatNumber(savedCo2, 1)} kg</td>
      <td class="text-right">${formatNumber(savedEur, 2)} €</td>
      <td>
        <span class="pill">Impacto en ${a.people || 1} persona(s)</span>
      </td>
      <td class="text-right">
        <button type="button" data-id="${a._id || a.id}" class="btn-delete">✖</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

export function onDeleteClick(handler) {
  tbody.addEventListener("click", e => {
    if (e.target.classList.contains("btn-delete")) {
      const id = e.target.dataset.id;
      handler(id);
    }
  });
}

export function renderSummary(summary) {
  totalKwhEl.textContent = `${formatNumber(summary.totalKwh, 0)} kWh`;
  totalCo2El.textContent = `${formatNumber(summary.totalCo2, 1)} kg`;
  totalEurEl.textContent = `${formatNumber(summary.totalEur, 2)} €`;
}

export function hidePreview() {
  previewBox.style.display = "none";
}

export function renderPreview(preview) {
  if (!preview) {
    previewBox.style.display = "none";
    return;
  }
  previewKwhEl.textContent = `${formatNumber(preview.savedKwh, 0)} kWh/año`;
  previewCo2El.textContent = `${formatNumber(preview.savedCo2, 1)} kg/año`;
  previewEurEl.textContent = `${formatNumber(preview.savedEur, 2)} €/año`;
  previewBox.style.display = "grid";
}
