const {
    dialog
} = require('electron').remote

class Dialog {

    static chooseDirectory(){
        return dialog.showOpenDialog({properties: ['openDirectory']});
    }

}

module.exports = Dialog;