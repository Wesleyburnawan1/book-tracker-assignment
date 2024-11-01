const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("get book");
});
router.post("/", (req, res) => {
  res.send("post book");
});
router.put("/:id", (req, res) => {
  res.send("put book");
});
router.delete("/:id", (req, res) => {
  res.send("delete book");
});
module.exports = router;