/**
 * Functions for interacting with courses
 * @namespace api.course
 */
import EndpointCategory from '../../shared/EndpointCategory';
import APIConfig from '../../shared/types/APIConfig';
import CanvasCourse from '../../types/CanvasCourse';
import InitPack from '../../shared/types/InitPack';
import CanvasEnrollment from '../../types/CanvasEnrollment';
import { DateShiftOptions } from './types/DateHandling';
import ECatAnalytics from './ECatAnalytics';
import ECatAnnouncement from './ECatAnnouncement';
import ECatApp from './ECatApp';
import ECatAssignment from './ECatAssignment';
import ECatAssignmentGroup from './ECatAssignmentGroup';
import ECatDiscussionTopic from './ECatDiscussionTopic';
import ECatFile from './ECatFile';
import ECatFolder from './ECatFolder';
import ECatGradebookColumn from './ECatGradebookColumn';
import ECatGroup from './ECatGroup';
import ECatGroupSet from './ECatGroupSet';
import ECatModule from './ECatModule';
import ECatNavMenuItem from './ECatNavMenuItem';
import ECatPage from './ECatPage';
import ECatQuiz from './ECatQuiz';
import ECatRubric from './ECatRubric';
import ECatSection from './ECatSection';
declare class ECatCourse extends EndpointCategory {
    analytics: ECatAnalytics;
    announcement: ECatAnnouncement;
    app: ECatApp;
    assignment: ECatAssignment;
    assignmentGroup: ECatAssignmentGroup;
    discussionTopic: ECatDiscussionTopic;
    file: ECatFile;
    folder: ECatFolder;
    gradebookColumn: ECatGradebookColumn;
    group: ECatGroup;
    groupSet: ECatGroupSet;
    module: ECatModule;
    navMenuItem: ECatNavMenuItem;
    page: ECatPage;
    quiz: ECatQuiz;
    rubric: ECatRubric;
    section: ECatSection;
    /**
     * Initialize endpoint category
     * @param initPack package of info for initializing the endpoint category
     */
    constructor(initPack: InitPack);
    /**
     * Gets info on a specific course
     * @author Gabe Abrams
     * @method get
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to get info on
     * @param {boolean} [opts.includeSyllabus] If truthy, includes
     *   syllabus body
     * @param {boolean} [opts.includeTerm] If truthy, includes term
     * @param {boolean} [opts.includeAccount] If truthy, includes account
     *   Id
     * @param {boolean} [opts.includeDescription] If truthy, includes
     *   public description
     * @param {boolean} [opts.includeSections] If truthy, includes
     *   sections
     * @param {boolean} [opts.includeTeachers] If truthy, includes
     *   teachers
     * @param {boolean} [opts.includeCourseImage] If truthy, includes the
     *   course image
     * @param {boolean} [opts.includeNeedsGradingCount] If truthy,
     *   includes the number of students who still need to be graded
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasCourse>} Canvas course {@link https://canvas.instructure.com/doc/api/courses.html#Course}
     */
    get(opts?: {
        courseId?: number;
        includeSyllabus?: boolean;
        includeTerm?: boolean;
        includeAccount?: boolean;
        includeDescription?: boolean;
        includeSections?: boolean;
        includeTeachers?: boolean;
        includeCourseImage?: boolean;
        includeNeedsGradingCount?: boolean;
    }, config?: APIConfig): Promise<CanvasCourse>;
    /**
     * Update whether the course is published or not
     * @author Gabe Abrams
     * @method updatePublishState
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to
     *   modify
     * @param {boolean} [opts.isPublished] if true, publish the course. Otherwise,
     *   unpublish the course
     */
    updatePublishState(opts?: {
        courseId?: number;
        isPublished?: boolean;
    }, config?: APIConfig): Promise<CanvasCourse>;
    /**
     * Gets the list of enrollments in a course
     * @author Gabe Abrams
     * @method listEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.types=all] list of enrollment types to include:
     *   ['student', 'ta', 'teacher', 'designer', 'observer']
     *   Defaults to all types.
     * @param {boolean} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {boolean} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    listEnrollments(opts?: {
        courseId?: number;
        types?: ('student' | 'ta' | 'teacher' | 'designer' | 'observer')[];
        activeOnly?: boolean;
        includeAvatar?: boolean;
        includeGroups?: boolean;
    }, config?: APIConfig): Promise<CanvasEnrollment[]>;
    /**
     * Get the list of student enrollments in a course
     * @author Gabe Abrams
     * @method listStudentEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {string} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {string} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    listStudentEnrollments(opts?: {
        courseId?: number;
        activeOnly?: boolean;
        includeAvatar?: boolean;
        includeGroups?: boolean;
    }, config?: APIConfig): Promise<CanvasEnrollment[]>;
    /**
     * Gets the list of TAs and Teacher enrollments in a course
     * @author Gabe Abrams
     * @method listTeachingTeamMemberEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {string} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {string} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    listTeachingTeamMemberEnrollments(opts?: {
        courseId?: number;
        activeOnly?: boolean;
        includeAvatar?: boolean;
        includeGroups?: boolean;
    }, config?: APIConfig): Promise<CanvasEnrollment[]>;
    /**
     * Gets the list of designer enrollments in a course
     * @author Gabe Abrams
     * @method listDesignerEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {string} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {string} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    listDesignerEnrollments(opts?: {
        courseId?: number;
        activeOnly?: boolean;
        includeAvatar?: boolean;
        includeGroups?: boolean;
    }, config?: APIConfig): Promise<CanvasEnrollment[]>;
    /**
     * Gets the list of observer enrollments in a course
     * @author Gabe Abrams
     * @method listObserverEnrollments
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {string} [opts.includeAvatar] If truthy, avatar_url is
     *   included
     * @param {string} [opts.includeGroups] If truthy, group_ids is
     *   included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasEnrollment[]>} list of Canvas Enrollments {@link https://canvas.instructure.com/doc/api/enrollments.html#Enrollment}
     */
    listObserverEnrollments(opts?: {
        courseId?: number;
        activeOnly?: boolean;
        includeAvatar?: boolean;
        includeGroups?: boolean;
    }, config?: APIConfig): Promise<CanvasEnrollment[]>;
    /**
     * Gets info on a specific user in a course
     * @author Gabe Abrams
     * @method getUser
     * @memberof api.course
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} opts.userId Canvas user Id to get
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser>} Canvas user {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    getUser(opts: {
        userId: number;
        courseId?: number;
        includeEmail?: boolean;
        includeEnrollments?: boolean;
        includeLocked?: boolean;
        includeAvatar?: boolean;
        includeBio?: boolean;
    }, config?: APIConfig): Promise<any>;
    /**
     * Gets info on all users in a course
     * @author Gabe Abrams
     * @method listUsers
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.types=all] list of enrollment types to include:
     *   ['student', 'ta', 'teacher', 'designer', 'observer']
     *   Defaults to all types.
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} Canvas users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    listUsers(opts?: {
        courseId?: number;
        types?: ('student' | 'ta' | 'teacher' | 'designer' | 'observer')[];
        includeEmail?: boolean;
        includeEnrollments?: boolean;
        includeLocked?: boolean;
        includeAvatar?: boolean;
        includeBio?: boolean;
    }, config?: APIConfig): Promise<any>;
    /**
     * Gets the list of students in a course
     * @author Gabe Abrams
     * @method listStudents
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    listStudents(opts?: {
        courseId?: number;
        includeEmail?: boolean;
        includeEnrollments?: boolean;
        includeLocked?: boolean;
        includeAvatar?: boolean;
        includeBio?: boolean;
    }, config?: APIConfig): Promise<any>;
    /**
     * Gets the list of TAs and Teachers in a course
     * @author Gabe Abrams
     * @method listTeachingTeamMembers
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    listTeachingTeamMembers(opts?: {
        courseId?: number;
        includeEmail?: boolean;
        includeEnrollments?: boolean;
        includeLocked?: boolean;
        includeAvatar?: boolean;
        includeBio?: boolean;
    }, config?: APIConfig): Promise<any>;
    /**
     * Gets the list of TAs in a course
     * @author Gabe Abrams
     * @method listTAs
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    listTAs(opts?: {
        courseId?: number;
        includeEmail?: boolean;
        includeEnrollments?: boolean;
        includeLocked?: boolean;
        includeAvatar?: boolean;
        includeBio?: boolean;
    }, config?: APIConfig): Promise<any>;
    /**
     * Gets the list of teachers in a course
     * @author Gabe Abrams
     * @method listTeachers
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    listTeachers(opts?: {
        courseId?: number;
        includeEmail?: boolean;
        includeEnrollments?: boolean;
        includeLocked?: boolean;
        includeAvatar?: boolean;
        includeBio?: boolean;
    }, config?: APIConfig): Promise<any>;
    /**
     * Gets the list of designers in a course
     * @author Gabe Abrams
     * @method listDesigners
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    listDesigners(opts?: {
        courseId?: number;
        includeEmail?: boolean;
        includeEnrollments?: boolean;
        includeLocked?: boolean;
        includeAvatar?: boolean;
        includeBio?: boolean;
    }, config?: APIConfig): Promise<any>;
    /**
     * Gets the list of observers in a course
     * @author Gabe Abrams
     * @method listObservers
     * @memberof api.course
     * @instance
     * @async
     * @param {object} [opts] object containing all arguments
     * @param {number} [opts.courseId=default course id] Canvas course Id to query
     * @param {string} [opts.activeOnly] If truthy, only active
     *   enrollments included
     * @param {boolean} [opts.includeEmail] If true, user email is included
     * @param {boolean} [opts.includeEnrollments] If true, user's enrollments
     *   in this course are included
     * @param {boolean} [opts.includeLocked] If true, includes whether this
     *   enrollment is locked
     * @param {boolean} [opts.includeAvatar] If true, user avatar url is
     *   included
     * @param {boolean} [opts.includeBio] If true, user bio is included
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     *   call (overwrites defaults that were included when api was initialized)
     * @returns {Promise<CanvasUser[]>} list of Canvas Users {@link https://canvas.instructure.com/doc/api/users.html#User}
     */
    listObservers(opts?: {
        courseId?: number;
        includeEmail?: boolean;
        includeEnrollments?: boolean;
        includeLocked?: boolean;
        includeAvatar?: boolean;
        includeBio?: boolean;
    }, config?: APIConfig): Promise<any>;
    /**
     * Perform a course content migration
     * @author Yuen Ler Chow
     * @method migrateContent
     * @memberof api.course
     * @instance
     * @async
     * @param {object} opts object containing all arguments
     * @param {number} [opts.sourceCourseId=default course id] Canvas course Id of
     *   the source course
     * @param {number} opts.destinationCourseId Canvas course Id of the
     *   destination course
     * @param {object} opts.include object containing all items and their ids to
     *   include
     * @param {number[]} [opts.include.fileIds = []] list of file ids to include
     * @param {number[]} [opts.include.quizIds = []] list of quiz ids to include
     * @param {number[]} [opts.include.assignmentIds = []] list of assignment ids
     *   to include
     * @param {number[]} [opts.include.announcementIds = []] list of announcement
     *   ids to include
     * @param {number[]} [opts.include.discussionIds = []] list of discussion ids
     *   to include
     * @param {number[]} [opts.include.moduleIds = []] list of module ids to
     *   include
     * @param {number[]} [opts.include.pageIds = []] list of page ids to include
     * @param {number[]} [opts.include.rubricIds = []] list of rubric ids to
     *   include
     * @param {DateShiftOptions} opts.dateShiftOptions options for shifting dates
     * @param {number} [opts.timeoutMs = 5 minutes] maximum time in milliseconds
     *   to wait for course migration to finish
     * @param {APIConfig} [config] custom configuration for this specific endpoint
     */
    migrateContent(opts: {
        sourceCourseId: number;
        destinationCourseId: number;
        include: {
            fileIds?: number[];
            quizIds?: number[];
            assignmentIds?: number[];
            announcementIds?: number[];
            discussionTopicsIds?: number[];
            moduleIds?: number[];
            pageIds?: number[];
            rubricIds?: number[];
        };
        dateShiftOptions: DateShiftOptions;
        timeoutMs?: number;
    }): Promise<void>;
}
export default ECatCourse;
