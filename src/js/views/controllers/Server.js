let io = require('socket.io');

const socket = require('socket.io-client');

const server = require('http');

const Runner = require("./Runner");

const OS = require('os');

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

            // Let's set the admin class

            $('#wrapper').classList = 'server';
            window.mainEditor.layout();

            resolve();

        })

    }

    join(ipAddress) {

        return new Promise((resolve, reject) => {

            const connectedSocket = socket(`http://${ipAddress}`);

            let socketInterval;

            connectedSocket.on('connect', () => {

                // Make the connection state connected
                $('.connectionState__state').classList.remove('connectionState__state--disconnected');
                $('.connectionState__state').classList.add('connectionState__state--connected');

                clearInterval(socketInterval)

                console.log("connected to server")

                this.handleClientSocket(connectedSocket)

                // Let's set the client class

                $('#wrapper').classList = 'client';
                window.mainEditor.layout();

                resolve();

            })

            this.socket = connectedSocket;

            socketInterval = setInterval(() => {
                reject();
            }, 5000)

        })

    }

    handleClientSocket(socket) {

        socket.emit('join', OS.hostname());

        socket.on("data", (data) => {

            // console.log(data)

            window.mainEditor.setValue(data)

        });

        socket.on("contentChange", (data) => {

            for (let change of data.changes) {
                window.mainEditor.executeEdits("", [{
                    range: new monaco.Range(change.range.startLineNumber,
                        change.range.startColumn,
                        change.range.endLineNumber,
                        change.range.endColumn),
                    text: change.text
                }]);
            }

        });

        socket.on("cursorChange", (data) => {

            // console.log(data)

            // console.log(monaco)

            let selections = [];

            for (let selection of data.selections) {
                selections.push(new monaco.Selection(
                    selection.startLineNumber,
                    selection.startColumn,
                    selection.endLineNumber,
                    selection.endColumn
                ));
            }

            window.mainEditor.setSelections(selections);

        });

        socket.on("scrollChange", (data) => {

            // console.log(data)

            window.mainEditor.setScrollTop(data.scrollTop);

            window.mainEditor.setScrollLeft(data.scrollLeft);

        });

        socket.on("runHTML", () => {
            Runner.runHTML(window.mainEditor.getValue())
        })

        socket.on("hideHTML", () => {
            Runner.hideHTML()
        })

        socket.on("reloadHTML", () => {
            Runner.reloadHTML()
        })

        socket.on("disconnect", () => {
            $('.connectionState__state').classList.remove('connectionState__state--connected');
            $('.connectionState__state').classList.add('connectionState__state--disconnected');
        })


    }

    handleServerSocket(socket) {

        // Handles socket

        console.log("Joined");

        socket.on('join', (data) => {
            $('.users').append(`
            <div class="users__user" data-id="${socket.id}">
                <div class="users__username">
                    ${data}
                </div>
                <!-- <div class="users__actions">
                    <!-- <i class="material-icons icon icon--red icon--clickable">
                        close
                    </i> -->
                    <!-- <i class="material-icons icon icon--green icon--clickable">
                        done
                    </i> -->
                </div> -->
        </div>`);
        });

        socket.on('disconnect', () => {
            console.log(socket)
            $(`.users__user[data-id="${socket.id}"]`).remove();
        })

        // Let's send them current data

        socket.emit("data", window.mainEditor.getValue());

        socket.emit("cursorChange", {
            selections: window.mainEditor.getSelections()
        });

        socket.emit("scrollChange", {
            scrollLeft: window.mainEditor.getScrollLeft(),
            scrollTop: window.mainEditor.getScrollTop()
        });

    }

    disconnect() {

        if (this.isServer) {
            // It is a server

            this.server.close();

            // server is down!

        } else {

            this.socket.disconnect();

        }

    }

    emit(data, event) {

        // type 1 is cursor change

        if (this.isServer) {

            this.io.emit(event, data);

        }

    }

}

module.exports = Server;