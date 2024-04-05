import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/authContext';
import { Admin, Student } from '../types/user';

const useGetUser = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState<Admin | Student | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUser = () => {
        if (!user) return;
        setIsLoading(true);
        try {
            fetch(`http://localhost:8000/get_user/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_token: user})
            })
            .then(response => response.json())
            .then(data => {
                if (data.role === 'Admin') setUserData(data as Admin);
                else setUserData(data as Student);
            })
        }catch(error){
            console.log(user)
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUser()
    },[])

    useEffect(() => {
        getUser()
    },[user])

    return { userData, isLoading };
};

export default useGetUser;