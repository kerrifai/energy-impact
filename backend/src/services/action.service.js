const ActionRepo = require("../repositories/action.repository");

/**
 * Cálculo del impacto de una acción
 */
function computeImpact(action) {
  const baseline = Number(action.baselineKwh) || 0;
  const pct = Number(action.reductionPercent) || 0;
  const price = Number(action.priceKwh) || 0;
  const factor =
    action.emissionFactor === undefined || action.emissionFactor === null
      ? 0.23
      : Number(action.emissionFactor);

  const savedKwh = baseline * (pct / 100);
  const savedCo2 = savedKwh * factor;
  const savedEur = savedKwh * price;

  return { savedKwh, savedCo2, savedEur };
}

function computeTotals(actions) {
  return actions.reduce(
    (acc, a) => {
      const { savedKwh, savedCo2, savedEur } = computeImpact(a);
      acc.kwh += savedKwh;
      acc.co2 += savedCo2;
      acc.eur += savedEur;
      return acc;
    },
    { kwh: 0, co2: 0, eur: 0 }
  );
}

async function listActions(category) {
  const actions = await ActionRepo.getAll({ category });
  return actions.map(a => ({
    ...a,
    impact: computeImpact(a)
  }));
}

async function getActionById(id) {
  const a = await ActionRepo.getById(id);
  if (!a) return null;
  return { ...a, impact: computeImpact(a) };
}

async function createAction(data) {
  const action = await ActionRepo.create(data);
  return { ...action, impact: computeImpact(action) };
}

async function updateAction(id, data) {
  const action = await ActionRepo.update(id, data);
  if (!action) return null;
  return { ...action, impact: computeImpact(action) };
}

async function deleteAction(id) {
  return ActionRepo.remove(id);
}

async function clearActions() {
  await ActionRepo.clearAll();
}

async function getSummary() {
  const actions = await ActionRepo.getAll();
  const totals = computeTotals(actions);
  return {
    actionsCount: actions.length,
    totalKwh: totals.kwh,
    totalCo2: totals.co2,
    totalEur: totals.eur
  };
}

module.exports = {
  listActions,
  getActionById,
  createAction,
  updateAction,
  deleteAction,
  clearActions,
  getSummary
};
