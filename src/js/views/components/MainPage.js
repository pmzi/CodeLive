const React = require('react');

import { connect } from 'react-redux';

const Header = require('./Header');
const EditorWrapper = require('./EditorWrapper');
const SideBar = require('./SideBar');
const Footer = require('./Footer');

const ChoosingPage = require('./ChoosingPage');

class MainPage extends React.Component{

    render(){
        return (
            <React.Fragment>
                <div id='wrapper' className={this.props.general.isServer ? 'server' : 'client'}>
                    <Header />
                    <EditorWrapper />
                    <SideBar />
                    <Footer />
                </div>  
                <ChoosingPage />
            </React.Fragment>
        );
    }

}

module.exports = connect((state)=>{
    return {
        general: state.general
    };
})(MainPage);