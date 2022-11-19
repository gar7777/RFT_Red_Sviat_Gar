export interface IColumn {
  title: string;
}

export interface ICreateColumn {
  title: string;
  boardId: string | undefined;
}

export interface IUpdateColumn {
  title: string;
  boardId: string;
  columnId: string;
  order: number;
}

export interface IDeleteColumn {
  id: string;
  boardId: string;
}
