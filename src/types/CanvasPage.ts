interface CanvasPage {
  // the unique locator for the page
  url: string,
  // the title of the page
  title: string,
  // the creation date for the page
  created_at: string,
  // the date the page was last updated
  updated_at?: string | null,
  // (DEPRECATED) whether this page is hidden from students (note: this is always
  // reflected as the inverse of the published value)
  hide_from_students?: boolean | null,
  // roles allowed to edit the page; comma-separated list comprising a combination
  // of 'teachers', 'students', 'members', and/or 'public' if not supplied, course
  // defaults are used
  editing_roles?: string | null,
  // the User who last edited the page (this may not be present if the page was
  // imported from another system)
  last_edited_by?: any | null,
  // the page content, in HTML (present when requesting a single page; omitted
  // when listing pages)
  body?: string | null,
  // whether the page is published (true) or draft state (false).
  published?: boolean | null,
  // whether this page is the front page for the wiki
  front_page?: boolean | null,
  // Whether or not this is locked for the user.
  locked_for_user?: boolean | null,
  // (Optional) Information for the user about the lock. Present when
  // locked_for_user is true.
  lock_info?: any | null,
  // (Optional) An explanation of why this is locked for the user. Present when
  // locked_for_user is true.
  lock_explanation?: string | null,
};

export default CanvasPage;
