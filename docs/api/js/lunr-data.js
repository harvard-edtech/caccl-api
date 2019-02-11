window.lunrData = {
  "index": {
    "version": "1.0.0",
    "fields": [
      {
        "name": "longname",
        "boost": 1000
      },
      {
        "name": "name",
        "boost": 500
      },
      {
        "name": "tags",
        "boost": 300
      },
      {
        "name": "kind",
        "boost": 110
      },
      {
        "name": "title",
        "boost": 100
      },
      {
        "name": "summary",
        "boost": 70
      },
      {
        "name": "description",
        "boost": 50
      },
      {
        "name": "body",
        "boost": 1
      }
    ],
    "ref": "id",
    "tokenizer": "default",
    "documentStore": {
      "store": {
        "index.html": [
          "actual",
          "api",
          "behav",
          "caccl",
          "canva",
          "class",
          "defin",
          "endpoint",
          "expect",
          "index",
          "readm",
          "set",
          "smart",
          "you'd"
        ],
        "global.html": [
          "document",
          "global"
        ],
        "list_class.html": [
          "endpoint",
          "level",
          "list",
          "list:class",
          "object"
        ],
        "api.course.app.html": [
          "api.course.app",
          "app",
          "class",
          "cours",
          "course.app",
          "extern",
          "function",
          "interact",
          "lti",
          "within"
        ],
        "api.course.app.html#get": [
          "api.course.app#get",
          "app#get",
          "course.app#get",
          "function",
          "get",
          "info",
          "lti",
          "option",
          "promise.&lt;object&gt",
          "singl",
          "tool"
        ],
        "api.course.app.html#add": [
          "add",
          "api.course.app#add",
          "app",
          "app#add",
          "canva",
          "cours",
          "course.app#add",
          "function",
          "lti",
          "option",
          "promise.&lt;object&gt"
        ],
        "api.course.app.html#remove": [
          "api.course.app#remov",
          "app",
          "app#remov",
          "canva",
          "cours",
          "course.app#remov",
          "function",
          "lti",
          "option",
          "promise.&lt;object&gt",
          "remov"
        ],
        "api.course.app.html#getMetadata": [
          "api.course.app#getmetadata",
          "app",
          "app#getmetadata",
          "call",
          "cours",
          "course.app#getmetadata",
          "custom",
          "differ",
          "each",
          "endpoint",
          "find",
          "first",
          "function",
          "get",
          "getmetadata",
          "identifi",
          "instal",
          "lti",
          "metadata",
          "metadataid",
          "note",
          "option",
          "paramet",
          "promise.&lt;object&gt",
          "refer",
          "requir",
          "return",
          "same",
          "share",
          "us"
        ],
        "api.course.app.html#updateMetadata": [
          "api.course.app#updatemetadata",
          "app",
          "app#updatemetadata",
          "call",
          "cours",
          "course.app#updatemetadata",
          "custom",
          "differ",
          "each",
          "endpoint",
          "function",
          "given",
          "identifi",
          "instal",
          "lti",
          "metadata",
          "metadataid",
          "note",
          "option",
          "paramet",
          "promise.&lt;array.&lt;object&gt;&gt",
          "refer",
          "requir",
          "same",
          "share",
          "updat",
          "updatemetadata",
          "us"
        ],
        "api.course.app.html#list": [
          "api.course.app#list",
          "app",
          "app#list",
          "cours",
          "course.app#list",
          "function",
          "get",
          "instal",
          "list",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.assignment.html": [
          "api.course.assign",
          "assign",
          "class",
          "cours",
          "course.assign",
          "function",
          "interact",
          "within"
        ],
        "api.course.assignment.html#list": [
          "api.course.assignment#list",
          "assign",
          "assignment#list",
          "cours",
          "course.assignment#list",
          "function",
          "list",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.assignment.html#get": [
          "api.course.assignment#get",
          "assign",
          "assignment#get",
          "cours",
          "course.assignment#get",
          "function",
          "info",
          "option",
          "promise.&lt;object&gt",
          "specif"
        ],
        "api.course.assignment.html#update": [
          "api.course.assignment#upd",
          "assign",
          "assignment#upd",
          "canva",
          "course.assignment#upd",
          "function",
          "option",
          "promise.&lt;object&gt",
          "updat"
        ],
        "api.course.assignment.html#create": [
          "api.course.assignment#cr",
          "assign",
          "assignment#cr",
          "canva",
          "course.assignment#cr",
          "creat",
          "function",
          "option",
          "promise.&lt;object&gt"
        ],
        "api.course.assignment.html#delete": [
          "api.course.assignment#delet",
          "assign",
          "assignment#delet",
          "course.assignment#delet",
          "delet",
          "function",
          "option",
          "promise.&lt;object&gt"
        ],
        "api.course.assignment.html#listGradeableStudents": [
          "api.course.assignment#listgradeablestud",
          "assign",
          "assignment#listgradeablestud",
          "course.assignment#listgradeablestud",
          "function",
          "gradeabl",
          "list",
          "listgradeablestud",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "specif",
          "student"
        ],
        "api.course.assignment.html#createSubmissionComment": [
          "add",
          "api.course.assignment#createsubmissioncom",
          "assignment#createsubmissioncom",
          "comment",
          "course.assignment#createsubmissioncom",
          "createsubmissioncom",
          "function",
          "option",
          "promise.&lt;object&gt",
          "submiss"
        ],
        "api.course.assignment.html#updateGrades": [
          "and/or",
          "api.course.assignment#updategrad",
          "assignment#updategrad",
          "batch",
          "comment",
          "course.assignment#updategrad",
          "function",
          "grade",
          "item",
          "option",
          "promise.&lt;object&gt",
          "rubric",
          "support",
          "updat",
          "updategrad"
        ],
        "api.course.assignment.html#listOverrides": [
          "api.course.assignment#listoverrid",
          "assign",
          "assignment#listoverrid",
          "course.assignment#listoverrid",
          "function",
          "get",
          "list",
          "listoverrid",
          "option",
          "overrid",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.assignment.html#getOverride": [
          "api.course.assignment#getoverrid",
          "assign",
          "assignment#getoverrid",
          "cours",
          "course.assignment#getoverrid",
          "function",
          "getoverrid",
          "option",
          "overrid",
          "promise.&lt;object&gt",
          "specif"
        ],
        "api.course.assignment.html#createOverride": [
          "api.course.assignment#createoverrid",
          "assign",
          "assignment#createoverrid",
          "course.assignment#createoverrid",
          "creat",
          "createoverrid",
          "function",
          "option",
          "overrid",
          "promise.&lt;object&gt"
        ],
        "api.course.assignment.html#deleteOverride": [
          "api.course.assignment#deleteoverrid",
          "assign",
          "assignment#deleteoverrid",
          "course.assignment#deleteoverrid",
          "delet",
          "deleteoverrid",
          "function",
          "option",
          "overrid",
          "promise.&lt;object&gt"
        ],
        "api.course.assignment.html#listSubmissions": [
          "api.course.assignment#listsubmiss",
          "assign",
          "assignment#listsubmiss",
          "cours",
          "course.assignment#listsubmiss",
          "function",
          "list",
          "listsubmiss",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "specif",
          "submiss"
        ],
        "api.course.assignment.html#getSubmission": [
          "api.course.assignment#getsubmiss",
          "assign",
          "assignment#getsubmiss",
          "course.assignment#getsubmiss",
          "function",
          "get",
          "getsubmiss",
          "option",
          "promise.&lt;object&gt",
          "singl",
          "submiss"
        ],
        "api.course.assignment.html#createTextSubmission": [
          "api.course.assignment#createtextsubmiss",
          "assignment#createtextsubmiss",
          "behalf",
          "course.assignment#createtextsubmiss",
          "creat",
          "createtextsubmiss",
          "current",
          "function",
          "option",
          "promise.&lt;object&gt",
          "submiss",
          "text",
          "user"
        ],
        "api.course.assignment.html#createURLSubmission": [
          "api.course.assignment#createurlsubmiss",
          "assignment#createurlsubmiss",
          "behalf",
          "course.assignment#createurlsubmiss",
          "creat",
          "createurlsubmiss",
          "current",
          "function",
          "option",
          "promise.&lt;object&gt",
          "submiss",
          "url",
          "user"
        ],
        "api.course.assignment.html#createFileSubmission": [
          "api.course.assignment#createfilesubmiss",
          "assignment#createfilesubmiss",
          "behalf",
          "course.assignment#createfilesubmiss",
          "creat",
          "createfilesubmiss",
          "current",
          "file",
          "function",
          "option",
          "promise.&lt;object&gt",
          "submiss",
          "user"
        ],
        "api.course.assignmentGroup.html": [
          "api.course.assignmentgroup",
          "assign",
          "assignmentgroup",
          "class",
          "cours",
          "course.assignmentgroup",
          "function",
          "group",
          "interact",
          "within"
        ],
        "api.course.assignmentGroup.html#listAssignmentGroups": [
          "api.course.assignmentgroup#listassignmentgroup",
          "assign",
          "assignmentgroup#listassignmentgroup",
          "cours",
          "course.assignmentgroup#listassignmentgroup",
          "function",
          "group",
          "list",
          "listassignmentgroup",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.assignmentGroup.html#getAssignmentGroup": [
          "api.course.assignmentgroup#getassignmentgroup",
          "assign",
          "assignmentgroup#getassignmentgroup",
          "cours",
          "course.assignmentgroup#getassignmentgroup",
          "function",
          "get",
          "getassignmentgroup",
          "group",
          "info",
          "option",
          "promise.&lt;object&gt",
          "specif"
        ],
        "api.course.assignmentGroup.html#update": [
          "api.course.assignmentgroup#upd",
          "assign",
          "assignmentgroup#upd",
          "cours",
          "course.assignmentgroup#upd",
          "function",
          "group",
          "option",
          "promise.&lt;object&gt",
          "updat"
        ],
        "api.course.assignmentGroup.html#create": [
          "api.course.assignmentgroup#cr",
          "assign",
          "assignmentgroup#cr",
          "cours",
          "course.assignmentgroup#cr",
          "creat",
          "function",
          "group",
          "new",
          "option",
          "promise.&lt;object&gt"
        ],
        "api.course.assignmentGroup.html#delete": [
          "api.course.assignmentgroup#delet",
          "assign",
          "assignmentgroup#delet",
          "cours",
          "course.assignmentgroup#delet",
          "delet",
          "function",
          "group",
          "option",
          "promise.&lt;object&gt"
        ],
        "api.course.gradebookColumn.html": [
          "api.course.gradebookcolumn",
          "class",
          "column",
          "cours",
          "course.gradebookcolumn",
          "function",
          "gradebook",
          "gradebookcolumn",
          "interact",
          "within"
        ],
        "api.course.gradebookColumn.html#list": [
          "api.course.gradebookcolumn#list",
          "column",
          "cours",
          "course.gradebookcolumn#list",
          "custom",
          "function",
          "get",
          "gradebook",
          "gradebookcolumn#list",
          "list",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.gradebookColumn.html#get": [
          "api.course.gradebookcolumn#get",
          "column",
          "cours",
          "course.gradebookcolumn#get",
          "element",
          "endpoint",
          "exist",
          "function",
          "get",
          "gradebook",
          "gradebookcolumn#get",
          "info",
          "list",
          "on",
          "option",
          "promise.&lt;object&gt",
          "pull",
          "return",
          "simul",
          "specif"
        ],
        "api.course.gradebookColumn.html#update": [
          "api.course.gradebookcolumn#upd",
          "column'",
          "course.gradebookcolumn#upd",
          "function",
          "gradebook",
          "gradebookcolumn#upd",
          "inform",
          "option",
          "promise.&lt;object&gt",
          "updat"
        ],
        "api.course.gradebookColumn.html#create": [
          "api.course.gradebookcolumn#cr",
          "column",
          "cours",
          "course.gradebookcolumn#cr",
          "creat",
          "function",
          "gradebook",
          "gradebookcolumn#cr",
          "new",
          "option",
          "promise.&lt;object&gt"
        ],
        "api.course.gradebookColumn.html#delete": [
          "api.course.gradebookcolumn#delet",
          "column",
          "cours",
          "course.gradebookcolumn#delet",
          "delet",
          "function",
          "gradebook",
          "gradebookcolumn#delet",
          "option",
          "promise.&lt;object&gt"
        ],
        "api.course.gradebookColumn.html#listEntries": [
          "api.course.gradebookcolumn#listentri",
          "column",
          "cours",
          "course.gradebookcolumn#listentri",
          "entri",
          "function",
          "get",
          "gradebook",
          "gradebookcolumn#listentri",
          "list",
          "listentri",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "specif"
        ],
        "api.course.gradebookColumn.html#updateEntries": [
          "api.course.gradebookcolumn#updateentri",
          "column",
          "cours",
          "course.gradebookcolumn#updateentri",
          "entri",
          "function",
          "gradebook",
          "gradebookcolumn#updateentri",
          "list",
          "option",
          "promise.&lt;object&gt",
          "specif",
          "updat",
          "updateentri"
        ],
        "api.course.group.html": [
          "api.course.group",
          "class",
          "cours",
          "course.group",
          "function",
          "group",
          "interact",
          "student",
          "within"
        ],
        "api.course.group.html#get": [
          "api.course.group#get",
          "cours",
          "course.group#get",
          "function",
          "get",
          "group",
          "group#get",
          "info",
          "option",
          "specif"
        ],
        "api.course.group.html#listMembers": [
          "api.course.group#listmemb",
          "course.group#listmemb",
          "function",
          "get",
          "group",
          "group#listmemb",
          "list",
          "listmemb",
          "member",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.group.html#updateMembers": [
          "api.course.group#updatememb",
          "course.group#updatememb",
          "function",
          "get",
          "group",
          "group#updatememb",
          "list",
          "member",
          "option",
          "promise.&lt;object&gt",
          "updatememb"
        ],
        "api.course.groupSet.html": [
          "api.course.groupset",
          "class",
          "cours",
          "course.groupset",
          "function",
          "group",
          "groupset",
          "interact",
          "sets/categori",
          "within"
        ],
        "api.course.groupSet.html#list": [
          "api.course.groupset#list",
          "cours",
          "course.groupset#list",
          "function",
          "group",
          "groupset#list",
          "list",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "set"
        ],
        "api.course.groupSet.html#get": [
          "api.course.groupset#get",
          "course.groupset#get",
          "function",
          "get",
          "group",
          "groupset#get",
          "info",
          "option",
          "promise.&lt;object&gt",
          "set",
          "specif"
        ],
        "api.course.groupSet.html#create": [
          "api.course.groupset#cr",
          "cours",
          "course.groupset#cr",
          "creat",
          "function",
          "group",
          "groupset#cr",
          "option",
          "promise.&lt;object&gt",
          "set"
        ],
        "api.course.groupSet.html#delete": [
          "api.course.groupset#delet",
          "course.groupset#delet",
          "delet",
          "function",
          "group",
          "groupset#delet",
          "option",
          "promise.&lt;object&gt",
          "set"
        ],
        "api.course.groupSet.html#listGroups": [
          "api.course.groupset#listgroup",
          "course.groupset#listgroup",
          "function",
          "get",
          "group",
          "groupset#listgroup",
          "list",
          "listgroup",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "set"
        ],
        "api.course.groupSet.html#getGroup": [
          "alia",
          "api.course.groupset#getgroup",
          "course.groupset#getgroup",
          "function",
          "get",
          "getgroup",
          "group",
          "groups.js/getgroup",
          "groupset#getgroup",
          "info",
          "option",
          "promise.&lt;object&gt",
          "set",
          "specif"
        ],
        "api.course.groupSet.html#createGroup": [
          "api.course.groupset#creategroup",
          "course.groupset#creategroup",
          "creat",
          "creategroup",
          "function",
          "group",
          "groupset#creategroup",
          "new",
          "option",
          "promise.&lt;object&gt",
          "set"
        ],
        "api.course.groupSet.html#deleteGroup": [
          "api.course.groupset#deletegroup",
          "course.groupset#deletegroup",
          "delet",
          "deletegroup",
          "function",
          "group",
          "groupset#deletegroup",
          "option",
          "promise.&lt;object&gt",
          "set",
          "specif"
        ],
        "api.course.page.html": [
          "api.course.pag",
          "class",
          "cours",
          "course.pag",
          "function",
          "interact",
          "page",
          "within"
        ],
        "api.course.page.html#list": [
          "api.course.page#list",
          "cours",
          "course.page#list",
          "function",
          "get",
          "list",
          "option",
          "page",
          "page#list",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.page.html#update": [
          "api.course.page#upd",
          "canva",
          "course.page#upd",
          "function",
          "option",
          "page",
          "page#upd",
          "promise.&lt;object&gt",
          "updat"
        ],
        "api.course.page.html#create": [
          "api.course.page#cr",
          "cours",
          "course.page#cr",
          "creat",
          "function",
          "new",
          "option",
          "page",
          "page#cr",
          "promise.&lt;object&gt"
        ],
        "api.course.page.html#delete": [
          "api.course.page#delet",
          "cours",
          "course.page#delet",
          "delet",
          "function",
          "option",
          "page",
          "page#delet",
          "promise.&lt;object&gt"
        ],
        "api.course.page.html#get": [
          "api.course.page#get",
          "cours",
          "course.page#get",
          "function",
          "info",
          "option",
          "page",
          "page#get",
          "promise.&lt;object&gt",
          "specif"
        ],
        "api.course.quiz.html": [
          "api.course.quiz",
          "class",
          "cours",
          "course.quiz",
          "function",
          "interact",
          "quiz",
          "quizz",
          "within"
        ],
        "api.course.quiz.html#list": [
          "api.course.quiz#list",
          "cours",
          "course.quiz#list",
          "function",
          "list",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "quiz#list",
          "quizz"
        ],
        "api.course.quiz.html#get": [
          "api.course.quiz#get",
          "cours",
          "course.quiz#get",
          "function",
          "info",
          "option",
          "promise.&lt;object&gt",
          "quiz",
          "quiz#get",
          "specif"
        ],
        "api.course.quiz.html#update": [
          "api.course.quiz#upd",
          "cours",
          "course.quiz#upd",
          "function",
          "option",
          "promise.&lt;object&gt",
          "quiz",
          "quiz#upd",
          "specif",
          "updat"
        ],
        "api.course.quiz.html#create": [
          "api.course.quiz#cr",
          "cours",
          "course.quiz#cr",
          "creat",
          "function",
          "new",
          "option",
          "promise.&lt;object&gt",
          "quiz",
          "quiz#creat"
        ],
        "api.course.quiz.html#delete": [
          "api.course.quiz#delet",
          "cours",
          "course.quiz#delet",
          "delet",
          "function",
          "option",
          "promise.&lt;object&gt",
          "quiz",
          "quiz#delet"
        ],
        "api.course.quiz.html#listQuestions": [
          "api.course.quiz#listquest",
          "cours",
          "course.quiz#listquest",
          "function",
          "list",
          "listquest",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "question",
          "quiz",
          "quiz#listquest",
          "specif"
        ],
        "api.course.quiz.html#createMultipleChoiceQuestion": [
          "api.course.quiz#createmultiplechoicequest",
          "choic",
          "cours",
          "course.quiz#createmultiplechoicequest",
          "creat",
          "createmultiplechoicequest",
          "function",
          "multipl",
          "new",
          "option",
          "promise.&lt;object&gt",
          "question",
          "quiz",
          "quiz#createmultiplechoicequest"
        ],
        "api.course.quiz.html#listSubmissions": [
          "api.course.quiz#listsubmiss",
          "cours",
          "course.quiz#listsubmiss",
          "function",
          "list",
          "listsubmiss",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "quiz",
          "quiz#listsubmiss",
          "submiss"
        ],
        "api.course.quiz.html#getSubmission": [
          "api.course.quiz#getsubmiss",
          "cours",
          "course.quiz#getsubmiss",
          "function",
          "get",
          "getsubmiss",
          "info",
          "option",
          "promise.&lt;object&gt",
          "quiz",
          "quiz#getsubmiss",
          "specif",
          "submiss"
        ],
        "api.course.quiz.html#createSubmission": [
          "api.course.quiz#createsubmiss",
          "behalf",
          "cours",
          "course.quiz#createsubmiss",
          "creat",
          "createsubmiss",
          "current",
          "function",
          "new",
          "option",
          "promise.&lt;object&gt",
          "quiz",
          "quiz#createsubmiss",
          "specif",
          "submiss",
          "user"
        ],
        "api.course.quiz.html#listQuestionGrades": [
          "api.course.quiz#listquestiongrad",
          "cours",
          "course.quiz#listquestiongrad",
          "function",
          "grade",
          "list",
          "listquestiongrad",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "question",
          "quiz",
          "quiz#listquestiongrad",
          "specif"
        ],
        "api.course.quiz.html#updateQuestionGrades": [
          "api.course.quiz#updatequestiongrad",
          "cours",
          "course.quiz#updatequestiongrad",
          "function",
          "grade",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "question",
          "quiz",
          "quiz#updatequestiongrad",
          "specif",
          "submiss",
          "updat",
          "updatequestiongrad"
        ],
        "api.course.rubric.html": [
          "api.course.rubr",
          "class",
          "cours",
          "course.rubr",
          "function",
          "interact",
          "rubric",
          "within"
        ],
        "api.course.rubric.html#list": [
          "api.course.rubric#list",
          "cours",
          "course.rubric#list",
          "function",
          "list",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "rubric",
          "rubric#list",
          "set"
        ],
        "api.course.rubric.html#get": [
          "api.course.rubric#get",
          "cours",
          "course.rubric#get",
          "function",
          "get",
          "info",
          "option",
          "promise.&lt;object&gt",
          "rubric",
          "rubric#get",
          "specif"
        ],
        "api.course.rubric.html#createFreeFormGradingRubricInAssignment": [
          "add",
          "api.course.rubric#createfreeformgradingrubricinassign",
          "assign",
          "comment",
          "cours",
          "course.rubric#createfreeformgradingrubricinassign",
          "creat",
          "createfreeformgradingrubricinassign",
          "enabl",
          "form",
          "free",
          "function",
          "grade",
          "new",
          "option",
          "promise.&lt;object&gt",
          "rubric",
          "rubric#createfreeformgradingrubricinassign"
        ],
        "api.course.section.html": [
          "api.course.sect",
          "class",
          "cours",
          "course.sect",
          "function",
          "interact",
          "section",
          "within"
        ],
        "api.course.section.html#list": [
          "api.course.section#list",
          "cours",
          "course.section#list",
          "function",
          "get",
          "list",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "section",
          "section#list"
        ],
        "api.course.section.html#get": [
          "api.course.section#get",
          "course.section#get",
          "function",
          "get",
          "info",
          "option",
          "promise.&lt;object&gt",
          "section",
          "section#get",
          "specif"
        ],
        "api.course.html": [
          "api.cours",
          "class",
          "cours",
          "function",
          "interact"
        ],
        "api.course.html#get": [
          "api.course#get",
          "cours",
          "course#get",
          "function",
          "get",
          "info",
          "option",
          "promise.&lt;object&gt",
          "specif"
        ],
        "api.course.html#listEnrollments": [
          "api.course#listenrol",
          "cours",
          "course#listenrol",
          "enrol",
          "function",
          "get",
          "list",
          "listenrol",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.html#listStudentEnrollments": [
          "api.course#liststudentenrol",
          "cours",
          "course#liststudentenrol",
          "enrollmentss",
          "function",
          "get",
          "list",
          "liststudentenrol",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "student"
        ],
        "api.course.html#listTeachingTeamMemberEnrollments": [
          "api.course#listteachingteammemberenrol",
          "cours",
          "course#listteachingteammemberenrol",
          "enrol",
          "function",
          "get",
          "list",
          "listteachingteammemberenrol",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "ta",
          "teacher"
        ],
        "api.course.html#listDesignerEnrollments": [
          "api.course#listdesignerenrol",
          "cours",
          "course#listdesignerenrol",
          "design",
          "enrol",
          "function",
          "get",
          "list",
          "listdesignerenrol",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.html#listObserverEnrollments": [
          "api.course#listobserverenrol",
          "cours",
          "course#listobserverenrol",
          "enrol",
          "function",
          "get",
          "list",
          "listobserverenrol",
          "observ",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.html#getUser": [
          "api.course#getus",
          "cours",
          "course#getus",
          "function",
          "get",
          "getus",
          "info",
          "option",
          "promise.&lt;object&gt",
          "specif",
          "user"
        ],
        "api.course.html#listUsers": [
          "api.course#listus",
          "cours",
          "course#listus",
          "function",
          "get",
          "info",
          "listus",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "user"
        ],
        "api.course.html#listStudents": [
          "api.course#liststud",
          "cours",
          "course#liststud",
          "function",
          "get",
          "list",
          "liststud",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "student"
        ],
        "api.course.html#listTeachingTeamMembers": [
          "api.course#listteachingteammemb",
          "cours",
          "course#listteachingteammemb",
          "function",
          "get",
          "list",
          "listteachingteammemb",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt",
          "ta",
          "teacher"
        ],
        "api.course.html#listDesigners": [
          "api.course#listdesign",
          "cours",
          "course#listdesign",
          "design",
          "function",
          "get",
          "list",
          "listdesign",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.course.html#listObservers": [
          "api.course#listobserv",
          "cours",
          "course#listobserv",
          "function",
          "get",
          "list",
          "listobserv",
          "observ",
          "option",
          "promise.&lt;array.&lt;object&gt;&gt"
        ],
        "api.user.self.html": [
          "api.user.self",
          "class",
          "current",
          "function",
          "get",
          "info",
          "self",
          "user",
          "user.self"
        ],
        "api.user.self.html#getProfile": [
          "api.user.self#getprofil",
          "current",
          "function",
          "get",
          "getprofil",
          "info",
          "promise.&lt;object&gt",
          "self#getprofil",
          "user",
          "user.self#getprofil"
        ],
        "api.user.self.html#listCourses": [
          "api.user.self#listcours",
          "associ",
          "cours",
          "current",
          "function",
          "get",
          "includeterm",
          "list",
          "listcours",
          "option",
          "promise.&lt;object&gt",
          "self#listcours",
          "user",
          "user.self#listcours"
        ]
      },
      "length": 97
    },
    "tokenStore": {
      "root": {
        "docs": {},
        "a": {
          "docs": {},
          "c": {
            "docs": {},
            "t": {
              "docs": {},
              "u": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "index.html": {
                        "ref": "index.html",
                        "tf": 7
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "i": {
              "docs": {
                "index.html": {
                  "ref": "index.html",
                  "tf": 300
                }
              },
              ".": {
                "docs": {},
                "c": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "s": {
                          "docs": {
                            "api.course.html": {
                              "ref": "api.course.html",
                              "tf": 1150
                            }
                          },
                          "e": {
                            "docs": {},
                            ".": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "p": {
                                  "docs": {},
                                  "p": {
                                    "docs": {
                                      "api.course.app.html": {
                                        "ref": "api.course.app.html",
                                        "tf": 1100
                                      }
                                    },
                                    "#": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "api.course.app.html#get": {
                                                "ref": "api.course.app.html#get",
                                                "tf": 1100
                                              }
                                            },
                                            "m": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "d": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {},
                                                          "a": {
                                                            "docs": {
                                                              "api.course.app.html#getMetadata": {
                                                                "ref": "api.course.app.html#getMetadata",
                                                                "tf": 1075
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "a": {
                                        "docs": {},
                                        "d": {
                                          "docs": {},
                                          "d": {
                                            "docs": {
                                              "api.course.app.html#add": {
                                                "ref": "api.course.app.html#add",
                                                "tf": 1075
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "r": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "v": {
                                                "docs": {
                                                  "api.course.app.html#remove": {
                                                    "ref": "api.course.app.html#remove",
                                                    "tf": 1075
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "u": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "d": {
                                            "docs": {},
                                            "a": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "m": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {},
                                                        "a": {
                                                          "docs": {},
                                                          "d": {
                                                            "docs": {},
                                                            "a": {
                                                              "docs": {},
                                                              "t": {
                                                                "docs": {},
                                                                "a": {
                                                                  "docs": {
                                                                    "api.course.app.html#updateMetadata": {
                                                                      "ref": "api.course.app.html#updateMetadata",
                                                                      "tf": 1075
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "l": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "api.course.app.html#list": {
                                                  "ref": "api.course.app.html#list",
                                                  "tf": 1075
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "s": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "n": {
                                          "docs": {
                                            "api.course.assignment.html": {
                                              "ref": "api.course.assignment.html",
                                              "tf": 1100
                                            }
                                          },
                                          "m": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "n": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "#": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "i": {
                                                        "docs": {},
                                                        "s": {
                                                          "docs": {},
                                                          "t": {
                                                            "docs": {
                                                              "api.course.assignment.html#list": {
                                                                "ref": "api.course.assignment.html#list",
                                                                "tf": 1075
                                                              }
                                                            },
                                                            "g": {
                                                              "docs": {},
                                                              "r": {
                                                                "docs": {},
                                                                "a": {
                                                                  "docs": {},
                                                                  "d": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "a": {
                                                                        "docs": {},
                                                                        "b": {
                                                                          "docs": {},
                                                                          "l": {
                                                                            "docs": {},
                                                                            "e": {
                                                                              "docs": {},
                                                                              "s": {
                                                                                "docs": {},
                                                                                "t": {
                                                                                  "docs": {},
                                                                                  "u": {
                                                                                    "docs": {},
                                                                                    "d": {
                                                                                      "docs": {
                                                                                        "api.course.assignment.html#listGradeableStudents": {
                                                                                          "ref": "api.course.assignment.html#listGradeableStudents",
                                                                                          "tf": 1075
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            },
                                                            "o": {
                                                              "docs": {},
                                                              "v": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "r": {
                                                                      "docs": {},
                                                                      "i": {
                                                                        "docs": {},
                                                                        "d": {
                                                                          "docs": {
                                                                            "api.course.assignment.html#listOverrides": {
                                                                              "ref": "api.course.assignment.html#listOverrides",
                                                                              "tf": 1075
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            },
                                                            "s": {
                                                              "docs": {},
                                                              "u": {
                                                                "docs": {},
                                                                "b": {
                                                                  "docs": {},
                                                                  "m": {
                                                                    "docs": {},
                                                                    "i": {
                                                                      "docs": {},
                                                                      "s": {
                                                                        "docs": {},
                                                                        "s": {
                                                                          "docs": {
                                                                            "api.course.assignment.html#listSubmissions": {
                                                                              "ref": "api.course.assignment.html#listSubmissions",
                                                                              "tf": 1075
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "g": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "api.course.assignment.html#get": {
                                                              "ref": "api.course.assignment.html#get",
                                                              "tf": 1100
                                                            }
                                                          },
                                                          "o": {
                                                            "docs": {},
                                                            "v": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "i": {
                                                                      "docs": {},
                                                                      "d": {
                                                                        "docs": {
                                                                          "api.course.assignment.html#getOverride": {
                                                                            "ref": "api.course.assignment.html#getOverride",
                                                                            "tf": 1075
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          },
                                                          "s": {
                                                            "docs": {},
                                                            "u": {
                                                              "docs": {},
                                                              "b": {
                                                                "docs": {},
                                                                "m": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "s": {
                                                                      "docs": {},
                                                                      "s": {
                                                                        "docs": {
                                                                          "api.course.assignment.html#getSubmission": {
                                                                            "ref": "api.course.assignment.html#getSubmission",
                                                                            "tf": 1075
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "u": {
                                                      "docs": {},
                                                      "p": {
                                                        "docs": {},
                                                        "d": {
                                                          "docs": {
                                                            "api.course.assignment.html#update": {
                                                              "ref": "api.course.assignment.html#update",
                                                              "tf": 1075
                                                            }
                                                          },
                                                          "a": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "g": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "a": {
                                                                      "docs": {},
                                                                      "d": {
                                                                        "docs": {
                                                                          "api.course.assignment.html#updateGrades": {
                                                                            "ref": "api.course.assignment.html#updateGrades",
                                                                            "tf": 1075
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "c": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {
                                                          "api.course.assignment.html#create": {
                                                            "ref": "api.course.assignment.html#create",
                                                            "tf": 1075
                                                          }
                                                        },
                                                        "e": {
                                                          "docs": {},
                                                          "a": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "u": {
                                                                    "docs": {},
                                                                    "b": {
                                                                      "docs": {},
                                                                      "m": {
                                                                        "docs": {},
                                                                        "i": {
                                                                          "docs": {},
                                                                          "s": {
                                                                            "docs": {},
                                                                            "s": {
                                                                              "docs": {},
                                                                              "i": {
                                                                                "docs": {},
                                                                                "o": {
                                                                                  "docs": {},
                                                                                  "n": {
                                                                                    "docs": {},
                                                                                    "c": {
                                                                                      "docs": {},
                                                                                      "o": {
                                                                                        "docs": {},
                                                                                        "m": {
                                                                                          "docs": {
                                                                                            "api.course.assignment.html#createSubmissionComment": {
                                                                                              "ref": "api.course.assignment.html#createSubmissionComment",
                                                                                              "tf": 1075
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                },
                                                                "o": {
                                                                  "docs": {},
                                                                  "v": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "r": {
                                                                        "docs": {},
                                                                        "r": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {},
                                                                            "d": {
                                                                              "docs": {
                                                                                "api.course.assignment.html#createOverride": {
                                                                                  "ref": "api.course.assignment.html#createOverride",
                                                                                  "tf": 1075
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                },
                                                                "t": {
                                                                  "docs": {},
                                                                  "e": {
                                                                    "docs": {},
                                                                    "x": {
                                                                      "docs": {},
                                                                      "t": {
                                                                        "docs": {},
                                                                        "s": {
                                                                          "docs": {},
                                                                          "u": {
                                                                            "docs": {},
                                                                            "b": {
                                                                              "docs": {},
                                                                              "m": {
                                                                                "docs": {},
                                                                                "i": {
                                                                                  "docs": {},
                                                                                  "s": {
                                                                                    "docs": {},
                                                                                    "s": {
                                                                                      "docs": {
                                                                                        "api.course.assignment.html#createTextSubmission": {
                                                                                          "ref": "api.course.assignment.html#createTextSubmission",
                                                                                          "tf": 1075
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                },
                                                                "u": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "l": {
                                                                      "docs": {},
                                                                      "s": {
                                                                        "docs": {},
                                                                        "u": {
                                                                          "docs": {},
                                                                          "b": {
                                                                            "docs": {},
                                                                            "m": {
                                                                              "docs": {},
                                                                              "i": {
                                                                                "docs": {},
                                                                                "s": {
                                                                                  "docs": {},
                                                                                  "s": {
                                                                                    "docs": {
                                                                                      "api.course.assignment.html#createURLSubmission": {
                                                                                        "ref": "api.course.assignment.html#createURLSubmission",
                                                                                        "tf": 1075
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                },
                                                                "f": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "l": {
                                                                      "docs": {},
                                                                      "e": {
                                                                        "docs": {},
                                                                        "s": {
                                                                          "docs": {},
                                                                          "u": {
                                                                            "docs": {},
                                                                            "b": {
                                                                              "docs": {},
                                                                              "m": {
                                                                                "docs": {},
                                                                                "i": {
                                                                                  "docs": {},
                                                                                  "s": {
                                                                                    "docs": {},
                                                                                    "s": {
                                                                                      "docs": {
                                                                                        "api.course.assignment.html#createFileSubmission": {
                                                                                          "ref": "api.course.assignment.html#createFileSubmission",
                                                                                          "tf": 1075
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "d": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "l": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {
                                                                "api.course.assignment.html#delete": {
                                                                  "ref": "api.course.assignment.html#delete",
                                                                  "tf": 1075
                                                                }
                                                              },
                                                              "e": {
                                                                "docs": {},
                                                                "o": {
                                                                  "docs": {},
                                                                  "v": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "r": {
                                                                        "docs": {},
                                                                        "r": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {},
                                                                            "d": {
                                                                              "docs": {
                                                                                "api.course.assignment.html#deleteOverride": {
                                                                                  "ref": "api.course.assignment.html#deleteOverride",
                                                                                  "tf": 1075
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  },
                                                  "g": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "o": {
                                                        "docs": {},
                                                        "u": {
                                                          "docs": {},
                                                          "p": {
                                                            "docs": {
                                                              "api.course.assignmentGroup.html": {
                                                                "ref": "api.course.assignmentGroup.html",
                                                                "tf": 1100
                                                              }
                                                            },
                                                            "#": {
                                                              "docs": {},
                                                              "l": {
                                                                "docs": {},
                                                                "i": {
                                                                  "docs": {},
                                                                  "s": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {},
                                                                      "a": {
                                                                        "docs": {},
                                                                        "s": {
                                                                          "docs": {},
                                                                          "s": {
                                                                            "docs": {},
                                                                            "i": {
                                                                              "docs": {},
                                                                              "g": {
                                                                                "docs": {},
                                                                                "n": {
                                                                                  "docs": {},
                                                                                  "m": {
                                                                                    "docs": {},
                                                                                    "e": {
                                                                                      "docs": {},
                                                                                      "n": {
                                                                                        "docs": {},
                                                                                        "t": {
                                                                                          "docs": {},
                                                                                          "g": {
                                                                                            "docs": {},
                                                                                            "r": {
                                                                                              "docs": {},
                                                                                              "o": {
                                                                                                "docs": {},
                                                                                                "u": {
                                                                                                  "docs": {},
                                                                                                  "p": {
                                                                                                    "docs": {
                                                                                                      "api.course.assignmentGroup.html#listAssignmentGroups": {
                                                                                                        "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                                                                                                        "tf": 1075
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              },
                                                              "g": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "t": {
                                                                    "docs": {},
                                                                    "a": {
                                                                      "docs": {},
                                                                      "s": {
                                                                        "docs": {},
                                                                        "s": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {},
                                                                            "g": {
                                                                              "docs": {},
                                                                              "n": {
                                                                                "docs": {},
                                                                                "m": {
                                                                                  "docs": {},
                                                                                  "e": {
                                                                                    "docs": {},
                                                                                    "n": {
                                                                                      "docs": {},
                                                                                      "t": {
                                                                                        "docs": {},
                                                                                        "g": {
                                                                                          "docs": {},
                                                                                          "r": {
                                                                                            "docs": {},
                                                                                            "o": {
                                                                                              "docs": {},
                                                                                              "u": {
                                                                                                "docs": {},
                                                                                                "p": {
                                                                                                  "docs": {
                                                                                                    "api.course.assignmentGroup.html#getAssignmentGroup": {
                                                                                                      "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                                                                                                      "tf": 1075
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              },
                                                              "u": {
                                                                "docs": {},
                                                                "p": {
                                                                  "docs": {},
                                                                  "d": {
                                                                    "docs": {
                                                                      "api.course.assignmentGroup.html#update": {
                                                                        "ref": "api.course.assignmentGroup.html#update",
                                                                        "tf": 1075
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              },
                                                              "c": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {
                                                                    "api.course.assignmentGroup.html#create": {
                                                                      "ref": "api.course.assignmentGroup.html#create",
                                                                      "tf": 1075
                                                                    }
                                                                  }
                                                                }
                                                              },
                                                              "d": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "l": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "t": {
                                                                        "docs": {
                                                                          "api.course.assignmentGroup.html#delete": {
                                                                            "ref": "api.course.assignmentGroup.html#delete",
                                                                            "tf": 1075
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "g": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "d": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "b": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "k": {
                                                "docs": {},
                                                "c": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "m": {
                                                          "docs": {},
                                                          "n": {
                                                            "docs": {
                                                              "api.course.gradebookColumn.html": {
                                                                "ref": "api.course.gradebookColumn.html",
                                                                "tf": 1100
                                                              }
                                                            },
                                                            "#": {
                                                              "docs": {},
                                                              "l": {
                                                                "docs": {},
                                                                "i": {
                                                                  "docs": {},
                                                                  "s": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {
                                                                        "api.course.gradebookColumn.html#list": {
                                                                          "ref": "api.course.gradebookColumn.html#list",
                                                                          "tf": 1075
                                                                        }
                                                                      },
                                                                      "e": {
                                                                        "docs": {},
                                                                        "n": {
                                                                          "docs": {},
                                                                          "t": {
                                                                            "docs": {},
                                                                            "r": {
                                                                              "docs": {},
                                                                              "i": {
                                                                                "docs": {
                                                                                  "api.course.gradebookColumn.html#listEntries": {
                                                                                    "ref": "api.course.gradebookColumn.html#listEntries",
                                                                                    "tf": 1075
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              },
                                                              "g": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "t": {
                                                                    "docs": {
                                                                      "api.course.gradebookColumn.html#get": {
                                                                        "ref": "api.course.gradebookColumn.html#get",
                                                                        "tf": 1100
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              },
                                                              "u": {
                                                                "docs": {},
                                                                "p": {
                                                                  "docs": {},
                                                                  "d": {
                                                                    "docs": {
                                                                      "api.course.gradebookColumn.html#update": {
                                                                        "ref": "api.course.gradebookColumn.html#update",
                                                                        "tf": 1075
                                                                      }
                                                                    },
                                                                    "a": {
                                                                      "docs": {},
                                                                      "t": {
                                                                        "docs": {},
                                                                        "e": {
                                                                          "docs": {},
                                                                          "e": {
                                                                            "docs": {},
                                                                            "n": {
                                                                              "docs": {},
                                                                              "t": {
                                                                                "docs": {},
                                                                                "r": {
                                                                                  "docs": {},
                                                                                  "i": {
                                                                                    "docs": {
                                                                                      "api.course.gradebookColumn.html#updateEntries": {
                                                                                        "ref": "api.course.gradebookColumn.html#updateEntries",
                                                                                        "tf": 1075
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              },
                                                              "c": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {
                                                                    "api.course.gradebookColumn.html#create": {
                                                                      "ref": "api.course.gradebookColumn.html#create",
                                                                      "tf": 1075
                                                                    }
                                                                  }
                                                                }
                                                              },
                                                              "d": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "l": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "t": {
                                                                        "docs": {
                                                                          "api.course.gradebookColumn.html#delete": {
                                                                            "ref": "api.course.gradebookColumn.html#delete",
                                                                            "tf": 1075
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "o": {
                                    "docs": {},
                                    "u": {
                                      "docs": {},
                                      "p": {
                                        "docs": {
                                          "api.course.group.html": {
                                            "ref": "api.course.group.html",
                                            "tf": 1100
                                          }
                                        },
                                        "#": {
                                          "docs": {},
                                          "g": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "api.course.group.html#get": {
                                                    "ref": "api.course.group.html#get",
                                                    "tf": 1100
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "l": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "s": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "m": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "m": {
                                                        "docs": {},
                                                        "b": {
                                                          "docs": {
                                                            "api.course.group.html#listMembers": {
                                                              "ref": "api.course.group.html#listMembers",
                                                              "tf": 1075
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "u": {
                                            "docs": {},
                                            "p": {
                                              "docs": {},
                                              "d": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "m": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "m": {
                                                            "docs": {},
                                                            "b": {
                                                              "docs": {
                                                                "api.course.group.html#updateMembers": {
                                                                  "ref": "api.course.group.html#updateMembers",
                                                                  "tf": 1075
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "s": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "api.course.groupSet.html": {
                                                  "ref": "api.course.groupSet.html",
                                                  "tf": 1100
                                                }
                                              },
                                              "#": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "i": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {
                                                          "api.course.groupSet.html#list": {
                                                            "ref": "api.course.groupSet.html#list",
                                                            "tf": 1075
                                                          }
                                                        },
                                                        "g": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "o": {
                                                              "docs": {},
                                                              "u": {
                                                                "docs": {},
                                                                "p": {
                                                                  "docs": {
                                                                    "api.course.groupSet.html#listGroups": {
                                                                      "ref": "api.course.groupSet.html#listGroups",
                                                                      "tf": 1075
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                },
                                                "g": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {
                                                        "api.course.groupSet.html#get": {
                                                          "ref": "api.course.groupSet.html#get",
                                                          "tf": 1100
                                                        }
                                                      },
                                                      "g": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "o": {
                                                            "docs": {},
                                                            "u": {
                                                              "docs": {},
                                                              "p": {
                                                                "docs": {
                                                                  "api.course.groupSet.html#getGroup": {
                                                                    "ref": "api.course.groupSet.html#getGroup",
                                                                    "tf": 1075
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                },
                                                "c": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {
                                                      "api.course.groupSet.html#create": {
                                                        "ref": "api.course.groupSet.html#create",
                                                        "tf": 1075
                                                      }
                                                    },
                                                    "e": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "g": {
                                                              "docs": {},
                                                              "r": {
                                                                "docs": {},
                                                                "o": {
                                                                  "docs": {},
                                                                  "u": {
                                                                    "docs": {},
                                                                    "p": {
                                                                      "docs": {
                                                                        "api.course.groupSet.html#createGroup": {
                                                                          "ref": "api.course.groupSet.html#createGroup",
                                                                          "tf": 1075
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                },
                                                "d": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "api.course.groupSet.html#delete": {
                                                              "ref": "api.course.groupSet.html#delete",
                                                              "tf": 1075
                                                            }
                                                          },
                                                          "e": {
                                                            "docs": {},
                                                            "g": {
                                                              "docs": {},
                                                              "r": {
                                                                "docs": {},
                                                                "o": {
                                                                  "docs": {},
                                                                  "u": {
                                                                    "docs": {},
                                                                    "p": {
                                                                      "docs": {
                                                                        "api.course.groupSet.html#deleteGroup": {
                                                                          "ref": "api.course.groupSet.html#deleteGroup",
                                                                          "tf": 1075
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "p": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "g": {
                                    "docs": {
                                      "api.course.page.html": {
                                        "ref": "api.course.page.html",
                                        "tf": 1100
                                      }
                                    },
                                    "e": {
                                      "docs": {},
                                      "#": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "api.course.page.html#list": {
                                                    "ref": "api.course.page.html#list",
                                                    "tf": 1075
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "d": {
                                              "docs": {
                                                "api.course.page.html#update": {
                                                  "ref": "api.course.page.html#update",
                                                  "tf": 1075
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "c": {
                                          "docs": {},
                                          "r": {
                                            "docs": {
                                              "api.course.page.html#create": {
                                                "ref": "api.course.page.html#create",
                                                "tf": 1075
                                              }
                                            }
                                          }
                                        },
                                        "d": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.page.html#delete": {
                                                      "ref": "api.course.page.html#delete",
                                                      "tf": 1075
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "g": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "api.course.page.html#get": {
                                                  "ref": "api.course.page.html#get",
                                                  "tf": 1100
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "q": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "z": {
                                      "docs": {
                                        "api.course.quiz.html": {
                                          "ref": "api.course.quiz.html",
                                          "tf": 1100
                                        }
                                      },
                                      "#": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "api.course.quiz.html#list": {
                                                    "ref": "api.course.quiz.html#list",
                                                    "tf": 1075
                                                  }
                                                },
                                                "q": {
                                                  "docs": {},
                                                  "u": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "api.course.quiz.html#listQuestions": {
                                                              "ref": "api.course.quiz.html#listQuestions",
                                                              "tf": 1075
                                                            }
                                                          },
                                                          "i": {
                                                            "docs": {},
                                                            "o": {
                                                              "docs": {},
                                                              "n": {
                                                                "docs": {},
                                                                "g": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "a": {
                                                                      "docs": {},
                                                                      "d": {
                                                                        "docs": {
                                                                          "api.course.quiz.html#listQuestionGrades": {
                                                                            "ref": "api.course.quiz.html#listQuestionGrades",
                                                                            "tf": 1075
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                },
                                                "s": {
                                                  "docs": {},
                                                  "u": {
                                                    "docs": {},
                                                    "b": {
                                                      "docs": {},
                                                      "m": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {},
                                                          "s": {
                                                            "docs": {},
                                                            "s": {
                                                              "docs": {
                                                                "api.course.quiz.html#listSubmissions": {
                                                                  "ref": "api.course.quiz.html#listSubmissions",
                                                                  "tf": 1075
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "g": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "api.course.quiz.html#get": {
                                                  "ref": "api.course.quiz.html#get",
                                                  "tf": 1100
                                                }
                                              },
                                              "s": {
                                                "docs": {},
                                                "u": {
                                                  "docs": {},
                                                  "b": {
                                                    "docs": {},
                                                    "m": {
                                                      "docs": {},
                                                      "i": {
                                                        "docs": {},
                                                        "s": {
                                                          "docs": {},
                                                          "s": {
                                                            "docs": {
                                                              "api.course.quiz.html#getSubmission": {
                                                                "ref": "api.course.quiz.html#getSubmission",
                                                                "tf": 1075
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "d": {
                                              "docs": {
                                                "api.course.quiz.html#update": {
                                                  "ref": "api.course.quiz.html#update",
                                                  "tf": 1075
                                                }
                                              },
                                              "a": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "q": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "s": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {},
                                                              "i": {
                                                                "docs": {},
                                                                "o": {
                                                                  "docs": {},
                                                                  "n": {
                                                                    "docs": {},
                                                                    "g": {
                                                                      "docs": {},
                                                                      "r": {
                                                                        "docs": {},
                                                                        "a": {
                                                                          "docs": {},
                                                                          "d": {
                                                                            "docs": {
                                                                              "api.course.quiz.html#updateQuestionGrades": {
                                                                                "ref": "api.course.quiz.html#updateQuestionGrades",
                                                                                "tf": 1075
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "c": {
                                          "docs": {},
                                          "r": {
                                            "docs": {
                                              "api.course.quiz.html#create": {
                                                "ref": "api.course.quiz.html#create",
                                                "tf": 1075
                                              }
                                            },
                                            "e": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "m": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "l": {
                                                          "docs": {},
                                                          "t": {
                                                            "docs": {},
                                                            "i": {
                                                              "docs": {},
                                                              "p": {
                                                                "docs": {},
                                                                "l": {
                                                                  "docs": {},
                                                                  "e": {
                                                                    "docs": {},
                                                                    "c": {
                                                                      "docs": {},
                                                                      "h": {
                                                                        "docs": {},
                                                                        "o": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {},
                                                                            "c": {
                                                                              "docs": {},
                                                                              "e": {
                                                                                "docs": {},
                                                                                "q": {
                                                                                  "docs": {},
                                                                                  "u": {
                                                                                    "docs": {},
                                                                                    "e": {
                                                                                      "docs": {},
                                                                                      "s": {
                                                                                        "docs": {},
                                                                                        "t": {
                                                                                          "docs": {
                                                                                            "api.course.quiz.html#createMultipleChoiceQuestion": {
                                                                                              "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                                                                                              "tf": 1075
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "s": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "b": {
                                                          "docs": {},
                                                          "m": {
                                                            "docs": {},
                                                            "i": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {
                                                                    "api.course.quiz.html#createSubmission": {
                                                                      "ref": "api.course.quiz.html#createSubmission",
                                                                      "tf": 1075
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "d": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.quiz.html#delete": {
                                                      "ref": "api.course.quiz.html#delete",
                                                      "tf": 1075
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "r": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "b": {
                                    "docs": {},
                                    "r": {
                                      "docs": {
                                        "api.course.rubric.html": {
                                          "ref": "api.course.rubric.html",
                                          "tf": 1100
                                        }
                                      },
                                      "i": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "#": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "api.course.rubric.html#list": {
                                                        "ref": "api.course.rubric.html#list",
                                                        "tf": 1075
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "g": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.rubric.html#get": {
                                                      "ref": "api.course.rubric.html#get",
                                                      "tf": 1100
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "c": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "f": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "f": {
                                                                  "docs": {},
                                                                  "o": {
                                                                    "docs": {},
                                                                    "r": {
                                                                      "docs": {},
                                                                      "m": {
                                                                        "docs": {},
                                                                        "g": {
                                                                          "docs": {},
                                                                          "r": {
                                                                            "docs": {},
                                                                            "a": {
                                                                              "docs": {},
                                                                              "d": {
                                                                                "docs": {},
                                                                                "i": {
                                                                                  "docs": {},
                                                                                  "n": {
                                                                                    "docs": {},
                                                                                    "g": {
                                                                                      "docs": {},
                                                                                      "r": {
                                                                                        "docs": {},
                                                                                        "u": {
                                                                                          "docs": {},
                                                                                          "b": {
                                                                                            "docs": {},
                                                                                            "r": {
                                                                                              "docs": {},
                                                                                              "i": {
                                                                                                "docs": {},
                                                                                                "c": {
                                                                                                  "docs": {},
                                                                                                  "i": {
                                                                                                    "docs": {},
                                                                                                    "n": {
                                                                                                      "docs": {},
                                                                                                      "a": {
                                                                                                        "docs": {},
                                                                                                        "s": {
                                                                                                          "docs": {},
                                                                                                          "s": {
                                                                                                            "docs": {},
                                                                                                            "i": {
                                                                                                              "docs": {},
                                                                                                              "g": {
                                                                                                                "docs": {},
                                                                                                                "n": {
                                                                                                                  "docs": {
                                                                                                                    "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                                                                                                                      "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                                                                                                                      "tf": 1075
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "s": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "c": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "api.course.section.html": {
                                          "ref": "api.course.section.html",
                                          "tf": 1100
                                        }
                                      },
                                      "i": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "#": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {
                                                        "api.course.section.html#list": {
                                                          "ref": "api.course.section.html#list",
                                                          "tf": 1075
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              },
                                              "g": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "api.course.section.html#get": {
                                                        "ref": "api.course.section.html#get",
                                                        "tf": 1100
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "#": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "api.course.html#get": {
                                        "ref": "api.course.html#get",
                                        "tf": 1150
                                      }
                                    },
                                    "u": {
                                      "docs": {},
                                      "s": {
                                        "docs": {
                                          "api.course.html#getUser": {
                                            "ref": "api.course.html#getUser",
                                            "tf": 1100
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "l": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "l": {
                                                "docs": {
                                                  "api.course.html#listEnrollments": {
                                                    "ref": "api.course.html#listEnrollments",
                                                    "tf": 1100
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "s": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "d": {
                                              "docs": {
                                                "api.course.html#listStudents": {
                                                  "ref": "api.course.html#listStudents",
                                                  "tf": 1100
                                                }
                                              },
                                              "e": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "n": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "o": {
                                                            "docs": {},
                                                            "l": {
                                                              "docs": {
                                                                "api.course.html#listStudentEnrollments": {
                                                                  "ref": "api.course.html#listStudentEnrollments",
                                                                  "tf": 1100
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "t": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "c": {
                                              "docs": {},
                                              "h": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {},
                                                    "g": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "a": {
                                                            "docs": {},
                                                            "m": {
                                                              "docs": {},
                                                              "m": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "m": {
                                                                    "docs": {},
                                                                    "b": {
                                                                      "docs": {
                                                                        "api.course.html#listTeachingTeamMembers": {
                                                                          "ref": "api.course.html#listTeachingTeamMembers",
                                                                          "tf": 1100
                                                                        }
                                                                      },
                                                                      "e": {
                                                                        "docs": {},
                                                                        "r": {
                                                                          "docs": {},
                                                                          "e": {
                                                                            "docs": {},
                                                                            "n": {
                                                                              "docs": {},
                                                                              "r": {
                                                                                "docs": {},
                                                                                "o": {
                                                                                  "docs": {},
                                                                                  "l": {
                                                                                    "docs": {
                                                                                      "api.course.html#listTeachingTeamMemberEnrollments": {
                                                                                        "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                                                                                        "tf": 1100
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "d": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {
                                                    "api.course.html#listDesigners": {
                                                      "ref": "api.course.html#listDesigners",
                                                      "tf": 1100
                                                    }
                                                  },
                                                  "e": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "n": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "o": {
                                                              "docs": {},
                                                              "l": {
                                                                "docs": {
                                                                  "api.course.html#listDesignerEnrollments": {
                                                                    "ref": "api.course.html#listDesignerEnrollments",
                                                                    "tf": 1100
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "o": {
                                        "docs": {},
                                        "b": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "v": {
                                                  "docs": {
                                                    "api.course.html#listObservers": {
                                                      "ref": "api.course.html#listObservers",
                                                      "tf": 1100
                                                    }
                                                  },
                                                  "e": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "n": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "o": {
                                                              "docs": {},
                                                              "l": {
                                                                "docs": {
                                                                  "api.course.html#listObserverEnrollments": {
                                                                    "ref": "api.course.html#listObserverEnrollments",
                                                                    "tf": 1100
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "u": {
                                        "docs": {},
                                        "s": {
                                          "docs": {
                                            "api.course.html#listUsers": {
                                              "ref": "api.course.html#listUsers",
                                              "tf": 1100
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "u": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        ".": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "f": {
                                  "docs": {
                                    "api.user.self.html": {
                                      "ref": "api.user.self.html",
                                      "tf": 1100
                                    }
                                  },
                                  "#": {
                                    "docs": {},
                                    "g": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "f": {
                                                  "docs": {},
                                                  "i": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {
                                                        "api.user.self.html#getProfile": {
                                                          "ref": "api.user.self.html#getProfile",
                                                          "tf": 1075
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "l": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "s": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "c": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "u": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {
                                                        "api.user.self.html#listCourses": {
                                                          "ref": "api.user.self.html#listCourses",
                                                          "tf": 1075
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {
                "api.course.app.html": {
                  "ref": "api.course.app.html",
                  "tf": 607.1428571428571
                },
                "api.course.app.html#add": {
                  "ref": "api.course.app.html#add",
                  "tf": 10
                },
                "api.course.app.html#remove": {
                  "ref": "api.course.app.html#remove",
                  "tf": 10
                },
                "api.course.app.html#getMetadata": {
                  "ref": "api.course.app.html#getMetadata",
                  "tf": 5.128205128205128
                },
                "api.course.app.html#updateMetadata": {
                  "ref": "api.course.app.html#updateMetadata",
                  "tf": 5.263157894736842
                },
                "api.course.app.html#list": {
                  "ref": "api.course.app.html#list",
                  "tf": 10
                }
              },
              "#": {
                "docs": {},
                "g": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "api.course.app.html#get": {
                          "ref": "api.course.app.html#get",
                          "tf": 100
                        }
                      },
                      "m": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "d": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "a": {
                                      "docs": {
                                        "api.course.app.html#getMetadata": {
                                          "ref": "api.course.app.html#getMetadata",
                                          "tf": 75
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "a": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "api.course.app.html#add": {
                          "ref": "api.course.app.html#add",
                          "tf": 75
                        }
                      }
                    }
                  }
                },
                "r": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "v": {
                          "docs": {
                            "api.course.app.html#remove": {
                              "ref": "api.course.app.html#remove",
                              "tf": 75
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "u": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "d": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "m": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "d": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "a": {
                                            "docs": {
                                              "api.course.app.html#updateMetadata": {
                                                "ref": "api.course.app.html#updateMetadata",
                                                "tf": 75
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "l": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "api.course.app.html#list": {
                            "ref": "api.course.app.html#list",
                            "tf": 75
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "d": {
            "docs": {},
            "d": {
              "docs": {
                "api.course.app.html#add": {
                  "ref": "api.course.app.html#add",
                  "tf": 618.3333333333334
                },
                "api.course.assignment.html#createSubmissionComment": {
                  "ref": "api.course.assignment.html#createSubmissionComment",
                  "tf": 16.666666666666664
                },
                "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                  "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                  "tf": 4.545454545454546
                }
              }
            }
          },
          "s": {
            "docs": {},
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "g": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "api.course.assignment.html": {
                        "ref": "api.course.assignment.html",
                        "tf": 610
                      },
                      "api.course.assignment.html#list": {
                        "ref": "api.course.assignment.html#list",
                        "tf": 16.666666666666664
                      },
                      "api.course.assignment.html#get": {
                        "ref": "api.course.assignment.html#get",
                        "tf": 12.5
                      },
                      "api.course.assignment.html#update": {
                        "ref": "api.course.assignment.html#update",
                        "tf": 16.666666666666664
                      },
                      "api.course.assignment.html#create": {
                        "ref": "api.course.assignment.html#create",
                        "tf": 16.666666666666664
                      },
                      "api.course.assignment.html#delete": {
                        "ref": "api.course.assignment.html#delete",
                        "tf": 25
                      },
                      "api.course.assignment.html#listGradeableStudents": {
                        "ref": "api.course.assignment.html#listGradeableStudents",
                        "tf": 10
                      },
                      "api.course.assignment.html#listOverrides": {
                        "ref": "api.course.assignment.html#listOverrides",
                        "tf": 12.5
                      },
                      "api.course.assignment.html#getOverride": {
                        "ref": "api.course.assignment.html#getOverride",
                        "tf": 12.5
                      },
                      "api.course.assignment.html#createOverride": {
                        "ref": "api.course.assignment.html#createOverride",
                        "tf": 16.666666666666664
                      },
                      "api.course.assignment.html#deleteOverride": {
                        "ref": "api.course.assignment.html#deleteOverride",
                        "tf": 16.666666666666664
                      },
                      "api.course.assignment.html#listSubmissions": {
                        "ref": "api.course.assignment.html#listSubmissions",
                        "tf": 10
                      },
                      "api.course.assignment.html#getSubmission": {
                        "ref": "api.course.assignment.html#getSubmission",
                        "tf": 12.5
                      },
                      "api.course.assignmentGroup.html": {
                        "ref": "api.course.assignmentGroup.html",
                        "tf": 8.333333333333332
                      },
                      "api.course.assignmentGroup.html#listAssignmentGroups": {
                        "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                        "tf": 12.5
                      },
                      "api.course.assignmentGroup.html#getAssignmentGroup": {
                        "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                        "tf": 8.333333333333332
                      },
                      "api.course.assignmentGroup.html#update": {
                        "ref": "api.course.assignmentGroup.html#update",
                        "tf": 12.5
                      },
                      "api.course.assignmentGroup.html#create": {
                        "ref": "api.course.assignmentGroup.html#create",
                        "tf": 10
                      },
                      "api.course.assignmentGroup.html#delete": {
                        "ref": "api.course.assignmentGroup.html#delete",
                        "tf": 12.5
                      },
                      "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                        "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                        "tf": 4.545454545454546
                      }
                    },
                    "m": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "#": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "api.course.assignment.html#list": {
                                          "ref": "api.course.assignment.html#list",
                                          "tf": 75
                                        }
                                      },
                                      "g": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "b": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "s": {
                                                          "docs": {},
                                                          "t": {
                                                            "docs": {},
                                                            "u": {
                                                              "docs": {},
                                                              "d": {
                                                                "docs": {
                                                                  "api.course.assignment.html#listGradeableStudents": {
                                                                    "ref": "api.course.assignment.html#listGradeableStudents",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "o": {
                                        "docs": {},
                                        "v": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {},
                                                  "d": {
                                                    "docs": {
                                                      "api.course.assignment.html#listOverrides": {
                                                        "ref": "api.course.assignment.html#listOverrides",
                                                        "tf": 75
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "s": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "b": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {
                                                      "api.course.assignment.html#listSubmissions": {
                                                        "ref": "api.course.assignment.html#listSubmissions",
                                                        "tf": 75
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "g": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "api.course.assignment.html#get": {
                                        "ref": "api.course.assignment.html#get",
                                        "tf": 100
                                      }
                                    },
                                    "o": {
                                      "docs": {},
                                      "v": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "d": {
                                                  "docs": {
                                                    "api.course.assignment.html#getOverride": {
                                                      "ref": "api.course.assignment.html#getOverride",
                                                      "tf": 75
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "s": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "b": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "s": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {
                                                    "api.course.assignment.html#getSubmission": {
                                                      "ref": "api.course.assignment.html#getSubmission",
                                                      "tf": 75
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "u": {
                                "docs": {},
                                "p": {
                                  "docs": {},
                                  "d": {
                                    "docs": {
                                      "api.course.assignment.html#update": {
                                        "ref": "api.course.assignment.html#update",
                                        "tf": 75
                                      }
                                    },
                                    "a": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "g": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "d": {
                                                  "docs": {
                                                    "api.course.assignment.html#updateGrades": {
                                                      "ref": "api.course.assignment.html#updateGrades",
                                                      "tf": 75
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "c": {
                                "docs": {},
                                "r": {
                                  "docs": {
                                    "api.course.assignment.html#create": {
                                      "ref": "api.course.assignment.html#create",
                                      "tf": 75
                                    }
                                  },
                                  "e": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "u": {
                                              "docs": {},
                                              "b": {
                                                "docs": {},
                                                "m": {
                                                  "docs": {},
                                                  "i": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {},
                                                          "o": {
                                                            "docs": {},
                                                            "n": {
                                                              "docs": {},
                                                              "c": {
                                                                "docs": {},
                                                                "o": {
                                                                  "docs": {},
                                                                  "m": {
                                                                    "docs": {
                                                                      "api.course.assignment.html#createSubmissionComment": {
                                                                        "ref": "api.course.assignment.html#createSubmissionComment",
                                                                        "tf": 75
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "o": {
                                            "docs": {},
                                            "v": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "d": {
                                                        "docs": {
                                                          "api.course.assignment.html#createOverride": {
                                                            "ref": "api.course.assignment.html#createOverride",
                                                            "tf": 75
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "t": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "x": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "u": {
                                                      "docs": {},
                                                      "b": {
                                                        "docs": {},
                                                        "m": {
                                                          "docs": {},
                                                          "i": {
                                                            "docs": {},
                                                            "s": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {
                                                                  "api.course.assignment.html#createTextSubmission": {
                                                                    "ref": "api.course.assignment.html#createTextSubmission",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "u": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "u": {
                                                    "docs": {},
                                                    "b": {
                                                      "docs": {},
                                                      "m": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {},
                                                          "s": {
                                                            "docs": {},
                                                            "s": {
                                                              "docs": {
                                                                "api.course.assignment.html#createURLSubmission": {
                                                                  "ref": "api.course.assignment.html#createURLSubmission",
                                                                  "tf": 75
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "f": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "u": {
                                                      "docs": {},
                                                      "b": {
                                                        "docs": {},
                                                        "m": {
                                                          "docs": {},
                                                          "i": {
                                                            "docs": {},
                                                            "s": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {
                                                                  "api.course.assignment.html#createFileSubmission": {
                                                                    "ref": "api.course.assignment.html#createFileSubmission",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "d": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "l": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "api.course.assignment.html#delete": {
                                            "ref": "api.course.assignment.html#delete",
                                            "tf": 75
                                          }
                                        },
                                        "e": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "v": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "d": {
                                                        "docs": {
                                                          "api.course.assignment.html#deleteOverride": {
                                                            "ref": "api.course.assignment.html#deleteOverride",
                                                            "tf": 75
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "g": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "u": {
                                    "docs": {},
                                    "p": {
                                      "docs": {
                                        "api.course.assignmentGroup.html": {
                                          "ref": "api.course.assignmentGroup.html",
                                          "tf": 600
                                        }
                                      },
                                      "#": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {},
                                                      "i": {
                                                        "docs": {},
                                                        "g": {
                                                          "docs": {},
                                                          "n": {
                                                            "docs": {},
                                                            "m": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "n": {
                                                                  "docs": {},
                                                                  "t": {
                                                                    "docs": {},
                                                                    "g": {
                                                                      "docs": {},
                                                                      "r": {
                                                                        "docs": {},
                                                                        "o": {
                                                                          "docs": {},
                                                                          "u": {
                                                                            "docs": {},
                                                                            "p": {
                                                                              "docs": {
                                                                                "api.course.assignmentGroup.html#listAssignmentGroups": {
                                                                                  "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                                                                                  "tf": 75
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "g": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "t": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "g": {
                                                        "docs": {},
                                                        "n": {
                                                          "docs": {},
                                                          "m": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "n": {
                                                                "docs": {},
                                                                "t": {
                                                                  "docs": {},
                                                                  "g": {
                                                                    "docs": {},
                                                                    "r": {
                                                                      "docs": {},
                                                                      "o": {
                                                                        "docs": {},
                                                                        "u": {
                                                                          "docs": {},
                                                                          "p": {
                                                                            "docs": {
                                                                              "api.course.assignmentGroup.html#getAssignmentGroup": {
                                                                                "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                                                                                "tf": 75
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "d": {
                                              "docs": {
                                                "api.course.assignmentGroup.html#update": {
                                                  "ref": "api.course.assignmentGroup.html#update",
                                                  "tf": 75
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "c": {
                                          "docs": {},
                                          "r": {
                                            "docs": {
                                              "api.course.assignmentGroup.html#create": {
                                                "ref": "api.course.assignmentGroup.html#create",
                                                "tf": 75
                                              }
                                            }
                                          }
                                        },
                                        "d": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.assignmentGroup.html#delete": {
                                                      "ref": "api.course.assignmentGroup.html#delete",
                                                      "tf": 75
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "c": {
                  "docs": {},
                  "i": {
                    "docs": {
                      "api.user.self.html#listCourses": {
                        "ref": "api.user.self.html#listCourses",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {},
            "d": {
              "docs": {},
              "/": {
                "docs": {},
                "o": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "api.course.assignment.html#updateGrades": {
                        "ref": "api.course.assignment.html#updateGrades",
                        "tf": 5.555555555555555
                      }
                    }
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "i": {
              "docs": {},
              "a": {
                "docs": {
                  "api.course.groupSet.html#getGroup": {
                    "ref": "api.course.groupSet.html#getGroup",
                    "tf": 6.25
                  }
                }
              }
            }
          }
        },
        "b": {
          "docs": {},
          "e": {
            "docs": {},
            "h": {
              "docs": {},
              "a": {
                "docs": {},
                "v": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 7
                    }
                  }
                },
                "l": {
                  "docs": {},
                  "f": {
                    "docs": {
                      "api.course.assignment.html#createTextSubmission": {
                        "ref": "api.course.assignment.html#createTextSubmission",
                        "tf": 8.333333333333332
                      },
                      "api.course.assignment.html#createURLSubmission": {
                        "ref": "api.course.assignment.html#createURLSubmission",
                        "tf": 8.333333333333332
                      },
                      "api.course.assignment.html#createFileSubmission": {
                        "ref": "api.course.assignment.html#createFileSubmission",
                        "tf": 8.333333333333332
                      },
                      "api.course.quiz.html#createSubmission": {
                        "ref": "api.course.quiz.html#createSubmission",
                        "tf": 5.555555555555555
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "t": {
              "docs": {},
              "c": {
                "docs": {},
                "h": {
                  "docs": {
                    "api.course.assignment.html#updateGrades": {
                      "ref": "api.course.assignment.html#updateGrades",
                      "tf": 5.555555555555555
                    }
                  }
                }
              }
            }
          }
        },
        "c": {
          "docs": {},
          "a": {
            "docs": {},
            "c": {
              "docs": {},
              "c": {
                "docs": {},
                "l": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 300
                    }
                  }
                }
              }
            },
            "n": {
              "docs": {},
              "v": {
                "docs": {},
                "a": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 7
                    },
                    "api.course.app.html#add": {
                      "ref": "api.course.app.html#add",
                      "tf": 10
                    },
                    "api.course.app.html#remove": {
                      "ref": "api.course.app.html#remove",
                      "tf": 10
                    },
                    "api.course.assignment.html#update": {
                      "ref": "api.course.assignment.html#update",
                      "tf": 16.666666666666664
                    },
                    "api.course.assignment.html#create": {
                      "ref": "api.course.assignment.html#create",
                      "tf": 16.666666666666664
                    },
                    "api.course.page.html#update": {
                      "ref": "api.course.page.html#update",
                      "tf": 16.666666666666664
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "api.course.app.html#getMetadata": {
                    "ref": "api.course.app.html#getMetadata",
                    "tf": 1.282051282051282
                  },
                  "api.course.app.html#updateMetadata": {
                    "ref": "api.course.app.html#updateMetadata",
                    "tf": 1.3157894736842104
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "a": {
              "docs": {},
              "s": {
                "docs": {},
                "s": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 7
                    },
                    "api.course.app.html": {
                      "ref": "api.course.app.html",
                      "tf": 110
                    },
                    "api.course.assignment.html": {
                      "ref": "api.course.assignment.html",
                      "tf": 110
                    },
                    "api.course.assignmentGroup.html": {
                      "ref": "api.course.assignmentGroup.html",
                      "tf": 110
                    },
                    "api.course.gradebookColumn.html": {
                      "ref": "api.course.gradebookColumn.html",
                      "tf": 110
                    },
                    "api.course.group.html": {
                      "ref": "api.course.group.html",
                      "tf": 110
                    },
                    "api.course.groupSet.html": {
                      "ref": "api.course.groupSet.html",
                      "tf": 110
                    },
                    "api.course.page.html": {
                      "ref": "api.course.page.html",
                      "tf": 110
                    },
                    "api.course.quiz.html": {
                      "ref": "api.course.quiz.html",
                      "tf": 110
                    },
                    "api.course.rubric.html": {
                      "ref": "api.course.rubric.html",
                      "tf": 110
                    },
                    "api.course.section.html": {
                      "ref": "api.course.section.html",
                      "tf": 110
                    },
                    "api.course.html": {
                      "ref": "api.course.html",
                      "tf": 110
                    },
                    "api.user.self.html": {
                      "ref": "api.user.self.html",
                      "tf": 110
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "u": {
              "docs": {},
              "r": {
                "docs": {},
                "s": {
                  "docs": {
                    "api.course.app.html": {
                      "ref": "api.course.app.html",
                      "tf": 7.142857142857142
                    },
                    "api.course.app.html#add": {
                      "ref": "api.course.app.html#add",
                      "tf": 10
                    },
                    "api.course.app.html#remove": {
                      "ref": "api.course.app.html#remove",
                      "tf": 10
                    },
                    "api.course.app.html#getMetadata": {
                      "ref": "api.course.app.html#getMetadata",
                      "tf": 1.282051282051282
                    },
                    "api.course.app.html#updateMetadata": {
                      "ref": "api.course.app.html#updateMetadata",
                      "tf": 1.3157894736842104
                    },
                    "api.course.app.html#list": {
                      "ref": "api.course.app.html#list",
                      "tf": 10
                    },
                    "api.course.assignment.html": {
                      "ref": "api.course.assignment.html",
                      "tf": 10
                    },
                    "api.course.assignment.html#list": {
                      "ref": "api.course.assignment.html#list",
                      "tf": 16.666666666666664
                    },
                    "api.course.assignment.html#get": {
                      "ref": "api.course.assignment.html#get",
                      "tf": 12.5
                    },
                    "api.course.assignment.html#getOverride": {
                      "ref": "api.course.assignment.html#getOverride",
                      "tf": 12.5
                    },
                    "api.course.assignment.html#listSubmissions": {
                      "ref": "api.course.assignment.html#listSubmissions",
                      "tf": 10
                    },
                    "api.course.assignmentGroup.html": {
                      "ref": "api.course.assignmentGroup.html",
                      "tf": 8.333333333333332
                    },
                    "api.course.assignmentGroup.html#listAssignmentGroups": {
                      "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                      "tf": 12.5
                    },
                    "api.course.assignmentGroup.html#getAssignmentGroup": {
                      "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                      "tf": 8.333333333333332
                    },
                    "api.course.assignmentGroup.html#update": {
                      "ref": "api.course.assignmentGroup.html#update",
                      "tf": 12.5
                    },
                    "api.course.assignmentGroup.html#create": {
                      "ref": "api.course.assignmentGroup.html#create",
                      "tf": 10
                    },
                    "api.course.assignmentGroup.html#delete": {
                      "ref": "api.course.assignmentGroup.html#delete",
                      "tf": 12.5
                    },
                    "api.course.gradebookColumn.html": {
                      "ref": "api.course.gradebookColumn.html",
                      "tf": 8.333333333333332
                    },
                    "api.course.gradebookColumn.html#list": {
                      "ref": "api.course.gradebookColumn.html#list",
                      "tf": 8.333333333333332
                    },
                    "api.course.gradebookColumn.html#get": {
                      "ref": "api.course.gradebookColumn.html#get",
                      "tf": 3.3333333333333335
                    },
                    "api.course.gradebookColumn.html#create": {
                      "ref": "api.course.gradebookColumn.html#create",
                      "tf": 10
                    },
                    "api.course.gradebookColumn.html#delete": {
                      "ref": "api.course.gradebookColumn.html#delete",
                      "tf": 12.5
                    },
                    "api.course.gradebookColumn.html#listEntries": {
                      "ref": "api.course.gradebookColumn.html#listEntries",
                      "tf": 7.142857142857142
                    },
                    "api.course.gradebookColumn.html#updateEntries": {
                      "ref": "api.course.gradebookColumn.html#updateEntries",
                      "tf": 7.142857142857142
                    },
                    "api.course.group.html": {
                      "ref": "api.course.group.html",
                      "tf": 8.333333333333332
                    },
                    "api.course.group.html#get": {
                      "ref": "api.course.group.html#get",
                      "tf": 10
                    },
                    "api.course.groupSet.html": {
                      "ref": "api.course.groupSet.html",
                      "tf": 8.333333333333332
                    },
                    "api.course.groupSet.html#list": {
                      "ref": "api.course.groupSet.html#list",
                      "tf": 12.5
                    },
                    "api.course.groupSet.html#create": {
                      "ref": "api.course.groupSet.html#create",
                      "tf": 12.5
                    },
                    "api.course.page.html": {
                      "ref": "api.course.page.html",
                      "tf": 10
                    },
                    "api.course.page.html#list": {
                      "ref": "api.course.page.html#list",
                      "tf": 12.5
                    },
                    "api.course.page.html#create": {
                      "ref": "api.course.page.html#create",
                      "tf": 12.5
                    },
                    "api.course.page.html#delete": {
                      "ref": "api.course.page.html#delete",
                      "tf": 16.666666666666664
                    },
                    "api.course.page.html#get": {
                      "ref": "api.course.page.html#get",
                      "tf": 12.5
                    },
                    "api.course.quiz.html": {
                      "ref": "api.course.quiz.html",
                      "tf": 10
                    },
                    "api.course.quiz.html#list": {
                      "ref": "api.course.quiz.html#list",
                      "tf": 16.666666666666664
                    },
                    "api.course.quiz.html#get": {
                      "ref": "api.course.quiz.html#get",
                      "tf": 12.5
                    },
                    "api.course.quiz.html#update": {
                      "ref": "api.course.quiz.html#update",
                      "tf": 12.5
                    },
                    "api.course.quiz.html#create": {
                      "ref": "api.course.quiz.html#create",
                      "tf": 12.5
                    },
                    "api.course.quiz.html#delete": {
                      "ref": "api.course.quiz.html#delete",
                      "tf": 16.666666666666664
                    },
                    "api.course.quiz.html#listQuestions": {
                      "ref": "api.course.quiz.html#listQuestions",
                      "tf": 10
                    },
                    "api.course.quiz.html#createMultipleChoiceQuestion": {
                      "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                      "tf": 7.142857142857142
                    },
                    "api.course.quiz.html#listSubmissions": {
                      "ref": "api.course.quiz.html#listSubmissions",
                      "tf": 12.5
                    },
                    "api.course.quiz.html#getSubmission": {
                      "ref": "api.course.quiz.html#getSubmission",
                      "tf": 8.333333333333332
                    },
                    "api.course.quiz.html#createSubmission": {
                      "ref": "api.course.quiz.html#createSubmission",
                      "tf": 5.555555555555555
                    },
                    "api.course.quiz.html#listQuestionGrades": {
                      "ref": "api.course.quiz.html#listQuestionGrades",
                      "tf": 7.142857142857142
                    },
                    "api.course.quiz.html#updateQuestionGrades": {
                      "ref": "api.course.quiz.html#updateQuestionGrades",
                      "tf": 7.142857142857142
                    },
                    "api.course.rubric.html": {
                      "ref": "api.course.rubric.html",
                      "tf": 10
                    },
                    "api.course.rubric.html#list": {
                      "ref": "api.course.rubric.html#list",
                      "tf": 12.5
                    },
                    "api.course.rubric.html#get": {
                      "ref": "api.course.rubric.html#get",
                      "tf": 10
                    },
                    "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                      "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                      "tf": 4.545454545454546
                    },
                    "api.course.section.html": {
                      "ref": "api.course.section.html",
                      "tf": 10
                    },
                    "api.course.section.html#list": {
                      "ref": "api.course.section.html#list",
                      "tf": 12.5
                    },
                    "api.course.html": {
                      "ref": "api.course.html",
                      "tf": 766.6666666666666
                    },
                    "api.course.html#get": {
                      "ref": "api.course.html#get",
                      "tf": 12.5
                    },
                    "api.course.html#listEnrollments": {
                      "ref": "api.course.html#listEnrollments",
                      "tf": 12.5
                    },
                    "api.course.html#listStudentEnrollments": {
                      "ref": "api.course.html#listStudentEnrollments",
                      "tf": 10
                    },
                    "api.course.html#listTeachingTeamMemberEnrollments": {
                      "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                      "tf": 8.333333333333332
                    },
                    "api.course.html#listDesignerEnrollments": {
                      "ref": "api.course.html#listDesignerEnrollments",
                      "tf": 10
                    },
                    "api.course.html#listObserverEnrollments": {
                      "ref": "api.course.html#listObserverEnrollments",
                      "tf": 10
                    },
                    "api.course.html#getUser": {
                      "ref": "api.course.html#getUser",
                      "tf": 10
                    },
                    "api.course.html#listUsers": {
                      "ref": "api.course.html#listUsers",
                      "tf": 12.5
                    },
                    "api.course.html#listStudents": {
                      "ref": "api.course.html#listStudents",
                      "tf": 12.5
                    },
                    "api.course.html#listTeachingTeamMembers": {
                      "ref": "api.course.html#listTeachingTeamMembers",
                      "tf": 10
                    },
                    "api.course.html#listDesigners": {
                      "ref": "api.course.html#listDesigners",
                      "tf": 12.5
                    },
                    "api.course.html#listObservers": {
                      "ref": "api.course.html#listObservers",
                      "tf": 12.5
                    },
                    "api.user.self.html#listCourses": {
                      "ref": "api.user.self.html#listCourses",
                      "tf": 8.333333333333332
                    }
                  },
                  "e": {
                    "docs": {},
                    ".": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "p": {
                            "docs": {
                              "api.course.app.html": {
                                "ref": "api.course.app.html",
                                "tf": 200
                              }
                            },
                            "#": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "api.course.app.html#get": {
                                        "ref": "api.course.app.html#get",
                                        "tf": 100
                                      }
                                    },
                                    "m": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "d": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {
                                                      "api.course.app.html#getMetadata": {
                                                        "ref": "api.course.app.html#getMetadata",
                                                        "tf": 75
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "a": {
                                "docs": {},
                                "d": {
                                  "docs": {},
                                  "d": {
                                    "docs": {
                                      "api.course.app.html#add": {
                                        "ref": "api.course.app.html#add",
                                        "tf": 75
                                      }
                                    }
                                  }
                                }
                              },
                              "r": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "v": {
                                        "docs": {
                                          "api.course.app.html#remove": {
                                            "ref": "api.course.app.html#remove",
                                            "tf": 75
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "u": {
                                "docs": {},
                                "p": {
                                  "docs": {},
                                  "d": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "a": {
                                                  "docs": {},
                                                  "d": {
                                                    "docs": {},
                                                    "a": {
                                                      "docs": {},
                                                      "t": {
                                                        "docs": {},
                                                        "a": {
                                                          "docs": {
                                                            "api.course.app.html#updateMetadata": {
                                                              "ref": "api.course.app.html#updateMetadata",
                                                              "tf": 75
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "l": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "api.course.app.html#list": {
                                          "ref": "api.course.app.html#list",
                                          "tf": 75
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "s": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "n": {
                                  "docs": {
                                    "api.course.assignment.html": {
                                      "ref": "api.course.assignment.html",
                                      "tf": 200
                                    }
                                  },
                                  "m": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "#": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {
                                                      "api.course.assignment.html#list": {
                                                        "ref": "api.course.assignment.html#list",
                                                        "tf": 75
                                                      }
                                                    },
                                                    "g": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "a": {
                                                          "docs": {},
                                                          "d": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "a": {
                                                                "docs": {},
                                                                "b": {
                                                                  "docs": {},
                                                                  "l": {
                                                                    "docs": {},
                                                                    "e": {
                                                                      "docs": {},
                                                                      "s": {
                                                                        "docs": {},
                                                                        "t": {
                                                                          "docs": {},
                                                                          "u": {
                                                                            "docs": {},
                                                                            "d": {
                                                                              "docs": {
                                                                                "api.course.assignment.html#listGradeableStudents": {
                                                                                  "ref": "api.course.assignment.html#listGradeableStudents",
                                                                                  "tf": 75
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "o": {
                                                      "docs": {},
                                                      "v": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "r": {
                                                              "docs": {},
                                                              "i": {
                                                                "docs": {},
                                                                "d": {
                                                                  "docs": {
                                                                    "api.course.assignment.html#listOverrides": {
                                                                      "ref": "api.course.assignment.html#listOverrides",
                                                                      "tf": 75
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    },
                                                    "s": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "b": {
                                                          "docs": {},
                                                          "m": {
                                                            "docs": {},
                                                            "i": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {
                                                                    "api.course.assignment.html#listSubmissions": {
                                                                      "ref": "api.course.assignment.html#listSubmissions",
                                                                      "tf": 75
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "g": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.assignment.html#get": {
                                                      "ref": "api.course.assignment.html#get",
                                                      "tf": 100
                                                    }
                                                  },
                                                  "o": {
                                                    "docs": {},
                                                    "v": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "i": {
                                                              "docs": {},
                                                              "d": {
                                                                "docs": {
                                                                  "api.course.assignment.html#getOverride": {
                                                                    "ref": "api.course.assignment.html#getOverride",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  },
                                                  "s": {
                                                    "docs": {},
                                                    "u": {
                                                      "docs": {},
                                                      "b": {
                                                        "docs": {},
                                                        "m": {
                                                          "docs": {},
                                                          "i": {
                                                            "docs": {},
                                                            "s": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {
                                                                  "api.course.assignment.html#getSubmission": {
                                                                    "ref": "api.course.assignment.html#getSubmission",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "u": {
                                              "docs": {},
                                              "p": {
                                                "docs": {},
                                                "d": {
                                                  "docs": {
                                                    "api.course.assignment.html#update": {
                                                      "ref": "api.course.assignment.html#update",
                                                      "tf": 75
                                                    }
                                                  },
                                                  "a": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "g": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "a": {
                                                              "docs": {},
                                                              "d": {
                                                                "docs": {
                                                                  "api.course.assignment.html#updateGrades": {
                                                                    "ref": "api.course.assignment.html#updateGrades",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "c": {
                                              "docs": {},
                                              "r": {
                                                "docs": {
                                                  "api.course.assignment.html#create": {
                                                    "ref": "api.course.assignment.html#create",
                                                    "tf": 75
                                                  }
                                                },
                                                "e": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "s": {
                                                          "docs": {},
                                                          "u": {
                                                            "docs": {},
                                                            "b": {
                                                              "docs": {},
                                                              "m": {
                                                                "docs": {},
                                                                "i": {
                                                                  "docs": {},
                                                                  "s": {
                                                                    "docs": {},
                                                                    "s": {
                                                                      "docs": {},
                                                                      "i": {
                                                                        "docs": {},
                                                                        "o": {
                                                                          "docs": {},
                                                                          "n": {
                                                                            "docs": {},
                                                                            "c": {
                                                                              "docs": {},
                                                                              "o": {
                                                                                "docs": {},
                                                                                "m": {
                                                                                  "docs": {
                                                                                    "api.course.assignment.html#createSubmissionComment": {
                                                                                      "ref": "api.course.assignment.html#createSubmissionComment",
                                                                                      "tf": 75
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        },
                                                        "o": {
                                                          "docs": {},
                                                          "v": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "r": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "d": {
                                                                      "docs": {
                                                                        "api.course.assignment.html#createOverride": {
                                                                          "ref": "api.course.assignment.html#createOverride",
                                                                          "tf": 75
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        },
                                                        "t": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "x": {
                                                              "docs": {},
                                                              "t": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "u": {
                                                                    "docs": {},
                                                                    "b": {
                                                                      "docs": {},
                                                                      "m": {
                                                                        "docs": {},
                                                                        "i": {
                                                                          "docs": {},
                                                                          "s": {
                                                                            "docs": {},
                                                                            "s": {
                                                                              "docs": {
                                                                                "api.course.assignment.html#createTextSubmission": {
                                                                                  "ref": "api.course.assignment.html#createTextSubmission",
                                                                                  "tf": 75
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        },
                                                        "u": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "l": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {},
                                                                "u": {
                                                                  "docs": {},
                                                                  "b": {
                                                                    "docs": {},
                                                                    "m": {
                                                                      "docs": {},
                                                                      "i": {
                                                                        "docs": {},
                                                                        "s": {
                                                                          "docs": {},
                                                                          "s": {
                                                                            "docs": {
                                                                              "api.course.assignment.html#createURLSubmission": {
                                                                                "ref": "api.course.assignment.html#createURLSubmission",
                                                                                "tf": 75
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        },
                                                        "f": {
                                                          "docs": {},
                                                          "i": {
                                                            "docs": {},
                                                            "l": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "u": {
                                                                    "docs": {},
                                                                    "b": {
                                                                      "docs": {},
                                                                      "m": {
                                                                        "docs": {},
                                                                        "i": {
                                                                          "docs": {},
                                                                          "s": {
                                                                            "docs": {},
                                                                            "s": {
                                                                              "docs": {
                                                                                "api.course.assignment.html#createFileSubmission": {
                                                                                  "ref": "api.course.assignment.html#createFileSubmission",
                                                                                  "tf": 75
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "d": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {
                                                        "api.course.assignment.html#delete": {
                                                          "ref": "api.course.assignment.html#delete",
                                                          "tf": 75
                                                        }
                                                      },
                                                      "e": {
                                                        "docs": {},
                                                        "o": {
                                                          "docs": {},
                                                          "v": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "r": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "d": {
                                                                      "docs": {
                                                                        "api.course.assignment.html#deleteOverride": {
                                                                          "ref": "api.course.assignment.html#deleteOverride",
                                                                          "tf": 75
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          },
                                          "g": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "o": {
                                                "docs": {},
                                                "u": {
                                                  "docs": {},
                                                  "p": {
                                                    "docs": {
                                                      "api.course.assignmentGroup.html": {
                                                        "ref": "api.course.assignmentGroup.html",
                                                        "tf": 200
                                                      }
                                                    },
                                                    "#": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {},
                                                          "s": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {},
                                                              "a": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "s": {
                                                                    "docs": {},
                                                                    "i": {
                                                                      "docs": {},
                                                                      "g": {
                                                                        "docs": {},
                                                                        "n": {
                                                                          "docs": {},
                                                                          "m": {
                                                                            "docs": {},
                                                                            "e": {
                                                                              "docs": {},
                                                                              "n": {
                                                                                "docs": {},
                                                                                "t": {
                                                                                  "docs": {},
                                                                                  "g": {
                                                                                    "docs": {},
                                                                                    "r": {
                                                                                      "docs": {},
                                                                                      "o": {
                                                                                        "docs": {},
                                                                                        "u": {
                                                                                          "docs": {},
                                                                                          "p": {
                                                                                            "docs": {
                                                                                              "api.course.assignmentGroup.html#listAssignmentGroups": {
                                                                                                "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                                                                                                "tf": 75
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "g": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "t": {
                                                            "docs": {},
                                                            "a": {
                                                              "docs": {},
                                                              "s": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "g": {
                                                                      "docs": {},
                                                                      "n": {
                                                                        "docs": {},
                                                                        "m": {
                                                                          "docs": {},
                                                                          "e": {
                                                                            "docs": {},
                                                                            "n": {
                                                                              "docs": {},
                                                                              "t": {
                                                                                "docs": {},
                                                                                "g": {
                                                                                  "docs": {},
                                                                                  "r": {
                                                                                    "docs": {},
                                                                                    "o": {
                                                                                      "docs": {},
                                                                                      "u": {
                                                                                        "docs": {},
                                                                                        "p": {
                                                                                          "docs": {
                                                                                            "api.course.assignmentGroup.html#getAssignmentGroup": {
                                                                                              "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                                                                                              "tf": 75
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "u": {
                                                        "docs": {},
                                                        "p": {
                                                          "docs": {},
                                                          "d": {
                                                            "docs": {
                                                              "api.course.assignmentGroup.html#update": {
                                                                "ref": "api.course.assignmentGroup.html#update",
                                                                "tf": 75
                                                              }
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "c": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {
                                                            "api.course.assignmentGroup.html#create": {
                                                              "ref": "api.course.assignmentGroup.html#create",
                                                              "tf": 75
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "d": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "l": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "t": {
                                                                "docs": {
                                                                  "api.course.assignmentGroup.html#delete": {
                                                                    "ref": "api.course.assignmentGroup.html#delete",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "g": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "d": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "b": {
                                  "docs": {},
                                  "o": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "k": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "m": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {
                                                      "api.course.gradebookColumn.html": {
                                                        "ref": "api.course.gradebookColumn.html",
                                                        "tf": 200
                                                      }
                                                    },
                                                    "#": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {},
                                                          "s": {
                                                            "docs": {},
                                                            "t": {
                                                              "docs": {
                                                                "api.course.gradebookColumn.html#list": {
                                                                  "ref": "api.course.gradebookColumn.html#list",
                                                                  "tf": 75
                                                                }
                                                              },
                                                              "e": {
                                                                "docs": {},
                                                                "n": {
                                                                  "docs": {},
                                                                  "t": {
                                                                    "docs": {},
                                                                    "r": {
                                                                      "docs": {},
                                                                      "i": {
                                                                        "docs": {
                                                                          "api.course.gradebookColumn.html#listEntries": {
                                                                            "ref": "api.course.gradebookColumn.html#listEntries",
                                                                            "tf": 75
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "g": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "t": {
                                                            "docs": {
                                                              "api.course.gradebookColumn.html#get": {
                                                                "ref": "api.course.gradebookColumn.html#get",
                                                                "tf": 100
                                                              }
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "u": {
                                                        "docs": {},
                                                        "p": {
                                                          "docs": {},
                                                          "d": {
                                                            "docs": {
                                                              "api.course.gradebookColumn.html#update": {
                                                                "ref": "api.course.gradebookColumn.html#update",
                                                                "tf": 75
                                                              }
                                                            },
                                                            "a": {
                                                              "docs": {},
                                                              "t": {
                                                                "docs": {},
                                                                "e": {
                                                                  "docs": {},
                                                                  "e": {
                                                                    "docs": {},
                                                                    "n": {
                                                                      "docs": {},
                                                                      "t": {
                                                                        "docs": {},
                                                                        "r": {
                                                                          "docs": {},
                                                                          "i": {
                                                                            "docs": {
                                                                              "api.course.gradebookColumn.html#updateEntries": {
                                                                                "ref": "api.course.gradebookColumn.html#updateEntries",
                                                                                "tf": 75
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "c": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {
                                                            "api.course.gradebookColumn.html#create": {
                                                              "ref": "api.course.gradebookColumn.html#create",
                                                              "tf": 75
                                                            }
                                                          }
                                                        }
                                                      },
                                                      "d": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "l": {
                                                            "docs": {},
                                                            "e": {
                                                              "docs": {},
                                                              "t": {
                                                                "docs": {
                                                                  "api.course.gradebookColumn.html#delete": {
                                                                    "ref": "api.course.gradebookColumn.html#delete",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "o": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "p": {
                                "docs": {
                                  "api.course.group.html": {
                                    "ref": "api.course.group.html",
                                    "tf": 200
                                  }
                                },
                                "#": {
                                  "docs": {},
                                  "g": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "api.course.group.html#get": {
                                            "ref": "api.course.group.html#get",
                                            "tf": 100
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "l": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "m": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "m": {
                                                "docs": {},
                                                "b": {
                                                  "docs": {
                                                    "api.course.group.html#listMembers": {
                                                      "ref": "api.course.group.html#listMembers",
                                                      "tf": 75
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  },
                                  "u": {
                                    "docs": {},
                                    "p": {
                                      "docs": {},
                                      "d": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "m": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "m": {
                                                    "docs": {},
                                                    "b": {
                                                      "docs": {
                                                        "api.course.group.html#updateMembers": {
                                                          "ref": "api.course.group.html#updateMembers",
                                                          "tf": 75
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "s": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "api.course.groupSet.html": {
                                          "ref": "api.course.groupSet.html",
                                          "tf": 200
                                        }
                                      },
                                      "#": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "api.course.groupSet.html#list": {
                                                    "ref": "api.course.groupSet.html#list",
                                                    "tf": 75
                                                  }
                                                },
                                                "g": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "u": {
                                                        "docs": {},
                                                        "p": {
                                                          "docs": {
                                                            "api.course.groupSet.html#listGroups": {
                                                              "ref": "api.course.groupSet.html#listGroups",
                                                              "tf": 75
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "g": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "api.course.groupSet.html#get": {
                                                  "ref": "api.course.groupSet.html#get",
                                                  "tf": 100
                                                }
                                              },
                                              "g": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "u": {
                                                      "docs": {},
                                                      "p": {
                                                        "docs": {
                                                          "api.course.groupSet.html#getGroup": {
                                                            "ref": "api.course.groupSet.html#getGroup",
                                                            "tf": 75
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "c": {
                                          "docs": {},
                                          "r": {
                                            "docs": {
                                              "api.course.groupSet.html#create": {
                                                "ref": "api.course.groupSet.html#create",
                                                "tf": 75
                                              }
                                            },
                                            "e": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "g": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "o": {
                                                          "docs": {},
                                                          "u": {
                                                            "docs": {},
                                                            "p": {
                                                              "docs": {
                                                                "api.course.groupSet.html#createGroup": {
                                                                  "ref": "api.course.groupSet.html#createGroup",
                                                                  "tf": 75
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "d": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.groupSet.html#delete": {
                                                      "ref": "api.course.groupSet.html#delete",
                                                      "tf": 75
                                                    }
                                                  },
                                                  "e": {
                                                    "docs": {},
                                                    "g": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "o": {
                                                          "docs": {},
                                                          "u": {
                                                            "docs": {},
                                                            "p": {
                                                              "docs": {
                                                                "api.course.groupSet.html#deleteGroup": {
                                                                  "ref": "api.course.groupSet.html#deleteGroup",
                                                                  "tf": 75
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "p": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "g": {
                            "docs": {
                              "api.course.page.html": {
                                "ref": "api.course.page.html",
                                "tf": 200
                              }
                            },
                            "e": {
                              "docs": {},
                              "#": {
                                "docs": {},
                                "l": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "api.course.page.html#list": {
                                            "ref": "api.course.page.html#list",
                                            "tf": 75
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "u": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "d": {
                                      "docs": {
                                        "api.course.page.html#update": {
                                          "ref": "api.course.page.html#update",
                                          "tf": 75
                                        }
                                      }
                                    }
                                  }
                                },
                                "c": {
                                  "docs": {},
                                  "r": {
                                    "docs": {
                                      "api.course.page.html#create": {
                                        "ref": "api.course.page.html#create",
                                        "tf": 75
                                      }
                                    }
                                  }
                                },
                                "d": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "l": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "t": {
                                          "docs": {
                                            "api.course.page.html#delete": {
                                              "ref": "api.course.page.html#delete",
                                              "tf": 75
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "g": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "api.course.page.html#get": {
                                          "ref": "api.course.page.html#get",
                                          "tf": 100
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "q": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "z": {
                              "docs": {
                                "api.course.quiz.html": {
                                  "ref": "api.course.quiz.html",
                                  "tf": 200
                                }
                              },
                              "#": {
                                "docs": {},
                                "l": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "t": {
                                        "docs": {
                                          "api.course.quiz.html#list": {
                                            "ref": "api.course.quiz.html#list",
                                            "tf": 75
                                          }
                                        },
                                        "q": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "s": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.quiz.html#listQuestions": {
                                                      "ref": "api.course.quiz.html#listQuestions",
                                                      "tf": 75
                                                    }
                                                  },
                                                  "i": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "n": {
                                                        "docs": {},
                                                        "g": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "a": {
                                                              "docs": {},
                                                              "d": {
                                                                "docs": {
                                                                  "api.course.quiz.html#listQuestionGrades": {
                                                                    "ref": "api.course.quiz.html#listQuestionGrades",
                                                                    "tf": 75
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "s": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "b": {
                                              "docs": {},
                                              "m": {
                                                "docs": {},
                                                "i": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "s": {
                                                      "docs": {
                                                        "api.course.quiz.html#listSubmissions": {
                                                          "ref": "api.course.quiz.html#listSubmissions",
                                                          "tf": 75
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "g": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "t": {
                                      "docs": {
                                        "api.course.quiz.html#get": {
                                          "ref": "api.course.quiz.html#get",
                                          "tf": 100
                                        }
                                      },
                                      "s": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "b": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "i": {
                                                "docs": {},
                                                "s": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {
                                                      "api.course.quiz.html#getSubmission": {
                                                        "ref": "api.course.quiz.html#getSubmission",
                                                        "tf": 75
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "u": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "d": {
                                      "docs": {
                                        "api.course.quiz.html#update": {
                                          "ref": "api.course.quiz.html#update",
                                          "tf": 75
                                        }
                                      },
                                      "a": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "q": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "s": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {},
                                                      "i": {
                                                        "docs": {},
                                                        "o": {
                                                          "docs": {},
                                                          "n": {
                                                            "docs": {},
                                                            "g": {
                                                              "docs": {},
                                                              "r": {
                                                                "docs": {},
                                                                "a": {
                                                                  "docs": {},
                                                                  "d": {
                                                                    "docs": {
                                                                      "api.course.quiz.html#updateQuestionGrades": {
                                                                        "ref": "api.course.quiz.html#updateQuestionGrades",
                                                                        "tf": 75
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "c": {
                                  "docs": {},
                                  "r": {
                                    "docs": {
                                      "api.course.quiz.html#create": {
                                        "ref": "api.course.quiz.html#create",
                                        "tf": 75
                                      }
                                    },
                                    "e": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "t": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "l": {
                                                  "docs": {},
                                                  "t": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "p": {
                                                        "docs": {},
                                                        "l": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "c": {
                                                              "docs": {},
                                                              "h": {
                                                                "docs": {},
                                                                "o": {
                                                                  "docs": {},
                                                                  "i": {
                                                                    "docs": {},
                                                                    "c": {
                                                                      "docs": {},
                                                                      "e": {
                                                                        "docs": {},
                                                                        "q": {
                                                                          "docs": {},
                                                                          "u": {
                                                                            "docs": {},
                                                                            "e": {
                                                                              "docs": {},
                                                                              "s": {
                                                                                "docs": {},
                                                                                "t": {
                                                                                  "docs": {
                                                                                    "api.course.quiz.html#createMultipleChoiceQuestion": {
                                                                                      "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                                                                                      "tf": 75
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            },
                                            "s": {
                                              "docs": {},
                                              "u": {
                                                "docs": {},
                                                "b": {
                                                  "docs": {},
                                                  "m": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "s": {
                                                          "docs": {
                                                            "api.course.quiz.html#createSubmission": {
                                                              "ref": "api.course.quiz.html#createSubmission",
                                                              "tf": 75
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "d": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "l": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "t": {
                                          "docs": {
                                            "api.course.quiz.html#delete": {
                                              "ref": "api.course.quiz.html#delete",
                                              "tf": 75
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "r": {
                        "docs": {},
                        "u": {
                          "docs": {},
                          "b": {
                            "docs": {},
                            "r": {
                              "docs": {
                                "api.course.rubric.html": {
                                  "ref": "api.course.rubric.html",
                                  "tf": 200
                                }
                              },
                              "i": {
                                "docs": {},
                                "c": {
                                  "docs": {},
                                  "#": {
                                    "docs": {},
                                    "l": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "s": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "api.course.rubric.html#list": {
                                                "ref": "api.course.rubric.html#list",
                                                "tf": 75
                                              }
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "g": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "t": {
                                          "docs": {
                                            "api.course.rubric.html#get": {
                                              "ref": "api.course.rubric.html#get",
                                              "tf": 100
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "c": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "a": {
                                            "docs": {},
                                            "t": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "f": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "e": {
                                                        "docs": {},
                                                        "f": {
                                                          "docs": {},
                                                          "o": {
                                                            "docs": {},
                                                            "r": {
                                                              "docs": {},
                                                              "m": {
                                                                "docs": {},
                                                                "g": {
                                                                  "docs": {},
                                                                  "r": {
                                                                    "docs": {},
                                                                    "a": {
                                                                      "docs": {},
                                                                      "d": {
                                                                        "docs": {},
                                                                        "i": {
                                                                          "docs": {},
                                                                          "n": {
                                                                            "docs": {},
                                                                            "g": {
                                                                              "docs": {},
                                                                              "r": {
                                                                                "docs": {},
                                                                                "u": {
                                                                                  "docs": {},
                                                                                  "b": {
                                                                                    "docs": {},
                                                                                    "r": {
                                                                                      "docs": {},
                                                                                      "i": {
                                                                                        "docs": {},
                                                                                        "c": {
                                                                                          "docs": {},
                                                                                          "i": {
                                                                                            "docs": {},
                                                                                            "n": {
                                                                                              "docs": {},
                                                                                              "a": {
                                                                                                "docs": {},
                                                                                                "s": {
                                                                                                  "docs": {},
                                                                                                  "s": {
                                                                                                    "docs": {},
                                                                                                    "i": {
                                                                                                      "docs": {},
                                                                                                      "g": {
                                                                                                        "docs": {},
                                                                                                        "n": {
                                                                                                          "docs": {
                                                                                                            "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                                                                                                              "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                                                                                                              "tf": 75
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "s": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "c": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "api.course.section.html": {
                                  "ref": "api.course.section.html",
                                  "tf": 200
                                }
                              },
                              "i": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "#": {
                                      "docs": {},
                                      "l": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "s": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "api.course.section.html#list": {
                                                  "ref": "api.course.section.html#list",
                                                  "tf": 75
                                                }
                                              }
                                            }
                                          }
                                        }
                                      },
                                      "g": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "t": {
                                            "docs": {
                                              "api.course.section.html#get": {
                                                "ref": "api.course.section.html#get",
                                                "tf": 100
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "#": {
                      "docs": {},
                      "g": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "api.course.html#get": {
                                "ref": "api.course.html#get",
                                "tf": 150
                              }
                            },
                            "u": {
                              "docs": {},
                              "s": {
                                "docs": {
                                  "api.course.html#getUser": {
                                    "ref": "api.course.html#getUser",
                                    "tf": 100
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "l": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "l": {
                                        "docs": {
                                          "api.course.html#listEnrollments": {
                                            "ref": "api.course.html#listEnrollments",
                                            "tf": 100
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "s": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "u": {
                                    "docs": {},
                                    "d": {
                                      "docs": {
                                        "api.course.html#listStudents": {
                                          "ref": "api.course.html#listStudents",
                                          "tf": 100
                                        }
                                      },
                                      "e": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "n": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "l": {
                                                      "docs": {
                                                        "api.course.html#listStudentEnrollments": {
                                                          "ref": "api.course.html#listStudentEnrollments",
                                                          "tf": 100
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "t": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "a": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "h": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "n": {
                                            "docs": {},
                                            "g": {
                                              "docs": {},
                                              "t": {
                                                "docs": {},
                                                "e": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "m": {
                                                      "docs": {},
                                                      "m": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "m": {
                                                            "docs": {},
                                                            "b": {
                                                              "docs": {
                                                                "api.course.html#listTeachingTeamMembers": {
                                                                  "ref": "api.course.html#listTeachingTeamMembers",
                                                                  "tf": 100
                                                                }
                                                              },
                                                              "e": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {},
                                                                  "e": {
                                                                    "docs": {},
                                                                    "n": {
                                                                      "docs": {},
                                                                      "r": {
                                                                        "docs": {},
                                                                        "o": {
                                                                          "docs": {},
                                                                          "l": {
                                                                            "docs": {
                                                                              "api.course.html#listTeachingTeamMemberEnrollments": {
                                                                                "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                                                                                "tf": 100
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "d": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "n": {
                                          "docs": {
                                            "api.course.html#listDesigners": {
                                              "ref": "api.course.html#listDesigners",
                                              "tf": 100
                                            }
                                          },
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {
                                                          "api.course.html#listDesignerEnrollments": {
                                                            "ref": "api.course.html#listDesignerEnrollments",
                                                            "tf": 100
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "o": {
                                "docs": {},
                                "b": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "v": {
                                          "docs": {
                                            "api.course.html#listObservers": {
                                              "ref": "api.course.html#listObservers",
                                              "tf": 100
                                            }
                                          },
                                          "e": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "n": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "l": {
                                                        "docs": {
                                                          "api.course.html#listObserverEnrollments": {
                                                            "ref": "api.course.html#listObserverEnrollments",
                                                            "tf": 100
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "u": {
                                "docs": {},
                                "s": {
                                  "docs": {
                                    "api.course.html#listUsers": {
                                      "ref": "api.course.html#listUsers",
                                      "tf": 100
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "m": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "api.course.assignment.html#createSubmissionComment": {
                          "ref": "api.course.assignment.html#createSubmissionComment",
                          "tf": 16.666666666666664
                        },
                        "api.course.assignment.html#updateGrades": {
                          "ref": "api.course.assignment.html#updateGrades",
                          "tf": 5.555555555555555
                        },
                        "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                          "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                          "tf": 4.545454545454546
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "u": {
                "docs": {},
                "m": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "api.course.gradebookColumn.html": {
                        "ref": "api.course.gradebookColumn.html",
                        "tf": 8.333333333333332
                      },
                      "api.course.gradebookColumn.html#list": {
                        "ref": "api.course.gradebookColumn.html#list",
                        "tf": 8.333333333333332
                      },
                      "api.course.gradebookColumn.html#get": {
                        "ref": "api.course.gradebookColumn.html#get",
                        "tf": 6.666666666666667
                      },
                      "api.course.gradebookColumn.html#create": {
                        "ref": "api.course.gradebookColumn.html#create",
                        "tf": 10
                      },
                      "api.course.gradebookColumn.html#delete": {
                        "ref": "api.course.gradebookColumn.html#delete",
                        "tf": 12.5
                      },
                      "api.course.gradebookColumn.html#listEntries": {
                        "ref": "api.course.gradebookColumn.html#listEntries",
                        "tf": 7.142857142857142
                      },
                      "api.course.gradebookColumn.html#updateEntries": {
                        "ref": "api.course.gradebookColumn.html#updateEntries",
                        "tf": 7.142857142857142
                      }
                    },
                    "'": {
                      "docs": {
                        "api.course.gradebookColumn.html#update": {
                          "ref": "api.course.gradebookColumn.html#update",
                          "tf": 12.5
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "o": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "api.course.app.html#getMetadata": {
                        "ref": "api.course.app.html#getMetadata",
                        "tf": 1.282051282051282
                      },
                      "api.course.app.html#updateMetadata": {
                        "ref": "api.course.app.html#updateMetadata",
                        "tf": 1.3157894736842104
                      },
                      "api.course.gradebookColumn.html#list": {
                        "ref": "api.course.gradebookColumn.html#list",
                        "tf": 8.333333333333332
                      }
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "api.course.assignment.html#createTextSubmission": {
                          "ref": "api.course.assignment.html#createTextSubmission",
                          "tf": 8.333333333333332
                        },
                        "api.course.assignment.html#createURLSubmission": {
                          "ref": "api.course.assignment.html#createURLSubmission",
                          "tf": 8.333333333333332
                        },
                        "api.course.assignment.html#createFileSubmission": {
                          "ref": "api.course.assignment.html#createFileSubmission",
                          "tf": 8.333333333333332
                        },
                        "api.course.quiz.html#createSubmission": {
                          "ref": "api.course.quiz.html#createSubmission",
                          "tf": 5.555555555555555
                        },
                        "api.user.self.html": {
                          "ref": "api.user.self.html",
                          "tf": 10
                        },
                        "api.user.self.html#getProfile": {
                          "ref": "api.user.self.html#getProfile",
                          "tf": 12.5
                        },
                        "api.user.self.html#listCourses": {
                          "ref": "api.user.self.html#listCourses",
                          "tf": 8.333333333333332
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "e": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "api.course.assignment.html#create": {
                      "ref": "api.course.assignment.html#create",
                      "tf": 625
                    },
                    "api.course.assignment.html#createOverride": {
                      "ref": "api.course.assignment.html#createOverride",
                      "tf": 16.666666666666664
                    },
                    "api.course.assignment.html#createTextSubmission": {
                      "ref": "api.course.assignment.html#createTextSubmission",
                      "tf": 8.333333333333332
                    },
                    "api.course.assignment.html#createURLSubmission": {
                      "ref": "api.course.assignment.html#createURLSubmission",
                      "tf": 8.333333333333332
                    },
                    "api.course.assignment.html#createFileSubmission": {
                      "ref": "api.course.assignment.html#createFileSubmission",
                      "tf": 8.333333333333332
                    },
                    "api.course.assignmentGroup.html#create": {
                      "ref": "api.course.assignmentGroup.html#create",
                      "tf": 618.3333333333334
                    },
                    "api.course.gradebookColumn.html#create": {
                      "ref": "api.course.gradebookColumn.html#create",
                      "tf": 618.3333333333334
                    },
                    "api.course.groupSet.html#create": {
                      "ref": "api.course.groupSet.html#create",
                      "tf": 620.8333333333334
                    },
                    "api.course.groupSet.html#createGroup": {
                      "ref": "api.course.groupSet.html#createGroup",
                      "tf": 10
                    },
                    "api.course.page.html#create": {
                      "ref": "api.course.page.html#create",
                      "tf": 620.8333333333334
                    },
                    "api.course.quiz.html#create": {
                      "ref": "api.course.quiz.html#create",
                      "tf": 620.8333333333334
                    },
                    "api.course.quiz.html#createMultipleChoiceQuestion": {
                      "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                      "tf": 7.142857142857142
                    },
                    "api.course.quiz.html#createSubmission": {
                      "ref": "api.course.quiz.html#createSubmission",
                      "tf": 5.555555555555555
                    },
                    "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                      "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                      "tf": 4.545454545454546
                    }
                  },
                  "e": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "b": {
                          "docs": {},
                          "m": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "s": {
                                  "docs": {
                                    "api.course.quiz.html#createSubmission": {
                                      "ref": "api.course.quiz.html#createSubmission",
                                      "tf": 608.3333333333334
                                    }
                                  },
                                  "i": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "n": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "m": {
                                              "docs": {
                                                "api.course.assignment.html#createSubmissionComment": {
                                                  "ref": "api.course.assignment.html#createSubmissionComment",
                                                  "tf": 608.3333333333334
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "o": {
                      "docs": {},
                      "v": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "d": {
                                  "docs": {
                                    "api.course.assignment.html#createOverride": {
                                      "ref": "api.course.assignment.html#createOverride",
                                      "tf": 608.3333333333334
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "t": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "x": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "u": {
                                "docs": {},
                                "b": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "s": {
                                          "docs": {
                                            "api.course.assignment.html#createTextSubmission": {
                                              "ref": "api.course.assignment.html#createTextSubmission",
                                              "tf": 608.3333333333334
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "u": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "b": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "s": {
                                        "docs": {
                                          "api.course.assignment.html#createURLSubmission": {
                                            "ref": "api.course.assignment.html#createURLSubmission",
                                            "tf": 608.3333333333334
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "u": {
                                "docs": {},
                                "b": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "i": {
                                      "docs": {},
                                      "s": {
                                        "docs": {},
                                        "s": {
                                          "docs": {
                                            "api.course.assignment.html#createFileSubmission": {
                                              "ref": "api.course.assignment.html#createFileSubmission",
                                              "tf": 608.3333333333334
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "r": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "f": {
                              "docs": {},
                              "o": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "g": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "d": {
                                            "docs": {},
                                            "i": {
                                              "docs": {},
                                              "n": {
                                                "docs": {},
                                                "g": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "u": {
                                                      "docs": {},
                                                      "b": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "i": {
                                                            "docs": {},
                                                            "c": {
                                                              "docs": {},
                                                              "i": {
                                                                "docs": {},
                                                                "n": {
                                                                  "docs": {},
                                                                  "a": {
                                                                    "docs": {},
                                                                    "s": {
                                                                      "docs": {},
                                                                      "s": {
                                                                        "docs": {},
                                                                        "i": {
                                                                          "docs": {},
                                                                          "g": {
                                                                            "docs": {},
                                                                            "n": {
                                                                              "docs": {
                                                                                "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                                                                                  "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                                                                                  "tf": 608.3333333333334
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "g": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "p": {
                              "docs": {
                                "api.course.groupSet.html#createGroup": {
                                  "ref": "api.course.groupSet.html#createGroup",
                                  "tf": 608.3333333333334
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "m": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "p": {
                                "docs": {},
                                "l": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "h": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "c": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "q": {
                                                  "docs": {},
                                                  "u": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "s": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {
                                                            "api.course.quiz.html#createMultipleChoiceQuestion": {
                                                              "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                                                              "tf": 608.3333333333334
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "o": {
              "docs": {},
              "i": {
                "docs": {},
                "c": {
                  "docs": {
                    "api.course.quiz.html#createMultipleChoiceQuestion": {
                      "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                      "tf": 7.142857142857142
                    }
                  }
                }
              }
            }
          }
        },
        "d": {
          "docs": {},
          "e": {
            "docs": {},
            "f": {
              "docs": {},
              "i": {
                "docs": {},
                "n": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 7
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "e": {
                "docs": {},
                "t": {
                  "docs": {
                    "api.course.assignment.html#delete": {
                      "ref": "api.course.assignment.html#delete",
                      "tf": 633.3333333333334
                    },
                    "api.course.assignment.html#deleteOverride": {
                      "ref": "api.course.assignment.html#deleteOverride",
                      "tf": 16.666666666666664
                    },
                    "api.course.assignmentGroup.html#delete": {
                      "ref": "api.course.assignmentGroup.html#delete",
                      "tf": 620.8333333333334
                    },
                    "api.course.gradebookColumn.html#delete": {
                      "ref": "api.course.gradebookColumn.html#delete",
                      "tf": 620.8333333333334
                    },
                    "api.course.groupSet.html#delete": {
                      "ref": "api.course.groupSet.html#delete",
                      "tf": 625
                    },
                    "api.course.groupSet.html#deleteGroup": {
                      "ref": "api.course.groupSet.html#deleteGroup",
                      "tf": 10
                    },
                    "api.course.page.html#delete": {
                      "ref": "api.course.page.html#delete",
                      "tf": 625
                    },
                    "api.course.quiz.html#delete": {
                      "ref": "api.course.quiz.html#delete",
                      "tf": 625
                    }
                  },
                  "e": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "v": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "r": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "d": {
                                  "docs": {
                                    "api.course.assignment.html#deleteOverride": {
                                      "ref": "api.course.assignment.html#deleteOverride",
                                      "tf": 608.3333333333334
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "g": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "o": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "p": {
                              "docs": {
                                "api.course.groupSet.html#deleteGroup": {
                                  "ref": "api.course.groupSet.html#deleteGroup",
                                  "tf": 608.3333333333334
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "i": {
                "docs": {},
                "g": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "api.course.html#listDesignerEnrollments": {
                        "ref": "api.course.html#listDesignerEnrollments",
                        "tf": 10
                      },
                      "api.course.html#listDesigners": {
                        "ref": "api.course.html#listDesigners",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "c": {
              "docs": {},
              "u": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "global.html": {
                            "ref": "global.html",
                            "tf": 35
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "f": {
              "docs": {},
              "f": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "api.course.app.html#getMetadata": {
                        "ref": "api.course.app.html#getMetadata",
                        "tf": 1.282051282051282
                      },
                      "api.course.app.html#updateMetadata": {
                        "ref": "api.course.app.html#updateMetadata",
                        "tf": 1.3157894736842104
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "e": {
          "docs": {},
          "n": {
            "docs": {},
            "d": {
              "docs": {},
              "p": {
                "docs": {},
                "o": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "n": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "index.html": {
                            "ref": "index.html",
                            "tf": 7
                          },
                          "list_class.html": {
                            "ref": "list_class.html",
                            "tf": 623.3333333333334
                          },
                          "api.course.app.html#getMetadata": {
                            "ref": "api.course.app.html#getMetadata",
                            "tf": 1.282051282051282
                          },
                          "api.course.app.html#updateMetadata": {
                            "ref": "api.course.app.html#updateMetadata",
                            "tf": 1.3157894736842104
                          },
                          "api.course.gradebookColumn.html#get": {
                            "ref": "api.course.gradebookColumn.html#get",
                            "tf": 3.3333333333333335
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "r": {
                "docs": {},
                "i": {
                  "docs": {
                    "api.course.gradebookColumn.html#listEntries": {
                      "ref": "api.course.gradebookColumn.html#listEntries",
                      "tf": 7.142857142857142
                    },
                    "api.course.gradebookColumn.html#updateEntries": {
                      "ref": "api.course.gradebookColumn.html#updateEntries",
                      "tf": 7.142857142857142
                    }
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "b": {
                "docs": {},
                "l": {
                  "docs": {
                    "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                      "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                      "tf": 4.545454545454546
                    }
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "o": {
                "docs": {},
                "l": {
                  "docs": {
                    "api.course.html#listEnrollments": {
                      "ref": "api.course.html#listEnrollments",
                      "tf": 12.5
                    },
                    "api.course.html#listTeachingTeamMemberEnrollments": {
                      "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                      "tf": 8.333333333333332
                    },
                    "api.course.html#listDesignerEnrollments": {
                      "ref": "api.course.html#listDesignerEnrollments",
                      "tf": 10
                    },
                    "api.course.html#listObserverEnrollments": {
                      "ref": "api.course.html#listObserverEnrollments",
                      "tf": 10
                    }
                  },
                  "l": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "s": {
                                "docs": {
                                  "api.course.html#listStudentEnrollments": {
                                    "ref": "api.course.html#listStudentEnrollments",
                                    "tf": 10
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "x": {
            "docs": {},
            "p": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "index.html": {
                        "ref": "index.html",
                        "tf": 7
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "api.course.app.html": {
                        "ref": "api.course.app.html",
                        "tf": 7.142857142857142
                      }
                    }
                  }
                }
              }
            },
            "i": {
              "docs": {},
              "s": {
                "docs": {},
                "t": {
                  "docs": {
                    "api.course.gradebookColumn.html#get": {
                      "ref": "api.course.gradebookColumn.html#get",
                      "tf": 3.3333333333333335
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "c": {
              "docs": {},
              "h": {
                "docs": {
                  "api.course.app.html#getMetadata": {
                    "ref": "api.course.app.html#getMetadata",
                    "tf": 2.564102564102564
                  },
                  "api.course.app.html#updateMetadata": {
                    "ref": "api.course.app.html#updateMetadata",
                    "tf": 2.631578947368421
                  }
                }
              }
            }
          },
          "l": {
            "docs": {},
            "e": {
              "docs": {},
              "m": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "api.course.gradebookColumn.html#get": {
                          "ref": "api.course.gradebookColumn.html#get",
                          "tf": 3.3333333333333335
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "i": {
          "docs": {},
          "n": {
            "docs": {},
            "d": {
              "docs": {},
              "e": {
                "docs": {},
                "x": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 1300
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "c": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "api.course.app.html": {
                            "ref": "api.course.app.html",
                            "tf": 7.142857142857142
                          },
                          "api.course.assignment.html": {
                            "ref": "api.course.assignment.html",
                            "tf": 10
                          },
                          "api.course.assignmentGroup.html": {
                            "ref": "api.course.assignmentGroup.html",
                            "tf": 8.333333333333332
                          },
                          "api.course.gradebookColumn.html": {
                            "ref": "api.course.gradebookColumn.html",
                            "tf": 8.333333333333332
                          },
                          "api.course.group.html": {
                            "ref": "api.course.group.html",
                            "tf": 8.333333333333332
                          },
                          "api.course.groupSet.html": {
                            "ref": "api.course.groupSet.html",
                            "tf": 8.333333333333332
                          },
                          "api.course.page.html": {
                            "ref": "api.course.page.html",
                            "tf": 10
                          },
                          "api.course.quiz.html": {
                            "ref": "api.course.quiz.html",
                            "tf": 10
                          },
                          "api.course.rubric.html": {
                            "ref": "api.course.rubric.html",
                            "tf": 10
                          },
                          "api.course.section.html": {
                            "ref": "api.course.section.html",
                            "tf": 10
                          },
                          "api.course.html": {
                            "ref": "api.course.html",
                            "tf": 16.666666666666664
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "f": {
              "docs": {},
              "o": {
                "docs": {
                  "api.course.app.html#get": {
                    "ref": "api.course.app.html#get",
                    "tf": 10
                  },
                  "api.course.assignment.html#get": {
                    "ref": "api.course.assignment.html#get",
                    "tf": 12.5
                  },
                  "api.course.assignmentGroup.html#getAssignmentGroup": {
                    "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                    "tf": 8.333333333333332
                  },
                  "api.course.gradebookColumn.html#get": {
                    "ref": "api.course.gradebookColumn.html#get",
                    "tf": 3.3333333333333335
                  },
                  "api.course.group.html#get": {
                    "ref": "api.course.group.html#get",
                    "tf": 10
                  },
                  "api.course.groupSet.html#get": {
                    "ref": "api.course.groupSet.html#get",
                    "tf": 10
                  },
                  "api.course.groupSet.html#getGroup": {
                    "ref": "api.course.groupSet.html#getGroup",
                    "tf": 6.25
                  },
                  "api.course.page.html#get": {
                    "ref": "api.course.page.html#get",
                    "tf": 12.5
                  },
                  "api.course.quiz.html#get": {
                    "ref": "api.course.quiz.html#get",
                    "tf": 12.5
                  },
                  "api.course.quiz.html#getSubmission": {
                    "ref": "api.course.quiz.html#getSubmission",
                    "tf": 8.333333333333332
                  },
                  "api.course.rubric.html#get": {
                    "ref": "api.course.rubric.html#get",
                    "tf": 10
                  },
                  "api.course.section.html#get": {
                    "ref": "api.course.section.html#get",
                    "tf": 12.5
                  },
                  "api.course.html#get": {
                    "ref": "api.course.html#get",
                    "tf": 12.5
                  },
                  "api.course.html#getUser": {
                    "ref": "api.course.html#getUser",
                    "tf": 10
                  },
                  "api.course.html#listUsers": {
                    "ref": "api.course.html#listUsers",
                    "tf": 12.5
                  },
                  "api.user.self.html": {
                    "ref": "api.user.self.html",
                    "tf": 10
                  },
                  "api.user.self.html#getProfile": {
                    "ref": "api.user.self.html#getProfile",
                    "tf": 12.5
                  }
                },
                "r": {
                  "docs": {},
                  "m": {
                    "docs": {
                      "api.course.gradebookColumn.html#update": {
                        "ref": "api.course.gradebookColumn.html#update",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "t": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "api.course.app.html#getMetadata": {
                        "ref": "api.course.app.html#getMetadata",
                        "tf": 3.8461538461538463
                      },
                      "api.course.app.html#updateMetadata": {
                        "ref": "api.course.app.html#updateMetadata",
                        "tf": 3.9473684210526314
                      },
                      "api.course.app.html#list": {
                        "ref": "api.course.app.html#list",
                        "tf": 10
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "l": {
                "docs": {},
                "u": {
                  "docs": {},
                  "d": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "m": {
                              "docs": {
                                "api.user.self.html#listCourses": {
                                  "ref": "api.user.self.html#listCourses",
                                  "tf": 25
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "d": {
            "docs": {},
            "e": {
              "docs": {},
              "n": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {
                          "api.course.app.html#getMetadata": {
                            "ref": "api.course.app.html#getMetadata",
                            "tf": 1.282051282051282
                          },
                          "api.course.app.html#updateMetadata": {
                            "ref": "api.course.app.html#updateMetadata",
                            "tf": 1.3157894736842104
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "e": {
              "docs": {},
              "m": {
                "docs": {
                  "api.course.assignment.html#updateGrades": {
                    "ref": "api.course.assignment.html#updateGrades",
                    "tf": 5.555555555555555
                  }
                }
              }
            }
          }
        },
        "r": {
          "docs": {},
          "e": {
            "docs": {},
            "a": {
              "docs": {},
              "d": {
                "docs": {},
                "m": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 110
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "o": {
                "docs": {},
                "v": {
                  "docs": {
                    "api.course.app.html#remove": {
                      "ref": "api.course.app.html#remove",
                      "tf": 618.3333333333334
                    }
                  }
                }
              }
            },
            "f": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {
                    "api.course.app.html#getMetadata": {
                      "ref": "api.course.app.html#getMetadata",
                      "tf": 1.282051282051282
                    },
                    "api.course.app.html#updateMetadata": {
                      "ref": "api.course.app.html#updateMetadata",
                      "tf": 1.3157894736842104
                    }
                  }
                }
              }
            },
            "q": {
              "docs": {},
              "u": {
                "docs": {},
                "i": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "api.course.app.html#getMetadata": {
                        "ref": "api.course.app.html#getMetadata",
                        "tf": 1.282051282051282
                      },
                      "api.course.app.html#updateMetadata": {
                        "ref": "api.course.app.html#updateMetadata",
                        "tf": 1.3157894736842104
                      }
                    }
                  }
                }
              }
            },
            "t": {
              "docs": {},
              "u": {
                "docs": {},
                "r": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "api.course.app.html#getMetadata": {
                        "ref": "api.course.app.html#getMetadata",
                        "tf": 1.282051282051282
                      },
                      "api.course.gradebookColumn.html#get": {
                        "ref": "api.course.gradebookColumn.html#get",
                        "tf": 3.3333333333333335
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "b": {
              "docs": {},
              "r": {
                "docs": {},
                "i": {
                  "docs": {},
                  "c": {
                    "docs": {
                      "api.course.assignment.html#updateGrades": {
                        "ref": "api.course.assignment.html#updateGrades",
                        "tf": 5.555555555555555
                      },
                      "api.course.rubric.html": {
                        "ref": "api.course.rubric.html",
                        "tf": 610
                      },
                      "api.course.rubric.html#list": {
                        "ref": "api.course.rubric.html#list",
                        "tf": 12.5
                      },
                      "api.course.rubric.html#get": {
                        "ref": "api.course.rubric.html#get",
                        "tf": 10
                      },
                      "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                        "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                        "tf": 4.545454545454546
                      }
                    },
                    "#": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "api.course.rubric.html#list": {
                                  "ref": "api.course.rubric.html#list",
                                  "tf": 75
                                }
                              }
                            }
                          }
                        }
                      },
                      "g": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "api.course.rubric.html#get": {
                                "ref": "api.course.rubric.html#get",
                                "tf": 100
                              }
                            }
                          }
                        }
                      },
                      "c": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "a": {
                              "docs": {},
                              "t": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "f": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "e": {
                                          "docs": {},
                                          "f": {
                                            "docs": {},
                                            "o": {
                                              "docs": {},
                                              "r": {
                                                "docs": {},
                                                "m": {
                                                  "docs": {},
                                                  "g": {
                                                    "docs": {},
                                                    "r": {
                                                      "docs": {},
                                                      "a": {
                                                        "docs": {},
                                                        "d": {
                                                          "docs": {},
                                                          "i": {
                                                            "docs": {},
                                                            "n": {
                                                              "docs": {},
                                                              "g": {
                                                                "docs": {},
                                                                "r": {
                                                                  "docs": {},
                                                                  "u": {
                                                                    "docs": {},
                                                                    "b": {
                                                                      "docs": {},
                                                                      "r": {
                                                                        "docs": {},
                                                                        "i": {
                                                                          "docs": {},
                                                                          "c": {
                                                                            "docs": {},
                                                                            "i": {
                                                                              "docs": {},
                                                                              "n": {
                                                                                "docs": {},
                                                                                "a": {
                                                                                  "docs": {},
                                                                                  "s": {
                                                                                    "docs": {},
                                                                                    "s": {
                                                                                      "docs": {},
                                                                                      "i": {
                                                                                        "docs": {},
                                                                                        "g": {
                                                                                          "docs": {},
                                                                                          "n": {
                                                                                            "docs": {
                                                                                              "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                                                                                                "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                                                                                                "tf": 75
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "s": {
          "docs": {},
          "e": {
            "docs": {},
            "t": {
              "docs": {
                "index.html": {
                  "ref": "index.html",
                  "tf": 7
                },
                "api.course.groupSet.html#list": {
                  "ref": "api.course.groupSet.html#list",
                  "tf": 12.5
                },
                "api.course.groupSet.html#get": {
                  "ref": "api.course.groupSet.html#get",
                  "tf": 10
                },
                "api.course.groupSet.html#create": {
                  "ref": "api.course.groupSet.html#create",
                  "tf": 12.5
                },
                "api.course.groupSet.html#delete": {
                  "ref": "api.course.groupSet.html#delete",
                  "tf": 16.666666666666664
                },
                "api.course.groupSet.html#listGroups": {
                  "ref": "api.course.groupSet.html#listGroups",
                  "tf": 10
                },
                "api.course.groupSet.html#getGroup": {
                  "ref": "api.course.groupSet.html#getGroup",
                  "tf": 6.25
                },
                "api.course.groupSet.html#createGroup": {
                  "ref": "api.course.groupSet.html#createGroup",
                  "tf": 10
                },
                "api.course.groupSet.html#deleteGroup": {
                  "ref": "api.course.groupSet.html#deleteGroup",
                  "tf": 10
                },
                "api.course.rubric.html#list": {
                  "ref": "api.course.rubric.html#list",
                  "tf": 12.5
                }
              },
              "s": {
                "docs": {},
                "/": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "g": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "i": {
                                  "docs": {
                                    "api.course.groupSet.html": {
                                      "ref": "api.course.groupSet.html",
                                      "tf": 8.333333333333332
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "c": {
              "docs": {},
              "t": {
                "docs": {},
                "i": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "n": {
                      "docs": {
                        "api.course.section.html": {
                          "ref": "api.course.section.html",
                          "tf": 610
                        },
                        "api.course.section.html#list": {
                          "ref": "api.course.section.html#list",
                          "tf": 12.5
                        },
                        "api.course.section.html#get": {
                          "ref": "api.course.section.html#get",
                          "tf": 12.5
                        }
                      },
                      "#": {
                        "docs": {},
                        "l": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "s": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "api.course.section.html#list": {
                                    "ref": "api.course.section.html#list",
                                    "tf": 75
                                  }
                                }
                              }
                            }
                          }
                        },
                        "g": {
                          "docs": {},
                          "e": {
                            "docs": {},
                            "t": {
                              "docs": {
                                "api.course.section.html#get": {
                                  "ref": "api.course.section.html#get",
                                  "tf": 100
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "f": {
                "docs": {
                  "api.user.self.html": {
                    "ref": "api.user.self.html",
                    "tf": 700
                  }
                },
                "#": {
                  "docs": {},
                  "g": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {},
                        "p": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "f": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "l": {
                                    "docs": {
                                      "api.user.self.html#getProfile": {
                                        "ref": "api.user.self.html#getProfile",
                                        "tf": 75
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "l": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "c": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "u": {
                                "docs": {},
                                "r": {
                                  "docs": {},
                                  "s": {
                                    "docs": {
                                      "api.user.self.html#listCourses": {
                                        "ref": "api.user.self.html#listCourses",
                                        "tf": 75
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "m": {
            "docs": {},
            "a": {
              "docs": {},
              "r": {
                "docs": {},
                "t": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 7
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "n": {
              "docs": {},
              "g": {
                "docs": {},
                "l": {
                  "docs": {
                    "api.course.app.html#get": {
                      "ref": "api.course.app.html#get",
                      "tf": 10
                    },
                    "api.course.assignment.html#getSubmission": {
                      "ref": "api.course.assignment.html#getSubmission",
                      "tf": 12.5
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "u": {
                "docs": {},
                "l": {
                  "docs": {
                    "api.course.gradebookColumn.html#get": {
                      "ref": "api.course.gradebookColumn.html#get",
                      "tf": 3.3333333333333335
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "m": {
              "docs": {},
              "e": {
                "docs": {
                  "api.course.app.html#getMetadata": {
                    "ref": "api.course.app.html#getMetadata",
                    "tf": 2.564102564102564
                  },
                  "api.course.app.html#updateMetadata": {
                    "ref": "api.course.app.html#updateMetadata",
                    "tf": 2.631578947368421
                  }
                }
              }
            }
          },
          "h": {
            "docs": {},
            "a": {
              "docs": {},
              "r": {
                "docs": {},
                "e": {
                  "docs": {
                    "api.course.app.html#getMetadata": {
                      "ref": "api.course.app.html#getMetadata",
                      "tf": 1.282051282051282
                    },
                    "api.course.app.html#updateMetadata": {
                      "ref": "api.course.app.html#updateMetadata",
                      "tf": 1.3157894736842104
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "e": {
              "docs": {},
              "c": {
                "docs": {},
                "i": {
                  "docs": {},
                  "f": {
                    "docs": {
                      "api.course.assignment.html#get": {
                        "ref": "api.course.assignment.html#get",
                        "tf": 12.5
                      },
                      "api.course.assignment.html#listGradeableStudents": {
                        "ref": "api.course.assignment.html#listGradeableStudents",
                        "tf": 10
                      },
                      "api.course.assignment.html#getOverride": {
                        "ref": "api.course.assignment.html#getOverride",
                        "tf": 12.5
                      },
                      "api.course.assignment.html#listSubmissions": {
                        "ref": "api.course.assignment.html#listSubmissions",
                        "tf": 10
                      },
                      "api.course.assignmentGroup.html#getAssignmentGroup": {
                        "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                        "tf": 8.333333333333332
                      },
                      "api.course.gradebookColumn.html#get": {
                        "ref": "api.course.gradebookColumn.html#get",
                        "tf": 3.3333333333333335
                      },
                      "api.course.gradebookColumn.html#listEntries": {
                        "ref": "api.course.gradebookColumn.html#listEntries",
                        "tf": 7.142857142857142
                      },
                      "api.course.gradebookColumn.html#updateEntries": {
                        "ref": "api.course.gradebookColumn.html#updateEntries",
                        "tf": 7.142857142857142
                      },
                      "api.course.group.html#get": {
                        "ref": "api.course.group.html#get",
                        "tf": 10
                      },
                      "api.course.groupSet.html#get": {
                        "ref": "api.course.groupSet.html#get",
                        "tf": 10
                      },
                      "api.course.groupSet.html#getGroup": {
                        "ref": "api.course.groupSet.html#getGroup",
                        "tf": 6.25
                      },
                      "api.course.groupSet.html#deleteGroup": {
                        "ref": "api.course.groupSet.html#deleteGroup",
                        "tf": 10
                      },
                      "api.course.page.html#get": {
                        "ref": "api.course.page.html#get",
                        "tf": 12.5
                      },
                      "api.course.quiz.html#get": {
                        "ref": "api.course.quiz.html#get",
                        "tf": 12.5
                      },
                      "api.course.quiz.html#update": {
                        "ref": "api.course.quiz.html#update",
                        "tf": 12.5
                      },
                      "api.course.quiz.html#listQuestions": {
                        "ref": "api.course.quiz.html#listQuestions",
                        "tf": 10
                      },
                      "api.course.quiz.html#getSubmission": {
                        "ref": "api.course.quiz.html#getSubmission",
                        "tf": 8.333333333333332
                      },
                      "api.course.quiz.html#createSubmission": {
                        "ref": "api.course.quiz.html#createSubmission",
                        "tf": 5.555555555555555
                      },
                      "api.course.quiz.html#listQuestionGrades": {
                        "ref": "api.course.quiz.html#listQuestionGrades",
                        "tf": 7.142857142857142
                      },
                      "api.course.quiz.html#updateQuestionGrades": {
                        "ref": "api.course.quiz.html#updateQuestionGrades",
                        "tf": 7.142857142857142
                      },
                      "api.course.rubric.html#get": {
                        "ref": "api.course.rubric.html#get",
                        "tf": 10
                      },
                      "api.course.section.html#get": {
                        "ref": "api.course.section.html#get",
                        "tf": 12.5
                      },
                      "api.course.html#get": {
                        "ref": "api.course.html#get",
                        "tf": 12.5
                      },
                      "api.course.html#getUser": {
                        "ref": "api.course.html#getUser",
                        "tf": 10
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "u": {
              "docs": {},
              "d": {
                "docs": {},
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "api.course.assignment.html#listGradeableStudents": {
                          "ref": "api.course.assignment.html#listGradeableStudents",
                          "tf": 10
                        },
                        "api.course.group.html": {
                          "ref": "api.course.group.html",
                          "tf": 8.333333333333332
                        },
                        "api.course.html#listStudentEnrollments": {
                          "ref": "api.course.html#listStudentEnrollments",
                          "tf": 10
                        },
                        "api.course.html#listStudents": {
                          "ref": "api.course.html#listStudents",
                          "tf": 12.5
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "b": {
              "docs": {},
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "s": {
                      "docs": {
                        "api.course.assignment.html#createSubmissionComment": {
                          "ref": "api.course.assignment.html#createSubmissionComment",
                          "tf": 16.666666666666664
                        },
                        "api.course.assignment.html#listSubmissions": {
                          "ref": "api.course.assignment.html#listSubmissions",
                          "tf": 10
                        },
                        "api.course.assignment.html#getSubmission": {
                          "ref": "api.course.assignment.html#getSubmission",
                          "tf": 12.5
                        },
                        "api.course.assignment.html#createTextSubmission": {
                          "ref": "api.course.assignment.html#createTextSubmission",
                          "tf": 8.333333333333332
                        },
                        "api.course.assignment.html#createURLSubmission": {
                          "ref": "api.course.assignment.html#createURLSubmission",
                          "tf": 8.333333333333332
                        },
                        "api.course.assignment.html#createFileSubmission": {
                          "ref": "api.course.assignment.html#createFileSubmission",
                          "tf": 8.333333333333332
                        },
                        "api.course.quiz.html#listSubmissions": {
                          "ref": "api.course.quiz.html#listSubmissions",
                          "tf": 12.5
                        },
                        "api.course.quiz.html#getSubmission": {
                          "ref": "api.course.quiz.html#getSubmission",
                          "tf": 8.333333333333332
                        },
                        "api.course.quiz.html#createSubmission": {
                          "ref": "api.course.quiz.html#createSubmission",
                          "tf": 5.555555555555555
                        },
                        "api.course.quiz.html#updateQuestionGrades": {
                          "ref": "api.course.quiz.html#updateQuestionGrades",
                          "tf": 7.142857142857142
                        }
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "docs": {},
              "p": {
                "docs": {},
                "o": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "api.course.assignment.html#updateGrades": {
                          "ref": "api.course.assignment.html#updateGrades",
                          "tf": 5.555555555555555
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "y": {
          "docs": {},
          "o": {
            "docs": {},
            "u": {
              "docs": {},
              "'": {
                "docs": {},
                "d": {
                  "docs": {
                    "index.html": {
                      "ref": "index.html",
                      "tf": 7
                    }
                  }
                }
              }
            }
          }
        },
        "g": {
          "docs": {},
          "l": {
            "docs": {},
            "o": {
              "docs": {},
              "b": {
                "docs": {},
                "a": {
                  "docs": {},
                  "l": {
                    "docs": {
                      "global.html": {
                        "ref": "global.html",
                        "tf": 2045
                      }
                    }
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "t": {
              "docs": {
                "api.course.app.html#get": {
                  "ref": "api.course.app.html#get",
                  "tf": 10
                },
                "api.course.app.html#getMetadata": {
                  "ref": "api.course.app.html#getMetadata",
                  "tf": 2.564102564102564
                },
                "api.course.app.html#list": {
                  "ref": "api.course.app.html#list",
                  "tf": 10
                },
                "api.course.assignment.html#listOverrides": {
                  "ref": "api.course.assignment.html#listOverrides",
                  "tf": 12.5
                },
                "api.course.assignment.html#getSubmission": {
                  "ref": "api.course.assignment.html#getSubmission",
                  "tf": 12.5
                },
                "api.course.assignmentGroup.html#getAssignmentGroup": {
                  "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                  "tf": 8.333333333333332
                },
                "api.course.gradebookColumn.html#list": {
                  "ref": "api.course.gradebookColumn.html#list",
                  "tf": 8.333333333333332
                },
                "api.course.gradebookColumn.html#get": {
                  "ref": "api.course.gradebookColumn.html#get",
                  "tf": 3.3333333333333335
                },
                "api.course.gradebookColumn.html#listEntries": {
                  "ref": "api.course.gradebookColumn.html#listEntries",
                  "tf": 7.142857142857142
                },
                "api.course.group.html#get": {
                  "ref": "api.course.group.html#get",
                  "tf": 10
                },
                "api.course.group.html#listMembers": {
                  "ref": "api.course.group.html#listMembers",
                  "tf": 12.5
                },
                "api.course.group.html#updateMembers": {
                  "ref": "api.course.group.html#updateMembers",
                  "tf": 12.5
                },
                "api.course.groupSet.html#get": {
                  "ref": "api.course.groupSet.html#get",
                  "tf": 10
                },
                "api.course.groupSet.html#listGroups": {
                  "ref": "api.course.groupSet.html#listGroups",
                  "tf": 10
                },
                "api.course.groupSet.html#getGroup": {
                  "ref": "api.course.groupSet.html#getGroup",
                  "tf": 6.25
                },
                "api.course.page.html#list": {
                  "ref": "api.course.page.html#list",
                  "tf": 12.5
                },
                "api.course.quiz.html#getSubmission": {
                  "ref": "api.course.quiz.html#getSubmission",
                  "tf": 8.333333333333332
                },
                "api.course.rubric.html#get": {
                  "ref": "api.course.rubric.html#get",
                  "tf": 10
                },
                "api.course.section.html#list": {
                  "ref": "api.course.section.html#list",
                  "tf": 12.5
                },
                "api.course.section.html#get": {
                  "ref": "api.course.section.html#get",
                  "tf": 12.5
                },
                "api.course.html#get": {
                  "ref": "api.course.html#get",
                  "tf": 12.5
                },
                "api.course.html#listEnrollments": {
                  "ref": "api.course.html#listEnrollments",
                  "tf": 12.5
                },
                "api.course.html#listStudentEnrollments": {
                  "ref": "api.course.html#listStudentEnrollments",
                  "tf": 10
                },
                "api.course.html#listTeachingTeamMemberEnrollments": {
                  "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                  "tf": 8.333333333333332
                },
                "api.course.html#listDesignerEnrollments": {
                  "ref": "api.course.html#listDesignerEnrollments",
                  "tf": 10
                },
                "api.course.html#listObserverEnrollments": {
                  "ref": "api.course.html#listObserverEnrollments",
                  "tf": 10
                },
                "api.course.html#getUser": {
                  "ref": "api.course.html#getUser",
                  "tf": 10
                },
                "api.course.html#listUsers": {
                  "ref": "api.course.html#listUsers",
                  "tf": 12.5
                },
                "api.course.html#listStudents": {
                  "ref": "api.course.html#listStudents",
                  "tf": 12.5
                },
                "api.course.html#listTeachingTeamMembers": {
                  "ref": "api.course.html#listTeachingTeamMembers",
                  "tf": 10
                },
                "api.course.html#listDesigners": {
                  "ref": "api.course.html#listDesigners",
                  "tf": 12.5
                },
                "api.course.html#listObservers": {
                  "ref": "api.course.html#listObservers",
                  "tf": 12.5
                },
                "api.user.self.html": {
                  "ref": "api.user.self.html",
                  "tf": 10
                },
                "api.user.self.html#getProfile": {
                  "ref": "api.user.self.html#getProfile",
                  "tf": 12.5
                },
                "api.user.self.html#listCourses": {
                  "ref": "api.user.self.html#listCourses",
                  "tf": 8.333333333333332
                }
              },
              "m": {
                "docs": {},
                "e": {
                  "docs": {},
                  "t": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "a": {
                              "docs": {
                                "api.course.app.html#getMetadata": {
                                  "ref": "api.course.app.html#getMetadata",
                                  "tf": 608.3333333333334
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "o": {
                "docs": {},
                "v": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "d": {
                            "docs": {
                              "api.course.assignment.html#getOverride": {
                                "ref": "api.course.assignment.html#getOverride",
                                "tf": 608.3333333333334
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "docs": {},
                "u": {
                  "docs": {},
                  "b": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "api.course.assignment.html#getSubmission": {
                                "ref": "api.course.assignment.html#getSubmission",
                                "tf": 608.3333333333334
                              },
                              "api.course.quiz.html#getSubmission": {
                                "ref": "api.course.quiz.html#getSubmission",
                                "tf": 608.3333333333334
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "a": {
                "docs": {},
                "s": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "g": {
                        "docs": {},
                        "n": {
                          "docs": {},
                          "m": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "g": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {
                                              "api.course.assignmentGroup.html#getAssignmentGroup": {
                                                "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                                                "tf": 608.3333333333334
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "g": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "p": {
                        "docs": {
                          "api.course.groupSet.html#getGroup": {
                            "ref": "api.course.groupSet.html#getGroup",
                            "tf": 608.3333333333334
                          }
                        }
                      }
                    }
                  }
                }
              },
              "u": {
                "docs": {},
                "s": {
                  "docs": {
                    "api.course.html#getUser": {
                      "ref": "api.course.html#getUser",
                      "tf": 633.3333333333334
                    }
                  }
                }
              },
              "p": {
                "docs": {},
                "r": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "f": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "l": {
                          "docs": {
                            "api.user.self.html#getProfile": {
                              "ref": "api.user.self.html#getProfile",
                              "tf": 625
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "n": {
                  "docs": {
                    "api.course.app.html#updateMetadata": {
                      "ref": "api.course.app.html#updateMetadata",
                      "tf": 1.3157894736842104
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "a": {
              "docs": {},
              "d": {
                "docs": {},
                "e": {
                  "docs": {
                    "api.course.assignment.html#updateGrades": {
                      "ref": "api.course.assignment.html#updateGrades",
                      "tf": 5.555555555555555
                    },
                    "api.course.quiz.html#listQuestionGrades": {
                      "ref": "api.course.quiz.html#listQuestionGrades",
                      "tf": 7.142857142857142
                    },
                    "api.course.quiz.html#updateQuestionGrades": {
                      "ref": "api.course.quiz.html#updateQuestionGrades",
                      "tf": 7.142857142857142
                    },
                    "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                      "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                      "tf": 4.545454545454546
                    }
                  },
                  "a": {
                    "docs": {},
                    "b": {
                      "docs": {},
                      "l": {
                        "docs": {
                          "api.course.assignment.html#listGradeableStudents": {
                            "ref": "api.course.assignment.html#listGradeableStudents",
                            "tf": 10
                          }
                        }
                      }
                    }
                  },
                  "b": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "k": {
                          "docs": {
                            "api.course.gradebookColumn.html": {
                              "ref": "api.course.gradebookColumn.html",
                              "tf": 8.333333333333332
                            },
                            "api.course.gradebookColumn.html#list": {
                              "ref": "api.course.gradebookColumn.html#list",
                              "tf": 8.333333333333332
                            },
                            "api.course.gradebookColumn.html#get": {
                              "ref": "api.course.gradebookColumn.html#get",
                              "tf": 3.3333333333333335
                            },
                            "api.course.gradebookColumn.html#update": {
                              "ref": "api.course.gradebookColumn.html#update",
                              "tf": 12.5
                            },
                            "api.course.gradebookColumn.html#create": {
                              "ref": "api.course.gradebookColumn.html#create",
                              "tf": 10
                            },
                            "api.course.gradebookColumn.html#delete": {
                              "ref": "api.course.gradebookColumn.html#delete",
                              "tf": 12.5
                            },
                            "api.course.gradebookColumn.html#listEntries": {
                              "ref": "api.course.gradebookColumn.html#listEntries",
                              "tf": 7.142857142857142
                            },
                            "api.course.gradebookColumn.html#updateEntries": {
                              "ref": "api.course.gradebookColumn.html#updateEntries",
                              "tf": 7.142857142857142
                            }
                          },
                          "c": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "m": {
                                    "docs": {},
                                    "n": {
                                      "docs": {
                                        "api.course.gradebookColumn.html": {
                                          "ref": "api.course.gradebookColumn.html",
                                          "tf": 600
                                        }
                                      },
                                      "#": {
                                        "docs": {},
                                        "l": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "s": {
                                              "docs": {},
                                              "t": {
                                                "docs": {
                                                  "api.course.gradebookColumn.html#list": {
                                                    "ref": "api.course.gradebookColumn.html#list",
                                                    "tf": 75
                                                  }
                                                },
                                                "e": {
                                                  "docs": {},
                                                  "n": {
                                                    "docs": {},
                                                    "t": {
                                                      "docs": {},
                                                      "r": {
                                                        "docs": {},
                                                        "i": {
                                                          "docs": {
                                                            "api.course.gradebookColumn.html#listEntries": {
                                                              "ref": "api.course.gradebookColumn.html#listEntries",
                                                              "tf": 75
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "g": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "t": {
                                              "docs": {
                                                "api.course.gradebookColumn.html#get": {
                                                  "ref": "api.course.gradebookColumn.html#get",
                                                  "tf": 100
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {},
                                            "d": {
                                              "docs": {
                                                "api.course.gradebookColumn.html#update": {
                                                  "ref": "api.course.gradebookColumn.html#update",
                                                  "tf": 75
                                                }
                                              },
                                              "a": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  "e": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "n": {
                                                        "docs": {},
                                                        "t": {
                                                          "docs": {},
                                                          "r": {
                                                            "docs": {},
                                                            "i": {
                                                              "docs": {
                                                                "api.course.gradebookColumn.html#updateEntries": {
                                                                  "ref": "api.course.gradebookColumn.html#updateEntries",
                                                                  "tf": 75
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        },
                                        "c": {
                                          "docs": {},
                                          "r": {
                                            "docs": {
                                              "api.course.gradebookColumn.html#create": {
                                                "ref": "api.course.gradebookColumn.html#create",
                                                "tf": 75
                                              }
                                            }
                                          }
                                        },
                                        "d": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "l": {
                                              "docs": {},
                                              "e": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.gradebookColumn.html#delete": {
                                                      "ref": "api.course.gradebookColumn.html#delete",
                                                      "tf": 75
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "o": {
              "docs": {},
              "u": {
                "docs": {},
                "p": {
                  "docs": {
                    "api.course.assignmentGroup.html": {
                      "ref": "api.course.assignmentGroup.html",
                      "tf": 8.333333333333332
                    },
                    "api.course.assignmentGroup.html#listAssignmentGroups": {
                      "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                      "tf": 12.5
                    },
                    "api.course.assignmentGroup.html#getAssignmentGroup": {
                      "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                      "tf": 8.333333333333332
                    },
                    "api.course.assignmentGroup.html#update": {
                      "ref": "api.course.assignmentGroup.html#update",
                      "tf": 12.5
                    },
                    "api.course.assignmentGroup.html#create": {
                      "ref": "api.course.assignmentGroup.html#create",
                      "tf": 10
                    },
                    "api.course.assignmentGroup.html#delete": {
                      "ref": "api.course.assignmentGroup.html#delete",
                      "tf": 12.5
                    },
                    "api.course.group.html": {
                      "ref": "api.course.group.html",
                      "tf": 608.3333333333334
                    },
                    "api.course.group.html#get": {
                      "ref": "api.course.group.html#get",
                      "tf": 10
                    },
                    "api.course.group.html#listMembers": {
                      "ref": "api.course.group.html#listMembers",
                      "tf": 12.5
                    },
                    "api.course.group.html#updateMembers": {
                      "ref": "api.course.group.html#updateMembers",
                      "tf": 12.5
                    },
                    "api.course.groupSet.html": {
                      "ref": "api.course.groupSet.html",
                      "tf": 8.333333333333332
                    },
                    "api.course.groupSet.html#list": {
                      "ref": "api.course.groupSet.html#list",
                      "tf": 12.5
                    },
                    "api.course.groupSet.html#get": {
                      "ref": "api.course.groupSet.html#get",
                      "tf": 10
                    },
                    "api.course.groupSet.html#create": {
                      "ref": "api.course.groupSet.html#create",
                      "tf": 12.5
                    },
                    "api.course.groupSet.html#delete": {
                      "ref": "api.course.groupSet.html#delete",
                      "tf": 16.666666666666664
                    },
                    "api.course.groupSet.html#listGroups": {
                      "ref": "api.course.groupSet.html#listGroups",
                      "tf": 20
                    },
                    "api.course.groupSet.html#getGroup": {
                      "ref": "api.course.groupSet.html#getGroup",
                      "tf": 12.5
                    },
                    "api.course.groupSet.html#createGroup": {
                      "ref": "api.course.groupSet.html#createGroup",
                      "tf": 20
                    },
                    "api.course.groupSet.html#deleteGroup": {
                      "ref": "api.course.groupSet.html#deleteGroup",
                      "tf": 20
                    }
                  },
                  "#": {
                    "docs": {},
                    "g": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "api.course.group.html#get": {
                              "ref": "api.course.group.html#get",
                              "tf": 100
                            }
                          }
                        }
                      }
                    },
                    "l": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "m": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "b": {
                                    "docs": {
                                      "api.course.group.html#listMembers": {
                                        "ref": "api.course.group.html#listMembers",
                                        "tf": 75
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "u": {
                      "docs": {},
                      "p": {
                        "docs": {},
                        "d": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "m": {
                                      "docs": {},
                                      "b": {
                                        "docs": {
                                          "api.course.group.html#updateMembers": {
                                            "ref": "api.course.group.html#updateMembers",
                                            "tf": 75
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "s": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "api.course.groupSet.html": {
                            "ref": "api.course.groupSet.html",
                            "tf": 600
                          }
                        },
                        "#": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "i": {
                              "docs": {},
                              "s": {
                                "docs": {},
                                "t": {
                                  "docs": {
                                    "api.course.groupSet.html#list": {
                                      "ref": "api.course.groupSet.html#list",
                                      "tf": 75
                                    }
                                  },
                                  "g": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {
                                              "api.course.groupSet.html#listGroups": {
                                                "ref": "api.course.groupSet.html#listGroups",
                                                "tf": 75
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "g": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "t": {
                                "docs": {
                                  "api.course.groupSet.html#get": {
                                    "ref": "api.course.groupSet.html#get",
                                    "tf": 100
                                  }
                                },
                                "g": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "p": {
                                          "docs": {
                                            "api.course.groupSet.html#getGroup": {
                                              "ref": "api.course.groupSet.html#getGroup",
                                              "tf": 75
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "c": {
                            "docs": {},
                            "r": {
                              "docs": {
                                "api.course.groupSet.html#create": {
                                  "ref": "api.course.groupSet.html#create",
                                  "tf": 75
                                }
                              },
                              "e": {
                                "docs": {},
                                "a": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "e": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "u": {
                                              "docs": {},
                                              "p": {
                                                "docs": {
                                                  "api.course.groupSet.html#createGroup": {
                                                    "ref": "api.course.groupSet.html#createGroup",
                                                    "tf": 75
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "d": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "api.course.groupSet.html#delete": {
                                        "ref": "api.course.groupSet.html#delete",
                                        "tf": 75
                                      }
                                    },
                                    "e": {
                                      "docs": {},
                                      "g": {
                                        "docs": {},
                                        "r": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "u": {
                                              "docs": {},
                                              "p": {
                                                "docs": {
                                                  "api.course.groupSet.html#deleteGroup": {
                                                    "ref": "api.course.groupSet.html#deleteGroup",
                                                    "tf": 75
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    ".": {
                      "docs": {},
                      "j": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "/": {
                            "docs": {},
                            "g": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "g": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "p": {
                                            "docs": {
                                              "api.course.groupSet.html#getGroup": {
                                                "ref": "api.course.groupSet.html#getGroup",
                                                "tf": 6.25
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "l": {
          "docs": {},
          "e": {
            "docs": {},
            "v": {
              "docs": {},
              "e": {
                "docs": {},
                "l": {
                  "docs": {
                    "list_class.html": {
                      "ref": "list_class.html",
                      "tf": 23.333333333333332
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "s": {
              "docs": {},
              "t": {
                "docs": {
                  "list_class.html": {
                    "ref": "list_class.html",
                    "tf": 110
                  },
                  "api.course.app.html#list": {
                    "ref": "api.course.app.html#list",
                    "tf": 618.3333333333334
                  },
                  "api.course.assignment.html#list": {
                    "ref": "api.course.assignment.html#list",
                    "tf": 625
                  },
                  "api.course.assignment.html#listGradeableStudents": {
                    "ref": "api.course.assignment.html#listGradeableStudents",
                    "tf": 10
                  },
                  "api.course.assignment.html#listOverrides": {
                    "ref": "api.course.assignment.html#listOverrides",
                    "tf": 12.5
                  },
                  "api.course.assignment.html#listSubmissions": {
                    "ref": "api.course.assignment.html#listSubmissions",
                    "tf": 10
                  },
                  "api.course.assignmentGroup.html#listAssignmentGroups": {
                    "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                    "tf": 12.5
                  },
                  "api.course.gradebookColumn.html#list": {
                    "ref": "api.course.gradebookColumn.html#list",
                    "tf": 616.6666666666667
                  },
                  "api.course.gradebookColumn.html#get": {
                    "ref": "api.course.gradebookColumn.html#get",
                    "tf": 3.3333333333333335
                  },
                  "api.course.gradebookColumn.html#listEntries": {
                    "ref": "api.course.gradebookColumn.html#listEntries",
                    "tf": 7.142857142857142
                  },
                  "api.course.gradebookColumn.html#updateEntries": {
                    "ref": "api.course.gradebookColumn.html#updateEntries",
                    "tf": 7.142857142857142
                  },
                  "api.course.group.html#listMembers": {
                    "ref": "api.course.group.html#listMembers",
                    "tf": 12.5
                  },
                  "api.course.group.html#updateMembers": {
                    "ref": "api.course.group.html#updateMembers",
                    "tf": 12.5
                  },
                  "api.course.groupSet.html#list": {
                    "ref": "api.course.groupSet.html#list",
                    "tf": 620.8333333333334
                  },
                  "api.course.groupSet.html#listGroups": {
                    "ref": "api.course.groupSet.html#listGroups",
                    "tf": 10
                  },
                  "api.course.page.html#list": {
                    "ref": "api.course.page.html#list",
                    "tf": 620.8333333333334
                  },
                  "api.course.quiz.html#list": {
                    "ref": "api.course.quiz.html#list",
                    "tf": 625
                  },
                  "api.course.quiz.html#listQuestions": {
                    "ref": "api.course.quiz.html#listQuestions",
                    "tf": 10
                  },
                  "api.course.quiz.html#listSubmissions": {
                    "ref": "api.course.quiz.html#listSubmissions",
                    "tf": 12.5
                  },
                  "api.course.quiz.html#listQuestionGrades": {
                    "ref": "api.course.quiz.html#listQuestionGrades",
                    "tf": 7.142857142857142
                  },
                  "api.course.rubric.html#list": {
                    "ref": "api.course.rubric.html#list",
                    "tf": 620.8333333333334
                  },
                  "api.course.section.html#list": {
                    "ref": "api.course.section.html#list",
                    "tf": 620.8333333333334
                  },
                  "api.course.html#listEnrollments": {
                    "ref": "api.course.html#listEnrollments",
                    "tf": 12.5
                  },
                  "api.course.html#listStudentEnrollments": {
                    "ref": "api.course.html#listStudentEnrollments",
                    "tf": 10
                  },
                  "api.course.html#listTeachingTeamMemberEnrollments": {
                    "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                    "tf": 8.333333333333332
                  },
                  "api.course.html#listDesignerEnrollments": {
                    "ref": "api.course.html#listDesignerEnrollments",
                    "tf": 10
                  },
                  "api.course.html#listObserverEnrollments": {
                    "ref": "api.course.html#listObserverEnrollments",
                    "tf": 10
                  },
                  "api.course.html#listStudents": {
                    "ref": "api.course.html#listStudents",
                    "tf": 12.5
                  },
                  "api.course.html#listTeachingTeamMembers": {
                    "ref": "api.course.html#listTeachingTeamMembers",
                    "tf": 10
                  },
                  "api.course.html#listDesigners": {
                    "ref": "api.course.html#listDesigners",
                    "tf": 12.5
                  },
                  "api.course.html#listObservers": {
                    "ref": "api.course.html#listObservers",
                    "tf": 12.5
                  },
                  "api.user.self.html#listCourses": {
                    "ref": "api.user.self.html#listCourses",
                    "tf": 8.333333333333332
                  }
                },
                ":": {
                  "docs": {},
                  "c": {
                    "docs": {},
                    "l": {
                      "docs": {},
                      "a": {
                        "docs": {},
                        "s": {
                          "docs": {},
                          "s": {
                            "docs": {
                              "list_class.html": {
                                "ref": "list_class.html",
                                "tf": 1300
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "g": {
                  "docs": {},
                  "r": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "d": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "b": {
                              "docs": {},
                              "l": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "u": {
                                        "docs": {},
                                        "d": {
                                          "docs": {
                                            "api.course.assignment.html#listGradeableStudents": {
                                              "ref": "api.course.assignment.html#listGradeableStudents",
                                              "tf": 608.3333333333334
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "o": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "p": {
                          "docs": {
                            "api.course.groupSet.html#listGroups": {
                              "ref": "api.course.groupSet.html#listGroups",
                              "tf": 608.3333333333334
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "o": {
                  "docs": {},
                  "v": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "d": {
                              "docs": {
                                "api.course.assignment.html#listOverrides": {
                                  "ref": "api.course.assignment.html#listOverrides",
                                  "tf": 608.3333333333334
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "b": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "r": {
                          "docs": {},
                          "v": {
                            "docs": {
                              "api.course.html#listObservers": {
                                "ref": "api.course.html#listObservers",
                                "tf": 633.3333333333334
                              }
                            },
                            "e": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "l": {
                                          "docs": {
                                            "api.course.html#listObserverEnrollments": {
                                              "ref": "api.course.html#listObserverEnrollments",
                                              "tf": 633.3333333333334
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "s": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "b": {
                      "docs": {},
                      "m": {
                        "docs": {},
                        "i": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "s": {
                              "docs": {
                                "api.course.assignment.html#listSubmissions": {
                                  "ref": "api.course.assignment.html#listSubmissions",
                                  "tf": 608.3333333333334
                                },
                                "api.course.quiz.html#listSubmissions": {
                                  "ref": "api.course.quiz.html#listSubmissions",
                                  "tf": 608.3333333333334
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "t": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "api.course.html#listStudents": {
                            "ref": "api.course.html#listStudents",
                            "tf": 633.3333333333334
                          }
                        },
                        "e": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "o": {
                                      "docs": {},
                                      "l": {
                                        "docs": {
                                          "api.course.html#listStudentEnrollments": {
                                            "ref": "api.course.html#listStudentEnrollments",
                                            "tf": 633.3333333333334
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "a": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "g": {
                          "docs": {},
                          "n": {
                            "docs": {},
                            "m": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "n": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "g": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "o": {
                                          "docs": {},
                                          "u": {
                                            "docs": {},
                                            "p": {
                                              "docs": {
                                                "api.course.assignmentGroup.html#listAssignmentGroups": {
                                                  "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                                                  "tf": 608.3333333333334
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "e": {
                  "docs": {},
                  "n": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "i": {
                          "docs": {
                            "api.course.gradebookColumn.html#listEntries": {
                              "ref": "api.course.gradebookColumn.html#listEntries",
                              "tf": 608.3333333333334
                            }
                          }
                        }
                      }
                    },
                    "r": {
                      "docs": {},
                      "o": {
                        "docs": {},
                        "l": {
                          "docs": {
                            "api.course.html#listEnrollments": {
                              "ref": "api.course.html#listEnrollments",
                              "tf": 633.3333333333334
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "b": {
                        "docs": {
                          "api.course.group.html#listMembers": {
                            "ref": "api.course.group.html#listMembers",
                            "tf": 608.3333333333334
                          }
                        }
                      }
                    }
                  }
                },
                "q": {
                  "docs": {},
                  "u": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "api.course.quiz.html#listQuestions": {
                              "ref": "api.course.quiz.html#listQuestions",
                              "tf": 608.3333333333334
                            }
                          },
                          "i": {
                            "docs": {},
                            "o": {
                              "docs": {},
                              "n": {
                                "docs": {},
                                "g": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "d": {
                                        "docs": {
                                          "api.course.quiz.html#listQuestionGrades": {
                                            "ref": "api.course.quiz.html#listQuestionGrades",
                                            "tf": 608.3333333333334
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "t": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "a": {
                      "docs": {},
                      "c": {
                        "docs": {},
                        "h": {
                          "docs": {},
                          "i": {
                            "docs": {},
                            "n": {
                              "docs": {},
                              "g": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "a": {
                                      "docs": {},
                                      "m": {
                                        "docs": {},
                                        "m": {
                                          "docs": {},
                                          "e": {
                                            "docs": {},
                                            "m": {
                                              "docs": {},
                                              "b": {
                                                "docs": {
                                                  "api.course.html#listTeachingTeamMembers": {
                                                    "ref": "api.course.html#listTeachingTeamMembers",
                                                    "tf": 633.3333333333334
                                                  }
                                                },
                                                "e": {
                                                  "docs": {},
                                                  "r": {
                                                    "docs": {},
                                                    "e": {
                                                      "docs": {},
                                                      "n": {
                                                        "docs": {},
                                                        "r": {
                                                          "docs": {},
                                                          "o": {
                                                            "docs": {},
                                                            "l": {
                                                              "docs": {
                                                                "api.course.html#listTeachingTeamMemberEnrollments": {
                                                                  "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                                                                  "tf": 633.3333333333334
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "d": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "s": {
                      "docs": {},
                      "i": {
                        "docs": {},
                        "g": {
                          "docs": {},
                          "n": {
                            "docs": {
                              "api.course.html#listDesigners": {
                                "ref": "api.course.html#listDesigners",
                                "tf": 633.3333333333334
                              }
                            },
                            "e": {
                              "docs": {},
                              "r": {
                                "docs": {},
                                "e": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "l": {
                                          "docs": {
                                            "api.course.html#listDesignerEnrollments": {
                                              "ref": "api.course.html#listDesignerEnrollments",
                                              "tf": 633.3333333333334
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "u": {
                  "docs": {},
                  "s": {
                    "docs": {
                      "api.course.html#listUsers": {
                        "ref": "api.course.html#listUsers",
                        "tf": 633.3333333333334
                      }
                    }
                  }
                },
                "c": {
                  "docs": {},
                  "o": {
                    "docs": {},
                    "u": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "s": {
                          "docs": {
                            "api.user.self.html#listCourses": {
                              "ref": "api.user.self.html#listCourses",
                              "tf": 600
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "docs": {},
            "i": {
              "docs": {
                "api.course.app.html": {
                  "ref": "api.course.app.html",
                  "tf": 7.142857142857142
                },
                "api.course.app.html#get": {
                  "ref": "api.course.app.html#get",
                  "tf": 10
                },
                "api.course.app.html#add": {
                  "ref": "api.course.app.html#add",
                  "tf": 10
                },
                "api.course.app.html#remove": {
                  "ref": "api.course.app.html#remove",
                  "tf": 10
                },
                "api.course.app.html#getMetadata": {
                  "ref": "api.course.app.html#getMetadata",
                  "tf": 1.282051282051282
                },
                "api.course.app.html#updateMetadata": {
                  "ref": "api.course.app.html#updateMetadata",
                  "tf": 1.3157894736842104
                }
              }
            }
          }
        },
        "o": {
          "docs": {},
          "b": {
            "docs": {},
            "j": {
              "docs": {},
              "e": {
                "docs": {},
                "c": {
                  "docs": {},
                  "t": {
                    "docs": {
                      "list_class.html": {
                        "ref": "list_class.html",
                        "tf": 23.333333333333332
                      }
                    }
                  }
                }
              }
            },
            "s": {
              "docs": {},
              "e": {
                "docs": {},
                "r": {
                  "docs": {},
                  "v": {
                    "docs": {
                      "api.course.html#listObserverEnrollments": {
                        "ref": "api.course.html#listObserverEnrollments",
                        "tf": 10
                      },
                      "api.course.html#listObservers": {
                        "ref": "api.course.html#listObservers",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "t": {
              "docs": {},
              "i": {
                "docs": {},
                "o": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "api.course.app.html#get": {
                        "ref": "api.course.app.html#get",
                        "tf": 50
                      },
                      "api.course.app.html#add": {
                        "ref": "api.course.app.html#add",
                        "tf": 33.33333333333333
                      },
                      "api.course.app.html#remove": {
                        "ref": "api.course.app.html#remove",
                        "tf": 33.33333333333333
                      },
                      "api.course.app.html#getMetadata": {
                        "ref": "api.course.app.html#getMetadata",
                        "tf": 33.33333333333333
                      },
                      "api.course.app.html#updateMetadata": {
                        "ref": "api.course.app.html#updateMetadata",
                        "tf": 33.33333333333333
                      },
                      "api.course.app.html#list": {
                        "ref": "api.course.app.html#list",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#list": {
                        "ref": "api.course.assignment.html#list",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#get": {
                        "ref": "api.course.assignment.html#get",
                        "tf": 50
                      },
                      "api.course.assignment.html#update": {
                        "ref": "api.course.assignment.html#update",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#create": {
                        "ref": "api.course.assignment.html#create",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#delete": {
                        "ref": "api.course.assignment.html#delete",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#listGradeableStudents": {
                        "ref": "api.course.assignment.html#listGradeableStudents",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#createSubmissionComment": {
                        "ref": "api.course.assignment.html#createSubmissionComment",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#updateGrades": {
                        "ref": "api.course.assignment.html#updateGrades",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#listOverrides": {
                        "ref": "api.course.assignment.html#listOverrides",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#getOverride": {
                        "ref": "api.course.assignment.html#getOverride",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#createOverride": {
                        "ref": "api.course.assignment.html#createOverride",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#deleteOverride": {
                        "ref": "api.course.assignment.html#deleteOverride",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#listSubmissions": {
                        "ref": "api.course.assignment.html#listSubmissions",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#getSubmission": {
                        "ref": "api.course.assignment.html#getSubmission",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#createTextSubmission": {
                        "ref": "api.course.assignment.html#createTextSubmission",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#createURLSubmission": {
                        "ref": "api.course.assignment.html#createURLSubmission",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignment.html#createFileSubmission": {
                        "ref": "api.course.assignment.html#createFileSubmission",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignmentGroup.html#listAssignmentGroups": {
                        "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignmentGroup.html#getAssignmentGroup": {
                        "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignmentGroup.html#update": {
                        "ref": "api.course.assignmentGroup.html#update",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignmentGroup.html#create": {
                        "ref": "api.course.assignmentGroup.html#create",
                        "tf": 33.33333333333333
                      },
                      "api.course.assignmentGroup.html#delete": {
                        "ref": "api.course.assignmentGroup.html#delete",
                        "tf": 33.33333333333333
                      },
                      "api.course.gradebookColumn.html#list": {
                        "ref": "api.course.gradebookColumn.html#list",
                        "tf": 33.33333333333333
                      },
                      "api.course.gradebookColumn.html#get": {
                        "ref": "api.course.gradebookColumn.html#get",
                        "tf": 50
                      },
                      "api.course.gradebookColumn.html#update": {
                        "ref": "api.course.gradebookColumn.html#update",
                        "tf": 33.33333333333333
                      },
                      "api.course.gradebookColumn.html#create": {
                        "ref": "api.course.gradebookColumn.html#create",
                        "tf": 33.33333333333333
                      },
                      "api.course.gradebookColumn.html#delete": {
                        "ref": "api.course.gradebookColumn.html#delete",
                        "tf": 33.33333333333333
                      },
                      "api.course.gradebookColumn.html#listEntries": {
                        "ref": "api.course.gradebookColumn.html#listEntries",
                        "tf": 33.33333333333333
                      },
                      "api.course.gradebookColumn.html#updateEntries": {
                        "ref": "api.course.gradebookColumn.html#updateEntries",
                        "tf": 33.33333333333333
                      },
                      "api.course.group.html#get": {
                        "ref": "api.course.group.html#get",
                        "tf": 100
                      },
                      "api.course.group.html#listMembers": {
                        "ref": "api.course.group.html#listMembers",
                        "tf": 33.33333333333333
                      },
                      "api.course.group.html#updateMembers": {
                        "ref": "api.course.group.html#updateMembers",
                        "tf": 33.33333333333333
                      },
                      "api.course.groupSet.html#list": {
                        "ref": "api.course.groupSet.html#list",
                        "tf": 33.33333333333333
                      },
                      "api.course.groupSet.html#get": {
                        "ref": "api.course.groupSet.html#get",
                        "tf": 50
                      },
                      "api.course.groupSet.html#create": {
                        "ref": "api.course.groupSet.html#create",
                        "tf": 33.33333333333333
                      },
                      "api.course.groupSet.html#delete": {
                        "ref": "api.course.groupSet.html#delete",
                        "tf": 33.33333333333333
                      },
                      "api.course.groupSet.html#listGroups": {
                        "ref": "api.course.groupSet.html#listGroups",
                        "tf": 33.33333333333333
                      },
                      "api.course.groupSet.html#getGroup": {
                        "ref": "api.course.groupSet.html#getGroup",
                        "tf": 33.33333333333333
                      },
                      "api.course.groupSet.html#createGroup": {
                        "ref": "api.course.groupSet.html#createGroup",
                        "tf": 33.33333333333333
                      },
                      "api.course.groupSet.html#deleteGroup": {
                        "ref": "api.course.groupSet.html#deleteGroup",
                        "tf": 33.33333333333333
                      },
                      "api.course.page.html#list": {
                        "ref": "api.course.page.html#list",
                        "tf": 33.33333333333333
                      },
                      "api.course.page.html#update": {
                        "ref": "api.course.page.html#update",
                        "tf": 33.33333333333333
                      },
                      "api.course.page.html#create": {
                        "ref": "api.course.page.html#create",
                        "tf": 33.33333333333333
                      },
                      "api.course.page.html#delete": {
                        "ref": "api.course.page.html#delete",
                        "tf": 33.33333333333333
                      },
                      "api.course.page.html#get": {
                        "ref": "api.course.page.html#get",
                        "tf": 50
                      },
                      "api.course.quiz.html#list": {
                        "ref": "api.course.quiz.html#list",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#get": {
                        "ref": "api.course.quiz.html#get",
                        "tf": 50
                      },
                      "api.course.quiz.html#update": {
                        "ref": "api.course.quiz.html#update",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#create": {
                        "ref": "api.course.quiz.html#create",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#delete": {
                        "ref": "api.course.quiz.html#delete",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#listQuestions": {
                        "ref": "api.course.quiz.html#listQuestions",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#createMultipleChoiceQuestion": {
                        "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#listSubmissions": {
                        "ref": "api.course.quiz.html#listSubmissions",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#getSubmission": {
                        "ref": "api.course.quiz.html#getSubmission",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#createSubmission": {
                        "ref": "api.course.quiz.html#createSubmission",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#listQuestionGrades": {
                        "ref": "api.course.quiz.html#listQuestionGrades",
                        "tf": 33.33333333333333
                      },
                      "api.course.quiz.html#updateQuestionGrades": {
                        "ref": "api.course.quiz.html#updateQuestionGrades",
                        "tf": 33.33333333333333
                      },
                      "api.course.rubric.html#list": {
                        "ref": "api.course.rubric.html#list",
                        "tf": 33.33333333333333
                      },
                      "api.course.rubric.html#get": {
                        "ref": "api.course.rubric.html#get",
                        "tf": 50
                      },
                      "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                        "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                        "tf": 33.33333333333333
                      },
                      "api.course.section.html#list": {
                        "ref": "api.course.section.html#list",
                        "tf": 33.33333333333333
                      },
                      "api.course.section.html#get": {
                        "ref": "api.course.section.html#get",
                        "tf": 50
                      },
                      "api.course.html#get": {
                        "ref": "api.course.html#get",
                        "tf": 50
                      },
                      "api.course.html#listEnrollments": {
                        "ref": "api.course.html#listEnrollments",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listStudentEnrollments": {
                        "ref": "api.course.html#listStudentEnrollments",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listTeachingTeamMemberEnrollments": {
                        "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listDesignerEnrollments": {
                        "ref": "api.course.html#listDesignerEnrollments",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listObserverEnrollments": {
                        "ref": "api.course.html#listObserverEnrollments",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#getUser": {
                        "ref": "api.course.html#getUser",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listUsers": {
                        "ref": "api.course.html#listUsers",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listStudents": {
                        "ref": "api.course.html#listStudents",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listTeachingTeamMembers": {
                        "ref": "api.course.html#listTeachingTeamMembers",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listDesigners": {
                        "ref": "api.course.html#listDesigners",
                        "tf": 33.33333333333333
                      },
                      "api.course.html#listObservers": {
                        "ref": "api.course.html#listObservers",
                        "tf": 33.33333333333333
                      },
                      "api.user.self.html#listCourses": {
                        "ref": "api.user.self.html#listCourses",
                        "tf": 25
                      }
                    }
                  }
                }
              }
            }
          },
          "v": {
            "docs": {},
            "e": {
              "docs": {},
              "r": {
                "docs": {},
                "r": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "d": {
                      "docs": {
                        "api.course.assignment.html#listOverrides": {
                          "ref": "api.course.assignment.html#listOverrides",
                          "tf": 12.5
                        },
                        "api.course.assignment.html#getOverride": {
                          "ref": "api.course.assignment.html#getOverride",
                          "tf": 12.5
                        },
                        "api.course.assignment.html#createOverride": {
                          "ref": "api.course.assignment.html#createOverride",
                          "tf": 16.666666666666664
                        },
                        "api.course.assignment.html#deleteOverride": {
                          "ref": "api.course.assignment.html#deleteOverride",
                          "tf": 16.666666666666664
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "n": {
            "docs": {
              "api.course.gradebookColumn.html#get": {
                "ref": "api.course.gradebookColumn.html#get",
                "tf": 3.3333333333333335
              }
            }
          }
        },
        "f": {
          "docs": {},
          "u": {
            "docs": {},
            "n": {
              "docs": {},
              "c": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {
                          "api.course.app.html": {
                            "ref": "api.course.app.html",
                            "tf": 7.142857142857142
                          },
                          "api.course.app.html#get": {
                            "ref": "api.course.app.html#get",
                            "tf": 110
                          },
                          "api.course.app.html#add": {
                            "ref": "api.course.app.html#add",
                            "tf": 110
                          },
                          "api.course.app.html#remove": {
                            "ref": "api.course.app.html#remove",
                            "tf": 110
                          },
                          "api.course.app.html#getMetadata": {
                            "ref": "api.course.app.html#getMetadata",
                            "tf": 110
                          },
                          "api.course.app.html#updateMetadata": {
                            "ref": "api.course.app.html#updateMetadata",
                            "tf": 110
                          },
                          "api.course.app.html#list": {
                            "ref": "api.course.app.html#list",
                            "tf": 110
                          },
                          "api.course.assignment.html": {
                            "ref": "api.course.assignment.html",
                            "tf": 10
                          },
                          "api.course.assignment.html#list": {
                            "ref": "api.course.assignment.html#list",
                            "tf": 110
                          },
                          "api.course.assignment.html#get": {
                            "ref": "api.course.assignment.html#get",
                            "tf": 110
                          },
                          "api.course.assignment.html#update": {
                            "ref": "api.course.assignment.html#update",
                            "tf": 110
                          },
                          "api.course.assignment.html#create": {
                            "ref": "api.course.assignment.html#create",
                            "tf": 110
                          },
                          "api.course.assignment.html#delete": {
                            "ref": "api.course.assignment.html#delete",
                            "tf": 110
                          },
                          "api.course.assignment.html#listGradeableStudents": {
                            "ref": "api.course.assignment.html#listGradeableStudents",
                            "tf": 110
                          },
                          "api.course.assignment.html#createSubmissionComment": {
                            "ref": "api.course.assignment.html#createSubmissionComment",
                            "tf": 110
                          },
                          "api.course.assignment.html#updateGrades": {
                            "ref": "api.course.assignment.html#updateGrades",
                            "tf": 110
                          },
                          "api.course.assignment.html#listOverrides": {
                            "ref": "api.course.assignment.html#listOverrides",
                            "tf": 110
                          },
                          "api.course.assignment.html#getOverride": {
                            "ref": "api.course.assignment.html#getOverride",
                            "tf": 110
                          },
                          "api.course.assignment.html#createOverride": {
                            "ref": "api.course.assignment.html#createOverride",
                            "tf": 110
                          },
                          "api.course.assignment.html#deleteOverride": {
                            "ref": "api.course.assignment.html#deleteOverride",
                            "tf": 110
                          },
                          "api.course.assignment.html#listSubmissions": {
                            "ref": "api.course.assignment.html#listSubmissions",
                            "tf": 110
                          },
                          "api.course.assignment.html#getSubmission": {
                            "ref": "api.course.assignment.html#getSubmission",
                            "tf": 110
                          },
                          "api.course.assignment.html#createTextSubmission": {
                            "ref": "api.course.assignment.html#createTextSubmission",
                            "tf": 110
                          },
                          "api.course.assignment.html#createURLSubmission": {
                            "ref": "api.course.assignment.html#createURLSubmission",
                            "tf": 110
                          },
                          "api.course.assignment.html#createFileSubmission": {
                            "ref": "api.course.assignment.html#createFileSubmission",
                            "tf": 110
                          },
                          "api.course.assignmentGroup.html": {
                            "ref": "api.course.assignmentGroup.html",
                            "tf": 8.333333333333332
                          },
                          "api.course.assignmentGroup.html#listAssignmentGroups": {
                            "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                            "tf": 110
                          },
                          "api.course.assignmentGroup.html#getAssignmentGroup": {
                            "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                            "tf": 110
                          },
                          "api.course.assignmentGroup.html#update": {
                            "ref": "api.course.assignmentGroup.html#update",
                            "tf": 110
                          },
                          "api.course.assignmentGroup.html#create": {
                            "ref": "api.course.assignmentGroup.html#create",
                            "tf": 110
                          },
                          "api.course.assignmentGroup.html#delete": {
                            "ref": "api.course.assignmentGroup.html#delete",
                            "tf": 110
                          },
                          "api.course.gradebookColumn.html": {
                            "ref": "api.course.gradebookColumn.html",
                            "tf": 8.333333333333332
                          },
                          "api.course.gradebookColumn.html#list": {
                            "ref": "api.course.gradebookColumn.html#list",
                            "tf": 110
                          },
                          "api.course.gradebookColumn.html#get": {
                            "ref": "api.course.gradebookColumn.html#get",
                            "tf": 110
                          },
                          "api.course.gradebookColumn.html#update": {
                            "ref": "api.course.gradebookColumn.html#update",
                            "tf": 110
                          },
                          "api.course.gradebookColumn.html#create": {
                            "ref": "api.course.gradebookColumn.html#create",
                            "tf": 110
                          },
                          "api.course.gradebookColumn.html#delete": {
                            "ref": "api.course.gradebookColumn.html#delete",
                            "tf": 110
                          },
                          "api.course.gradebookColumn.html#listEntries": {
                            "ref": "api.course.gradebookColumn.html#listEntries",
                            "tf": 110
                          },
                          "api.course.gradebookColumn.html#updateEntries": {
                            "ref": "api.course.gradebookColumn.html#updateEntries",
                            "tf": 110
                          },
                          "api.course.group.html": {
                            "ref": "api.course.group.html",
                            "tf": 8.333333333333332
                          },
                          "api.course.group.html#get": {
                            "ref": "api.course.group.html#get",
                            "tf": 110
                          },
                          "api.course.group.html#listMembers": {
                            "ref": "api.course.group.html#listMembers",
                            "tf": 110
                          },
                          "api.course.group.html#updateMembers": {
                            "ref": "api.course.group.html#updateMembers",
                            "tf": 110
                          },
                          "api.course.groupSet.html": {
                            "ref": "api.course.groupSet.html",
                            "tf": 8.333333333333332
                          },
                          "api.course.groupSet.html#list": {
                            "ref": "api.course.groupSet.html#list",
                            "tf": 110
                          },
                          "api.course.groupSet.html#get": {
                            "ref": "api.course.groupSet.html#get",
                            "tf": 110
                          },
                          "api.course.groupSet.html#create": {
                            "ref": "api.course.groupSet.html#create",
                            "tf": 110
                          },
                          "api.course.groupSet.html#delete": {
                            "ref": "api.course.groupSet.html#delete",
                            "tf": 110
                          },
                          "api.course.groupSet.html#listGroups": {
                            "ref": "api.course.groupSet.html#listGroups",
                            "tf": 110
                          },
                          "api.course.groupSet.html#getGroup": {
                            "ref": "api.course.groupSet.html#getGroup",
                            "tf": 110
                          },
                          "api.course.groupSet.html#createGroup": {
                            "ref": "api.course.groupSet.html#createGroup",
                            "tf": 110
                          },
                          "api.course.groupSet.html#deleteGroup": {
                            "ref": "api.course.groupSet.html#deleteGroup",
                            "tf": 110
                          },
                          "api.course.page.html": {
                            "ref": "api.course.page.html",
                            "tf": 10
                          },
                          "api.course.page.html#list": {
                            "ref": "api.course.page.html#list",
                            "tf": 110
                          },
                          "api.course.page.html#update": {
                            "ref": "api.course.page.html#update",
                            "tf": 110
                          },
                          "api.course.page.html#create": {
                            "ref": "api.course.page.html#create",
                            "tf": 110
                          },
                          "api.course.page.html#delete": {
                            "ref": "api.course.page.html#delete",
                            "tf": 110
                          },
                          "api.course.page.html#get": {
                            "ref": "api.course.page.html#get",
                            "tf": 110
                          },
                          "api.course.quiz.html": {
                            "ref": "api.course.quiz.html",
                            "tf": 10
                          },
                          "api.course.quiz.html#list": {
                            "ref": "api.course.quiz.html#list",
                            "tf": 110
                          },
                          "api.course.quiz.html#get": {
                            "ref": "api.course.quiz.html#get",
                            "tf": 110
                          },
                          "api.course.quiz.html#update": {
                            "ref": "api.course.quiz.html#update",
                            "tf": 110
                          },
                          "api.course.quiz.html#create": {
                            "ref": "api.course.quiz.html#create",
                            "tf": 110
                          },
                          "api.course.quiz.html#delete": {
                            "ref": "api.course.quiz.html#delete",
                            "tf": 110
                          },
                          "api.course.quiz.html#listQuestions": {
                            "ref": "api.course.quiz.html#listQuestions",
                            "tf": 110
                          },
                          "api.course.quiz.html#createMultipleChoiceQuestion": {
                            "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                            "tf": 110
                          },
                          "api.course.quiz.html#listSubmissions": {
                            "ref": "api.course.quiz.html#listSubmissions",
                            "tf": 110
                          },
                          "api.course.quiz.html#getSubmission": {
                            "ref": "api.course.quiz.html#getSubmission",
                            "tf": 110
                          },
                          "api.course.quiz.html#createSubmission": {
                            "ref": "api.course.quiz.html#createSubmission",
                            "tf": 110
                          },
                          "api.course.quiz.html#listQuestionGrades": {
                            "ref": "api.course.quiz.html#listQuestionGrades",
                            "tf": 110
                          },
                          "api.course.quiz.html#updateQuestionGrades": {
                            "ref": "api.course.quiz.html#updateQuestionGrades",
                            "tf": 110
                          },
                          "api.course.rubric.html": {
                            "ref": "api.course.rubric.html",
                            "tf": 10
                          },
                          "api.course.rubric.html#list": {
                            "ref": "api.course.rubric.html#list",
                            "tf": 110
                          },
                          "api.course.rubric.html#get": {
                            "ref": "api.course.rubric.html#get",
                            "tf": 110
                          },
                          "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                            "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                            "tf": 110
                          },
                          "api.course.section.html": {
                            "ref": "api.course.section.html",
                            "tf": 10
                          },
                          "api.course.section.html#list": {
                            "ref": "api.course.section.html#list",
                            "tf": 110
                          },
                          "api.course.section.html#get": {
                            "ref": "api.course.section.html#get",
                            "tf": 110
                          },
                          "api.course.html": {
                            "ref": "api.course.html",
                            "tf": 16.666666666666664
                          },
                          "api.course.html#get": {
                            "ref": "api.course.html#get",
                            "tf": 110
                          },
                          "api.course.html#listEnrollments": {
                            "ref": "api.course.html#listEnrollments",
                            "tf": 110
                          },
                          "api.course.html#listStudentEnrollments": {
                            "ref": "api.course.html#listStudentEnrollments",
                            "tf": 110
                          },
                          "api.course.html#listTeachingTeamMemberEnrollments": {
                            "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                            "tf": 110
                          },
                          "api.course.html#listDesignerEnrollments": {
                            "ref": "api.course.html#listDesignerEnrollments",
                            "tf": 110
                          },
                          "api.course.html#listObserverEnrollments": {
                            "ref": "api.course.html#listObserverEnrollments",
                            "tf": 110
                          },
                          "api.course.html#getUser": {
                            "ref": "api.course.html#getUser",
                            "tf": 110
                          },
                          "api.course.html#listUsers": {
                            "ref": "api.course.html#listUsers",
                            "tf": 110
                          },
                          "api.course.html#listStudents": {
                            "ref": "api.course.html#listStudents",
                            "tf": 110
                          },
                          "api.course.html#listTeachingTeamMembers": {
                            "ref": "api.course.html#listTeachingTeamMembers",
                            "tf": 110
                          },
                          "api.course.html#listDesigners": {
                            "ref": "api.course.html#listDesigners",
                            "tf": 110
                          },
                          "api.course.html#listObservers": {
                            "ref": "api.course.html#listObservers",
                            "tf": 110
                          },
                          "api.user.self.html": {
                            "ref": "api.user.self.html",
                            "tf": 10
                          },
                          "api.user.self.html#getProfile": {
                            "ref": "api.user.self.html#getProfile",
                            "tf": 110
                          },
                          "api.user.self.html#listCourses": {
                            "ref": "api.user.self.html#listCourses",
                            "tf": 110
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "i": {
            "docs": {},
            "n": {
              "docs": {},
              "d": {
                "docs": {
                  "api.course.app.html#getMetadata": {
                    "ref": "api.course.app.html#getMetadata",
                    "tf": 1.282051282051282
                  }
                }
              }
            },
            "r": {
              "docs": {},
              "s": {
                "docs": {},
                "t": {
                  "docs": {
                    "api.course.app.html#getMetadata": {
                      "ref": "api.course.app.html#getMetadata",
                      "tf": 1.282051282051282
                    }
                  }
                }
              }
            },
            "l": {
              "docs": {},
              "e": {
                "docs": {
                  "api.course.assignment.html#createFileSubmission": {
                    "ref": "api.course.assignment.html#createFileSubmission",
                    "tf": 8.333333333333332
                  }
                }
              }
            }
          },
          "o": {
            "docs": {},
            "r": {
              "docs": {},
              "m": {
                "docs": {
                  "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                    "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                    "tf": 4.545454545454546
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "e": {
              "docs": {},
              "e": {
                "docs": {
                  "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                    "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                    "tf": 4.545454545454546
                  }
                }
              }
            }
          }
        },
        "w": {
          "docs": {},
          "i": {
            "docs": {},
            "t": {
              "docs": {},
              "h": {
                "docs": {},
                "i": {
                  "docs": {},
                  "n": {
                    "docs": {
                      "api.course.app.html": {
                        "ref": "api.course.app.html",
                        "tf": 7.142857142857142
                      },
                      "api.course.assignment.html": {
                        "ref": "api.course.assignment.html",
                        "tf": 10
                      },
                      "api.course.assignmentGroup.html": {
                        "ref": "api.course.assignmentGroup.html",
                        "tf": 8.333333333333332
                      },
                      "api.course.gradebookColumn.html": {
                        "ref": "api.course.gradebookColumn.html",
                        "tf": 8.333333333333332
                      },
                      "api.course.group.html": {
                        "ref": "api.course.group.html",
                        "tf": 8.333333333333332
                      },
                      "api.course.groupSet.html": {
                        "ref": "api.course.groupSet.html",
                        "tf": 8.333333333333332
                      },
                      "api.course.page.html": {
                        "ref": "api.course.page.html",
                        "tf": 10
                      },
                      "api.course.quiz.html": {
                        "ref": "api.course.quiz.html",
                        "tf": 10
                      },
                      "api.course.rubric.html": {
                        "ref": "api.course.rubric.html",
                        "tf": 10
                      },
                      "api.course.section.html": {
                        "ref": "api.course.section.html",
                        "tf": 10
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "p": {
          "docs": {},
          "r": {
            "docs": {},
            "o": {
              "docs": {},
              "m": {
                "docs": {},
                "i": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      ".": {
                        "docs": {},
                        "&": {
                          "docs": {},
                          "l": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              ";": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "b": {
                                    "docs": {},
                                    "j": {
                                      "docs": {},
                                      "e": {
                                        "docs": {},
                                        "c": {
                                          "docs": {},
                                          "t": {
                                            "docs": {},
                                            "&": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {
                                                    "api.course.app.html#get": {
                                                      "ref": "api.course.app.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.app.html#add": {
                                                      "ref": "api.course.app.html#add",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.app.html#remove": {
                                                      "ref": "api.course.app.html#remove",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.app.html#getMetadata": {
                                                      "ref": "api.course.app.html#getMetadata",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#get": {
                                                      "ref": "api.course.assignment.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.assignment.html#update": {
                                                      "ref": "api.course.assignment.html#update",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#create": {
                                                      "ref": "api.course.assignment.html#create",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#delete": {
                                                      "ref": "api.course.assignment.html#delete",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#createSubmissionComment": {
                                                      "ref": "api.course.assignment.html#createSubmissionComment",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#updateGrades": {
                                                      "ref": "api.course.assignment.html#updateGrades",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#getOverride": {
                                                      "ref": "api.course.assignment.html#getOverride",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#createOverride": {
                                                      "ref": "api.course.assignment.html#createOverride",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#deleteOverride": {
                                                      "ref": "api.course.assignment.html#deleteOverride",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#getSubmission": {
                                                      "ref": "api.course.assignment.html#getSubmission",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#createTextSubmission": {
                                                      "ref": "api.course.assignment.html#createTextSubmission",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#createURLSubmission": {
                                                      "ref": "api.course.assignment.html#createURLSubmission",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignment.html#createFileSubmission": {
                                                      "ref": "api.course.assignment.html#createFileSubmission",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignmentGroup.html#getAssignmentGroup": {
                                                      "ref": "api.course.assignmentGroup.html#getAssignmentGroup",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignmentGroup.html#update": {
                                                      "ref": "api.course.assignmentGroup.html#update",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignmentGroup.html#create": {
                                                      "ref": "api.course.assignmentGroup.html#create",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.assignmentGroup.html#delete": {
                                                      "ref": "api.course.assignmentGroup.html#delete",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.gradebookColumn.html#get": {
                                                      "ref": "api.course.gradebookColumn.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.gradebookColumn.html#update": {
                                                      "ref": "api.course.gradebookColumn.html#update",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.gradebookColumn.html#create": {
                                                      "ref": "api.course.gradebookColumn.html#create",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.gradebookColumn.html#delete": {
                                                      "ref": "api.course.gradebookColumn.html#delete",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.gradebookColumn.html#updateEntries": {
                                                      "ref": "api.course.gradebookColumn.html#updateEntries",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.group.html#updateMembers": {
                                                      "ref": "api.course.group.html#updateMembers",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.groupSet.html#get": {
                                                      "ref": "api.course.groupSet.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.groupSet.html#create": {
                                                      "ref": "api.course.groupSet.html#create",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.groupSet.html#delete": {
                                                      "ref": "api.course.groupSet.html#delete",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.groupSet.html#getGroup": {
                                                      "ref": "api.course.groupSet.html#getGroup",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.groupSet.html#createGroup": {
                                                      "ref": "api.course.groupSet.html#createGroup",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.groupSet.html#deleteGroup": {
                                                      "ref": "api.course.groupSet.html#deleteGroup",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.page.html#update": {
                                                      "ref": "api.course.page.html#update",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.page.html#create": {
                                                      "ref": "api.course.page.html#create",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.page.html#delete": {
                                                      "ref": "api.course.page.html#delete",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.page.html#get": {
                                                      "ref": "api.course.page.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.quiz.html#get": {
                                                      "ref": "api.course.quiz.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.quiz.html#update": {
                                                      "ref": "api.course.quiz.html#update",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.quiz.html#create": {
                                                      "ref": "api.course.quiz.html#create",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.quiz.html#delete": {
                                                      "ref": "api.course.quiz.html#delete",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.quiz.html#createMultipleChoiceQuestion": {
                                                      "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.quiz.html#getSubmission": {
                                                      "ref": "api.course.quiz.html#getSubmission",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.quiz.html#createSubmission": {
                                                      "ref": "api.course.quiz.html#createSubmission",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.rubric.html#get": {
                                                      "ref": "api.course.rubric.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                                                      "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.course.section.html#get": {
                                                      "ref": "api.course.section.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.html#get": {
                                                      "ref": "api.course.html#get",
                                                      "tf": 50
                                                    },
                                                    "api.course.html#getUser": {
                                                      "ref": "api.course.html#getUser",
                                                      "tf": 33.33333333333333
                                                    },
                                                    "api.user.self.html#getProfile": {
                                                      "ref": "api.user.self.html#getProfile",
                                                      "tf": 50
                                                    },
                                                    "api.user.self.html#listCourses": {
                                                      "ref": "api.user.self.html#listCourses",
                                                      "tf": 25
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                },
                                "a": {
                                  "docs": {},
                                  "r": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "a": {
                                        "docs": {},
                                        "y": {
                                          "docs": {},
                                          ".": {
                                            "docs": {},
                                            "&": {
                                              "docs": {},
                                              "l": {
                                                "docs": {},
                                                "t": {
                                                  "docs": {},
                                                  ";": {
                                                    "docs": {},
                                                    "o": {
                                                      "docs": {},
                                                      "b": {
                                                        "docs": {},
                                                        "j": {
                                                          "docs": {},
                                                          "e": {
                                                            "docs": {},
                                                            "c": {
                                                              "docs": {},
                                                              "t": {
                                                                "docs": {},
                                                                "&": {
                                                                  "docs": {},
                                                                  "g": {
                                                                    "docs": {},
                                                                    "t": {
                                                                      "docs": {},
                                                                      ";": {
                                                                        "docs": {},
                                                                        "&": {
                                                                          "docs": {},
                                                                          "g": {
                                                                            "docs": {},
                                                                            "t": {
                                                                              "docs": {
                                                                                "api.course.app.html#updateMetadata": {
                                                                                  "ref": "api.course.app.html#updateMetadata",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.app.html#list": {
                                                                                  "ref": "api.course.app.html#list",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.assignment.html#list": {
                                                                                  "ref": "api.course.assignment.html#list",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.assignment.html#listGradeableStudents": {
                                                                                  "ref": "api.course.assignment.html#listGradeableStudents",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.assignment.html#listOverrides": {
                                                                                  "ref": "api.course.assignment.html#listOverrides",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.assignment.html#listSubmissions": {
                                                                                  "ref": "api.course.assignment.html#listSubmissions",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.assignmentGroup.html#listAssignmentGroups": {
                                                                                  "ref": "api.course.assignmentGroup.html#listAssignmentGroups",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.gradebookColumn.html#list": {
                                                                                  "ref": "api.course.gradebookColumn.html#list",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.gradebookColumn.html#listEntries": {
                                                                                  "ref": "api.course.gradebookColumn.html#listEntries",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.group.html#listMembers": {
                                                                                  "ref": "api.course.group.html#listMembers",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.groupSet.html#list": {
                                                                                  "ref": "api.course.groupSet.html#list",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.groupSet.html#listGroups": {
                                                                                  "ref": "api.course.groupSet.html#listGroups",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.page.html#list": {
                                                                                  "ref": "api.course.page.html#list",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.quiz.html#list": {
                                                                                  "ref": "api.course.quiz.html#list",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.quiz.html#listQuestions": {
                                                                                  "ref": "api.course.quiz.html#listQuestions",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.quiz.html#listSubmissions": {
                                                                                  "ref": "api.course.quiz.html#listSubmissions",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.quiz.html#listQuestionGrades": {
                                                                                  "ref": "api.course.quiz.html#listQuestionGrades",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.quiz.html#updateQuestionGrades": {
                                                                                  "ref": "api.course.quiz.html#updateQuestionGrades",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.rubric.html#list": {
                                                                                  "ref": "api.course.rubric.html#list",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.section.html#list": {
                                                                                  "ref": "api.course.section.html#list",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listEnrollments": {
                                                                                  "ref": "api.course.html#listEnrollments",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listStudentEnrollments": {
                                                                                  "ref": "api.course.html#listStudentEnrollments",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listTeachingTeamMemberEnrollments": {
                                                                                  "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listDesignerEnrollments": {
                                                                                  "ref": "api.course.html#listDesignerEnrollments",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listObserverEnrollments": {
                                                                                  "ref": "api.course.html#listObserverEnrollments",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listUsers": {
                                                                                  "ref": "api.course.html#listUsers",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listStudents": {
                                                                                  "ref": "api.course.html#listStudents",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listTeachingTeamMembers": {
                                                                                  "ref": "api.course.html#listTeachingTeamMembers",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listDesigners": {
                                                                                  "ref": "api.course.html#listDesigners",
                                                                                  "tf": 33.33333333333333
                                                                                },
                                                                                "api.course.html#listObservers": {
                                                                                  "ref": "api.course.html#listObservers",
                                                                                  "tf": 33.33333333333333
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {},
            "r": {
              "docs": {},
              "a": {
                "docs": {},
                "m": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "t": {
                      "docs": {
                        "api.course.app.html#getMetadata": {
                          "ref": "api.course.app.html#getMetadata",
                          "tf": 1.282051282051282
                        },
                        "api.course.app.html#updateMetadata": {
                          "ref": "api.course.app.html#updateMetadata",
                          "tf": 1.3157894736842104
                        }
                      }
                    }
                  }
                }
              }
            },
            "g": {
              "docs": {},
              "e": {
                "docs": {
                  "api.course.page.html": {
                    "ref": "api.course.page.html",
                    "tf": 610
                  },
                  "api.course.page.html#list": {
                    "ref": "api.course.page.html#list",
                    "tf": 12.5
                  },
                  "api.course.page.html#update": {
                    "ref": "api.course.page.html#update",
                    "tf": 16.666666666666664
                  },
                  "api.course.page.html#create": {
                    "ref": "api.course.page.html#create",
                    "tf": 12.5
                  },
                  "api.course.page.html#delete": {
                    "ref": "api.course.page.html#delete",
                    "tf": 16.666666666666664
                  },
                  "api.course.page.html#get": {
                    "ref": "api.course.page.html#get",
                    "tf": 12.5
                  }
                },
                "#": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "api.course.page.html#list": {
                              "ref": "api.course.page.html#list",
                              "tf": 75
                            }
                          }
                        }
                      }
                    }
                  },
                  "u": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "api.course.page.html#update": {
                            "ref": "api.course.page.html#update",
                            "tf": 75
                          }
                        }
                      }
                    }
                  },
                  "c": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "api.course.page.html#create": {
                          "ref": "api.course.page.html#create",
                          "tf": 75
                        }
                      }
                    }
                  },
                  "d": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "api.course.page.html#delete": {
                                "ref": "api.course.page.html#delete",
                                "tf": 75
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "g": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "api.course.page.html#get": {
                            "ref": "api.course.page.html#get",
                            "tf": 100
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "l": {
              "docs": {},
              "l": {
                "docs": {
                  "api.course.gradebookColumn.html#get": {
                    "ref": "api.course.gradebookColumn.html#get",
                    "tf": 3.3333333333333335
                  }
                }
              }
            }
          }
        },
        "t": {
          "docs": {},
          "o": {
            "docs": {},
            "o": {
              "docs": {},
              "l": {
                "docs": {
                  "api.course.app.html#get": {
                    "ref": "api.course.app.html#get",
                    "tf": 10
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "x": {
              "docs": {},
              "t": {
                "docs": {
                  "api.course.assignment.html#createTextSubmission": {
                    "ref": "api.course.assignment.html#createTextSubmission",
                    "tf": 8.333333333333332
                  }
                }
              }
            },
            "a": {
              "docs": {},
              "c": {
                "docs": {},
                "h": {
                  "docs": {},
                  "e": {
                    "docs": {},
                    "r": {
                      "docs": {
                        "api.course.html#listTeachingTeamMemberEnrollments": {
                          "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                          "tf": 8.333333333333332
                        },
                        "api.course.html#listTeachingTeamMembers": {
                          "ref": "api.course.html#listTeachingTeamMembers",
                          "tf": 10
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "a": {
            "docs": {
              "api.course.html#listTeachingTeamMemberEnrollments": {
                "ref": "api.course.html#listTeachingTeamMemberEnrollments",
                "tf": 8.333333333333332
              },
              "api.course.html#listTeachingTeamMembers": {
                "ref": "api.course.html#listTeachingTeamMembers",
                "tf": 10
              }
            }
          }
        },
        "m": {
          "docs": {},
          "e": {
            "docs": {},
            "t": {
              "docs": {},
              "a": {
                "docs": {},
                "d": {
                  "docs": {},
                  "a": {
                    "docs": {},
                    "t": {
                      "docs": {},
                      "a": {
                        "docs": {
                          "api.course.app.html#getMetadata": {
                            "ref": "api.course.app.html#getMetadata",
                            "tf": 7.6923076923076925
                          },
                          "api.course.app.html#updateMetadata": {
                            "ref": "api.course.app.html#updateMetadata",
                            "tf": 7.894736842105263
                          }
                        },
                        "i": {
                          "docs": {},
                          "d": {
                            "docs": {
                              "api.course.app.html#getMetadata": {
                                "ref": "api.course.app.html#getMetadata",
                                "tf": 5.128205128205128
                              },
                              "api.course.app.html#updateMetadata": {
                                "ref": "api.course.app.html#updateMetadata",
                                "tf": 5.263157894736842
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "m": {
              "docs": {},
              "b": {
                "docs": {},
                "e": {
                  "docs": {},
                  "r": {
                    "docs": {
                      "api.course.group.html#listMembers": {
                        "ref": "api.course.group.html#listMembers",
                        "tf": 12.5
                      },
                      "api.course.group.html#updateMembers": {
                        "ref": "api.course.group.html#updateMembers",
                        "tf": 12.5
                      }
                    }
                  }
                }
              }
            }
          },
          "u": {
            "docs": {},
            "l": {
              "docs": {},
              "t": {
                "docs": {},
                "i": {
                  "docs": {},
                  "p": {
                    "docs": {},
                    "l": {
                      "docs": {
                        "api.course.quiz.html#createMultipleChoiceQuestion": {
                          "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                          "tf": 7.142857142857142
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "n": {
          "docs": {},
          "o": {
            "docs": {},
            "t": {
              "docs": {},
              "e": {
                "docs": {
                  "api.course.app.html#getMetadata": {
                    "ref": "api.course.app.html#getMetadata",
                    "tf": 1.282051282051282
                  },
                  "api.course.app.html#updateMetadata": {
                    "ref": "api.course.app.html#updateMetadata",
                    "tf": 1.3157894736842104
                  }
                }
              }
            }
          },
          "e": {
            "docs": {},
            "w": {
              "docs": {
                "api.course.assignmentGroup.html#create": {
                  "ref": "api.course.assignmentGroup.html#create",
                  "tf": 10
                },
                "api.course.gradebookColumn.html#create": {
                  "ref": "api.course.gradebookColumn.html#create",
                  "tf": 10
                },
                "api.course.groupSet.html#createGroup": {
                  "ref": "api.course.groupSet.html#createGroup",
                  "tf": 10
                },
                "api.course.page.html#create": {
                  "ref": "api.course.page.html#create",
                  "tf": 12.5
                },
                "api.course.quiz.html#create": {
                  "ref": "api.course.quiz.html#create",
                  "tf": 12.5
                },
                "api.course.quiz.html#createMultipleChoiceQuestion": {
                  "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                  "tf": 7.142857142857142
                },
                "api.course.quiz.html#createSubmission": {
                  "ref": "api.course.quiz.html#createSubmission",
                  "tf": 5.555555555555555
                },
                "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
                  "ref": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
                  "tf": 4.545454545454546
                }
              }
            }
          }
        },
        "u": {
          "docs": {},
          "s": {
            "docs": {
              "api.course.app.html#getMetadata": {
                "ref": "api.course.app.html#getMetadata",
                "tf": 1.282051282051282
              },
              "api.course.app.html#updateMetadata": {
                "ref": "api.course.app.html#updateMetadata",
                "tf": 1.3157894736842104
              }
            },
            "e": {
              "docs": {},
              "r": {
                "docs": {
                  "api.course.assignment.html#createTextSubmission": {
                    "ref": "api.course.assignment.html#createTextSubmission",
                    "tf": 8.333333333333332
                  },
                  "api.course.assignment.html#createURLSubmission": {
                    "ref": "api.course.assignment.html#createURLSubmission",
                    "tf": 8.333333333333332
                  },
                  "api.course.assignment.html#createFileSubmission": {
                    "ref": "api.course.assignment.html#createFileSubmission",
                    "tf": 8.333333333333332
                  },
                  "api.course.quiz.html#createSubmission": {
                    "ref": "api.course.quiz.html#createSubmission",
                    "tf": 5.555555555555555
                  },
                  "api.course.html#getUser": {
                    "ref": "api.course.html#getUser",
                    "tf": 10
                  },
                  "api.course.html#listUsers": {
                    "ref": "api.course.html#listUsers",
                    "tf": 12.5
                  },
                  "api.user.self.html": {
                    "ref": "api.user.self.html",
                    "tf": 10
                  },
                  "api.user.self.html#getProfile": {
                    "ref": "api.user.self.html#getProfile",
                    "tf": 12.5
                  },
                  "api.user.self.html#listCourses": {
                    "ref": "api.user.self.html#listCourses",
                    "tf": 8.333333333333332
                  }
                },
                ".": {
                  "docs": {},
                  "s": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "f": {
                          "docs": {
                            "api.user.self.html": {
                              "ref": "api.user.self.html",
                              "tf": 100
                            }
                          },
                          "#": {
                            "docs": {},
                            "g": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "p": {
                                    "docs": {},
                                    "r": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "f": {
                                          "docs": {},
                                          "i": {
                                            "docs": {},
                                            "l": {
                                              "docs": {
                                                "api.user.self.html#getProfile": {
                                                  "ref": "api.user.self.html#getProfile",
                                                  "tf": 75
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            "l": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "t": {
                                    "docs": {},
                                    "c": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "u": {
                                          "docs": {},
                                          "r": {
                                            "docs": {},
                                            "s": {
                                              "docs": {
                                                "api.user.self.html#listCourses": {
                                                  "ref": "api.user.self.html#listCourses",
                                                  "tf": 75
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "p": {
            "docs": {},
            "d": {
              "docs": {},
              "a": {
                "docs": {},
                "t": {
                  "docs": {
                    "api.course.app.html#updateMetadata": {
                      "ref": "api.course.app.html#updateMetadata",
                      "tf": 3.9473684210526314
                    },
                    "api.course.assignment.html#update": {
                      "ref": "api.course.assignment.html#update",
                      "tf": 625
                    },
                    "api.course.assignment.html#updateGrades": {
                      "ref": "api.course.assignment.html#updateGrades",
                      "tf": 11.11111111111111
                    },
                    "api.course.assignmentGroup.html#update": {
                      "ref": "api.course.assignmentGroup.html#update",
                      "tf": 620.8333333333334
                    },
                    "api.course.gradebookColumn.html#update": {
                      "ref": "api.course.gradebookColumn.html#update",
                      "tf": 620.8333333333334
                    },
                    "api.course.gradebookColumn.html#updateEntries": {
                      "ref": "api.course.gradebookColumn.html#updateEntries",
                      "tf": 7.142857142857142
                    },
                    "api.course.page.html#update": {
                      "ref": "api.course.page.html#update",
                      "tf": 625
                    },
                    "api.course.quiz.html#update": {
                      "ref": "api.course.quiz.html#update",
                      "tf": 620.8333333333334
                    },
                    "api.course.quiz.html#updateQuestionGrades": {
                      "ref": "api.course.quiz.html#updateQuestionGrades",
                      "tf": 7.142857142857142
                    }
                  },
                  "e": {
                    "docs": {},
                    "m": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "a": {
                            "docs": {},
                            "d": {
                              "docs": {},
                              "a": {
                                "docs": {},
                                "t": {
                                  "docs": {},
                                  "a": {
                                    "docs": {
                                      "api.course.app.html#updateMetadata": {
                                        "ref": "api.course.app.html#updateMetadata",
                                        "tf": 608.3333333333334
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "m": {
                          "docs": {},
                          "b": {
                            "docs": {
                              "api.course.group.html#updateMembers": {
                                "ref": "api.course.group.html#updateMembers",
                                "tf": 608.3333333333334
                              }
                            }
                          }
                        }
                      }
                    },
                    "g": {
                      "docs": {},
                      "r": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "d": {
                            "docs": {
                              "api.course.assignment.html#updateGrades": {
                                "ref": "api.course.assignment.html#updateGrades",
                                "tf": 608.3333333333334
                              }
                            }
                          }
                        }
                      }
                    },
                    "e": {
                      "docs": {},
                      "n": {
                        "docs": {},
                        "t": {
                          "docs": {},
                          "r": {
                            "docs": {},
                            "i": {
                              "docs": {
                                "api.course.gradebookColumn.html#updateEntries": {
                                  "ref": "api.course.gradebookColumn.html#updateEntries",
                                  "tf": 608.3333333333334
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "q": {
                      "docs": {},
                      "u": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "s": {
                            "docs": {},
                            "t": {
                              "docs": {},
                              "i": {
                                "docs": {},
                                "o": {
                                  "docs": {},
                                  "n": {
                                    "docs": {},
                                    "g": {
                                      "docs": {},
                                      "r": {
                                        "docs": {},
                                        "a": {
                                          "docs": {},
                                          "d": {
                                            "docs": {
                                              "api.course.quiz.html#updateQuestionGrades": {
                                                "ref": "api.course.quiz.html#updateQuestionGrades",
                                                "tf": 608.3333333333334
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "docs": {},
            "l": {
              "docs": {
                "api.course.assignment.html#createURLSubmission": {
                  "ref": "api.course.assignment.html#createURLSubmission",
                  "tf": 8.333333333333332
                }
              }
            }
          }
        },
        "q": {
          "docs": {},
          "u": {
            "docs": {},
            "i": {
              "docs": {},
              "z": {
                "docs": {
                  "api.course.quiz.html": {
                    "ref": "api.course.quiz.html",
                    "tf": 600
                  },
                  "api.course.quiz.html#get": {
                    "ref": "api.course.quiz.html#get",
                    "tf": 12.5
                  },
                  "api.course.quiz.html#update": {
                    "ref": "api.course.quiz.html#update",
                    "tf": 12.5
                  },
                  "api.course.quiz.html#create": {
                    "ref": "api.course.quiz.html#create",
                    "tf": 12.5
                  },
                  "api.course.quiz.html#delete": {
                    "ref": "api.course.quiz.html#delete",
                    "tf": 16.666666666666664
                  },
                  "api.course.quiz.html#listQuestions": {
                    "ref": "api.course.quiz.html#listQuestions",
                    "tf": 10
                  },
                  "api.course.quiz.html#createMultipleChoiceQuestion": {
                    "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                    "tf": 7.142857142857142
                  },
                  "api.course.quiz.html#listSubmissions": {
                    "ref": "api.course.quiz.html#listSubmissions",
                    "tf": 12.5
                  },
                  "api.course.quiz.html#getSubmission": {
                    "ref": "api.course.quiz.html#getSubmission",
                    "tf": 8.333333333333332
                  },
                  "api.course.quiz.html#createSubmission": {
                    "ref": "api.course.quiz.html#createSubmission",
                    "tf": 5.555555555555555
                  },
                  "api.course.quiz.html#listQuestionGrades": {
                    "ref": "api.course.quiz.html#listQuestionGrades",
                    "tf": 14.285714285714285
                  },
                  "api.course.quiz.html#updateQuestionGrades": {
                    "ref": "api.course.quiz.html#updateQuestionGrades",
                    "tf": 7.142857142857142
                  }
                },
                "z": {
                  "docs": {
                    "api.course.quiz.html": {
                      "ref": "api.course.quiz.html",
                      "tf": 10
                    },
                    "api.course.quiz.html#list": {
                      "ref": "api.course.quiz.html#list",
                      "tf": 16.666666666666664
                    }
                  }
                },
                "#": {
                  "docs": {},
                  "l": {
                    "docs": {},
                    "i": {
                      "docs": {},
                      "s": {
                        "docs": {},
                        "t": {
                          "docs": {
                            "api.course.quiz.html#list": {
                              "ref": "api.course.quiz.html#list",
                              "tf": 75
                            }
                          },
                          "q": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "e": {
                                "docs": {},
                                "s": {
                                  "docs": {},
                                  "t": {
                                    "docs": {
                                      "api.course.quiz.html#listQuestions": {
                                        "ref": "api.course.quiz.html#listQuestions",
                                        "tf": 75
                                      }
                                    },
                                    "i": {
                                      "docs": {},
                                      "o": {
                                        "docs": {},
                                        "n": {
                                          "docs": {},
                                          "g": {
                                            "docs": {},
                                            "r": {
                                              "docs": {},
                                              "a": {
                                                "docs": {},
                                                "d": {
                                                  "docs": {
                                                    "api.course.quiz.html#listQuestionGrades": {
                                                      "ref": "api.course.quiz.html#listQuestionGrades",
                                                      "tf": 75
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "s": {
                            "docs": {},
                            "u": {
                              "docs": {},
                              "b": {
                                "docs": {},
                                "m": {
                                  "docs": {},
                                  "i": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "s": {
                                        "docs": {
                                          "api.course.quiz.html#listSubmissions": {
                                            "ref": "api.course.quiz.html#listSubmissions",
                                            "tf": 75
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "g": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "t": {
                        "docs": {
                          "api.course.quiz.html#get": {
                            "ref": "api.course.quiz.html#get",
                            "tf": 100
                          }
                        },
                        "s": {
                          "docs": {},
                          "u": {
                            "docs": {},
                            "b": {
                              "docs": {},
                              "m": {
                                "docs": {},
                                "i": {
                                  "docs": {},
                                  "s": {
                                    "docs": {},
                                    "s": {
                                      "docs": {
                                        "api.course.quiz.html#getSubmission": {
                                          "ref": "api.course.quiz.html#getSubmission",
                                          "tf": 75
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "u": {
                    "docs": {},
                    "p": {
                      "docs": {},
                      "d": {
                        "docs": {
                          "api.course.quiz.html#update": {
                            "ref": "api.course.quiz.html#update",
                            "tf": 75
                          }
                        },
                        "a": {
                          "docs": {},
                          "t": {
                            "docs": {},
                            "e": {
                              "docs": {},
                              "q": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "e": {
                                    "docs": {},
                                    "s": {
                                      "docs": {},
                                      "t": {
                                        "docs": {},
                                        "i": {
                                          "docs": {},
                                          "o": {
                                            "docs": {},
                                            "n": {
                                              "docs": {},
                                              "g": {
                                                "docs": {},
                                                "r": {
                                                  "docs": {},
                                                  "a": {
                                                    "docs": {},
                                                    "d": {
                                                      "docs": {
                                                        "api.course.quiz.html#updateQuestionGrades": {
                                                          "ref": "api.course.quiz.html#updateQuestionGrades",
                                                          "tf": 75
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "c": {
                    "docs": {},
                    "r": {
                      "docs": {},
                      "e": {
                        "docs": {},
                        "a": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "api.course.quiz.html#create": {
                                "ref": "api.course.quiz.html#create",
                                "tf": 75
                              }
                            },
                            "e": {
                              "docs": {},
                              "m": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "l": {
                                    "docs": {},
                                    "t": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "p": {
                                          "docs": {},
                                          "l": {
                                            "docs": {},
                                            "e": {
                                              "docs": {},
                                              "c": {
                                                "docs": {},
                                                "h": {
                                                  "docs": {},
                                                  "o": {
                                                    "docs": {},
                                                    "i": {
                                                      "docs": {},
                                                      "c": {
                                                        "docs": {},
                                                        "e": {
                                                          "docs": {},
                                                          "q": {
                                                            "docs": {},
                                                            "u": {
                                                              "docs": {},
                                                              "e": {
                                                                "docs": {},
                                                                "s": {
                                                                  "docs": {},
                                                                  "t": {
                                                                    "docs": {
                                                                      "api.course.quiz.html#createMultipleChoiceQuestion": {
                                                                        "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                                                                        "tf": 75
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "s": {
                                "docs": {},
                                "u": {
                                  "docs": {},
                                  "b": {
                                    "docs": {},
                                    "m": {
                                      "docs": {},
                                      "i": {
                                        "docs": {},
                                        "s": {
                                          "docs": {},
                                          "s": {
                                            "docs": {
                                              "api.course.quiz.html#createSubmission": {
                                                "ref": "api.course.quiz.html#createSubmission",
                                                "tf": 75
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "d": {
                    "docs": {},
                    "e": {
                      "docs": {},
                      "l": {
                        "docs": {},
                        "e": {
                          "docs": {},
                          "t": {
                            "docs": {
                              "api.course.quiz.html#delete": {
                                "ref": "api.course.quiz.html#delete",
                                "tf": 75
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "e": {
              "docs": {},
              "s": {
                "docs": {},
                "t": {
                  "docs": {},
                  "i": {
                    "docs": {},
                    "o": {
                      "docs": {},
                      "n": {
                        "docs": {
                          "api.course.quiz.html#listQuestions": {
                            "ref": "api.course.quiz.html#listQuestions",
                            "tf": 10
                          },
                          "api.course.quiz.html#createMultipleChoiceQuestion": {
                            "ref": "api.course.quiz.html#createMultipleChoiceQuestion",
                            "tf": 7.142857142857142
                          },
                          "api.course.quiz.html#listQuestionGrades": {
                            "ref": "api.course.quiz.html#listQuestionGrades",
                            "tf": 7.142857142857142
                          },
                          "api.course.quiz.html#updateQuestionGrades": {
                            "ref": "api.course.quiz.html#updateQuestionGrades",
                            "tf": 7.142857142857142
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "length": 1076
    },
    "corpusTokens": [
      "actual",
      "add",
      "alia",
      "and/or",
      "api",
      "api.cours",
      "api.course#get",
      "api.course#getus",
      "api.course#listdesign",
      "api.course#listdesignerenrol",
      "api.course#listenrol",
      "api.course#listobserv",
      "api.course#listobserverenrol",
      "api.course#liststud",
      "api.course#liststudentenrol",
      "api.course#listteachingteammemb",
      "api.course#listteachingteammemberenrol",
      "api.course#listus",
      "api.course.app",
      "api.course.app#add",
      "api.course.app#get",
      "api.course.app#getmetadata",
      "api.course.app#list",
      "api.course.app#remov",
      "api.course.app#updatemetadata",
      "api.course.assign",
      "api.course.assignment#cr",
      "api.course.assignment#createfilesubmiss",
      "api.course.assignment#createoverrid",
      "api.course.assignment#createsubmissioncom",
      "api.course.assignment#createtextsubmiss",
      "api.course.assignment#createurlsubmiss",
      "api.course.assignment#delet",
      "api.course.assignment#deleteoverrid",
      "api.course.assignment#get",
      "api.course.assignment#getoverrid",
      "api.course.assignment#getsubmiss",
      "api.course.assignment#list",
      "api.course.assignment#listgradeablestud",
      "api.course.assignment#listoverrid",
      "api.course.assignment#listsubmiss",
      "api.course.assignment#upd",
      "api.course.assignment#updategrad",
      "api.course.assignmentgroup",
      "api.course.assignmentgroup#cr",
      "api.course.assignmentgroup#delet",
      "api.course.assignmentgroup#getassignmentgroup",
      "api.course.assignmentgroup#listassignmentgroup",
      "api.course.assignmentgroup#upd",
      "api.course.gradebookcolumn",
      "api.course.gradebookcolumn#cr",
      "api.course.gradebookcolumn#delet",
      "api.course.gradebookcolumn#get",
      "api.course.gradebookcolumn#list",
      "api.course.gradebookcolumn#listentri",
      "api.course.gradebookcolumn#upd",
      "api.course.gradebookcolumn#updateentri",
      "api.course.group",
      "api.course.group#get",
      "api.course.group#listmemb",
      "api.course.group#updatememb",
      "api.course.groupset",
      "api.course.groupset#cr",
      "api.course.groupset#creategroup",
      "api.course.groupset#delet",
      "api.course.groupset#deletegroup",
      "api.course.groupset#get",
      "api.course.groupset#getgroup",
      "api.course.groupset#list",
      "api.course.groupset#listgroup",
      "api.course.pag",
      "api.course.page#cr",
      "api.course.page#delet",
      "api.course.page#get",
      "api.course.page#list",
      "api.course.page#upd",
      "api.course.quiz",
      "api.course.quiz#cr",
      "api.course.quiz#createmultiplechoicequest",
      "api.course.quiz#createsubmiss",
      "api.course.quiz#delet",
      "api.course.quiz#get",
      "api.course.quiz#getsubmiss",
      "api.course.quiz#list",
      "api.course.quiz#listquest",
      "api.course.quiz#listquestiongrad",
      "api.course.quiz#listsubmiss",
      "api.course.quiz#upd",
      "api.course.quiz#updatequestiongrad",
      "api.course.rubr",
      "api.course.rubric#createfreeformgradingrubricinassign",
      "api.course.rubric#get",
      "api.course.rubric#list",
      "api.course.sect",
      "api.course.section#get",
      "api.course.section#list",
      "api.user.self",
      "api.user.self#getprofil",
      "api.user.self#listcours",
      "app",
      "app#add",
      "app#get",
      "app#getmetadata",
      "app#list",
      "app#remov",
      "app#updatemetadata",
      "assign",
      "assignment#cr",
      "assignment#createfilesubmiss",
      "assignment#createoverrid",
      "assignment#createsubmissioncom",
      "assignment#createtextsubmiss",
      "assignment#createurlsubmiss",
      "assignment#delet",
      "assignment#deleteoverrid",
      "assignment#get",
      "assignment#getoverrid",
      "assignment#getsubmiss",
      "assignment#list",
      "assignment#listgradeablestud",
      "assignment#listoverrid",
      "assignment#listsubmiss",
      "assignment#upd",
      "assignment#updategrad",
      "assignmentgroup",
      "assignmentgroup#cr",
      "assignmentgroup#delet",
      "assignmentgroup#getassignmentgroup",
      "assignmentgroup#listassignmentgroup",
      "assignmentgroup#upd",
      "associ",
      "batch",
      "behalf",
      "behav",
      "caccl",
      "call",
      "canva",
      "choic",
      "class",
      "column",
      "column'",
      "comment",
      "cours",
      "course#get",
      "course#getus",
      "course#listdesign",
      "course#listdesignerenrol",
      "course#listenrol",
      "course#listobserv",
      "course#listobserverenrol",
      "course#liststud",
      "course#liststudentenrol",
      "course#listteachingteammemb",
      "course#listteachingteammemberenrol",
      "course#listus",
      "course.app",
      "course.app#add",
      "course.app#get",
      "course.app#getmetadata",
      "course.app#list",
      "course.app#remov",
      "course.app#updatemetadata",
      "course.assign",
      "course.assignment#cr",
      "course.assignment#createfilesubmiss",
      "course.assignment#createoverrid",
      "course.assignment#createsubmissioncom",
      "course.assignment#createtextsubmiss",
      "course.assignment#createurlsubmiss",
      "course.assignment#delet",
      "course.assignment#deleteoverrid",
      "course.assignment#get",
      "course.assignment#getoverrid",
      "course.assignment#getsubmiss",
      "course.assignment#list",
      "course.assignment#listgradeablestud",
      "course.assignment#listoverrid",
      "course.assignment#listsubmiss",
      "course.assignment#upd",
      "course.assignment#updategrad",
      "course.assignmentgroup",
      "course.assignmentgroup#cr",
      "course.assignmentgroup#delet",
      "course.assignmentgroup#getassignmentgroup",
      "course.assignmentgroup#listassignmentgroup",
      "course.assignmentgroup#upd",
      "course.gradebookcolumn",
      "course.gradebookcolumn#cr",
      "course.gradebookcolumn#delet",
      "course.gradebookcolumn#get",
      "course.gradebookcolumn#list",
      "course.gradebookcolumn#listentri",
      "course.gradebookcolumn#upd",
      "course.gradebookcolumn#updateentri",
      "course.group",
      "course.group#get",
      "course.group#listmemb",
      "course.group#updatememb",
      "course.groupset",
      "course.groupset#cr",
      "course.groupset#creategroup",
      "course.groupset#delet",
      "course.groupset#deletegroup",
      "course.groupset#get",
      "course.groupset#getgroup",
      "course.groupset#list",
      "course.groupset#listgroup",
      "course.pag",
      "course.page#cr",
      "course.page#delet",
      "course.page#get",
      "course.page#list",
      "course.page#upd",
      "course.quiz",
      "course.quiz#cr",
      "course.quiz#createmultiplechoicequest",
      "course.quiz#createsubmiss",
      "course.quiz#delet",
      "course.quiz#get",
      "course.quiz#getsubmiss",
      "course.quiz#list",
      "course.quiz#listquest",
      "course.quiz#listquestiongrad",
      "course.quiz#listsubmiss",
      "course.quiz#upd",
      "course.quiz#updatequestiongrad",
      "course.rubr",
      "course.rubric#createfreeformgradingrubricinassign",
      "course.rubric#get",
      "course.rubric#list",
      "course.sect",
      "course.section#get",
      "course.section#list",
      "creat",
      "createfilesubmiss",
      "createfreeformgradingrubricinassign",
      "creategroup",
      "createmultiplechoicequest",
      "createoverrid",
      "createsubmiss",
      "createsubmissioncom",
      "createtextsubmiss",
      "createurlsubmiss",
      "current",
      "custom",
      "defin",
      "delet",
      "deletegroup",
      "deleteoverrid",
      "design",
      "differ",
      "document",
      "each",
      "element",
      "enabl",
      "endpoint",
      "enrol",
      "enrollmentss",
      "entri",
      "exist",
      "expect",
      "extern",
      "file",
      "find",
      "first",
      "form",
      "free",
      "function",
      "get",
      "getassignmentgroup",
      "getgroup",
      "getmetadata",
      "getoverrid",
      "getprofil",
      "getsubmiss",
      "getus",
      "given",
      "global",
      "grade",
      "gradeabl",
      "gradebook",
      "gradebookcolumn",
      "gradebookcolumn#cr",
      "gradebookcolumn#delet",
      "gradebookcolumn#get",
      "gradebookcolumn#list",
      "gradebookcolumn#listentri",
      "gradebookcolumn#upd",
      "gradebookcolumn#updateentri",
      "group",
      "group#get",
      "group#listmemb",
      "group#updatememb",
      "groups.js/getgroup",
      "groupset",
      "groupset#cr",
      "groupset#creategroup",
      "groupset#delet",
      "groupset#deletegroup",
      "groupset#get",
      "groupset#getgroup",
      "groupset#list",
      "groupset#listgroup",
      "identifi",
      "includeterm",
      "index",
      "info",
      "inform",
      "instal",
      "interact",
      "item",
      "level",
      "list",
      "list:class",
      "listassignmentgroup",
      "listcours",
      "listdesign",
      "listdesignerenrol",
      "listenrol",
      "listentri",
      "listgradeablestud",
      "listgroup",
      "listmemb",
      "listobserv",
      "listobserverenrol",
      "listoverrid",
      "listquest",
      "listquestiongrad",
      "liststud",
      "liststudentenrol",
      "listsubmiss",
      "listteachingteammemb",
      "listteachingteammemberenrol",
      "listus",
      "lti",
      "member",
      "metadata",
      "metadataid",
      "multipl",
      "new",
      "note",
      "object",
      "observ",
      "on",
      "option",
      "overrid",
      "page",
      "page#cr",
      "page#delet",
      "page#get",
      "page#list",
      "page#upd",
      "paramet",
      "promise.&lt;array.&lt;object&gt;&gt",
      "promise.&lt;object&gt",
      "pull",
      "question",
      "quiz",
      "quiz#creat",
      "quiz#createmultiplechoicequest",
      "quiz#createsubmiss",
      "quiz#delet",
      "quiz#get",
      "quiz#getsubmiss",
      "quiz#list",
      "quiz#listquest",
      "quiz#listquestiongrad",
      "quiz#listsubmiss",
      "quiz#upd",
      "quiz#updatequestiongrad",
      "quizz",
      "readm",
      "refer",
      "remov",
      "requir",
      "return",
      "rubric",
      "rubric#createfreeformgradingrubricinassign",
      "rubric#get",
      "rubric#list",
      "same",
      "section",
      "section#get",
      "section#list",
      "self",
      "self#getprofil",
      "self#listcours",
      "set",
      "sets/categori",
      "share",
      "simul",
      "singl",
      "smart",
      "specif",
      "student",
      "submiss",
      "support",
      "ta",
      "teacher",
      "text",
      "tool",
      "updat",
      "updateentri",
      "updategrad",
      "updatememb",
      "updatemetadata",
      "updatequestiongrad",
      "url",
      "us",
      "user",
      "user.self",
      "user.self#getprofil",
      "user.self#listcours",
      "within",
      "you'd"
    ],
    "pipeline": [
      "trimmer",
      "stopWordFilter",
      "stemmer"
    ]
  },
  "store": {
    "index.html": {
      "id": "index.html",
      "kind": "readme",
      "title": "caccl-api",
      "longname": "index",
      "name": "caccl-api",
      "tags": "index",
      "summary": "A class that defines a set of smart Canvas endpoints that actually behave how you'd expect them to.",
      "description": "",
      "body": ""
    },
    "global.html": {
      "id": "global.html",
      "kind": "global",
      "title": "Globals",
      "longname": "global",
      "name": "Globals",
      "tags": "global",
      "summary": "All documented globals.",
      "description": "",
      "body": ""
    },
    "list_class.html": {
      "id": "list_class.html",
      "kind": "list",
      "title": "Endpoints",
      "longname": "list:class",
      "name": "Endpoints",
      "tags": "list:class",
      "summary": "All levels of endpoint objects.",
      "description": "",
      "body": ""
    },
    "api.course.app.html": {
      "id": "api.course.app.html",
      "kind": "class",
      "title": ".course.app",
      "longname": "api.course.app",
      "name": "app",
      "tags": "api.course.app course.app app",
      "summary": "",
      "description": "Functions for interacting with external LTI apps within courses",
      "body": ""
    },
    "api.course.app.html#get": {
      "id": "api.course.app.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.app#get",
      "name": "get",
      "tags": "api.course.app#get course.app#get app#get get",
      "summary": "",
      "description": "Gets info on a single LTI tool"
    },
    "api.course.app.html#add": {
      "id": "api.course.app.html#add",
      "kind": "function",
      "title": "add( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.app#add",
      "name": "add",
      "tags": "api.course.app#add course.app#add app#add add",
      "summary": "",
      "description": "Adds an LTI app to a Canvas course"
    },
    "api.course.app.html#remove": {
      "id": "api.course.app.html#remove",
      "kind": "function",
      "title": "remove( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.app#remove",
      "name": "remove",
      "tags": "api.course.app#remove course.app#remove app#remove remove",
      "summary": "",
      "description": "Removes an LTI app from a Canvas course"
    },
    "api.course.app.html#getMetadata": {
      "id": "api.course.app.html#getMetadata",
      "kind": "function",
      "title": "getMetadata( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.app#getMetadata",
      "name": "getMetadata",
      "tags": "api.course.app#getMetadata course.app#getMetadata app#getMetadata getMetadata",
      "summary": "",
      "description": "Gets the metadata for an LTI app in a course. Note: this endpoint requires that the app have a custom parameter called 'metadataId' with an identifier that we will use to refer to the metadata. If each installation of an app will have its own metadata, each installation should have a different metadataId. If all installations share the same metadata, they should all have the same metadataId. When getting metadata, we return the metadata for the first app we find that has this metadataId"
    },
    "api.course.app.html#updateMetadata": {
      "id": "api.course.app.html#updateMetadata",
      "kind": "function",
      "title": "updateMetadata( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.app#updateMetadata",
      "name": "updateMetadata",
      "tags": "api.course.app#updateMetadata course.app#updateMetadata app#updateMetadata updateMetadata",
      "summary": "",
      "description": "Updates the metadata for an LTI app in a course. Note: this endpoint requires that the app have a custom parameter called 'metadataId' with an identifier that we will use to refer to the metadata. If each installation of an app will have its own metadata, each installation should have a different metadataId. If all installations share the same metadata, they should all have the same metadataId. When updating metadata, we update the metadata for all apps with the given metadataId"
    },
    "api.course.app.html#list": {
      "id": "api.course.app.html#list",
      "kind": "function",
      "title": "list( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.app#list",
      "name": "list",
      "tags": "api.course.app#list course.app#list app#list list",
      "summary": "",
      "description": "Gets the list of apps installed into a course"
    },
    "api.course.assignment.html": {
      "id": "api.course.assignment.html",
      "kind": "class",
      "title": ".course.assignment",
      "longname": "api.course.assignment",
      "name": "assignment",
      "tags": "api.course.assignment course.assignment assignment",
      "summary": "",
      "description": "Functions for interacting with assignments within courses",
      "body": ""
    },
    "api.course.assignment.html#list": {
      "id": "api.course.assignment.html#list",
      "kind": "function",
      "title": "list( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.assignment#list",
      "name": "list",
      "tags": "api.course.assignment#list course.assignment#list assignment#list list",
      "summary": "",
      "description": "Lists the assignments in a course"
    },
    "api.course.assignment.html#get": {
      "id": "api.course.assignment.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#get",
      "name": "get",
      "tags": "api.course.assignment#get course.assignment#get assignment#get get",
      "summary": "",
      "description": "Get info on a specific assignment in a course"
    },
    "api.course.assignment.html#update": {
      "id": "api.course.assignment.html#update",
      "kind": "function",
      "title": "update( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#update",
      "name": "update",
      "tags": "api.course.assignment#update course.assignment#update assignment#update update",
      "summary": "",
      "description": "Updates a Canvas assignment"
    },
    "api.course.assignment.html#create": {
      "id": "api.course.assignment.html#create",
      "kind": "function",
      "title": "create( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#create",
      "name": "create",
      "tags": "api.course.assignment#create course.assignment#create assignment#create create",
      "summary": "",
      "description": "Creates a Canvas assignment"
    },
    "api.course.assignment.html#delete": {
      "id": "api.course.assignment.html#delete",
      "kind": "function",
      "title": "delete( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#delete",
      "name": "delete",
      "tags": "api.course.assignment#delete course.assignment#delete assignment#delete delete",
      "summary": "",
      "description": "Delete an assignment"
    },
    "api.course.assignment.html#listGradeableStudents": {
      "id": "api.course.assignment.html#listGradeableStudents",
      "kind": "function",
      "title": "listGradeableStudents( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.assignment#listGradeableStudents",
      "name": "listGradeableStudents",
      "tags": "api.course.assignment#listGradeableStudents course.assignment#listGradeableStudents assignment#listGradeableStudents listGradeableStudents",
      "summary": "",
      "description": "List gradeable students for a specific assignment"
    },
    "api.course.assignment.html#createSubmissionComment": {
      "id": "api.course.assignment.html#createSubmissionComment",
      "kind": "function",
      "title": "createSubmissionComment( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#createSubmissionComment",
      "name": "createSubmissionComment",
      "tags": "api.course.assignment#createSubmissionComment course.assignment#createSubmissionComment assignment#createSubmissionComment createSubmissionComment",
      "summary": "",
      "description": "Adds a comment to a submission"
    },
    "api.course.assignment.html#updateGrades": {
      "id": "api.course.assignment.html#updateGrades",
      "kind": "function",
      "title": "updateGrades( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#updateGrades",
      "name": "updateGrades",
      "tags": "api.course.assignment#updateGrades course.assignment#updateGrades assignment#updateGrades updateGrades",
      "summary": "",
      "description": "Batch updates grades and/or comments. Also supports updating rubric items"
    },
    "api.course.assignment.html#listOverrides": {
      "id": "api.course.assignment.html#listOverrides",
      "kind": "function",
      "title": "listOverrides( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.assignment#listOverrides",
      "name": "listOverrides",
      "tags": "api.course.assignment#listOverrides course.assignment#listOverrides assignment#listOverrides listOverrides",
      "summary": "",
      "description": "Gets the list of overrides for an assignment"
    },
    "api.course.assignment.html#getOverride": {
      "id": "api.course.assignment.html#getOverride",
      "kind": "function",
      "title": "getOverride( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#getOverride",
      "name": "getOverride",
      "tags": "api.course.assignment#getOverride course.assignment#getOverride assignment#getOverride getOverride",
      "summary": "",
      "description": "Get a specific override on an assignment in a course"
    },
    "api.course.assignment.html#createOverride": {
      "id": "api.course.assignment.html#createOverride",
      "kind": "function",
      "title": "createOverride( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#createOverride",
      "name": "createOverride",
      "tags": "api.course.assignment#createOverride course.assignment#createOverride assignment#createOverride createOverride",
      "summary": "",
      "description": "Create assignment override."
    },
    "api.course.assignment.html#deleteOverride": {
      "id": "api.course.assignment.html#deleteOverride",
      "kind": "function",
      "title": "deleteOverride( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#deleteOverride",
      "name": "deleteOverride",
      "tags": "api.course.assignment#deleteOverride course.assignment#deleteOverride assignment#deleteOverride deleteOverride",
      "summary": "",
      "description": "Deletes an assignment override"
    },
    "api.course.assignment.html#listSubmissions": {
      "id": "api.course.assignment.html#listSubmissions",
      "kind": "function",
      "title": "listSubmissions( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.assignment#listSubmissions",
      "name": "listSubmissions",
      "tags": "api.course.assignment#listSubmissions course.assignment#listSubmissions assignment#listSubmissions listSubmissions",
      "summary": "",
      "description": "Lists the submissions to a specific assignment in a course"
    },
    "api.course.assignment.html#getSubmission": {
      "id": "api.course.assignment.html#getSubmission",
      "kind": "function",
      "title": "getSubmission( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#getSubmission",
      "name": "getSubmission",
      "tags": "api.course.assignment#getSubmission course.assignment#getSubmission assignment#getSubmission getSubmission",
      "summary": "",
      "description": "Gets a single submission for an assignment"
    },
    "api.course.assignment.html#createTextSubmission": {
      "id": "api.course.assignment.html#createTextSubmission",
      "kind": "function",
      "title": "createTextSubmission( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#createTextSubmission",
      "name": "createTextSubmission",
      "tags": "api.course.assignment#createTextSubmission course.assignment#createTextSubmission assignment#createTextSubmission createTextSubmission",
      "summary": "",
      "description": "Creates a text submission on behalf of the current user"
    },
    "api.course.assignment.html#createURLSubmission": {
      "id": "api.course.assignment.html#createURLSubmission",
      "kind": "function",
      "title": "createURLSubmission( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#createURLSubmission",
      "name": "createURLSubmission",
      "tags": "api.course.assignment#createURLSubmission course.assignment#createURLSubmission assignment#createURLSubmission createURLSubmission",
      "summary": "",
      "description": "Creates a url submission on behalf of the current user"
    },
    "api.course.assignment.html#createFileSubmission": {
      "id": "api.course.assignment.html#createFileSubmission",
      "kind": "function",
      "title": "createFileSubmission( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignment#createFileSubmission",
      "name": "createFileSubmission",
      "tags": "api.course.assignment#createFileSubmission course.assignment#createFileSubmission assignment#createFileSubmission createFileSubmission",
      "summary": "",
      "description": "Creates a file submission on behalf of the current user"
    },
    "api.course.assignmentGroup.html": {
      "id": "api.course.assignmentGroup.html",
      "kind": "class",
      "title": ".course.assignmentGroup",
      "longname": "api.course.assignmentGroup",
      "name": "assignmentGroup",
      "tags": "api.course.assignmentGroup course.assignmentGroup assignmentGroup",
      "summary": "",
      "description": "Functions for interacting with assignment groups within courses",
      "body": ""
    },
    "api.course.assignmentGroup.html#listAssignmentGroups": {
      "id": "api.course.assignmentGroup.html#listAssignmentGroups",
      "kind": "function",
      "title": "listAssignmentGroups( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.assignmentGroup#listAssignmentGroups",
      "name": "listAssignmentGroups",
      "tags": "api.course.assignmentGroup#listAssignmentGroups course.assignmentGroup#listAssignmentGroups assignmentGroup#listAssignmentGroups listAssignmentGroups",
      "summary": "",
      "description": "Lists assignment groups in a course"
    },
    "api.course.assignmentGroup.html#getAssignmentGroup": {
      "id": "api.course.assignmentGroup.html#getAssignmentGroup",
      "kind": "function",
      "title": "getAssignmentGroup( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignmentGroup#getAssignmentGroup",
      "name": "getAssignmentGroup",
      "tags": "api.course.assignmentGroup#getAssignmentGroup course.assignmentGroup#getAssignmentGroup assignmentGroup#getAssignmentGroup getAssignmentGroup",
      "summary": "",
      "description": "Gets info on a specific assignment group in a course"
    },
    "api.course.assignmentGroup.html#update": {
      "id": "api.course.assignmentGroup.html#update",
      "kind": "function",
      "title": "update( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignmentGroup#update",
      "name": "update",
      "tags": "api.course.assignmentGroup#update course.assignmentGroup#update assignmentGroup#update update",
      "summary": "",
      "description": "Updates an assignment group in a course"
    },
    "api.course.assignmentGroup.html#create": {
      "id": "api.course.assignmentGroup.html#create",
      "kind": "function",
      "title": "create( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignmentGroup#create",
      "name": "create",
      "tags": "api.course.assignmentGroup#create course.assignmentGroup#create assignmentGroup#create create",
      "summary": "",
      "description": "Create a new assignment group in a course"
    },
    "api.course.assignmentGroup.html#delete": {
      "id": "api.course.assignmentGroup.html#delete",
      "kind": "function",
      "title": "delete( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.assignmentGroup#delete",
      "name": "delete",
      "tags": "api.course.assignmentGroup#delete course.assignmentGroup#delete assignmentGroup#delete delete",
      "summary": "",
      "description": "Deletes an assignment group from a course"
    },
    "api.course.gradebookColumn.html": {
      "id": "api.course.gradebookColumn.html",
      "kind": "class",
      "title": ".course.gradebookColumn",
      "longname": "api.course.gradebookColumn",
      "name": "gradebookColumn",
      "tags": "api.course.gradebookColumn course.gradebookColumn gradebookColumn",
      "summary": "",
      "description": "Functions for interacting with gradebook columns within courses",
      "body": ""
    },
    "api.course.gradebookColumn.html#list": {
      "id": "api.course.gradebookColumn.html#list",
      "kind": "function",
      "title": "list( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.gradebookColumn#list",
      "name": "list",
      "tags": "api.course.gradebookColumn#list course.gradebookColumn#list gradebookColumn#list list",
      "summary": "",
      "description": "Gets the list of custom gradebook columns in a course"
    },
    "api.course.gradebookColumn.html#get": {
      "id": "api.course.gradebookColumn.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.gradebookColumn#get",
      "name": "get",
      "tags": "api.course.gradebookColumn#get course.gradebookColumn#get gradebookColumn#get get",
      "summary": "",
      "description": "Gets info on a specific gradebook column in a course. This is a simulated endpoint: it does not exist. We are just pulling the list of columns and returning one element."
    },
    "api.course.gradebookColumn.html#update": {
      "id": "api.course.gradebookColumn.html#update",
      "kind": "function",
      "title": "update( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.gradebookColumn#update",
      "name": "update",
      "tags": "api.course.gradebookColumn#update course.gradebookColumn#update gradebookColumn#update update",
      "summary": "",
      "description": "Updates a gradebook column's information"
    },
    "api.course.gradebookColumn.html#create": {
      "id": "api.course.gradebookColumn.html#create",
      "kind": "function",
      "title": "create( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.gradebookColumn#create",
      "name": "create",
      "tags": "api.course.gradebookColumn#create course.gradebookColumn#create gradebookColumn#create create",
      "summary": "",
      "description": "Creates a new gradebook column in a course"
    },
    "api.course.gradebookColumn.html#delete": {
      "id": "api.course.gradebookColumn.html#delete",
      "kind": "function",
      "title": "delete( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.gradebookColumn#delete",
      "name": "delete",
      "tags": "api.course.gradebookColumn#delete course.gradebookColumn#delete gradebookColumn#delete delete",
      "summary": "",
      "description": "Deletes a gradebook column from a course"
    },
    "api.course.gradebookColumn.html#listEntries": {
      "id": "api.course.gradebookColumn.html#listEntries",
      "kind": "function",
      "title": "listEntries( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.gradebookColumn#listEntries",
      "name": "listEntries",
      "tags": "api.course.gradebookColumn#listEntries course.gradebookColumn#listEntries gradebookColumn#listEntries listEntries",
      "summary": "",
      "description": "Gets the list of entries in a specific gradebook column in a course"
    },
    "api.course.gradebookColumn.html#updateEntries": {
      "id": "api.course.gradebookColumn.html#updateEntries",
      "kind": "function",
      "title": "updateEntries( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.gradebookColumn#updateEntries",
      "name": "updateEntries",
      "tags": "api.course.gradebookColumn#updateEntries course.gradebookColumn#updateEntries gradebookColumn#updateEntries updateEntries",
      "summary": "",
      "description": "Update the list of entries in a specific gradebook column in a course"
    },
    "api.course.group.html": {
      "id": "api.course.group.html",
      "kind": "class",
      "title": ".course.group",
      "longname": "api.course.group",
      "name": "group",
      "tags": "api.course.group course.group group",
      "summary": "",
      "description": "Functions for interacting with student groups within courses",
      "body": ""
    },
    "api.course.group.html#get": {
      "id": "api.course.group.html#get",
      "kind": "function",
      "title": "get( options )",
      "longname": "api.course.group#get",
      "name": "get",
      "tags": "api.course.group#get course.group#get group#get get",
      "summary": "",
      "description": "Gets info on a specific group in a course"
    },
    "api.course.group.html#listMembers": {
      "id": "api.course.group.html#listMembers",
      "kind": "function",
      "title": "listMembers( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.group#listMembers",
      "name": "listMembers",
      "tags": "api.course.group#listMembers course.group#listMembers group#listMembers listMembers",
      "summary": "",
      "description": "Gets the list of members in a group"
    },
    "api.course.group.html#updateMembers": {
      "id": "api.course.group.html#updateMembers",
      "kind": "function",
      "title": "updateMembers( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.group#updateMembers",
      "name": "updateMembers",
      "tags": "api.course.group#updateMembers course.group#updateMembers group#updateMembers updateMembers",
      "summary": "",
      "description": "Gets the list of members in a group"
    },
    "api.course.groupSet.html": {
      "id": "api.course.groupSet.html",
      "kind": "class",
      "title": ".course.groupSet",
      "longname": "api.course.groupSet",
      "name": "groupSet",
      "tags": "api.course.groupSet course.groupSet groupSet",
      "summary": "",
      "description": "Functions for interacting with group sets/categories within courses",
      "body": ""
    },
    "api.course.groupSet.html#list": {
      "id": "api.course.groupSet.html#list",
      "kind": "function",
      "title": "list( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.groupSet#list",
      "name": "list",
      "tags": "api.course.groupSet#list course.groupSet#list groupSet#list list",
      "summary": "",
      "description": "Lists the group sets in the course"
    },
    "api.course.groupSet.html#get": {
      "id": "api.course.groupSet.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.groupSet#get",
      "name": "get",
      "tags": "api.course.groupSet#get course.groupSet#get groupSet#get get",
      "summary": "",
      "description": "Gets info on a specific group set"
    },
    "api.course.groupSet.html#create": {
      "id": "api.course.groupSet.html#create",
      "kind": "function",
      "title": "create( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.groupSet#create",
      "name": "create",
      "tags": "api.course.groupSet#create course.groupSet#create groupSet#create create",
      "summary": "",
      "description": "Create a group set in a course"
    },
    "api.course.groupSet.html#delete": {
      "id": "api.course.groupSet.html#delete",
      "kind": "function",
      "title": "delete( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.groupSet#delete",
      "name": "delete",
      "tags": "api.course.groupSet#delete course.groupSet#delete groupSet#delete delete",
      "summary": "",
      "description": "Deletes a group set"
    },
    "api.course.groupSet.html#listGroups": {
      "id": "api.course.groupSet.html#listGroups",
      "kind": "function",
      "title": "listGroups( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.groupSet#listGroups",
      "name": "listGroups",
      "tags": "api.course.groupSet#listGroups course.groupSet#listGroups groupSet#listGroups listGroups",
      "summary": "",
      "description": "Gets the list of groups in a group set"
    },
    "api.course.groupSet.html#getGroup": {
      "id": "api.course.groupSet.html#getGroup",
      "kind": "function",
      "title": "getGroup( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.groupSet#getGroup",
      "name": "getGroup",
      "tags": "api.course.groupSet#getGroup course.groupSet#getGroup groupSet#getGroup getGroup",
      "summary": "",
      "description": "Gets info on a specific group in a group set (alias to groups.js/getGroup)"
    },
    "api.course.groupSet.html#createGroup": {
      "id": "api.course.groupSet.html#createGroup",
      "kind": "function",
      "title": "createGroup( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.groupSet#createGroup",
      "name": "createGroup",
      "tags": "api.course.groupSet#createGroup course.groupSet#createGroup groupSet#createGroup createGroup",
      "summary": "",
      "description": "Creates a new group in a group set"
    },
    "api.course.groupSet.html#deleteGroup": {
      "id": "api.course.groupSet.html#deleteGroup",
      "kind": "function",
      "title": "deleteGroup( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.groupSet#deleteGroup",
      "name": "deleteGroup",
      "tags": "api.course.groupSet#deleteGroup course.groupSet#deleteGroup groupSet#deleteGroup deleteGroup",
      "summary": "",
      "description": "Deletes a specific group from a group set"
    },
    "api.course.page.html": {
      "id": "api.course.page.html",
      "kind": "class",
      "title": ".course.page",
      "longname": "api.course.page",
      "name": "page",
      "tags": "api.course.page course.page page",
      "summary": "",
      "description": "Functions for interacting with pages within courses",
      "body": ""
    },
    "api.course.page.html#list": {
      "id": "api.course.page.html#list",
      "kind": "function",
      "title": "list( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.page#list",
      "name": "list",
      "tags": "api.course.page#list course.page#list page#list list",
      "summary": "",
      "description": "Gets the list of pages in a course"
    },
    "api.course.page.html#update": {
      "id": "api.course.page.html#update",
      "kind": "function",
      "title": "update( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.page#update",
      "name": "update",
      "tags": "api.course.page#update course.page#update page#update update",
      "summary": "",
      "description": "Updates a Canvas page"
    },
    "api.course.page.html#create": {
      "id": "api.course.page.html#create",
      "kind": "function",
      "title": "create( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.page#create",
      "name": "create",
      "tags": "api.course.page#create course.page#create page#create create",
      "summary": "",
      "description": "Creates a new page in a course"
    },
    "api.course.page.html#delete": {
      "id": "api.course.page.html#delete",
      "kind": "function",
      "title": "delete( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.page#delete",
      "name": "delete",
      "tags": "api.course.page#delete course.page#delete page#delete delete",
      "summary": "",
      "description": "Deletes a page from a course"
    },
    "api.course.page.html#get": {
      "id": "api.course.page.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.page#get",
      "name": "get",
      "tags": "api.course.page#get course.page#get page#get get",
      "summary": "",
      "description": "Get info on a specific page in a course"
    },
    "api.course.quiz.html": {
      "id": "api.course.quiz.html",
      "kind": "class",
      "title": ".course.quiz",
      "longname": "api.course.quiz",
      "name": "quiz",
      "tags": "api.course.quiz course.quiz quiz",
      "summary": "",
      "description": "Functions for interacting with quizzes within courses",
      "body": ""
    },
    "api.course.quiz.html#list": {
      "id": "api.course.quiz.html#list",
      "kind": "function",
      "title": "list( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.quiz#list",
      "name": "list",
      "tags": "api.course.quiz#list course.quiz#list quiz#list list",
      "summary": "",
      "description": "Lists the quizzes in a course"
    },
    "api.course.quiz.html#get": {
      "id": "api.course.quiz.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.quiz#get",
      "name": "get",
      "tags": "api.course.quiz#get course.quiz#get quiz#get get",
      "summary": "",
      "description": "Get info on a specific quiz in a course"
    },
    "api.course.quiz.html#update": {
      "id": "api.course.quiz.html#update",
      "kind": "function",
      "title": "update( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.quiz#update",
      "name": "update",
      "tags": "api.course.quiz#update course.quiz#update quiz#update update",
      "summary": "",
      "description": "Updates a specific quiz in a course"
    },
    "api.course.quiz.html#create": {
      "id": "api.course.quiz.html#create",
      "kind": "function",
      "title": "create( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.quiz#create",
      "name": "create",
      "tags": "api.course.quiz#create course.quiz#create quiz#create create",
      "summary": "",
      "description": "Creates a new quiz in a course"
    },
    "api.course.quiz.html#delete": {
      "id": "api.course.quiz.html#delete",
      "kind": "function",
      "title": "delete( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.quiz#delete",
      "name": "delete",
      "tags": "api.course.quiz#delete course.quiz#delete quiz#delete delete",
      "summary": "",
      "description": "Deletes a quiz from a course"
    },
    "api.course.quiz.html#listQuestions": {
      "id": "api.course.quiz.html#listQuestions",
      "kind": "function",
      "title": "listQuestions( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.quiz#listQuestions",
      "name": "listQuestions",
      "tags": "api.course.quiz#listQuestions course.quiz#listQuestions quiz#listQuestions listQuestions",
      "summary": "",
      "description": "Lists the questions in a specific quiz in a course"
    },
    "api.course.quiz.html#createMultipleChoiceQuestion": {
      "id": "api.course.quiz.html#createMultipleChoiceQuestion",
      "kind": "function",
      "title": "createMultipleChoiceQuestion( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.quiz#createMultipleChoiceQuestion",
      "name": "createMultipleChoiceQuestion",
      "tags": "api.course.quiz#createMultipleChoiceQuestion course.quiz#createMultipleChoiceQuestion quiz#createMultipleChoiceQuestion createMultipleChoiceQuestion",
      "summary": "",
      "description": "Creates a new multiple choice question to a quiz in a course"
    },
    "api.course.quiz.html#listSubmissions": {
      "id": "api.course.quiz.html#listSubmissions",
      "kind": "function",
      "title": "listSubmissions( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.quiz#listSubmissions",
      "name": "listSubmissions",
      "tags": "api.course.quiz#listSubmissions course.quiz#listSubmissions quiz#listSubmissions listSubmissions",
      "summary": "",
      "description": "Lists the submissions to a quiz in a course"
    },
    "api.course.quiz.html#getSubmission": {
      "id": "api.course.quiz.html#getSubmission",
      "kind": "function",
      "title": "getSubmission( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.quiz#getSubmission",
      "name": "getSubmission",
      "tags": "api.course.quiz#getSubmission course.quiz#getSubmission quiz#getSubmission getSubmission",
      "summary": "",
      "description": "Gets info on a specific submission to a quiz in a course"
    },
    "api.course.quiz.html#createSubmission": {
      "id": "api.course.quiz.html#createSubmission",
      "kind": "function",
      "title": "createSubmission( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.quiz#createSubmission",
      "name": "createSubmission",
      "tags": "api.course.quiz#createSubmission course.quiz#createSubmission quiz#createSubmission createSubmission",
      "summary": "",
      "description": "Creates a new submission to a specific quiz in a course on behalf of the current user"
    },
    "api.course.quiz.html#listQuestionGrades": {
      "id": "api.course.quiz.html#listQuestionGrades",
      "kind": "function",
      "title": "listQuestionGrades( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.quiz#listQuestionGrades",
      "name": "listQuestionGrades",
      "tags": "api.course.quiz#listQuestionGrades course.quiz#listQuestionGrades quiz#listQuestionGrades listQuestionGrades",
      "summary": "",
      "description": "Lists quiz question grades for a specific quiz in a course"
    },
    "api.course.quiz.html#updateQuestionGrades": {
      "id": "api.course.quiz.html#updateQuestionGrades",
      "kind": "function",
      "title": "updateQuestionGrades( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.quiz#updateQuestionGrades",
      "name": "updateQuestionGrades",
      "tags": "api.course.quiz#updateQuestionGrades course.quiz#updateQuestionGrades quiz#updateQuestionGrades updateQuestionGrades",
      "summary": "",
      "description": "Updates the question grades for a specific submission to a quiz in a course"
    },
    "api.course.rubric.html": {
      "id": "api.course.rubric.html",
      "kind": "class",
      "title": ".course.rubric",
      "longname": "api.course.rubric",
      "name": "rubric",
      "tags": "api.course.rubric course.rubric rubric",
      "summary": "",
      "description": "Functions for interacting with rubrics within courses",
      "body": ""
    },
    "api.course.rubric.html#list": {
      "id": "api.course.rubric.html#list",
      "kind": "function",
      "title": "list( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.rubric#list",
      "name": "list",
      "tags": "api.course.rubric#list course.rubric#list rubric#list list",
      "summary": "",
      "description": "Lists the set of rubrics in a course"
    },
    "api.course.rubric.html#get": {
      "id": "api.course.rubric.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.rubric#get",
      "name": "get",
      "tags": "api.course.rubric#get course.rubric#get rubric#get get",
      "summary": "",
      "description": "Gets info on a specific rubric in a course"
    },
    "api.course.rubric.html#createFreeFormGradingRubricInAssignment": {
      "id": "api.course.rubric.html#createFreeFormGradingRubricInAssignment",
      "kind": "function",
      "title": "createFreeFormGradingRubricInAssignment( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.rubric#createFreeFormGradingRubricInAssignment",
      "name": "createFreeFormGradingRubricInAssignment",
      "tags": "api.course.rubric#createFreeFormGradingRubricInAssignment course.rubric#createFreeFormGradingRubricInAssignment rubric#createFreeFormGradingRubricInAssignment createFreeFormGradingRubricInAssignment",
      "summary": "",
      "description": "Creates a new rubric for grading with free form comments enabled and add it to an assignment in a course."
    },
    "api.course.section.html": {
      "id": "api.course.section.html",
      "kind": "class",
      "title": ".course.section",
      "longname": "api.course.section",
      "name": "section",
      "tags": "api.course.section course.section section",
      "summary": "",
      "description": "Functions for interacting with sections within courses",
      "body": ""
    },
    "api.course.section.html#list": {
      "id": "api.course.section.html#list",
      "kind": "function",
      "title": "list( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course.section#list",
      "name": "list",
      "tags": "api.course.section#list course.section#list section#list list",
      "summary": "",
      "description": "Gets the list of sections in a course"
    },
    "api.course.section.html#get": {
      "id": "api.course.section.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course.section#get",
      "name": "get",
      "tags": "api.course.section#get course.section#get section#get get",
      "summary": "",
      "description": "Gets info on a specific section"
    },
    "api.course.html": {
      "id": "api.course.html",
      "kind": "class",
      "title": "course",
      "longname": "api.course",
      "name": "course",
      "tags": "api.course course",
      "summary": "",
      "description": "Functions for interacting with courses",
      "body": ""
    },
    "api.course.html#get": {
      "id": "api.course.html#get",
      "kind": "function",
      "title": "get( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course#get",
      "name": "get",
      "tags": "api.course#get course#get get",
      "summary": "",
      "description": "Gets info on a specific course"
    },
    "api.course.html#listEnrollments": {
      "id": "api.course.html#listEnrollments",
      "kind": "function",
      "title": "listEnrollments( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listEnrollments",
      "name": "listEnrollments",
      "tags": "api.course#listEnrollments course#listEnrollments listEnrollments",
      "summary": "",
      "description": "Gets the list of enrollments in a course"
    },
    "api.course.html#listStudentEnrollments": {
      "id": "api.course.html#listStudentEnrollments",
      "kind": "function",
      "title": "listStudentEnrollments( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listStudentEnrollments",
      "name": "listStudentEnrollments",
      "tags": "api.course#listStudentEnrollments course#listStudentEnrollments listStudentEnrollments",
      "summary": "",
      "description": "Gets the list of student enrollmentss in a course"
    },
    "api.course.html#listTeachingTeamMemberEnrollments": {
      "id": "api.course.html#listTeachingTeamMemberEnrollments",
      "kind": "function",
      "title": "listTeachingTeamMemberEnrollments( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listTeachingTeamMemberEnrollments",
      "name": "listTeachingTeamMemberEnrollments",
      "tags": "api.course#listTeachingTeamMemberEnrollments course#listTeachingTeamMemberEnrollments listTeachingTeamMemberEnrollments",
      "summary": "",
      "description": "Gets the list of TAs and Teacher enrollments in a course"
    },
    "api.course.html#listDesignerEnrollments": {
      "id": "api.course.html#listDesignerEnrollments",
      "kind": "function",
      "title": "listDesignerEnrollments( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listDesignerEnrollments",
      "name": "listDesignerEnrollments",
      "tags": "api.course#listDesignerEnrollments course#listDesignerEnrollments listDesignerEnrollments",
      "summary": "",
      "description": "Gets the list of designer enrollments in a course"
    },
    "api.course.html#listObserverEnrollments": {
      "id": "api.course.html#listObserverEnrollments",
      "kind": "function",
      "title": "listObserverEnrollments( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listObserverEnrollments",
      "name": "listObserverEnrollments",
      "tags": "api.course#listObserverEnrollments course#listObserverEnrollments listObserverEnrollments",
      "summary": "",
      "description": "Gets the list of observer enrollments in a course"
    },
    "api.course.html#getUser": {
      "id": "api.course.html#getUser",
      "kind": "function",
      "title": "getUser( options ) → {Promise.&lt;Object&gt;}",
      "longname": "api.course#getUser",
      "name": "getUser",
      "tags": "api.course#getUser course#getUser getUser",
      "summary": "",
      "description": "Gets info on a specific user in a course"
    },
    "api.course.html#listUsers": {
      "id": "api.course.html#listUsers",
      "kind": "function",
      "title": "listUsers( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listUsers",
      "name": "listUsers",
      "tags": "api.course#listUsers course#listUsers listUsers",
      "summary": "",
      "description": "Gets info on all users in a course"
    },
    "api.course.html#listStudents": {
      "id": "api.course.html#listStudents",
      "kind": "function",
      "title": "listStudents( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listStudents",
      "name": "listStudents",
      "tags": "api.course#listStudents course#listStudents listStudents",
      "summary": "",
      "description": "Gets the list of students in a course"
    },
    "api.course.html#listTeachingTeamMembers": {
      "id": "api.course.html#listTeachingTeamMembers",
      "kind": "function",
      "title": "listTeachingTeamMembers( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listTeachingTeamMembers",
      "name": "listTeachingTeamMembers",
      "tags": "api.course#listTeachingTeamMembers course#listTeachingTeamMembers listTeachingTeamMembers",
      "summary": "",
      "description": "Gets the list of TAs and Teachers in a course"
    },
    "api.course.html#listDesigners": {
      "id": "api.course.html#listDesigners",
      "kind": "function",
      "title": "listDesigners( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listDesigners",
      "name": "listDesigners",
      "tags": "api.course#listDesigners course#listDesigners listDesigners",
      "summary": "",
      "description": "Gets the list of designers in a course"
    },
    "api.course.html#listObservers": {
      "id": "api.course.html#listObservers",
      "kind": "function",
      "title": "listObservers( options ) → {Promise.&lt;Array.&lt;Object&gt;&gt;}",
      "longname": "api.course#listObservers",
      "name": "listObservers",
      "tags": "api.course#listObservers course#listObservers listObservers",
      "summary": "",
      "description": "Gets the list of observers in a course"
    },
    "api.user.self.html": {
      "id": "api.user.self.html",
      "kind": "class",
      "title": "self",
      "longname": "api.user.self",
      "name": "self",
      "tags": "api.user.self user.self self",
      "summary": "",
      "description": "Functions for getting info on current user",
      "body": ""
    },
    "api.user.self.html#getProfile": {
      "id": "api.user.self.html#getProfile",
      "kind": "function",
      "title": "getProfile() → {Promise.&lt;Object&gt;}",
      "longname": "api.user.self#getProfile",
      "name": "getProfile",
      "tags": "api.user.self#getProfile user.self#getProfile self#getProfile getProfile",
      "summary": "",
      "description": "Gets info on the current user"
    },
    "api.user.self.html#listCourses": {
      "id": "api.user.self.html#listCourses",
      "kind": "function",
      "title": "listCourses( options [, includeTerm ] ) → {Promise.&lt;Object&gt;}",
      "longname": "api.user.self#listCourses",
      "name": "listCourses",
      "tags": "api.user.self#listCourses user.self#listCourses self#listCourses listCourses",
      "summary": "",
      "description": "Gets the list of courses associated with the current user"
    }
  }
};