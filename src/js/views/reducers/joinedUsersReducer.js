module.exports = (state = [], action)=>{

    switch (action.type){
        case 'JOIN':
            return state.concat({socket:action.socket,userName:action.userName});
        break;
        case 'DISCONNECT':
            return state.filter((item)=>{if(item != action.userName){return item;}});
        break;
        default:
            return state;
        break;
    }

    return state;
}