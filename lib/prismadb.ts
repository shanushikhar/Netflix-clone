import { PrismaClient } from "@prisma/client";

// saving prisma in global file(it wont effects in hot reloading), so every hot reloading wont create new prisma instance
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") global.prismadb = client;

export default client;
