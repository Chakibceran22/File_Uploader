import type { LoginDTO } from "./LoginDTO";

export type AuthContextType = {
    isAuthenticated: boolean;
    loading: boolean;
    login: (creadentials: LoginDTO) => void
    googleLogin: () => Promise<{url: any} | undefined>
    logout: () => void,
    token :string
}