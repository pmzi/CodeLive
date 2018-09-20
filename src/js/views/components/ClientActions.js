const React = require('react');

const Icon = require('./Icon');

class ClientActions extends React.Component{

    render(){
        return (
            <div className="clientActions">
                <div className="clientActions__action">
                    <Icon icon='cloud_download' clickable={true} />
                </div>
            </div>
        );
    }

}

module.exports = ClientActions;