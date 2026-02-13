// CONFIGURATION
const SECRET_CODE = "i love you"; 

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

// Check Password Function
function checkPassword() {
    const input = passwordInput.value.toLowerCase().trim();
    
    if (input === SECRET_CODE) {
        // 1. Hide Login Screen
        loginScreen.style.opacity = '0';
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            
            // 2. Show Welcome Screen
            welcomeScreen.classList.remove('hidden');
            
            // 3. Wait 2.5 seconds, then show Main Content
            setTimeout(() => {
                welcomeScreen.style.opacity = '0';
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                }, 1000); // Wait for fade out to finish
            }, 2500); // How long the welcome message stays visible
            
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
    const buttonsArray = Array.from(buttons);
    const clickedBtn = buttonsArray.find(btn => btn.getAttribute('onclick').includes(sectionId));
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
}
