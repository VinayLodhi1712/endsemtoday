import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Layout from '../components/layout/layout';
import { toast } from 'react-toastify';

const WelcomeNewUser = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Check if this is a new user based on profile completion
    if (auth?.user) {
      const isProfileIncomplete = !auth.user.Location || 
                                  auth.user.Location === 'Not specified' ||
                                  !auth.user.MobileNo ||
                                  !auth.user.tags ||
                                  auth.user.tags.length === 0;
      
      setIsNewUser(isProfileIncomplete);
      
      if (!isProfileIncomplete) {
        // User already has complete profile, redirect to home
        navigate('/');
      }
    }
  }, [auth, navigate]);

  const handleCompleteProfile = () => {
    toast.info('Let\'s complete your profile to get started!');
    navigate('/dashboard/user/Profile');
  };

  const handleSkipForNow = () => {
    toast.success('Welcome to TalkOfCode! You can complete your profile anytime.');
    navigate('/');
  };

  if (!isNewUser) {
    return null; // Will redirect automatically
  }

  return (
    <Layout>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-5 shadow-lg text-center" style={{ maxWidth: "600px", width: "100%" }}>
          <div className="mb-4">
            <div className="welcome-icon mb-3">
              <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
            </div>
            <h2 className="text-primary mb-3">Welcome to TalkOfCode! 🎉</h2>
            <h5 className="text-muted mb-4">
              Hi {auth?.user?.Name}! Your account has been created successfully.
            </h5>
          </div>

          <div className="mb-4">
            <p className="lead text-secondary">
              To get the most out of TalkOfCode, we recommend completing your profile with:
            </p>
            <div className="row text-start mt-4">
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-map-marker-alt text-primary me-2"></i>
                    Your location
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-phone text-primary me-2"></i>
                    Contact information
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-tags text-primary me-2"></i>
                    Your skills & interests
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-link text-primary me-2"></i>
                    Social profiles
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="d-flex gap-3 justify-content-center">
            <button 
              className="btn btn-primary btn-lg px-4"
              onClick={handleCompleteProfile}
            >
              <i className="fas fa-user-edit me-2"></i>
              Complete Profile
            </button>
            <button 
              className="btn btn-outline-secondary btn-lg px-4"
              onClick={handleSkipForNow}
            >
              <i className="fas fa-arrow-right me-2"></i>
              Skip for Now
            </button>
          </div>

          <div className="mt-4">
            <small className="text-muted">
              Don't worry, you can always complete your profile later from the dashboard.
            </small>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WelcomeNewUser;

