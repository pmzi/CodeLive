const React = require('react');

const Input = require('./Input');
const Spinner = require('./Spinner');

class ChoosingPage extends React.Component{

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