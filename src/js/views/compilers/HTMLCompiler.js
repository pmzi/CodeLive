const {
    exec
} = require('child_process');


class HTMLCompiler {

    static compile(fileAddress) {
        
        exec(`${fileAddress}`);

    }

}

module.exports = HTMLCompiler;