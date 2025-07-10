const registerOtpTemplate = (str)=>{
    const template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      padding: 0;
      margin: 0;
    }
    .container {
      max-width: 600px;
      background: #ffffff;
      margin: 40px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
    }
    .otp {
      font-size: 28px;
      font-weight: bold;
      color: #333;
      background-color: #e7f3ff;
      padding: 12px 20px;
      display: inline-block;
      border-radius: 8px;
      margin: 20px 0;
    }
    .footer {
      font-size: 12px;
      color: #888;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔐 Your OTP Code</h2>
    <p>Hello,</p>
    <p>Use the following One-Time Password (OTP) to complete your verification. The OTP is valid for the next 10 minutes:</p>
    <div class="otp">{{OTP_CODE}}</div>
    <p>If you did not request this, please ignore this email.</p>
    <div class="footer">
      <p>— Musify Team</p>
    </div>
  </div>
</body>
</html>
`;
    return template;
} 


export{
    registerOtpTemplate
}