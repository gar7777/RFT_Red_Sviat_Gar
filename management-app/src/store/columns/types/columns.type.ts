export interface IColumnState {
  id: string;
  title: string;
  order: number;
}

export interface IColumnTitle {
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

export interface ILoadedColumn {
  title: string;
  id: string;
  order: number;
}

export interface IDeleteColumn {
  id: string;
  boardId: string;
}

export interface IGetColumnTask {
  columnId: string;
  boardId: string;
}

export interface IFormData {
  title: string;
  description: string;
  userId: string;
}
