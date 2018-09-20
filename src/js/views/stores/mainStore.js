import { createStore, combineReducers } from 'redux';
const joinedUsersReducers = require('../reducers/joinedUsersReducer');

const mainStore = createStore(combineReducers({
    joinedUsers: joinedUsersReducers
}));

module.exports = mainStore;