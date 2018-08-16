class MonacoEditor {

    constructor(containerID) {

        

        // Save Monaco's amd require and restore Node's require
        var amdRequire = global.require;
        global.require = nodeRequire;

        // require node modules before loader.js comes in
        var path = require('path');

        function uriFromPath(_path) {
            var pathName = path.resolve(_path).replace(/\\/g, '/');
            if (pathName.length > 0 && pathName.charAt(0) !== '/') {
                pathName = '/' + pathName;
            }
            return encodeURI('file://' + pathName);
        }
        amdRequire.config({
            baseUrl: uriFromPath(path.join(__dirname, '../../node_modules/monaco-editor/min'))
        });
        // workaround monaco-css not understanding the environment
        self.module = undefined;
        // workaround monaco-typescript not understanding the environment
        self.process.browser = true;
        amdRequire(['vs/editor/editor.main'],  ()=>{
            window.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
                value: `<html>

<head>
    <title>
        Title of the page
    </title>
</head>
<body>
                
    <p>
        Hello World
    </p>
                
</body>

</html>`,
                language: 'html',
                theme:'vs-dark'
            });

            // Let's init socket events

            this.initSocketEvents(window.editor);

            window.onresize = ()=>{
                editor.layout();
            }
        });

    }

    initSocketEvents(editor){

        console.log(editor)

        editor.cursor.onDidChange(function(a,b,c){
            console.log(a,b,c)
        })

    }

}

window.onload = ()=>{
    new MonacoEditor("monaco-editor");
}