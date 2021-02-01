const app = require("express")();
const port = 8080;
const http = require("http").Server(app);
const io = require("socket.io")(http);
const piblaster = require("pi-blaster.js");

io.on("connection", (serverSocket) => {
	console.log("A user connected");
	serverSocket.on("disconnect", () => {
		console.log("A user disconnected");
	});
	serverSocket.on("controllerStatus", (controller) => handleController(controller));
});

http.listen(port, () => {
	console.log("listening on *:", port);
});

function handleController(controller) {
	steer(controller.steering);
	throttle(controller.throttle);
}

app.get("/steering/:value", (request, response) => {
	steer(request.params.value);
	response.send(request.params.value);
});

app.get("/throttle/:value", (request, response) => {
	throttle(request.params.value);
	response.send(request.params.value);
});

function steer(value) {
	const filteredValue = Math.min(Math.max(value, -100), 100);
	const convertedValue = (195 + filteredValue / 3) / 1000;
//	console.log("Setting steering to: ", convertedValue);
	piblaster.setPwm(17, convertedValue);
}

function throttle(value) {
	const filteredValue = Math.min(Math.max(value, -100), 100);
	const convertedValue = (150 + filteredValue / 5) / 1000;
//	console.log("Setting throttle to: ", convertedValue);
	piblaster.setPwm(18, convertedValue);
}

//var HID = require("node-hid");
//console.log(HID.devices());
//var hid = new HID.HID(11720, 24834);
//hid.on("data", function (data) {
//	console.log(data[1]);
// });
try {
	var HID = require("node-hid");
	console.log(HID.devices());
	const Gamecontroller = require("gamecontroller");
	const ctrl = new Gamecontroller("bitdo_Dinput");
	console.log(Gamecontroller.getDevices());
	ctrl.connect(function () {
		console.log("connected");
	});
	ctrl.on("JOYL:move", function (position) {
		const value = position.x / 1.275 - 100;
		steer(value);
	});
	ctrl.on("JOYR:move", function (position) {
		const value = position.y / 1.275 - 100;
		throttle(value);
	});
} catch {
	console.log("could not use controller");
}
