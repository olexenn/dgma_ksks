import { ipcRenderer } from "electron";

console.log("renderer");
ipcRenderer.on("Ok", (event, args) => {
  document.getElementById("commandStatus").innerHTML = "Ok";
  document.getElementById("commands").innerHTML += "\n" + args;
});

ipcRenderer.on("Format Error", (event, args) => {
  document.getElementById("commandStatus").innerHTML = "Format Error";
});

ipcRenderer.on("Bad Arguments", (event, args) => {
  document.getElementById("commandStatus").innerHTML = "Bad Arguments";
});

ipcRenderer.on("Unknown Command", (event, args) => {
  document.getElementById("commandStatus").innerHTML = "Unknown Command";
});
