const {
    ipcMain,
    BrowserWindow
} = require('electron');

class WindowHandler {
    constructor() {

        this._mainWindow = null;

        this._windows = [];

        this.initWindowListeners();

    }

    init() { // creates main window

        this._mainWindow = new BrowserWindow({
            width: 940,
            height: 500,
            show: false,
            icon: `${__dirname}/../images/logo.gif.ico`
        });

        // this._mainWindow.webContents.openDevTools();

        // and load the index.html of the app.
        this._mainWindow.loadURL(`file://${__dirname}/../views/mainPage.html`);

        // Emitted when the window is closed.
        this._mainWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this._mainWindow = null;
        });

        this._mainWindow.once('ready-to-show', () => {
            this._mainWindow.show();
        })

    }

    getMainWindow() {
        return this._mainWindow;
    }

    initWindowListeners() {
        ipcMain.on('newWindow', (event, arg) => {

            // new window

            if (arg.parent == 'main') {
                arg.parent = this._mainWindow;
            }

            this.newWindow(arg.width, arg.height, arg.fullscreen, arg.view, arg.parent, arg.modal, arg.arg);

        });
    }

    newWindow(width, height, fullscreen, view, parent = null, modal = false) {

        this._windows.push(new BrowserWindow({
            width,
            height,
            parent,
            modal,
            show: false,
            icon: `${__dirname}/../images/logo.gif.ico`
        }))

        let currWindow = this._windows[this._windows.length - 1];

        // and load the index.html of the app.
        currWindow.loadURL(`file://${__dirname}/../views/${view}`);

        // Open the DevTools.
        // currWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        currWindow.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            currWindow = null;
        });

        // make it fullscreen

        currWindow.on('ready-to-show', () => {
            if (fullscreen) {
                currWindow.maximize();
            }
            currWindow.show();
        })

    }

}

let windowHandler = new WindowHandler();

module.exports = windowHandler;