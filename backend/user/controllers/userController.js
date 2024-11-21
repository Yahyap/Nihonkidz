const connection = require("../mysql/connect");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
