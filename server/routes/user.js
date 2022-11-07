const express = require('express');
const { getAuthenticated } = require('../functions/auth');
const Produit = require('../models/Produit');
const Utilisateur = require('../models/Utilisateur');
const router = express.Router();

router.get('/status', (req, res) => {
    return res.send(getAuthenticated(req.cookies["access-token"].status));
});

router.get('/panier', async (req, res) => {
    /* const request = {
        where: {
            include
        }
    }

    await Utilisateur.findAll(request).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de récupération de vos todos"})
    }) */

    return res.send('ok panier')
});

router.post('/logout', (req, res) => {
    res.clearCookie('access-token')
    return res.send('logout')
});

/* router.post('/todo', async (req, res) => {
    const { titre, description, priorite } = req.body
    await Todo.create({
        titre,
        description,
        priorite
    }).then((success) => {
        if (success) return res.send({success: 'Todo créé !'})
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de création de votre compte"})
    })
});

router.get('/todos', async (req, res) => {
    await Todo.findAll().then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de récupération de vos todos"})
    })
});

router.get('/todo', async (req, res) => {
    const {id} = req.query
    await Todo.findByPk(id).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: `Echec lors de la tentative de récupération du todo n°${id}`})
    })
});


router.post('/modifierTodo', async (req, res) => {
    await Todo.update(
        req.body.edititingTodo,
        { where: {id: req.body.id} }
      ).then((success) => {
        if (success) return res.send({success: 'Todo modifié !'})
    }).catch((error) => {
        console.log(error);
        if (error) return res.send({error: `Echec lors de la tentative de modification du todo n°${id}`})
    })
});

router.post('/deleteTodo', async (req, res) => {
    await Todo.destroy({
        where: {
            id: req.body.id
        }
    }).then(() => {
        return res.send({success: 'deleted!'})
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de suppression du todo"})
    })
}); */

module.exports = router;