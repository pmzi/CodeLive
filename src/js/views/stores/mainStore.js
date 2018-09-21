import { createStore, combineReducers } from 'redux';
const joinedUsersReducers = require('../reducers/joinedUsersReducer');
const connectionStateReducer = require('../reducers/connectionStateReducer');

const mainStore = createStore(combineReducers({
    joinedUsers: joinedUsersReducers,
    connectionState: connectionStateReducer
}));

module.exports = mainStore;