const React = require('react');

const Link = require('./Link');

class CopyRight extends React.Component{
    
    render(){
        return (
            <div className='copyRight'>
                Developed By <Link href='https://github.com/pmzi/CodeShare'>Pouya MozaffarMagham</Link>
            </div>
        );
    }

}

module.exports = CopyRight;