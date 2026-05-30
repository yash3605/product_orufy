const { Resend } = require('resend');

const sendOTP = async (email, otp) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Productr <onboarding@resend.dev>',
      to: email,
      subject: 'Your Productr OTP Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto;">
          <h2 style="color: #1a1a6c;">Productr OTP Verification</h2>
          <p>Your OTP code is:</p>
          <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1a1a6c;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 12px;">This OTP will expire in 5 minutes.</p>
        </div>
      `
    });

    console.log(`OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};

module.exports = { sendOTP };
