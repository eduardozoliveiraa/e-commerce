import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb";

export async function getSession() {
  const session = await getServerSession({
    secret: process.env.NEXTAUTH_SECRET,
  });
  return session;
}

export async function getCurrentUser(session: Session) {
  // Verifica se a sessão e o email do usuário estão presentes
  if (!session?.user?.email) {
    return null;
  }

  // Busca o usuário no banco de dados
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // Retorna nulo se o usuário não for encontrado
  if (!currentUser) {
    return null;
  }

  // Retorna um objeto com os detalhes do usuário
 
}

// Tipando as interfaces para melhor legibilidade
interface Session {
  user: {
    email: string;
  };
}

interface User {
  email: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date;
}
