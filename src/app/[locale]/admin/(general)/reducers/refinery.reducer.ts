import Refinery from "@/admin/(general)/types/refinery.type";

type ActionType =
  | { type: "set_name"; payload: string }
  | { type: "set_logo"; payload: string }
  | { type: "added_site"; payload: string }
  | { type: "updated_site"; payload: { id: string; name: string } }
  | { type: "deleted_site"; payload: string }
  | { type: "added_zone"; payload: { siteId: string; name: string } }
  | { type: "updated_zone"; payload: { id: string; name: string } }
  | { type: "deleted_zone"; payload: string }
  | { type: "added_unit"; payload: { zoneId: string; name: string } }
  | { type: "updated_unit"; payload: { id: string; name: string } }
  | { type: "deleted_unit"; payload: string };

function RefineryReducer(state: Refinery, action: ActionType): Refinery {
  switch (action.type) {
    case "set_name":
      return { ...state, name: action.payload };

    case "set_logo":
      return { ...state, logo: action.payload };

    case "added_site":
      return {
        ...state,
        sites: [
          ...state.sites,
          { id: crypto.randomUUID(), name: action.payload, zones: [] },
        ],
      };

    case "updated_site":
      return {
        ...state,
        sites: state.sites.map((site) =>
          site.id === action.payload.id
            ? { ...site, name: action.payload.name }
            : site,
        ),
      };

    case "deleted_site":
      return {
        ...state,
        sites: state.sites.filter((s) => s.id !== action.payload),
      };

    // ---------- Zone Actions ----------
    case "added_zone": {
      const { siteId, name } = action.payload;
      return {
        ...state,
        sites: state.sites.map((site) =>
          site.id === siteId
            ? {
                ...site,
                zones: [
                  ...site.zones,
                  { id: crypto.randomUUID(), name, units: [] },
                ],
              }
            : site,
        ),
      };
    }

    case "updated_zone": {
      const { id, name } = action.payload;
      return {
        ...state,
        sites: state.sites.map((site) => ({
          ...site,
          zones: site.zones.map((zone) =>
            zone.id === id ? { ...zone, name } : zone,
          ),
        })),
      };
    }

    case "deleted_zone": {
      const zoneId = action.payload;
      return {
        ...state,
        sites: state.sites.map((site) => ({
          ...site,
          zones: site.zones.filter((zone) => zone.id !== zoneId),
        })),
      };
    }

    // ---------- Unit Actions ----------
    case "added_unit": {
      const { zoneId, name } = action.payload;
      return {
        ...state,
        sites: state.sites.map((site) => ({
          ...site,
          zones: site.zones.map((zone) =>
            zone.id === zoneId
              ? {
                  ...zone,
                  units: [...zone.units, { id: crypto.randomUUID(), name }],
                }
              : zone,
          ),
        })),
      };
    }

    case "updated_unit": {
      const { id, name } = action.payload;
      return {
        ...state,
        sites: state.sites.map((site) => ({
          ...site,
          zones: site.zones.map((zone) => ({
            ...zone,
            units: zone.units.map((unit) =>
              unit.id === id ? { ...unit, name } : unit,
            ),
          })),
        })),
      };
    }

    case "deleted_unit": {
      const unitId = action.payload;
      return {
        ...state,
        sites: state.sites.map((site) => ({
          ...site,
          zones: site.zones.map((zone) => ({
            ...zone,
            units: zone.units.filter((unit) => unit.id !== unitId),
          })),
        })),
      };
    }

    default:
      return state;
  }
}

export default RefineryReducer;
