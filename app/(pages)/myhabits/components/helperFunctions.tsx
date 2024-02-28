export interface Habit {
  name: string;
  details?: string;
  strength?: number;
  belongsToUserID?: string;
  isArchived?: boolean;
  firstOccurence?: string;
  latestOccurence?: string;
  category?: categoryEnum;
}

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
