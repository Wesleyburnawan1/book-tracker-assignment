const express = require("express");
const connectToMongoDB = require("./config/db-connection");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const booksoute = require("./routes/books");

const app = express();

connectToMongoDB();
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.json({ msg: "hello" }));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/books", booksoute);
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`API is running on ${PORT}`));