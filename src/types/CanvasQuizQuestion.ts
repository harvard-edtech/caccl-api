import CanvasQuizAnswer from './CanvasQuizAnswer';
import CanvasQuizQuestionType from './CanvasQuizQuestionType';

interface CanvasQuizQuestion {
  // The ID of the quiz question.
  id: number,
  // The ID of the Quiz the question belongs to.
  quiz_id: number,
  // The order in which the question will be retrieved and displayed.
  position: number,
  // The name of the question.
  question_name: string,
  // The type of the question.
  question_type: CanvasQuizQuestionType,
  // The text of the question.
  question_text: string,
  // The maximum amount of points possible received for getting this question
  // correct.
  points_possible: number,
  // The comments to display if the student answers the question correctly.
  correct_comments?: string | null,
  // The comments to display if the student answers incorrectly.
  incorrect_comments?: string | null,
  // The comments to display regardless of how the student answered.
  neutral_comments?: string | null,
  // An array of available answers to display to the student.
  answers?: CanvasQuizAnswer[] | null,
};

export default CanvasQuizQuestion;
