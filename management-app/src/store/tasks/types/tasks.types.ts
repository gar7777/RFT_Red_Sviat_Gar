interface ITaskFiles {
  filename: string;
  fileSize: number;
}

export interface ITaskFull {
  id: string;
  title: string;
  order: number;
  done: boolean;
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
