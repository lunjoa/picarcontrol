const express = require("express");
const app = express();
const port = 8080;
const piblaster = require("piblaster.js");

app.get("/", (request, response) => {
	response.send("Hello World!");
});

app.listen(port, () => {
	console.log("Example app listening at http://localhost:", port);
});

// var HID = require("node-hid");
// console.log(HID.devices());
// var hid = new HID.HID(11720, 24834);
// hid.on("data", function (data) {
// 	console.log(data[1]);
// });
var HID = require("node-hid");
console.log(HID.devices());
const Gamecontroller = require("gamecontroller");
const ctrl = new Gamecontroller("bitdo_Dinput");
console.log(Gamecontroller.getDevices());
ctrl.connect(function () {
	console.log("connected");
});
ctrl.on("JOYL:move", function (position) {
	console.log("Left stick was moved: ", position);
	piblaster.setPwm(17, 0.1 + position.x / 1500);
});
// ctrl.on("X:press", function () {
// 	console.log("X was pressed");
// });
// ctrl.on("Y:press", function () {
// 	console.log("Y was pressed");
// });
// ctrl.on("A:press", function () {
// 	console.log("A was pressed");
// });
// ctrl.on("B:press", function () {
// 	console.log("B was pressed");
// });
// ctrl.on("L1:press", function () {
// 	console.log("L1 was pressed");
// });
// ctrl.on("L2:press", function () {
// 	console.log("L2 was pressed");
// });
// ctrl.on("R1:press", function () {
// 	console.log("R1 was pressed");
// });
// ctrl.on("R2:press", function () {
// 	console.log("R2 was pressed");
// });
// ctrl.on("Select:press", function () {
// 	console.log("Select was pressed");
// });
// ctrl.on("Start:press", function () {
// 	console.log("Start was pressed");
// });
// ctrl.on("Up:press", function () {
// 	console.log("Up was pressed");
// });
// ctrl.on("Right:press", function () {
// 	console.log("Right was pressed");
// });
// ctrl.on("Down:press", function () {
// 	console.log("Down was pressed");
// });

// ctrl.on("Left:press", function () {
// 	console.log("Left was pressed");
// });
// ctrl.on("JOYL:move", function (position) {
// 	console.log("Left stick was moved: ", position);
// });
// ctrl.on("JOYR:move", function (position) {
// 	console.log("Right stick was moved: ", position);
// });
