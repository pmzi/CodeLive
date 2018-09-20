const React = require('react');

const Input = require('./Input');
const Spinner = require('./Spinner');

class ChoosingPage extends React.Component{

    componentDidMount(){

        let choicesOfChoosingPage = $$('.choosingPage .choice');

        for (let choice of choicesOfChoosingPage) {
            choice.onclick = async function () {

                await this.classList.add('choosingPage__item--selected');

                $('.choosingPage .choice:not(.choosingPage__item--selected)').classList.add('choosingPage__item--not-selected');


                let action = this.getAttribute('data-action');

                if (action == 'create') {

                    $('.choosingPage__loading').classList.add('choosingPage__loading--show');

                    // Let's create

                    window.server.create().then(() => {

                        setTimeout(() => {
                            $('.choosingPage__loading').classList.remove('choosingPage__loading--show');

                            $('.choosingPage').classList.add('choosingPage--fadeOut');

                            setTimeout(() => {
                                $('.choosingPage').classList.add('none');
                            }, 500)

                        }, 500)

                    })

                } else {

                    // Let's join
                    
                    setTimeout(() => {

                        $('.choosingPage__address-wrapper').classList.add('choosingPage__address-wrapper--show');

                        setTimeout(()=>{
                            $('.choosingPage__address-wrapper input').focus();
                        },200)
                        
                        $('.choosingPage__address-wrapper input').onkeydown = function (e) {

                            if (e.key.toLowerCase() == 'enter') {

                                let ipAddress = this.value;

                                $('.choosingPage__loading').classList.add('choosingPage__loading--show');

                                window.server.join(ipAddress).then(() => {

                                    setTimeout(() => {

                                        $('.choosingPage__loading').classList.remove('choosingPage__loading--show');

                                        $('.choosingPage').classList.add('choosingPage--fadeOut');

                                        setTimeout(() => {

                                            $('.choosingPage').classList.add('none');

                                        }, 500)

                                    }, 500)

                                }).catch(() => {

                                    $('.choosingPage__loading').classList.remove('choosingPage__loading--show');

                                    this.classList.add('input--error');

                                });
                            }

                        };

                    }, 500)

                }

            };
        }
    }

    render (){
        return (
            <div className="choosingPage">

                <div data-action="create" className="choosingPage__item choice">

                    <img src="../images/networking.png" alt="" />

                    <span>
                        Create a Group
                    </span>

                </div>

                <div data-action="join" className="choosingPage__item choice">

                    <img src="../images/networking.png" alt="" />

                    <span>
                        Join a Group
                    </span>

                </div>

                <div className="choosingPage__loading">

                    <Spinner />

                </div>

                <div className="choosingPage__address-wrapper">

                    <Input center={true} placeholder='IP Address' />

                </div>

            </div>
        );
    }

}

module.exports = ChoosingPage;