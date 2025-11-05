export interface ClerkWebhookUserData {
  id: string;
  email_addresses: Array<{
    email_address: string;
    id: string;
  }>;
  first_name: string | null;
  last_name: string | null;
  image_url: string;
  created_at: number;
  updated_at: number;
}

export async function handleUserCreated(userData: ClerkWebhookUserData) {
  console.log("User created:", userData.id);
  return { success: true };
}

export async function handleUserUpdated(userData: ClerkWebhookUserData) {
  console.log("User updated:", userData.id);
  return { success: true };
}

export async function handleUserDeleted(userId: string) {
  console.log("User deleted:", userId);
  return { success: true };
}
