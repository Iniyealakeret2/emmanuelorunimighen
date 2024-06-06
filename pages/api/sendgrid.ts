import sgMail from "@sendgrid/mail";
import logger from "./logger";
const sendGrid: any = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;
sgMail.setApiKey(sendGrid);

async function sendEmail(req: any, res: any) {
  console.log(req.body);
  const msg = {
    to: "mucyochristian2@gmail.com",
    from: "muchris.dev@gmail.com",
    subject: `Email from ${req.body.email}`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
        <head>
          <meta charset="utf-8">
        
          <title>Emmanuel Orunimighen Email</title>
          <meta name="description" content="Mucyo Chris Email">
          <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        
          <link rel="stylesheet" href="css/styles.css?v=1.0">
        
        </head>
        
        <body>
          <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
                </div>
                <div class="container" style="margin-left: 20px;margin-right: 20px;">
                <h3>You've got a new mail from ${req.body.name}, their email is: ✉️${req.body.email} and phone number is ${req.body.phone} </h3>
                <div style="font-size: 16px;">
                <p>Message:</p>
                <p>${req.body.message}</p>
                <br>
                </div>
                </div>
        </body>
        </html>`,
  };
  sgMail
    .send(msg)
    .then((response: any) => {
      logger.info(response[0].statusCode);
      logger.info(response[0].headers);
    })
    .catch((error: any) => {
      logger.error(error);
    });
}

export default sendEmail;
