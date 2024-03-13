import React, { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <main className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign In</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    aria-describedby="email-help"
                  />
                  <div id="email-help" className="form-text">Enter your registered email address.</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    aria-describedby="password-help"
                  />
                  <div id="password-help" className="form-text">Enter your password.</div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign In</button>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <a href="/signup">Create one</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignIn;