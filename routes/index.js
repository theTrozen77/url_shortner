const routes = require("express").Router();
const shortnerRoutes = require("./shortnerRoutes");
const codeRoutes = require("./codeRoutes");

routes.use("/shortner", shortnerRoutes);
routes.use("/:codes", codeRoutes);

module.exports = routes;
