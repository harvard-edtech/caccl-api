type CanvasEnrollmentTerm = {
  // The unique identifier for the enrollment term.
  id: number,
  // The SIS id of the term. Only included if the user has permission to view SIS
  // information.
  sis_term_id?: string,
  // the unique identifier for the SIS import. This field is only included if the
  // user has permission to manage SIS information.
  sis_import_id?: number,
  // The name of the term.
  name: string,
  // The datetime of the start of the term.
  start_at?: string,
  // The datetime of the end of the term.
  end_at?: string,
  // The state of the term. Can be 'active' or 'deleted'.
  workflow_state: ('active' | 'deleted'),
  // Term date overrides for specific enrollment types
  overrides: {
    [k in string]: {
      start_at?: string,
      end_at?: string,
    }
  },
};

export default CanvasEnrollmentTerm;
