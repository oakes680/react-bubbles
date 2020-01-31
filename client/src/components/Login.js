import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  console.log(props)
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/login`, data)
    .then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data.payload);
      setData({
        username: "",
        password: ""
      });
      props.history.push('/bubblepage')
    })
    .catch(err => {
      console.log(err)
    })
    
  };

  const handleChanges = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          required
          onChange={handleChanges}
          value={data.username}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          required
          onChange={handleChanges}
          value={data.password}
        />
        <button type="submit"> Login </button>
      </form>
    </>
  );
};

export default Login;
