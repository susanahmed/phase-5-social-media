import React, { useState } from "react";
import {useHistory} from 'react-router-dom'
import './Login.css'
import './SignUpForm.css'


function SignupForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    setError([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
        background_url: backgroundUrl,
        location,
        bio,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          history.pushState('/home')});
      } else {
        setError("Please enter valid information")
        // r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="font-link">
      {error&& <h2 style= {{color:'red'}}>{error}</h2>}
      <h2 className="font-link">Sign Up for TECHBOOK</h2>
      <div className="div">
        <label className="label" htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <br/>
      <div className="div">
        <label className="label" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <br />
      <div className="div">
        <label className="label" htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <br />
      <div className="div">
        <label className="label" htmlFor="imageUrl">Profile Image</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <br />
      <div className="div">
        <label className="label" htmlFor="backgroundUrl">Background Image</label>
        <input
          type="text"
          id="backgroundUrl"
          value={backgroundUrl}
          onChange={(e) => setBackgroundUrl(e.target.value)}
        />
      </div>
      <br />
      <div className="div">
        <label className="label" htmlFor="bio">Bio</label>
        <textarea
          rows="3"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="div">
        <label className="label" htmlFor="location">Location</label>
        <textarea
          rows="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <br />
      <div>
        <button type="submit" className="button-link">{isLoading ? "Loading..." : "Sign Up"}</button>
      </div>
    </form>
  );
}

export default SignupForm;
