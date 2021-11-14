var Showtime = require("../../models/showtime");
exports.Create_a_showtime = async (req, res, next) => {
  const showtime = new Showtime(req.body);
  try {
    await showtime.save();
    res.status(201).send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.Get_all_showtimes = async (req, res, next) => {
  try {
    const showtimes = await Showtime.find({})
      .populate("movieId")
      .populate("cinemaId")
      .exec();
    res.send(showtimes);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
exports.Get_showtime_by_id = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findById(_id);
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.Update_showtime_by_id = async (req, res, next) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "startAt",
    "startDate",
    "endDate",
    "movieId",
    "cinemaId",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const showtime = await Showtime.findById(_id);
    updates.forEach((update) => (showtime[update] = req.body[update]));
    await showtime.save();
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.status(400).send(e);
  }
};
exports.Delete_showtime_by_id = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const showtime = await Showtime.findByIdAndDelete(_id);
    return !showtime ? res.sendStatus(404) : res.send(showtime);
  } catch (e) {
    return res.sendStatus(400);
  }
};


