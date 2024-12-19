const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ka59tfD1AnE@',
  database: 'db_file',
  connectionLimit: 10,
});

// Speicherort für hochgeladene Dateien,
// wäre dieser nicht gesetzt würden die Datein im Arbeitsspeicher gespeichert werden (flüchtig)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Zeitstempel als Namen, um redundanz der Namen vorzubeugen
  },
});

const upload = multer({ storage });

// API für das Hochladen von Dateien
app.post('/upload', upload.single('file'), (req, res) => {
  const fileName = req.file.filename;
  const filePath = `/uploads/${fileName}`; 

  const query = `CALL proc_insertFile('${fileName}', '${filePath}');`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error executing query');
    }
    console.log('Query executed successfully:', results);
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  });
});

// API für das Abrufen von Videos
app.get('/videos', (req, res) => {
  const query = 'SELECT * FROM file';

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching videos:', err);
      return res.status(500).send('Error fetching videos');
    }
    res.status(200).json(results);
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
