import { Difficulty, DifficultyArr } from '../Types/enums';

export const getDifficulty = (difficulty: string) => {
  if (difficulty === Difficulty.Low) return 'Lehká';
  else if (difficulty === Difficulty.Medium) return 'Střední';
  else if (difficulty === Difficulty.Hard) return 'Těžká';
  else return 'Neznámá';
};
