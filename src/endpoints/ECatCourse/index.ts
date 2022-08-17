/**
 * Functions for interacting with courses
 * @namespace api.course
 */

// Import shared classes
import CACCLError from 'caccl-error';
import ErrorCode from '../../shared/types/ErrorCode';
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasCourse from '../../types/CanvasCourse';
import InitPack from '../../shared/types/InitPack';
import CanvasEnrollment from '../../types/CanvasEnrollment';
import { DateHandlingType, dayOfWeekToNumber, DateShiftOptions } from './types/DateHandling';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Import subcategories
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

// Endpoint category
class ECatCourse extends EndpointCategory {
  // Sub-categories
  public analytics: ECatAnalytics;
  public announcement: ECatAnnouncement;
  public app: ECatApp;
  public assignment: ECatAssignment;
  public assignmentGroup: ECatAssignmentGroup;
  public discussionTopic: ECatDiscussionTopic;
  public file: ECatFile;
  public folder: ECatFolder;
  public gradebookColumn: ECatGradebookColumn;
  public group: ECatGroup;
  public groupSet: ECatGroupSet;
  public module: ECatModule;
  public navMenuItem: ECatNavMenuItem;
  public page: ECatPage;
  public quiz: ECatQuiz;
  public rubric: ECatRubric;
  public section: ECatSection;

  /**
   * Initialize endpoint category
   * @param initPack package of info for initializing the endpoint category
   */
  constructor(initPack: InitPack) {
    super(initPack);

    // Initialize subcategories
    this.analytics = new ECatAnalytics(initPack);
    this.announcement = new ECatAnnouncement(initPack);
    this.app = new ECatApp(initPack);
    this.assignment = new ECatAssignment(initPack);
    this.assignmentGroup = new ECatAssignmentGroup(initPack);
    this.discussionTopic = new ECatDiscussionTopic(initPack);
    this.file = new ECatFile(initPack);
    this.folder = new ECatFolder(initPack);
    this.gradebookColumn = new ECatGradebookColumn(initPack);
    this.group = new ECatGroup(initPack);
    this.groupSet = new ECatGroupSet(initPack);
    this.module = new ECatModule(initPack);
    this.navMenuItem = new ECatNavMenuItem(initPack);
    this.page = new ECatPage(initPack);
    this.quiz = new ECatQuiz(initPack);
    this.rubric = new ECatRubric(initPack);
    this.section = new ECatSection(initPack);
  }

  /*------------------------------------------------------------------------*/
  /*                                 Course                                 */
  /*------------------------------------------------------------------------*/

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
  public async get(
    opts: {
      courseId?: number,
      includeSyllabus?: boolean,
      includeTerm?: boolean,
      includeAccount?: boolean,
      includeDescription?: boolean,
      includeSections?: boolean,
      includeTeachers?: boolean,
      includeCourseImage?: boolean,
      includeNeedsGradingCount?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasCourse> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          syllabus_body: opts.includeSyllabus,
          term: opts.includeTerm,
          account: opts.includeAccount,
          public_description: opts.includeDescription,
          sections: opts.includeSections,
          teachers: opts.includeTeachers,
          course_image: opts.includeCourseImage,
          needs_grading_count: opts.includeNeedsGradingCount,
        }),
      },
    });
  }

  /*------------------------------------------------------------------------*/
  /*                               Enrollments                              */
  /*------------------------------------------------------------------------*/

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
  public async listEnrollments(
    opts: {
      courseId?: number,
      types?: (
        'student'
        | 'ta'
        | 'teacher'
        | 'designer'
        | 'observer'
      )[],
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasEnrollment[]> {
    // Create empty flexible params object
    const params: { [k: string]: any } = {};

    // Pre-process enrollment types
    if (opts.types) {
      params.type = opts.types.map((type) => {
        if (type.includes('Enrollment')) {
          return type;
        }
        return `${type.charAt(0).toUpperCase()}${type.substring(1)}Enrollment`;
      });
    }

    // Filter to only active
    if (opts.activeOnly) {
      params.state = ['active'];
    }

    // Include avatar
    if (opts.includeAvatar) {
      params.include = ['avatar_url'];
    }

    // Include groups
    if (opts.includeGroups) {
      if (!params.include) {
        params.include = [];
      }
      params.include.push('group_ids');
    }

    return this.visitEndpoint({
      config,
      action: 'get enrollments from a course',
      params,
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/enrollments`,
      method: 'GET',
    });
  }

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
  public async listStudentEnrollments(
    opts: {
      courseId?: number,
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasEnrollment[]> {
    return this.api.course.listEnrollments(
      {
        ...opts,
        types: ['student'],
      },
      config,
    );
  }

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
  public async listTeachingTeamMemberEnrollments(
    opts: {
      courseId?: number,
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasEnrollment[]> {
    return this.api.course.listEnrollments(
      {
        ...opts,
        types: ['ta', 'teacher'],
      },
      config,
    );
  }

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
  public async listDesignerEnrollments(
    opts: {
      courseId?: number,
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasEnrollment[]> {
    return this.api.course.listEnrollments(
      {
        ...opts,
        types: ['designer'],
      },
      config,
    );
  }

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
  public async listObserverEnrollments(
    opts: {
      courseId?: number,
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    } = {},
    config?: APIConfig,
  ): Promise<CanvasEnrollment[]> {
    return this.api.course.listEnrollments(
      {
        ...opts,
        types: ['observer'],
      },
      config,
    );
  }

  /*------------------------------------------------------------------------*/
  /*                                  Users                                 */
  /*------------------------------------------------------------------------*/

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
  public async getUser(
    opts: {
      userId: number,
      courseId?: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    },
    config?: APIConfig,
  ) {
    return this.visitEndpoint({
      config,
      action: 'get info on a user in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/users/${opts.userId}`,
      method: 'GET',
      params: {
        include: utils.genIncludesList({
          email: opts.includeEmail,
          enrollments: opts.includeEnrollments,
          locked: opts.includeLocked,
          avatar_url: opts.includeAvatar,
          bio: opts.includeBio,
        }),
      },
    });
  }

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
  public async listUsers(
    opts: {
      courseId?: number,
      types?: (
        'student'
        | 'ta'
        | 'teacher'
        | 'designer'
        | 'observer'
      )[],
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    } = {},
    config?: APIConfig,
  ) {
    return this.visitEndpoint({
      config,
      action: 'get info on all users in a course',
      path: `${API_PREFIX}/courses/${opts.courseId ?? this.defaultCourseId}/users`,
      method: 'GET',
      params: {
        enrollment_type: opts.types,
        include: utils.genIncludesList({
          email: opts.includeEmail,
          enrollments: opts.includeEnrollments,
          locked: opts.includeLocked,
          avatar_url: opts.includeAvatar,
          bio: opts.includeBio,
        }),
      },
    });
  }

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
  public async listStudents(
    opts: {
      courseId?: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    } = {},
    config?: APIConfig,
  ) {
    return this.api.course.listUsers(
      {
        ...opts,
        types: ['student'],
      },
      config,
    );
  }

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
  public async listTeachingTeamMembers(
    opts: {
      courseId?: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    } = {},
    config?: APIConfig,
  ) {
    return this.api.course.listUsers(
      {
        ...opts,
        types: ['ta', 'teacher'],
      },
      config,
    );
  }

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
  public async listTAs(
    opts: {
      courseId?: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    } = {},
    config?: APIConfig,
  ) {
    return this.api.course.listUsers(
      {
        ...opts,
        types: ['ta'],
      },
      config,
    );
  }

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
  public async listTeachers(
    opts: {
      courseId?: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    } = {},
    config?: APIConfig,
  ) {
    return this.api.course.listUsers(
      {
        ...opts,
        types: ['teacher'],
      },
      config,
    );
  }

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
  public async listDesigners(
    opts: {
      courseId?: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    } = {},
    config?: APIConfig,
  ) {
    return this.api.course.listUsers(
      {
        ...opts,
        types: ['designer'],
      },
      config,
    );
  }

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
  public async listObservers(
    opts: {
      courseId?: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    } = {},
    config?: APIConfig,
  ) {
    return this.api.course.listUsers(
      {
        ...opts,
        types: ['observer'],
      },
      config,
    );
  }

  /*------------------------------------------------------------------------*/
  /*                               Migrations                               */
  /*------------------------------------------------------------------------*/

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
   * @param {number} opts.destinationCourse Canvas course Id of the destination
   *   course
   * @param {object} opts.include object containing all items and their ids to include
   * @param {number[]} [opts.include.fileIds = []] list of file ids to include
   * @param {number[]} [opts.include.quizIds = []] list of quiz ids to include
   * @param {number[]} [opts.include.assignmentIds = []] list of assignment ids to include
   * @param {number[]} [opts.include.announcementIds = []] list of announcement ids to include
   * @param {number[]} [opts.include.discussionIds = []] list of discussion ids to include
   * @param {number[]} [opts.include.moduleIds = []] list of module ids to include
   * @param {number[]} [opts.include.pageIds = []] list of page ids to include
   * @param {number[]} [opts.include.rubricIds = []] list of rubric ids to include
   * @param {DateShiftOptions} opts.dateShiftOptions options for shifting dates
   * @param {number} [opts.timeoutMs = 5 minutes] maximum time in milliseconds to wait for course migration to finish
   * @param {APIConfig} [config] custom configuration for this specific endpoint
   */
  public async migrateContent(
    opts: {
      sourceCourseId: number,
      destinationCourseId: number,
      include: {
        fileIds?: number[],
        quizIds?: number[],
        assignmentIds?: number[],
        announcementIds?: number[],
        discussionTopicsIds?: number[],
        moduleIds?: number[],
        pageIds?: number[],
        rubricIds?: number[],
      },
      dateShiftOptions: DateShiftOptions,
      timeoutMs?: number,
    },
  ) {
    const {
      sourceCourseId,
      destinationCourseId,
      include,
      dateShiftOptions,
      timeoutMs = 300000, // 5 minutes
    } = opts;

    // if the user didn't specify the ids for an item, just make it an empty array
    const {
      fileIds = [],
      quizIds = [],
      assignmentIds = [],
      announcementIds = [],
      discussionTopicsIds = [],
      moduleIds = [],
      pageIds = [],
      rubricIds = [],
    } = include;

    // Create a params object that we'll dynamically fill with params depending on the request
    const params: { [k: string]: any } = {
      migration_type: 'course_copy_importer',
      settings: {
        source_course_id: sourceCourseId,
        overwrite_quizzes: true,
        // move_to_assignment_group_id: 198434,
      },
    };

    // Add selected ids to the request
    params.select = {
      files: fileIds,
      quizzes: quizIds,
      assignments: assignmentIds,
      announcements: announcementIds,
      discussion_topics: discussionTopicsIds,
      modules: moduleIds,
      pages: pageIds,
      rubrics: rubricIds,
    };

    // if we remove dates we don't need to provide start and end dates, but if we shift dates, we do
    if (dateShiftOptions.dateHandling === DateHandlingType.RemoveDates) {
      params.date_shift_options = {
        remove_dates: true,
      };
    } else if (dateShiftOptions.dateHandling === DateHandlingType.ShiftDates) {
      const {
        oldStart,
        oldEnd,
        newStart,
        newEnd,
        daySubstitutionMap = {},
      } = dateShiftOptions;

      // Translate input (day week map) to number-based params that Canvas uses
      const dayNumberSubstitutionMap: { [k: number]: number } = {};
      Object.keys(daySubstitutionMap).forEach((k) => {
        const key = k as keyof typeof daySubstitutionMap;
        dayNumberSubstitutionMap[dayOfWeekToNumber[key]] = dayOfWeekToNumber[daySubstitutionMap[key]];
      });

      // Add date shift info to the request
      params.date_shift_options = {
        shift_dates: true,
        old_start_date: oldStart,
        old_end_date: oldEnd,
        new_start_date: newStart,
        new_end_date: newEnd,
        day_substitutions: dayNumberSubstitutionMap,
      };
    }

    // iterate through each assignment and change the name to be current name + [id]
    assignmentIds.forEach(async (id) => {
      const { name } = await this.api.course.assignment.get({
        assignmentId: id,
        courseId: sourceCourseId,
      });
      this.api.course.assignment.update({
        assignmentId: id,
        courseId: sourceCourseId,
        name: `${name}#CurrentlyBeingMigrated#${id}`,
      });
    });

    // Create the migration
    try {
      const contentMigration = await this.visitEndpoint({
        path: `${API_PREFIX}/courses/${destinationCourseId}/content_migrations`,
        action: 'perform a course content migration',
        method: 'POST',
        params,
      });

      // Initialize status variables that are updated on each check
      let workflowState = 'running';
      let migrationIssuesCount = 0;

      const CHECK_INTERVAL_MS = 500;
      // Calculate num iterations
      const numIterations = Math.ceil(timeoutMs / CHECK_INTERVAL_MS);

      // continuously check every CHECK_INTERVAL_MS if the migration is finished, failed, or timed out
      for (let i = 0; i < numIterations; i++) {
        // Wait for CHECK_INTERVAL_MS
        await new Promise((resolve) => {
          setTimeout(resolve, CHECK_INTERVAL_MS);
        });
        // Go to the api endpoint to get the status of the content migration
        const status = await this.visitEndpoint({
          path: `${API_PREFIX}/courses/${destinationCourseId}/content_migrations/${contentMigration.id}`,
          action: 'check the status of a content migration',
          method: 'GET',
        });
        workflowState = status.workflow_state;
        migrationIssuesCount = status.migration_issues_count;

        // If the workflow is no longer running, end the loop
        if (workflowState === 'completed' || workflowState === 'failed') {
          break;
        }
      }
      // Detect a timeout (if the workflow never left the pending state)
      if (workflowState !== 'completed' && workflowState !== 'failed') {
        throw new CACCLError({
          message: 'Migration timed out',
          code: ErrorCode.MigrationTimeout,
        });
      }

      if (migrationIssuesCount > 0) {
        // Go to the api endpoint to get a list of migration issues
        const migrationIssues = await this.visitEndpoint({
          path: `${API_PREFIX}/courses/${destinationCourseId}/content_migrations/${contentMigration.id}/migration_issues`,
          action: 'get migration issues',
          method: 'GET',
        });

        let errorsAsText: string;
        // If there is only 1 issue, we simply print the issue.
        // If there is more than 1, we need to concatenate these issues with commas + ands
        if (migrationIssuesCount === 1) {
          errorsAsText = migrationIssues[0].description;
        } else if (migrationIssuesCount === 2) {
          errorsAsText = `${migrationIssues[0].description} and ${migrationIssues[1].description}`;
        } else {
          errorsAsText = (
            migrationIssues
            // Extract only the descriptions and add "and" to last item
              .map((migrationIssue: any, i: number) => {
                if (i === migrationIssues.length - 1) {
                  return `and ${migrationIssue.description}`;
                }
                return migrationIssue.description;
              })
            // Put together
              .join(', ')
          );
        }

        const errorMessage = `We ran into an error while migrating your course content: ${errorsAsText}.`;

        throw new CACCLError({
          message: errorMessage,
          code: ErrorCode.MigrationIssue,
        });
      }
    } catch (err) {
      if (err instanceof CACCLError) {
        // Rethrow the error (it's already in the right format)
        throw err;
      }
      // An unknown error occurred. Throw a new error
      throw new CACCLError({
        message: err,
        code: ErrorCode.MigrationIssue,
      });
    }
    let sourceAssignments = await this.api.course.assignment.list({
      courseId: sourceCourseId,
    });
    // filter sourceAssignments to only those that were migrated
    sourceAssignments = sourceAssignments.filter((assignment) => { return assignmentIds.includes(assignment.id); });

    const destinationAssignments = await this.api.course.assignment.list({
      courseId: destinationCourseId,
    });

    // mapping source group id to destination group id
    const assignmentGroupMap: { [k: number]: number } = {};

    // mapping source assignment id to destination assignment id
    const assignmentMap: { [k: number]: number } = {};
    // iterate through each source assignment to determine the mapping
    sourceAssignments.forEach((sourceAssignment) => {
      const destinationAssignment = destinationAssignments.find((assignment) => {
        return assignment.name === sourceAssignment.name;
      });
      if (destinationAssignment) {
        assignmentMap[sourceAssignment.id] = destinationAssignment.id;
      } else {
        throw new CACCLError({
          message: 'Could not find a migrated assignment in the destination course.',
          code: ErrorCode.MigrationIssue,
        });
      }
    });

    // iterate through each assignment group in the source course and
    // create the same assignment group in the destination course
    const sourceAssignmentGroups = await this.api.course.assignmentGroup.list({
      courseId: sourceCourseId,
    });
    const sourceAssignmentGroupIds = sourceAssignmentGroups.map((group) => { return group.id; });
    for (let i = 0; i < sourceAssignmentGroupIds.length; i++) {
      const sourceId = sourceAssignmentGroupIds[i];
      const sourceAssignmentGroup = await this.api.course.assignmentGroup.get({
        assignmentGroupId: sourceId,
        courseId: sourceCourseId,
      });
      // check if apply_assignment_group_weights is true in the source course
      const sourceCourse = await this.visitEndpoint({
        path: `${API_PREFIX}/courses/${sourceCourseId}`,
        action: 'get source course',
        method: 'GET',
      });
      const applyAssignmentGroupWeights = sourceCourse.apply_assignment_group_weights;
      // TODO: check if the assignment group name already exists in the destination course,
      // in which we case we do not create a new assignment group
      // instead, get the id of this matching assignment group and update weights if needed
      // and also add this assignment group to the map
      let destinationAssignmentGroup;
      if (applyAssignmentGroupWeights) {
        destinationAssignmentGroup = await this.api.course.assignmentGroup.create({
          courseId: destinationCourseId,
          name: sourceAssignmentGroup.name,
          weight: sourceAssignmentGroup.group_weight,
        });
      } else {
        destinationAssignmentGroup = await this.api.course.assignmentGroup.create({
          courseId: destinationCourseId,
          name: sourceAssignmentGroup.name,
        });
      }
      // set apply_assignment_group_weights to true/false in the destination course
      await this.visitEndpoint({
        path: `${API_PREFIX}/courses/${destinationCourseId}`,
        action: 'set apply_assignment_group_weights to true',
        method: 'PUT',
        params: {
          course: {
            apply_assignment_group_weights: applyAssignmentGroupWeights,
          },
        },
      });

      // add the mapping to the map
      assignmentGroupMap[sourceId] = destinationAssignmentGroup.id;
    }

    // iterate through each source assignment
    sourceAssignments.forEach(async (sourceAssignment: any) => {
      // Get the assignment group id of the assignment
      const assignmentGroupId = sourceAssignment.assignment_group_id;
      const destinationAssignmentGroupId = assignmentGroupMap[assignmentGroupId];
      // throw an error if the assignment group id is not in the map
      if (!destinationAssignmentGroupId) {
        throw new CACCLError({
          message: 'Could not find assignment group id in map',
          code: ErrorCode.MigrationIssue,
        });
      }
      // determine the id of the assignment in the new course by using the map
      const destinationAssignmentId = assignmentMap[sourceAssignment.id];
      // throw an error if the assignment id is not in the map
      if (!destinationAssignmentId) {
        throw new CACCLError({
          message: 'Could not find assignment id in map',
          code: ErrorCode.MigrationIssue,
        });
      }

      const parts = sourceAssignment.name.split('#');
      const tag = parts[parts.length - 1];
      const originalAssignmentName = sourceAssignment.name.substring(0, sourceAssignment.name.length - (`#CurrentlyBeingMigrated#${tag}`).length);
      // Update the assignment group id of the assignment and remove the tag from the name in the destination course
      await this.api.course.assignment.update({
        courseId: destinationCourseId,
        assignmentId: destinationAssignmentId,
        assignmentGroupId: destinationAssignmentGroupId,
        name: originalAssignmentName,
      });

      // remove tag from name in original course
      await this.api.course.assignment.update({
        courseId: sourceCourseId,
        assignmentId: sourceAssignment.id,
        name: originalAssignmentName,
      });
    });

    // iterate through the source assignment groups and update the drop rules in the destination groups
    sourceAssignmentGroupIds.forEach(async (sourceId) => {
      const sourceAssignmentGroup = await this.api.course.assignmentGroup.get({
        assignmentGroupId: sourceId,
        courseId: sourceCourseId,
      });
      // use map to find destination assignment group id
      const destinationAssignmentGroupId = assignmentGroupMap[sourceId];

      // use the assignment map to map ids in sourceAssignmentGroup.rules.never_drop
      let destinationNeverDrop: number[] = [];
      if (sourceAssignmentGroup.rules.never_drop) {
        destinationNeverDrop = sourceAssignmentGroup.rules.never_drop.map(
          (id: number) => { return assignmentMap[id]; },
        );
      }

      // update destination assignment group
      await this.api.course.assignmentGroup.update({
        courseId: destinationCourseId,
        assignmentGroupId: destinationAssignmentGroupId,
        dropLowest: sourceAssignmentGroup.rules.drop_lowest,
        dropHighest: sourceAssignmentGroup.rules.drop_highest,
        neverDrop: destinationNeverDrop,
      });
    });
  }
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default ECatCourse;
