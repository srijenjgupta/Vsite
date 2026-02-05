// --- CONFIGURATION ---
// Update the year to the current year
const year = 2026; 

// The content for each day
const days = [
    { 
        date: `${year}-02-02`, 
        title: "Rose Day 🌹", 
        emoji: "🌹",
        msg: "Happy Rose Day! Unlike a real rose, my love for you will never wither. You are the most beautiful flower in my garden." 
    },
    { 
        date: `${year}-02-02`, 
        title: "Propose Day 💍", 
        emoji: "💍",
        msg: "I might have already asked, or maybe I'm waiting for the right moment... but today I just want to say: I choose you. Every single day." 
    },
    { 
        date: `${year}-02-02`, 
        title: "Chocolate Day 🍫", 
        emoji: "🍫",
        gameType: "chocolate",
        msg: "Nothing is sweeter than chocolate... except you. (Okay, maybe you covered in chocolate? 😉) Sending you virtual sweetness!" 
    },
    { 
        date: `${year}-02-01`, 
        title: "Teddy Day 🧸", 
        emoji: "🧸",
        msg: "I can't always be there to hold you, so here is a virtual teddy bear hug! Squeeze your phone... I'm sending a hug right now." 
    },
    { 
        date: `${year}-02-01`, 
        title: "Promise Day 🤝", 
        emoji: "🤞",
        gameType: "promise",
        msg: "I promise to laugh at your bad jokes, to support your dreams, and to love you even when you're hangry. Forever and always." 
    },
    { 
        date: `${year}-02-01`, 
        title: "Hug Day 🤗", 
        emoji: "🫂",
        gameType: "hug",
        msg: "If I could, I'd teleport to you right now for a massive bear hug. Until then, consider this message a warm embrace." 
    },
    { 
        date: `${year}-02-01`, 
        title: "Kiss Day 💋", 
        emoji: "💋",
        msg: "MWAH! 💋 Sending you a thousand kisses. Catch them all!" 
    },
    { 
        date: `${year}-02-01`, 
        title: "Valentine's Day ❤️", 
        emoji: "💖",
        gameType: "valentine",
        msg: "Happy Valentine's Day, my love! You are my best friend, my partner, and my whole world. I love you more than code loves semicolons." 
    }
];

const grid = document.getElementById("button-grid");
const modal = document.getElementById("loveModal");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalImage = document.getElementById("modal-image");

// Get actual current date
const today = new Date();
// To TEST the site before Feb, uncomment the line below and change the date:
// const today = new Date("2026-02-14"); 

days.forEach((day, index) => {
    const btn = document.createElement("div");
    btn.classList.add("day-btn");

    const targetDate = new Date(day.date);
    
    // Normalize times to midnight to compare just the dates
    targetDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    if (today < targetDate) {
        // LOCKED STATE
        btn.classList.add("locked");
        btn.innerHTML = `<span class="lock-icon">🔒</span> <br> Feb ${7 + index}`;
        btn.onclick = () => {
            // Shake animation for fun
            btn.style.animation = "shake 0.5s";
            setTimeout(() => btn.style.animation = "", 500);
            alert(`Wait until ${day.title} comes! Don't peek! 🤫`);
        };
    } else {
        // UNLOCKED STATE
        btn.innerHTML = `${day.emoji} <br> ${day.title}`;
        btn.onclick = () => openModal(day);
    }

    grid.appendChild(btn);
});

// Modal Logic
function startHugGame(container) {
    let taps = 0;
    container.innerHTML = `
        <p>Tap to send a 10-ton hug!</p>
        <div id="hug-heart" style="font-size: 30px; transition: 0.2s;">❤️</div>
        <button class="game-btn" onclick="processHug()">TAP TO HUG</button>
    `;
    window.processHug = () => {
        taps++;
        document.getElementById('hug-heart').style.fontSize = (30 + taps * 10) + "px";
        if(taps >= 10) {
            container.innerHTML = "<h3>HUG DELIVERED! 🤗</h3><p>I feel it all the way here!</p>";
        }
    };
}
function startPromiseGame(container) {
    container.innerHTML = `
        <div style="text-align: left; display: inline-block;">
            <label><input type="checkbox" class="p-check"> I promise to share my fries.</label><br>
            <label><input type="checkbox" class="p-check"> I promise to give best hugs.</label><br>
            <label><input type="checkbox" class="p-check"> I promise to love you forever.</label>
        </div>
        <br><button class="game-btn" onclick="checkPromises()">Seal the Deal</button>
    `;
    window.checkPromises = () => {
        const checks = document.querySelectorAll('.p-check');
        const allChecked = Array.from(checks).every(c => c.checked);
        if(allChecked) {
            container.innerHTML = "<h3>🤞 PROMISE SEALED!</h3><p>I'll hold you to these!</p>";
        } else {
            alert("You must agree to all terms and conditions of my love! 😂");
        }
    };
}
function startValentineGame(container) {
    container.innerHTML = `
        <p>Will you be my Valentine?</p>
        <button class="game-btn" onclick="alert('YAY! Best day ever!')">YES!</button>
        <button id="no-btn" class="game-btn" style="position: absolute;">NO</button>
    `;
    const noBtn = document.getElementById('no-btn');
    // For mobile (touchstart) and desktop (mouseover)
    const moveBtn = () => {
        noBtn.style.top = Math.random() * 80 + "%";
        noBtn.style.left = Math.random() * 80 + "%";
    };
    noBtn.addEventListener('touchstart', moveBtn);
    noBtn.addEventListener('mouseover', moveBtn);
}
function startChocolateGame(container) {
    container.innerHTML = `
        <p>Pick a chocolate to reveal your surprise:</p>
        <span onclick="this.innerText='You are extra sweet! 🍫'" style="cursor:pointer; font-size:40px;">🎁</span>
        <span onclick="this.innerText='My favorite treat! 🍬'" style="cursor:pointer; font-size:40px;">🎁</span>
        <span onclick="this.innerText='I love you a choco-lot! 🍩'" style="cursor:pointer; font-size:40px;">🎁</span>
    `;
}
function openModal(dayData) {
    modalTitle.innerText = dayData.title;
    modalMessage.innerText = dayData.msg;
    modalImage.innerText = dayData.emoji;
    const gameZone = document.getElementById("game-zone"); // Add this div to your HTML modal
    gameZone.innerHTML = ""; // Clear old games

    if(dayData.gameType === "hug") startHugGame(gameZone);
    else if(dayData.gameType === "promise") startPromiseGame(gameZone);
    else if(dayData.gameType === "valentine") startValentineGame(gameZone);
    else if(dayData.gameType === "chocolate") startChocolateGame(gameZone);
    modal.style.display = "flex";
    fireConfetti();
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Simple CSS confetti effect
function fireConfetti() {
    const count = 50;
    const defaults = { origin: { y: 0.7 } };
    // This function triggers a small burst of fun visuals
    // Since we aren't using an external library, we simply add a class or effect here
    // For a simple version without libraries:
    modalImage.style.transform = "scale(1.5) rotate(10deg)";
    setTimeout(() => modalImage.style.transform = "scale(1)", 200);
}

// Add shake animation style dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
`;
document.head.appendChild(styleSheet);


