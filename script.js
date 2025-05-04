document.getElementById('generate').addEventListener('click', function() {
    const length = document.getElementById('length').value;
    const hasUppercase = document.getElementById('uppercase').checked;
    const hasLowercase = document.getElementById('lowercase').checked;
    const hasNumbers = document.getElementById('numbers').checked;
    const hasSpecial = document.getElementById('special').checked;
    
    const password = generatePassword(length, hasUppercase, hasLowercase, hasNumbers, hasSpecial);
    document.getElementById('password').value = password;

    const strength = checkStrength(password);
    document.getElementById('strength').textContent = strength.label;
    document.getElementById('strength').style.color = strength.color;
});

document.getElementById('copy').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});

function generatePassword(length, hasUppercase, hasLowercase, hasNumbers, hasSpecial) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+[]{}|;:,.<>?/";
    
    let characters = "";
    if (hasUppercase) characters += uppercase;
    if (hasLowercase) characters += lowercase;
    if (hasNumbers) characters += numbers;
    if (hasSpecial) characters += special;

    if (characters === "") return ""; // No characters selected
    
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return password;
}

function checkStrength(password) {
    let strength = {
        label: 'Very Weak',
        color: 'darkred',
    };

    const lengthCriteria = password.length >= 8;
    const upperCriteria = /[A-Z]/.test(password);
    const lowerCriteria = /[a-z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const specialCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (lengthCriteria && (upperCriteria || lowerCriteria) && numberCriteria) {
        if (specialCriteria) {
            strength.label = 'Very Strong';
            strength.color = 'green';
        } else {
            strength.label = 'Strong';
            strength.color = 'lightgreen';
        }
    } else if (lengthCriteria && (upperCriteria || lowerCriteria) && (numberCriteria || specialCriteria)) {
        strength.label = 'Neutral';
        strength.color = 'yellow';
    } else if (lengthCriteria) {
        strength.label = 'Weak';
        strength.color = 'red';
    }

    return strength;
}
