interface CanvasSubmissionComment {
  id: number,
  author_id: number,
  author_name: string,
  // Abbreviated user object UserDisplay (see users API).
  author: any,
  comment: string,
  created_at: string,
  edited_at?: string | null,
  media_comment?: any | null,
};

export default CanvasSubmissionComment;
