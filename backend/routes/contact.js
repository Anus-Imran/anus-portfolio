const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"Anus Portfolio" <${process.env.GMAIL_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New Message from ${name} — Portfolio Contact`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;background:#0d0d1a;color:#e2e8f0;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#915eff,#5c3d9e);padding:28px 32px">
            <h2 style="margin:0;font-size:20px;color:#fff">New Message from Portfolio</h2>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;color:#a78bfa;font-size:13px;font-weight:600;width:100px">NAME</td>
                  <td style="padding:10px 0;color:#f1f5f9">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#a78bfa;font-size:13px;font-weight:600">EMAIL</td>
                  <td style="padding:10px 0"><a href="mailto:${email}" style="color:#915eff">${email}</a></td></tr>
            </table>
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:20px 0"/>
            <p style="color:#a78bfa;font-size:13px;font-weight:600;margin:0 0 10px">MESSAGE</p>
            <p style="color:#f1f5f9;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
          </div>
          <div style="padding:16px 32px;background:rgba(255,255,255,0.03);text-align:center;font-size:12px;color:#64748b">
            Sent via your portfolio contact form
          </div>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

module.exports = router;
