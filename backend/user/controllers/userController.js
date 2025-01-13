const connection = require("../mysql/connect");
const bcrypt = require("bcrypt");
const validator = require("validator");
const nodemailer = require("nodemailer");

exports.updatepass = async (req, res) => {
  console.log("Update Password .....");
  let { user_email_address, old_password, new_password, con_new_password } = req.body;
  let updateAt = new Date().toISOString();

  if (!old_password) {
    return res.status(400).json({
      status: "Failed",
      requestAt: new Date().toISOString(),
      message: "Please Input Old Password",
    });
  }

  if (!new_password) {
    return res.status(400).json({
      status: "Failed",
      requestAt: new Date().toISOString(),
      message: "Please Input New Password",
    });
  }

  if (!con_new_password) {
    return res.status(400).json({
      status: "Failed",
      requestAt: new Date().toISOString(),
      message: "Please Input Confirmation New Password",
    });
  }

  db = `
  SELECT * FROM user_login
  WHERE user_email = "${user_email_address}"
  `;

  connection.query(db, function (err, data) {
    if (old_password == new_password) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "The new password cannot be the same as the old one",
      });
    }

    if (con_new_password != new_password) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "The password must be same",
      });
    }

    const oldpasswordIsValid = bcrypt.compareSync(
      old_password,
      data[0].user_password
    );
    if (!oldpasswordIsValid) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Wrong Old Password",
      });
    }
    if (new_password.length <= 5) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input More than 6 Character",
      });
    }

    const salt = bcrypt.genSaltSync(8);
    new_password = bcrypt.hashSync(new_password, salt);

    update = `UPDATE user_login 
    SET user_password = '${new_password}', updateAt = '${updateAt}' WHERE user_email = "${user_email_address}"`;
    connection.query(update, function (err, data) {
      return res.status(201).json({
        status: "Success",
        message: "Password telah diperbarui",
        requestAt: new Date().toISOString(),
      });
    });
  });
};

exports.updatename = async (req, res) => {
  console.log("Update Name .....");
  let { user_email_address, new_firstname, new_lastname } = req.body;
  let updateAt = new Date().toISOString();

  if (!user_email_address) {
    return res.status(400).json({
      status: "Failed",
      requestAt: new Date().toISOString(),
      message: "Please Input Email",
    });
  }

  if (!new_firstname) {
    return res.status(400).json({
      status: "Failed",
      requestAt: new Date().toISOString(),
      message: "Please Input First Name",
    });
  }

  if (!new_lastname) {
    return res.status(400).json({
      status: "Failed",
      requestAt: new Date().toISOString(),
      message: "Please Input Last Name",
    });
  }

  db = `
  SELECT * FROM user_login
  WHERE user_email = "${user_email_address}"
  `;

  connection.query(db, function (err, data) {
    console.log(data.length);
    if (data.length <= 0) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Wrong Email",
      });
    }

    update = `UPDATE user_login 
    SET firstname = '${new_firstname}', lastname = '${new_lastname}', updateAt = '${updateAt}' WHERE user_email = "${user_email_address}"`;
    connection.query(update, function (err, data) {
      return res.status(201).json({
        status: "Success",
        message: "Nama telah diperbarui",
        requestAt: new Date().toISOString(),
      });
    });
  });
};

exports.forgotpass = async (req, res) => {
  try {
    console.log("test");

    const transporter = nodemailer.createTransport({
      service: "gmail", // atau gunakan layanan email lainnya
      auth: {
        user: "kidznihon@gmail.com",
        pass: "ntst loja ozsv orpi", // Ganti dengan App Password Google
      },
    });

    let { email } = req.body;
    console.log("test");

    db = `SELECT * FROM user_login WHERE user_email = "${email}"`;
    connection.query(db, function (err, data) {
      console.log(data.length);
      if (data.length <= 0) {
        return res.status(400).json({
          status: "Failed",
          requestAt: new Date().toISOString(),
          message: "This email is not registered",
        });
      }
      // Generate token
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      console.log("test");

      // Kirim email dengan token
      const resetLink = `https://sonic-totem-438312-d0.et.r.appspot.com/reset-password.html?token=${token}`;
      transporter.sendMail(
        {
          to: email,
          subject: "Reset Password",
          text: `Klik link berikut untuk mereset password Anda: ${resetLink}`,
        },
        (err, info) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              status: "Failed",
              requestAt: new Date().toISOString(),
              message: "Gagal mengirim email.",
            });
          }
          return res.status(200).json({
            status: "Success",
            requestAt: new Date().toISOString(),
            message: "Email reset password telah dikirim.",
          });
        }
      );
    });
  } catch (err) {
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.resetpass = async (req, res) => {
  try {
    const token = req.params.token;
    console.log(token);
    let { password, password_repeat } = req.body;
    console.log(password);
    console.log(password_repeat);
    if (!password) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input Password",
      });
    }

    if (password.length <= 5) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input More than 6 Character",
      });
    }

    if (password_repeat !== password) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Correct Input Password",
      });
    }

    let updateAt = new Date().toISOString();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_email = decoded.email;
    console.log(user_email);

    console.log("test1");

    const salt = bcrypt.genSaltSync(8);
    password = bcrypt.hashSync(password, salt);
    console.log(password);

    update = `UPDATE user_login 
    SET user_password = '${password}', updateAt = '${updateAt}' WHERE user_email = "${user_email}"`;

    connection.query(update, function (err, data) {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({
          status: "Failed",
          requestAt: new Date().toISOString(),
          message: "Internal Server Error",
        });
      }
      return res.status(201).json({
        status: "Success",
        message: "Password telah diperbarui",
        requestAt: new Date().toISOString(),
      });
    });
  } catch (err) {
    console.log("test2");
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};