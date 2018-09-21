const React = require('react');

const Icon = require('./Icon');

import { connect } from 'react-redux';

const Compiler = require('../compilers/Compiler');

class Header extends React.Component{

    render(){
        return (
            <header className="header">
                <div className="header__left-side">
                    <div className="header__side-icon">
                        <Icon onClick={this.disconnect} ref='disconnect' clickable={true} color='red' icon='power_settings_new' />
                    </div>
                </div>
                <div className="header__ip-address">
                    127.0.0.1:2020
                </div>
                <div className="header__right-side">
                    <div className="header__side-icon">
                        <Icon onClick={this.run.bind(this)} ref='run' clickable={true} color='green' icon='play_arrow' />
                    </div>
                </div>
            </header>
        );
    }

    run(){

        server.emit({},'run');

        Compiler.compile(this.props.selectedLanguage.latinName, mainEditor.getValue());

    }

    disconnect(){
        server.disconnect();

            // Let's show the choosingPage

            $('.choosingPage').classList.remove('none');
            setTimeout(() => {

                $('.choosingPage').classList.remove('choosingPage--fadeOut');
                $('.choosingPage__address-wrapper').classList.remove('choosingPage__address-wrapper--show');
                $('.choosingPage__loading').classList.remove('choosingPage__loading--show');
                $('.choosingPage .choosingPage__item--selected').classList.remove('choosingPage__item--selected');
                $('.choosingPage .choosingPage__item--not-selected').classList.remove('choosingPage__item--not-selected');

            }, 100)
    }

}

module.exports = connect((state)=>{
    return {
        selectedLanguage: state.selectedLanguage
    };
})(Header);