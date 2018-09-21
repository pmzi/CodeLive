module.exports = (state = [], action)=>{

    switch (action.type){
        case 'JOIN':
            return state.concat({socket:action.socket,userName:action.userName});
        break;
        case 'USER_DISCONNECT':
            return state.filter((item)=>{if(item.socket.id != action.socket.id){return item;}});
        break;
        default:
            return state;
        break;
    }

    return state;
}