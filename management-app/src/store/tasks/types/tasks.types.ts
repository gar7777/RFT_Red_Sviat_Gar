interface ITaskFiles {
  filename: string;
  fileSize: number;
}

export interface ITaskFull {
  id: string;
  title: string;
  order: number;
  done?: boolean;
  description: string;
  userId: string;
  files?: ITaskFiles[];
}

export interface ILoadedColumnTasks {
  id: string;
  title: string;
  order: number;
  tasks: ITaskFull[];
}

export interface IDeleteTask {
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface IUpdateTaskData {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface IUpdateTask {
  id: string;
  title: string;
  description: string;
  boardId: string;
  columnId: string;
  userId: string;
  order: number;
}

export interface IUpdatetaskData {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string | undefined;
}

export interface IAddTaskData {
  userId: string;
  title: string;
  description: string;
}

export interface ITaskCreateData {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
  userId: string;
}

export interface ITaskLoadData {
  boardId: string;
  columnId: string;
}

export interface ITaskGetData {
  boardId: string;
  columnId: string;
  taskId: string;
}
