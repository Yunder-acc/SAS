let isAnimatingBg = false;
let bgList = [
    "Assets/Wallpaper/Genshin-Impact.jpg",
    "Assets/Wallpaper/Honkai-StarRail.jpg",
    "Assets/Wallpaper/Zenless-Zone-Zero.png",
    "Assets/Wallpaper/WUWA.jpg",
    "Assets/Wallpaper/Persona.jpg",
    "Assets/Wallpaper/God-Of-War.jpg"   
];

let laguList = [
    "Assets/Music/Persona 3 Full Moon Full Life.mp3",
    "Assets/Music/Persona 3 Color Your Night.mp3",
    "Assets/Music/Map (Night) - Tomodachi Life OST.mp3",
    "Assets/Music/Map (Day) - Tomodachi Life OST.mp3"
];

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let seeMoreButtons = document.querySelectorAll('.Seemore');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');

let isMuted = false;
let laguIndex = 0;
let musik = new Audio(laguList[laguIndex]);
musik.loop = true;
musik.volume = 0.3;

function playLagu(index) {
    musik.pause();
    musik.currentTime = 0;
    musik.src = laguList[index];
    musik.play().catch(function(e){
        console.warn('Autoplay gagal, user harus klik dulu:', e);
    });
}

nextButton.onclick = function() {
    showSlider('next');
    laguIndex = (laguIndex + 1) % laguList.length;
    playLagu(laguIndex);
    changeBackground(true);
}

prevButton.onclick = function() {
    showSlider('prev');
    laguIndex = (laguIndex - 1 + laguList.length) % laguList.length;
    playLagu(laguIndex);
    changeBackground(false);
}

const showSlider = (type) => {
    carousel.classList.remove('prev', 'next');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        let positonLast = items.length -1;
        listHTML.prepend(items[positonLast]);
        carousel.classList.add('prev');
    }
}

window.addEventListener('DOMContentLoaded', function() {
    musik.play().catch(function(e){
        console.warn('Autoplay gagal, user harus klik dulu:', e);
    });
});

function fadeOut(audio, callback) {
    let fade = setInterval(function() {
        if (audio.volume > 0.05) {
            audio.volume -= 0.05;
        } else {
            audio.volume = 0;
            clearInterval(fade);
            if (callback) callback();
        }
    }, 30);
}

function fadeIn(audio, targetVolume = 0.3) {
    audio.volume = 0;
    let fade = setInterval(function() {
        if (audio.volume < targetVolume - 0.05) {
            audio.volume += 0.05;
        } else {
            audio.volume = targetVolume;
            clearInterval(fade);
        }
    }, 30);
}

function playLagu(index) {
    fadeOut(musik, function() {
        musik.pause();
        musik.currentTime = 0;
        musik.src = laguList[index];
        musik.play().then(function() {
            fadeIn(musik, 0.4);
        }).catch(function(e){
            console.warn('Autoplay gagal, user harus klik dulu:', e);
        });
    });
}

const muteButton = document.getElementById('mute');
muteButton.addEventListener('click', function() {
    isMuted = !isMuted;
    musik.muted = isMuted;
    // (opsional) Ganti icon jika ingin
    // muteButton.innerHTML = isMuted ? "<i class='bx bx-volume-mute'></i>" : "<i class='bx bx-volume-full'></i>";
});

function playLagu(index) {
    fadeOut(musik, function() {
        musik.pause();
        musik.currentTime = 0;
        musik.src = laguList[index];
        musik.muted = isMuted; // <-- tambahkan baris ini!
        musik.play().then(function() {
            fadeIn(musik, 0.4);
        }).catch(function(e){
            console.warn('Autoplay gagal, user harus klik dulu:', e);
        });
    });
}

// BACKGROUND

let bgIndex = 0;
const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

bg1.style.backgroundImage = `url('${bgList[bgIndex]}')`;
bg2.style.opacity = 0;

function changeBackground(next = true) {
    if (isAnimatingBg) return;
    isAnimatingBg = true;
    
    nextButton.disabled = true;
    prevButton.disabled = true;

    let newIndex = next
        ? (bgIndex + 1) % bgList.length
        : (bgIndex - 1 + bgList.length) % bgList.length;

    let currentBg = bgIndex % 2 === 0 ? bg1 : bg2;
    let nextBg = bgIndex % 2 === 0 ? bg2 : bg1;

    nextBg.style.backgroundImage = `url('${bgList[newIndex]}')`;
    nextBg.style.transition = 'none';
    nextBg.style.transform = next ? 'translateY(100%)' : 'translateY(-100%)';
    nextBg.style.opacity = 1;
    void nextBg.offsetWidth;

    nextBg.style.transition = 'transform 0.8s cubic-bezier(.77,0,.18,1), opacity 0.8s';
    nextBg.style.transform = 'translateY(0)';
    nextBg.style.opacity = 1;

    currentBg.style.transition = 'transform 0.8s cubic-bezier(.77,0,.18,1), opacity 0.8s';
    currentBg.style.transform = next ? 'translateY(-100%)' : 'translateY(100%)';
    currentBg.style.opacity = 0;

    setTimeout(() => {
        currentBg.style.transition = 'none';
        currentBg.style.transform = 'translateY(0)';
        currentBg.style.opacity = 0;
        isAnimatingBg = false;

        nextButton.disabled = false;
        prevButton.disabled = false;
    }, 800);

    bgIndex = newIndex;
}

// BACKGROUND CLOSE