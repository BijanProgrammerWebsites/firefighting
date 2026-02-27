export const authKeys = {
  all: ["auth"] as const,
  verify: () => ["auth", "verify"] as const,
};

export const userKeys = {
  all: ["user"] as const,
  one: (userId: string) => ["user", userId] as const,
  update: () => ["user", "update"] as const,
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

export const refineryKeys = {
  find: ["refinery"] as const,
  edit: ["refinery", "edit"] as const,
  picture: {
    edit: ["refinery", "picture", "edit"] as const,
    delete: ["refinery", "picture", "delete"],
  },
};

export const siteKeys = {
  all: ["site"] as const,
  one: (siteId: string) => ["site", siteId] as const,
  create: ["site", "create"] as const,
  edit: ["site", "edit"] as const,
  remove: ["site", "remove"] as const,
};

export const zoneKeys = {
  all: ["zone"] as const,
  one: (zoneId: string) => ["zone", zoneId] as const, // برای GET /zones/{id}
  create: ["zone", "create"] as const,
  edit: ["zone", "edit"] as const,
  remove: ["zone", "remove"] as const,
};

export const unitKeys = {
  all: ["unit"] as const,
  one: (unitId: string) => ["unit", unitId] as const,
  create: ["unit", "create"] as const,
  edit: ["unit", "edit"] as const,
  remove: ["unit", "remove"] as const,
};

export const mutationKeys = {
  signIn: () => ["auth", "sign-in"] as const,
  signUp: () => ["auth", "sign-up"] as const,
  signOut: () => ["auth", "sign-out"] as const,
};
