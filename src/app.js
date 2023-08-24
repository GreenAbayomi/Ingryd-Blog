const express = require("express");
const authorRouter = require("./routes/authorRoutes");
const postRouter = require("./routes/postRoutes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(express.json({ limit: "100kb" }));

app.use("/api/v1/ingryd/authors", authorRouter);
app.use("/api/v1/ingryd/posts", postRouter);

app.use(errorHandler);

module.exports = app;
