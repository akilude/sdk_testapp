let roomname = null;
let participant_id = null;



// populate the iframe url, unhide the iframe and start the call
function startCall(){
    let iframe = document.getElementById("iframe");
    iframe.src = "https://vidphone.me/iframe_room/"+roomname+"/"+participant_id;
    iframe.classList.remove("hidden");
}


// create a participant via the API
function createParticipant(name){
    let user_id = new Date().getTime();

    $.post("/createParticipant", {name: name,roomname:roomname, user_id:user_id, is_host:false}, function(data) { 
        if(data && data.error){
            alert(data.msg);
            return;
        }
        participant_id = data.participant_id;
        startCall();
    })
}



// on form submit get the roomname and create a participant
$("#start-meeting-form").on("submit", function(event) {
    event.preventDefault();
    let name = $("#name-input").val();

    if(!name || name == "" || name.trim() == "") {
        return;
    }

    $.ajax({
        url: "/getRoomName",
        type: "POST",
        data: {name: name},
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(data){
            roomname = data.roomname;
            console.log(roomname);
            // create a participant
            createParticipant(name);
        },error: function(error){
            // alert(error);
        }
    });
    return false;
});




$("#start-webinar-form").on("submit", function(event) {
    event.preventDefault();
    let title = $("#webinar-title-input").val();
    let description = $("#webinar-desc-input").val();
    let duration = 60;

    if(!title || title == "" || title.trim() == "") {
        return;
    }

    $.ajax({
        url: "/createWebinar",
        type: "POST",
        data: {title: title, description:description},
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(data){
            console.log(data);
            let room = data.room;
            showWebinarOptionsForRoom(room);
        },error: function(error){
            // alert(error);
        }
    });
    return false;
});





$("#presenter-webinar-form").on("submit", function(event) {
    event.preventDefault();
    let room = $("#presenter-webinar-room").val();
    let name = $("#presenter-name").val();

    if(!room || room == "" || room.trim() == "") {
        return;
    }

    $.ajax({
        url: "/createPresenter",
        type: "POST",
        data: {name:name, room:room},
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(data){
            let id = data.id;

            let iframe = document.getElementById("iframe");
            iframe.src = "https://test1.vidphon.com/iframe_presenter/"+room+"/"+id;
            iframe.classList.remove("hidden");
        },error: function(error){
            // alert(error);
        }
    });
    return false;
});






$("#subscriber-webinar-form").on("submit", function(event) {
    event.preventDefault();
    let room = $("#subscriber-webinar-room").val();
    let name = $("#subscriber-name").val();

    if(!room || room == "" || room.trim() == "") {
        return;
    }

    $.ajax({
        url: "/createSubscriber",
        type: "POST",
        data: {name:name, room:room},
        dataType: 'json', // lowercase is always preferered though jQuery does it, too.
        success: function(data){
            let id = data.id;

            let iframe = document.getElementById("iframe");
            iframe.src = "https://test1.vidphon.com/iframe_subscriber/"+room+"/"+id;
            iframe.classList.remove("hidden");
        },error: function(error){
            // alert(error);
        }
    });
    return false;
});








function showWebinarOptionsForRoom(room){
    $("#webinar-form").hide();
    $("#webinar-label").hide();
    $("#webinar-room-span").val(room);
    $("#webinar-form-1").show();
}



$("#copy-room-btn").on("click", function(event) {
    event.preventDefault();
    let room = $("#webinar-room-span").val();

    $("#copy-room-btn").text("Room copied!");

    setTimeout(()=>{
        $("#copy-room-btn").text("Copy Room");
    },3000);
    navigator.clipboard.writeText(room);
    return false;
})