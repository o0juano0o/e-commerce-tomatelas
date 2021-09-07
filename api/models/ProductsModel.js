const S = require("sequelize");
const db = require("../db");

class Product extends S.Model {}

Product.init(
  {
    name: {
      type: S.STRING,
    },
    volume: {
      //CUANTO TIENE CADA LATA O BOTELLA
      type: S.STRING,
    },
    category: {
      //A RESOLVER LOS TIPOS
      type: S.STRING,
    },
    brand: {
      //MARCA
      type: S.STRING,
    },
    stock: {
      //CANTIDAD EN BASE A UNIDAD DE VENTA EJEMPLO 1 PACK DE 6 REPRESENTA 1
      type: S.INTEGER,
    },
    img: {
      //URL A CONSUMIR O VER COMO LO HACEMOS
      type: S.STRING,
    },
    description: {
      type: S.STRING,
    },
  },

  { sequelize: db, modelName: "products" }
);

//hooks

module.exports = Product;
