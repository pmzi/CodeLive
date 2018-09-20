const React = require('react');

const LanguageSelect = require('./LanguageSelect');
const ClientActions = require('./ClientActions');
const ConnectionState = require('./ConnectionState');

class Footer extends React.Component{
    
    render(){
        return (
            <footer className="footer">

                <LanguageSelect />

                <ClientActions />

                <ConnectionState />

            </footer>
        );
    }

}

module.exports = Footer;