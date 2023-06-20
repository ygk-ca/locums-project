const express = require('express');
const { addLocum } = require('../controllers/locumController');

const router = express.Router();

router.post('/locum', addLocum);

module.exports = {
    routes: router
}
