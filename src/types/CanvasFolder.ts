interface CanvasFolder {
  // the type of Canvas object that contains the folder
  context_type: string,
  // the id of the Canvas object that contains the folder
  context_id: number,
  // number of files in folder
  files_count: number,
  // position of folder
  position: number,
  // last updated
  updated_at: string,
  // URL for the list of folders contained in this folder
  folders_url: string,
  // URL for the list of files contained in this folder
  files_url: string,
  // full path name of folder
  full_name: string,
  // lock date
  lock_at: string,
  // id of folder
  id: number,
  // number of folders in folder
  folders_count: number,
  // name of folder
  name: string,
  // id of parent folder
  parent_folder_id: number,
  // created date
  created_at: string,
  // unlock date
  unlock_at: string | null,
  // If true, folder is hidden from users
  hidden: boolean,
  // If true, folder is hidden from the current user
  hidden_for_user: boolean,
  // If true, folder is locked
  locked: boolean,
  // If true, folder is locked for the current user
  locked_for_user: boolean,
  // if true, indicates this is a read-only folder containing files submitted to
  // assignments
  for_submissions: boolean,
}

export default CanvasFolder;
