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

let originalLetterHTML = letterTextElement.innerHTML;
letterTextElement.innerHTML = "";
let isTypewriterStarted = false;
let heartsInterval;

// POLAROID LOGIC
// Run this when the page loads to scatter the photos
function scatterPolaroids() {
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(card => {
        // Random rotation between -20 and 20 degrees
        const randomRotate = Math.random() * 40 - 20; 
        // Random x/y offset (small enough to stay in container)
        const randomX = Math.random() * 40 - 20;
        const randomY = Math.random() * 40 - 20;

        card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    });
}

// Function called when clicking a polaroid
function bringToFront(element) {
    // 1. Remove 'active' class from all polaroids
    const allPolaroids = document.querySelectorAll('.polaroid');
    allPolaroids.forEach(p => {
        p.classList.remove('active');
        
        // Reset them to their scattered state (we need to re-apply the random transform? 
        // Actually, no. If we remove 'active', CSS removes the scale(1.5). 
        // But we want to keep the rotation. 
        // The simple way: Just removing .active reverts to the inline style we set in scatterPolaroids!
    });

    // 2. Add 'active' class to the clicked one
    element.classList.add('active');
}

// Check Password Function
function checkPassword() {
    const input = passwordInput.value.toLowerCase().trim();
    
    if (input === "i love you" || input === "iloveyou") {
        
        bgMusic.play().catch(error => {
            console.log("Audio playback failed: " + error);
        });
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
                    
                    // Scatter photos once main content is visible
                    scatterPolaroids();

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
    if (e.key === 'Enter') {
        checkPassword();
    }
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
    
    // If we switch to gallery, we might want to re-scatter or just ensure they are visible
    if (sectionId === 'gallery') {
        // Optional: scatterPolaroids(); // Uncomment if you want them to reshuffle every time
    }
}
