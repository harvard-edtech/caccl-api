interface CanvasContentMigration {
    id: number;
    migration_type: string;
    migration_type_title: string;
    migration_issues_url: string;
    migration_issues_count?: number;
    attachment?: any;
    progress_url: string;
    user_id: number;
    workflow_state: string;
    started_at: string;
    finished_at: string;
}
export default CanvasContentMigration;
