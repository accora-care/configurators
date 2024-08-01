export interface ChairType {
  type: string;
  width: number;
  height: number;
  depth: number;
}

export const chairTypes: ChairType[] = [
  {
    type: "Configura Comfort Extra Small",
    width: 16,
    height: 16,
    depth: 18,
  },
  { type: "Configura Comfort Small", width: 18, height: 16, depth: 18 },
  {
    type: "Configura Comfort Small Tall",
    width: 18,
    height: 18,
    depth: 20,
  },
  { type: "Configura Comfort Medium", width: 20, height: 18, depth: 20 },
  {
    type: "Configura Comfort Medium Low Profile",
    width: 20,
    height: 16,
    depth: 20,
  },
  { type: "Configura Comfort Large", width: 22, height: 18, depth: 20 },
  {
    type: "Configura Comfort Large Low Profile",
    width: 22,
    height: 16,
    depth: 20,
  },
  { type: "Configura Mediatric", width: 24, height: 16, depth: 20 },
  { type: "Configura Mediatric", width: 26, height: 16, depth: 20 },
];