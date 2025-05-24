

document.addEventListener('touchstart', function (e) {
  if (e.touches.length > 1) {
      e.preventDefault();
  }
}, { passive: false });

// Floating hearts
function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");

  const leftLobe = document.createElement("div");
  leftLobe.classList.add("lobe", "left");

  const rightLobe = document.createElement("div");
  rightLobe.classList.add("lobe", "right");

  heart.appendChild(leftLobe);
  heart.appendChild(rightLobe);

  const size = Math.random() * 30 + 20;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${Math.random() * window.innerWidth}px`;
  heart.style.bottom = "0px";

  // Ajustar lóbulos
  leftLobe.style.width = `${size}px`;
  leftLobe.style.height = `${size}px`;
  rightLobe.style.width = `${size}px`;
  rightLobe.style.height = `${size}px`;
  rightLobe.style.left = size / 2 + "px";
  leftLobe.style.top = -size / 2 + "px";

  heart.addEventListener("mouseenter", () => {
    heart.style.transform += ` translateX(${(Math.random() - 0.5) * 50}px)`;
  });

  // Show msg fun
  function handleHeartInteraction(e) {
    e.preventDefault(); // Evita conflictos con scroll táctil
    heart.style.transform += " scale(1.5)";
    const randomIndex = Math.floor(Math.random() * messages.length);
    showMessage(messages[randomIndex]);
    setTimeout(() => heart.remove(), 300);
  }

  // If it is tactile
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    heart.addEventListener("touchstart", handleHeartInteraction, { passive: false });
  } else {
    heart.addEventListener("click", handleHeartInteraction);
  }

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}
  // Frequent heart creation
  setInterval(createFloatingHeart, 1600);
  
  // Heart animation n music
  
  const heart = document.querySelector('.heart');
  const audio = document.getElementById('music');
  
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  
  const source = audioCtx.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  
  let lastBeat = 425;
  const cooldown = 850; //ms
  const beatThreshold = 120; 
  
  function animateHeart() {
    analyser.getByteFrequencyData(dataArray);
  
    const maxFrequency = Math.max(...dataArray);
  
    const now = Date.now();
    if (maxFrequency > beatThreshold && now - lastBeat > cooldown) {
      heart.classList.remove('beat-once');
      void heart.offsetWidth;
      heart.classList.add('beat-once');
      lastBeat = now;
    }
  
    requestAnimationFrame(animateHeart);
  }
  
  heart.addEventListener('click', () => {
    if (audio.paused) {
      audioCtx.resume();
      audio.play();
      animateHeart(); 
    } else {
      audio.pause();
    }
  });

heart.addEventListener("touchend", (e) => {
  e.preventDefault(); // Previene el comportamiento predeterminado, como el zoom
  heart.dispatchEvent(new Event("click")); // Dispara el evento click manualmente
});

// Random MSG
  const messages = [
    "I love you!",
    "You are amazing!",
    "You make my world in a way better",
    "Stars are in your eyes!",
    "You are unique and special!",
    "You are a treasure!",
    "You're my light",
    "This heart beats 4u";
    "You are beautiful inside and out!",
  ];

  function showMessage(message) {
  let popup = document.querySelector('.message-popup');
  
  if (!popup) {
    popup = document.createElement('div');
    popup.classList.add('message-popup');
    document.body.appendChild(popup);
  }
  
  popup.textContent = message;
  popup.classList.add('show');
  
  setTimeout(() => {
    popup.classList.remove('show');
  }, 3000); // 3SEC MESSAGE Duration 
}
  
