const express = require("express");
const router = express.Router();
const ActionsController = require("../controllers/actions.controller");

// /api/actions
router.get("/", ActionsController.listActions);
router.get("/summary", ActionsController.getSummary);
router.get("/:id", ActionsController.getAction);
router.post("/", ActionsController.createAction);
router.put("/:id", ActionsController.updateAction);
router.delete("/:id", ActionsController.deleteAction);
router.delete("/", ActionsController.clearActions);

module.exports = router;
