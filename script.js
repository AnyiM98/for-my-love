// CONFIGURATION
const TYPEWRITER_SPEED = 40; 

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');
const letterTextElement = document.querySelector('.letter-text');
const bgMusic = document.getElementById('bg-music');
const overlay = document.getElementById('overlay');

// Letter Typewriter Setup
let originalLetterHTML = letterTextElement.innerHTML;
letterTextElement.innerHTML = "";
let isTypewriterStarted = false;
let heartsInterval;

/* =========================================
   POLAROID LOGIC
   ========================================= */

// Store random positions to return to after closing
let polaroidPositions = [];
let isScattered = false;

function scatterPolaroids() {
    const polaroids = document.querySelectorAll('.polaroid');
    
    polaroids.forEach((card, index) => {
        // Random rotation (-15 to 15 degrees)
        const randomRotate = Math.random() * 30 - 15; 
        
        // Random Position (Percentages 10% to 80% to keep inside container)
        const randomLeft = Math.random() * 70 + 10; // 10% to 80%
        const randomTop = Math.random() * 60 + 10;  // 10% to 70%

        // Store position data
        const posData = {
            left: randomLeft + '%',
            top: randomTop + '%',
            rotation: randomRotate
        };
        polaroidPositions[index] = posData;

        // Apply styles
        card.style.left = posData.left;
        card.style.top = posData.top;
        card.style.transform = `translate(-50%, -50%) rotate(${posData.rotation}deg)`;
    });
}

function bringToFront(element) {
    // 1. If already active, close it
    if (element.classList.contains('active')) {
        resetPolaroids();
        return;
    }

    // 2. Reset others
    resetPolaroids();

    // 3. Activate clicked one
    element.classList.add('active');
    
    // 4. Show dark overlay
    overlay.classList.add('show');
}

function resetPolaroids() {
    const allPolaroids = document.querySelectorAll('.polaroid');
    
    // Hide overlay
    overlay.classList.remove('show');
    
    allPolaroids.forEach((card, index) => {
        // Remove active class
        card.classList.remove('active');
        
        // Re-apply the original scattered styles
        // Note: CSS transitions will make this smooth
        const pos = polaroidPositions[index];
        if (pos) {
            card.style.left = pos.left;
            card.style.top = pos.top;
            card.style.transform = `translate(-50%, -50%) rotate(${pos.rotation}deg)`;
        }
    });
}

// Click overlay to close
overlay.addEventListener('click', resetPolaroids);

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") resetPolaroids();
});


/* =========================================
   GENERAL SITE LOGIC
   ========================================= */

function checkPassword() {
    const input = passwordInput.value.toLowerCase().trim();
    
    if (input === "i love you" || input === "iloveyou") {
        
        // Play Music
        bgMusic.play().catch(error => console.log("Audio play error: ", error));
        bgMusic.volume = 0.5;

        // Start Hearts
        startHearts();

        // Animation Sequence
        loginScreen.style.opacity = '0';
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            welcomeScreen.classList.remove('hidden');
            
            setTimeout(() => {
                welcomeScreen.style.opacity = '0';
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    
                    // Start Typewriter if not done
                    if (!isTypewriterStarted) {
                        startTypewriter();
                        isTypewriterStarted = true;
                    }
                }, 1000); 
            }, 3000); // Wait time on Welcome Screen
            
        }, 500);
    } else {
        errorMessage.style.display = 'block';
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

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

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.fontSize = Math.random() * 30 + 15 + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function startHearts() {
    heartsInterval = setInterval(createHeart, 200);
}

passwordInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkPassword();
});

// Navigation
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

    // Trigger scatter only when gallery is first opened
    if (sectionId === 'gallery' && !isScattered) {
        // Small delay to ensure container has dimensions
        setTimeout(() => {
            scatterPolaroids();
            isScattered = true;
        }, 100);
    }
}
