const fs = require('fs');
const path = require('path');

class Runner{

    static saveHTML(HTML){

        let time = Date.now();

        let HTMLPath = path.join(__dirname, '../../../codes',`${time}.html`);

        fs.writeFileSync(HTMLPath, HTML, 'utf8');

        return HTMLPath;

    }

}

module.exports = Runner;