const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
//INstancianção
const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    console.log(socket.handshake.query);
    console.log('Usuário conectado', socket.id);

    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id
});


mongoose.connect('mongodb+srv://marquesf:marquesf@omni-iwql4.mongodb.net/banco?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})
//get: rota do usuario | req (requisição), res (devolver uma resposta para a requisição): error function
//req.query = Acessar query params (para filtros)
//req.params = Acessar route params (para edição, delete)
//req.body = Acessar corpo da requisição (para criação, edição)
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

//Local onde a aplicação será visualizada no servidor local
server.listen(3333);