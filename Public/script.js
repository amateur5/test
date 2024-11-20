const socket = io(); // Povezivanje sa serverom putem socket.io

// Elementi za toolbar
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const colorBtn = document.getElementById('colorBtn');
const colorPicker = document.getElementById('colorPicker');
const smileBtn = document.getElementById('smilesBtn');
const bannedBtn = document.getElementById('banned');
const chatInput = document.getElementById('chatInput');
const messageArea = document.getElementById('messageArea');
const guestList = document.getElementById('guestList');

// Funkcija za formatiranje teksta
function formatText(style) {
    let text = chatInput.value;
    if (style === 'bold') {
        chatInput.value = `<b>${text}</b>`;
    } else if (style === 'italic') {
        chatInput.value = `<i>${text}</i>`;
    } else if (style === 'color') {
        chatInput.value = `<span style="color:${colorPicker.value}">${text}</span>`;
    }
}

// Funkcija za dodavanje smeška u tekst
smileBtn.addEventListener('click', () => {
    chatInput.value += '😊';
});

// Funkcija za banovanje korisnika
bannedBtn.addEventListener('click', () => {
    // Ovo može biti nešto poput identifikacije korisnika i slanja poruke za banovanje
    alert('Banovanje korisnika nije implementirano.');
});

// Funkcija za slanje poruke sa formatiranjem
chatInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        let message = chatInput.value;
        socket.emit('send message', message); // Poslati poruku serveru
        chatInput.value = ''; // Očistiti chat input
    }
});

// Povezivanje funkcionalnosti dugmadi
boldBtn.addEventListener('click', () => formatText('bold'));
italicBtn.addEventListener('click', () => formatText('italic'));
colorBtn.addEventListener('click', () => formatText('color'));

// Prikazivanje poruka u chat-u
socket.on('receive message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = msg;
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight; // Auto skrol na poslednju poruku
});

// Funkcija za dodavanje korisnika u listu gostiju
socket.on('update guest list', (guestListData) => {
    guestList.innerHTML = ''; // Očistiti prethodni sadržaj
    guestListData.forEach(guest => {
        const guestElement = document.createElement('div');
        guestElement.textContent = guest.name;
        guestList.appendChild(guestElement);
    });
});
