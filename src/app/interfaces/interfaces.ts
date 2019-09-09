export interface User {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  gender?: string;
}

export interface Task {
  title: string;
  description?: string;
  status?: number;
}

export interface List {
  title: string;
}
