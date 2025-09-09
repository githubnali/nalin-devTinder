const cron = require("node-cron");
const ConnectionRequest = require('../models/connectionRequest');

const {subDays, startOfDay, endOfDay} = require("date-fns");

const sendEmail = require("./sendEmail");


// this job will run at 8 am in the morning every day
cron.schedule("0 8 * * *", async() => {

   try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);

    const yesterdayEnd = endOfDay(yesterday);

    //DB query to find out the all connection request interested status
    const pendingRequests = await ConnectionRequest.find(
        {
            status: 'interested',
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        }
    ).populate("fromUserId toUserId");

    //find out unique emails
    const listOfEmails = [
        ...new Set(pendingRequests.map((req) => req.toUserId.emailId))
    ]


    //loop through sending them emails.
    for (const email of listOfEmails) {
        const res = await sendEmail.run(
            "New Friend Request pending for " + email,
            'There are so many requests pending, please login into devbuddy.in and accept or reject the requests'
        )

        console.log(res);
    }
   }catch(err) {
    console.err(err)
   }
})