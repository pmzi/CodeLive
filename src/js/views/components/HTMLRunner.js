const React = require('react');

const Icon = require('./Icon');

class HTMLRunner extends React.Component{

    render (){
        return (
            <div className="HTMLRunner">
                <iframe className="HTMLRunner__iframe" src="" frameborder="0">

                </iframe>

                <div className="HTMLRunner__toolbox">
                    <div className="HTMLRunner__tool">
                        <Icon icon='close' clickable={true} color='red' />
                    </div>
                    <div className="HTMLRunner__tool">
                        <Icon icon='refresh' clickable={true} color='blue' />
                    </div>
                    <div className="HTMLRunner__tool">
                        <Icon icon='code' clickable={true} color='green' />
                    </div>
                </div>

                <div className="HTMLRunner__console">
                    
                </div>

            </div>
        );
    }

}

module.exports = HTMLRunner;