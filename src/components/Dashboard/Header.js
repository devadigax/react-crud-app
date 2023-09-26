import React from 'react';
import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header className="header">
      <div className="title">
        <h1>Employee Management Software</h1>
      </div>
      <div className="actions">
        <button onClick={() => setIsAdding(true)}>Add Employee</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
