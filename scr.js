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
  
    // Adjusting the lobes' size and position
    leftLobe.style.width = `${size}px`;
    leftLobe.style.height = `${size}px`;
    rightLobe.style.width = `${size}px`;
    rightLobe.style.height = `${size}px`;
    rightLobe.style.left = size / 2 + "px";
    leftLobe.style.top = -size / 2 + "px";
  
    // Interaction
    heart.addEventListener("mouseenter", () => {
      heart.style.transform += ` translateX(${(Math.random() - 0.5) * 50}px)`;
    });
  
    heart.addEventListener("click", () => {
      heart.style.transform += " scale(1.5)";
      setTimeout(() => heart.remove(), 300);
    });
  
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