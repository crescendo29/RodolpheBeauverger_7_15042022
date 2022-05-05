module.exports = async function (fastify, opts) {
  const documentation = {
    tags: ["Users"],
    summary: "Get One User",
    description: "Get One User",
  };
  fastify.get(
    "/:id",
    {
      schema: documentation,
    },
    async function (request, reply) {
      const { id } = request.params;
      const userId = parseInt(id);
      const user =
        await fastify.prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
      return user;
    }
  );
};
