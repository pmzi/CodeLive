const socket = require('socket.io-client');

const OS = require('os');

const Compiler = require('../compilers/Compiler');

class Client{

    constructor(store){

        this.store = store;

        this.socket;

        this.isConnected = false;

    }

    connect(ipAddress){

        return new Promise((resolve, reject) => {

            this.socket = socket(`http://${ipAddress}`);

            let socketInterval;

            this.socket.on('connect', () => {

                // Make the connection state connected
                this.store.dispatch({type:'CONNECTION_RESOLVED'});

                clearInterval(socketInterval)

                console.log("connected to server")

                this.listen()

                // Let's set the client class

                $('#wrapper').classList = 'client';
                window.mainEditor.layout();

                this.isConnected = true;

                resolve();

            })

            socketInterval = setInterval(() => {

                this.isConnected = false;

                reject();
            }, 5000)

        })

    }

    disConnect(){

        if(this.isConnected){

            this.socket.disconnect();

            this.isConnected = false;
        }   

    }

    emit(event, data){

        if(this.isConnected){
            this.socket.emit(event, data);
        }

    }

    listen(){

        this.socket.emit('join', OS.hostname());

        this.socket.on("data", (data) => {

            // console.log(data)

            window.mainEditor.setValue(data)

        });

        this.socket.on("contentChange", (data) => {

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

        this.socket.on("cursorChange", (data) => {

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

        this.socket.on("scrollChange", (data) => {

            // console.log(data)

            window.mainEditor.setScrollTop(data.scrollTop);

            window.mainEditor.setScrollLeft(data.scrollLeft);

        });

        this.socket.on("run",()=>{
            Compiler.compile(this.store.getState().selectedLanguage.latinName, mainEditor.getValue());
        })

        this.socket.on("languageChanged",(newLanguage)=>{
            this.store.dispatch({
                type: 'SELECTED_LANGUAGE_CHANGED',
                name: newLanguage.name,
                latinName: newLanguage.latinName,
                image: newLanguage.image,
                extention: newLanguage.extention
            })
        })

        this.socket.on("disconnect", () => {
            this.store.dispatch({type:'CONNECTION_LOST'});
        })
    }

}

module.exports = Client;