export type User = {
  _id: string;
  email: string;
  name: string;
  picture?: string;
  userPoint?: {
    amount: number;
  };
};

export type CreateUserData = {
  createUser: User;
};

export type CreateUserVariables = {
  input: {
    email: string;
    name: string;
    password: string;
  };
};

export type LoginData = {
  loginUser: {
    accessToken: string;
  };
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type LoggedInUserData = {
  fetchUserLoggedIn: User;
};
