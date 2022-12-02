import { Difficulty, DifficultyArr, Status } from '../Types/enums';

export const getDifficulty = (difficulty: string) => {
  if (difficulty === Difficulty.Low) return 'Lehká';
  else if (difficulty === Difficulty.Medium) return 'Střední';
  else if (difficulty === Difficulty.Hard) return 'Těžká';
  else return 'Neznámá';
};

export const getStatus = (status: string) => {
  if (status === Status.Active) return 'Připraveno';
  else if (status === Status.Progress) return 'Probíhá';
  else if (status === Status.Completed) return 'Dokončeno';
  else return 'Neznámý';
};
