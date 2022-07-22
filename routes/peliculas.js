const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculaController');

router.get("/", peliculasController.list)
router.get("/search", peliculasController.search)
router.get("/:id", peliculasController.show)
router.post("/", peliculasController.create)
router.put("/:id", peliculasController.update)
router.delete("/:id", peliculasController.destroy)

module.exports = router