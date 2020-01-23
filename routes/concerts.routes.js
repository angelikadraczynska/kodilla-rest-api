const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertsController.getAll);
router.get('/concerts/:id', ConcertsController.getById);
router.post('/concerts', ConcertsController.postDepartment);
router.put('/concerts/:id', ConcertsController.editDepartment);
router.delete('/concerts/:id', ConcertsController.deleteDepartment);

module.exports = router;