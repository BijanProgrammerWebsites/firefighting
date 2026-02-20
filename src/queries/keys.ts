export const authKeys = {
  all: ["auth"] as const,
  verify: () => ["auth", "verify"] as const,
};

export const userKeys = {
  all: ["user"] as const,
  one: (userId: string) => ["user", userId] as const,
};

export const mutationKeys = {
  signIn: () => ["auth", "sign-in"] as const,
  signUp: () => ["auth", "sign-up"] as const,
  signOut: () => ["auth", "sign-out"] as const,
};
