export const verificationEmailTemplate = (verificationCode: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        margin: 20px auto;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 600px;
        text-align: center;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #333333;
        margin-bottom: 20px;
      }
      .header img {
        max-height: 40px;
        margin-right: 10px;
      }
      .verification-code {
        font-size: 36px;
        color: #4CAF50;
        margin: 20px 0;
        letter-spacing: 2px;
        font-weight: bold;
      }
      .message {
        font-size: 16px;
        color: #666666;
        margin-bottom: 30px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #ffffff;
        background-color: #4CAF50;
        border: none;
        border-radius: 4px;
        text-decoration: none;
        cursor: pointer;
      }
      .button:hover {
        background-color: #45a049;
      }
      @media only screen and (max-width: 600px) {
        .container {
          width: 100%;
          padding: 20px;
          box-shadow: none;
          border-radius: 0;
        }
        .header {
          font-size: 20px;
        }
        .header img {
          max-height: 30px;
        }
        .verification-code {
          font-size: 28px;
        }
        .message {
          font-size: 14px;
        }
        .button {
          padding: 10px 20px;
          font-size: 16px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://t4.ftcdn.net/jpg/05/45/00/47/360_F_545004738_apxu9HsxSKhreD0dtltOjzakJRxhdNyJ.jpg" alt="Logo">
        Verify your email
      </div>
      <div class="message">
        Thank you for registering with Albicocche! Please use the following code to verify your email address:
      </div>
      <div class="verification-code">${verificationCode}</div>
      <div class="message">
        If you did not create an account, please ignore this email.
      </div>
      <button href="#" class="button">Confirm Email</button>
    </div>
  </body>
</html>
`;
