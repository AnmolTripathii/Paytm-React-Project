import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('https://paytm-react-project.vercel.app/api/v1/user/get-user-details', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
            console.log("User details fetched:", response.data);
        } catch (error) {
            console.error("Error fetching user details", error.response ? error.response.data : error.message);
            setError("Failed to fetch user details");
            setUser({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};
