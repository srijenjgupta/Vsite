// --- CONFIGURATION ---
// Update the year to the current year
const year = 2026; 

// The content for each day
const days = [
    { 
        date: `${year}-02-07`, 
        title: "Rose Day 🌹", 
        emoji: "🌹",
        msg: "Happy Rose Day! Unlike a real rose, my love for you will never wither. You are the most beautiful flower in my garden." 
    },
    { 
        date: `${year}-02-08`, 
        title: "Propose Day 💍", 
        emoji: "💍",
        msg: "I might have already asked, or maybe I'm waiting for the right moment... but today I just want to say: I choose you. Every single day." 
    },
    { 
        date: `${year}-02-09`, 
        title: "Chocolate Day 🍫", 
        emoji: "🍫",
        msg: "Nothing is sweeter than chocolate... except you. (Okay, maybe you covered in chocolate? 😉) Sending you virtual sweetness!" 
    },
    { 
        date: `${year}-02-10`, 
        title: "Teddy Day 🧸", 
        emoji: "🧸",
        msg: "I can't always be there to hold you, so here is a virtual teddy bear hug! Squeeze your phone... I'm sending a hug right now." 
    },
    { 
        date: `${year}-02-11`, 
        title: "Promise Day 🤝", 
        emoji: "🤞",
        msg: "I promise to laugh at your bad jokes, to support your dreams, and to love you even when you're hangry. Forever and always." 
    },
    { 
        date: `${year}-02-12`, 
        title: "Hug Day 🤗", 
        emoji: "🫂",
        msg: "If I could, I'd teleport to you right now for a massive bear hug. Until then, consider this message a warm embrace." 
    },
    { 
        date: `${year}-02-13`, 
        title: "Kiss Day 💋", 
        emoji: "💋",
        msg: "MWAH! 💋 Sending you a thousand kisses. Catch them all!" 
    },
    { 
        date: `${year}-02-14`, 
        title: "Valentine's Day ❤️", 
        emoji: "💖",
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
function openModal(dayData) {
    modalTitle.innerText = dayData.title;
    modalMessage.innerText = dayData.msg;
    modalImage.innerText = dayData.emoji;
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