// CONFIGURATION
const SECRET_CODE = "i love you"; 
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
    const input = passwordInput.value.toLowerCase().trim();
    
    if (input === SECRET_CODE) {
        
        // 1. START MUSIC IMMEDIATELY
        // Browsers allow audio to play because the user just clicked a button
        bgMusic.play().catch(error => {
            console.log("Audio playback failed: " + error);
        });
        bgMusic.volume = 0.5; // Set volume to 50%

        // 2. Hide Login Screen
        loginScreen.style.opacity = '0';
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            
            // 3. Show Welcome Screen
            welcomeScreen.classList.remove('hidden');
            
            // 4. Wait 2.5 seconds, then show Main Content
            setTimeout(() => {
                welcomeScreen.style.opacity = '0';
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    
                    // 5. Start Typewriter Effect
                    if (!isTypewriterStarted) {
                        startTypewriter();
                        isTypewriterStarted = true;
                    }

                    // 6. Start Falling Hearts
                    startHearts();

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
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // Between 2 and 5 seconds
    heart.style.fontSize = Math.random() * 20 + 10 + 'px'; // Varying sizes
    
    document.body.appendChild(heart);
    
    // Remove heart after animation to keep browser clean
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function startHearts() {
    // Create a new heart every 300 milliseconds
    heartsInterval = setInterval(createHeart, 300);
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
