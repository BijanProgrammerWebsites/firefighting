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

export const templateKeys = {
  all: ["template"] as const,
  one: (templateId: string) => ["template", templateId] as const,
  create: ["template", "create"] as const,
  edit: ["template", "edit"] as const,
  remove: ["template", "remove"] as const,
};

export const equipmentKeys = {
  all: ["equipment"] as const,
  one: (equipmentId: string) => ["equipment", equipmentId] as const,
  create: ["equipment", "create"] as const,
  edit: ["equipment", "edit"] as const,
  remove: ["equipment", "remove"] as const,
  buckets: ["buckets"] as const,
};

export const inspectionKeys = {
  all: ["inspection"] as const,
  one: (inspectionId: string) => ["inspection", inspectionId] as const,
  create: ["inspection", "create"] as const,
  edit: ["inspection", "edit"] as const,
  remove: ["inspection", "remove"] as const,
};

export const mutationKeys = {
  signIn: () => ["auth", "sign-in"] as const,
  signUp: () => ["auth", "sign-up"] as const,
  signOut: () => ["auth", "sign-out"] as const,
};
