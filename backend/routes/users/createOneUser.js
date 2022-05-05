const bcrypt = require("bcrypt");

module.exports = async function (fastify, opts) {
  fastify.post(
    "/",
    { schema: documentation },
    async function (request, reply) {
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

      const newUser =
        await fastify.prisma.user.create({
          data: {
            name: name,
            firstname: firstname,
            email: email,
            password: hash,
            description: description,
          },
        });
      reply.code(200).send(newUser);
    }
  );
};
const documentation = {
  tags: ["Users"],
  summary: "Create one User",
  description: "Create one user",
};
