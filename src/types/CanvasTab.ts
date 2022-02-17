interface CanvasTab {
  html_url: string,
  id: string,
  label: string,
  type: string,
  // only included if true
  hidden?: boolean | null,
  // possible values are: public, members, admins, and none
  visibility: (
    'public'
    | 'members'
    | 'admins'
    | 'none'
  ),
  // 1 based
  position: number,
};

export default CanvasTab;
