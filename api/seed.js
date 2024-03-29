const faker = require("faker");
const User = require("./models/UsersModel");
const Product = require("./models/ProductsModel");
const Category = require("./models/CategoryModel");
const data = require("./utils/Productos");
const db = require("./db");
const { Op } = require("sequelize");
require("./models/index");

const users = [];
for (let i = 0; i < 10; i++) {
  users.push({
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.name.findName(),
    LastName: faker.name.lastName(),
    gender: faker.name.gender(),
    password: faker.internet.password(),
    street: faker.address.streetAddress(),
    province: faker.address.state(),
    city: faker.address.city(),
    zipcode: faker.address.zipCode(),
    phone: faker.phone.phoneNumber(),
  });
}
const admin = {
  userName: "admin",
  email: "admin@gmail.com",
  firstName: "admin",
  LastName: "admin",
  gender: "admin",
  password: "$2b$16$y.E7pYNTKmuDjiNR.1s/LuxyOcC707LN38l30tN9QOQjNvB8up4Jy",
  street: "admin",
  province: "admin",
  city: "admin",
  zipcode: "admin",
  phone: "admin",
  salt: "$2b$16$y.E7pYNTKmuDjiNR.1s/Lu",
  isAdmin: true,
};
users.push(admin);

const categories = [
  { category_name: "Cervezas" },
  { category_name: "Gaseosas" },
  { category_name: "Aguas" },
  { category_name: "Aguas Saborizadas" },
  { category_name: "Bebidas Energizantes" },
  { category_name: "Bebidas Isotónicas" },
  { category_name: "Vinos" },
  { category_name: "Leches" },
];

db.sync({ force: false })
  .then(() => {
    console.log("Conexion Establecida...");
  })
  .then(() => {
    User.bulkCreate(users)
      .then(() => console.log("users create succesfully"))
      .catch(() => console.log("error withe users creation"));
  })
  .then(() => {
    Product.bulkCreate(data)
      .then(() => console.log("products create succesfully"))
      .catch(() => console.log("error with products create"));
  })
  .then(() => {
    Category.bulkCreate(categories)
      .then(() => console.log("categories create succesfully"))
      .catch(() => console.log("error with categories create"));
  })
  .then(async () => {
    Product.findAll({
      where: { name: { [Op.substring]: "Cerveza" } },
    }).then((cervezas) => {
      Category.findOne({ where: { category_name: "Cervezas" } }).then(
        (category) => category.addProducts(cervezas)
      );
    });

    Product.findAll({
      where: { name: { [Op.substring]: "Vino" } },
    }).then((vinos) => {
      Category.findOne({ where: { category_name: "Vinos" } }).then((category) =>
        category.addProducts(vinos)
      );
    });

    Product.findAll({
      where: { name: { [Op.substring]: "Gaseosa" } },
    }).then((gaseosas) => {
      Category.findOne({ where: { category_name: "Gaseosas" } }).then(
        (category) => category.addProducts(gaseosas)
      );
    });

    Product.findAll({
      where: {
        name: { [Op.startsWith]: "Agua", [Op.notILike]: "%Saborizada%" },
      },
    }).then((aguas) => {
      Category.findOne({ where: { category_name: "Aguas" } }).then((category) =>
        category.addProducts(aguas)
      );
    });

    Product.findAll({
      where: {
        name: { [Op.substring]: "Agua Saborizada" },
      },
    }).then((aguasSaborizadas) => {
      Category.findOne({ where: { category_name: "Aguas Saborizadas" } }).then(
        (category) => category.addProducts(aguasSaborizadas)
      );
    });
    Product.findAll({
      where: {
        name: { [Op.substring]: "isotónica" },
      },
    }).then((isotonicas) => {
      Category.findOne({ where: { category_name: "Bebidas Isotónicas" } }).then(
        (category) => category.addProducts(isotonicas)
      );
    });
    Product.findAll({
      where: { name: { [Op.substring]: "Energizante" } },
    }).then((energizantes) => {
      Category.findOne({
        where: { category_name: "Bebidas Energizantes" },
      }).then((category) => category.addProducts(energizantes));
    });

    Product.findAll({
      where: {
        name: { [Op.substring]: "Bebida vegetal" },
      },
    }).then((leches) => {
      Category.findOne({
        where: { category_name: "Leches" },
      }).then((category) => category.addProducts(leches));
    });
  });
