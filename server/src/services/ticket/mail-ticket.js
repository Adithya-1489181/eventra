const mailController = require("nodemailer");
require("dotenv").config();

const transporter = mailController.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_APP_PASSWORD
    }
});

async function sendTicket(to,pdfBuffer,ticketDetails) {
    await transporter.sendMail({
        from: `"Eventra"<${process.env.EMAIL}>`,
        to,
        subject: `Your Event Ticket for ${ticketDetails.eventname}`,
        text: `Hey ${ticketDetails.username},\nWe are pleased to have you with us on ${ticketDetails.eventname}. Please find your ticket attached below and please do bring this(softcopy or hardcopy) to the event while attending.\nThank You`,
        attachments:[
            {
                filename: "ticket.pdf",
                content: pdfBuffer
            }
        ]
    });
}

module.exports = {sendTicket}