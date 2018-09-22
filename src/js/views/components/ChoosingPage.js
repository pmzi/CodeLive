const React = require('react');

const Input = require('./Input');
const Spinner = require('./Spinner');

class ChoosingPage extends React.Component{

    componentDidMount(){

        this.refs.create.onclick = async ()=>{

            await this.refs.create.classList.add('choosingPage__item--selected');

            this.refs.join.classList.add('choosingPage__item--not-selected');

            this.refs.loading.classList.add('choosingPage__loading--show');

            // Let's create

            socketHandler.createServer().then(() => {

                setTimeout(() => {
                    this.refs.loading.classList.remove('choosingPage__loading--show');

                    this.refs.choosingPage.classList.add('choosingPage--fadeOut');

                    setTimeout(() => {
                        this.refs.choosingPage.classList.add('none');
                    }, 500)

                }, 500)

            })

        }

        this.refs.join.onclick = async()=>{
            
            await this.refs.join.classList.add('choosingPage__item--selected');

            this.refs.create.classList.add('choosingPage__item--not-selected');

            // Let's join
                    
            setTimeout(() => {

                this.refs.addressWrapper.classList.add('choosingPage__address-wrapper--show');

                let ipAddressInput = this.refs.addressWrapper.children[0];

                setTimeout(()=>{
                    ipAddressInput.focus();
                },200)
                
                ipAddressInput.onkeydown = (e)=>{

                    if (e.key.toLowerCase() == 'enter') {

                        let ipAddress = ipAddressInput.value;

                        this.refs.loading.classList.add('choosingPage__loading--show');

                        socketHandler.createClient(ipAddress).then(() => {

                            ipAddressInput.classList.remove('input--error');

                            setTimeout(() => {

                                this.refs.loading.classList.remove('choosingPage__loading--show');

                                this.refs.choosingPage.classList.add('choosingPage--fadeOut');

                                setTimeout(() => {

                                    this.refs.choosingPage.classList.add('none');

                                }, 500)

                            }, 500)

                        }).catch(() => {

                            this.refs.loading.classList.remove('choosingPage__loading--show');
                            
                            this.refs.addressWrapper.children[0].classList.add('input--error');

                        });
                    }

                };

            }, 500)

        }
    }

    render (){
        return (
            <div ref='choosingPage' className="choosingPage">

                <div ref="create" className="choosingPage__item choice">

                    <img src="../images/networking.png" alt="" />

                    <span>
                        Create a Group
                    </span>

                </div>

                <div ref="join" className="choosingPage__item choice">

                    <img src="../images/networking.png" alt="" />

                    <span>
                        Join a Group
                    </span>

                </div>

                <div ref='loading' className="choosingPage__loading">

                    <Spinner />

                </div>

                <div ref='addressWrapper' className="choosingPage__address-wrapper">

                    <Input center={true} placeholder='IP Address' />

                </div>

            </div>
        );
    }

}

module.exports = ChoosingPage;