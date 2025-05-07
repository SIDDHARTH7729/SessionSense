import prisma from '../prisma';
export async function getCurrentUser(clerkId: string): Promise<string | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    return user?.id ?? null;
  } catch (error) {
    console.error("Failed to get user ID from Clerk ID:", error);
    return null;
  }
}
