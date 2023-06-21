const express = require('express');
const { addLocum, getAllLocums, getLocum, updateLocum, deleteLocum } = require('../controllers/locumController');

const router = express.Router();

router.post('/locum', addLocum);
router.get('/locums', getAllLocums);
router.get('/locum/:id', getLocum);
router.put('/locum/:id', updateLocum);
router.delete('/locum/:id', deleteLocum);

module.exports = {
    routes: router
}
