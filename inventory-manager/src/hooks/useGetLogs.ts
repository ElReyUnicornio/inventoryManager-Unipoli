import { useContext, useState } from "react";
import { Log } from "../types/logs";
import { AuthContext } from "../components/authContext";

export default function useGetLogs() {
    const { user } = useContext(AuthContext);
    const [logs, setLogs] = useState<Log[] | null>(null);

    const getLogs = async () => {
        try {
            fetch(`http://localhost:8000/get_logs/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_token: user})
            })
            .then(response => response.json())
            .then(data => {
                setLogs(data);
            })
        }catch(error){
            console.log(user)
            console.error(error);
        }
    }

    const getLogsByUser = async () => {
        try {
            fetch(`http://localhost:8000/get_logs_by_user/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_token: user})
            })
            .then(response => response.json())
            .then(data => {
                setLogs(data);
            })
        }catch(error){
            console.log(user)
            console.error(error);
        }
    }

    return { logs, getLogs, getLogsByUser };
}