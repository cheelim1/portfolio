var express = require("express");
var router = express.Router();

//Send the first template message to start the conversation
router.get("/sendTemplate", async function(req, res, next) {
console.log("IN /sendTemplate API");
    try{
        var number = req.body.number;
        console.log("number in /sendTemplate "+ number)
            const msg =  await client.messages 
            .create({
                from: 'whatsapp:+14155238886', 
                body: "Hi there 👋 I'm Alexa. Thanks for talking to me! Here's a gold star for you ⭐️ ",
                statusCallback: '',       
                to: number 
            }) 
            .then(message => {
                return message
            });
            responseStatus = res.statusCode;
            console.log(responseStatus + "< responseStatus!")
            var messageSent = msg.body;
            var messageRecipient = msg.to;
            var messageStatus = msg.status;
            //var messageDate = msg.dateUpdated;
            var messageSID = msg.sid;
        if(responseStatus==200){
            res.send({
                status:200,
                message:"Message Successfully Sent to Recipients"
            });
        }else{
            res.send({
                status:403,
                message:"Message Unsuccessfully Sent to Recipients"
            });
        }

    }catch(error){
        console.log(error + "Error in /twilio/sendTemplate --try1");
        res.send({
          status:500,
          message:"Message Unable to Sent to Recipients"
        });
    }
});

router.post('/receive', async function(req, res) {
console.log("IN /twilio/receive")
    try{
      const twiml = new MessagingResponse();
      let userResponse = req.body.Body;
      // let campaignId = req.body.MessageSid;
      //console.log(req.body);
      let recipientNumber = req.body.From;

      switch(userResponse) {
        case "Hi" || "Hello" || "yo" || "Hey":
            try{
                var responseMessage = "Hope you're having a pleasant day so far 🚀"
                const msg =  await client.messages 
                .create({
                from: 'whatsapp:+14155238886', 
                body: responseMessage, 
                statusCallback: 'https://afternoon-earth-28309.herokuapp.com/Firestore/MessageStatus',
                mediaUrl: ['https://afternoon-earth-28309.herokuapp.com/KPOP_Mac.png'],
                to: recipientNumber
                }) 
                .then(message => {
                    return message
                });
                    //console.log(JSON.stringify(msg))
                    
                    res.send({  
                        status:200, 
                        message:"Replied to Receipient"
                    });
            }catch(error){
                console.log(error);
                res.send({
                    status:500,
                    message:"Message Unable to Sent to Recipients"
                });
            }
          break;
        case "What is 1+1":
            try{
                var responseMessage = "It's 2! I'm a genius 🤭"
                const msg =  await client.messages 
                .create({
                from: 'whatsapp:+14155238886', 
                body: responseMessage, 
                statusCallback: 'https://afternoon-earth-28309.herokuapp.com/Firestore/MessageStatus',
                mediaUrl: ['https://afternoon-earth-28309.herokuapp.com/KPOP_Mac.png'],
                to: recipientNumber
                }) 
                .then(message => {
                    return message
                });
                    //console.log(JSON.stringify(msg))
                    res.send({  
                        status:200, 
                        message:"Replied to Receipient"
                    });
            }catch(error){
                console.log(error);
                res.send({
                    status:500,
                    message:"Message Unable to Sent to Recipients"
                });
            }
          break;
        default:
            const msg =  await client.messages 
            .create({
            from: 'whatsapp:+14155238886', 
            body: "I'm sorry I don't quite get you. 😔  I'm still learning. Can your rephrase your question? 🙏", 
            statusCallback: 'https://afternoon-earth-28309.herokuapp.com/twilio/MessageStatus',
            mediaUrl: ['https://afternoon-earth-28309.herokuapp.com/KPOP_Mac.png'],
            to: recipientNumber
            });
            //store in firebase all unable to respond responses 
      }
  
    }catch(error){
        console.log(error+"Error in /Send/receive");
        res.send({
            status:500,
            message:"Internal Server Error"
        });
    }
});

router.post("/MessageStatus", async function(req,res){
    try{
      const messageSid = req.body.MessageSid;
      const messageStatus = req.body.MessageStatus;
      console.log(messageSid, messageStatus)
      res.send({
        status:200,
        message:"Status received"
      })
    } catch(error){
      console.log(error+ "In /twilio/MessageStatus");
      res.send({
        status:500,
        message:"Internal Server Error"
      })
    }
});

module.exports = router;