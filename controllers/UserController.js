const User = require("../models/User");
const { generateAccessToken } = require("../utils");
const { Op } = require("sequelize");

class UserController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (email.length == 0 || password.length == 0)
        return res.status(406).json("Found some empty inputs!");

      const user = await User.findOne({
        where: { email },
      });
      if (!user) return res.status(406).json("User not found!");
      if (user?.password !== password)
        return res.status(406).json("Wrong email or password!");
      if (user?.status == "Blocked")
        return res.status(406).json("You are blocked!");

      await User.update(
        {
          lastLoginDate: new Date(),
        },
        { where: { id: user.id } }
      );

      const token = generateAccessToken({ username: user?.name });
      return res.json({ message: "Successfully entered in system!", token });
    } catch (err) {
      console.log(err);
    }
  }

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (name.length == 0 || email.length == 0 || password.email == 0)
        return res.status(406).json("Found some empty inputs!");

      const users = await new Promise((resolve, reject) => {
        resolve(
          User.findAll({
            where: {
              [Op.or]: [{ name }, { email }],
            },
          })
        );
      });

      if (users?.length)
        return res.status(406).json("Pick unique name or email!");

      await User.create({
        name,
        email,
        password,
      })
        .then((data) => {
          res.status(201).json({ message: "User successfully created!", data });
        })
        .catch((err) => {
          res.json(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async remove(req, res, next) {
    try {
      const id = req.params.id;

      await User.destroy({
        where: { id },
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async getAll(req, res, next) {
    try {
      await User.findAll()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async changeStatus(req, res, next) {
    try {
      const id = req.params.id;
      const { status } = req.body;

      await User.update(
        { status },
        {
          where: { id },
        }
      )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(500).json(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserController();
