export interface User {
    name: string;
    enrollment: string;
    password: string;
    role: string;
}

export interface Admin extends User {
    position?: string;
}

export interface Student extends User {
    carreer?: string | null;
    quarter?: number | null;
}