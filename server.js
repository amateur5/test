const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Kreiranje servera i aplikacije
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Početni podaci
let guests = []; // Lista povezanih gostiju

// Posluživanje statičkih fajlova
app.use(express.static('public'));

// Kada se korisnik poveže
io.on('connection', (socket) => {
    console.log('Novi korisnik je povezan');

    // Dodavanje gosta
    socket.on('register guest', (guestName) => {
        guests.push({ id: socket.id, name: guestName });
        io.emit('update guest list', guests); // Ažuriranje liste gostiju
    });

    // Obrada poruka
    socket.on('send message', (message) => {
        // Možeš dodati filtere ili logiku pre nego što šalješ poruku
        io.emit('receive message', message); // Slanje poruke svim korisnicima
    });

    // Kada korisnik isključi
    socket.on('disconnect', () => {
        console.log('Korisnik je isključen');
        guests = guests.filter(guest => guest.id !== socket.id); // Ukloni gosta iz liste
        io.emit('update guest list', guests); // Ažuriranje liste gostiju
    });
});

// Pokretanje servera
server.listen(3000, () => {
    console.log('Server pokrenut na http://localhost:3000');
});
