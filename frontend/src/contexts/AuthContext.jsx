import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:7500/user/getprotected', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.data);
        } catch (error) {
          console.error(`Error fetching user data:
          message: ${error.message}
          token:   ${token}`);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = (accessToken, user) => {
    localStorage.setItem('token', accessToken);
    setUser(user);

    const dashboardUrlMap = {
      admin: '/dashboard/admin',
      trainer: '/dashboard/trainer',
      member: '/dashboard/member',
    };
    const dashboardUrl = dashboardUrlMap[user.role] || '/';

    navigate(dashboardUrl);  // Redirect to the dashboard
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
