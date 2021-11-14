const Cinema = require("../../models/cinemas");
exports.Create_a_cinema = async (req, res, next) => {
  const cinema = new Cinema(req.body);
  try {
    await cinema.save();
    return res.status(201).send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.Upload_cinema_photo = async (req, res, next) => {
  //const url = `${req.protocol}://${req.get("host")}`;
  const { file } = req;
  const movieId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const cinema = await Cinema.findById(movieId);
    if (!cinema) return res.sendStatus(404);
    cinema.image = file.path;
    //cinema.image = `${url}/${file.path}`;
    await cinema.save();
    res.send({ cinema, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
};

exports.Get_all_cinemas = async (req, res, next) => {
  try {
    const cinemas = await Cinema.find({});
    return res.send(cinemas);
  } catch (e) {
    return res.status(400).send(e);
  }
};
exports.Get_cinema_by_id = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findById(_id);
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }
};
exports.Update_cinema_by_id = async (req, res, next) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "ticketPrice",
    "city",
    "seats",
    "seatsAvailable",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const cinema = await Cinema.findById(_id);
    updates.forEach((update) => (cinema[update] = req.body[update]));
    await cinema.save();
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }
};
exports.Delete_cinema_by_id = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findByIdAndDelete(_id);
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.sendStatus(400);
  }
};
exports.Search_full_text = async (req, res, next) => {
  const q = req.params.q;

  try {
    const result = await Cinema.find({ $text: { $search: q } }).exec();
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error 500",
    });
  }
};
