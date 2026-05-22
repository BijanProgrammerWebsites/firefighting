import { ScopeType } from "@/android/(dashboard)/types/scope.type";

export function generateScopeTitle(
  scope: ScopeType,
  refineryTitle: string,
): string {
  if (!scope.site) {
    return refineryTitle;
  }

  if (!scope.zone) {
    return scope.site.title;
  }

  if (!scope.unit) {
    return scope.zone.title;
  }

  return scope.unit.title;
}

export function generateScopeParams(scope: ScopeType): string {
  if (!scope.site) {
    return new URLSearchParams().toString();
  }

  if (!scope.zone) {
    return new URLSearchParams({ siteId: scope.site.id }).toString();
  }

  if (!scope.unit) {
    return new URLSearchParams({ zoneId: scope.zone.id }).toString();
  }

  return new URLSearchParams({ unitId: scope.unit.id }).toString();
}
