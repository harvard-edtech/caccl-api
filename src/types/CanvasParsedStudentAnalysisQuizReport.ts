/**
 * Parsed Canvas Student Analysis Quiz Report
 * @author Gabe Abrams
 */
type CanvasParsedStudentAnalysisQuizReport = {
  // The CanvasId of the quiz
  quizId: number,
  // Questions
  questions: {
    // The question's CanvasId
    questionId: number,
    // Text of the question
    questionText: string,
  }[],
  // Student reports
  studentReports: {
    // The CanvasId of the student
    userId: number,
    // The user's full name
    userFullName: string,
    // Timestamp that the student submitted their quiz
    submittedAt: number,
    // Total score
    score: number,
    // Number of correct questions
    numCorrect: number,
    // Number of incorrect questions
    numIncorrect: number,
    // Number of final attempt
    attempt: number,
    // Responses by question
    responses: {
      // The question's CanvasId
      questionId: number,
      // The student's response to the question
      response: string,
      // Student's number of points
      points: number,
    }[],
  }[],
};

export default CanvasParsedStudentAnalysisQuizReport;
