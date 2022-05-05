"use strict";

const path = require("path");
const AutoLoad = require("fastify-autoload");

module.exports = async function (fastify, opts) {
  fastify.register(require("@fastify/cookie"));
  fastify.register(require("@fastify/swagger"), {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
      info: {
        title: "Groupomania-api",
        description: `Documentation de l'API Groupomania réseau social d'entreprise`,
      },
    },
    tags: [
      {
        name: "Users",
        description: "Users CRUD",
      },
      {
        name: "Posts",
        description: "Posts CRUD",
      },
    ],
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
