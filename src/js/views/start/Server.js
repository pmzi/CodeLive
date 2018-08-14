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

        return new Promise((resolve, reject) => {
            
            const connectedSocket = socket(`http://${ipAddress}`);

            let socketInterval;

            connectedSocket.on('connect', () => {

                clearInterval(socketInterval)

                console.log("connected to server")

                resolve();

            })

            socketInterval = setInterval(()=>{
                reject();
            }, 5000)

        })

    }

    handleServerSocket(socket) {

        // Handles socket

        console.log("Joined");

    }

}

module.exports = Server;