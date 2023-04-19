import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
   
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light primary-bg text-light">
        <NavLink className="navbar-brand text-light" to="/">Kanban Board</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
        
      
    );
};
