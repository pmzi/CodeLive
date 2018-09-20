const React = require('react');

const Header = require('./Header');
const EditorWrapper = require('./EditorWrapper');
const SideBar = require('./SideBar');
const Footer = require('./Footer');

const ChoosingPage = require('./ChoosingPage');
const HTMLRunner = require('./HTMLRunner');

class MainPage extends React.Component{

    render(){
        return (
            <React.Fragment>
                <div id='wrapper'>
                    <Header />
                    <EditorWrapper />
                    <SideBar />
                    <Footer />
                </div>  
                <ChoosingPage />
                <HTMLRunner />
            </React.Fragment>
        );
    }

}

module.exports = MainPage;