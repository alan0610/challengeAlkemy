const express = require('express');
const router = express.Router();
const personajesController = require('../controllers/personajeController');

router.get("/", personajesController.list)
router.get("/search", personajesController.search)
router.get("/:id", personajesController.show)
router.post("/", personajesController.create)
router.put("/:id", personajesController.update)
router.delete("/:id", personajesController.destroy)

module.exports = router