const connection = require("../mysql/connect");

exports.home = async (req, res) => {
  try {
    console.log("Home .....");
    const userData = req.cookies.token;
    //const userData = JSON.parse(req.cookies.userData);
    let db = `
    SELECT tabel_artikel.id, tabel_artikel.judul FROM tabel_artikel ORDER BY RAND() LIMIT 6
      `;
    connection.query(db, function (err, data) {
      if (data.length <= 0) {
        return res.status(404).json({
          status: "Failed",
          requestAt: new Date().toISOString(),
          message: "Not Found",
        });
      }
      return res.status(201).json({
        status: "Success",
        requestAt: new Date().toISOString(),
        message: "Ini home",
        artikel: data,
        user: userData,
      });
    });
  } catch (err) {
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.specificartikel = async (req, res) => {
  try {
    const id_artikel = req.params.id_artikel;
    console.log(id_artikel);
    let db = `
    SELECT * FROM tabel_artikel WHERE id = ${id_artikel}
    `;
    connection.query(db, function (err, data) {
      if (data.length <= 0) {
        return res.status(404).json({
          status: "Failed",
          requestAt: new Date().toISOString(),
          message: "Not Found",
        });
      }
      return res.status(201).json({
        status: "Success",
        requestAt: new Date().toISOString(),
        artikel: data,
      });
    });
  } catch (err) {
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};
