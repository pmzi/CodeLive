const {
    exec
} = require('child_process');


class JSCompiler {

    static compileWin(fileAddress) {

        exec(`start cmd.exe /K node ${fileAddress}`);

    }
    
    static compileMac(){
        
    }
    
    static compileLinux(){
        
    }

}

module.exports = JSCompiler;
