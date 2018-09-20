const React = require('react');

const languageSelect = require('./LanguageSelect');
const ClientActions = require('./ClientActions');
const ConnectionState = require('./ConnectionState');

class Footer extends React.Component{

    render(){
        return (
            <footer className="footer">

                <languageSelect />

                <ClientActions />

                <ConnectionState />

            </footer>
        );
    }

}

module.exports = Footer;