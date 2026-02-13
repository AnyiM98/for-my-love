// CONFIGURATION
// No specific constant needed for password anymore as we check two options below
const TYPEWRITER_SPEED = 40; // milliseconds per character

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const letterTextElement = document.querySelector('.letter-text');
const bgMusic = document.getElementById('bg-music');

// Store the original HTML of the letter
let originalLetterHTML = letterTextElement.innerHTML;
// Clear it immediately
letterTextElement.innerHTML = "";
let isTypewriterStarted = false;
let heartsInterval;

// Check Password Function
function checkPassword() {
    // Convert to lowercase and remove whitespace from both ends
    const input = passwordInput.value.toLowerCase().trim();
    
    // Check for "i love you" OR "iloveyou"
    if (input === "i love you" || input === "iloveyou") {
        
        // 1. START MUSIC IMMEDIATELY
        bgMusic.play().catch(error => {
            console.log("Audio playback failed: " + error);
        });
        bgMusic.volume = 0.5;

        // 2. Start Falling Hearts IMMEDIATELY (so they appear on welcome screen)
        startHearts();

        // 3. Hide Login Screen
        loginScreen.style.opacity = '0';
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            
            // 4. Show Welcome Screen
            welcomeScreen.classList.remove('hidden');
            
            // 5. Wait 2.5 seconds, then show Main Content
            setTimeout(() => {
                welcomeScreen.style.opacity = '0';
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    
                    // 6. Start Typewriter Effect
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
            if (originalLetterHTML.charAt(i) === '<') {
                let tagEnd = originalLetterHTML.indexOf('>', i);
                if (tagEnd !== -1) {
                    i = tagEnd + 1;
                }
            } else {
                i++;
            }
            
            letterTextElement.innerHTML = originalLetterHTML.substring(0, i);
            
            if (i < originalLetterHTML.length) {
                setTimeout(type, TYPEWRITER_SPEED);
            }
        }
    }
    
    type();
}

// Falling Hearts Logic
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    // Randomize position and animation properties
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    
    // INCREASED SIZE BY 50%
    // Old: Math.random() * 20 + 10 + 'px' (10px to 30px)
    // New: Math.random() * 30 + 15 + 'px' (15px to 45px)
    heart.style.fontSize = Math.random() * 30 + 15 + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function startHearts() {
    // INCREASED FREQUENCY (NUMBER OF HEARTS) BY 50%
    // Old: 300ms. New: 200ms (300 / 1.5)
    heartsInterval = setInterval(createHeart, 200);
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
