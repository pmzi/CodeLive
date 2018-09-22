module.exports = (state = {isServer: false}, action)=>{

    switch(action.type){
        case 'IS_SERVER':
            return {
                isServer: true
            }
        break;
        case 'IS_CLIENT':
            return {
                isServer: false
            }
        break;
        default: 
            return state;
        break;
    }

}