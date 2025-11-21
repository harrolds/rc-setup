export interface InstallPromptState {
  available: boolean;
  lastResult?: 'accepted' | 'dismissed' | null;
}
