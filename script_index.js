var musik = new Audio();
musik.src = "Assets/Music/Persona 3 Color Your Night.mp3";
musik.loop = true;
musik.preload = "auto";
musik.volume = 0.3;

function mulaiAudio() {
    var mute = document.getElementById("mute");
    mute.addEventListener('click', function() {
        musik.muted = !musik.muted;
    });

    setTimeout(function() {
        musik.play().catch(function(e){
            console.warn('Ga jalan woe autoplaynya', e);
        });
    }, 150);
}

window.addEventListener('load', mulaiAudio);