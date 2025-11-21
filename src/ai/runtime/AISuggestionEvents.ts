export type AISuggestionEvents =
  | { type: 'text_changed'; payload: string }
  | { type: 'cursor_changed'; payload: number }
  | { type: 'reset' };
