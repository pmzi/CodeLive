const React = require('react');

const Link = require('./Link');

class CopyRight extends React.Component{
    
    render(){
        return (
            <div className='copyRight'>
                Fork Me On <Link href='https://github.com/pmzi/CodeShare'>GitHub</Link>
            </div>
        );
    }

}

module.exports = CopyRight;