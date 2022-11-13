import { IBoard } from './boards.type';

export interface IBoardsState {
  boards: IBoard[];
  isLoading: boolean;
  error?: string;
  isEditing: boolean;
}
