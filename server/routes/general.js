const express = require('express');
const router = express.Router();

const { getAuthenticated } = require("../functions/auth");
const Produit = require('../models/Produit');

router.get('/login', (req, res) => {
    const token = req.cookies["access-token"]
    const username = token ? getAuthenticated(token) : ''
    return res.send(username)
})

router.get('/lesProduits', (req, res) => {
    return Produit.findAll().then((data) => {
        res.send(data)
    }).catch((e) => {
        res.send(e)
    })
})

module.exports = router;