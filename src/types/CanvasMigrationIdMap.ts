/**
 * Map of ids from source Canvas course to destination Canvas course
 * @author Yuen Ler Chow
 */
type CanvasMigrationIdMap = {
  // Map of source assignment id to destination assignment id
  assignments?: { [k: string]: string },
  // Map of source quiz id to destination quiz id
  quizzes?: { [k: string]: string },
  // Map of source announcement id to destination announcement id
  announcements?: { [k: string]: string },
  // Map of source discussion topic id to destination discussion topic id
  discussion_topics?: { [k: string]: string },
  // Map of source file id to destination file id
  files?: { [k: string]: string },
  // Map of source module item id to destination module item id
  module_items?: { [k: string]: string },
  // Map of source module id to destination module id
  modules?: { [k: string]: string },
  // Map of source page id to destination page id
  pages?: { [k: string]: string },
};

export default CanvasMigrationIdMap;
