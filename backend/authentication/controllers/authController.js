const connection = require("../mysql/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.signup = async (req, res) => {
  try {
    console.log("Register .....");
    let { fullname, user_email_address, user_password } = req.body;
    let createdAt = new Date().toISOString();

    if (!fullname) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input Fullname",
      });
    }

    if (!user_email_address) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input Email",
      });
    }

    if (validator.isEmail(user_email_address) === false) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input Valid Email",
      });
    }

    if (!user_password) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input Password",
      });
    }

    if (user_password.length <= 5) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input More than 6 Character",
      });
    }

    let db = `
  SELECT * FROM user_login 
  WHERE user_email = "${user_email_address}"
  `;

    connection.query(db, function (err, data) {
      if (data.length >= 1) {
        return res.status(409).json({
          status: "Failed",
          requestAt: new Date().toISOString(),
          message: "Email Already Exist",
        });
      }

      const salt = bcrypt.genSaltSync(8);
      user_password = bcrypt.hashSync(user_password, salt);

      let ins_db = `INSERT INTO user_login (fullname, user_email, user_password, createdAt) VALUES ('${fullname}','${user_email_address}', '${user_password}', '${createdAt}');`;
      connection.query(ins_db, function (err, data) {
        return res.status(201).json({
          status: "Success",
          requestAt: new Date().toISOString(),
        });
      });
    });
  } catch (err) {
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    console.log("Login .....");
    let { user_email_address, user_password } = req.body;

    if (!user_email_address) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input Email",
      });
    }

    if (!user_password) {
      return res.status(400).json({
        status: "Failed",
        requestAt: new Date().toISOString(),
        message: "Please Input Password",
      });
    }

    db = `
  SELECT * FROM user_login
  WHERE user_email = "${user_email_address}"
  `;

    connection.query(db, function (err, data) {
      console.log(data.length);
      if (data.length <= 0) {
        return res.status(401).json({
          status: "Failed",
          requestAt: new Date().toISOString(),
          message: "Wrong Email",
        });
      }

      const passwordIsValid = bcrypt.compareSync(user_password, data[0].user_password);
      if (!passwordIsValid) {
        return res.status(401).json({
          status: "Failed",
          requestAt: new Date().toISOString(),
          message: "Wrong Password",
        });
      }

      let user_id = data[0].user_id;
      let fullname = data[0].fullname;

      const token = jwt.sign({ user_id, user_email_address, fullname }, process.env.JWT_SECRET);
      return res.status(201).json({
        status: "Success",
        message: "logged in successfully",
        requestAt: new Date().toISOString(),
        token,
      });
    });
  } catch (err) {
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.protected = async (req, res) => {
  return res.status(200).json({
    message: "Rute yang dilindungi. Selamat datang, " + req.jwt.fullname,
  });
};