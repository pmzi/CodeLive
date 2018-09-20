const fs = require('fs');
const path = require('path');

class Runner {

    static saveHTML(HTML) {

        let time = Date.now();

        let HTMLPath = path.join(__dirname, '../../../codes', `${time}.html`);
        
        fs.writeFileSync(HTMLPath, HTML, 'utf8');

        return HTMLPath;

    }

    static runHTML(HTML) {
        let address = this.saveHTML(HTML);

        $('.HTMLRunner').classList.add('HTMLRunner--show');

        $('.HTMLRunner__iframe').src = address;

    }
    static hideHTML() {
        
        $('.HTMLRunner').classList.remove('HTMLRunner--show');
    }

    static reloadHTML() {
        $('.HTMLRunner__iframe').src = $('.HTMLRunner__iframe').src;
        setTimeout(()=>{
            this.initConsoleEvents();
        },5)
    }

    static initConsoleEvents() {
        let iframe = $('.HTMLRunner__iframe');
            iframe.contentWindow.console.log = (val) => {
                $('.HTMLRunner__console').append(`<div class="HTMLRunner__console-log">
                        ${val}
                    </div>`);
            }
        
    }

}

module.exports = Runner;