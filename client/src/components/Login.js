import React, { useState } from "react";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = () => {};

  const handleChanges = () => {};

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
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          required
          onChange={handleChanges}
        />
      </form>
    </>
  );
};

export default Login;
