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





app.post("/createWebinar", function(req, res) {
    let title = req.body.title || "";
    let description = req.body.description || "";
    let image_url = req.body.image_url || ""; //optional
    let start_day = req.body.start_day || ""; //optional
    let start_month = req.body.start_month || ""; //optional
    let start_year = req.body.start_year || ""; //optional
    let start_hour = req.body.start_hour || ""; //optional
    let start_minute = req.body.start_minute || ""; //optional
    let fb_key = req.body.fb_key || ""; //optional
    let yt_key = req.body.yt_key || ""; //optional
    let duration = req.body.duration || 60; //optional

    //set url
    let url = 'https://developers.vidphone.me/webinars/create';

    //set header
    var headers = {
        'Authorization': 'Api-Key '+API_KEY,
    };

    var data = {
        "organization_id": ORGANIZATION_ID,
        title: title, 
        description: description,
        image_url: image_url,
        start_day: start_day,
        start_month: start_month,
        start_year: start_year,
        start_hour: start_hour,
        start_minute: start_minute,
        fb_key: fb_key,
        yt_key: yt_key,
        duration: Number(duration)
    }

    //set request parameter
    request.post({headers: headers, url: url, form: data, method: 'POST'}, function (e, r, body) {
        var obj = JSON.parse(body);
        return res.send(obj)
    });
})





app.post("/createPresenter", function(req, res) {
    let name = req.body.name || "";
    let profile_img_url = req.body.profile_img_url || ""; //optional
    let room = req.body.room || "";
    let user_id = req.body.user_id || ""; //optional

    //set url
    let url = 'https://developers.vidphone.me/webinars/create-presenter';

    //set header
    var headers = {
        'Authorization': 'Api-Key '+API_KEY,
    };

    var data = {
        "organization_id": ORGANIZATION_ID,
        name: name, 
        profile_img_url: profile_img_url,
        room: room,
        user_id: user_id,
    }

    //set request parameter
    request.post({headers: headers, url: url, form: data, method: 'POST'}, function (e, r, body) {
        var obj = JSON.parse(body);
        return res.send(obj)
    });
})



app.post("/createSubscriber", function(req, res) {
    let name = req.body.name || "";
    let room = req.body.room || "";
    let user_id = req.body.user_id || ""; //optional

    //set url
    let url = 'https://developers.vidphone.me/webinars/create-subscriber';

    //set header
    var headers = {
        'Authorization': 'Api-Key '+API_KEY,
    };

    var data = {
        "organization_id": ORGANIZATION_ID,
        name: name, 
        room: room,
        user_id: user_id,
    }

    //set request parameter
    request.post({headers: headers, url: url, form: data, method: 'POST'}, function (e, r, body) {
        var obj = JSON.parse(body);
        return res.send(obj)
    });
})



app.listen(port, host);