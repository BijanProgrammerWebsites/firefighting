import { ScopeType } from "@/android/(dashboard)/types/scope.type";

export const authKeys = {
  all: ["auth"] as const,
  verify: () => ["auth", "verify"] as const,
};

export const userKeys = {
  all: ["user"] as const,
  one: (userId: string) => ["user", userId] as const,
  create: ["user", "create"] as const,
  edit: ["user", "edit"] as const,
  remove: ["user", "remove"] as const,
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
  detailed: ["refinery", "detailed"] as const,
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

export const equipmentKeys = {
  all: ["equipment"] as const,
  one: (equipmentId: string) => ["equipment", equipmentId] as const,
  create: ["equipment", "create"] as const,
  edit: ["equipment", "edit"] as const,
  remove: ["equipment", "remove"] as const,
  buckets: withScope(["buckets"]),
};

export const inspectionKeys = {
  all: ["inspection"] as const,
  one: (inspectionId: string) => ["inspection", inspectionId] as const,
  create: ["inspection", "create"] as const,
  edit: ["inspection", "edit"] as const,
  remove: ["inspection", "remove"] as const,
};

export const defectKeys = {
  all: ["defect"] as const,
  one: (defectId: string) => ["defect", defectId] as const,
  create: ["defect", "create"] as const,
  edit: ["defect", "edit"] as const,
  remove: ["defect", "remove"] as const,
};

export const dashboardKeys = {
  kpi: withScope(["kpi"]),
  overdue: withScope(["overdue"]),
  defectsBySeverity: withScope(["defectsBySeverity"]),
  defectsAging: withScope(["defectsAging"]),
};

export const mutationKeys = {
  signIn: () => ["auth", "sign-in"] as const,
  signOut: () => ["auth", "sign-out"] as const,
};

function withScope(keys: string[]) {
  return (scope: ScopeType) =>
    [...keys, scope.site?.id, scope.zone?.id, scope.unit?.id] as const;
}
