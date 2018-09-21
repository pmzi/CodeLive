const React = require('react');

import { exec } from 'child_process';

class Link extends React.Component{
    
    render(){
        return (
            <a ref='link' href={this.props.href}>
                {this.props.children}
            </a>
        );
    }

    componentDidMount(){
        this.refs.link.onclick = (e)=>{
            e.preventDefault();
            exec(`start ${this.props.href}`)
        }
    }

}

module.exports = Link;