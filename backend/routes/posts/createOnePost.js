module.exports = async function (fastify, opts) {
  const documentation = {
    tags: ["Posts"],
    summary: "Create one Post",
    description: "Create one Post",
  };
  fastify.post(
    "/",
    {
      schema: documentation,
      // preValidation: [fastify.auth],
    },
    async function (request, reply) {
      const { title, content } = request.body;
      const { userId } = fastify.jwt.decode(
        request.cookies.token
      );

      const newPost =
        await fastify.prisma.post.create({
          data: {
            title: title,
            content: content,
            authorId: userId,
          },
        });
      reply.code(200).send(newPost);

      return {
        message: "Post Successfully created",
      };
    }
  );
};
