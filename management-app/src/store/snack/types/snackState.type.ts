export interface ISnackState {
  isOpen: boolean;
  allertMessage: string;
  allertType: 'warning' | 'info' | 'success' | 'error';
}
