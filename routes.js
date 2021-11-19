import asyncHandler from 'express-async-handler';
import Reminder from './tests_model.js';
import express from 'express';

const router = express.Router();

// post new data to mongodb
router.post("/", asyncHandler( async(req,res)=> {

  const reminder = new Reminder({
      reminder: req.body.reminder,
      message: req.body.message,
      date: req.body.date,
      link: req.body.link,
    });
  const newReminder = await reminder.save();
  res.send({ message: 'Reminders', data: newReminder });
 
}));

router.get("/reminders", asyncHandler( async(req,res)=> {
  const reminders = await Reminder.find();
  res.send({ message: 'Reminders', data: reminders });
}));

export default router;