import Unit from "@/admin/(general)/types/unit.type";

type Zone = {
  id: string;
  name: string;
  units: Unit[];
};

export default Zone;
