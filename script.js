// CONFIGURATION
const SECRET_CODE = "i love you"; // Change this to your desired code (e.g., anniversary)

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

// Check Password Function
function checkPassword() {
    const input = passwordInput.value;
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
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));

    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update buttons
    const buttons = document.querySelectorAll('nav button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Highlight active button (simple way matches by text content or index, 
    // but here we just find the button that called this. 
    // Since we called it from HTML, we can manually manage active class in HTML or complex JS.
    // For simplicity, let's just loop and set active based on text for now or simple logic.)
    
    // Actually, a simpler way for the button active state:
    event.target.classList.add('active');
}