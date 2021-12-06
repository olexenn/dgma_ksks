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

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

ipcRenderer.on("clear_display", (event, arg) => {
  console.log(arg);
  ctx.beginPath();
  ctx.fillStyle = "#" + arg[0];
  ctx.fillRect(0, 0, 700, 500);
  ctx.fill();
  ctx.closePath();
});

ipcRenderer.on("draw_pixel", (event, arg) => {
  ctx.beginPath();
  ctx.fillStyle = "#" + arg[2];
  ctx.fillRect(arg[0], arg[1], 1, 1);
  ctx.fill();
  ctx.closePath();
});

ipcRenderer.on("draw_line", (event, arg) => {
  ctx.beginPath();
  ctx.strokeStyle = "#" + arg[4];
  ctx.moveTo(arg[0], arg[1]);
  ctx.lineTo(arg[2], arg[3]);
  ctx.closePath();
  ctx.stroke();
});

ipcRenderer.on("draw_rectangle", (event, arg) => {
  ctx.beginPath();
  ctx.strokeStyle = "#" + arg[4];
  ctx.rect(arg[0], arg[1], arg[2], arg[3]);
  ctx.closePath();
  ctx.stroke();
});

ipcRenderer.on("fill_rectangle", (event, arg) => {
  ctx.beginPath();
  ctx.fillStyle = "#" + arg[4];
  ctx.rect(arg[0], arg[1], arg[2], arg[3]);
  ctx.fill();
  ctx.closePath();
});

ipcRenderer.on("fill_circle", (event, arg) => {
  ctx.beginPath();
  ctx.fillStyle = "#" + arg[3];
  ctx.arc(arg[0], arg[1], arg[2], 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
});

ipcRenderer.on("draw_circle", (event, arg) => {
  ctx.beginPath();
  ctx.strokeStyle = "#" + arg[3];
  ctx.arc(arg[0], arg[1], arg[2], 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
});

ipcRenderer.on("draw_ellipse", (event, arg) => {
  ctx.beginPath();
  ctx.strokeStyle = "#" + arg[4];
  ctx.ellipse(arg[0], arg[1], arg[2], arg[3], 0, 0, 360);
  ctx.closePath();
  ctx.stroke();
});

ipcRenderer.on("fill_ellipse", (event, arg) => {
  ctx.beginPath();
  ctx.fillStyle = "#" + arg[4];
  ctx.ellipse(arg[0], arg[1], arg[2], arg[3], 0, 0, 360);
  ctx.fill();
  ctx.closePath();
});

ipcRenderer.on("draw_rounded_rectangle", (event, arg) => {
  ctx.beginPath();
  ctx.strokeStyle = "#" + arg[5];
  roundRect(ctx, arg[0], arg[1], arg[2], arg[3], arg[4]);
  ctx.closePath();
  ctx.stroke();
});

ipcRenderer.on("fill_rounded_rectangle", (event, arg) => {
  ctx.beginPath();
  ctx.fillStyle = "#" + arg[5];
  roundRect(ctx, arg[0], arg[1], arg[2], arg[3], arg[4]);
  ctx.fill();
  ctx.closePath();
});

ipcRenderer.on("draw_text", (event, arg) => {
  ctx.font = arg[3] + "px serif";
  ctx.fillStyle = "#" + arg[2];
  let userText = "";
  if (arg.length > 6) {
    for (let i = 0; i <= arg.length - 6; i++) {
      userText += arg[i + 5] + " ";
    }
  } else userText = arg[5];
  console.log(userText);
  ctx.fillText(userText, arg[0], arg[1]);
});

ipcRenderer.on("draw_image", (event, arg) => {
  let array = [];
  for (let i = 1; i <= arg[3] * arg[2]; i++) {
    array.push(arg[3 + i]);
  }
  console.log(array);
  let n = 0;
  for (let i = 0; i < arg[3]; i++) {
    for (let j = 0; j < arg[2]; j++) {
      console.log(array[n]);
      ctx.beginPath();
      ctx.fillStyle = "#" + array[n];
      ctx.fillRect(arg[0] + j, arg[1] + i, 1, 1);
      ctx.fill();
      ctx.closePath();
      n++;
    }
  }
});

ipcRenderer.on("get_width", (event, arg) => {
  ipcRenderer.send("reply", canvas.width);
});

ipcRenderer.on("get_height", (event, arg) => {
  ipcRenderer.send("reply", canvas.height);
});

ipcRenderer.send("asynchronous-message", "ping");
