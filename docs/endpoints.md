# Endpoints Documentation

# Category: course

## Subcategory: apps

### course.listApps(options)
Gets the list of apps installed into a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of external tools](https://canvas.instructure.com/doc/api/external_tools.html)

<hr>

### course.getApp(options)
Gets info on a single LTI tool

**Inputs:**

* **courseId** [number] – Canvas course Id
* **appId** [number] – The LTI app Id to get


**Resolves to:** [external tool](https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)

<hr>

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

### course.removeApp(options)
Removes an LTI app from a Canvas course

**Inputs:**

* **courseId** [number] – Canvas course Id to remove app from
* **appId** [number] – The LTI app Id to remove


**Resolves to:** [external tool](https://canvas.instructure.com/doc/api/external_tools.html#method.external_tools.show)

## Subcategory: assignmentGroups

### course.listAssignmentGroups(options)
Lists assignment groups in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of AssignmentGroups](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

### course.getAssignmentGroup(options)
Gets info on a specific assignment group in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentGroupId** [number] – Assignment group to get
* **courseId** [number] – Canvas course Id to query


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

### course.updateAssignmentGroup(options)
Updates an assignment group in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentGroupId** [number] – Assignment group to update
* **name** [string] – New assignment group name<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_
* **weight** [number] – New weight<br>&nbsp;&nbsp;_- Optional. Defaults to:  current value_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

### course.createAssignmentGroup(options)
Create a new assignment group in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **name** [string] – New assignment group name
* **weight** [number] – New weight<br>&nbsp;&nbsp;_- Optional. Defaults to:  0_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

<hr>

### course.deleteAssignmentGroup(options)
Deletes an assignment group from a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentGroupId** [number] – Assignment group to delete
* **moveAssignmentsTo** [integer] – Assignment group to move assignments to. If this parameter isn't included, assignments in the assignment group will be deleted.<br>&nbsp;&nbsp;_- Optional_


**Resolves to:** [AssignmentGroup](https://canvas.instructure.com/doc/api/assignment_groups.html#AssignmentGroup)

## Subcategory: assignments

### course.listAssignments(options)
Lists the assignments in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of Assignments](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

### course.getAssignment(options)
Get info on a specific assignment in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentId** [number] – Canvas assignment Id


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

### course.updateAssignment(options)
Updates a Canvas assignment

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentId** [number] – Canvas assignment Id to update
* **name** [string] – The name of the assignment
* **pointsPossible** [number] – Points possible<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **dueAt** [string] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **lockAt** [string] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
* **unlockAt** [string] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  unchanged_
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

### course.createAssignment(options)
Creates a Canvas assignment

**Inputs:**

* **courseId** [number] – Canvas course Id to create an assignment in
* **name** [string] – The name of the assignment<br>&nbsp;&nbsp;_- Optional. Defaults to:  Unnamed Assignment_
* **pointsPossible** [number] – Points possible<br>&nbsp;&nbsp;_- Optional. Defaults to:  null_
* **dueAt** [string] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **lockAt** [string] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
* **unlockAt** [string] – Due at datetime<br>&nbsp;&nbsp;_- Optional. Defaults to:  none_
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

### course.deleteAssignment(options)
Delete an assignment

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – Canvas assignment Id


**Resolves to:** [Assignment](https://canvas.instructure.com/doc/api/assignments.html#Assignment)

<hr>

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

### course.listGradeableStudents(options)
List gradeable students for a specific assignment

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **assignmentId** [number] – Canvas assignment Id to query


<hr>

### course.createAssignmentSubmissionComment(options)
Adds a comment to a submission

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – Canvas course Id
* **studentId** [number] – Canvas student Id of the sub to comment on
* **comment** [string] – The text of the comment


<hr>

### course.createAssignmentSubmissionComment(options)
Adds a comment to a submission

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – Canvas course Id
* **studentId** [number] – Canvas student Id of the sub to comment on
* **comment** [string] – The text of the comment


<hr>

### course.updateAssignmentGrades(options)
Batch updates grades and/or comments. Also supports updating rubric items

**Inputs:**

* **courseId** [number] – Canvas course Id
* **assignmentId** [number] – Canvas course Id
* **gradeItems** [number] – List of grade items to upload to Canvas: [{ studentId: <student id>, points: <optional, points to overwrite with>, comment: <optional, comment to append>, rubricId: <optional, rubric item to upload to> },...]
* **waitForCompletion** [boolean] – If true, promise won't resolve until Canvas has finished updating the grades, instead of resolving once the grade changes have been queued<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_
* **waitForCompletionTimeout** [number] – The number of minutes to wait before timing out the grade update job<br>&nbsp;&nbsp;_- Optional. Defaults to:  2 mins_
* **dontMergeRubricItemUpdates** [boolean] – When uploading grades to a rubric item, we intelligently merge rubric item updates with previous rubric assessments. For instance, if the assignment's rubric is: { grammar, argument, formatting } And the student of interest has the following rubric assessment so far: { grammar: 10/10, argument: 8/10, formatting: ungraded } When we upload a new gradeItem (9/10 points) to the student's formatting rubric item, the result is: { grammar: 10/10, argument: 8/10, formatting: 9/10 } However, if dontMergeRubricItemUpdates=true, the result is: { grammar: ungraded, argument: ungraded, formatting: 9/10 } Note: merging is an added feature. By default, the Canvas API does not merge rubric assessments.


## Subcategory: course

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

## Subcategory: enrollments

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

### course.listStudents(options)
Gets the list of students in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


<hr>

### course.listTeachingTeamMembers(options)
Gets the list of TAs and Teachers in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<hr>

### course.listDesigners(options)
Gets the list of designers in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

<hr>

### course.listObserver(options)
Gets the list of observers in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **activeOnly** [string] – If true, only active enrollments included
* **includeAvatar** [string] – If true, avatar_url is included
* **includeGroups** [string] – If true, group_ids is included


**Resolves to:** [list of Enrollments](https://canvas.instructure.com/doc/api/enrollments.html#Enrollment)

## Subcategory: gradebookColumns

### course.listGradebookColumns(options)
Gets the list of custom gradebook columns in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [List of CustomColumns](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

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

### course.createGradebookColumn(options)
Creates a new gradebook column in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **title** [string] – Title of new custom gradebook column<br>&nbsp;&nbsp;_- Optional. Defaults to:  Untitled Column_
* **position** [number] – Position of the gradebook column within the list of custom gradebook columns<br>&nbsp;&nbsp;_- Optional. Defaults to:  last_
* **hidden** [boolean] – If true, hides the gradebook column from everyone, not just instructor as usual<br>&nbsp;&nbsp;_- Optional. Defaults to:  false_


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

### course.deleteGradebookColumn(options)
Deletes a gradebook column from a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **columnId** [number] – Gradebook column Id


**Resolves to:** [CustomColumn](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#CustomColumn)

<hr>

### course.listGradebookColumnEntries(options)
Gets the list of entries in a specific gradebook column in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **columnId** [number] – Gradebook column Id


**Resolves to:** [list of ColumnDatum objects](https://canvas.instructure.com/doc/api/custom_gradebook_columns.html#ColumnDatum)

<hr>

### course.updateGradebookColumnEntries(options)
Update the list of entries in a specific gradebook column in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **columnId** [number] – Gradebook column Id
* **entries** [array] – list of ColumnDatum objects: `[{user_id: <Canvas User Id>, text: <New Entry Text>}, ...]`
* **waitForCompletion** [boolean] – If true, waits for completion of batch update request
* **waitForCompletionTimeout** [number] – Number of minutes to wait for completion of batch upload<br>&nbsp;&nbsp;_- Optional. Defaults to:  2_


**Resolves to:** [Progress](https://canvas.instructure.com/doc/api/progress.html#Progress)

## Subcategory: groupSets

### course.listGroupSets(options)
Lists the group sets in the course

**Inputs:**

* **courseId** [number] – Canvas course Id


**Resolves to:** [list of GroupCategories](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

### course.getGroupSet(options)
Gets info on a specific group set

**Inputs:**

* **groupSetId** [number] – Canvas group set Id


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

### course.createGroupSet(options)
Create a group set in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to create a group set in
* **name** [string] – The name of the new group set


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

### course.deleteGroupSet(options)
Deletes a group set

**Inputs:**

* **courseId** [number] – Canvas course Id
* **groupSetId** [number] – Canvas group set Id


**Resolves to:** [GroupCategory](https://canvas.instructure.com/doc/api/group_categories.html#GroupCategory)

<hr>

### course.listGroupSetGroups(options)
Gets the list of groups in a group set

**Inputs:**

* **groupSetId** [number] – Canvas group set Id to query


**Resolves to:** [list of Groups](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

### course.getGroupSetGroup(options)
Gets info on a specific group in a group set (alias to groups.js/getGroup)

**Inputs:**

* **groupSetId** [number] – Canvas group set Id to query


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

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

### course.deleteGroupSetGroup(options)
Deletes a specific group from a group set

**Inputs:**

* **groupSetId** [number] – Canvas group set Id
* **groupId** [number] – Canvas group Id to delete


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

## Subcategory: groups

### course.getGroup(options)
Gets info on a specific group in a course

**Inputs:**

* **groupId** [number] – Canvas group Id


**Resolves to:** [Group](https://canvas.instructure.com/doc/api/groups.html#Group)

<hr>

### course.listGroupMembers(options)
Gets the list of members in a group

**Inputs:**

* **groupId** [number] – Canvas group Id


**Resolves to:** [list of Users](https://canvas.instructure.com/doc/api/users.html#User)

<hr>

### course.updateGroupMembers(options)
Gets the list of members in a group

**Inputs:**

* **groupId** [number] – Canvas group Id
* **users** [array] – The list of user objects/user Ids that should be in the group<br>&nbsp;&nbsp;_- Optional. Defaults to:  empty list_


**Resolves to:** [list of Users](https://canvas.instructure.com/doc/api/users.html#User)

## Subcategory: pages

### course.listPages(options)
Gets the list of pages in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of Pages](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

### course.getPage(options)
Get info on a specific page in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **pageURL** [string] – Canvas page url (just the last part of path)


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

<hr>

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

### course.deletePage(options)
Deletes a page from a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **pageURL** [string] – Page url to delete (just last part of path)


**Resolves to:** [Page](https://canvas.instructure.com/doc/api/pages.html#Page)

## Subcategory: quizzes

### course.listQuizzes(options)
Lists the quizzes in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of Quizzes](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

### course.getQuiz(options)
Get info on a specific quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id (not the quiz's assignment Id)


**Resolves to:** [Quiz](https://canvas.instructure.com/doc/api/quizzes.html#Quiz)

<hr>

### course.listQuizSubmissions(options)
Lists the submissions to a quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id (not the quiz's assignment Id)


**Resolves to:** [list of QuizSubmissions](https://canvas.instructure.com/doc/api/quiz_submissions.html)

<hr>

### course.getQuizSubmission(options)
Gets info on a specific submission to a quiz in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **quizId** [number] – Canvas quiz Id (not the quiz's assignment Id)
* **submissionId** [number] – Canvas quiz submission Id


**Resolves to:** [QuizSubmission](https://canvas.instructure.com/doc/api/quiz_submissions.html)

## Subcategory: sections

### course.listSections(options)
Gets the list of sections in a course

**Inputs:**

* **courseId** [number] – Canvas course Id to query


**Resolves to:** [list of Sections](https://canvas.instructure.com/doc/api/sections.html#Section)

<hr>

### course.getSection(options)
Gets info on a specific section

**Inputs:**

* **courseId** [number] – Canvas course Id to query
* **sectionId** [number] – Section Id to retrieve


**Resolves to:** [Section](https://canvas.instructure.com/doc/api/sections.html#Section)

# Category: user

## Subcategory: course

### user.listCourses(options)
Gets the list of courses associated with the current user

## Subcategory: self

### user.getCurrentUser(options)
Gets info on the current user

