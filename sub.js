document.querySelectorAll('.img-tit').forEach(img => {
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
        const maxTranslate = 18; // px, ubah sesuai kebutuhan (semakin kecil, semakin halus)
        const translateX = x * maxTranslate;
        const translateY = y * maxTranslate;
        img.style.objectPosition = `${posX}% ${posY}%`;
        img.style.transform = 
            `rotateY(${-x * maxTilt}deg) rotateX(${y * maxTilt}deg) translate(${translateX}px, ${translateY}px)`;
    });
    window.addEventListener('mouseout', function() {
        img.style.objectPosition = '50% 50%';
        img.style.transform = 'rotateY(0deg) rotateX(0deg) translate(0,0)';
    });
});