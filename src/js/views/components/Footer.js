const React = require('react');

const LanguageSelect = require('./LanguageSelect');
const ClientActions = require('./ClientActions');
const ConnectionState = require('./ConnectionState');
const CopyRight = require('./CopyRight');

class Footer extends React.Component{
    
    render(){
        return (
            <footer className="footer">

                <LanguageSelect />

                <ClientActions />

                <CopyRight />

                <ConnectionState />

            </footer>
        );
    }

}

module.exports = Footer;