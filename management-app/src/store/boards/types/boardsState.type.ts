import { IBoard } from './boards.type';

export interface IBoardsState {
  boards: IBoard[];
  filteredBoards: IBoard[];
  isLoading: boolean;
  error?: string;
  isEditing: boolean;
  searchQuery: string;
}
