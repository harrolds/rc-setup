export type LifecycleState =
  | 'active'
  | 'background'
  | 'hidden'
  | 'blurred';

export interface LifecycleFlagReport {
  state: LifecycleState;
  visible: boolean;
  focused: boolean;
}
