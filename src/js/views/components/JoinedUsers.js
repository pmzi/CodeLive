const React = require('react');

const SingleJoinedUser = require('./subComponents/SingleJoinedUser');

class JoinedUsers extends React.Component{

    get joinedUsers(){
        
    }

    render(){
        return (
            <div className='users'>
                {this.joinedUsers}
            </div>
        );
    }

}

module.exports = JoinedUsers;