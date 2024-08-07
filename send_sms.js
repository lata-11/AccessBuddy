const twilio = require('twilio');

// Twilio credentials from your Twilio Console
const accountSid = 'AC69b8851ea3746dd20e8715347bd677df'; // Replace with your Account SID
const authToken = '0a25ebdfd5b6c1d491f71c61b2ab01bd';   // Replace with your Auth Token
const twilioPhoneNumber = '+16466814517'; // Replace with your Twilio phone number

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Function to send an SMS
async function sendSMS(to, message) {
    try {
        const response = await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: to
        });
        console.log('SMS sent successfully:', response.sid);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}

// Function to make a voice call
async function makeCall(to, url) {
    try {
        const response = await client.calls.create({
            from: twilioPhoneNumber,
            to: to,
            url: url
        });
        console.log('Call initiated successfully:', response.sid);
    } catch (error) {
        console.error('Error making call:', error);
    }
}

// Example usage
const phoneNumber = '+91 8340776128'; // Replace with recipient phone number
const message = 'Hello from Access Buddy! This message is to remind you that you have set a reminder with message "Visit Doctor Ram at 9:00 PM'; // Replace with your message
const callUrl = 'http://demo.twilio.com/docs/voice.xml'; // URL with TwiML instructions for the call

// Send SMS
sendSMS(phoneNumber, message);

// Make a call
makeCall(phoneNumber, callUrl);
