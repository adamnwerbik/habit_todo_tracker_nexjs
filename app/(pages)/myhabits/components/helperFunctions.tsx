export interface Habit {
  name: string;
  details?: string;
  strength?: number;
  belongsToUserID?: string;
  isArchived?: boolean;
  firstOccurence?: string;
  latestOccurence?: string;
}
