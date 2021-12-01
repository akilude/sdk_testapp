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