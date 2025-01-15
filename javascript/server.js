const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
//const jwbtoken = require('jsonwebtoken'); 


const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Erlaubtes Frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ka59tfD1AnE@',
  database: 'db_file',
  connectionLimit: 10,
});



app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `CALL proc_doesUserExist('${username}', '${password}', @status);`;

  pool.query(query, (err) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error during query execution');
    }

    pool.query('SELECT @status AS status;', (err, result) => {
      if (err) {
        console.error('Error fetching status:', err);
        return res.status(500).send('Error fetching status');
      }

      const status = result[0]?.status;
      if (status === 1) {
        console.log(`Login successful as: \n${username} ${password}`);
        return res.status(200).json({ message: 'Login was sucessfull' });
      } else if (status === 0) {
        console.log('Invalid username or password');
        return res.status(401).json({ message: 'Invalid username or password' });
      } else {
        console.log('Error in login');
        return res.status(500).json({ message: 'Error in login' });
      }
    });
  });
});
app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const addUserQuery = `CALL proc_addNewUser('${username}','${password}','${confirmPassword}', @message);`;
  const addUserMessageQuery = 'SELECT @message AS message;';

  pool.query(addUserQuery, (err) => {
    if(err){
      console.error("Error executing query:", err);
      return res.status(500).send('Error executing query execution');
    }
  pool.query(addUserMessageQuery, (err, results) => {
      if(err){
        console.error("Error fetching message", err);       
        return res.status(500).send('Error fetching message');
      }
  

      const message = results[0]?.message;

      if (message === 'successfully created an account') {
        console.log('Successfully created an account');  
        return res.status(200).json({ message: 'Successfully created an account'});
      } else if (message === 'name already taken') {
        console.log('Name already taken');
        return res.status(409).json({ message: 'Name already taken' });
      } else if (message === 'password doesnt match') {
        console.log('Passwords do not matchy');
        return res.status(400).json({ message: 'Passwords do not match' });
      } else {
        console.log('Error in Signup');
        return res.status(500).json({ message: 'Error in Signup' });
      }
    })

  })
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/Zinte/OneDrive/Desktop/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Zeitstempel als Namen, um redundanz der Namen vorzubeugen
  },
});
const upload = multer({ storage });

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
app.use('/uploads', express.static('C:/Users/Zinte/OneDrive/Desktop/uploads'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server läuft unter http://192.168.178.30:${port}`);
});
