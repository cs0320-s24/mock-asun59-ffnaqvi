import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { usernamePassword } from "./data/mockData";
interface loginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export function LoginButton(props: loginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const authenticate = () => {
    if (usernamePassword.has(username)) {
      // If the username exists, check if the password matches
      if (usernamePassword.get(username) === password) {
        const newValue = !props.isLoggedIn;
        props.setIsLoggedIn(newValue);
      } else {
        setError("Incorrect password");
      }
    } else {
      setError("Username not found");
    }
  };

  if (props.isLoggedIn) {
    return (
      <button aria-label="Sign Out" onClick={authenticate}>
        Sign out
      </button>
    );
  } else {
    return (
      <div>
        <input
          aria-label="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
        <input
          aria-label="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <button aria-label="Login" onClick={authenticate}>
          Login
        </button>
        {error && <p>{error}</p>}
      </div>
    );
  }
}
