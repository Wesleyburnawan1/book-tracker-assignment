const express = require("express");
const app = express();
app.get("/", (req, res) => res.json({ msg: "hello" }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`API is running on ${PORT}`));