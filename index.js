var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

var port = 3000;
var json;

const accountSid = 'my_account_sid';
const authToken = 'my_auth_token';
const from = 'my_sender_number';
const client = require('twilio')(accountSid, authToken);



var app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);
app.use('/scripts', express.static(path.join(__dirname, 'public', 'buttons.js')));
app.use('/utilities', express.static(path.join(__dirname, 'public', 'utilities.js')));


app.listen(port, function(){
    console.log('Server started on port '+port);
})


router.get('/', function(req, res, next){
    res.render('index.html', {
        name: "",
        phone: "",
        failedMessages: [],
        sentMessages: []
    });
});

app.post("/userInfo", function(req, res) {
    var name = req.body.name;
    var phone = req.body.phone;
    var failedMessages = [];
    var sentMessages = [];
    console.log(name, phone);
    tryReminding(name, phone, 1, res, failedMessages, sentMessages);
    
});

function tryReminding(name, phone, tries, res, failedMessages, sentMessages){
    if(tries <= 5){
        sendReminder(client, name, phone)
        .then(function(result){
            console.log(name);
            console.log(phone);
            sentMessages.push(result);
            res.send({
                name: name,
                phone: phone,
                failedMessages: failedMessages,
                sentMessages: sentMessages
            });
        })
        .catch(function(err){
            failedMessages.push(err);
            tryReminding(name, phone, tries+1, res, failedMessages, sentMessages);
        });
    }
    else {
        res.send({
            name: name,
            phone: phone,
            failedMessages: failedMessages,
            sentMessages: sentMessages
        });
    }
}


function sendReminder(client, name, phone){

    return new Promise(function(resolve, reject){
        client.messages
        .create({
            body: 'Your name is ' + name,
            from: from,
            to: phone
        })
        .then(message => {
            json = JSON.stringify(message);
            resolve(json)
            // console.log(sentMessages);
        })
        .catch((err) => {
            console.log("error found");
            json = JSON.stringify(err);
            reject(err)
        })
        .done();
    });  
}





