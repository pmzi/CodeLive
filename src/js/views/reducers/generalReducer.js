module.exports = (state = {
    isServer: false,
    port: '2020',
    showLogin: true
}, action) => {

    switch (action.type) {
        case 'IS_SERVER':
            return Object.assign({}, state, {
                isServer: true
            })
            break;
        case 'IS_CLIENT':
            return Object.assign({}, state, {
                isServer: false
            })
            break;
        case 'PORT_CHANGED':
            return Object.assign({}, state, {
                port: action.port
            })
            break;
        case 'SHOW_LOGIN':
            return Object.assign({}, state, {showLogin: true})
        break;
        case 'HIDE_LOGIN':
            return Object.assign({}, state, {showLogin: false})
        break;
        default:
            return state;
        break;
    }

}