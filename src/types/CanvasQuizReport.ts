// Import other types
import CanvasFile from './CanvasFile';
import CanvasProgress from './CanvasProgress';

/**
 * Canvas quiz report
 * @author Gabe Abrams
 */
type CanvasQuizReport = {
  // The ID of the quiz report
  id: number,
  // The ID of the quiz
  quiz_id: number,
  // Which type of report this is, possible values: 'student_analysis',
  // 'item_analysis'
  report_type: 'student_analysis' | 'item_analysis',
  // A human-readable (and localized) version of the report_type
  readable_type: string,
  // Boolean indicating whether the report represents all submissions or only the
  // most recent ones for each student
  includes_all_versions: boolean,
  // Boolean indicating whether the report is for an anonymous survey. If true, no
  // student names will be included in the CSV
  anonymous: boolean,
  // Boolean indicating whether the report can be generated, which is true unless
  // the quiz is a survey one
  generatable: boolean,
  // When the report was created
  created_at: string,
  // When the report was last updated
  updated_at: string,
  // The API endpoint for this report
  url: string,
  // If the report has finished generating, a File object that represents it.
  // Refer to the Files API for more information about the format
  file?: null | CanvasFile
  // If the report has not yet finished generating, a URL where information about
  // its progress can be retrieved. Refer to the Progress API for more information
  // (Note: not available in JSON-API format)
  progress_url?: null | string,
  // If the report is being generated, a Progress object that represents the
  // operation. Refer to the Progress API for more information about the format.
  // (Note: available only in JSON-API format)
  progress?: null | CanvasProgress,
};

export default CanvasQuizReport;
