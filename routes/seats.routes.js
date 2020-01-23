const express = require('express');
const router = express.Router();

const SeatsController = require('../controllers/seats.controller');

router.get('/seats', SeatsController.getAll);
router.get('/seats/:id', SeatsController.getById);
router.post('/seats', SeatsController.postSeat);
router.put('/seats/:id', SeatsController.editSeat);
router.delete('/seats/:id', SeatsController.deleteSeat);

module.exports = router;