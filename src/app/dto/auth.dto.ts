export interface LoginDto {
  user: {
    email: string | null;
    password: string | null;
  };
}
