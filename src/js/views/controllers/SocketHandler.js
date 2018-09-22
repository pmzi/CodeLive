const Server = require('./Server');

const Client = require('./Client');

class SocketHandler{

    constructor(store){

        this.isServer = false;

        this.store = store;

        this.client;

        this.server;

    }

    createServer(){

        this.isServer = true;

        this.server = new Server(this.store);

        return this.server.create();

    }

    createClient(ipAddress){

        this.isServer = false;

        this.client = new Client(this.store);

        return this.client.connect(ipAddress);
        
    }

    emit(event, data){
        if(this.isServer){
            this.server.emit(event, data);
        }
    }

    clientEmit(event, data){
        if(!this.isServer){
            this.client.emit(event, data);            
        }
    }

    disConnect(){
        if(this.isServer){
            this.server.disConnect();
        }else{
            this.client.disConnect();
        }
    }

}

module.exports = SocketHandler;