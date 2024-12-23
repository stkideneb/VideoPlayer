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
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://192.168.178.30:3000/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('File uploaded successfully');
        window.location.href = 'index.html'; // Zurück zur Homepage
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error uploading file');
    });
}

document.getElementById("dropBox").addEventListener('dragleave', function() {
    document.getElementById("dropBox").style.backgroundColor = 'rgb(23, 23, 23)';
});

