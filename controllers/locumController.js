'use strict';

const firebase = require('../db');
const Locum = require('../models/locum');
const firestore = firebase.firestore();

const addLocum = async (req, res, next) => {
    try {
        const data = req.body;
        const locum = await firestore.collection('locums').doc().set(data);
        res.send('Locum record saved successfully.');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addLocum
}