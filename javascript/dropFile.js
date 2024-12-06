var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ka59tfD1AnE@',
    database: 'db_file'
});



function dragOverHandler(event) {
 
    event.preventDefault();

    document.getElementById("dropBox").style.backgroundColor = 'rgb(28, 28, 28)';
    
}

function dropHandler(event) {
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (files.length === 0) {
        return;
    }

    const file = files[0];

    document.getElementById("txtDropBox").textContent = `File: ${file.name}`;
    console.log("Dropped file:", file);
    
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.stack);
            return;
        }
        console.log('Connected to the database.');
    });
    
    const query = 'CALL proc_insertFile("test", "C:/Users/Zinte/Videos/chocolate_cake.mov");';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return;
        }
        console.log('Table created or already exists:', results);
    });
    connection.end;

}

document.getElementById("dropBox").addEventListener('dragleave', function() {
    document.getElementById("dropBox").style.backgroundColor = 'rgb(23, 23, 23)';
});