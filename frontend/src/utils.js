
export function formatNumber(value, decimals = 0) {
  return Number(value).toLocaleString("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/**
 * Cálculo en frontend solo para vista previa (no se guarda)
 */
export function computePreview({
  baselineKwh,
  reductionPercent,
  priceKwh,
  emissionFactor
}) {
  const baseline = Number(baselineKwh) || 0;
  const pct = Number(reductionPercent) || 0;
  const price = Number(priceKwh) || 0;
  const factor =
    emissionFactor === "" || emissionFactor === undefined
      ? 0.23
      : Number(emissionFactor);

  if (!baseline || !pct || !price || pct <= 0 || pct > 100) {
    return null;
  }

  const savedKwh = baseline * (pct / 100);
  const savedCo2 = savedKwh * factor;
  const savedEur = savedKwh * price;

  return { savedKwh, savedCo2, savedEur };
}
