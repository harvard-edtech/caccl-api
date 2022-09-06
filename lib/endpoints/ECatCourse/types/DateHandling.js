"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayOfWeekToNumber = exports.DayOfWeek = exports.DateHandlingType = void 0;
/**
 * Two ways to handle dates when performing a course migration.
 * @author Yuen Ler Chow
 */
var DateHandlingType;
(function (DateHandlingType) {
    DateHandlingType["ShiftDates"] = "shift-dates";
    DateHandlingType["RemoveDates"] = "remove-dates";
})(DateHandlingType = exports.DateHandlingType || (exports.DateHandlingType = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["Sunday"] = "sunday";
    DayOfWeek["Monday"] = "monday";
    DayOfWeek["Tuesday"] = "tuesday";
    DayOfWeek["Wednesday"] = "wednesday";
    DayOfWeek["Thursday"] = "thursday";
    DayOfWeek["Friday"] = "friday";
    DayOfWeek["Saturday"] = "saturday";
})(DayOfWeek = exports.DayOfWeek || (exports.DayOfWeek = {}));
/**
 * Convert DayOfWeek to a number.
 * @author Yuen Ler Chow
 */
exports.dayOfWeekToNumber = (_a = {},
    _a[DayOfWeek.Sunday] = 0,
    _a[DayOfWeek.Monday] = 1,
    _a[DayOfWeek.Tuesday] = 2,
    _a[DayOfWeek.Wednesday] = 3,
    _a[DayOfWeek.Thursday] = 4,
    _a[DayOfWeek.Friday] = 5,
    _a[DayOfWeek.Saturday] = 6,
    _a);
//# sourceMappingURL=DateHandling.js.map