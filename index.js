const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://AzaguaghY:Alyawm24@cluster0.ed80z.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB Atlas réussie !'))
    .catch(err => console.error('Erreur lors de la connexion à MongoDB', err));

// Importer les routes
const messagesRoutes = require('./routes/messages');

// Utiliser les routes pour les messages
app.use('/api/messages', messagesRoutes);

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Le serveur est en cours d\'exécution sur le port 3000');
});