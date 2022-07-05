export enum DateHandlingType {
  ShiftDates = 'shift-dates',
  RemoveDates = 'remove-dates',
}

export enum DayOfWeek {
  Sunday = 'sunday',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
}

export const dayOfWeekToNumber= {
  [DayOfWeek.Sunday]: 0,
  [DayOfWeek.Monday]: 1,
  [DayOfWeek.Tuesday]: 2,
  [DayOfWeek.Wednesday]: 3,
  [DayOfWeek.Thursday]: 4,
  [DayOfWeek.Friday]: 5,
  [DayOfWeek.Saturday]: 6,
};

export type DateShiftOptions = (
    {
      dateHandling: DateHandlingType.RemoveDates,
    }
    | {
      dateHandling: DateHandlingType.ShiftDates,
      oldStart: Date,
      oldEnd: Date,
      newStart: Date,
      newEnd: Date,
      daySubstitutionMap?: {
        [k in DayOfWeek]: DayOfWeek 
      }
    }
)
