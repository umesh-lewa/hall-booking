# hall-booking

----------------------------------------------------------------

Deployed Heroku URL :

https://hall-booking-umesh.herokuapp.com/


----------------------------------------------------------------

Endpoint 1 : Create a new Room

Type = POST

https://hall-booking-umesh.herokuapp.com/createRoom

Sample Request Body : 

{
    "seats": 50,
    "amenities":["dance floor","buffet"],
    "price": 15000
}

----------------------------------------------------------------

Endpoint 2 : Get all room details

Type =  GET

https://hall-booking-umesh.herokuapp.com/listAllRooms


----------------------------------------------------------------

Endpoint 3 : Book a Room

Type = POST

https://hall-booking-umesh.herokuapp.com/bookRoom

Sample Request Body : 

{
    "customerName":"Umesh",
    "date":"15/09/2020",
    "startTime":"10:00:00",
    "endTime":"17:30:00",
    "roomId":"1"
}

----------------------------------------------------------------

Endpoint 4 : Get all customer details

Type = GET

https://hall-booking-umesh.herokuapp.com/listAllCustomers

----------------------------------------------------------------
