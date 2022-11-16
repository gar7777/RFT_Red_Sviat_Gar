export interface IColumn {
  title: string;
}

export interface ICreateColumn {
  title: string;
  boardId: string | undefined;
}

export interface IDeleteColumn {
  id: string;
  boardId: string;
}
