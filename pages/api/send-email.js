export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST requests allowed" });
    }
  
    const { toEmail, link } = req.body;
  
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Your App <noreply@oshomedia.shop>",
          to: toEmail,
          subject: "Thanks for your payment",
          html: `<div style="font-family: Arial, sans-serif; color: #333;">
          <h2>✅ Payment Successful</h2>
          <p>Thank you for your payment! You can access your download or content using the link below:</p>
          <a href="${link}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Access Now</a>
          <p>If you have any questions, feel free to reply to this email.</p>
          <br/>
          <p>— The Osho Vault Team</p>
        </div>`,
        }),
      });
  
      const data = await response.json();
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Email error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
  