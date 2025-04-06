import {AxiosResponse} from "axios";
import {$api} from "shared/api/api";
import {ACCESS_TOKEN_LOCAL_STORAGE_KEY, REFRESH_TOKEN_LOCAL_STORAGE_KEY} from "shared/const/localstorage";

export class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse> {
        return $api.post("/auth/login", {username, password});
    }

    static async registration(username: string, password: string, passwordConfirmation: string): Promise<AxiosResponse> {
        return $api.post("/auth/register", {username, password, passwordConfirmation});
    }

    static async refresh(): Promise<AxiosResponse> {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
        if (!refreshToken) throw new Error("Нет refreshToken");
        const response = await $api.post("/auth/refresh", { refreshToken });

        localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, response.data.refreshToken);

        return response;
    }

    static async google(token: string): Promise<AxiosResponse> {
        return $api.post("/auth/google", {token});
    }

    static async logout(): Promise<void> {
        localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
        localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
        return $api.post("/auth/logout");
    }
}
