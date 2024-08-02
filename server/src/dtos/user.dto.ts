export interface UserResponse {
    id: number;
    userEmail: string;
    userPass: string;
    userLogin?: string | null;
    userNicename?: string | null;
    userRegister: Date;
    userStatus: string;
    userLastLogin: Date;
}
