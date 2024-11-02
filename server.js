const express = require("express");
const connectToMongoDB = require("./config/db-connection");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const booksoute = require("./routes/books");
const path = require("path");

const app = express();

connectToMongoDB();
app.use(express.json({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/books", booksoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`API is running on ${PORT}`));
