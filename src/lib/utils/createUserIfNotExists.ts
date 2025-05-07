import prisma from "../prisma";

export async function createUserIfNotExists(clerkId: string) {
  try {
    const existingUser = await prisma.user.findUnique({ where: { clerkId } });

    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          clerkId,
        },
      });
      console.log(`New user created with Clerk ID: ${clerkId}`);
      return user.id;
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to sync user');
  }
}
