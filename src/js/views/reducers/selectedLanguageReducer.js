module.exports = (state = {name:'HTML',image:'html.png',latinName:'html', extention: 'html'},action)=>{
    switch(action.type){
        case 'SELECTED_LANGUAGE_CHANGED':
            return {
                name: action.name,
                image: action.image,
                latinName: action.latinName,
                extention: action.extention
            };
        break;
        default:
            return state;
        break;
    }
}