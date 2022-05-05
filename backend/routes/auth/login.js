const bcrypt = require("bcrypt");

module.exports = async function (fastify, opts) {
  const documentation = {
    tags: ["Authentification"],
    summary: "Connect User",
    description:
      "Connect User with httpOnly JSON WEB TOKEN cookie and authUser cookie",
  };
  fastify.post(
    "/login",
    { schema: documentation },
    async function (request, reply) {
      const { email, password } = request.body;

      const user =
        await fastify.prisma.user.findUnique({
          where: {
            email: email,
          },
        });

      if (!user)
        throw fastify.unauthorized(
          "User not found"
        );

      const token = await reply.jwtSign({
        userId: user.id,
      });

      if (
        !bcrypt.compareSync(
          password,
          user.password
        )
      )
        throw fastify.unauthorized(
          "wrong password"
        );

      const authUser = {
        id: user.id,
        userName: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      reply
        .setCookie("token", token, {
          domain: "localhost",
          path: "/",
          secure: true,
          httpOnly: true,
          signed: true,
        })
        .setCookie(
          "authUser",
          JSON.stringify(authUser),
          {
            domain: "localhost",
            path: "/",
            secure: true,
            httpOnly: false,
            signed: true,
          }
        )
        .code(200)
        .send(authUser);
    }
  );
};
