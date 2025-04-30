const emojis = ['🌈', '🎉', '🍕', '🚀', '🎸', '🎨', '🎭', '🎪', '🎯', '🎲', '🎮', '🎲', '🎯', '🎪', '🎭', '🎨', '🎸', '🚀', '🍕', '🎉'];
const angryWords = ['angry', 'mad', 'upset', 'frustrated', 'annoyed', 'irritated', 'pissed', 'rage', 'hate', 'terrible'];
const randomReplies = [
    "Oops, my cat just walked on my keyboard! 🐱",
    "Did you see that cloud? It looks like a dinosaur! 🦖",
    "I'm currently learning to juggle... with emojis! 🤹",
    "My plants are having a party, can't talk now! 🌱",
    "Just found a new dance move, watch this! 💃",
    "My coffee is doing a rain dance in my cup! ☕",
    "The squirrels in my garden are plotting something... 🐿️",
    "My keyboard is making funny noises! ⌨️",
    "I think my chair is trying to tell me something... 🪑",
    "Just discovered that my plants can do the cha-cha! 🌿"
];

function getRandomEmojis() {
    const count = Math.floor(Math.random() * 3) + 2; // 2-4 emojis
    return Array.from({ length: count }, () => emojis[Math.floor(Math.random() * emojis.length)]).join(' ');
}

function getRandomReply() {
    return randomReplies[Math.floor(Math.random() * randomReplies.length)];
}

function containsAngryWords(message) {
    return angryWords.some(word => message.toLowerCase().includes(word));
}

function playRandomSound() {
    const sounds = ['rockSound', 'happySound', 'danceSound'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = document.getElementById(randomSound);
    
    // Stop any currently playing audio
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    
    // Play the new sound
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
}

function shootConfetti() {
    playRandomSound();
    
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since particles fall down, start a bit higher than random
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}

function addMessage(message, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    if (type === 'mr-i-message' && message.includes('dances away')) {
        messageDiv.innerHTML = '<span class="dancing-emoji">💃</span>';
    } else {
        messageDiv.textContent = message;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addMessage(message, 'user-message');
        
        // Clear input
        input.value = '';
        
        // Mr.I's response
        setTimeout(() => {
            if (containsAngryWords(message)) {
                shootConfetti();
                addMessage('*dances away from the conversation*', 'mr-i-message');
            } else {
                // Randomly choose between emojis and text replies
                if (Math.random() < 0.5) {
                    playRandomSound();
                    addMessage(getRandomEmojis(), 'mr-i-message');
                } else {
                    playRandomSound();
                    addMessage(getRandomReply(), 'mr-i-message');
                }
            }
        }, 1000);
    }
}

// Allow sending message with Enter key
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Initialize the sticker as hidden
document.addEventListener('DOMContentLoaded', function() {
    const dancingSticker = document.getElementById('dancingSticker');
    if (dancingSticker) {
        dancingSticker.style.display = 'none';
    }
}); 