var fs = require("fs");
var host = "127.0.0.1";
var port = 8000;
var express = require("express");
var request = require("request");

var app = express();
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder


const ORGANIZATION_ID = "";
const API_KEY = "";
const ROOM_TITLE = "abcd";


var bodyParser = require("body-parser");
const { http } = require("http");
app.use(bodyParser.json());


// get the roomname, create it if it doesn't exist
app.post("/getRoomName", function(req, res) {
    //set url
    let url = 'https://developers.vidphone.me/meetings/list';

    //set header
    var headers = {
        'Authorization': 'Api-Key '+API_KEY,
    };

    //set request parameter
    request.post({headers: headers, url: url, form: {}, method: 'POST'}, function (e, r, body) {
        var bodyValues = JSON.parse(body);
        if(bodyValues.meetings){
            let meetings = bodyValues.meetings;
            let roomname = null;
            meetings.forEach(function(meeting){
                if(meeting.title == ROOM_TITLE){
                    roomname = meeting.roomname;
                }
            })

            if(roomname){
                return res.send({"roomname":roomname});
            }


            request.post({headers: headers, url: "https://developers.vidphone.me/meetings/create", form: {
                "organization_id": ORGANIZATION_ID,
                "title": ROOM_TITLE,
            }, method: 'POST'}, function (e, r, meetingObj) {
                var obj = JSON.parse(meetingObj);
                return res.send(obj)
            });

        }
    });
})





// create a participant for the iframe user
app.post("/createParticipant", function(req, res) {

    let roomname = req.body.roomname || "";
    let name = req.body.name || "";
    let user_id = req.body.user_id || "";
    let is_host = req.body.is_host || false;

    //set url
    let url = 'https://developers.vidphone.me/participants/create';

    //set header
    var headers = {
        'Authorization': 'Api-Key '+API_KEY,
    };

    var data = {
        "organization_id": ORGANIZATION_ID,
        roomname: roomname,
        name: name, 
        user_id: user_id,
        is_host: is_host
    }

    //set request parameter
    request.post({headers: headers, url: url, form: data, method: 'POST'}, function (e, r, body) {
        var obj = JSON.parse(body);
        return res.send(obj)
    });
})



app.listen(port, host);