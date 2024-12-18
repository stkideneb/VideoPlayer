const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  // Für das Parsen von JSON-Daten

// Erstelle die Verbindung zu MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ka59tfD1AnE@',
  database: 'db_file',
  connectionLimit: 10,
});

// API-Endpunkt zum Hinzufügen von Dateien
app.post('/upload', (req, res) => {
  const { fileName, filePath } = req.body;
  const query = `CALL proc_insertFile('${fileName}', '${filePath}');`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error executing query');
    }
    console.log('Query executed successfully:', results);
    res.status(200).json('File uploaded successfully');
  });
});

// Starte den Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  //node server/server.js
});
