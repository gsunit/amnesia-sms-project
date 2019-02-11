$(document)
    .ready(function(){

        //Current time
        setInterval(function(){
            $("#current-time").html("<p>" + currentTime() +"</p>");
        }, 1000);

        //Start App
        $("#start-app").click(function(){
            startButton.disabled=true;
            stopButton.disabled=false;
            endButton.disabled=false;
            checkDND();
            console.log("Establishing contact with Twilio");
            if(!dnd){
                sendPostRequest();
                appProcess = setInterval(sendPostRequest, smsInterval);
                startClock();
            } else {
                console.log("Do not disturb mode on");
            }
            $("#app-status").html("<p>" + "Establishing contact with Twilio" + "</p>");
        });

        //Clear Log
        $("#clear-log").click(function(){
            $("#Sent-Messages").html( "<p></p>" );
            $("#Failed-Messages").html( "<p></p>" );
        });

        //Stop App
        $("#stop-app").click(function(){
            clearInterval(appProcess);
            startButton.disabled=false;
            stopButton.disabled=true;
            clearInterval(clockProcess);
            $("#app-status").html("<p>" + "App stopped" + "</p>");
        });

        //End App
        $('#end-app').click(function(){
            clearInterval(appProcess);
            startButton.disabled=false;
            stopButton.disabled=true;
            endButton.disabled=true;
            clearInterval(clockProcess);
            elapsed = 0;
            $("#Sent-Messages").html( "<p></p>" );
            $("#Failed-Messages").html( "<p></p>" );
            $("#start-time").html("<p> ____-__-__  __:__:__ </p>");
            $("#running-time").html("<p> __:__:__ </p>");
            $("#app-status").html("<p>" + "App not running" + "</p>");
        });
    }
)