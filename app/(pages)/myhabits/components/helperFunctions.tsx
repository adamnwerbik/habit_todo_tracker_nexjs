"use server";

import { createClient } from "@/utils/supabase/server";

export enum categoryHabitEnum {
  binaryYesNo,
  measurable,
}
export type Habit = {
  habitName: string;
  habitDetails?: string;
  repeatsEveryXdays: number;
  type?: categoryHabitEnum;
  strength?: number;
  belongsToUserID?: string;
  isArchived?: boolean;
  firstOccurence?: string;
  latestOccurence?: string;
  category?: categoryEnum;
};

//future
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
