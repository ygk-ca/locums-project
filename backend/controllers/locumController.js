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

const getAllLocums = async (req, res, next) => {
    try {
        const locums = await firestore.collection('locums');
        const data = await locums.get();
        const locumsArray = [];
        if(data.empty) {
            res.status(404).send('No locum record found');
        }
        else {
            data.forEach(doc => {
                const locum = new Locum(
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().homeAddress,
                    doc.data().phoneNumber,
                    doc.data().email,
                    doc.data().experience,
                    doc.data().workLocation,
                    doc.data().electronicMedicalRecord
            )
                locumsArray.push(locum); 
            });
            res.send(locumsArray);
        }
    }

    catch(error) {
        res.status(400).send(error.message);
    } 
}

const getLocum = async (req, res, next) => {

    try {
        const id = req.params.id;
        const locums = await firestore.collection('locums').doc(id);
        const data = await locums.get();
        if (!data.exists) {
            res.status(404).send('Locum with the given ID not found');
        }
        else {
            res.send(data.data());
        }
    }
    catch(error) {
        res.status(400).send(error.message);
    }
}

const updateLocum = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const locum = await firestore.collection('locums').doc(id);
        await locum.update(data);
        res.send('Locum record updated successfully');
    }
    catch(error) {
        res.status(400).send(error.message);
    }
}

const deleteLocum = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('locums').doc(id).delete();
        res.send('Locum record deleted successfully');
    }
    catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addLocum,
    getAllLocums,
    getLocum,
    updateLocum,
    deleteLocum
}