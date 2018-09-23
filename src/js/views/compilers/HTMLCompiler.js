const {
    exec
} = require('child_process');


class HTMLCompiler {

    static compileWin(fileAddress) {
        
        exec(`${fileAddress}`);

    }

    static compileMac(){

    }

    static compileLinux(){
        
    }

}

module.exports = HTMLCompiler;