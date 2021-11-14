const Contact = require("../../models/contact");

exports.Create_contact = async (req, res, next) => {
  const contact = new Contact({
    ...req.body,
  });
  try {
    await contact.save();
    res.status(201).send(contact);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

exports.Upload_contact_photo = async (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const { file } = req;
  const contactId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const contact = await Contact.findById(contactId);
    if (!contact) return res.sendStatus(404);
    contact.image = `${url}/${file.path}`;
    await contact.save();
    res.send({ contact, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
};

exports.Get_all_contact = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.send(contacts);
  } catch (e) {
    res.status(400).send(e);
  }
};
