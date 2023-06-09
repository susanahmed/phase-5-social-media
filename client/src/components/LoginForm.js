import React, { useState } from "react";
import './Login.css'

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        setError("Invalid Username or Password")
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="font-link">
      <div>
        {error&& <h2 style= {{color:'red'}}>{error}</h2>}
        <h2 className="font-link">Please Login or Sign Up to TECHBOOK</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button variant="fill" color="primary" type="submit" className="button-link">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div>
        {/* {errors.map((err) => (
          <error key={err}>{err}</error>
        ))} */}
      </div>
    </form>
  );
}

export default LoginForm;