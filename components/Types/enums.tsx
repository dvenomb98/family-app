export enum Difficulty {
  Hard = 'HARD',
  Medium = 'MEDIUM',
  Low = 'LOW',
}

export enum Status {
  Active = 'Active',
  Progress = 'Progress',
  Completed = 'Completed',
}

export enum FilterByTime {
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
}

export const StatusArr = [
  { label: 'Připraveno', value: Status.Active },
  { label: 'Probíhá', value: Status.Progress },
  { label: 'Hotovo', value: Status.Completed },
];

export const DifficultyArr = [
  { label: 'Lehká', value: Difficulty.Low },
  { label: 'Střední', value: Difficulty.Medium },
  { label: 'Těžká', value: Difficulty.Hard },
];

export const TimeArr = [
  { label: 'Od nejnovějších', value: FilterByTime.Newest },
  { label: 'Od nejstarších', value: FilterByTime.Oldest },
];
