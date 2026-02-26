export const authKeys = {
  all: ["auth"] as const,
  verify: () => ["auth", "verify"] as const,
};

export const userKeys = {
  all: ["user"] as const,
  one: (userId: string) => ["user", userId] as const,
};

export const standardKeys = {
  all: ["standard"] as const,
  one: (standardId: string) => ["standard", standardId] as const,
  create: ["standard", "create"] as const,
  edit: ["standard", "edit"] as const,
  remove: ["standard", "remove"] as const,
};

export const mutationKeys = {
  signIn: () => ["auth", "sign-in"] as const,
  signUp: () => ["auth", "sign-up"] as const,
  signOut: () => ["auth", "sign-out"] as const,
};
