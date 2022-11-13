export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export type TBoardCreate = {
  title: string;
  description: string;
}
