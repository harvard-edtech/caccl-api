interface CanvasFile {
  // Canvas id for the file
  id: number,
  // Unique id for the file
  uuid: string,
  // Id of the folder containing the file
  folder_id: number,
  // Display name of the file
  display_name: string,
  // Name of the file
  filename: string,
  // Mime content type
  'content-type': string,
  // URL for accessing/downloading the file
  url: string,
  // File size in bytes
  size: number,
  // ISO 8601 date for when the file was created
  created_at: string,
  // ISO 8601 date for when the file was last updated
  updated_at: string,
  // ISO 8601 date for when the file was unlocked at
  unlock_at: string | null,
  // True if the file is currently locked
  locked: boolean,
  // True if the file is currently hidden
  hidden: boolean,
  // ISO 8601 date for when the file will become locked
  lock_at: string | null,
  // True if the current user cannot see this file
  hidden_for_user: boolean,
  // URL of the thumbnail of the file
  thumbnail_url: string | null,
  // ISO 8601 date for when the file was last modified
  modified_at: string,
  // simplified content-type mapping
  mime_class: string,
  // identifier for file in third-party transcoding service
  media_entry_id: string,
  // True if the file is locked for the current user
  locked_for_user: boolean,
  // Information about the file lock
  lock_info: any, // TODO: figure out what this looks like
  // Explanation of why the file is locked
  lock_explanation?: string,
  // optional: url to the document preview. This url is specific to the user
  // making the api call. Only included in submission endpoints.
  preview_url?: null | string,
}

export default CanvasFile;
