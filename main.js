// main.js
/**
 * entry point for electron js app
 * */

import { app, BrowserWindow, ipcMain } from 'electron';
import { exec } from 'child_process';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Set to true for security
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createWindow();

    exec('node index.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running index.js: ${error.message}`);
            mainWindow.webContents.send('log', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            mainWindow.webContents.send('log', `Stderr: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);
        mainWindow.webContents.send('log', `Output: ${stdout}`);
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// Listen for log messages from the renderer process (optional)
ipcMain.on('log', (event, message) => {
    console.log(message);
});
