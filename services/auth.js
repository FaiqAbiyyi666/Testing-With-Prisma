const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  login: async (email, password) => {
    try {
      const result = await prisma.user.findUnique({ where: { email } });
      if (!result) throw "Email belum terdaftar";
      if (result.password !== password) throw "Password salah";

      return {
        id: result.id,
        name: result.name,
        email: result.email,
        token: "kelompok3",
      };
    } catch (err) {
      throw err;
    }
  },
};
