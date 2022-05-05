"use strict";

module.exports = async function (fastify, opts) {
  const documentation = {
    tags: ["Users"],
    summary: "Get all Users",
    description: "Get all Users",
  };
  fastify.get(
    "/",
    {
      schema: documentation,
    },
    async function (request, reply) {
      const users =
        await fastify.prisma.user.findMany();

      return users;
    }
  );
};
