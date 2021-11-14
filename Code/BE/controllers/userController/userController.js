const User = require("../../models/user");

exports.Create_a_user = async (req, res) => {
  try {
    const { role } = req.body;
    if (role) throw new Error("you cannot set role property.");
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    return res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
};

exports.Upload_user_photo = async (req, res, next) => {
  //const url = `${req.protocol}://${req.get("host")}`;
  const { file } = req;
  const userId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);
    user.imageurl = file.path;
    await user.save();
    return res.send({ user, file });
  } catch (e) {
    console.log(e);
    return res.sendStatus(400).send(e);
  }
};

exports.Login = async (req, res, next) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    return res.send({ user, token });
  } catch (e) {
    return res.status(400).send({
      error: { message: "You have entered an invalid username or password" },
    });
  }
};
exports.Login_with_fb = async (req, res) => {
  try {
    const { email, userID, name, phone } = req.body;
    const nameArray = name.split(" ");
    const user = await User.findOne({ username: nameArray.join("") + userID });
    if (!user) {
      const newUser = new User({
        name,
        username: nameArray.join("") + userID,
        email,
        facebook: userID,
        phone: "Unknown phone",
      });
      try {
        await newUser.save();
        const token = await newUser.generateAuthToken();
        res.status(201).send({ user: newUser, token });
      } catch (e) {
        res.status(400).send(e);
      }
    } else {
      const token = await user.generateAuthToken();
      res.send({ user, token });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.Logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    return res.send({
      message: "Logout successfully !",
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.Get_infor_me = async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.Get_all_users_by_admin = async (req, res, next) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send({
      error: "Only the god can see all the users!",
    });
  try {
    const users = await User.find({ role: { $ne: "superadmin" } });
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.Get_user_by_id_for_admin = async (req, res, next) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send({
      error: "Only the god can see the user!",
    });
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) return res.sendStatus(404);
    return res.send(user);
  } catch (e) {
    return res.sendStatus(400);
  }
};
exports.Update_user = async (req, res, next) => {
  console.log(req.body);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "phone", "username", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const { user } = req;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.Update_user_by_admin = async (req, res, next) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send({
      error: "Only the god can update the user!",
    });
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "phone",
    "username",
    "email",
    "password",
    "role",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates!" });

  try {
    const user = await User.findById(_id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.Delete_user_by_admin = async (req, res, next) => {
  if (req.user.role !== "superadmin")
    return res.status(400).send({
      error: "Only the god can delete the user!",
    });
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.sendStatus(404);

    res.send({ message: "User Deleted" });
  } catch (e) {
    res.sendStatus(400);
  }
};
