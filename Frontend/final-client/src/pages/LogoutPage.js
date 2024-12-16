import React, { useEffect } from 'react';

const LogoutPage = () => {
    
  useEffect(() => {

    
    const logout = async () => {
      
      try {
        const token = localStorage.getItem('access_token');
        console.log("token:  ", token);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refreshToken')
        sessionStorage.removeItem('access_token');
        console.log("Token after dropping:  ", localStorage.getItem('access_token'));
        
      } catch (error) {
        console.error('Error:', error);
      }
        
    };

    logout();
  }, []);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default LogoutPage;