const Movie = require("../../models/movie");
const userModeling = require("../../utils/userModeling");

exports.Create_movie = async (req, res, next) => {
  const movie = new Movie({
    ...req.body,
  });
  console.log(movie);
  try {
    await movie.save();
    res.status(201).send(movie);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

exports.Upload_movie_photo = async (req, res, next) => {
  //const url = `${req.protocol}://${req.get("host")}`;
  const { file } = req;
  console.log(file)
  const movieId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const movie = await Movie.findById(movieId);
    if (!movie) return res.sendStatus(404);
   // movie.image = `${url}/${file.path}`;
    movie.image = file.path;
    await movie.save();
    res.send({ movie, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
};

exports.Get_all_movie = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.Get_suggest_movies = async (req, res) => {
  const { username } = req.params;
  try {
    const cinemasUserModeled = await userModeling.moviesUserModeling(username);
    res.send(cinemasUserModeled);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.Get_movie_by_id = async (req, res, rext) => {
  const _id = req.params.id;

  try {
    const movie = await Movie.findById(_id);
    if (!movie) return res.sendStatus(404);
    return res.send(movie);
  } catch (e) {
    return res.status(400).send(e);
  }
};

exports.Update_movie_by_id = async (req, res, next) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  console.log(req.body);
  const allowedUpdates = [
    "title",
    "image",
    "language_movie",
    "genre",
    "director",
    "cast",
    "description",
    "duration",
    "releaseDate",
    "endDate",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const movie = await Movie.findById(_id);
    updates.forEach((update) => (movie[update] = req.body[update]));
    await movie.save();
    return !movie ? res.sendStatus(404) : res.send(movie);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};
exports.Delete_movie_by_id = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const movie = await Movie.findByIdAndDelete(_id);
    return !movie ? res.sendStatus(404) : res.send(movie);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
exports.Full_text_search_movie = async (req, res, next) => {
  const q = req.params.q;
  console.log(q);
  try {
    const result = await Movie.find({ $text: { $search: q } }).exec();
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error 500",
    });
  }
};
