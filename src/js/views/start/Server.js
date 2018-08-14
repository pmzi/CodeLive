let io = require('socket.io');

const socket = require('socket.io-client');

class Server {

    constructor() {

        this.server;

        this.isServer = false;

    }

    create() {

        return new Promise((resolve, reject) => {
            this.server = require('http');

            //create a server object:
            this.server = this.server.createServer();

            this.isServer = true;

            io = io(this.server);

            io.on('connection', (client) => {

                this.handleServerSocket(client)

            });

            this.server.listen(2020);

            resolve();

        })

    }

    join(ipAddress) {

        const connectedSocket = socket(`http://${ipAddress}`);

        connectedSocket.on('connect', () => {

            console.log("connected to server")

        })

    }

    handleServerSocket(socket) {

        // Handles socket

        console.log("Joined");

    }

}

module.exports = Server;