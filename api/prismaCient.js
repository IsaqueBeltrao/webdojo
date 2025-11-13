const { PrismaClient } = require('@prisma/client'); // Importa o PrismaClient
const prisma = new PrismaClient();                  // Cria uma instância

module.exports = prisma;                            // Exporta para uso em outros arquivos