const mongoose = require("mongoose");
const { mongodb } = require("./keys");

try {
  mongoose.connect(mongodb.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Base de datos online");
} catch (error) {
  console.log(error);
  throw new Error("Error en iniciar la base de datos");
}
