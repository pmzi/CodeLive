const React = require('react');

class ConnectionState extends React.Component{

    render(){
        return (
            <div className="connectionState">
                <i className="connectionState__state connectionState__state--connected"></i>
            </div>
        );
    }

}

module.exports = ConnectionState;