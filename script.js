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

// Lightbox Elements
const overlay = document.getElementById('overlay');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Letter Typewriter Setup
let originalLetterHTML = letterTextElement.innerHTML;
letterTextElement.innerHTML = "";
let isTypewriterStarted = false;
let heartsInterval;

/* =========================================
   LIGHTBOX (POPUP) LOGIC
   ========================================= */

function openLightbox(polaroidElement) {
    const imgElement = polaroidElement.querySelector('img');
    const src = imgElement.src;

    lightboxImg.src = src;

    overlay.classList.add('show');
    lightbox.classList.add('show');
}

function closeLightbox() {
    overlay.classList.remove('show');
    lightbox.classList.remove('show');
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});


/* =========================================
   GENERAL SITE LOGIC
   ========================================= */

function checkPassword() {
    const input = passwordInput.value.toLowerCase().trim();
    
    if (input === "i love you" || input === "iloveyou") {
        
        bgMusic.play().catch(error => console.log("Audio play error: ", error));
        bgMusic.volume = 0.5;

        startHearts();

        loginScreen.style.opacity = '0';
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            welcomeScreen.classList.remove('hidden');
            
            setTimeout(() => {
                welcomeScreen.style.opacity = '0';
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    
                    if (!isTypewriterStarted) {
                        startTypewriter();
                        isTypewriterStarted = true;
                    }
                }, 1000); 
            }, 3000); 
            
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
