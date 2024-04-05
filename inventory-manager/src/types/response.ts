export type authResponse = {
    token?: string;
    user?: {
        name: string;
        role: string;
    }
    detail?: string;
}