/**
 * Functions for interacting with courses
 * @namespace api.course
 */

// Import shared classes
import EndpointCategory from '../../shared/EndpointCategory';

// Import shared types
import APIConfig from '../../shared/types/APIConfig';
import CanvasCourse from '../../types/CanvasCourse';
import InitPack from '../../shared/types/InitPack';
import CanvasEnrollment from '../../types/CanvasEnrollment';

// Import shared helpers
import utils from '../../shared/helpers/utils';

// Import shared constants
import API_PREFIX from '../../shared/constants/API_PREFIX';

// Import subcategories
import Analytics from './Analytics';
import Announcement from './Announcement';
import App from './App';
import Assignment from './Assignment';
import AssignmentGroup from './AssignmentGroup';
import DiscussionTopic from './DiscussionTopic';
import GradebookColumn from './GradebookColumn';
import Group from './Group';
import GroupSet from './GroupSet';
import NavMenuItem from './NavMenuItem';
import Page from './Page';
import Quiz from './Quiz';
import Rubric from './Rubric';
import Section from './Section';

// Endpoint category
class Course extends EndpointCategory {
  // Sub-categories
  public analytics: Analytics;
  public announcement: Announcement;
  public app: App;
  public assignment: Assignment;
  public assignmentGroup: AssignmentGroup;
  public discussionTopic: DiscussionTopic;
  public gradebookColumn: GradebookColumn;
  public group: Group;
  public groupSet: GroupSet;
  public navMenuItem: NavMenuItem;
  public page: Page;
  public quiz: Quiz;
  public rubric: Rubric;
  public section: Section;

  /**
   * Initialize endpoint category
   * @param initPack package of info for initializing the endpoint category
   */
  constructor(initPack: InitPack) {
    super(initPack);

    // Initialize subcategories
    this.analytics = new Analytics(initPack);
    this.announcement = new Announcement(initPack);
    this.app = new App(initPack);
    this.assignment = new Assignment(initPack);
    this.assignmentGroup = new AssignmentGroup(initPack);
    this.discussionTopic = new DiscussionTopic(initPack);
    this.gradebookColumn = new GradebookColumn(initPack);
    this.group = new Group(initPack);
    this.groupSet = new GroupSet(initPack);
    this.navMenuItem = new NavMenuItem(initPack);
    this.page = new Page(initPack);
    this.quiz = new Quiz(initPack);
    this.rubric = new Rubric(initPack);
    this.section = new Section(initPack);
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to get info on
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
      courseId: number,
      includeSyllabus?: boolean,
      includeTerm?: boolean,
      includeAccount?: boolean,
      includeDescription?: boolean,
      includeSections?: boolean,
      includeTeachers?: boolean,
      includeCourseImage?: boolean,
      includeNeedsGradingCount?: boolean,
    },
    config?: APIConfig,
  ): Promise<CanvasCourse> {
    return this.visitEndpoint({
      config,
      action: 'get info on a specific course',
      path: `${API_PREFIX}/courses/${opts.courseId}`,
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
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
    },
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
      path: `${API_PREFIX}/courses/${opts.courseId}/enrollments`,
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    },
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    },
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    },
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      activeOnly?: boolean,
      includeAvatar?: boolean,
      includeGroups?: boolean,
    },
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
   * @param {number} opts.courseId Canvas course Id to query
   * @param {number} opts.userId Canvas user Id to get
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
      courseId: number,
      userId: number,
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
      path: `${API_PREFIX}/courses/${opts.courseId}/users/${opts.userId}`,
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
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
    },
    config?: APIConfig,
  ) {
    return this.visitEndpoint({
      config,
      action: 'get info on all users in a course',
      path: `${API_PREFIX}/courses/${opts.courseId}/users`,
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    },
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    },
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    },
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    },
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    },
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
   * @param {object} opts object containing all arguments
   * @param {number} opts.courseId Canvas course Id to query
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
      courseId: number,
      includeEmail?: boolean,
      includeEnrollments?: boolean,
      includeLocked?: boolean,
      includeAvatar?: boolean,
      includeBio?: boolean,
    },
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
}

/*------------------------------------------------------------------------*/
/*                                 Export                                 */
/*------------------------------------------------------------------------*/

export default Course;
