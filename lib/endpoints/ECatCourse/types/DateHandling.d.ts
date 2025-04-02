/**
 * Two ways to handle dates when performing a course migration.
 * @author Yuen Ler Chow
 */
export declare enum DateHandlingType {
    ShiftDates = "shift-dates",
    RemoveDates = "remove-dates"
}
export declare enum DayOfWeek {
    Sunday = "sunday",
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday"
}
/**
 * Convert DayOfWeek to a number.
 * @author Yuen Ler Chow
 */
export declare const dayOfWeekToNumber: {
    sunday: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
};
/**
 * All the information needed to shift dates.
 * @author Yuen Ler Chow
 */
export type DateShiftOptions = ({
    dateHandling: DateHandlingType.RemoveDates;
} | {
    dateHandling: DateHandlingType.ShiftDates;
    oldStart: Date;
    oldEnd: Date;
    newStart: Date;
    newEnd: Date;
    daySubstitutionMap?: {
        [k in DayOfWeek]: DayOfWeek;
    };
});
