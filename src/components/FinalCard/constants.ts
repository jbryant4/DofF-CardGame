export type CombatStat = {
  max: number;
  current: number;
};

export function getDefaultCombatStat(): CombatStat {
  return {
    max: 0,
    current: 0
  };
}
