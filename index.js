// create express server variables
var express = require('express');
var app = express();

// create file system variables
var fs = require('fs');
const path = require('path');

var bodyParser = require('body-parser');

app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello From Heroku !');
})

let rooms = [];
let customers = [];

// Endpoint to create a Room
// Type = GET
app.post('/createRoom', function (req, res) {

    let noOfSeats = req.body.seats;
    let amenities = req.body.amenities;
    let pricePerHour = req.body.price;

    rooms.push({
        "id": rooms.length + 1,
        "name": "Room" + rooms.length + 1,
        "noOfSeats": noOfSeats,
        "amenities": amenities,
        "pricePerHour": pricePerHour,
        "bookedStatus": false,
        "bookedCustomerName":"",
        "bookedDate":"",
        "bookedTime": {
            "startTime": "",
            "endTime": ""
        }
    });

})

// Endpoint to book a room
//Type = POST
app.post('/bookRoom', function (req, res) {

    let customerName = req.body.customerName;
    let date = req.body.sate;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let roomId = req.body.roomId;

    customers.push({
        "id": customerName.length + 1,
        "name": customerName,
        "bookingRoomId": roomId,
        "bookingDate": date,
        "bookingTime": {
            "startTime": startTime,
            "endTime": endTime
        }
    })

    if (rooms.find(el => el.id == roomId).bookedStatus == true && ()) {
        console.log("Room is already booked");
    } else {
        
        rooms.find(el => el.id == roomId).bookedStatus = true;
        rooms.find(el => el.id == roomId).bookedCustomerName = customerName;
        rooms.find(el => el.id == roomId).bookedDate = date;
        rooms.find(el => el.id == roomId).bookedTime.startTime = startTime;
        rooms.find(el => el.id == roomId).bookedTime.startTime = roomId;
        console.log("Room has been successfully booked")
    }
})

// Endpoint to get all rooms information
// Type = GET
app.post("/listAllRooms", function (req, res) {

    res.end({
        "rooms" : rooms
    });
})

// Endpoint to get all customers information
// Type = GET
app.get("/listAllCustomers", function (req, res) {

    res.end({
        "customers" : customers
    })
})


// start the server with specified port
var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})