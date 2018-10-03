# Endpoints Documentation

# Category: course

## Subcategory: apps

### course.listApps(options)
Gets the list of apps installed into a course

**Inputs:**

* **courseId** – Canvas course Id to query


**Resolves to:** [list of external tools](https://canvas.instructure.com/doc/api/external_tools.html)

<hr>

### course.getApp(options)
Gets info on a single LTI tool

**Inputs:**

* **courseId** – Canvas course Id
* **appId** – The LTI app Id to get


**Resolves to:** [external tool](https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)

<hr>

### course.addApp(options)
Adds an LTI app to a Canvas course

**Inputs:**

* **courseId** – Canvas course Id to install into
* **name** – The app name (for settings app list)
* **launchPrivacy** – 'public' by default
* **key** – Installation consumer key
* **secret** – Installation consumer secret
* **xml** – XML configuration file, standard LTI format
* **description** – A human-readable description of the app


**Resolves to:** [external tool](https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)

<hr>

### course.removeApp(options)
Removes an LTI app from a Canvas course

**Inputs:**

* **courseId** – Canvas course Id to remove app from
* **appId** – The LTI app Id to remove


**Resolves to:** [external tool](https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)

## Subcategory: assignmentGroups

### course.listAssignmentGroups(options)
Lists assignment groups in a course

**Inputs:**

* **courseId** – Canvas course Id to query


**Resolves to:** [list of AssignmentGroups](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

### course.getAssignmentGroup(options)
Gets info on a specific assignment group in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **assignmentGroupId** – Assignment group to get
* **courseId** – Canvas course Id to query


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

### course.updateAssignmentGroup(options)
Updates an assignment group in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **assignmentGroupId** – Assignment group to update
* **name** – New assignment group name<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_
* **weight** – New weight<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

### course.createAssignmentGroup(options)
Create a new assignment group in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **name** – New assignment group name
* **weight** – New weight<br>&nbsp;&nbsp;_- Optional. Defaults to:  0_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

### course.deleteAssignmentGroup(options)
Deletes an assignment group from a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **assignmentGroupId** – Assignment group to delete
* **moveAssignmentsTo** – Assignment group to move assignments to. If this parameter isn't included, assignments in the assignment group will be deleted.<br>&nbsp;&nbsp;_- Optional_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

## Subcategory: assignments

### course.listAssignments(options)
Lists the assignments in a course

**Inputs:**

* **courseId** – Canvas course Id to query


**Resolves to:** [list of Assignments](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

### course.getAssignment(options)
Get info on a specific assignment in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **assignmentId** – Canvas assignment Id


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

### course.updateAssignment(options)
Updates a Canvas assignment

**Inputs:**

* **courseId** – Canvas course Id to query
* **assignmentId** – Canvas assignment Id to update
* **name** – The name of the assignment
* **pointsPossible** – Points possible<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **dueAt** – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **lockAt** – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **unlockAt** – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **description** – html description of the assignment<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **submissionTypes** – Submission type(s)<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **allowedExtensions** – List of allowed file extensions (exclude period). Online upload must be enabled<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **gradingType** – Grading type<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **position** – Position in assignment list<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **published** – If true, publish page upon creation. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **muted** – If true, assignment is muted. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **groupSetId** – Student group set Id<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **assignmentGroupId** – Assignment group Id<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **peerReviewsEnabled** – If true, users asked to submit peer reviews. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **automaticPeerReviewsEnabled** – If true, Canvas will automatically assign peer reviews. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **omitFromFinalGrade** – If true, assignment is omitted from the final grade. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **gradeGroupStudentsIndividually** – If true, students in groups can be given separate grades and when one student in a group gets a grade, other students do not get graded. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

### course.createAssignment(options)
Creates a Canvas assignment

**Inputs:**

* **courseId** – Canvas course Id to create an assignment in
* **name** – The name of the assignment<br>&nbsp;&nbsp;_- Optional. Defaults to:  Unnamed Assignment_
* **pointsPossible** – Points possible<br>&nbsp;&nbsp;_- Optional. Defaults to:  null_
* **dueAt** – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **lockAt** – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **unlockAt** – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **description** – html description of the assignment<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **submissionTypes** – Submission type(s)<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **allowedExtensions** – List of allowed file extensions (exclude period). Online upload must be enabled<br>&nbsp;&nbsp;_- Optional. Defaults to:  any_
* **gradingType** – Grading type<br>&nbsp;&nbsp;_- Optional. Defaults to:  points_
* **position** – Position in assignment list<br>&nbsp;&nbsp;_- Optional. Defaults to:  last_
* **published** – If true, publish page upon creation<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **muted** – If true, assignment is muted<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **groupSetId** – Student group set Id<br>&nbsp;&nbsp;_- Optional. Defaults to:  none/singleton_
* **assignmentGroupId** – Assignment group Id<br>&nbsp;&nbsp;_- Optional. Defaults to:  top assignment group in the course_
* **peerReviewsEnabled** – If true, users asked to submit peer reviews<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **automaticPeerReviewsEnabled** – If true, Canvas will automatically assign peer reviews<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **omitFromFinalGrade** – If true, assignment is omitted from the final grade<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **gradeGroupStudentsIndividually** – If true, students in groups can be given separate grades and when one student in a group gets a grade, other students do not get graded<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

### course.deleteAssignment(options)
Delete an assignment

**Inputs:**

* **courseId** – Canvas course Id
* **assignmentId** – Canvas assignment Id


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

### course.listAssignmentSubmissions(options)
Lists the submissions to a specific assignment in a course

**Inputs:**

* **courseId** – Canvas course Id
* **assignmentId** – The Canvas assignment Id to query
* **includeComments** – If true, includes all comments on submissions<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **includeRubricAssessment** – If true, includes rubric assessments: breakdown of score for each rubric item<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **excludeUser** – If false, includes a submission[i].user value with the submission's user information
* **includeTestStudent** – If true, includes dummy submission by test student (student view) if there is one<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


<hr>

### course.getAssignmentSubmission(options)
Gets a single submission for an assignment

**Inputs:**

* **courseId** – Canvas course Id
* **assignmentId** – The Canvas assignment Id
* **studentId** – The Canvas student Id
* **includeComments** – If true, includes all comments on submissions<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **includeRubricAssessment** – If true, includes rubric assessments: breakdown of score for each rubric item<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **excludeUser** – If false, includes a submission[i].user value with the submission's user information<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


<hr>

### course.createAssignmentSubmission(options)
Submits assignment on behalf of the current user

**Inputs:**

* **courseId** – Canvas course Id
* **assignmentId** – The Canvas assignment Id
* **currentUserId** – The current user's Canvas Id. If not included, we call the current user endpoint<br>&nbsp;&nbsp;_- Optional_
* **submissionType** – Currently supported types: text - html/plain text submission (body must be string) url - web url (body must be string) files - upload file(s) to the submission (body must be filename array)
* **body** – The body of the submission. Depends on submissionType (see above)
* **comment** – A text comment to include<br>&nbsp;&nbsp;_- Optional_


<hr>

### course.listGradeableStudents(options)
List gradeable students for a specific assignment

**Inputs:**

* **courseId** – Canvas course Id to query
* **assignmentId** – Canvas assignment Id to query


<hr>

### course.createAssignmentSubmissionComment(options)
Adds a comment to a submission

**Inputs:**

* **courseId** – Canvas course Id
* **assignmentId** – Canvas course Id
* **studentId** – Canvas student Id of the sub to comment on
* **comment** – The text of the comment


<hr>

### course.createAssignmentSubmissionComment(options)
Adds a comment to a submission

**Inputs:**

* **courseId** – Canvas course Id
* **assignmentId** – Canvas course Id
* **studentId** – Canvas student Id of the sub to comment on
* **comment** – The text of the comment


<hr>

### course.updateAssignmentGrades(options)
Batch updates grades and/or comments. Also supports updating rubric items

**Inputs:**

* **courseId** – Canvas course Id
* **assignmentId** – Canvas course Id
* **gradeItems** – List of grade items to upload to Canvas: [{ studentId: <student id>, points: <optional, points to overwrite with>, comment: <optional, comment to append>, rubricId: <optional, rubric item to upload to> },...]
* **waitForCompletion** – If true, promise won't resolve until Canvas has finished updating the grades, instead of resolving once the grade changes have been queued<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **waitForCompletionTimeout** – The number of minutes to wait before timing out the grade update job<br>&nbsp;&nbsp;_- Optional. Defaults to:  2 mins_
* **dontMergeRubricItemUpdates** – When uploading grades to a rubric item, we intelligently merge rubric item updates with previous rubric assessments. For instance, if the assignment's rubric is: { grammar, argument, formatting } And the student of interest has the following rubric assessment so far: { grammar: 10/10, argument: 8/10, formatting: ungraded } When we upload a new gradeItem (9/10 points) to the student's formatting rubric item, the result is: { grammar: 10/10, argument: 8/10, formatting: 9/10 } However, if dontMergeRubricItemUpdates=true, the result is: { grammar: ungraded, argument: ungraded, formatting: 9/10 } Note: merging is an added feature. By default, the Canvas API does not merge rubric assessments.


## Subcategory: course

### course.getCourse(options)
Gets info on a specific course

**Inputs:**

* **courseId** – Canvas course Id to get info on
* **includeSyllabus** – If truthy, includes syllabus body
* **includeTerm** – If truthy, includes term
* **includeAccount** – If truthy, includes account Id
* **includeDescription** – If truthy, includes public description
* **includeSections** – If truthy, includes sections
* **includeTeachers** – If truthy, includes teachers
* **includeCourseImage** – If truthy, includes the course image
* **includeNeedsGradingCount** – If truthy, includes the number of students who still need to be graded


**Resolves to:** [Course](https://canvas.instructure.com/doc/api/courses.html#Course)

## Subcategory: enrollments

### course.listEnrollments(options)
Gets the list of enrollments in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **types** – list of enrollment types to include: ['student', 'ta', 'teacher', 'designer', 'observer'] Defaults to all types.
* **activeOnly** – If true, only active enrollments included
* **includeAvatar** – If true, avatar_url is included
* **includeGroups** – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<hr>

### course.listStudents(options)
Gets the list of students in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **activeOnly** – If true, only active enrollments included
* **includeAvatar** – If true, avatar_url is included
* **includeGroups** – If true, group_ids is included


<hr>

### course.listTeachingTeamMembers(options)
Gets the list of TAs and Teachers in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **activeOnly** – If true, only active enrollments included
* **includeAvatar** – If true, avatar_url is included
* **includeGroups** – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<hr>

### course.listDesigners(options)
Gets the list of designers in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **activeOnly** – If true, only active enrollments included
* **includeAvatar** – If true, avatar_url is included
* **includeGroups** – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<hr>

### course.listObserver(options)
Gets the list of observers in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **activeOnly** – If true, only active enrollments included
* **includeAvatar** – If true, avatar_url is included
* **includeGroups** – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

## Subcategory: gradebookColumns

### course.listGradebookColumns(options)
Gets the list of custom gradebook columns in a course

**Inputs:**

* **courseId** – Canvas course Id to query


**Resolves to:** [List of CustomColumns](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

### course.updateGradebookColumn(options)
Updates a gradebook column's information

**Inputs:**

* **courseId** – Canvas course ID
* **columnId** – Canvas custom gradebook column ID to query
* **title** – New title for the column<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **position** – New position for the column in the list of custom gradebook columns<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_
* **hidden** – If set, updates whether the custom gradebook column is hidden from everyone. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  previous value_


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

### course.createGradebookColumn(options)
Creates a new gradebook column in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **title** – Title of new custom gradebook column<br>&nbsp;&nbsp;_- Optional. Defaults to:  Untitled Column_
* **position** – Position of the gradebook column within the list of custom gradebook columns<br>&nbsp;&nbsp;_- Optional. Defaults to:  last_
* **hidden** – If true, hides the gradebook column from everyone, not just instructor as usual<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

### course.deleteGradebookColumn(options)
Deletes a gradebook column from a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **columnId** – Gradebook column Id


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

### course.listGradebookColumnEntries(options)
Gets the list of entries in a specific gradebook column in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **columnId** – Gradebook column Id


**Resolves to:** [list of ColumnDatum objects](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum)

<hr>

### course.updateGradebookColumnEntries(options)
Update the list of entries in a specific gradebook column in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **columnId** – Gradebook column Id
* **entries** – list of ColumnDatum objects: `[{user_id: <Canvas User Id>, text: <New Entry Text>}, ...]`
* **waitForCompletion** – If true, waits for completion of batch update request
* **waitForCompletionTimeout** – Number of minutes to wait for completion of batch upload<br>&nbsp;&nbsp;_- Optional. Defaults to:  2_


**Resolves to:** [Progress](https://canvas.instructure.com/doc/api/progress.html#Progress)

## Subcategory: groupSets

### course.listGroupSets(options)
Lists the group sets in the course

**Inputs:**

* **courseId** – Canvas course Id


**Resolves to:** [list of GroupCategories](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

### course.getGroupSet(options)
Gets info on a specific group set

**Inputs:**

* **groupSetId** – Canvas group set Id


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

### course.createGroupSet(options)
Create a group set in a course

**Inputs:**

* **courseId** – Canvas course Id to create a group set in
* **name** – The name of the new group set


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

### course.deleteGroupSet(options)
Deletes a group set

**Inputs:**

* **courseId** – Canvas course Id
* **groupSetId** – Canvas group set Id


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

### course.listGroupSetGroups(options)
Gets the list of groups in a group set

**Inputs:**

* **groupSetId** – Canvas group set Id to query


**Resolves to:** [list of Groups](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

### course.getGroupSetGroup(options)
Gets info on a specific group in a group set (alias to groups.js/getGroup)

**Inputs:**

* **groupSetId** – Canvas group set Id to query


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

### course.createGroupSetGroup(options)
Creates a new group in a group set

**Inputs:**

* **courseId** – Canvas course Id
* **groupSetId** – Canvas group set Id to query
* **name** – Name of the new group<br>&nbsp;&nbsp;_- Optional. Defaults to:  Unnamed Group_
* **description** – Description of the new group<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **isPublic** – If true, group is public<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

### course.deleteGroupSetGroup(options)
Deletes a specific group from a group set

**Inputs:**

* **groupSetId** – Canvas group set Id
* **groupId** – Canvas group Id to delete


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

## Subcategory: groups

### course.getGroup(options)
Gets info on a specific group in a course

**Inputs:**

* **groupId** – Canvas group Id


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

### course.listGroupMembers(options)
Gets the list of members in a group

**Inputs:**

* **groupId** – Canvas group Id


**Resolves to:** [list of Users](https://canvas.instructure.com/doc/api/users.html#User)

<hr>

### course.updateGroupMembers(options)
Gets the list of members in a group

**Inputs:**

* **groupId** – Canvas group Id
* **users** – The list of user objects/user Ids that should be in the group<br>&nbsp;&nbsp;_- Optional. Defaults to:  empty list_


**Resolves to:** [list of Users](https://canvas.instructure.com/doc/api/users.html#User)

## Subcategory: pages

### course.listPages(options)
Gets the list of pages in a course

**Inputs:**

* **courseId** – Canvas course Id to query


**Resolves to:** [list of Pages](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

### course.getPage(options)
Get info on a specific page in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **pageURL** – Canvas page url (just the last part of path)


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

### course.updatePage(options)
Updates a Canvas page

**Inputs:**

* **courseID** – Canvas course ID holding the page to update
* **pageURL** – Canvas page url (just the last part of path)
* **title** – New title of the page<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **body** – New html body of the page<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **editingRoles** – New usertype(s) who can edit<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **notifyOfUpdate** – if true, send notification
* **published** – New publish status of page. Must be a boolean<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **frontPage** – New front page status of page. Must be a boolean (defulat: unchanged)


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

### course.createPage(options)
Creates a new page in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **title** – The title of the page<br>&nbsp;&nbsp;_- Optional. Defaults to:  Untitled Page_
* **body** – html body of the page<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **editingRoles** – usertype(s) who can edit<br>&nbsp;&nbsp;_- Optional. Defaults to:  teachers_
* **notifyOfUpdate** – if true, sends notification
* **published** – if true, publishes page upon creation
* **frontPage** – if true, sets page as front page


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

### course.deletePage(options)
Deletes a page from a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **pageURL** – Page url to delete (just last part of path)


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

## Subcategory: quizzes

### course.listQuizzes(options)
Lists the quizzes in a course

**Inputs:**

* **courseId** – Canvas course Id to query


**Resolves to:** [list of Quizzes](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

### course.getQuiz(options)
Get info on a specific quiz in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **quizId** – Canvas quiz Id (not the quiz's assignment Id)


**Resolves to:** [Quiz](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

### course.listQuizSubmissions(options)
Lists the submissions to a quiz in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **quizId** – Canvas quiz Id (not the quiz's assignment Id)


**Resolves to:** [list of QuizSubmissions](https://canvas.instructure.com/doc/api/quiz_submissions.html)

<hr>

### course.getQuizSubmission(options)
Gets info on a specific submission to a quiz in a course

**Inputs:**

* **courseId** – Canvas course Id to query
* **quizId** – Canvas quiz Id (not the quiz's assignment Id)
* **submissionId** – Canvas quiz submission Id


**Resolves to:** [QuizSubmission](https://canvas.instructure.com/doc/api/quiz_submissions.html)

## Subcategory: sections

### course.listSections(options)
Gets the list of sections in a course

**Inputs:**

* **courseId** – Canvas course Id to query


**Resolves to:** [list of Sections](https://canvas.instructure.com/doc/api/sections.html#Section)

<hr>

### course.getSection(options)
Gets info on a specific section

**Inputs:**

* **courseId** – Canvas course Id to query
* **sectionId** – Section Id to retrieve


**Resolves to:** [Section](https://canvas.instructure.com/doc/api/sections.html#Section)

# Category: user

## Subcategory: course

### user.listCourses(options)
Gets the list of courses associated with the current user

## Subcategory: self

### user.getCurrentUser(options)
Gets info on the current user

