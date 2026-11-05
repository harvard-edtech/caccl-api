interface CanvasMigrationIssue {
    id: number;
    url: string;
    description: string;
    workflow_state: string;
    fix_issue_html_url: string;
    issue_type: string;
    error_report_html_url?: string;
    error_message?: string;
    created_at: string;
    updated_at: string;
    content_migration_url: string;
}
export default CanvasMigrationIssue;
