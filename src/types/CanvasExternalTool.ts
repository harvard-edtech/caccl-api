interface CanvasExternalTool {
  // The unique identifier for the tool
  id: number,
  // The domain to match links against
  domain: string,
  // The url to match links against
  url: string,
  // The consumer key used by the tool
  consumer_key: string,
  // The name of the tool
  name: string,
  // A description of the tool
  description: string,
  // Timestamp of creation
  created_at: string,
  // Timestamp of last update
  updated_at?: string | null,
  // What information to send to the external tool, “anonymous”, “name_only”, “public”
  privacy_level: ('anonymous' | 'name_only' | 'public'),
  // Custom fields that will be sent to the tool consumer
  custom_fields: { [k: string]: any },
  // The configuration for account navigation links
  account_navigation?: {
    enabled?: boolean | null,
    canvas_icon_class?: string | null,
    icon_url?: string | null,
    text: string,
    url: string,
    label: string,
    selection_width: number,
    selection_height: number,
    display_type: (
      'full_width'
      | 'full_width_in_context'
      | 'in_nav_context'
      | 'borderless'
      | 'default'
    ),
  } | null,
  assignment_selection?: any | null,
  course_home_sub_navigation?: any | null,
  course_navigation?: {
    enabled: boolean,
    url: string,
    text: string,
    visibility: ('admins' | 'members' | 'public'),
    default: ('enabled' | 'disabled'),
    windowTarget: ('_blank' | '_self'),
    label: string,
    selection_width: number,
    selection_height: number,
    icon_url: string,
  } | null,
  editor_button?: {
      canvas_icon_class: string,
      icon_url: string,
      message_type: string,
      text: string,
      url: string,
      label: string,
      selection_width: number,
      selection_height: number,
  } | null,
  homework_submission?: any | null,
  link_selection?: any | null,
  migration_selection?: any | null,
  resource_selection?: any | null,
  tool_configuration?: any | null,
  user_navigation: {
    canvas_icon_class: string,
    icon_url: string,
    text: string,
    url: string,
    enabled?: boolean | null,
    visibility: ('admins' | 'members' | 'public'),
    default: ('enabled' | 'disabled'),
    windowTarget: ('_blank' | '_self'),
  },
  selection_width: number,
  selection_height: number,
  icon_url?: string | null,
  not_selectable?: boolean,
};

export default CanvasExternalTool;
