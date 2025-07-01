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
          from: "Osho Vault <noreply@oshomedia.shop>",
          to: toEmail,
          subject: "Payment received! Unlock your exclusive access",
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #f9f9f9; border: 1px solid #eaeaea; border-radius: 10px;">
      
          <h2 style="color: #4CAF50; margin-bottom: 10px;">Your Premium Content is Ready 🎉</h2>
      
          <p style="font-size: 16px; color: #333;">Thank you for your payment. Your support means a lot to us!</p>
          
          <p style="font-size: 16px; color: #333;">Click the button below to access your exclusive Osho content:</p>
      
          <div style="text-align: center; margin: 30px 0;">
            <a href="${link}" style="background-color: #4CAF50; color: white; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 6px;">
              Access Content
            </a>
          </div>
      
          <p style="font-size: 14px; color: #666;">Stay inspired, stay spiritual 🌿</p>
      
          <hr style="margin: 30px 0;" />
      
          <p style="font-size: 12px; color: #999;">This email was sent by Osho Vault via oshomedia.shop</p>
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
  