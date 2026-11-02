interface CanvasContentMigration {
  // the unique identifier for the migration
  id: number,
  // the type of content migration
  migration_type: string,
  // the name of the content migration type
  migration_type_title: string,
  // API url to the content migration's issues
  migration_issues_url: string,
  // number of issues Canvas ran into during the migration
  migration_issues_count?: number,
  // attachment api object for the uploaded file, which may not be present for
  // all migrations
  attachment?: any,
  // The api endpoint for polling the current progress
  progress_url: string,
  // The user who started the migration
  user_id: number,
  // Current state of the content migration: pre_processing, pre_processed,
  // running, waiting_for_select, completed, failed
  workflow_state: string,
  // timestamp
  started_at: string,
  // timestamp
  finished_at: string,
};

export default CanvasContentMigration;
