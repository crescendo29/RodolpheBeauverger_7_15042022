module.exports = async function (fastify, opts) {
  const documentation = {
    tags: ["Users"],
    summary: "Delete User",
    description: "Delete User",
  };
  fastify.delete(
    "/:id",
    {
      schema: documentation,
    },
    async function (request, reply) {
      const { id } = request.params;
      const userId = parseInt(id);
      const deletedUser =
        await fastify.prisma.user.delete({
          where: {
            id: userId,
          },
        });
      return deletedUser;
    }
  );
};
