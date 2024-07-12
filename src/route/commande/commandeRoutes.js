const express = require('express');
const router = express.Router();
const commandeController = require('../../controller/commande/commandeController');
router.post('/commande', commandeController.createCommande);
router.get('/commandes', commandeController.getAllCommandes);
router.get('/commande/:id', commandeController.getCommandeById);

module.exports = router;
