let io = require('socket.io');

const socket = require('socket.io-client');

const server = require('http');

class Server {

    constructor() {

        this.server = server;

        this.isServer = false;

        this.io;

        this.socket;

    }

    create() {

        return new Promise((resolve, reject) => {

            //create a server object:
            this.server = this.server.createServer();

            this.isServer = true;

            this.io = io(this.server);

            this.io.on('connection', (client) => {

                this.socket = client;

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

    disconnect(){

        if(this.isServer){
            // It is a server

            // this.server.close();

            // server is down!

        }else{
            console.log(this.socket)
            this.socket.destroy();

        }

    }

}

module.exports = Server;