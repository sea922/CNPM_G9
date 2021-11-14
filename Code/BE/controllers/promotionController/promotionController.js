const Promotion = require("../../models/promotions");
exports.Create_promotion = async (req, res, next) => {
  const data = req.body;
  try {
    const temp = new Promotion({
      ...data,
    });
    const result = await temp.save();
    return res.json(result);
  } catch (error) {
    return res.status(500).send("Error 500");
  }
};
exports.Get_all_promotion = async (req, res, next) => {
  try {
    const result = await Promotion.find({}).populate("cinemaId").exec();
    return res.send(result);
  } catch (error) {
    return res.status(500).json("Error 500");
  }
};
exports.Delete_promotion_by_id = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const result = await Promotion.findByIdAndDelete(_id);
    return res.send("Delte successfully!");
  } catch (error) {
    return res.status(500).json("Error 500 !");
  }
};
exports.Upload_promotion_photo = async (req, res, next) => {
 // const url = `${req.protocol}://${req.get("host")}`;
  const { file } = req;
  const promotionId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const promotion = await Promotion.findById(promotionId);
    if (!promotion) return res.sendStatus(404);
    promotion.imageurl = file.path;
    await promotion.save();
    return res.send({ promotion, file });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400).send(e);
  }
};
exports.Search_full_text_promotion = async (req, res, next) => {
  const q = req.params.q;
  try {
    const result = await Promotion.find({ $text: { $search: q } }).exec();
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error 500",
    });
  }
};
exports.Find_promotion = async (req, res, next) => {
  const conditions = req.body;
  const ObjecFind = {
    cinemaId : conditions.cinemaId,
    code: conditions.code,
    startDate: { $lte: new Date() }, // startDate <= dieu kien client
    endDate: { $gte: new Date() },
  };
  try {
    const promotion = await Promotion.find(ObjecFind);
    return res.send(promotion);
  } catch (error) {
    return res.status(500).send("erro 500");
  }
};
