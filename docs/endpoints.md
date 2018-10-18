<h1 title="Endpoints Documentation"></h1>

<!-- Embedded styles: -->
<style>
/* Invert and add tab style */
h1 {
    border-bottom: solid black 4px;
    text-align: center;
    color: white;
    padding: 0;
    line-height: 1em;
}
h1:before {
    content: attr(title);
    top: 0;
    left: 0;
    text-align: center;
    background-color: black;
    border-radius: 10px 10px 0 0;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
}


/* Remove bottom line for normal h2 */
h2 {
    position: relative;
    border-bottom: 0;
}

/* Add white background to text (to obscure line) */
.horizontalLined:after {
    content: attr(body);
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    padding-right: 10px;
}

/* Style for horizontal line */
.horizontalLined span {
    display: block;
    position: absolute;
    right: 0;
    top: 49%;
    bottom: 49%;
    width: 100%;
    border-bottom: 4px solid #ccc;
}

/* Bootstrap alerts */
.alert {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: center;
}

.alert-heading {
  color: inherit;
}

.alert-link {
  font-weight: 700;
}

.alert-dismissible {
  padding-right: 4rem;
}

.alert-dismissible .close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75rem 1.25rem;
  color: inherit;
}

.alert-primary {
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
}

.alert-primary hr {
  border-top-color: #9fcdff;
}

.alert-primary .alert-link {
  color: #002752;
}

.alert-secondary {
  color: #383d41;
  background-color: #e2e3e5;
  border-color: #d6d8db;
}

.alert-secondary hr {
  border-top-color: #c8cbcf;
}

.alert-secondary .alert-link {
  color: #202326;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.alert-success hr {
  border-top-color: #b1dfbb;
}

.alert-success .alert-link {
  color: #0b2e13;
}

.alert-info {
  color: #0c5460;
  background-color: #d1ecf1;
  border-color: #bee5eb;
}

.alert-info hr {
  border-top-color: #abdde5;
}

.alert-info .alert-link {
  color: #062c33;
}

.alert-warning {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.alert-warning hr {
  border-top-color: #ffe8a1;
}

.alert-warning .alert-link {
  color: #533f03;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.alert-danger hr {
  border-top-color: #f1b0b7;
}

.alert-danger .alert-link {
  color: #491217;
}

.alert-light {
  color: #818182;
  background-color: #fefefe;
  border-color: #fdfdfe;
}

.alert-light hr {
  border-top-color: #ececf6;
}

.alert-light .alert-link {
  color: #686868;
}

.alert-dark {
  color: #1b1e21;
  background-color: #d6d8d9;
  border-color: #c6c8ca;
}

.alert-dark hr {
  border-top-color: #b9bbbe;
}

.alert-dark .alert-link {
  color: #040505;
}

</style>
Usefule endpoint facts:

* Each endpoint accepts an `options` object that contains all inputs as properties.
* Each endpoint returns a promise.
* To call a endpoint, use: `category.funcName(...)`. The subcategory does not affect how you call the endpoint.
* In addition to defined inputs, you can always include any of the following options:
  * `ignoreCache` - If true, endpoint won't return the cached version if it exists.
  * `dontCache` - If true, endpoint response won't be cached.

<h2 body="Table of Contents" class="horizontalLined">Table of Contents<span></span></h2>

**Category: [course](#category-course)**

* Subcategory: [apps](#subcategory-course-apps)
    * [course.listApps(options)](#function-course-apps-listApps
)
    * [course.getApp(options)](#function-course-apps-getApp
)
    * [course.addApp(options)](#function-course-apps-addApp
)
    * [course.removeApp(options)](#function-course-apps-removeApp
)
* Subcategory: [assignmentGroups](#subcategory-course-assignmentGroups)
    * [course.listAssignmentGroups(options)](#function-course-assignmentGroups-listAssignmentGroups
)
    * [course.getAssignmentGroup(options)](#function-course-assignmentGroups-getAssignmentGroup
)
    * [course.updateAssignmentGroup(options)](#function-course-assignmentGroups-updateAssignmentGroup
)
    * [course.createAssignmentGroup(options)](#function-course-assignmentGroups-createAssignmentGroup
)
    * [course.deleteAssignmentGroup(options)](#function-course-assignmentGroups-deleteAssignmentGroup
)
* Subcategory: [assignmentOverrides](#subcategory-course-assignmentOverrides)
    * [course.listAssignmentOverrides(options)](#function-course-assignmentOverrides-listAssignmentOverrides
)
    * [course.getAssignmentOverride(options)](#function-course-assignmentOverrides-getAssignmentOverride
)
    * [course.createAssignmentOverride(options)](#function-course-assignmentOverrides-createAssignmentOverride
)
    * [course.deleteAssignmentOverride(options)](#function-course-assignmentOverrides-deleteAssignmentOverride
)
* Subcategory: [assignments](#subcategory-course-assignments)
    * [course.listAssignments(options)](#function-course-assignments-listAssignments
)
    * [course.getAssignment(options)](#function-course-assignments-getAssignment
)
    * [course.updateAssignment(options)](#function-course-assignments-updateAssignment
)
    * [course.createAssignment(options)](#function-course-assignments-createAssignment
)
    * [course.deleteAssignment(options)](#function-course-assignments-deleteAssignment
)
    * [course.listAssignmentSubmissions(options)](#function-course-assignments-listAssignmentSubmissions
)
    * [course.getAssignmentSubmission(options)](#function-course-assignments-getAssignmentSubmission
)
    * [course.createAssignmentSubmission(options)](#function-course-assignments-createAssignmentSubmission
)
    * [course.listGradeableStudents(options)](#function-course-assignments-listGradeableStudents
)
    * [course.createAssignmentSubmissionComment(options)](#function-course-assignments-createAssignmentSubmissionComment
)
    * [course.updateAssignmentGrades(options)](#function-course-assignments-updateAssignmentGrades
)
* Subcategory: [course](#subcategory-course-course)
    * [course.getCourse(options)](#function-course-course-getCourse
)
* Subcategory: [enrollments](#subcategory-course-enrollments)
    * [course.listEnrollments(options)](#function-course-enrollments-listEnrollments
)
    * [course.listStudents(options)](#function-course-enrollments-listStudents
)
    * [course.listTeachingTeamMembers(options)](#function-course-enrollments-listTeachingTeamMembers
)
    * [course.listDesigners(options)](#function-course-enrollments-listDesigners
)
    * [course.listObservers(options)](#function-course-enrollments-listObservers
)
* Subcategory: [gradebookColumns](#subcategory-course-gradebookColumns)
    * [course.listGradebookColumns(options)](#function-course-gradebookColumns-listGradebookColumns
)
    * [course.getGradebookColumn(options)](#function-course-gradebookColumns-getGradebookColumn
)
    * [course.updateGradebookColumn(options)](#function-course-gradebookColumns-updateGradebookColumn
)
    * [course.createGradebookColumn(options)](#function-course-gradebookColumns-createGradebookColumn
)
    * [course.deleteGradebookColumn(options)](#function-course-gradebookColumns-deleteGradebookColumn
)
    * [course.listGradebookColumnEntries(options)](#function-course-gradebookColumns-listGradebookColumnEntries
)
    * [course.updateGradebookColumnEntries(options)](#function-course-gradebookColumns-updateGradebookColumnEntries
)
* Subcategory: [groupSets](#subcategory-course-groupSets)
    * [course.listGroupSets(options)](#function-course-groupSets-listGroupSets
)
    * [course.getGroupSet(options)](#function-course-groupSets-getGroupSet
)
    * [course.createGroupSet(options)](#function-course-groupSets-createGroupSet
)
    * [course.deleteGroupSet(options)](#function-course-groupSets-deleteGroupSet
)
    * [course.listGroupSetGroups(options)](#function-course-groupSets-listGroupSetGroups
)
    * [course.getGroupSetGroup(options)](#function-course-groupSets-getGroupSetGroup
)
    * [course.createGroupSetGroup(options)](#function-course-groupSets-createGroupSetGroup
)
    * [course.deleteGroupSetGroup(options)](#function-course-groupSets-deleteGroupSetGroup
)
* Subcategory: [groups](#subcategory-course-groups)
    * [course.getGroup(options)](#function-course-groups-getGroup
)
    * [course.listGroupMembers(options)](#function-course-groups-listGroupMembers
)
    * [course.updateGroupMembers(options)](#function-course-groups-updateGroupMembers
)
* Subcategory: [pages](#subcategory-course-pages)
    * [course.listPages(options)](#function-course-pages-listPages
)
    * [course.getPage(options)](#function-course-pages-getPage
)
    * [course.updatePage(options)](#function-course-pages-updatePage
)
    * [course.createPage(options)](#function-course-pages-createPage
)
    * [course.deletePage(options)](#function-course-pages-deletePage
)
* Subcategory: [quizzes](#subcategory-course-quizzes)
    * [course.listQuizzes(options)](#function-course-quizzes-listQuizzes
)
    * [course.getQuiz(options)](#function-course-quizzes-getQuiz
)
    * [course.updateQuiz(options)](#function-course-quizzes-updateQuiz
)
    * [course.createQuiz(options)](#function-course-quizzes-createQuiz
)
    * [course.deleteQuiz(options)](#function-course-quizzes-deleteQuiz
)
    * [course.deleteQuiz(options)](#function-course-quizzes-deleteQuiz
)
    * [course.createMultipleChoiceQuizQuestion(options)](#function-course-quizzes-createMultipleChoiceQuizQuestion
)
    * [course.listQuizSubmissions(options)](#function-course-quizzes-listQuizSubmissions
)
    * [course.getQuizSubmission(options)](#function-course-quizzes-getQuizSubmission
)
* Subcategory: [rubrics](#subcategory-course-rubrics)
    * [course.listRubrics(options)](#function-course-rubrics-listRubrics
)
    * [course.getRubric(options)](#function-course-rubrics-getRubric
)
    * [course.createFreeFormGradingRubricInAssignment(options)](#function-course-rubrics-createFreeFormGradingRubricInAssignment
)
* Subcategory: [sections](#subcategory-course-sections)
    * [course.listSections(options)](#function-course-sections-listSections
)
    * [course.getSection(options)](#function-course-sections-getSection
)


<hr>


**Category: [user](#category-user)**

* Subcategory: [course](#subcategory-user-course)
    * [user.listCourses(options)](#function-user-course-listCourses
)
* Subcategory: [self](#subcategory-user-self)
    * [user.getCurrentUser(options)](#function-user-self-getCurrentUser
)


<a name="category-course"></a>
<h1 title="Category: course"></h1>

<a name="subcategory-course-apps"></a>
## Subcategory: apps

<a name="function-course-apps-listApps
"></a>
### course.listApps(options)
Gets the list of apps installed into a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of external tools](https://canvas.instructure.com/doc/api/external_tools.html)

<hr>

<a name="function-course-apps-getApp
"></a>
### course.getApp(options)
Gets info on a single LTI tool

**Inputs:**

* **courseId** [number] – Canvas course Id
* **appId** [number] – The LTI app Id to get


**Resolves to:** [external tool](https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)

<hr>

<a name="function-course-apps-addApp
"></a>
### course.addApp(options)
Adds an LTI app to a Canvas course

**Inputs:**

* **courseId** [number] – Canvas course Id to install into
* **name** [string] – The app name (for settings app list)
* **launchPrivacy** [string] – 'public' by default
* **key** [string] – Installation consumer key
* **secret** [string] – Installation consumer secret
* **xml** [string] – XML configuration file, standard LTI format
* **description** [string] – A human-readable description of the app


**Resolves to:** [external tool](https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)

<hr>

<a name="function-course-apps-removeApp
"></a>
### course.removeApp(options)
Removes an LTI app from a Canvas course

**Inputs:**

* **courseId** [number] – Canvas course Id to remove app from
* **appId** [number] – The LTI app Id to remove


**Resolves to:** [external tool](https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)

<a name="subcategory-course-assignmentGroups"></a>
<h2 body="Subcategory: assignmentGroups" class="horizontalLined">Subcategory: assignmentGroups<span></span></h2>

<a name="function-course-assignmentGroups-listAssignmentGroups
"></a>
### course.listAssignmentGroups(options)
Lists assignment groups in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of AssignmentGroups](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

<a name="function-course-assignmentGroups-getAssignmentGroup
"></a>
### course.getAssignmentGroup(options)
Gets info on a specific assignment group in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentGroupId** [number] – Assignment group to get
* **courseId** [number] – Canvas course Id to query


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

<a name="function-course-assignmentGroups-updateAssignmentGroup
"></a>
### course.updateAssignmentGroup(options)
Updates an assignment group in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentGroupId** [number] – Assignment group to update
* **name** [string] – New assignment group name<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_
* **weight** [number] – New weight<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

<a name="function-course-assignmentGroups-createAssignmentGroup
"></a>
### course.createAssignmentGroup(options)
Create a new assignment group in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **name** [string] – New assignment group name
* **weight** [number] – New weight<br>&nbsp;&nbsp;_- Optional. Defaults to:  0_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

<a name="function-course-assignmentGroups-deleteAssignmentGroup
"></a>
### course.deleteAssignmentGroup(options)
Deletes an assignment group from a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentGroupId** [number] – Assignment group to delete
* **moveAssignmentsTo** [integer] – Assignment group to move assignments to. If this parameter isn't included, assignments in the assignment group will be deleted.<br>&nbsp;&nbsp;_- Optional_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<a name="subcategory-course-assignmentOverrides"></a>
<h2 body="Subcategory: assignmentOverrides" class="horizontalLined">Subcategory: assignmentOverrides<span></span></h2>

<a name="function-course-assignmentOverrides-listAssignmentOverrides
"></a>
### course.listAssignmentOverrides(options)
Gets the list of overrides for an assignment

**Inputs:**

* **courseId** [number] – Canvas course id to query
* **assignmentId** [number] – Canvas assignment id to look up


**Resolves to:** [list of AssignmentOverrides](https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)

<hr>

<a name="function-course-assignmentOverrides-getAssignmentOverride
"></a>
### course.getAssignmentOverride(options)
Get a specific override on an assignment in a course

**Inputs:**

* **courseId** [number] – Canvas course id to query
* **assignmentId** [number] – Canvas assignment id to query
* **overrideId** [number] – Canvas override id to look up


**Resolves to:** [AssignmentOverride](https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)

<hr>

<a name="function-course-assignmentOverrides-createAssignmentOverride
"></a>
### course.createAssignmentOverride(options)
Create assignment override.

**Inputs:**

* **courseId** [number] – Canvas course id
* **assignmentId** [number] – Canvas assignment id
* **studentIds** [array] – List of Canvas student IDs to override (Note: either studentIds, groupId, or sectionId must be included)
* **groupId** [number] – Group to override, must be a group assignment (Note: either studentIds, groupId, or sectionId must be included)
* **sectionId** [number] – Section to override (Note: either studentIds, groupId, or sectionId must be included)
* **title** [string] – Title of the override<br>&nbsp;&nbsp;_- Optional. Defaults to:  "Override for X students", if studentIds is included_
* **dueAt** [date] – New due date or null to remove due date<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_
* **unlockAt** [date] – New unlock date or null to remove unlock date<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_
* **lockAt** [date] – New lock date or null to remove lock date<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_


**Resolves to:** [AssignmentOverride](https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)

<hr>

<a name="function-course-assignmentOverrides-deleteAssignmentOverride
"></a>
### course.deleteAssignmentOverride(options)
Deletes an assignment override

**Inputs:**

* **courseId** [number] – Canvas course id to query
* **assignmentId** [number] – Canvas assignment id to query
* **overrideId** [number] – Canvas override id to look up


**Resolves to:** [AssignmentOverride](https://canvas.instructure.com/doc/api/assignments.html#AssignmentOverride)

<a name="subcategory-course-assignments"></a>
<h2 body="Subcategory: assignments" class="horizontalLined">Subcategory: assignments<span></span></h2>

<a name="function-course-assignments-listAssignments
"></a>
### course.listAssignments(options)
Lists the assignments in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of Assignments](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

<a name="function-course-assignments-getAssignment
"></a>
### course.getAssignment(options)
Get info on a specific assignment in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentId** [number] – Canvas assignment Id


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

<a name="function-course-assignments-updateAssignment
"></a>
### course.updateAssignment(options)
Updates a Canvas assignment

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentId** [number] – Canvas assignment Id to update
* **name** [string] – The name of the assignment
* **pointsPossible** [number] – Points possible<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **dueAt** [date] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **lockAt** [date] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **unlockAt** [date] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **description** [string] – html description of the assignment<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **submissionTypes** [string] – Submission type(s)<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **allowedExtensions** [string] – List of allowed file extensions (exclude period). Online upload must be enabled<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **gradingType** [string] – Grading type<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **position** [number] – Position in assignment list<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **published** [boolean] – If true, publish page upon creation. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **muted** [boolean] – If true, assignment is muted. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **groupSetId** [number] – Student group set Id<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **assignmentGroupId** [number] – Assignment group Id<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **peerReviewsEnabled** [boolean] – If true, users asked to submit peer reviews. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **automaticPeerReviewsEnabled** [boolean] – If true, Canvas will automatically assign peer reviews. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **omitFromFinalGrade** [boolean] – If true, assignment is omitted from the final grade. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **gradeGroupStudentsIndividually** [boolean] – If true, students in groups can be given separate grades and when one student in a group gets a grade, other students do not get graded. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

<a name="function-course-assignments-createAssignment
"></a>
### course.createAssignment(options)
Creates a Canvas assignment

**Inputs:**

* **courseId** [number] – Canvas course Id to create an assignment in
* **name** [string] – The name of the assignment<br>&nbsp;&nbsp;_- Optional. Defaults to:  Unnamed Assignment_
* **pointsPossible** [number] – Points possible<br>&nbsp;&nbsp;_- Optional. Defaults to:  null_
* **dueAt** [date] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **lockAt** [date] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **unlockAt** [date] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **description** [string] – html description of the assignment<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **submissionTypes** [string] – Submission type(s)<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **allowedExtensions** [string] – List of allowed file extensions (exclude period). Online upload must be enabled<br>&nbsp;&nbsp;_- Optional. Defaults to:  any_
* **gradingType** [string] – Grading type<br>&nbsp;&nbsp;_- Optional. Defaults to:  points_
* **position** [number] – Position in assignment list<br>&nbsp;&nbsp;_- Optional. Defaults to:  last_
* **published** [boolean] – If true, publish page upon creation<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **muted** [boolean] – If true, assignment is muted<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **groupSetId** [number] – Student group set Id<br>&nbsp;&nbsp;_- Optional. Defaults to:  none/singleton_
* **assignmentGroupId** [number] – Assignment group Id<br>&nbsp;&nbsp;_- Optional. Defaults to:  top assignment group in the course_
* **peerReviewsEnabled** [boolean] – If true, users asked to submit peer reviews<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **automaticPeerReviewsEnabled** [boolean] – If true, Canvas will automatically assign peer reviews<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **omitFromFinalGrade** [boolean] – If true, assignment is omitted from the final grade<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **gradeGroupStudentsIndividually** [boolean] – If true, students in groups can be given separate grades and when one student in a group gets a grade, other students do not get graded<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

<a name="function-course-assignments-deleteAssignment
"></a>
### course.deleteAssignment(options)
Delete an assignment

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – Canvas assignment Id


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

<a name="function-course-assignments-listAssignmentSubmissions
"></a>
### course.listAssignmentSubmissions(options)
Lists the submissions to a specific assignment in a course

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – The Canvas assignment Id to query
* **includeComments** [boolean] – If true, includes all comments on submissions<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **includeRubricAssessment** [boolean] – If true, includes rubric assessments: breakdown of score for each rubric item<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **excludeUser** [boolean] – If false, includes a submission[i].user value with the submission's user information
* **includeTestStudent** [boolean] – If true, includes dummy submission by test student (student view) if there is one<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


<hr>

<a name="function-course-assignments-getAssignmentSubmission
"></a>
### course.getAssignmentSubmission(options)
Gets a single submission for an assignment

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – The Canvas assignment Id
* **studentId** [number] – The Canvas student Id
* **includeComments** [boolean] – If true, includes all comments on submissions<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **includeRubricAssessment** [boolean] – If true, includes rubric assessments: breakdown of score for each rubric item<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **excludeUser** [boolean] – If false, includes a submission[i].user value with the submission's user information<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


<hr>

<a name="function-course-assignments-createAssignmentSubmission
"></a>
### course.createAssignmentSubmission(options)
Submits assignment on behalf of the current user

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – The Canvas assignment Id
* **currentUserId** [number] – The current user's Canvas Id. If not included, we call the current user endpoint<br>&nbsp;&nbsp;_- Optional_
* **submissionType** [string] – Currently supported types: text - html/plain text submission (body must be string) url - web url (body must be string) files - upload file(s) to the submission (body must be filename array)
* **body** [object] – The body of the submission. Depends on submissionType (see above)
* **comment** [string] – A text comment to include<br>&nbsp;&nbsp;_- Optional_


<hr>

<a name="function-course-assignments-listGradeableStudents
"></a>
### course.listGradeableStudents(options)
List gradeable students for a specific assignment

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentId** [number] – Canvas assignment Id to query


<hr>

<a name="function-course-assignments-createAssignmentSubmissionComment
"></a>
### course.createAssignmentSubmissionComment(options)
Adds a comment to a submission

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – Canvas course Id
* **studentId** [number] – Canvas student Id of the sub to comment on
* **comment** [string] – The text of the comment


<hr>

<a name="function-course-assignments-updateAssignmentGrades
"></a>
### course.updateAssignmentGrades(options)
Batch updates grades and/or comments. Also supports updating rubric items

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – Canvas course Id
* **gradeItems** [number] – List of grade items to upload to Canvas: [{ studentId: <student id>, points: <optional, points to overwrite with>, comment: <optional, comment to append>, rubricId: <optional, rubric item to upload to> },...]
* **waitForCompletion** [boolean] – If true, promise won't resolve until Canvas has finished updating the grades, instead of resolving once the grade changes have been queued<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **waitForCompletionTimeout** [number] – The number of minutes to wait before timing out the grade update job<br>&nbsp;&nbsp;_- Optional. Defaults to:  2 mins_
* **dontMergeRubricItemUpdates** [boolean] – When uploading grades to a rubric item, we intelligently merge rubric item updates with previous rubric assessments. For instance, if the assignment's rubric is: { grammar, argument, formatting } And the student of interest has the following rubric assessment so far: { grammar: 10/10, argument: 8/10, formatting: ungraded } When we upload a new gradeItem (9/10 points) to the student's formatting rubric item, the result is: { grammar: 10/10, argument: 8/10, formatting: 9/10 } However, if dontMergeRubricItemUpdates=true, the result is: { grammar: ungraded, argument: ungraded, formatting: 9/10 } Note: merging is an added feature. By default, the Canvas API does not merge rubric assessments.


**Resolves to:** [Progress](https://canvas.instructure.com/doc/api/progress.html#Progress)

<a name="subcategory-course-course"></a>
<h2 body="Subcategory: course" class="horizontalLined">Subcategory: course<span></span></h2>

<a name="function-course-course-getCourse
"></a>
### course.getCourse(options)
Gets info on a specific course

**Inputs:**

* **courseId** [number] – Canvas course Id to get info on
* **includeSyllabus** [boolean] – If truthy, includes syllabus body
* **includeTerm** [boolean] – If truthy, includes term
* **includeAccount** [boolean] – If truthy, includes account Id
* **includeDescription** [boolean] – If truthy, includes public description
* **includeSections** [boolean] – If truthy, includes sections
* **includeTeachers** [boolean] – If truthy, includes teachers
* **includeCourseImage** [boolean] – If truthy, includes the course image
* **includeNeedsGradingCount** [boolean] – If truthy, includes the number of students who still need to be graded


**Resolves to:** [Course](https://canvas.instructure.com/doc/api/courses.html#Course)

<a name="subcategory-course-enrollments"></a>
<h2 body="Subcategory: enrollments" class="horizontalLined">Subcategory: enrollments<span></span></h2>

<a name="function-course-enrollments-listEnrollments
"></a>
### course.listEnrollments(options)
Gets the list of enrollments in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **types** [string] – list of enrollment types to include: ['student', 'ta', 'teacher', 'designer', 'observer'] Defaults to all types.
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<hr>

<a name="function-course-enrollments-listStudents
"></a>
### course.listStudents(options)
Gets the list of students in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


<hr>

<a name="function-course-enrollments-listTeachingTeamMembers
"></a>
### course.listTeachingTeamMembers(options)
Gets the list of TAs and Teachers in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<hr>

<a name="function-course-enrollments-listDesigners
"></a>
### course.listDesigners(options)
Gets the list of designers in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<hr>

<a name="function-course-enrollments-listObservers
"></a>
### course.listObservers(options)
Gets the list of observers in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<a name="subcategory-course-gradebookColumns"></a>
<h2 body="Subcategory: gradebookColumns" class="horizontalLined">Subcategory: gradebookColumns<span></span></h2>

<a name="function-course-gradebookColumns-listGradebookColumns
"></a>
### course.listGradebookColumns(options)
Gets the list of custom gradebook columns in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **includeHidden** [boolean] – If true, includes hidden gradebook columns as well.


**Resolves to:** [List of CustomColumns](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

<a name="function-course-gradebookColumns-getGradebookColumn
"></a>
### course.getGradebookColumn(options)
Gets info on a specific gradebook column in a course. This is a simulated endpoint: it does not exist. We are just pulling the list of columns and returning one element.

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **columnId** [number] – Canvas column Id to return
* **isHidden** [boolean] – Must be set to true if the column you're retrieving is a hidden column.


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

<a name="function-course-gradebookColumns-updateGradebookColumn
"></a>
### course.updateGradebookColumn(options)
Updates a gradebook column's information

**Inputs:**

* **courseId** [number] – Canvas course ID
* **columnId** [number] – Canvas custom gradebook column ID to query
* **title** [string] – New title for the column<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **position** [number] – New position for the column in the list of custom gradebook columns<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **hidden** [boolean] – If set, updates whether the custom gradebook column is hidden from everyone. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

<a name="function-course-gradebookColumns-createGradebookColumn
"></a>
### course.createGradebookColumn(options)
Creates a new gradebook column in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **title** [string] – Title of new custom gradebook column<br>&nbsp;&nbsp;_- Optional. Defaults to:  Untitled Column_
* **position** [number] – Position of the gradebook column within the list of custom gradebook columns<br>&nbsp;&nbsp;_- Optional. Defaults to:  last_
* **hidden** [boolean] – If true, hides the gradebook column from everyone, not just instructor as usual<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

<a name="function-course-gradebookColumns-deleteGradebookColumn
"></a>
### course.deleteGradebookColumn(options)
Deletes a gradebook column from a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **columnId** [number] – Gradebook column Id


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

<a name="function-course-gradebookColumns-listGradebookColumnEntries
"></a>
### course.listGradebookColumnEntries(options)
Gets the list of entries in a specific gradebook column in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **columnId** [number] – Gradebook column Id


**Resolves to:** [list of ColumnDatum objects](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum)

<hr>

<a name="function-course-gradebookColumns-updateGradebookColumnEntries
"></a>
### course.updateGradebookColumnEntries(options)
Update the list of entries in a specific gradebook column in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **columnId** [number] – Gradebook column Id
* **entries** [array] – list of ColumnDatum objects: `[{user_id: <Canvas User Id>, text: <New Entry Text>}, ...]`
* **waitForCompletion** [boolean] – If true, waits for completion of batch update request
* **waitForCompletionTimeout** [number] – Number of minutes to wait for completion of batch upload<br>&nbsp;&nbsp;_- Optional. Defaults to:  2_


**Resolves to:** [Progress](https://canvas.instructure.com/doc/api/progress.html#Progress)

<a name="subcategory-course-groupSets"></a>
<h2 body="Subcategory: groupSets" class="horizontalLined">Subcategory: groupSets<span></span></h2>

<a name="function-course-groupSets-listGroupSets
"></a>
### course.listGroupSets(options)
Lists the group sets in the course

**Inputs:**

* **courseId** [number] – Canvas course Id


**Resolves to:** [list of GroupCategories](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

<a name="function-course-groupSets-getGroupSet
"></a>
### course.getGroupSet(options)
Gets info on a specific group set

**Inputs:**

* **groupSetId** [number] – Canvas group set Id


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

<a name="function-course-groupSets-createGroupSet
"></a>
### course.createGroupSet(options)
Create a group set in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to create a group set in
* **name** [string] – The name of the new group set


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

<a name="function-course-groupSets-deleteGroupSet
"></a>
### course.deleteGroupSet(options)
Deletes a group set

**Inputs:**

* **courseId** [number] – Canvas course Id
* **groupSetId** [number] – Canvas group set Id


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

<a name="function-course-groupSets-listGroupSetGroups
"></a>
### course.listGroupSetGroups(options)
Gets the list of groups in a group set

**Inputs:**

* **groupSetId** [number] – Canvas group set Id to query


**Resolves to:** [list of Groups](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

<a name="function-course-groupSets-getGroupSetGroup
"></a>
### course.getGroupSetGroup(options)
Gets info on a specific group in a group set (alias to groups.js/getGroup)

**Inputs:**

* **groupId** [number] – Canvas group Id


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

<a name="function-course-groupSets-createGroupSetGroup
"></a>
### course.createGroupSetGroup(options)
Creates a new group in a group set

**Inputs:**

* **courseId** [number] – Canvas course Id
* **groupSetId** [number] – Canvas group set Id to query
* **name** [string] – Name of the new group<br>&nbsp;&nbsp;_- Optional. Defaults to:  Unnamed Group_
* **description** [string] – Description of the new group<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **isPublic** [boolean] – If true, group is public<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

<a name="function-course-groupSets-deleteGroupSetGroup
"></a>
### course.deleteGroupSetGroup(options)
Deletes a specific group from a group set

**Inputs:**

* **groupSetId** [number] – Canvas group set Id
* **groupId** [number] – Canvas group Id to delete


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<a name="subcategory-course-groups"></a>
<h2 body="Subcategory: groups" class="horizontalLined">Subcategory: groups<span></span></h2>

<a name="function-course-groups-getGroup
"></a>
### course.getGroup(options)
Gets info on a specific group in a course

**Inputs:**

* **groupId** [number] – Canvas group Id


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

<a name="function-course-groups-listGroupMembers
"></a>
### course.listGroupMembers(options)
Gets the list of members in a group

**Inputs:**

* **groupId** [number] – Canvas group Id


**Resolves to:** [list of Users](https://canvas.instructure.com/doc/api/users.html#User)

<hr>

<a name="function-course-groups-updateGroupMembers
"></a>
### course.updateGroupMembers(options)
Gets the list of members in a group

**Inputs:**

* **groupId** [number] – Canvas group Id
* **members** [array] – The list of user objects/user Ids that should be in the group<br>&nbsp;&nbsp;_- Optional. Defaults to:  empty list_


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<a name="subcategory-course-pages"></a>
<h2 body="Subcategory: pages" class="horizontalLined">Subcategory: pages<span></span></h2>

<a name="function-course-pages-listPages
"></a>
### course.listPages(options)
Gets the list of pages in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of Pages](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

<a name="function-course-pages-getPage
"></a>
### course.getPage(options)
Get info on a specific page in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **pageURL** [string] – Canvas page url (just the last part of path)


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

<a name="function-course-pages-updatePage
"></a>
### course.updatePage(options)
Updates a Canvas page

**Inputs:**

* **courseID** [number] – Canvas course ID holding the page to update
* **pageURL** [string] – Canvas page url (just the last part of path)
* **title** [string] – New title of the page<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **body** [string] – New html body of the page<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **editingRoles** [string] – New usertype(s) who can edit<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **notifyOfUpdate** [boolean] – if true, send notification
* **published** [boolean] – New publish status of page. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **frontPage** [boolean] – New front page status of page. Must be a boolean (defulat: unchanged)


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

<a name="function-course-pages-createPage
"></a>
### course.createPage(options)
Creates a new page in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **title** [string] – The title of the page<br>&nbsp;&nbsp;_- Optional. Defaults to:  Untitled Page_
* **body** [string] – html body of the page<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **editingRoles** [string] – usertype(s) who can edit<br>&nbsp;&nbsp;_- Optional. Defaults to:  teachers_
* **notifyOfUpdate** [boolean] – if true, sends notification
* **published** [boolean] – if true, publishes page upon creation
* **frontPage** [boolean] – if true, sets page as front page


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

<a name="function-course-pages-deletePage
"></a>
### course.deletePage(options)
Deletes a page from a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **pageURL** [string] – Page url to delete (just last part of path)


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

<a name="subcategory-course-quizzes"></a>
<h2 body="Subcategory: quizzes" class="horizontalLined">Subcategory: quizzes<span></span></h2>

<a name="function-course-quizzes-listQuizzes
"></a>
### course.listQuizzes(options)
Lists the quizzes in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of Quizzes](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

<a name="function-course-quizzes-getQuiz
"></a>
### course.getQuiz(options)
Get info on a specific quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id (not the quiz's assignment Id)


**Resolves to:** [Quiz](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

<a name="function-course-quizzes-updateQuiz
"></a>
### course.updateQuiz(options)
Updates a specific quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to create the quiz in
* **quizId** [number] – Canvas course Id to create the quiz in
* **suppressNotification** [boolean] – If true, does not notify users that the quiz has been updated
* **title** [string] – New title of the quiz<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **description** [string] – New HTML description of the quiz<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **type** [string] – Quiz type. Allowed values: [ 'practice_quiz', 'assignment', 'graded_survey', 'survey']<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **dueAt** [date] – – Optional. Date the quiz is due<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **lockAt** [date] – – Optional. Date the quiz is lock<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **unlockAt** [date] – – Optional. Date the quiz is unlock<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **published** [boolean] – – Optional. If true, quiz is published<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **allowedAttempts** [number] – Number of times a student is allowed to take the quiz. Set to -1 or 'infinity' for unlimited attempts<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **scoringPolicy** [string] – – Optional. Required and only valid if allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **oneQuestionAtATime** [boolean] – – Optional. If true, shows quiz to student one question at a time. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **cantGoBack** [boolean] – – Optional. If true, shows quiz to student one question at a time. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **accessCode** [string] – – Optional. If defined, restricts access to the quiz only to those with this access code<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **ipFilter** [string] – – Optional. If defined, restricts access to the quiz to computers in a specified IP range. Filters can be a comma-separated list of addresses, or an address followed by a mask<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **assignmentGroupId** [number] – The assignment group to put the quiz into. Only valid if type is "assignment" or "graded_survey"<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **timeLimitMins** [number] – Time limit for the quiz in minutes<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **shuffleAnswers** [boolean] – If true, quiz answers for multiple choice questions will be randomized for each student. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **hideResults** [string] – Allowed values: ['always', 'until_after_last_attempt'], determines whether the student can see their own submission and other results<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **hideCorrectAnswers** [boolean] – Only valid if hideResults is not defined. If true, hides correct answers from students when results are viewed. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **showCorrectAnswersAfterLastAttempt** [boolean] – Only valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If true, hides correct answers from students when quiz results are viewed until they submit the last attempt for the quiz. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **showCorrectAnswersAt** [date] – Only valid if hideCorrectAnswers is not true. If set, correct answers will only be visible after this date<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **hideCorrectAnswersAt** [date] – Only valid if hideCorrectAnswers is not true. If set, correct answers will stop being visible after this date has passed<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **oneTimeResults** [boolean] – Whether students should be prevented from viewing their quiz results past the first time (right after they turn in the quiz)<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **onlyVisibleToOverrides** [boolean] – If true, the quiz is only visible to students with overrides. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_


**Resolves to:** [Quiz](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

<a name="function-course-quizzes-createQuiz
"></a>
### course.createQuiz(options)
Creates a new quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to create the quiz in
* **title** [string] – Title of the new quiz
* **description** [string] – HTML description of the quiz<br>&nbsp;&nbsp;_- Optional. Defaults to:  ''_
* **type** [string] – Quiz type. Allowed values: [ 'practice_quiz', 'assignment', 'graded_survey', 'survey']<br>&nbsp;&nbsp;_- Optional_
* **dueAt** [date] – – Optional. Date the quiz is due<br>&nbsp;&nbsp;_- Optional. Defaults to:  no due date_
* **lockAt** [date] – – Optional. Date the quiz is lock<br>&nbsp;&nbsp;_- Optional. Defaults to:  no lock date_
* **unlockAt** [date] – – Optional. Date the quiz is unlock<br>&nbsp;&nbsp;_- Optional. Defaults to:  no unlock date_
* **published** [boolean] – – Optional. If true, quiz is published<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **allowedAttempts** [number] – Number of times a student is allowed to take the quiz. Set to -1 or 'infinity' for unlimited attempts<br>&nbsp;&nbsp;_- Optional. Defaults to:  1_
* **scoringPolicy** [string] – – Optional. Required and only valid if allowedAttempts > 1. Allowed values: ['keep_highest', 'keep_latest']<br>&nbsp;&nbsp;_- Optional. Defaults to:  'keep_highest'_
* **oneQuestionAtATime** [boolean] – – Optional. If true, shows quiz to student one question at a time<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **cantGoBack** [boolean] – – Optional. If true, shows quiz to student one question at a time<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **accessCode** [string] – – Optional. If defined, restricts access to the quiz only to those with this access code<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **ipFilter** [string] – – Optional. If defined, restricts access to the quiz to computers in a specified IP range. Filters can be a comma-separated list of addresses, or an address followed by a mask<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **assignmentGroupId** [number] – The assignment group to put the quiz into. Only valid if type is "assignment" or "graded_survey"<br>&nbsp;&nbsp;_- Optional. Defaults to:  top assignment group in the course_
* **timeLimitMins** [number] – Time limit for the quiz in minutes<br>&nbsp;&nbsp;_- Optional. Defaults to:  no time limit_
* **shuffleAnswers** [boolean] – If true, quiz answers for multiple choice questions will be randomized for each student<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **hideResults** [string] – Allowed values: ['always', 'until_after_last_attempt'], determines whether the student can see their own submission and other results<br>&nbsp;&nbsp;_- Optional. Defaults to:  results not hidden_
* **hideCorrectAnswers** [boolean] – Only valid if hideResults is not defined. If true, hides correct answers from students when results are viewed<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **showCorrectAnswersAfterLastAttempt** [boolean] – Only valid if hideCorrectAnswers is not true and allowedAttemptes > 1. If true, hides correct answers from students when quiz results are viewed until they submit the last attempt for the quiz<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **showCorrectAnswersAt** [date] – Only valid if hideCorrectAnswers is not true. If set, correct answers will only be visible after this date<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **hideCorrectAnswersAt** [date] – Only valid if hideCorrectAnswers is not true. If set, correct answers will stop being visible after this date has passed<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **oneTimeResults** [boolean] – Whether students should be prevented from viewing their quiz results past the first time (right after they turn in the quiz)<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **onlyVisibleToOverrides** [boolean] – If true, the quiz is only visible to students with overrides<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


**Resolves to:** [Quiz](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

<a name="function-course-quizzes-deleteQuiz
"></a>
### course.deleteQuiz(options)
Deletes a quiz from a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id (not the quiz's assignment Id)


**Resolves to:** [Quiz](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

<a name="function-course-quizzes-deleteQuiz
"></a>
### course.deleteQuiz(options)
Lists quiz questions

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id to query


**Resolves to:** [Quiz](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

<a name="function-course-quizzes-createMultipleChoiceQuizQuestion
"></a>
### course.createMultipleChoiceQuizQuestion(options)
Creates a new multiple choice question to a quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id (not the quiz's assignment Id)
* **name** [string] – Name of the question
* **text** [string] – The text of the question, as displayed to the quiz
* **position** [number] – Position of the question with respect to the other questions in the quiz<br>&nbsp;&nbsp;_- Optional. Defaults to:  last_
* **pointsPossible** [number] – Maximum number of points
* **correctComment** [string] – Comment to display if the student answers correctly<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **incorrectComment** [string] – Comment to display if the student answers incorrectly<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **neutralComment** [string] – Comment to display regardless of how the student answers<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **answers** [array] – Array of answers: [{ text, correct, comment }]


**Resolves to:** [QuizQuestion](https://canvas.instructure.com/doc/api/quiz_questions.html#QuizQuestion)

<hr>

<a name="function-course-quizzes-listQuizSubmissions
"></a>
### course.listQuizSubmissions(options)
Lists the submissions to a quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id (not the quiz's assignment Id)


**Resolves to:** [list of QuizSubmissions](https://canvas.instructure.com/doc/api/quiz_submissions.html)

<hr>

<a name="function-course-quizzes-getQuizSubmission
"></a>
### course.getQuizSubmission(options)
Gets info on a specific submission to a quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id (not the quiz's assignment Id)
* **submissionId** [number] – Canvas quiz submission Id


**Resolves to:** [QuizSubmission](https://canvas.instructure.com/doc/api/quiz_submissions.html)

<a name="subcategory-course-rubrics"></a>
<h2 body="Subcategory: rubrics" class="horizontalLined">Subcategory: rubrics<span></span></h2>

<a name="function-course-rubrics-listRubrics
"></a>
### course.listRubrics(options)
Lists the set of rubrics in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to add the rubric to


**Resolves to:** [list of Rubrics](https://canvas.instructure.com/doc/api/rubrics.html#Rubric)

<hr>

<a name="function-course-rubrics-getRubric
"></a>
### course.getRubric(options)
Gets info on a specific rubric in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to add the rubric to
* **rubricId** [number] – Canvas course Id to add the rubric to
* **include** [boolean] – Allowed values: ['assessments', 'graded_assessments', 'peer_assessments']. If excluded, no assessments will be included<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **assessmentStyle** [string] – Allowed values: ['full','comments_only'] (full = entire assessment, comments_only = only comment part of assessment). Only valid if including assessments<br>&nbsp;&nbsp;_- Optional. Defaults to:  both data and comments are omitted_


**Resolves to:** [Rubric](https://canvas.instructure.com/doc/api/rubrics.html#Rubric)

<hr>

<a name="function-course-rubrics-createFreeFormGradingRubricInAssignment
"></a>
### course.createFreeFormGradingRubricInAssignment(options)
Creates a new rubric for grading with free form comments enabled and add it to an assignment in a course.

**Inputs:**

* **courseId** [number] – Canvas course Id to add the rubric to
* **assignmentId** [number] – Canvas course Id to add the rubric to
* **title** [string] – Title of the new rubric
* **rubricItems** [array] – List of rubric item objects: [{description, longDescription (optional), points}, ...]


**Resolves to:** [Rubric](https://canvas.instructure.com/doc/api/rubrics.html#Rubric)

<div class="alert alert-danger"><strong>Danger: Endpoint Unlisted</strong><br>This endpoint is not documentated, supported by Instructure, or even listed in the Canvas online API docs. It may change, be removed, or completely stop working at any moment.</div>

<a name="subcategory-course-sections"></a>
<h2 body="Subcategory: sections" class="horizontalLined">Subcategory: sections<span></span></h2>

<a name="function-course-sections-listSections
"></a>
### course.listSections(options)
Gets the list of sections in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of Sections](https://canvas.instructure.com/doc/api/sections.html#Section)

<hr>

<a name="function-course-sections-getSection
"></a>
### course.getSection(options)
Gets info on a specific section

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **sectionId** [number] – Section Id to retrieve


**Resolves to:** [Section](https://canvas.instructure.com/doc/api/sections.html#Section)

<a name="category-user"></a>
<h1 title="Category: user"></h1>

<a name="subcategory-user-course"></a>
## Subcategory: course

<a name="function-user-course-listCourses
"></a>
### user.listCourses(options)
Gets the list of courses associated with the current user

<a name="subcategory-user-self"></a>
<h2 body="Subcategory: self" class="horizontalLined">Subcategory: self<span></span></h2>

<a name="function-user-self-getCurrentUser
"></a>
### user.getCurrentUser(options)
Gets info on the current user

