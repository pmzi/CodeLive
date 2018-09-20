const React = require('react');

const JoinedUsers = require('./JoinedUsers');

class SideBar extends React.Component{

    render(){
        return (
            <aside className='aside'>
                <JoinedUsers />
            </aside>
        );
    }

}

module.exports = SideBar;