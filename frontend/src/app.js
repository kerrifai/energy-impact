
import {
  fetchActions,
  fetchSummary,
  createAction,
  deleteAction,
  clearActions
} from "./api.js";
import {
  renderActionsTable,
  renderSummary,
  getFilterCategory,
  onFilterChange,
  onDeleteClick,
  renderPreview,
  hidePreview
} from "./ui.js";
import { computePreview } from "./utils.js";

const form = document.getElementById("action-form");
const btnResetForm = document.getElementById("btn-reset-form");
const btnClearAll = document.getElementById("btn-clear-all");

// ============================
// Carga de datos
// ============================
async function loadAndRender() {
  try {
    const category = getFilterCategory();
    const [actions, summary] = await Promise.all([
      fetchActions(category),
      fetchSummary()
    ]);
    renderActionsTable(actions);
    renderSummary(summary);
  } catch (err) {
    console.error("Error cargando datos:", err);
    const emptyMsg = document.getElementById("empty-message");
    emptyMsg.textContent = "Error al cargar acciones desde la API.";
    emptyMsg.style.display = "block";
  }
}

// ============================
// Gestión de formulario
// ============================

form.addEventListener("submit", async e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value;
  const baselineKwh = Number(document.getElementById("baseline-kwh").value);
  const reductionPercent = Number(
    document.getElementById("reduction-percent").value
  );
  const priceKwh = Number(document.getElementById("price-kwh").value);
  const emissionFactorRaw = document.getElementById("emission-factor").value;
  const emissionFactor =
    emissionFactorRaw === "" ? undefined : Number(emissionFactorRaw);
  const people = Number(document.getElementById("people").value) || 1;

  if (!name || !baselineKwh || !reductionPercent || !priceKwh) {
    return;
  }

  try {
    await createAction({
      name,
      category,
      baselineKwh,
      reductionPercent,
      priceKwh,
      emissionFactor,
      people
    });

    form.reset();
    hidePreview();
    await loadAndRender();
  } catch (err) {
    console.error("Error creando acción:", err);
    alert("Error al crear la acción en el servidor");
  }
});

btnResetForm.addEventListener("click", () => {
  form.reset();
  hidePreview();
});

// Vista previa en tiempo real
["baseline-kwh", "reduction-percent", "price-kwh", "emission-factor"].forEach(
  id => {
    document.getElementById(id).addEventListener("input", () => {
      const baselineKwh = document.getElementById("baseline-kwh").value;
      const reductionPercent = document.getElementById("reduction-percent")
        .value;
      const priceKwh = document.getElementById("price-kwh").value;
      const emissionFactor = document.getElementById("emission-factor").value;

      const preview = computePreview({
        baselineKwh,
        reductionPercent,
        priceKwh,
        emissionFactor
      });

      renderPreview(preview);
    });
  }
);

// ============================
// Borrado
// ============================

onDeleteClick(async id => {
  if (!id) return;
  try {
    await deleteAction(id);
    await loadAndRender();
  } catch (err) {
    console.error("Error borrando acción:", err);
    alert("Error al borrar la acción");
  }
});

btnClearAll.addEventListener("click", async () => {
  if (!confirm("¿Seguro que quieres borrar todas las acciones?")) return;
  try {
    await clearActions();
    await loadAndRender();
  } catch (err) {
    console.error("Error borrando todas las acciones:", err);
    alert("Error al borrar todas las acciones");
  }
});

// ============================
// Filtro
// ============================

onFilterChange(() => {
  loadAndRender();
});

// ============================
// Init
// ============================

loadAndRender();
