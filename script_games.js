var musik = new Audio();
musik.src = "Assets/Music/Zenless Zone Zero The Way Home.mp3";
musik.loop = true;
musik.preload = "auto";
musik.volume = .5;

function mulaiAudio() {
    setTimeout(function() {
        musik.play().catch(function(e){
            console.warn('Ga jalan woe autoplaynya', e);
        });
    }, 100);
}

window.addEventListener('load', mulaiAudio);

function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 60) {
            el.classList.add('revealed');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// --- Visualisasi Gelombang Audio ---
const canvas = document.getElementById('audioWave');
const ctx = canvas.getContext('2d');

let audioCtx, analyser, source, dataArray, animationId;

function setupAudioWave() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.smoothingTimeConstant = .8 ;
        source = audioCtx.createMediaElementSource(musik);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 2048;
        dataArray = new Uint8Array(analyser.fftSize);
    }
    drawWave();
}

function drawWave() {
    analyser.getByteTimeDomainData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let smoothData = [];
    for (let i = 0; i < dataArray.length; i++) {
        let prev = dataArray[i - 1] || dataArray[i];
        let next = dataArray[i + 1] || dataArray[i];
        smoothData[i] = (prev + dataArray[i] + next) / 2;
    }

    ctx.beginPath();
    for (let i = 0; i < canvas.width; i++) {
        let dataIndex = Math.floor(i * dataArray.length / canvas.width);
        let y = (dataArray[dataIndex] / 255) * canvas.height;
        if (i === 0) {
            ctx.moveTo(i, y);
        } else {
            ctx.lineTo(i, y);
        }
    }
    ctx.strokeStyle = "#00eaff";
    ctx.lineWidth = 1;
    ctx.stroke();

    animationId = requestAnimationFrame(drawWave);
}

// Mulai visualisasi saat audio siap diputar
musik.addEventListener('play', setupAudioWave);
musik.addEventListener('pause', () => cancelAnimationFrame(animationId));
musik.addEventListener('ended', () => cancelAnimationFrame(animationId));


document.querySelectorAll('.exp img').forEach(img => {
    const parent = img.parentElement;
    window.addEventListener('mousemove', function(e) {
        const rect = parent.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        const maxLirik = 8;
        const posX = Math.max(45, Math.min(55, 50 + x * maxLirik));
        const posY = Math.max(45, Math.min(55, 50 + y * maxLirik));
        const maxTilt = 8;
        // Tambahkan translate agar gambar sedikit bergerak ke arah kursor
        const maxTranslate = 12; // px, ubah sesuai kebutuhan (semakin kecil, semakin halus)
        const translateX = x * maxTranslate;
        const translateY = y * maxTranslate;
        img.style.objectPosition = `${posX}% ${posY}%`;
        img.style.transform = 
            `rotateY(${-x * maxTilt}deg) rotateX(${y * maxTilt}deg) translate(${translateX}px, ${translateY}px)`;
    });
});