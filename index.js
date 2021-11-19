import twilio from "twilio";
import dotenv from 'dotenv';
import moment from "moment";
import {MongoClient} from 'mongodb';

dotenv.config()

const accountSID = process.env.TWILIO_ACCOUNT_SID
const accountAuth = process.env.TWILIO_ACCOUNT_AUTH
const phoneNumber = process.env.TWILIO_PHONE_NUMBER
const mongodbUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/reminderapp";
const twilioclient = new twilio(accountSID,accountAuth)

//fetch data from mongoDB and send sms to the user   

const sendSms = async (req,res) => {
    const client = await MongoClient.connect(mongodbUrl,{ useNewUrlParser: true});
    const db = client.db('reminderapp');
    const collection = db.collection('reminders');
    const todayDate = moment().format('MMM Do YY','L');
    const user = await collection.findOne({'date': todayDate});
    const message = user.message;
    const link = user.link;
    twilioclient.messages.create({
        body: `\n Hello \n ${user.reminder} \n ${message} You can find it here \n ${link}`,
        to: '+254725468798',
        from: phoneNumber
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err))
   

    client.close();
}
 
sendSms();