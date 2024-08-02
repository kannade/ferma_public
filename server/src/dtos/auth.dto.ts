export interface LoginRequest {
  userEmail: string;
  userPass: string;
  userRemember: boolean;
}

export interface RegisterRequest extends LoginRequest {
  userName: string;
  userPhone: string;
}
