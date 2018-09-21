const React = require('react');

import { connect } from 'react-redux';

const fs = require('fs');
const Dialog = require('../../helpers/Dialog');

const Icon = require('./Icon');

class ClientActions extends React.Component{

    render(){
        return (
            <div className="clientActions">
                <div onClick={this.downloadSource.bind(this)} className="clientActions__action">
                    <Icon icon='cloud_download' clickable={true} />
                </div>
            </div>
        );
    }

    downloadSource(){
        let path = Dialog.chooseDirectory();
        if(path){
            fs.writeFileSync(`${path}/${Date.now()}.${this.props.selectedLanguage.extention}`,window.mainEditor.getValue());
        }
    }

}

module.exports = connect((state)=>{
    return {
        selectedLanguage: state.selectedLanguage
    };
})(ClientActions);