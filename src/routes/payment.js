// const express = require("express");
// const { userAuth } = require("../middlewares/auth");

// const razorpayInstance = require("..utils/razorpay")

// const paymentRouter = express.Router();

// paymentRouter.post("/payment/create", userAuth,async(req, resp) => {
//     try {
//         const order = await razorpayInstance.orders.create({
//               "amount": 50000,
//               "currency": "INR",
//               "receipt": "receipt#1",
//               "partial_payment": false,
//             "notes": {
//                 "firstName": "value3",
//                 "lastName": "value2",
//                 "memberShipType": "Silver"
//             }
//         })

//     }catch {
//     }
// })

// module.exports = paymentRouter;