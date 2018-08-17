let io = require('socket.io');

const socket = require('socket.io-client');

const server = require('http');

const Runner = require("./Runner");

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

                this.handleClientSocket(connectedSocket)

                resolve();

            })

            socketInterval = setInterval(() => {
                reject();
            }, 5000)

        })

    }

    handleClientSocket(socket) {

        socket.on("data", (data) => {

            // console.log(data)

            mainEditor.editor.setValue(data)

        });

        socket.on("contentChange", (data) => {
            
            for(let change of data.changes){
                mainEditor.editor.executeEdits("", [{
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

            for(let selection of data.selections){
                selections.push(new monaco.Selection(
                    selection.startLineNumber,
                    selection.startColumn,
                    selection.endLineNumber,
                    selection.endColumn                    
                ));
            }

            mainEditor.editor.setSelections(selections);

        });

        socket.on("scrollChange", (data) => {

            // console.log(data)

            mainEditor.editor.setScrollTop(data.scrollTop);

            mainEditor.editor.setScrollLeft(data.scrollLeft);

        });

        socket.on("runHTML", ()=>{
            Runner.runHTML(mainEditor.editor.getValue())
        })

        socket.on("hideHTML", ()=>{
            Runner.hideHTML()
        })

        socket.on("reloadHTML", ()=>{
            Runner.reloadHTML()
        })
        

    }

    handleServerSocket(socket) {

        // Handles socket

        console.log("Joined");

        // Let's send them current data

        socket.emit("data",mainEditor.editor.getValue());

        socket.emit("cursorChange",{
            selections: mainEditor.editor.getSelections()
        });

        socket.emit("scrollChange",{
            scrollLeft: mainEditor.editor.getScrollLeft(),
            scrollTop: mainEditor.editor.getScrollTop()
        });

    }

    disconnect() {

        if (this.isServer) {
            // It is a server

            this.server.close();

            // server is down!

        } else {

            this.socket.destroy();

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