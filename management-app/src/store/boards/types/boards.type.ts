export interface IBoard {
  id: string | undefined;
  title: string | undefined;
  description: string | undefined;
}

export type TBoardCreate = {
  title: string;
  description: string;
};
