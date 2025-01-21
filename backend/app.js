var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var conteudosRouter = require("./routes/conteudos");
var usuariosRouter = require("./routes/usuarios");
var autenticacaoRouter = require("./routes/autenticacao");

var swaggerUi = require("swagger-ui-express");
var swaggerSpecs = require("./swaggerConfig");

var app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));

app.use("/api/conteudos", conteudosRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/autenticacao", autenticacaoRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

module.exports = app;
