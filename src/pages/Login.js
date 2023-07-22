import React, { useEffect, useState } from 'react'
import { Form } from '../components/Form'
import axios from 'axios';
import { apiUrl } from '../constants/constants';



export const Login = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl.loginUrl);
                setUsers(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };

        fetchData();

    }, []);
    return (
        <Form users={users} />
    )
}

export default Login
