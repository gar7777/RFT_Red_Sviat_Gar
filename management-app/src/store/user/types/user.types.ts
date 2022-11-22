export interface IUser {
  id?: string | undefined;
  name?: string | undefined;
  login?: string | undefined;
  password?: string | undefined;
}

export interface IUserState {
  user: IUser;
  isLoading: boolean;
  error?: string;
  isEditing: boolean;
  users: IUsersLoad[] | null;
}

export interface IUsersLoad {
  id: string;
  name: string;
  login: string;
}
