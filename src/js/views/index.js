const React = require('react');
const ReactDOM = require('react-dom');

import { Provider } from 'react-redux'; 
const mainStore = require('./stores/mainStore');

const MainPage = require('./components/MainPage');

const SocketHandler = require('./controllers/SocketHandler');

window.socketHandler = new SocketHandler(mainStore);

const jsx = (
    <Provider store={mainStore}>
        <MainPage />
    </Provider>
);

ReactDOM.render(jsx, document.querySelector('#app'));