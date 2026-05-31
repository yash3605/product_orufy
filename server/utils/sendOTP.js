const sendOTP = async (email, otp) => {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          email: process.env.EMAIL_USER,
          name: 'Productr'
        },
        to: [{ email }],
        subject: 'Your Productr OTP Verification Code',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
            <h2 style="color: #1a1a6c;">Productr OTP Verification</h2>
            <p>Your OTP code is:</p>
            <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1a1a6c;">
              ${otp}
            </div>
            <p style="color: #666; font-size: 12px;">This OTP will expire in 5 minutes.</p>
          </div>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo API error:', data);
      return false;
    }

    console.log(`OTP sent to ${email}`, data.messageId);
    return true;
  } catch (error) {
    console.error('Email send error:', error.message || error);
    return false;
  }
};

module.exports = { sendOTP };
