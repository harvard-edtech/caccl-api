interface CanvasQuizAnswer {
  // The unique identifier for the answer.  Do not supply if this answer is part
  // of a new question
  id: number,
  // The text of the answer.
  answer_text: string,
  // An integer to determine correctness of the answer. Incorrect answers should
  // be 0, correct answers should be 100.
  answer_weight?: number | null,
  // Specific contextual comments for a particular answer.
  answer_comments?: string | null,
  // Used in missing word questions.  The text to follow the missing word
  text_after_answers?: string | null,
  // Used in matching questions.  The static value of the answer that will be
  // displayed on the left for students to match for.
  answer_match_left?: string | null,
  // Used in matching questions. The correct match for the value given in
  // answer_match_left.  Will be displayed in a dropdown with the other
  // answer_match_right values..
  answer_match_right?: string | null,
  // Used in matching questions. A list of distractors, delimited by new lines (
  // ) that will be seeded with all the answer_match_right values.
  matching_answer_incorrect_matches?: string | null,
  // Used in numerical questions.  Values can be 'exact_answer', 'range_answer',
  // or 'precision_answer'.
  numerical_answer_type?: (
    'exact_answer'
    | 'range_answer'
    | 'precision_answer'
  ) | null,
  // Used in numerical questions of type 'exact_answer'.  The value the answer
  // should equal.
  exact?: number | null,
  // Used in numerical questions of type 'exact_answer'. The margin of error
  // allowed for the student's answer.
  margin?: number | null,
  // Used in numerical questions of type 'precision_answer'.  The value the answer
  // should equal.
  approximate?: number | null,
  // Used in numerical questions of type 'precision_answer'. The numerical
  // precision that will be used when comparing the student's answer.
  precision?: number | null,
  // Used in numerical questions of type 'range_answer'. The start of the allowed
  // range (inclusive).
  start?: number | null,
  // Used in numerical questions of type 'range_answer'. The end of the allowed
  // range (inclusive).
  end?: number | null,
  // Used in fill in multiple blank and multiple dropdowns questions.
  blank_id?: number | null,
};

export default CanvasQuizAnswer;
