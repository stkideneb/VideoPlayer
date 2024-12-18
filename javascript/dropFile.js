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
    const fileName = file.name;
    const filePath = `C:/Users/Zinte/OneDrive/Desktop/Videos/${fileName}`;

    const queryData = { fileName, filePath };

    console.log('Sending data to server:', queryData);

    // HTTP-Anfrage an den Server senden
    fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryData), // Sende die Daten im JSON-Format
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('File uploaded successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error uploading file');
    });

    document.getElementById("dropBox").addEventListener('dragleave', function() {
        document.getElementById("dropBox").style.backgroundColor = 'rgb(23, 23, 23)';
    });
}
