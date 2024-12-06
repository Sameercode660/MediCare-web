import nodemailer from "nodemailer";

export async function sendEmail(
  recipientEmail: string,
  subject: string,
  recipientName: string,
  messageBody: string
) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Or another service like Outlook, Yahoo, etc.
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Compose the email
  const mailOptions = {
    from: '<privatething789736@gmail.com>', // Sender address
    to: recipientEmail, // Recipient address
    subject, // Subject line
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background-color: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px 0;
          }
          .content {
            padding: 20px;
            color: #333;
          }
          .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
          }
          .button {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 4px;
          }
          .button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Welcome, ${recipientName}!</h1>
          </div>
          <div class="content">
            <p>Dear ${recipientName},</p>
            <p>${messageBody}</p>
            <a href="#" class="button">Learn More</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
            <p><a href="#" style="color: #4CAF50;">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

 