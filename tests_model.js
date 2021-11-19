import  mongoose from "mongoose"

//create a reminder schema for twilio reminder application 

const reminderSchema = new mongoose.Schema({
    reminder: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
    link: { type: String, required: true },
});

const Reminder = mongoose.model('reminders', reminderSchema);

export default Reminder;