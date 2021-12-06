import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import dgram from "dgram";
import { AddressInfo } from "net";
import { ParserOutput } from "./types";
import * as url from "url";
import Server from "./server";
import Parser from "./parser/Parser";

const server = new Server().getServer();
const parser: Parser = new Parser();
let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // preload: path.join(__dirname, "preload.js"),
    },
    // width: 800,
  });

  // mainWindow.loadFile(path.join(__dirname, "../index.html"));
  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file",
      slashes: true,
    })
  );

  // mainWindow.webContents.openDevTools();
  // return mainWindow;

  server.on("listening", () => {
    const address = server.address();
    console.log("UDP server listening");
  });

  server.on("error", (err) => {
    console.log("Error: " + err);
    server.close();
  });

  server.on("message", (msg: Buffer, rinfo: dgram.RemoteInfo) => {
    console.log(`from ${rinfo.address}:${rinfo.port} server got: ${msg}`);

    const output = parser.parse(msg.toString());
    if (output.status === 0) {
      console.log("Ok");
      mainWindow.webContents.send(output.cmd, output.args);
      mainWindow.webContents.send("Ok", [output.cmd, output.args]);
      if (output.cmd === "get_width" || output.cmd === "get_height") {
        ipcMain.once("reply", (event, arg) => {
          server.send(
            Buffer.from("0: ok" + arg + "\n"),
            rinfo.port,
            rinfo.address
          );
        });
      } else server.send(Buffer.from("0: ok"), rinfo.port, rinfo.address);
    } else if (output.status === -1) {
      console.log("Format Error");
      mainWindow.webContents.send("Format Error");
      server.send(
        Buffer.from("-1: command format error"),
        rinfo.port,
        rinfo.address
      );
    } else if (output.status === -2) {
      console.log("Bad Arguments");
      mainWindow.webContents.send("Bad Arguments");
      server.send(Buffer.from("-2: bad arguments"), rinfo.port, rinfo.address);
    } else if (output.status === -3) {
      console.log("Unknown command");
      mainWindow.webContents.send("Unknown Command");
      server.send(
        Buffer.from("-3: command not found"),
        rinfo.port,
        rinfo.address
      );
    }
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
