const React = require('react');

const Input = require('./Input');
const Spinner = require('./Spinner');

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
            addressInputHasError: false
        };

    }

    componentDidMount(){

        this.refs.create.onclick = async ()=>{

            this.setState({
                createSelected: true,
                selected: true,
                loadingShow: true
            })

            // Let's create

            socketHandler.createServer().then(() => {

                setTimeout(() => {
                    
                    this.setState({
                        loadingShow: false,
                        choosingPageFadeOut: true
                    })

                    setTimeout(() => {
                        this.setState({
                            choosingPageNone: true
                        })
                    }, 500)

                }, 500)

            })

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

                        let ipAddress = ipAddressInput.value;

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

    }

    render (){
        return (
            <div className={`choosingPage ${this.state.choosingPageFadeOut ? 'choosingPage--fadeOut' : ''} ${this.state.choosingPageNone ? 'none' : ''}`}>

                <div className={`choosingPage__item choice
                 ${this.state.createSelected ? 'choosingPage__item--selected' : ''}
                 ${this.state.selected && this.state.joinSelected ? 'choosingPage__item--not-selected' : ''}`}>

                    <img src="../images/networking.png" alt="" />

                    <span>
                        Create a Group
                    </span>

                </div>

                <div className={`choosingPage__item choice
                 ${this.state.joinSelected ? 'choosingPage__item--selected' : ''}
                 ${this.state.selected && this.state.createSelected ? 'choosingPage__item--not-selected' : ''}`}>

                    <img src="../images/networking.png" alt="" />

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

            </div>
        );
    }

}

module.exports = ChoosingPage;