import React from 'react';
import Layout from '../components/layout/layout';
import { NavLink } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Layout>
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center py-5">
       
          <h1 className="display-1 fw-bold text-danger mb-4">404</h1>
          
          <h2 className="display-6 mb-3">Oops! Page Not Found</h2>
          <p className="lead text-muted mb-4">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <NavLink to="/">
            <button className="btn btn-primary btn-lg px-4 shadow-sm">
              <i className="bi bi-arrow-left me-2"></i>Back to Homepage
            </button>
          </NavLink>
        </div>
   
    </Layout>
  );
};

export default PageNotFound;

