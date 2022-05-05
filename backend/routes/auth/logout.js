module.exports = async function (fastify, opts) {
  const documentation = {
    tags: ["Authentification"],
    summary: "Disconnect User",
    description:
      "Disconnect User by deleting JSON WEB TOKEN cookie",
  };
  fastify.post(
    "/logout",
    {
      schema: documentation,
    },
    async function (request, reply) {
      reply
        .clearCookie("token", {
          domain: "localhost",
          path: "/",
          secure: true,
          httpOnly: true,
          signed: true,
        })
        .code(200)
        .send({ message: "User disconnected" });
    }
  );
};
