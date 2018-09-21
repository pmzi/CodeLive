import { createStore, combineReducers } from 'redux';
const joinedUsersReducers = require('../reducers/joinedUsersReducer');
const connectionStateReducer = require('../reducers/connectionStateReducer');
const selectedLanguageReducer = require('../reducers/selectedLanguageReducer');

const mainStore = createStore(combineReducers({
    joinedUsers: joinedUsersReducers,
    connectionState: connectionStateReducer,
    selectedLanguage: selectedLanguageReducer
}));

module.exports = mainStore;