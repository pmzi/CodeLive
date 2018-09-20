const React = require('react');

class LanguageItem extends React.Component{
    render(){
        return (
            <div data-name={this.props.symbolName} className="languageSelect__item">
                <img src={`../images/${this.props.image}`} alt="" /> {this.props.text}
            </div>
        );
    }
}

module.exports = LanguageItem;