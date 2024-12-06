const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ka59tfD1AnE@',
    database: 'db_file'
});

connection.connect((err) => {
    if(err){
        console.error('Error connection to the database: ', err.stack);
        return;
    }
    console.log('Connected to the database.')
});

app.post('/upload', (req, res) => {
    const { name, filePath } = req.body;
    const query = 'CALL proc_insertFile(?, ?)';
    connection.query(query, [name, filePath], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Database query failed');
        }
        res.status(200).send('File uploaded successfully');
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});