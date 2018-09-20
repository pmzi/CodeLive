const React = require('react');

const LanguageItem = require('./subComponents/LanguageItem');

class LanguageSelect extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            image:'',
            name:''
        }
    }

    get languages(){
        return;
    }

    render(){
        return (
            <div className="languageSelect">
                <div className="languageSelect__selected-text">
                    <img src={`../images/${this.state.image}`} alt={this.state.name} /> {this.state.name}
                </div>
                <div className="languageSelect__items-wrapper">
                    {this.languages}                    
                </div>
            </div>
        );
    }

}

module.exports = LanguageSelect;