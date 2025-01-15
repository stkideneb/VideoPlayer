async function signupHandler(event){
    event.preventDefault();

    const username = document.getElementById('inputUsername').value;
    const password = document.getElementById('inputPassword').value;
    const confirmPassword = document.getElementById('inputConfirmPassword').value;

    try{
        const response = await fetch('http://192.168.178.30:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, confirmPassword}),
        });

        const errorData = await response.json();

        if(response.ok){
            alert(errorData.message);
            window.location.href = "login.html";   
        }
        else{
            alert('Signup failed: ' + errorData.message);
        }
    }
    catch(error){
        console.error('Error during Signup', error);
        alert('Error during Signup');
    }
}
