const connection = require("../mysql/connect");

exports.quiz = async (req, res) => {
  try {
    const id_quiz = req.params.id_quiz;
    console.log(id_quiz);
    let db = `
    SELECT * FROM quiz_pertanyaan WHERE id_quiz = ${id_quiz}
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
        quiz: data,
      });
    });
  } catch (err) {
    return res.status(err.code).json({
      status: "Failed",
      message: err.message,
    });
  }
};
