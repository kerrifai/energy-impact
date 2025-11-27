const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Oficina", "Producción", "Hogar", "Transporte", "Otro"],
      default: "Otro"
    },
    baselineKwh: { type: Number, required: true },          // Consumo actual anual
    reductionPercent: { type: Number, required: true, min: 0, max: 100 },
    priceKwh: { type: Number, required: true },             // €/kWh
    emissionFactor: { type: Number, default: 0.23 },        // kg CO2/kWh
    people: { type: Number, default: 1, min: 1 }            // Personas impactadas
  },
  { timestamps: true }
);

const ActionMongoModel = mongoose.model("Action", actionSchema);

module.exports = ActionMongoModel;
