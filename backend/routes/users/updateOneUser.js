const bcrypt = require("bcrypt");

module.exports = async function (fastify, opts) {
  const documentation = {
    tags: ["Users"],
    summary: "Update User",
    description: "Update User",
  };
  fastify.put(
    "/:id",
    {
      schema: documentation,
    },
    async function (request, reply) {
      const { id } = request.params;
      const userId = parseInt(id);
      const {
        name,
        firstname,
        email,
        password,
        description,
      } = request.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(
        password,
        salt
      );

      const updatedUser =
        await fastify.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name: name,
            firstname: firstname,
            email: email,
            password: hash,
            description: description,
          },
        });
      reply.code(200).send(updatedUser);
    }
  );
};
