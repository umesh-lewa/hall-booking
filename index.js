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
// Type = POST
app.post('/createRoom', function (req, res) {

    let noOfSeats = req.body.seats;
    let amenities = req.body.amenities;
    let pricePerHour = req.body.price;

    rooms.push({
        "id": rooms.length + 1,
        "name": ("Room" + parseInt(+rooms.length + 1)),
        "noOfSeats": noOfSeats,
        "amenities": amenities,
        "pricePerHour": pricePerHour,
        "bookedStatus": false,
        "bookedCustomerName": "",
        "bookedDate": "",
        "bookedTime": {
            "startTime": "",
            "endTime": ""
        }
    });

    res.end("Successfullly created room");

})

// Endpoint to book a room
// Type = POST
app.post('/bookRoom', function (req, res) {

    let customerName = req.body.customerName;
    let date = req.body.date;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;
    let roomId = req.body.roomId;

    // check date and time of booking for previous bookings
    if (rooms.find(el => el.id == roomId).bookedStatus == true && (rooms.find(el => el.id == roomId).bookedDate == date) && (rooms.find(el => el.id == roomId).bookedTime.startTime < endTime && startTime < rooms.find(el => el.id == roomId).bookedTime.endTime)) {
        console.log("Room is already booked");
        res.send("Room is already booked");
    } else {
        customers.push({
            "id": customers.length + 1,
            "name": customerName,
            "bookingRoomId": roomId,
            "bookingDate": date,
            "bookingTime": {
                "startTime": startTime,
                "endTime": endTime
            }
        })

        rooms.find(el => el.id == roomId).bookedStatus = true;
        rooms.find(el => el.id == roomId).bookedCustomerName = customerName;
        rooms.find(el => el.id == roomId).bookedDate = date;
        rooms.find(el => el.id == roomId).bookedTime.startTime = startTime;
        rooms.find(el => el.id == roomId).bookedTime.endTime = endTime;
        console.log("Booked room successfully");
        res.send("Booked room successfully");
    }
})

// Endpoint to get all rooms information
// Type = GET
app.get("/listAllRooms", function (req, res) {

    res.send({
        "rooms": rooms
    });
})

// Endpoint to get all customers information
// Type = GET
app.get("/listAllCustomers", function (req, res) {

    res.send({
        "customers": customers
    })
})


// start the server with specified port
// handle dynamic port binding by heroku using process.env.PORT
var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})