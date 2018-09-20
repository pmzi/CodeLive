const React = require('react');

const fs = require('fs');
const Dialog = require('../../helpers/Dialog');

const Icon = require('./Icon');

class ClientActions extends React.Component{

    render(){
        return (
            <div className="clientActions">
                <div className="clientActions__action">
                    <Icon onClick={this.downloadSource} icon='cloud_download' clickable={true} />
                </div>
            </div>
        );
    }

    downloadSource(){
        let path = Dialog.chooseDirectory();
            if(path){
                fs.writeFileSync(`${path}/${Date.now()}.html`,window.mainEditor.getValue());
            }
    }

}

module.exports = ClientActions;