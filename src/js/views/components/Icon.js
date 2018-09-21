const React = require('react');

class Icon extends React.Component{

    get iconColorClass(){
        if(this.props.color){
            return `icon--${this.props.color}`;
        }
        return '';
    }

    render(){
        return (
            <i onClick={this.props.onClick} className={`material-icons icon ${this.props.className ? this.props.className : ''} ${this.iconColorClass} ${this.props.clickable ? 'icon--clickable' : ''}`}>
                {this.props.icon}
            </i>
        );
    }

}

module.exports = Icon;