interface CanvasRubricAssociation {
  // the ID of the association
  id: number,
  // the ID of the rubric
  rubric_id: number,
  // the ID of the object this association links to
  association_id: number,
  // the type of object this association links to
  association_type: string,
  // Whether or not the associated rubric is used for grade calculation
  use_for_grading?: boolean | null,
  summary_data?: string | null,
  // Whether or not the association is for grading (and thus linked to an
  // assignment) or if it's to indicate the rubric should appear in its context.
  // Values will be grading or bookmark.
  purpose?: string | null,
  // Whether or not the score total is displayed within the rubric. This option is
  // only available if the rubric is not used for grading.
  hide_score_total: boolean,
  hide_points: boolean,
  hide_outcome_results: boolean
};

export default CanvasRubricAssociation;
