const React = require('react');

class SingleJoinedUser extends React.Component{

    render(){
        return (
            <div className='users'>
                {this.joinedUsers}
            </div>
        );
    }

}

module.exports = SingleJoinedUser;