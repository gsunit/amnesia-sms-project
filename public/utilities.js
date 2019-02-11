var appProcess = null;
var clockProcess = null;
var stopButton = document.getElementById("stop-app");
var startButton = document.getElementById("start-app");
var endButton = document.getElementById("end-app");
var dnd = true; // Do not disturb mode
var dndStart = 21; // DND mode starts at 2100hrs
var dndEnd = 6; // DND ends at 0600h
var smsInterval = 3600000; // Try sending an SMS every 3600seconds=1hour 

function sendPostRequest(){
    $.post("/userInfo",
    {
        name: $('#name').val(),
        phone: $('#phone').val()
    },
    function(data,status){
        console.log(data);
        for(i in data['sentMessages']){
            $("#Sent-Messages").append("<b>" + currentTime() + "</b>" + "<p>" + data['sentMessages'][i] +  "</p>" );
        }
        for(i in data['failedMessages']){
            $("#Failed-Messages").append("<b>" + currentTime() + "</b>" + "<p>" + data['failedMessages'][i]['message'] + "</p>" );
        }
        $("#app-status").html("<p>" + "App running" + "</p>");
        console.log(Date.now());
    }).fail(function(){
        alert("There seems to be an error on the server side.");
        location.reload();
    });
}

function currentTime(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    return dateTime;
}
var elapsed = 0;
function startClock(){
    $("#start-time").html("<p>" + currentTime() +"</p>");
    var seconds = 0;
    var minutes = 0;
    var hours = 0;
    clockProcess = setInterval(function(){
        elapsed++;
        seconds = elapsed%60;
        minutes = Math.round(elapsed/60);
        hours = Math.round(elapsed/3600);
        $("#running-time").html(hours + ":" + minutes +  ":" + seconds);
    }, 1000);
}

function checkDND(){
    var today = new Date();
    var hours = today.getHours();
    if(hours<dndStart && hours>dndEnd){
        dnd = false;
    }
}
