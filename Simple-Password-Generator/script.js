const generateButton = document.getElementById('generate');
const result = document.getElementById('result');
const slider = document.getElementById('slider');
const length = document.getElementById('length');
const copyButton = document.getElementById('copy-btn'); 
const profile = document.getElementById('profile');
const name = document.getElementById('name');

profile.onclick = visitGitHub;
name.onclick = visitGitHub;

function visitGitHub() {
    window.location = 'https://github.com/s4rrar';
}

slider.addEventListener('input', function() {
    length.innerText = `Length: ${slider.value}`;
});

generateButton.onclick = function() {
    const passwordLength = document.getElementById('slider').value;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    const password = generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    result.innerText = password;
};

copyButton.onclick = function() {
    const password = result.innerText.trim();
    if (password === "CLICK THE BUTTON TO GENERATE") {
        result.innerText = "Generate a password first!";
        setTimeout(() => {
            result.innerText = 'CLICK THE BUTTON TO GENERATE';
        }, 1000);
        return;
    }
    const tempInput = document.createElement("input");
    tempInput.value = password;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    result.innerText = "Password copied!";
    setTimeout(() => {
        result.innerText = password;
    }, 1000);
};


function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols){
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=";
    let allowedChars = "";
    let password = "";
    allowedChars += includeLowercase ? lowercaseChars : "";
    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? symbolChars : "";
    if(length <= 0) {
        return `(Password length must be at least 1)`;
    }
    if(allowedChars.length === 0) {
        return `(At least 1 set of character needs to be selected)`;
    }

    for(let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    return password;
}

length.innerText = `LENGTH: ${slider.value}`;