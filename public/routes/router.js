const express = require('express');
const router = express.Router();
const DB = require('../database/db');
const path = require('path');

// GET
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/main.html'));
});

// GET
router.get('/contact', (req, res) => {
    DB.getData().then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log(err + 'in /contact');
    })
});

// POST
router.post('/contact/add', (req, res) => {
    DB.addData(req.body).then((msg) => {
        console.log(msg);
        res.redirect('/');
    }).catch((err) => {
        console.log(err + 'in /contact/add');
    })
})

// PUT
router.post('/contact/update', (req, res) => {
    DB.updateData(req.body).then((msg) => {
        console.log(msg);
        res.redirect('/');
    }).catch((err) => {
        console.log(err + 'in /contact/update')
    })
})

// DELETE
router.post('/contact/delete', (req, res) => {
    DB.deleteData(req.body).then((msg) => {
        console.log(msg);
        res.redirect('/');
    }).catch((err) => {
        console.log(err + 'in /contact/delete');
    })
})

module.exports = router;