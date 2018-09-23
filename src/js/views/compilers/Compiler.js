const config = require('../../../config/config');

const fs = require('fs');
const path = require('path');

const JSCompiler = require('./JSCompiler');
const CppCompiler = require('./CppCompiler');
const HTMLCompiler = require('./HTMLCompiler');
class Compiler{

    static compile(languageName, code){

        let platform = this.__getPlatformName();
        
        let fileAddress;

        switch(languageName.toLowerCase()){
            case 'html':
                fileAddress = this.__saveCodes(code, 'html');
                HTMLCompiler[`compile${platform}`](fileAddress)
            break;
            case 'javascript':
                fileAddress = this.__saveCodes(code, 'js');
                JSCompiler[`compile${platform}`](fileAddress);
                break;
            case 'cpp':
                fileAddress = this.__saveCodes(code, 'cpp');
                CppCompiler[`compile${platform}`](fileAddress);
            break;

        }

    }

    static __getPlatformName(){
        switch(process.platform){
            case 'darwin':
                return 'Mac';
            break;
            case 'win32':
                return 'Win';
            break;
            case 'linux':
                return 'linux';
            break;
        }
    }

    static __saveCodes(code, ext){

        let time = Date.now();

        if(!fs.existsSync(config.codesDirectory)){
            fs.mkdirSync(config.codesDirectory)
        }

        let pathToFile = path.join(config.codesDirectory, `${time}.${ext}`);

        fs.writeFileSync(pathToFile, code);

        return pathToFile;

    }

}

module.exports = Compiler;