
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

}

document.getElementById("dropBox").addEventListener('dragleave', function() {
    document.getElementById("dropBox").style.backgroundColor = 'rgb(23, 23, 23)';
});