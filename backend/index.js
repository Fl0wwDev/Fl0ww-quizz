const express = require('express');
const app = express();
const connection = require('./db'); // Assurez-vous que la configuration de connexion à MySQL est dans db.js

app.use(express.json());

// Route pour obtenir tous les thèmes
app.get('/themes', (req, res) => {
  connection.query('SELECT * FROM themes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Route pour obtenir toutes les questions d'un thème
app.get('/themes/:themeId/questions', (req, res) => {
  const { themeId } = req.params;
  connection.query('SELECT * FROM questions WHERE theme_id = ?', [themeId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Route pour obtenir une question par ID
app.get('/questions/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM questions WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Route pour créer un nouveau thème
app.post('/themes', (req, res) => {
  const { name } = req.body;
  connection.query('INSERT INTO themes (name) VALUES (?)', [name], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, name });
  });
});

// Route pour créer une nouvelle question et associer un thème
app.post('/questions', (req, res) => {
  const { theme_id, question, answer } = req.body;

  // Vérification si le theme_id existe
  connection.query('SELECT * FROM themes WHERE id = ?', [theme_id], (err, themes) => {
    if (err || themes.length === 0) {
      return res.status(400).json({ error: "Invalid theme_id" });
    }

    // Insérer la question une fois que le thème est validé
    connection.query('INSERT INTO questions (theme_id, question, answer) VALUES (?, ?, ?)', [theme_id, question, answer], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, theme_id, question, answer });
    });
  });
});

// Route pour mettre à jour une question
app.put('/questions/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  connection.query('UPDATE questions SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Question updated successfully' });
  });
});

// Route pour supprimer une question
app.delete('/questions/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM questions WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Question deleted successfully' });
  });
});

// Lancer le serveur sur le port 3000
app.listen(3000, () => console.log('Server running on port 3000'));
