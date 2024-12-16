import React, { useEffect } from 'react';

// logs currently logged user in by dropping jwt token from storage
const LogoutPage = () => {
    
  useEffect(() => {

    const logout = async () => {

      try {
        // drop the token, currently its only stored in localstorage rather than in a cookie or in session storage
        localStorage.removeItem('access_token');
        //sessionStorage.removeItem('access_token');
        
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