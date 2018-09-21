const config = require('../../../config/config');

const fs = require('fs');
const path = require('path');

const JSCompiler = require('./JSCompiler');
const CppCompiler = require('./CppCompiler');
const HTMLCompiler = require('./HTMLCompiler');
class Compiler{

    static compile(languageName, code){
        
        let fileAddress;

        switch(languageName.toLowerCase()){
            case 'html':
                fileAddress = this.__saveCodes(code, 'html');
                HTMLCompiler.compile(fileAddress)
            break;
            case 'javascript':
                fileAddress = this.__saveCodes(code, 'js');
                JSCompiler.compile(fileAddress);
                break;
            case 'cpp':
                fileAddress = this.__saveCodes(code, 'cpp');
                CppCompiler.compile(fileAddress);
            break;

        }

    }

    static __saveCodes(code, ext){

        let time = Date.now();

        let pathToFile = path.join(config.codesDirectory, `${time}.${ext}`);

        fs.writeFileSync(pathToFile, code);

        return pathToFile;

    }

}

module.exports = Compiler;