export enum categoryHabitEnum {
  binaryYesNo,
  measurable,
}
export type Habit = {
  name: string;
  type: categoryHabitEnum;
  details?: string;
  strength?: number;
  belongsToUserID?: string;
  isArchived?: boolean;
  firstOccurence?: string;
  latestOccurence?: string;
  category?: categoryEnum;
};

export enum categoryEnum {
  sport,
  learning,
  hobbies,
  social,
  productivity,
  health,
  spiritual,
  relationship,
  work,
}
