const express = require("express");
const router = express.Router();
const auth = require("../config/auth");

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/auth", require("./auth"));
router.use("/category", require("./categories"));
router.use("/favorites", require("./favorites"));
router.use("/cart", require("./cart"));
router.use("/brand", require("./brand"));
router.use("/orders", require("./orders"));

router.get("/welcome", auth, (req, res) => {
  res.status(200).send(`Welcome ${req.user.user_id}`);
});

module.exports = router;
