interface CanvasRubricCriterion {
  // the ID of the criterion
  id: string,
  description?: string | null,
  long_description?: string | null,
  points: number,
  criterion_use_range?: boolean | null,
  // the possible ratings for this Criterion
  ratings?: (
    {
      id: string,
      criterion_id: string,
      description?: string | null,
      long_description?: string | null,
      points: number,
    }
  )[] | null,
};

export default CanvasRubricCriterion;
