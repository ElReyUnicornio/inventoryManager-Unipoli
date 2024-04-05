import { useEffect, useState } from "react";
import { Admin, Student } from "../types/user";
import { LoginData } from "../types/hooks/useAuth";
import { setCookie, getCookie, deleteCookie } from "../utils/cookies";

export const useAuth = () => {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userRole, setUserRole] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() =>{
        const savedUser = getCookie('user');
        if (savedUser) {
            let newUser: string = savedUser
            newUser.replace(/['"]+/g, '');
            console.log(newUser);
            fetch('http://127.0.0.1:8000/verify_token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_token: newUser})
            })
            .then(response => {
                if (!response.ok) throw new Error('Invalid Token')
                return response.json();
            })
            .then(data => {
                setUser(newUser);
                setIsAuthenticated(true);
            })
            .catch(error => {
                console.error(error);
                setUser(null);
                setLoading(false)
                setIsAuthenticated(false);
                deleteCookie('user');
                alert('Tu sesión ha caducado')
            })
        } else {
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false)
        }
    },[]);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true);
            setLoading(false)
        }
    },[user]);

    const login = async (user: LoginData) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const data = await response.json();
            if (data.detail) {
                if (data.detail === "Invalid Token" || data.detail === 'Token Expired') {
                    deleteCookie('user');
                    setIsAuthenticated(false);
                }
                throw new Error(data.detail)
            };
            if (data) {
                setUser(data.token);
                setCookie('user', data, 15);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (user: Student | Admin) => {
        if (user.name === '' || user.enrollment === '' || user.password === '' || user.role === '') throw new Error("All fields are required");
        if (user.role === 'Admin' && !(user as Admin).position) throw new Error("Position is required for admin users");
        if (user.role === 'Student' && (!(user as Student).carreer || !(user as Student).quarter)) throw new Error("Carreer and quarter are required for user users");

        console.log(user);
        try {
            const response = await fetch('http://127.0.0.1:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            console.log(response.status)
            const data = await response.json();
            if (data.detail) {
                if (data.detail === "Invalid Token" || data.detail === 'Token Expired') {
                    deleteCookie('user');
                    setIsAuthenticated(false);
                }
                throw new Error(data.detail)
            };
            if (data) {
                setUser(JSON.stringify(data));
                setCookie('user', JSON.stringify(data), 15);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
        deleteCookie('user');
    }

    return { user, isAuthenticated, login, register, logout, loading };
}
