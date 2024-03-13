import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Confirm Password:', confirmPassword);
  };

  return (
    <main className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="signup-email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="signup-email"
                    name="signup-email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    aria-describedby="signup-email-help"
                  />
                  <div id="signup-email-help" className="form-text">Enter a valid email address.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="signup-password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="signup-password"
                    name="signup-password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    aria-describedby="signup-password-help"
                  />
                  <div id="signup-password-help" className="form-text">Password must be at least 8 characters long.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    aria-describedby="confirm-password-help"
                  />
                  <div id="confirm-password-help" className="form-text">Re-enter your password to confirm.</div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account? <a href="/signin">Sign In</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUp;