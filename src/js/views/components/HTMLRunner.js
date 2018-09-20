const React = require('react');

const Icon = require('./Icon');

const Runner = require('../controllers/Runner');

class HTMLRunner extends React.Component{

    render (){
        return (
            <div className="HTMLRunner">
                <iframe className="HTMLRunner__iframe" src="" frameBorder="0">

                </iframe>

                <div className="HTMLRunner__toolbox">
                    <div className="HTMLRunner__tool">
                        <Icon onClick={this.close} icon='close' clickable={true} color='red' />
                    </div>
                    <div className="HTMLRunner__tool">
                        <Icon onClick={this.refresh} icon='refresh' clickable={true} color='blue' />
                    </div>
                    <div className="HTMLRunner__tool">
                        <Icon onClick={this.code.bind(this)} icon='code' clickable={true} color='green' />
                    </div>
                </div>

                <div ref='console' className="HTMLRunner__console">
                    
                </div>

            </div>
        );
    }

    close(){
        server.emit({}, "hideHTML");

        Runner.hideHTML();
    }

    refresh(){
        server.emit({}, "reloadHTML");
        Runner.reloadHTML()
    }

    code(){
        if(!this.refs.console.classList.contains('HTMLRunner__console--show')){
            this.refs.console.classList.add('HTMLRunner__console--show');
        }else{
            this.refs.console.classList.remove('HTMLRunner__console--show');
        }
    }

}

module.exports = HTMLRunner;