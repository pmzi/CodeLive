module.exports = (state = {status: false}, action)=>{
    switch(action.type){
        case 'CONNECTION_RESOLVED':
            return {status: true};
        break;
        case 'CONNECTION_LOST':
            return {status: false};
        break;
        default:
            return state;
        break;
    }
};