export interface ISnackState {
  isOpen: boolean;
  ruMessage: string;
  enMessage: string;
  allertType: 'warning' | 'info' | 'success' | 'error';
}
