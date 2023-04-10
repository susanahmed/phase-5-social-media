import React, { useState } from "react";
import './SignUpForm.css'

function SignupForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
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
        bio,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div>
        <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      </div>
      <div>
        <label htmlFor="imageUrl">Profile Image</label>
        <input
          type="text"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          rows="3"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
      </div>
      {/* <div>
        {errors.map((err) => (
          <error key={err}>{err}</error>
        ))}
      </div> */}
    </form>
  );
}

export default SignupForm;


// import React, {useState} from 'react'
// import {useHistory} from 'react-router-dom'
// import styled from "styled-components";
// import { useFormik } from "formik"
// import * as yup from "yup"

// function Authentication({updateUser}) {
//     const [signUp, setSignUp] = useState(false)
//     const [error, setError] = useState(false)
//     const history = useHistory()
  
//     const handleClick = () => setSignUp((signUp) => !signUp)
//     const formSchema = yup.object().shape({
//       name: yup.string().required("Please enter a user name"),
//       email: yup.string().email()
//     })
  
//     const formik = useFormik({
//       initialValues: {
//         name:'',
//         email:'',
//         password:''
//       },
//       validationSchema: formSchema,
//       onSubmit: (values) => {
//           fetch(signUp?'/signup':'/login',{
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(values),
//           })
//           .then(res => {
//             if(res.ok){
//               res.json().then(user => {
//                 console.log(user)
//                 updateUser(user)
//                 history.push('/')
//               })
//             } else {
              
//               res.json().then(error => setError(error.message))
//             }
//           })
         
//       },
//     })

//     return (
//         <> 
//         <h2 style={{color:'red'}}> {formik.errors.name}</h2>
//         {error&& <h2 style={{color:'red'}}> {error}</h2>}
//         <h2>Please Log in or Sign up!</h2>
//         <h2>{signUp?'Already a member?':'Not a member?'}</h2>
//         <button onClick={handleClick}>{signUp?'Log In!':'Register now!'}</button>
//         <Form onSubmit={formik.handleSubmit}>
//         <label>
//           Username
//           </label>
//         <input type='text' name='name' value={formik.values.name} onChange={formik.handleChange} />
//         <label>
//            Password
//            </label>
//            <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange} />
//         {signUp&&(
//           <>
//           <label>
//           Email
//           </label>
//           <input type='text' name='email' value={formik.values.email} onChange={formik.handleChange} />
           
//            </>
//         )}
//         <input type='submit' value={signUp?'Sign Up!':'Log In!'} />
//       </Form>
//         </>
//     )
// }

// export default Authentication

// export const Form = styled.form`
// display:flex;
// flex-direction:column;
// width: 400px;
// margin:auto;
// font-family:Arial;
// font-size:30px;
// input[type=submit]{
//   background-color:#42ddf5;
//   color: white;
//   height:40px;
//   font-family:Arial;
//   font-size:30px;
//   margin-top:10px;
//   margin-bottom:10px;
// }
// `