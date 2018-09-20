const React = require('react');

const Icon = require('./Icon');

class Header extends React.Component{

    render(){
        return (
            <header className="header">
                <div className="header__left-side">
                    <div className="header__side-icon">
                        <Icon clickable={true} color='red' icon='power_settings_new' />
                    </div>
                </div>
                <div className="header__ip-address">
                    127.0.0.1:2020
                </div>
                <div className="header__right-side">
                    <div className="header__side-icon">
                        <Icon clickable={true} color='green' icon='play_arrow' />
                    </div>
                </div>
            </header>
        );
    }

}

module.exports = Header;