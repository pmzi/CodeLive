const {
    exec
} = require('child_process');


class CppCompiler {

    static compile(fileAddress) {

        let directory = fileAddress.split('\\');
        directory.pop();
        directory = directory.join('\\');
        
        exec(`cd ${directory} & g++ ${fileAddress}`,()=>{
            fileAddress = fileAddress.split('.');
            fileAddress.pop();
            fileAddress = fileAddress.join('.')
            exec(`start cmd.exe /K ${fileAddress}.exe`)
        });
        

    }
    
    static compileMac(){
        
    }
    
    static compileLinux(){
        
    }

}

module.exports = CppCompiler;
