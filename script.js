// CONFIGURATION
const SECRET_CODE = "i love you"; 

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

// Check Password Function
function checkPassword() {
    const input = passwordInput.value.toLowerCase().trim(); // Converts input to lowercase and removes extra spaces
    if (input === SECRET_CODE) {
        // Correct Password
        loginScreen.style.opacity = '0';
        loginScreen.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            loginScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 500);
    } else {
        // Wrong Password
        errorMessage.style.display = 'block';
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

// Allow pressing "Enter" key
passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

// Navigation Function
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));

    document.getElementById(sectionId).classList.remove('hidden');

    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Highlight the clicked button
    const clickedBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(sectionId));
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
}
