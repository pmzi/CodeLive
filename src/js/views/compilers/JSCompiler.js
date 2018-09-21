const {
    exec
} = require('child_process');


class JSCompiler {

    static compile(fileAddress) {

        exec(`start cmd.exe /K node ${fileAddress}`);

    }

}

module.exports = JSCompiler;