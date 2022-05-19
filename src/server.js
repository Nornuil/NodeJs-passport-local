const express = require("express");
const path = require("path");
const engine = require("ejs-mate"); //plantillas partials etc para las vistas
const flash = require("connect-flash"); //le da un mensaje de la pagina anterior
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan"); //es para ver las peticiones que el cliente nos presenta en la consola

// initializations
const app = express();
require("./database");
require("./passport/local-auth");

// settings
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev")); //muestra las peticiones desde el front
app.use(express.urlencoded({ extended: false })); //es para recibir los datos de un formulario
app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//para los mensajes
app.use((req, res, next) => {
  app.locals.signinMessage = req.flash("signinMessage");
  app.locals.signupMessage = req.flash("signupMessage");
  app.locals.user = req.user;
  // console.log(app.locals);
  next();
});

// rutas
app.use("/", require("./routes/index"));

// Levanto puerto
app.listen(app.get("port"), () => {
  console.log("server en puerto ", app.get("port"));
});
