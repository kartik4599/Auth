import { useContext, useRef, useState } from "react";
import ContextAuth from "../../Context/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const cxt = useContext(ContextAuth);
  const history= useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submihandler = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      setLoading(true);
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBP8kanqzI5kp3ArEukdpOp7NjnV7fgnJ8",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
      } else {
        res.json((data) => alert(data.error.message));
      }
      setLoading(false);
    } else {
      setLoading(true);
      console.log("login");
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBP8kanqzI5kp3ArEukdpOp7NjnV7fgnJ8",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        cxt.addId(data.idToken);
        await setTimeout(()=>{},2000);
        console.log(cxt);
        history.replace('/change');
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    }

    setLoading(false);
  };
  //
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submihandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          {isLoading && <h3>Sending request...</h3>}
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
