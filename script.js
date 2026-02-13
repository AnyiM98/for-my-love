// CONFIGURATION
const SECRET_CODE = "i love you"; 
const TYPEWRITER_SPEED = 40; // milliseconds per character (lower is faster)

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const letterTextElement = document.querySelector('.letter-text');

// Store the original HTML of the letter so we can type it out
let originalLetterHTML = letterTextElement.innerHTML;
// Clear it immediately so it's empty when the page loads
letterTextElement.innerHTML = "";
let isTypewriterStarted = false;

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
                    
                    // 4. Start Typewriter Effect
                    if (!isTypewriterStarted) {
                        startTypewriter();
                        isTypewriterStarted = true;
                    }

                }, 1000); 
            }, 2500); 
            
        }, 500);
    } else {
        errorMessage.style.display = 'block';
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

// Typewriter Logic
function startTypewriter() {
    let i = 0;
    
    function type() {
        if (i <= originalLetterHTML.length) {
            // If we encounter a tag opening '<', fast forward to the closing '>'
            // This ensures we render formatting (bold, breaks) instantly and don't break HTML
            if (originalLetterHTML.charAt(i) === '<') {
                let tagEnd = originalLetterHTML.indexOf('>', i);
                if (tagEnd !== -1) {
                    i = tagEnd + 1; // Skip the whole tag
                }
            } else {
                i++; // Just a regular character, move forward one
            }
            
            // Update the text
            letterTextElement.innerHTML = originalLetterHTML.substring(0, i);
            
            // Loop
            if (i < originalLetterHTML.length) {
                setTimeout(type, TYPEWRITER_SPEED);
            }
        }
    }
    
    type();
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
    
    const buttonsArray = Array.from(buttons);
    const clickedBtn = buttonsArray.find(btn => btn.getAttribute('onclick').includes(sectionId));
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
}
