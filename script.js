// CONFIGURATION
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

// Carousel Logic
let currentSlideIndex = 0;

function changeSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Hide current slide
    slides[currentSlideIndex].classList.remove('active');
    
    // Calculate new index
    currentSlideIndex += n;
    
    // Loop back if at the end or beginning
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    }
    if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Show new slide
    slides[currentSlideIndex].classList.add('active');
    
    // Pause video if moving away from it
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());
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
