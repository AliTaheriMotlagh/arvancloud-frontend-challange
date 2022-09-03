export interface LoginDto {
  user: {
    email: string | null;
    password: string | null;
  };
}

export interface RegisterDto {
  user: {
    email: string | null;
    password: string | null;
    username: string | null;
  };
}

export interface UserDto {
  user: {
    email: string;
    password: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
}
