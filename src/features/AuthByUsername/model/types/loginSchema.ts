export interface LoginSchema {
    username: string;
    password: string;
    confirmPassword: string;
    isLoading: boolean;
    error?: string;
}