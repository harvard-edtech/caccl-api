declare type CanvasEnrollmentTerm = {
    id: number;
    sis_term_id?: string;
    sis_import_id?: number;
    name: string;
    start_at?: string;
    end_at?: string;
    workflow_state: ('active' | 'deleted');
    overrides: {
        [k in string]: {
            start_at?: string;
            end_at?: string;
        };
    };
};
export default CanvasEnrollmentTerm;
