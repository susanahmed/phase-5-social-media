import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import './Login.css'


function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="background">
      <span className="logo">TECHBOOK</span>
    <Wrapper>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p className="font-link">
            Don't have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(false)} className="button-link">
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignupForm onLogin={onLogin} />
          <Divider />
          <p className="font-link">
            Already have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(true)} className="button-link">
              Log In
            </button>
          </p>
        </>
      )}
    </Wrapper>
    </div>
  );
}

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: deeppink;
  margin: 8px 0 16px;
`;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login;