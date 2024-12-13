const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
exports.forgotPass = async (req, res) => {
  try {
    console.log("test");

    const transporter = nodemailer.createTransport({
      service: "gmail", // atau gunakan layanan email lainnya
      auth: {
        user: "kidznihon@gmail.com",
        pass: "ntst loja ozsv orpi", // Ganti dengan App Password Google
      },
    });

    const user = "doni";
    const email = "yahyap20@gmail.com";
    // const { email } = req.body;
    // const user = users.find((u) => u.email === email);

    // if (!user) {
    //   return res.status(404).json({ message: "User tidak ditemukan." });
    // }

    // Generate token
    const token = jwt.sign({ email, user }, process.env.JWT_SECRET);

    console.log("test");

    // Kirim email dengan token
    const resetLink = `https://your-frontend-url/reset-password?token=${token}`;
    transporter.sendMail(
      {
        to: email,
        subject: "Reset Password",
        text: `Klik link berikut untuk mereset password Anda: ${resetLink}`,
      },
      (err, info) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Gagal mengirim email." });
        }
        res.json({ message: "Email reset password telah dikirim." });
      }
    );
  } catch (err) {
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};
