const express = require("express");
const userRouter = express.Router();
const User = require("../models/UsersModel");
const auth = require("../config/auth");
const admin = require("../config/admin");
const bcrypt = require("bcrypt");

userRouter.get("/", (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
});

userRouter.get("/:id", (req, res, next) => {
  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (!user) res.status(404);
      res.send(user);
    })
    .catch(next);
});

// actualizar usuario

userRouter.put("/update/:id", (req, res, next) => {
  console.log(req.body.password);
  if (req.body.password) {
    User.findOne({
      where: { id: req.params.id },
    }).then((user) => {
      user
        .hash(req.body.password, user.salt) // hasheo nuevo password con salt en BD
        .then((hash) => {
          User.update(
            { ...req.body, password: hash },
            {
              where: { id: req.params.id },
              returning: true,
            }
          ).then(([noData, data]) => {
            res.json({
              message: "Updated successfully",
              user: data,
            });
          });
        })
        .catch(next);
    });
  } else {
    console.log("NO INGRESO PASSWORD");
  }
});

// nuevo usuario
userRouter.put("/:id", (req, res, next) => {
  User.update(req.body, {
    where: { id: req.params.id },
    returning: true,
    plain: true,
  })
    .then(([noData, [data]]) =>
      res.json({
        message: "Updated successfully",
        user: data,
      })
    )
    .catch(next);
});

userRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.destroy({
    where: { id },
  })
    .then(res.sendStatus(202))
    .catch(next);
});

userRouter.put("/promote/:id", (req, res) => {
  const { id } = req.params;
  User.update({ isAdmin: true }, { where: { id: id } })
    .then(() => res.sendStatus(202))
    .catch((err) => res.status(404).send(err));
});

userRouter.put("/revoke/:id", (req, res) => {
  const { id } = req.params;
  User.update({ isAdmin: false }, { where: { id: id } })
    .then(() => res.sendStatus(202))
    .catch((err) => res.status(404).send(err));
});

// userRouter.put("/revoke/:id", [auth, admin], async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findByPk(id);
//   const adminId = req.user.user_id;
// //   if (!user) {
// //     res.sendStatus(404);
// //   }

//   if (adminId === user.id) {
//     return res.status(401).send("Can't revoke self-permissions");
//   }
//   user.isAdmin = false;
//   const updatedUser = await user.save();
//   return res.status(200).json({
//     message: "Updated successfully",
//     user: updatedUser,
//   });
// });

module.exports = userRouter;
