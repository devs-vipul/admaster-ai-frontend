import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  return await currentUser();
}

export async function getUserId(): Promise<string | null> {
  const user = await getCurrentUser();
  return user?.id ?? null;
}

export async function getUserEmail(): Promise<string | null> {
  const user = await getCurrentUser();
  return user?.emailAddresses[0]?.emailAddress ?? null;
}

export async function getUserDetails() {
  const user = await getCurrentUser();

  if (!user) return null;

  return {
    clerkId: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    imageUrl: user.imageUrl,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export interface MongoDBUser {
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  imageUrl: string;

  businesses: string[];
  subscription: {
    plan: "free" | "basic" | "pro" | "enterprise";
    status: "active" | "cancelled" | "past_due";
    currentPeriodEnd?: Date;
  };

  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
