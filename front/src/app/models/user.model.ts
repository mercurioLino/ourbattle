export interface User{
    id: number;
    email: string;
    access_token?: string;
    token_type?: string;
}

export interface LoginData{
    access_token?: string;
    token_type?: string;
}