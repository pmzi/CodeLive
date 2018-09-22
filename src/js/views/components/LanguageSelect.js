const React = require('react');

const LanguageItem = require('./subComponents/LanguageItem');

import { connect } from 'react-redux';

class LanguageSelect extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            languages: [{
                name: 'HTML',
                image:'html.png',
                latinName: 'html',
                extention: 'html'
            },{
                name: 'JavaScript',
                image: 'js.png',
                latinName:'javascript',
                extention: 'js'
            },{
                name:'C/C++',
                image:'cpp.png',
                latinName: 'cpp',
                extention: 'cpp'
            }],
            show: false
        }
    }

    get languages(){
        let languages = [];
        for(let language of this.state.languages){
            languages.push(<div key={language.name} data-extention={language.extention} data-name={language.latinName} className="languageSelect__item">
                <img src={`../images/${language.image}`} alt="" /> <span>{language.name}</span>
            </div>);
        }
        return languages;
    }

    get showClass(){
        return this.state.show ? 'languageSelect__items-wrapper--show' : '';
    }

    componentDidMount(){

        this.refs.selectedLanguage.onclick = ()=>{

            this.setState((prevState)=>{

                return prevState.show ? {show: false} : {show:true};

            })
        }

        let that = this;

        for(let language of this.refs.languageList.children){

            language.onclick = function(){

                let name = this.children[1].textContent;

                let image = this.children[0].src.split('/').pop();

                let latinName = this.getAttribute('data-name');

                let extention = this.getAttribute('data-extention');

                that.props.dispatch({
                    type: 'SELECTED_LANGUAGE_CHANGED',
                    name,
                    image,
                    latinName,
                    extention
                });

                socketHandler.emit('languageChanged',{
                    name,
                    image,
                    latinName,
                    extention
                });

                that.setState({
                    show:false
                })
                
            }
        }
    }

    render(){
        return (
            <div className="languageSelect">
                <div ref='selectedLanguage' className="languageSelect__selected-text">
                    <img src={`../images/${this.props.selected.image}`} alt={this.props.selected.latinName} /> {this.props.selected.name}
                </div>
                <div ref='languageList' className={`languageSelect__items-wrapper ${this.showClass}`}>
                    {this.languages}                    
                </div>
            </div>
        );
    }

}

module.exports = connect((state)=>{
    return {
        selected: state.selectedLanguage
    }
})(LanguageSelect);