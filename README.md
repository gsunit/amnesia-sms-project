# amnesia-sms-project
Simple NodeJS web-app created using Twilio API to send reminder messages to user.
<h2>Instructions</h2>
<div id="instructions">
    <ul>
        <li>Enter admin `accountSid`, `authToken` in `index.js`.</li>
        <li>Enter the phone number provided by Twilio to admin in the `from` variable in `index.js`.</li>
        <li>Run `node index` in the directory of the project to start the server. </li>
        <li>Go to `localhost:3000` using your browser.</li>
        <li>Enter user's name and phone number in the given form.</li>
        <li>Note: only those phone numbers can receive messages which have been authorised by the admin in Twilio dashboard</li>
        <li>Note: If a request has already been sent and before the status being logged the user stops or ends the app, that request will still be processed. However, no further requests will be made until the app is restarted.</li>
    </ul>
</div>
