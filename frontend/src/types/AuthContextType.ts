import type { LoginDTO } from "./LoginDTO";

export type AuthContextType = {
    isAuthenticated: boolean;
    loading: boolean;
    login: (creadentials: LoginDTO) => void
}