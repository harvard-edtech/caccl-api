interface CanvasRubricAssessment {
  // Keys are criterion ids
  [k: string]: {
    points: number,
    rating_id: string,
    comments: string,
  }
};

export default CanvasRubricAssessment;
