const React = require('react');

import { connect } from 'react-redux';

class ConnectionState extends React.Component{

    constructor(props){
        super(props)
    }

    get stateClass(){
        if(this.props.status){
            return 'connectionState__state--connected';
        }
        return 'connectionState__state--disconnected';
    }

    render(){
        return (
            <div className="connectionState">
                <i className={`connectionState__state ${this.stateClass}`}></i>
            </div>
        );
    }

}

module.exports = connect((state)=>{
    return {
        status: state.connectionState.status
    }
})(ConnectionState);