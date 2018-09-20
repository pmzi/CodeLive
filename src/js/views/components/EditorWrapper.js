const React = require('react');

const MonacoEditor = require('./MonacoEditor');

class EditorWrapper extends React.Component{

    render(){
        return (
            <div className="editorWrapper">
                <MonacoEditor />
            </div>
        );
    }

}

module.exports = EditorWrapper;