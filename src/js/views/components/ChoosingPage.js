const React = require('react');

const Input = require('./Input');
const Spinner = require('./Spinner');

const {connect} = require('react-redux');

class ChoosingPage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loadingShow: false,
            addressWrapperShow: false,
            selected: false,
            createSelected: false,
            joinSelected: false,
            choosingPageFadeOut: false,
            choosingPageNone: false,
            addressInputHasError: false,
            portHasError: false,
            portShow: false
        };

    }

    componentDidMount(){

        this.refs.create.onclick = async ()=>{

            this.setState({
                createSelected: true,
                selected: true,
                portShow: true
            })

            let portInput = this.refs.portWrapper.children[0];

            setTimeout(()=>{
                portInput.focus();
            },200)

            portInput.onkeydown = (e)=>{
                if(e.key.toLowerCase() == 'enter'){

                    let port = portInput.value.trim()

                    if(!this.validatePort(port)){
                        this.setState({
                            portHasError: true
                        })
                    }

                    if(this.state.loadingShow){
                        // Being created
                        return;
                    }

                    this.setState({
                        loadingShow: true
                    })

                    // Let's create

                    socketHandler.createServer(port).then(() => {

                        setTimeout(() => {
                            
                            this.setState({
                                loadingShow: false,
                                choosingPageFadeOut: true
                            })

                            setTimeout(() => {
                                this.setState({
                                    choosingPageNone: true
                                })
                                this.props.dispatch({
                                    type: 'HIDE_LOGIN'
                                })
                            }, 500)

                        }, 500)

                    })
                }
            }

        }

        this.refs.join.onclick = async()=>{
            
            this.setState({
                joinSelected: true,
                selected: true
            })

            // Let's join
                    
            setTimeout(() => {

                this.setState({
                    addressWrapperShow: true
                })

                let ipAddressInput = this.refs.addressWrapper.children[0];

                setTimeout(()=>{
                    ipAddressInput.focus();
                },200)
                
                ipAddressInput.onkeydown = (e)=>{

                    if (e.key.toLowerCase() == 'enter') {

                        let ipAddress = ipAddressInput.value.trim();

                        if(!this.validateIP(ipAddress)){
                            this.setState({
                                addressInputHasError: true
                            })
                            return;
                        }

                        if(this.state.loadingShow){
                            // Being connected
                            return;
                        }

                        this.setState({
                            loadingShow: true
                        })

                        socketHandler.createClient(ipAddress).then(() => {

                            this.setState({
                                addressInputHasError: false
                            })

                            setTimeout(() => {

                                this.setState({
                                    loadingShow: false,
                                    choosingPageFadeOut: true
                                })

                                setTimeout(() => {

                                    this.setState({
                                        choosingPageNone: true
                                    })

                                    this.props.dispatch({
                                        type: 'HIDE_LOGIN'
                                    })

                                }, 500)

                            }, 500)

                        }).catch(() => {

                            this.setState({
                                loadingShow: false,
                                addressInputHasError: true
                            })

                        });
                    }

                };

            }, 500)

        }

        this.refs.choosingPage.onkeydown = (e)=>{
            if(e.key.toLowerCase() == 'escape'){
                this.resetState();
            }
        }

    }

    componentDidUpdate(prevProps){
        if(prevProps.showLogin != this.props.showLogin){
            if(this.props.showLogin){
                this.setState({
                    choosingPageNone: false
                })
                setTimeout(this.resetState.bind(this),100)
            }
        }
    }

    resetState(){
        this.setState({
            loadingShow: false,
            addressWrapperShow: false,
            selected: false,
            createSelected: false,
            joinSelected: false,
            choosingPageFadeOut: false,
            choosingPageNone: false,
            addressInputHasError: false,
            portHasError: false,
            portShow: false
        })
    }

    validateIP(ipAddress){

        let ipAddressRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,}$/;

        if(ipAddressRegex.test(ipAddress)){
            return true;
        }
        return false;

    }

    validatePort(port){
        let portRegex = /^\d{1,}$/;

        if(portRegex.test(port)){
            return true;
        }
        return false;
    }

    render (){
        return (
            <div ref='choosingPage' className={`choosingPage ${this.state.choosingPageFadeOut ? 'choosingPage--fadeOut' : ''} ${this.state.choosingPageNone ? 'none' : ''}`}>

                <div ref='create' className={`choosingPage__item choice
                 ${this.state.createSelected ? 'choosingPage__item--selected' : ''}
                 ${this.state.selected && this.state.joinSelected ? 'choosingPage__item--not-selected' : ''}`}>

                    <img src="../images/create-room.png" alt="" />

                    <span>
                        Create a Group
                    </span>

                </div>

                <div ref='join' className={`choosingPage__item choice
                 ${this.state.joinSelected ? 'choosingPage__item--selected' : ''}
                 ${this.state.selected && this.state.createSelected ? 'choosingPage__item--not-selected' : ''}`}>

                    <img src="../images/enter-room.png" alt="" />

                    <span>
                        Join a Group
                    </span>

                </div>

                <div className={`choosingPage__loading ${this.state.loadingShow ? 'choosingPage__loading--show' : ''}`}>

                    <Spinner />

                </div>

                <div ref='addressWrapper' className={`choosingPage__address-wrapper ${this.state.addressWrapperShow ? 'choosingPage__address-wrapper--show': ''}`}>

                    <Input className={this.state.addressInputHasError ? 'input--error':''} center={true} placeholder='IP Address' />

                </div>

                <div ref='portWrapper' className={`choosingPage__port-wrapper ${this.state.portShow ? 'choosingPage__port-wrapper--show': ''}`}>

                    <Input className={this.state.portHasError ? 'input--error':''} center={true} placeholder='Port' />

                </div>

            </div>
        );
    }

}

module.exports = connect((state)=>{
    return {showLogin:state.general.showLogin}
})(ChoosingPage);