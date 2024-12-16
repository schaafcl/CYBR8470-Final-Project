import React, { useEffect } from 'react';

const LogoutPage = () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem(token);
  useEffect(() => {
    const logout = async () => {
      
      try {
        
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