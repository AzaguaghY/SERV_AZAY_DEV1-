const express = require('express');
const router = express.Router();
const Message = require('../modeles/messages');

// GET « /api/messages » pour récupérer tous les messages (limite à 250)
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().limit(250);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    }
});

// GET « /api/messages/:id » pour récupérer un message par ID
router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du message' });
    }
});

// GET « /api/messages/description/:texte » pour récupérer les messages dont la description contient le texte
router.get('/description/:texte', async (req, res) => {
    try {
        const texte = req.params.texte;
        const messages = await Message.find({ content: { $regex: texte, $options: 'i' } })
            .sort({ date: -1 })
            .limit(250);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la recherche par description' });
    }
});

// Récupérer les messages par titre (partiel)
router.get('/titre/:texte', async (req, res) => {
    try {
      const texte = req.params.texte;
      // Rechercher les messages dont le titre contient le texte, insensible à la casse
      const messages = await Message.find({ titre: new RegExp(texte,  'i') }).limit(250).sort({ date: -1 });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des messages par titre' });
    }
  });
  

// GET « /api/messages/auteur/:texte » pour récupérer les messages dont l’auteur contient le texte (vous devez ajouter le champ auteur dans le modèle)
router.get('/auteur/:texte', async (req, res) => {
    try {
        const texte = req.params.texte;
        const messages = await Message.find({ author: { $regex: texte, $options: 'i' } })
            .sort({ date: -1 })
            .limit(250);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la recherche par auteur' });
    }
});

// DELETE « /api/messages/:id » pour supprimer un message par ID
router.delete('/:id', async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        res.status(200).json({ message: 'Message supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du message' });
    }
});

// Route POST pour ajouter un nouveau message
router.post('/', async (req, res) => {
    try {
        const { _id, titre, description, auteur, date } = req.body;

        // Validation simple (ajoutez plus de vérifications si nécessaire)
        if (!titre || !description || !auteur || !date) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);  // Affiche l'erreur dans la console pour le débogage
        res.status(500).json({ error: 'Erreur lors de l’ajout du message', details: error.message });
    }
});


// PUT « /api/messages/:id » pour modifier un message par ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message non trouvé' });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du message' });
    }
});

module.exports = router;