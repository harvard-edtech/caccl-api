interface CanvasFolder {
  // type of folder
  context_type: string,
  // id of folder
  context_id: number,
  // number of files in folder
  files_count: number,
  // position of folder
  position: number,
  // last updated
  updated_at: string,
  // url to folders
  folders_url: string,
  // url to files
  files_url: string,
  // full name of folder
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
  // hidden
  hidden: boolean,
  // hidden for user
  hidden_for_user: boolean,
  // whether the folder is locked
  locked: boolean,
  // whether the folder is locked for user
  locked_for_user: boolean,
  // if true, indicates this is a read-only folder containing files submitted to
  // assignments
  for_submissions: boolean,
};

export default CanvasFolder;
