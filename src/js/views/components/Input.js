const React = require('react');

class Input extends React.Component{

    render(){
        return (
            <input 
            type={this.props.type ? this.props.type : 'text'} 
            defaultValue={this.props.value ? this.props.value : ''} 
            placeholder={this.props.placeholder ? this.props.placeholder : ''}
            className={`input${this.props.center ? ' input--center' : ''}`}
             />
        );
    }

}

module.exports = Input;