import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";

const Authentication = () => {
  const [hasAccount, setHasAccount] = useState(true);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const [_, setCookies] = useCookies(["access_token"]);

  const toggleHasAccount = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setHasAccount(!hasAccount);
  };

  const onRegisterSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (registerForm.password != registerForm.password2) {
      setRegisterForm({ ...registerForm, password: "" });
      setRegisterForm({ ...registerForm, password2: "" });
      alert("Passwords do not match");
    } else {
      try {
        await axios.post("http://localhost:8000/auth/register", {
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
          password2: registerForm.password2,
        });
        alert("Registration Complete! Now Log In");
        setHasAccount(!hasAccount);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onLoginSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email: loginForm.email,
        password: loginForm.password,
      });
      console.log(response.data);
      if (response.data.userID === undefined) {
        alert("Wrong Username and/or Password");
        setLoginForm({ ...loginForm, email: "" });
        setLoginForm({ ...loginForm, password: "" });
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {hasAccount ? (
        <div>
          <h3 className="text-white font-bold mt-3">Login</h3>

          <form
            onSubmit={onLoginSubmit}
            className="flex flex-col w-[60%] m-auto p-5 bg-zinc-800 rounded-xl my-5"
          >
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <input
              className="border rounded-full my-2 text-center h-8"
              type="text"
              name="email"
              id="email"
              value={loginForm.email}
              onChange={(event) =>
                setLoginForm({ ...loginForm, email: event.target.value })
              }
            />

            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              className="border rounded-full my-2 text-center h-8"
              type="password"
              name="password"
              id="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm({ ...loginForm, password: event.target.value })
              }
            />

            <input
              className="bg-blue-400 hover:bg-blue-500 rounded-full h-10 my-2 text-white"
              type="submit"
              value="Submit"
            />
            <button
              className="text-blue-400 hover:underline"
              onClick={toggleHasAccount}
            >
              Create an Account
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h3 className="text-white font-bold mt-3">Sign Up</h3>

          <form
            onSubmit={onRegisterSubmit}
            className="flex flex-col w-[60%] m-auto p-5 bg-zinc-800 rounded-xl my-5"
          >
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <input
              className="border rounded-full my-2 text-center h-8"
              type="text"
              name="email"
              id="email"
              value={registerForm.email}
              onChange={(event) =>
                setRegisterForm({ ...registerForm, email: event.target.value })
              }
            />

            <label className="text-white" htmlFor="email">
              Username
            </label>
            <input
              className="border rounded-full my-2 text-center h-8"
              type="text"
              name="username"
              id="username"
              value={registerForm.username}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  username: event.target.value,
                })
              }
            />

            <label className="text-white" htmlFor="password">
              Password
            </label>
            <input
              className="border rounded-full my-2 text-center h-8"
              type="password"
              name="password"
              id="password"
              value={registerForm.password}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  password: event.target.value,
                })
              }
            />

            <label className="text-white" htmlFor="password2">
              Confirm Password
            </label>
            <input
              className="border rounded-full my-2 text-center h-8"
              type="password"
              name="password2"
              id="password2"
              value={registerForm.password2}
              onChange={(event) =>
                setRegisterForm({
                  ...registerForm,
                  password2: event.target.value,
                })
              }
            />

            <input
              className="bg-blue-400 hover:bg-blue-500 rounded-full h-10 my-2 text-white"
              type="submit"
              value="Sign Up"
            />
            <button
              className="text-blue-400 hover:underline"
              onClick={toggleHasAccount}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authentication;
