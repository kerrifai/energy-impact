const ActionService = require("../services/action.service");

async function listActions(req, res, next) {
  try {
    const category = req.query.category;
    const actions = await ActionService.listActions(category);
    res.json(actions);
  } catch (err) {
    next(err);
  }
}

async function getAction(req, res, next) {
  try {
    const id = req.params.id;
    const action = await ActionService.getActionById(id);
    if (!action) {
      return res.status(404).json({ error: "Acción no encontrada" });
    }
    res.json(action);
  } catch (err) {
    next(err);
  }
}

async function createAction(req, res, next) {
  try {
    const {
      name,
      category,
      baselineKwh,
      reductionPercent,
      priceKwh,
      emissionFactor,
      people
    } = req.body;

    if (
      !name ||
      baselineKwh === undefined ||
      reductionPercent === undefined ||
      priceKwh === undefined
    ) {
      return res.status(400).json({
        error:
          "Campos obligatorios: name, baselineKwh, reductionPercent, priceKwh"
      });
    }

    const action = await ActionService.createAction({
      name,
      category,
      baselineKwh,
      reductionPercent,
      priceKwh,
      emissionFactor,
      people
    });

    res.status(201).json(action);
  } catch (err) {
    next(err);
  }
}

async function updateAction(req, res, next) {
  try {
    const id = req.params.id;
    const action = await ActionService.updateAction(id, req.body);
    if (!action) {
      return res.status(404).json({ error: "Acción no encontrada" });
    }
    res.json(action);
  } catch (err) {
    next(err);
  }
}

async function deleteAction(req, res, next) {
  try {
    const id = req.params.id;
    const ok = await ActionService.deleteAction(id);
    if (!ok) {
      return res.status(404).json({ error: "Acción no encontrada" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function clearActions(req, res, next) {
  try {
    await ActionService.clearActions();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function getSummary(req, res, next) {
  try {
    const summary = await ActionService.getSummary();
    res.json(summary);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listActions,
  getAction,
  createAction,
  updateAction,
  deleteAction,
  clearActions,
  getSummary
};
