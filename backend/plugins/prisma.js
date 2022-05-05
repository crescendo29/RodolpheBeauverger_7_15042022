const fp = require("fastify-plugin");
const Prisma = require("@prisma/client");
const { PrismaClient } = Prisma;

module.exports = fp(async (fastify, opts) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  fastify.decorate("prisma", prisma);

  fastify.addHook("onClose", async (fastify) => {
    await fastify.prisma.$disconnect();
  });
});
